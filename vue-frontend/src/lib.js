function tryit(job, cb) {
  try {
    job();
  } catch (err) {
    console.log(err);
    if (cb) {
      cb(err);
    }
  }
}

function play(videoId, timeouts) {
  const videoElement = document.getElementById(videoId);

  tryit(() => {
    videoElement.play();
  });

  timeouts[videoId] = setTimeout(() => {
    tryit(() => {
      videoElement.pause();
      videoElement.currentTime = 0;
      clearTimeout(timeouts[videoId]);
      delete timeouts[videoId];
    });
  }, 5000);
}

function stop(videoId, timeouts) {
  tryit(() => {
    const videoElement = document.getElementById(videoId);

    videoElement.pause();
    videoElement.currentTime = 0;

    if (timeouts[videoId]) {
      clearTimeout(timeouts[videoId]);
    }
  });
}

export { tryit, play, stop };
