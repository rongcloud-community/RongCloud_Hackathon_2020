<template>
	<view class="search" :style="{ backgroundColor: backgroundColor }">
		<view class="content" :style="{ 'border-radius': radius + 'upx', border: border }">
			<view class="content-box" :class="{ center: mode === 2 }">
				<text class="icon icon-search" v-if="active==true">&#xe61c;</text>
				<input class="input" :class="{ center: !active && mode === 2 }" :focus="isFocus" :placeholder="placeholder" placeholder-style="text-align:center;" v-model="inputVal" @focus="focus" @blur="blur" />
				<!-- <view v-if="!active && mode === 2" class="input sub" @click="getFocus">请输入搜索内容</view> -->
				<text v-if="isDelShow" class="icon icon-del" @click="clear">&#xe644;</text>
			</view>
			<view v-show="(active && show && button === 'inside') || (isDelShow && button === 'inside')" class="searchBtn" @click="search">搜索</view>
		</view>
		<view v-if="button === 'outside'" class="button" :class="{ active: show || active }" @click="search">
			<view class="button-item">{{ !show ? searchName : '搜索' }}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		mode: {
			type: Number,
			default: 1
		},
		button: {
			type: String,
			default: 'outside'
		},
		show: {
			type: Boolean,
			default: true
		},
		radius: {
			type: String,
			default: '60'
		},
		placeholder: {
			type: String,
			default: '请输入搜索内容'
		},
		backgroundColor: {
			type: String,
			default: '#fff'
		},
		border: { type: String, default: '1px #f5f5f5 solid' }
	},
	data() {
		return {
			active: false,
			inputVal: '',
			searchName: '取消',
			isDelShow: false,
			isFocus: false
		};
	},
	methods: {
		focus() {
			this.active = true;
		},
		blur() {
			this.isFocus = false;
			if (!this.inputVal) {
				this.active = false;
			}
		},
		clear() {
			this.inputVal = '';
			this.active = false;
			this.$emit('search', '');
		},
		getFocus() {
			this.isFocus = true;
		},
		search() {
			if (!this.inputVal) return;
			this.$emit('search', this.inputVal);
			this.inputVal = '';
		}
	},
	watch: {
		inputVal(newVal) {
			if (newVal) {
				this.searchName = '搜索';
				this.isDelShow = true;
			} else {
				this.searchName = '取消';
				this.isDelShow = false;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.search {
	display: flex;
	width: 100%;
	// border-bottom: 1px #f5f5f5 solid;
	box-sizing: border-box;
	padding: 0;
	font-size: 30upx;
	background: #ededed;
	border-radius: 15upx;
	justify-content: center;
}
.search .content {
	display: flex;
	align-items: center;
	width: 100%;
	height: 80upx;
	background: #fff;
	overflow: hidden;
	transition: all 0.2s linear;
	border-radius: 15upx;
}
.search .content .content-box {
	width: 100%;
	display: flex;
	align-items: center;
	
}
.search .content .content-box.center {
	justify-content: center;
}
.search .content .content-box .icon {
	padding: 0 15upx;
}
.content-box .icon.icon-del {
	font-size: 38upx;
}
.search .content .content-box .input {
	width: 100%;
	max-width: 100%;
	line-height: 80upx;
	height: 80upx;
	transition: all 0.2s linear;
	font-size: 28upx;
	&.center {
		width: 680upx;
	}
	&.sub {
		// position: absolute;
		width: auto;
		color: grey;
	}
}
.search .content .searchBtn {
	height: 100%;
	flex-shrink: 0;
	padding: 0 30upx;
	background: $uni-color-success;
	line-height: 80upx;
	color: #30c6b0;
	border-radius: 15upx;
	transition: all 0.3s;
	background-color: #fff;
}
.search .button {
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	flex-shrink: 0;
	width: 0;
	transition: all 0.2s linear;
	white-space: nowrap;
	overflow: hidden;
	.search .button.active {
		padding-left: 15upx;
		width: 100upx;
	}
}
@font-face {
	font-family: 'iconfont';
	src: url('https://at.alicdn.com/t/font_989023_efq0mtli526.ttf') format('truetype');
}
.icon {
	font-family: iconfont;
	font-size: 32upx;
	font-style: normal;
	color: #999;
}
</style>
