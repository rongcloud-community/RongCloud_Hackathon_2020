<template>
	<view class="body">
		<view class="title">
			<text>我的缘拼</text>
		</view>
		<view class="tab">
			<view :class="currentIndex==0?'up':'upHide'" @click="changeToUp">
				<text>我发起的</text>
			</view>
			<view :class="currentIndex==1?'with':'withHide'" @click="changeToWith">
				<text>我参与的</text>
			</view>
			<view class="slider"></view>
		</view>
		<swiper :current="pageIndex" class="swiper" @change="swiperChange" touchable="true">
			<swiper-item>
				<scroll-view scroll-y="true" class="upload" enable-back-to-top="true">
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
					<view class="empty" v-if="sendEmpty">
						<text>您还没有发起过缘拼呢qwq,快去</text><text style="color: #30C6B0;">发布</text><text>看看吧~</text>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="part" enable-back-to-top="true">
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
					<view class="empty" v-if="partEmpty">
						<text>您还没有参与过缘拼呢qwq,快去</text><text style="color: #30C6B0;" @click="jump">首页</text><text>看看吧~</text>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemArray:["38","39","40","41"],
				sendArray:[],
				detailArray:[],
				sendUserList:[],
				type:'',
				pageIndex:0,
				currentIndex:0,
				sendEmpty:false,
				partEmpty:false
			}
		},
		methods: {
			swiperChange: function(e) {
				this.currentIndex=e.detail.current;
			},
			changeToUp() {
				this.pageIndex = 0;
			},
			changeToWith() {
				this.pageIndex = 1;
			},
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
			var id = uni.getStorageSync('ID');
			this.type = e.type;
			var that = this;
			uni.request({
				url: 'https://zmetalhearty.com/yuanpin/HomeItemsOperator',
				method: 'POST',
				header: {
				    'content-type': 'application/x-www-form-urlencoded'
				},
				data: {
					operation:'getAllbyUserID',
					UserID:id
				},
				success: res => {
					for(var key in res.data) {
						var array = res.data[key];
					}
					var length = array.length;
					if(length!=0) {
						for(var i=0;i<length;i++) {
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
						}
					}else {
						that.sendEmpty = true;
					}
					that.sendArray = array;
				}
			});
			uni.request({
				url: 'https://zmetalhearty.com/yuanpin/HomeItemsOperator',
				method: 'POST',
				header: {
				    'content-type': 'application/x-www-form-urlencoded'
				},
				data: {
					operation:'getHomeItemSuccess',
					UserID:id
				},
				success: res => {
					var array = res.data.Partake;
					if(JSON.stringify(array)!='[]') {
						var length = array.length;
						for(var i=0;i<length;i++) {
							if(JSON.stringify(array[i])==='{}') {
								array.splice(i,1);
							}
						}
						var newLength = array.length;
						for(var j=0;j<newLength;j++) {
							if(array[j].type=='travel') {
								var add = JSON.parse(array[j].pstart);
								array[j].pstart = add;
								var add1 = JSON.parse(array[j].pend);
								array[j].pend = add1;
							}else {
								var add2 = JSON.parse(array[j].address);
								array[j].address = add2;
							}
						}
 					}else {
						that.partEmpty = true;
					}
					if(array.length==0) {
						that.partEmpty = true;
					}
					that.detailArray = array;
				}
			});
		}
	}
</script>

<style>
@import url("../../static/css/history.css");
</style>
