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
            tape.classList.add("sticky");
        } else {
            tape.classList.remove("sticky");
        }
    });

    $("#enviarDatos").click(recogerDatos);
    $('#recibirDatos').click(recibirDatos);
});

function recogerDatos() {
    var email = $("#email").val();
    var organizador = $("#company").val();

    if (email == "" || email == null || organizador == "" || organizador == null) {
        console.warn("ERROR, COMPLETE LA INFORMACIÓN")
    } else {
        console.log("INFORMACIÓN ENVIADA");
        console.log("Información recogida: " + email + " - " + organizador);
        enviarDatos(email,organizador);
    }
    
}

function enviarDatos(email, organizador) {
    var urlAPI = 'https://script.google.com/macros/s/AKfycbzZKsQdwLaPvxD-Vt-HC_4sAnlNAjJQ5p925lVWqAHSCwAENJ4/exec';
    // alert("Email: " + email + "\n" + "Organizador: " + organizador);

    var JSONObject = { "id":5,
                        "organizador": organizador,
                        "email": email
                    };
    // var jsonData = JSON.parse(JSONObject);
    var request = $.ajax({
        type:'POST',
        url: urlAPI,
        data: JSONObject,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        processData: true,
        success: function (data, status, jqXHR) {
            alert("success..." + data);
        }
    });
}

function recibirDatos(){
    var URL = 'https://script.google.com/macros/s/AKfycbzZKsQdwLaPvxD-Vt-HC_4sAnlNAjJQ5p925lVWqAHSCwAENJ4/exec';
    var action = '?action=get&prodid=1&prodid=2';
    
    var request = $.ajax({
        url: URL+action,
        data:{format:'json'},
        error:function(){alert('no se pudo')},
        dataType:'jsonp',
        success:function(data){alert(data);},
        type:'GET',
        
    });
}




