<template>
	<view class="container">
		<block v-for="article in articles" :key="article.id">
			<!--一个列表开始-->
			<view class="list_container" @click="showDetail(article.id)">
				<image class="list_img" :src="article.cover" mode="aspectFill"></image>
				<view class="list_content">
					<view class="list_title">{{article.title}}</view>
					<view class="list_view">
						<view class="icon_view">
							<image class="icon_img" src="/static/collect.png" mode="aspectFill"></image>
							<view class="icon_text">{{article.collectCount}}</view>
						</view>
						<view class="icon_view">
							<image class="icon_img" src="/static/view.png" mode="aspectFill"></image>
							<view class="icon_text">{{article.viewCount}}</view>
						</view>
					</view>
				</view>
			</view>
			<!--一个列表结束-->
		</block>
		<uni-load-more v-if="isShow" :status="status" />
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	
	export default {
		data() {
			return {
				articles: [],
				page: 1,
				status: 'noMore',
				isShow: false,
				isControl: false, // 是否在操作
				isLoad: false, // 是否加载完毕
				isRefresh: false // 是否刷新
			}
		},
		onReady: function() {
			const _this = this
			_this.listArticles()
		},
		// 下拉刷新
		onPullDownRefresh:function(){
			const _this = this
			if (_this.isControl) { // 防止多次刷新
				return false
			}
			_this.isControl = true
			_this.articles = []
			_this.page = 1
			_this.isLoad = false
			_this.isRefresh = true
			_this.listArticles()
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
			_this.listArticles()
		},
		methods: {
			// 获取教师信息列表
			listArticles() {
				const _this = this
				if (_this.isRefresh){
					uni.showLoading({
						title: "加载中..."
					})
				}
				_this.$api.getArticles({page: _this.page}).then(res => {
					// 关闭加载图标
					_this.isShow = false
					if (res.data.pageSize > res.data.data.length) {
						_this.isLoad = true
						_this.isShow = true
						_this.status = 'noMore'
					}
					_this.articles = _this.articles.concat(res.data.data)
					_this.isControl = false
					if (_this.isRefresh) {
						uni.hideLoading()
						_this.isRefresh = false
					}
				})
			},
			showDetail(id) {
				uni.navigateTo({
					url: '/pages/article/detail/detail?id=' + id
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
		width: 710rpx;
		display: flex;
		flex-direction: column;
		padding: 20rpx;
	}
	.list_container{
		width: 710rpx;
		height: 500rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
	}
	.list_img{
		width: 710rpx;
		height: 280rpx;
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
	}
	.list_content{
		width: 670rpx;
		height: 180rpx;
		padding: 20rpx;
		display: flex;
		flex-direction: column;
	}
	.list_title{
		width: 670rpx;
		height: 130rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;    
		-webkit-line-clamp: 2;    
		overflow: hidden;
		font-size: 30rpx;
		color: #333333;
		line-height: 60rpx;
	}
	.list_view{
		width: 670rpx;
		height: 50rpx;
		display: flex;
		justify-content: flex-end;
	}
	.icon_view{
		height: 50rpx;
		display: flex;
		margin-left: 20rpx;
	}
	.icon_img{
		width: 30rpx;
		height: 30rpx;
		margin-top: 10rpx;
		margin-right: 10rpx;
	}
	.icon_text{
		height: 50rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 26rpx;
		color: #333333;
	}
</style>
