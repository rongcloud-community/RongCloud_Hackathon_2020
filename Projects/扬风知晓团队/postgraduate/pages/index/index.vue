<template>
	<view class="content">
		<!--轮播图开始-->
		<view class="swiper_container">
			<swiper indicator-dots circular autoplay>
				<block v-for="banner in banners" :key="banner.id">
					<swiper-item @click="showArticle(banner.articleId)">
						<image class="swiper_img" :src="banner.url" mode="aspectFill"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<!--轮播图结束-->
		<view class="title_container">
			<view class="title_text">最新招生信息</view>
		</view>
		<!--内容展示开始-->
		<view class="content_container">
			<block v-for="advice in advices" :key="advice.id">
				<!--列表展示开始-->
				<view class="list_container" @click="showDetail(advice.id)">
					<image class="list_bg" :src="advice.cover" mode="aspectFill"></image>
					<view class="list_content" v-text="advice.title"></view>
					<view class="list_other">
						<view class="top_other">
							<view class="other_left">招生学校：{{advice.school}}</view>
							<view class="other_right">发布时间：{{$api.formatTime(advice.pushTime)}}</view>
						</view>
						<view class="mid_other">
							<view class="other_left">招生学院：{{advice.college}}</view>
							<view class="other_right">截止时间：{{$api.formatTime(advice.endTime)}}</view>
						</view>
					</view>
				</view>
				<!--列表展示结束-->
			</block>
		</view>
		<uni-load-more v-if="isShow" :status="status" />
		<!--内容展示结束-->
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				content: '',
				messages: this.$store.state.messages,
				banners: [],
				advices: [],
				page: 1,
				status: 'noMore',
				isShow: false,
				isControl: false, // 是否在操作
				isLoad: false, // 是否加载完毕
				isRefresh: false // 是否刷新
			}
		},
		onLoad() {
			const _this = this
			_this.listBanners()
			_this.listAdvices()
		},
		onReady: function() {
			
		},
		// 下拉刷新
		onPullDownRefresh:function(){
			const _this = this
			if (_this.isControl) { // 防止多次刷新
				return false
			}
			_this.isControl = true
			_this.advices = []
			_this.page = 1
			_this.isLoad = false
			_this.isRefresh = true
			_this.listBanners()
			_this.listAdvices()
			uni.stopPullDownRefresh()
		},
		// 上拉加载
		onReachBottom:function(){
			const _this = this
			if (_this.isControl) { // 多次刷新阻止不加载更多
				return false
			}
			_this.isControl = true
			if (_this.isLoad) { // 表示已经加载完毕
				_this.isControl = false
				return false
			}
			_this.isShow = true
			_this.status = 'loading'
			_this.page += 1
			_this.listAdvices()
		},
		methods: {
			// 跳转banner详情
			showArticle(id) {
				uni.navigateTo({
					url: '/pages/article/detail/detail?id=' + id
				})
			},
			// 展示详情
			showDetail(id) {
				uni.navigateTo({
					url: '/pages/index/detail/detail?id=' + id
				})
			},
			// 获取轮播图信息
			listBanners() {
				const _this = this
				_this.$api.getAllBanners().then(res => {
					_this.banners = res.data
				})
			},
			// 获取招生信息列表
			listAdvices() {
				const _this = this
				if (_this.isRefresh){
					uni.showLoading({
						title: "加载中..."
					})
				}
				_this.$api.getAdvices({page: _this.page}).then(res => {
					console.log('aaa', res.data)
					// 关闭加载图标
					_this.isShow = false
					if (res.data.pageSize > res.data.data.length) {
						_this.isLoad = true
						_this.isShow = true
						_this.status = 'noMore'
					}
					_this.advices = _this.advices.concat(res.data.data)
					_this.isControl = false
					if (_this.isRefresh) {
						uni.hideLoading()
						_this.isRefresh = false
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
	.swiper_container{
		width: 750rpx;
		height: 300rpx;
	}
	.swiper_img,swiper{
		width: 100%;
		height: 100%;
	}
	
	.title_container{
		width: 710rpx;
		height: 80rpx;
		padding: 20rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
	}
	.title_text{
		height: 60rpx;
		padding-left: 20rpx;
		margin-top: 10rpx;
		font-size: 32rpx;
		color: #15a596;
		display: flex;
		flex-direction: column;
		justify-content: center;
		border-left: 10rpx solid #15A596;
	}
	
	/*列表展示*/
	.content_container{
		width: 710rpx;
		padding: 20rpx;
		display: flex;
		flex-direction: column;
	}
	.list_container{
		width: 670rpx;
		height: 300rpx;
		padding: 20rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		position: relative;
		background: #000;
		z-index: 1;
		margin-bottom: 20rpx;
	}
	.list_bg{
		width: 710rpx;
		height: 340rpx;
		position: absolute;
		left: 0;
		top: 0;
		border-radius: 10rpx;
		opacity: 0.8;
		filter:alpha(opacity=80);
	}
	.list_content{
		width: 670rpx;
		height: 130rpx;
		padding: 20rpx;
		display: -webkit-box;    
		-webkit-box-orient: vertical;    
		-webkit-line-clamp: 3;    
		overflow: hidden;
		position: absolute;
		left: 0;
		top: 0;
		color: #FFFFFF;
		font-size: 32rpx;
		line-height: 50rpx;
		z-index: 2;
	}
	.list_other{
		width: 670rpx;
		height: 130rpx;
		padding: 20rpx;
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 2;
		display: flex;
		flex-direction: column;
	}
	.top_other,.mid_other{
		width: 670rpx;
		height: 60rpx;
		display: flex;
		justify-content: space-between;
	}
	.other_left,.other_right{
		width: 330rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 26rpx;
		color: #FFFFFF;
		overflow: hidden;    
		text-overflow:ellipsis;    
		white-space: nowrap;
	}
	.other_right{
		text-align: right;
	}
</style>
