/*
 * @Author: yangshuai u9h_75bugk181@dingtalk.com
 * @Date: 2022-06-15 16:46:39
 * @LastEditors: yangshuai u9h_75bugk181@dingtalk.com
 * @LastEditTime: 2022-08-04 15:41:08
 * @FilePath: \vue3-test\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require("path");
const express = require("express");
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
          ws: true, //如果要代理 websockets，配置这个参数
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
  },
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          rootValue: 192, // 换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
          // unitPrecision: 5, //允许REM单位增长到的十进制数字。
          // propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
          // propBlackList: ['element-plus'], //黑名单
          // exclude: /(node_module)/, // 默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
          // selectorBlackList: [], //要忽略并保留为px的选择器
          // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
          // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
          // mediaQuery: false, // （布尔值）允许在媒体查询中转换px。
          // minPixelValue: 3 // 设置要替换的最小像素值(3px会被转rem)。 默认 0
        }
      }
    }
  }
})