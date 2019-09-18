<template>
  <form @submit.prevent="emitInput">
    <Input v-model="name" :placeholder="'Имя рамки'" />
    <Input v-model="duration" :placeholder="'Длительность движения (с)'"/>
    <div>
      <div>Траектория движения (нарисуйте):</div>
      <FramePath @input="(points) => {path = points}" ref="pathDraw" />
    </div>
    <div>
      <input type="submit" value="Добавить">
    </div>
  </form>
</template>

<script>
import FramePath from "@/components/Video/Frame/Form/Path";
import Input from "@/components/Video/Frame/Form/Input";
import FrameData from "@/classes/FrameData"

export default {
  components: {
    FramePath,
    Input
  },

  methods: {
    emitInput() {
      const data = new FrameData(this.name, this.duration, this.path);
      this.$emit('input', data);
      this.name = null;
      this.duration = null;
      this.path = null;
      this.$refs.pathDraw.clear();
    }
  },

  data() {
    return {
      name: null,
      duration: null,
      path: null,
    }
  }
}
</script>