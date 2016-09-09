import React, { Component } from 'react';
import { render } from 'react-dom';
import Board from './Board';

class App extends Component {
  constructor() {
    super();
    this.state = {
      board: [
        [1,2,3,4],
        [5,6,7,8],
        [9,1,0,1],
        [13,1,0,1]
      ]
    }
  }
  render() {

		return (
			<div>
				<h1>Buddy Beats</h1>
				<Board boxState = {this.state.board}/>
			</div>
		)
  }
}

render(<App />, document.getElementById('app'));