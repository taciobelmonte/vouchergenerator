/*
 * Voucher Generator
 * */
;
(function($){

    $.fn.voucherGeneratorDashboard = function(options){
        var addButton               = $('.add-recipient-button');
        var removeButton            = $('.remove-recipient-button');
        var confirmExclusionButton  = $('.confirm-recipient-exclusion');
        var addVoucherButton        = $('.create-voucher-button');
        var modalBt                 = $('#removeRecipient');
        var msg                     = '';

        var init = function(){
            $('.date').mask('00/00/0000');

            addRecipient("recipientName", "recipientEmail" );
            removeRecipient("removeRecipient");
            addVoucher("specialOfferName", "percentageDiscount", "expirationDate" );
        };

        /**
         * addRecipient
         * @param nameField
         * @param emailField
         */
        var addRecipient = function(nameField, emailField){

            addButton.on('click', function(){

                var name  = $('#'+ nameField + '').val();
                var email = $('#'+ emailField +'').val();

                //Validate name
                if(name == '' || name == undefined)
                    msg += 'Name cannot be empty!<br />';

                //Validate e-mail
                if(email == '' || email == undefined)
                    msg += 'E-mail cannot be empty!<br />';

                if( !isValidEmailAddress( email ) )
                    msg += 'E-mail is invalid!<br />';

                //Display error message, in case it exists
                if(msg != ''){

                    showNotification(msg, 'error', 'addRecipient .validateVoucherBox', 1);
                    msg = '';

                }else{

                    //Perform the addition
                    $.getJSON( 'addRecipient', {
                        name                  :name,
                        email                 :email
                    }).done(function(data){

                        if(data.success == 1){

                            clearFields(['recipientName', 'recipientEmail']);
                            showNotification('Recipient added with success!', 'success', 'addRecipient .validateVoucherBox', 1);

                            return true;

                        }else{

                            if(data.message != ''){
                                showNotification(data.message, 'error', 'addRecipient', 0);
                            }else{
                                showNotification('Error when trying to add recipient!', 'error', 'addRecipient .validateVoucherBox', 0);
                            }
                        }

                    }).fail(function(jqxhr, textStatus, error){
                        console.log('Requestion Failed: ' + textStatus);
                    });
                }
            });
        };

        /**
         * removeRecipient
         * @param modalName
         */
        var removeRecipient = function(modalName){

            var id = '';

            removeButton.on('click', function(){
                id = $(this).data('id');
                modalBt.modal('toggle');
            });

            confirmExclusionButton.on('click', function(){

                //Perform the addition
                $.getJSON( 'removeRecipient', {
                    id                      :id,
                }).done(function(data){

                    if(data.success == 1){
                        showNotification('Recipient removed with success!', 'success', 'removeRecipient .validateVoucherBox', 1);
                    }else{
                        showNotification('Error when trying to remove recipient!', 'error', 'removeRecipient .validateVoucherBox', 1);
                    }

                }).fail(function(jqxhr, textStatus, error){
                    console.log('Requestion Failed: ' + textStatus);
                });
            });

        }


        /**
         * addVoucher
         * @param offerName
         * @param percentageName
         * @param expirationName
         */
        var addVoucher = function(offerName, percentageName, expirationName ){

            addVoucherButton.on('click', function(){

                var msg = '';
                var specialOfferName    = $('#'+offerName+'').val();
                var percentageDiscount  = $('#'+percentageName+'').val();
                var expirationDate      = $('#'+expirationName+'').val();

                //Validate specialOfferName
                if(specialOfferName == '' || specialOfferName == undefined)
                    msg += 'Special Offer Name cannot be empty!<br />';

                //Validate percentageDiscount
                if(percentageDiscount == '' || percentageDiscount == undefined)
                    msg += 'Percentage discount cannot be empty!<br />';

                //Validate expirationDate
                if(expirationDate == '' || expirationDate == undefined)
                    msg += 'Expiration date cannot be empty!<br />';

                //Display error message, in case it exists
                if(msg != ''){
                    showNotification(msg, 'error', 'addVoucher .validateVoucherBox', 1);
                    msg = '';
                }else{

                    //Perform the addition
                    $.getJSON( 'addVoucher', {
                        specialOfferName                   : specialOfferName,
                        percentageDiscount                 : percentageDiscount,
                        expirationDate                     : expirationDate
                    }).done(function(data){

                        if(data.success == 1){
                            clearFields(["specialOfferName", "percentageDiscount", "expirationDate"]);
                            showNotification('Voucher generated with success!', 'success', 'addVoucher .validateVoucherBox', 1);
                        }else{
                            if(data.message != ''){
                                showNotification(data.message, 'error', 'addVoucher .validateVoucherBox', 0);
                            }else{
                                showNotification('Error when trying to add voucher!', 'error', 'addVoucher .validateVoucherBox', 0);
                            }
                        }
                    }).fail(function(jqxhr, textStatus, error){
                        console.log('Requestion Failed: ' + textStatus);
                    });
                }
            });
        }

        /**
         * Clear Fields
         * @param fields
         */
        var clearFields = function(fields){
            for (i=0; i<fields.length; i++) {
                $('#' + fields[i] + '').val("");
            }
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

    $('#main').voucherGeneratorDashboard();

});

