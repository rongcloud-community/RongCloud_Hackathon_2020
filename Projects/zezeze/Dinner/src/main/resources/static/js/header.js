
$(function()
{
	//我的午餐
		$(".top_nav li,.navc li").hover(function(){
		$(this).find("span").show();
	},function(){
		$(this).find("span").hide();
	});

	//菜单
	var navTime=null;
	$('a[nav], div[nav]').unbind('mouseover').mouseover(function()
	{
		var $this =  $(this);
		var left  = $this.offset().left;
		clearTimeout(navTime);
		navTime = setTimeout(function()
		{
			var that = $('div[nav="' + $this.attr('nav') + '"]');
			$('a[nav]').not($('a[nav="' + $this.attr('nav') + '"]')).attr('style', '');
			$('a[nav="' + $this.attr('nav') + '"]').attr('style', 'background-image:url(images/' + $this.attr('nav') + '_s.jpg)');
			$('div[nav]').not(that).hide();
			left -= that.width()/2;
			if( left<0 )left = 0;
			that.show(50);
			if( typeof $this.attr('href')=='undefined' )return;
			that.css('left', left + 'px');
		}, 150);
	}).unbind('mouseout').mouseout(function()
	{
		var $this =  $(this);
		clearTimeout(navTime);
		navTime = setTimeout(function()
		{
			$('a[nav="' + $this.attr('nav') + '"]').attr('style', '');
			$('div[nav="' + $this.attr('nav') + '"]').hide();
		}, 150);
	});

//倒计时
	var strtotime = 3 * 3600;
	setInterval(function()
	{
		setBookTime();
	}, 1000);

	function setBookTime()
	{
		var hour   = parseInt(strtotime/3600);
		if( hour<10 )hour = '0' + hour;
		var minute = parseInt((strtotime%3600)/60);
		if( minute<10 )minute = '0' + minute;
		var second = strtotime%3600%60%60;
		if( second<10 )second = '0' + second;
		strtotime--;
		$('.countdown .hour').html(hour);
		$('.countdown .minute').html(minute);
		$('.countdown .second').html(second);
	}
	setBookTime();

	
})