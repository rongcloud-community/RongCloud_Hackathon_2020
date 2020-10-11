<template>
	<view v-if="advice !== null">
		<image class="title_img" :src="advice.cover" mode="aspectFill"></image>
		<view class="title_container">
			<view class="title_text">{{advice.title}}</view>
		</view>
		<!--详情展示开始-->
		<view class="tab_container">
			<view class="tab_text" :class="tabIndex==0 ? 'selectd_tab' : ''" @click="changeTab(0)">招生详情</view>
			<view class="tab_text" :class="tabIndex==1 ? 'selectd_tab' : ''" @click="changeTab(1)">学校介绍</view>
		</view>
		<swiper :current="tabIndex" @change="giveChange" :style="{'height': swiperHeight+'px'}">
			<swiper-item>
				<view class="swiper_zhao">
					<view class="tip_view">
						<view class="tip_text">招生学校：{{advice.school}}</view>
						<view class="tip_text">招生学院：{{advice.college}}</view>
						<view class="tip_text">发布时间：{{$api.formatTime(advice.pushTime)}}</view>
						<view class="tip_text">截止时间：{{$api.formatTime(advice.endTime)}}</view>
					</view>
					<view class="content_view">
						<view class="content_title_view">
							<view class="content_title">详情</view>
						</view>
						<view class="content_zhao" v-html="advice.content"></view>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper_xiao" v-html="advice.schoolDetail"></view>
			</swiper-item>
		</swiper>
		<!--详情展示结束-->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex: 0,
				swiperHeight: 0,
				advice: null,
				id: '0'
			}
		},
		onLoad(e) {
			this.id = e.id
		},
		onReady:function(){
			const _this = this
			_this.getAdvice()
		},
		methods: {
			// 招生信息单条数据
			getAdvice() {
				const _this = this
				uni.showLoading({
					title: "加载中..."
				})
				_this.$api.getAdvice({"id": _this.id}).then(res => {
					_this.advice = res.data
					_this.changeSwiperHeight(_this.tabIndex)
					uni.hideLoading()
				})
			},
			// 切换tab
			changeTab(tabIndex) {
				this.tabIndex = tabIndex
				this.changeSwiperHeight(tabIndex)
			},
			giveChange(e) {
				this.tabIndex = e.detail.current
				this.changeSwiperHeight(e.detail.current)
			},
			// 根据tabBar改变swiper的高度
			changeSwiperHeight(tabIndex) {
				const className = tabIndex==0? '.swiper_zhao' : '.swiper_xiao'
				setTimeout(()=>{
					let query = uni.createSelectorQuery().in(this);
					query.select(className).boundingClientRect();
					query.exec((res) => {
						if (!res) {//如果没获取到，再调一次
							this.changeSwiperHeight(tabIndex);
						}else {
							this.swiperHeight = res[0].height;
						}
					})
				},20)
			}
		}
	}
</script>

<style>
	page{
		background-color: #F4F4F4;
	}
	.title_img{
		width: 750rpx;
		height: 300rpx;
	}
	.title_container{
		width: 710rpx;
		display: flex;
		flex-direction: column;
		padding: 20rpx;
		background-color: #FFFFFF;
	}
	
	.title_text{
		width: 710rpx;
		font-size: 36rpx;
		color: #333333;
	}
	
	/*详情展示*/

	.tab_container{
		width: 710rpx;
		height: 80rpx;
		padding: 0 20rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
		margin-top: 20rpx;
	}
	.tab_text{
		width: 300rpx;
		font-size: 30rpx;
		color: #333333;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		border-bottom: 4rpx solid #FFFFFF;
	}
	.selectd_tab{
		color: #DD524D;
		border-bottom: 4rpx solid #DD524D;
	}
	swiper{
		width: 710rpx;
		height: auto;
		margin: 20rpx;
		border-radius: 10rpx;
		background-color: #FFFFFF;
	}
	.swiper_zhao{
		width: 710rpx;
		display: flex;
		flex-direction: column;
	}
	.tip_view,.content_view{
		width: 670rpx;
		display: flex;
		padding: 20rpx;
		flex-direction: column;
	}
	.tip_text{
		height: 60rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 30rpx;
		color: #333333;
	}
	.content_title_view{
		padding-bottom: 10rpx;
		border-bottom: 1rpx solid #e6e6e6;
	}
	.content_title{
		height: 60rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 10rpx;
		border-left: 10rpx solid #15A596;
		font-size: 30rpx;
		color: #333333;
	}
	.content_zhao{
		width: 670rpx;
		font-size: 30rpx;
		color: #333333;
		padding: 30rpx 0;
	}
	.swiper_xiao{
		width: 670rpx;
		padding: 20rpx;
		font-size: 30rpx;
		color: #333333;
	}
</style>
