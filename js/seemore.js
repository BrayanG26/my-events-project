urlAPI = 'https://script.google.com/macros/s/AKfycbzZKsQdwLaPvxD-Vt-HC_4sAnlNAjJQ5p925lVWqAHSCwAENJ4/exec';

$(document).ready(function () {
    $(document).ajaxSend(function () {
        $(".fade, .modal").css("display","block");
        console.log("waiting for response");
    });
    proccessID();
    $(document).ajaxSuccess(function(){
        $(".fade, .modal").css("display", "none");
        console.log("obtained response!");
    });
});

function proccessID(){
    var parameters = location.search.substring(1);

    var temp = parameters.split("=");
    /* l = unescape(temp[1]);
    temp = parameters[1].split("=");
    p = unescape(temp[1]); */
    id = temp[1];
    console.log("event data will be loaded...");
    getEventoByID(id);
}

function getEventoByID(ID) {
    data = {};
    data["sheet"] = "eventos";
    data["id"] = ID;

    $.ajax({
        url: urlAPI,
        data: data,
        type: 'GET',
        processData: true,
        error: function (xhr, errDesc, exception) {
            console.log(xhr);
        },
        success: function (data, code, jqXHR) {
            console.info("request succesfully!");
        }
    }).then(function (data) {
        mostrarDetalle(data);
    });
}

function mostrarDetalle(data){
    var info = data.evento;
    $("#nombre").text(info.nombreEvento);
    $("#descripcion").text(info.descripcion);
    $("#ciudad").text(info.ciudad);
    $("#lugar").text(info.lugar);
    $("#fecha").text(info.fecha);
    $("#hora").text(info.hora);
}