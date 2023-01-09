<!--
 * @Author: yangshuai u9h_75bugk181@dingtalk.com
 * @Date: 2022-06-16 10:41:52
 * @LastEditors: yangshuai u9h_75bugk181@dingtalk.com
 * @LastEditTime: 2022-12-09 13:54:08
 * @FilePath: \vue3-test\src\pages\systems\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div class="Home">
    <div>
      <label>可编辑的p标签</label>
      <p contenteditable="true">12</p>
    </div>

    <div>
      <span>数组降维(Array.prototype.flat([1, 2, 3, 4, [5, 6, 7, [9, 10]]]))</span>
      <p>
        {{ flat([1, 2, 3, 4, [5, 6, 7, [9, 10]]]) }}
      </p>
    </div>
    <video src="@/assets/video/movie.mp4" autoplay></video>
    <img :src="imgPath" alt="">
    <button @click="screenshotVideo">抓拍</button>
    <button
      @click="getFileFromUrl('http://192.168.100.18:41009/live/11010030211000003003/2022-12-07/1.wav?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=zb-jz%2F20221208%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20221208T023002Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=55ae5d2092296cc6043637623f7bf108590192c4f1b9836edbee3f14e4eed1f5')">12121</button>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { screenshot } from 'capture-for-view'

onMounted(() => {
  console.log("this.$myMethod");
});

const imgPath = ref(null);
/**
 * @description:
 * @param {*} arr 要降维的数组
 * @param {*} deep  降维的层级默认Infinity全部展开
 * @return {*}
 */
function flat(arr, deep = "Infinity") {
  return arr.flat(deep);
}
const screenshotVideo = () => {
  screenshot({
    videoDom: document.querySelector('video'), outImgType: 'image/png'
  }).then(res => {
    console.log(res)
    imgPath.value = res
  })

}
const getFileFromUrl = (url) => {
  return new Promise((resolve, reject) => {
    var blob = null
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    xhr.responseType = 'blob'
    // 加载时处理
    xhr.onload = () => {
      // 获取返回结果
      blob = xhr.response
      const endspilt = url.lastIndexOf('?');
      let filename = null
      if (endspilt !== -1) {
        filename = decodeURI(
          url.substring(url.lastIndexOf('/') + 1, endspilt)
        );
      } else {
        filename = decodeURI(url.substring(url.lastIndexOf('/') + 1))
      }
      const file = new Blob([blob])
      console.log('file', file)
      // 返回结果
      // resolve(file)
      fileLocalDownLoad(file, filename)
    }
    xhr.onerror = e => {
      reject(e)
    }
    // 发送
    xhr.send()
  })
}
const fileLocalDownLoad = (blob, filename) => {
  const downloadElement = document.createElement('a')
  const href = window.URL.createObjectURL(blob)
  downloadElement.href = href
  downloadElement.download = decodeURIComponent(filename)
  document.body.appendChild(downloadElement)
  downloadElement.click()
  document.body.removeChild(downloadElement)
  window.URL.revokeObjectURL(href)
}
</script>
