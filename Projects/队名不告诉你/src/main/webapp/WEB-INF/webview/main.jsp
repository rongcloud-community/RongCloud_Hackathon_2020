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
            var img = new Image;
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
    <title>首页</title>
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
                        <li><a class="loginlink" href="/Portal/Account/Login?returnUrl=%2Fhome"> <span>登录</span> </a></li>
                        <li><a class="reglink" href="/Portal/Account/Register?returnUrl=%2Fhome"><span> 注册</span></a></li>
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
                <li><a target="_self" href="/index" class="current">首页</a> </li>
                <li><a target="_self" href="/jobs" class="">全部职位</a> </li>
                <li><a target="_self" href="/social" class="">社会招聘</a> </li>
                <li><a target="_self" href="/jobs" class="">校园招聘</a> </li>
                <li><a target="_self" href="/jobs" class="">实习生招聘</a> </li>
                <li><a target="_self" href="/about" class="">公司介绍</a> </li>
                <li><a target="_self" class="doChat">联系我们</a> </li>
            </ul>
        </div>
    </div>
    <!--module:menu end-->
</div>
<div class="pictureturn">
    <!--module:imageslider begin-->
    <div class="bs-module">
        <div class="imageslider-default ">
            <div class="flexslider">
                <ul class="slides">
                    <li> <img src="images/104003_medias_2015923_201592317513947.jpg" /> </li>
                </ul>
            </div>
            <script type="text/javascript">
                $(document).ready(function(){
                    $('.flexslider').flexslider({ animation: "fade", directionNav: false, slideshowSpeed: 5000 });
                });
            </script>
        </div>
    </div>
    <!--module:imageslider end-->
</div>
<div class="contain clearfix">
    <div class="clearfix eheight">
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
                            <input type="hidden" name="p" value="" id="jobAdClassHidden" />
                            <tbody>
                            <tr class="serchjob">
                                <td class="listtitle">工作地点：</td>
                                <td>
                                    <ul class="workplace">
                                        <span class="selectall"><span class="shuxian"></span><a href="/search?r=&amp;p=&amp;c=-1&amp;d=&amp;k=#jlt" class="chooseon" title="全部">全部</a></span>
                                        <li> <span class="shuxian"></span> <a href="/search?r=&amp;p=&amp;c=1&amp;d=&amp;k=#jlt" title="全国">全国</a> </li>
                                        <li> <span class="shuxian"></span> <a href="/search?r=&amp;p=&amp;c=1100&amp;d=&amp;k=#jlt" title="北京市">北京市</a> </li>
                                        <li> <span class="shuxian"></span> <a href="/search?r=&amp;p=&amp;c=1103&amp;d=&amp;k=#jlt" title="海淀区">海淀区</a> </li>
                                        <li> <span class="shuxian"></span> <a href="/search?r=&amp;p=&amp;c=3100&amp;d=&amp;k=#jlt" title="上海市">上海市</a> </li>
                                        <li> <span class="shuxian"></span> <a href="/search?r=&amp;p=&amp;c=3102&amp;d=&amp;k=#jlt" title="徐汇区">徐汇区</a> </li>
                                        <li> <span class="shuxian"></span> <a href="/search?r=&amp;p=&amp;c=8100&amp;d=&amp;k=#jlt" title="香港">香港</a> </li>
                                    </ul> </td>
                            </tr>
                            <input type="hidden" name="p" value="" id="jobAdClassHidden" />
                            <input type="hidden" name="p" value="" id="jobAdClassHidden" />
                            <tr class="serchjob">
                                <td class="listtitle" title="职位类型">职位类型：</td>
                                <td>
                                    <ul class="workplace">
                                        <span class="selectall"><span class="shuxian"></span><a href="/search?r=&amp;p=1^-1&amp;c=&amp;d=&amp;k=#jlt" class="chooseon" title="全部">全部</a></span>
                                        <li> <span class="shuxian"></span> <a href="/search?r=&amp;p=1^20&amp;c=&amp;d=&amp;k=#jlt" title="北京">北京</a> </li>
                                        <li> <span class="shuxian"></span> <a href="/search?r=&amp;p=1^9&amp;c=&amp;d=&amp;k=#jlt" title="上海">上海</a> </li>
                                    </ul> </td>
                            </tr>
                            <input type="hidden" name="p" value="" id="jobAdClassHidden" />
                            <tr class="serchjob">
                                <td class="listtitle">发布时间：</td>
                                <td>
                                    <ul class="workplace">
                                        <span class="selectall"><span class="shuxian"></span><a href="/search?r=&amp;p=&amp;c=&amp;d=-1&amp;k=#jlt" class="chooseon">全部</a></span>
                                        <li> <span class="shuxian"></span> <a href="/search?r=&amp;p=&amp;c=&amp;d=3&amp;k=#jlt" title="三天内">三天内</a> </li>
                                        <li> <span class="shuxian"></span> <a href="/search?r=&amp;p=&amp;c=&amp;d=7&amp;k=#jlt" title="一周内">一周内</a> </li>
                                        <li> <span class="shuxian"></span> <a href="/search?r=&amp;p=&amp;c=&amp;d=30&amp;k=#jlt" title="一个月内">一个月内</a> </li>
                                        <li> <span class="shuxian"></span> <a href="/search?r=&amp;p=&amp;c=&amp;d=90&amp;k=#jlt" title="三个月内">三个月内</a> </li>
                                        <li> <span class="shuxian"></span> <a href="/search?r=&amp;p=&amp;c=&amp;d=180&amp;k=#jlt" title="半年内">半年内</a> </li>
                                    </ul> </td>
                            </tr>
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
                            location.href = "/search" + "?r=" + r + "&p=" + p + "&c=" + c + "&d=" + d + "&k=" + k + '#jlt';
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
    <!--module:jobstab begin-->
    <div class="bs-module">
        <div class="jobstab-default ">
            <div class="zhiweiliebiao">
                <div class="listnav">
                    <ul>
                        <li><a href="javascript:void(0)" class="listchooseon" id="hotjob">热招职位</a></li>
                        <li><a href="javascript:void(0)" id="longjob">长招职位</a></li>
                    </ul>
                    <a href="javascript:void(0)" class="listmorelinks">更多&gt;&gt;</a>
                </div>
                <div class="listlinks">
                    <ul id="ulhotjob">
                        <li><a href="detail.html?620025388" id="620025388" title="业务培训总监/区域培训总监 /销售运 营总监">业务培训总监/区域培训总监 /销售运 营...</a></li>
                        <li><a href="detail.html?620025249" id="620025249" title="学术总监">学术总监</a></li>
                        <li><a href="detail.html?620025245" id="620025245" title="PTD 助教总监">PTD 助教总监</a></li>
                        <li><a href="detail.html?620025239" id="620025239" title="CRD 客服总监">CRD 客服总监</a></li>
                        <li><a href="detail.html?620023569" id="620023569" title="高级销售培训师">高级销售培训师</a></li>
                        <li><a href="detail.html?620021683" id="620021683" title="销售培训师">销售培训师</a></li>
                        <li><a href="detail.html?620021671" id="620021671" title="PHP开发工程师">PHP开发工程师</a></li>
                        <li><a href="detail.html?620021666" id="620021666" title="销售经理">销售经理</a></li>
                        <li><a href="detail.html?620021663" id="620021663" title="web前端开发工程师">web前端开发工程师</a></li>
                        <li><a href="detail.html?620021668" id="620021668" title="销售培训经理">销售培训经理</a></li>
                    </ul>
                    <ul id="ullongjob">
                        <li><a href="detail.html?620025388" id="620025388" title="业务培训总监/区域培训总监 /销售运 营总监">业务培训总监/区域培训总监 /销售运 营...</a></li>
                        <li><a href="detail.html?620025249" id="620025249" title="学术总监">学术总监</a></li>
                        <li><a href="detail.html?620025245" id="620025245" title="PTD 助教总监">PTD 助教总监</a></li>
                        <li><a href="detail.html?620025239" id="620025239" title="CRD 客服总监">CRD 客服总监</a></li>
                        <li><a href="detail.html?620021683" id="620021683" title="销售培训师">销售培训师</a></li>
                        <li><a href="detail.html?620021671" id="620021671" title="PHP开发工程师">PHP开发工程师</a></li>
                        <li><a href="detail.html?620021666" id="620021666" title="销售经理">销售经理</a></li>
                        <li><a href="detail.html?620021663" id="620021663" title="web前端开发工程师">web前端开发工程师</a></li>
                        <li><a href="detail.html?620021668" id="620021668" title="销售培训经理">销售培训经理</a></li>
                        <li><a href="detail.html?620021669" id="620021669" title="市场运营">市场运营</a></li>
                    </ul>
                    <ul id="ulfirst">
                        <li><a href="detail.html?620025388" id="620025388" title="业务培训总监/区域培训总监 /销售运 营总监">业务培训总监/区域培训总监 /销售运 营...</a></li>
                        <li><a href="detail.html?620025249" id="620025249" title="学术总监">学术总监</a></li>
                        <li><a href="detail.html?620025245" id="620025245" title="PTD 助教总监">PTD 助教总监</a></li>
                        <li><a href="detail.html?620025239" id="620025239" title="CRD 客服总监">CRD 客服总监</a></li>
                        <li><a href="detail.html?620023617" id="620023617" title="高级招聘专员">高级招聘专员</a></li>
                        <li><a href="detail.html?620023569" id="620023569" title="高级销售培训师">高级销售培训师</a></li>
                        <li><a href="detail.html?620023310" id="620023310" title="体验店-课程顾问">体验店-课程顾问</a></li>
                        <li><a href="detail.html?620023282" id="620023282" title="TMK电话邀约客服">TMK电话邀约客服</a></li>
                        <li><a href="detail.html?620023232" id="620023232" title="代理商培训师">代理商培训师</a></li>
                        <li><a href="detail.html?620021683" id="620021683" title="销售培训师">销售培训师</a></li>
                    </ul>
                </div>
            </div>
            <script type="text/javascript">
                $(function() {
                    loadData();

                    function loadData() {
                        $(".listlinks ul").each(function() {
                            $(this).hide();
                        })
                        if ($(".listchooseon").attr("id") == "hotjob") {
                            $("#ulhotjob").show();
                        } else if ($(".listchooseon").attr("id") == "longjob") {
                            $("#ullongjob").show();
                        } else {

                            var chooseId = $(".listchooseon").attr("id");
                            chooseId = "#ul" + chooseId;
                            $(chooseId).show();

                        }
                    }

                    $(".listnav ul li a").hover(function() {
                        $(this).parents("ul").find("a").removeClass("listchooseon");
                        $(this).addClass("listchooseon");
                        $(".listlinks ul").each(function() {
                            $(this).hide();
                        })
                        if ($(this).attr("id") == "hotjob") {
                            $("#ulhotjob").show();
                        } else if ($(this).attr("id") == "longjob") {
                            $("#ullongjob").show();
                        } else {

                            var chooseId = $(".listchooseon").attr("id");
                            chooseId = "#ul" + chooseId;
                            $(chooseId).show();
                        }

                    });

                    $(".listmorelinks").click(function() {
                        if ($(".listchooseon").attr("id") == "hotjob") {
                            window.location.href = "allJob?o=" + 2;
                        } else if ($(".listchooseon").attr("id") == "longjob") {
                            window.location.href = "allJob?o=" + 1;
                        } else {

                            var chooseId = $(".listchooseon").attr("id");
                            if (chooseId.indexOf("first") != -1) {
                                chooseId = chooseId.substr(5, chooseId.length - 5);
                                window.location.href = "allJob?p=" + "1^" + chooseId;
                            } else if (chooseId.indexOf("Third") != -1) {
                                chooseId = chooseId.substr(5, chooseId.length - 5);
                                window.location.href = "allJob?p=" + "3^" + chooseId;
                            }

                        }
                    });




                });
            </script>
        </div>
    </div>
    <!--module:jobstab end-->
    <!--module:customerimage begin-->
    <div class="bs-module">
        <div class="customerimage-default ">
            <div class="imgplace zx_imgplace">
                <a href="http://weibo.com/5284689161/profile?topnav=1&amp;wvr=6" target="_blank" class="cusimglink"><img src="images/104003_medias_2015630_2015630141029143.jpg" class="cusimg" /></a>
            </div>
        </div>
    </div>
    <!--module:customerimage end-->
</div>
<div class="footer">
    <span> &copy;2015&nbsp;&nbsp;51talk&nbsp;&nbsp;京ICP备05051632号 京公网安备110108002767号 &nbsp;Powered by&nbsp;<a href="http://www.beisen.com" class="footerlogo" target="_blank"></a> </span>
</div>
<script type="text/javascript">
    require([
        vstr('${st}/${version}/cmsportal/skin/js/baiduStatistics.js')

    ]);
</script>
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
                if(tokenresult){
                    location.href="${ctx}/chat?userId="+reg['userid']+"&token="+tokenresult+"&roomId=room13241"
                }else{
                    alert(re)
                }
            },
            error : function(re){
                alert(re)
            }
        });
    })
</script>
</body>
</html>