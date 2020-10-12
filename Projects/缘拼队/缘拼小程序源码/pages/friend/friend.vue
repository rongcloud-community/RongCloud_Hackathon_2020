<template>
	<view>
		<view :class="search">
			<view :class="showStatus==true?'placeholder_hover':'placeholder'">
				{{search_placeholder}}
			</view>
			<input type="text" :value="searchContent" @input="searchCon" @blur="searchBarChange" @focus="searchFocus" class="searchBar"/>
			<view :class="showStatus==true?'searchBtn':'searchBtn_hover'" @click.native.stop="sear">
				搜索
			</view>
		</view>
		<view :class="currentIndex==0?'focus':'focusHide'" @click="changeToFocus">
			关 注
		</view>
		<view :class="currentIndex==1?'fan':'fanHide'" @click="changeToFan">
			粉 丝
		</view>
		<view :class="currentIndex==2?'friend':'friendHide'" @click="changeToFriend">
			好 友
		</view>
		<view class="slider"></view>
		<view class="swiperBox">
			<view class="letterList" v-show="pageIndex==0">
			    <view v-for="(ltr2,idx2) in focus" :key="idx2" :class="jumperIndex==ltr2.letter?'letterActive':'letterDefault'" @click="jump(ltr2.letter,idx2)" style="font-size: 20upx; width: 40upx;text-align: center;height: 32upx;">
					<text>{{ltr2.letter}}</text>
				</view>
			</view>
			<view class="letterList" v-show="pageIndex==1">
			    <view v-for="(ltr3,idx3) in fans" :key="idx3" :class="jumperIndex==ltr3.letter?'letterActive':'letterDefault'" @click="jump(ltr3.letter,idx3)" style="font-size: 20upx; width: 40upx;text-align: center;height: 32upx;">
					<text>{{ltr3.letter}}</text>
				</view>
			</view>
			<view class="letterList" v-show="pageIndex==2">
			    <view v-for="(ltr1,idx1) in friends" :key="idx1" :class="jumperIndex==ltr1.letter?'letterActive':'letterDefault'" @click="jump(ltr1.letter,idx1)" style="font-size: 20upx; width: 40upx;text-align: center;height: 32upx;">
					<text>{{ltr1.letter}}</text>
				</view>
			</view>
			<swiper :current="pageIndex" class="swiper" @change="swiperChange" touchable="true">
			<swiper-item style="height: 100%;">
				<!--关注页-->
				<scroll-view scroll-y="true" class="focusPage" enable-back-to-top="true" :scroll-into-view="focusId" scroll-with-animation>
					<view class="letterBox" v-for="(letter, loc) in focus" :key="loc" :id="letter.letter == '#' ? 'indexed-list2-YZ' :'indexed-list2-' + letter.letter">
						<view class="letter">
							<text style="font-size: 24upx;">{{letter.letter}}</text>
						</view>
						<view class="Info" v-for="(focus, index) in focus[loc].data" :key="index" hover-class="Info_hover" @click="infoPage(focus.ID)">
							<view class="left">
								<image :src="focus.img" style="width: 85upx;height: 85upx;border-radius: 10upx;"></image>
							</view>
							<view class="mid">
								<text>{{focus.nickname}}</text>
							</view>
							<view class="right">
								
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item style="height: 100%;">
				<!--粉丝页-->
				<scroll-view scroll-y="true" class="fansPage" enable-back-to-top="true" :scroll-into-view="fansId" scroll-with-animation>
					<view class="letterBox" v-for="(letter, loc) in fans" :key="loc"  :id="letter.letter == '#' ? 'indexed-list3-YZ' :'indexed-list3-' + letter.letter">
						<view class="letter">
							<text style="font-size: 24upx;">{{letter.letter}}</text>
						</view>
						<view class="Info" v-for="(fans, index) in fans[loc].data" :key="index" hover-class="Info_hover" @click="infoPage(fans.ID)">
							<view class="left">
								<image :src="fans.img" style="width: 85upx;height: 85upx;border-radius: 10upx;"></image>
							</view>
							<view class="mid">
								<text>{{fans.nickname}}</text>
							</view>
							<view class="right">
								
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item style="height: 100%;">
				<!--好友页-->
				<scroll-view scroll-y="true" enable-back-to-top="true" :scroll-into-view="friendsId" scroll-with-animation class="friendPage">
					<view class="letterBox" v-for="(letter, loc) in friends" :key="loc" :id="letter.letter == '#' ? 'indexed-list1-YZ' :'indexed-list1-' + letter.letter">
						<view class="letter">
							<text style="font-size: 24upx;">{{letter.letter}}</text>
						</view>
						<view class="Info" v-for="(friends, index) in friends[loc].data" :key="index" hover-class="Info_hover" @click="infoPage(friends.ID)">
							<view class="left">
								<image :src="friends.img" style="width: 85upx;height: 85upx;border-radius: 10upx;"></image>
							</view>
							<view class="mid">
								<text>{{friends.nickname}}</text>
							</view>
							<view class="right">
								
							</view>
						</view>
					</view>	
				</scroll-view>
			</swiper-item>
		</swiper>
		</view>
	</view>
</template>

<script>
	import mSearch from '../../components/mehaotian-search/mehaotian-search.vue';
	export default {
		data() {
			return {
				pageIndex:0,
				currentIndex:0,
				val0: '',
				val1: '',
				val2: '',
				val3: '',
				placeholder:'动态占位内容',
				friendsId:'',
				fansId:'',
				focusId:'',
				jumperIndex:'',
				friends:[],
				focus:[],
				fans:[],
				searchBar:'searchBar',
				searchContent:'',
				showStatus:false,
				search:'search',
				search_placeholder:'请输入搜索内容'
			}
		},
		onLoad() {
			
		},
		onShow() {
			var sourseId = uni.getStorageSync('ID');
			uni.request({
				url:'https://zmetalhearty.com/yuanpin/UserFocusOperator',
				method:'POST',
				header: {
				    'content-type': 'application/x-www-form-urlencoded'
				},
				data:{
					operation: 'getAllFocus',
					BFocus: sourseId
				},
				success: (res) => {
					this.fans = res.data.Focus
				}
			});
			uni.request({
				url:'https://zmetalhearty.com/yuanpin/UserFocusOperator',
				method:'POST',
				header: {
				    'content-type': 'application/x-www-form-urlencoded'
				},
				data:{
					operation: 'getAllBFocus',
					Focus: sourseId,
					BFocus: this.targetId
				},
				success: (res) => {
					this.focus = res.data.BFocus
				}
			});
			uni.request({
				url:'https://zmetalhearty.com/yuanpin/UserFocusOperator',
				method:'POST',
				header: {
				    'content-type': 'application/x-www-form-urlencoded'
				},
				data:{
					operation: 'getAllfriends',
					Focus: sourseId,
					BFocus: this.targetId
				},
				success: (res) => {
					this.friends = res.data.friends
				}
			})
		},
		methods: {
			swiperChange: function(e) {
				this.currentIndex=e.detail.current;
			},
			sear() {
				var e = this.searchContent;
				if(e=='') {
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
					// uni.showToast({
					// 	title:'请输入用户名进行搜索',
					// 	icon:'none',
					// 	duration:1000
					// })
					}
				}
				if(e!='') {
					if(isNaN(Number(e))) {
						uni.showToast({
							title:'请输入用户名进行搜索',
							icon:'none',
							duration:1000
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
			changeToFan() {
				this.pageIndex = 1;
				this.jumperIndex = 0;
			},
			changeToFriend() {
				this.pageIndex = 2;
				this.jumperIndex = 0;
			},
			changeToFocus() {
				this.pageIndex = 0;
				this.jumperIndex = 0;
			},
			infoPage(e) {
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
						}
					}
				})
			},
			jump(ltr,idx) {
				this.jumperIndex=ltr;
				uni.showToast({
					image:'../../static/letter/'+ltr+'.png',
					duration:500
				})
				if(this.pageIndex==0) {
					let len1 = this.friends[idx].data.length;
					if(ltr == '#'){
								this.friendsId = 'indexed-list1-YZ';
								return
							}
					if(len1>0){
						this.friendsId = 'indexed-list1-' + ltr;
					}
				}else if(this.pageIndex==1) {
					let len2 = this.focus[idx].data.length;
					if(ltr == '#'){
								this.focusId = 'indexed-list2-YZ';
								return
							}
					if(len2>0){
						this.focusId = 'indexed-list2-' + ltr;
					}
				}else if(this.pageIndex==2) {
					let len3 = this.fans[idx].data.length;
					if(ltr == '#'){
								this.fansId = 'indexed-list3-YZ';
								return
							}
					if(len3>0){
						this.fansId = 'indexed-list3-' + ltr;
					}
				}	
			}
		},
		components: {
			mSearch
		},
	}
</script>

<style>
page {
	background-color: #efeeee;
}
.slider {
	width: 25%;
	height: 8upx;
	border-radius: 4upx;
	position: absolute;
	top:204upx;
	left: 2%;
	transition: all ease .4s;
	background-color: #30C6B0;
	z-index: 1;
}
.friend ~ .slider{
	left:70%;
}
.fan ~ .slider {
	left:37%
}
.focus ~ .slider {
	left: 4%;
}
.friend {
	width: 29%;
	height:80upx;
	margin: 0 2% 0 2%;
	background-color: #efeeee;
	display: inline-block;
	text-align:center;
	transition: all .3s;
	line-height: 60upx;
}
.focus {
	width: 29%;
	height:80upx;
	margin: 0 2% 0 2%;
	background-color: #efeeee;
	display: inline-block;
	text-align:center;
	transition: all .3s;
	line-height: 60upx;
}
.fan {
	width: 29%;
	height:80upx;
	margin: 0 2% 0 2%;
	background-color: #efeeee;
	display: inline-block;
	text-align:center;
	transition: all .3s;
	line-height: 60upx;
}
.focusHide {
	width: 29%;
	hight:80upx;
	margin: 0 2% 0 2%;
	background-color: #efeeee;
	display: inline-block;
	text-align:center;
	color: #555555;
	line-height: 60upx;
}
.friendHide {
	width: 29%;
	hight:80upx;
	margin: 0 2% 0 2%;
	background-color: #efeeee;
	display: inline-block;
	text-align:center;
	color: #555555;
	line-height: 60upx;
}
.fanHide {
	width: 29%;
	hight:80upx;
	margin: 0 2% 0 2%;
	background-color: #efeeee;
	display: inline-block;
	text-align:center;
	color: #555555;
	line-height: 60upx;
}
.swiperBox {
	height: 79vh;
	width: 750upx;
	background-color: #efeeee;
	position: absolute;
}
.swiper {
	height: 79vh;
	width: 750upx;
	background-color: #efeeee;
}
.newFriend {
	width: 100%;
	height: 120upx;
	display: flex;
	justify-content: center;
	flex-direction: row;
	background-color: #fff;
	margin-top: 30upx;
}
.friendPage {
	height: 79vh;
	width: 750upx;
	background-color: #efeeee;
}
.fansPage {
	height: 79vh;
	width: 750upx;
	background-color: #efeeee;
}
.focusPage {
	height: 79vh;
	width: 750upx;
	background-color: #efeeee;
}
.letter {
	width: 730upx;
	height: 50upx;
	padding: 0 0 0 20upx;
}
.Info {
	width: 680upx;
	height: 120upx;
	display: flex;
	border-radius: 20upx;
	margin: 0upx auto 30upx auto;
	flex-direction: row;
	justify-content: center;
	background-color: #efeeee;
	box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
	-20upx -20upx 30upx rgba(255,255,255,1);
	transition: all .2s ease-out;
}
.Info_hover {
	width: 660upx;
	box-shadow: 0upx 0upx 0upx rgba( 0, 0, 0, 0.1),
	0upx 0upx 0upx rgba(255,255,255, 1),
	inset 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
	inset -20upx -20upx 20upx rgba(255,255,255,1);
	transition: all .2s ease-out;
}
.left {
	display: inline-block;
	width: 90upx;
	height: 85upx;
	margin: auto 20upx;
}
.addLeft {
	display: inline-block;
	width: 70upx;
	height: 65upx;
	padding: 10upx 10upx 10upx 10upx;
	margin: 20upx;
	border-radius: 15upx;
}
.mid {
	width: 410upx;
	height: 78upx;
	padding: 20upx 0 20upx 20upx;
	line-height: 78upx;
	font-size: 35upx;
	display: inline-block;
	color: #555;
}
.right {
	display: inline-block;
	width: 170upx;
	height: 78upx;
	padding: 20upx 0 20upx 0;
	line-height: 78upx;
}
.addRight {
	display: inline-block;
	width: 580upx;
	height: 78upx;
	padding: 20upx 0 20upx 20upx;
	line-height: 78upx;
	font-size: 35upx;
}
.letterList {
	position: fixed;
	top: 215upx;
	left:700upx;
	width: 40upx;
	height: 864upx;
	background-color: rgba(204, 204, 204, .5);
	color: #999;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	border-radius: 15upx;
	z-index: 1;
}
.letterActive {
	border-radius: 10upx;
	background-color: #999;
	line-height: 32upx;
	color: #fff;
}
.letterDefault {
	border-radius: 10upx;
	line-height: 32upx;
}
.subBtn {
	width: 120upx;
	height: 60upx;
	margin-top: 9upx;
	margin-bottom: 9upx;
	display: inline-block;
	font-size: 22upx;
	line-height: 60upx;
	padding: 0;
}
.search {
	background-color: #fff;
	width: 680upx;
	height: 80upx;
	border-radius: 20upx;
	margin: 30upx auto;
	overflow: hidden;
	display: flex;
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
		
	}
}
.search_hover {
	background-color: #fff;
	width: 680upx;
	height: 80upx;
	border-radius: 20upx;
	margin: 30upx auto;
	overflow: hidden;
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
	top:50upx;
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
	top:50upx;
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
