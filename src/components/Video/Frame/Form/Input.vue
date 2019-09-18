<template>
  <div>
    <input
       type="text"
       :placeholder="placeholder"
       :value="value"
       @input="(e) => {$emit('input', e.target.value)}"
    />
  </div>
</template>

<script>
export default {
  props: ['value', 'placeholder']
}
</script>