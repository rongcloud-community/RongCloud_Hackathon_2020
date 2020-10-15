/**
 * 
 * @authors Saturday (zhouling@51talk.com)
 * @date    2014-10-17 14:57:46
 * @version 1.0.0
 */
"use strict";
(function($,window,undefined){
	function Silder(){
		this.init.apply(this,arguments);
	};
	Silder.prototype={
		constructor:Silder,
		init:function(obj,time,type){
			type=type || "x";
			time=time || 3000;
			var _this=this;
			obj.css({"position":"relative","overflow":"hidden"});
			var oUl=obj.find(".silder_ul");
			oUl.find(".silder_li").each(function(index,ele){
				if($(ele).attr("order")==1){
					oUl.prepend($(ele));
				}else if($(ele).attr("order")==3){
					oUl.append($(ele));
				}
				var oTimer=$("#timer").clone();
				if($(ele).attr("show")==1){
					$(ele).css("position","relative").append(oTimer.show());
				}
			});
			if(obj.find(".silder_li").length<2){
				return;
			}
			oUl[0].innerHTML+=oUl[0].innerHTML;
			var oLi=obj.find(".silder_li");
			if(type=="x"){
				oLi.css({"float":"left","list-style":"none"});
			}
			this.liWidth=obj.find(".silder_li:first").outerWidth();
			this.liHeight=obj.find(".silder_li:first").outerHeight();
			//给ul固定足够的宽度，否则li会折行
			if(type=="x"){
				oUl.css({"width":this.liWidth*oLi.length,"position":"absolute"});
			}else{
				oUl.css({"height":this.liHeight*oLi.length,"position":"absolute"});
			}

			this.left=0;
			this.top=0;
			this.ulWidth=oUl.outerWidth()/2;
			this.ulHeight=oUl.outerHeight()/2;
			this.timer=null;
			this.ul=oUl;
			this.time=time;
			this.type=type;

			
			var preBtn=obj.find(".silder_prev");
			var nextBtn=obj.find(".silder_next");
			preBtn.click(function(){
				if(_this.ul.is(":animated")) return;
				_this.pre();
			});
			nextBtn.click(function(){
				if(_this.ul.is(":animated")) return;
				_this.next();
			});
			obj.mouseenter(function(){
				preBtn.show();
				nextBtn.show();
				clearInterval(_this.timer);
			}).mouseleave(function(){
				preBtn.hide();
				nextBtn.hide();
				_this.begin(_this.time);
			});
			this.begin(this.time);
		},
		tick:function(){
			var _this=this;
				if(this.type=="x"){
					this.ul.stop().animate({"left":this.left},function(){
					if(_this.left<=-_this.ulWidth){
						_this.left=0;
						_this.ul.css("left",_this.left);
					}
				});
			}else{
				this.ul.stop().animate({"top":this.top},function(){
					if(_this.top<=-_this.ulHeight){
						_this.top=0;
						_this.ul.css("top",_this.top);
					}
				});
			}
			
			
		},
		pre:function(){
			if(this.left>=0){
				this.ul.css("left",-this.ulWidth);
				this.left=-this.ulWidth;
			}
			this.left+=this.liWidth;
			this.tick();
		},
		next:function(){
			this.left-=this.liWidth;
			this.tick();
		},
		begin:function(){
			var _this=this;
			this.timer=setInterval(function(){
				if("x"==_this.type){
					_this.left-=_this.liWidth;
				}else{
					_this.top-=_this.liHeight;
				}
				_this.tick();
			},_this.time);
		}
	};
	window.Silder=Silder;

	$.fn.extend({
		hourglass:function(endTime){
			endTime=endTime || 0;
			var type=[24*60*1000,60*1000,60*1000,1000,100];
			return this.each(function(index,ele){
				var oHourglass=$(ele);
				var time=type[oHourglass.children().length-1];
				tick(oHourglass);
				ele.timer=setInterval(function(){
					tick(oHourglass);
				},time);
			});
			function tick(oHourglass){
				var disTime=endTime-new Date().getTime();
				if(disTime>=0){
					var iDay=Math.floor(disTime/(1000*60*60*24));//天
					var iHour=Math.floor(disTime/(1000*60*60))%24;//小时
				    var iMinute=Math.floor(disTime/(1000*60))%60;//分钟
				    var iSecond=Math.floor(disTime/1000)%60;//秒
				    var iMillisecond=Math.floor(disTime/100)%10;//拆分
				    var arr=[iDay,iHour,iMinute,iSecond,iMillisecond];
					oHourglass.children().each(function(index,ele){
						var num=arr[index];
						if(num<10) num="0"+num;
						$(ele).html(num);
					});
				}else{
					oHourglass.html("已结束");
					clearInterval(oHourglass[0].timer);
				}
			}
		}
	});
})(jQuery,window);