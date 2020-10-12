<template>
	<scroll-view class="body">
		<view class="top">
			<!-- 搜索 -->
			<view :class="search">
				<view :class="showStatus==true?'placeholder_hover':'placeholder'">
					{{search_placeholder}}
				</view>
				<input type="text" :value="searchContent" @input="searchCon" @blur="searchBarChange" @focus="searchFocus" class="searchBar"/>
				<view :class="showStatus==true?'searchBtn':'searchBtn_hover'" @click.native.stop="sear">
					搜索
				</view>
			</view>
			<!-- 			瀑布流 -->
			<view class="waterfall-box">
				<view class="wt-box" id="left">
					<view class="wt-item" v-for="(item, index) in leftData" :key="index" @click="goTAbout('/pages/intro/intro?title='+item.title
					+'&img='+item.img
					+'&address='+item.address
					+'&sex='+item.sex
					+'&dowhat='+item.dowhat
					+'&details='+item.details
					+'&type='+item.type
					+'&userid='+item.userid
					+'&time='+item.time
					+'&date='+item.date
					+'&pstart='+item.pstart
					+'&pend='+item.pend
					+'&id='+item.ID
					+'&Comment='+item.Comment
					+'&status='+item.status
					+'&likeCount='+item.likeCount
					)">
						<image :src="'https://zmetalhearty.com'+item.img" mode="widthFix"></image>
						<view class="title">
							<view>{{ item.title }}</view>
							<view class="user">
								<image :src="item.Userimg" mode=""></image>
								<text>{{item.nickname}}</text>
							</view>
							<view class="tag" >
								<view :class="item.type=='food'?'food':(item.type=='travel'?'travel':(item.type=='study'?'study':(item.type=='game'?'game':'none')))">
									<text v-if="item.type=='food'" class="food-text">拼美食</text>
									<text v-if="item.type=='travel'" class="travel-text">拼出行</text>
									<text v-if="item.type=='study'" class="study-text">拼学习</text>
									<text v-if="item.type=='game'" class="game-text">拼娱乐</text>
								</view>
								<view class="pinInfo">
									<image src="../../static/icon/like.png" mode="" id="like"></image>
									<text>{{item.likeCount}}</text>
									<image src="../../static/icon/comment.png" id="comment" mode=""></image>
									<text>{{JSON.parse(item.Comment).length}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="wt-box" id="right">
					<view class="wt-item" v-for="(item, index) in rightData" :key="index" @click="goTAbout('/pages/intro/intro?title='+item.title
					+'&img='+item.img
					+'&address='+item.address
					+'&sex='+item.sex
					+'&dowhat='+item.dowhat
					+'&details='+item.details
					+'&type='+item.type
					+'&userid='+item.userid
					+'&time='+item.time
					+'&date='+item.date
					+'&pstart='+item.pstart
					+'&pend='+item.pend
					+'&id='+item.ID
					+'&Comment='+item.Comment
					+'&status='+item.status
					+'&likeCount='+item.likeCount
					)">
						<image :src="'https://zmetalhearty.com'+item.img" mode="widthFix"></image>
						<view class="title">
							<view>{{ item.title }}</view>
							<view class="user">
								<image :src="item.Userimg" mode=""></image>
								<text>{{item.nickname}}</text>
							</view>
							<view class="tag" >
								<view :class="item.type=='food'?'food':(item.type=='travel'?'travel':(item.type=='study'?'study':(item.type=='game'?'game':'none')))">
									<text v-if="item.type=='food'" class="food-text">拼美食</text>
									<text v-if="item.type=='travel'" class="travel-text">拼出行</text>
									<text v-if="item.type=='study'" class="study-text">拼学习</text>
									<text v-if="item.type=='game'" class="game-text">拼娱乐</text>
								</view>
								<view class="pinInfo">
									<image src="../../static/icon/like.png" mode="" id="like"></image>
									<text>{{item.likeCount}}</text>
									<image src="../../static/icon/comment.png" id="comment" mode=""></image>
									<text>{{JSON.parse(item.Comment).length}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="isOver" v-if="flag">
				---------我是有底线的---------
			</view>
			<view><drag-button :isDock="true" :existTabBar="true" @btnClick="btnClick" @btnTouchstart="btnTouchstart" @btnTouchend="btnTouchend" /></view>
		</view>
	</scroll-view>
</template>

<script>
import mSearch from '../../components/mehaotian-search/mehaotian-search.vue';
import uniTag from '@/components/uni-tag/uni-tag.vue';
import dragButton from '@/components/drag-button/drag-button.vue';
export default {
	data() {
		return {
			list: [],
			leftData: [],
			rightData: [],
			pageCount:'1',
			flag:false,
			goodss:[],
			searchBar:'searchBar',
			searchContent:'',
			showStatus:false,
			search:'search',
			search_placeholder:'请输入搜索内容'
		};
	},
	created() {
		
	},
	onLoad() {
		this.Allget();
		
	},
	methods: {
		sear() {
			var e = this.searchContent;
			if(e=='') {
				uni.showToast({
					title:'请输入用户名进行搜索',
					icon:'none',
					duration:1000
				})
			}
			if(e!='') {
				if(isNaN(Number(e))) {
					uni.request({
						url:'https://zmetalhearty.com/yuanpin/HomeItemsOperator',
						method:'POST',
						header: {
						    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
						},
						data:{
							operation:'searchHomeItem',
							name:e
						},
						success: (res) => {
							if(res.data.search!=[]) {
								var searchArray = JSON.stringify(res.data.search);
								uni.navigateTo({
									url:'/pages/resault/resault?array='+searchArray
								})
							}else if(res.data.search==[]) {
								uni.showToast({
									title:'搜索无结果！',
									icon:'none',
									duration:1000
								})
							}
						}
					})
				}else if (typeof (Number(e)) == 'number') {
					var sourseId = uni.getStorageSync('ID');
					uni.request({
						url:'https://zmetalhearty.com/yuanpin/GetUserInfoInRong',
						method:'POST',
						header: {
						    'content-type': 'application/x-www-form-urlencoded'
						},
						data:{
							Focus:sourseId,
							ID:e
						},
						success: (res) => {
							if(res.data.code==1) {
								uni.navigateTo({
									url:'../info/info?targetName='+res.data.nickname+'&targetId='+res.data.ID+'&avatarUrl='+res.data.img+'&sex='+res.data.sex+'&type='+res.data.status
								})
							}else if(res.data.code==0) {
								uni.showToast({
									title:'搜索无结果！',
									icon:'none',
									duration:1000
								})
							}
						}
					})
				}
			}
			this.searchContent = '';
		},
		searchCon(e) {
			this.searchContent = e.detail.value;
			if(this.searchContent.length!=0) {
				this.search_placeholder=''
			}else {
				this.search_placeholder='请输入搜索内容'
			}
		},
		searchBarChange() {
			this.search = 'search';
			this.showStatus = false;
		},
		searchFocus() {
			this.search = 'search_hover';
			this.showStatus = true;
		},
		goAbout (url) {
		  uni.navigateTo({
		    url
		  })
		},
		updateWaterFullFunc() {
			let leftHeight = 0;
			let rightHeight = 0;
			let item = this.list.shift();
			if (!item) return;
			this.getHeightFunc('left').then(res => {
				leftHeight = res;
				this.getHeightFunc('right').then(res2 => {
					rightHeight = res2;
					if (rightHeight >= leftHeight) {
						this.leftData.push(item);
					} else {
						this.rightData.push(item);
					}
					this.$nextTick(() => {
						this.updateWaterFullFunc();
					});
				});
			});
		},
		getHeightFunc(el) {
			return new Promise((resolve, reject) => {
				let dom = uni.createSelectorQuery().select('#' + el);
				dom.boundingClientRect(res => {
					resolve(res.height);
				}).exec();
			});
		},
		btnClick() {
			uni.navigateTo({
				url: '../../pages/upload/upload'
			});
		},
		goTAbout(url) {
			uni.navigateTo({
				url
			});
		},
		Allget() {
			var that = this;
			uni.request({
				url: 'https://zmetalhearty.com/yuanpin/HomeItemsOperator',
				method: 'POST',
				data: {
					operation: 'getAllbyType',
					pintype:'food',
					pageCount:this.pageCount,
				},
				header: {
					
					'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
				},
				success: res => {
					that.goodss =[...that.goodss,...res.data.food] ;
					that.list =[...that.list,...res.data.food] ;
					this.updateWaterFullFunc();
				},
				fail: res=>{
					
				}
			});
			this.updateWaterFullFunc();
		},
		goTodetail(url){
				 uni.navigateTo({
				     url
				 });
				 fail: upRes => {
					 
				 	}
		},
	},
	onReachBottom() {
		if(this.goodss.length<this.pageCount*10) return this.flag=true
		this.pageCount++
		this.Allget()
	},
	onPullDownRefresh() {
		this.pageCount=1
		this.goodss=[]
		this.leftData=[]
		this.rightData=[]
		this.flag = false;
		setTimeout(() => {
			this.Allget()
			uni.stopPullDownRefresh();
		}, 500);
	},
	
	components: {
		mSearch,
		uniTag,
		dragButton
	}
};
</script>

<style lang="scss">
@import url('../../static/css/index.css');
@import url('../../static/css/first.css');
.waterfall-box {
	overflow: hidden;
	.wt-box {
		width: 345upx;
		border-radius: 15upx;
		transform: translateY(0);
		overflow: hidden;
		background-color: #f1f1f1;
		margin-top: 20upx;
	}

	#left {
		float: left;
		margin-left: 20rpx;
	}

	#right {
		float: right;
		margin-right: 20rpx;
	}

	.wt-item {
		width: 100%;
		display: flex;
		flex-direction: column;
		font-size: 26upx;
		background-color: #FFFFFF;
		-webkit-backface-visibility: hidden;
		-webkit-transform: translate3d(0, 0, 0);
		border-radius: 20upx;
		margin-bottom: 30upx;
		.title {
			font-size: 32upx;
			padding: 10upx 20upx;
			background-color: #fff;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			border-radius: 0 0 30upx 30upx;
			transform: translateY(0);
			line-height: 50upx;
			text-align: center;
			.tag {
				width: 100%;
				height: 40upx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				margin-top: 14upx;
				.food , .travel, .study, .game{
					width: 80upx;
					height: 36upx;
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
				.pinInfo {
					width: 150upx;
					height: 40upx;
					display: flex;
					justify-content: space-evenly;
					align-items: center;
					flex-direction: row;
				}
				.pinInfo #like {
					width: 34upx;
					height: 34upx;
				}
				.pinInfo #comment {
					width: 30upx;
					height: 30upx;
				}
				.pinInfo text {
					font-size: 24upx;
					color: #bdbdbd;
				}
			}
			.user {
				margin-top: 14upx;
				height: 50upx;
				line-height: 50upx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-start;
				image {
					width: 50upx;
					height: 50upx;
					margin: 0 5upx;
					border-radius: 50%;
				}
				text {
					font-size: 26upx;
					line-height: 50upx;
					align-content: center;
					display: block;
					margin-left: 14upx;
				}
			}
		}

		image {
			width: 100%;
			will-change: transform;
			overflow: hidden;
			border-radius: 20upx;
			transform: translateY(0);
			background-color: #FFFFFF;
		}
	}
}
.isOver{
	width: 100%;
	height: 50upx;
	line-height: 50upx;
	text-align: center;
	font-size: 28upx;
}
.nav {
	margin-top: 35upx;
	height: 170upx;
	line-height: 200upx;
	width: 100%;
	ul {
		width: 100%;
		height: 100%;
		line-height: 100%;
		display: flex;

		li {
			margin-left: 2.5%;
			margin-right: 2.5%;
			width: 20%;
			height: 150upx;
			display: flex;
			flex-direction: column;
			box-shadow: 20upx 20upx 30upx rgba(0, 0, 0, 0.1), -20upx -20upx 30upx rgba(255, 255, 255, 0.1);
			border-radius: 20upx;
			transition: all 0.2s;
			image {
				width: 75%;
				height: 75%;
				margin-left: 12.5%;
				margin-right: 12.5%;
				margin-top: 5%;
				margin-bottom: 5%;
			}
			text {
				align-content: center;
				margin: 10upx auto;
			}
		}
		li:hover {
			box-shadow: 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 rgba(255, 255, 255, 1), inset 20upx 20upx 30upx rgba(0, 0, 0, 0.1), inset -20upx -20upx 20upx rgba(255, 255, 255, 1);
		}
	}
}
.search {
		background-color: #fff;
		width: 680upx;
		height: 80upx;
		border-radius: 20upx;
		margin: 30upx auto;
		overflow: hidden;
		display: flex;
		padding: 0;
		justify-content: center;
		flex-direction: row;
		animation: search 1s;
	}
	@keyframes search{
		from{
			box-shadow: 0upx 0upx 0upx rgba( 0, 0, 0, 0.1),
			0upx 0upx 0upx rgba(255,255,255, 1),
			inset 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
			inset -20upx -20upx 20upx rgba(255,255,255,1);
		}
		to{
			box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
			-20upx -20upx 30upx rgba(255,255,255,1);
		}
	}
	.search_hover {
		background-color: #fff;
		width: 680upx;
		height: 80upx;
		border-radius: 20upx;
		margin: 30upx auto;
		overflow: hidden;
		padding: 0;
		display: flex;
		justify-content: center;
		flex-direction: row;
		box-shadow: 0upx 0upx 0upx rgba( 0, 0, 0, 0.1),
		0upx 0upx 0upx rgba(255,255,255, 1),
		inset 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
		inset -20upx -20upx 20upx rgba(255,255,255,1);
		animation: search_after 1s;
	}
	@keyframes search_after{
		from{
			box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
			-20upx -20upx 30upx rgba(255,255,255,1);
		}
		to{
			box-shadow: 0upx 0upx 0upx rgba( 0, 0, 0, 0.1),
			0upx 0upx 0upx rgba(255,255,255, 1),
			inset 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
			inset -20upx -20upx 20upx rgba(255,255,255,1);
		}
	}
	.text {
		width: 100%;
		height: 100vh;
	}
	.content {
		height: 100%;
	}
	.placeholder {
		position: absolute;
		color: #aaaaaa;
		top:20upx;
		left: auto;
		opacity: 1;
		animation: place .5s;
	}
	@keyframes place{
		from{
			opacity: 0;
		}
		to{
			opacity: 1;
		}
	}
	.placeholder_hover {
		position: absolute;
		color: #aaaaaa;
		top:20upx;
		left: auto;
		animation: place_hover .5s;
		opacity: 0;
	}
	@keyframes place_hover{
		from{
			opacity: 1;
		}
		to{
			opacity: 0;
		}
	}
	.searchBar {
		height: 80upx;
		width: 560upx;
		border-radius: 20upx;
		padding: 0 20upx;
		line-height: 80upx;
		position: relative;
	}
	.searchBtn {
		width: 120upx;
		height: 80upx;
		text-align: center;
		color: #30c6b0;
		line-height: 80upx;
		text-align: center;
		display: inline-block;
		font-weight: 400;
		animation-name: fade;
		animation-duration: .5s;
		animation-timing-function: linear;
		transition: all .5s;
		z-index: 1;
	}
	@keyframes fade {
		    0% {
		        color: #fff;
		    }
		
		    100% {
		        color: #30c6b0;
		    }
	}
	.searchBtn_hover {
		width: 120upx;
		height: 80upx;
		text-align: center;
		color: #fff;
		line-height: 80upx;
		text-align: center;
		display: inline-block;
		font-weight: 400;
		animation-name: fade_hover;
		animation-duration: .5s;
		animation-timing-function: linear;
		transition: all .5s;
		z-index: 1;
	}
	@keyframes fade_hover {
		    0% {
		        color: #30c6b0;
		    }
		
		    100% {
		        color: #fff;
		    }
	}
</style>
