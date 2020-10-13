<%--
  Created by IntelliJ IDEA.
  User: songc
  Date: 2020/3/17
  Time: 14:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Klivexer健身</title>
    <meta name="renderer" content="webkit" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />
    <%@ include file="../tags/taglib.jsp"%>
</head>
<style>

    body html{
        background-color: #f2f2f2;
    }

    .layui-nav .layui-nav-more{
        color: black;!important;
    }
    .layui-tab {
        margin: 0;!important;

    }
    .layui-tab .layui-tab-title{
        height: 40px;
        line-height: 40px;
        background-color: #fff;
        box-sizing: border-box;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
    }

    .layui-body li{
        min-width: 0;
        line-height: 40px;
        max-width: 160px;
        text-overflow: ellipsis;
        overflow: hidden;
        border-right: 1px solid #f6f6f6;
        vertical-align: top;
    }

    .layui-body li:hover{
        min-width: 0;
        line-height: 40px;
        max-width: 160px;
        text-overflow: ellipsis;
        overflow: hidden;
        border-right: 1px solid #f6f6f6;
        vertical-align: top;
        background-color: #f2f2f2;
        border-top: 4px solid #5FB878;
    }

    .layui-body .layui-this {
        min-width: 0;
        line-height: 40px;
        max-width: 160px;
        text-overflow: ellipsis;
        overflow: hidden;
        border-right: 1px solid #f6f6f6;
        vertical-align: top;
        background-color: #f2f2f2;
        border-top: 4px solid #5FB878;
    }

    .layui-tab-title li:first-child .layui-tab-close{
        display: none;
    }

    .home{
        cursor: pointer;
        border: 1px solid #FAFAFA
    }

    .home:hover{
        background-color: #f6f6f6;
        border-top: 1px solid #5FB878;
    }
    .layui-tab-item.layui-show {
        width: 100%;
        height: 100%;
    }


</style>
<body class="layui-layout-body">
<div class="layui-layout layui-layout-admin">
    <div class="layui-header" style="background-color: white;border-bottom: 1px solid #f6f6f6;">
        <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
        <div class="layui-logo layui-bg-black" style="font-size: 22px;color: white;border-bottom: 1px solid #333">
            <span class="logo-text">AiHome</span>
            <span class="iconfont iconhuo" style="display: none"></span>
        </div>
        <!-- 头部区域（可配合layui已有的水平导航） -->
        <ul class="layui-nav layui-layout-left" style="color: black">
            <li class="layui-nav-item kit-side-fold" ><span class="iconfont iconliebiao" style="margin: 0 10px 0 10px"></span></li>
            <li class="layui-nav-item"><a data-url="${ctx}/courses/inner-recomm" data-id="1" data-title="推荐课程" class="site-demo-active" href="#"><span class="iconfont iconkecheng" style="color: black;"></span></a></li>
            <li class="layui-nav-item"><a data-url="${ctx}/padding/pad-userinfo" data-id="11" data-title="我的信息" class="site-demo-active" href="#"><span class="iconfont icongai" style="color: black"></span></a></li>
            <li class="layui-nav-item" class="site-demo-active" id="video_test"><a><span class="iconfont iconshexiangtou" style="color: black"></span></a></li>
            <li class="layui-nav-item" style="color: black;cursor: pointer">
                <a data-url="${ctx}/padding/pad-food" data-id="8" data-title="饮食推荐" class="site-demo-active"><span class="iconfont iconyinshi" style="color: black"></span></a>
            </li>
<%--            <li class="layui-nav-item" style="color: black">--%>
<%--                <input type="text" placeholder="搜索..." autocomplete="off" class="layui-input layui-input-search" layadmin-event="serach" lay-action="template/search.html?keywords=" style="border: none">--%>
<%--            </li>--%>
        </ul>
        <ul class="layui-nav layui-layout-right" style="color: black">
            <li class="layui-nav-item" style="margin: 0 10px 0 10px;width: 50px;text-align: center;cursor: pointer;">
                <span id="refresh" class="iconfont iconshuaxin"></span>
            </li>
            <li class="layui-nav-item" >
                <a href="https://www.gotokeep.com/" style="color: black">keep社区</a>
                <span class="layui-badge-dot"></span>
            </li>
            <li class="layui-nav-item">
                <a id="userinfo" href="javascript:;" style="color: black">
<%--                    <img id="nav_img" src="http://thirdqq.qlogo.cn/g?b=sdk&k=BIkBO4r9yiapkC0YGjekepg&s=140&t=1583231162" class="layui-nav-img">--%>
                    <img id="nav_img" src="" class="layui-nav-img">
                </a>
                <dl class="layui-nav-child">
                    <dd><a data-url="${ctx}/padding/pad-userinfo" data-id="21" data-title="我的信息" class="site-demo-active" >基本资料</a></dd>
<%--                    <dd><a>账户管理</a></dd>--%>
                </dl>
            </li>
            <li class="layui-nav-item"><a href="${ctx}/main/signOut">
                <span class="iconfont icontuichu" style="color: black"></span>
            </a></li>
        </ul>

    </div>

    <div class="layui-side layui-bg-black">
        <div class="layui-side-scroll">
            <ul class="layui-nav layui-nav-tree"  lay-filter="test">
                <li class="layui-nav-item layui-nav-itemed">
                    <a class="" href="javascript:;">
                        <span class="iconfont iconkecheng" style="padding-right: 10px;"></span>
                        <span class="ttags">精品课程</span></a>
                    <dl class="layui-nav-child">
                        <dd class="layui-this"><a data-url="${ctx}/courses/inner-recomm" data-id="1" data-title="推荐课程" class="site-demo-active" href="#"><span class="ttags">推荐课程</span></a></dd>
                        <dd><a data-url="${ctx}/courses/inner-allc" data-id="2" data-title="全部课程" class="site-demo-active" href="#"><span class="ttags">全部课程</span></a></dd>
                    </dl>
                </li>
                <li class="layui-nav-item">
                    <a href="javascript:;"><span class="iconfont iconxunlian1" style="padding-right: 10px;font-size: 18px; "></span>
                        开始训练</a>
                    <dl class="layui-nav-child">
                        <dd><a data-url="${ctx}/plan/start" data-id="3" data-title="我的计划" class="site-demo-active" href="javascript:;"><span class="ttags">我的计划</span></a></dd>
                        <dd><a data-url="${ctx}/plan/start-pose" data-id="4" data-title="姿态校准" class="site-demo-active" href="javascript:;"><span class="ttags">姿态校准</span></a></dd>
                    </dl>
                </li>
                <li class="layui-nav-item">
                    <a href="javascript:;"><span class="iconfont iconjiaoliu" style="padding-right: 10px;"></span>
                        圈子交流</a>
                    <dl class="layui-nav-child">
                        <dd><a data-url="${ctx}/circle" data-id="5" data-title="推荐交流" class="site-demo-active" href="javascript:;"><span class="ttags">推荐交流</span></a></dd>
                        <dd><a data-url="${ctx}/circle/upload" data-id="6" data-title="圈子发布" class="site-demo-active" href="javascript:;"><span class="ttags">圈子发布</span></a></dd>
                        <dd><a data-url="${ctx}/circle/classCircle" data-id="12" data-title="课程交流" class="site-demo-active" href="javascript:;"><span class="ttags">课程交流</span></a></dd>
                    </dl>
                </li>
                <li class="layui-nav-item">
                    <a href="javascript:;"><span class="iconfont icontongji" style="padding-right: 10px;"></span>
                        <span class="ttags">数据统计</span></a>
                    <dl class="layui-nav-child">
                        <dd><a data-url="${ctx}/padding/pad-statistics" data-id="7" data-title="周数据一览" class="site-demo-active" class="site-demo-active" href="javascript:;"><span class="ttags">周数据一览</span></a></dd>
                    </dl>
                </li>
<%--                <li class="layui-nav-item">--%>
<%--                    <a href="javascript:;"><span class="iconfont iconyinshi" style="padding-right: 10px;"></span>--%>
<%--                        饮食指北</a>--%>
<%--                    <dl class="layui-nav-child">--%>
<%--                        <dd><a data-url="${ctx}/padding/pad-food" data-id="8" data-title="饮食推荐" class="site-demo-active" href="javascript:;"><span class="ttags">饮食推荐</span></a></dd>--%>
<%--                        <dd><a data-url="${ctx}/padding/pad-foodku" data-id="9" data-title="食物库" class="site-demo-active" href="javascript:;"><span class="ttags">食物库</span></a></dd>--%>
<%--                        <dd><a data-url="${ctx}/padding/pad-select" data-id="11" data-title="我要推荐" class="site-demo-active" href="javascript:;"><span class="ttags">我要推荐</span></a></dd>--%>
<%--                    </dl>--%>
<%--                </li>--%>
                <li class="layui-nav-item">
                    <a data-url="http://baidu.com" data-id="10" data-title="百度一下" class="site-demo-active" href="javascript:;"><span class="iconfont iconbaidu" style="padding-right: 10px;"></span>
                        站内搜索</a>
                </li>
            </ul>
        </div>
    </div>



    <div class="layui-body" style="background-color:#F2F2F2; ">
        <div class="layui-tab" lay-filter="demo" lay-allowclose="true" style="width: 100%;">
            <ul class="layui-tab-title" style="background-color: white">
                <li lay-id="1" class="home layui-this"><i class="layui-icon layui-icon-home"></i></li>
            </ul>
            <div class="layui-tab-content" style=";width: 100%;height: 100%;">
                <div class="layui-tab-item layui-show">
                    <iframe data-frameid="1" src="/Klive/courses/inner-recomm?userId=${param.userId}" width="100%" height="100%" frameborder="0" style=""></iframe>
                </div>
            </div>
        </div>
    </div>

    <div class="layui-footer" style="color: #666666">
        Copyright © 2020-2021 浙江大学软件学院<strong>415工作室</strong>:Songcd2019@163.com
    </div>
</div>
<script>
    $(document).ready(function(){
        $('.layui-tab').css("height",($(".layui-body").height()-$(".layui-footer").height()-18))
    })
    //JavaScript代码区域
    layui.use(['layer','element'], function(){
        var $ = layui.jquery
        var element = layui.element;
        var layer = layui.layer;
        //获取用户数据
        var loginpre = {};
        loginpre["userId"] = "${param.userId}";
        $.ajax({
            //请求方式
            type : "POST",
            contentType: "application/json;charset=UTF-8",
            url : "${ctx}/main/getUserInfo",
            data : JSON.stringify(loginpre),
            datatype:"JSON",
            success : function(re) {
                if(re.code=="0"){
                    var userEnroll = re.userEnroll
                    $("#userinfo").append(userEnroll.userName);
                    if(userEnroll.userAva==""||userEnroll.userAva==null||userEnroll.userAva=="undefined"){
                        $("#nav_img").attr('src','${ctx}/images/nav/nav_boy.png')
                    }else{
                        $("#nav_img").attr('src','${ctx}/images/nav/'+userEnroll.userAva)
                    }
                }
            },
            error : function(e){
                layer.msg('服务器出错');
            }
        });

        //触发事件
        var active = {
            tabAdd: function(url,id,name){
                //新增一个Tab项
                element.tabAdd('demo', {
                    title: name
                    ,content: '<iframe  data-frameid="'+id+'" src="'+url+'" width="100%" height="100%" frameborder="0" style=""></iframe>'
                    ,id: id
                })
            }
            ,tabDelete: function(id){
                //删除指定Tab项
                element.tabDelete('demo', id); //删除：“商品管理”
            }
            ,tabChange: function(id){
                //切换到指定Tab项
                element.tabChange('demo', id); //切换到：用户管理
            }
        };
        $('.site-demo-active').on('click', function() {
            var dataid = $(this);
            //这时会判断右侧.layui-tab-title属性下的有lay-id属性的li的数目，即已经打开的tab项数目
            if ($(".layui-tab-title li[lay-id]").length <= 0) {
                //如果比零小，则直接打开新的tab项
                active.tabAdd(dataid.attr("data-url")+"?userId="+${param.userId}, dataid.attr("data-id"),dataid.attr("data-title"));
            } else {
                //否则判断该tab项是否以及存在

                var isData = false; //初始化一个标志，为false说明未打开该tab项 为true则说明已有
                $.each($(".layui-tab-title li[lay-id]"), function () {
                    //如果点击左侧菜单栏所传入的id 在右侧tab项中的lay-id属性可以找到，则说明该tab项已经打开
                    if ($(this).attr("lay-id") == dataid.attr("data-id")) {
                        isData = true;
                    }
                })
                if (isData == false) {
                    //标志为false 新增一个tab项
                    active.tabAdd(dataid.attr("data-url")+"?userId="+${param.userId}, dataid.attr("data-id"),dataid.attr("data-title"));
                }
            }
            //最后不管是否新增tab，最后都转到要打开的选项页面上
            active.tabChange(dataid.attr("data-id"));
        });
        $("#video_test").click(function () {
            //测试浏览器摄像头
            if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                layer.open({
                    type: 1
                    ,title: false //不显示标题栏
                    ,closeBtn: false
                    ,area: '300px;'
                    ,shade: 0.8
                    ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
                    ,btn: ['确定']
                    ,btnAlign: 'c'
                    ,moveType: 1 //拖拽模式，0或者1
                    ,content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">浏览器无法打开摄像头！请更换浏览器或安装相应插件...</div>'
                });
            }else {
                layer.open({
                    type: 1
                    ,title: false //不显示标题栏
                    ,closeBtn: false
                    ,area: '300px;'
                    ,shade: 0.8
                    ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
                    ,btn: ['确定']
                    ,btnAlign: 'c'
                    ,moveType: 1 //拖拽模式，0或者1
                    ,content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">摄像头已被该浏览器支持</div>'
                });
            }
        })
        $("#refresh").click(function () {
            var src=$(".layui-tab-item.layui-show").find("iframe").attr("src");
            $(".layui-tab-item.layui-show").find("iframe").attr("src",src);
        })
    });

    var isShow = true;  //定义一个标志位
    $('.kit-side-fold').click(function(){
        //选择出所有的span，并判断是不是hidden
        $('.ttags').each(function(){
            if($(this).is(':hidden')){
                $(this).show();
            }else{
                $(this).hide();
            }
        });
        //判断isshow的状态
        if(isShow){
            $('.layui-side.layui-bg-black').width(60); //设置宽度
            $('.layui-logo').width(60);
            $('.layui-layout-left').css('left', 60+'px')
            $('.layui-nav-tree span').css('margin-right', '70%');  //修改图标的位置
            //将footer和body的宽度修改
            $('.layui-body').css('left', 60+'px');
            $('.layui-footer').css('left', 60+'px');
            //将二级导航栏隐藏
            $('dd').each(function(){
                $(this).hide(200,"linear");
            });
            $('.logo-text').hide(function () {});
            $('.iconhuo').show()
            $('.layui-nav-tree .layui-nav-more').each(function(){
                $(this).hide(200,"linear");
            });
            //修改标志位
            isShow =false;
        }else{
            $('.layui-side.layui-bg-black').width(200);
            $('.layui-logo').width(200);
            $('.layui-layout-left').css('left', 200+'px')
            $('.layui-nav-tree span').css('margin-right', '1%');
            $('.layui-body').css('left', 200+'px');
            $('.layui-footer').css('left', 200+'px');
            $('dd').each(function(){
                $(this).show(200,"linear");
            });
            $('.layui-nav-tree .layui-nav-more').each(function(){
                $(this).show(200,"linear");
            });
            $('.logo-text').show(function () { });
            $('.iconhuo').hide()
            isShow =true;
        }
    });
</script>
</body>
</html>