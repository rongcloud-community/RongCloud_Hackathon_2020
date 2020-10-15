<template>
	<view class="top" style="background-color: #EEEEEE; height: 1700upx;">
		<view class="imgt">
			<view class="imgTitle">
				<text>拼出行</text><image src="../../static/icon/travel.png" mode="" style="margin-left: 30upx; width: 60upx; height: 60upx;"></image>
			</view>
			<view class="topnav">
				<view :class="nameStatus?'titChange':'tit'">
					<text>标题：</text>
					<input type="text" value="" @focus="changeName" @blur="changeName" @input="onKeyInput" maxlength="15" placeholder="(不超过15个字)" />
				</view>
				<view class="tim">
					<text>日期:</text>
					<view>
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view>{{ date }}</view>
						</picker>
					</view>
				</view>
				<view class="time">
					<text>时间:</text>
					<view>
						<picker mode="time" :value="time" start="09:01" end="21:01" @change="bindTimeChange">
							<view class="uni-input">{{ time }}</view>
						</picker>
					</view>
				</view>
			</view>
		</view>
		<view class="contents">
			<view class="contents-sex">
				<view class="sex-text">
					<text>性别要求:</text>
				</view>
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
			<view class="way">
				<view class="way-text">
					<text>出行方式:</text>
				</view>
				<radio-group name="radio" @change="changway">
					<label>
						<radio value="校车" />
						<text>校车</text>
					</label>
					<label>
						<radio value="公交车" />
						<text>公交车</text>
					</label>
					<label>
						<radio value="其他" />
						<text>其他</text>
					</label>
				</radio-group>
			</view>
		</view>
		<view class="nav-title"><text>从这里出发:</text></view>
		<view class="nav">
			<view class="goFrom">
				<image src="../../static/image/-departure.png" mode=""></image>
				<view>
					<!-- <text @click="go">{{ goToWhB }}</text> -->
					<!-- paths.name -->
					<text v-if="goToWhB.length == 0 && address != '点击获取当前位置'" @click="go">{{ address }}</text>
					<text v-if="goToWhB.length == 0 && address == '点击获取当前位置'" @click="getL()">点击获取当前位置</text>
				</view>
			</view>
			<view class="goTo">
				<image src="../../static/image/降落、到达.png" mode=""></image>
				<view @click="goToW">
					<text>{{ goToWh }}</text>
					<text v-if="goToWh.length == 0">选择要前往的地点</text>
				</view>
			</view>
		</view>
		<view class="det-tit">详细介绍：</view>
		<view class="uni-textarea">
			<textarea placeholder-style="color:#d5d5d5" placeholder="描述一下出行的具体计划吧~" maxlength="-1" @input="textDel" cursor-spacing="120rpx" />
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
const chooseLocation = requirePlugin('chooseLocation');
export default {
	components: { uniPopup },
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			id: 0, // 使用 marker点击事件 需要填写id
			title: 'map',
			Mlatitude: 0,
			Mlongitude: 0,
			paths: '',
			address: '点击获取当前位置',
			// gowhere: '',
			goToWh: '',
			paths1: '',
			date: currentDate,
			time: '12:00',
			goToWhB: '',
			inputValue: '',
			// goToWA:'',
			sex: '',
			way: '',
			textDela: '',
			goToWAB: '',
			goToWAC: '',
			isOver: false,
			count: 0,
			isShow:false,
			nameStatus:false
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
		changway: function(e) {
			this.way = e.detail.value;
		},
		changSex: function(e) {
			this.sex = e.detail.value;
		},
		onKeyInput: function(event) {
			this.inputValue = event.target.value;
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
		goFind() {
			var that = this;
			wx.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['album', 'camera'],
				success(res) {
					const tempFilePaths = res.tempFilePaths;
					that.paths1 = tempFilePaths;
					that.isShow = true;
				}
			});
		},
		getL() {
			var that = this;
			wx.getLocation({
				type: 'wgs84',
				success(res) {
					const latitude = res.latitude;
					const longitude = res.longitude;
					const speed = res.speed;
					const accuracy = res.accuracy;
					that.Mlatitude = latitude;
					that.Mlongitude = longitude;
				}
			});
			uni.request({
				url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + that.Mlatitude + ',' + that.Mlongitude + '&key=5SKBZ-TBSW3-QTW33-YJLYA-LKI2Z-IPFMF&get_poi=1',

				success: res => {
					this.text = 'request success';
					that.address = res.data.result.formatted_addresses.recommend;
					var obj = {
						name:res.data.result.pois[0].title,
						address:that.address,
						latitude:that.Mlatitude,
						longitude:that.Mlongitude
					}
					that.goToWAC = JSON.stringify(obj);
				}
			});
		},
		go() {
			var that = this;
			wx.chooseLocation({
				success(res) {
					that.address = res.name;
					var obj = {
						name:res.name,
						address:res.address,
						latitude:res.latitude,
						longitude:res.longitude
					}
					that.goToWAC = JSON.stringify(obj);
				}
			});
		},
		goToW() {
			var that = this;
			wx.chooseLocation({
				success(res) {
					that.goToWh = res.name;
					var obj = {
						name:res.name,
						address:res.address,
						latitude:res.latitude,
						longitude:res.longitude
					}
					that.goToWAB = JSON.stringify(obj);
				}
			});
		},
		faBuByUser() {
			var that = this;
			if (this.address != '点击获取当前位置') {
				if (that.inputValue!='' && that.sex!='' && that.way!='' && that.textDela!='' && that.goToWAC!=''  && that.goToWAB!='' && !that.isOver && that.paths1.length != 0) {
					var id = uni.getStorageSync('ID');
					uni.uploadFile({
						url: 'https://zmetalhearty.com/yuanpin/HomeItemsUpload',
						filePath: this.paths1[0],
						name: 'file',
						formData: {
							userid: id,
							pintype: 'travel',
							title: this.inputValue,
							address: this.address,
							sex: this.sex,
							date: this.date,
							time: this.time,
							dowhat: this.way,
							details: this.textDela,
							pstart: this.goToWAC,
							pend: this.goToWAB
						},
						success: uploadFileRes => {
							that.goAbout('/pages/index/index');
						},
						fail: upRes => {
							that.open();
						}
					});
				}else if (that.inputValue!='' && that.sex!='' && that.way!='' && that.textDela!='' && that.goToWAC!=''  && that.goToWAB!='' && !that.isOver && that.paths1.length == 0) {
				var id = uni.getStorageSync('ID');
				uni.request({
					url: 'https://zmetalhearty.com/yuanpin/HomeItemsUpload',
					method: 'POST',
					header: {
					    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
					},
					data: {
						userid: id,
						pintype: 'travel',
						title: this.inputValue,
						address: this.address,
						sex: this.sex,
						date: this.date,
						time: this.time,
						dowhat: this.way,
						details: this.textDela,
						pstart: this.goToWAC,
						pend: this.goToWAB,
						uploadSign:'1'
					},
					success: res => {
						that.goAbout('/pages/index/index');
					}
				});
			}else {
				that.open();
			}
			} else {
				that.open();
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
	},
	onLoad() {
		var that = this;
		wx.getLocation({
			type: 'wgs84',
			success(res) {
				const latitude = res.latitude;
				const longitude = res.longitude;
				const speed = res.speed;
				const accuracy = res.accuracy;
				that.Mlatitude = latitude;
				that.Mlongitude = longitude;
			}
		});
	},
	onShow() {
		var that = this;
		const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
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
.imgt {
	width: 100%;
	height: 300upx;
	border-radius: 0 0 40upx 40upx;
	background-color: #76d672;
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
.nowAddress {
	width: 100%;
	height: 70upx;
	display: flex;
	background-color: #a9bb8b;
	.text {
		width: 100%;
		height: 70upx;
		line-height: 70upx;
		font-size: 28upx;
		margin-left: 2%;
	}
}
.nav-title {
		height: 80upx;
		width: 100%;
		line-height: 80upx;
		padding-left: 20upx;
		color: #76d672;
		font-size: 42upx;
		margin-top: 30upx;
	}
.nav {
	width: 95%;
	height: 210upx;
	line-height: 260upx;
	margin-left: 2.5%;
	background-color: #ffffff;
	border-radius: 25upx;
	padding: 15upx;
	.goFrom {
		height: 95upx;
		line-height: 95upx;
		border-bottom: 1upx solid #eeeeee;
		padding-left: 30upx;
		display: flex;
		image {
			margin-top: 22.5upx;
			height: 50upx;
			width: 50upx;
			margin-right: 30upx;
		}
		view {
			height: 95upx;
			line-height: 95upx;
			width: 600upx;
		}
	}
	.goTo {
		height: 85upx;
		line-height: 85upx;
		padding-left: 30upx;
		display: flex;
		image {
			margin-top: 22.5upx;
			height: 50upx;
			width: 50upx;
			margin-right: 30upx;
		}
		view {
			height: 95upx;
			line-height: 95upx;
			width: 600upx;
		}
	}
	box-shadow: 20upx 20upx 30upx rgba(0, 0, 0, 0.1), -20upx -20upx 30upx rgba(255, 255, 255, 0.1);
	border-radius: 20upx;
	transition: all 0.2s;
}
.topnav {
	height: 380upx;
	width: 95%;
	position: absolute;
	top: 120upx;
	left: auto;
	line-height: 260upx;
	margin-left: 2.5%;
	background-color: #fff;
	border-radius: 25upx;
	margin-top: 30upx;
	padding: 10upx;
	.tit,.titChange {
		display: flex;
		border-bottom: 1upx solid #eeeeee;
		height: 120upx;
		line-height: 120upx;
		width: 100%;
		position: relative;
		font-size: 32upx;
		text {
			margin-left: 30upx;
			width: 15%;
			margin-right: 15upx;
		}
		input {
			font-size: 32upx;
			width: 85%;
			height: 100%;
		}
	}
	.titChange::after {
		position: absolute;
		width: 90%;
		border-radius: 2upx;
		background-color: #76d672;
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
	.tim {
		display: flex;
		height: 120upx;
		line-height: 120upx;
		width: 100%;
		text {
			margin-left: 30upx;
			width: 15%;
			margin-right: 15upx;
		}
		view {
			font-size: 32upx;
			width: 85%;
			height: 100%;
			picker {
				width: 100%;
				height: 100%;
			}
		}
	}
	.time {
		border-top: 1upx solid #eeeeee;
		display: flex;
		height: 120upx;
		line-height: 120upx;
		width: 100%;
		text {
			margin-left: 30upx;
			width: 15%;
			margin-right: 15upx;
		}
		view {
			font-size: 32upx;
			width: 85%;
			height: 100%;
			picker {
				width: 100%;
				height: 100%;
			}
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
	margin-top: 270upx;
	.contents-sex {
		border-bottom: 1upx solid #eee;
		width: 100%;
		height: 120upx;
		line-height: 120upx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		.sex-text {
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
	.way {
		width: 100%;
		height: 120upx;
		line-height: 120upx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		.way-text {
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
	box-shadow: 20upx 20upx 30upx rgba(0, 0, 0, 0.1), -20upx -20upx 30upx rgba(255, 255, 255, 0.1);
	border-radius: 20upx;
	transition: all 0.2s;
}
.det-tit {
	width: 95%;
	height: 50upx;
	line-height: 50upx;
	margin-left: 2.5%;
	font-size: 42upx;
	color: #76d672;
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
		color: #76d672;
		box-shadow: 20upx 20upx 30upx rgba(0, 0, 0, 0.1), -20upx -20upx 30upx rgba(255, 255, 255, 0.1);
		border-radius: 20upx;
		transition: all 0.2s;
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
		background-color: #76d672;
		color: #FFFFFF;
		font-size: 34upx;
		letter-spacing: 6upx;
		line-height: 100upx;
		font-weight: bold;
		text-align: center;
		transition: all .5s;
	}
	.bottom-hover {
		background-color: #86f080;
		transition: all .5s;
	}
}
</style>
