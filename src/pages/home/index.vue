<!--
 * @Author: yangshuai u9h_75bugk181@dingtalk.com
 * @Date: 2022-06-16 10:41:52
 * @LastEditors: yangshuai u9h_75bugk181@dingtalk.com
 * @LastEditTime: 2022-08-12 16:13:27
 * @FilePath: \vue3-test\src\pages\systems\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div class="Home">{{ $myMethod() }}</div>
</template>
<script setup>
import { onMounted } from "vue";
onMounted(() => {
  console.log("this.$myMethod");
});
</script>

