function connect (token) {
  console.log('调用 iOS 的 connect 方法')
  webkit.messageHandlers.rongCloud.postMessage({ 
    action: 'connect',
    data: { token }
  })
}

function disconnect () {
  console.log('调用 iOS 的 disconnect 方法')
  webkit.messageHandlers.rongCloud.postMessage({ 
    action: 'disconnect'
  })
}

function sendToRongCloud (userId, message) {
  console.log('调用 iOS 的 sendToRongCloud 方法')
  webkit.messageHandlers.rongCloud.postMessage({ 
    action: 'sendToRongCloud',
    data: { userId, message }
  })
}

export default {
  connect,
  disconnect,
  sendToRongCloud
}
