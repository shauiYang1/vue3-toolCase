import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/pages/home/index.vue";
import FFmpeg from "@/pages/ffmpeg/index.vue";
import Style from "@/pages/style/index.vue";
import MixBlendMode from "@/pages/style/mixBlendMode.vue";
import Drag from "@/pages/style/drag.vue";
import Marquee from "@/pages/style/marquee.vue";
import ClipPath from "@/pages/style/clipPath.vue";
import MQTT from "@/pages/mqtt/index.vue";
import TSDemo from "@/pages/tsdemo/index.vue";
import VideoMarker from "@/pages/videomarker/index.vue";
import VideoJSWavesurfer from "@/pages/videoJSWavesurfer/index.vue";
import Xmind from "@/pages/xmind/index.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "首页",
    component: Home,
  },
  {
    path: "/ffmpeg",
    name: "素材裁剪",
    component: FFmpeg,
  },
  {
    path: "/style",
    name: "动画演示",
    component: Style,
    children: [
      {
        path: "/style/mixBlendMode",
        name: "css混合模式",
        component: MixBlendMode,
      },
      {
        path: "/style/drag",
        name: "拖拽动画",
        component: Drag,
      },
      {
        path: "/style/marquee",
        name: "广告栏",
        component: Marquee,
      },
      {
        path: "/style/clipPath",
        name: "元素裁剪",
        component: ClipPath,
      },
    ],
  },
  {
    path: "/mqtt",
    name: "mqtt",
    component: MQTT,
  },
  {
    path: "/ts",
    name: "ts",
    component: TSDemo,
  },
  {
    path: "/videomarker",
    name: "videoMarker",
    component: VideoMarker,
  },
  {
    path: "/videoJSWavesurfer",
    name: "videoJSWavesurfer",
    component: VideoJSWavesurfer,
  },
  {
    path: "/xmind",
    name: "Xmind",
    component: Xmind,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
