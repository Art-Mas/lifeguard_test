<template>
  <div class="video-frame"
       @click="onClick"
       ref="frame"
       :style="'width:' + width + 'px; height: ' + height + 'px'">
    <div class="video-frame__name">
      {{ name }}
    </div>
  </div>
</template>

<script>
import LogInfo from "@/classes/LogInfo";
import {mapMutations} from 'vuex'

export default {
  name: 'VideoFrame',

  props: {
    width: {
      type: Number,
      default: () => {
        return 100;
      }
    },
    height: {
      type: Number,
      default: () => {
        return 100;
      }
    },
    name: String,
    duration: Number,
    path: Array,
  },

  methods: {
    ...mapMutations([
      'PUSH_TO_LOG'
    ]),
    onClick(e) {
      const info = new LogInfo(e.pageX, e.pageY, this.name);
      this.PUSH_TO_LOG(info);
    }
  },

  mounted() {
    const frameEl = this.$refs.frame;
    const halfFrameWidth = frameEl.clientWidth / 2;
    const halfFrameHeight = frameEl.clientHeight / 2;
    const draw = () => {
      const startX = this.path[0].x - halfFrameWidth;
      const startY = this.path[0].y - halfFrameHeight;
      let frameNum = 0;
      frameEl.style.left = startX + 'px';
      frameEl.style.top = startY + 'px';
      const intervalId = setInterval(() => {
        if (frameNum > this.path.length - 1) {
          clearInterval(intervalId);
          return draw();
        }
        frameEl.style.left = this.path[frameNum].x - halfFrameWidth + 'px';
        frameEl.style.top = this.path[frameNum].y - halfFrameHeight + 'px';
        frameNum++;
      }, this.duration * 1000 / this.path.length)
    };
    draw();
  }
}
</script>

<style>
  .video-frame {
    border: 3px solid red;
    position: absolute;
    cursor: pointer;
  }

  .video-frame__name {
    color: red;
    font-size: 30px;
  }
</style>