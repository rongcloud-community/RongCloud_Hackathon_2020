// JavaScript Document
$(function(){
	$(".ac").click(function(){
		if($(this).next().is(":hidden")){				
			$(this).next().slideDown(100)
			$(this).siblings(".ac").next().slideUp(100)
			$(this).children(".order_info").addClass("ac_b")
		}else{
			$(this).next().slideUp(100)
			$(this).siblings(".ac").next().slideUp(100)
			$(this).children(".order_info").removeClass("ac_b")
		}
	});	
	
	
	$(".gt").click(function(){
		$("html,body").animate({scrollTop:'0px'}, 500);
	});	

});

function selectOrder(OrderVal){
	if(category == '') category = 0;
	if(brand == '') brand = 0;
	if(price == '') price = 0;
	if(color == '') color = 0;
	if(gender == '') gender = 0;

	if(typeval == "bargains"){
		var url = category+"-"+brand+"-"+price+"-"+color+"-"+OrderVal+"-10-"+bid+"-1-0-0.html";
	}else if(typeval == "search" || typeval == "woman" || typeval == "man"){
		var url = category+"-"+brand+"-"+price+"-"+color+"-"+OrderVal+"-10-1-0.html";
	}else{
		var url = category+"-"+brand+"-"+price+"-"+color+"-"+OrderVal+"-10-1-0-"+gender+".html";
	}
	location.href="/"+typeval+"/"+url;
}

//公用弹出框
function boxShow(boxID){
	var maskHeight = $(document).height();
    var maskWidth = $(window).width();
    var relLeft = ($(window).width() - $("#" + boxID).width())/2;
    var relTop = ($(window).height() - $("#" + boxID).height())/2;
    $(".mask").css({height:maskHeight, width:maskWidth}).show();
	$("#" + boxID).css({top:$(window).scrollTop() + relTop + "px", left:$(window).scrollLeft() + relLeft + "px"}).show();
	$(".close_btn,.mask").click(function(){
		$(".mask,.ac_box").hide();
	});
}