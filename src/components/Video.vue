<template>
  <div class="video">
    <video controls="controls">
      <source src="/vid.mp4">
    </video>
    <Frame v-for="(frame, fIndex) in frames"
           :key="fIndex"
           :duration="frame.duration"
           :name="frame.name"
           :path="transformPathToVideoPath(frame.path)"
    />
  </div>
</template>

<script>
import Frame from "@/components/Video/Frame";
import {mapState} from 'vuex'

export default {
  name: 'Video',

  props: {
    /**
     * @type {FrameData[]}
     */
    frames: Array,
  },

  components: {
    Frame
  },

  computed: {
    ...mapState([
      'videoWidth',
      'videoHeight',
      'pathDrawWidth',
      'pathDrawHeight',
    ])
  },

  methods: {
    transformPathToVideoPath(path) {
      const videoPath = [];
      path.forEach(point => {
        const percentX = 100 / (this.pathDrawWidth / point.x);
        const percentY = 100 / (this.pathDrawHeight / point.y);
        const pointX = (this.videoWidth / 100 * percentX);
        const pointY = (this.videoHeight / 100 * percentY);
        videoPath.push({x: pointX, y: pointY});
      });
      return videoPath;
    }
  }
}
</script>

<style>
  .video {
    overflow: hidden;
    position: relative;
  }
</style>