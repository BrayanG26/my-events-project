var urlAPI = 'https://script.google.com/macros/s/AKfycbzZKsQdwLaPvxD-Vt-HC_4sAnlNAjJQ5p925lVWqAHSCwAENJ4/exec';

$(document).ready(function () {
    var tape = $(".tape")[0];
    var $contenido = $(".main")[0];
    var sticky = tape.offsetTop;
    $(window).scroll(function () {
        /* if (window.pageYOffset >= sticky) {
            navbar.addClass("sticky")
        } else {
            navbar.removeClass("sticky");
        } */
        if (window.pageYOffset >= sticky) {
            tape.classList.add("sticky")
        } else {
            tape.classList.remove("sticky");
        }
    });

    $("#enviarDatos").click(recogerDatosOrganizador);
    $('#cookieTest').click(function () {
        Cookies.set("organizador", "lamejorcookiedetodalahistoria", 2);
        console.log(Cookies.get("organizador"));
    });

});

/**
 * Take input's information and send as parameters to enviarDatos function
 */
function recogerDatosOrganizador() {
    var email = $("#email").val();
    var organizador = $("#organizador").val();
    var data = {};

    if (email == "" || email == null || organizador == "" || organizador == null) {
        console.warn("Error! Some information is missing.");
        console.log(email);
        console.log(organizador);
    } else {
        console.log("Sent!");
        data['email'] = email;
        data['organizador'] = organizador;
        data['sheet'] = 'organizadores';
        cleanInputs();
        enviarDatosOrganizador(data);
        setCookie('organizador', organizador, 2);
        redirectPage();
    }

}

/**
 * @param  {Object} data Object to be sent
 */
function enviarDatosOrganizador(data) {

    alert('Entró a enviarDatosOrganizador');
    $.ajax({
        type: 'POST',
        url: urlAPI,
        data: data,
        processData: true,
        success: function (data, status, jqXHR) {
            console.log(data);
            console.log(jqXHR);
        },
        error: function () {
            console.error('An error ocurr');
        }

    });

}

/**
 * Clean de inputs
 */
function cleanInputs() {
    $('#email').val('');
    $('#organizador').val('');
}

/**
 * @param  {String} organizador
 */
function setCookies(organizador) {
    Cookies.set('user', organizador);
    alert(Cookies.get('user'));
}

/**
 * @param  {String} key key for return corresponding value
 */
function getCookies(key) {
    return Cookies.get(key);
}

/**
 * Redirects to events.html
 */
function redirectPage() {
    alert('Se va a redireccionar...');
    window.location.href = "events.html";
}





