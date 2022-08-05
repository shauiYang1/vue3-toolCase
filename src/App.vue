<!--
 * @Author: yangshuai u9h_75bugk181@dingtalk.com
 * @Date: 2022-06-15 16:46:39
 * @LastEditors: yangshuai u9h_75bugk181@dingtalk.com
 * @LastEditTime: 2022-06-17 14:43:57
 * @FilePath: \vue3-test\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="common-layout">
    <el-container>
      <el-header><Header /></el-header>
      <el-container>
        <Aside />
        <el-main> <router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
import Header from "@/components/Header.vue";
import Aside from "@/components/Aside.vue";

export default {
  name: "app",
  components: {
    Aside,
    Header,
  },
};
</script>
<style lang="scss" scoped>
.common-layout {
  width: 100%;
  height: 100%;
  & > .el-container {
    height: 100%;
    .el-header {
      background: #293545;
    }
    .el-container {
      height: calc(100% - 60px);
    }
  }
}
</style>

