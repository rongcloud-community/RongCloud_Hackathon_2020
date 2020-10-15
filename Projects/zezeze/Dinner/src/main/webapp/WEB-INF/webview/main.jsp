<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>外卖啦</title>
    <link href="styles/main.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/jquery.1.4.2-min.js"></script>
    <script type="text/javascript" src="js/header.js"></script>
    <script type="text/javascript" src="js/index_ad.js"></script>

    <!--屏蔽js错误-->
    <script language=javascript>
        <!--
        window.onerror=function(){return true;}
        // -->
    </script>

    <!--浮动点餐-->
    <script type="text/javascript">
        function FloatMenu(){
            var animationSpeed=1500;
            var animationEasing='easeOutQuint';
            var scrollAmount=$(document).scrollTop();
            var newPosition=menuPosition+scrollAmount;
            if($(window).height()<$('#fl_menu').height()+$('#fl_menu .wddc').height()){
                $('#fl_menu').css('top',menuPosition);
            } else {
                $('#fl_menu').stop().animate({top: newPosition}, animationSpeed, animationEasing);
            }
        }
        $(window).load(function(){
            menuPosition=$('#fl_menu').position().top;
            FloatMenu();
        });
        $(window).scroll(function(){
            FloatMenu();
        });
        $(document).ready(function(){
            var fadeSpeed=500;
            $("#fl_menu").hover(function(){
                $("#fl_menu .wddc").fadeIn(fadeSpeed);
            },function(){
                $("#fl_menu .wddc").fadeOut(fadeSpeed);
            });
        });
    </script>

    <!--[if IE 6]>
    <style type="text/css">
        /*ie6 fix顶端元素*/
        #top-bar{
            top:expression(eval(document.documentElement.scrollTop));
        }
    </style>
    <script src="js/iepng.js" type="text/javascript"></script>
    <script type="text/javascript">
        EvPNG.fix('*');  //EvPNG.fix('包含透明PNG图片的标签'); 多个标签之间用英文逗号隔开。
    </script>
    <![endif]-->
</head>

<body>
<div id="top-bar">
    <div id="header">
        <div style="width:1000px">
            <div class="h_left">
                <div class="text_l"></div>
                <div class="text_c">
                    <div><img src="images/avatar.jpg" width="20" height="20" /></div>
                    <ul class="top_nav">
                        <li><a href="#">mylg 您好！</a></li>
                        <li class="jifen"><a href="#">当前积分:800</a> | </li>
                        <li class="ico_01"><a href="#">我的午餐</a>
                            <span><a href="#">我的午餐</a><a href="#">我的午2餐我的午餐</a><a href="#">我的午餐</a></span>
                        </li>
                    </ul>
                    <div class="clear"></div>
                </div>
                <div class="text_r"></div>
                <div class="clear"></div>
            </div>
            <div class="h_right">
                <a href="">设为首页</a> | <a href="">收藏此页</a> | <a href="login.html">登录</a> | <a href="reg.html">注册</a> | <a href="help.html">帮助中心</a>
            </div>
            <div class="clear"></div>
        </div>
    </div>

    <div id="top">
<%--        <div class="logo"><a href="index.html"><img src="images/logo.jpg" width="134" height="78" /></a></div>--%>
        <div class="logo"><a href="index.html"><text style="font-size: 28px;margin-left: 20px;margin-top:10px;">外卖啦！</text></a></div>

        <div class="time"></div>
        <div class="countdown">
            <span class="hour red">00</span>时
            <span class="minute red">00</span>分
            <span class="second red">00</span>秒
        </div>
    </div>

    <div class="nav">
        <div class="navc">
            <ul class="menu">
                <li class="index"><a href="index" ></a>
                    <span><a href="chat">我要点餐</a></span></li>
                <li class="activity"></li>
                <li class="user"></li>
                <li class="about"></li>
            </ul>
            <input type="text" class="nav_s1" value="请输入关键字">
            <input type="button" class="nav_s2">
        </div>
        <div class="navr"></div>
        <div class="clear"></div>
        <div class="tel"><img src="images/tel.gif" /></div>
        <div id="gpr"></div>

        <!--我的订餐开始-->
        <div id="fl_menu">
            <div class="label"><img src="images/mc.png" width="46" height="127" /></div>
            <div class="wddc">
                <img src="images/cart1.jpg" width="172" height="35" />
                <div class="mid">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="line" style="color:#e70012; font-weight:bold">
                        <tr>
                            <td width="57%">菜名</td>
                            <td width="19%" align="center">单价</td>
                            <td width="18%" align="center">数量</td>
                            <td width="6%" align="center">&nbsp;</td>
                        </tr>
                    </table>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td width="57%">红烧排骨饭</td>
                            <td width="18%" align="center">15</td>
                            <td width="16%" align="center">1</td>
                            <td width="9%" align="center"><img src="images/m_07.gif" /></td>
                        </tr>
                    </table>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td width="57%">红烧排骨饭</td>
                            <td width="18%" align="center">15</td>
                            <td width="16%" align="center">1</td>
                            <td width="9%" align="center"><img src="images/m_07.gif" /></td>
                        </tr>
                    </table>
                </div>
                <div class="bottom">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td align="center">合计：￥15.00</td>
                        </tr>
                        <tr>
                            <td align="center"><input name="" type="image" src="images/a_07.gif" /></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <!--我的订餐结束-->
    </div>
    <!--navEnd-->
</div>
<!--top-bar-->

<div id="wrap">
    <div class="index_ad">
        <a href="#"><img src="images/ad1.jpg"></a>
        <a href="#"><img src="images/ad1.jpg"></a>
        <a href="#"><img src="images/ad1.jpg"></a>
        <div class="index_ad_left loff"></div>
        <div class="index_ad_right ron"></div>
    </div>
    <div class="index_ad_bt">
        <img src="images/ad_on.jpg" class="_middle">
        <img src="images/ad_off.jpg" class="_middle">
        <img src="images/ad_off.jpg" class="_middle">
    </div>

    <div class="xj">
        <img src="images/xj.gif" class="_middle">
        <input type="text" name="username" class="username">
        <input type="password" name="userpwd" class="userpwd">
        <a href="" class="inlineblock login"><img src="images/lo_03.gif" width="107" height="30" /></a>
        <div class="reg_forg">
            <a href="reg.html">注册</a>
            | <a href="">忘记密码</a>
        </div>
    </div>

    <div><img src="images/hot_day.jpg" border="0" usemap="#Map">
        <map name="Map" id="Map">
            <area shape="rect" coords="937,9,998,37" href="dc.html" />
        </map>
    </div>

    <!-- 今日推代码荐 开始 -->
    <div class="section">
        <ul class="clearfix">
            <li>
                <div class="photo"><img src="images/1.jpg" width="235" height="312" /></div>
                <div class="rsp"></div>
                <div class="text">
                    <div class="new"></div>
                    <div style="padding:10px; height:225px;">
                        <a href="detailed.html"><h3>排骨+米饭+例汤</h3></a>
                        <span>推荐指数：</span>
                        <p>食材配料：食材配料食材配料食材配料食材配料食材配料食材配料食材配料</p>
                    </div>
                    <div class="price">15.00￥</div>
                    <div class="buy_add">
                        <div class="ico_02">还剩20份</div>
                        <div class="add"><a href="#"><img src="images/cart_index.jpg"  /></a></div>
                    </div>
                </div>
            </li>
            <li>
                <div class="photo"><img src="images/1.jpg" width="235" height="312" /></div>
                <div class="rsp"></div>
                <div class="text">
                    <div style="padding:10px; height:225px;">
                        <a href="detailed.html"><h3>排骨+米饭+例汤</h3></a>
                        <span>推荐指数：</span>
                        <p>食材配料：食材配料食材配料食材配料食材配料食材配料食材配料食材配料</p>
                    </div>
                    <div class="price">20.00￥</div>
                    <div class="buy_add">
                        <div class="ico_02">还剩20份</div>
                        <div class="add"><a href="#"><img src="images/cart_index.jpg" width="128" height="25" /></a></div>
                    </div>
                </div>
            </li>
            <li>
                <div class="photo"><img src="images/1.jpg" width="235" height="312" /></div>
                <div class="rsp"></div>
                <div class="text">
                    <div style="padding:10px; height:225px;">
                        <a href="#"><h3>排骨+米饭+例汤</h3></a>
                        <span>推荐指数：</span>
                        <p>食材配料：食材配料食材配料食材配料食材配料食材配料食材配料食材配料</p>
                    </div>
                    <div class="price">15.00￥</div>
                    <div class="buy_add">
                        <div class="ico_02">还剩20份</div>
                        <div class="add"><a href="#"><img src="images/cart_index.jpg" width="128" height="25" /></a></div>
                    </div>
                </div>
            </li>
            <li>
                <div class="photo"><img src="images/1.jpg" width="235" height="312" /></div>
                <div class="rsp"></div>
                <div class="text">
                    <div style="padding:10px; height:225px;">
                        <a href="#"><h3>排骨+米饭+例汤</h3></a>
                        <span>推荐指数：</span>
                        <p>食材配料：食材配料食材配料食材配料食材配料食材配料食材配料食材配料</p>
                    </div>
                    <div class="price">15.00￥</div>
                    <div class="buy_add">
                        <div class="ico_02">还剩20份</div>
                        <div class="add"><a href="#"><img src="images/cart_index.jpg" width="128" height="25" /></a></div>
                    </div>
                </div>
            </li>
            <li>
                <div class="photo"><img src="images/1.jpg" width="235" height="312" /></div>
                <div class="rsp"></div>
                <div class="text">
                    <div style="padding:10px; height:225px;">
                        <a href="#"><h3>排骨+米饭+例汤</h3></a>
                        <span>推荐指数：</span>
                        <p>食材配料：食材配料食材配料食材配料食材配料食材配料食材配料食材配料</p>
                    </div>
                    <div class="price">15.00￥</div>
                    <div class="buy_add">
                        <div class="ico_02">还剩20份</div>
                        <div class="add"><a href="#"><img src="images/cart_index.jpg" width="128" height="25" /></a></div>
                    </div>
                </div>
            </li>
            <li>
                <div class="photo"><img src="images/1.jpg" width="235" height="312" /></div>
                <div class="rsp"></div>
                <div class="text">
                    <div style="padding:10px; height:225px;">
                        <a href="#"><h3>排骨+米饭+例汤</h3></a>
                        <span>推荐指数：</span>
                        <p>食材配料：食材配料食材配料食材配料食材配料食材配料食材配料食材配料</p>
                    </div>
                    <div class="price">15.00￥</div>
                    <div class="buy_add">
                        <div class="ico_02">还剩20份</div>
                        <div class="add"><a href="#"><img src="images/cart_index.jpg" width="128" height="25" /></a></div>
                    </div>
                </div>
            </li>
            <li>
                <div class="photo"><img src="images/1.jpg" width="235" height="312" /></div>
                <div class="rsp"></div>
                <div class="text">
                    <div style="padding:10px; height:225px;">
                        <a href="#"><h3>排骨+米饭+例汤</h3></a>
                        <span>推荐指数：</span>
                        <p>食材配料：食材配料食材配料食材配料食材配料食材配料食材配料食材配料</p>
                    </div>
                    <div class="price">15.00￥</div>
                    <div class="buy_add">
                        <div class="ico_02">还剩20份</div>
                        <div class="add"><a href="#"><img src="images/cart_index.jpg" width="128" height="25" /></a></div>
                    </div>
                </div>
            </li>
            <li>
                <div class="photo"><img src="images/1.jpg" width="235" height="312" /></div>
                <div class="rsp"></div>
                <div class="text">
                    <div style="padding:10px; height:225px;">
                        <a href="#"><h3>排骨+米饭+例汤</h3></a>
                        <span>推荐指数：</span>
                        <p>食材配料：食材配料食材配料食材配料食材配料食材配料食材配料食材配料</p>
                    </div>
                    <div class="price">15.00￥</div>
                    <div class="buy_add">
                        <div class="ico_02">还剩20份</div>
                        <div class="add"><a href="#"><img src="images/cart_index.jpg" width="128" height="25" /></a></div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="clear"></div>
        <script type="text/javascript">
            $(document).ready(function(){

                $(".section ul li .rsp").hide();

                $(".section	 ul li").hover(function(){
                    $(this).find(".rsp").stop().fadeTo(500,0.5)
                    $(this).find(".text").stop().animate({left:'0'}, {duration: 500})
                },function(){
                    $(this).find(".rsp").stop().fadeTo(500,0)
                    $(this).find(".text").stop().animate({left:'318'}, {duration: "fast"})
                    $(this).find(".text").animate({left:'-318'}, {duration: 0})
                });

            });
        </script>
        <!-- 今日推荐代码 结束 -->
    </div>



</div>
<!--end wrap-->

<div class="footer">
    <div class="footer_link">
        <a href="">设为首页</a>
        | <a href=""> 收藏此页 </a>
        | <a href="">登录 </a>
        | <a href=""> 注册 </a>
        | <a href=""> 帮助中心</a>
    </div>

    <div class="footer_info">
        <div class="inlineblock">
            <div class="footer_title">
                <img src="images/clock_footer.jpg" class="_middle">
                订餐指南
            </div>
            <div>怎么注册</div>
            <div>订餐流程</div>
            <div>常见问题</div>
        </div>

        <div class="inlineblock">
            <div class="footer_title">
                <img src="images/concat_footer.jpg" class="_middle">
                联系我们
            </div>
            <div>0760-88342515</div>
            <div>中山市石岐区</div>
            <div>常见问题</div>
        </div>

        <div class="inlineblock">
            <div class="footer_title">
                <img src="images/look.jpg" class="_middle">
                关于我们
            </div>
            <div>怎么注册</div>
            <div>订餐流程</div>
            <div>常见问题</div>
        </div>
        <div class="clear"></div>
        <div class="copyright">
            <strong>版权信息</strong>
            <div>怎么注册怎么注册怎么注册怎么注册</div>
            <div>订餐流程订餐流程订餐流程订餐流程订餐流程订餐流程订餐流程订餐流程订餐流程</div>
            <div>常见问题常见问题常见问题常见问题常见问题常见问题</div>
        </div>
    </div>
</div>
<!--end footer-->


</body>
</html>