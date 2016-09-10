var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);

serverBoard = [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
      ];

app.use(express.static(__dirname +'./../')); //serves the index.html
app.use(bodyParser.urlencoded({extended: true}));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

function toggleServer(arr){
	if (serverBoard[arr[0]][arr[1]] === 0) {
      serverBoard[arr[0]][arr[1]] = 1;
  } else {
    serverBoard[arr[0]][arr[1]] = 0;
  }
}

//connects user to socket
io.on('connection', function(socket){
  //listens for first time client is rendered & sends serverBoard state to everyone
	socket.on('initialclientload', function(){
		socket.emit('sendserverboard',serverBoard);
		socket.broadcast.emit('sendserverboard',serverBoard);
	});

  //listens for 'toggle' event, grabs the array of the row, col, and val that were passed in, and broadcasts a 'togglereturn' event passing the array to the listeners
  socket.on('toggle', function(arr){
  	toggleServer(arr);
    socket.broadcast.emit('togglereturn', arr);
  });
  console.log('a user connnected');
});


//THIS HAS TO BE DOWN HERE OMG THAT WAS MY PROBLEM ALL ALONG
http.listen(3000,function(){
  console.log("Started on PORT 3000");
});