$(function() {
    $.validate({
        modules: 'security, toggleDisabled',
        lang: 'en',
        errorMessagePosition: 'top',
    });
    $('.tab-link').on('click', function(e) {
        e.preventDefault();

        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');

        var href = $(this).attr('href');
        $('.forms > form').hide();
        $(href).fadeIn(500);
    });

    // Attach submit function to submit event to forms
    $(".forms__form-element").submit(Utils.submitForms);

    /*$('input[type=submit]').on('click', function(e) {
        var parentClass = $(e.target).parent().attr('class');
        var userToJSON = {};
        var dataString = '';
        if (parentClass.includes("login")) {
            dataString = 'data-login'
        } else if (parentClass.includes("signup")) {
            dataString = 'data-signup'
        }
        $('input[' + dataString + ']').each(function() {
            userToJSON[$(this).attr(dataString)] = $(this).val();
        });
        console.log(userToJSON);
    });*/
});

var Utils = (function($, request) {

    /**
     * Redirects to events.html
     */
    var redirectPage = function() {
        window.location.href = "events.html";
    };

    var getEventosByUser = function(email) {
        var data = {};

    }

    var submitForms = function(event) {
        var idForm = $(event.target).attr('id');
        var dataObject = {},dataString = '',isLogin = false;
        event.preventDefault();

        if (idForm.includes("login")) {
            dataString = 'data-login';
            dataObject.action = 'login';
            isLogin = true;
        } else if (idForm.includes("signup")) {
            dataString = 'data-signup';
            dataObject.action = 'signup';
        }
        $('input[' + dataString + ']').each(function() {
            dataObject[$(this).attr(dataString)] = $(this).val();
        });
        $(this)[0].reset();
        console.log(dataObject);
        controller.logInUSer(request.send('post', dataObject));
    }
    return {
        submitForms: submitForms
    };
})(window.jQuery, Requests);