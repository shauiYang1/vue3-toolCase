import { ElMessage } from "element-plus"; 
const clickHandle = function (e) {
  const {el, binding} = this
  if (e.target !== el) return;
  el.style.position = 'relative';
  el.style.cursor = 'pointer';
  const dom = document.querySelector(binding.value.dialogDom);
  if (!dom) return;
  dom.style.position = 'absolute';
  dom.style.margin = '0';
  const locationInfo = el.getBoundingClientRect();
  const { width, height, left, top } = locationInfo;
  if (dom.parentNode === el) {
    dom.style.top = (height - e.offsetY) < dom.offsetHeight ? (e.offsetY - dom.offsetHeight) + 'px' : e.offsetY + 'px';
    dom.style.left = (width - e.offsetX) < dom.offsetWidth ? (e.offsetX - dom.offsetWidth) + 'px' : e.offsetX + 'px';
  } else {
    dom.style.top = (height - e.offsetY) < dom.offsetHeight ? (top + e.offsetY - dom.offsetHeight) + 'px' : (top + e.offsetY) + 'px';
    dom.style.left = (width - e.offsetX) < dom.offsetWidth ? (left + e.offsetX - dom.offsetWidth) + 'px' : (left + e.offsetX) + 'px';
  }
}
const copyHandle = function (e) {
  const {el, binding} = this
  // if (e.target !== el) return;
  const textarea = document.createElement('textarea')
  textarea.readOnly = 'readOnly'
  textarea.style = {
    position: 'absolute',
    left: '-9999px'
  }
  textarea.value = binding.value?binding.value:el.textContent.trim()
  document.body.appendChild(textarea)
  textarea.select()
  const result = document.execCommand('Copy')
  if (result) {
    ElMessage.success('复制成功')
  }
  document.body.removeChild(textarea)
}
const debounceHandle = function (e) {
  const {binding} = this
  if (this.timer) {
    clearTimeout(this.timer)
  }
  this.timer = setTimeout(() => {
    binding.value()
  }, 1000)
}
const throttleHandle = function (e) {
  const {binding} = this
  console.log(binding)
  if (this.timer) {
    return
  }
  this.timer = setTimeout(() => {
    binding.value()
    this.timer = null
  }, 1000)
}
const draggableHandle = function (e) {
  console.log(e)
  const {el, binding} = this
  const disx = e.pageX - el.offsetLeft
  const disy = e.pageY - el.offsetTop
  let parent = el.parentElement
  let parentWidth = 0, parentHeight = 0
  while (parent) {
    let parentStyle = getComputedStyle(parent)
    if (parentStyle.position === 'relative') {
      // 获取相对定位的父级元素
      parentWidth = parent.clientWidth
      parentHeight = parent.clientHeight
      break
    }
    parent = parent.parentElement
  }
  if (parentWidth === 0 && parentHeight === 0) {
    // 如果没找到就取body
    parentWidth = document.body.clientWidth
    parentHeight = document.body.clientHeight
  }
  document.onmousemove = function (e) {
    let x = e.pageX - disx
    let y = e.pageY - disy 
    let maxX = parentWidth - el.clientWidth
    let maxY = parentHeight - el.clientHeight
    
    x = Math.min(x, maxX)
    y = Math.min(y, maxY)
    x= Math.max(x, 0)
    y= Math.max(y, 0)
    el.style.left = x + 'px'
    el.style.top = y + 'px'
  }
  document.onmouseup = function (e) {
    document.onmouseup = document.onmousemove = null
  }
}
const getEventHandle = function (data){
  const fn = (e) => {
    if (!e._zhibo_vts) {
      e._zhibo_vts = Date.now()
    } else if (e._zhibo_vts <= fn.attached) {
      return
    }
    e.stopPropagation()
    e.preventDefault()
    fn.callBack(e)
  }
  fn.attached = Date.now()
  Object.assign(fn, data)
  return fn
}
export default {
  click: {
    mounted(el, binding, vnode, prevVnode){
      el._zhibo_event = getEventHandle({el, binding, vnode, prevVnode, callBack: clickHandle})
      el.addEventListener('click',  el._zhibo_event);
    },
    // 绑定元素的父组件卸载前调用
    beforeUnmount(el, binding, vnode, prevVnode){
      el.removeEventListener('click',  el._zhibo_event);
      el._zhibo_event = null
    }
  },
  copy: {
    // 根据修饰符目标dom复制v-copy绑定的数据
    mounted(el, binding, vnode, prevVnode) {
      const eventName = binding.arg || 'contextmenu'
      el._zhibo_event = getEventHandle({el, binding, vnode, prevVnode, callBack: copyHandle})
      el.addEventListener(eventName, el._zhibo_event)
    },
    beforeUnmount(el){
      const eventName = binding.arg || 'contextmenu'
      el.removeEventListener(eventName,  el._zhibo_event);
      el._zhibo_event = null
    }
  },
  debounce: {
    // 防抖
    mounted(el, binding, vnode, prevVnode) {
      const eventName = binding.arg || 'click'
      el._zhibo_event = getEventHandle({el, binding, vnode, prevVnode, callBack: debounceHandle, timer: null})
      el.addEventListener(eventName, el._zhibo_event)
    },
    beforeUnmount(el) {
      const eventName = binding.arg || 'click'
      el.removeEventListener(eventName,  el._zhibo_event);
      el._zhibo_event = null
    }
  },
  throttle: {
    // 节流
    mounted(el, binding, vnode, prevVnode) {
      console.log(binding.arg)
      const eventName = binding.arg || 'click'
      el._zhibo_event = getEventHandle({el, binding, vnode, prevVnode, callBack: throttleHandle, timer: null})
      el.addEventListener(eventName, el._zhibo_event)
    },
    beforeUnmount(el) {
      const eventName = binding.arg || 'click'
      el.removeEventListener(eventName,  el._zhibo_event);
      el._zhibo_event = null
    }
  },
  drag: {
    // 拖拽
    mounted(el, binding, vnode, prevVnode) {
      el.style.cursor = 'move'
      el.style.position = 'absolute'
      el._zhibo_event = getEventHandle({el, binding, vnode, prevVnode, callBack: draggableHandle})
      el.addEventListener('mousedown', el._zhibo_event)
    },
    beforeUnmount(el) {
      el.removeEventListener('mousedown',  el._zhibo_event);
      el._zhibo_event = null
    }
  }
};