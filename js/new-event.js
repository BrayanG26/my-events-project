urlAPI = 'https://script.google.com/macros/s/AKfycbzZKsQdwLaPvxD-Vt-HC_4sAnlNAjJQ5p925lVWqAHSCwAENJ4/exec';

$(document).ready(function () {
    var $calendar = $('input.datepicker');
    var $timer = $('input.timepicker');
    $calendar.datepicker({
        dateFormat: "yy-mm-dd",
        minDate: new Date()
    });
    $calendar.change(function () {
        console.log($calendar.datepicker("getDate"));
        console.log($calendar.val());
        
    });
    $timer.mdtimepicker({
        format: 'h:mm tt',
        theme:'indigo'
        
    });
    $timer.on('timechanged',function (e) {
        console.log(this);
      });
});

function guardarEvento() {
    var inputs = $(':input:not(#crearEvento)');
    var data = {};

    data.sheet = 'eventos';
    inputs.each(function (index) {
        var $input = $(this);
        var id,
            valor;
        id = $input.attr('id');
        valor = $input.val();
        data[id] = valor;
    });
    console.log(data);
    enviarDatosEventos(data);
}

$("#crearEvento").click(guardarEvento);
$('#sePaga').change(function () {
    var $inputCosto = $('#costo')
    $inputCosto.prop("disabled", $(this).is(':checked'));

    if ($(this).is(':checked')) {
        $inputCosto.val('0');
    } else {
        $inputCosto.val('');
    }
});

function enviarDatosEventos(data) {

    $.ajax({
        type: 'POST',
        crossDomain: true,
        headers:{
            "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Headers":"Origin,Content-Type,Authorization,X-Auth-Token"
        },
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