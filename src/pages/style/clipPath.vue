<!--
 * @Author: yangshuai u9h_75bugk181@dingtalk.com
 * @Date: 2022-11-23 11:23:56
 * @LastEditors: yangshuai u9h_75bugk181@dingtalk.com
 * @LastEditTime: 2022-11-23 13:40:19
 * @FilePath: \vue3\src\pages\style\clipPath.vue
 * @Description: css3使用cilp-path绘制图形
-->
<template>
  <div class="clipPath">

  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'clipPath',
  setup() {

  },
})
</script>
<style lang="scss" scoped>
.clipPath {
  width: 200px;
  height: 200px;
  background: red;
  clip-path: polygon(50% 0%, 60% 30%, 98% 30%, 70% 50%,80% 80%,50% 60%,20% 80%,30% 50%,2% 30%,40% 30%);
}
</style>
