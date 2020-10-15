import axios from 'axios'
import Base from './base'

class Message extends Base {
  constructor (attrs = {}) {
    super(attrs)
  }

  static async list ({ conversationId, ...params }) {
    const { messages } = await axios.get(`/conversations/${conversationId}/messages`, { params })
    return messages.map(message => new Message(message))
  }

  static async send ({ conversationId, ...attrs }) {
    const { message } = await axios.post(`/conversations/${conversationId}/messages`, { message: attrs })
    return new Message(message)
  }
}

export default Message
