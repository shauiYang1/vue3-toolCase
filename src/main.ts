/*
 * @Author: yangshuai u9h_75bugk181@dingtalk.com
 * @Date: 2022-06-15 17:07:21
 * @LastEditors: yangshuai u9h_75bugk181@dingtalk.com
 * @LastEditTime: 2022-06-30 14:38:50
 * @FilePath: \vue3-test\src\main.ts
 * @Description: 项目入口文件
 */
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import 'lib-flexible'
import 'element-plus/dist/index.css'
import '@/assets/styles/pubilc.scss'
import '@/assets/styles/common.scss'

createApp(App).use(ElementPlus).use(router).mount('#app')
