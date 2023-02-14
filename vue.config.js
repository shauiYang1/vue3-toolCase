const path = require("path");
const express = require("express");
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

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
      sass: {
        additionalData: '@import "~@/assets/styles/variables.scss"',
      },
      postcss: {
        postcssOptions: {
          plugins: [
            require("postcss-pxtorem")({
              rootValue: 192,//1rem = 192px
              propList: ['*'],
              exclude: 'node_modules' //  对于mode_modules中的模块不做编译
            }),
          ]
        }
      }
    }
  }
})