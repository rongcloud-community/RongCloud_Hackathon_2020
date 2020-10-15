<template>
	<view>
		<view class="nav">
			<ul>
				<li  @click="goAbout('/pages/study/study')">
					<image src="../../static/icon/icon_r8uv6vpx9r/学习.png" mode=""></image>
					<text>拼学习</text>
				</li>
				<li @click="goAbout('/pages/navigation/navigation')">
					<image src="../../static/icon/icon_r8uv6vpx9r/飞机.png" mode=""></image>
					<text>拼出行</text>
				</li>
				<li   @click="goAbout('/pages/food/food')">
					<image src="../../static/icon/icon_r8uv6vpx9r/meishi.png" mode=""></image>
					<text>拼美食</text>
				</li>
				<li  @click="goAbout('/pages/play/play')">
					<image src="../../static/icon/icon_r8uv6vpx9r/娱乐.png" mode=""></image>
					<text>拼娱乐</text>
				</li>
			</ul>
		</view>
		<view class="tex">
			<text>请选择您想发起缘拼的类型</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			//页面跳转
			goAbout (url) {
			  uni.navigateTo({
			    url
			  })
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #EFEEEE;
	}
	.nav{
		margin-top: 180upx;
		height: 750upx;
		line-height: 200upx;
		width: 100%;
		ul{
			width: 700upx;
			height: 100%;
			line-height: 100%;
			margin-left: 25upx;
			margin-right: 25upx;
			li{
				margin: 50upx;
				width: 250upx;
				height: 250upx;
				display: flex;
				flex-direction:column;
				background-color: #EFEEEE;
				transition: all .5s;
				box-shadow: 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
				  -20upx -20upx 30upx rgba(255,255,255, .1);	
				  border-radius: 20upx;
				  transition: all 0.2s;
				  float: left;
				image{
					width: 65%;
					height: 65%;
					margin-left: 17.5%;
					margin-right: 17.5%;
					margin-top: 5%;
					margin-bottom: 5%;
				}
				text{
					align-content: center;
					margin: 10upx auto;
					font-size: 32upx;
					font-weight: bold;
					color: #555;
				}
			}
			li:hover {
			  box-shadow: 0upx 0upx 0upx rgba( 0, 0, 0, 0.1),
			  0upx 0upx 0upx rgba(255,255,255, 1),
			  inset 20upx 20upx 30upx rgba( 0, 0, 0, 0.1),
			  inset -20upx -20upx 20upx rgba(255,255,255,1);
			  transition: all .5s;
			}
	}
	}
	.tex{
		text-align: center;
		text{
			font-size: 36upx;
		}
		}
</style>
