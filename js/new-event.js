var urlAPI = 'https://script.google.com/macros/s/AKfycbzZKsQdwLaPvxD-Vt-HC_4sAnlNAjJQ5p925lVWqAHSCwAENJ4/exec';

$(function () {
    var $calendar = $('#fecha');
    var $timer = $('#hora');
    /*$calendar.datepicker({
        dateFormat: "dd/mm/yy",
        minDate: new Date()
    });*/
    $calendar.flatpickr({
        minDate: "today",
        dateFormat: "d/m/Y",
        altInput: true,
        altFormat: "F j, Y"
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

function pickEventData() {
    var inputs = $(':input:not(#crearEvento)');
    var data = {};
    inputs.each(function (index) {
        var $input = $(this);
        var id,
            valor;
        id = $input.attr('id');
        valor = $input.val();
        data[id] = valor;
    });
}

function guardarEvento() {
    var inputs = $(':input:not(#crearEvento)');
    var data = {};

    data.sheet = 'eventos';
    data.estado = 'CREADO';
    data.email = 'brayang26_@outlook.com';
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
    enviarDatosEventos(data);
}

/**
 * Verify if all form fields are empty
 */
function initialIsCheckFilledInputs() {
    var $elements = $(".formulario:not(input:checkbox)");
    $elements.each(function (index) {
        var valor = $(this).val();
        if (valor == null || valor == "") {
            setWarningElement($(this));
        } else {
            removeWarningElement($(this));
        }
    });
}

/**
 * Verify if numeric fields are empty and with valid values
 */
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
    if (validateDate(fecha)) {
        console.log('right');
        removeWarningElement($inputFecha);
        isValid4 = true;
    } else {
        console.log('wrong');
        setWarningElement($inputFecha);
        isValid4 = false;
    }

}


/**
 * Set warning effeccts from a element
 * @param  {element} element HTML element to be modified
 */
function setWarningElement(element) {
    element.css({
        background: "#f1f6f6",
        border: "1.5px red solid"
    });
}

/**
 * Remove warning effeccts from a element
 * @param  {element} element HTML element to be modified
 */
function removeWarningElement(element) {
    element.removeAttr('style');
}

$("#crearEvento").click(guardarEvento);
$('#sePaga').change(function () {
    var $inputCosto = $('#costo')
    $inputCosto.prop("disabled", $(this).is(':checked'));

    if ($(this).is(':checked')) {
        $(this).val('FALSO');
        $inputCosto.val('0');
    } else {
        $(this).val('VERDADERO');
        $inputCosto.val('');
    }
});
$('input#costo').change(function () {
    if ($(this).val() == '0') {
        $("#sePaga").prop('checked', true);
    } else {
        $("#sePaga").prop('checked', false);
    }
    if ($(this).attr('style') != null) {
        /*success*/
        $(this).removeAttr('style');
    } else {
        /*does not have*/
    }
});
$('input#capacidad').change(function () {
    if ($(this).attr('style') != null) {
        /*success*/
        $(this).removeAttr('style');
    } else {
        /*does not have*/
    }
});
$('#categoria').change(function () {
    if ($(this).attr('style') != null) {
        /*success*/
        $(this).removeAttr('style');
    } else {
        /*does not have*/
    }
});
$('input#fecha').change(function () {
    if ($(this).attr('style') != null) {
        /*success*/
        $(this).removeAttr('style');
    } else {
        /*does not have*/
    }
});


function validateIsNumber(number) {
    var regex = /^[0-9]*$/;
    if (regex.test(number)) {
        return true;
    } else {
        return false;
    }
}

/**
 * Check if is a valid price 
 * @param  {number} date price to validate
 */
function validateIsPrice(price) {
    var regex = /^[1-9]\d*(\.\d+)?$/; // or /^[0-9]*$/
    if (regex.test(price)) {
        return true;
    } else {
        return false;
    }
}

/**
 * Check if is a valid date 
 * @param  {date} date Date to validate
 * @returns {boolean} true or false
 */
function validateDate(date) {
    var regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    if (regex.test(date)) {
        return true;
    } else {
        return false;
    }
}

/**
 * Send data to create new event
 * @param  {object} data New event's data
 */
function enviarDatosEventos(data) {

    $.ajax({
        type: 'POST',
        crossDomain: true,
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