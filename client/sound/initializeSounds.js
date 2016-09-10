
window.onload = init;
var context;
var bufferLoader;
var bufferList;

function init() {
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
    finishedLoading
    );

  bufferLoader.load();
}

function finishedLoading(buffers) {
	bufferList = buffers;
}

