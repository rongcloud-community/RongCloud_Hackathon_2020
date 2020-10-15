import Vue from 'vue'
import Vuex from 'vuex'
import myMessage from '@/common/util/message.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        im: null,
        userInfo: null,
		messages: {}, // 所有消息数据
		messageList: {}, // 消息列表
		unreadCount: 0
    },
    mutations: {
		saveIM(state, im) {
		    state.im = im
		},
		login(state, userInfo) {
			state.userInfo = userInfo
			uni.setStorageSync('userInfo', userInfo)
			const user = {token: state.userInfo.token}
			// im 来自 RongIMLib.init 返回的实例，例如：var im = RongIMLib.init({ appkey: ' ' });
			state.im.connect(user).then(function(user) {
				console.log('链接成功, 链接用户 id 为: ', user.id);
			}).catch(function(error) {
				console.log('链接失败: ', error.code, error.msg);
			});
		},
		// 存储消息
		saveMessage(state, message) {
			if (state.messages[message.senderUserId] === undefined) { // 表示之前不存在
				state.messages[message.senderUserId] = [message]
			} else { // 表示之前存在
				state.messages[message.senderUserId].push(message)
			}
		},
		// 更新消息列表
		updateMessageList(state, message) {
			let targetId = message.targetId
			let senderUserId = message.senderUserId
			if (message.content === undefined && state.messageList[targetId] !== undefined) {
				state.messageList[targetId].unreadCount = 0
			} else {
				let content = message.content.content
				state.im.Conversation.getTotalUnreadCount().then(function(totalUnreadCount) {
				  state.unreadCount = totalUnreadCount
				});
				myMessage.initConversation(targetId)
				myMessage.getUnreadCount().then((count) => {
					if (state.messageList[targetId] === undefined) { // 表示之前不存在
						state.messageList[targetId] = message
						state.messageList[targetId].unreadCount = count
					} else { // 表示之前存在
						state.messageList[targetId].content.content = content
						state.messageList[targetId].unreadCount = count
					}
				})
			}
		},
        logout(state) {
            state.userInfo = null
			uni.removeStorageSync('userInfo')
        }
    }
})

export default store
