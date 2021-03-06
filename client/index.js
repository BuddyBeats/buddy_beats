import React, { Component } from 'react';
import { render } from 'react-dom';
import Board from './Board';
import Player from './Player';

import Selector from './Selector';


var socket = io();


class App extends Component {
  constructor() {
    super();
    this.state = {
      boardname: '',
      board: [
        [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      ],
      dropdownValue: 0,
      bpm: 160
    }
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBoardNameChange = this.handleBoardNameChange.bind(this);
    this.changeBoard = this.changeBoard.bind(this);
    this.catchToggle = this.catchToggle.bind(this);
    this.catchServerBoard = this.catchServerBoard.bind(this);
    this.catchServerBoardChange = this.catchServerBoardChange.bind(this);
    this.catchTimestamp = this.catchTimestamp.bind(this);

  }

  //alters color of each button on click
  toggle(row, col){
   
    //emit 'toggle' event on click of each button, passing in the row & col of the button clicked and its value
    socket.emit('toggle', [row, col, this.state.board[row][col]]);
    var copy = this.state.board.slice();
    copy[row][col] = (copy[row][col] === 1) ? 0 : 1;
    this.setState({board:copy});
  }

  //save state of board
  handleSubmit(e){
    e.preventDefault();
    var that = this;
    $.post('/saveBoard',{name: that.state.boardname, board: that.state.board}, function(){
      console.log('successful save');
     that.setState({boardname: ""})
    }).then(() => {
        socket.emit('updateDropdown');
        $.get('/getBoards', (result) => {
          var validBoards = result
                            .map((boardObj) => {
                              boardObj.board = boardObj.board.map((arr) => {
                                return arr.map(Number)
                              })
                              return {
                                name: boardObj.name, 
                                board: boardObj.board}})
                            .filter((boardObj) => {
                              return (boardObj.board.length > 0);
                            })
        this.setState({otherBoards: validBoards});
      });
    });
    this.refs.textinput.value = "";

  }


  catchServerBoardChange(serverBoardArr) {
    console.log("caught serverboardchange", serverBoardArr)
    this.setState({board: serverBoardArr[0], boardname: serverBoardArr[1], dropdownValue: serverBoardArr[2]})//might be boardname
  }

  componentDidMount(){
    //this makes a request to board on server
    socket.on('serverboardchanged', this.catchServerBoardChange);
    socket.emit('initialclientload');
    socket.on('sendserverboard', this.catchServerBoard);
    socket.on('togglereturn', this.catchToggle);
    socket.on('initUpdateDropdown', () => {
      $.get('/getBoards', (result) => {
        var validBoards = result
                        .map((boardObj) => {
                          boardObj.board = boardObj.board.map((arr) => {
                            return arr.map(Number)
                          })
                          return {
                            name: boardObj.name, 
                            board: boardObj.board}})
                        .filter((boardObj) => {
                          return (boardObj.board.length > 0);
                        })
        this.setState({otherBoards: validBoards});
      });
    })

    $.get('/getBoards', (result) => {
      var validBoards = result
                        .map((boardObj) => {
                          boardObj.board = boardObj.board.map((arr) => {
                            return arr.map(Number)
                          })
                          return {
                            name: boardObj.name, 
                            board: boardObj.board}})
                        .filter((boardObj) => {
                          return (boardObj.board.length > 0);
                        })
      this.setState({otherBoards: validBoards});
    });
  }

  handleBoardNameChange(e) {
    this.setState({boardname: e.target.value})
  }
  catchServerBoard(serverBoard){
    this.setState({board: serverBoard});
  }


  catchToggle(returnarr){
    //sets the state to update value of clicked button. returnarr is [row,col,val]
    var copy = this.state.board.slice();
    var returnRow = returnarr[0];
    var returnCol = returnarr[1];
    var returnVal = returnarr[2];
    copy[returnRow][returnCol] = (returnVal === 0) ? 1 : 0;
    this.setState({board: copy});

  }

  changeBoard(e) {

    var boardToSet = this.state.otherBoards[e.target.value]
    socket.emit('boardChange', [boardToSet.name, boardToSet.board, e.target.value]);

    this.setState({
      board: boardToSet.board,
      name: boardToSet.name,
      dropdownValue: e.target.value
    })

    // var newBoard = this.state.otherBoards[1];

    // this.setState({
    //   name: newBoard.name,
    //   board: newBoard.board
    // })
  }
  catchTimestamp(e) {
    for (let val of Object.keys(e)) {
      console.log(val);
    }
    console.log(e.timeStamp)

  }
  render() {
		return (
			<div>
				<h1>Buddy Beats</h1>
        <form className="saveform" onSubmit = {this.handleSubmit}>    
          <input type="text" className="mdl-textfield__input" ref="textinput" required={true} onChange={this.handleBoardNameChange} placeholder="Name your board!" />
          <input id = "submitButton" type="submit" placeholder="Save Board" required = {true} />
        </form>        
        <Selector dropdownValue={this.state.dropdownValue} boards={this.state.otherBoards} changeBoard={this.changeBoard}> </Selector>
				<Board boxState={this.state.board} toggle={this.toggle}/>
        <Player board={this.state.board} />
        <button onClick={this.catchTimestamp}>click me</button>
			</div>
		)
  }
}

render(<App />, document.getElementById('app'));