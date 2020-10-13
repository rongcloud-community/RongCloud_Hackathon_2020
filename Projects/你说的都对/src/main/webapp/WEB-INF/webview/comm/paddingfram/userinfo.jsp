<%--
  Created by IntelliJ IDEA.
  User: songc
  Date: 2020/3/22
  Time: 14:21
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
    .layui-nav-img .user{
        width: 100px;
        height: 100px;
    }
    .head-tags{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .head-tags .iconfont{
        font-size: 20px;
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
    .img-fram img{
        width: 100%;
        height: 100%;
        object-fit:cover;
    }
    .conCont{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .layui-tab-title li:hover{
        border-bottom: 0.5px solid #5FB878;
        background-color: #f6f6f6;
    }
    .cardele {
        display: inline-block;
        width: 33%;
        border-right: 1px solid #f6f6f6;
        margin-bottom: 15px;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
        margin: 4px;
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
</style>
<body class="" style="">
<div class="layui-row layui-col-space15">
    <div class="layui-col-md9">
        <div class="layui-card" style="margin-top: 10px;">
            <div class="layui-card-body">
                <div style="display: flex;flex-direction: row;">
                    <div style="width: 10%;display: flex;flex-direction: column;justify-content: center;align-items: center">
                        <div class="layui-upload-list">
                            <c:if test="${userEnroll.userAva==null}">
                                <img class="layui-upload-img user" src="${ctx}/images/nav/nav_boy.png" id="demo1" style="width: 100px;height: 100px;border-radius: 50%;object-fit:cover;">
                            </c:if>
                            <c:if test="${userEnroll.userAva!=null}">
                                <img class="layui-upload-img user" src="${ctx}/images/nav/${userEnroll.userAva}" id="demo1" style="width: 100px;height: 100px;border-radius: 50%;object-fit:cover;">
                            </c:if>
                            <p id="demoText"></p>
                        </div>
                        <button type="button" class="layui-btn" id="changetab">修改信息</button>
                    </div>
                    <div style="display: flex;flex-direction: column;width: 90%;">
                        <fieldset class="layui-elem-field layui-field-title" style="width: 100%">
                            <legend>
                                <span style="font-size: 26px;color: #3B78DD;">${userEnroll.userName}</span>
                            </legend>
                        </fieldset>
                        <div style="display: flex;flex-direction: row;height: 70px;">
                            <div class="head-tags" style="">
                                <span class="iconfont iconweibiaoti" style="color: #009688"><span class="icontext">体重</span></span>
                                <span class="iconcont">${userInfo.weight}kg</span>
                            </div>
                            <div class="head-tags" style="">
                                <span class="iconfont iconnianling" style="color:#1E9FFF;"><span class="icontext">身高</span></span>
                                <span class="iconcont">${userInfo.height}cm</span>
                            </div>
                            <div class="head-tags" style="">
                                <span class="iconfont iconshengao" style="color: #FFB800"><span class="icontext">腰围</span></span>
                                <span class="iconcont">${userInfo.waist}cm</span>
                            </div>
                            <div class="head-tags">
                                <span class="iconfont icontizhong" style="color: #01AAED"><span class="icontext">臀围</span></span>
                                <span class="iconcont">${userInfo.hipline}cm</span>
                            </div>
                        </div>
                        <div style="display: flex;flex-direction: row;height: 70px;">
                            <div class="head-tags" style="">
                                <span class="iconfont iconweibiaoti" style="color: #009688"><span class="icontext">胸围</span></span>
                                <span class="iconcont">${userInfo.bust}cm</span>
                            </div>
                            <div class="head-tags" style="">
                                <span class="iconfont iconnianling" style="color:#1E9FFF;"><span class="icontext">BMI</span></span>
                                <span class="iconcont">${userInfo.BMI}</span>
                            </div>
                            <div class="head-tags" style="">
                                <span class="iconfont iconshengao" style="color: #FFB800"><span class="icontext">静息心率</span></span>
                                <span class="iconcont">${userInfo.RHR}跳/分</span>
                            </div>
                            <div class="head-tags">
                                <span class="iconfont icontizhong" style="color: #01AAED"><span class="icontext">最大心率</span></span>
                                <span class="iconcont">${userInfo.MHR}跳/分</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <fieldset class="layui-elem-field layui-field-title" style="background-color: white;width: 100%;">
            <legend>
                <span style="color: #888888;font-size: 16px;">我的课程</span>
                <c:if test="${ClassInfo.size()==0}"><span style="color: #3B78DD;font-size: 20px;"> - 暂无课程信息,去课程库看看</span></c:if>
            </legend>
            <div class="layui-field-box" style="">
                <c:if test="${ClassInfo.size()>0}">
                    <div class="list-scroll" style="margin-top: 8px;white-space: nowrap;overflow-x: auto;-webkit-overflow-scrolling:touch;">
                        <c:forEach items="${ClassInfo}" var="al" varStatus="i">
                            <div class="cardele" style="box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);">
                                <div class="img-fram" data-classid="${al.classId}" style="height: 110px;cursor: pointer;">
                                    <img src="${al.classImg}" alt="">
                                </div>
                                <div class="cont-fram" style="display: flex;flex-direction: column;padding: 0 10px 5px 10px;">
                                    <div class="c-intro" style="">
                                        <span class="c-title" style="">${al.className}</span>
                                        <div>
                                            <span class="c-time">${al.classTime}天</span>
                                            <span class="c-count">${al.classTrainnumber}人训练</span>
                                        </div>
                                    </div>
                                    <div class="c-rate">
                                        <div class="rate-intro">Level：${al.classLevel}</div>
                                        <div id="rate1"></div>
                                        <div class="seeClass" data-classid="${al.classId}" style="margin-left: auto;cursor: pointer">
                                            <span style="color: #3B78DD;font-size: 12px;">查看课程</span>
                                            <span class="iconfont iconxiayibu" style="color: #3B78DD;font-size: 12px;"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </c:forEach>
                    </div>
                </c:if>
            </div>
        </fieldset>

        <div class="layui-card">
            <div class="layui-card-header">我的动态</div>
            <div class="layui-card-body">
                <div class="layui-row layui-col-space15">
                    <c:if test="${cc.size()==0}">
                        <span style="color: #888888;font-size: 13px;">暂无动态</span>
                    </c:if>
                    <c:if test="${cc.size()>0}">
                        <c:forEach items="${cc}" var="c" varStatus="i">
                            <div class="layui-col-md6 click2content" style="cursor: pointer;" data-conId="${c.conId}" data-fkType="${c.fkType}" data-fkId="${c.fkId}">
                                <div class="layui-card" style="box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);">
                                    <div class="layui-card-header">
                                        <c:if test="${c.userImg==null}">
                                            <img src="${ctx}/images/nav/nav_boy.png" class="layui-nav-img">
                                        </c:if>
                                        <c:if test="${c.userImg!=null}">
                                            <img src="${ctx}/images/nav/${c.userImg}" class="layui-nav-img">
                                        </c:if>
                                        <span>${c.userName}</span>
                                        <span style="margin-left: 10px;color: #888888;font-size: 12px;">${c.conTime}</span>
                                        <c:if test="${c.isGood==1 and c.fkType!=2}">
                                            <span class="iconfont iconzan" style="color: #FFB800;font-size: 14px;margin-left: 10%;">
                                                <span style="margin-left: 4px;">${c.conGood}</span>
                                            </span>
                                            <span class="iconfont iconpinglun" style="float: right;color: #888888;font-size: 14px;cursor: pointer">
                                                <span style="color: #888888;font-size: 12px;margin-left: 4px;">${c.conContNum}</span>
                                            </span>
                                        </c:if>
                                        <c:if test="${c.isGood==0 and c.fkType!=2}">
                                            <span class="iconfont iconzan" style="color: #888888;font-size: 14px;margin-left: 10%;">
                                                <span style="margin-left: 4px;">${c.conGood}</span>
                                            </span>
                                            <span class="iconfont iconpinglun" style="float: right;color: #888888;font-size: 14px;cursor: pointer">
                                                <span style="color: #888888;font-size: 12px;margin-left: 4px;">${c.conContNum}</span>
                                            </span>
                                        </c:if>
                                        <c:if test="${c.fkType==2}">
                                             <span style="float: right;color: #888888;font-size: 12px;cursor: pointer">回复</span>
                                        </c:if>
                                    </div>
                                    <div class="layui-card-body">
                                        <span class="conCont">${c.conCont}</span>
                                        <div class="img-user-fram" style="">
                                            <c:forEach items="${c.imglist}" var="ci" varStatus="i">
                                                <c:if test="${ci!=\"\"}">
                                                    <img src=${ctx}/images/contentImgs/${ci} alt="">
                                                </c:if>
                                            </c:forEach>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </c:forEach>
                    </c:if>
                </div>
            </div>
        </div>
    </div>

    <div class="layui-col-md3">
        <div class="layui-row layui-col-space15">
            <div class="layui-col-md12" style="margin-top: 10px;">
                <div class="layui-card">
                    <div class="layui-card-header">
                        <c:if test="${userEnroll.userAva==null}">
                            <img src="${ctx}/images/nav/nav_boy.png" class="layui-nav-img">
                        </c:if>
                        <c:if test="${userEnroll.userAva!=null}">
                            <img src="${ctx}/images/nav/${userEnroll.userAva}" class="layui-nav-img">
                        </c:if>
                        <span style="font-size: 16px;">${userEnroll.userName}</span>
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
                            <span class="iconfont iconkecheng" style="color: #01AAED">
                                <span class="icontext">我的课程</span>
                            </span>
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
</body>
<script>
    layui.use(['upload', 'element','layer'], function() {
        var $ = layui.jquery
            , upload = layui.upload
            , layer = layui.layer
            , element = layui.element;
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
                            $(".folloitem0").append('<div class="layui-col-md12" style="cursor: pointer" data-userId="'+flist[fl].fuseredId+'">\n' +
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
                }else{
                    layer.msg(re.msg,function () {})
                }
            },
            error : function(e){
                layer.msg('网络连接出错',{icon:5}, function(){});
            }
        });

        $(".click2content").click(function () {
            var conId = $(this).data("conid")
            var fktype = $(this).data("fktype")
            var fkid = $(this).data("fkid")
            if(fktype==2){
                location.href="${ctx}/circle/details?conId="+fkid+"&userId="+${param.userId};
            }else {
                location.href="${ctx}/circle/details?conId="+conId+"&userId="+${param.userId};
            }
        })

        $(".img-fram").click(function () {
            var classId = $(this).data("classid")
            location.href="${ctx}/courses/inner-intro?classId="+classId+"&userId="+${param.userId};
        })
        $(".seeClass").click(function () {
            var classId = $(this).data("classid")
            location.href="${ctx}/courses/inner-intro?classId="+classId+"&userId="+${param.userId};
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

        $("#changetab").click(function () {
            location.href="${ctx}/padding/pad-changeinfo?userId="+${param.userId}
        })

    });
</script>
</html>
