var _groups = [{id:1, name: 'Animals'}, {id:2, name: 'Birds'}];

var _index = 0;

module.exports = {

	create: function (name) {
		_index++;
		var row = {id:_index, name:name};
		_groups.push(row);	
		return row;	
	},

	findByName: function(name) {

		var found = null;

		for (var i = 0; i<_groups.length; i++) {
			
			var row = _groups[i];

			if (row.name.toLowerCase() == name.toLowerCase()) {
				found = row;
			}
		}

		return found;

	},

	findById: function(id) {

		var found = null;

		for (var i = 0; i<_groups.length; i++) {
			
			var row = _groups[i];

			if (row.id == id) {
				found = row;
			}
		}

		return found;

	},

	all: function () {
		return _groups;
	}

};