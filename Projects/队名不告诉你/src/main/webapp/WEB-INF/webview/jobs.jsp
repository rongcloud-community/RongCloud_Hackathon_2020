<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link type="text/css" rel="stylesheet" href="css/frontmodule.css" />
    <link type="text/css" rel="stylesheet" href="css/5_themes_default_style.css?v=0.0.0.9" front="css" />
    <link type="text/css" rel="stylesheet" href="css/5_themes_default_flexslider.css?v=0.0.0.9" front="css" />
    <link type="text/css" rel="stylesheet" href="css/5_themes_default_jqueryuicore.css?v=0.0.0.9" front="css" />
    <link type="text/css" rel="stylesheet" href="css/5_themes_default_jqueryuiselectmenu.css?v=0.0.0.9" front="css" />
    <link type="text/css" rel="stylesheet" href="css/5_themes_default_jqueryuitheme.css?v=0.0.0.9" front="css" />
    <script type="text/javascript">
        window.PERF_START=new Date;
        function _splash(page, uid, tid, pid){
            uid =  uid || 0;  // 这里是用户ID
            tid =  tid || 0;   // 这里是租户ID
            pid =  pid || 'unknown';  // 这里是项目标识
            var now = new Date;
            var start = window.PERF_START || now;
            var diff = now - start;
            var rand = Math.round(Math.random()*1000000);
            var url= document.location.protocol+'//opsapi.beisen.com/opsapi/AddLog?appName='+pid+'&label=%5Bsplash%5D%20'+page+'&uid='+uid+'&tid='+tid+'&time='+diff+'&type=1&sid='+rand+'&step=0';
            var img = new Image;
        img.src = url;
        }
    </script>
    <script type="text/javascript" src="js/5_themes_default_jquery191.js?v=0.0.0.9"></script>
    <script type="text/javascript" src="js/5_themes_default_jqueryflexslidermin.js?v=0.0.0.9"></script>
    <script type="text/javascript" src="js/5_themes_default_jqueryuicore1.js?v=0.0.0.9"></script>
    <script type="text/javascript" src="js/5_themes_default_jqueryuiposition.js?v=0.0.0.9"></script>
    <script type="text/javascript" src="js/5_themes_default_jqueryuiwidget.js?v=0.0.0.9"></script>
    <script type="text/javascript" src="js/5_themes_default_jqueryuiselectmenu1.js?v=0.0.0.9"></script>
    <script type="text/javascript" src="js/5_themes_default_demo.js?v=0.0.0.9"></script>
    <script type="text/javascript">var $bs_vars={'st':'http://stnew.beisen.com/','version':'2015.09.17.001','constSite':'http://const.tms.beisen.com'};function vstr(str) {
        if (typeof ($bs_vars) == 'undefine')
            return str;
        var result = str;
        for (var v in $bs_vars) {
            var regex = new RegExp('\\$\\{' + v.toString() + '\\}|\\{' + v.toString() + '\\}', 'igm');
            result = result.replace(regex, $bs_vars[v]);
        }
        return result;
    };</script>
    <!--引用静态文件:requirejs-->
    <script type="text/javascript" src="js/require.js"></script>
    <title>全部职位</title>
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
                        <li><a class="loginlink" href="/Portal/Account/Login?returnUrl=%2Falljob"> <span>登录</span> </a></li>
                        <li><a class="reglink" href="/Portal/Account/Register?returnUrl=%2Falljob"><span> 注册</span></a></li>
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
            <li><a target="_self" href="/jobs" class="current">全部职位</a> </li>
            <li><a target="_self" href="/social" class="">社会招聘</a> </li>
            <li><a target="_self" href="/jobs" class="">校园招聘</a> </li>
            <li><a target="_self" href="/jobs" class="">实习生招聘</a> </li>
            <li><a target="_self" href="/about" class="">公司介绍</a> </li>
        </ul>
        </div>
    </div>
    <!--module:menu end-->
</div>
<div class="pictureplace">
    <div class="pictureplacecenter">
        <img src="images/commonbanner.jpg?v=634507909375300000" />
    </div>
</div>
<div class="contain joblist clearfix">
    <div class="containsidebar">
        <!--module:positioncategory begin-->
        <div class="bs-module">
            <div class="positioncategory-smallfresh ">
                <div class="zhiweifenlei bodertop">
                    <div class="parttitleline"></div>
                    <div class="parttitle height0">
                        <span class="fenleiico"></span>
                        <div class="wordtitle lh0" title="职位类型">
                            职位类型
                        </div>
                    </div>
                    <div class="fenleilist">
                        <ul class="firstlist clearfix">
                            <li><a href="jobs.html?p=1^20#jlt" constval="20" title="北京">北京</a></li>
                            <li><a href="jobs.html?p=1^9#jlt" constval="9" title="上海">上海</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!--module:positioncategory end-->
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
    <div class="clearfix sousuocontain fl">
        <!--module:positionsearch begin-->
        <div class="bs-module">
            <div class="positionsearch-smallfresh ">
                <a name="jlt"></a>
                <div class="zhiweisousuo bodertop">
                    <div class="parttitleline"></div>
                    <div class="parttitle">
                        <span class="serchico"></span>
                        <div class="wordtitle">
                            职位搜索
                        </div>
                    </div>
                    <div class="serchcontain">
                        <input type="hidden" name="p" value="" id="jobAdClassHidden" />
                        <input type="hidden" name="p" value="" id="jobAdClassHidden" />
                        <input type="hidden" name="p" value="" id="jobAdClassHidden" />
                        <input type="hidden" name="p" value="" id="jobAdClassHidden" />
                        <input type="hidden" name="p" value="" id="jobAdClassHidden" />
                        <input type="hidden" name="p" value="" id="jobAdClassHidden" />
                        <table class="jobserch">
                            <tbody>
                            <tr class="serchjob">
                                <td class="listtitle">工作地点：</td>
                                <td>
                                    <ul class="workplace">
                                        <span class="selectall"><span class="shuxian"></span><a href="jobs.html?r=&amp;p=&amp;c=-1&amp;d=&amp;k=#jlt" class="chooseon" title="全部">全部</a></span>
                                        <li> <span class="shuxian"></span> <a href="jobs.html?r=&amp;p=&amp;c=1&amp;d=&amp;k=#jlt" title="全国">全国</a> </li>
                                        <li> <span class="shuxian"></span> <a href="jobs.html?r=&amp;p=&amp;c=1100&amp;d=&amp;k=#jlt" title="北京市">北京市</a> </li>
                                        <li> <span class="shuxian"></span> <a href="jobs.html?r=&amp;p=&amp;c=1103&amp;d=&amp;k=#jlt" title="海淀区">海淀区</a> </li>
                                        <li> <span class="shuxian"></span> <a href="jobs.html?r=&amp;p=&amp;c=3100&amp;d=&amp;k=#jlt" title="上海市">上海市</a> </li>
                                        <li> <span class="shuxian"></span> <a href="jobs.html?r=&amp;p=&amp;c=3102&amp;d=&amp;k=#jlt" title="徐汇区">徐汇区</a> </li>
                                        <li> <span class="shuxian"></span> <a href="jobs.html?r=&amp;p=&amp;c=8100&amp;d=&amp;k=#jlt" title="香港">香港</a> </li>
                                    </ul> </td>
                            </tr>
                            <input type="hidden" name="p" value="" id="jobAdClassHidden" />
                            <input type="hidden" name="p" value="" id="jobAdClassHidden" />
                            <tr class="serchjob">
                                <td class="listtitle" title="职位类型">职位类型：</td>
                                <td>
                                    <ul class="workplace">
                                        <span class="selectall"><span class="shuxian"></span><a href="jobs.html?r=&amp;p=1^-1&amp;c=&amp;d=&amp;k=#jlt" class="chooseon" title="全部">全部</a></span>
                                        <li> <span class="shuxian"></span> <a href="jobs.html?r=&amp;p=1^20&amp;c=&amp;d=&amp;k=#jlt" title="北京">北京</a> </li>
                                        <li> <span class="shuxian"></span> <a href="jobs.html?r=&amp;p=1^9&amp;c=&amp;d=&amp;k=#jlt" title="上海">上海</a> </li>
                                    </ul> </td>
                            </tr>
                            <tr class="serchjob">
                                <td class="listtitle">发布时间：</td>
                                <td>
                                    <ul class="workplace">
                                        <span class="selectall"><span class="shuxian"></span><a href="jobs.html?r=&amp;p=&amp;c=&amp;d=-1&amp;k=#jlt" class="chooseon">全部</a></span>
                                        <li> <span class="shuxian"></span> <a href="jobs.html?r=&amp;p=&amp;c=&amp;d=3&amp;k=#jlt" title="三天内">三天内</a> </li>
                                        <li> <span class="shuxian"></span> <a href="jobs.html?r=&amp;p=&amp;c=&amp;d=7&amp;k=#jlt" title="一周内">一周内</a> </li>
                                        <li> <span class="shuxian"></span> <a href="jobs.html?r=&amp;p=&amp;c=&amp;d=30&amp;k=#jlt" title="一个月内">一个月内</a> </li>
                                        <li> <span class="shuxian"></span> <a href="jobs.html?r=&amp;p=&amp;c=&amp;d=90&amp;k=#jlt" title="三个月内">三个月内</a> </li>
                                        <li> <span class="shuxian"></span> <a href="jobs.html?r=&amp;p=&amp;c=&amp;d=180&amp;k=#jlt" title="半年内">半年内</a> </li>
                                    </ul> </td>
                            </tr>
                            <input type="hidden" name="p" value="" id="jobAdClassHidden" />
                            <tr class="serchjob">
                                <td class="listtitle">招聘类别：</td>
                                <td>
                                    <ul class="workplace">
                                        <span class="selectall"><span class="shuxian"></span><a href="jobs.html?r=-1&amp;p=&amp;c=&amp;d=&amp;k=#jlt" class="chooseon">全部</a></span>
                                        <li> <span class="shuxian"></span> <a href="jobs.html?r=1&amp;p=&amp;c=&amp;d=&amp;k=#jlt" title="社会招聘">社会招聘</a> </li>
                                        <li> <span class="shuxian"></span> <a href="jobs.html?r=2&amp;p=&amp;c=&amp;d=&amp;k=#jlt" title="校园招聘">校园招聘</a> </li>
                                        <li> <span class="shuxian"></span> <a href="jobs.html?r=3&amp;p=&amp;c=&amp;d=&amp;k=#jlt" title="实习生招聘">实习生招聘</a> </li>
                                    </ul> </td>
                            </tr>
                            <input type="hidden" name="p" value="" id="jobAdClassHidden" />
                            <input type="hidden" name="p" value="" id="jobAdClassHidden" />
                            <tr class="serchjob">
                                <td class="listtitle"></td>
                                <td> <input type="text" class="serchinput" maxlength="50" id="k" name="k" /><span class="serchbtn"><a href="javascript:void(0)" id="searchlink">搜索</a></span></td>
                            </tr>
                            <input type="hidden" name="p" value="" id="jobAdClassHidden" />
                            </tbody>
                        </table>
                    </div>
                </div>
                <script type="text/javascript">
                    function GetParam(key) {
                        return (document.location.search.match(new RegExp("(?:^\\?|&)" + key + "=(.*?)(?=&|$)")) || ['', null])[1];
                    }

                    function myHTMLEnCode(str) {
                        var s = "";
                        if (str.length == 0) return "";
                        s = str.replace(/&/g, "&");
                        s = s.replace(/</g, "<");
                        s = s.replace(/>/g, ">");
                        s = s.replace(/ /g, "&nbsp;");
                        s = s.replace(/\'/g, "&#39;");

                        s = s.replace(/\n/g, "<br>");
                        return s;
                    }

                    function myHTMLDeCode(str) {
                        var s = "";
                        if (str.length == 0) return "";
                        s = str.replace(/&/g, "&");
                        s = s.replace(/</g, "<");
                        s = s.replace(/>/g, ">");
                        s = s.replace(/&nbsp;/g, " ");
                        s = s.replace(/&#39;/g, "\'");
                        s = s.replace(/"/g, "\"");
                        s = s.replace(/<br>/g, "\n");
                        return s;
                    }

                    var defaultText = "请输入关键字";

                    $(document).ready(function () {
                        $("input[name='keyword']").click(function () {
                            $(this).val("");
                        });

                        var keyWord = GetParam("k");

                        if (keyWord != null) {
                            keyWord = decodeURIComponent(keyWord);
                            keyWord = myHTMLDeCode(keyWord);

                            $("input[name='k']").val(keyWord);
                        }

                        $("#searchlink").click(function () {
                            var r = GetParam("r");
                            r = (r == null ? -1 : r);
                            var p = GetParam("p");
                            p = (p == null ? "" : p);
                            var c = GetParam("c");
                            c = (c == null ? "" : c);
                            var d = GetParam("d");
                            d = (d == null ? "" : d);
                            var k = $("input[name='k']").val();

                            if (k == defaultText)
                                k = "";

                            k = myHTMLEnCode(k);
                            k = encodeURIComponent($.trim(k));
                            location.href = "jobs.html" + "?r=" + r + "&p=" + p + "&c=" + c + "&d=" + d + "&k=" + k + '#jlt';
                        });

                        var keyStr = $("#k").val();
                        if (!keyStr || keyStr == "") {
                            $("#k").css("color", "#d2cece");
                            $("#k").val(defaultText);
                        }

                        $("#k").focus(function () {
                            var v = $(this).val();
                            if (v == defaultText) {
                                $(this).val("");
                                $(this).css("color", "");
                            }
                        });

                        $("#k").blur(function () {
                            var v = $(this).val();
                            if (!v || v == "") {
                                $(this).val(defaultText);
                                $(this).css("color", "#d2cece");
                            }
                        });

                    });
                </script>
            </div>
        </div>
        <!--module:positionsearch end-->
        <!--module:positionlist begin-->
        <div class="bs-module">
            <div class="positionlist-newtemplate ">
                <div class="clearfix tablecontain">
                    <table class="listtable">
                        <thead>
                        <tr class="tabletitle">
                            <th class="tableleft">&nbsp;&nbsp;职位名称</th>
                            <th class="tableleft" title="职位类型">职位类型</th>
                            <th class="tableleft">工作地点</th>
                            <th class="tableleft">发布时间</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td class="tableleft joblsttitle"> <a title="业务培训总监/区域培训总监 /销售运 营总监" jobadid="620025388" href="detail.html?620025388"> 业务培训总监/区域培训总监 /销售运 ... </a> </td>
                            <td class="tableleft joblsttitle" title="业务部">业务部</td>
                            <td title="" class="tableleft joblsttitle"> </td>
                            <td class="tableleft joblsttitle"> 2015-11-25 </td>
                        </tr>
                        <tr>
                            <td class="tableleft joblsttitle"> <a title="学术总监" jobadid="620025249" href="detail.html?620025249"> 学术总监 </a> </td>
                            <td class="tableleft joblsttitle" title="学术部">学术部</td>
                            <td title="北京市" class="tableleft joblsttitle"> 北京市 </td>
                            <td class="tableleft joblsttitle"> 2015-11-24 </td>
                        </tr>
                        <tr>
                            <td class="tableleft joblsttitle"> <a title="PTD 助教总监" jobadid="620025245" href="detail.html?620025245"> PTD 助教总监 </a> </td>
                            <td class="tableleft joblsttitle" title="业务服务部">业务服务部</td>
                            <td title="北京市" class="tableleft joblsttitle"> 北京市 </td>
                            <td class="tableleft joblsttitle"> 2015-11-24 </td>
                        </tr>
                        <tr>
                            <td class="tableleft joblsttitle"> <a title="CRD 客服总监" jobadid="620025239" href="detail.html?620025239"> CRD 客服总监 </a> </td>
                            <td class="tableleft joblsttitle" title="业务服务部">业务服务部</td>
                            <td title="" class="tableleft joblsttitle"> </td>
                            <td class="tableleft joblsttitle"> 2015-11-24 </td>
                        </tr>
                        <tr>
                            <td class="tableleft joblsttitle"> <a title="高级招聘专员" jobadid="620023617" href="detail.html?620023617"> 高级招聘专员 </a> </td>
                            <td class="tableleft joblsttitle" title=""></td>
                            <td title="北京市-海淀区" class="tableleft joblsttitle"> 北京市-海淀区 </td>
                            <td class="tableleft joblsttitle"> 2015-11-03 </td>
                        </tr>
                        <tr>
                            <td class="tableleft joblsttitle"> <a title="高级销售培训师" jobadid="620023569" href="detail.html?620023569"> 高级销售培训师 </a> </td>
                            <td class="tableleft joblsttitle" title=""></td>
                            <td title="北京市-海淀区" class="tableleft joblsttitle"> 北京市-海淀区 </td>
                            <td class="tableleft joblsttitle"> 2015-11-03 </td>
                        </tr>
                        <tr>
                            <td class="tableleft joblsttitle"> <a title="体验店-课程顾问" jobadid="620023310" href="detail.html?620023310"> 体验店-课程顾问 </a> </td>
                            <td class="tableleft joblsttitle" title="业务发展部">业务发展部</td>
                            <td title="北京市-海淀区" class="tableleft joblsttitle"> 北京市-海淀区 </td>
                            <td class="tableleft joblsttitle"> 2015-11-02 </td>
                        </tr>
                        <tr>
                            <td class="tableleft joblsttitle"> <a title="TMK电话邀约客服" jobadid="620023282" href="detail.html?620023282"> TMK电话邀约客服 </a> </td>
                            <td class="tableleft joblsttitle" title="业务发展部">业务发展部</td>
                            <td title="北京市-海淀区" class="tableleft joblsttitle"> 北京市-海淀区 </td>
                            <td class="tableleft joblsttitle"> 2015-11-02 </td>
                        </tr>
                        <tr>
                            <td class="tableleft joblsttitle"> <a title="代理商培训师" jobadid="620023232" href="detail.html?620023232"> 代理商培训师 </a> </td>
                            <td class="tableleft joblsttitle" title="业务发展部">业务发展部</td>
                            <td title="北京市-海淀区" class="tableleft joblsttitle"> 北京市-海淀区 </td>
                            <td class="tableleft joblsttitle"> 2015-11-02 </td>
                        </tr>
                        <tr>
                            <td class="tableleft joblsttitle"> <a title="销售培训师" jobadid="620021683" href="detail.html?620021683"> 销售培训师 </a> </td>
                            <td class="tableleft joblsttitle" title="青少事业部">青少事业部</td>
                            <td title="北京市-海淀区" class="tableleft joblsttitle"> 北京市-海淀区 </td>
                            <td class="tableleft joblsttitle"> 2015-10-23 </td>
                        </tr>
                        <tr>
                            <td class="tableleft joblsttitle"> <a title="PHP开发工程师" jobadid="620021671" href="detail.html?620021671"> PHP开发工程师 </a> </td>
                            <td class="tableleft joblsttitle" title="青少事业部">青少事业部</td>
                            <td title="北京市" class="tableleft joblsttitle"> 北京市 </td>
                            <td class="tableleft joblsttitle"> 2015-10-23 </td>
                        </tr>
                        <tr>
                            <td class="tableleft joblsttitle"> <a title="销售经理" jobadid="620021666" href="detail.html?620021666"> 销售经理 </a> </td>
                            <td class="tableleft joblsttitle" title="青少事业部">青少事业部</td>
                            <td title="北京市" class="tableleft joblsttitle"> 北京市 </td>
                            <td class="tableleft joblsttitle"> 2015-10-23 </td>
                        </tr>
                        <tr>
                            <td class="tableleft joblsttitle"> <a title="web前端开发工程师" jobadid="620021663" href="detail.html?620021663"> web前端开发工程师 </a> </td>
                            <td class="tableleft joblsttitle" title="青少事业部">青少事业部</td>
                            <td title="北京市" class="tableleft joblsttitle"> 北京市 </td>
                            <td class="tableleft joblsttitle"> 2015-10-23 </td>
                        </tr>
                        <tr>
                            <td class="tableleft joblsttitle"> <a title="销售培训经理" jobadid="620021668" href="detail.html?620021668"> 销售培训经理 </a> </td>
                            <td class="tableleft joblsttitle" title="青少事业部">青少事业部</td>
                            <td title="北京市" class="tableleft joblsttitle"> 北京市 </td>
                            <td class="tableleft joblsttitle"> 2015-10-23 </td>
                        </tr>
                        <tr>
                            <td class="tableleft joblsttitle"> <a title="市场运营" jobadid="620021669" href="detail.html?620021669"> 市场运营 </a> </td>
                            <td class="tableleft joblsttitle" title="青少事业部">青少事业部</td>
                            <td title="北京市" class="tableleft joblsttitle"> 北京市 </td>
                            <td class="tableleft joblsttitle"> 2015-10-23 </td>
                        </tr>
                        </tbody>
                    </table>
                    <span class="tablenote">共276条记录</span>
                    <div class="tablefooter">
                        <span>当前第1/19页</span>
                        <script language="javascript" type="text/javascript">function _MvcPager_Keydown(e){var _kc,_pib;if(window.event){_kc=e.keyCode;_pib=e.srcElement;}else if(e.which){_kc=e.which;_pib=e.target;}var validKey=(_kc==8||_kc==46||_kc==37||_kc==39||(_kc>=48&&_kc<=57)||(_kc>=96&&_kc<=105));if(!validKey){if(_kc==13){ _MvcPager_GoToPage(_pib,19);}if(e.preventDefault){e.preventDefault();}else{event.returnValue=false;}}}function _MvcPager_GoToPage(_pib,_mp){var pageIndex;if(_pib.tagName=="SELECT"){pageIndex=_pib.options[_pib.selectedIndex].value;}else{pageIndex=_pib.value;var r=new RegExp("^\\s*(\\d+)\\s*$");if(!r.test(pageIndex)){alert("当前页码错误");return;}else if(RegExp.$1<1||RegExp.$1>_mp){alert("当前页码超出范围");return;}}var _hl=document.getElementById(_pib.id+'link').childNodes[0];var _lh=_hl.href;_hl.href=_lh.replace('=0','='+pageIndex);var evt=document.createEvent('MouseEvents');evt.initEvent('click',true,true);_hl.dispatchEvent(evt);_hl.href=_lh;}</script>
                        <div class="pager clearfix">
                            <span><a disabled="disabled" class="disabled next">首页</a></span>
                            <span><a disabled="disabled" class="disabled next">上一页</a></span>
                            <span><a href="jobs.html/?PageIndex=2" class="next">下一页</a></span>
                            <span><a href="jobs.html/?PageIndex=19">尾页</a></span>
                            <span class="gobtn"><input type="text" id="_MvcPager_Ctrl0_pib" value="1" onkeydown="_MvcPager_Keydown(event)" /><input type="button" value="跳转" onclick="_MvcPager_GoToPage(document.getElementById('_MvcPager_Ctrl0_pib'),19)" /><span id="_MvcPager_Ctrl0_piblink" style="display:none;width:0px;height:0px"><a href="jobs.html/?PageIndex=0" onclick="window.open(this.attributes.getNamedItem('href').value,'_self')"></a></span></span>
                        </div>
                    </div>
                </div>
                <script type="text/javascript">

                    //职位学历映射
                    var jobAdEduMap = {
                        //        "244858631" : "高职高专",
                        //        "996726632" : "大学本科",
                        //        "208199123" : "硕士研究生",
                        //        "214287756": "博士研究生"

                        "244858631": "高职高专",
                        "996726632": "大学本科",
                        "208199123": "硕士研究生",
                        "214287756": "博士研究生"
                    }

                    //获取locationUrl判定是否需要获取额外添加的列
                    var url = window.location.href;

                    if (url.indexOf("cnnp.zhiye.com") > 0) {//域名
                        //获取列表第一列职位广告ID
                        var ids = [];
                        var jobTitles = $(".joblsttitle a ");
                        //循环获取HREF提取JobId
                        for (var i = 0; i < jobTitles.length; i++) {
                            //            var id = jobTitles[i].pathname.split("/")[2];
                            //            //点击标签后该Url携带其他条件，再次过滤
                            //            if (id.indexOf("?")) {
                            //                id = id.split("?")[0];
                            //            }
                            var id = $(jobTitles[i]).attr("jobadid");
                            ids.push(parseInt(id));
                        }

                        //判定列表中存在数据
                        if (ids.length > 0) {
                            $.ajax({
                                url: "/Extensions/Widget/GetJobAdditional",
                                data: {
                                    jobAdIds: ids.toString(),
                                    additionalKeys: "extA9000_102054_949224493" //extA900_100102_2063773255
                                },
                                type: "POST",
                                dataType: 'json'
                            }).done(function (resp) {
                                //添加学历列
                                $(".listtable thead .tabletitle th:eq(2)").before('<th class="tableleft">学历</th>');
                                var htmlMap = [];
                                for (var i = 0; i < ids.length; i++) {
                                    var map = { jobadid: ids[i], eduName: '' };
                                    for (var j = 0; j < resp.length; j++) {

                                        if (ids[i] == parseInt(resp[j].JobAdId)) {
                                            map.eduName = jobAdEduMap[resp[j].AdditionaList[0].AdditionaValue];
                                        }
                                    }
                                    htmlMap.push(map);
                                }
                                for (var o = 0; o < htmlMap.length; o++) {
                                    $(".joblsttitle a[jobadid='" + (htmlMap[o].jobadid || '') + "'] ").parent().parent().find("td:eq(2)").before('<td class="tableleft joblsttitle" title="' + htmlMap[o].eduName + '">' + htmlMap[o].eduName + '</td>');
                                }
                            });
                        }
                    }
                </script>
            </div>
        </div>
        <!--module:positionlist end-->
        <!--module:deliverystoredb begin-->
        <div class="bs-module">
            <div class="deliverystoredb-default ">
            </div>
        </div>
        <!--module:deliverystoredb end-->
    </div>
</div>
<div class="footer">
    <span> &copy;2015&nbsp;&nbsp;51talk&nbsp;&nbsp;京ICP备05051632号 京公网安备110108002767号 &nbsp;Powered by&nbsp;<a href="http://www.beisen.com" class="footerlogo" target="_blank"></a></span>
</div>
<script type="text/javascript">
    require([
        vstr('${st}/${version}/cmsportal/skin/js/baiduStatistics.js')

    ]);
</script>
<script type="text/javascript">
    $(function(){
        _splash('zhiye_contentpage',0,104003,'new.zhiye.com');
    });
</script>
</body>
</html>