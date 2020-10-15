<script>
	import {
	    mapMutations
	} from 'vuex'
	export default {
		globalData: {
			text: 'text111'
		},
		onLaunch: function() {
			const config = {
			  appkey: 'kj7swf8oknog2',
			}
			const im = this.$RongIMLib.init(config)
			this.saveIM(im)
			this.giveWatch(im)
			this.giveConnect()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			...mapMutations(['saveIM', 'login', 'saveMessage', 'updateMessageList']),
			// 设置监听
			giveWatch: function(im) {
				const _this = this
				var conversationList = []; // 当前已存在的会话列表
				im.watch({
				  conversation: function(event){
				    var updatedConversationList = event.updatedConversationList; // 更新的会话列表
				    console.log('更新会话汇总:', updatedConversationList);
				    console.log('最新会话列表:', im.Conversation.merge({
				      conversationList,
				      updatedConversationList
				    }));
				  },
				  message: function(event){
				    const message = event.message;
					_this.saveMessage(message)
					_this.updateMessageList(message)
				    console.log('收到新消息:', message);
				    console.log('messages:', _this.$store.state.messages);
				  },
				  status: function(event){
				    var status = event.status;
				    console.log('连接状态码:', status);
				  },
				  expansion: function(event) {
				    var updatedExpansion = event.updatedExpansion;
				    var deletedExpansion = event.deletedExpansion;
				    console.log('消息扩展已更新', updatedExpansion);
				    /*
				      {
				        expansion: { key: 'value' }, // 设置或更新的扩展值
				        messageUId: 'URIT-URIT-ODMF-DURR' // 设置或更新扩展的消息 uid
				      }
				    */
				    console.log('消息扩展被删除', deletedExpansion);
				    /*
				      {
				        deletedKeys: ['key1', 'key2'], // 删除的扩展键值集合
				        messageUId: 'URIT-URIT-ODMF-DURR' // 删除扩展的消息 uid
				      }
				    */
				  },
				  chatroom: function(event) {
				    var updatedEntries = event.updatedEntries;
				    console.log('聊天室 KV 存储监听更新:', updatedEntries);
				    /* 
				      [{
				        "key": "name",
				        "value": "我是小融融",
				        "timestamp": 1597591258338, 
				        "chatroomId": "z002", 
				        "type": 1 // 1: 更新（ 含:修改和新增 ）、2: 删除
				     }]
				     */
				  }
				});
			},
			
			// 建立连接
			giveConnect: function () {
				const userInfo = uni.getStorageSync("userInfo")
				if (userInfo === '' || userInfo === null || userInfo === undefined) { 
					uni.navigateTo({
						url: 'pages/login/login'
					})
				} else {
					this.login(userInfo)
				}
				
			},
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
