<!--
 * @Author: yangshuai u9h_75bugk181@dingtalk.com
 * @Date: 2022-10-21 14:48:32
 * @LastEditors: yangshuai u9h_75bugk181@dingtalk.com
 * @LastEditTime: 2022-10-30 17:18:08
 * @FilePath: \vue3\src\pages\videomarker\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="video-content">
    <video ref="video" class="video-js vjs-default-skin" width="600" height="400" controls>
      <!-- <source src="http://192.168.3.205:9000/user/10010/2022-10-30/mmexport1662801639592.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=zb-jz%2F20221030%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20221030T073154Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=48a80134c89968749cae94c97262f1764e63caa186b7ceb4e9f6aa5597e151a4" /> -->
      <source :src="" />
      <!-- <source src="@/assets/video/mmexport1662801639592.mp4" /> -->
      <!-- <source src="http://192.168.3.205:9000/user/10010/2022-10-30/mmexport1662801639592.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=zb-jz%2F20221030%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20221030T073154Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=48a80134c89968749cae94c97262f1764e63caa186b7ceb4e9f6aa5597e151a4" /> -->
    </video>
  </div>
</template>
<script lang="ts">
import videojs from 'video.js';
import "videojs-markers";
import "videojs-markers/dist/videojs.markers.css";
import "video.js/dist/video-js.css";

import { defineComponent, onMounted, ref, reactive } from 'vue'

export default defineComponent({
  name: 'videoMarker',
  setup() {
    const states = reactive({
      videoPlayer: ref('videoPlayer'),
      player: null,
      option: {
        controls: true, // 必填，显示各控制组件
        autoplay: false, // 是否自动播放
        preload: 'auto', // 预加载
        width: '600px',
        height: '400px',
        loop: true, // 是否循环播放
        playbackRates: [0.5, 1, 1.5, 2], // 是否显示倍速
        controlBar: {
          volumePanel: {
            inline: false// 将音量横向改为纵向
          }
        },
      },
      url:require('@/assets/video/mmexport1662801639592.mp4')
    })
    onMounted(() => {
      const videoDom = document.createElement('video');
      videoDom.className = 'video-js'
      videoDom.id = 'video'
      videoDom.style.width = '100%'
      videoDom.style.height = '80%'
      // document.querySelector('.video-content').append(videoDom)
      states.player = videojs(videoDom, states.option);
      const url = require('@/assets/video/mmexport1662801639592.mp4')
      // const url = 'http://192.168.3.205:9000/user/10010/2022-10-30/mmexport1662801639592.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=zb-jz%2F20221030%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20221030T073154Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=48a80134c89968749cae94c97262f1764e63caa186b7ceb4e9f6aa5597e151a4'
      states.player.src(url)
      states.player.markers({
        markerStyle: {
          // 标记样式
          width: '0.7em',
          height: '0.7em',
          bottom: '-0.15em',
          'border-radius': '50%',
          'background-color': 'orange',
          position: 'absolute'
        },
        markerTip: {
          display: true// 不显示标记的tip
        },
        markers: [
          {
            time: 1,
            text: "this"
          },
          {
            time: 8,
            text: "is"
          },
          {
            time: 15,
            text: "so"
          },
          {
            time: 28,
            text: "cool"
          }
        ]
      })
      states.player.load();
    })
    return {
      states
    }
  },
})
</script>
