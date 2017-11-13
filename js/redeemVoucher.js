/*
 * Voucher Generator
 * */
;
(function($){

    $.fn.voucherGeneratorRedeem = function(options){
        var redeemVoucherButton     = $('.redeem-voucher-button');
        var msg                     = '';

        var init = function(){

            //Input Mask
            $('.date').mask('00/00/0000');

            //Call Redeem Voucher
            redeemVoucher("validateVoucher", "email");
        };

        /**
         * redeemVoucher
         * @param voucher
         * @param email
         */
        var redeemVoucher = function(voucherID, emailID){

            redeemVoucherButton.on('click', function(){

                var msg = '';
                var voucher = $('#' + voucherID + '').val();
                var email   = $.trim($('#' + emailID + '').val());

                showNotification('Validating voucher...', 'info', 'redeemVoucher .validateVoucherBox', 0);

                //Validate name
                if(voucher == '' || voucher == undefined)
                    msg += 'Voucher cannot be empty!<br />';

                //Validate e-mail
                if(email == '' || email == undefined){
                    msg += 'E-mail cannot be empty!<br />';
                }else{
                    if( !isValidEmailAddress( email ) )
                        msg += 'E-mail is invalid!<br />';
                }

                //Display error message, in case it exists
                if(msg != ''){
                    showNotification(msg, 'error', 'redeemVoucher .validateVoucherBox', 1);
                    msg = '';
                }else{

                    //Perform Validation
                    $.getJSON( 'redeemVoucher', {
                        voucher                  :voucher,
                        email                    :email,
                    }).done(function(data){

                        if(data.success == 1){
                            showNotification(data.message, 'success', 'redeemVoucher .validateVoucherBox', 0);

                        }else{
                            if(data.message != ''){
                                showNotification(data.message, 'error', 'redeemVoucher .validateVoucherBox', 0);
                            }else{
                                showNotification('Error when trying to validate!', 'error', 'redeemVoucher .validateVoucherBox', 0);
                            }
                        }
                    }).fail(function(jqxhr, textStatus, error){
                        console.log('Requestion Failed: ' + textStatus);
                    });
                }
            });
        };

        /**
         * isValidEmailAddress
         * @param emailAddress
         * @returns {boolean}
         */
        var isValidEmailAddress = function(emailAddress) {
            var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
            return pattern.test(emailAddress);
        }

        /**
         * showNotification
         * @param text
         * @param type
         * @param id
         * @param refresh
         */

        var showNotification = function(text, type, id, refresh){
            $('#'+id+' .msg').removeClass('alert alert-success alert-danger alert-info');

            $('#'+id+'').fadeIn();

            if(type == 'success'){
                $('#'+id+' .msg').addClass('alert alert-success');
                $('#'+id+' .msg .msg-text').html(text);

                if(refresh == 1){
                    setTimeout(function(){
                        $('.modal .close').click();
                    },2000);

                    setTimeout(function(){
                        window.location.reload();
                    },2500);
                }
            }else if(type == 'info'){
                $('#'+id+' .msg').addClass('alert alert-info');
                $('#'+id+' .msg .msg-text').html(text);
            }else{
                $('#'+id+' .msg').addClass('alert alert-danger');
                $('#'+id+' .msg .msg-text').html(text);
            }
        }


        /**
         * Init function
         */
        init();

        return this;
    }
})(jQuery);


jQuery(document).ready(function($) {

    $('#main').voucherGeneratorRedeem();

});

