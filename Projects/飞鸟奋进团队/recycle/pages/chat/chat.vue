<template>
	<view class="content" v-if="$store.state.unreadCount>=0">
		<!--内容接收开始-->
		<scroll-view id="scrollview" scroll-y="true" :style="{height: contentViewHeight + 'px'}" scroll-with-animation="true" :scroll-top="scrollTop" class="revice_content">
			<block v-for="(item,index) in dataList[targetId]" :key="index">
				<view class="data_view" v-if="item.messageDirection !== 1">
					<image class="my_icon" :src="item.content.avatar" mode="aspectFill"></image>
					<view class="msg_content" v-text="item.content.content"></view>
				</view>
				
				<view class="data_view answer_view" v-else>
					<view class="msg_content" v-text="item.content.content"></view>
					<image class="my_icon" :src="item.content.avatar" mode="aspectFill"></image>
				</view>
				
			</block>
		</scroll-view>
		<!--内容接收结束-->
		<!--底部输入框开始-->
		<form @submit="getContent">
			<view class="btm_container">
				<view class="input_view">
					<textarea @confirm="getContent" class="input_content" v-model="content" name="content" cursor-spacing="10" auto-height focus />
				</view>
				<view class="input_btn">
					<button plain form-type="submit" class="btn_hid" style="border: 0;" type="warn"></button>
					发送
				</view>
			</view>
		<!--底部输入框结束-->
		</form>
	</view>
</template>

<script>
	import {
	    mapMutations
	} from 'vuex'
	
	export default {
		data() {
			return {
				content: '',
				scrollTop: 0,
				contentViewHeight: 0,
				mitemHeight: 0,
				dataList: this.$store.state.messages,
				senderUserId: '0', // 发送者id
				targetId: '0', // 接受者id
				name: '', // 接受者name
				avatar: '', // 接受者头像
			}
		},
		onLoad(e) {
			this.senderUserId = e.senderUserId
			this.targetId = e.targetId
			this.name = e.name
			this.avatar = e.avatar
			console.log('senderUserId', e.senderUserId)
			console.log('targetId', e.targetId)
			console.log('name', e.name)
			console.log('avatar', e.avatar)
			this.$messages.initConversation(e.targetId)
			this.$messages.hasRead()
			const updateParams = {
			  'targetId': this.targetId,
			  'senderUserId': this.senderUserId
			}
			this.updateMessageList(updateParams)
		},
		created () {
			const res = uni.getSystemInfoSync();   //获取手机可使用窗口高度     api为获取系统信息同步接口
			this.contentViewHeight = res.windowHeight - (res.screenWidth / 750 * 120)-20; //像素   因为给出的是像素高度 然后我们用的是upx  所以换算一下 
		},
		methods: {
			...mapMutations(['saveMessage', 'updateMessageList']),
			// 获取发送的信息
			getContent (e) {
				const _this = this
				this.$messages.sendMessage(e.detail.value.content).then(function(message){
				  message.senderUserId = _this.targetId
				  _this.saveMessage(message)
				  const updateParams = {
					  'content': {
						  'avatar': _this.avatar,
						  'name': _this.name,
						  'content': e.detail.value.content
					  },
					  'targetId': _this.targetId,
					  'senderUserId': _this.senderUserId
				  }
				  _this.updateMessageList(updateParams)
				  _this.content = ''
				  _this.scrollToBottom()
				})
			},
			// 滚动到底部
			scrollToBottom () {
				let that = this
				setTimeout(() => {
					let query = uni.createSelectorQuery()
					query.selectAll('.data_view').boundingClientRect()
					query.select('#scrollview').boundingClientRect()
					query.exec((res) => {
						res[0].forEach((rect) => that.mitemHeight += rect.height)
						if(that.mitemHeight > res[1].height ){
							that.scrollTop = that.mitemHeight - res[1].height 
						}
					})
				}, 100)
				
			}
		}
	}
</script>

<style>
	page{
		background-color: #EEECEF;
	}
	.content {
		width: 710rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20rpx;
	}
	/*内容展示*/
	.revice_content{
		width: 710rpx;
		display: flex;
		flex-direction: column;
		padding: 20rpx;
		padding-bottom: 120rpx;
	}
	.data_view{
		width: 710rpx;
		display: flex;
		margin-bottom: 30rpx;
	}
	.my_icon{
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}
	.msg_content{
		max-width: 530rpx;
		padding: 20rpx;
		border-radius: 20rpx;
		background-color: #4CD964;
		font-size: 34rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		word-wrap: break-word;
		margin: 0 20rpx;
	}
	.answer_view{
		justify-content: flex-end;
	}

	/*底部展示*/
	.btm_container{
		width: 710rpx;
		min-height: 80rpx;
		padding: 20rpx;
		background-color: #efeeef;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		border-top: 1rpx solid #e2e2e2;
	}
	.input_view,.input_content{
		width: 580rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 34rpx;
		color: #333333;
	}
	.input_content{
		width: 540rpx;
		padding: 0 20rpx;
	}
	.input_btn{
		position: relative;
		bottom: 0;
		left: 0;
		height: 60rpx;
		margin-top: 10rpx;
		padding: 0 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 34rpx;
		color: #FFFFFF;
		background-color: #007AFF;
		border-radius: 10rpx;
	}
	.btn_hid{
		width: 110rpx;
		height: 60rpx;
		position: absolute;
		bottom: 0;
		left: 0;
	}
</style>
