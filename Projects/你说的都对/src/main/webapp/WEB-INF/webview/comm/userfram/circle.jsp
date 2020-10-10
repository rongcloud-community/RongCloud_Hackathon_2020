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
        overflow-x: hidden;
    }
    .img-user-fram{
        width: 100%;
        margin-top: 5px;
    }

    .img-user-fram img{
        width: 32%;
        height: 80px;
        object-fit:cover;
        margin-top: 4px;
    }
    .layui-tab-title li:hover{
        border-bottom: 0.5px solid #5FB878;
        background-color: #f6f6f6;
    }
    .head-tags{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .head-tags .iconfont{
        font-size: 18px;
    }

    .head-tags .icontext{
        color: #888888;
        font-size: 12px;
        margin-left: 5px;
    }
    .iconcont {
        font-size: 18px;
        color: #909090;
        margin-top: 4px;
    }

    .conCont{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

</style>
<body class="">
<div class="layui-row layui-col-space15">
    <div class="layui-col-md9">
        <div class="layui-tab layui-tab-brief" lay-filter="content" style="background-color: white;padding: 10px 10px 0 10px">
            <ul class="layui-tab-title">
                <li class="layui-this" lay-id="0">热门</li>
                <li lay-id="1">关注</li>
                <li lay-id="2">我的</li>
                <li lay-id="3" class="search">
                    <input type="text" placeholder="搜索用户..." autocomplete="off" class="layui-input layui-input-search" layadmin-event="serach" lay-action="template/search.html?keywords=" style="border: none;width: 200px;">
                </li>
            </ul>
            <div class="layui-tab-content" style="">
                <div class="layui-tab-item contfram layui-show" style="width: 100%;">
                    <div class="layui-row layui-col-space15 flow-default conitems0" id="flow0"></div>
                </div>
                <div class="layui-tab-item contfram">
                    <div class="layui-row layui-col-space15 flow-default conitems1" id="flow1"></div>
                </div>
                <div class="layui-tab-item contfram">
                    <div class="layui-row layui-col-space15 flow-default conitems2" id="flow2"></div>
                </div>
                <div class="layui-tab-item contfram"><span style="color: #d8d8d8">搜索用户名或发表内容...</span></div>
            </div>
        </div>
    </div>
    <div class="layui-col-md3">
        <div class="layui-row layui-col-space15">
            <div class="layui-col-md12" style="margin-top: 10px;">
                <div class="layui-card">
                    <div class="layui-card-header">
                        <c:if test="${myinfo.userAva==null}">
                            <img src="${ctx}/images/nav/nav_boy.png" class="layui-nav-img">
                        </c:if>
                        <c:if test="${myinfo.userAva!=null}">
                            <img src="${ctx}/images/nav/${myinfo.userAva}" class="layui-nav-img">
                        </c:if>
                        <span style="font-size: 16px;">${myinfo.userName}</span>
                    </div>
                    <div class="layui-card-body" style="display: flex;flex-direction: row;">
                        <div class="head-tags" style="">
                            <span class="iconfont iconguanzhu" style="color: #FFB800"><span class="icontext">关注</span></span>
                            <span class="iconcont">${myfollow}</span>
                        </div>
                        <div class="head-tags" style="">
                            <span class="iconfont iconfensi" style="color:#FF5722;"><span class="icontext">粉丝</span></span>
                            <span class="iconcont">${followme}</span>
                        </div>
                        <div class="head-tags" style="">
                            <span class="iconfont iconkecheng" style="color: #01AAED"><span class="icontext">我的课程</span></span>
                            <span class="iconcont">${planclass}</span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div class="layui-col-md12">
                <div class="layui-tab layui-tab-card" lay-filter="follow" style="background-color: white">
                    <ul class="layui-tab-title" style="background-color: white">
                        <li class="layui-this" lay-id="0">我关注的</li>
                        <li lay-id="1">关注我的</li>
                    </ul>
                    <div class="layui-tab-content" style="">
                        <div class="layui-tab-item followfram layui-show" style=""><span style="color: #d8d8d8;font-size: 12px;">暂无关注信息</span></div>
                        <div class="layui-tab-item followfram"><span style="color: #d8d8d8;font-size: 12px;">暂无关注信息</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
<script>
    layui.use(['layer','element','flow'], function() {
        var $ = layui.jquery
            , element = layui.element //Tab的切换功能，切换事件监听等，需要依赖element模块
            , flow = layui.flow     //流加载
            , layer = layui.layer;

        //初始流加载
        flow.load({
            elem: '#flow0' //流加载容器
            , isAuto: false
            , isLazyimg: true
            , done: function (page, next) { //加载下一页
                var lis = []
                var res = {}
                {
                    res["type"]="0";
                    res["userId"]=${param.userId};
                    res["page"]=page;
                    res["number"]=8;
                }
                $.ajax({
                    //请求方式
                    type : "POST",
                    contentType: "application/json;charset=UTF-8",
                    url : "${ctx}/circle/getContent",
                    data : JSON.stringify(res),
                    datatype:"JSON",
                    success : function(re) {
                        if(re.code=="0"){
                            res = {}
                            var list = re.circleContents;
                            if(list.length>0) {
                                for(var i=0;i<list.length;i++){
                                    var div = '<div class="layui-col-md6" style="">\n' +
                                        '                            <div class="layui-card" style="box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);">\n' +
                                        '                                <div class="layui-card-header" id="0conthead'+i+'">\n'
                                    if(list[i].userImg==null){
                                        div = div+'<img src="${ctx}/images/nav/nav_boy.png" class="layui-nav-img go2user" data-otherid="'+list[i].userId+'" style="cursor: pointer">'
                                    }else{
                                        div = div+'<img src="${ctx}/images/nav/'+list[i].userImg+'" class="layui-nav-img go2user" data-otherid="'+list[i].userId+'" style="cursor: pointer">'
                                    }
                                    div = div+'<span style="margin-left: 2px;font-size: 16px;cursor: pointer" class="go2user" data-otherid="'+list[i].userId+'">'+list[i].userName+'</span>' +
                                        '<span style="margin-left: 10px;color: #888888;font-size: 12px;cursor: pointer" class="go2user" data-otherid="'+list[i].userId+'">'+list[i].conTime+'</span>'
                                    if(list[i].isGood.toString()=="0"){
                                        div = div+'<span class="iconfont iconzan" style="margin-left: 10px;color: #888888;cursor: pointer">' +
                                            '<span style="color: #888888;font-size: 12px;margin-left: 4px;">'+list[i].conGood+'</span>' +
                                            '</span>'
                                    }else{
                                        div = div+'<span class="iconfont iconzan" style="margin-left: 10px;color: #FFB800;cursor: pointer">' +
                                            '<span style="color: #FFB800;font-size: 12px;margin-left: 4px;">'+list[i].conGood+'</span>' +
                                            '</span>'
                                    }
                                    div = div+'<span class="iconfont iconpinglun" style="float: right;color: #888888;font-size: 14px;cursor: pointer">' +
                                        '<span style="color: #888888;font-size: 12px;margin-left: 4px;">'+list[i].conContNum+'</span>' +
                                        '</span>'
                                    div = div+'                                </div>\n' +
                                        '                                <div class="layui-card-body click2content" style="cursor: pointer" data-conId="'+list[i].conId+'">\n' +
                                        '                                    <span class="conCont">'+list[i].conCont+'</span>\n' +
                                        '                                    <div class="img-user-fram" style="" id="0imgid'+i+'" >\n'
                                    var imglist = list[i].conImg.split(',');
                                    if(imglist.length>0&&imglist[0]!=""){
                                        for(var j=0;j<imglist.length;j++){
                                            div = div+'<img src="${ctx}/images/contentImgs/'+imglist[j]+'" alt="" style="margin:0 2px 0 2px;">'
                                        }
                                    }
                                    div = div+'                                    </div>\n' +
                                        '                                </div>\n' +
                                        '                            </div>\n' +
                                        '                        </div>'
                                    lis.push(div)
                                }
                            }
                            next(lis.join(''), page < re.pages);
                            $(".click2content").click(function () {
                                var conId = $(this).data("conid")
                                location.href="${ctx}/circle/details?conId="+conId+"&userId="+${param.userId};
                            })
                            $(".go2user").click(function () {
                                var otherId=$(this).data("otherid")
                                var userId=${param.userId}
                                if(otherId == userId){
                                    location.href="${ctx}/padding/pad-userinfo?userId="+userId;
                                }else{
                                    location.href="${ctx}/padding/pad-otherInfo?userId="+userId+"&otherId="+otherId;
                                }
                            })
                        }else{
                            layer.msg(re.msg,function () {})
                        }
                    },
                    error : function(e){
                        layer.msg('网络连接出错',{icon:5}, function(){});
                    }
                });
            }
        })
        var res = {}
        {
            res["type"]="0"
            res["userId"]=${param.userId}
        }
        $.ajax({
            //请求方式
            type : "POST",
            contentType: "application/json;charset=UTF-8",
            url : "${ctx}/circle/getFollow",
            data : JSON.stringify(res),
            datatype:"JSON",
            success : function(re) {
                if(re.code=="0"){
                    res = {}
                    var flist = re.Follows;
                    if(flist.length>0) {
                        $(".layui-tab-item.followfram.layui-show").empty();
                        $(".layui-tab-item.followfram.layui-show").append('<div class="layui-row layui-col-space15 folloitem0"></div>');
                        for(var fl = 0;fl<flist.length;fl++){
                            $(".folloitem0").append('<div class="layui-col-md12 go2user" style="cursor: pointer" data-otherid="'+flist[fl].fuseredId+'">\n' +
                                '                                    <div class="layui-card" style="">\n' +
                                '                                        <div class="layui-card-header" id="0imgfollow'+fl+'" style="">\n' +
                                '                                            <span style="font-size: 16px;">'+flist[fl].fuseredName+'</span>\n' +
                                '                                            <span class="iconfont iconguanzhu" style="color: #d8d8d8;font-size: 12px;float: right;cursor: pointer;"><span style="margin-left: 2px;color: #d8d8d8">已关注</span></span>\n' +
                                '                                        </div>\n' +
                                '                                    </div>\n' +
                                '                                </div>');
                            if(flist[fl].fuseredImg==null){
                                $("#0imgfollow"+fl).prepend('<img src="${ctx}/images/nav/nav_boy.png" class="layui-nav-img">');
                            }else{
                                $("#0imgfollow"+fl).prepend('<img src="${ctx}/images/nav/'+flist[fl].fuseredImg+'" class="layui-nav-img">');
                            }
                        }
                    }
                    $(".go2user").click(function () {
                        var otherId=$(this).data("otherid")
                        var userId=${param.userId}
                        if(otherId == userId){
                            location.href="${ctx}/padding/pad-userinfo?userId="+userId;
                        }else{
                            location.href="${ctx}/padding/pad-otherInfo?userId="+userId+"&otherId="+otherId;
                        }
                    })
                }else{
                    layer.msg(re.msg,function () {})
                }
            },
            error : function(e){
                layer.msg('网络连接出错',{icon:5}, function(){});
            }
        });
        element.on('tab(content)', function(elem){
            var id = $(this).attr("lay-id");
            var res = {}
            {
                res["type"]=id.toString();
                res["userId"]=${param.userId};
            }
            if(id!=3){
                var elemId = "#flow"+id
                flow.load({
                    elem: elemId //流加载容器
                    , isAuto: false
                    , isLazyimg: true
                    , done: function (page, next) { //加载下一页
                        var lis = [];
                        res["type"]=id.toString();
                        res["userId"]=${param.userId};
                        res["page"]=page;
                        res["number"]=8;
                        $.ajax({
                            //请求方式
                            type : "POST",
                            contentType: "application/json;charset=UTF-8",
                            url : "${ctx}/circle/getContent",
                            data : JSON.stringify(res),
                            datatype:"JSON",
                            success : function(re) {
                                if(re.code=="0"){
                                    res = {}
                                    var list = re.circleContents;
                                    if(list.length>0) {
                                        for(var i=0;i<list.length;i++){
                                            var div = '<div class="layui-col-md6" style="">\n' +
                                                '                            <div class="layui-card" style="box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);">\n' +
                                                '                                <div class="layui-card-header" id="'+id+'conthead'+i+'">\n'

                                            if(list[i].userImg==null){
                                                div += '<img src="${ctx}/images/nav/nav_boy.png" class="layui-nav-img go2user" data-otherid="'+list[i].userId+'" style="cursor: pointer">'
                                            }else{
                                                div += '<img src="${ctx}/images/nav/'+list[i].userImg+'" class="layui-nav-img go2user" data-otherid="'+list[i].userId+'" style="cursor: pointer">'
                                            }
                                            div+='<span style="margin-left: 2px;font-size: 16px;cursor: pointer" class="go2user" data-otherid="'+list[i].userId+'">'+list[i].userName+'</span>'
                                            div+='<span style="margin-left: 10px;color: #888888;font-size: 12px;cursor: pointer" class="go2user" data-otherid="'+list[i].userId+'">'+list[i].conTime+'</span>'
                                            if(list[i].isGood.toString()=="0"){
                                                div+='<span class="iconfont iconzan" style="margin-left: 10px;color: #888888;cursor: pointer">' +
                                                    '<span style="color: #888888;font-size: 12px;margin-left: 4px;">'+list[i].conGood+'</span>' +
                                                    '</span>'
                                            }else{
                                                div+='<span class="iconfont iconzan" style="margin-left: 10px;color: #FFB800;cursor: pointer">' +
                                                    '<span style="color: #FFB800;font-size: 12px;margin-left: 4px;">'+list[i].conGood+'</span>' +
                                                    '</span>'
                                            }
                                            div+='<span class="iconfont iconpinglun" style="float: right;color: #888888;font-size: 14px;cursor: pointer">' +
                                                '<span style="color: #888888;font-size: 12px;margin-left: 4px;">'+list[i].conContNum+'</span>' +
                                                '</span>'
                                            div+='                                </div>\n' +
                                                '                                <div class="layui-card-body click2content" style="cursor: pointer" data-conId="'+list[i].conId+'">\n' +
                                                '                                    <span class="conCont">'+list[i].conCont+'</span>\n' +
                                                '                                    <div class="img-user-fram" style="" id="'+id+'imgid'+i+'" >\n'
                                            var imglist = list[i].conImg.split(',');
                                            if(imglist.length>0&&imglist[0]!=""){
                                                for(var j=0;j<imglist.length;j++){
                                                    div+='<img src="${ctx}/images/contentImgs/'+imglist[j]+'" alt="" style="margin:0 2px 0 2px;">'
                                                }
                                            }
                                            div+='                                    </div>\n' +
                                                '                                </div>\n' +
                                                '                            </div>\n' +
                                                '                        </div>'
                                            lis.push(div)
                                        }
                                    }
                                    next(lis.join(''), page < re.pages);
                                    $(".click2content").click(function () {
                                        var conId = $(this).data("conid")
                                        location.href="${ctx}/circle/details?conId="+conId+"&userId="+${param.userId};
                                    })
                                    $(".go2user").click(function () {
                                        var otherId=$(this).data("otherid")
                                        var userId=${param.userId}
                                        if(otherId == userId){
                                            location.href="${ctx}/padding/pad-userinfo?userId="+userId;
                                        }else{
                                            location.href="${ctx}/padding/pad-otherInfo?userId="+userId+"&otherId="+otherId;
                                        }
                                    })
                                }else{
                                    layer.msg(re.msg,function () {})
                                }
                            },
                            error : function(e){
                                layer.msg('网络连接出错',{icon:5}, function(){});
                            }
                        });
                    }
                })
            }
        });

        //搜索
        $(".search").keydown(function(event) {
            var keyId = event.which;
            if (keyId == 13) {    //用户按下enter
                var searchText = $(".search input").val()
                if(searchText==""){
                    layer.msg('未输入任何内容哦...');
                    return false;
                }else{
                    var searchMapper = {};
                    searchMapper["val"] = searchText;
                    searchMapper["userId"] = ${param.userId};
                    $.ajax({
                        //请求方式
                        type : "POST",
                        contentType: "application/json;charset=UTF-8",
                        url : "${ctx}/circle/getSearchContent",
                        data : JSON.stringify(searchMapper),
                        datatype:"JSON",
                        success : function(re) {
                            if(re.code=="0"){
                                res = {}
                                var list = re.circleContents;
                                if(list.length>0) {
                                    $(".layui-tab-item.contfram.layui-show").empty();
                                    $(".layui-tab-item.contfram.layui-show").append('<div class="layui-row layui-col-space15 conitems3"></div>');
                                    for(var i=0;i<list.length;i++){
                                        $(".conitems3").append('<div class="layui-col-md6" style="">\n' +
                                            '                            <div class="layui-card" style="box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);">\n' +
                                            '                                <div class="layui-card-header" id="3conthead'+i+'">\n' +
                                            '                                </div>\n' +
                                            '                                <div class="layui-card-body click2content" style="cursor: pointer" data-conId="'+list[i].conId+'">\n' +
                                            '                                    <span class="conCont">'+list[i].conCont+'</span>\n' +
                                            '                                    <div class="img-user-fram" style="" id="3imgid'+i+'" >\n' +
                                            '                                    </div>\n' +
                                            '                                </div>\n' +
                                            '                            </div>\n' +
                                            '                        </div>')
                                        if(list[i].userImg==null){
                                            $("#3conthead"+i).append('<img src="${ctx}/images/nav/nav_boy.png" class="layui-nav-img go2user" data-otherid="'+list[i].userId+'" style="cursor: pointer">');
                                        }else{
                                            $("#3conthead"+i).append('<img src="${ctx}/images/nav/'+list[i].userImg+'" class="layui-nav-img go2user" data-otherid="'+list[i].userId+'" style="cursor: pointer">');
                                        }
                                        $("#3conthead"+i).append('<span style="margin-left: 2px;font-size: 16px;cursor: pointer" class="go2user" data-otherid="'+list[i].userId+'">'+list[i].userName+'</span>')
                                        $("#3conthead"+i).append('<span style="margin-left: 10px;color: #888888;font-size: 12px;cursor: pointer" class="go2user" data-otherid="'+list[i].userId+'">'+list[i].conTime+'</span>')
                                        if(list[i].isGood.toString()=="0"){
                                            $("#3conthead"+i).append('<span class="iconfont iconzan" style="margin-left: 10px;color: #888888;cursor: pointer">' +
                                                '<span style="color: #888888;font-size: 12px;margin-left: 4px;">'+list[i].conGood+'</span>' +
                                                '</span>')
                                        }else{
                                            $("#3conthead"+i).append('<span class="iconfont iconzan" style="margin-left: 10px;color: #FFB800;cursor: pointer">' +
                                                '<span style="color: #FFB800;font-size: 12px;margin-left: 4px;">'+list[i].conGood+'</span>' +
                                                '</span>')
                                        }
                                        $("#3conthead"+i).append('<span class="iconfont iconpinglun" style="float: right;color: #888888;font-size: 14px;cursor: pointer">' +
                                            '<span style="color: #888888;font-size: 12px;margin-left: 4px;">'+list[i].conContNum+'</span>' +
                                            '</span>')
                                        var imglist = list[i].conImg.split(',');
                                        if(imglist.length>0&&imglist[0]!=""){
                                            for(var j=0;j<imglist.length;j++){
                                                $("#3imgid"+i).append('<img src="${ctx}/images/contentImgs/'+imglist[j]+'" alt="" style="margin:0 2px 0 2px;">')
                                            }
                                        }
                                    }
                                }else{
                                    $(".layui-tab-item.contfram.layui-show").empty();
                                    $(".layui-tab-item.contfram.layui-show").append('<span style="color: #d8d8d8">没有搜索到任何结果哦...</span>');
                                }
                                $(".click2content").click(function () {
                                    var conId = $(this).data("conid")
                                    location.href="${ctx}/circle/details?conId="+conId+"&userId="+${param.userId};
                                })
                                $(".go2user").click(function () {
                                    var otherId=$(this).data("otherid")
                                    var userId=${param.userId}
                                    if(otherId == userId){
                                        location.href="${ctx}/padding/pad-userinfo?userId="+userId;
                                    }else{
                                        location.href="${ctx}/padding/pad-otherInfo?userId="+userId+"&otherId="+otherId;
                                    }
                                })
                            }else{
                                layer.msg(re.msg,function () {})
                            }
                        },
                        error : function(e){
                            layer.msg('网络连接出错',{icon:5}, function(){});
                        }
                    });
                }
            }
        })

        element.on('tab(follow)', function(elem){
            var id = $(this).attr("lay-id");
            var resf = {}
            {
                resf["type"]=id.toString()
                resf["userId"]=${param.userId}
            }
            $.ajax({
                //请求方式
                type : "POST",
                contentType: "application/json;charset=UTF-8",
                url : "${ctx}/circle/getFollow",
                data : JSON.stringify(resf),
                datatype:"JSON",
                success : function(re) {
                    if(re.code=="0"){
                        res = {}
                        var flist = re.Follows;
                        if(flist.length>0) {
                            $(".layui-tab-item.followfram.layui-show").empty();
                            $(".layui-tab-item.followfram.layui-show").append('<div class="layui-row layui-col-space15 folloitem'+id+'"></div>');
                            if(id=="0"){
                                for(var fl = 0;fl<flist.length;fl++){
                                    $(".folloitem"+id).append('<div class="layui-col-md12 go2user" style="cursor: pointer" data-otherid="'+flist[fl].fuseredId+'">\n' +
                                        '                                    <div class="layui-card" style="">\n' +
                                        '                                        <div class="layui-card-header" id="'+id+'imgfollow'+fl+'" style="">\n' +
                                        '                                            <span style="font-size: 16px;">'+flist[fl].fuseredName+'</span>\n' +
                                    '                                            <span class="iconfont iconguanzhu" style="color: #d8d8d8;font-size: 12px;float: right;cursor: pointer;"><span style="margin-left: 2px;color: #d8d8d8">已关注</span></span>\n' +
                                    '                                        </div>\n' +
                                    '                                    </div>\n' +
                                    '                                </div>');
                                    if(flist[fl].fuseredImg==null){
                                        $("#"+id+"imgfollow"+fl).prepend('<img src="${ctx}/images/nav/nav_boy.png" class="layui-nav-img">');
                                    }else{
                                        $("#"+id+"imgfollow"+fl).prepend('<img src="${ctx}/images/nav/'+flist[fl].fuseredImg+'" class="layui-nav-img">');
                                    }
                                }
                            }
                            else if(id=="1"){
                                for(var fl = 0;fl<flist.length;fl++){
                                    $(".folloitem"+id).append('<div class="layui-col-md12 go2user" style="cursor: pointer" data-otherid="'+flist[fl].fuserId+'">\n' +
                                        '                                    <div class="layui-card" style="">\n' +
                                        '                                        <div class="layui-card-header" id="'+id+'imgfollow'+fl+'" style="">\n' +
                                        '                                            <span style="font-size: 16px;">'+flist[fl].fuserName+'</span>\n' +
                                        '                                        </div>\n' +
                                        '                                    </div>\n' +
                                        '                                </div>');
                                    if(flist[fl].fuserImg==null){
                                        $("#"+id+"imgfollow"+fl).prepend('<img src="${ctx}/images/nav/nav_boy.png" class="layui-nav-img">');
                                    }else{
                                        $("#"+id+"imgfollow"+fl).prepend('<img src="${ctx}/images/nav/'+flist[fl].fuserImg+'" class="layui-nav-img">');
                                    }
                                    if(flist[fl].isFollowed==0){
                                        $("#"+id+"imgfollow"+fl).append('<span class="iconfont iconguanzhu" style="color: #FFB800;font-size: 12px;float: right;cursor: pointer;"><span style="margin-left: 2px;color: #FFB800">关注</span></span>');
                                    }else if(flist[fl].isFollowed==1){
                                        $("#"+id+"imgfollow"+fl).append('<span class="iconfont iconguanzhu" style="color: #d8d8d8;font-size: 12px;float: right;cursor: pointer;"><span style="margin-left: 2px;color: #d8d8d8">已关注</span></span>');
                                    }
                                }
                            }
                        }
                        $(".go2user").click(function () {
                            var otherId=$(this).data("otherid")
                            var userId=${param.userId}
                            if(otherId == userId){
                                location.href="${ctx}/padding/pad-userinfo?userId="+userId;
                            }else{
                                location.href="${ctx}/padding/pad-otherInfo?userId="+userId+"&otherId="+otherId;
                            }
                        })
                    }else{
                        layer.msg(re.msg,function () {})
                    }
                },
                error : function(e){
                    layer.msg('网络连接出错',{icon:5}, function(){});
                }
            });
        });
    });
</script>
</html>
