import Vue from 'vue'
import CallComponent from '@/components/call'

let onReceiveMessage = null
let inited = false
const statusExplains = {
  0: '连接成功',
  1: '当前设备网络不可用',
  2: '用户主动断开链接',
  6: '当前用户在其他设备上登录，此设备被踢下线'
}

function connect (token) {
  if (!inited) {
    /* 初始化 RongIMLib */
    console.log('初始化消息库')
    RongIMLib.RongIMClient.init('pvxdm17jpe4ir')

    /* 设置 IM 连接的监听器 */
    RongIMClient.setConnectionStatusListener({
      onChanged: function (status) {
        console.log('连接状态改变', status, statusExplains[status] || '')
      }
    })
    RongIMClient.setOnReceiveMessageListener({
      onReceived: onReceiveMessage 
    })

    /* 初始化 RongCallLib */
    Vue.use(CallComponent)
    Vue.prototype.$callInit()

    inited = true
  }

  // 返回指示连接的 Promise
  const targetId = this.targetIdInRongCloud; // 用户 B 的 userId 
  return new Promise((resolve, reject) => {
    RongIMClient.connect(token, {
      onSuccess: function(userId) {
        console.log('连接 IM 成功, 连接用户 id 为: ', userId)
        resolve()
      },
      onTokenIncorrect: function() {
        console.error('连接失败, 失败原因: token 无效')
        reject()
      },
      onError: function(errorCode) {
        console.error('连接失败, 失败原因: ', errorCode);
        reject(errorCode)
      }
    })
  })
}

function disconnect () {
  console.log('断开连接')
  RongIMClient.getInstance().disconnect()
}

function sendToRongCloud (userId, message) {
  const rongMessage = new RongIMLib.TextMessage({
    content: JSON.stringify(message),
    extra: 'json'
  })

  const conversationType = RongIMLib.ConversationType.PRIVATE; // 单聊
  const targetId = userId.toString() // 用户 B 的 userId 
  RongIMClient.getInstance().sendMessage(conversationType, targetId, rongMessage, {
    onSuccess: function (rongMessage) {
      // message 为发送的消息对象并且包含服务器返回的消息唯一 ID 和发送消息时间戳
      console.log('发送消息到融云成功', rongMessage)
    },
    onError: function (errorCode, message) {
      console.error('发送消息到融云错误', errorCode)
    }
  })
}

export default {
  connect,
  disconnect,
  sendToRongCloud,
  set onReceiveMessage (receiveMessage) {
    onReceiveMessage = receiveMessage
  }
}
