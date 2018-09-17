var timeouts = {};

// socket.io instance
var socket = io();

socket.on('viewers', function (data) {
    if (app && app.selectedVideo && data.video == app.selectedVideo._id) {
        app.views = data.count;
    }
});

socket.on('new-comment', function () {
    if (!app.selectedVideo) {
        return;
    }

    fetchComments();
});

window.onbeforeunload = function () {
    if (app.selectedVideo) {
        socket.emit('stop-watch-video', app.selectedVideo._id);
    }
}

var app = new Vue({
    el: '#app',
    data: {
        videos: [],
        seeList: true,
        selectedVideo: null,
        comments: [],
        newComment: '',
        views: 0
    },
    methods: {
        saveComment: saveComment,
        seeVideoList: seeVideoList,
        getVideoLink: getVideoLink,
        getSelectedVideoLink: getSelectedVideoLink,
        play: play,
        stop: stop,
        selectVideo: selectVideo
    }
});

fetchVideos();

function saveComment () {
    if (!this.newComment) {
        return;
    }

    createComment();
}

function seeVideoList () {
    socket.emit('stop-watch-video', this.selectedVideo._id);

    this.selectedVideo = null;
    this.seeList = true;
}

function getVideoLink (video) {
    return video.url;
}

function getSelectedVideoLink () {
    return this.selectedVideo.url;
}

function play (video) {
    var videoElement = document.getElementById(video._id);

    tryit(function () {
        videoElement.play();
    });

    timeouts[video._id] = setTimeout(function () {
        tryit(function () {
            videoElement.pause();
            videoElement.currentTime = 0;
            clearTimeout(timeout[video._id]);
            delete timeout[video._id];
        });
    }, 5000);
}

function stop (video) {
    tryit(function () {
        var videoElement = document.getElementById(video._id);

        videoElement.pause();
        videoElement.currentTime = 0;

        if (timeouts[video._id]) {
            clearTimeout(timeouts[video._id]);
        }
    });
}

function selectVideo (video) {
    if (this.selectedVideo && video._id == this.selectedVideo._id) {
        return;
    }

    if (this.selectedVideo) {
        socket.emit('stop-watch-video', this.selectedVideo._id);
    }

    clearTimeout(timeouts[video._id]);
    this.selectedVideo = video;

    setTimeout(function () {
        tryit(function () {
            var videoElement = document.getElementById(video._id + 'selected');

            if (videoElement.paused) {
                videoElement.currentTime = 0;
                videoElement.play();
            }
        });
    }, 1000);

    this.seeList = false;
    this.comments = [];

    socket.emit('watch-video', this.selectedVideo._id);

    fetchComments();
}

function fetchVideos() {
    fetch('/api/video')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            app.videos = data.videos.map(function (video) {
                video.play = false;
                return video;
            });
        });
}

function fetchComments() {
    fetch('/api/video/' + app.selectedVideo._id + '/comments')
        .then(function (response) {
            return response.json();
        })
        .then((data) => {
            app.comments = data.comments.sort(function (a, b) {
                return a._id < b._id ? 1 : -1;
            });
        })
}

function createComment() {
    fetch('/api/video/' + app.selectedVideo._id + '/comments', {
        method: 'POST',
        body: JSON.stringify({ content: app.newComment }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function () {
            app.newComment = '';
        });
}

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