$(document).ready(function(){

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

    var removeRecipient = function (id) {
        var msg = '';
        var id = '';

        //Perform the addition
        $.getJSON( 'removeRecipient', {
            id                      :id,
        }).done(function(data){

            if(data.success == 1){
                showNotification('Recipient removed with success!', 'success', 'removeRecipient .validateVoucherBox', 1);
                return 0;
            }else{
                showNotification('Error when trying to remove recipient!', 'error', 'removeRecipient .validateVoucherBox', 1);
                return 1;
            }

        }).fail(function(jqxhr, textStatus, error){
            console.log('Requestion Failed: ' + textStatus);
        });
    };

    var areEqual = function(expected, actual) {
        return expected === actual;
    };

    var removeRecipientSuccess = function(func) {
        var actual = func(15);
        var expected = 0;
        console.log(areEqual(expected, actual));
    };

    var removeRecipientFails = function(func) {
        var actual = func(1);
        var expected = 1;
        console.log(areEqual(expected, actual));
    };

    //Running Tests
    //removeRecipientSuccess(removeRecipient);
    //removeRecipientSuccess(removeRecipient);


});

