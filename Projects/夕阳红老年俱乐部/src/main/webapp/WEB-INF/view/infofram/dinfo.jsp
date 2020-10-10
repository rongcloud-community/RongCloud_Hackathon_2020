<%--
  Created by IntelliJ IDEA.
  User: scd
  Date: 2019/12/9
  Time: 11:34
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>修改信息</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <%@ include file="../../tags/taglib.jsp"%>
    <link rel="stylesheet" href="${ctx}/view/css/adminLogin.css">
</head>

<style>
    html,body {
        height: 100%;
        width: 100%;
    }

</style>

<body>
    <div class="layui-container" style="padding: 10px 10px;background: white;width: 100%;height: 100%;">

        <blockquote class="layui-elem-quote layui-text">
            <div style="font-size: 14px;color: #999999;">此信息将显示在您的个人资料中</div>
        </blockquote>

        <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
            <legend>修改个人信息</legend>
        </fieldset>

        <div class="layui-form">
            <form role="form" class="form-inline layui-form-pane" id="query-form" method="post" action="${ctx}/dinfo?id=${id}" >
                    <div class="layui-upload layui-col-md2" style="text-align: center">

                        <div class="layui-upload-list layui-inline" style="margin-left: -92px">
                            <img class="layui-upload-img layui-circle" id="demo1" width="95px" height="95px" class="layui-circle"src="${ctx}/view/image/${head}">
                            <p id="demoText"></p>
                        </div>
                        <div>
                            <button type="button" class="layui-btn layui-btn-primary layui-btn-radius layui-btn-sm" id="test1" style="margin-top: 100px">修改头像</button>

                        </div>

                    </div>

                    <div class="layui-col-md10">
    <%--                <form class="layui-form layui-form-pane" action="">--%>
<%--                     <form role="form" class="form-inline" id="query-form" method="post" action="${ctx}/dinfo" >--%>

                        <div class="layui-form-item">
                            <label class="layui-form-label" style="color: #8D8D8D;">修改昵称</label>
                            <div class="layui-input-block">
                                <input style="color: #9F9F9F;" type="text" name="name" value="${name}" lay-verify="title" autocomplete="off" placeholder="请输入新昵称" class="layui-input">
                            </div>
                        </div>

                        <div class="layui-form-item">
                            <label class="layui-form-label" style="color: #8D8D8D;">电话号码</label>
                            <div class="layui-input-block">
                                <input style="color: #9F9F9F;" type="text" name="tel" value="${tel}" lay-verify="title" autocomplete="off" placeholder="请输入电话号码" class="layui-input">
                            </div>
                        </div>

                        <div class="layui-form-item">
                            <label class="layui-form-label" style="color: #8D8D8D;">QQ</label>
                            <div class="layui-input-block">
                                <input style="color: #9F9F9F;" type="text" name="qq" value="${qq}" lay-verify="title" autocomplete="off" placeholder="请输入QQ" class="layui-input">
                            </div>
                        </div>

                        <div class="layui-form-item">
                            <label class="layui-form-label" style="color: #8D8D8D;">微信</label>
                            <div class="layui-input-block">
                                <input style="color: #9F9F9F;" type="text" name="wechat" value="${wechat}" lay-verify="title" autocomplete="off" placeholder="请输入微信" class="layui-input">
                            </div>
                        </div>

                        <div class="layui-form-item layui-form-text">
                            <label class="layui-form-label">个人描述</label>
                            <div class="layui-input-block">
                                <textarea placeholder="请输入内容" name="describe" value="${describe}" class="layui-textarea"></textarea>
                            </div>
                        </div>
                </div>
                <div class="form-group layui-inline"style="padding-left: 16%">
                    <button class="layui-btn" type="submit">&nbsp;点击修改</button>
                </div>
            </form>

        </div>
    </div>
<script>
    layui.use('upload', function(){
        var $ = layui.jquery
            ,upload = layui.upload;
        var id = ${id}
        //普通图片上传
        var uploadInst = upload.render({
            elem: '#test1'
            ,url: '${ctx}/upload?id='+id //改成您自己的上传接口
            ,before: function(obj){
                //预读本地文件示例，不支持ie8
                obj.preview(function(index, file, result){
                    $('#demo1').attr('src', result); //图片链接（base64）
                });
            }
            ,done: function(res){
                //如果上传失败
                return layer.msg('上传成功');
                // if(res.code > 0){
                //     return layer.msg('上传失败');
                // }
                //上传成功
            }
            // ,error: function(){
            //     //演示失败状态，并实现重传
            //     var demoText = $('#demoText');
            //     demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            //     demoText.find('.demo-reload').on('click', function(){
            //         uploadInst.upload();
            //     });
            // }
        });
    })
</script>
</body>
</html>
