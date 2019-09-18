<template>
  <canvas ref="canvas" :width="width" :height="height" class="video-frame-form-path"></canvas>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'VideoFrameFormPath',

  data() {
    return {
      points: [],
      isDraw: false,
    }
  },

  computed: {
    ...mapState({
      width: state => state.pathDrawWidth,
      height: state => state.pathDrawHeight,
    }),
    canvasCtx() {
      return this.$refs.canvas.getContext("2d");
    }
  },

  methods: {
    fetchAndPushCoords(e) {
      const x = e.pageX - this.$refs.canvas.offsetLeft;
      const y = e.pageY - this.$refs.canvas.offsetTop;
      this.points.push({x, y});
      return {x, y};
    },
    clear() {
      this.canvasCtx.clearRect(0, 0, this.width, this.height);
    },
    mousedown(e) {
      this.points = [];
      const coords = this.fetchAndPushCoords(e);
      this.canvasCtx.beginPath();
      this.canvasCtx.moveTo(coords.x, coords.y);
      this.isDraw = true;
    },
    mousemove(e) {
      if(!this.isDraw) {
        return;
      }
      const coords = this.fetchAndPushCoords(e);
      this.canvasCtx.lineTo(coords.x, coords.y);
      this.canvasCtx.stroke();
    },
    mouseup(e) {
      if(!this.isDraw) {
        return;
      }
      const coords = this.fetchAndPushCoords(e);
      this.canvasCtx.lineTo(coords.x, coords.y);
      this.canvasCtx.stroke();
      this.canvasCtx.closePath();
      this.isDraw = false;
      this.$emit('input', this.points)
    },
  },
  mounted() {
    const canvas = this.$refs.canvas;
    canvas.addEventListener("mousedown", this.mousedown);
    canvas.addEventListener("mouseup", this.mouseup);
    canvas.addEventListener("mousemove", this.mousemove);
  }
}
</script>

<style>
  .video-frame-form-path {
    background: grey;
    border: 1px solid black;
  }
</style>