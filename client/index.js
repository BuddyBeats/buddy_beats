import React, { Component } from 'react';
import { render } from 'react-dom';
import Board from './Board';
import Player from './Player';


class App extends Component {
  constructor() {
    super();
    this.state = {
      username: 'funkmaster',
      board: [
        [1,0,0,0,1,1,1,1],
        [0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,1,0,1,1,1,1,1]
        ]
    }
    this.toggle = this.toggle.bind(this);
  }

  //alters color of each button on click
  toggle(row, col){
    var copy = this.state.board.slice();
    if (copy[row][col] === 0) {
      copy[row][col] = 1;
      this.setState({board: copy});
    } else {
      copy[row][col] = 0;
      this.setState({board: copy});
    }
  }

  //save state of board
  handleSubmit(){
    $.post('/setBoard',this.state);
  }

  render() {
		return (
			<div>
				<h1>Buddy Beats</h1>
        <form className = "saveform" >
          <input type="text" placeholder="name of board" />
          <input type="submit" value="Save Board" required = {true} onSubmit = {this.handleSubmit}/>
        </form>

				<Board boxState = {this.state.board} toggle = {this.toggle}/>
        <Player board = {this.state.board} />
			</div>
		)
  }
}

render(<App />, document.getElementById('app'));