<%--
  Created by IntelliJ IDEA.
  User: songc
  Date: 2020/3/18
  Time: 10:57
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

    .user-tittle, .class-body{
        /*background-color: white;*/
        box-sizing: border-box;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
    }

    .head-tags{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .head-tags .iconfont{
        font-size: 24px;
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

    .fav-tags{
        padding: 0 14px 0 14px;
        color: #3B78DD;
        margin:2px 5px 5px 0;
        font-size: 14px;
    }
    .layui-card-body {
        padding: 10px 5px !important;
    }

    .img-fram{
        cursor: pointer;
    }
    .img-fram img{
        width: 100%;
        height: 100%;
        object-fit:cover;
    }
    .layui-rate {
        padding: 0!important;
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
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
    }

    .cont-fram{
        padding: 0 4px 0 4px
    }

</style>
<body>
    <div class="user-tittle">
        <fieldset class="layui-elem-field" style="background-color: white">
            <legend id="username" style="color: #3B78DD"></legend>
            <div class="layui-field-box" style="display: flex;flex-direction: row;align-items: center;">
                <div style="margin-right: 0;display: flex;flex-direction: column;width: 50%;border-right: 1px solid #eeeeee">
                    <span class="" style="color:#888888;font-size: 12px;">—— 这里显示您的基本信息 ————
                        <span class="iconfont icongai" id="changetab" style="margin-left: 62%;color: #3B78DD;cursor: pointer"></span>
                    </span>
                    <div style="display: flex;flex-direction: row;height: 70px;">
                        <div class="head-tags" style="border-right: 1px solid #eeeeee">
                            <span class="iconfont iconweibiaoti" style="color: #009688"><span class="icontext">性别</span></span>
                            <span id="sex" class="iconcont"></span>
                        </div>
                        <div class="head-tags" style="border-right: 1px solid #eeeeee">
                            <span class="iconfont iconnianling" style="color:#1E9FFF;"><span class="icontext">年龄</span></span>
                            <span id="age" class="iconcont"></span>
                        </div>
                        <div class="head-tags" style="border-right: 1px solid #eeeeee">
                            <span class="iconfont iconshengao" style="color: #FFB800"><span class="icontext">身高</span></span>
                            <span id="height" class="iconcont"></span>
                        </div>
                        <div class="head-tags">
                            <span class="iconfont icontizhong" style="color: #01AAED"><span class="icontext">体重</span></span>
                            <span id="weight" class="iconcont"></span>
                        </div>
                    </div>
                </div>
                <div style="margin-right: 0;display: flex;flex-direction: column;margin-left: 10px;width: 50%">
                    <span class="" style="color:#888888;font-size: 12px;">—— 这里显示您的喜好信息 ————</span>
                    <div class="label" style="height: 70px;margin-top: 8px"></div>
                </div>
            </div>
        </fieldset>
    </div>

    <div class="class-body" style="margin-top: 10px;background-color: #F2F2F2">
        <c:if test="${labellist==null}">
            <div class="layui-card" style="background-color: white;">
                <div class="layui-card-header" style="display: flex;flex-direction: row;">
                    <div style="color: #3B78DD;font-size: 16px;"># 暂无数据</div>
                    <div style="margin-left: auto;color: #888888;font-size: 12px;cursor: pointer">查看更多</div>
                </div>
            </div>
        </c:if>
        <c:if test="${labellist!=null}">
            <c:forEach items="${labellist}" var="ll" varStatus="i">
                <div class="layui-card" style="background-color: white;">
                    <div class="layui-card-header" style="display: flex;flex-direction: row;">
                        <div style="color: #3B78DD;font-size: 16px;">#${ll.typeName}</div>
                        <div class="more" style="margin-left: auto;color: #888888;font-size: 12px;cursor: pointer">查看更多</div>
                    </div>
                    <div class="layui-card-body" style="display: flex;flex-direction: row;">
                        <c:forEach items="${ll.data}" var="lld" varStatus="j">
                            <div class="layui-show-lg-inline-block cardele" style="width: 24%;margin: 0 5px 0 5px;">
                                <div class="img-fram" id="${lld.classId}" style="height: 110px;">
                                    <img src="${lld.classImg}" alt="">
                                </div>
                                <div class="cont-fram" style="display: flex;flex-direction: column;">
                                    <div class="c-intro" style="">
                                        <span class="c-title" style="">${lld.className}</span>
                                        <div>
                                            <span class="c-time">${lld.classTime}天</span>
                                            <span class="c-count">${lld.classTrainnumber}人训练</span>
                                        </div>
                                    </div>
                                    <div class="c-rate">
                                        <div class="rate-intro">Level：${lld.classLevel}</div>
                                        <div id="rate1"></div>
                                        <div class="addClass" data-classid="${lld.classId}" style="margin-left: auto;cursor: pointer">
                                            <span style="color: #3B78DD;font-size: 12px;">添加计划</span>
                                            <span class="iconfont iconxiayibu" style="color: #3B78DD;font-size: 12px;"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </c:forEach>
                    </div>
                </div>
            </c:forEach>
        </c:if>
    </div>
</body>
<script>
    $(document).ready(function () {
        layui.use(['rate','layer','element'], function(){
            var rate = layui.rate;
            var layer = layui.layer;
            var element = layui.element;

            //请求数据
            var res = {}
            if("${param.userId}"==""){
                layer.msg("请先登录")
                location.href="${ctx}/main"
            }else{
                res['userId'] = "${param.userId}";
                $.ajax({
                    type : "POST",
                    contentType: "application/json;charset=UTF-8",
                    url : "${ctx}/courses/getUserRecommInfo",
                    data : JSON.stringify(res),
                    datatype:"JSON",
                    success : function(re) {
                        if(re.code=="1"){layer.msg(re.msg);}
                        else if(re.code=="2"){
                            layer.msg("请先登录")
                            location.href="${ctx}/main"
                        }else{
                            console.log(re)
                            var userEnroll = re.userEnroll;
                            var userInfo = re.userInfo;
                            var userLabel = re.userLabel;
                            var labellist = re.labellist;
                            if(userEnroll!=null){
                                $("#username").text(userEnroll.userName+"您好")
                            }
                            if(userInfo!=null){
                                $("#sex").text(userInfo.sex)
                                $("#age").text(userInfo.age)
                                $("#height").text(userInfo.height+"CM")
                                $("#weight").text(userInfo.weight+"KG")
                            }
                            if(userLabel!=null){
                                for(var i=0;i<userLabel.length;i++){
                                    $(".label").append('<div id="'+userLabel[i].typeId+'" class="layui-show-lg-inline-block fav-tags">'+"#"+userLabel[i].typeName+'</div>')
                                }
                            }
                        }
                    },
                    error : function(e){
                        layer.msg('服务器出错');
                    }
                });

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

                $(".more").click(function () {
                    location.href="${ctx}/courses/inner-allc?userId="+${param.userId};
                })
                $(".img-fram").click(function () {
                    var classId = $(this).attr('id');
                    location.href="${ctx}/courses/inner-intro?classId="+classId+"&userId="+${param.userId};
                })
                $("#changetab").click(function () {
                    location.href="${ctx}/padding/pad-changeinfo?userId="+${param.userId}
                })
            }
        });
    })
</script>
</html>
