var _users = [];

var _index = 0;

module.exports = {

	create: function (name, socket_id) {
		_index++;
		var row = {id:_index, name:name, socket_id:socket_id};
		_users.push(row);	
		return row;			
	},

	findByName: function(name) {

		var found = null;

		for (var i = 0; i<_users.length; i++) {
			
			var row = _users[i];

			if (row.name.toLowerCase() == name.toLowerCase()) {
				found = row;
			}
		}

		return found;

	},

	findById: function (id) {
		var found = null;

		for (var i = 0; i<_users.length; i++) {
			
			var row = _users[i];

			if (row.id == id) {
				found = row;
			}
		}

		return found;
	},
	findByScoketId: function (socket_id) {
		var found = null;

		for (var i = 0; i<_users.length; i++) {
			
			var row = _users[i];

			if (row.socket_id == socket_id) {
				found = row;
			}
		}

		return found;
	},
	all: function () {
		return _users;
	}
};