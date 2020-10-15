<template>
	<view class="body">
		<view class="head">
			<view :class="addStutus?'add_hover':'add'" @click="add">
				<view :class="addStutus?'one_hover':'one'"></view>
				<view :class="addStutus?'two_hover':'two'"></view>
			</view>
			<view class="blank"></view>
			<view class="head_content">
				<view class="left">
					<image :src="avatarUrl" mode=""></image>
				</view>
				<view class="right">
					<text style="font-size: 40upx;font-weight: bold;">{{tinyName}}</text><image :src="sexUrl" mode="" style="width: 30upx;height: 30upx;margin-left: 10upx;"></image>
					<br v-show="flag"><text style="font-size: 28upx;" v-show="flag">昵称：{{targetName}}</text>
					<br><text style="font-size: 28upx;">账号：{{targetId}}</text>
				</view>
			</view>
		</view>
		<view class="more">
			<view class="moreBox" :class="moreStatus==0?'moreDefault':(moreStatus==1?'showMore':'moreBack')" @click="moreChange">
				<view class="moreTitle">
					<text v-if="sex=='男'" :class="moreStatus==0?'sexDefault':(moreStatus==1?'showSex':'sexBack')">他的缘拼</text>
					<text v-if="sex=='女'" :class="moreStatus==0?'sexDefault':(moreStatus==1?'showSex':'sexBack')">她的缘拼</text>
					<image src="../../static/icon/goto_green.png" mode="" :class="moreStatus==0?'normalArrow':(moreStatus==1?'arrow':'arrowChange')"></image>
				</view>
				<view class="empty" v-if="sendEmpty">
					ta还没有发布过缘拼呢~
				</view>
				<scroll-view scroll-y="true" class="moreContent" v-if="!sendEmpty">
					<view class="viewBox" v-for="(view,index) in sendArray" :key="index" @click="intro('../intro/intro?title='+view.title
					+'&img='+view.img
					+'&address='+JSON.stringify(view.address)
					+'&sex='+view.sex
					+'&dowhat='+view.dowhat
					+'&details='+view.details
					+'&type='+view.type
					+'&userid='+view.userid
					+'&time='+view.time
					+'&date='+view.date
					+'&pstart='+JSON.stringify(view.pstart)
					+'&pend='+JSON.stringify(view.pend)
					+'&id='+view.ID
					+'&Comment='+view.Comment
					+'&status='+view.status
					+'&likeCount='+view.likeCount
					)">
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
			</view>
		</view>
		<view class="sendMsg" @click="talk" v-show="sendFlag" hover-class="sendMsgHover">
			<text style="font-size: 30upx; font-weight: bold;color: #30c6b0;">发送消息</text>
		</view>
	</view>
</template>

<script>
	import RongIMLib from '../RongIMLib.miniprogram-1.1.3.js';
	export default {
		data() {
			return {
				id:-1,
				targetName:'',
				uLoginName:'',
				tinyName:'',
				sex:'',
				sexUrl:'',
				avatarUrl:'',
				flag:true,
				type:'',
				targetId:'',
				addStutus:'',
				avataUrl:'',
				sendFlag:false,
				operation:'',
				sendArray:[],
				sendEmpty:false,
				moreStatus:0
			}
		},
		onLoad(e) {
			this.targetName = e.targetName;
			//this.tinyName = e.tinyName;
			this.sex = e.sex;
			this.type = e.type;
			this.targetId = e.targetId;
			this.avatarUrl = e.avatarUrl;
			if(this.avatarUrl=='') {
				this.avatarUrl='../../static/icon/defaultUser.png'
			}
			if(this.sex=='男') {
				this.sexUrl='../../static/icon/boy.png'
			}else if(this.sex=='女') {
				this.sexUrl='../../static/icon/girl.png'
			}else{
				this.sexUrl=''
			}
			if(this.tinyName=='null'||this.tinyName=='') {
				this.tinyName=this.targetName;
				this.flag=false;
			}
			if(this.type=='1'||this.type=='2') {
				this.addStutus=true;
				this.operation='remove';
				this.sendFlag=true
			}else if(this.type=='0'||this.type=='-1') {
				this.addStutus=false;
				this.operation='add';
				this.sendFlag=false
			}
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
		},
		methods: {
			intro(e) {
				uni.navigateTo({
					url:e
				})
			},
			moreChange() {
				if(this.moreStatus==0) {
					this.moreStatus=1;
				}else if(this.moreStatus==1) {
					this.moreStatus=2;
				}else if(this.moreStatus==2) {
					this.moreStatus=1;
				}
			},
			talk(){
				var avatarUrl = this.avatarUrl;
				var targetName = this.targetName;
				var targetId = this.targetId;
				uni.navigateTo({
					url:'../HM-chat/HM-chat?avatarUrl='+avatarUrl+'&uName='+targetName+'&targetId='+targetId+'&fromPin='+'1'
				})
			},
			add() {
				var sourseId = uni.getStorageSync('ID');
				if(sourseId == this.targetId) {
					uni.showToast({
						title:'您不能关注自己哟~',
						icon:'none',
						duration:1000
					})
				}else {
					uni.request({
						url:'https://zmetalhearty.com/yuanpin/UserFocusOperator',
						method:'POST',
						header: {
						    'content-type': 'application/x-www-form-urlencoded'
						},
						data:{
							operation: this.operation,
							Focus: sourseId,
							BFocus: this.targetId
						},
						success: (res) => {
							if(this.operation=='add') {
								this.addStutus=true;
								this.operation='remove';
								uni.showToast({
									title:'关注成功！',
									icon:'none',
									duration:1000
								});
								this.sendFlag=true;
							}else if(this.operation=='remove'){
								this.addStutus=false;
								this.operation='add';
								uni.showToast({
									title:'取消关注成功！',
									icon:'none',
									duration:1000
								});
								this.sendFlag=false;
							}
						}
					})
				}
			}
		}
	}
</script>

<style>
	page {
		background-image: linear-gradient(125deg,#d0f9ff,#eeeeee,#dcffe2);
		background-size: 200%;
		animation: bganimation 10s infinite;
	}
	.body {
		height: 100vh;
		width: 100%;
		margin: 0;
		padding: 0;
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
	.add {
		position: absolute;
		right: -30upx;
		bottom: -24upx;
		width: 100upx;
		height: 100upx;
		border-radius: 50upx;
		background-color: #30c6b0;
		animation: add .5s;
		box-shadow: 20upx 20upx 30upx rgba(79, 106, 107, 0.1),
		-20upx -20upx 30upx rgba(125, 255, 247, .2);
	}
	@keyframes add{
		from{
			background-color: #f5f4f4;
			box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
			-20upx -20upx 30upx rgba(255,255,255, 1);
		}
		to{
			background-color: #30c6b0;
			box-shadow: 20upx 20upx 30upx rgba(79, 106, 107, 0.1),
			-20upx -20upx 30upx rgba(125, 255, 247, .2);
		}
	}
	.add_hover {
		position: absolute;
		right: -30upx;
		bottom: -24upx;
		width: 100upx;
		height: 100upx;
		border-radius: 50upx;
		background-color: #f5f4f4;
		animation: add_hover .5s;
		box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
		-20upx -20upx 30upx rgba(255,255,255, 1);
	}
	@keyframes add_hover{
		from{
			background-color: #30c6b0;
			box-shadow: 20upx 20upx 30upx rgba(79, 106, 107, 0.1),
			-20upx -20upx 30upx rgba(125, 255, 247, .2);
		}
		to{
			background-color: #f5f4f4;
			box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
			-20upx -20upx 30upx rgba(255,255,255, 1);
		}
	}
	.one {
		height: 8upx;
		width: 64upx;
		border-radius: 6upx;
		background-color: #f5f4f4;
		position: absolute;
		left: 19%;
		top: 47%;
		animation: one .5s;
	}
	@keyframes one{
		from{
			background-color: #30c6b0;
		}
		to{
			background-color: #f5f4f4;
		}
	}
	.one_hover {
		height: 8upx;
		width: 64upx;
		border-radius: 6upx;
		background-color: #30c6b0;
		position: absolute;
		left: 19%;
		top: 47%;
		animation: one_hover .5s;
	}
	@keyframes one_hover{
		from{
			background-color: #f5f4f4;
		}
		to{
			background-color: #30c6b0;
		}
	}
	.two {
		height: 8upx;
		width: 64upx;
		border-radius: 6upx;
		transform: rotate(90deg);
		background-color: #f5f4f4;
		position: absolute;
		left: 19%;
		top: 47%;
		animation: two .5s;
	}
	@keyframes two{
		from{
			background-color: #30c6b0;
			transform: rotate(0deg);
		}
		to{
			background-color: #f5f4f4;
			transform: rotate(90deg);
		}
	}
	.two_hover {
		height: 8upx;
		width: 64upx;
		background-color: #30c6b0;
		border-radius: 6upx;
		transform: rotate(0deg);
		position: absolute;
		left: 19%;
		top: 47%;
		animation: two_hover .5s;
	}
	@keyframes two_hover{
		from{
			background-color: #f5f4f4;
			transform: rotate(90deg);
		}
		to{
			background-color: #30c6b0;
			transform: rotate(0deg);
		}
	}
	.blank {
		width: 100%;
		height: 80upx;
		display: block;
	}
	.head {
		height: 280upx;
		width: 600upx;
		background-color: #f5f4f4;
		padding: 40upx 0;
		border-radius: 15upx;
		position: relative;
		margin: 30upx auto;
		color: #8f8f8f;
		box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
		-20upx -20upx 30upx rgba(255,255,255, .1);
	}
	.head_content {
		display: flex;
		flex-direction: row;
		height: 160upx;
	}
	.left {
		display: inline-block;
		width:200upx;
		height: 100%;
		line-height: 200upx;
		text-align: center;
	}
	.left image {
		width: 120upx;
		height: 120upx;
		border-radius: 60upx;
		margin: auto auto;
		line-height: 200upx;
		display: block;
		box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
		-20upx -20upx 30upx rgba(255,255,255, .1);
	}
	.right {
		display: inline-block;
		width:460upx;
		padding-left: 20upx;
		height: 160upx;
		line-height: 60upx;
		color: #8f8f8f;
	}
	.more {
		width: 600upx;
		margin: 0 auto;
	}
	.moreBox {
		width: 600upx;
		line-height: 100upx;
		border-radius: 20upx;
		padding: 0 20upx 0 20upx;
		margin-bottom: 30upx;
		color: #8f8f8f;
		background-color: #f5f4f4;
		position: relative;
		overflow: hidden;
	}
	.moreDefault {
		height: 100upx;
		box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
		-20upx -20upx 30upx rgba(255,255,255, .1);
	}
	.showMore {
		height: 700upx;
		animation: showMore 1s;
		box-shadow: 0 0 0 rgba( 0, 0, 0, 0.2),
		0 0 0 rgba(255,255,255, 1),
		inset 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
		inset -20upx -20upx 20upx rgba(255,255,255,1);
	}
	@keyframes showMore{
		from{
			height: 100upx;
			box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
			-20upx -20upx 30upx rgba(255,255,255, .1);
		}
		to{
			height: 700upx;
			box-shadow: 0 0 0 rgba( 0, 0, 0, 0.2),
			0 0 0 rgba(255,255,255, 1),
			inset 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
			inset -20upx -20upx 20upx rgba(255,255,255,1);
		}
	}
	.moreBack {
		height: 100upx;
		box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
		-20upx -20upx 30upx rgba(255,255,255, .1);
		animation: backMore 1s;
	}
	@keyframes backMore{
		from{
			height: 700upx;
			box-shadow: 0 0 0 rgba( 0, 0, 0, 0.2),
			0 0 0 rgba(255,255,255, 1),
			inset 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
			inset -20upx -20upx 20upx rgba(255,255,255,1);
		}
		to{
			height: 100upx;
			box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
			-20upx -20upx 30upx rgba(255,255,255, .1);
		}
	}
	.moreContent {
		height: 600upx;
		width: 100%;
		position: absolute;
		left: 0;
		top: 100upx;
	}
	.sendMsg {
		width: 600upx;
		height: 100upx;
		line-height: 100upx;
		padding: 0 20upx 0 20upx;
		border-radius: 20upx;
		margin: 30upx auto;
		background-color: #f5f4f4;
		opacity: 1;
		text-align: center;
		box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
		-20upx -20upx 30upx rgba(255,255,255, .1);
		transition: all .5s;
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
	.sendMegHover {
		box-shadow: 0 0 0 rgba( 0, 0, 0, 0.2),
		0 0 0 rgba(255,255,255, 1),
		inset 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
		inset -20upx -20upx 20upx rgba(255,255,255,1)
	}
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
		line-height: 40upx;
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
		height: 600upx;
		line-height: 600upx;
		text-align: center;
		color: #999999;
		font-size: 28upx;
	}
	.sexDefault {
		color: #8f8f8f;
		font-size: 30upx;
	}
	.showSex {
		color: #30C6B0;
		font-size: 36upx;
		animation: showSex 1s;
	}
	@keyframes showSex{
		from{
			color: #8f8f8f;
			font-size: 30upx;
		}
		to{
			color: #30C6B0;
			font-size: 36upx;
		}
	}
	.sexBack {
		color: #8f8f8f;
		font-size: 30upx;
		animation: sexBack 1s;
	}
	@keyframes sexBack{
		from{
			color: #30C6B0;
			font-size: 36upx;
		}
		to{
			color: #8f8f8f;
			font-size: 30upx;
		}
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
	.moreTitle {
		width: 100%;
		height: 100upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
	}
</style>
