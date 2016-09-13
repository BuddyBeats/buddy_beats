import React, { Component } from 'react';
import { render } from 'react-dom';
var timeouts = [];

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

//Plays loop.  input is a buffer list of sounds and a speed variable.
//BPM is beats per minute
  playLoop(bufferList, bpm, board, loop = 0) {
    // let rowLength = 8;
    // let buffLen = bufferList.length;
    // let speedRatio = bpm / 60;
    // for (var i = 0; i < 8; i++) {
    //   if (board[0][i % rowLength] == 1) {
    //     this.playSound(bufferList[0], i / speedRatio);
    //   }
    //   if (board[1][i % rowLength] == 1) {
    //     this.playSound(bufferList[1], i / speedRatio);
    //   }
    //   if (board[2][i % rowLength] == 1) {
    //     this.playSound(bufferList[2], i / speedRatio);
    //   }
    //   if (board[3][i % rowLength] == 1) {
    //     this.playSound(bufferList[3], i / speedRatio);
    //   }
    // }

    // if (this.state.looping) {
    //   //params and timeout hardcoded for 160 bpm with 8 columns.
    //   setTimeout(() => {
    //       this.playLoop(bufferList, bpm, this.props.board, loop + 8);
    //   }, 3000) 
    // }
    // this.playSound(bufferList[0], 0)
    // this.playSound(bufferList[3], 1/3)
    let counter = 0;
    worker.postMessage('start')
    worker.onmessage = (e) => {
      console.log('tick')
      if (e.data === 'tick') {
        if (board[0][counter] == 1) {
          this.playSound(bufferList[0], 0);
        }
        if (board[1][counter] == 1) {
          this.playSound(bufferList[1], 0);
        }
        if (board[2][counter] == 1) {
          this.playSound(bufferList[2], 0);
        }
        if (board[3][counter] == 1) {
          this.playSound(bufferList[3], 0);
        }
        counter++
        counter = (counter === 8) ? 0 : counter;
      }
    }
  }

  playSound(buffer, time) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(context.currentTime + time);
  }

  //toggle stop terminates the loop.  Audio sounds cued up will continue to play.
  //Will terminate at the end of the loop playing.
  toggleStop() {
    this.setState({
      looping: false
    })
    worker.postMessage('stop');
  }

  toggleStart() {
    if (this.state.looping) return;
    this.setState({
      looping: true
    }, () => {
      this.playLoop(bufferList, this.state.bpm, this.props.board)
    })
  }

	render() {
		return (
			<div className = "buttonWrapper">

        <button onClick={this.toggleStop}>
          <img src="../assets/Stop.svg" width="75" height="75"  />
        </button>


        <button onClick={this.toggleStart}>
            <img src="../assets/Play.svg" width="75" height="75"  />
        </button>

			</div>
		)
	}
}

module.exports = Player;