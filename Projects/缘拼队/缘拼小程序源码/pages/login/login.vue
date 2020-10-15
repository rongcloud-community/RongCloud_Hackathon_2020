<template>
	<view class="body">
		<view class="title">
			<image src="../../static/icon/缘拼logo.png" mode="" class="logo"></image>
		</view>
		<swiper :current="pageIndex" class="swiper">
			<swiper-item @touchmove.stop>
				<view class="login">
					<view class="login_box">
						<button class="wxBtn" open-type="getUserInfo" @click="weixinLogin">
							<image src="../../static/icon/wechat.png" style="z-index: 1;width: 120upx;height: 120upx;background-color: #EEEEEE;border-radius: 60upx;"></image>
						</button>
						<view class="loginBtn">
							微 信 一 键 登 录
						</view>
					</view>
					<view class="learnMore" @click="jump">
							了 解 更 多
						</view>
				</view>
			</swiper-item>
			<swiper-item @touchmove.stop>
				<view class="intro">
					<view class="intro_top">
						<text>缘 拼 简 介</text>
					</view>
					<text>  缘拼是一款专注于解决大学生社交难题的小程序，您是否有以下烦恼：想找个志同道合的同学互相督促学习？想出去搓一顿好的却没有人陪？想去KTV放声歌唱朋友却没空？即刻约拼一下，扩大你的朋友圈！</text>
				</view>
				<view class="backBtn" @click="back">
					去 登 录
				</view>
			</swiper-item>
		</swiper>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageIndex:0,
				status:'',
				phoneNum:'',
				pwdNum:'',
				registPhone:'',
				registPwd:'',
				confirmPwd:''
			}
		},
		onLoad(e) {
			if(e.loginStatus==-1) {
				uni.showToast({
					title:'登录过期，请重新登录！',
					icon:'none',
					duration:1000
				});
			}
			var id = uni.getStorageSync('ID');
			if(!id) {
				uni.showToast({
					title:'请重新登陆！',
					duration:1000,
					icon:'none'
				});
			}else {
				uni.reLaunch({
					url:'../index/index'
				})
			}
		},
		methods: {
			jump() {
				this.pageIndex=1;
			},
			back() {
				this.pageIndex=0;
			},
			weixinLogin() {
				uni.login({
					success: (res) => {
						uni.request({
							url:'https://zmetalhearty.com/yuanpin/login',
							method:'POST',
							header: {
							    'content-type': 'application/x-www-form-urlencoded'
							},
							data:{
								js_code:res.code
							},
							success :(res)=> {
								if(res.data.openid) {
									var openId=res.data.openid;
									uni.setStorageSync('openId',openId);
									uni.getUserInfo({
										provider: 'weixin',
										success: res => {
											console.log('用户信息获取成功');
											uni.setStorageSync('nickName', res.userInfo.nickName);
											uni.setStorageSync('avatarUrl', res.userInfo.avatarUrl);
											uni.setStorageSync('sex',res.userInfo.gender);
											if(res.userInfo.gender==1) {
												var sex = '男'
											}else {
												var sex = '女'
											}
											uni.request({
												url: 'https://zmetalhearty.com/yuanpin/UserInfoUpload',
												method: 'POST',
												header: {
												    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
												},
												data: {
													openid: openId,
													nickname: res.userInfo.nickName,
													headphoto: res.userInfo.avatarUrl,
													sex: sex
												},
												success: res => {
													uni.setStorageSync('ID',res.data.ID);
													var collectList = [];
													uni.setStorageSync('collectList',collectList);
													var viewList = [];
													uni.setStorageSync('viewList',viewList);
													console.log('上传头像昵称成功');
													uni.reLaunch({
														url:'../index/index'
													})
												}
											});
										}
									});
								}else if(res.statusCode==500) {
									uni.showToast({
										title:'网络错误！',
										icon:'none'
									})
								}
							}
						})	
					}
				})
			}
		}
	}
</script>

<style>
	body {
		margin: 0;
		padding: 0;
		height: 100vh;
		width: 100%;
		background-image: linear-gradient(125deg,#2c3e50,#27ae60,#2980b9,#ffaaff,#8e44ad);
		background-size: 400%;
		animation: bganimation 15s infinite;
	}
	@keyframes bganimation {
	  0%{
	    background-position: 0% 50%;
	  }
	  50%{
	    background-position: 100% 50%;
	  }
	  100%{
	    background-position: 0% 50%;
	  }
	}
	.wxBtn {
		width: 120upx;
		height: 120upx;
		border-radius: 60upx;
		padding: 0;
		animation-name: fade;
		animation-duration: 1s;
		animation-timing-function: linear;
	}
	.login {
		height: 65vh;
		width: 100%;
		text-align: center;
	}
	.logo {
		width: 180upx;
		height: 180upx;
		margin: 90upx auto;
		line-height:300upx;
		border-radius: 30upx;
		animation-name: fade;
		animation-duration: 1.5s;
		animation-timing-function: linear;
	}
	@keyframes fade {
	    0% {
	        opacity: 0
	    }
	
	    100% {
	        opacity: 1
	    }
	}
	.login_box {
		height: 600upx;
		width: 540upx;
		margin: 0 auto;
		margin-top: 100upx;
		border-radius: 30upx;
		padding: 0 30upx;
		text-align: center;
		line-height: 150upx;
		padding-top: 300upx;
	}
	.login_box::before {
		filter: blur(50upx);
		z-index: -1;
		overflow: hidden;
	}
	.loginBtn {
		width: 240upx;
		height: 120upx;
		border-radius: 15upx;
		text-align: center;
		line-height: 120upx;
		color: #fff;
		font-size:30upx;
		margin: 0 auto;
		z-index: 1;
		animation-name: fade;
		animation-duration: 1.5s;
		animation-timing-function: linear;
	}
	.title {
		width: 100%;
		height: 25vh;
		font-size: 70upx;
		text-align: center;
		color: #eee;
		line-height: 300upx;
		font-weight: 100;
		margin-top: 50upx;
	}
	.swiper {
		width: 100%;
		height: 65vh;
	}
	.learnMore {
		width: 560upx;
		height: 120upx;
		line-height: 120upx;
		text-align: center;
		margin: 0 auto;
		font-size: 32upx;
		color: #eee;
		font-weight: 100;
		animation-name: fade;
		animation-duration: 2s;
		animation-timing-function: linear;
	}
	.backBtn {
		width: 560upx;
		height: 76upx;
		line-height: 76upx;
		text-align: center;
		margin: 200upx auto;
		font-size: 32upx;
		color: #eee;
		font-weight: 100;
	}
	.intro {
		width: 540upx;
		height: 540upx;
		padding: 30upx;
		border-radius: 30upx;
		color: #fff;
		margin: 0 auto;
		line-height: 50upx;
		letter-spacing: 6upx;
		background-color: rgba(255,255,255,.3);
	}
	.intro_top {
		font-size: 36upx;
		height: 80upx;
		width: 100%;
		line-height: 80upx;
		border-bottom: 2upx #eee solid;
		text-align: center;
		margin-bottom: 20upx;
	}
</style>
