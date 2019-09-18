<template>
  <div id="app">
    <div class="main">
      <div class="main__video-wrap" :style="'height: ' + videoHeight + 'px'">
        <Video :frames="frames" />
        <Log class="main__video-log" />
      </div>
      <VideoFrameForm @input="(frameData) => {frames.push(frameData)}" />
    </div>
  </div>
</template>

<script>
import Video from "@/components/Video";
import VideoFrameForm from "@/components/Video/Frame/Form"
import Log from "@/components/Log";
import {mapState} from 'vuex';

export default {
  name: 'app',

  components: {
    VideoFrameForm,
    Video,
    Log
  },

  computed: {
    ...mapState(['videoHeight'])
  },

  data() {
    return {
      frames: []
    }
  },
}
</script>

<style>
  .main__video-wrap {
    display: flex;
  }

  .main__video-log {
    padding: 0 15px;
    height: 100%;
    overflow: auto;
  }
</style>
