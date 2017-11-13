/*
 * Voucher Generator
 * */
;
(function($){

    $.fn.voucherGeneratorSearch = function(options){
        var searchVoucherButton     = $('.search-voucher-button');
        var msg                     = '';

        var init = function(){

            //Input Mask
            $('.date').mask('00/00/0000');

            //Call Redeem Voucher
            searchVoucher("email");
        };

        /**
         * searchVoucher
         * @param voucher
         * @param email
         */
        var searchVoucher = function(emailID){

            searchVoucherButton.on('click', function(){

                var msg = '';
                var email   = $.trim($('#'+emailID+'').val());

                showNotification('Searching for vouchers...', 'info', 'searchVoucher .validateVoucherBox', 0);

                //Validates e-mail
                if(email == '' || email == undefined){
                    msg += 'E-mail cannot be empty!<br />';
                }else{
                    if( !isValidEmailAddress( email ) )
                        msg += 'E-mail is invalid!<br />';
                }

                //Display error message, in case it exists
                if(msg != ''){
                    showNotification(msg, 'error', 'searchVoucher .validateVoucherBox', 1);
                    msg = '';
                }else{

                    var html = '';

                    //Performs Validation
                    $.getJSON( 'getVouchers', {
                        email                    :email,
                    }).done(function(data){

                        if(data.success == 1){
                            showNotification(data.message, 'success', 'searchVoucher .validateVoucherBox', 0);

                            if(data.total > 0){
                                for(var i =0; i<data.total; i++){
                                    html+=' <div class="font-icon-list col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xs-6"><div class="font-icon-detail">Offer Name:<strong><br />'+data.results[i].specialOfferName+'</strong> <br /> <br />Code: <br /> <strong>'+data.results[i].uniqueCode+'</strong></div></div>'
                                }
                            }

                            $('#results').html("").append(html);

                        }else{
                            if(data.message != ''){
                                showNotification(data.message, 'error', 'searchVoucher .validateVoucherBox', 0);
                            }else{
                                showNotification('Error when trying to validate!', 'error', 'searchVoucher .validateVoucherBox', 0);
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
        };

        /**
         * Init function
         */
        init();

        return this;
    }
})(jQuery);


jQuery(document).ready(function($) {

    $('#main').voucherGeneratorSearch();

});

