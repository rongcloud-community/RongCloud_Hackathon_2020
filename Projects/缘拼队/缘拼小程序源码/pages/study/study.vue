<template>
	<view class="top">
		<view class="imgt">
			<view class="imgTitle">
				<text style="color: #fff;">拼学习</text><image src="../../static/icon/study.png" mode="" style="margin-left: 30upx; width: 60upx; height: 60upx;"></image>
			</view>
		</view>
		<view class="nav">
			<view :class="nameStatus?'nameChange':'name'">
				<text>标题:</text>
				<input type="text" value="" @focus="changeName" @blur="changeName" @input="onKeyInput" maxlength="15" placeholder="(不超过15个字)" placeholder-style="color:#888"/>
			</view>

			<view class="address">
				<text>地址:</text>
				<view @click="goTo">
					<text v-if="goToWh.length == 0" style="margin-left: 0upx;color:#888;">请点击选择地点</text>
					<text style="margin-left: 0upx;">{{ goToWh }}</text>
				</view>
			</view>
			<view class="data">
				<text>日期:</text>
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="uni-input">{{ date }}</view>
				</picker>
			</view>
			<view class="time">
				<text>时间:</text>
				<picker mode="time" :value="time" start="09:01" end="21:01" @change="bindTimeChange">
					<view class="uni-input">{{ time }}</view>
				</picker>
			</view>
		</view>
		<view class="contents">
			<view class="contents-sex">
				<text>性别要求:</text>
				<radio-group name="radio" @change="changSex">
					<label>
						<radio value="不限" />
						<text>不限</text>
					</label>
					<label>
						<radio value="男" />
						<text>男</text>
					</label>
					<label>
						<radio value="女" />
						<text>女</text>
					</label>
				</radio-group>
			</view>
			<view :class="contentSubStatus?'contents-subChange':'contents-sub'">
				<text>学什么呢:</text>
				<input type="text" value="" @input="doWhat" @focus="contentSubChange" @blur="contentSubChange" maxlength="20" placeholder="(例:四六级/考研/约图书馆)" />
			</view>
		</view>
		<view class="det-tit">详细介绍：</view>

		<view class="uni-textarea">
			<textarea placeholder-style="color:#d5d5d5" placeholder="(不超过140个字)" maxlength="-1" cursor-spacing="120rpx" @input="textDel"/>
			<view class="chooseImage">
				<view class="addImage" @click="goFind" v-if="!isShow">
					<view class="row"></view>
					<view class="column"></view>
				</view>
				<view class="showImage">
					<image :src="paths1" @click="goFind" v-if="isShow"></image>
				</view>
			</view>
			<view :class="isOver?'warning':'normal'">
				<text>{{count}}/140</text>
			</view>
		</view>
		<view class="=fabu"><button type="default" size="default" class="fabu-bu" @click="faBuByUser">发布</button></view>
		<view>
			<uni-popup ref="popup" type="center" style="z-index: 999">
				<view class="pop">
					<view class="pop-title">
						<text>提示</text>
					</view>
					<view class="pop-top">
						<text style="color: #555;">填写错误，请检查后重新提交哦~</text> 
					</view>
					<view class="pop-bottom" @click="popHide" hover-class="bottom-hover">
						<text>确定</text>
					</view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	components: { uniPopup },
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			date: currentDate,
			paths: '../../static/icon/微信图片_20200507205948.jpg',
			time: '12:00',
			goToWh: '',
			goToWhS: '',
			inputValue: '',
			sex: '',
			doWhatn: '',
			textDela: '',
			goToWA: '',
			paths1: '',
			isOver: false,
			count: 0,
			isShow:false,
			nameStatus:false,
			contentSubStatus:false
		};
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	methods: {
		changeName() {
			if(this.nameStatus==true) {
				this.nameStatus = false;
			}else {
				this.nameStatus = true;
			}
		},
		contentSubChange() {
			if(this.contentSubStatus==true) {
				this.contentSubStatus = false;
			}else {
				this.contentSubStatus = true;
			}
		},
		popHide() {
			this.$refs.popup.close();
		},
		textDel: function(e) {
			this.textDela = e.target.value;
			this.count = this.textDela.length;
			if(this.count>140) {
				this.isOver = true;
			}else {
				this.isOver = false;
			}
		},
		doWhat: function(e) {
			this.doWhatn = e.target.value;
		},
		changSex: function(e) {
			this.sex = e.detail.value;
		},
		onKeyInput: function(event) {
			this.inputValue = event.target.value;
		},
		goFind() {
			var that = this;
			wx.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['album', 'camera'],
				success(res) {
					const tempFilePaths = res.tempFilePaths;
					that.paths1 = tempFilePaths;
					that.paths = that.paths1;
					that.isShow = true;
				}
			});
		},
		bindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为', e.target.value);
			this.index = e.target.value;
		},
		bindDateChange: function(e) {
			this.date = e.target.value;
		},
		bindTimeChange: function(e) {
			this.time = e.target.value;
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},
		bindTextAreaBlur: function(e) {
		},
		goTo() {
			var that = this;
			wx.chooseLocation({
				success(res) {
					const name = res.name;
					const address = res.address;
					const latitude = res.latitude;
					const longitude = res.longitude;
					that.goToWh = res.name;
					that.goToWhS = res;
					that.goToWA = JSON.stringify(res);
				}
			});
		},
		faBuByUser() {
			var id = uni.getStorageSync('ID');
			if (this.inputValue != '' && this.sex != '' && this.doWhatn != '' && this.textDela != '' && this.goToWh != '' && this.paths1.length != 0 && !this.isOver) {
				console.log('ready to upload');
 				uni.uploadFile({
					url: 'https://zmetalhearty.com/yuanpin/HomeItemsUpload',
					filePath: this.paths[0],
					name: 'file',
					formData: {
						userid: id,
						pintype: 'study',
						title: this.inputValue,
						address: this.goToWA,
						sex: this.sex,
						date: this.date,
						time: this.time,
						dowhat: this.doWhatn,
						details: this.textDela
					},
					success: uploadFileRes => {
						this.goAbout('/pages/index/index');
					},
					fail: (res) => {
						
					}
				});
			}else if(this.inputValue != '' && this.sex != '' && this.doWhatn != '' && this.textDela != '' && this.goToWh != '' && !this.isOver && this.paths1.length == 0) {
				uni.request({
					url: 'https://zmetalhearty.com/yuanpin/HomeItemsUpload',
					method: 'POST',
					header: {
					    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
					},
					data: {
						userid: id,
						pintype: 'study',
						title: this.inputValue,
						address: this.goToWA,
						sex: this.sex,
						date: this.date,
						time: this.time,
						dowhat: this.doWhatn,
						details: this.textDela,
						uploadSign:'1'
					},
					success: res => {
						this.goAbout('/pages/index/index');
					}
				});
			}else {
				this.open();
			}
		},

		goAbout(url) {
			uni.showToast({
				title: '发布成功',
				duration: 2000,
				icon: 'success'
			});
			setTimeout(function() {

				uni.reLaunch({
					url
				});
			}, 2000);
		},
		open() {
			this.$refs.popup.open();
		}
	}
};
</script>

<style lang="scss">
	@mixin keyframes($animationName) {
	    @-webkit-keyframes #{$animationName} {
	        @content;
	    }
	    @-moz-keyframes #{$animationName} {
	        @content;
	    }
	    @-o-keyframes #{$animationName} {
	        @content;
	    }
	    @keyframes #{$animationName} {
	        @content;
	    }
	}
.top {
	background-color: #f5f5f5;
	width: 100%;
	height: 1700upx;
	.imgt {
		width: 100%;
		height: 300upx;
		border-radius: 0 0 40upx 40upx;
		background-color: #ca5b53;
		line-height: 120upx;
		position: relative;
		.imgTitle {
			color: #FFFFFF;
			font-size: 70upx;
			margin-left: 30upx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}
	}
	.nav {
		margin-top: 30upx;
		width: 95%;
		height: 480upx;
		position: absolute;
		top: 120upx;
		left: auto;
		line-height: 360upx;
		margin-left: 2.5%;
		background-color: #ffffff;
		border-radius: 25upx;
		view {
			width: 100%;
			height: 120upx;
			line-height: 120upx;
		}
		.name ,.nameChange{
			display: flex;
			position: relative;
			text {
				text-align: center;
				width: 12%;
				margin-left: 30upx;
				margin-right: 20upx;
				font-size: 32upx;
			}
			input {
				font-size: 32upx;
				width: 88%;
				height: 100%;
			}
		}
		.nameChange::after {
			position: absolute;
			width: 90%;
			border-radius: 2upx;
			background-color: #ca5b53;
			height: 4upx;
			content: '';
			bottom: 0;
			left: 5%;
			animation: underline .5s ease-out;
		}
		@include keyframes(underline) {
		    0% { 
		        width: 0;
		    }
		    100% { 
		        width: 90%;
		    }
		}
		.address ,.data ,.time{
			display: flex;
			border-top: 1upx solid #eee;
			text {
				width: 12%;
				margin-left: 30upx;
				margin-right: 20upx;
				font-size: 32upx;
			}
			view {
				font-size: 32upx;
				width: 88%;
				height: 100%;
			}
		}
		box-shadow: 20upx 20upx 30upx rgba(0, 0, 0, 0.1), -20upx -20upx 30upx rgba(255, 255, 255, 0.1);
		border-radius: 20upx;
		transition: all 0.2s;
	}
	.contents {
		width: 95%;
		height: 240upx;
		line-height: 240upx;
		background-color: #fff;
		margin-left: 2.5%;
		border-radius: 25upx;
		margin-top: 370upx;
		.contents-sex {
			border-bottom: 1upx solid #eee;
			width: 100%;
			height: 120upx;
			line-height: 120upx;
			display: flex;
			text {
				text-align: center;
				width: 22%;
				margin-left: 30upx;
				margin-right: 20upx;
				font-size: 32upx;
			}
			radio-group {
				width: 78%;
				text {
					margin-left: 10upx;
					margin-right: 24upx;
				}
			}
		}
		.contents-sub ,.contents-subChange{
			width: 100%;
			height: 120upx;
			line-height: 120upx;
			position: relative;
			display: flex;
			text {
				text-align: center;
				width: 22%;
				margin-left: 30upx;
				margin-right: 20upx;
				font-size: 32upx;
			}
			input {
				font-size: 32upx;
				width: 78%;
				height: 100%;
			}
		}
		.contents-subChange::after {
			position: absolute;
			width: 90%;
			border-radius: 2upx;
			background-color: #ca5b53;
			height: 4upx;
			content: '';
			bottom: 2upx;
			left: 5%;
			animation: underline .5s ease-out;
		}
		@include keyframes(underline) {
		    0% { 
		        width: 0;
		    }
		    100% { 
		        width: 90%;
		    }
		}
		box-shadow: 20upx 20upx 30upx rgba(0, 0, 0, 0.1), -20upx -20upx 30upx rgba(255, 255, 255, 0.1);
		border-radius: 20upx;
		transition: all 0.2s;
	}
	.det-tit {
		width: 95%;
		height: 50upx;
		line-height: 50upx;
		margin-left: 2.5%;
		font-size: 40upx;
		color: #ca5b53;
		margin-top: 50upx;
	}
	.uni-textarea {
		width: 95%;
		padding: 2.5%;
		margin-left: 2.5%;
		margin-top: 10upx;
		margin-left: 2.5%;
		background-color: #ffffff;
		border-radius: 25upx;
		height: 500upx;
		font-size: 28upx;
		textarea {
			width: 100%;
			height: 270upx;
			line-height: 40upx;
			letter-spacing: 2upx;
		}
		box-shadow: 20upx 20upx 30upx rgba(0, 0, 0, 0.1), -20upx -20upx 30upx rgba(255, 255, 255, 0.1);
		border-radius: 20upx;
		transition: all 0.2s;
		.normal {
			width: 100%;
			height: 40upx;
			text-align: right;
			color: #888;
			font-size: 26upx;
		}
		.warning {
			width: 100%;
			height: 40upx;
			text-align: right;
			color: #d32c2c;
			font-size: 26upx;
		}
		.chooseImage {
			width: 100%;
			height: 160upx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.addImage {
				width: 140upx;
				height: 140upx;
				border-radius: 14upx;
				background-color: #EEEEEE;
				position: relative;
				.row {
					width: 70upx;
					height: 6upx;
					border-radius: 3upx;
					position: absolute;
					background-color: #FFFFFF;
					top: 50%;
					left:25%;
				}
				.column {
					width: 70upx;
					height: 6upx;
					border-radius: 3upx;
					position: absolute;
					background-color: #FFFFFF;
					top: 50%;
					left: 25%;
					transform: rotate(90deg);
				}
			}
			.showImage {
				width: 140upx;
				height: 140upx;
				border-radius: 14upx;
				image {
					width: 140upx;
					height: 140upx;
					border-radius: 14upx;
				}
			}
		}
	}
	.fabu {
		width: 100%;
		height: 110upx;
		background-color: #ffffff;
		padding: 15upx;
		background-color: #eeeeee;
		z-index: 10;
		margin-top: 40upx;
		.fabu-bu {
			width: 60%;
			height: 80upx;
			border-radius: 30upx;
			margin: 0 auto;
			background-color: #ffffff;
			color: #ca5b53;
			box-shadow: 20upx 20upx 30upx rgba(0, 0, 0, 0.1), -20upx -20upx 30upx rgba(255, 255, 255, 0.1);
			border-radius: 20upx;
			transition: all 0.2s;
			z-index: 10;
		}
	}
}
.pop {
	width: 500upx;
	height: 380upx;
	border-radius: 30upx;
	background-color: #FFFFFF;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.pop-title {
		width: 100%;
		height:90upx;
		text-align: center;
		font-size: 36upx;
		line-height: 80upx;
		letter-spacing: 6upx;
		color: #555;
		font-weight: bold;
	}
	.pop-top {
		height: 150upx;
		padding: 20upx 10upx;
		width: 100%;
		text-align: center;
		line-height: 60upx;
		font-size: 32upx;
		letter-spacing: 4upx;
	}
	.pop-bottom {
		width: 470upx;
		height: 100upx;
		margin-top: 10upx;
		border-radius: 16upx 16upx 30upx 30upx;
		background-color: #ca5b53;
		color: #FFFFFF;
		font-size: 34upx;
		letter-spacing: 6upx;
		line-height: 100upx;
		font-weight: bold;
		text-align: center;
		transition: all .5s;
	}
	.bottom-hover {
		background-color: #ca5b53;
		transition: all .5s;
	}
}
</style>
