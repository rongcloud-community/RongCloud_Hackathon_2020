
<template>
	<view>
		<view class="avatar" @click="login">
			<view class="blank"></view>
			<view class="content">
				<view class="left">
					<image :src="avatar" mode=""></image>
				</view>
				<view class="right">
						<text style="font-size: 34upx;color: #eee;margin: 0 auto;font-weight: bold;margin-top:30upx;">{{name}}</text>
						<image :src="sexUrl" mode="" style="width: 26upx;height: 26upx;margin-left: 20upx;"></image>
					
					<text style="font-size: 30upx;color: #eee;margin: 0 auto;display: block;">账号：{{id}}</text>
				</view>
			</view>
		</view>
		<view class="sort">
			<view class="sort_box" v-for="(box,index) in sort" :key="index" hover-class="sort_box_hover" @click="jump(box.title)">
				<image :src="box.img_url" mode=""></image>
				<text>{{box.title}}</text>
			</view>
		</view>
		<view class="options">
			<!--帮助-->
			<view :class="currentIndex==0?'help':(currentIndex==-1?'normal':(beforeIndex!=0?'normal':'helpHide'))" :key="op" @click="changeHelp">
				<view class="title">
					<text :class="currentIndex==0?'text':(currentIndex==-1?'normalText':(beforeIndex!=0?'normalText':'textChange'))">帮助</text>
					<image src="../../static/icon/goto_green.png" mode="" :class="currentIndex==0?'arrow':(currentIndex==-1?'normalArrow':(beforeIndex!=0?'normalArrow':'arrowChange'))"></image>
				</view>
				<view class="help_content">
					<text style="color: #30c6b0; font-size: 35upx;display: block;">如何发起缘拼请求？</text>
					<text style="font-size: 28upx;display: block;margin-top: 20upx;">  详情页点想拼后，点输入框右边的加号，第三个图标即为发起缘拼</text>
					<text style="color: #30c6b0; font-size: 35upx;display: block;margin-top: 30upx;">如何删除对话？</text>
					<text style="font-size: 28upx;display: block;margin-top: 20upx;">  长按对话就OK啦~</text>
				</view>
			</view>
			<!--了解更多-->
			<view :class="currentIndex==1?'more':(currentIndex==-1?'normal':(beforeIndex!=1?'normal':'moreHide'))" :key="op1" @click="changeMore">
				<view class="title">
					<text :class="currentIndex==1?'text':(currentIndex==-1?'normalText':(beforeIndex!=1?'normalText':'textChange'))">了解更多</text>
					<image src="../../static/icon/goto_green.png" mode="" :class="currentIndex==1?'arrow':(currentIndex==-1?'normalArrow':(beforeIndex!=1?'normalArrow':'arrowChange'))"></image>
				</view>
				<view class="more_content">
					<text style="color: #30c6b0; font-size: 35upx;display: block;">什么是缘拼？</text>
					<text style="font-size: 28upx;display: block;margin-top: 20upx;">  缘拼是一款专注于解决大学生社交难题的小程序，您是否有以下烦恼：想找个志同道合的同学互相督促学习？想出去搓一顿好的却没有人陪？想去KTV放声歌唱朋友却没空？即刻约拼一下，扩大你的朋友圈！</text>
				</view>
			</view>
			<!--退出登录-->
			<view :class="currentIndex==2?'exit':(currentIndex==-1?'normal':(beforeIndex!=2?'normal':'exitHide'))" :key="op2" @click="changeExit">
				<view class="title">
					<text :class="currentIndex==2?'text':(currentIndex==-1?'normalText':(beforeIndex!=2?'normalText':'textChange'))">退出登录</text>
					<image src="../../static/icon/goto_green.png" mode="" :class="currentIndex==2?'arrow':(currentIndex==-1?'normalArrow':(beforeIndex!=2?'normalArrow':'arrowChange'))"></image>
				</view>
				<view class="exit_content">
					<view class="exit_left" @click.native.stop="cancel">
						<text style="color: #aaa;">取消</text>
					</view>
					<view class="exit_right" @click.native.stop="exit">
						<text style="color: #eee;">确定</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				avatar:'',
				id:'',
				currentIndex:-1,
				beforeIndex:-1,
				loginStatus:false,
				sex:-1,
				sexUrl:'',
				sort:[
					{
						title:'收藏',
						img_url:'../../static/icon/collection.png'
					},
					{
						title:'历史',
						img_url:'../../static/icon/history.png'
					},
					{
						title:'我的缘拼',
						img_url:'../../static/icon/yuanpin.png'
					}
				]
			}
		},
		onLoad() {
			this.name = uni.getStorageSync('nickName');
			this.avatar = uni.getStorageSync('avatarUrl');
			this.sex = uni.getStorageSync('sex');
			this.id = uni.getStorageSync('ID');
			if(this.name == ''||this.avatar == '') {
				this.name = '请登录',
				this.avatar = '../../static/icon/defaultUser.png'
				this.loginStatus = true;
			}
			if(this.sex == 1) {
				this.sexUrl = '../../static/icon/boy.png'
			}else if(this.sex == 2) {
				this.sexUrl = '../../static/icon/girl.png'
			}
		},
		methods: {
			login() {
				if(this.loginStatus) {
					uni.navigateTo({
						url:'../login/login'
					})
				}
			},
			jump(e) {
				if(e=='收藏'){
					uni.navigateTo({
						url:'../history/history?type='+'collection'
					})
				}else if(e=='历史') {
					uni.navigateTo({
						url:'../history/history?type='+'history'
					})
				}else if(e=='我的缘拼') {
					uni.navigateTo({
						url:'../myPin/myPin'
					})
				}
			},
			changeHelp() {
				if(this.currentIndex == 0) {
					this.currentIndex = -2;
					this.beforeIndex =0;
				}else if(this.currentIndex == 1){
					this.currentIndex = 0;
					this.beforeIndex = 1;
				}else if(this.currentIndex == 2) {
					this.currentIndex = 0;
					this.beforeIndex = 2;
				}else if(this.currentIndex == -1) {
					this.currentIndex = 0;
					this.beforeIndex = -1;
				}else if(this.currentIndex == -2) {
					this.currentIndex = 0;
					this.beforeIndex = -2;
				}
			},
			changeMore() {
				if(this.currentIndex == 0) {
					this.currentIndex = 1;
					this.beforeIndex =0;
				}else if(this.currentIndex == 1){
					this.currentIndex = -2;
					this.beforeIndex = 1;
				}else if(this.currentIndex == 2) {
					this.currentIndex = 1;
					this.beforeIndex = 2;
				}else if(this.currentIndex == -1) {
					this.currentIndex = 1;
					this.beforeIndex = -1;
				}else if(this.currentIndex == -2) {
					this.currentIndex = 1;
					this.beforeIndex = -2;
				}
			},
			changeExit() {
				if(this.currentIndex == 0) {
					this.currentIndex = 2;
					this.beforeIndex =0;
				}else if(this.currentIndex == 1){
					this.currentIndex = 2;
					this.beforeIndex = 1;
				}else if(this.currentIndex == 2) {
					this.currentIndex = -2;
					this.beforeIndex = 2;
				}else if(this.currentIndex == -1) {
					this.currentIndex = 2;
					this.beforeIndex = -1;
				}else if(this.currentIndex == -2) {
					this.currentIndex = 2;
					this.beforeIndex = -2;
				}
			},
			cancel() {
				this.currentIndex = -2;
				this.beforeIndex = 2;
			},
			exit() {
				uni.clearStorageSync();
				var userId = uni.getStorageSync('userId');
				if(userId) {
					RongIMLib.RongIMClient.getInstance().logout();
				}
				uni.navigateTo({
					url:'../login/login'
				})
			}
		}
	}
</script>

<style>
 page {
	 margin: 0;
	 padding: 0;
	 height: 100vh;
	 width: 100%;
	 background-color: #efeeee;
 }
 .avatar {
	width: 100%;
	height: 350upx;
	background-image: linear-gradient(125deg,#3c9c99,#abbf52,#47a692);
	background-size: 200%;
	animation: bganimation 10s infinite;
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
 .left image {
	 width: 150upx;
	 height: 150upx;
	 border-radius: 50%;
	 margin: 0 auto;
	 box-shadow: #eee  0upx 0upx 4upx 4upx;
 }
 .blank {
	 height: 130upx;
	 width: 100%;
	 text-align: center;
 }
 .content {
	 height: 230upx;
	 width: 100%;
	 display: flex;
	 flex-direction: row;
	 justify-content:center;
	 margin: 0;
	 padding: 0;
 }
 .name {
	 display: flex;
	 flex-direction: row;
	 justify-content: center;
 }
 .left {
	 width: 300upx;
	 padding: 30upx;
	 text-align: center;
 }
 .right {
	 width: 510upx;
	 padding: 30upx 0;
	 line-height: 50upx;
 }
 .sort {
	 width: 100%;
	 height: 250upx;
	 padding: 30upx 0;
	 display: flex;
	 flex-direction: row;
	 justify-content: space-evenly;
 }
 .sort_box {
	 width: 180upx;
	 height: 180upx;
	 padding: 30upx;
	 background-color: #efeeee;
	 border-radius: 20upx;
	 text-align: center;
	 box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
	 -20upx -20upx 30upx rgba(255,255,255, 1);
	 transition: all 0.2s;
 }
 .sort_box_hover {
	 box-shadow: 0 0 0 rgba( 0, 0, 0, 0.2),
	 0 0 0 rgba(255,255,255, 1),
	 inset 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
	 inset -20upx -20upx 20upx rgba(255,255,255,1);
 }
 .sort_box image {
	 width: 80upx;
	 height: 80upx;
	 margin: 0 auto;
	 display: block;
 }
 .sort_box text {
	 margin-top: 4upx;
	 color: #7e7e7e;
 }
 .options {
	 width: 680upx;
	 height: auto;
	 margin: 0 auto;
 }
 .normal {
	 width: 100%;
	 height: 120upx;
	 line-height: 60upx;
	 padding: 30upx;
	 background-color: #efeeee;
	 display: flex;
	 flex-direction: row;
	 justify-content: space-between;
	 position: relative;
	 border-radius: 20upx;
	 margin-bottom: 50upx;
	 box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
	 -20upx -20upx 30upx rgba(255,255,255, 1);
	 color: #8f8f8f;
	 font-size: 30upx;
	 overflow: hidden;
 }
 .normal_text {
	 line-height: 60upx;
	 font-size: 30upx;
 }
 .text {
	 line-height: 60upx;
	 font-size: 40upx;
	 animation: text 1s;
 }
 @keyframes text{
 	from{
		font-size: 30upx;
	}
 	to{
		font-size: 40upx;
	}
 }
 .textChange {
	 line-height: 60upx;
	 font-size: 30upx;
	 animation: textChange 1s;
 }
 @keyframes textChange{
 	from{
		font-size: 40upx;
	}
 	to{
		font-size: 30upx;
	}
 }
 .helpHide{
	 width: 100%;
	 height: 120upx;
	 padding: 30upx;
	 border-radius: 20upx;
	 margin-bottom: 50upx;
	 background-color: #efeeee;
	 display: flex;
	 flex-direction: row;
	 justify-content: space-between;
	 position: relative;
	 box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
	 -20upx -20upx 30upx rgba(255,255,255, 1);
	 animation: helpHide 1s;
	 color: #8f8f8f;
	 overflow: hidden;
 }
 @keyframes helpHide{
 	from{
 		height:400upx;
		box-shadow: 0 0 0 rgba( 0, 0, 0, 0.1),
		0 0 0 rgba(255,255,255, 1),
		inset 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
		inset -20upx -20upx 20upx rgba(255,255,255,1);
 	}
 	to{
 		height: 120upx;
		box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
		-20upx -20upx 30upx rgba(255,255,255, 1);
 	}
 }
 .moreHide{
 	 width: 100%;
 	 height: 120upx;
 	 line-height: 60upx;
 	 padding: 30upx;
 	 display: flex;
	 background-color: #efeeee;
 	 flex-direction: row;
 	 justify-content: space-between;
 	 border-radius: 20upx;
 	 margin-bottom: 50upx;
 	 box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
 	 -20upx -20upx 30upx rgba(255,255,255, 1);
 	 animation: moreHide 1s;
	 color: #8f8f8f;
	 overflow: hidden;
	 position: relative;
 }
 @keyframes moreHide{
 	from{
 		height:500upx;
		box-shadow: 0 0 0 rgba( 0, 0, 0, 0.1),
		0 0 0 rgba(255,255,255, 1),
		inset 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
		inset -20upx -20upx 20upx rgba(255,255,255,1);
 	}
 	to{
 		height: 120upx;
		box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
		-20upx -20upx 30upx rgba(255,255,255, 1);
 	}
 }
 .exitHide{
 	 width: 100%;
 	 height: 120upx;
 	 line-height: 60upx;
 	 padding: 30upx;
 	 display: flex;
	 background-color: #efeeee;
 	 flex-direction: row;
 	 justify-content: space-between;
 	 border-radius: 20upx;
 	 margin-bottom: 50upx;
 	 box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
 	 -20upx -20upx 30upx rgba(255,255,255, 1);
 	 animation: exitHide 1s;
	 color: #8f8f8f;
	 overflow: hidden;
	 position: relative;
 }
 @keyframes exitHide{
 	from{
 		height:400upx;
		box-shadow: 0 0 0 rgba( 0, 0, 0, 0.1),
 		0 0 0 rgba(255,255,255, 1),
 		inset 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
 		inset -20upx -20upx 20upx rgba(255,255,255,1);
 	}
 	to{
 		height: 120upx;
		box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
		-20upx -20upx 30upx rgba(255,255,255, 1);
 	}
 }
 .help{
 	 width: 100%;
 	 height: 400upx;
 	 line-height: 60upx;
 	 padding: 30upx;
 	 border-radius: 20upx;
 	 margin-bottom: 50upx;
	 display: flex;
	 flex-direction: row;
	 justify-content: space-between;
	 position: relative;
 	 box-shadow: 0 0 0 rgba( 0, 0, 0, 0.1),
 	 0 0 0 rgba(255,255,255, 1),
 	 inset 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
 	 inset -20upx -20upx 20upx rgba(255,255,255,1);
 	 animation: help 1s;
	 color: #8f8f8f;
	 overflow: hidden;
 }
 @keyframes help{
 	from{
 		height:120upx;
 		box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
 		-20upx -20upx 30upx rgba(255,255,255, 1);
 	}
 	to{
 		height: 400upx;
 		box-shadow: 0 0 0 rgba( 0, 0, 0, 0.1),
 		0 0 0 rgba(255,255,255, 1),
 		inset 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
 		inset -20upx -20upx 20upx rgba(255,255,255,1);
 	}
 }
 .title {
	 height: 60upx;
	 width: 620upx;
	 display: flex;
	 flex-direction: row;
	 justify-content: space-between;
 }
 .help_content {
	 width: 620upx;
	 height: 200upx;
	 position: absolute;
	 top: 124upx;
	 line-height: 35upx;
	 letter-spacing: 2upx;
 }
 .more{
 	 width: 100%;
 	 height: 500upx;
 	 line-height: 60upx;
 	 padding: 30upx;
 	 display: flex;
 	 flex-direction: row;
 	 justify-content: space-between;
 	 border-radius: 20upx;
 	 margin-bottom: 50upx;
 	 box-shadow: 0 0 0 rgba( 0, 0, 0, 0.1),
 	 0 0 0 rgba(255,255,255, 1),
 	 inset 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
 	 inset -20upx -20upx 20upx rgba(255,255,255,1);
 	 animation: more 1s;
	 color: #8f8f8f;
	 overflow: hidden;
	 position: relative;
 }
 @keyframes more{
 	from{
		height:120upx;
		box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
		-20upx -20upx 30upx rgba(255,255,255, 1);
	}
 	to{
		height: 500upx;
		box-shadow: 0 0 0 rgba( 0, 0, 0, 0.1),
		0 0 0 rgba(255,255,255, 1),
		inset 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
		inset -20upx -20upx 20upx rgba(255,255,255,1);
	}
 }
 .more_content {
	 width: 620upx;
	 height: 400upx;
	 position: absolute;
	 top: 124upx;
	 line-height: 40upx;
	 letter-spacing: 4upx;
 }
 .exit{
 	 width: 100%;
 	 height: 250upx;
 	 line-height: 60upx;
 	 padding: 30upx;
 	 display: flex;
 	 flex-direction: row;
 	 justify-content: space-between;
 	 border-radius: 20upx;
 	 margin-bottom: 50upx;
 	 box-shadow: 0 0 0 rgba( 0, 0, 0, 0.1),
 	 0 0 0 rgba(255,255,255, 1),
 	 inset 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
 	 inset -20upx -20upx 20upx rgba(255,255,255,1);
 	 animation: exit 1s;
	 color: #8f8f8f;
	 overflow: hidden;
	 position: relative;
 }
 @keyframes exit{
 	from{
		height:120upx;
		box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
		-20upx -20upx 30upx rgba(255,255,255, 1);
	}
 	to{
		height: 250upx;
		box-shadow: 0 0 0 rgba( 0, 0, 0, 0.1),
		0 0 0 rgba(255,255,255, 1),
		inset 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
		inset -20upx -20upx 20upx rgba(255,255,255,1);
	}
 }
 .exit_content {
	 width: 620upx;
	 height: 100upx;
	 position: absolute;
	 top: 124upx;
	 line-height: 40upx;
	 letter-spacing: 4upx;
	 display: flex;
	 flex-direction: row;
	 justify-content: space-evenly;
	 z-index:1;
 }
 .exit_left {
	 width: 250upx;
	 height: 80upx;
	 border-radius: 20upx;
	 text-align: center;
	 line-height: 80upx;
	 box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
	 -20upx -20upx 30upx rgba(255,255,255, 1);
	 user-select: none;
 }
 .exit_left :hover {
	 box-shadow: 0 0 0 rgba( 0, 0, 0, 0.2),
	 0 0 0 rgba(255,255,255, 1),
	 inset 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
	 inset -20upx -20upx 20upx rgba(255,255,255,1);
 }
 .exit_right {
	 width: 250upx;
	 height: 80upx;
	 border-radius: 20upx;
	 text-align: center;
	 line-height: 80upx;
	 background-color: #30c6b0;
	 color: #EEEEEE;
	 user-select: none;
	box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
	-20upx -20upx 30upx rgba(255,255,255, 1);
 }
 .exit_right :hover {
	 box-shadow: 0 0 0 rgba( 0, 0, 0, 0.2),
	 0 0 0 rgba(255,255,255, 1),
	 inset 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
	 inset -20upx -20upx 20upx rgba(255,255,255,1);
 }
 .normalArrow {
	 width: 50upx;
	 height: 50upx;
	 margin: 5upx 0;
	 display: block;
 }
 .arrow {
	 width: 50upx;
	 height: 50upx;
	 margin: 5upx 0;
	 animation: arrow 1s;
	 transform: rotate(90deg);
	 display: block;
 }
 @keyframes arrow{
 	from{
		transform: rotate(0deg);
	}
 	to{
		transform: rotate(90deg);
	}
 }
 .arrowChange {
	 width: 50upx;
	 height: 50upx;
	 margin: 5upx 0;
	 animation: arrowChange 1s;
	 transform: rotate(0deg);
	 display: block;
 }
@keyframes arrowChange{
	from{
		transform: rotate(90deg);
	}
	to{
		transform: rotate(0deg);
	}
}
</style>
