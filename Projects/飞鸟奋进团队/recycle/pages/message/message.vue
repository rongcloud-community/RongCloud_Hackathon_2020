<template>
	<view v-if="$store.state.unreadCount>=0">
		<block v-for="(item,key,index) in dataList" :key="index">
			<!--列表展示开始-->
			<view class="list_container" @click="showChat(item.senderUserId, item.targetId)">
				<view class="left_view">
					<image class="avatar_img" :src="item.content.avatar" mode="aspectFill"></image>
					<view class="count_view" v-if="item.unreadCount>0">{{item.unreadCount}}</view>
				</view>
				<view class="right_view">
					<view class="right_name">{{item.content.name}}</view>
					<view class="right_content">{{item.content.content}}</view>
				</view>
			</view>
			<!--列表展示结束-->
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: this.$store.state.messageList
			}
		},
		onShow() {
			this.dataList = this.$store.state.messageList
			console.log('消息列表内容', this.$store.state.messageList)
		},
		methods: {
			showChat(senderUserId, targetId) {
				uni.navigateTo({
					url: '/pages/chat/chat?senderUserId='+senderUserId + '&targetId=' + targetId
				})
			}
		}
	}
</script>

<style>
	.list_container{
		width: 730rpx;
		height: 120rpx;
		padding-left: 20rpx;
		display: flex;
		justify-content: space-between;
	}
	.left_view{
		width: 80rpx;
		height: 80rpx;
		margin-top: 20rpx;
		border-radius: 10rpx;
		position: relative;
	}
	.avatar_img{
		width: 80rpx;
		height: 80rpx;
		border-radius: 10rpx;
	}
	.count_view{
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		top: -14rpx;
		right: -14rpx;
		background-color: #ff0000;
		color: #FFFFFF;
		font-size: 20rpx;
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
	}
	.right_view{
		width: 630rpx;
		height: 100rpx;
		padding: 10rpx 0;
		display: flex;
		flex-direction: column;
		border-bottom: 1rpx solid #E6E6E6;
	}
	.right_name{
		height: 50rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 28rpx;
		color: #333333;
	}
	.right_content{
		height: 50rpx;
		width: 500rpx;
		line-height: 50rpx;
		font-size: 24rpx;
		color: #888888;
		overflow: hidden;
		text-overflow:ellipsis;    
		white-space: nowrap;
	}
</style>
