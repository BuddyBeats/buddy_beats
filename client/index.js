import React, { Component } from 'react';
import { render } from 'react-dom';
import Board from './Board';
import Player from './Player';
var socket = io();

class App extends Component {
  constructor() {
    super();
    this.state = {
      boardname: '',
      board: [
        [1,0,0,0,1,0,0,0],
        [0,0,1,0,0,0,1,0],
        [0,0,0,0,0,0,0,0],
        [0,1,0,1,0,1,0,1]
      ]
    }
    this.toggle = this.toggle.bind(this);
    this.catchToggle = this.catchToggle.bind(this);
  }

  //alters color of each button on click
  toggle(row, col){
    //emit 'toggle' event on click of each button, passing in the row & col of the button clicked and its value
    socket.emit('toggle', [row, col, this.state.board[row][col]]);
    var copy = this.state.board.slice();
    if (copy[row][col] === 0) {
      copy[row][col] = 1;
      this.setState({board: copy});
    } else {
      copy[row][col] = 0;
      this.setState({board: copy});
    }
  }

  componentDidMount(){
    socket.on('togglereturn', this.catchToggle);
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

  render() {
		return (
			<div>
				<h1>Buddy Beats</h1>
				<Board boxState = {this.state.board} toggle = {this.toggle}/>
        <Player board = {this.state.board} />
			</div>
		)
  }
}

render(<App />, document.getElementById('app'));