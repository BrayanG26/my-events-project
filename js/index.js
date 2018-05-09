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
    alert("Email: "+email+"\n"+"Organizador: "+organizador);
    
    var JSONObject= {"email":email, "organizador":organizador };
    var jsonData = JSON.parse( JSONObject );    

    var request = $.ajax({
        url: "rest/orders",
        type: "POST",
        data: jsonData,
        dataType: "json",
        processData:true,
        success:function(data,status,jqXHR){
            alert("success..."+data);
        }
    }); 
}



