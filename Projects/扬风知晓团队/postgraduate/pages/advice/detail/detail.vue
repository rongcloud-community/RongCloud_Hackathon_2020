<template>
	<view v-if="teacher !== null">
		<!--头部展示开始-->
		<view class="top_container">
			<image class="avatar_img" :src="teacher.avatar" mode="aspectFill"></image>
			<view class="name_text" v-text="teacher.name"></view>
			<view class="name_text" v-text="teacher.typeIdDesc"></view>
		</view>
		<!--头部展示结束-->
		<!--简介开始-->
		<view class="mid_container">
			<view class="title_text">简介</view>
			<view class="content_text">擅长领域：{{teacher.area}}</view>
		</view>
		<!--简介结束-->
		<view class="zixun" @click="giveChat(teacher.userId)">立即咨询</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '0',
				teacher: null
			}
		},
		onLoad(e) {
			this.id = e.id
		},
		onReady:function(){
			const _this = this
			_this.getTeacher()
		},
		methods: {
			// 教师信息单条数据
			getTeacher() {
				const _this = this
				uni.showLoading({
					title: "加载中..."
				})
				_this.$api.getTeacher({"id": _this.id}).then(res => {
					_this.teacher = res.data
					uni.hideLoading()
				})
			},
			// 立即咨询
			giveChat(id) {
				const userInfo = uni.getStorageSync("userInfo")
				if (userInfo === '' || userInfo === null || userInfo === undefined) { 
					uni.navigateTo({
						url: 'pages/login/login'
					})
					return false
				}
				uni.navigateTo({
					url: '/pages/advice/chat/chat?senderUserId=' + userInfo.id + '&targetId=' + id + '&name=' + this.teacher.name + '&avatar=' + this.teacher.avatar
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #F4F4F4;
	}
	.top_container{
		width: 750rpx;
		height: 300rpx;
		background-color: #15A596;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.avatar_img{
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		margin-bottom: 20rpx;
		border: 2rpx solid #FFFFFF;
	}
	
	.name_text{
		font-size: 32rpx;
		color: #FFFFFF;
	}
	.mid_container{
		width: 710rpx;
		padding: 20rpx;
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
	}
	.title_text{
		width: 710rpx;
		height: 60rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 30rpx;
		color: #333333;
		font-weight: bold;
	}
	.content_text{
		width: 710rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 26rpx;
		color: #888888;
	}
	.zixun{
		width: 750rpx;
		height: 100rpx;
		background-color: #15A596;
		font-size: 36rpx;
		color: #FFFFFF;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		position: fixed;
		left: 0;
		bottom: 0;
	}
</style>
