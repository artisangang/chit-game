import application from './components/main.js';
import {boot} from 'engine'; 

let app = new application;

window.socket = io();

window._game = {	
	group:null,
	game:null,
	card:null,
	player:null,

	//collection
	cards:[],
	groups:[],
	players: []
};

function redraw() {
	var wheight = window.height || window.innerHeight  
	document.querySelector('app').style.height = wheight + 'px'; 
}

window.addEventListener("resize", redraw);

document.addEventListener('DOMContentLoaded', function () {
 	 document.removeEventListener( "DOMContentLoaded", this, false );

 	 redraw();
});

boot(app);