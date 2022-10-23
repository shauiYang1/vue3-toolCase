/*
 * @Author: yangshuai u9h_75bugk181@dingtalk.com
 * @Date: 2022-06-16 10:40:38
 * @LastEditors: yangshuai u9h_75bugk181@dingtalk.com
 * @LastEditTime: 2022-10-21 14:49:17
 * @FilePath: \vue3-test\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/pages/home/index.vue";
import FFmpeg from "@/pages/ffmpeg/index.vue";
import Style from "@/pages/style/index.vue";
import MixBlendMode from "@/pages/style/mixBlendMode.vue";
import Drag from "@/pages/style/drag.vue";
import Marquee from "@/pages/style/marquee.vue";
import MQTT from "@/pages/mqtt/index.vue";
import TSDemo from "@/pages/tsdemo/index.vue";
import VideoMarker from "@/pages/videomarker/index.vue";

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
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
