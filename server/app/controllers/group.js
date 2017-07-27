
var group = {};

group.get = function (data, response) {
	response.current( model.group.all() );
};

group.join = function (data, response, socket, io) {

	var group = model.group.findById(data.groupID);

	if (group.busy) {
		return socket.emit('group.busy', JSON.stringify(group));
	}

	var user = model.user.findByName(data.user);

	if (!user) {
		user = model.user.create(data.user, socket.id);
	}

	user.socket_id = socket.id;

	model.join.create(user.id, group.id);

	var players = model.join.findByGroupId(group.id);

	var data = {user:user,group:group, players: players};

	response.current( data );

	setTimeout(() => {
     io.sockets.emit('player.in.'+group.id, JSON.stringify(data));
    }, 500);
	

};


module.exports = group;