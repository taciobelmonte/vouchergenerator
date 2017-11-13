<?php
require 'flight/Flight.php';
require 'views/modals/modalsContent.php';

//Layouts
Flight::render('layouts/header', array() ,'header');
Flight::render('layouts/sidebar', array() ,'sidebar');

//Modals
Flight::render('modals/layout', array("id"=>"addRecipient", "title"=>"Add Recipient", "content" => $contentAddRecipient, "buttonTitle" => "Add Recipient", "buttonClass" => 'add-recipient-button') ,'contentAddRecipientModal');
Flight::render('modals/layout', array("id"=>"addVoucher", "title"=>"Generate Vouchers", "content" => $contentAddVoucher, "buttonTitle" => "Create Vouchers", "buttonClass" => 'create-voucher-button') ,'contentAddVoucher');
Flight::render('modals/layout', array("id"=>"removeRecipient", "title"=>"Remove Recipient", "content" => $contentRemoveRecipient, "buttonTitle" => "Yes", "buttonClass"=>'confirm-recipient-exclusion') ,'contentRemoveRecipient');

Flight::render('layouts/footer', array() ,'footer');
Flight::render('layouts/nav_footer', array() ,'footer_nav');

//Dashboard Route
Flight::route('/', function(){
    Flight::render('contents/dashboard/components/overview', array() ,'overview');
    Flight::render('contents/dashboard/components/recipients', array() ,'recipients');
    Flight::render('contents/dashboard/components/voucher-management', array() ,'vouchermanagement');

    Flight::render('contents/dashboard/content-dashboard', array() ,'content');
    Flight::render('layout');

});

//Redeem endpoint
Flight::route('/redeem', function(){
    Flight::render('contents/redeem/content-redeem', array() ,'content');
    Flight::render('layout');
});

Flight::route('GET /redeemVoucher', function(){
    require 'db.php';

    $json = array(
        'success'  => 0,
        'message'  => '',
    );

    if(isset($_GET['voucher']) && isset($_GET['email'])){
        $voucher    = $_GET['voucher'];
        $email      = $_GET['email'];

        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {

            try{
                //Retrieve user that matchs to the e-mail inserted
                $stmt = $db->prepare("SELECT * FROM recipient WHERE email LIKE '".$email."'");
                $stmt->execute();

                //Retrieve infos from user with that e-mail
                $idRecipient = $stmt->fetch()['idRecipient'];

                $stmt = $db->prepare("SELECT * FROM voucher WHERE recipient_idRecipient = ".$idRecipient." AND uniqueCode LIKE '".$voucher."'");
                $stmt->execute();

                $results = $stmt->fetchAll();

                if(empty($results[0])){

                    $json['message'] = 'It seems that this code and e-mail do not exist! Try another one!';

                }else{

                    //Check if code has been already used
                    if($results[0]['codeUsed']){

                        $json['message'] = 'Code invalid! It seems that you have already used this code!';

                    }else{

                        if(!empty($results)){

                            header('Content-type: application/json');

                            // UPDATE
                            $stmt = $db->prepare("UPDATE voucher set codeUsed = :codeUsed, dateUsed = :dateUsed where idVoucher = ".$results[0]['idVoucher']." ");

                            $stmt->bindParam(':codeUsed', $codeUsed);
                            $stmt->bindParam(':dateUsed', $dateUsed);

                            $codeUsed = 1;
                            $dateUsed = date('Y-m-d H:i:s');

                            $stmt->execute();

                            //Get the percentage discount for this voucher
                            $stmt2 = $db->prepare("SELECT * FROM specialOffer WHERE idSpecialOffer = ".$results[0]['specialOffer_idSpecialOffer']." ");
                            $stmt2->execute();

                            header('Content-type: application/json');
                            $json['discount'] = $stmt2->fetchAll()[0]['percentDiscount'];
                            $json['message'] = 'Voucher validated with sucess! <br /> Your discount for this Voucher is '. $json['discount']. '%';
                            $json['success'] = 1;
                        }
                    }

                }

                //Disconnect
                $db = null;
            }catch(PDOException $pdoex){
                echo $pdoex->getMessage();
            }

        }else{
            $json['message'] = 'Invalid E-mail!';
        }

        echo json_encode($json);
        die();
    }
});

//GET Endpoint addRecipient
Flight::route('GET /addRecipient', function(){

    require 'db.php';

    $json = array(
        'success'  => 0,
        'message'  => ''
    );

    $name   = $_GET['name'];
    $email  = $_GET['email'];

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {

        try{

            //Checks if e-mails already exists in database
            $stmt = $db->prepare("SELECT * FROM recipient WHERE email LIKE '".$email."'");
            $stmt->execute();

            header('Content-type: application/json');

            if(empty($stmt->fetchAll())){

                //Prepare query to insert
                $stmt = $db->prepare("INSERT INTO recipient (name, email) value (:name, :email)");

                $stmt->bindParam(':name', $name);
                $stmt->bindParam(':email', $email);

                $name   = $_GET['name'];
                $email  = $_GET['email'];

                $stmt->execute();
                $json['success'] = 1;

            }else{
                $json['message'] = 'E-mail already exists in database!';
            }
            $db = null;
        }catch(PDOException $pdoex){
            echo $pdoex->getMessage();
        }

    }else{
        $json['message'] = "Invalid E-mail!";
    }

    echo json_encode($json);
    die();


});

//GET Endpoint addRecipient
Flight::route('GET /removeRecipient', function(){

    require 'db.php';

    $json = array(
        'success'  => 0,
        'message'  => ''
    );

    $id = $_GET['id'];

    try{
        $sql = "DELETE FROM recipient WHERE idRecipient=$id";

        // use exec() because no results are returned
        $db->exec($sql);
        $json['success'] = 1;
        $json['message'] = "Recipient removed with success!";

        echo json_encode($json);

        $db = null;
        die();

    }catch(PDOException $pdoex){

        echo $pdoex->getMessage();
    }

});

//GET Endpoint addVoucher
Flight::route('GET /addVoucher', function(){

    require 'db.php';

    $json = array(
        'success'  => 0,
        'message'  => ''
    );

    $specialOfferName    = filter_var ( $_GET['specialOfferName'], FILTER_SANITIZE_STRING);
    $percentageDiscount  = filter_var ( $_GET['percentageDiscount'], FILTER_SANITIZE_STRING);
    $expirationDate      = filter_var ( $_GET['expirationDate'], FILTER_SANITIZE_STRING);

    try{

        //Create instance of Special Offer
        $stmt = $db->prepare("INSERT INTO specialOffer (specialOfferName, percentDiscount) value (:specialOfferName, :percentDiscount)");

        //	recipient_idRecipient
        $stmt->bindParam(':specialOfferName', $specialOfferName);
        $stmt->bindParam(':percentDiscount', $percentageDiscount);

        $specialOfferName   = $specialOfferName;
        $percentDiscount    = $percentageDiscount;

        $stmt->execute();

        $specialOfferID = $db->lastInsertId();

        // QUERY
        $stmt = $db->query('SELECT * from recipient');
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while($row = $stmt->fetch())
        {
            $query = $db->prepare("INSERT INTO voucher (uniqueCode, expirationDate, codeUsed, dateUsed, creationDate, recipient_idRecipient, specialOffer_idSpecialOffer) value (:uniqueCode, :expirationDate, :codeUsed, :dateUsed, :creationDate, :recipient_idRecipient, :specialOffer_idSpecialOffer)");

            $query->bindParam(':uniqueCode', $uniqueCode);
            $query->bindParam(':expirationDate', $expirationDate);
            $query->bindParam(':codeUsed', $codeUsed);
            $query->bindParam(':dateUsed', $dateUsed);
            $query->bindParam(':creationDate',$creationDate);
            $query->bindParam(':recipient_idRecipient', $recipient_idRecipient);
            $query->bindParam(':specialOffer_idSpecialOffer', $specialOffer_idSpecialOffer);

            //Generates Unique Code
            $chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            $res = "";

            $uniqueCode = "";
            for ( $i=0; $i<8; $i++)
                $uniqueCode .= $chars[ mt_rand(0, strlen($chars)-1) ];

            //Format Date to save on db
            $dbDate = explode('/', $_GET['expirationDate']);
            $dbDate = $dbDate[2] . '-' . $dbDate[1] . '-'. $dbDate[0] . ' 23:59:59';
            $expirationDate = $dbDate;

            $expirationDate                 = $expirationDate;
            $codeUsed                       = 0;
            $dateUsed                       = "0000-00-00 00:00:00";
            $creationDate                   = date('Y-m-d H:i:s');
            $recipient_idRecipient          = $row['idRecipient'];
            $specialOffer_idSpecialOffer    = $specialOfferID;

            $query->execute();
        }

        $db = null;
        $json['success'] = 1;
        $json['message'] = "Vouchers generated with success!";
        echo json_encode($json);
        die();

    }catch(PDOException $pdoex){
        echo $pdoex->getMessage();
    }
});

//GetVouchers endpoint
Flight::route('GET /getVouchers', function(){

    require 'db.php';

    $json = array(
        'success'  => 0,
        'message'  => '',
        'results' =>array()
    );


    if(isset($_GET['email'])){

        $email      = $_GET['email'];

        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
           //E-mail is valid

            try{
                //Retrieve user that matchs to the e-mail inserted
                $stmt = $db->prepare("SELECT * FROM recipient WHERE email LIKE '".$email."'");
                $stmt->execute();

                $idRecipient = $stmt->fetch()['idRecipient'];

                if(!empty($idRecipient)){

                    $stmt = $db->prepare("SELECT voucher.specialOffer_idSpecialOffer, voucher.uniqueCode, specialOffer.idSpecialOffer, specialOffer.specialOfferName FROM voucher INNER JOIN specialOffer ON voucher.specialOffer_idSpecialOffer=specialOffer.idSpecialOffer WHERE recipient_idRecipient=".$idRecipient." AND codeUsed=0 ");
                    $stmt->execute();

                    $results = $stmt->fetchAll();

                    $json['success'] = 1;
                    $json['message'] = 'We found some valid codes! See below:';
                    $json['results'] = $results;
                    $json['total'] = count($results);

                }else{
                    $json['success'] = 0;
                    $json['message'] = 'There is no recipient registered with this e-mail!';
                }

                $db = null;

            }catch(PDOException $pdoex){
                echo $pdoex->getMessage();
            }
        }else{
            $json['message'] = "Invalid E-mail!";

        }
        echo json_encode($json);
        die();
    }

});

//Search vouchers
Flight::route('/searchVoucher', function(){
    Flight::render('contents/searchVoucher/content-searchVoucher', array() ,'content');
    Flight::render('layout');
});

Flight::start();

?>
