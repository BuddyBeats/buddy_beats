import React, { Component } from 'react';
import { render } from 'react-dom';
import Board from './Board';
import Player from './Player';


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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBoardNameChange = this.handleBoardNameChange.bind(this);
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
  handleSubmit(e){
    e.preventDefault();
    
    $.post('/saveBoard',{name: this.state.boardname, board: this.state.board}, function(){
      console.log('successful save');
    });
  }
  handleBoardNameChange(e){
    this.setState({boardname: e.target.value})
  }
  componentDidMount(){
    $.get('/getBoards', function(result){
      console.log('allboards:', result);
    });
  }

  render() {
		return (
			<div>
				<h1>Buddy Beats</h1>
        <form className = "saveform" onSubmit = {this.handleSubmit}>
          <input type="text" value = {this.state.boardname} placeholder="name of board" onChange = {this.handleBoardNameChange}/>
          <input type="submit" placeholder="Save Board" required = {true} />
        </form>

				<Board boxState = {this.state.board} toggle = {this.toggle}/>
        <Player board = {this.state.board} />
			</div>
		)
  }
}

render(<App />, document.getElementById('app'));