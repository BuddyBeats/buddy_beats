const Board = require('./../models/boardModel');

//Create an object called userController to put methods on
//se we can export it below(really just doing this to use methods in userModel)
const boardController = {};
//Open connection to mongoose database
const mongoose = require('mongoose');


boardController.saveBoard = (request, response, next) => {
  console.log('you hit the save board route')
  console.log('you hit the saveBoardButton with:', request.body)
//   console.log('headers ', request.headers)
  //create new user using our USER model that we exported
  //then save it to the database

  const board = new Board(request.body);
  
  board.save(function(err) {
    if (err) throw err;
    console.log('User created!');
  });

  next()
};


boardController.getBoards = (request, response, next) => {
  console.log('you hit the save board route')
  console.log('you hit the saveBoardButton with:', request.body)

  Board.find({}, function(err, docs) {
    if (!err){ 
        // console.log(docs)
        response.boards = docs;
        console.log(response.boards)
        next();
    } else {throw err;}
  })



}

//

module.exports = boardController;