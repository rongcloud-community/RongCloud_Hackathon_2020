/*
  自定义 call 组件
*/
import CallDefinitions from './call.vue'

let _CALL = {
  component: null
}

export default {
  install (Vue) {
    // 挂载 Call 组件
    let CallComponent = Vue.extend(CallDefinitions);
    _CALL.component = new CallComponent();
    let element = _CALL.component.$mount().$el;
    document.body.appendChild(element);

    // 暴露两个有关通话库的方法
    Vue.prototype.$callStart = function (...params) {
      return _CALL.component.call(...params)
    }

    Vue.prototype.$callInit = function () {
      return _CALL.component.init()
    }
  }
}
