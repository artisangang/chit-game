import template from './join.html';

import {component} from 'engine';
import {animate} from 'engine';


@component({
	selector:'join',
	template: template
})

export default class join {

	
	constructor() {		
		
	}	

	@animate({in: {
		key:'slide',
		from:'left',
		duration:'0.5s',
	}, out:{
		key:'slide',
		to:'right',
		duration:'0.5s'
	}})
	init() {
		this.groupId = this.param('groupId');
	}

	joinGroup() {
	 	var input = this.elementRef.querySelector('.selectedGroup #user');	
	 	socket.emit('group.join', {user: input.value, groupID: this.groupId});
	 	window.socket.on('group.join.response', (e) => { this.gorupJoined(e) });
	}

	groupJoined(e) {	


  	let _playerIdentity = JSON.parse(e); 

  	/*var playerCounter = play.querySelector('#playersCount');

	  playerCounter.innerHTML = _playerIdentity.players.length;

	  // on new player
	  socket.on('player.in.'+_playerIdentity.group.id, function (data) {
	    var res = JSON.parse(data);
	    playerCounter.innerHTML = res.players.length;
	  });*/

	}

	

	rendered() {

	}

	destroy() {
		window.socket.removeListener('group.join.response', (e) => { this.gorupJoined(e) });
	}

}