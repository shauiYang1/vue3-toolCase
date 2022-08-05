
<!--
 * @Author: yangshuai u9h_75bugk181@dingtalk.com
 * @Date: 2022-08-04 10:04:01
 * @LastEditors: yangshuai u9h_75bugk181@dingtalk.com
 * @LastEditTime: 2022-08-05 15:24:08
 * @FilePath: \vue3-test\src\pages\ffmpeg\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="container">
    <div class="operate">
      选择原始视频文件:
      <input
        type="file"
        id="select_origin_file"
        @change="bindSelectOriginFile"
      />
      <button id="start_clip" @click="bindClipBtn">开始剪辑视频</button>
      <div class="slider-container">
        <div id="app">
          <template>
            <div class="block">
              <el-slider
                v-model="value"
                range
                :format-tooltip="formatTooltip"
                :max="maxSliderValue"
              >
              </el-slider>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="video-container">
      <div class="label">原视频</div>
      <video
        class="my-video"
        id="origin-video"
        ref="originVideoRef"
        :src="data.oldVideo"
        controls
      ></video>
    </div>
    <div class="video-container">
      <div class="label">处理后的视频</div>
      <video
        class="my-video"
        id="handle-video"
        ref="handleVideoRef"
        controls
        :src="data.video"
      ></video>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { State } from "@/interfaces/ffmpeginterfaces";

export default defineComponent({
  name: "FFmpeg",
  setup() {
    const ffmpeg = createFFmpeg({
      log: true,
    });
    const data: State = reactive({
      video: null,
      oldVideo: null,
      message: "Click Start to Transcode",
      maxSliderValue: 0,
      value: [0, 0],
      file: null,
    });
    process.env.NODE_ENV === "production" ? "/vue-app/flame.avi" : "/flame.avi";
    // methods
    const toBlob = (base64Data): Blob => {
      let byteString = base64Data;
      if (base64Data.split(",")[0].indexOf("base64") >= 0) {
        byteString = window.atob(base64Data.split(",")[1]); // base64 解码
      } else {
        byteString = unescape(base64Data.split(",")[1]);
      }
      // 获取文件类型
      const mimeString = base64Data.split(";")[0].split(":")[1]; // mime类型

      // ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区
      // let arrayBuffer = new ArrayBuffer(byteString.length) // 创建缓冲数组
      // let uintArr = new Uint8Array(arrayBuffer) // 创建视图

      const uintArr = new Uint8Array(byteString.length); // 创建视图

      for (let i = 0; i < byteString.length; i++) {
        uintArr[i] = byteString.charCodeAt(i);
      }
      // 生成blob
      const blob = new Blob([uintArr], {
        type: mimeString,
      });
      // 使用 Blob 创建一个指向类型化数组的URL, URL.createObjectURL是new Blob文件的方法,可以生成一个普通的url,可以直接使用,比如用在img.src上
      return blob;
    };
    const transformUint8ArrayToBase64 = (array): string => {
      var binary = "";
      for (var len = array.byteLength, i = 0; i < len; i++) {
        binary += String.fromCharCode(array[i]);
      }
      return window.btoa(binary).replace(/=/g, "");
    };
    const formatTooltip = () => {};
    const bindSelectOriginFile = (e): void => {
      console.log("data", data);
      console.log(e);
      data.file = e.target.files[0];
      const url = window.webkitURL.createObjectURL(e.target.files[0]);
      data.oldVideo = url;
    };
    const bindClipBtn = async (): Promise<void> => {
      console.log("data", data);
      data.message = "Loading ffmeg-core.js";
      await ffmpeg.load();
      data.message = "Start transcoding";
      ffmpeg.FS("writeFile", data.file.name, await fetchFile(data.file));
      await ffmpeg.run(
        "-i",
        data.file.name,
        "-ss",
        "0",
        "-to",
        "1",
        "test.mp4"
      );
      data.message = "Complete transcoding";
      const file = ffmpeg.FS("readFile", "test.mp4");
      console.log("file", file);
      let arrayBuffer = transformUint8ArrayToBase64(file);
      console.log("arrayBuffer", arrayBuffer);
      const blob = toBlob(arrayBuffer);
      console.log("blob", blob);
      data.video = URL.createObjectURL(
        new Blob([file.buffer], { type: "video/mp4" })
      );
    };
    return {
      data,
      bindSelectOriginFile,
      bindClipBtn,
      formatTooltip,
      toBlob,
      transformUint8ArrayToBase64,
    };
  },
});
</script>
