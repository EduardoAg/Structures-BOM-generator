function populate_select() {

	var select = document.getElementsByClassName('estructuras');
	
	for (var i = 0; i < select.length; i++) {
		var dropdown = select[i]
		for (var j = dropdown.length-1; j >= 0; j--) {
			dropdown.remove(j)
		}
	}

	for (var i = 0; i < select.length; i++) {
		var dropdown = select[i];
		for (var j = 0; j < datosuno.length; j++) {
			var option = document.createElement('option');
			option.text = datosuno[j].nombre;
			option.value = datosuno[j].nombre;
			dropdown.add(option);
		}
	}
}

function addRow() {
	var tabla = document.getElementById('tablaUno');
	var tr = document.createElement("tr");
	var td1 = document.createElement("td");
	var td2 = document.createElement("td");
	var td3 = document.createElement("td");
	td1.innerHTML = '<select class="form-control estructuras"><option></option></select>';
	td2.innerHTML = '<input class="form-control input-width cellwidth" placeholder="Cantidad">'
	td3.innerHTML = '<button class="btn btn-danger btn-sm" onclick="borrar(this)" type="button">Borrar</button>'
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tabla.children[1].appendChild(tr)
	populate_select()
}
	
function borrar(element) {
	var tabla = document.getElementById('tablaUno');
	tabla.deleteRow(element.parentElement.parentElement.rowIndex);
}

function extraer_TablaConCheckbox(){
	var tabla = document.getElementById('tablaUno');
	var estructuras = [];
	var cantidad = []; 
	var infoTabla = [];
	for (var i = 1; i < tabla.rows.length-1 ; i++) {
   		for (var j = 0; j < tabla.rows[i].cells.length; j++) {
   			if (j == 0) {estructuras.push(tabla.rows[i].cells[j].children[0].options[tabla.rows[i].cells[j].children[0].selectedIndex].value);};
   			if (j == 1) {cantidad.push(parseFloat(tabla.rows[i].cells[j].children[0].value))};
   		} 
	}
	infoTabla.push(estructuras);
	infoTabla.push(cantidad);
	return infoTabla;
}

function calculo_Materiales() {
	var infoTabla = extraer_TablaConCheckbox();
	var materiales = [];
	var cantidades = []; 
	var arrayFinal = []
	//Datos Globales 
	datosuno; 
	for (var i = 0; i < infoTabla[0].length; i++) {
		for (var j = 0; j < datosuno.length; j++) {
			for (var k = 0; k < datosuno[j].materiales[0].length; k++) {
				if (infoTabla[0][i] === datosuno[j].nombre) {
					if (materiales.includes(datosuno[j].materiales[0][k])) {
						var index = materiales.indexOf(datosuno[j].materiales[0][k]);
						var cantidad = parseFloat(datosuno[j].materiales[1][k]);
						var total = infoTabla[1][i] * cantidad;
						cantidades[index] += total
					} else {
						materiales.push(datosuno[j].materiales[0][k]);
						var cantidad = parseFloat(datosuno[j].materiales[1][k])
						var total = infoTabla[1][i] * cantidad;
						cantidades.push(total);
					}
				}
			}
		}
	}
	arrayFinal.push(materiales);
	arrayFinal.push(cantidades);
	console.log(arrayFinal);
	return arrayFinal;
}

function descripcion_Materiales() {
	var materialesUtilizados = calculo_Materiales(); 
	var descripciones = [];
	var unidades = [];
	var codigo = [];
	var cantidad = [];
	var arrayFinal = []
	//materiales es variable global 
	for (var i = 0; i < materiales.length; i++) {
		for (var j = 0; j < materialesUtilizados[0].length; j++) {
			if (materialesUtilizados[0][j] === materiales[i].codigo) {
				console.log('De materiales utilizados: '+materialesUtilizados[0][j]);
				console.log('De lista de materiales: '+ materiales[i].codigo)
				console.log('Nombre de material en la lista: ' + materiales[i].nombre);
				descripciones.push(materiales[i].nombre);
				unidades.push(materiales[i].unidad);
				cantidad.push(materialesUtilizados[1][j]);
				codigo.push(materiales[i].codigo);
			}
		}
	}
	arrayFinal.push(descripciones);
	arrayFinal.push(unidades);
	arrayFinal.push(codigo);
	arrayFinal.push(cantidad)
	console.log(arrayFinal)
	return arrayFinal;
}


function generar_Tabla() {
	var container = document.getElementById('contenedorTabla');
	var descripciones = descripcion_Materiales();
	var materiales = calculo_Materiales(); 
	var tabla = document.createElement('table');
	tabla.classList.add('table');
	tabla.style.width = '100%';
    var thead = document.createElement('thead');
    var trhead = document.createElement('tr')
    trhead.innerHTML = "<th scope='col'>No</th><th scope='col'>Codigo</th><th scope='col'>Nombre</th><th scope='col'>Cantidad</th><th scope='col'>Unidad</th>"
    thead.appendChild(trhead);
	tabla.appendChild(thead);
	var tbdy = document.createElement('tbody');
	for (var i = 0; i < descripciones[0].length; i++) {
		var tr = document.createElement('tr');
		var td1 = document.createElement('td');
		var td2 = document.createElement('td');
		var td3 = document.createElement('td');
		var td4 = document.createElement('td');
		var td5 = document.createElement('td');
		td1.innerHTML = i + 1 ;
		td2.innerHTML = descripciones[2][i];
		td3.innerHTML = descripciones[0][i];
		td4.innerHTML = descripciones[3][i];
		td5.innerHTML = descripciones[1][i];
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		tr.appendChild(td5);
		tbdy.appendChild(tr);
	}
	tabla.appendChild(tbdy);
	container.appendChild(tabla);
}

function refrescar() {
	location.reload();
}

function redirigir() {
	window.open('index.html')
}
