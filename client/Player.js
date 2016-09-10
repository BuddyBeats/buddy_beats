import React, { Component } from 'react';
import { render } from 'react-dom';

class Player extends Component {
	constructor() {
		super();
    this.toggleStop = this.toggleStop.bind(this);
    this.toggleStart = this.toggleStart.bind(this);
	}
  //be careful opening up more than 1 audio context per page refresh.
  //  This can cause some pretty awful audio bugs.
	componentDidMount() {
		var context;
		var bufferLoader;
  	window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
    bufferLoader = new BufferLoader(
      context,
      [
      //These are the drum samples
        './samples/kick.wav',
        './samples/clap.wav',
        './samples/snare.wav',
        './samples/hihat.wav'

      ],
      this.finishedLoading.bind(this)
    );

    this.setState({
      context: context,
      looping: false,
      bpm: 160
      }, bufferLoader.load()) // bufferLoader must be a callback to this state change

  }

  finishedLoading(bufferList) {
    this.setState({
      bufferList: bufferList
    }, () => {
      if(this.state.looping){
        this.playLoop(bufferList, this.state.bpm, this.props.board);
      }
  })
}

//Plays loop.  input is a buffer list of sounds and a speed variable.
//BPM is beats per minute
  playLoop(bufferList, bpm, board, loop = 0) {
    //hard coded for 8 columns.  If you want to add more columns, you have to change this
    let rowLength = 8;
    let buffLen = bufferList.length;
    let speedRatio = bpm / 60;
    // the terminating case for i is hard-coded for 8 columns
    for (var i = 0; i < 8; i++) {
      //If you add another row, you have to add another if loop here.
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
      //Loop + 8 is hard-coded for an 8-column board
      //Be very careful with the number passed in to setTimeout.
      //Easy to blow the stack and trigger hundreds of samples per second.
      setTimeout(() => {
        this.playLoop(bufferList, bpm, board, loop + 8);
      }, 3000) //this value is a function of the BPM. If you want to change the bpm,
              // you'll have to update this value using math or your ear.
    }

  }

  playSound(buffer, time) {
    var source = this.state.context.createBufferSource();
    source.buffer = buffer;
    source.connect(this.state.context.destination);
    source.start(this.state.context.currentTime + time);
  }

  //toggle stop terminates the loop.  Audio sounds cued up will continue to play.
  //Will terminate at the end of the loop playing.
  toggleStop() {
    this.setState({
      looping: false
    })
  }

  toggleStart() {
    if (this.state.looping) return;
    this.setState({
      looping: true
    }, () => {
      this.playLoop(this.state.bufferList, this.state.bpm, this.props.board)
    })
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