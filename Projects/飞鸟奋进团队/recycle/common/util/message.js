import store from '@/store'
import RongIMLib from '@/lib/RongIMLib-3.0.7-dev.js'
let conversation = null 
// 初始化发送消息对象
const initConversation = (targetId) => {
	conversation = store.state.im.Conversation.get({targetId: targetId, type: RongIMLib.CONVERSATION_TYPE.PRIVATE})
}
// 发送消息
const sendMessage = (content) => {
	return conversation.send({
	  messageType: RongIMLib.MESSAGE_TYPE.TEXT, // 'RC:TxtMsg'
	  content: {
		content: content, // 文本内容
		avatar: store.state.userInfo.avatar, // 发送至头像
		name: store.state.userInfo.name // 发送者姓名
	  }
	})
}

// 获取指定的未读数
const getUnreadCount = () => {
	return conversation.getUnreadCount()
}

// 清空指定的未读数
const hasRead = () => {
	return conversation.read()
}

export default {initConversation, sendMessage, getUnreadCount, hasRead}