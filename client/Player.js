import React, { Component } from 'react';
import { render } from 'react-dom';

class Player extends Component {
	constructor() {
		super();
    this.toggleStop = this.toggleStop.bind(this);
    this.toggleStart = this.toggleStart.bind(this);
	}

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
      looping: true,
      bpm: 160
      }, bufferLoader.load()) // bufferLoader must be a callback to this state change

    // let sampleBoard = this.props.board;
  }

  finishedLoading(bufferList) {
    this.setState({
      bufferList: bufferList
    }, () => {
      this.playLoop(bufferList, this.state.bpm, this.props.board)});
  }

//Plays loop.  input is a buffer list of sounds and a speed variable.
//BPM is beats per minute
  playLoop(bufferList, bpm, board, loop = 0) {
    let rowLength = 4;
    let buffLen = bufferList.length;
    let speedRatio = bpm / 60;
    //this is where the loop will live
    for (var i = 0; i < 4; i++) {
      console.log(i / speedRatio)
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
        this.playLoop(bufferList, bpm, board, loop + 4);
      }, 1500) //this value is a function of the BPM. If you want to change the bpm, you'll have to update this value
    }

  }

  playSound(buffer, time) {
    var source = this.state.context.createBufferSource();
    source.buffer = buffer;
    source.connect(this.state.context.destination);
    source.start(this.state.context.currentTime + time);
  }
	
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