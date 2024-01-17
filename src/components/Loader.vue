<template>
  <div 
  :style="{
    width: `${size}rem`,
    height: `${size}rem`,
    zIndex
  }"
  :class=" { 
    absolute, 
    fixed } "
  class="spinner-border text-primary">

  </div>
</template>
<script>
export default {
  props: {
    size: {
      type: Number,
      default: 2
    },
    absolute: { // 부모요소 기준 가운대배치 //부모요소 기준 가운데 배치 하려면 position relative가 있어야함
      type:Boolean,
      default: false
    },
    fixed: { // viewport 기준 가운데 배치
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 0
    }
  },
}
</script>
<style lang="scss" scoped>
.spinner-border {
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  &.absolute {
  position: absolute;
}
&.fixed {
  position: fixed;
}
}

</style>