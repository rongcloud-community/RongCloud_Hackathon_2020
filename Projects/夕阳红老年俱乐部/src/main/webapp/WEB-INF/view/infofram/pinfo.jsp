<%--
  Created by IntelliJ IDEA.
  User: 96081
  Date: 2020/3/19
  Time: 16:57
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
        <div style="font-size: 14px;color: #999999;">设置新的登录密码</div>
    </blockquote>

    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
        <legend>修改密码</legend>
    </fieldset>

    <div class="layui-row">
        <div class="layui-col-md2" style="text-align: center">
            <div class="layui-inline" style="margin-left: -92px" >
                <img src="${ctx}/view/image/${n.head}" width="95px" height="95px" class="layui-circle">
            </div>
        </div>
        <div class="layui-col-md10">
            <form role="form" class="form-inline layui-form-pane" id="query-form" method="post" action="${ctx}/pinfo?id=${id}" >

                <div class="layui-form-item">
                    <label class="layui-form-label" style="color: #8D8D8D;">原密码</label>
                    <div class="layui-input-block">
                        <input style="color: #9F9F9F;" type="password" lay-verify="pass" autocomplete="off" name="oldPassword" value="${oldPassword}"  placeholder="请输入原密码" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label" style="color: #8D8D8D;">新密码</label>
                    <div class="layui-input-block">
                        <input style="color: #9F9F9F;" type="password" lay-verify="pass" autocomplete="off" name="newPassword1" value="${newPassword1}" placeholder="请输入新密码" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label" style="color: #8D8D8D;">确认新密码</label>
                    <div class="layui-input-block">
                        <input style="color: #9F9F9F;" type="password" lay-verify="pass" autocomplete="off" name="newPassword2" value="${newPassword2}" placeholder="请确认新密码" class="layui-input">
                    </div>
                </div>

<%--                <div class="layui-form-item">--%>
<%--                    <button class="layui-btn" lay-submit="" lay-filter="demo2">点击修改</button>--%>
<%--                </div>--%>
                <div class="form-group layui-inline">
                    <button class="layui-btn" type="submit">&nbsp;点击修改</button>
                </div>

            </form>
        </div>
    </div>



</div>

</body>
</html>
