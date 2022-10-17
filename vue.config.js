/*
 * @Author: yangshuai u9h_75bugk181@dingtalk.com
 * @Date: 2022-06-15 16:46:39
 * @LastEditors: yangshuai u9h_75bugk181@dingtalk.com
 * @LastEditTime: 2022-10-08 15:44:46
 * @FilePath: \vue3-test\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require("path");
const express = require("express");
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const px2rem = require('postcss-px2rem');
// 配置基本大小
const postcss = px2rem({
  // 基准大小 baseSize，需要和rem.js中相同
  remUnit: 192
})
const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://192.168.3.205:8011', // 后台接口地址
          // target: 'http://192.168.3.205:5002', // 后台接口地址
          ws: false, //如果要代理 websockets，配置这个参数
          secure: false, // 如果是https接口，需要配置这个参数
          changeOrigin: true, //是否跨域
          pathRewrite: { // 重写路径
            '^/api': ''
          }
        }
      },
      onBeforeSetupMiddleware: ({
        app
      }) => {
        app.use(
          "/node_modules/",
          express.static(path.resolve(__dirname, "node_modules"))
        );
        app.use((_, res, next) => {
          res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
          res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
          next();
        });
      },
    },
    plugins: [new NodePolyfillPlugin()]
  },
  css: {
    loaderOptions: {
      scss: {
        plugins: [
          postcss
        ]
      }
    }
  }
})