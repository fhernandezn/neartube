<template>
  <div>
    <video v-if="video !== null"
      v-on:mouseenter="play(getHTMLId(), timeouts)"
      v-on:mouseout="stop(getHTMLId(), timeouts)"
      :id="getHTMLId()"
      v-bind:autoplay="video.play"
      muted>
      <source :src="getVideoLink(video)" type="video/mp4">
    </video>
    <p v-if="video !== null">{{video.name}}</p>
  </div>
</template>

<script>
import axios from 'axios';
import { play, stop } from '../lib';

export default {
  name: 'VideoPreview',
  mounted: function mounted() {
    axios.get(`/api/video/${this.videoId}`)
      .then((response) => {
        this.video = response.data.video;
      });
  },
  methods: {
    getHTMLId() {
      return `${this.videoId}-preview`;
    },
    getVideoLink() {
      if (this.video) {
        return `http://localhost:5000${this.video.url}`;
      }
      return '/';
    },
    play,
    stop,
  },
  props: {
    videoId: String,
  },
  data() {
    return {
      timeouts: {},
      video: null,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  video {
    width: 100%;
  }
</style>
