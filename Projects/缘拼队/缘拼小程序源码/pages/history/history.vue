<template>
	<view class="body">
		<view class="title">
			<text v-if="type=='collection'">我的收藏</text>
			<text v-if="type=='history'">历史浏览</text>
		</view>
		<view class="viewBox" v-for="(view,index) in detailArray" :key="index" @click="intro('../intro/intro?title='+view.title
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
					<text>{{view.likeCount}}</text>
					<image src="../../static/icon/comment.png" id="comment" mode=""></image>
					<text>{{JSON.parse(view.Comment).length}}</text>
				</view>
			</view>
		</view>
		<view class="empty" v-if="viewEmpty">
			<text>您还没有浏览过缘拼呢qwq,快去</text><text style="color: #30C6B0;" @click="jump">首页</text><text>看看吧~</text>
		</view>
		<view class="empty" v-if="collectEmpty">
			<text>您还没有收藏过缘拼呢qwq,快去</text><text style="color: #30C6B0;" @click="jump">首页</text><text>看看吧~</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemArray:[],
				detailArray:[],
				type:'',
				viewEmpty:false,
				collectEmpty:false
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
			this.type = e.type;
			var that = this;
			var sourseId = uni.getStorageSync('ID');
			if(this.type=='collection') {
				uni.request({
					url:'https://zmetalhearty.com/yuanpin/CollectionsOperator',
					method:'POST',
					header: {
					    'content-type': 'application/x-www-form-urlencoded'
					},
					data:{
						operation:'getCollectionsByUserID',
						UserID:sourseId
					},
					success: (res) => {
						var array = res.data.data;
						var length = array.length;
						if(length!=0) {
							for(var i=0;i<length;i++) {
								if(array[i].type=='travel') {
									var add = JSON.parse(array[i].pstart);
									array[i].pstart = add;
									var add1 = JSON.parse(array[i].pend);
									array[i].pend = add1;
								}else {
									var add2 = JSON.parse(array[i].address);
									array[i].address = add2;
								}
							}
							that.detailArray = array;
						}else {
							that.collectEmpty = true;
						}
					}
				})
			}else if(this.type=='history') {
				var list = uni.getStorageSync("viewList");
				var view = JSON.stringify(list);
				if(list.length==0) {
					this.viewEmpty = true;
				}
				var that = this;
				uni.request({
					url: 'https://zmetalhearty.com/yuanpin/HomeItemsOperator',
					method: 'POST',
					header: {
					    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
					},
					data: {
						operation:'getbyItemIDArray',
						ItemIDArray:view
					},
					success: res => {
						var array = res.data.array;
						var length = array.length;
						if(length!=0) {
							for(var i=0;i<length;i++) {
								if(array[i].type=='travel') {
									var add = JSON.parse(array[i].pstart);
									array[i].pstart = add;
									var add1 = JSON.parse(array[i].pend);
									array[i].pend = add1;
								}else {
									var add2 = JSON.parse(array[i].address);
									array[i].address = add2;
								}
							}
							that.detailArray = array;
						}else {
							that.viewEmpty = true;
						}
					}
				});
			}
		}
	}
</script>

<style>
@import url("../../static/css/history.css");
</style>
