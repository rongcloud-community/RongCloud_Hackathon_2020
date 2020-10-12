<template>
	<view>
		<view class="content" @scroll="delStatus">
			<view :class="search">
				<view :class="showStatus==true?'placeholder_hover':'placeholder'">
					{{search_placeholder}}
				</view>
				<input type="text" :value="searchContent" @input="searchCon" @blur="searchBarChange" @focus="searchFocus" class="searchBar"/>
				<view :class="showStatus==true?'searchBtn':'searchBtn_hover'" @click.native.stop="sear">
					搜索
				</view>
			</view>
			<view class="text">
				<view class="human-box" v-for="(conver, index) in conversation" :key="index" @click="talk(conver.targetId, index)" hover-class="human-box-hover" @longpress="deleteCon(conver.targetId)">
					<view :class="deleteId==conver.targetId?'left_del':'left'">
						<image :src="conver.img" mode="" style="border-radius: 10upx;width: 100upx;height: 100upx;"></image>
						<view class="dot" v-show="conver.unreadMessageCount != 0">
							<text style="font-size: 18upx;">{{ conver.unreadMessageCount }}</text>
						</view>
					</view>
					<view :class="deleteId==conver.targetId?'center_del':'center'">
						<p style="font-weight: 550;font-size: 35upx;display: inline-block;">{{ conver.nickname }}</p>
						<p style="color: #999999;font-size: 27upx;font-weight: 500;margin-top: 10upx;text-overflow: ellipsis;overflow: hidden;white-space:nowrap; ">{{ conver.latestMessage.content.content }}</p>
					</view>
					<view :class="deleteId==conver.targetId?'right_del':'right'">
						<p style="display: inline-block;color: #999999;font-size: 27upx;font-weight: 500;">{{ conver.sentTime }}</p>
					</view>
					<view class="delete" @click.native.stop="delConver" v-show="deleteId == conver.targetId">	
						<view :class="deleteId == conver.targetId?'one':'one_hide'"></view>
						<view :class="deleteId == conver.targetId?'two':'two_hide'"></view>
					</view>
				</view>
			</view>	
		</view>
	</view>
</template>

<script>
import RongIMLib from '../RongIMLib.miniprogram-1.1.3.js';
export default {
	created() {
		
	},
	data() {
		return {
			val0: '',
			val1: '',
			val2: '',
			val3: '',
			placeholder: '动态占位内容',
			nickName: '',
			avataUrl: '',
			conversation: [],
			id: '',
			deleteId:'',
			searchBar:'searchBar',
			searchContent:'',
			showStatus:false,
			search:'search',
			search_placeholder:'请输入搜索内容'
		};
	},
	onLoad() {
		//融云
		this.$rongyun();
		var that = this;
		var openid = uni.getStorageSync('openId');
		var nickName = uni.getStorageSync('nickName');
		var avatarUrl = uni.getStorageSync('avatarUrl');
		uni.request({
			url:'https://zmetalhearty.com/yuanpin/Ronglogin',
			header: {
			    'content-type': 'application/x-www-form-urlencoded'
			},
			method:'POST',
			data:{
				userId:openid
			},
			success: (res) => {
				var token = res.data.token;
				RongIMLib.RongIMClient.connect(token, {
				  onSuccess: function(userId) {
				    console.log('连接成功, 用户 id 为', userId);
					uni.setStorageSync('userId',userId);// 连接已成功, 此时可通过 getConversationList 获取会话列表并展示
					var conversationTypes = [ RongIMLib.ConversationType.PRIVATE ];
					var count = 150;
					RongIMLib.RongIMClient.getInstance().getConversationList({
					  onSuccess: function(list) {
					    console.log('获取会话列表成功', list);
						var arr = JSON.stringify(list);
						uni.request({
							url: 'https://zmetalhearty.com/yuanpin/FrontTools',
							method: 'POST',
							header: {
							    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
							},
							data: {
								json:arr
							},
							success: res => {
								console.log('上传会话成功');
								var conversation = res.data;
								for(var i=0;i<conversation.length;i++) {
									// var date = new Date(conversation[i].sentTime);
									// var time = date.toLocaleString();
									var time = that.changeTime(conversation[i].sentTime);
									conversation[i].sentTime = time;
									if(conversation[i].latestMessage.messageType=='ImageMessage') {
										//conversation[i].latestMessage.content.messageName='图片';
										conversation[i].latestMessage.content.content = '[图片]';
									}else if(conversation[i].latestMessage.messageType=='FileMessage')
									conversation[i].latestMessage.content.content = '[语音]'
								}
								that.$store.commit('updateConver',conversation);
								uni.setStorageSync('conversation',conversation);
								that.conversation = that.$store.state.conversation;
							}
						});
					},
					  onError: function(error) {
					    console.log('获取会话列表失败', error);
					  }
					}, conversationTypes, count);
				  },
				  onTokenIncorrect: function() {
				    console.log('连接失败, 失败原因: token 无效');
				  },
				  onError: function(errorCode) {
				    var info = '';
				    switch (errorCode) {
				      case RongIMLib.ErrorCode.TIMEOUT:
				        info = '链接超时';
				        break;
				      case RongIMLib.ConnectionState.UNACCEPTABLE_PAROTOCOL_VERSION:
				        info = '不可接受的协议版本';
				        break;
				      case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
				        info = 'appkey 不正确';
				        break;
				      case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
				        info = '服务器不可用';
				        break;
				      default:
				        info = errorCode;
				        break;
				    }
				    console.log('连接失败, 失败原因: ', info);
				  }
				});
			}
		})
	},
	onShow() {
		uni.setStorageSync('msgTargetId',0);
		var conversation = uni.getStorageSync('conversation');
		this.$store.commit('updateConver',conversation);
		this.conversation = this.$store.state.conversation;
	},
	onHide() {
		this.deleteId = '';
	},
	onUnload() {
		this.deleteId = '';
	},
	methods: {
		sear() {
			var e = this.searchContent;
			if(e=='') {
				uni.request({
					url:'https://zmetalhearty.com/yuanpin/HomeItemsOperator',
					method:'POST',
					header: {
					    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
					},
					data:{
						operation:'searchHomeItem',
						name:e
					},
					success: (res) => {
						if(res.data.search!=[]) {
							var searchArray = JSON.stringify(res.data.search);
							uni.navigateTo({
								url:'/pages/resault/resault?array='+searchArray
							})
						}else if(res.data.search==[]) {
							uni.showToast({
								title:'搜索无结果！',
								icon:'none',
								duration:1000
							})
						}
					}
				})
			}
			if(e!='') {
				if(isNaN(Number(e))) {
					uni.showToast({
						title:'请输入用户名进行搜索',
						icon:'none',
						duration:1000
					})
				}else if (typeof (Number(e)) == 'number') {
					var sourseId = uni.getStorageSync('ID');
					uni.request({
						url:'https://zmetalhearty.com/yuanpin/GetUserInfoInRong',
						method:'POST',
						header: {
						    'content-type': 'application/x-www-form-urlencoded'
						},
						data:{
							Focus:sourseId,
							ID:e
						},
						success: (res) => {
							if(res.data.code==1) {
								uni.navigateTo({
									url:'../info/info?targetName='+res.data.nickname+'&targetId='+res.data.ID+'&avatarUrl='+res.data.img+'&sex='+res.data.sex+'&type='+res.data.status
								})
							}else if(res.data.code==0) {
								uni.showToast({
									title:'搜索无结果！',
									icon:'none',
									duration:1000
								})
							}
						}
					})
				}
			}
			this.searchContent = '';
		},
		searchCon(e) {
			this.searchContent = e.detail.value;
			if(this.searchContent.length!=0) {
				this.search_placeholder=''
			}else {
				this.search_placeholder='请输入搜索内容'
			}
		},
		searchBarChange() {
			this.search = 'search';
			this.showStatus = false;
		},
		searchFocus() {
			this.search = 'search_hover';
			this.showStatus = true;
		},
		delStatus() {
			this.deleteId = '';
		},
		changeTime(time) {
		  var date = new Date(time);
		  var m = date.getMonth() + 1;
		  m = m < 10 ? ('0' + m) : m;
		  var d = date.getDate();
		  d = d < 10 ? ('0' + d) : d;
		  var h = date.getHours();
		  h = h < 10 ? ('0' + h) : h;
		  var minute = date.getMinutes();
		  minute = minute < 10 ? ('0' + minute) : minute;
		  // return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;//年月日时分秒
		  return m + '-' + d + ' ' + h + ':' + minute;
		},
		deleteCon(id) {
			if(this.deleteId=='') {
				this.deleteId = id;
			}else {
				this.deleteId = '';
			}
		},
		delConver() {
			var that = this;
			var conversationType = RongIMLib.ConversationType.PRIVATE;
			var targetId = this.deleteId;
			RongIMLib.RongIMClient.getInstance().removeConversation(conversationType, targetId, {
			  onSuccess: function(bool) {
			    console.log('删除指定会话成功');
				var conver = that.$store.state.conversation;
				for(var i=0;i<conver.length;i++) {
					if(conver[i].targetId==targetId) {
						conver.splice(i,1);
						that.$store.commit('updateConver',conver);
						uni.setStorageSync('conversation',conver);
					}
				}
			  },
			  onError: function(error) {
			    console.log('删除指定会话失败', error);
			  }
			});
		},
		talk(id, index) {
			this.showDelete = false;
			var conversationType = RongIMLib.ConversationType.PRIVATE;
			var targetId = id;
			var count = 0;
			var sourseId = uni.getStorageSync('ID');
			console.log(targetId);
			RongIMLib.RongIMClient.getInstance().getConversation(conversationType, targetId, {
				onSuccess: function(conversation) {
					if (conversation) {
						console.log('获取指定会话成功', conversation);
					}
				}
			});
			for(var u=0;u<this.conversation.length;u++) {
				count = count+this.conversation[u].unreadMessageCount;
			}
			count = count - this.conversation[index].unreadMessageCount;
			count = count.toString();
			if(count>0) {
				uni.showTabBarRedDot({
					index:2
				})
			}else if(count==0) {
				uni.hideTabBarRedDot({
					index:2
				})
			}
			this.conversation[index].unreadMessageCount = 0;
			uni.setStorageSync('conversation', this.conversation);
			var conversationType = RongIMLib.ConversationType.PRIVATE;
			RongIMLib.RongIMClient.getInstance().clearUnreadCount(conversationType, targetId, {
			  onSuccess: function() {
			    console.log('清除指定会话未读消息数成功');
			  },
			  onError: function(error) {
			    console.log('清除指定会话未读消息数失败', error);
			  }
			});
			uni.request({
				url:'https://zmetalhearty.com/yuanpin/GetUserInfoInRong',
				method:'POST',
				header: {
				    'content-type': 'application/x-www-form-urlencoded'
				},
				data:{
					Focus:sourseId,
					ID:targetId
				},
				success: (res) => {
					if(res.data.code==1) {
						uni.navigateTo({
							url:'../HM-chat/HM-chat?avatarUrl='+res.data.img+'&uName='+res.data.nickname+'&targetId='+res.data.ID+'&fromPin='+'0'
						})
					}
				}
			})
		}
	}
};
</script>

<style>
@import url("../../static/css/message.css");
</style>
