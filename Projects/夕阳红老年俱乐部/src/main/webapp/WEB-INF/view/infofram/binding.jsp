<%--
  Created by IntelliJ IDEA.
  User: 96081
  Date: 2020/4/6
  Time: 15:42
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../tags/taglib.jsp" %>
<html>
<head>
    <title>Binding</title>
</head>
<body>
    <div class="layui-form">
        <form role="form" class="form-inline" id="query-form" method="post" action="${ctx}/binding?id=${id}" >
            <div class="layui-inline" style="padding-top: 70px; width: 100%">
                <label class="layui-form-label">设备编号</label>
                <input  type="text" placeholder="请输入设备编号进行绑定" name="eid" value="${eid}" class="layui-input" style="width:80%;"/>
            </div>
            <div id="sub" class="form-group layui-inline"style="margin-top: 200px;margin-left: 600px">
                <button class="layui-btn" type="submit" >绑定</button>
            </div>
        </form>
    </div>
    <script>
        function preload(){
            var index=parent.layer.getFrameIndex(window.name); //获取当前窗口的name
            parent.location.reload();
            parent.layer.close(index);
        }
        $("#sub").click(function (){
                var index=parent.layer.getFrameIndex(window.name); //获取当前窗口的name
                setTimeout("parent.location.reload()",1000);
                parent.layer.close(index);
            }
        )
    </script>
</body>
</html>
