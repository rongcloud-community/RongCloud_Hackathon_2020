<template>
	<view>
		<view class="content" @touchstart="hideDrawer">
			<scroll-view class="msg-list" scroll-y="true" :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop" :scroll-into-view="scrollToView" @scrolltoupper="loadHistory" upper-threshold="50">
				<!-- 加载历史数据waitingUI -->
				<view class="loading" v-if="isHistoryLoading">
					<view class="spinner">
						<view class="rect1"></view>
						<view class="rect2"></view>
						<view class="rect3"></view>
						<view class="rect4"></view>
						<view class="rect5"></view>
					</view>
				</view>
				<view class="row" v-for="(row,key) in msgList" :key="key" :id="row.messageUId">
					<!-- 系统消息 -->
					<block v-if="row.messageType=='system'" >
						<view class="system">
							<!-- 文字消息 -->
							<view v-if="row.type=='time'" class="text">
								{{row.content}}
							</view>
						</view>
					</block>
					<block v-if="row.messageType=='getPin'" >
						<view class="system">
							<!-- 文字消息 -->
							<view class="text" style="color: #30C6B0;background-color: #FFFFFF;" @click="pin">
								{{row.content}}
							</view>
						</view>
					</block>
					<block v-if="row.content.extra.type=='system'" >
						<view class="system">
							<!-- 文字消息 -->
							<view class="text">
								{{row.content.extra.content}}
							</view>
						</view>
					</block>
					
					<!-- 用户消息 -->
					<block>
						<!-- 自己发出的消息 -->
						<view class="my" v-if="row.senderUserId== myId&&row.content.extra.type!='system' ">
							<!-- 左-消息 -->
							<view class="left">
								<!-- 文字消息 -->
								<view v-if="row.messageType=='TextMessage'&&row.content.extra.type!='pin'&&row.content.extra.type!='system'" class="bubble" style="max-height: 5000upx;">
									<rich-text :nodes="row.content.extra"></rich-text>
								</view>
								<!-- 语言消息 -->
								<view v-if="row.content.type=='mp3'" class="bubble voice" @tap="playVoice(row)" :class="playMsgid == row.messageUId?'play':''">
									<view class="length">{{row.content.name}}</view>
									<view class="icon my-voice"></view>
								</view>
								<!-- 图片消息 -->
								<view v-if="row.messageType=='ImageMessage'" class="bubble img">
									<image :src="row.content.imageUri"  mode="widthFix" @tap="showPic(row.content)"></image>
								</view>
								<!-- pin消息 -->
								<block v-if="row.content.extra.type=='pin'">
									<view class="pinByMe">
										<text>您发起了ta标题为</text><text style="color: #30C6B0;">{{row.content.extra.title}}</text><text>的缘拼请求</text>
									</view>
								</block>
							</view>
							<!-- 右-头像 -->
							<view class="right">
								<image :src="myAvatarUrl"></image>
							</view>
						</view>
						<!-- 别人发出的消息 -->
						<view class="other" v-if="row.senderUserId== targetId&&row.content.extra.type!='system'">
							<!-- 左-头像 -->
							<view class="left">
								<image :src="avatarUrl" @click="jump('friend')"></image>
							</view>
							<!-- 右-用户名称-时间-消息 -->
							<view class="right">
								<view class="username">
									<view class="name">{{uName}}</view> <view class="time">{{row.msg.time}}</view>
								</view>
								<!-- 文字消息 -->
								<view v-if="row.messageType=='TextMessage'&&row.content.extra.type!='pin'&&row.content.extra.type!='system'" class="bubble" style="max-height: 5000upx;">
									<rich-text :nodes="row.content.extra"></rich-text>
								</view>
								<!-- 语音消息 -->
								<view v-if="row.content.type=='mp3'" class="bubble voice" @tap="playVoice(row)" :class="playMsgid == row.messageUId?'play':''">
									<view class="icon other-voice"></view>
									<view class="length">{{row.content.name}}</view>
								</view>
								<!-- 图片消息 -->
								<view v-if="row.messageType=='ImageMessage'" class="bubble img">
									<image :src="row.content.imageUri" mode="widthFix" @tap="showPic(row.content)"></image>
								</view>
								<!-- pin消息 -->
								<block v-if="row.content.extra.type=='pin'">
									<view class="pinByYou">
										<view class="pin-title">
											<text v-if="row.senderUserId != myId">{{uName}}想参与您标题为</text><text style="color: #30C6B0;">{{row.content.extra.title}}</text><text>的缘拼</text>
										</view>
										<view class="yesOrNo">
											<view class="no" @click="disagree">
												拒绝
											</view>
											<view class="yes" @click="agree(row.content.extra.id)">
												同意
											</view>
										</view>
									</view>
								</block>
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
		<!-- 抽屉栏 -->
		<view class="popup-layer" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- 表情 --> 
			<swiper class="emoji-swiper" :class="{hidden:hideEmoji}" indicator-dots="true" duration="150">
				<swiper-item v-for="(page,pid) in emojiList" :key="pid">
					<view v-for="(em,eid) in page" :key="eid" @tap="addEmoji(em)">
						<image mode="widthFix" :src="'https://zmetalhearty.com/yuanpin/emoji/'+em.url"></image>
					</view>
				</swiper-item>
			</swiper>
			<!-- 更多功能 相册-拍照-红包 -->
			<view class="more-layer" :class="{hidden:hideMore}">
				<view class="list">
					<view class="box" @tap="chooseImage"><view class="icon tupian2"></view></view>
					<view class="box" @tap="camera"><view class="icon paizhao"></view></view>
					<view class="box" @tap="pin"><image src="../../static/icon/拼.png" mode="" style="width: 70upx;height: 70upx;"></image></view>
				</view>
			</view>
		</view>
		<!-- 底部输入栏 -->
		<view class="input-box" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- H5下不能录音，输入栏布局改动一下 -->
			<!-- #ifndef H5 -->
			<view class="voice">
				<view class="icon" :class="isVoice?'jianpan':'yuyin'" @tap="switchVoice"></view>
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<!-- #endif -->
			<view class="textbox">
				<view class="voice-mode" :class="[isVoice?'':'hidden',recording?'recording':'']" @touchstart="voiceBegin" @touchmove.stop.prevent="voiceIng" @touchend="voiceEnd" @touchcancel="voiceCancel">{{voiceTis}}</view>
				<view class="text-mode"  :class="isVoice?'hidden':''">
					<view class="box">
						<textarea :focus="getFocus" show-confirm-bar="false" hold-keyboard="true" @input="spaceStatus" @confirm="sendText" style="max-height: 200upx;" auto-height="true" :cursor-spacing="space==0?100:0" v-model="textMsg" @focus="textareaFocus" maxlength="-1"/>
					</view>
					<view class="em" @tap="chooseEmoji">
						<view class="icon biaoqing"></view>
					</view>
				</view>
			</view>
			<!-- #ifndef H5 -->
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<!-- #endif -->
			<view class="send" :class="isVoice?'hidden':''" @tap="sendText">
				<view class="btn">发送</view>
			</view>
		</view>
		<!-- 录音UI效果 -->
		<view class="record" :class="recording?'':'hidden'">
			<view class="ing" :class="willStop?'hidden':''"><view class="icon luyin2" ></view></view>
			<view class="cancel" :class="willStop?'':'hidden'"><view class="icon chehui" ></view></view>
			<view class="tis" :class="willStop?'change':''">{{recordTis}}</view>
		</view>
		<!-- popup -->
		<uni-popup ref="popup" type="center" style="z-index: 999">
			<view class="pop-title">
				ta的缘拼
			</view>
			<view class="empty" v-if="sendEmpty">
				ta还没有发布过缘拼呢~
			</view>
			<scroll-view class="pop" scroll-y="true" v-if="!sendEmpty">
				<view class="viewBox" v-for="(view,index) in sendArray" :key="index" @click="choose(view)">
					<view class="view-title">
						<view class="title-text">
							{{view.title}}
						</view>
						<view class="title-time">
							{{view.date}} {{view.time}}
						</view>
					</view>
					<view class="view-content">
						{{view.details}}
					</view>
					<view :class="view.type=='travel'?'location':'location1'">
						<view :class="view.type=='travel'?'view-location':'view-location1'">
							<view class="location-left">
								<image v-if="view.type=='travel'" style="width: 34upx;height: 34upx;" src="../../static/image/-departure.png" mode=""></image>
								<image v-if="view.type!='travel'" src="../../static/icon/address.png" mode=""></image>
							</view>
							<view :class="view.type=='travel'?'location-right':'location-right1'">
								<text v-if="view.type=='travel'">{{view.pstart.name}}</text>
								<text v-if="view.type!='travel'">{{view.address.name}}</text>
							</view>
						</view>
						<view class="view-location" v-if="view.type=='travel'">
							<view class="location-left">
								<image src="../../static/image/-landing.png" style="width: 34upx;height: 34upx;" mode=""></image>
							</view>
							<view class="location-right">
								<text v-if="view.type=='travel'">{{view.pend.name}}</text>
							</view>
						</view>
					</view>
					<view class="view-user">
						<view class="user-left">
							<image :src="view.Userimg" mode=""></image>
							<view class="name-type">
								<text class="name">{{view.nickname}}</text>
								<view :class="view.type=='food'?'food':(view.type=='travel'?'travel':(view.type=='study'?'study':(view.type=='game'?'game':'none')))">
									<text v-if="view.type=='food'" class="food-text">拼美食</text>
									<text v-if="view.type=='travel'" class="travel-text">拼出行</text>
									<text v-if="view.type=='study'" class="study-text">拼学习</text>
									<text v-if="view.type=='game'" class="game-text">拼娱乐</text>
								</view>
							</view>
						</view>
						<view class="user-right">
							<image src="../../static/icon/like.png" mode="" id="like"></image>
							<text>{{view.likeCount}}</text>
							<image src="../../static/icon/comment.png" id="comment" mode=""></image>
							<text>{{JSON.parse(view.Comment).length}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="pop-bottom" hover-class="pop-bottom-hover" @click="hidePop">
				取  消
			</view>
		</uni-popup>
	</view>
</template>

<script> 
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import RongIMLib from '../RongIMLib.miniprogram-1.1.3.js';
	export default {
		data() {
			return {
				//文字消息
				textMsg:'',
				space:'',
				getFocus:false,
				//消息列表
				isHistoryLoading:false,
				scrollAnimation:false,
				scrollTop:0,
				scrollToView:'',
				msgList:[],
				msgImgList:[],
				myuid:0,
				targetId:'',
				//录音相关参数
				// #ifndef H5
				//H5不能录音
				RECORDER:uni.getRecorderManager(),
				// #endif
				isVoice:false,
				voiceTis:'按住 说话',
				recordTis:"手指上滑 取消发送",
				recording:false,
				willStop:false,
				initPoint:{identifier:0,Y:0},
				recordTimer:null,
				recordLength:0,
				//播放语音相关参数
				AUDIO:uni.createInnerAudioContext(),
				playMsgid:null,
				VoiceTimer:null,
				// 抽屉参数
				popupLayerClass:'',
				// more参数
				hideMore:true,
				//表情定义
				hideEmoji:true,
				emojiList:[
					[{"url":"0.png",alt:"[微笑]"},{"url":"1.png",alt:"[伤心]"},{"url":"2.png",alt:"[高兴]"},{"url":"3.png",alt:"[有些不爽]"},{"url":"4.png",alt:"[不舒服]"},{"url":"5.png",alt:"[亲亲]"},{"url":"6.png",alt:"[生气]"},{"url":"7.png",alt:"[流泪]"},{"url":"8.png",alt:"[无语]"},{"url":"9.png",alt:"[吐舌笑]"},{"url":"10.png",alt:"[惊吓]"},{"url":"11.png",alt:"[流汗]"},{"url":"12.png",alt:"[小声]"},{"url":"13.png",alt:"[气的冒烟]"},{"url":"14.png",alt:"[戴口罩]"},{"url":"15.png",alt:"[疑问]"},{"url":"16.png",alt:"[紧张]"},{"url":"17.png",alt:"[呕吐]"},{"url":"18.png",alt:"[面无表情]"},{"url":"19.png",alt:"[祝贺]"},{"url":"20.png",alt:"[泪眼]"},{"url":"21.png",alt:"[白眼]"},{"url":"22.png",alt:"[鬼脸]"},{"url":"23.png",alt:"[哭笑不得]"}],
					[{"url":"24.png",alt:"[发烧]"},{"url":"25.png",alt:"[惊讶]"},{"url":"26.png",alt:"[冻僵]"},{"url":"27.png",alt:"[汗]"},{"url":"28.png",alt:"[高兴]"},{"url":"29.png",alt:"[眼冒金星]"},{"url":"30.png",alt:"[嘟嘴]"},{"url":"31.png",alt:"[大哭]"},{"url":"32.png",alt:"[说谎]"},{"url":"33.png",alt:"[想吐]"},{"url":"34.png",alt:"[难过]"},{"url":"35.png",alt:"[臭臭]"},{"url":"36.png",alt:"[笑的流泪]"},{"url":"37.png",alt:"[怒骂]"},{"url":"38.png",alt:"[睡觉]"},{"url":"39.png",alt:"[天使]"},{"url":"40.png",alt:"[心动]"},{"url":"41.png",alt:"[恶魔]"},{"url":"42.png",alt:"[尴尬]"},{"url":"43.png",alt:"[挤眼笑]"},{"url":"44.png",alt:"[温馨]"},{"url":"45.png",alt:"[说漏嘴]"},{"url":"46.png",alt:"[酷]"},{"url":"47.png",alt:"[拽]"}],
					[{"url":"48.png",alt:"[思考]"},{"url":"49.png",alt:"[不爽]"},{"url":"50.png",alt:"[气的颠倒]"},{"url":"51.png",alt:"[丧气]"},{"url":"52.png",alt:"[wink]"},{"url":"53.png",alt:"[哈欠]"},{"url":"54.png",alt:"[噤声]"}]		
				],
				//表情图片图床名称 ，由于我上传的第三方图床名称会有改变，所以有此数据来做对应，您实际应用中应该不需要
				onlineEmoji:{},
				//红包相关参数
				windowsState:'',
				postId:-1,
				avatarUrl:'',
				myAvatarUrl:'',
				uName:'',
				myNickName:'',
				myId:'',
				Viewid:'',
				sendArray:[],
				sendEmpty:false
			};
		},
		components: {
			uniPopup
		},
		watch: {
			msgList(newValue,oldValue) {
				var that = this;
				var push = that.$store.state.pushStatus;
				if(push){
					var length = that.msgList.length-1;
					if(length>7) {
						that.scrollToView = that.msgList[length].messageUId;
					}
					that.$store.commit('changePush',false);
				}
			}
		},
		onHide() {
			var that = this;
			for(var i=0;i<that.$store.state.conversation.length;i++) {
				if(that.$store.state.conversation[i].targetId==this.targetId) {
					var conver = that.$store.state.conversation;
					conver[i].unreadMessageCount=0;
					that.$store.commit('updateConver',conver);
				}
			}
			uni.setStorageSync('conversation',conver);
			uni.setStorageSync('msgTargetId',0);
			var conversationType = RongIMLib.ConversationType.PRIVATE;
			RongIMLib.RongIMClient.getInstance().clearUnreadCount(conversationType, that.targetId, {
			  onSuccess: function() {
			    console.log('清除指定会话未读消息数成功');
			  },
			  onError: function(error) {
			    console.log('清除指定会话未读消息数失败', error);
			  }
			});
		},
		onUnload() {
			var that = this;
			for(var i=0;i<that.$store.state.conversation.length;i++) {
				if(that.$store.state.conversation[i].targetId==this.targetId) {
					var conver = that.$store.state.conversation;
					conver[i].unreadMessageCount=0;
					that.$store.commit('updateConver',conver);
				}
			}
			uni.setStorageSync('conversation',conver);
			uni.setStorageSync('msgTargetId',0);
			var conversationType = RongIMLib.ConversationType.PRIVATE;
			RongIMLib.RongIMClient.getInstance().clearUnreadCount(conversationType, that.targetId, {
			  onSuccess: function() {
			    console.log('清除指定会话未读消息数成功');
			  },
			  onError: function(error) {
			    console.log('清除指定会话未读消息数失败', error);
			  }
			});
		},
		onLoad(option) {
			this.myId=uni.getStorageSync('ID');
			this.avatarUrl=option.avatarUrl;
			this.uName=option.uName;
			uni.setNavigationBarTitle({
			    title:this.uName
			});
			this.myNickName = uni.getStorageSync('nickName');
			this.myAvatarUrl = uni.getStorageSync('avatarUrl');
			this.targetId = option.targetId;
			var that = this;
			uni.setStorageSync('msgTargetId',this.targetId);
			//融云
			this.$rongyun();
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
					    // 连接已成功, 此时可通过 getConversationList 获取会话列表并展示 
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
			var msgArr = uni.getStorageSync('msgList'+this.targetId);
			// if(msgArr.length!=0) {
			// 	this.$store.commit('updateMsg',msgArr);
			// }
			// var msg = this.$store.state.msgList;
			// this.msgList = this.$store.state.msgList;
			// console.log(this.msgList);
			// console.log(msg);
			var sendStatus = uni.getStorageSync('sendStatus');
			if(msgArr.length==0) {
				var conversationType = RongIMLib.ConversationType.PRIVATE;
				var timestrap = null; // 默认传 null, 若从头开始获取历史消息, 请赋值为 0
				var count = 20;
				RongIMLib.RongIMClient.getInstance().getHistoryMessages(conversationType, that.targetId, timestrap, count, {
				  onSuccess: function(list, hasMsg) {
				    console.log('获取历史消息成功');
					var arr = JSON.stringify(list);
					var newArr = JSON.parse(arr);
					for(var j=0;j<newArr.length;j++) {
						if(newArr[j].messageType=='TextMessage') {
							if(newArr[j].content.extra.type!='pin'&&newArr[j].content.extra.type!='system') {
								newArr[j].content.extra = that.replaceEmoji(newArr[j].content.content);
							}
						}
					}
					that.$store.commit('updateMsg',newArr);
					that.msgList = that.$store.state.msgList;
					var findImg = false;
					for(var n=0;n<that.msgList.length;n++) {
						if(that.msgList[n].messageType=='ImageMessage'&&typeof(that.msgList[n].content.imageUri!='undefined')) {
							that.msgImgList.push(that.msgList[n].content.imageUri);
							findImg = true;
						}
					}
					if(findImg) {
						that.$store.commit('updateImg',that.msgImgList);
						that.msgList = that.$store.state.msgList;
					}
					var showPin = {
						messageType:'getPin',
						content:'点击发起缘拼，或从右下角加号 => 缘拼图标 发起'
					}
					that.$store.commit('pushMsg',showPin);
					that.$nextTick(function() {
						//进入页面滚动到底部
						that.scrollTop = 99999;
						that.$nextTick(function() {
							that.scrollAnimation = true;
						});
					});
					uni.setStorageSync('msgList'+that.targetId,that.$store.state.msgList);
				  },
				  onError: function(error) {
				    // 请排查：单群聊消息云存储是否开通
				    console.log('获取历史消息失败', error);
				  }
				});
			}else {
				var msgList=uni.getStorageSync('msgList'+that.targetId);
				for(var a=0;a<msgList.length;a++) {
					if(msgList[a].messageType=='TextMessage') {
						if(msgList[a].content.extra.type!='pin'&&msgList[a].content.extra.type!='system') {
							msgList[a].content.extra = that.replaceEmoji(msgList[a].content.content);
						}
					}
					if(msgList[a].messageType=='ImageMessage'&&typeof(msgList[a].content.imageUri!='undefined')) {
						that.msgImgList.push(msgList[a].content.imageUri)
					}
				}
				that.$store.commit('updateMsg',msgList);
				that.$store.commit('updateImg',that.msgImgList);
				that.msgList = that.$store.state.msgList;
				that.msgImgList = that.$store.state.msgImgList;
				var showPin = {
					messageType:'getPin',
					content:'点击发起缘拼，或从右下角加号 => 缘拼图标 发起'
				}
				that.$store.commit('pushMsg',showPin);
				that.$nextTick(function() {
					//进入页面滚动到底部
					that.scrollTop = 99999;
					that.$nextTick(function() {
						that.scrollAnimation = true;
					});
				});
			}
			
			
			//this.getMsgList();
			//语音自然播放结束
			this.AUDIO.onEnded((res)=>{
				this.playMsgid=null;
			});
			// #ifndef H5
			//录音开始事件
			this.RECORDER.onStart((e)=>{
				this.recordBegin(e);
			})
			//录音结束事件
			this.RECORDER.onStop((e)=>{
				this.recordEnd(e);
			})
			// #endif
		},
		onShow(){
			var that = this;
			that.$nextTick(function() {
				that.scrollTop = 9999;
				that.$nextTick(function() {
					that.scrollAnimation = true;
				});
				uni.setStorageSync('pushStatus',false);
			});
		},
		methods:{
			agree(e) {
				var that = this;
				uni.request({
					url:'https://zmetalhearty.com/yuanpin/HomeItemsOperator',
					method:'POST',
					header: {
					    'content-type': 'application/x-www-form-urlencoded'
					},
					data:{
						operation:'addPartake',
						itemID:e,
						UserID:this.targetId,
						status:'2'
					},
					success: (res) => {
						uni.showToast({
							title:'缘拼成功~',
							icon:'success',
							duration:1000
						});
						var that = this;
						var msg = new RongIMLib.TextMessage({ content: '[缘拼成功]', extra: {type:'system',content:'缘拼成功！请到 我的缘拼->我参与的 中查看'}});
						var conversationType = RongIMLib.ConversationType.PRIVATE;
						RongIMLib.RongIMClient.getInstance().sendMessage(conversationType, that.targetId, msg, {
						  onSuccess: function (message) {
						    console.log('发送文本消息成功', message);
							var length = that.msgList.length-1;
							that.$store.commit('pushMsg',message);
							var getMsg = true;
							var findConver = false;
							for(var a=0;a<that.$store.state.conversation.length;a++) {
								if(that.$store.state.conversation[a].targetId==that.targetId) {
									findConver = true;
								}
							}
							if(!findConver) {
								that.findCon();
							}else {
								for(var i=0;i<that.$store.state.conversation.length;i++) {
									if(that.$store.state.conversation[i].targetId==that.targetId) {
										var conver = that.$store.state.conversation;
										conver[i].latestMessage.content.content = message.content.content;
										var time = that.changeTime(conver[i].sentTime);
										conver[i].sentTime = time;
										that.$store.commit('updateConver',conver);
										uni.setStorageSync('conversation',conver);
									}
								}
								uni.setStorageSync('msgList'+that.targetId,that.$store.state.msgList);
								uni.setStorageSync('msgImgList'+that.targetId,that.$store.state.msgImgList);
								var length = that.msgList.length-1;
								if(length>7) {
									that.scrollToView = that.msgList[length].messageUId;
								}
							}
						  },
						  onError: function (errorCode) {
						    console.log('发送文本消息失败', errorCode);
						  }
						});
					}
				})
			},
			hidePop() {
				this.$refs.popup.close();
			},
			choose(e) {
				var getMoreTime = function() {
					var date = new Date();
					var month = date.getMonth() + 1;
					var day = date.getDate();
					var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
					var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
					month >= 1 && month <= 9 ? (month = "0" + month) : "";
					day >= 0 && day <= 9 ? (day = "0" + day) : "";
					var timer = month + '-' + day + ' ' + hour + ':' + minute ;
					return timer;
				};
				var that = this;
				var msg = new RongIMLib.TextMessage({ content: '[发起缘拼]', extra: {type:'pin',id:e.ID,title:e.title}});
				var conversationType = RongIMLib.ConversationType.PRIVATE;
				RongIMLib.RongIMClient.getInstance().sendMessage(conversationType, that.targetId, msg, {
				  onSuccess: function (message) {
				    // message 为发送的消息对象并且包含服务器返回的消息唯一 id 和发送消息时间戳
				    console.log('发送文本消息成功', message);
					var length = that.msgList.length-1;
					var nowStandardTime = getMoreTime();
					var haoTime = new Date().getTime();
					if(that.$store.state.msgList.length>1) {
						var length = that.$store.state.msgList.length-1;
						var betweenTime = haoTime-that.$store.state.msgList[length].sentTime;
					}
					if(betweenTime>=60000) {
						var showTime = {
							messageType:'system',
							type:'time',
							content:nowStandardTime
						}
						that.$store.commit('pushMsg',showTime);
					}
					that.$store.commit('pushMsg',message);
					that.textMsg = '';//清空输入框
					var getMsg = true;
					var findConver = false;
					for(var a=0;a<that.$store.state.conversation.length;a++) {
						if(that.$store.state.conversation[a].targetId==that.targetId) {
							findConver = true;
						}
					}
					if(!findConver) {
						that.findCon();
					}else {
						for(var i=0;i<that.$store.state.conversation.length;i++) {
							if(that.$store.state.conversation[i].targetId==that.targetId) {
								var conver = that.$store.state.conversation;
								conver[i].latestMessage.content.content = message.content.content;
								var time = that.changeTime(conver[i].sentTime);
								conver[i].sentTime = time;
								that.$store.commit('updateConver',conver);
								uni.setStorageSync('conversation',conver);
							}
						}
						uni.setStorageSync('msgList'+that.targetId,that.$store.state.msgList);
						uni.setStorageSync('msgImgList'+that.targetId,that.$store.state.msgImgList);
						that.$refs.popup.close();
						var length = that.msgList.length-1;
						if(length>7) {
							that.scrollToView = that.msgList[length].messageUId;
						}
					}
				  },
				  onError: function (errorCode) {
				    console.log('发送文本消息失败', errorCode);
				  }
				});
			},
			jump(e) {
				var that = this;
				if(e=='friend') {
					uni.request({
						url:'https://zmetalhearty.com/yuanpin/GetUserInfoInRong',
						method:'POST',
						header: {
						    'content-type': 'application/x-www-form-urlencoded'
						},
						data:{
							Focus:that.myId,
							ID:that.targetId
						},
						success: (res) => {
							if(res.data.code==1) {
								uni.navigateTo({
									url:'../info/info?targetName='+res.data.nickname+'&targetId='+res.data.ID+'&avatarUrl='+res.data.img+'&sex='+res.data.sex+'&type='+res.data.status
								})
							}
						}
					})
				}
			},
			pin() {
				var that = this;
				uni.request({
					url: 'https://zmetalhearty.com/yuanpin/HomeItemsOperator',
					method: 'POST',
					header: {
					    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
					},
					data: {
						operation:'getAllbyUserID',
						UserID:this.targetId
					},
					success: res => {
						for(var key in res.data) {
							var array = res.data[key];
						}
						var length = array.length;
						if(length!=0) {
							for(var i=0;i<length;i++) {
								if(array[i].address) {
									var add = JSON.parse(array[i].address);
									array[i].address = add;
								}else {
									var add1 = JSON.parse(array[i].pstart);
									array[i].pstart = add1;
									var add2 = JSON.parse(array[i].pend);
									array[i].pend = add2;
								}
							}
						}else {
							that.sendEmpty = true;
						}
						that.sendArray = array;
					}
				});
				this.$refs.popup.open();
			},
			// 接受消息(筛选处理)
			spaceStatus() {
				 switch(uni.getSystemInfoSync().platform){
				    case 'android':
				       console.log('运行Android上')
					   this.space=='1'
				       break;
				    case 'ios':
				       console.log('运行iOS上')
					   this.space=='0'
				       break;
				    default:
				       console.log('运行在开发者工具上')
				       break;
				}
			},
			screenMsg(msg){
				//从长连接处转发给这个方法，进行筛选处理
				if(msg.type=='system'){
					// 系统消息
					switch (msg.msg.type){
						case 'text':
							this.addSystemTextMsg(msg);
							break;
						case 'redEnvelope':
							this.addSystemRedEnvelopeMsg(msg);
							break;
					}
				}else if(msg.type=='user'){
					// 用户消息
					switch (msg.msg.type){
						case 'text':
							this.addTextMsg(msg);
							break;
						case 'voice':
							this.addVoiceMsg(msg);
							break;
						case 'img':
							this.addImgMsg(msg);
							break;
						case 'redEnvelope':
							this.addRedEnvelopeMsg(msg);
							break;
					}
					console.log('用户消息');
					//非自己的消息震动
					if(msg.msg.userinfo.uid!=this.myuid){
						console.log('振动');
						uni.vibrateLong();
					}
				}
				that.$nextTick(function() {
					that.scrollTop = 99999;
					that.$nextTick(function() {
						that.scrollAnimation = true;
					});
				});
			},
			//触发滑动到顶部(加载历史信息记录)
			loadHistory(e){
				var that = this;
				if(this.isHistoryLoading){
					return ;
				}
				this.isHistoryLoading = true;//参数作为进入请求标识，防止重复请求
				this.scrollAnimation = false;//关闭滑动动画
				if(that.msgList.length!=0) {
					that.Viewid = that.msgList[0].messageUId;//记住第一个信息ID
				}
				var that = this;
				setTimeout(()=>{
					// 消息列表
					var conversationType = RongIMLib.ConversationType.PRIVATE;
					var timestrap = null; // 默认传 null, 若从头开始获取历史消息, 请赋值为 0
					var count=20;
					RongIMLib.RongIMClient.getInstance().getHistoryMessages(conversationType, that.targetId, timestrap, count, {
					  onSuccess: function(list, hasMsg) {
					    console.log('获取历史消息成功');
						if(hasMsg==0) {
							uni.setStorageSync('hasMsg',0);
						}
						var msgStatus = uni.getStorageSync('hasMsg');
						if(msgStatus==0) {
							that.isHistoryLoading = false;
							return;
						}else {
							var arr = JSON.stringify(list);
							var newArr = JSON.parse(arr);
							for(var i=newArr.length-1;i>=0;i--) {
								if(typeof(newArr[i])!='undefined'&&newArr[i].messageType=='TextMessage') {
									if(newArr[i].content.extra.type!='pin'&&newArr[i].content.extra.type!='system') {
										newArr[i].content.extra = that.replaceEmoji(newArr[i].content.content);
									}
									that.msgList.unshift(newArr[i]);
								}else if(typeof(newArr[i])!='undefined'&&newArr[i].messageType=='ImageMessage') {
									that.msgImgList.unshift(newArr[i].content.imageUri);
								}
							}
							console.log(that.msgList);
						}
					  },
					  onError: function(error) {
					    // 请排查：单群聊消息云存储是否开通
					    console.log('获取历史消息失败', error);
					  }
					});
					// 获取消息中的图片,并处理显示尺寸
					// for(let i=0;i<list.length;i++){
					// 	if(list[i].type=='user'&&list[i].msg.type=="img"){
					// 		list[i].msg.content = this.setPicSize(list[i].msg.content);
					// 		this.msgImgList.unshift(list[i].msg.content.url);
					// 	}
					// 	list[i].msg.id = Math.floor(Math.random()*1000+1);
					// 	this.msgList.unshift(list[i]);
					//}
					
					//这段代码很重要，不然每次加载历史数据都会跳到顶部
					var length = that.msgList.length-1;
					if(length>7) {
						that.scrollToView = that.Viewid;
					}
				},1000)
				
			},
			// 加载初始页面消息
			getMsgList(){
				
			},
			//处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
			setPicSize(content){
				// 让图片最长边等于设置的最大长度，短边等比例缩小，图片控件真实改变，区别于aspectFit方式。
				let maxW = uni.upx2px(350);//350是定义消息图片最大宽度
				let maxH = uni.upx2px(350);//350是定义消息图片最大高度
				if(content.w>maxW||content.h>maxH){
					let scale = content.w/content.h;
					content.w = scale>1?maxW:maxH*scale;
					content.h = scale>1?maxW/scale:maxH;
				}else if(content.w==144&&content.h==144) {
					content.w = 25;
					content.h = 25;
				}
				return content;
			},
			
			//更多功能(点击+弹出) 
			showMore(){
				this.isVoice = false;
				this.hideEmoji = true;
				if(this.hideMore){
					this.hideMore = false;
					this.openDrawer();
				}else{
					this.hideDrawer();
				}
			},
			// 打开抽屉
			openDrawer(){
				this.popupLayerClass = 'showLayer';
			},
			// 隐藏抽屉
			hideDrawer(){
				this.popupLayerClass = '';
				setTimeout(()=>{
					this.hideMore = true;
					this.hideEmoji = true;
				},150);
			},
			// 选择图片发送
			chooseImage(){
				this.getImage('album');
			},
			//拍照发送
			camera(){
				this.getImage('camera');
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
			findCon(e) {
				var that = this;
				var time = e;
				var conversationTypes = [ RongIMLib.ConversationType.PRIVATE ];
				var count = 150;
				RongIMLib.RongIMClient.getInstance().getConversationList({
				  onSuccess: function(list) {
				    console.log('获取会话列表成功', list);
					//var arr = JSON.stringify(list);
					var conversation = list;
					console.log(conversation);
					for(var i=0;i<conversation.length;i++) {
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
					for(var i=0;i<that.$store.state.conversation.length;i++) {
						if(that.$store.state.conversation[i].targetId==that.targetId) {
						var conver = that.$store.state.conversation;
						conver[i].latestMessage.content.content = message.content.content;
						that.$store.commit('updateConver',conver);
						uni.setStorageSync('conversation',conver);
						}
					}
					uni.setStorageSync('msgList'+that.targetId,that.$store.state.msgList);
					var length = that.msgList.length-1;
					if(length>7) {
						that.scrollToView = that.msgList[length].messageUId;
					}
				  },
				  onError: function(error) {
				    console.log('获取会话列表失败', error);
				  }
				}, conversationTypes, count);
			},
			//选照片 or 拍照
			getImage(type){
				var getMoreTime = function() {
					var date = new Date();
					var month = date.getMonth() + 1;
					var day = date.getDate();
					var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
					var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
					month >= 1 && month <= 9 ? (month = "0" + month) : "";
					day >= 0 && day <= 9 ? (day = "0" + day) : "";
					var timer = month + '-' + day + ' ' + hour + ':' + minute ;
					return timer;
				};
				var that = this;
				this.hideDrawer();
				uni.chooseImage({
					sourceType:[type],
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res)=>{
						for(let i=0;i<res.tempFilePaths.length;i++){
							uni.uploadFile({
								url:'https://zmetalhearty.com/yuanpin/MessageFileUpload',
								filePath:res.tempFilePaths[i],
								name:'file',
								formData: {
								    'content-type': 'application/x-www-form-urlencoded'
								},
								success: (res) => {
									var imageUri = 'https://zmetalhearty.com'+res.data;  // 上传到服务器的 url. 用来展示高清图片
									var msg = new RongIMLib.ImageMessage({imageUri: imageUri});
									var conversationType = RongIMLib.ConversationType.PRIVATE;
									RongIMLib.RongIMClient.getInstance().sendMessage(conversationType, that.targetId, msg, {
									  onSuccess: function (message) {
									    console.log('发送图片消息成功', message);
										var length = that.msgList.length-1;
										//that.msgList.push(message);
										//var msgList = that.$store.state.msgList;
										var nowStandardTime = getMoreTime();
										var haoTime = new Date().getTime();
										if(that.$store.state.msgList.length>1) {
											var length = that.$store.state.msgList.length-1;
											var betweenTime = haoTime-that.$store.state.msgList[length].sentTime;
										}
										if(betweenTime>=60000) {
											var showTime = {
												messageType:'system',
												type:'time',
												content:nowStandardTime
											}
											that.$store.commit('pushMsg',showTime);
										}
										that.$store.commit('pushMsg',message);
										that.$store.commit('pushImg',message.content.imageUri);
										var getMsg = true;
										var findConver = false;
										for(var a=0;a<that.$store.state.conversation.length;a++) {
											if(that.$store.state.conversation[a].targetId==that.targetId) {
												findConver = true;
											}
										}
										if(!findConver) {
											that.findCon();
										}else {
											for(var i=0;i<that.$store.state.conversation.length;i++) {
												if(that.$store.state.conversation[i].targetId==that.targetId) {
													var conver = that.$store.state.conversation;
													conver[i].latestMessage.content.content = '[图片]';
													that.$store.commit('updateConver',conver);
													uni.setStorageSync('conversation',conver);
												}
											}
											uni.setStorageSync('msgList'+that.targetId,that.$store.state.msgList);
											var length = that.msgList.length-1;
											if(length>7) {
												that.scrollToView = that.msgList[length].messageUId;
											}
										}
									  },
									  onError: function (errorCode) {
									    console.log('发送图片消息失败', errorCode);
									  }
									});
								},
								fail: (data)=> {
									console.log('失败');
								}
 							})	
						}
					}
				});
			},
			// 选择表情
			chooseEmoji(){
				this.hideMore = true;
				if(this.hideEmoji){
					this.hideEmoji = false;
					this.openDrawer();
				}else{
					this.hideDrawer();
				}
			},
			//添加表情
			addEmoji(em){
				this.textMsg+=em.alt;
			},
			
			//获取焦点，如果不是选表情ing,则关闭抽屉
			textareaFocus(){
				if(this.popupLayerClass=='showLayer' && this.hideMore == false){
					this.hideDrawer();
				}
			},
			getMoreTime(time) {
				var date = new Date(time);
				var month = date.getMonth() + 1;
				var day = date.getDate();
				var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
				var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = month + '-' + day + ' ' + hour + ':' + minute ;
				return timer;
			},
			// 发送文字消息
			sendText(){
				var getMoreTime = function() {
					var date = new Date();
					var month = date.getMonth() + 1;
					var day = date.getDate();
					var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
					var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
					month >= 1 && month <= 9 ? (month = "0" + month) : "";
					day >= 0 && day <= 9 ? (day = "0" + day) : "";
					var timer = month + '-' + day + ' ' + hour + ':' + minute ;
					return timer;
				};
				var nowStandardTime = getMoreTime();
				var that = this;
				that.hideDrawer();
				if(!that.textMsg){
					return;
				}
				let contentMsg = this.replaceEmoji(that.textMsg);
				var msg = new RongIMLib.TextMessage({ content: that.textMsg, extra: '附加信息' });
				var conversationType = RongIMLib.ConversationType.PRIVATE;
				RongIMLib.RongIMClient.getInstance().sendMessage(conversationType, that.targetId, msg, {
				  onSuccess: function (message) {
				    // message 为发送的消息对象并且包含服务器返回的消息唯一 id 和发送消息时间戳
				    console.log('发送文本消息成功', message);
					message.content.extra = that.replaceEmoji(message.content.content);
					console.log(message.content.extra);
					var length = that.msgList.length-1;
					var nowStandardTime = getMoreTime();
					var haoTime = new Date().getTime();
					if(that.$store.state.msgList.length>1) {
						var length = that.$store.state.msgList.length-1;
						var betweenTime = haoTime-that.$store.state.msgList[length].sentTime;
						if(betweenTime>=60000) {
							var showTime = {
								messageType:'system',
								type:'time',
								content:that.getMoreTime(haoTime)
							}
							that.$store.commit('pushMsg',showTime);
						}
					}
					that.$store.commit('pushMsg',message);
					that.textMsg = '';//清空输入框
					var getMsg = true;
					var findConver = false;
					for(var a=0;a<that.$store.state.conversation.length;a++) {
						if(that.$store.state.conversation[a].targetId==that.targetId) {
							findConver = true;
						}
					}
					if(!findConver) {
						var conver = that.$store.state.conversation;
						conver[i].latestMessage.content.content = message.content.content;
						var nowTime = new Date().getTime();
						var time = that.changeTime(nowTime);
						that.findCon(time);
					}else {
						for(var i=0;i<that.$store.state.conversation.length;i++) {
							if(that.$store.state.conversation[i].targetId==that.targetId) {
								var conver = that.$store.state.conversation;
								conver[i].latestMessage.content.content = message.content.content;
								var nowTime = new Date().getTime();
								var time = that.changeTime(nowTime);
								conver[i].sentTime = time;
								that.$store.commit('updateConver',conver);
								uni.setStorageSync('conversation',conver);
							}
						}
						uni.setStorageSync('msgList'+that.targetId,that.$store.state.msgList);
						uni.setStorageSync('msgImgList'+that.targetId,that.$store.state.msgImgList);
						var length = that.msgList.length-1;
						if(length>7) {
							that.scrollToView = that.msgList[length].messageUId;
						}
					}
				  },
				  onError: function (errorCode) {
				    console.log('发送文本消息失败', errorCode);
				  }
				});
			},
			//替换表情符号为图片
			replaceEmoji(str){
				let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g,(item, index)=>{
					for(let i=0;i<this.emojiList.length;i++){
						let row = this.emojiList[i];
						for(let j=0;j<row.length;j++){
							let EM = row[j];
							if(EM.alt==item){
								//在线表情路径，图文混排必须使用网络路径，请上传一份表情到你的服务器后再替换此路径 
								//比如你上传服务器后，你的100.gif路径为https://www.xxx.com/emoji/100.gif 则替换onlinePath填写为https://www.xxx.com/emoji/
								let onlinePath = 'https://zmetalhearty.com/yuanpin/emoji/'
								let imgstr = '<img src="'+onlinePath+EM.url+'" width="25upx" height="25upx" style="max-width:100%;">';
								return imgstr;
							}
						}
					}
				});
				return '<div style="vertical-align:middle;display: flex;align-items: center;flex-wrap: wrap;white-space: pre-wrap;word-break: break-all;">'+replacedStr+'</div>';
			},
			
			// 发送消息
			sendMsg(content,type){
				//实际应用中，此处应该提交长连接，模板仅做本地处理。
				var nowDate = new Date();
				if(this.msgList) {
					let lastid = this.msgList[this.msgList.length-1].msg.id;
					lastid++;
				}
				let msg = {type:'user',msg:{id:lastid,time:nowDate.getHours()+":"+nowDate.getMinutes(),type:type,userinfo:{uid:this.myuid,username:this.myNickName,face:this.myAvatarUrl},content:content}}
				// 发送消息
				this.screenMsg(msg);
			},
			
			// 添加文字消息到列表
			addTextMsg(msg){
				this.msgList.push(msg);
			},
			// 添加语音消息到列表
			addVoiceMsg(msg){
				this.msgList.push(msg);
			},
			// 添加图片消息到列表
			addImgMsg(msg){
				msg.msg.content = this.setPicSize(msg.msg.content);
				this.msgImgList.push(msg.msg.content.url);
				this.msgList.push(msg);
			},
			addRedEnvelopeMsg(msg){
				this.msgList.push(msg);
			},
			// 添加系统文字消息到列表
			addSystemTextMsg(msg){
				this.msgList.push(msg);
			},
			// 添加系统红包消息到列表
			addSystemRedEnvelopeMsg(msg){
				this.msgList.push(msg);
			},
			// 预览图片
			showPic(msg){
				uni.previewImage({
					indicator:"default",
					current:msg.imageUri,
					urls: this.msgImgList,
					success: function(data) {
						console.log('预览成功');
					},
					fail: (err) => {
						console.log(err);
					}
				});
			},
			// 播放语音
			playVoice(msg){
				this.playMsgid=msg.messageUId;
				this.AUDIO.src = msg.content.fileUrl;
				this.$nextTick(function() {
					this.AUDIO.play();
				});
			},
			// 录音开始
			voiceBegin(e){
				if(e.touches.length>1){
					return ;
				}
				this.initPoint.Y = e.touches[0].clientY;
				this.initPoint.identifier = e.touches[0].identifier;
				this.RECORDER.start({format:"mp3"});//录音开始,
			},
			//录音开始UI效果
			recordBegin(e){
				this.recording = true;
				this.voiceTis='松开 结束';
				this.recordLength = 0;
				this.recordTimer = setInterval(()=>{
					this.recordLength++;
				},1000)
			},
			// 录音被打断
			voiceCancel(){
				this.recording = false;
				this.voiceTis='按住 说话';
				this.recordTis = '手指上滑 取消发送'
				this.willStop = true;//不发送录音
				this.RECORDER.stop();//录音结束
			},
			// 录音中(判断是否触发上滑取消发送)
			voiceIng(e){
				if(!this.recording){
					return;
				}
				let touche = e.touches[0];
				//上滑一个导航栏的高度触发上滑取消发送
				if(this.initPoint.Y - touche.clientY>=uni.upx2px(100)){
					this.willStop = true;
					this.recordTis = '松开手指 取消发送'
				}else{
					this.willStop = false;
					this.recordTis = '手指上滑 取消发送'
				}
			},
			// 结束录音
			voiceEnd(e){
				if(!this.recording){
					return;
				}
				this.recording = false;
				this.voiceTis='按住 说话';
				this.recordTis = '手指上滑 取消发送'
				this.RECORDER.stop();//录音结束
			},
			//录音结束(回调文件)
			recordEnd(e){
				var getMoreTime = function() {
					var date = new Date();
					var month = date.getMonth() + 1;
					var day = date.getDate();
					var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
					var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
					month >= 1 && month <= 9 ? (month = "0" + month) : "";
					day >= 0 && day <= 9 ? (day = "0" + day) : "";
					var timer = month + '-' + day + ' ' + hour + ':' + minute ;
					return timer;
				};
				var that = this;
				clearInterval(this.recordTimer);
				if(!this.willStop){
					let msg = {
						length:0,
						url:e.tempFilePath
					}
					let min = parseInt(this.recordLength/60);
					let sec = this.recordLength%60;
					min = min<10?'0'+min:min;
					sec = sec<10?'0'+sec:sec;
					var length = min+':'+sec;
					//this.sendMsg(msg,'voice');
					//this.msgList.push(msg);
					var dontUpload = false;
					if(min==0&&sec==0){
						dontUpload = true;
						uni.showToast({
							title:'说话时间太短！',
							icon:'none'
						})
					}
					if(!dontUpload) {
						uni.uploadFile({
							url:'https://zmetalhearty.com/yuanpin/MessageFileUpload',
							filePath:e.tempFilePath,
							name:'file',
							formData: {
							    'content-type': 'application/x-www-form-urlencoded'
							},
							success: (res) => {
								var jsonData = res.data;
								var name = length;  // 文件名
								var type = 'mp3';  // 文件类型
								var fileUrl = 'https://zmetalhearty.com'+res.data;  // 文件地址
								var msg = new RongIMLib.FileMessage({
								  name: name,
								  //size: size,
								  type: type,
								  fileUrl: fileUrl
								});
								var conversationType = RongIMLib.ConversationType.PRIVATE;
								RongIMLib.RongIMClient.getInstance().sendMessage(conversationType, that.targetId, msg, {
								  onSuccess: function (message) {
								    console.log('发送文件消息成功', message);
									var length = that.msgList.length-1;
									//that.msgList.push(message);
									//var msgList = that.$store.state.msgList;
									var nowStandardTime = getMoreTime();
									var haoTime = new Date().getTime();
									if(that.$store.state.msgList.length>1) {
										var length = that.$store.state.msgList.length-1;
										var betweenTime = haoTime-that.$store.state.msgList[length].sentTime;
									}
									if(betweenTime>=60000) {
										var showTime = {
											messageType:'system',
											type:'time',
											content:nowStandardTime
										}
										that.$store.commit('pushMsg',showTime);
									}
									that.$store.commit('pushMsg',message);
									var getMsg = true;
									var findConver = false;
									for(var a=0;a<that.$store.state.conversation.length;a++) {
										if(that.$store.state.conversation[a].targetId==that.targetId) {
											findConver = true;
										}
									}
									if(!findConver) {
										that.findCon();
									}else {
										for(var i=0;i<that.$store.state.conversation.length;i++) {
											if(that.$store.state.conversation[i].targetId==that.targetId) {
												var conver = that.$store.state.conversation;
												conver[i].latestMessage.content.content = '[语音]';
												that.$store.commit('updateConver',conver);
												uni.setStorageSync('conversation',conver);
											}
										}
										uni.setStorageSync('msgList'+that.targetId,that.$store.state.msgList);
										var length = that.msgList.length-1;
										if(length>7) {
											that.scrollToView = that.msgList[length].messageUId;
										}
									}
								  },
								  onError: function (errorCode) {
								    console.log('发送图片消息失败', errorCode);
								  }
								});
							},
							fail: (data)=> {
								console.log('失败');
							}
						})
					}
				}else{
					console.log('取消发送录音');
				}
				this.willStop = false;
			},
			// 切换语音/文字输入
			switchVoice(){
				this.hideDrawer();
				this.isVoice = this.isVoice?false:true;
			},
			discard(){
				return;
			}
		}
	}
</script>
<style lang="scss">
	@import "@/static/HM-chat/css/style.scss";
	.viewBox {
		width: 500upx;
		height: auto;
		padding: 30upx 20upx 0upx 20upx;
		border-radius: 30upx;
		background-color: #fff;
		box-shadow: 20upx 20upx 30upx rgba(0, 0, 0, 0.1);
		margin: 30upx auto;
		opacity: 1;
		animation: fade .5s;
	}
	@keyframes fade{
		from{
			opacity: 0;
		}
		to{
			opacity: 1;
		}
	}
	.view-title {
		width: 100%;
		height: 50upx;
		line-height: 50upx;
		font-size: 30upx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
	}
	.title-text {
		width: 270upx;
		height: 100%;
		color: #555;
		font-size: 36upx;
		line-height: 50upx;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.title-time {
		width: 230upx;
		height: 100%;
		color: #bdbdbd;
		font-size: 24upx;
		line-height: 50upx;
		padding-left: 20upx;
	}
	.view-content {
		width: 100%;
		max-height: 72upx;
		margin: 6upx 6upx 14upx 6upx;
		line-height: 36upx;
		letter-spacing: 2upx;
		font-size: 26upx;
		overflow: hidden;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp:2;
		text-overflow:ellipsis;
		display: -webkit-box;
		color: #777;
	}
	.view-img {
		width: 100%;
		max-height: 120upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 10upx;
	}
	.location {
		width: 100%;
		max-height: 72upx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}
	.location1 {
		width: 100%;
		max-height: 72upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	.view-location {
		max-width: 300upx;
		max-height: 72upx;
		margin: 6upx 0upx;
		padding: 4upx 22upx 4upx 10upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-radius: 8upx;
		background-color: #f3f3f3;
		line-height: 30upx;
	}
	.view-location1 {
		max-width: 640upx;
		max-height: 72upx;
		margin: 6upx 0upx;
		padding: 4upx 22upx 4upx 10upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-radius: 8upx;
		background-color: #f3f3f3;
		line-height: 30upx;
	}
	.location-left {
		width: 40upx;
		height: 40upx;
	}
	.location-left image {
		width: 40upx;
		height: 40upx;
	}
	.location-right {
		max-width: 590upx;
		max-height: 72upx;
		text-align: left;
	}
	.location-right,.location-right1 text {
		font-size: 22upx;
		color: #999999;
		margin-left: 10upx;
	}
	.view-img image {
		height: 110upx;
		width: 220upx;
		border-radius: 10upx;
		background-color: #fff;
	}
	.view-user {
		height: 70upx;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.user-left {
		height: 70upx;
		width: 340upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	.user-left image {
		height: 50upx;
		width: 50upx;
		border-radius: 14upx;
	}
	.name-type {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		margin-left: 16upx;
	}
	.name {
		font-size: 26upx;
		color: #555;
	}
	.food , .travel, .study, .game{
		width: 78upx;
		height: 34upx;
		border-radius: 8upx;
		text-align: center;
		line-height: 32upx;
	}
	.food {
		border: 2upx solid #e5af5b;
	}
	.travel {
		border: 2upx solid #76d672;
	}
	.study {
		border: 2upx solid #ca5b53;
	}
	.game {
		border: 2upx solid #3478f5;
	}
	.food-text {
		font-size: 22upx;
		color: #e5af5b;
	}
	.travel-text {
		font-size: 22upx;
		color: #76d672;
	}
	.study-text {
		font-size: 22upx;
		color: #ca5b53;
	}
	.game-text {
		font-size: 22upx;
		color: #3478f5;
	}
	.user-right {
		width: 200upx;
		height: 70upx;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		flex-direction: row;
	}
	.user-right #like {
		width: 30upx;
		height: 30upx;
	}
	.user-right #comment {
		width: 26upx;
		height: 26upx;
	}
	.user-right text {
		font-size: 22upx;
		color: #bdbdbd;
	}
	.empty {
		width: 100%;
		height: 100%;
		line-height: 75vh;
		text-align: center;
		color: #999999;
		font-size: 28upx;
	}
	.pop-title {
		width: 500upx;
		height: 100upx;
		line-height: 100upx;
		font-size: 50upx;
		color: #30C6B0;
		margin: 0 auto;
	}
	.pop {
		width: 550upx;
		height: 800upx;
		border-radius: 30upx;
		background-color: #EFEEEE;
		margin: 0 auto;
	}
	.pop-bottom {
		width: 550upx;
		height: 100upx;
		border-radius: 30upx;
		background-color: #EFEEEE;
		text-align: center;
		margin: 30upx;
		color: #30C6B0;
		font-size: 34upx;
		font-weight: bold;
		transition: all .5s;
		line-height: 100upx;
	}
	.pop-bottom-hover {
		background-color: #EEEEEE;
		transition: all .5s;
	}
	.pinByMe {
		max-width: 500upx;
		padding: 10upx 20upx;
		max-height: 160upx;
		border-radius: 20upx;
		background-color: #FFFFFF;
		line-height: 80upx;
		font-size: 32upx;
		color: #888;
	}
	.pinByYou {
		width: 500upx;
		height: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 20upx;
		padding: 20upx;
		background-color: #FFFFFF;
		.pin-title {
			width: 100%;
			max-height: 200upx;
			line-height: 100upx;
			font-size: 32upx;
			color: #888;
		}
		.yesOrNo {
			width: 100%;
			height: 150upx;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			.no {
				width: 200upx;
				height: 100upx;
				text-align: center;
				line-height: 100upx;
				border-radius: 20upx;
				color: #888;
				background-color: #EFEEEE;
				box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
				-20upx -20upx 30upx rgba(255,255,255,1);
			}
			.yes {
				width: 200upx;
				height: 100upx;
				text-align: center;
				line-height: 100upx;
				border-radius: 20upx;
				color: #FFFFFF;
				background-color: #30c6b0;
				box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
				-20upx -20upx 30upx rgba(255,255,255,1);
			}
		}
	}
	.empty {
		width: 100%;
		height: 600upx;
		line-height: 600upx;
		text-align: center;
		color: #999999;
		background-color: #FFFFFF;
		border-radius: 30upx;
		font-size: 28upx;
	}
</style>