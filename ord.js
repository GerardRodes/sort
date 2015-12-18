var XSIZE = 175;
var YSIZE = 175;
var DELAY = 10*2;

function generate(i, j){
	var xMax = i;
	var yMax = j;
	var table = new Array();

	for(x = 0; x < xMax; x++){
		table[x] = Math.floor(Math.random()*yMax);
	}

	return table;
}

function prinTable(table){
	html = "<table>";

	for(x = 0; x < table.length; x++){
		html += '<tr id="'+x+'">';
		for(y = 0; y < table.length; y++){
			html += '<td id="'+x+"-"+y+'"></td>';
		}
		html += "</tr>";
	}
	html += "</table>";

	return html;
}

function renderDots(table){
	for(x = 0; x < table.length; x++){
		for(y = 0; y < table.length; y++){
			if(y == table[x]){
				$('#'+x+"-"+y).addClass('true');
			}else $('#'+x+"-"+y).removeClass('true');
		}
	}
}

function seleccion(table){
	$('#metodo').html("En cada iteración, se selecciona el menor elemento del subvector no ordenado y se intercambia con el primer elemento de este subvector");

	//console.log("table length: "+table.length);

	var ordenados = 0;
	var posMin;

	function loop () {
		setTimeout(function () {
			var clean = [];
			highligth(clean ,table);
			renderDots(table);
		}, DELAY);

		setTimeout(function () {

			var min = YSIZE;

			//console.log("ord:"+ordenados);
			for(var x = ordenados; x < table.length; x++){
				if (table[x] < min){
					min = table[x];
					posMin = x;
				}
			}
			//console.log("table["+posMin+"]: "+table[posMin]);

			var highDots = [posMin];
			console.log("POS MIN: "+posMin);
			highligth(highDots, table);

			for(var x = posMin; x > ordenados; x--){
				var aux = table[x];
				table[x] = table[x-1];
				table[x-1] = aux;
				console.log(table[x-1]+" - "+table[x]);
			}

			ordenados++;
			if (ordenados <= XSIZE) {
				loop();
			}else {
				console.log("clean");
				var clean = [];
				highligth(clean ,table);
			}
		}, DELAY)
	}
	loop();
	
}

function highligth(array, table){

	//ID = #posicionEnTabla-valor
	for(x = 0; x < XSIZE; x++){
		for(y = 0; y < YSIZE; y++){
			$("#"+x+"-"+y).removeClass('highligth');
		}
	}

	for(x = 0; x < array.length; x++){
		array[x] = "#"+array[x]+"-"+table[array[x]];
		console.log(array[x]);
		$(array[x]).addClass('highligth');
	}
}

$(document).ready(function(){

	var table = generate(XSIZE, YSIZE);

	$('#tabla').html(prinTable(table));
	renderDots(table);

	$('#reiniciar').click(function(){
		table = generate(XSIZE, YSIZE);
		$('#tabla').html(prinTable(table));
		renderDots(table);
	})

	$('#seleccion').click(function(){
		seleccion(table);
	})
})