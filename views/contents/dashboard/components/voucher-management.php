<div class="col-md-12">
    <div class="card ">
        <div class="header">
            <h4 class="title">Vouchers Management</h4>
            <br />

            <button type="button" class="btn btn-info btn-fill pull-left" data-toggle="modal" data-target="#addVoucher">
                <i class="fa fa-plus"></i> Generate Voucher &nbsp;
            </button>

            <br />
            <br />
        </div>
        <div class="content">
            <div class="table-full-width">
                <table class="table table-hover table-striped">
                    <tbody>
                    <thead>
                    <th>Select</th>
                    <th>Voucher Code</th>
                    <th>Used?</th>
                    <th>Recipient</th>
                    <th>Date of usage</th>
                    </thead>

                    <?php
                    require 'db.php';
                    $stmt = $db->query('SELECT * from voucher ORDER BY creationDate DESC');
                    $stmt->setFetchMode(PDO::FETCH_ASSOC);

                    $cont = 0;
                    while($row = $stmt->fetch())
                    { ?>

                        <tr>
                            <td>
                                <div class="checkbox">
                                    <input id="checkbox<?php echo $cont;?>" type="checkbox">
                                    <label for="checkbox<?php echo $cont;?>"></label>
                                </div>
                            </td>
                            <td><?php echo $row['uniqueCode']?></td>
                            <td>
                                <?php if(!$row['codeUsed']){?>
                                    <i class="fa fa-times"></i>
                                <?php }else{?>
                                    <i class="fa fa-check"></i>
                                <?php }?>

                            </td>
                            <td>
                                <?php
                                //Checks if e-mails already exists in database
                                $query = $db->prepare("SELECT * FROM recipient WHERE idRecipient = ".$row['recipient_idRecipient']." ");
                                $query->execute();

                                echo $query->fetch()['email'];
                                ?>
                            </td>
                            <td>
                                <?php if(!$row['codeUsed']){?>
                                    Not used
                                <?php }else{?>
                                    <?php
                                        $date = explode(' ', $row['dateUsed'], 2);
                                        $date = explode('-', $date[0]);
                                        echo $date[2] . '-' . $date[1] . '-' . $date[0];
                                    ?>
                                <?php }?>
                            </td>
                        </tr>
                        <?php $cont++; }
                    ?>
                    <?php
                    if(!$cont){?>

                        <tr>
                            <td>
                                No vouchers  created! Would you like to add one?
                            </td>
                            <td>
                                -------
                            </td>
                        </tr>

                    <?php }
                    ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>