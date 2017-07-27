
var card = {};

card.pass = function (data, response, socket, io) {

	console.log('adat is posted here');
	console.log(data);
	
	var player = model.user.findById(data.userId);
	var card = model.card.findById(data.cardId, data.gameId);

	console.log('Passed card is');
	console.log(card);

	var game = model.game.findById(data.gameId);

	var currentPlayerFromGame = model.game.findPlayerById(game.id, player.id);

	console.log(currentPlayerFromGame);

	var currentPlayerPosition = currentPlayerFromGame.position;

	var nxtPosition = Number(currentPlayerPosition) + 1;

	if (nxtPosition >= game.players.length) {
		nxtPosition = 0;
	}


	var nxtPlayer = model.game.findPlayerByPos(game.id, nxtPosition);

	nxtPlayer = model.user.findById(nxtPlayer.id);

	console.log('next player');
	console.log(nxtPlayer);

	response.to(nxtPlayer.socket_id, {card:card});


};


module.exports = card;