<template>
  <div id="video-player-container">
    <video v-if="video !== null"
      :id="getHTMLId()"
      autoplay="autoplay" controls>
      <source :src="getVideoLink(video)" type="video/mp4">
    </video>
    <p v-if="video !== null">{{video.name}}</p>
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
    width: 80%;
    float: left;
  }

  video {
    width: 100%;
  }
</style>
