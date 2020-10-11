<template>
	<view class="container">
		<form @submit="giveRegister">
			<view class="img_view" @click="chooseImg">
				<image class="avatar_img" :src="avatar" mode="aspectFill"></image>
			</view>
			<view class="input_view">
				<input class="input_content" name="name" type="text" placeholder-class="input_p" placeholder="请输入姓名" />
			</view>
			<view class="input_view">
				<input class="input_content" name="phone" type="text" placeholder-class="input_p" placeholder="请输入手机号" />
			</view>
			<view class="input_view">
				<input class="input_content" name="password" type="text" placeholder-class="input_p" placeholder="请输入密码" />
			</view>
			<button type="primary" class="sub_btn" form-type="submit">提交</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatar: '/static/avatar.png'
			}
		},
		methods: {
			// 文件上传
			chooseImg() {
				const _this =this
				// 选择头像
				uni.chooseImage({
					count: 1, //默认9
					success: function (res) {
						_this.$api.uploadImg(res.tempFilePaths).then(res => {
							_this.avatar = res[0]
						})
					}
				})
			},
			// 保存信息
			giveRegister (e) {
				const _this = this
				let customer = e.detail.value
				customer.avatar = _this.avatar
				if (customer.name === '' || customer.phone === '' || customer.password === '') {
					uni.showToast({
						icon: "none",
						title: "内容不能为空"
					})
					return false
				}
				if (customer.avatar === '/static/avatar.png') {
					uni.showToast({
						icon: "none",
						title: "请上传头像"
					})
					return false
				}
				uni.showLoading({
					mask: true,
					title: "提交中..."
				})
				_this.$api.register(customer).then(res => {
					if (res.code === 200) {
						uni.hideLoading()
						uni.showToast({
							icon: "success",
							title: "提交成功"
						})
						setTimeout(() => {uni.navigateBack()}, 2000)
					}
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #F4F4F4;
	}
	.container{
		width: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 300rpx;
	}
	.avatar_img,.img_view{
		width: 120rpx;
		height: 120rpx;
		border: 1rpx dashed #E6E6E6;
		margin: 0 auto;
		border-radius: 50%;
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
</style>
