<div class="col-md-12">
    <div class="card ">
        <div class="header">
            <h4 class="title">Recipients</h4>
            <br />

            <button id="addRecipientButton" type="button" class="btn btn-info btn-fill pull-left" data-toggle="modal" data-target="#addRecipient">
                <i class="fa fa-plus"></i> Add Recipient
            </button>

            <br />
            <br />
        </div>
        <div class="content">
            <div class="table-full-width">
                <table class="table table-hover table-striped">
                    <tbody>
                    <thead>
                    <th>Name</th>
                    <th>E-mail</th>
                    </thead>

                    <?php
                    try{
                        require 'db.php';
                        $stmt = $db->query('SELECT * from recipient');
                        $stmt->setFetchMode(PDO::FETCH_ASSOC);

                        $cont = 0;
                        while($row = $stmt->fetch())
                        { ?>
                            <tr>
                                <td>
                                    <?php echo $row['name'];?>
                                </td>
                                <td>
                                    <?php echo $row['email'];?>
                                </td>
                                <td class="td-actions text-right">

                                    <button data-id="<?php echo $row['idRecipient'];?>" type="button" class="remove-recipient-button btn btn-danger btn-simple btn-xs" data-target="#removeRecipient">
                                        <i class="fa fa-times"></i> Remove
                                    </button>
                                </td>
                            </tr>
                            <?php $cont++; }

                    }catch(PDOException $pdoex){
                        echo $pdoex->getMessage();
                    }

                    if(!$cont){?>

                        <tr>
                            <td>
                                No recipients registered. Would you like to add one?
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