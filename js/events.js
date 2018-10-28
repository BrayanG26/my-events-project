const newLocal = 'https://script.google.com/macros/s/AKfycbzZKsQdwLaPvxD-Vt-HC_4sAnlNAjJQ5p925lVWqAHSCwAENJ4/exec';
urlAPI = newLocal;
USUARIO = loadLoginInformation("user.mail");

$(function() {
    getEventosByEmail(USUARIO);
    $('#obtenerEventos').click(function (e) {
        e.preventDefault();
        // cargarContenido(JSONObject);
        // getEventosByEmail(USUARIO);
    });

    $('.edit').click(function (e) {
        e.preventDefault();
        var next = getPrevDir();
        window.location.href = next + "/new-event.html";
    });

    // enableFiltersToInput();

    $("input[type=radio]").change(function () {
        reloadDiv();
        handleDates($(this).val());
    });
});

function loadLoginInformation(key) {
    var userMail = localStorage.getItem(key) || "none";
    return userMail;
}

function getPrevDir() {
    var path = window.location.pathname;
    var next = path.substring(0, path.lastIndexOf('/'));

    return next;
}

function printInformation(data) {
    console.log(data);
}

/**
 * @param  {String} email - String with email user to get the registered events
 */
function getEventosByEmail(email) {
    data = {}
    data["sheet"] = "eventos";
    data["email"] = email;

    $.ajax({
        url: urlAPI,
        data: data,
        type: 'GET',
        processData: true,
        error: function (xhr, errDesc, exception) {
            console.log(xhr);
        },
        success: function (data, code, jqXHR) {
            cargarContenido(data);
            console.info("request succesfully!");
        }
    }).then(function (data) {
        console.log(data);
    });
}

/**
 * which can get all information about it
 * @param  {Integer} ID Id of stored event
 */
function verDetalle(ID) {
    var next = getPrevDir();
    window.location.href = next + '/seemore.html?id=' + ID;
}

/**
 * @param  {Object} data Object with information
 * to generate its html template
 */
function cargarContenido(data) {
    var template = [],
        content = '';
    var $divContent = $('#lista-eventos');
    // var parseObj = JSON.parse(data);
    var parseObj = data;
    var arrayEventos = parseObj.eventos;
    var estado;
    reloadDiv();
    if (arrayEventos.length > 0) {
        for (var i = 0; i < arrayEventos.length; i++) {
            estado = arrayEventos[i].estado;
            template = ['<a href="" class="evento__link" id="' + arrayEventos[i].id + '">',
                '<div class="evento__card__element" >',
                '<img src="https://goo.gl/fBQvxw" alt="avatar" class="evento__imagen">',
                '<div class="evento__detalles">',
                '<div class="categoria">',
            '<h4 class="evento__categoria">' + arrayEventos[i].categoria + '</h4>',
                '</div>',
                '<div class="titulo">',
            '<h3 class="evento__titulo">' + arrayEventos[i].nombreEvento + '</h3>',
                '</div>',
                '<div class="descripcion">',
            '<p class="evento__descripcion">' + arrayEventos[i].descripcion + '</p>',
                '</div>',
                '<div class="costo">',
            '<p class="evento__costo"> $ ' + arrayEventos[i].costo + '</p>',
                '</div>',
                '<div class="fecha">',
            '<p class="evento__fecha">' + arrayEventos[i].fecha + '</p>',
                '</div>',
                '<div class="estado">',
            '<span class="estado__etiqueta estado__etiqueta--' + estado + '">' + estado + '</span>',
                '</div>',
                '</div>',
                '</div>',
                '</a>'
            ].join("\n");
            content += template;
        }
        $divContent.append(template);
    } else {
        var sorryContent = '<p>Sorry, neither event was found in this query <i class="fas fa-frown"></i></p>';
        $divContent.append(sorryContent);
    }
    $("a.evento__link").click(function (e) {
        e.preventDefault();
        var id = $(this).attr('id');
        verDetalle(id);
    });
}

/**
 * Enable input for filters when is click on one
 */
function enableFiltersToInput() {
    $('.colapsable').on("click", function (e) {
        $(this).toggleClass("active");
        var containerInput = $(this).next();
        console.log(containerInput);
        if (containerInput.css("display") === "block") {
            console.log('entro en el if');
            containerInput.css("display", "none");
        } else {
            console.log('salio en el if');
            containerInput.css("display", "block");
        }
    });
}

/**
 * Remove all child elements inside the specified div
 */
function reloadDiv() {
    var $divListaEventos = $("#lista-eventos");
    if ($divListaEventos.children().length > 0) {
        $divListaEventos.empty();
    } {
        console.log("Div empty!, no problem");
    }

}

/**
 * Get data of events according predetermined option of time range
 * @param  {String} email Email for know which user is requesting
 * @param  {String} increase Option to filter events data (1:today, 2:tomorrow ,8:this week)
 */
function getEventosByDate(email, increase) {
    data = {}
    data["sheet"] = "eventos";
    data["email"] = email;
    data["incremento"] = increase;

    $.ajax({
        url: urlAPI,
        data: data,
        type: 'GET',
        processData: true,
        error: function (xhr, errDesc, exception) {
            console.log(xhr);
        },
        success: function (data, code, jqXHR) {
            cargarContenido(data);
            console.info("request succesfully!");
        }
    }).then(function (data) {
        console.log(data);
    });
}

/**
 * Get event according passed event name 
 * @param  {String} email User who make the request
 * @param  {String} name Name or part of event name
 */
function getEventosByName(email, name) {
    data = {}
    data["sheet"] = "eventos";
    data["email"] = email;
    data["nombreEvento"] = name;

    $.ajax({
        url: urlAPI,
        data: data,
        type: 'GET',
        processData: true,
        error: function (xhr, errDesc, exception) {
            console.log(xhr);
        },
        success: function (data, code, jqXHR) {
            cargarContenido(data);
            console.info("request succesfully!");
        }
    }).then(function (data) {
        console.log(data);
    });
}

/**
 * Return a date format like dd/mm/yyy
 */
function preferredFormatDate(rawDate) {
    var dd, mm, yyyy;
    dd = rawDate.getDate();
    mm = rawDate.getMonth() + 1;
    yyyy = rawDate.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }
    formatedDate = dd + '/' + mm + '/' + yyyy;
    console.log("query date: " + formatedDate);
    return formatedDate;
}

/**
 * Manage an increase depending a selected range -today, tomorrow, last week-
 * @param  {String} range - One of three options -today, tomorrow, last week-
 */
function handleDates(range) {
    var today = new Date();
    var increase, newDate = new Date(today);

    switch (range) {
        case 'today':
            increase = 0;
            newDate.setDate(newDate.getDate() + increase);
            break;
        case 'tomorrow':
            increase = 1;
            newDate.setDate(newDate.getDate() + increase);
            break;
        case 'last-week':
            increase = 7;
            newDate.setDate(newDate.getDate() + increase);
            break;
        default:
            break;
    }

    getEventosByDate(USUARIO, increase);
}

/**
 * Get event according passed event name 
 * @param  {String} email User who make the request
 * @param  {String} string Specify if have to pay
 */
function getEventosByCost(email, costo) {
    data = {}
    data["sheet"] = "eventos";
    data["email"] = email;
    data["costo"] = costo;

    $.ajax({
        url: urlAPI,
        data: data,
        type: 'GET',
        processData: true,
        error: function (xhr, errDesc, exception) {
            console.log(xhr);
        },
        success: function (data, code, jqXHR) {
            cargarContenido(data);
            console.info("request succesfully!");
        }
    }).then(function (data) {
        console.log(data);
    });
}

/**
 * Check if input name is valid 
 * @param  {String} email User who make the request
 */
function testNombreEvento(nombre) {
    var regex = /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\s/g;
    if (!regex.test(nombre) && nombre != null && nombre != "") {
        console.info('Valido...');
        getEventosByName(USUARIO, nombre);
    } else {
        console.info('Nombre no valido...');
    }
}

$('#enviarNombre').click(function (e) {
    e.preventDefault();
    testNombreEvento($('#nombreEvento').val());
});

$('#gratis').click(function (e) {
    e.preventDefault();
    getEventosByCost(USUARIO, 'free');
});

$('#pago').click(function (e) {
    e.preventDefault();
    getEventosByCost(USUARIO, 'paid');
});