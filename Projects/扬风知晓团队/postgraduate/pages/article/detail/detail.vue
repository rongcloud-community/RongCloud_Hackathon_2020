<template>
	<view class="container" v-if="article !== null">
		<view class="title_conainer">{{article.title}}</view>
		<view class="total_container">
			<view class="total_view">收藏数：{{article.collectCount}}</view>
			<view class="total_view">浏览数：{{article.viewCount}}</view>
		</view>
		<view class="time_view">发布时间：{{article.createTime}}</view>
		<view class="content_container">
			<view class="tip_conainer">
				<view class="tip_text">详情</view>
			</view>
			<view class="content_view" v-html="article.content"></view>
		</view>
		<view class="bottom_container">
			<view class="icon_container right_line" v-if="!article.collectStatus" @click="changeCollect(1, article.id)">
				<image class="icon_img" src="/static/collect.png" mode="aspectFill"></image>
				<view class="icon_text">收藏文章</view>
			</view>
			<view class="icon_container right_line" v-else @click="changeCollect(2, article.id)">
				<image class="icon_img" src="/static/collect_hl.png" mode="aspectFill"></image>
				<view class="icon_text">取消收藏</view>
			</view>
			<view class="icon_container" @click="previewIt(article.attachUrl)">
				<image class="icon_img" src="/static/download.png" mode="aspectFill"></image>
				<view class="icon_text" :class="article.attachUrl === undefined ? 'disable_d' : ''">下载资料</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article: null,
				id: '0'
			}
		},
		onLoad(e) {
			console.log(e.id)
			this.id = e.id
		},
		onReady:function(){
			const _this = this
			_this.getArticle()
		},
		methods: {
			// 文章单条数据
			getArticle() {
				const _this = this
				uni.showLoading({
					title: "加载中..."
				})
				const userInfo = uni.getStorageSync('userInfo')
				let userId = '0'
				if (userInfo !== '' && userInfo !== null || userInfo !== undefined) {
					userId = userInfo.id
				}
				_this.$api.getArticle({"id": _this.id, "customerId": userId}).then(res => {
					_this.article = res.data
					uni.hideLoading()
				})
			},
			// 收藏文章操作
			changeCollect(operation, articleId) {
				const _this = this
				uni.showLoading({
					title: "操作中..."
				})
				const userInfo = uni.getStorageSync("userInfo")
				if (userInfo === '' || userInfo === null || userInfo === undefined) { 
					uni.navigateTo({
						url: 'pages/login/login'
					})
				}
				const params = {'operation': operation, 'customerId': userInfo.id, 'articleId': articleId}
				_this.$api.giveCollect(params).then(res => {
					if (res.code === 200 && operation === 1) {
						_this.article.collectStatus = true
						_this.article.collectCount = _this.article.collectCount +1
					} else {
						_this.article.collectStatus = false
						_this.article.collectCount = _this.article.collectCount -1
					}
					uni.hideLoading()
				})
				
			},
			// 查看资料
			previewIt(url) {
				if (url === undefined) {
					uni.showToast({
						title: '该文章没有资料'
					})
					return false
				} else {
					uni.navigateTo({
						url: '/pages/article/view/view?url=' + url
					})
				}
			}
		}
	}
</script>

<style>
	.container{
		width: 710rpx;
		padding: 20rpx;
	}
	.title_conainer{
		width: 710rpx;
		font-size: 34rpx;
		color: #333333;
	}
	.total_container{
		width: 710rpx;
		height: 60rpx;
		display: flex;
	}
	.total_view,.time_view{
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 26rpx;
		color: #888888;
		margin-right: 10rpx;
	}
	
	.content_container{
		width: 710rpx;
		display: flex;
		flex-direction: column;
	}
	
	.tip_conainer{
		border-bottom: 1rpx solid #e6e6e6;
		padding-bottom: 10rpx;
		padding-top: 30rpx;
	}
	
	.tip_text{
		font-size: 32rpx;
		height: 50rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: #15A596;
		border-left: 10rpx solid #15A596;
		padding-left: 10rpx;
	}
	.content_view{
		padding-top: 30rpx;
		width: 710rpx;
		font-size: 30rpx;
		color: #333333;
	}
	.bottom_container{
		width: 750rpx;
		height: 120rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
	}
	.icon_container{
		width: 374rpx;
		height: 120rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #eef8f4;
	}
	.right_line{
		border-right: 2rpx solid #FFFFFF;
	}
	.icon_img{
		width: 40rpx;
		height: 40rpx;
	}
	.icon_text{
		height: 60rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		font-size: 26rpx;
		color: #15A596;
	}
	.disable_d{
		color: #b8bab9;
	}
</style>
