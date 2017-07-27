var _game = [];

var _index = 0;

module.exports = {

	create: function (group_id,players, started_by) {
		_index++;

		var members = [];

		var playerPos = 1;

		for (var p = 0; p < players.length; p++) {
			var player = players[p];

			if (player.id == started_by) {
				player.position = 0;
			} else {
				player.position = playerPos;
				playerPos++;	
			}		

			members.push(player);
		}

		var row = {id:_index, group_id:group_id, players:members};
		_game.push(row);	
		return row;	
	},

	findByGroupId: function(id) {

		var found = null;

		for (var i = 0; i<_game.length; i++) {
			
			var row = _game[i];

			if (row.group_id == id) {
				found = row;
			}
		}

		return found;

	},

	findById: function(id) {

		var found = null;

		for (var i = 0; i<_game.length; i++) {
			
			var row = _game[i];

			if (row.id == id) {
				found = row;
			}
		}

		return found;

	},

	findPlayerByPos: function(id, pos) {

		var found,foundPlayer;

		for (var i = 0; i<_game.length; i++) {
			
			var row = _game[i];

			if (row.id == id) {
				found = row;
			}
		}

		if (found) {
			for (let i = 0; i < found.players.length; i++) {
				var player = found.players[i];

				if (player.position == pos) {
					foundPlayer = player;
				}

			}
		}

		return foundPlayer;

	},


	findPlayerById: function(id, player_id) {

		var found,foundPlayer;

		for (let i = 0; i<_game.length; i++) {
			
			let row = _game[i];

			if (row.id == id) {
				found = row;
			}
		}

		if (found) {
			for (let i = 0; i < found.players.length; i++) {
				let player = found.players[i];

				if (player.id == player_id) {
					foundPlayer = player;
				}

			}
		}

		return foundPlayer;

	},


	all: function () {
		return _game;
	}

};