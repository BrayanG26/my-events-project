var urlAPI = 'https://script.google.com/macros/s/AKfycbzZKsQdwLaPvxD-Vt-HC_4sAnlNAjJQ5p925lVWqAHSCwAENJ4/exec';

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
        theme: 'indigo'

    });
    $timer.on('timechanged', function (e) {
        console.log(this);
    });
});

function guardarEvento() {
    var inputs = $(':input:not(#crearEvento)');
    var data = {};
    /* if (condition) {
        
    } else {
        
    } */
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
    initialIsCheckFilledInputs();
    checkFilledInputs();
    // enviarDatosEventos(data);
}

function initialIsCheckFilledInputs(){
    var $elements = $(".formulario:not(input:checkbox)"); 
    $elements.each(function (index) {
        var valor = $(this).val();
        if(valor == null || valor == ""){
            setWarningElement($(this));
        }else{
            removeWarningElement($(this));
        }
    });
}

function checkFilledInputs() {
    var isValid2, isValid3, isValid4;
    isValid2 = false;
    isValid3 = false;
    isValid4 = false;
    var $inputCosto = $('input#costo');
    var costo = $inputCosto.val();
    var $inputCapacidad = $('input#capacidad');
    var capacidad = $inputCapacidad.val();
    var $inputFecha = $('input#fecha');
    var fecha = $inputFecha.val();
    
    // 
    if (validateIsNumber(capacidad)) {
        console.log('right');
        removeWarningElement($inputCapacidad);
        isValid2 = true;
    } else {
        console.log('wrong');
        setWarningElement($inputCapacidad);
        isValid2 = false;
    }
    // 
    if (validateIsPrice(costo)) {
        console.log('right');
        removeWarningElement($inputCosto);
        isValid3 = true;
    } else {
        console.log('wrong');
        setWarningElement($inputCosto);
        isValid3 = false;
    }
    // 
    if(validateDate(fecha)){
        console.log('right');
        removeWarningElement($inputFecha);
        isValid4 = true;
    }else{
        console.log('wrong');
        setWarningElement($inputFecha);
        isValid4 = false;
    }

}

function setWarningElement(element){
    element.css({
        background: "#f1f6f6",
        border: "1.5px red solid"
    });
}

function removeWarningElement(element){
    element.removeAttr('style');
}

$("#crearEvento").click(guardarEvento);
$('#sePaga').change(function () {
    var $inputCosto = $('#costo')
    $inputCosto.prop("disabled", $(this).is(':checked'));

    if ($(this).is(':checked')) {
        $(this).val('no');
        $inputCosto.val('0');
    } else {
        $(this).val('si');
        $inputCosto.val('');
    }
});
$('input#costo').change(function () {
    if ($(this).attr('style') != null) {
        /*success*/
        $(this).removeAttr('style');
    }
    else {
        /*does not have*/
    }
});
$('input#capacidad').change(function () {
    if ($(this).attr('style') != null) {
        /*success*/
        $(this).removeAttr('style');
    }
    else {
        /*does not have*/
    }
});
$('#categoria').change(function () {
    if ($(this).attr('style') != null) {
        /*success*/
        $(this).removeAttr('style');
    }
    else {
        /*does not have*/
    }
});
$('input#fecha').change(function () {
    if ($(this).attr('style') != null) {
        /*success*/
        $(this).removeAttr('style');
    }
    else {
        /*does not have*/
    }
});


function validateIsNumber(number) {
    var regex = /^[1-9]\d*$/;
    if (regex.test(number)) {
        return true;
    } else {
        return false;
    }
}

function validateIsPrice(price) {
    var regex = /^[1-9]\d*$/;
    if (regex.test(price)) {
        return true;
    } else {
        return false;
    }
}

function validateDate(date) {
    var regex = /(\d{4})-(\d{2})-(\d{2})/;
    if (regex.test(date)) {
        return true;
    } else {
        return false;
    }
}

function enviarDatosEventos(data) {

    $.ajax({
        type: 'POST',
        crossDomain: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin,Content-Type,Authorization,X-Auth-Token"
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