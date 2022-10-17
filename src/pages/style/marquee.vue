<template>
  <div class="marquee">
    <span>marquee标签实现广告条效果</span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'marquee',
  setup() {

  },
})
</script>
<style lang="scss" scoped>
.marquee {
  width: 300px;
  line-height: 20px;
  background: rgba($color: #000000, $alpha: .7);
  color: #fff;
  overflow: hidden;
  &>span{
    display: inline-block;
    padding-left: 100px;
    animation: animation 2s linear infinite;
  }
}
@keyframes animation {
  0%{
    transform: translateX(0%);
  }
  100%{
    transform: translateX(-100%);
  }
}
</style>
