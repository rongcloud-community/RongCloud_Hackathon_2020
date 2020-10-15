<%@ page contentType="text/html; charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="keywords" content="">
    <meta name="description" content="">
    <meta property="qc:admins" content="" />
    <title>榴莲游戏平台</title>
    <link rel="shortcut icon" href="public/images/logo.ico">
    <link href="public/css/base.css" type="text/css" rel="stylesheet">
    <link href="public/css/nivo-slider.css" type="text/css" rel="stylesheet">
    <link href="public/css/index.css" type="text/css" rel="stylesheet">
</head>
<body class="body">
<!-- 欢迎tag -->
<div class="t_nav">
    <div class="layout clearfix c_nav">
        <div class="t_nav_l">
            <a href="index.html">欢迎来到榴莲游戏平台</a>  <!--| <a href="index.php?ac=kefu" >客服中心</a> | <a href="index.php?ac=app" >APP客户端--></a>
        </div>
        <!--<div class="t_nav_r">
            <a href="javascript:void(0)">登录</a> | <a href="javascript:void(0)">注册</a>
        </div>-->
    </div>
</div>
<!-- logo 菜单 -->
<div class="menu_logo">
    <div class="layout">
        <div class="logo"><a href="index.html"><img src="public/images/logo.png" alt="logo"></a></div>
        <ul class="nav_list">
            <li><a href="/index">首页</a></li>
            <li><a href="/game">腾讯游戏</a></li>
            <li><a href="/game">精品游戏</a></li>
            <li><a class="cur">游戏讨论</a></li>
            <li><a href="/news">资讯攻略</a></li>
        </ul>
    </div>
</div>
<!-- 主内容部分 -->
<div class="main top">
    <!-- 推荐展示区 -->
    <div class="container">
        <!-- 大图区域 -->
        <ul class="big-area clearfix">
            <li>
                <a><img src="public/images/container/c1.jpg" alt="幻斗英雄">
                    <div class="container_cover"></div>
                    <div class="container_hover">
                        <h2>幻斗英雄</h2>
                        <p>幻斗英雄》是一款以幻想为题材的角色扮演类手机网络游戏</p>
                        <div class="container_b" data-id="hdyx"><span>加入讨论</span></div>
                    </div>
                    <div class="container_con">
                        <h2>幻斗英雄</h2>
                    </div>
                </a>
            </li>
            <li>
                <a><img src="public/images/container/c2.jpg" alt="决战光明顶">
                    <div class="container_cover"></div>
                    <div class="container_hover">
                        <h2>决战光明顶</h2>
                        <p>《九阴真经决战光明顶》（简称《九阴决战》）是基于蜗牛第一武侠IP“九阴真经”精心自研的MMORPG手游产品，作为“九阴真经IP”系列的全新产品，《九阴决战》以武林纷争为主题，主打超大规模武侠团战强PK的核心玩法，为广大武侠游戏玩家呈现一个充满江湖恩怨与势力斗争的热血武侠世界。流畅的打击感，超大场景，恩仇江湖，肆意挥洒快意人生，全服势力对战、流畅的千人同屏实时对战，为你带来不同于以往的武侠游戏体验。</p>
                        <div class="container_b" data-id="jzgmd"><span>加入讨论</span></div>
                    </div>
                    <div class="container_con">
                        <h2>决战光明顶</h2>
                    </div>
                </a>
            </li>
            <li>
                <a><img src="public/images/container/c3.jpg" alt=" 啪啪三国">
                    <div class="container_cover"></div>
                    <div class="container_hover">
                        <h2> 啪啪三国</h2>
                        <p>啪啪三国是一款3D卡牌策略游戏，以气势恢宏的3D即时战场为最大特色，战场可容纳近千名士兵同屏厮杀，玩家可以体验到移动端游戏从未有过的史诗战斗！</p>
                        <div class="container_b" data-id="ppsg"><span>加入讨论</span></div>
                    </div>
                    <div class="container_con">
                        <h2> 啪啪三国</h2>
                    </div>
                </a>
            </li>
            <li>
                <a><img src="public/images/container/c4.jpg" alt="斩魔无双（安卓+IOS">
                    <div class="container_cover"></div>
                    <div class="container_hover">
                        <h2>斩魔无双（安卓+IOS</h2>
                        <p>《斩魔无双》是一款横版动作格斗类手游的先锋之作。三国硝烟既起，玩家将置身其中，体验三大职业、数十种技能、数百关卡，淋漓战斗，领略超畅快打击感。更有原汁原味的中国风高清画质，波澜壮阔的三国史诗尽在方寸之间。游戏目前推出了iOS、Android等多个版本，支持Wifi、3G、2G等多种网络环境，指尖华丽，随心畅玩！</p>
                        <div class="container_b" data-id="zmws"><span>加入讨论</span></div>
                    </div>
                    <div class="container_con">
                        <h2>斩魔无双（安卓+IOS</h2>
                    </div>
                </a>
            </li>
        </ul>
</div>
</body>
<!-- jquery  -->
<script type="text/javascript" src="public/js/jquery/jquery-1.4.2.min.js"></script>
<!-- banner  -->
<script type="text/javascript"  src="public/js/jquery/slider.js"></script>
<!-- 模板引擎  -->
<script type="text/javascript" src="public/js/jquery/template.js"></script>
<!-- 界面  -->
<script type="text/javascript" src="public/js/common.js"></script>
<script type="text/javascript" src="public/js/data/index.js"></script>
<script>

    $(".container_b").click(function () {
        var userid = '${param.userId}'
        var reg = {}
        reg['userid'] = userid
        var roomId = $(this).data('id')
        $.ajax({
            type : "POST",
            contentType: "application/json;charset=UTF-8",
            url : "${ctx}/adam/getToken",
            data: JSON.stringify(reg),
            datatype:"JSON",
            success : function(re) {
                var tokenresult = re.tokenResult
                if(tokenresult){
                    location.href="${ctx}/chat?userId="+userid+"&token="+tokenresult+"&roomId="+roomId
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

</html>