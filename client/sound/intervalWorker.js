let timerID;
self.onmessage = function(e) {
    if (e.data.type === 'start') {
      self.postMessage('tick');
      timerID = setInterval(()=> {
        self.postMessage('tick');
      }, 60 / e.data.bpm * 1000 / 2)
    } else if (e.data === 'stop') {
      clearInterval(timerID);
    }
}