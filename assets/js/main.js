 var socket = io(), _selectedGroup, _socketID, _gameId, _cards, _playerIdentity, _gorupID, _players = [], _stack = {};

function animate(element, property, value, delay) {
	element.style[property]
}

function redraw() {

	var wheight = window.height || window.innerHeight  
	document.getElementById('stage').style.height = wheight + 'px'; 

}

window.addEventListener("resize", redraw);

 document.addEventListener('DOMContentLoaded', function () {
 	 document.removeEventListener( "DOMContentLoaded", this, false );

 	 redraw();
 });

 function selectGroup(gorup) {

 	var group = document.getElementById('group');
 	_stack.group = group;
 	group.className += ' slide-out';
 	setTimeout(function () {
 		group.outerHTML = '';
 	}, 500);

 	_selectedGroup = gorup;

 	var join = document.getElementById('join');

 	join.className = 'page activating';

 	setTimeout(function () {
 		join.className = 'page slide-in';
 	}, 100);	
 }

 function joinGroup() {
 	var join = document.getElementById('join');
 	var user = join.querySelector('.selectedGroup #user');
 	socket.emit('group.join', {user: user.value, sockedId: _socketID, groupID: _selectedGroup});
 }


socket.on('connect', function () {
	_socketID = socket.id;
	// get groups from server
	socket.emit('group.get', {sockedId:_socketID});
});

// group response   
socket.on('group.get.response', function(data) {

  var groups = JSON.parse(data);

  var gorup = document.getElementById('group');

  var ul = gorup.querySelector('.list ul');

  for (var i = 0; i < groups.length; i++) {          
      var row = groups[i];
      ul.innerHTML += '<li onclick="selectGroup(' + row.id +')">'+row.name+'</li>';   

  }

  

});

// if busy
socket.on('group.busy', function(data) {
  alert('This group is busy.');
});

// after join response   
socket.on('group.join.response', function(data) {

  var join = document.getElementById('join');
  _stack.join = join;
  join.className += ' slide-out';
  setTimeout(function () {
    join.outerHTML = '';
  }, 500);


  var play = document.getElementById('play');

  play.className = 'page activating';

  setTimeout(function () {
    play.className = 'page slide-in';
  }, 100);  


  _playerIdentity = JSON.parse(data); 

  var playerCounter = play.querySelector('#playersCount');

  playerCounter.innerHTML = _playerIdentity.players.length;

  // on new player
  socket.on('player.in.'+_playerIdentity.group.id, function (data) {
    var res = JSON.parse(data);
    playerCounter.innerHTML = res.players.length;
  });

});

function startGame() {
  document.getElementById('startGame').style.display = 'none';
  socket.emit('game.start', {groupId:_playerIdentity.group.id, userId:_playerIdentity.user.id});
}

function players() {

  var html = 'Game is not started yet.';

  if (_players.length) {
    html = '<ul>';
    for (var i = 0; i < _players.length; i++) {
      html += '<li>'+_players[i].name+'</li>'
    }
    html += '<ul>';

  }

  dialogX.alert({
      message: html,
      buttonText: 'Got It!', 
      title:'Info'
    });
}

// on game started
socket.on('game.started', function(data) {
  document.getElementById('startGame').style.display = 'none';
  document.getElementById('waiting').style.display = 'none';
  document.getElementById('endGame').style.display = 'block';
  var data = JSON.parse(data);

  _cards = data.cards;
  _players = data.players;
  _gameId = data.gameId;

  var play = document.getElementById('play');

  var list = play.querySelector('#cards');

  for (var c = 0; c < _cards.length; c++) {
    var card = _cards[c];
    list.innerHTML += `<li>
                          <div class="left">` + card.name + ` (`+ card.score +`)</div>
                          <div class="right"><button class="btn btn-pass" onclick="passon(`+card.id+`, this)">Pass</button></div>
                        </li>`;
  }

  if (data.startedBy != _playerIdentity.user.id) {
    var passbtns = document.querySelectorAll('btn-pass');
    if (passbtns.length) {
      for (var i = 0; i < passbtns.length; i++) {
        passbtns[i].style.display = 'none'
      }
    }
  }

});


function endGame() {
  socket.emit('game.end', {groupId:_playerIdentity.group.id});
}

function passon(cardid, ele) {
  //console.log({gameId:_gameId, cardId:cardid, userId:_playerIdentity.user.id});

  ele.parentElement.parentElement.outerHTML = '';

  socket.emit('card.pass', {gameId:_gameId, cardId:cardid, userId:_playerIdentity.user.id});
}

 socket.on('card.pass.response', function (data) {
    data = JSON.parse(data);

    console.log(data);

     var play = document.getElementById('play');

    var list = play.querySelector('#cards');

    var card = data.card;

     list.innerHTML += `<li class="new-pass">
                          <div class="left">` + card.name + ` (`+ card.score +`)` + `</div>
                          <div class="right"><button class="btn" onclick="passon(`+card.id+`, this)">Pass</button></div>
                        </li>`;

    setTimeout(function () {
      var newPass = document.getElementsByClassName('new-pass');

      while(newPass[0]) {
          newPass[0].parentNode.removeChild(newPass[0]);
      }​
    }, 3000);

 });
