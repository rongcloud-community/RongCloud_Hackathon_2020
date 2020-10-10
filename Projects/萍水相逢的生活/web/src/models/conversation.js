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

  static async initiate ({ sourceSceneId, targetSceneNumber }) {
    const { conversation } = await axios.post(`/scenes/${sourceSceneId}/conversations`, { targetSceneNumber })
    return new Conversation(conversation)
  }

  async read () {
    await axios.post(`/conversations/${this.id}/read`)
  }

  // 被观察对象的方法在 Vue 中不是响应式的
  getSummaryOfLastMessage () {
    const message = this.lastMessage
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
