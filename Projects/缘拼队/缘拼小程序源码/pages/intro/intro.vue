<template>
	<view class="body">
		<view class="title">
			<view>
				<text :class="type=='food'?'food':(type=='travel'?'travel':(type=='study'?'study':(type=='game'?'game':'none')))">{{ titleType }}</text>
			</view>
			<view class="delete" v-if="userid==myid" @click="delPin">
				<view :class="userid==myid?'one':'one_hide'"></view>
				<view :class="userid==myid?'two':'two_hide'"></view>
			</view>
		</view>
		<view class="content">
			<view class="contentHead">
				<text class="headTitle">{{ title }}</text>
				<view class="contentStatus">
					<image src="../../static/icon/like.png" mode="" id="like"></image>
					<text>{{likeCount}}</text>
					<image src="../../static/icon/comment.png" id="comment" mode=""></image>
					<text>{{commentList.length}}</text>
				</view>
			</view>
			<view class="tag">
				<view class="tag_box" :class="type=='food'?'tagfood':(type=='travel'?'tagtravel':(type=='study'?'tagstudy':(type=='game'?'taggame':'tagnone')))">{{ dowhat }}</view>
				<view class="tag_box" :class="type=='food'?'tagfood':(type=='travel'?'tagtravel':(type=='study'?'tagstudy':(type=='game'?'taggame':'tagnone')))">{{ sex }}</view>
			</view>
			<view class="content_text">{{ content_text }}</view>
			<view class="content_img">
				<image :src="imgList" mode="aspectFill"></image>
			</view>
			<view class="info_address" @click="useMap()" v-if="type !== 'travel'">
				<view class="address_icon-1"><image src="../../static/icon/address.png" mode=""></image></view>
				<view class="address_content" v-if="this.type != 'travel'">{{ address }}</view>
			</view>
			<view class="info_address" @click="useMapPstart()" v-if="type === 'travel'">
				<view class="address_icon"><image src="../../static/image/-departure.png" mode=""></image></view>
				<view class="address_content" v-if="this.type != 'travel'">{{ PstartaddName }}</view>
			</view>
			<view class="info_address" @click="useMapPend()" v-if="type === 'travel'">
				<view class="address_icon"><image src="../../static/image/-landing.png" mode=""></image></view>
				<view class="address_content" v-if="this.type != 'travel'">{{ PendaddName }}</view>
			</view>
			<view class="info_address" @click="useMapGo()" v-if="type === 'travel'">
				<view class="address_icon-1"><image src="../../static/icon/address.png" mode=""></image></view>
				<view class="address_content" v-if="this.type != 'travel'">点击进行路线规划</view>
			</view>
			<view class="info_time">
				<view class="time_icon"><image src="../../static/icon/time.png" mode=""></image></view>
				<view class="time_content">{{ time }}</view>
			</view>
		</view>
		<view class="user" @click="infoPage">
			<view class="user_left"><image :src="avatarUrl" mode=""></image></view>
			<view class="user_mid">{{ name }}</view>
			<view v-if="type=='food'" :class="addStutus ? 'food_add_hover' : 'food_add'" @click.native.stop="add">
				<view :class="addStutus ? 'food_one_hover' : 'food_one'"></view>
				<view :class="addStutus ? 'food_two_hover' : 'food_two'"></view>
			</view>
			<view v-if="type=='travel'" :class="addStutus ? 'travel_add_hover' : 'travel_add'" @click.native.stop="add">
				<view :class="addStutus ? 'travel_one_hover' : 'travel_one'"></view>
				<view :class="addStutus ? 'travel_two_hover' : 'travel_two'"></view>
			</view>
			<view v-if="type=='study'" :class="addStutus ? 'study_add_hover' : 'study_add'" @click.native.stop="add">
				<view :class="addStutus ? 'study_one_hover' : 'study_one'"></view>
				<view :class="addStutus ? 'study_two_hover' : 'study_two'"></view>
			</view>
			<view v-if="type=='game'" :class="addStutus ? 'play_add_hover' : 'play_add'" @click.native.stop="add">
				<view :class="addStutus ? 'play_one_hover' : 'play_one'"></view>
				<view :class="addStutus ? 'play_two_hover' : 'play_two'"></view>
			</view>
		</view>
		<view class="comment" :class="type=='food'?'food':(type=='travel'?'travel':(type=='study'?'study':(type=='game'?'game':'none')))">评论</view>
		<view class="comment_content" v-if="commentList!=[]">
			<view class="comment_box" v-for="(comment, index) in commentList" :key="index">
				<view class="comment_user">
					<image :src="comment.Userimg" mode=""></image>
					<text>{{ comment.nickname }}</text>
				</view>
				<view class="comment_text">
					<view class="comment_text_box" :class="type=='food'?'bgfood':(type=='travel'?'bgtravel':(type=='study'?'bgstudy':(type=='game'?'bggame':'bgnone')))">
						<text>{{ comment.msg }}</text>
					</view>
				</view>
			</view>
			<view class="comment_empty" v-if="commentList==[]">
				暂无评论~
			</view>
		</view>
		<view :class="add_comment">
			<view :class="showStatus == true ? 'placeholder_hover' : 'placeholder'">{{comment_placeholder}}</view>
			<input type="text" :value="commentContent" :focus="focus" @input="commentCon" @blur="commentBarChange" @focus="commentFocus" class="commentBar" />
			<view :class="showStatus == true ? 'commentBtn' : 'commentBtn_hover'" @click.native.stop="send">评论</view>
		</view>
		<view class="tabbar">
			<view class="tab_left">
				<view class="like_icon" hover-class="icon_hover" @click="addLike"><image :src="showLike?'../../static/icon/like_hover.png':'../../static/icon/like.png'" mode=""></image></view>
				<view class="comment_icon" hover-class="icon_hover" @click="comment"><image src="../../static/icon/comment.png" mode=""></image></view>
				<view class="collect_icon" hover-class="icon_hover" @click="collect" ><image src="../../static/icon/collect_hover.png" v-if="collectStatus" mode=""></image>
				<image src="../../static/icon/collect.png" v-if="!collectStatus" mode=""></view>
			</view>
			<view class="tab_right">
				<view class="pind" v-if="status=='2'" :class="type=='food'?'food':(type=='travel'?'travel':(type=='study'?'study':(type=='game'?'game':'none')))">已被拼</view>
				<view class="pin" v-if="status=='null'" :class="type=='food'?'bgfood':(type=='travel'?'bgtravel':(type=='study'?'bgstudy':(type=='game'?'bggame':'bgnone')))" @click="talk">想拼</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	onLoad(options) {
		this.likeCount=options.likeCount
		this.myid=uni.getStorageSync('ID');
		this.userid=options.userid
		this.id=options.id
		this.type=options.type
		this.title=options.title
		this.status=options.status
		this.commentList = JSON.parse(options.Comment);
		this.time=options.date+'    '+options.time
		this.content_text=options.details
		this.imgList='https://zmetalhearty.com'+options.img
		if(this.type!='travel'){
			this.trueAddress=JSON.parse(options.address)
			this.address= this.trueAddress.name
			this.latitude=this.trueAddress.latitude
			this.longitude=this.trueAddress.longitude
			this.addName=this.trueAddress.name
			this.addressA=this.trueAddress.address
		}else if(this.type=='travel'){
			this.truePend=JSON.parse(options.pend)
			this.Pendaddress= this.truePend.name
			this.Pendlatitude=this.truePend.latitude
			this.Pendlongitude=this.truePend.longitude
			this.PendaddName=this.truePend.name
			this.PendaddressA=this.truePend.address
			this.turePstart=JSON.parse(options.pstart)
			this.Pstartaddress= this.turePstart.name
			this.Pstartlatitude=this.turePstart.latitude
			this.Pstartlongitude=this.turePstart.longitude
			this.PstartaddName=this.turePstart.name
			this.PstartaddressA=this.turePstart.address
		}
		this.sex='性别要求:'+options.sex
		this.dowhat=options.dowhat
		if(this.type=='study'){
			this.titleType='拼学习'
			this.barColor = '#ca5b53'
		}else if(this.type=='travel'){
			this.titleType='拼出行'
			this.barColor = '#76d672'
		}else if(this.type=='food'){
			this.titleType='拼美食'
			this.barColor = '#e5af5b'
		}else if(this.type=='game'){
			this.titleType='拼娱乐'
			this.barColor = '#3478f5'
		}
		
		uni.setNavigationBarColor({
		    frontColor: '#ffffff',
		    backgroundColor: this.barColor,
		    animation: {
		        duration: 400,
		        timingFunc: 'easeIn'
		    }
		})
		
		var sourseId = uni.getStorageSync('ID');
		uni.request({
			url:'https://zmetalhearty.com/yuanpin/GetUserInfoInRong',
			method:'POST',
			header: {
			    'content-type': 'application/x-www-form-urlencoded'
			},
			data:{
				Focus:sourseId,
				ID:this.userid
			},
			success: (res) => {
				this.avatarUrl=res.data.img;
				this.name=res.data.nickname;
				if(res.data.status=='1'||res.data.status=='2') {
					this.addStutus=true;
					this.operation='remove';
				}else if(res.data.status=='0'||res.data.status=='-1') {
					this.addStutus=false;
					this.operation='add';
				}
			}
		})
		var list = uni.getStorageSync('viewList');
		var flag = 0;
		if(list.length!=0) {
			for(var i=0;i<list.length;i++) {
				if(list[i]==this.id) {
					flag = 1;
				}
			}
			if(flag == 0) {
				list.unshift(this.id);
				uni.setStorageSync('viewList',list);
				console.log('添加历史查看成功！');
			}
		}else {
			list.unshift(this.id);
			uni.setStorageSync('viewList',list);
			console.log('添加历史查看成功！');
		}
		uni.request({
			url:'https://zmetalhearty.com/yuanpin/CollectionsOperator',
			method:'POST',
			header: {
			    'content-type': 'application/x-www-form-urlencoded'
			},
			data:{
				operation:'getCollectionsByUserID',
				UserID:sourseId
			},
			success: (res) => {
				var flag = 0;
				var list = res.data.data;
				if(list.length!=0) {
					for(var i=0;i<list.length;i++) {
						if(list[i].ID==this.id) {
							flag=1;
						}
					}
					if(flag==1) {
						this.collectStatus=true;
					}else if(flag==0){
						this.collectStatus=false;
					}
				}
			}
		})
		uni.request({
			url: 'https://zmetalhearty.com/yuanpin/HomeItemsOperator',
			method: 'POST',
			data: {
				operation: 'islike',
				itemID:this.id,
				UserID:sourseId
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
			},
			success: res => {
				this.showLike = res.data.islike
			}
		});
	},
	data() {
		return {
			likeCount:'',
			myid:'',
			barColor:'',
			status:'',
			collectOperation:'',
			collectStatus:false,
			operation:'',
			avatarUrl:'',
			name:'',
			id:'',
			userid:'',
			titleType:'',
			jsonData:'',
			result:'',
			truePend:'',
			turePstart:'',
			trueAddress:'',
			type:'拼学习',
			title:'',
			address:'',
			time:'',
			showStatus:false,
			addStutus:false,
			commentBar:'commentBar',
			commentContent:'',
			focus:false,
			content_text:'',
			add_comment:'add_comment',
			latitude:'',
			longitude:'',
			addName:'',
			addressA:'',
			sex:'',
			dowhat:'',
			Pendaddress:'',
			Pendlongitude:'',
			Pendlatitude:'',
			PendaddName:'',
			PendaddressA:'',
			Pstartaddress:'',
			Pstartlatitude:'',
			PstartaddName:'',
			Pstartlongitude:'',
			PstartaddressA:'',
			showLike: false,
			comment_placeholder:'快给ta评论吧~',
			tagList:[
				{
					content:this.dowhat
				},
				{
					content:this.sex
				}
			],
			imgList:'',
			commentList:[],
			operationList:[
				{
					url:'../../static/icon/like.png'
				},
				{
					url:'../../static/icon/comment.png'
				},
				{
					url:'../../static/icon/collect.png'
				}
			]
		}
	},
	methods: {
		delPin() {
			uni.request({
				url: 'https://zmetalhearty.com/yuanpin/HomeItemsOperator',
				method: 'POST',
				data: {
					operation: 'removeHomeItem',
					itemID:this.id
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
				},
				success: res => {
					uni.showToast({
						title:'删除成功！',
						icon:'none',
						duration:1000
					});
					setTimeout(function() {
						uni.reLaunch({
							url:'/pages/index/index'
						});
					}, 1000);
				}
			});
		},
		infoPage() {
			var sourseId = uni.getStorageSync('ID');
			uni.request({
				url:'https://zmetalhearty.com/yuanpin/GetUserInfoInRong',
				method:'POST',
				header: {
				    'content-type': 'application/x-www-form-urlencoded'
				},
				data:{
					Focus:sourseId,
					ID:this.userid
				},
				success: (res) => {
					if(res.data.code==1) {
						uni.navigateTo({
							url:'../info/info?targetName='+res.data.nickname+'&targetId='+res.data.ID+'&avatarUrl='+res.data.img+'&sex='+res.data.sex+'&type='+res.data.status
						})
					}
				}
			})
		},
		talk() {
			var id = uni.getStorageSync('ID');
			if(this.userid==id) {
				uni.showToast({
					title:'您不能和自己缘拼哟~',
					icon:'none',
					duration:1000
				})
			}else {
				uni.navigateTo({
					url:'../HM-chat/HM-chat?avatarUrl='+this.avatarUrl+'&uName='+this.name+'&targetId='+this.userid+'&fromPin='+'1'
				})
			}
		},
		addLike() {
			var uid = uni.getStorageSync('ID');
			uni.request({
				url: 'https://zmetalhearty.com/yuanpin/HomeItemsOperator',
				method: 'POST',
				data: {
					operation: 'addlike',
					itemID:this.id,
					UserID:uid
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
				},
				success: res => {
					if(res.data.code==200) {
						this.showLike = true
					}
				}
			});
		},
		send() {
			var uid = uni.getStorageSync('ID');
			var avatar = uni.getStorageSync('avatarUrl');
			var name = uni.getStorageSync('nickName');
			uni.request({
				url: 'https://zmetalhearty.com/yuanpin/HomeItemsOperator',
				method: 'POST',
				data: {
					operation: 'addComment',
					itemID:this.id,
					UserID:uid,
					msg:this.commentContent
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
				},
				success: res => {
					var comment = {
						msg:this.commentContent,
						userID:uid,
						itemID:this.id,
						Userimg:avatar,
						nickname:name
					}
					this.commentList.push(comment);
					this.commentContent='';
				}
			});
		},
		collect() {
			var sourseId = uni.getStorageSync('ID');
			if(!this.collectStatus) {
				uni.request({
					url:'https://zmetalhearty.com/yuanpin/CollectionsOperator',
					method:'POST',
					header: {
					    'content-type': 'application/x-www-form-urlencoded'
					},
					data:{
						operation:'addCollection',
						UserID:sourseId,
						ItemID:this.id
					},
					success: (res) => {
						this.collectStatus = true;
						if(res.data.code==200) {
							uni.showToast({
								title:'收藏成功!',
								icon:'none',
								duration:1000
							})
						}
					}
				})
			}else{
				uni.request({
					url:'https://zmetalhearty.com/yuanpin/CollectionsOperator',
					method:'POST',
					header: {
					    'content-type': 'application/x-www-form-urlencoded'
					},
					data:{
						operation:'removeCollection',
						UserID:sourseId,
						ItemID:this.id
					},
					success: (res) => {
						this.collectStatus = false;
						if(res.data.code==200) {
							uni.showToast({
								title:'已取消收藏!',
								icon:'none',
								duration:1000
							})
						}
					}
				})
			}
			
		},
		comment() {
			this.focus = true;
		},
		commentCon(e) {
			this.commentContent = e.detail.value;
			if(this.commentContent.length!=0) {
				this.comment_placeholder=''
			}else {
				this.comment_placeholder='快给ta评论吧~'
			}
		},
		commentBarChange() {
			this.add_comment = 'add_comment';
			this.showStatus = false;
			this.focus = false;
		},
		commentFocus() {
			this.add_comment = 'add_comment_hover';
			this.showStatus = true;
		},
		add() {
			var sourseId = uni.getStorageSync('ID');
			if(sourseId == this.userid) {
				uni.showToast({
					title:'您不能关注自己哟~',
					icon:'none',
					duration:1000
				})
			}else {
				uni.request({
					url:'https://zmetalhearty.com/yuanpin/UserFocusOperator',
					method:'POST',
					header: {
					    'content-type': 'application/x-www-form-urlencoded'
					},
					data:{
						operation: this.operation,
						Focus: sourseId,
						BFocus: this.userid
					},
					success: (res) => {
						if(this.operation=='add') {
							this.addStutus=true;
							this.operation='remove';
							uni.showToast({
								title:'关注成功！',
								icon:'none',
								duration:1000
							});
							this.sendFlag=true;
						}else if(this.operation=='remove'){
							this.addStutus=false;
							this.operation='add';
							uni.showToast({
								title:'取消关注成功！',
								icon:'none',
								duration:1000
							});
							this.sendFlag=false;
						}
					}
				})
			}
		},
		useMap(){
			wx.openLocation({
			     latitude:this.latitude,
			     longitude:this.longitude,
				 name:this.addName,
				 address:this.addressA,
			     scale: 18
			   })
		},
		useMapPend(){
			wx.openLocation({
			     latitude:this.Pendlatitude,
			     longitude:this.Pendlongitude,
				 name:this.Pendaddress,
				 address:this.PendaddressA,
			     scale: 18
			   })
		},
		useMapPstart(){
			wx.openLocation({
			     latitude:this.Pstartlatitude,
			     longitude:this.Pstartlongitude,
				 name:this.PstartaddName,
				 address:this.PstartaddressA,
			     scale: 18
			   })
		},
		useMapGo(){
			let plugin = requirePlugin('routePlan');
			let key = '5SKBZ-TBSW3-QTW33-YJLYA-LKI2Z-IPFMF';  //使用在腾讯位置服务申请的key
			let referer = '缘拼';   //调用插件的app的名称
			let navigation= 1
			let startPoint = JSON.stringify({  //起点
			    'name': this.PstartaddName,
			    'latitude': this.Pstartlatitude,
			    'longitude': this.Pstartlongitude,
			});
			let endPoint = JSON.stringify({  //终点
			    'name':this.Pendaddress,
			    'latitude': this.Pendlatitude,
			    'longitude': this.Pendlongitude,
			});
			wx.navigateTo({
			    url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint + '&startPoint=' + startPoint + '&navigation=' + navigation
			});
		}
	}
}
</script>

<style>
@import url('../../static/css/intro.css');
.title {
	width: 680upx;
	height: 140upx;
	font-size: 100upx;
	line-height: 140upx;
	margin: 30upx auto;
}
.comment_empty {
	width: 100%;
	height: 200upx;
	color: #888888;
	text-align: center;
	line-height: 200upx;
}
</style>
