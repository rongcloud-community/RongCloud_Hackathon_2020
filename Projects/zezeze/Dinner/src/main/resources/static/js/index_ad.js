$(function()
{
	//活动图
	$('.index_ad, .index_ad_bt').unbind('mouseover').mouseover(function()
	{
		clearInterval(intveral);
	}).unbind('mouseout').mouseout(function()
	{
		intveral = setInterval(function()
		{
			var $this = $('.index_ad_bt img[src*="ad_on"]').next();
			if( $this.length<=0 )$this = $('.index_ad_bt img').eq(0);
			$this.click();
		}, 3000);
	});
	$('.index_ad').mouseout();
	
	$('.index_ad img').eq(0).css('left', '0px');

	$('.index_ad_bt img').unbind('click').click(function()
	{	
		if( $(this).attr('src').indexOf('ad_on.jpg')!==-1 )return;

		var old = $('.index_ad img').eq($('.index_ad_bt img').index($('.index_ad_bt img[src*="ad_on"]')));

		$('.index_ad_bt img').attr('src', 'images/ad_off.jpg');
		$(this).attr('src', 'images/ad_on.jpg');

		var that = $('.index_ad img').eq($('.index_ad_bt img').index($(this)));
		var left = that.offset().left;

		that.prevAll('img').not(old).css('left', '-1000px');
		that.nextAll('img').not(old).css('left', '1000px');
		
		that.animate().stop().animate({left:'0px'}, 500);

		if( left<0 )old.animate().stop().animate({left:'1000px'}, 500);
		else old.animate().stop().animate({left:'-1000px'}, 500);

		if( that.prevAll('img').length<=0 )$('.index_ad_left').removeClass('lon').addClass('loff');
		else $('.index_ad_left').removeClass('loff').addClass('lon');
			
		//if( that.nextAll('img').length<=0 )$('.index_ad_right').removeClass('ron').addClass('roff');
		//else $('.index_ad_right').removeClass('roff').addClass('ron');
	});
	$('.index_ad_left').unbind('click').click(function()
	{
		$('.index_ad_bt img[src*="ad_on"]').prev().click();
	});
	$('.index_ad_right').unbind('click').click(function()
	{
		$('.index_ad_bt img[src*="ad_on"]').next().click();
	});


})