import styles from './group.scss';

import template from './group.html';

import {component} from 'engine';
import {animate} from 'engine';


@component({
	selector:'group',
	template: template
})
export default class group {


	
	constructor() {

		window.socket.on('connect', () => {
			console.log('connected to server...');
			this.getGroups();
		});
		 
	}	
	
	@animate({in: {
		key:'slide',
		from:'right',
		duration:'0.7s',
	}, out:{}})

	init() {
		

		
	}

	getGroups() {
		window.socket.emit('group.get', {});
		window.socket.on('group.get.response', (e) => { this.groupsList(e) });
	}

	groupsList(data) {

	  var groups = JSON.parse(data);

	  var listing = this.elementRef.querySelector('ul#list');


	  for (var i = 0; i < groups.length; i++) {          
	      var row = groups[i];

	      let li = document.createElement('li');

	      li.setAttribute('data-group', row.id);

	      li.innerHTML = row.name;	

	      li.onclick = (e) => { this.selectGroup(e) };

	      listing.appendChild(li);  
	  }

	}


	selectGroup(e) {
			alert(e.target.getAttribute('data-group'));
	}

	rendered() {

	}

	destroy() {
		window.socket.removeListener('group.get.response', this.groupsList);
	}

}