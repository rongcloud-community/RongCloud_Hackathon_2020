<template>
	<view>
		<!--头部展示开始-->
		<view class="top_container">
			<block v-if="userInfo!==null">
				<image class="avatar_img" :src="userInfo.avatar" mode="aspectFill"></image>
				<view class="name_text" v-text="userInfo.name"></view>
			</block>
			<view v-else class="login_btn" @click="giveLogin">登录/注册</view>
		</view>
		<!--头部展示结束-->
		<!--一个列表开始-->
		<view class="list_container" @click="logoutUser">
			<image class="icon_img" src="/static/logout.png" mode="aspectFill"></image>
			<view class="list_right">
				<view class="list_text">退出登录</view>
				<image class="right_icon" src="/static/right.png" mode="aspectFill"></image>
			</view>
		</view>
		<!--一个列表结束-->
	</view>
</template>

<script>
	import {
	    mapMutations
	} from 'vuex'
	
	export default {
		data() {
			return {
				userInfo: null
			}
		},
		onShow() {
			this.userInfo = this.$store.state.userInfo
		},
		methods: {
			...mapMutations(['logout']),
			// 退出登录
			logoutUser() {
				const userInfo = uni.getStorageSync("userInfo")
				if (userInfo === '' || userInfo === null || userInfo === undefined) { 
					uni.navigateTo({
						url: 'pages/login/login'
					})
					return false
				}
				this.logout()
				this.userInfo = null
			},
			// 登录
			giveLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			// 我收藏的文章
			giveCollect() {
				const userInfo = uni.getStorageSync("userInfo")
				if (userInfo === '' || userInfo === null || userInfo === undefined) { 
					uni.navigateTo({
						url: 'pages/login/login'
					})
					return false
				}
				// 跳转收藏列表
				uni.navigateTo({
					url: '/pages/mine/collect/collect'
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
		background-color: #4890f8;
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
	
	.login_btn{
		font-size: 36rpx;
		color: #FFFFFF;
		text-decoration: underline;
	}
	
	.list_container{
		width: 710rpx;
		height: 80rpx;
		padding: 0 20rpx;
		display: flex;
		justify-content: space-between;
		margin-top: 30rpx;
		background-color: #FFFFFF;
	}
	
	.icon_img{
		width: 40rpx;
		height: 40rpx;
		margin-top: 20rpx;
	}
	
	.list_right{
		width: 650rpx;
		height: 80rpx;
		display: flex;
		justify-content: space-between;
	}
	
	.list_text{
		height: 80rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 32rpx;
		color: #333333;
	}
	
	.right_icon{
		width: 40rpx;
		height: 40rpx;
		margin-top: 20rpx;
	}

</style>
