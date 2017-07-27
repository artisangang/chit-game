const path = require('path');
const express = require('express'), app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

require('dotenv').config({path: path.resolve(__dirname, '.env')});

// set server base directory
process.serverDir = path.resolve(__dirname);

require('./app/helpers');

const log = require('./app/lib/log');

global.model = require('./app/models');

const socketApp = require('./app/socket.app.js');

log.info('Starting game server at ' + (new Date));
log.info('Document Root: ' + path.resolve(__dirname, '..'));
log.info('Assets Path: ' + path.resolve(__dirname, '..', 'assets'));
log.info('Entry Point: ' + path.resolve(__dirname, '..', 'index.html'));

app.use(express.static( path.resolve(__dirname, '..', 'assets') ) );

app.get('/', function(req, res){
   res.sendFile( path.resolve(__dirname, '..', 'index.html') );
});

socketApp(io);

http.listen(process.env.PORT, () => {
  log.info('listening on *:' + process.env.PORT);
});
