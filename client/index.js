import React, { Component } from 'react';
import { render } from 'react-dom';
import Board from './Board';
import Player from './Player';
class App extends Component {
  constructor() {
    super();
    this.state = {
      board: [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
      ]
    }
    this.toggle = this.toggle.bind(this);
  }
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
  render() {
		return (
			<div>
				<h1>Buddy Beats</h1>
				<Board boxState = {this.state.board} toggle = {this.toggle}/>
        <Player />
			</div>
		)
  }
}

render(<App />, document.getElementById('app'));