//构造ImageSlide类
function ImageSlide () {
	if((/MSIE\s*[5-9]/).test(navigator.appVersion)) {
		this.count = 0;
		this.timer = null;
		this.first = new Object();
		this.frms = new Array();

		this.imgs = new Array();
		this.width = 640;
		this.height = 480;
		this.boxId = "imageSlideBox";
		this.delay = 5;
		this.autoPlay = true;
		this.transform = 23;
		this.status = false;
		this.flag = false;
		/**
		 * 播放切换效果说明
		 * --------------
		 *  0. 矩形缩小
		 *  1. 矩形扩大
		 *  2. 圆形缩小
		 *  3. 圆形扩大
		 *  4. 从下到上
		 *  5. 从上到下
		 *  6. 从左到右
		 *  7. 从右到左
		 *  8. 竖百叶窗
		 *  9. 横百叶窗
		 * 10. 错位横百叶窗
		 * 11. 错位竖百叶窗
		 * 12. 点扩散
		 * 13. 两边到中间
		 * 14. 中间到两边
		 * 15. 中间到上下
		 * 16. 上下到中间
		 * 17. 右下到左上
		 * 18. 右上到左下
		 * 19. 左上到右下
		 * 20. 左下到右上
		 * 21. 横条
		 * 22. 竖条
		 * 23. 随机
		 * --------------
		 */
	}
	else {
		alert("请使用IE5或IE5以上版本的浏览器使用本程序！");
	}
}

//加入一张或多张图片（传入一个或多个图片路径）
//pushImg(sPath1 [, sPath2 [, sPath3 [, ...]]])
ImageSlide.prototype.pushImgs = function () {
	for (var i = 0; i < arguments.length; i++)
		this.imgs.push(arguments[i]);
}

//设置图片播放容器的长宽
ImageSlide.prototype.setSize = function (nWidth, nHeight) {
	this.width = nWidth;
	this.height = nHeight;
}

//设置图片播放容器的ID
ImageSlide.prototype.setBoxId = function (sBoxId) {
	this.boxId = sBoxId;
}

//设置是否自动播放
ImageSlide.prototype.setAutoPlay = function (bAutoPlay) {
	this.autoPlay = bAutoPlay;
}

//设置自动播放的延时秒数
ImageSlide.prototype.setDelay = function (nSeconds) {
	this.delay = nSeconds;
}

ImageSlide.prototype.setTime = function (bFlag) {
	if(bFlag == true && this.delay < 10){
		this.delay++;
	}
	else if(bFlag == false && this.delay > 1){
		this.delay--;
	}
}

//设置播放的切换效果（0-23的整数）
ImageSlide.prototype.setTransform = function (nTransform) {
	this.transform = nTransform;
}

//显示
ImageSlide.prototype.display = function () {
	var boxStr = "<div style='width:" + this.width + "px;height:" + this.height + "px;' ";
	boxStr += "id='"  + this.boxId + "'><div ";
	if (this.autoPlay)
		boxStr += "onclick='window.imageSlide.play();window.imageSlide.timerPlay();'";
	else
		boxStr += "onclick='window.imageSlide.play();'";
	boxStr += "style='word-break:keep-all;width:100%;height:100%;background-color:#EEEEEE;'>";
	if (this.autoPlay)
		boxStr += "<br />";
	else
		boxStr += "<br />";
	boxStr += "</div>";
	var img;
	var transform = this.transform;
	for (var i = 0; i < this.imgs.length; i++) {
		if (this.transform >= 23)
		var transform = Math.floor(Math.random()*23);
		boxStr += "<img src='" + this.imgs[i] + "' style='display:none;width:";
		boxStr += this.width + ";height:" + this.height + "px;height:px;filter:";
		boxStr += "revealTrans(transition=" + transform + ",duration=1);'";
		if (!this.autoPlay)
			boxStr += "' onclick='window.imageSlide.play();' alt='点击播放下一张'";
		boxStr += " />";
	}
	boxStr += "</div>";
	document.writeln(boxStr);
	var box = document.getElementById(this.boxId);
	this.first = box.childNodes[0];
	this.frms = box.getElementsByTagName("IMG");
}

//播放
ImageSlide.prototype.play = function () {
	if(!window.imageSlide.status) {
		setTimeout(window.imageSlide.play,  window.imageSlide.delay * 1000);
		return;
	}
	else if (window.imageSlide.imgs.length) {
		if(!window.imageSlide.flag){
			if(window.imageSlide.count == 0) return;
			else{
				window.imageSlide.frms[window.imageSlide.count-1].style.display = "none";
				window.imageSlide.frms[window.imageSlide.count].filters[0].apply();
				window.imageSlide.first.style.display = "block";
				window.imageSlide.count = 0;
				return;
			}
		}
		else{
		  window.imageSlide.first.style.display = "none";
		  if (window.imageSlide.count >= window.imageSlide.imgs.length) {
			//alert("播放完毕！");
			window.imageSlide.frms[window.imageSlide.count-1].style.display = "none";
			window.imageSlide.first.style.display = "block";
			window.imageSlide.first.innerHTML = "<br />";
			//clearInterval(window.imageSlide.timer);
			window.imageSlide.flag = false;
			window.imageSlide.count = 0;
			window.document.all.pauseImg.src="/images/buttonstop_2.gif";
			window.document.all.pauseImg.alt="播放";
			window.document.all.playImg.src="/space/fblue_images/buttonstop.gif";
			window.document.all.playImg.alt="停止";
			window.imageSlide.status = false;
			window.imageSlide.flag = false;
			return;
		  }
		  else if (window.imageSlide.count == 0) {
			window.imageSlide.first.style.display = "none";
			window.imageSlide.frms[0].filters[0].apply();
			window.imageSlide.frms[0].style.display = "block";
			window.imageSlide.frms[0].filters[0].play();
		  }
		  else {
			window.imageSlide.frms[window.imageSlide.count-1].style.display = "none";
			window.imageSlide.frms[window.imageSlide.count].filters[0].apply();
			window.imageSlide.frms[window.imageSlide.count].style.display = "block";
			window.imageSlide.frms[window.imageSlide.count].filters[0].play();
		  }
		  window.imageSlide.count++;
		  setTimeout(window.imageSlide.play,  window.imageSlide.delay * 1000);
		}
	}
	else {
		//alert("你没有放入任何图片，无法进行播放！");
		window.imageSlide.first.innerHTML = "<br /><br />　当前没有相片可播放！"; 
	}
}

//连续播放
ImageSlide.prototype.timerPlay = function () {
	this.timer = setInterval(this.play, this.delay * 1000);
}

ImageSlide.prototype.pause = function () {
	this.status = !this.status;
	if(this.status == false){
	  window.document.all.pauseImg.src="/images/buttonstop_2.gif";
	  window.document.all.pauseImg.alt="播放";
	  	  window.document.all.playImg.src="/images/buttonstop_2.gif";
	  window.document.all.playImg.alt="播放";
	  //this.flag = false;
	}
	else{
	  window.document.all.pauseImg.src="/space/fblue_images/buttonpaush.gif";
	  window.document.all.pauseImg.alt="暂停";
	  window.document.all.playImg.src="/space/fblue_images/buttonstop.gif";
	  window.document.all.playImg.alt="停止";
	  if(this.flag == false){
	    this.flag = true;
	    window.imageSlide.play();
	  }
	}
}

ImageSlide.prototype.stop = function () {
	this.flag = !this.flag;
	if(this.flag == false){
	  window.document.all.playImg.src="/images/buttonstop_2.gif";
	  window.document.all.playImg.alt="播放";
	  window.document.all.pauseImg.src="/images/buttonstop_2.gif";
	  window.document.all.pauseImg.alt="播放";
	  //this.status = true;
	}
	else{
	  window.document.all.playImg.src="/space/fblue_images/buttonstop.gif";
	  window.document.all.playImg.alt="停止";
	  window.document.all.pauseImg.src="/space/fblue_images/buttonpaush.gif";
	  window.document.all.pauseImg.alt="暂停";
	  this.status = true;
	  window.imageSlide.play();
	}
}

//实例化一个ImageSlide对象imageSlide并将其做为window对象的一个子对象
window.imageSlide = new ImageSlide();