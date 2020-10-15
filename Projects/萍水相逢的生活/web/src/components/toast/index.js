/*
  自定义 toast 组件
  调用
  this.$toast('hello world~', {duration: 1500})
*/
let _TOAST = {
  show: false,    // Boolean toast显示状态
  component: null // Object toast组件
};
export default {
  install(Vue) {
    /*
      text: String*
      opts: Object {}
    */
    Vue.prototype.$toast = function(text, opts) {
      let defaultOpts = {
        position: 'center', // String
        duration: 1000,     // Number
        wordWrap: false,    // Boolean
        // width: '90%'     // String/Number
      };
      opts = Object.assign(defaultOpts, opts);
      let wordWrap = opts.wordWrap ? 'zh-word-wrap' : '',
        style = opts.width ? `style="width: ${opts.width}"` : '';
      if (_TOAST.show) {
        return;
      }
      if (!_TOAST.component) {
        let ToastComponent = Vue.extend({
          data: function() {
            return {
              show: _TOAST.show,
              text: text,
              position: `zh-toast-${opts.position}`
            }
          },
          template: `<div v-show="show" :class="position" class="zh-toast ${wordWrap}" ${style}>{{text}}</div>`
        });
        _TOAST.component = new ToastComponent();
        let element = _TOAST.component.$mount().$el;
        document.body.appendChild(element);
      }
      _TOAST.component.position = `zh-toast-${opts.position}`;
      _TOAST.component.text = text;
      _TOAST.component.show = _TOAST.show = true;
      setTimeout(function() {
        _TOAST.component.show = _TOAST.show = false;
      }, opts.duration)
    };
  }
}
