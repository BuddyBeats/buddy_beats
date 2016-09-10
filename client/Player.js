import React, { Component } from 'react';
import { render } from 'react-dom';

class Player extends Component {
	constructor() {
		super();
    this.toggleStop = this.toggleStop.bind(this);
    this.toggleStart = this.toggleStart.bind(this);
    this.state = {
      looping: false,
      bpm: 160
    }
	}

	componentDidMount() {
		console.log("buffer list", bufferList)
  }

  // finishedLoading(bufferList) {
  //   this.setState({
  //     bufferList: bufferList
  //   }, () => {
  //     if(this.state.looping){
  //       this.playLoop(bufferList, this.state.bpm, this.props.board);
  //     }
  //   })
  // }

//Plays loop.  input is a buffer list of sounds and a speed variable.
//BPM is beats per minute
  playLoop(bufferList, bpm, board, loop = 0) {
    let rowLength = 8;
    let buffLen = bufferList.length;
    let speedRatio = bpm / 60;
    //this is where the loop will live
    for (var i = 0; i < 8; i++) {
      if (board[0][i % rowLength]) {
        this.playSound(bufferList[0], i / speedRatio);
      }
      if (board[1][i % rowLength]) {
        this.playSound(bufferList[1], i / speedRatio);
      }
      if (board[2][i % rowLength]) {
        this.playSound(bufferList[2], i / speedRatio);
      }
      if (board[3][i % rowLength]) {
        this.playSound(bufferList[3], i / speedRatio);
      }
    }

    if (this.state.looping) {
      //Loop + 4 is hard-coded for a 4-column board
      setTimeout(() => {
        this.playLoop(bufferList, bpm, board, loop + 8);
      }, 3000) //this value is a function of the BPM. If you want to change the bpm, you'll have to update this value
    }

  }

  playSound(buffer, time) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(context.currentTime + time);
  }
	
  toggleStop() {
    this.setState({
      looping: false
    })
  }

  toggleStart() {
    console.log("buffer list available to toggleStart", bufferList)
    this.playLoop(bufferList, this.state.bpm, this.props.board)
  }

	render() {
		return (
			<div>
      <button onClick={this.toggleStop}>click here to stop</button>
			<button onClick={this.toggleStart}>click here to start</button>
			</div>
			)
	}
}

module.exports = Player;