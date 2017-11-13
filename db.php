<?php
//Databases Infos
$host     = 'localhost';
$database = 'db_voucher';
$user     = 'root';
$password = '';

try{
    //Connect to the database
    $db = new PDO('mysql:host='.$host.';dbname='.$database.'', $user, $password );
}
catch(PDOException $ex){

    die(json_encode(array('outcome' => false, 'message' => 'Unable to connect')));

}
