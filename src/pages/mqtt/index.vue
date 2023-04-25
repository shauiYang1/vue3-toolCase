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