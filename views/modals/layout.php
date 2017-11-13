<!--Modal-->
<div class="modal fade" id="<?php echo $id;?>" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"><?php echo $title;?></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <!--Notification-->
            <div class="row">
                <div class="col-md-12 validateVoucherBox">
                    <div class="msg alert">
                        <span class="msg-text"></span>
                    </div>
                </div>
            </div>
            <!--/Notification-->

            <div class="modal-body">
                <div class="content">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-12">
                                <?php echo $content;?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary <?php echo $buttonClass;?>"><?php echo $buttonTitle;?></button>
            </div>
        </div>
    </div>
</div>
<!--/Modal-->