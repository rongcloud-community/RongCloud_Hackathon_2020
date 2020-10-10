<%--
  Created by IntelliJ IDEA.
  User: songc
  Date: 2020/3/13
  Time: 16:50
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
    html,body{
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        font-family: -apple-system,"Helvetica Neue",Arial,"PingFang SC","Hiragino Sans GB",STHeiti,"Microsoft YaHei","Microsoft JhengHei","Source Han Sans SC","Noto Sans CJK SC","Source Han Sans CN","Noto Sans SC","Source Han Sans TC","Noto Sans CJK TC","WenQuanYi Micro Hei",SimSun,sans-serif;
    }
    .container{
        background-color: white;
        margin: 0 auto;
        width: 100%;
        height: 100%;
    }
    .phead{
        height: 10%;
        border-bottom: 1px solid #D0D0D0;
    }
    .pmid{
        height: 82%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 12px 0 12px;
    }
    .pmid .mid-fram {
        width: 100%;
        height: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;

    }
    input{
        width: 98%;
        height: 24px;
        border-radius: 4px;
        border: 1px solid #aaa;
        padding: 14px 4px;
        background: 0 0;
        text-align: left;
        line-height: 50px;
        text-indent: 12px;
    }
    input::-moz-placeholder { /* Mozilla Firefox 19+ */
        color:    #FAFAFA;
    }
    .layui-form-item {
        width: 25%;
        display: none;
    }

    .layui-input:focus, .layui-textarea:focus{border-color:#3B78DD!important}
    .layui-form-radio>i:hover, .layui-form-radioed>i{
        color: #3B78DD !important;
    }
    .layui-btn{
        background-color: transparent!important;
        padding: 0;
    }

</style>

<body>
<div class="container">
    <div class="phead" style="display: flex;flex-direction: row ;align-items: center;">
        <div style="margin-left: 20px;display: flex;flex-direction: row;align-items: center" >
            <img src="${ctx}/images/backimg/logo.png" alt="" width="150px">
            <div style="border-left: 1px solid #888888;height: 30px;display: flex;flex-direction: row ;align-items: center;">
                <p style="margin-left: 10px;color: #888888;font-size: 16px">个性化服务</p>
            </div>
        </div>
        <div class="" style="margin-left: auto;display: flex;flex-direction: row;align-items: center;margin-right:20px;">
            <p style="margin-right:12px;color: #666666;font-size: 12px">关于我们</p>
            <p style="margin-right:12px;color: #666666;font-size: 12px">技术介绍</p>
            <div style="border-left: 1px solid #888888;display: flex;flex-direction: row ;align-items: center;">
                <p style="margin-left: 12px;margin-right:12px;color: #666666;font-size: 12px">帮助</p>
            </div>
            <p style="color: #666666;font-size: 12px">意见反馈</p>
        </div>
    </div>
    <div class="pmid" style="">
        <div class="head-control-fram" style="margin-right: auto;cursor: pointer;display: none;">
            <span class="iconfont iconfanhui" style="font-size: 20px;color: #3B78DD"></span>
            <span style="font-size: 20px;color: #3B78DD">上一步</span>
        </div>
        <div class="mid-fram" style="background-color: white;">
            <form class="layui-form layui-form-pane " action="" style="margin-top: 150px;width: 100%;display: flex;flex-direction: column;align-items: center" >
                <div class="text-fram">
                    <p style="font-size: 32px;color: #888888">欢迎使用Ai佳健身系统</p>
                    <p style="font-size: 20px;">这仅需花费您1分钟时间来获取信息，为您提供感兴趣的服务</p>
                </div>
                <span class="end2" style="font-size: 12px;color: #BBBBBB;display: none;">系统收集信息只为您推荐服务，若您不想使用该服务，可选择跳过</span>
                <div class="layui-form-item" style="margin-top: 6px;">
                    <label class="layui-form-label">您的性别</label>
                    <div class="layui-input-block" style="border: 1px solid #DDDDDD;">
                        <input type="radio" name="sex" value="男" title="男" checked>
                        <input type="radio" name="sex" value="女" title="女" >
                        <input type="radio" name="sex" value="不选择" title="不选择" >
                    </div>
                </div>
                <div class="layui-form-item" style="display: none;">
                    <label class="layui-form-label">您的年龄</label>
                    <div class="layui-input-block" style="">
                        <select name="age" lay-verify="required">
                            <option value=""></option>
                            <option value="0" >无</option>
                            <option value="1">10-18岁</option>
                            <option value="2">19-23岁</option>
                            <option value="3">24-28岁</option>
                            <option value="4">29-33岁</option>
                            <option value="5">34-38岁</option>
                            <option value="6">39-43岁</option>
                            <option value="7">44-48岁</option>
                            <option value="8">48岁以上</option>
                        </select>
                    </div>
                </div>
                <div class="layui-form-item" style="">
                    <label class="layui-form-label">您的身高</label>
                    <div class="layui-input-inline">
                        <input type="text" name="height" required lay-verify="required|number" placeholder="请输入数字" autocomplete="off" class="layui-input">
                    </div>
                    <div class="layui-form-mid layui-word-aux">&nbsp;&nbsp;CM</div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">您的体重</label>
                    <div class="layui-input-inline">
                        <input type="text" name="weight" required lay-verify="required|number" placeholder="请输入数字" autocomplete="off" class="layui-input">
                    </div>
                    <div class="layui-form-mid layui-word-aux">&nbsp;&nbsp;KG</div>
                </div>
                <input type="hidden" name="userId" class="layui-input" value="${param.userId}">
                <div class="end-control-fram" style="width: 100%;display: flex;flex-direction: row;align-items: center;margin-top: 150px;">
                    <div class="end1" style="margin-right: auto;cursor: pointer;display: none">
                        <span class="iconfont iconskip" style="font-size: 20px;color: #3B78DD;"></span>
                        <span id="skipform" style="font-size: 20px;color: #3B78DD;" class="layui-btn">跳过此步骤</span>
                    </div>
                    <div class="next" style="margin-left: auto;cursor: pointer;display: none">
                        <span id="formDemo" class="layui-btn" lay-submit lay-filter="formDemo" style="font-size: 20px;color: #3B78DD">确定</span>
                        <span class="iconfont iconxiayibu" style="font-size: 20px;color: #3B78DD"></span>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<script>
    $(document).ready(function () {
        var agelist = ["无","10-18岁","19-23岁","24-28岁","29-33岁","34-38岁","39-43岁","44-48岁","48岁以上"]
        setTimeout(function(){
            $(".text-fram").hide(200,"linear",function () {
                $(".layui-form-item").show(400,"linear")
                $(".end1").show(400,"linear")
                $(".end2").show(400,"linear")
                $(".next").show(400,"linear")
            })
        },2500);
        layui.use(['form','layer'], function(){
            var form = layui.form;
            var layer = layui.layer;

            var result = {}
            result["userId"] = String(${param.userId});
            //跳过
            $(".end1").click(function () {
                $.ajax({
                    //跳过存取数据
                    type : "POST",
                    contentType: "application/json;charset=UTF-8",
                    url : "${ctx}/courses/skipInsert",
                    data : JSON.stringify(result),
                    datatype:"JSON",
                    success : function(re) {
                        if (re.code=="0"){
                            location.href="${ctx}/courses/info-fav?userId="+${param.userId}
                        }else{
                            layer.msg(re.msg);
                        }
                        result = null;
                    },
                    error : function(e){
                        layer.msg('服务器出错');
                        result = null;
                    }
                });
            })
            form.on('submit(formDemo)', function(data){
                data.field.age = agelist[data.field.age]
                $.ajax({
                    //存取数据
                    type : "POST",
                    contentType: "application/json;charset=UTF-8",
                    url : "${ctx}/courses/infoInsert",
                    data : JSON.stringify(data.field),
                    datatype:"JSON",
                    success : function(re) {
                        if (re.code=="0"){
                            location.href="${ctx}/courses/info-fav?userId="+${param.userId}
                        }else{
                            layer.msg(re.msg);
                        }
                        result = null;
                    },
                    error : function(e){
                        layer.msg('服务器出错');
                        result = null;
                    }
                });
                return false;
            })
        });
    })

</script>
</body>
</html>
