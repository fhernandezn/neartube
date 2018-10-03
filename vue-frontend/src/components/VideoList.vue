<template>
  <div v-bind:class="{vertical: orientation == 'vertical'}">
    <div class="video-preview-container"
        v-bind:class="{vertical: orientation == 'vertical'}"
        v-bind:key="video._id" v-for="video in videos">
      <router-link v-bind:to="/video/ + video._id">
        <VideoPreview :video-id="video._id" />
      </router-link>
    </div>
  </div>
</template>

<script>
import VideoPreview from '@/components/VideoPreview.vue';
import { play, stop } from '../lib';

export default {
  name: 'VideoList',
  components: {
    VideoPreview,
  },
  methods: {
    play,
    stop,
  },
  mounted() {
    this.$store.dispatch('fetchVideoList');
  },
  props: {
    videoId: String,
    orientation: String,
  },
  computed: {
    videos() {
      return this.$store.getters.getList;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .vertical {
    width: 20%;
    float: right;
  }

  .video-preview-container {
    width: 20%;
    float: left;
    margin: 2%;
    cursor: pointer;
  }

  .video-preview-container.vertical {
    width: 100%;
  }
</style>
