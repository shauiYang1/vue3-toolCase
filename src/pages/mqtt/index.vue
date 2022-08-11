<!--
 * @Author: yangshuai u9h_75bugk181@dingtalk.com
 * @Date: 2022-08-11 15:10:25
 * @LastEditors: yangshuai u9h_75bugk181@dingtalk.com
 * @LastEditTime: 2022-08-11 18:42:24
 * @FilePath: \vue3-test\src\pages\mqtt\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="mqtt">mqtt</div>
</template>
<script lang='ts'>
import { onMounted } from "vue";
import { defineComponent } from "@vue/composition-api";
import Mqtt from "@/mqtt";

export default defineComponent({
  name: "MQTT",
  setup() {
    onMounted(async () => {
      initMqtt();
    });
    const initMqtt = () => {
      const mqtt = new Mqtt("broker.emqx.io", 8083);
      mqtt.connect(
        {
          username: "test",
          password: "123456",
          clean: true,
          path: "/mqtt",
        },
        (topic, message) => {
          console.log(topic, message.toString());
        }
      );
      mqtt.subscribe("my/test/#", 0);
    };
    return {
      initMqtt,
    };
  },
});
</script>