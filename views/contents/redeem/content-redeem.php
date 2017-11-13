<!--Redeem-->
<section id="redeemVoucher" class="col-md-10">
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="header">
                            <h4 class="title">Redeem Voucher</h4>
                        </div>
                        <div class="content">
                            <form>
                                <div class="row">
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label>Code</label>
                                            <input id="validateVoucher" type="text" class="form-control" placeholder="Insert Code here to validate" value="">
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label>E-mail</label>
                                            <input id="email" type="text" class="form-control" placeholder="Insert E-mail" value="">
                                        </div>
                                    </div>
                                </div>

                                <button type="button" class="btn btn-info btn-fill pull-right redeem-voucher-button">Redeem Voucher</button>

                                <!--Notification-->
                                <div class="row">
                                    <div class="col-md-8 validateVoucherBox">
                                        <div class="msg alert">
                                            <span class="msg-text"></span>
                                        </div>
                                    </div>
                                </div>
                                <!--/Notification-->

                                <div class="clearfix"></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<!--/Redeem-->