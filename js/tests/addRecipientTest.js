$(document).ready(function(){

    var clearFields = function(fields){
        for (i=0; i<fields.length; i++) {
            $('#' + fields[i] + '').val("");
        }
    };
    var isValidEmailAddress = function(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    }
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

    var addRecipient = function (name, email) {
        var msg = '';

        var name  = name;
        var email = email;

        //Validate name
        if(name == '' || name == undefined){
            msg += 'Name cannot be empty!<br />';
            // return 0;
        }

        //Validate e-mail
        if(email == '' || email == undefined){
            msg += 'E-mail cannot be empty!<br />';
            // return 1;
        }

        if( !isValidEmailAddress( email ) ){
            msg += 'E-mail is invalid!<br />';
            // return 2;
            //console.log(2);
        }

        //Display error message, in case it exists
        if(msg != ''){

            showNotification(msg, 'error', 'addRecipient .validateVoucherBox', 1);
            msg = '';

            //return 4;

        }else{

            //Perform the addition
            $.getJSON( 'addRecipienttt', {
                name                  :name,
                email                 :email
            }).done(function(data){

                if(data.success == 1){

                    clearFields(['recipientName', 'recipientEmail']);
                    showNotification('Recipient added with success!', 'success', 'addRecipient .validateVoucherBox', 1);

                    //return 5;

                }else{

                    if(data.message != ''){

                        showNotification(data.message, 'error', 'addRecipient', 0);
                        // return 6;

                    }else{
                        showNotification('Error when trying to add recipient!', 'error', 'addRecipient .validateVoucherBox', 0);
                    }
                }

            }).fail(function(jqxhr, textStatus, error){
                console.log('Requestion Failed: ' + textStatus);
                return 8;
            });
        }

    };

    var areEqual = function(expected, actual) {
        return expected === actual;
    };

    //Tests
    var emptyName = function(func) {
        var actual = func("", "taciobelmonte@gmail.com");
        var expected = 0;
        console.log(areEqual(expected, actual));
    };

    var emptyEmail = function(func) {
        var actual = func("Tacio", "");
        var expected = 1;
        console.log(areEqual(expected, actual));
    };

    var invalidEmail = function(func) {
        var actual = func("Tacio", "taciobelmonte@gmai");
        var expected = 2;
        console.log(areEqual(expected, actual));
    };

    var invalidEmailEmptyName = function(func) {
        var actual = func("", "taciobelmonte@gmai");
        var expected = 0;
        console.log(areEqual(expected, actual));
    };

    var displayErrorMessage = function(func) {
        var actual = func("", "taciobelmonte@gmai");
        var expected = 4;
        console.log(areEqual(expected, actual));
    };

    var ajaxTestSuccess = function(func) {
        var actual = func("PHP", "testingPHP@gmail.com");
        var expected = 5;
        console.log(areEqual(expected, actual));
    };

    var ajaxTestEmailAlreadyInDB = function(func) {
        var actual = func("PHP", "testingPHP@gmail.com");
        var expected = 6;
        console.log(areEqual(expected, actual));
    };

    var ajaxFailRequest = function(func) {
        var actual = func("PHP", "testingPHP@gmail.com");
        var expected = 8;
        console.log(areEqual(expected, actual));
    };

    //Running Tests
    //emptyName(addRecipient);
    //emptyEmail(addRecipient);
    //invalidEmail(addRecipient);
    //invalidEmailEmptyName(addRecipient);
    //displayErrorMessage(addRecipient);
    // ajaxTestSuccess(addRecipient);
    // ajaxTestEmailAlreadyInDB(addRecipient);
    // ajaxFailRequest(addRecipient);

});

