import React, { Component } from 'react';
import { render } from 'react-dom';
import Board from './Board';
import Player from './Player';
import Selector from './Selector';


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
    this.changeBoard = this.changeBoard.bind(this);
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
    this.setState({boardname: ""})
    $.post('/saveBoard',{name: this.state.boardname, board: this.state.board}, function(){
      console.log('successful save');
    });
  }
  handleBoardNameChange(e){
    this.setState({boardname: e.target.value})
  }
  componentDidMount(){
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

  changeBoard(e) {
    
    var boardToSet = this.state.otherBoards[e.target.value]
    this.setState({
      board: boardToSet.board,
      name: boardToSet.name
    })
    // var newBoard = this.state.otherBoards[1];

    // this.setState({
    //   name: newBoard.name,
    //   board: newBoard.board
    // })
  }
  render() {
		return (
			<div>
				<h1>Buddy Beats</h1>
        <Selector boards={this.state.otherBoards} changeBoard={this.changeBoard}> </Selector>
        <form className = "saveform" onSubmit = {this.handleSubmit}>
          <input type="text" value = {this.state.boardname} placeholder="Name your board!" onChange = {this.handleBoardNameChange}/>
          <input type="submit" placeholder="Save Board" required = {true} />
        </form>

				<Board boxState = {this.state.board} toggle = {this.toggle}/>
        <Player board={this.state.board} />
        <button onClick={this.changeBoard}>click to change board</button>
			</div>
		)
  }
}

render(<App />, document.getElementById('app'));