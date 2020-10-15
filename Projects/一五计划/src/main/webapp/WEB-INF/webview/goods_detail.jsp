<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
    <meta name="description" content="美西时尚24小时在线销Veneta红色编织小羊皮女士中号单肩包,特卖4折起,100%正品,7天无理由退换货！" />
    <meta name="keywords" content="Veneta红色编织小羊皮女士中号单肩包" />
    <meta name="applicable-device" content="mobile" />
    <title>商品详情-goods_detail.html</title>
    <link rel="apple-touch-icon-precomposed" href="${ctx}/images/117.png"/>
    <link rel="stylesheet" type="text/css" href="${ctx}/css/wap.css" />
    <script src="${ctx}/js/jquery-1.9.1.min.js"></script>
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
        <h1 class="logo">美西时尚</h1>
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
<script>
    var saleid = "24579";
    //收藏
    function addSC(){
        $.post("/cart/addWishList/"+new Date().getTime(),{ saleid:saleid },function(data){
            if(data == 1){
                alert("商品收藏成功！");
                $('.addsc').hide();
                $('.addsc_y').show();
                return false;
            }else if(data == 3){
                alert("您还没有登录，请登录！");
                return false;
            }else if(data == 2){
                alert("该商品您已收藏过！");
                return false;
            }
        })
    }

    //ajax自动请求是否已经收藏
    $(document).ready(function(){
        $(".col_s li").click(function(){
            $(this).addClass("s_cur")
            var sizval = $(this).children().html();
            $("#size").attr("value",sizval);
            $(".chos_s").css("display","none");
            $(this).siblings().removeClass("s_cur")
        });
    })

    //加入购物车
    function addCart(){
        var sizeLen = $(".col_s li span").length;
        if(sizeLen >= 1) {
            var sizeLen = $(".s_cur").length;
            if(sizeLen < 1){
                //$(".chos_s").css("display","");
                alert("请选择尺码")
                return false;
            }
        }
    }

    function selectSize(obj,size){
        $("#size").attr("value",size);
    }

</script>
<style type="text/css">
    .slidesjs-pagination {margin-top:8px;}
</style>
<div id="content">
    <div class="content_m">
        <div class="pro_con">
        <div class="pro_con">
            <form action="/product/addcart.html" method="post" onSubmit="return addCart();">
                <input type="hidden" id="size" name="size">
                <input type="hidden" name="saleid" value="24579">
                <input type="hidden" name="action" value="ADDCART">
                <!--<img class="loading" src="images/loading.gif" />-->
                <div id="slideBox" class="slideBox">
                    <div class="bd">
                        <ul>
                            <li><img src="${ctx}/images/d-026909-1.jpg" width="250" /></li><li><img src="${ctx}/images/d-026909-2.jpg" width="250" /></li><li><img src="${ctx}/images/d-026909-3.jpg" width="250" /></li><li><img src="${ctx}/images/d-026909-4.jpg" width="250" /></li><li><img src="${ctx}/images/d-026909-5.jpg" width="250" /></li><li><img src="${ctx}/images/d-026909-6.jpg" width="250" /></li><li><img src="${ctx}/images/d-026909-7.jpg" width="250" /></li>                        </ul>
                    </div>
                    <div class="hd">
                        <ul></ul>
                    </div>
                </div>
                <script type="text/javascript">
                    TouchSlide({
                        slideCell:"#slideBox",
                        titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
                        mainCell:".bd ul",
                        autoPage:true //自动分页
                    });
                </script>
                <div class="product_pro">
                    <del>￥17800.00</del>                    <span class="red">￥14500.00</span>
                    <div class="clear"></div>
                </div>

                <div class="pro_btn clearfix">
                    <button type="button" class="login_btn_n float_l" name="btn-shopping" value="1" onclick="location.href='order_confirm.html'" style="width:49%; background:#de166c;">即刻购买</button>
                    <button type="button" class="login_btn_n float_r" name="btn-shopping" value="0" onclick="location.href='cart'" style="width:49%;">加入购物袋</button>
                </div>
            </form>
            <!---->

            <div class="share clearfix">
                <div class="share_btns float_l">
                    <i>交流：</i>
                    <span>
<%--                        <a title="分享到新浪微博" href="javascript:sina(); void(0);" onclick="ga('send', 'event','MProductDetail', 'sinaShare','26909');"  class="ico_sina_s"></a>--%>
                        <a title="" class="doChat" style="color: dodgerblue">进入聊天室</a>

                        <div class="clear"></div>
                    </span>
                </div>
                <div class="addsc float_r">
                    <a href="javascript:void(0);" onClick="addSC();ga('send', 'event','MProductDetail', 'addFav','26909');"><i>加入收藏</i></a>
                </div>
                <div class="addsc_y float_r" style="display:none"><i>已收藏</i></div>
            </div>
            <div class="pro_true">
                <p>美西时尚<span class="pro_true_font">100%</span>正品保证，<span class="pro_true_font">7</span>日退换货服务。<br>订购热线：400-600-6618</p>
            </div>
            <div class="detail">
                <p class="xq">商品信息</p>
                <div class="detail_n">
                    <table width="100%">
                        <colgroup>
                            <col width="60px" />
                        </colgroup>
                        <tr><th>品　　牌：</th><td><a href="/brands/0-4-0-0-0-10-1-0.html" title="Bottega Veneta 葆蝶家" target="_blank" style="color:#8e0c3a;">Bottega Veneta 葆蝶家</a></td></tr>
                        <tr><th>款　　式：</th><td>Veneta红色编织小羊皮女士中号单肩包</td></tr>
                        <tr><th>美西编号：</th><td>26909</td></tr>                        <tr><th>货　　号：</th><td>115653 V0016 6577</td></tr>                        <tr><th>尺　　寸：</th><td>宽40cm，高26cm，厚3cm，肩带高度10cm</td></tr>                        <tr><th>材　　质：</th><td>羊皮</td></tr>                        <tr><th>颜　　色：</th><td>红色</td></tr>                        <tr><th>产　　地：</th><td>意大利</td></tr>                        <tr><th>商品内部：</th><td>驼色麂皮内里，一个拉链袋，内附一面皮质方镜</td></tr>                        <tr><th>商品外部：</th><td>红色小羊皮材质，经典编织设计，袋口拉链闭合，编织皮质边饰，一根短肩带</td></tr>                                            </table>
                </div>
            </div>

            <div class="detail">
                <p class="xq">了解品牌</p>
                <div class="detail_n">
                    <p>意大利编织豪门Bottega Veneta由意大利莫尔泰杜(Moltedo)家族于1966年在意大利Vicenza设立总部，取名为宝缇嘉 (Bottega Veneta)，现改名“葆蝶家”，意为VENETA工坊,。独家的皮革梭织法让BOTTEGA VENETA在70年代发光发热，成为知名的顶级名牌。从时装、香氛、家居到高级珠宝等领域，Bottega Veneta以独树一帜的低调态度向世间有品之士展现了行云流水般的优雅质地。因为懂得欣赏Bottega Veneta的人，都具备“自信、优雅而忠于自己风格”的个人特质，不追求身份的彰显，也毫不浮夸矫饰。</p>
                </div>
            </div>

        </div>
    </div>
</div>

<!--海外购帮助-->
<script type="text/javascript">
    var hwgScroll;
    $(function(){
        var scH = $(window).height();
        var scW = $(window).width();
        $(".pro_hwg").click(function(){
            $("body").css({'position':'fixed'})
            $("#hwg_help").height(scH);
            $("#hwg_help").width(scW);
            $("#hwg_help").css({"opacity":"1"});
            hwgScroll = new iScroll('hwg_help');
        });
        $(".close_hwg").click(function(){
            $("#hwg_help").css({"opacity":"0","height":"0"});
            $("body").css({"position":"static"});
        });
    });
</script>
<style type="text/css">
    #hwg_help {position:absolute; top:0; left:0; height:0; z-index:100; background:#fff; color:#333; opacity:0; overflow:hidden;}
    .hwg_scroller {min-height:100%;}
    .hwg_scroller_m {padding:0 10px 10px 10px;}
    .close_hwg {text-align:right;}
    .hwg_scroller_m th {text-align:left; font-weight:bold;}
    .hwg_scroller_m td {padding-left:12px;}
</style>
<div id="hwg_help">
    <div class="hwg_scroller">
        <div class="hwg_scroller_m">
            <div class="close_hwg"><div style="font-size:18px;">╳</div></div>
            <table width="100%">
                <tr><th style="text-align:center;">海外直邮</th></tr>
                <tr><th>1.什么是海外直邮？</th></tr>
                <tr><td>海外直邮是美西时尚与境外品牌以及代理商合作推出的一项全新服务。您所订购的商品将由国际物流公司从境外直送到您手中。</td></tr>
                <tr><th>2.海外直邮时间</th></tr>
                <tr><td>顺丰等快递公司配送：3~7个工作日到货。<br />EMS等国际邮政投递：3~14个工作日到货。<br />*可能的延迟：<br />当海外直邮商品抵达中国后，可能需要对它们办理海关清关手续，这会导致配送延误，超过原始估计送达时间。<br />我们与配送合作伙伴紧密协作，会尽量减少海关延误对您的影响。</td></tr>
                <tr><th>3.海外直邮运费</th></tr>
                <tr><td>在购买海外直邮商品时，您需要支付100元的境内外运费，该费用不予退还。</td></tr>
                <tr><th>4.清关及税费</th></tr>
                <tr><td>在商品入关的过程中，可能会产生关税等费用。您需要提供身份证明和其他清关文件前往当地海关缴纳税费，办理清关手续。<br />*如需协助，请拨打全国免费热线：<a tel:"400-600-6618">400-600-6618"</a>，或在线联系服务顾问。</td></tr>
            </table>
        </div>
    </div>
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
<img src="http://hm.baidu.com/hm.gif?si=81629f5b6148e89c2389988e3c83b479&amp;et=0&amp;nv=0&amp;st=4&amp;lt=1427551792&amp;su=http%3A%2F%2Fm.meici.com%2Fnew&amp;v=wap-0-0.2&amp;rnd=1970767277" width="0" height="0" /></body>
<script type="text/javascript">
    $(function(){
        _splash('zhiye_home',0,104003,'new.zhiye.com');
    });
    $(".doChat").click(function () {
        var userId = "${param.userId}"
        var reg = {}
        reg['userid'] = userId

        $.ajax({
            type : "POST",
            contentType: "application/json;charset=UTF-8",
            url : "${ctx}/chat/getToken",
            data: JSON.stringify(reg),
            datatype:"JSON",
            success : function(re) {
                var tokenresult = re.tokenResult
                console.log(tokenresult)
                if(tokenresult){
                    location.href="${ctx}/chat?userId="+reg['userid']+"&token="+tokenresult+"&roomId=talk231"
                }else{
                    alert(tokenresult)
                }
            },
            error : function(re){
                alert(re)
            }
        });
    })
</script>
</html>