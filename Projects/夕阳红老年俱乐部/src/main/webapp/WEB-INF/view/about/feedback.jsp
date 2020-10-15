<%--
  Created by IntelliJ IDEA.
  User: 96081
  Date: 2019/12/9
  Time: 13:43
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../tags/taglib.jsp" %>
<html>
<head>
    <title>意见反馈</title>
</head>
<body style="padding: 10px 10px;background: white;width: 100%;height: 100%;">
    <blockquote class="layui-elem-quote layui-text">
        欢迎大家留下对产品的反馈意见
    </blockquote>
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
        <legend>反馈意见填写</legend>
    </fieldset>

    <form   role="form" class="layui-form" method="post" action="${ctx}/feedback?id=${id}">
        <div class="layui-form-item" style="width: 95%">
            <label class="layui-form-label">标题</label>
            <div class="layui-input-block">
                <input type="text" name="title" value="${title}" lay-verify="title" autocomplete="off" placeholder="请输入标题" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item layui-form-text" style="width: 95%">
            <label class="layui-form-label">内容</label>
            <div class="layui-input-block">
                <textarea placeholder="请输入内容" name="content" value="${content}" class="layui-textarea"></textarea>
            </div>
        </div >


<%--        <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">--%>
<%--            <legend>图片上传</legend>--%>
<%--        </fieldset>--%>
<%--        <div class="layui-upload" style="width: 87%;padding-left: 100px;">--%>
<%--            <button type="button" class="layui-btn" id="test2">图片上传</button>--%>
<%--            <blockquote class="layui-elem-quote layui-quote-nm" style="margin-top: 10px;">--%>
<%--&lt;%&ndash;                预览图：&ndash;%&gt;--%>
<%--                <div class="layui-upload-list">--%>
<%--                    <img class="layui-upload-img" id="demo1">--%>
<%--&lt;%&ndash;                    <p id="demoText"></p>&ndash;%&gt;--%>
<%--                </div>--%>
<%--            </blockquote>--%>

<%--        </div>--%>
<%--        <div style="padding-left: 90%">--%>
<%--            <button type="button" class="layui-btn">提交</button>--%>
<%--        </div>--%>
        <div class="form-group" style="padding-left: 90%">
            <button class="layui-btn" type="submit" lay-filter="demo2">发表</button>
        </div>
    </form>
    <script>

    </script>
</body>
</html>
