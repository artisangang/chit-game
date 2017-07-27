
var game = {};

game.start = function (data, response, socket, io) {

	var cards = model.card.findByGroupId(data.groupId);

	var usedCards = {};

	var players = model.join.findByGroupId(data.groupId);

	console.log('Players in current group...');
	console.log(players);

	var totalPlayers = players.length;

	var _lastAssignedCard = null;

	function generateCards(max) {

		if (max < 4) {
			max = 4;
		}

		var rand = Math.floor((Math.random() * (max -1) ));

		if (rand == _lastAssignedCard) {
			rand = Math.floor((Math.random() * (max -1) ));
		}

		_lastAssignedCard = rand;

		var selected = cards[rand];

		if (typeof usedCards[selected.id] == 'undefined') {
			usedCards[selected.id] = 1;
		} else {
			usedCards[selected.id] += 1;
		}

		if (usedCards[selected.id] > 4) {
			return generateCards(max);
		}

		return selected;
	}

	var playerUsers = {};

	for (var i = 0; i < totalPlayers; i++) {

			var currentPlayer = model.user.findById(players[i].user_id);			
			currentPlayer.cards = [];	
			playerUsers[currentPlayer.id]  = currentPlayer;
		}

	var _players = [];

	

	// loop each player and assign card
	for (var i = 0; i < totalPlayers; i++) {

		var currentPlayer = playerUsers[players[i].user_id];				

		// loop for howa many cards to distribute
		for (var c = 1; c <= 4; c++) {
			currentPlayer.cards.push( generateCards(totalPlayers,c) );
		}
		_players.push(currentPlayer);

		
	}		
		
	

	var game = model.game.create(data.groupId, _players, data.userId);

	var startedBy = model.user.findById(data.userId);

	for (let i = 0; i < totalPlayers; i++) {
		let currentPlayer = playerUsers[players[i].user_id];
		io.sockets.connected[currentPlayer.socket_id].emit('game.started', JSON.stringify({cards: currentPlayer.cards, players: _players, gameId: game.id, startedBy:startedBy}));
	}
	

};

module.exports = game;