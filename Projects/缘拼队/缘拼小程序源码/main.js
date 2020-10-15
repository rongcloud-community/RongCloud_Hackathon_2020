import Vue from 'vue'
import App from './App'

var RongIMLib = require('pages/RongIMLib.miniprogram-1.1.3.js');
Vue.config.productionTip = false
import store from './store'

App.mpType = 'app'

Vue.prototype.$store = store

//融云
Vue.prototype.$rongyun = function() {
	var that = this;
	var appkey = 'p5tvi9dspqrx4';//x18ywvqfx5bpc
	RongIMLib.RongIMClient.init(appkey);
	RongIMLib.RongIMClient.setConnectionStatusListener({
	  onChanged: function (status) {
	    // status 标识当前连接状态
	    switch (status) {
	      case RongIMLib.ConnectionStatus.CONNECTED:
	        console.log('链接成功');
	        break;
	      case RongIMLib.ConnectionStatus.CONNECTING:
	        console.log('正在链接');
	        break;
	      case RongIMLib.ConnectionStatus.DISCONNECTED:
	        console.log('断开连接');
	        break;
	      case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
	        console.log('其他设备登录, 本端被踢');
			uni.clearStorageSync();
			uni.navigateTo({
				url:'../login/login'
			})
	        break;
	      case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
	        console.log('域名不正确, 请至开发者后台查看安全域名配置');
	        break;
	      case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
	        console.log('网络不可用, 此时可调用 reconnect 进行重连');
	        break;
	      default:
	        console.log('链接状态为', status);
	        break;
	    }
	  }
	});
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
	var getStandardTime = function(){
		var date = new Date();
		var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
		var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
		var timer = hour + ':' + minute ;
		return timer;
	};
	var emojiList = [
						[{"url":"0.png",alt:"[微笑]"},{"url":"1.png",alt:"[伤心]"},{"url":"2.png",alt:"[高兴]"},{"url":"3.png",alt:"[有些不爽]"},{"url":"4.png",alt:"[不舒服]"},{"url":"5.png",alt:"[亲亲]"},{"url":"6.png",alt:"[生气]"},{"url":"7.png",alt:"[流泪]"},{"url":"8.png",alt:"[无语]"},{"url":"9.png",alt:"[吐舌笑]"},{"url":"10.png",alt:"[惊吓]"},{"url":"11.png",alt:"[流汗]"},{"url":"12.png",alt:"[小声]"},{"url":"13.png",alt:"[气的冒烟]"},{"url":"14.png",alt:"[戴口罩]"},{"url":"15.png",alt:"[疑问]"},{"url":"16.png",alt:"[紧张]"},{"url":"17.png",alt:"[呕吐]"},{"url":"18.png",alt:"[面无表情]"},{"url":"19.png",alt:"[祝贺]"},{"url":"20.png",alt:"[泪眼]"},{"url":"21.png",alt:"[白眼]"},{"url":"22.png",alt:"[鬼脸]"},{"url":"23.png",alt:"[哭笑不得]"}],
						[{"url":"24.png",alt:"[发烧]"},{"url":"25.png",alt:"[惊讶]"},{"url":"26.png",alt:"[冻僵]"},{"url":"27.png",alt:"[汗]"},{"url":"28.png",alt:"[高兴]"},{"url":"29.png",alt:"[眼冒金星]"},{"url":"30.png",alt:"[嘟嘴]"},{"url":"31.png",alt:"[大哭]"},{"url":"32.png",alt:"[说谎]"},{"url":"33.png",alt:"[想吐]"},{"url":"34.png",alt:"[难过]"},{"url":"35.png",alt:"[臭臭]"},{"url":"36.png",alt:"[笑的流泪]"},{"url":"37.png",alt:"[怒骂]"},{"url":"38.png",alt:"[睡觉]"},{"url":"39.png",alt:"[天使]"},{"url":"40.png",alt:"[心动]"},{"url":"41.png",alt:"[恶魔]"},{"url":"42.png",alt:"[尴尬]"},{"url":"43.png",alt:"[挤眼笑]"},{"url":"44.png",alt:"[温馨]"},{"url":"45.png",alt:"[说漏嘴]"},{"url":"46.png",alt:"[酷]"},{"url":"47.png",alt:"[拽]"}],
						[{"url":"48.png",alt:"[思考]"},{"url":"49.png",alt:"[不爽]"},{"url":"50.png",alt:"[气的颠倒]"},{"url":"51.png",alt:"[丧气]"},{"url":"52.png",alt:"[wink]"},{"url":"53.png",alt:"[哈欠]"},{"url":"54.png",alt:"[噤声]"}]		
	];
	 var replaceEmoji = function(str) {
				  var replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g,(item, index)=>{
				  	for(var i=0;i<emojiList.length;i++){
				  		var row = emojiList[i];
				  		for(var j=0;j<row.length;j++){
				  			var EM = row[j];
				  			if(EM.alt==item){
				  				//在线表情路径，图文混排必须使用网络路径，请上传一份表情到你的服务器后再替换此路径 
				  				//比如你上传服务器后，你的100.gif路径为https://www.xxx.com/emoji/100.gif 则替换onlinePath填写为https://www.xxx.com/emoji/
				  				let onlinePath = 'https://www.liebe.pub/static/emoji/'
				  				let imgstr = '<img src="'+onlinePath+EM.url+'" width="25upx" height="25upx" style="max-width:100%;">';
				  				return imgstr;
				  			}
				  		}
				  	}
				  });
				  return '<div style="vertical-align:middle;display: flex;align-items: center;flex-wrap: wrap;white-space: pre-wrap;word-break: break-all;">'+replacedStr+'</div>';
	 };
	RongIMLib.RongIMClient.setOnReceiveMessageListener({
	    // 接收到的消息
		
	  onReceived: function (message) {
		  var id = uni.getStorageSync('msgTargetId');
		  var msg = JSON.stringify(message);
		  var newMsg = JSON.parse(msg);
		  var haoTime = new Date().getTime();
		  if(id!=0) {
			 if(newMsg.senderUserId==id) {
				var nowStandardTime = getMoreTime();
				var length = that.$store.state.msgList.length-1;
				if(length>0) {
					var betweenTime = haoTime-that.$store.state.msgList[length].sentTime;
					if(betweenTime>=60000) {
						var showTime = {
							messageType:'system',
							type:'time',
							content:nowStandardTime
						}
						that.$store.commit('pushMsg',showTime);
					}
				}
				if(newMsg.messageType=='TextMessage') {
					if(newMsg.content.extra.type!='pin'&&newMsg.content.extra.type!='system') {
						newMsg.content.extra = replaceEmoji(newMsg.content.content);
					}
				}	
				that.$store.commit('pushMsg',newMsg);
				if(newMsg.messageType=='ImageMessage') {
					that.$store.commit('pushImg',newMsg.content.imageUri);
				}	
				uni.setStorageSync('msgList'+id,that.$store.state.msgList);
				that.$store.commit('changePush',true);
				console.log('push成功');
			} 
		  }else {
			  var myid = uni.getStorageSync('ID');
			  if(newMsg.senderUserId==newMsg.targetId) {
				var msgTarget1 = uni.getStorageSync('msgList'+newMsg.targetId);
				if(msgTarget1) {
					var nowStandardTime = getMoreTime();
					var length = msgTarget1.length-1;
					if(length!=0) {
						var betweenTime = haoTime-msgTarget1[length].sentTime;
						if(betweenTime>=60000) {
							var showTime = {
								messageType:'system',
								type:'time',
								content:nowStandardTime
							}
							msgTarget1.push(showTime);
						}
					}
					if(newMsg.messageType=='TextMessage') {
						if(newMsg.content.extra.type!='pin'&&newMsg.content.extra.type!='system') {
							newMsg.content.extra = replaceEmoji(newMsg.content.content);
						}
					}
					msgTarget1.push(newMsg);
					uni.setStorageSync('msgList'+newMsg.senderUserId,msgTarget1);
				}	
			}
			if(newMsg.messageType=='FileMessage') {
				for(var i=0;i<that.$store.state.conversation.length;i++) {
					if(that.$store.state.conversation[i].targetId==newMsg.senderUserId) {
						var conver = that.$store.state.conversation;
						var count = 0;
						conver[i].latestMessage.content.content = '[语音]';     //会话列表最近消息显示
						conver[i].unreadMessageCount++;		//未读消息+1
						for(var u=0;u<conver.length;u++) {
							count = count+conver[u].unreadMessageCount;
						}
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
						that.$store.commit('updateConver',conver);
						//getApp().globalData.conversation = spliceArr;
						uni.setStorageSync('conversation',conver);
						if(that.$store.state.conversation.length>1&&i>0) {
							var pushArr = conver[i];
							conver.splice(i,1);
							conver.unshift(pushArr);   //有新消息的会话置顶
							that.$store.commit('updateConver',conver);
							uni.setStorageSync('conversation',conver);
						}
						console.log('会话更新成功');
					}
				}
			}
		  }  
	    var messageContent = message.content;
	    // 判断消息类型
	    switch(message.messageType) {
	      case RongIMLib.RongIMClient.MessageType.TextMessage: // 文字消息
			for(var i=0;i<that.$store.state.conversation.length;i++) {
				if(that.$store.state.conversation[i].targetId==message.senderUserId) {
					var conver = that.$store.state.conversation;
					var count = 0;
					conver[i].latestMessage.content.content = messageContent.content;     //会话列表最近消息显示
					conver[i].unreadMessageCount++;		//未读消息+1
					for(var u=0;u<conver.length;u++) {
						count = count+conver[u].unreadMessageCount;
					}
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
					that.$store.commit('updateConver',conver);
					uni.setStorageSync('conversation',conver);
					if(that.$store.state.conversation.length>1&&i>0) {
						var pushArr = conver[i];
						conver.splice(i,1);
						conver.unshift(pushArr);   //有新消息的会话置顶
						that.$store.commit('updateConver',conver);
						uni.setStorageSync('conversation',conver);
					}
					console.log('会话更新成功');
				}
			}
	        break;
	      case RongIMLib.RongIMClient.MessageType.ImageMessage: // 图片消息
	        console.log('图片缩略图 base64', messageContent.content); 
	        console.log('原图 url', messageContent.imageUri);
			for(var i=0;i<that.$store.state.conversation.length;i++) {
				if(that.$store.state.conversation[i].targetId==message.senderUserId) {
					var conver = that.$store.state.conversation;
					var count = 0;
					conver[i].latestMessage.content.content = '[图片]';     //会话列表最近消息显示
					conver[i].unreadMessageCount++;		//未读消息+1
					for(var u=0;u<conver.length;u++) {
						count = count+conver[u].unreadMessageCount;
					}
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
					that.$store.commit('updateConver',conver);
					//getApp().globalData.conversation = spliceArr;
					uni.setStorageSync('conversation',conver);
					if(that.$store.state.conversation.length>1&&i>0) {
						var pushArr = conver[i];
						conver.splice(i,1);
						conver.unshift(pushArr);   //有新消息的会话置顶
						that.$store.commit('updateConver',conver);
						//getApp().globalData.conversation = spliceArr;
						uni.setStorageSync('conversation',conver);
					}
					console.log('会话更新成功');
				}
			}
	        break;
	      case RongIMLib.RongIMClient.MessageType.HQVoiceMessage: // 音频消息
	        console.log('音频 type ', messageContent.type); // 编解码类型，默认为 aac 音频
	        console.log('音频 url', messageContent.remoteUrl); // 播放：<audio src={remoteUrl} />
	        console.log('音频 时长', messageContent.duration);
	        break;
	      case RongIMLib.RongIMClient.MessageType.RichContentMessage: // 富文本(图文)消息
	        console.log('文本内容', messageContent.content);
	        console.log('图片 base64', messageContent.imageUri);
	        console.log('原图 url', messageContent.url);
	        break;
	      case RongIMLib.RongIMClient.MessageType.UnknownMessage: // 未知消息
	        console.log('未知消息, 请检查消息自定义格式是否正确', message);
	        break;
	      default:
	        console.log('收到消息', message);
	        break;
	    }
	  }
	});
}

const app = new Vue({
    ...App,
	store
})
app.$mount()
