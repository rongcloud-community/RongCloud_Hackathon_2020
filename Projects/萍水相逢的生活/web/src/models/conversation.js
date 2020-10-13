import axios from 'axios'
import Base from './base'

class Conversation extends Base {
  constructor (attrs = {}) {
    super(attrs)
  }

  static async list ({ sceneId }) {
    const { conversations } = await axios.get(`/scenes/${sceneId}/conversations`)
    return conversations.map(conversation => new Conversation(conversation))
  }

  static async find (id) {
    let { conversation } = await axios.get(`/conversations/${id}`)
    return new Conversation(conversation)
  }

  static async initiate (params) {
    const { conversation } = await axios.post(`/conversations`, params)
    return new Conversation(conversation)
  }

  async read () {
    await axios.post(`/conversations/${this.id}/read`)
  }

  // 被观察对象的方法在 Vue 中不是响应式的
  getSummaryOfLastMessage () {
    const message = this.lastMessage
    // TODO: 如果 发起了消息，但是不聊，就会出现问题
    if (!message) {
      return null
    }

    switch (message.type) {
      case 'text':
        return message.body.text
      case 'image':
        return '[图片]'
      default:
        return '[未知消息类型]'
    }
  }
}

export default Conversation
