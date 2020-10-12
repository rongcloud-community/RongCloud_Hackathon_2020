<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
    <meta name="description" content="美西时尚提供2015年Gucci古驰, Prada普拉达, Burberry巴宝莉等国际奢侈品新品最新发布信息！100%正品保障,限量特卖4折起,7天无理由退换货." />
    <meta name="keywords" content="2015奢侈品新款,国际奢侈品新品,美西时尚" />
    <meta name="applicable-device" content="mobile" />
    <title>商品列表-goods_list.html</title>
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
            for(var i = 0;i <arrStr.length;i ++){
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
    var category = "";
    var brand = "";
    var price = "";
    var color = "";
    var order = "new";
    var gender = "";
    var typeval = "new";
    var size	= "";
</script>
<script type="text/javascript" src="js/reloadPro.js"></script>

<div id="content">
    <div class="content_m">
        <div class="sift">
            <form>
                <div class="sort_m relative float_l">
                    排序：<span class="paix">新品</span>
                    <select class="sort_n" onchange="javascript:selectOrder(this.value);">
                        <option value="new" selected="selected">新品</option>
                        <option value="hot" >热门</option>
                        <option value="priceAsc" >价格从低到高</option>
                        <option value="priceDesc" >价格从高到低</option>
                    </select>
                </div>
                <a class="screen float_r" href="chose.html">筛选</a>
                <div class="clear"></div>
            </form>
        </div>
        <script type="text/javascript">
            $(document).ready(function(){
                $(".guizhe").click(function(){
                    if ($(".xz_2").is(":hidden")){
                        $(".xz_2").show();
                        $(this).addClass("guizhe_cur")
                    }else{
                        $(".xz_2").hide();
                        $(this).removeClass("guizhe_cur")
                    }
                });
            })
        </script>

        <div class="list">
            <ul class="clearfix" id="proList">
                <li>
                    <a class="pro_img" href="/detail" ><img src="${ctx}/images/d-026909-1.jpg" width="90%" alt="Bottega Veneta 葆蝶家 Veneta红色编织小羊皮女士中号单肩包" /></a>
                    <p class="product_n"><a href="/detail" >Bottega Veneta</a></p>
                    <div class="product_p">
                        <span class="red">￥14500.00</span>
                    </div>
                </li><li>
                <a class="pro_img" href="/detail" ><img src="${ctx}/images/d-047383-1.jpg" width="90%" alt="Alexander McQueen 亚历山大·麦昆 男士 羊毛 长袖针织衫" /></a>
                <p class="product_n"><a href="/detail" >Alexander McQueen</a></p>
                <div class="product_p">
                    <span class="red">￥1850.00</span>
                </div>
            </li><li>
                <a class="pro_img" href="http://m.meici.com/product-Dolce&amp;Gabbana-red-man-lace-ups-047435-44898.html" ><img src="${ctx}/images/d-047435-1.jpg" width="90%" alt="Dolce&amp;Gabbana 杜嘉班纳 男士 牛皮 系带鞋" /></a>
                <p class="product_n"><a href="http://m.meici.com/product-Dolce&amp;Gabbana-red-man-lace-ups-047435-44898.html" >Dolce&amp;Gabbana</a></p>
                <div class="product_p">
                    <span class="red">￥1950.00</span>
                </div>
            </li><li>
                <a class="pro_img" href="http://m.meici.com/product-Prada-red-woman-totes-047449-44912.html" ><img src="${ctx}/images/d-047449-1.jpg" width="90%" alt="Prada 普拉达 女士 牛皮 手提包" /></a>
                <p class="product_n"><a href="http://m.meici.com/product-Prada-red-woman-totes-047449-44912.html" >Prada</a></p>
                <div class="product_p">
                    <span class="red">￥15500.00</span>
                </div>
            </li><li>
                <a class="pro_img" href="http://m.meici.com/product-Valentino-red-woman-shoulder-bags-047440-44903.html" ><img src="${ctx}/images/d-047440-1.jpg" width="90%" alt="Valentino 华伦天奴 女士 牛皮 单肩包" /></a>
                <p class="product_n"><a href="http://m.meici.com/product-Valentino-red-woman-shoulder-bags-047440-44903.html" >Valentino</a></p>
                <div class="product_p">
                    <span class="red">￥11800.00</span>
                </div>
            </li><li>
                <a class="pro_img" href="http://m.meici.com/product-Salvatore-Ferragamo-red-woman-shoulder-bags-047316-44779.html" ><img src="images/d-047316-1.jpg" width="90%" alt="Salvatore Ferragamo 菲拉格慕 Tracy  压纹牛皮 女士 两用包" /></a>
                <p class="product_n"><a href="http://m.meici.com/product-Salvatore-Ferragamo-red-woman-shoulder-bags-047316-44779.html" >Salvatore Ferragamo</a></p>
                <div class="product_p">
                    <span class="red">￥8000.00</span>
                </div>
            </li><li>
                <a class="pro_img" href="http://m.meici.com/product-Gucci-pink-woman-lafers-047419-44882.html" ><img src="${ctx}/images/d-047419-1.jpg" width="90%" alt="Gucci 古驰 女士 漆皮 乐福鞋" /></a>
                <p class="product_n"><a href="http://m.meici.com/product-Gucci-pink-woman-lafers-047419-44882.html" >Gucci</a></p>
                <div class="product_p">
                    <span class="red">￥2550.00</span>
                </div>
            </li><li>
                <a class="pro_img" href="http://m.meici.com/product-Bally-calssic-man-belts-047413-44876.html" ><img src="${ctx}/images/d-047413-1.jpg" width="90%" alt="Bally 巴利 男士 帆布/牛皮 皮带" /></a>
                <p class="product_n"><a href="http://m.meici.com/product-Bally-calssic-man-belts-047413-44876.html" >Bally</a></p>
                <div class="product_p">
                    <span class="red">￥1100.00</span>
                </div>
            </li><li>
                <a class="pro_img" href="http://m.meici.com/product-Burberry-calssic-woman-shoulder-bags-038474-35956.html" ><img src="${ctx}/images/d-038474-1.jpg" width="90%" alt="Burberry 博柏利 Haymarket经典格纹牛皮边饰PVC女士单肩包" /></a>
                <p class="product_n"><a href="http://m.meici.com/product-Burberry-calssic-woman-shoulder-bags-038474-35956.html" >Burberry</a></p>
                <div class="product_p">
                    <span class="red">￥6300.00</span>
                </div>
            </li><li>
                <a class="pro_img" href="http://m.meici.com/product-Salvatore-Ferragamo-yellow-woman-messenger-bags-047458-44921.html" ><img src="${ctx}/images/d-047458-1.jpg" width="90%" alt="Salvatore Ferragamo 菲拉格慕 女士 牛皮 斜挎包" /></a>
                <p class="product_n"><a href="http://m.meici.com/product-Salvatore-Ferragamo-yellow-woman-messenger-bags-047458-44921.html" >Salvatore Ferragamo</a></p>
                <div class="product_p">
                    <span class="red">￥3350.00</span>
                </div>
            </li><li>
                <a class="pro_img" href="http://m.meici.com/product-Gucci-calssic-woman-totes-047311-44774.html" ><img src="${ctx}/images/d-047311-1.jpg" width="90%" alt="Gucci 古驰 早春新款 PVC拼接织物 女士 手提包" /></a>
                <p class="product_n"><a href="http://m.meici.com/product-Gucci-calssic-woman-totes-047311-44774.html" >Gucci</a></p>
                <div class="product_p">
                    <span class="red">￥8400.00</span>
                </div>
            </li><li>
                <a class="pro_img" href="http://m.meici.com/product-Gucci-calssic-woman-long-wallets-033506-30986.html" ><img src="${ctx}/images/d-033506-1.jpg" width="90%" alt="Gucci 古驰 帆布 女士 长钱包" /></a>
                <p class="product_n"><a href="http://m.meici.com/product-Gucci-calssic-woman-long-wallets-033506-30986.html" >Gucci</a></p>
                <div class="product_p">
                    <span class="red">￥4250.00</span>
                </div>
            </li><li>
                <a class="pro_img" href="http://m.meici.com/product-Miu-Miu-pink-woman-shoulder-bags-messenger-bags-047455-44918.html" ><img src="${ctx}/images/d-047455-1.jpg" width="90%" alt="Miu Miu 缪缪 女士 羊皮 两用包" /></a>
                <p class="product_n"><a href="http://m.meici.com/product-Miu-Miu-pink-woman-shoulder-bags-messenger-bags-047455-44918.html" >Miu Miu</a></p>
                <div class="product_p">
                    <span class="red">￥8800.00</span>
                </div>
            </li><li>
                <a class="pro_img" href="http://m.meici.com/product-Jil-Sander-pink-man-long-sleeved-knit-sweater-047389-44852.html" ><img src="${ctx}/images/d-047389-1.jpg" width="90%" alt="Jil Sander 吉尔·桑德 男士 羊毛 长袖毛衫" /></a>
                <p class="product_n"><a href="http://m.meici.com/product-Jil-Sander-pink-man-long-sleeved-knit-sweater-047389-44852.html" >Jil Sander</a></p>
                <div class="product_p">
                    <span class="red">￥2100.00</span>
                </div>
            </li><li>
                <a class="pro_img" href="http://m.meici.com/product-Salvatore-Ferragamo-purple-woman-long-wallets-045255-42718.html" ><img src="${ctx}/images/d-045255-1.jpg" width="90%" alt="Salvatore Ferragamo 菲拉格慕 早春新款 压纹牛皮 女士 长钱包" /></a>
                <p class="product_n"><a href="http://m.meici.com/product-Salvatore-Ferragamo-purple-woman-long-wallets-045255-42718.html" >Salvatore Ferragamo</a></p>
                <div class="product_p">
                    <span class="red">￥2880.00</span>
                </div>
            </li><li>
                <a class="pro_img" href="http://m.meici.com/product-Armani-blue-man-long-sleeved-knit-sweater-047186-44649.html" ><img src="${ctx}/images/d-047186-1.jpg" width="90%" alt="Armani 阿玛尼 Emporio Armani 羊毛混纺 男士 长袖针织/毛衫" /></a>
                <p class="product_n"><a href="http://m.meici.com/product-Armani-blue-man-long-sleeved-knit-sweater-047186-44649.html" >Armani</a></p>
                <div class="product_p">
                    <span class="red">￥1760.00</span>
                </div>
            </li><li>
                <a class="pro_img" href="http://m.meici.com/product-Armani-blue-man-jeans-047475-44938.html" ><img src="${ctx}/images/d-047475-1.jpg" width="90%" alt="Armani 阿玛尼 Armani Jeans 棉质 男士 牛仔裤" /></a>
                <p class="product_n"><a href="http://m.meici.com/product-Armani-blue-man-jeans-047475-44938.html" >Armani</a></p>
                <div class="product_p">
                    <span class="red">￥1050.00</span>
                </div>
            </li><li>
                <a class="pro_img" href="http://m.meici.com/product-Fendi-blue-man-lace-ups-047416-44879.html" ><img src="${ctx}/images/d-047416-1.jpg" width="90%" alt="Fendi 芬迪 男士 牛皮 系带鞋" /></a>
                <p class="product_n"><a href="http://m.meici.com/product-Fendi-blue-man-lace-ups-047416-44879.html" >Fendi</a></p>
                <div class="product_p">
                    <span class="red">￥3400.00</span>
                </div>
            </li>
            </ul>
        </div>

    </div>
    <div class="load" id="dataload" style="display:none;">
        请稍候，商品加载中<img src="${ctx}/images/loading.gif" />
    </div>
    <a class="gt" href="#"></a>
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
<img src="http://hm.baidu.com/hm.gif?si=81629f5b6148e89c2389988e3c83b479&amp;et=0&amp;nv=0&amp;st=4&amp;lt=1427551788&amp;su=http%3A%2F%2Fm.meici.com%2F&amp;v=wap-0-0.2&amp;rnd=5701933664" width="0" height="0" /></body>
</html>