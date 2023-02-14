/*
 * @Author: yangshuai u9h_75bugk181@dingtalk.com
 * @Date: 2022-06-15 17:07:21
 * @LastEditors: yangshuai u9h_75bugk181@dingtalk.com
 * @LastEditTime: 2023-02-14 09:15:14
 * @FilePath: \vue3-test\src\main.ts
 * @Description: 项目入口文件
 */
import { createApp } from "vue";
import ElementPlus from "element-plus";
import App from "./App.vue";
import router from "./router";
import "element-plus/dist/index.css";
import '@/utils/flexible'
import "@/assets/styles/pubilc.scss";
import "@/assets/styles/common.scss";

const MyPlugin = {
  install(app, options) {
    console.log(app, options); // 打印参数
    // 1. 添加全局方法或属性
    app.config.globalProperties.$myMethod = (options) => {
      // 逻辑...
      return options;
    };

    // 2. 添加全局资源指令
    app.directive("my-directive", {
      bind(el, binding, vnode, oldVnode) {
        // 逻辑...
      },
    });
  },
};
createApp(App)
  .use(ElementPlus)
  .use(router)
  .use(MyPlugin, { testName: "张三" })
  .mount("#app");
