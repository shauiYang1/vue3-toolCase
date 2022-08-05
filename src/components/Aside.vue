<template>
  <el-aside>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#293545"
      text-color="#fff"
      :default-active="state.activePath"
      class="el-menu-vertical-demo"
      :router="true"
    >
      <template v-for="(item, index) in routesList" :key="index">
        <el-sub-menu v-if="item.children" :index="item.path">
          <template #title>
            <span>{{ item.name }}</span>
          </template>

          <el-menu-item
            v-for="(_item, _index) in item.children"
            :index="_item.path"
            :key="index + '_' + _index"
            >{{ _item.name }}</el-menu-item
          >
        </el-sub-menu>
        <el-menu-item v-else :index="item.path" :key="index">{{
          item.name
        }}</el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>

<script lang="ts">
import { defineComponent, watch, reactive } from "vue";
import { routes } from "@/router";
import { useRouter } from "vue-router";
import { State } from "@/interfaces/asideInterface";

export default defineComponent({
  name: "AsideComponent",
  props: {
    data: Array,
    default: [],
  },
  //  props渲染完成后执行setup
  setup() {
    const router = useRouter();
    const state: State = reactive({
      activePath: "/",
    });
    const routesList = routes;
    watch(
      () => router.currentRoute.value.path,
      (toPath) => {
        state.activePath = toPath;
      },
      { immediate: true, deep: true }
    );
    return {
      routesList,
      state,
    }; // 这里返回的任何内容都可以用于组件的其余部分
  },
});
</script>
<style lang="scss" scoped>
.el-menu {
  height: 100%;
}
</style>