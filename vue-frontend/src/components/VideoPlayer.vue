<template>
  <div id="video-player-container">
    <video v-if="video !== null"
      :id="getHTMLId()"
      autoplay="autoplay" controls
      v-bind:src="getApiUrl() + video.url">
    </video>
    <h3 v-if="video !== null">{{video.name}} <small>{{counter}} watching</small> </h3>
  </div>
</template>

<script>
import axios from 'axios';
import Socket from '../services/sockets';

function loadVideo(videoId) {
  return axios.get(`/api/video/${videoId}`)
    .then(response => response.data.video);
}

export default {
  name: 'VideoPlayer',
  mounted: function mounted() {
    loadVideo(this.videoId)
      .then((video) => {
        this.video = video;
      });
  },
  updated: function updated() {
    loadVideo.bind(this);
    loadVideo(this.videoId)
      .then((video) => {
        this.video = video;
        Socket.startWatch(this.video._id);

        if (this.listenerRegistered !== this.video._id) {
          this.listenerRegistered = this.video._id;
          Socket.listen(this.video._id, (counter) => {
            this.counter = counter;
          });
        }
      });
  },
  methods: {
    getHTMLId() {
      return `${this.videoId}-player`;
    },
    getVideoLink() {
      if (this.video) {
        return `http://localhost:5000${this.video.url}`;
      }
      return '/';
    },
    getApiUrl() {
      return 'http://localhost:5000';
    },
  },
  props: {
    videoId: String,
  },
  data() {
    return {
      video: null,
      listenerRegistered: false,
      counter: 0,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #video-player-container {
    width: 75%;
    float: left;
    margin-right: 5%;
  }

  video {
    width: 100%;
  }

  h3 {
    text-align: left;
  }
</style>
