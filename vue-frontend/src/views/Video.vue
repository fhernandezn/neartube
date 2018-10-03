<template>
  <div class="home">
    <VideoList orientation="vertical" />
    <VideoPlayer :video-id="$route.params.id" />
  </div>
</template>

<script>
// @ is an alias to /src
import VideoList from '@/components/VideoList.vue';
import VideoPlayer from '@/components/VideoPlayer.vue';

export default {
  name: 'Video',
  components: {
    VideoList,
    VideoPlayer,
  },
};
</script>
