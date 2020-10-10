<%--
  Created by IntelliJ IDEA.
  User: songc
  Date: 2020/3/19
  Time: 14:01
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Ai健身</title>
    <meta name="renderer" content="webkit" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />
    <%@ include file="../../tags/taglib.jsp"%>
</head>
<style>
    body,html{
        width: 100%;
        height: 100%;
    }

    .img-fram{
        cursor: pointer;
    }

    .img-fram img{
        width: 100%;
        height: 100%;
        object-fit:cover;
    }
    .c-intro {
        display: flex;
        flex-direction: row;
        margin-top: 5px;
    }
    .c-intro .c-title{
        font-size: 14px;
        color: #606060;
        margin-right: auto
    }
    .c-intro .c-time{
        font-size: 12px;
        color: #888888;
        margin-right: 10px;
    }
    .c-intro .c-count{
        font-size: 12px;
        color: #888888;
    }

    .c-rate {
        display: flex;
        flex-direction: row;
        align-items: center;
        text-align: center;
    }

    .c-rate .rate-intro{
        font-size: 12px;
        color: #3B78DD;
        padding-top: 2px;
        margin-right: 8px;
    }

    .c-rate .layui-rate li i.layui-icon{
        font-size: 14px!important;
    }

    .cardele {
        padding-right: 5px;
        border-right: 1px solid #f6f6f6;
        margin-bottom: 15px;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
    }

    .cont-fram{
        padding: 0 4px 0 4px
    }

    .layui-tab-item {
        padding: 10px 5px !important;
    }

    .layui-tab-title li:hover{
        border-bottom: 0.5px solid #5FB878;
        background-color: #f6f6f6;
    }

</style>
<body class="">
    <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="background-color: white;padding: 10px 10px 0 10px">
        <ul class="layui-tab-title">
            <li class="layui-this" lay-id="0">全部</li>
            <li lay-id="1">跑步</li>
            <li lay-id="2">瑜伽</li>
            <li lay-id="3">行走</li>
            <li lay-id="4">球类</li>
            <li lay-id="5">塑型</li>
            <li lay-id="6">减脂</li>
            <li lay-id="7">系列</li>
            <li lay-id="8" class="search">
                <input type="text" placeholder="搜索课程..." autocomplete="off" class="layui-input layui-input-search" layadmin-event="serach" lay-action="template/search.html?keywords=" style="border: none;width: 200px;">
            </li>
        </ul>
        <div class="layui-tab-content" style="">
            <div class="layui-tab-item flow-default layui-show" id="flow0"></div>
            <div class="layui-tab-item flow-default" id="flow1"></div>
            <div class="layui-tab-item flow-default" id="flow2"></div>
            <div class="layui-tab-item flow-default" id="flow3"></div>
            <div class="layui-tab-item flow-default" id="flow4"></div>
            <div class="layui-tab-item flow-default" id="flow5"></div>
            <div class="layui-tab-item flow-default" id="flow6"></div>
            <div class="layui-tab-item flow-default" id="flow7"></div>
            <div class="layui-tab-item flow-default" id="flow8"><span style="color: #d8d8d8">输入课程名，按下回车进行搜索...</span></div>
        </div>
    </div>
</body>
<script>
    layui.use(['element','layer','flow'], function() {
        var $ = layui.jquery
            , layer = layui.layer
            , flow = layui.flow     //流加载
            , element = layui.element;

        //初始流加载
        flow.load({
            elem: '#flow0' //流加载容器
            ,isAuto: false
            ,isLazyimg: true
            ,done: function(page, next){ //加载下一页
                var lis = []
                var res = {};
                res['userId'] = ${param.userId};
                res['classTitle'] = "全部";
                res['page'] = page;
                res['number'] = 12;
                //初始页面请求
                $.ajax({
                    //请求方式
                    type : "POST",
                    contentType: "application/json;charset=UTF-8",
                    url : "${ctx}/courses/getTabClass",
                    data : JSON.stringify(res),
                    datatype:"JSON",
                    success : function(re) {
                        if(re.code=="0"){
                            var list = re.classList;
                            if(list.length>0){
                                for(var i=0;i<list.length;i++){
                                    lis.push('<div class="layui-show-sm-inline-block cardele" style="width: 23%;margin: 0 5px 10px 5px;">\n' +
                                        '                    <div class="img-fram" id="'+list[i].classId+'"style="height: 110px;">\n' +
                                        '                        <img src="'+list[i].classImg+'" alt="">\n' +
                                        '                    </div>\n' +
                                        '                    <div class="cont-fram" style="display: flex;flex-direction: column;padding-left: 5px;padding-bottom: 5px;">\n' +
                                        '                        <div class="c-intro" style="">\n' +
                                        '                            <span class="c-title" style="">'+list[i].className+'</span>\n' +
                                        '                            <div>\n' +
                                        '                                <span class="c-time">'+list[i].classTime+'天</span>\n' +
                                        '                                <span class="c-count">'+list[i].classTrainnumber+'人训练</span>\n' +
                                        '                            </div>\n' +
                                        '                        </div>\n' +
                                        '                        <div class="c-rate">\n' +
                                        '                            <div class="rate-intro">Level：'+list[i].classLevel+'</div>\n' +
                                        '                            <div id="rate1"></div>\n' +
                                        '                            <div class="addClass" data-classid="'+list[i].classId+'" style="margin-left: auto;cursor: pointer">\n' +
                                        '                                <span style="color: #3B78DD;font-size: 12px;">添加计划</span>\n' +
                                        '                                <span class="iconfont iconxiayibu" style="color: #3B78DD;font-size: 12px;"></span>\n' +
                                        '                            </div>\n' +
                                        '                        </div>\n' +
                                        '                    </div>\n' +
                                        '                </div>')
                                }
                            }
                            next(lis.join(''), page < re.pages);
                            $(".img-fram").click(function () {
                                var classId = $(this).attr('id');
                                location.href="${ctx}/courses/inner-intro?classId="+classId+"&userId="+${param.userId};
                            })
                            $(".addClass").click(function () {
                                var classId = $(this).data("classid");
                                var userId = "${param.userId}";
                                var addres = {}
                                {
                                    addres["userId"]=userId;
                                    addres["classId"]=classId;
                                    $.ajax({
                                        type : "POST",
                                        contentType: "application/json;charset=UTF-8",
                                        url : "${ctx}/plan/userSubc",
                                        data : JSON.stringify(addres),
                                        datatype:"JSON",
                                        success : function(re) {
                                            layer.msg(re.msg);
                                        },
                                        error : function(e){
                                            layer.msg("网络开小差了...");
                                        }
                                    });
                                }
                            })
                        }else{
                            layer.msg(res.msg);
                        }
                    },
                    error : function(e){
                        layer.msg('服务器出错');
                    }
                });
            }
        });

        element.on('tab(docDemoTabBrief)', function(elem){
            var layid = $(this).attr('lay-id');
            var text = $(this).text();
            if(layid!=8){
                var elemId = "#flow"+layid
                flow.load({
                    elem: elemId //流加载容器
                    , isAuto: false
                    , isLazyimg: true
                    , done: function (page, next) { //加载下一页
                        var lis = []
                        var res = {}
                        {
                            res['tabId'] = layid;
                            res['classTitle'] = text;
                            res['page'] = page;
                            res['number'] = 12;
                            //求求后台数据
                            $.ajax({
                                //请求方式
                                type : "POST",
                                contentType: "application/json;charset=UTF-8",
                                url : "${ctx}/courses/getTabClass",
                                data : JSON.stringify(res),
                                datatype:"JSON",
                                success : function(re) {
                                    if(re.code=="0"){
                                        var list = re.classList;
                                        if(list.length>0){
                                            for(var i=0;i<list.length;i++){
                                                lis.push('<div class="layui-show-sm-inline-block cardele" style="width: 23%;margin: 0 5px 10px 5px;">\n' +
                                                    '                    <div class="img-fram" id="'+list[i].classId+'" style="height: 110px;">\n' +
                                                    '                        <img src="'+list[i].classImg+'" alt="">\n' +
                                                    '                    </div>\n' +
                                                    '                    <div style="display: flex;flex-direction: column;padding-left: 5px;padding-bottom: 5px;">\n' +
                                                    '                        <div class="c-intro" style="">\n' +
                                                    '                            <span class="c-title" style="">'+list[i].className+'</span>\n' +
                                                    '                            <div>\n' +
                                                    '                                <span class="c-time">'+list[i].classTime+'天</span>\n' +
                                                    '                                <span class="c-count">'+list[i].classTrainnumber+'人训练</span>\n' +
                                                    '                            </div>\n' +
                                                    '                        </div>\n' +
                                                    '                        <div class="c-rate">\n' +
                                                    '                            <div class="rate-intro">Level：'+list[i].classLevel+'</div>\n' +
                                                    '                            <div id="rate1"></div>\n' +
                                                    '                            <div class="addClass" data-classid="'+list[i].classId+'" style="margin-left: auto;cursor: pointer">\n' +
                                                    '                                <span style="color: #3B78DD;font-size: 12px;">添加计划</span>\n' +
                                                    '                                <span class="iconfont iconxiayibu" style="color: #3B78DD;font-size: 12px;"></span>\n' +
                                                    '                            </div>\n' +
                                                    '                        </div>\n' +
                                                    '                    </div>\n' +
                                                    '                </div>')
                                            }
                                        }
                                        next(lis.join(''), page < re.pages);
                                        $(".img-fram").click(function () {
                                            var classId = $(this).attr('id');
                                            location.href="${ctx}/courses/inner-intro?classId="+classId+"&userId="+${param.userId};
                                        })
                                        $(".addClass").click(function () {
                                            var classId = $(this).data("classid");
                                            var userId = "${param.userId}";
                                            var addres = {}
                                            {
                                                addres["userId"]=userId;
                                                addres["classId"]=classId;
                                                $.ajax({
                                                    type : "POST",
                                                    contentType: "application/json;charset=UTF-8",
                                                    url : "${ctx}/plan/userSubc",
                                                    data : JSON.stringify(addres),
                                                    datatype:"JSON",
                                                    success : function(re) {
                                                        layer.msg(re.msg);
                                                    },
                                                    error : function(e){
                                                        layer.msg("网络开小差了...");
                                                    }
                                                });
                                            }
                                        })
                                    }else{
                                        layer.msg(res.msg);
                                    }
                                },
                                error : function(e){
                                    layer.msg('服务器出错');
                                }
                            });
                        }
                    }
                });
            }
        });

        $(".search").keydown(function(event){
            var keyId = event.which;
            if(keyId == 13){    //用户按下enter
                var searchText = $(".search input").val()
                if(searchText==""){
                    layer.msg('未输入任何内容哦...');
                    return false;
                }else{
                    {
                        var searchMapper = {};
                        searchMapper["val"] = searchText;
                        //求求后台数据
                        $.ajax({
                            //请求方式
                            type : "POST",
                            contentType: "application/json;charset=UTF-8",
                            url : "${ctx}/courses/getSearchItems",
                            data : JSON.stringify(searchMapper),
                            datatype:"JSON",
                            success : function(re) {
                                if(re.code=="0"){
                                    var list = re.classList;
                                    if(list.length>0){
                                        $(".layui-show").empty();
                                        for(var i=0;i<list.length;i++){
                                            $(".layui-show").append('<div class="layui-show-sm-inline-block cardele" style="width: 23%;margin: 0 5px 10px 5px;">\n' +
                                                '                    <div class="img-fram" id="'+list[i].classId+'" style="height: 110px;">\n' +
                                                '                        <img src="'+list[i].classImg+'" alt="">\n' +
                                                '                    </div>\n' +
                                                '                    <div style="display: flex;flex-direction: column;padding-left: 5px;padding-bottom: 5px;">\n' +
                                                '                        <div class="c-intro" style="">\n' +
                                                '                            <span class="c-title" style="">'+list[i].className+'</span>\n' +
                                                '                            <div>\n' +
                                                '                                <span class="c-time">'+list[i].classTime+'天</span>\n' +
                                                '                                <span class="c-count">'+list[i].classTrainnumber+'人训练</span>\n' +
                                                '                            </div>\n' +
                                                '                        </div>\n' +
                                                '                        <div class="c-rate">\n' +
                                                '                            <div class="rate-intro">Level：'+list[i].classLevel+'</div>\n' +
                                                '                            <div id="rate1"></div>\n' +
                                                '                            <div style="margin-left: auto;cursor: pointer">\n' +
                                                '                                <span style="color: #3B78DD;font-size: 12px;">添加计划</span>\n' +
                                                '                                <span class="iconfont iconxiayibu" style="color: #3B78DD;font-size: 12px;"></span>\n' +
                                                '                            </div>\n' +
                                                '                        </div>\n' +
                                                '                    </div>\n' +
                                                '                </div>')
                                        }
                                    }else{
                                        $(".layui-show").empty();
                                        $(".layui-show").append('<span style="color: #d8d8d8">没有搜索到任何课程哦...</span>');
                                    }
                                    $(".img-fram").click(function () {
                                        var classId = $(this).attr('id');
                                        location.href="${ctx}/courses/inner-intro?classId="+classId+"&userId="+${param.userId};
                                    })
                                }else{
                                    layer.msg(res.msg);
                                }
                            },
                            error : function(e){
                                layer.msg('服务器出错');
                            }
                        });
                    }
                }
            }
        });
    });
</script>
</html>
