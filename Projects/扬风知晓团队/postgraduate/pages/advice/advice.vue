<template>
	<view>
		<block v-for="teacher in teachers" :key="teacher.id">
			<!--列表展示开始-->
			<view class="list_container" @click="showDetail(teacher.id)">
				<image class="list_left" :src="teacher.avatar" mode="aspectFill"></image>
				<view class="list_right">
					<view class="right_top">
						<view class="top_name">{{teacher.name}}</view>
						<view class="top_type">{{teacher.typeIdDesc}}</view>
					</view>
					<view class="right_mid">擅长领域：{{teacher.area}}</view>
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
				teachers: [],
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
			_this.listTeachers()
		},
		// 下拉刷新
		onPullDownRefresh:function(){
			const _this = this
			if (_this.isControl) { // 防止多次刷新
				return false
			}
			_this.isControl = true
			_this.teachers = []
			_this.page = 1
			_this.isLoad = false
			_this.isRefresh = true
			_this.listTeachers()
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
			// 获取教师信息列表
			listTeachers() {
				const _this = this
				if (_this.isRefresh){
					uni.showLoading({
						title: "加载中..."
					})
				}
				_this.$api.getTeachers({page: _this.page}).then(res => {
					// 关闭加载图标
					_this.isShow = false
					if (res.data.pageSize > res.data.data.length) {
						_this.isLoad = true
						_this.isShow = true
						_this.status = 'noMore'
					}
					_this.teachers = _this.teachers.concat(res.data.data)
					_this.isControl = false
					if (_this.isRefresh) {
						uni.hideLoading()
						_this.isRefresh = false
					}
				})
			},
			// 查看详情
			showDetail(id) {
				uni.navigateTo({
					url: '/pages/advice/detail/detail?id=' + id
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #F4F4F4;
	}
	.list_container{
		width: 710rpx;
		height: 160rpx;
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
	}
	
	.list_left{
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		margin-top: 20rpx;
	}
	
	.list_right{
		width: 570rpx;
		height: 160rpx;
		display: flex;
		flex-direction: column;
	}
	.right_top{
		width: 570rpx;
		height: 60rpx;
		display: flex;
	}
	.top_name,.top_type{
		height: 60rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 32rpx;
		color: #333333;
	}
	.top_name{
		font-weight: bold;
	}
	.top_type{
		font-size: 28rpx;
		color: #808080;
		padding-left: 20rpx;
	}
	
	.right_mid{
		width: 570rpx;
		height: 100rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;    
		-webkit-line-clamp: 2;    
		overflow: hidden;
		font-size: 28rpx;
		color: #808080;
		line-height: 50rpx;
	}

</style>
