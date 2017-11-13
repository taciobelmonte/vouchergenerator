<?php
$contentAddRecipient = <<<EOD
<div class="card">
    <div class="content">
        <form>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" id="recipientName" name="recipientName" class="form-control" placeholder="Insert Name" value="">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>E-mail</label>
                        <input type="text" id="recipientEmail" name="recipientEmail" class="form-control" placeholder="Insert E-mail" value="">
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
        </form>
    </div>
</div>
EOD;

$contentAddVoucher = <<<EOD
<div class="card">
    <div class="content">
        <form>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Special Offer Name</label>
                        <input type="text" id="specialOfferName" name="specialOfferName" class="form-control" placeholder="Insert a Special Offer Name" value="">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Fixed percentage Discount</label>
                        <input type="text" id="percentageDiscount" name="percentageDiscount" class="form-control" placeholder="Insert the percentage Discount" value="">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Expiration Date</label>
                        <input type="text" id="expirationDate" name="expirationDate" class="date form-control" placeholder="DD/MM/YYYY" value="">
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
        </form>
    </div>
</div>
EOD;

$contentRemoveRecipient = <<<EOD
<p>Confirm exclusion?</p>
<br />
EOD;
