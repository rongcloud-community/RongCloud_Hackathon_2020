<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <meta name="applicable-device" content="mobile" />
    <title>购物车 - 列表-cart.html</title>
    <link rel="apple-touch-icon-precomposed" href="${ctx}/images/117.png"/>
    <link rel="stylesheet" type="text/css" href="${ctx}/css/wap.css" />
    <script src="js/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="${ctx}/js/jquery-ui.min.js"></script>
    <script type="text/javascript" src="${ctx}/js/wap.js"></script>
    <script type="text/javascript" src="${ctx}/js/TouchSlide.1.1.source.js"></script>
    <script type="text/javascript" src="${ctx}/js/iscroll.js"></script>
    <script type="text/javascript">
        function addCookie(){ //添加cookie
            var objHours = 24; objValue = "a"; objName = "tz";
            var str = objName + "=" + escape(objValue);
            if(objHours > 0){ //为0时不设定过期时间，浏览器关闭时cookie自动消失
                var date = new Date();
                var ms = objHours*3600*1000;
                date.setTime(date.getTime() + ms);
                str += "; expires=" + date.toGMTString();
            }
            document.cookie = str;
        }

        function getCookie(){ //获取指定名称的cookie的值
            var objName = "tz";
            var arrStr = document.cookie.split("; ");
            for(var i = 0;i < arrStr.length;i ++){
                var temp = arrStr[i].split("=");
                if(temp[0] == objName) return unescape(temp[1]);
            }
        }

        function adCookie(){ //添加cookie
            var objHours = 24; objValue = "b"; objName = "zt";
            var str = objName + "=" + escape(objValue);
            if(objHours > 0){ //为0时不设定过期时间，浏览器关闭时cookie自动消失
                var date = new Date();
                var ms = objHours*3600*1000;
                date.setTime(date.getTime() + ms);
                str += "; expires=" + date.toGMTString();
            }
            document.cookie = str;
        }

        function geCookie(){ //获取指定名称的cookie的值
            var objName = "zt";
            var arrStr = document.cookie.split("; ");
            for(var i = 0;i < arrStr.length;i ++){
                var temp = arrStr[i].split("=");
                if(temp[0] == objName) return unescape(temp[1]);
            }
        }
        $(document).ready(function(){
            window.scrollTo(0,1)
        });
        // 底部搜索提交
        function checkval(){
            var searchTxt = '请输入关键词';
            var searchVal =$(".searchValue").val();
            if(searchVal == ''){
                $(".searchT").focus();
                return false;
            }
        }

        // 顶部搜索提交
        function checkvalTop(){
            var searchTxt = '请输入关键词';
            var searchVal =$(".searchValue_top").val();
            if(searchVal == ''){
                $(".nav_search_m").focus();
                return false;
            }
        }
    </script>
    <script type="text/javascript">
        var myScroll;
        function loaded() {
            myScroll = new iScroll('standard', { checkDOMChanges: true });
        }
        document.addEventListener('DOMContentLoaded', loaded, false);

        $(function(){
            $(".standard").css({'height':$(window).height() - 46 +'px'});
            $('.home').click(function(){
                $('.content_bd').animate({left:'0%'},300);
                $('body').css({'position':'fixed'});
                //document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
            });
            $('.ph_d .phd_none').click(function(){
                $('.content_bd').animate({left:'-90%'},300);
                $('body').css({'position':'relative'});
            });
        });


    </script>


    <script type="text/javascript">
        //APP下载mask
        function addCookieZNQ(){ //添加cookie
            var objHours = 24; objValue = "znq"; objName = "znq";
            var str = objName + "=" + escape(objValue);
            if(objHours > 0){ //为0时不设定过期时间，浏览器关闭时cookie自动消失
                var date = new Date();
                var ms = objHours*3600*1000*7;
                date.setTime(date.getTime() + ms);
                str += "; expires=" + date.toGMTString();
            }
            document.cookie = str;
        }

        function getCookieZNQ(){ //获取指定名称的cookie的值
            var objName = "znq";
            var arrStr = document.cookie.split("; ");
            for(var i = 0;i < arrStr.length;i ++){
                var temp = arrStr[i].split("=");
                if(temp[0] == objName) return unescape(temp[1]);
            }
        }

        $(function(){
            //var appdown4 = "<div class='appdown'><a onclick=\"ga('send', 'event','index', 'mask', 'app 直接浏览');\" style='' title='直接浏览' href='javascript:void(0);' class='close_znq'></a><a href='http://itunes.apple.com/cn/app/id444433493?mt=8' onclick='ga('send', 'event','index', 'mask', 'app 即刻下载');'><img src='images/app_n4.jpg' width='100%' /></a></div>";
            //var appdown5 = "<div class='appdown'><a onclick=\"ga('send', 'event','index', 'mask', 'app 直接浏览');\" style='' title='直接浏览' href='javascript:void(0);' class='close_znq'>直接浏览触屏站>></a><a href='http://itunes.apple.com/cn/app/id444433493?mt=8' onclick='ga('send', 'event','index', 'mask', 'app ios即刻下载');'><img src='images/iphone5.jpg' width='100%' /></a></div>";
//	var appAndroid = "<div class='appdown'><a onclick=\"ga('send', 'event','index', 'mask', 'app 直接浏览');\" style='' title='直接浏览' href='javascript:void(0);' class='close_znq'>直接浏览触屏站>></a><a href='http://img.meicicdn.com/app/meici.android.6.15.apk' onclick='ga('send', 'event','index', 'mask', 'app android即刻下载');'><img src='images/app_a.jpg' width='100%' /></a></div>";
//	var gtZNQ = getCookieZNQ();
//	if(gtZNQ != "znq"){
//		if (/(iPhone|iPod)/i.test(navigator.userAgent)){
//			var screenHeight = $(window).height();
//
//			$(".appdown").height(screenHeight);
//			//if(screenHeight > 380){
//				$("body").append(appdown5);
//			//}else{
//				//$("body").append(appdown4);
//			//};
//		};
//		if(navigator.userAgent.match(/Android/i)){
//			$("body").append(appAndroid);
//		};
//		//关闭app遮罩层
//		$(".close_znq").click(function(){
//			$(".appdown").remove();
//			addCookieZNQ();
//		});
//	};
//APP下载mask结束
        });
    </script>

    <style type="text/css">
        .appdown {position:fixed; top:0; left:0; z-index:100;}
        .close_znq {display:block; width:140px; height:35px; text-align:center; color:#000; font-size:14px; line-height:35px; position:absolute; z-index:5; bottom:120px; left:50%; margin-left:-60px;}
        @media (device-height:480px) and (-webkit-min-device-pixel-ratio:2){/* 兼容iphone4/4s */
            .close_znq {display:block; width:140px; height:35px; text-align:center; color:#000; font-size:14px; line-height:35px; position:absolute; z-index:5; bottom:250px; left:50%; margin-left:-60px;}
        }
    </style>




</head>
<body>
<div id="header">
    <div class="header clearfix">
        <div class="home">
            <a class="itemize_n">
                <img src="${ctx}/images/left_logo.gif" height="30" />
            </a>
        </div>
        <h1 class="logo">购物袋</h1>
        <div class="assist">
            <a class="login float_r" href="login"><img src="${ctx}/images/h07.gif" height="45" /></a>
            <a class="shopping_cart float_r" href="cart"><img src="${ctx}/images/h06.gif" height="45" /></a>
            <div class="clear"></div>
        </div>
    </div>
</div>
<div class="content_bd">
    <!--左侧筛选-->
    <div class="ph_d">
        <div class="nav_search float_l">
            <form name="h_search" action="/search/dosch" method='get' onsubmit="return checkvalTop();">
                <div class="nav_search_m float_l"><input class="searchValue_top" type="text" value="" placeholder="请输入商品关键词便于搜索" name='q' /></div>
                <button class="nav_search_btn float_l"></button>
            </form>
        </div>
        <div class="float_r phd_none">╳</div>
        <div class="clear"></div>
    </div>
    <div id="standard" class="standard">
        <div id="scroller" class="nav_mess scroller">
            <ul>
                <li>
                    <p style="background:none;"><a href="index.html">首页</a></p>
                </li>
                <li>
                    <p><a>新品</a></p>
                    <ul class="fil_sj">
                        <li><a href="goods_list.html">所有新品</a></li>
                        <li><a href="/new/1-0-0-0-new-10-1-0-0.html">包袋</a></li>
                        <li><a href="/new/3-0-0-0-new-10-1-0-0.html">配饰</a></li>
                        <li><a href="/new/8-0-0-0-new-10-1-0-0.html">鞋履</a></li>
                        <li><a href="/new/24-0-0-0-new-10-1-0-0.html">服装</a></li>
                    </ul>
                </li>
                <li>
                    <p><a>女士</a></p>
                    <ul class="fil_sj">
                        <li><a href="/woman">所有女士商品</a></li>
                        <li><a href="/woman/1-0-0-0-new-10-1-0.html">包袋</a></li>
                        <li><a href="/woman/3-0-0-0-new-10-1-0.html">配饰</a></li>
                        <li><a href="/woman/8-0-0-0-new-10-1-0.html">鞋履</a></li>
                        <li><a href="/woman/24-0-0-0-new-10-1-0.html">服装</a></li>
                    </ul>
                </li>
                <li>
                    <p><a>男仕</a></p>
                    <ul class="fil_sj">
                        <li><a href="/man">所有男仕商品</a></li>
                        <li><a href="/man/1-0-0-0-new-10-1-0.html">包袋</a></li>
                        <li><a href="/man/3-0-0-0-new-10-1-0.html">配饰</a></li>
                        <li><a href="/man/8-0-0-0-new-10-1-0.html">鞋履</a></li>
                        <li><a href="/man/24-0-0-0-new-10-1-0.html">服装</a></li>
                    </ul>
                </li>
                <li>
                    <p><a>搭配</a></p>
                    <ul class="fil_sj">
                        <li><a href="goods_list.html">所有搭配</a></li>
                        <li><a href="/match/1-hot-10-0-0-1.html">商务风</a></li>
                        <li><a href="/match/2-hot-10-0-0-1.html">休闲风</a></li>
                        <li><a href="/match/4-hot-10-0-0-1.html">印花风</a></li>
                        <li><a href="/match/5-hot-10-0-0-1.html">牛仔装</a></li>
                        <li><a href="/match/6-hot-10-0-0-1.html">前卫风</a></li>
                        <li><a href="/match/7-hot-10-0-0-1.html">都市风</a></li>
                        <li><a href="/match/8-hot-10-0-0-1.html">优雅风</a></li>
                    </ul>
                </li>
                <li>
                    <p><a>特惠</a></p>
                    <ul class="fil_sj">
                        <li><a href="goods_list.html">所有特惠商品</a></li>
                        <li><a href="/sales/1-0-0-0-new-10-1-0.html">包袋</a></li>
                        <li><a href="/sales/3-0-0-0-new-10-1-0.html">配饰</a></li>
                        <li><a href="/sales/8-0-0-0-new-10-1-0.html">鞋履</a></li>
                        <li><a href="/sales/24-0-0-0-new-10-1-0.html">服装</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</div>


<script type="text/javascript">
    $(function(){
        //筛选类别单击
        $(".nav_mess p").click(function(){
            var thisNext = $(this).next(".fil_sj");
            var thisOtherEle = $(this).parent("li").siblings("li").children(".fil_sj");
            if(thisNext.is(":visible")){
                $(this).css({"background-position":"90% 19px"})
                thisNext.slideUp(300);
            }else{
                $(this).css({"background-position":"90% -32px"})
                $(this).parent("li").siblings("li").children("p").css({"background-position":"90% 19px"});
                thisNext.slideDown(300);
                thisOtherEle.slideUp(300);
            };
        });
    });
</script>
<script language="javascript">
    //var tipmsg = "成功将 Veneta红色编织小羊皮女士中号单肩包 加入购物袋";
    function delTR(key){
        if(confirm("您确定从购物袋中删除该商品？")){

            var _tp ;
            _tp = parseFloat($("#tp").text()  - $("#sprice_"+key).text()) ;

            $.get("/cart/doCookie/key/"+key+"/"+new Date().getTime(),function(data){
                if(data >= 0){
                    location.href = '/cart.html';
                    /*
                    $("#tp").text(_tp.toFixed(2));
                    var tr = document.getElementById("c_"+key);
                    tr.parentNode.removeChild(tr);
                    if(data == 0){
                        location.href = '/cart.html';
                    }*/
                }
            });
        }
    }

    function checkOrder(){
        $.get("/cart/checkCartProNum",function(data){
            if(data == 1){
                location.href='/order.html';
            }else{
                alert(data);
                return false;
            }
        })
    }
</script>
<div id="content">
    <div class="content_m">
        <div class="login_m" style="overflow:hidden; margin-bottom:10px;">
            <img src="${ctx}/images/myf.jpg" width="100%" />
        </div>
        <div class="login_m">
            <!--商品列表-->
            <div class="l_box heiAuto" id="c_1427551832">
                <div class="l_box_l hei75"><a class="del" href="javascript:void(0);" onclick="delTR('1427551832')"></a><a href="goods_detail.html" style="display:block; float:right;"><img src="${ctx}/images/s-026909-1.jpg" /></a></div>
                <div class="l_box_r hei75"><a class="pro_n" href="goods_detail.html">Bottega Veneta 葆蝶家<br />Veneta红色编织小羊皮女士中号单肩包<br />
                    <span class='red'>￥</span>
                    <span class="red" id="sprice_1427551832">
													14500.00						</span>
                </a>
                </div>
                <div class="clear"></div>
            </div><div class="l_box heiAuto" id="c_1427551579">
            <div class="l_box_l hei75"><a class="del" href="javascript:void(0);" onclick="delTR('1427551579')"></a><a href="http://m.meici.com/product-Burberry-red-woman-scarf-46651-44114.html" style="display:block; float:right;"><img src="${ctx}/images/s-046651-1.jpg" /></a></div>
            <div class="l_box_r hei75"><a class="pro_n" href="http://m.meici.com/product-Burberry-red-woman-scarf-46651-44114.html">Burberry 博柏利<br />Crimson Pink Check 丝羊毛 女士 围巾<br />
                <span class='red'>￥</span>
                <span class="red" id="sprice_1427551579">
													2880.00						</span>
                <span style="margin-left:10px;">尺码：F</span>						</a>
            </div>
            <div class="clear"></div>
        </div>                <div class="login_btn">
            <div class="phoneprice">
                <p>手机下单即可免运费</p>
            </div>
            <table class="addup" width="100%" style="height:35px;">
                <colgroup>
                    <col width="70%" /><col width="30%" />
                </colgroup>
                <tr><th style="padding-bottom:5px;">总　计：</th><td style="padding-bottom:5px;"><span class="red">￥</span><span class="red" id="tp">17380.00</span></td></tr>
            </table>
        </div>
        </div>
        <button class="login_btn_n" onclick="location.href='order_confirm.html'" id='Tocheckout'>现在就结算</button>
        <div style="color:#8e0c3a; text-align:left;">海外直邮试运行期间，非质量问题的退换货则需自行承担运费。如需帮助请联系我们的购物顾问。</div>    </div>
</div>
<style type="text/css">
    .app_height {width:100%; height:80px; background:#fff; display:none;}
    .app_down_new {width:100%; height:80px; position:fixed; bottom:0; left:0; background:rgba(0, 0, 0, 0.8) none repeat scroll 0 0 !important; filter:Alpha(opacity=80); background:#000; font-size:12px; z-index:10;}
    .app_down_new_m {display:block; margin:0 auto; height:70px; height:305px; padding:10px 5px 0 15px; color:#fff;}
    .app_down_new_n {width:300px; margin:0 auto;}
    .app_down_new_m:hover {color:#fff;}
    .app_down_txt {width:150px; margin:8px 0 0 12px; font-size:14px;}
    .app_down_ty {padding:5px 15px; background:#fff; color:#3a4047; border-radius:3px; margin:15px 0 0 5px;}
</style>




<script language="javascript">
    var timeout;
    function open_appstore(){
        window.location='http://itunes.apple.com/cn/app/id444433493?mt=8';
    }
    function try_to_open_app(){
        timeout = setTimeout('open_appstore()', 300);
    }
</script>


<div id="footer">
    <div class="footer">
        <a href="/services/about.html">关于美西</a><a tel:"400-600-6618" style="margin-left:10px;">400-600-6618</a><br /><span class="app"></span><a href="http://www.meici.com?from=m">电脑版</a><br />© 2020 MEICI.COM
    </div>
    <div class="app_height"></div>
</div>


<!-- BEGIN GOOGLE ANALYTICS CODE -->
<script type="text/javascript">
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-364122-3','auto');
    ga('send', 'pageview');

    ga('set', 'dimension1', "Tourists");</script>
<!-- END GOOGLE ANALYTICS CODE -->

<!--baidu--->
<img src="http://hm.baidu.com/hm.gif?si=81629f5b6148e89c2389988e3c83b479&amp;et=0&amp;nv=0&amp;st=4&amp;lt=1427551804&amp;su=http%3A%2F%2Fm.meici.com%2Fproduct%2Faddcart.html&amp;v=wap-0-0.2&amp;rnd=9691802370" width="0" height="0" /></body>
</html>