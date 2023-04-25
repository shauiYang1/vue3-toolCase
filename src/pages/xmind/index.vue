<template>
  <div class="x-mind">
    <ul class="option">
      <li class="rect" data-type="rect" @mousedown="startDrag">Rect</li>
      <li class="circle" data-type="circle" @mousedown="startDrag">Circle</li>
      <li class="custom-polygon" data-type="custom-polygon" @mousedown="startDrag">custom-polygon</li>
    </ul>
    <div id="container" ref="containerRef"></div>
  </div>
</template>
<script lang='ts' setup>
import { onMounted, ref } from "vue";
import { Graph } from '@antv/x6';
import { Dnd } from "@antv/x6-plugin-dnd";
import optionFun from './option.js'
import drag from './drag.js'


const graph = ref(null)
const dnd = ref(null)
const containerRef = ref()
const data = {
  nodes: [
    {
      id: 'node1',
      shape: 'rect', // 使用 rect 渲染
      x: 100,
      y: 200,
      width: 80,
      height: 40,
      label: 'hello',
    },
    {
      id: 'node2',
      shape: 'ellipse', // 使用 ellipse 渲染
      x: 300,
      y: 200,
      width: 80,
      height: 40,
      label: 'world',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
};
onMounted(() => {
  initMqtt();
});
const initMqtt = () => {
  graph.value = new Graph({
    container: containerRef.value,
    autoResize: true,
    grid: {
      size: 20,      // 网格大小 10px
      visible: true, // 绘制网格，默认绘制 dot 类型网格
      type: 'doubleMesh',
      args: [
        {
          color: '#AB9B9B', // 主网格线颜色
          thickness: 0.5,     // 主网格线宽度
        },
        {
          color: '#0e0c0c', // 次网格线颜色
          thickness: 0.5,     // 次网格线宽度
          factor: 10,        // 主次网格线间隔
        },
      ],
    },
    panning: true,  // 是否可拖拽画布
    mousewheel: { // 画布缩放
      enabled: true,
      modifiers: ['ctrl', 'meta'],
    }
  });
  const { source, target } = optionFun(graph.value)
  dnd.value = new Dnd({
    target: graph.value,
  });
  console.log('graph', graph.value)
  graph.value.fromJSON(data)
};
const startDrag = (e) => {
  console.log('e', e, dnd.value)
  const type = e.target.getAttribute('data-type')
  console.log('type', type)
  const node = drag(graph.value, type)
  dnd.value.start(node, e);
}

</script>
<style lang="scss" scoped>
.x-mind {
  display: flex;
  width: 100%;
  height: 100%;

  .option {
    width: 120px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    &>li {
      list-style: none;
      cursor: move;

      &.rect {
        width: 100px;
        height: 40px;
        margin: 16px;
        line-height: 40px;
        text-align: center;
        border: 1px solid #8f8f8f;
        border-radius: 6px;
      }

      &.circle {
        width: 60px;
        height: 60px;
        border: 1px solid #8f8f8f;
        border-radius: 50%;
      }
      &.custom-polygon{
        
      }
    }
  }

  #container {
    width: calc(100% - 120px);
    height: 100%;
  }
}
</style>
