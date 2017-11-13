<!--Content Search Voucher-->
<section id="searchVoucher" class="col-md-10">
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="header">
                            <h4 class="title">Search for Valid Vouchers</h4>
                            <br />
                            <h6>Please, fill with a valid e-mail. All valid codes will be returned.</h6>
                        </div>
                        <div class="content">
                            <form>
                                <div class="row">
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label>E-mail</label>
                                            <input id="email" type="text" class="form-control" placeholder="Insert email" value="">
                                        </div>
                                    </div>
                                </div>
                                <button type="button" class="btn btn-info btn-fill pull-right search-voucher-button">Search</button>

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

                                <div class="content all-icons">
                                    <div class="row">
                                        <div id="results" class="col-md-12"></div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<!--/Content Search Voucher-->