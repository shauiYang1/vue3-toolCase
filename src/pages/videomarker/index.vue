<!--
 * @Author: yangshuai u9h_75bugk181@dingtalk.com
 * @Date: 2022-10-21 14:48:32
 * @LastEditors: yangshuai u9h_75bugk181@dingtalk.com
 * @LastEditTime: 2022-10-23 11:28:39
 * @FilePath: \vue3\src\pages\videomarker\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <video ref="video" class="video-js vjs-default-skin" width="600" height="400" controls>
      <!-- <source src="https://playtv-live.ifeng.com/live/06OLEGEGM4G.m3u8" /> -->
      <source src="@/assets/video/movie.mp4" />
      <!-- <source src="http://223.244.87.70:49000/user/10071/2022-10-14/SVID_20221014_174642_1.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=zb-jz/20221021/us-east-1/s3/aws4_request&X-Amz-Date=20221021T131946Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=70aa5ee441a0cb66ae3f39cda46c576d49986fd77d75333e96ceaafb90ba8b31" /> -->
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
        }
      }
    })
    onMounted(() => {
      states.player = videojs(document.querySelector('.video-js'),states.option);
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
    })
    return {
      states
    }
  },
})
</script>
