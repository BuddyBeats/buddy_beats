var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);

app.use(express.static(__dirname +'./../')); //serves the index.html
app.use(bodyParser.urlencoded({extended: true}));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

//connects user to socket
io.on('connection', function(socket){
  //listens for 'toggle' event, grabs the array of the row, col, and val that were passed in, and broadcasts a 'togglereturn' event passing the array to the listeners
  socket.on('toggle', function(arr){
    socket.broadcast.emit('togglereturn', arr);
  });
  console.log('a user connnected');
});


//THIS HAS TO BE DOWN HERE OMG THAT WAS MY PROBLEM ALL ALONG
http.listen(3000,function(){
  console.log("Started on PORT 3000");
});