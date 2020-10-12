<template>
	<view class="body">
		<view class="title">
			<text>搜索结果</text>
		</view>
		<view class="viewBox" v-for="(view,index) in array" :key="index" @click="intro('../intro/intro?title='+view.title
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
			<view class="view-img">
				<image :src="'https://zmetalhearty.com'+view.img" mode="aspectFill"></image>
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
					<text>200</text>
					<image src="../../static/icon/comment.png" id="comment" mode=""></image>
					<text>200</text>
				</view>
			</view>
		</view>
		<view class="empty" v-if="empty">
			<text>搜索无结果,快去</text><text style="color: #30C6B0;" @click="jump">首页</text><text>看看吧~</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				empty:false,
				array:[]
			}
		},
		methods: {
			jump() {
				uni.reLaunch({
					url:'../index/index'
				})
			},
			intro(e) {
				uni.navigateTo({
					url:e
				})
			}
		},
		onLoad(e) {
			var searchArray = JSON.parse(e.array);
			if(searchArray!=[]) {
				for(var i=0;i<searchArray.length;i++) {
					if(!searchArray[i].address) {
						var add = JSON.parse(searchArray[i].pstart);
						searchArray[i].pstart = add;
						var add1 = JSON.parse(searchArray[i].pend);
						searchArray[i].pend = add1;
					}else {
						var add2 = JSON.parse(searchArray[i].address);
						searchArray[i].address = add2;
					}
				}
				this.array = searchArray;
			}else {
				this.empty=true;
			}
		}
	}
</script>

<style>
@import url("../../static/css/history.css");
</style>
