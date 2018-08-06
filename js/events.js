urlAPI = 'https://script.google.com/macros/s/AKfycbzZKsQdwLaPvxD-Vt-HC_4sAnlNAjJQ5p925lVWqAHSCwAENJ4/exec';
USUARIO = 'brayanguerrero4040@gmail.com';

$(document).ready(function () {
	$('#nombre-usuario').text(' > ' + USUARIO);
	// getEventos(USUARIO);
	$('#obtenerEventos').click(function (e) {
		e.preventDefault();
		// cargarContenido(JSONObject);
		getEventos(USUARIO);
	});

	$('#agregarEvento').click(function (e) {
		e.preventDefault();

	});
});


function printInformation(data) {
	console.log(data);
}

/**
 * @param  {String} email String with email user to get the registered events
 */
function getEventos(email) {
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
			console.info("request succesfully!");
			cargarContenido(data);
		}
	}).then(function (data) {
		console.log(data);
	});
}

function mostrarDatos() {
	// console.log(JSONObject);
}

/**
 * @param  {Object} data Object with information
 * to generate its html template
 */
function cargarContenido(data) {
	var template;
	var $divContent = $('#lista-eventos');
	var parseObj = JSON.parse(data);
	var arrayEv = parseObj.eventos;
	for (var i = 0; i < arrayEv.length; i++) {
		template = ['<a href="" class="evento__link">',
			'<div class="evento__card__element" >',
			'<img src="https://goo.gl/fBQvxw" alt="avatar" class="evento__imagen">',
			'<div class="evento__detalles">',
			'<div class="categoria">',
			'<h4 class="evento__categoria">' + arrayEv[i].categoria + '</h4>',
			'</div>',
			'<div class="titulo">',
			'<h3 class="evento__titulo">' + arrayEv[i].nombreEvento + '</h3>',
			'</div>',
			'<div class="descripcion">',
			'<p class="evento__descripcion">' + arrayEv[i].descripcion + '</p>',
			'</div>',
			'<div class="costo">',
			'<p class="evento__costo"> $ ' + arrayEv[i].costo + '</p>',
			'</div>',
			'<div class="fecha">',
			'<p class="evento__fecha">' + arrayEv[i].fecha + '</p>',
			'</div>',
			'</div>',
			'</div>',
			'</a>'].join("\n");
		$divContent.append(template);
		console.info('load data succesfully');
	}
}
