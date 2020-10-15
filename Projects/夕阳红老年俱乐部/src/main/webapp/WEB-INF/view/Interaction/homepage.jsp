<%--
  Created by IntelliJ IDEA.
  User: 96081
  Date: 2020/3/19
  Time: 14:56
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<html>
<head>
    <title>homepage</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <%@ include file="../../tags/taglib.jsp"%>
    <link rel="stylesheet" href="${ctx}/view/css/adminLogin.css">
</head>
<body style="background-color: #F2F2F2">
<div class="layui-row">
    <div class="layui-col-xs12 layui-col-md9">
        <div style=" margin-left:3%;background-color: white;margin-top: 10px;padding-top: 5px;height: 120px;">
            <div class="layui-col-md3">
                <img style="height: 90px;border-radius: 100%;margin-top: 15px;margin-left: 10px;"src="${ctx}/view/image/${n.head}" >
            </div>
            <div class="layui-col-md9" style="margin-left: 150px;margin-top: 25px">
                <text style="font-size: 30px">${n.name}</text>
                <c:if test="${test}">
                    <c:if test="${test2}">
                        <button type="button" class="layui-btn layui-btn-primary layui-btn-sm layui-inline add" data-id="${id}" data-fid="${uid}" style="margin-left: 70%;">关注</button>
                        <button type="button" class="layui-btn layui-btn-primary layui-btn-sm layui-inline">私信</button>
                    </c:if>
                    <c:if test="${!test2}">
                        <button type="button" class="layui-btn layui-btn-primary layui-btn-sm layui-inline" style="margin-left: 70%;">私信</button>
                    </c:if>

                </c:if>
                <text style="font-size: 18px;color: #9F9F9F"><br>${n.ddescribe}</text>
            </div>
        </div>
        <div class="layui-tab-content" style=" margin-left:3%;background-color: white;margin-top: 10px;padding-top: 5px;">
            <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
                <legend>他发表的</legend>
            </fieldset>

            <c:forEach items="${sendList}" var="n" varStatus="idx">

                <div class="layui-row layui-col-space15"  style="cursor: pointer">
                    <div class="layui-col-md12" >
<%--                        <div class="layui-card" herf="${ctx}/view/Interaction/detail.jsp">--%>
                        <div class="layui-card sendlist"  data-sendid="${n.sendid}" style="margin-top: 5px;">
<%--                        <div class="layui-card" id="jump" name="${n.sendid}">--%>

                            <div class="layui-card-header" style="font-size: 17px;">${n.title}</div>
                            <div class="layui-card-body" style="color:#B1B1B1; ">
                                <div style="overflow: hidden;white-space: nowrap;text-overflow:ellipsis;">${n.content}<br></div>
                                <text style="padding-left: 80%;font-size: 12px">${n.sendtime}</text>
                            </div>
                        </div>
                    </div>
                </div>
            </c:forEach>
        </div>
    </div>

    <div class="layui-col-xs6 layui-col-md3" style="position:fixed;margin-left: 76%">
        <div style="width: 80%;padding: 5%; background-color: white;margin-top: 10%">
            <div class="layui-row" style="align-items: center;text-align: center">
                <div class="layui-col-xs6" style="border-right-style:solid;border-right-color: #9F9F9F;border-right-width: 1px; ">
                    <a data-userid="${uid}" class="grid-demo grid-demo-bg1 focus0">
                        <text style="font-size: 20px;">${focus2}<br></text>
                        他关注的
                    </a>
                </div>
                <a data-userid="${uid}" class="layui-col-xs6 focus1">
                    <text style="font-size: 20px;">${focus1}<br>
                    </text>
                    关注他的
                </a>
            </div>
        </div>
        <div style="margin-top: 20px; width: 90%;background-color: white;padding-top: 10px;">
            <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
                <legend>相关用户</legend>
            </fieldset>
            <c:forEach items="${userList}" var="n" varStatus="idx">
                <a class="layui-tab-item layui-show userlist" data-userid="${n.id}">
                    <div class="layui-row layui-col-space10" style="padding-left:20px;height: 50px;border-bottom-style: solid;border-bottom-color: #D0D0D0;border-bottom-width: 1px">
                        <div class="layui-col-md3">
                            <img style="height: 40px;border-radius: 100%"src="${ctx}/view/image/${n.head}" >
                        </div>
                        <div class="layui-col-md9">
                            ${n.name}
                        </div>
                    </div>
                </a>
            </c:forEach>

        </div>

    </div>

</div>
<script>
    $(".sendlist").click(function () {
        var sendid = $(this).data("sendid");
        var id = ${id};
        console.log("send"+sendid);
        location.href="${ctx}/detail?sendid="+sendid+"&id="+id;
    })
    $(".userlist").click(function () {
        var userid = $(this).data("userid");
        var id = ${id};
        console.log("user"+userid);
        location.href="${ctx}/homepage?uid="+userid+"&id="+id;
    })
    $(".focus0").click(function () {
        var userid = $(this).data("userid");
        var id = ${id};
        console.log("user"+userid);
        location.href="${ctx}/focus?uid="+userid+"&type="+0+"&id="+id;
    })
    $(".focus1").click(function () {
        var userid = $(this).data("userid");
        var id = ${id};
        console.log("user"+userid);
        location.href="${ctx}/focus?uid="+userid+"&type="+1+"&id="+id;
    })
    layui.use('layer',function(){
        $(".add").click(function () {
            var id = $(this).data("id");
            var fid = $(this).data("fid");
            var params = {};
            params.id = id;
            params.fid = fid;

            console.log(id+fid);
            <%--url="${ctx}/delete?id="+id+"&fid="+fid;--%>
            $.ajax({
                //请求方式
                type : "POST",
                contentType: "application/json;charset=UTF-8",
                url : "${ctx}/addFocus",
                // /?name="+loginUsername+"&password="+loginPassword,
                //data : {"name": + loginUsername,"password": + loginPassword},
                data: JSON.stringify(params),
                datatype:"JSON",
                success : function(re) {
                    layer.msg(re.msg);
                    if (re.code==0){
                        layer.msg('已添加关注');
                        location.reload();
                    }
                },
                error : function(e){
                    layer.msg('服务器出错');
                }
            });
        })

    })

</script>
</body>
</html>
