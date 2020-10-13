/* 当前消息处理的格式有两个版本。
 *
 * **版本一**：JSON 格式。
 *
 * 这是推荐的版本。它将所有消息类型一律设置为 TextMessage，并将 content 加密为
 * JSON，字段与平台消息无异，包括：
 *
 * - id: 消息的 id
 * - type: 消息的类型，当前可选值为：`text`、`image`
 * - body: 消息的内容，它是一个对象
 * - time: 消息发送的时间，如果该字段不存在，取融云消息的 receivedTime 字段
 * - direction: 无论值是 `sent` 还是 `received`，忽略这个字端
 * - conversation_id: 会话的 id
 *
 * 在应用这种消息格式进行处理时，有两个注意点：
 *
 * 1. 发送方只需要将平台的 message 转化为 JSON 包装在 TextMessage 内即可，Web 端
 *    处理函数会很好地处理一些边缘情况。
 * 2. 安卓端和 iOS 端无需处理不同版本的消息格式，它们只需要将平台的消息封装成融云
 *    的消息格式转发给 Web 端即可（通过 WebView）。
 *
 * **版本二**：传统消息格式。
 *
 * 传统消息格式只能处理 TextMessage 和 ImageMessage，它将我们平台的消息映射为融云
 * 的这两种消息格式，处理繁琐，应为过时的方式。
 *
 */

import store from '../store'
import webAdapter from './web-adapter'
import androidAdapter from './android-adapter'
import iosAdapter from './ios-adapter'

webAdapter.onReceiveMessage = receiveFromRongCloud

let adapter = null
const listeners = []

function setPlatform (platform) {
  switch(platform) {
    case 'web':
      adapter = webAdapter
      break
    case 'android':
      adapter = androidAdapter
      break
    case 'ios':
      adapter = iosAdapter
      break
    default:
      throw new Error('未知的平台', platform)
  }
}

function addListener (listen) {
  listeners.push(listen)
}

function removeListener (listen, success, error) {
  const index = listeners.indexOf(listen)
  if (index >= 0) {
    listeners.splice(index, 1)
    success && success()
  } else {
    error && error()
  }
}

function connect (token) {
  // TODO: 这里经行出现 null exception
  return adapter.connect(token)
}

function disconnect () {
  return adapter.disconnect()
}

function sendToRongCloud (userId, message) {
  return adapter.sendToRongCloud(userId, message)
}

function receiveFromRongCloud (rongMessage) {
  console.log('收到融云发来的新消息:', rongMessage);

  let matches = null
  let message = null
  const extra = rongMessage.content.extra

  // 首先，将融云的格式转化为自己的格式
  if (extra === 'json') {
    message = parseJsonMessage(rongMessage)
  } else if (matches = /^id:(\d+),conversation:(\d+)$/.exec(extra)) {
    const [_, messageId, conversationId] = matches.map(m => parseInt(m))
    message = parseTraditionalMessage(rongMessage, messageId, conversationId)
  } else {
    console.error('消息格式错误, extra is', extra)
    return
  }

  console.log('解析融云消息为', message)
  for (const listen of listeners) {
    listen(message)
  }
}

function parseJsonMessage (rongMessage) {
  console.assert(rongMessage.messageType === 'TextMessage')
  console.assert(rongMessage.content.extra === 'json')

  let message = JSON.parse(rongMessage.content.content)
  return Object.assign({ type: 'text', time: rongMessage.receivedTime }, message, { direction: 'received' })
}

function parseTraditionalMessage (rongMessage, id, conversationId) {
  let content = null
  if (rongMessage.messageType === 'ImageMessage') {
    content = { type: 'image', body: JSON.parse(rongMessage.content.imageUri) }
  } else {
    content = { type: 'text', body: JSON.parse(rongMessage.content.content) }
  }

  const time = new Date(rongMessage.receivedTime) || new Date()
  return {
    id,
    ...content,
    time,
    direction: 'received',
    conversationId
  }
}

export default {
  setPlatform,
  addListener,
  removeListener,
  connect,
  disconnect,
  sendToRongCloud,
  receiveFromRongCloud
}
