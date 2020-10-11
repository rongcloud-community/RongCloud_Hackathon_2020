<template>
	<view class="container">
		<block v-for="master in masters" :key="master.id">
			<!--列表展示开始-->
			<view class="list_container">
				<view class="top_container">
					<image class="avatar_img" :src="master.avatar" mode="aspectFill"></image>
					<view class="name_text">{{master.name}}</view>
				</view>
				<view class="area_view">主要业务：{{master.area}}</view>
				<view class="bottom_container">
					<view class="btn_text" @click="giveCall(master.phone)">打电话</view>
					<view class="btn_text" @click="giveChat(master.userId, master.name, master.avatar)">聊一聊</view>
				</view>
			</view>
			<!--列表展示结束-->
		</block>
		<uni-load-more v-if="isShow" :status="status" />
	</view>
</template>

<script>
	
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	
	export default {
		data() {
			return {
				masters: [],
				page: 1,
				status: 'noMore',
				isShow: false,
				isControl: false, // 是否在操作
				isLoad: false, // 是否加载完毕
				isRefresh: false // 是否刷新
			}
		},
		onLoad: function() {
			const _this = this
			_this.listMasters()
		},
		// 下拉刷新
		onPullDownRefresh:function(){
			const _this = this
			if (_this.isControl) { // 防止多次刷新
				return false
			}
			_this.isControl = true
			_this.masters = []
			_this.page = 1
			_this.isLoad = false
			_this.isRefresh = true
			_this.listMasters()
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
			_this.listTeachers()
		},
		methods: {
			// 获取师傅信息列表
			listMasters() {
				const _this = this
				if (_this.isRefresh){
					uni.showLoading({
						title: "加载中..."
					})
				}
				_this.$api.getMasters({page: _this.page}).then(res => {
					// 关闭加载图标
					_this.isShow = false
					if (res.data.pageSize > res.data.data.length) {
						_this.isLoad = true
						_this.isShow = true
						_this.status = 'noMore'
					}
					_this.masters = _this.masters.concat(res.data.data)
					_this.isControl = false
					if (_this.isRefresh) {
						uni.hideLoading()
						_this.isRefresh = false
					}
				})
			},
			// 打电话
			giveCall(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				})
			},
			// 聊一聊
			giveChat(id, name, avatar) {
				const userInfo = uni.getStorageSync("userInfo")
				if (userInfo === '' || userInfo === null || userInfo === undefined) { 
					uni.navigateTo({
						url: 'pages/login/login'
					})
					return false
				}
				uni.navigateTo({
					url: '/pages/chat/chat?senderUserId=' + userInfo.id + '&targetId=' + id + '&name=' + name + '&avatar=' + avatar
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #f4f4f4;
	}
	.container{
		width: 710rpx;
		padding: 20rpx;
		display: flex;
		flex-direction: column;
	}
	.list_container{
		width: 710rpx;
		height: 400rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		margin-bottom: 20rpx;
		border-radius: 10rpx;
	}
	.top_container{
		width: 670rpx;
		height: 120rpx;
		padding: 0 20rpx;
		display: flex;
		border-bottom: 1rpx solid #e6e6e6;
	}
	.avatar_img{
		width: 80rpx;
		height: 80rpx;
		margin-top: 20rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}
	.name_text{
		height: 120rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 32rpx;
		color: #333333;
		font-weight: bold;
	}
	.area_view{
		width: 670rpx;
		height: 150rpx;
		padding: 20rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;    
		-webkit-line-clamp: 3;    
		overflow: hidden;
		font-size: 26rpx;
		color: #888888;
		line-height: 50rpx;
	}
	.bottom_container{
		width: 670rpx;
		height: 100rpx;
		padding: 0 20rpx;
		display: flex;
		justify-content: flex-end;
	}
	.btn_text{
		height: 60rpx;
		width: 120rpx;
		margin-top: 10rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		margin-left: 20rpx;
		background-color: #007AFF;
		font-size: 28rpx;
		color: #FFFFFF;
		border-radius: 10rpx;
	}
	.add_img{
		width: 120rpx;
		height: 120rpx;
		position: fixed;
		right: 30rpx;
		bottom: 200rpx;
		border-radius: 50%;
	}
</style>
