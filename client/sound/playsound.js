
// window.onload = init;
// var context;
// var bufferLoader;

// function init() {
//   window.AudioContext = window.AudioContext || window.webkitAudioContext;
//   context = new AudioContext();
//   bufferLoader = new BufferLoader(
//     context,
//     [
//     //These are the drum samples
//       './samples/kick.wav',
//       './samples/clap.wav',
//       './samples/snare.wav',
//       './samples/hihat.wav'

//     ],
//     finishedLoading
//     );

//   bufferLoader.load();
// }


// let sampleBoard = [
// 		[1, 0, 0, 0],
// 		[0, 1, 0, 1],
// 		[0, 0, 1, 0],
// 		[0, 0, 0, 0]
// 	]

// function finishedLoading(bufferList) {
// 	playLoop(bufferList, 120, sampleBoard);
// }

// //Plays loop.  input is a buffer list of sounds and a speed variable.
// //BPM is beats per minute
// function playLoop(bufferList, bpm, board) {
// 	let rowLength = 4;
// 	let buffLen = bufferList.length;
// 	let speedRatio = bpm / 60;

// 	
// 	for (var i = 0; i < 16; i++) {
// 		console.log(i % rowLength);
// 		if (board[0][i % rowLength]) {
// 			playSound(bufferList[0], i / speedRatio);
// 		}
// 		if (board[1][i % rowLength]) {
// 			playSound(bufferList[1], i / speedRatio);
// 		}
// 		if (board[2][i % rowLength]) {
// 			playSound(bufferList[2], i / speedRatio);
// 		}
// 		if (board[3][i % rowLength]) {
// 			playSound(bufferList[3], i / speedRatio);
// 		}
// 	}
// }

// function playSound(buffer, time) {
// 	var source = context.createBufferSource();
// 	source.buffer = buffer;
// 	source.connect(context.destination);
// 	source.start(time);
// }