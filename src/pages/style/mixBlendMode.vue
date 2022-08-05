<!--
 * @Author: yangshuai u9h_75bugk181@dingtalk.com
 * @Date: 2022-08-05 17:20:37
 * @LastEditors: yangshuai u9h_75bugk181@dingtalk.com
 * @LastEditTime: 2022-08-05 17:36:51
 * @FilePath: \vue3-test\src\pages\style\MixBlendMode.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="mix-blend-mode">
      <p>利用css3的mix-blend-mode属性实现文字颜色智能适配背景色</p>
    <span class="animation-box"></span>
  </div>
</template>
<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "mixBlendMode",
  setup() {},
});
</script>
<style lang="scss" scoped>
.mix-blend-mode {
  width: 100%;
  height: 100%;
  .animation-box {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 200px;
    background: linear-gradient(45deg, #000 0, #000 50%, #fff 50%);

    &::before {
      content: "LOREM IPSUM";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 14px;
      mix-blend-mode: difference;
      animation: move 3s infinite linear alternate;
    }
  }
}

@keyframes move {
  0% {
    transform: translate(-30%, -70%);
  }
  100% {
    transform: translate(-70%, -30%);
  }
}
</style>