
window.onload = init;
var context;
var bufferLoader;
var bufferList;
var worker = new Worker('client/sound/intervalWorker.js')
function init() {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();
  bufferLoader = new BufferLoader(
    context,
    [
    //These are the drum samples
      './samples/kick.wav',
      './samples/donk.wav',
      './samples/snare2.wav',
      './samples/hihat2.wav'

    ],
    finishedLoading
    );

  bufferLoader.load();
}

function finishedLoading(buffers) {
	bufferList = buffers;

}

