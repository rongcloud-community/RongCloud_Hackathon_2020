<%--
  Created by IntelliJ IDEA.
  User: songc
  Date: 2020/3/19
  Time: 14:49
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
        overflow-x: hidden; overflow-y: auto;
    }

    .img-fram img{
        width: 100%;
        height: 210px;
        object-fit:cover;
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

    .layui-field-title {
        margin: 10px 0 10px;
    }

    .layui-field-title .layui-field-box {
        padding: 10px!important;
    }

    .fav-tags{
        padding: 0 14px 0 14px;
        color: #3B78DD;
        margin:2px 5px 5px 0;
        font-size: 14px;
    }

    .img-action img{
        width: 100%;
        height: 100%;
        object-fit:cover;
    }

    .c-intro {
        display: flex;
        flex-direction: column;
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

    .img-action {
        cursor: pointer;
    }
    .conCont{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

</style>
<body>
    <fieldset class="layui-elem-field layui-field-title" style="background-color: white">
        <legend>
            <span style="color: #888888;font-size: 16px;">课程详情 - </span>
            <span style="color: #3B78DD;font-size: 22px;">${classInfo.className}</span>
        </legend>
        <div class="layui-field-box" style="display: flex;flex-direction: column;align-items: center;padding: 10px 10px 0 10px;">
            <div class="img-fram" style="width: 60%">
                <img src=${classInfo.classImg} alt="">
            </div>
            <div class="" style="display: flex;flex-direction: row;align-items: center;margin-top:10px;padding-bottom:10px;width: 60%">
                <div class="head-tags" style="">
                    <span class="iconfont iconhuo" style="color: #FF5722"><span class="icontext">燃脂</span></span>
                    <span class="iconcont">${classInfo.classFatB}Kcal</span>
                </div>
                <div class="" style="width: 1px;height: 30px;background-color: #eeeeee;"></div>
                <div class="head-tags" style="">
                    <span class="iconfont iconjijiangdaozhang" style="color: #FFB800"><span class="icontext">课时</span></span>
                    <span class="iconcont">${classInfo.classTime}天</span>
                </div>
                <div class="" style="width: 1px;height: 30px;background-color: #eeeeee;"></div>
                <div class="head-tags" style="">
                    <span class="iconfont iconxunlian1" style="color: #009688"><span class="icontext">难度</span></span>
                    <span class="iconcont">${classInfo.classLevel}</span>
                </div>
            </div>
        </div>
    </fieldset>

    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 10px;background-color: white">
        <legend>
            <span style="color: #888888;font-size: 16px;">课程简介</span>
        </legend>
        <div class="layui-field-box">
            <blockquote class="" style="background-color: white;width: 100%;padding:0 10px 10px 10px;">
                <span style="color: #666666;">${classInfo.classIntro}</span>
            </blockquote>
        </div>
    </fieldset>

    <fieldset class="layui-elem-field layui-field-title" style="background-color: white">
        <legend>
            <span style="color: #888888;font-size: 16px;">课程Labels</span>
        </legend>
        <div class="layui-field-box">
            <div class="labels" style="margin-top: 8px">
                <div class="layui-show-lg-inline-block fav-tags">暂无标签</div>
            </div>
        </div>
    </fieldset>

    <fieldset class="layui-elem-field layui-field-title" style="background-color: white">
        <legend>
            <span style="color: #888888;font-size: 16px;">动作列表 - </span>
            <span style="color: #3B78DD;font-size: 20px;">${acnum}组</span>
        </legend>
        <div class="layui-field-box">
            <div class="" style="margin-top: 8px">
                <c:if test="${actionlist!=null}">
                    <c:forEach items="${actionlist}" var="al" varStatus="i">
                        <div class="layui-show-sm-inline-block cardele" style="width: 49%;box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);">
                            <div style="display: flex;flex-direction: row;margin: 10px">
                                <div class="img-action" id="${al.actionId}" style="width:50%;height: 110px;">
                                    <img src=${al.actionImg} alt="">
                                </div>
                                <div style="display: flex;flex-direction: column;padding-left: 10px;">
                                    <div class="c-intro" style="">
                                        <span class="c-title" style="">${al.actionName}</span>
                                        <div style="margin-top: 65px">
                                            <span class="c-time">${al.actionTime}''</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="c-rate" style="margin-left:auto;margin-top: auto;">
                                    <div class="posetrain" data-id="${al.actionId}" style="margin-left: auto;cursor: pointer">
                                        <span style="color: #3B78DD;font-size: 12px;">练动作</span>
                                        <span class="iconfont iconxiayibu" style="color: #3B78DD;font-size: 12px;"></span>
                                    </div>
                                </div>
                                <div class="" style="width: 1px;height: 18px;border-left: 2px solid #3B78DD;margin-top: auto;margin-left: 2px;"></div>
                            </div>
                        </div>
                    </c:forEach>
                </c:if>
                <c:if test="${actionlist==null}">
                    <span style="color: #666666;">暂无数据，动作后台添加中...</span>
                </c:if>
            </div>
        </div>
    </fieldset>

    <fieldset class="layui-elem-field layui-field-title" style="">
        <legend style="">
            <span style="color: #888888;font-size: 16px;">训练成果</span>
            <span id="class_formed" data-id="${classInfo.classId}" class="iconfont icongai" style="color: #3B78DD;font-size: 14px;cursor: pointer;margin-left: 20px;"><span style="margin-left: 4px;font-size: 12px">我也要说</span></span>
        </legend>
        <div class="layui-field-box layui-row layui-col-space15" style="padding: 20px;">
            <c:if test="${cc.size()==0}">
                <span style="color: #888888;font-size: 13px;">暂无评论，快来抢沙发吧！</span>
            </c:if>
            <c:if test="${cc.size()>0}">
                <c:forEach items="${cc}" var="c" varStatus="i">
                <div class="layui-col-md6" style="">
                    <div class="layui-card">
                        <div class="layui-card-header" style="cursor: pointer">
                            <c:if test="${c.userImg==null}">
                                <img src="${ctx}/images/nav/nav_boy.png" class="layui-nav-img go2user" data-otherid="${c.userId}">
                            </c:if>
                            <c:if test="${c.userImg!=null}">
                                <img src="${ctx}/images/nav/${c.userImg}" class="layui-nav-img go2user" data-otherid="${c.userId}">
                            </c:if>
                            <span class="go2user" data-otherid="${c.userId}">${c.userName}</span>
                            <span class="go2user" data-otherid="${c.userId}" style="margin-left: 10px;color: #888888;font-size: 12px;">${c.conTime}</span>
                            <c:if test="${c.isGood==1}"><span class="iconfont iconzan" style="color: #FFB800;font-size: 14px;margin-left: 10%;"><span style="margin-left: 4px;">${c.conGood}</span></span></c:if>
                            <c:if test="${c.isGood==0}"><span class="iconfont iconzan" style="color: #e8e8e8;font-size: 14px;margin-left: 10%;"><span style="margin-left: 4px;">${c.conGood}</span></span></c:if>
                            <span class="iconfont iconpinglun" style="float: right;color: #888888;font-size: 14px;cursor: pointer">
                                <span style="color: #888888;font-size: 12px;margin-left: 4px;">${c.conContNum}</span>
                            </span>
                        </div>
                        <div class="layui-card-body click2content" data-conId="${c.conId}" style="cursor: pointer">
                            <span class="conCont">${c.conCont}</span>
                            <div class="img-user-fram" style="" >
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
    </fieldset>
</body>
<script>
    $(document).ready(function () {
        layui.use(['layer','element'], function(){
            var layer = layui.layer;
            var element = layui.element;
            var code = String(${code});
            if(code!="0"){
                layer.msg("${msg}");
            }else{
                var labels = "${classInfo.classLabel}".split(';');
                if(labels.length>0){
                    $(".labels").empty();
                    for(var i=0;i<labels.length;i++){
                        $(".labels").append('<div class="layui-show-lg-inline-block fav-tags">#'+labels[i]+'</div>');
                    }
                }
            }
            $("#class_formed").click(function () {
                var classId = $(this).data("id");
                if(classId!=null){
                    location.href="${ctx}/circle/upload?classId="+classId+"&userId="+${param.userId};
                }else {
                    layer.msg("参数异常")
                }
            })
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
            $(".posetrain").click(function () {
                var actionId = $(this).data('id');
                location.href="${ctx}/plan/start-pose?actionId="+actionId+"&userId="+${param.userId};
            })
        });
    })
</script>
</html>
