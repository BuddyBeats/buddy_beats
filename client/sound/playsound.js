
function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }

  request.send();
}

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
}


	window.onload = init;
	var context;
	var bufferLoader;

	function init() {
	  // Fix up prefixing
	  window.AudioContext = window.AudioContext || window.webkitAudioContext;
	  context = new AudioContext();

	  bufferLoader = new BufferLoader(
	    context,
	    [
	      './samples/kick.wav',
	      './samples/clap.wav',
	      './samples/snare.wav',
	      './samples/hihat.wav'

	    ],
	    finishedLoading
	    );

	  bufferLoader.load();
	}

function finishedLoading(bufferList) {
	let rowLength = 4;
	let buffLen = bufferList.length;

	let board = [
		[1, 0, 0, 0],
		[0, 1, 0, 1],
		[0, 0, 1, 0],
		[0, 0, 0, 0]
	]
	//this is where the loop will live
	for (var i = 0; i < 16; i++) {
		console.log(i % rowLength);
		if (board[0][i % rowLength]) {
			console.log("playing...", bufferList[0], " at ", i);

			playSound(bufferList[0], i);
		}
		if (board[1][i % rowLength]) {
			console.log("playing...", bufferList[1], " at ", i);
			playSound(bufferList[1], i);
		}
		if (board[2][i % rowLength]) {
			console.log("playing...", bufferList[2], " at ", i);
			playSound(bufferList[2], i);
		}
		if (board[3][i % rowLength]) {
			console.log("playing...", bufferList[3], " at ", i);
			playSound(bufferList[3], i);
		}
		// playSound(bufferList[i % rowLength], i)
	}
}

function playSound(buffer, time) {
	console.log("playing sound at time ", time)
	var source = context.createBufferSource();
	source.buffer = buffer;
	source.connect(context.destination);
	source.start(time);
}