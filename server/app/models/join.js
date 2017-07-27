var _join = [];
var _index = 0;


module.exports = {

	create: function (user_id, group_id) {
		_index++;
		_join.push({id:_index, user_id:user_id, group_id:group_id});		
	},

	findByGroupId: function(id, user_id) {

		var found = [];

		for (var i = 0; i<_join.length; i++) {
			
			var row = _join[i];

			if (!user_id) {
				if (row.group_id == id) {
					found.push(row);
				}
			}

			if (user_id) {
				if (row.group_id == id && user_id == row.user_id) {
					found.push(row);
				}
			}
		}

		return found;

	},

	findByUserId: function (user_id) {

		var found;

		for (var i = 0; i<_join.length; i++) {
			
			var row = _join[i];

			if (user_id == row.user_id) {
				found = row;
			}
			
		}

		return found;

	},

	deleteByUserId: function (user_id) {
	
		for (var i = 0; i<_join.length; i++) {
			
			var row = _join[i];

			if (user_id == row.user_id) {
				_join.splice(i,1); 
				//delete _join[i];
			}
			
		}		

	},

	all: function () {
		return _join;
	}

};