<!--
 * @Author: yangshuai u9h_75bugk181@dingtalk.com
 * @Date: 2022-11-02 08:59:43
 * @LastEditors: yangshuai u9h_75bugk181@dingtalk.com
 * @LastEditTime: 2022-11-04 14:12:38
 * @FilePath: \videojs-wavesurfer-app\src\components\VideoJSWavesurfer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <video id="myAudio" class="video-js vjs-default-skin"></video>
  <div id="waveform"></div>
</template>

<script>
/* eslint-disable */
import { version } from 'vue'
import 'video.js/dist/video-js.css'
import 'videojs-markers/dist/videojs.markers.css';
import 'videojs-wavesurfer/dist/css/videojs.wavesurfer.css'


import videojs from 'video.js'
import 'video.js/dist/video.js'
import 'videojs-markers';
import WaveSurfer from 'wavesurfer.js'
import Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer.js'
import "videojs-flvjs-es6";

export default {
  data() {
    return {
      player: '',
      options: {
        controls: true,
        bigPlayButton: false,
        autoplay: true,
        fluid: false,
        loop: false,
        width: 600,
        height: 300,
        preload: "auto",
        // plugins: {
        //   // configure videojs-wavesurfer plugin
        //   wavesurfer: {
        //     // container: document.querySelector('#waveform'),
        //     backend: 'MediaElement',
        //     displayMilliseconds: true,
        //     debug: true,
        //     waveColor: '#3b4045',
        //     progressColor: 'black',
        //     cursorColor: 'black',
        //     hideScrollbar: true
        //   }
        // },
        techOrder: ['html5', 'flvjs'],
        sources: [{ src: '../../assets/video/2022-10-09-15-47-48(6)(2).flv', type: "video/x-flv" }],
        flvjs: {
          mediaDataSource: {
            isLive: false,
            cors: true,
            hasAudio: false,
            withCredentials: false
          }
        },
      }
    };
  },
  mounted() {
    /* eslint-disable no-console */
    this.$nextTick(() => {
      // this.options.plugins.wavesurfer.container = document.querySelector('#waveform'),
        this.player = videojs('#myAudio', this.options, () => {
          // print version information at startup
          // var msg = 'Using video.js ' + videojs.VERSION +
          //     ' with videojs-wavesurfer ' + videojs.getPluginVersion('wavesurfer') +
          //     ', wavesurfer.js ' + WaveSurfer.VERSION + ' and vue.js ' + version;
          // videojs.log(msg);

          // load file
          // this.player.src({ src: '/mmexport1662801639592.mp4' });
        });
      this.player.markers({
        markerStyle: {
          // 标记样式
          width: '0.6em',
          height: '0.6em',
          bottom: '-0.1em',
          'border-radius': '50%',
          'background-color': 'red',
          position: 'absolute'
        },
        markerTip: {
          display: true, // 不显示标记的tip
          text: (marker) => {
            return marker.text
          }
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
      this.player.on('waveReady', event => {
        console.log('waveform is ready!');
      });

      this.player.on('playbackFinish', event => {
        console.log('playback finished.');
      });

      // error handling
      this.player.on('error', (element, error) => {
        console.warn(error);
      });
    })
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
</script>