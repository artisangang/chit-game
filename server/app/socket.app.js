const controller = require('./controllers');


module.exports = function (io) {


  // on new connection
	io.on('connection', function(socket){

		socket.use((packet, next) => {

		   var eventName = packet[0];
		   var data = packet[1];

		   var eventArray = eventName.split('.');

		   var controllerName = eventArray[0];
		   var actionName = eventArray[1];

		   var response = {

        current: function (data) {
		   	  socket.emit(eventName + '.response', JSON.stringify(data));
		   		next();
		    },
        to: function (id, data) {
          io.sockets.connected[id].emit(eventName + '.response', JSON.stringify(data));
          next();
        },
        all: function (data) {
            io.sockets.emit(eventName + '.response', JSON.stringify(data));
          next();
        }

      };
		   try {	
		       controller[controllerName][actionName]( data, response, socket, io);	
		   } catch(e) {
		   		console.error(e);
		   }	
		    
		 });



  socket.on('start', function(){

    var requiredPlayers = 4;

    var livePlayers = Object.size(_joins);

    var missingPlayers = requiredPlayers - livePlayers;

    if (missingPlayers > 0) {
      for (var p = 0; p <= missingPlayers; p++) {
        var index = Math.floor((Math.random() * 10) + 1);
        _joins[index] = {id:1,socket_id:index};
      }
    } 

    for (var k in _joins) {

      for (var i = 0; i < 4; i++) {
        var card = generateCards(i); 
        if (typeof _playerCards[k] == 'undefined') {
          _playerCards[k] = [card];
        } else {
          _playerCards[k].push(card);
        }
               
      }
      io.sockets.socket(k).emit('cards', JSON.stringify(_playerCards[k]));
    }
    
    socket.emit('started', 'done');

  });

  socket.on('disconnect', function(){

    var user = model.user.findByScoketId(socket.id);

    if (user) {

      var data =  model.join.findByUserId(user.id);

      model.join.deleteByUserId(user.id);

      var group = model.group.findById(data.group_id);

      if (group) {
        var players = model.join.findByGroupId(group.id);

        data = {user:user,group:group, players: players};
      
        setTimeout(() => {
         io.sockets.emit('player.in.'+group.id, JSON.stringify(data));
        }, 500);
      }
      
    }

  });

});


};