<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link type="text/css" rel="stylesheet" href="css/frontmodule.css" />
    <link type="text/css" rel="stylesheet" href="css/5_themes_default_select.css?v=0.0.0.9" front="css" />
    <link type="text/css" rel="stylesheet" href="css/5_themes_default_style.css?v=0.0.0.9" front="css" />
    <script type="text/javascript">
        window.PERF_START = new Date;
        function _splash(page, uid, tid, pid) {
            uid = uid || 0;  // 这里是用户ID
            tid = tid || 0;   // 这里是租户ID
            pid = pid || 'unknown';  // 这里是项目标识
            var now = new Date;
            var start = window.PERF_START || now;
            var diff = now - start;
            var rand = Math.round(Math.random() * 1000000);
            var url = document.location.protocol + '//opsapi.beisen.com/opsapi/AddLog?appName=' + pid + '&label=%5Bsplash%5D%20' + page + '&uid=' + uid + '&tid=' + tid + '&time=' + diff + '&type=1&sid=' + rand + '&step=0';
            var img = new Image;
            img.src = url;
        }
    </script>
    <!--        <link href="css/jiathis_share.css" rel="stylesheet" type="text/css" /> -->
    <script type="text/javascript" src="js/5_themes_default_jquery191.js?v=0.0.0.9"></script>
    <script type="text/javascript" src="js/5_themes_default_custom.js?v=0.0.0.9"></script>
    <script type="text/javascript" src="js/5_themes_default_dialog.js?v=0.0.0.9"></script>
    <script type="text/javascript">var $bs_vars = {'st': 'http://stnew.beisen.com/', 'version': '2015.09.17.001', 'constSite': 'http://const.tms.beisen.com'};
    function vstr(str) {
        if (typeof ($bs_vars) == 'undefine')
            return str;
        var result = str;
        for (var v in $bs_vars) {
            var regex = new RegExp('\\$\\{' + v.toString() + '\\}|\\{' + v.toString() + '\\}', 'igm');
            result = result.replace(regex, $bs_vars[v]);
        }
        return result;
    }
    ;</script>
    <!--引用静态文件:requirejs-->
    <script type="text/javascript" src="js/require.js"></script>
    <title>公司介绍</title>
</head>
<body>
<div class="header">
    <div class="headercontain">
        <div class="logo">
            <img src="images/104003_medias_20141215_20141215logo.jpg?v=635542641034400000" />
        </div>
        <!--module:login begin-->
        <div class="bs-module">
            <div class="login-link ">
                <div class="login-hearder">
                    <ul class="header-login" style="display:none">
                        <li class="welcome"><span><span class="userName" style="float:none"></span>，欢迎您！</span></li>
                        <li class="PortalIndex"><a href="member_apply.html"><span>个人中心</span></a></li>
                        <li class="LogoutUrl"><a href="/User/Account/LogOut"><span>退出</span></a></li>
                    </ul>
                    <ul class="header-unLogin" style="display:none">
                        <li><a class="loginlink" href="/Portal/Account/Login?returnUrl=%2Fa%2FAboutUs"> <span>登录</span> </a></li>
                        <li><a class="reglink" href="/Portal/Account/Register?returnUrl=%2Fa%2FAboutUs"><span> 注册</span></a></li>
                    </ul>
                </div>
                <script type="text/javascript">
                    $.post("ajax.php", {type:"1"}, function(data) {
                        var loginView = $(".login-hearder .header-login");
                        var unLoginView = $(".login-hearder .header-unLogin");
                        if (data.name != '') {
                            loginView.find('.userName').text(data.name);
                            loginView.show()
                        }
                        else {
                            unLoginView.show()
                        }
                    }, "json")
                </script>
            </div>
        </div>
        <!--module:login end-->
        <!--module:internalrecommend begin-->
        <div class="bs-module">
            <div class="internalrecommend-default ">
                <div class="internaldiv">
                    <a class="internal" href="http://neitui.zhiye.com/51talk" target="_blank">内部推荐专区</a>
                </div>
            </div>
        </div>
        <!--module:internalrecommend end-->
    </div>
</div>
<div class="nav">
    <!--module:menu begin-->
    <div class="bs-module">
        <div class="menu-simple ">
            <ul id="portalmenu">
                <li><a target="_self" href="/index" class="">首页</a> </li>
                <li><a target="_self" href="/jobs" class="">全部职位</a> </li>
                <li><a target="_self" href="/social" class="">社会招聘</a> </li>
                <li><a target="_self" href="/jobs" class="">校园招聘</a> </li>
                <li><a target="_self" href="/jobs" class="">实习生招聘</a> </li>
                <li><a target="_self" href="/about" class="current">公司介绍</a> </li>
            </ul>
        </div>
    </div>
    <!--module:menu end-->
</div>
<div class="contain joblist clearfix">
    <div class="containsidebar">
        <div class="zhaopindongtai bodertop nofly minheight">
            <!--module:menu begin-->
            <div class="bs-module">
                <div class="menu-secondtemplate ">
                    <div class="parttitleline"></div>
                    <div class="titlelinks">
                        <ul>
                            <ul class="secondarymenu">
                                <li class="secondCurrent"><a target="_self" href="about.html">公司介绍</a></li>
                            </ul>
                        </ul>
                    </div>
                </div>
            </div>
            <!--module:menu end-->
        </div>
        <div class="zhaopindongtai bodertop">
            <!--module:newslist begin-->
            <div class="bs-module">
                <div class="newslist-newsimple ">
                    <div class="parttitleline"></div>
                    <div class="parttitle">
                        <span class="dongtaiico"></span>
                        <div class="wordtitle">
                            招聘动态
                        </div>
                    </div>
                    <a href="news.html" class="morelinks">更多&gt;&gt;</a>
                    <div class="dongtailinks">
                        <ul>
                            <li><a href="news_detail.html?110000085" title="51Talk最嗨实习岗来啦~快来一起嗨" target="_blank">51Talk最嗨实习岗来...</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <!--module:newslist end-->
        </div>
    </div>
    <div class="zhiweisousuo bodertop selectmod zx_aboutus">
        <div class="parttitleline"></div>
        <div class="parttitle">
            <span class="dongtaiico"></span>
            <div class="wordtitle">
                关于我们
            </div>
        </div>
        <div class="s_detail">
            <div class="about adminarea" id="ctlArticleShow">
                <p class="unreset"><span style="font-size: medium;">如果你现在激情满满，准备大干一场</span></p>
                <p class="unreset"><span style="font-size: medium;">不想这激情被漫无边际的摸索和无限的等待所磨灭</span></p>
                <p class="unreset"><span style="font-size: medium;">如果你只想专注奖金和发展</span></p>
                <p class="unreset"><span style="font-size: medium;">不想在充满政治斗争的环境里选边站队</span></p>
                <p class="unreset"><span style="font-size: medium;">如果你想努力前行、获得认可</span></p>
                <p class="unreset"><span style="font-size: medium;">不想自己的努力被忽视</span></p>
                <p class="unreset"><span style="font-size: medium;">那么51Talk是你的绝佳平台</span></p>
                <p class="unreset"><span style="font-size: medium;">我们是最有钱景的互联网公司</span></p>
                <p class="unreset"><span style="font-size: medium;">我们是充满朝气的八五九零的团队</span></p>
                <p class="unreset"><span style="font-size: medium;">我们是徐小平、雷军、红杉信任的团队</span></p>
                <p class="unreset"><span style="font-size: medium;">我们是包容开放、能力晋升的团队</span></p>
                <p class="unreset"><span style="font-size: medium;">我们有着最专业、最系统的培训体系</span></p>
                <p class="unreset"><span style="font-size: medium;">我们正在颠覆传统英语培训行业格局</span></p>
                <p class="unreset"><span style="font-size: medium;">无论你是谁，无论你来自哪里，在这里都有公平的机会</span></p>
                <p class="unreset"><span style="font-size: medium;">因为我们是51Talk！</span></p>
                <p class="unreset"><span style="font-size: medium;">&nbsp;</span></p>
                <p class="unreset"><span style="font-size: medium;">51Talk无忧英语，成立于2011年，总部位于中国北京，在菲律宾、上海均设有分公司，全国十余家体验中心，是专门从事互联网在线英语培训的教育机构。自成立之初，我们就受到业内人士的广泛关注，并获得新东方创始人之一、真格基金合伙人徐小平老师的鼎力支持，2012年初又得到美国顶级风险投资机构DCM的投资,&nbsp;2013年12月，我们更获得由小米的创始人雷军先生旗下的顺为创投基金领投，&nbsp;A&nbsp;轮投资方&nbsp;DCM&nbsp;同时参与投资的1200&nbsp;万美元的&nbsp;B&nbsp;轮融资，为下一轮业务爆发增长提供最充足保障！&nbsp;2014年10月，红杉资本5500万美元的C轮高调融资，让我们的极致用户体验可以得到满足。经过历年来的发展，我们现在已经成为一家拥有数千多名外教，在线学员达数十万之多的业界领军品牌！&nbsp;并且将在2-3年内完成上市！</span></p>
                <p class="unreset"><span style="font-size: medium;">51Talk作为国内在线英语教育第一品牌，希望和你一起朝着光辉灿烂的未来前进！</span></p>
            </div>
        </div>
    </div>
</div>
<div class="footer">
    <span>&copy;2015&nbsp;&nbsp;51talk&nbsp;&nbsp;京ICP备05051632号 京公网安备110108002767号 &nbsp;Powered by&nbsp;<a href="http://www.beisen.com" class="footerlogo" target="_blank"></a></span>
</div>
<script type="text/javascript">
    require([
        vstr('${st}/${version}/cmsportal/skin/js/baiduStatistics.js')

    ]);
</script>
<script type="text/javascript">
    $(function() {
        _splash('zhiye_contentpage', 0, 104003, 'new.zhiye.com');
    });
</script>
</body>
</html>