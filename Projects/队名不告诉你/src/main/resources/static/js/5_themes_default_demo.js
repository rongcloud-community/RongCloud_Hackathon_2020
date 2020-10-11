$(document).ready(function(){
	$('.flexslider').flexslider({animation: "fade",directionNav: false,slideshowSpeed: 5000});
	$(".arrr").parent().find("a").click(function(){
		$(this).parent().parent().find("ul").toggle();
	});
          
        //样式
       $(".zx_imgplace").parent().css("float","right");
       $(".zhiweiliebiao").parent().css("margin-top","15px");
      $('select.dropdown').selectmenu({
			width:175,
			maxHeight:200
		});
    function tips(){
       $.each($("span.ui-selectmenu-status"), function() {
      		var a = $(this).html();
      		$(this).attr("title",a);
      	});
   	};
   	tips()
    $(".ui-selectmenu-menu ul li").on("click",tips);
});
