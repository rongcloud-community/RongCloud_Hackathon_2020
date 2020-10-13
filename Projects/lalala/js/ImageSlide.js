//����ImageSlide��
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
		 * �����л�Ч��˵��
		 * --------------
		 *  0. ������С
		 *  1. ��������
		 *  2. Բ����С
		 *  3. Բ������
		 *  4. ���µ���
		 *  5. ���ϵ���
		 *  6. ������
		 *  7. ���ҵ���
		 *  8. ����Ҷ��
		 *  9. ���Ҷ��
		 * 10. ��λ���Ҷ��
		 * 11. ��λ����Ҷ��
		 * 12. ����ɢ
		 * 13. ���ߵ��м�
		 * 14. �м䵽����
		 * 15. �м䵽����
		 * 16. ���µ��м�
		 * 17. ���µ�����
		 * 18. ���ϵ�����
		 * 19. ���ϵ�����
		 * 20. ���µ�����
		 * 21. ����
		 * 22. ����
		 * 23. ���
		 * --------------
		 */
	}
	else {
		alert("��ʹ��IE5��IE5���ϰ汾�������ʹ�ñ�����");
	}
}

//����һ�Ż����ͼƬ������һ������ͼƬ·����
//pushImg(sPath1 [, sPath2 [, sPath3 [, ...]]])
ImageSlide.prototype.pushImgs = function () {
	for (var i = 0; i < arguments.length; i++)
		this.imgs.push(arguments[i]);
}

//����ͼƬ���������ĳ���
ImageSlide.prototype.setSize = function (nWidth, nHeight) {
	this.width = nWidth;
	this.height = nHeight;
}

//����ͼƬ����������ID
ImageSlide.prototype.setBoxId = function (sBoxId) {
	this.boxId = sBoxId;
}

//�����Ƿ��Զ�����
ImageSlide.prototype.setAutoPlay = function (bAutoPlay) {
	this.autoPlay = bAutoPlay;
}

//�����Զ����ŵ���ʱ����
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

//���ò��ŵ��л�Ч����0-23��������
ImageSlide.prototype.setTransform = function (nTransform) {
	this.transform = nTransform;
}

//��ʾ
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
			boxStr += "' onclick='window.imageSlide.play();' alt='���������һ��'";
		boxStr += " />";
	}
	boxStr += "</div>";
	document.writeln(boxStr);
	var box = document.getElementById(this.boxId);
	this.first = box.childNodes[0];
	this.frms = box.getElementsByTagName("IMG");
}

//����
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
			//alert("������ϣ�");
			window.imageSlide.frms[window.imageSlide.count-1].style.display = "none";
			window.imageSlide.first.style.display = "block";
			window.imageSlide.first.innerHTML = "<br />";
			//clearInterval(window.imageSlide.timer);
			window.imageSlide.flag = false;
			window.imageSlide.count = 0;
			window.document.all.pauseImg.src="/images/buttonstop_2.gif";
			window.document.all.pauseImg.alt="����";
			window.document.all.playImg.src="/space/fblue_images/buttonstop.gif";
			window.document.all.playImg.alt="ֹͣ";
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
		//alert("��û�з����κ�ͼƬ���޷����в��ţ�");
		window.imageSlide.first.innerHTML = "<br /><br />����ǰû����Ƭ�ɲ��ţ�"; 
	}
}

//��������
ImageSlide.prototype.timerPlay = function () {
	this.timer = setInterval(this.play, this.delay * 1000);
}

ImageSlide.prototype.pause = function () {
	this.status = !this.status;
	if(this.status == false){
	  window.document.all.pauseImg.src="/images/buttonstop_2.gif";
	  window.document.all.pauseImg.alt="����";
	  	  window.document.all.playImg.src="/images/buttonstop_2.gif";
	  window.document.all.playImg.alt="����";
	  //this.flag = false;
	}
	else{
	  window.document.all.pauseImg.src="/space/fblue_images/buttonpaush.gif";
	  window.document.all.pauseImg.alt="��ͣ";
	  window.document.all.playImg.src="/space/fblue_images/buttonstop.gif";
	  window.document.all.playImg.alt="ֹͣ";
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
	  window.document.all.playImg.alt="����";
	  window.document.all.pauseImg.src="/images/buttonstop_2.gif";
	  window.document.all.pauseImg.alt="����";
	  //this.status = true;
	}
	else{
	  window.document.all.playImg.src="/space/fblue_images/buttonstop.gif";
	  window.document.all.playImg.alt="ֹͣ";
	  window.document.all.pauseImg.src="/space/fblue_images/buttonpaush.gif";
	  window.document.all.pauseImg.alt="��ͣ";
	  this.status = true;
	  window.imageSlide.play();
	}
}

//ʵ����һ��ImageSlide����imageSlide��������Ϊwindow�����һ���Ӷ���
window.imageSlide = new ImageSlide();