<%--
  Created by IntelliJ IDEA.
  User: 96081
  Date: 2020/10/7
  Time: 13:56
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html; charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>CallLib Demo</title>
    <%@ include file="../tags/taglib.jsp" %>
    <script src="//cdn.ronghub.com/RongIMLib-2.4.0.js"></script>
    <script src="//cdn.ronghub.com/RongRTC-3.0.4.js"></script>
    <script src="//cdn.ronghub.com/RongCallLib-3.1.5.js"></script>
    <script type="text/javascript" src="${ctx}/component/im.js"></script>
    <script type="text/javascript" src="${ctx}/component/calllib.js"></script>

    <style>
        .hide{display: none;}
    </style>
</head>
<body>
<h1>视频通话</h1>
<div style="height:300px; background-image: url(${ctx}/view/image/call_back.jpg)">
<%--    <img src="${ctx}/view/image/call_back.jpg" class="imgStyle">--%>
    <div style="padding-top: 35px;">

        点击拨打视频电话
        <!-- 发起通话按钮-->
        <img id="call" style="height: 50px;width: 50px" src="${ctx}/view/image/call.png" onclick="call()"></img>
    </div>
    <!-- 接听通话按钮-->
    <div id="RringDiv" style="padding-top: 35px;" class="hide">
        收到音视频呼叫是否接听？
        <img id="accept" style="height: 50px;width: 50px" src="${ctx}/view/image/get_call.png" onclick="accept()"></img>

    </div>
</div>
<!-- 用于添加 video-->
<div id="box"></div>
</body>

</html>


