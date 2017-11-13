<div class="col-md-12">
    <div class="card ">
        <div class="header">
            <h4 class="title">Overview</h4>
        </div>
        <div class="content">
            <div class="col-md-12">
                <?php
                try{
                    require 'db.php';
                    $all            = $db->query('SELECT COUNT(idVoucher) from voucher');
                    $all->setFetchMode(PDO::FETCH_ASSOC);
                    $all            = intval($all->fetch()['COUNT(idVoucher)']);

                    $used           = $db->query('SELECT COUNT(idVoucher) from voucher WHERE codeUsed=1');
                    $used->setFetchMode(PDO::FETCH_ASSOC);
                    $used           = intval($used->fetch()['COUNT(idVoucher)']);


                    $notused        = $db->query('SELECT COUNT(idVoucher) from voucher WHERE codeUsed=0');
                    $notused->setFetchMode(PDO::FETCH_ASSOC);
                    $notused        = intval($notused->fetch()['COUNT(idVoucher)']);

                }catch(PDOException $pdoex){
                    echo $pdoex->getMessage();
                }
                ?>

                <div class="col-md-3 col-xs-12 pull-left">
                    <h5 class="col-md-12 text-center">Vouchers generated</h5>
                    <button type="submit" class="col-md-12 col-xs-12 btn btn-info pull-left"> <?php echo $all;?> &nbsp;</button>
                    <br />
                </div>
                <div class="col-md-3 col-xs-12 pull-left col-lg-push-1">
                    <h5 class="col-md-12 text-center">Vouchers used</h5>
                    <button type="submit" class="col-md-12 col-xs-12 btn btn-info pull-left"> <?php echo $used;?> &nbsp;</button>
                    <br />
                </div>

                <div class="col-md-3 col-xs-12 pull-left col-lg-push-2">
                    <h5 class="col-md-12 text-center">Vouchers not used</h5>
                    <button type="submit" class="col-md-12 col-xs-12 btn btn-info pull-left"> <?php echo $notused;?> &nbsp;</button>
                    <br />
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
        <br />
    </div>
</div>