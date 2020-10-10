<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>404页面</title>
    <meta name="renderer" content="webkit" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />
    <%@ include file="../tags/taglib.jsp"%>
    <link rel="stylesheet" type="text/css" href="${ctx}/webview/error/css/style.css">
</head>
<style>
    html,body{
        width: 100%;
        height: 100%;
    }
    img{
        height: 100%;
        overflow: hidden;
    }
</style>
<body>
<div class="container">
    <img class="bg" src="${ctx}/images/error/404.png"/>
</div>
</body>
</html>