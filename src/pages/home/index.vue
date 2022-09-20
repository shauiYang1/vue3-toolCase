<!--
 * @Author: yangshuai u9h_75bugk181@dingtalk.com
 * @Date: 2022-06-16 10:41:52
 * @LastEditors: yangshuai u9h_75bugk181@dingtalk.com
 * @LastEditTime: 2022-09-20 14:10:15
 * @FilePath: \vue3-test\src\pages\systems\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div class="Home">
    <div>
      <label>可编辑的p标签</label>
      <p contenteditable="true">12</p>
    </div>

    <div>
      <span>数组降维(Array.prototype.flat([1, 2, 3, 4, [5, 6, 7, [9, 10]]]))</span>
      <p>
        {{ flat([1, 2, 3, 4, [5, 6, 7, [9, 10]]]) }}
      </p>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
onMounted(() => {
  console.log("this.$myMethod");
});
/**
 * @description:
 * @param {*} arr 要降维的数组
 * @param {*} deep  降维的层级默认Infinity全部展开
 * @return {*}
 */
function flat(arr, deep = "Infinity") {
  return arr.flat(deep);
}
</script>
