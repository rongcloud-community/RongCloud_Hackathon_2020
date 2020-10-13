import Vue from 'vue'
import Framework7 from 'framework7/framework7-lite.esm.bundle.js';
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';
import 'framework7/css/framework7.bundle.css';

import '@/css/icons.css'
import '@/css/app.scss'

import App from '@/components/app.vue'
import store from '@/js/store'
import MessageLib from '@/js/message-lib'
import { setPlatform, setToken } from '@/js/initializers'

// 设置全局使用的 storage
setGloblStorage()

Framework7.use(Framework7Vue)

;(async function () {
  await setPlatform()
  await setToken()

  new Vue({
    el: '#app',
    render: (h) => h(App),
    components: {
      app: App
    },
    store
  })
})()


// 暴露一个全局的 receiveMessagFromRongCloud 方法，是为了给 Android 和 iOS 等
// Native 端调用的。Native 端向 WebView 执行 JS 代码，如 Android 和 iOS 都有类
// 似 `evaluateJavaScript` 方法，即可向 WebView 传递消息。
//
// 该方法模拟 Web 端MessageLib 接收消息，故而所传递的 `message` 参数要**符合
// Web 端的格式**。具体来说，`message` 参数要包含如下字段：
//
// - 'messageType': 当前只完成了 TextMessage 和 ImageMessage 的适配
// - 'content': 这是一个对象，其下包含 'content'、'imageUri'、'extra' 等字段，
//              视 messageType 而定
// - 'receivedTime'
//
window.receiveMessageFromRongCloud = function (message) { 
  MessageLib.receiveFromRongCloud(message) 
}

function setGloblStorage () {
  window.globalStorage = process.env.VUE_APP_STORAGE === 'localStorage'
    ? localStorage
    : sessionStorage
}
