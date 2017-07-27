var _cards = {
			'1': [
		      {name:'ਇੱਲ', score: 100, id:2},		
			  {name:'ਮੋਰ', score: 80, id:1},			  
			  {name:'ਕਾ', score: 50, id:3},
			  {name:'ਚਿੜੀ', score: 30, id:4}
			],
			'2': [
			  {name:'ਖ਼ਰਗੋਸ਼', score: 100, id:1},
			  {name:'ਸੱਪ', score: 80, id:2},
			  {name:'ਕਿਰਲੀ', score: 50, id:3},
			  {name:'ਡੱਡੂ', score: 30, id:4}
			]
		};


module.exports = {
	findByGroupId: function (id) {
		return _cards[id] || false;
	},
	findById: function(id, group_id) {

		console.log('finding card by id: ' + id);

		var found = null;

		for (var i = 0; i < _cards[group_id].length; i++) {
			
			var row = _cards[group_id][i];
			console.log('current card in comparision');
			console.log(row);

			if (row.id == Number(id)) {
				found = row;
			}
		}

		console.log('card find by id : ' + id + ' results -> ');
		console.log(found);

		return found;

	},
	all: function () {
		return _cards;
	}
};