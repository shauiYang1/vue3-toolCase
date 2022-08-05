<template>
  <h3 class="header">{{ content }}</h3>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderComponent",
  setup() {
    return {
      content: "测试项目",
    };
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 100%;
  line-height: 60px;
  text-align: left;
  color: #fff;
}
</style>