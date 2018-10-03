class Socket {
  constructor() {
    this.socket = window.io('http://localhost:5000');
    this.listeners = [];
    this.currentId = '';

    window.onbeforeunload = () => {
      this.stopWatch();
    };

    this.socket.on('viewers', (data) => {
      this.listeners.filter(l => l.videoId === data.video).forEach((listener) => {
        listener.handler(data.count);
      });
    });
  }

  listen(videoId, handler) {
    this.listeners.push({
      videoId,
      handler,
    });
  }

  startWatch(videoId) {
    if (this.currentId === videoId) { // avoid repeat counter
      return;
    }

    this.stopWatch();
    this.currentId = videoId;
    this.socket.emit('watch-video', videoId);
  }

  stopWatch() {
    if (this.currentId) {
      this.socket.emit('stop-watch-video', this.currentId);
    }
  }
}

const socket = new Socket();

export { socket as default };
