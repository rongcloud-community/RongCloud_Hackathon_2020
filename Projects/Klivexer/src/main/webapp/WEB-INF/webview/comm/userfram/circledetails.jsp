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
        <fieldset class="layui-elem-field" style="border-radius: 4px;border: 1px solid #3B78DD;">
            <legend>
                <span style="color: #3B78DD;font-size: 32px;">${cc.userName}</span>
            </legend>
            <div class="layui-field-box">
                <div class="layui-card">
                    <div class="layui-card-header" style="">
                        <span id="conTime${cc.conId}" style="font-size: 12px;color: #888888">发表时间：${cc.conTime}</span>
                        <c:if test="${cc.isGood==1}"><span class="iconfont iconzan" onclick="gooodAction(this)" data-flag="1" data-conid="${cc.conId}" style="color: #FFB800;font-size: 16px;margin-left: 10%;cursor: pointer;"><span style="margin-left: 4px;">${cc.conGood}</span></span></c:if>
                        <c:if test="${cc.isGood==0}"><span class="iconfont iconzan" onclick="gooodAction(this)" data-flag="0" data-conid="${cc.conId}" style="color: #e8e8e8;font-size: 16px;margin-left: 10%;cursor: pointer;"><span style="margin-left: 4px;">${cc.conGood}</span></span></c:if>
                        <span class="iconfont iconpinglun" style="font-size: 16px;color: #FF5722;margin-left: 10%;"><span style="margin-left: 4px;">${cc.conContNum}</span></span>
                    </div>
                    <div class="layui-card-body">
                        ${cc.conCont}
                        <div class="img-user-fram" style="">
                            <c:forEach items="${imglist}" var="il" varStatus="i">
                                <c:if test="${il!=\"\"}">
                                    <img src=${ctx}/images/contentImgs/${il} alt="">
                                </c:if>
                            </c:forEach>
                        </div>
                    </div>
                </div>
                <div class="layui-card">
                    <div class="layui-card-header">评论</div>
                    <div class="layui-card-body">
                        <c:if test="${contents.size()==0}">
                            <span style="color: #888888;font-size: 12px;">暂无评论，快来抢沙发吧！</span>
                        </c:if>
                        <c:if test="${contents.size()>0}">
                            <div class="layui-row layui-col-space15">
                                <c:forEach items="${contents}" var="cs" varStatus="i">
                                <div class="layui-col-md6" style="">
                                    <div class="layui-card">
                                        <div class="layui-card-header">
                                            <c:if test="${cs.userImg==null}">
                                                <img src="${ctx}/images/nav/nav_boy.png" class="layui-nav-img go2user" style="cursor: pointer" data-otherid="${cs.userId}">
                                            </c:if>
                                            <c:if test="${cs.userImg!=null}">
                                                <img src="${ctx}/images/nav/${cs.userImg}" class="layui-nav-img go2user" style="cursor: pointer" data-otherid="${cs.userId}">
                                            </c:if>
                                            <span class="go2user" style="cursor: pointer" data-otherid="${cs.userId}">${cs.userName}</span>
                                            <span class="go2user" id="conTime${cs.conId}" style="margin-left: 10px;color: #888888;font-size: 12px;cursor: pointer" data-otherid="${cs.userId}">${cs.conTime}</span>
                                            <c:if test="${cs.isGood==1}"><span class="iconfont iconzan" onclick="gooodAction(this)" data-flag="1" data-conid="${cs.conId}" style="color: #FFB800;font-size: 16px;margin-left: 10%;cursor: pointer;"><span style="margin-left: 4px;">${cs.conGood}</span></span></c:if>
                                            <c:if test="${cs.isGood==0}"><span class="iconfont iconzan" onclick="gooodAction(this)" data-flag="0" data-conid="${cs.conId}" style="color: #e8e8e8;font-size: 16px;margin-left: 10%;cursor: pointer;"><span style="margin-left: 4px;">${cs.conGood}</span></span></c:if>
                                        </div>
                                        <div class="layui-card-body">
                                            <span class="">${cs.conCont}</span>
                                        </div>
                                    </div>
                                </div>
                                </c:forEach>
                            </div>
                        </c:if>
                    </div>
                </div>
            </div>
        </fieldset>
        <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
            <legend>快速回复</legend>
        </fieldset>
        <form class="layui-form layui-form-pane" onsubmit="return donull(this)">
            <div class="layui-form-item layui-form-text">
                <label class="layui-form-label">
                    <span class="layui-icon layui-icon-release" style="color: #3B78DD;font-size: 14px;">
                    <span style="color: #D0D0D0;font-size: 12px;margin-left: 4px;">快来分享你的健身心得吧~</span>
                </span>
                </label>
                <div class="layui-input-block">
                    <textarea placeholder="请输入内容..." lay-verify="required" lay-reqtext="还没有输入任何内容哦~" class="layui-textarea" maxlength="255"></textarea>
                </div>
            </div>
<%--            <div class="layui-upload">--%>
<%--                <button type="button" class="layui-btn" id="test2" style="background-color: #3B78DD;">多图片上传</button>--%>
<%--                <blockquote class="layui-elem-quote layui-quote-nm" style="margin-top: 10px;background-color: white">--%>
<%--                    预览图：--%>
<%--                    <div class="layui-upload-list" id="demo2"></div>--%>
<%--                </blockquote>--%>
<%--            </div>--%>
            <div class="layui-form-item">
                <button class="layui-btn" lay-submit="" lay-filter="formSubmit" style="background-color: #3B78DD">回复</button>
                <button type="reset" class="layui-btn layui-btn-primary" style="border: 1px solid #e8e8e8!important;">重置</button>
            </div>
        </form>
    </div>
    <div class="layui-col-md3">
        <div class="layui-row layui-col-space15">
            <div class="layui-col-md12" style="margin-top: 10px;">
                <div class="layui-card">
                    <div class="layui-card-header go2user" data-otherid="${myinfo.userId}" style="cursor: pointer;">
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
                            <span class="iconfont iconkecheng" style="color: #01AAED">
                                <c:if test="${myinfo.userId==param.userId}"><span class="icontext">我的课程</span></c:if>
                                <c:if test="${myinfo.userId!=param.userId}"><span class="icontext">ta的课程</span></c:if>
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
                    <c:if test="${myinfo.userId==param.userId}">
                        <li class="layui-this" lay-id="0">我关注的</li>
                        <li lay-id="1">关注我的</li>
                    </c:if>
                    <c:if test="${myinfo.userId!=param.userId}">
                        <li class="layui-this" lay-id="0">ta关注的</li>
                        <li lay-id="1">关注ta的</li>
                    </c:if>
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
</div>
</body>
<script>
    function donull(form){
        return false;
    }

    function gooodAction(e) {
        var flag = $(e).data("flag");
        var conId = $(e).data("conid");
        var conGood = parseInt($(e).text())
        var good = {}
        {
            good["flag"]=flag
            good["conId"]=conId
            good["userId"]=${param.userId}
        }
        $.ajax({
            //请求方式
            type : "POST",
            contentType: "application/json;charset=UTF-8",
            url : "${ctx}/circle/goodAction",
            data : JSON.stringify(good),
            datatype:"JSON",
            success : function(re) {
                if(re.code=="0"){
                    if(flag=="0"){
                        $(e).remove();
                        $("#conTime"+conId).after('<span class="iconfont iconzan layui-anim layui-anim-scaleSpring" onclick="gooodAction(this)" data-flag="1" data-conid="'+conId+'" style="color: #FFB800;font-size: 16px;margin-left: 10%;cursor: pointer;">' +
                            '<span style="margin-left: 4px;">'+(conGood+1)+'</span>' +
                            '</span>')
                    }else if(flag=="1") {
                        $(e).remove();
                        $("#conTime"+conId).after('<span class="iconfont iconzan layui-anim layui-anim-scaleSpring" onclick="gooodAction(this)" data-flag="0" data-conid="'+conId+'" style="color: #e8e8e8;font-size: 16px;margin-left: 10%;cursor: pointer;">' +
                            '<span style="margin-left: 4px;">'+(conGood-1)+'</span>' +
                            '</span>')
                    }
                }else{
                    layer.msg(re.msg,function () {})
                }
            },
            error : function(e){
                layer.msg('网络连接出错',{icon:5}, function(){});
            }
        });
    }

    layui.use(['upload','element','form'], function() {
        var $ = layui.jquery
            , element = layui.element
            , upload = layui.upload
            , form = layui.form;
        var res = {}
        {
            res["type"]="0"
            res["otherId"]=${myinfo.userId}
            res["userId"]=${param.userId}
        }
        $.ajax({
            //请求方式
            type : "POST",
            contentType: "application/json;charset=UTF-8",
            url : "${ctx}/circle/gettaFollow",
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
                                '                                            <span style="font-size: 16px;">'+flist[fl].fuseredName+'</span>\n' +'                                        </div>\n' +
                                '                                    </div>\n' +
                                '                                </div>');
                            if(flist[fl].fuseredImg==null){
                                $("#0imgfollow"+fl).prepend('<img src="${ctx}/images/nav/nav_boy.png" class="layui-nav-img">');
                            }else{
                                $("#0imgfollow"+fl).prepend('<img src="${ctx}/images/nav/'+flist[fl].fuseredImg+'" class="layui-nav-img">');
                            }
                            if(flist[fl].isFollowed==0&&(flist[fl].fuseredId!="${param.userId}")){
                                $("#0imgfollow"+fl).append('<span class="iconfont iconguanzhu" style="color: #FFB800;font-size: 12px;float: right;cursor: pointer;"><span style="margin-left: 2px;color: #FFB800">关注</span></span>');
                            }else if(flist[fl].isFollowed==1&&(flist[fl].fuseredId!="${param.userId}")){
                                $("#0imgfollow"+fl).append('<span class="iconfont iconguanzhu" style="color: #d8d8d8;font-size: 12px;float: right;cursor: pointer;"><span style="margin-left: 2px;color: #d8d8d8">已关注</span></span>');
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

        element.on('tab(follow)', function(elem){
            var id = $(this).attr("lay-id");
            var resf = {}
            {
                resf["type"]=id.toString()
                resf["otherId"]=${myinfo.userId}
                resf["userId"]=${param.userId}
            }
            $.ajax({
                //请求方式
                type : "POST",
                contentType: "application/json;charset=UTF-8",
                url : "${ctx}/circle/gettaFollow",
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
                                        '                                        <div class="layui-card-header" id="'+id+'imgfollow'+fl+'" style="">\n'+
                                        '                                           <n></n><span style="font-size: 16px;">'+flist[fl].fuseredName+'</span>\n' +
                                        '                                        </div>\n' +
                                        '                                    </div>\n' +
                                        '                                </div>');
                                    if(flist[fl].fuseredImg==null){
                                        $("#"+id+"imgfollow"+fl).prepend('<img src="${ctx}/images/nav/nav_boy.png" class="layui-nav-img">');
                                    }else{
                                        $("#"+id+"imgfollow"+fl).prepend('<img src="${ctx}/images/nav/'+flist[fl].fuseredImg+'" class="layui-nav-img">');
                                    }
                                    if(flist[fl].isFollowed==0&&(flist[fl].fuseredId!=${param.userId})){
                                        $("#"+id+"imgfollow"+fl).append('<span class="iconfont iconguanzhu" style="color: #FFB800;font-size: 12px;float: right;cursor: pointer;"><span style="margin-left: 2px;color: #FFB800">关注</span></span>');
                                    }
                                    if(flist[fl].isFollowed==1&&(flist[fl].fuseredId!=${param.userId})){
                                        $("#"+id+"imgfollow"+fl).append('<span class="iconfont iconguanzhu" style="color: #d8d8d8;font-size: 12px;float: right;cursor: pointer;"><span style="margin-left: 2px;color: #d8d8d8">已关注</span></span>');
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
                                    if(flist[fl].isFollowed==0&&(flist[fl].fuserId!=${param.userId})){
                                        $("#"+id+"imgfollow"+fl).append('<span class="iconfont iconguanzhu" style="color: #FFB800;font-size: 12px;float: right;cursor: pointer;"><span style="margin-left: 2px;color: #FFB800">关注</span></span>');
                                    }else if(flist[fl].isFollowed==1&&(flist[fl].fusered!=${param.userId})){
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

        //回复
        form.on('submit(formSubmit)', function(data){
            var text={}
            if("${param.userId}"==""||"${param.conId}"==""){
                layer.msg("异常参数",function () {})
                return false;
            }
            var textarea = $("textarea").val()

            text["conCont"] = textarea;
            text["userId"] = ${param.userId};
            text["fkType"] = 2;
            text["fkId"] = "${param.conId}";
            $.ajax({
                //请求方式
                type : "POST",
                contentType: "application/json;charset=UTF-8",
                url : "${ctx}/circle/setContent",
                data : JSON.stringify(text),
                datatype:"JSON",
                success : function(re) {
                    if(re.code=="0"){
                        layer.msg(re.msg)
                        res = {}
                        location.reload();
                    }else{
                        layer.msg(re.msg,function () {})
                    }
                },
                error : function(e){
                    layer.msg('网络连接出错',{icon:5}, function(){});
                }
            });
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
        // //多图片上传
        // upload.render({
        //     elem: '#test2'
        //     ,url: 'https://httpbin.org/post' //改成您自己的上传接口
        //     ,multiple: true
        //     ,before: function(obj){
        //         //预读本地文件示例，不支持ie8
        //         obj.preview(function(index, file, result){
        //             $('#demo2').append('<img src="'+ result +'" alt="'+ file.name +'" class="layui-upload-img">')
        //         });
        //     }
        //     ,done: function(res){
        //         //上传完毕
        //     }
        // });
    });
</script>
</html>
