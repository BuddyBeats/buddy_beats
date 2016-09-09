var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var app = express();

const userController = require('./userController');

app.use(express.static(__dirname +'./../')); //serves the index.html
app.use(bodyParser.json());
// // app.use(express.urlencoded());
// // app.set('port', process.env.PORT || 8080);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
    res.send('hello world');
});

app.post('/save', userController.createUser, function(req,res,next){
    console.log('you made a post request to /');
    res.status(200);
    res.send();
});


//THIS HAS TO BE DOWN HERE OMG THAT WAS MY PROBLEM ALL ALONG
app.listen(3000,function(){
  console.log("Started on PORT 3000");
})