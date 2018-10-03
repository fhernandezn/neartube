<template>
  <div id="video-player-container">
    <video v-if="video !== null"
      :id="getHTMLId()"
      autoplay="autoplay" controls
      v-bind:src="getApiUrl() + video.url">
    </video>
    <h3 v-if="video !== null">{{video.name}}</h3>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'VideoPlayer',
  mounted: function mounted() {
    axios.get(`/api/video/${this.videoId}`)
      .then((response) => {
        this.video = response.data.video;
      });
  },
  updated: function updated() {
    axios.get(`/api/video/${this.videoId}`)
      .then((response) => {
        this.video = response.data.video;
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
