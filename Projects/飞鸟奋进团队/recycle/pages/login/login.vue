<template>
	<view class="container">
		<form @submit="giveLogin">
			<view class="input_view">
				<input class="input_content" name="phone" type="text" placeholder-class="input_p" placeholder="请输入手机号" />
			</view>
			<view class="input_view">
				<input class="input_content" name="password" type="password" placeholder-class="input_p" placeholder="请输入密码" />
			</view>
			<button type="primary" class="sub_btn" form-type="submit">登录</button>
			<button type="default" class="sub_btn_a" @click="giveRegister">注册</button>
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
				
			}
		},
		methods: {
			...mapMutations(['login']),
			// 登录
			giveLogin(e) {
				const _this =this
				const values = e.detail.value
				if (values.phone ==='' || values.password === '') {
				    uni.showToast({
				        icon: 'none',
				        title: '账号或密码不能为空'
				    });
				    return false
				}
				uni.showLoading({
					title: '登录中...',
					mask: true
				})
				_this.$api.login(values).then(res => {
					uni.hideLoading()
					if (res.code === 200){
						_this.login(res.data)
						uni.navigateBack()
					} else {
						uni.showToast({
						    icon: 'none',
						    title: '用户账号或密码不正确',
						})
					}
					
				})
			},
			giveRegister() {
				uni.navigateTo({
					url: '/pages/register/register'
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #f4f4f4;
	}
	.container{
		width: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 300rpx;
	}
	.input_view,.input_content{
		width: 500rpx;
		height: 80rpx;
		background-color: #FFFFFF;
		font-size: 36rpx;
		padding: 0 10rpx;
		border-radius: 10rpx;
	}
	.input_view{
		margin-top: 30rpx;
	}
	.input_p{
		font-size: 36rpx;
		color: #808080;
	}
	
	.sub_btn{
		width: 540rpx;
		margin: 100rpx auto;
		margin-bottom: 30rpx;
		background-color: #4890f8;
	}
	.sub_btn_a{
		width: 540rpx;
		margin: 0 auto;
	}
</style>
