<%--
  Created by IntelliJ IDEA.
  User: 96081
  Date: 2020/3/11
  Time: 16:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>detail</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <%@ include file="../../tags/taglib.jsp"%>
    <link rel="stylesheet" href="${ctx}/view/css/adminLogin.css">
</head>
<body  style="background-color: #F2F2F2;">

    <div class="layui-row">
        <div class="layui-col-xs12 layui-col-md9">
            <div style=" margin-left:3%;background-color: white;margin-top: 10px;padding-top: 5px;">
                <div name = "title" style="font-size: 25px;">
                    <fieldset class="layui-elem-field layui-field-title" style="padding-top: 30px;">
                        <legend>${s.title}</legend>
                    </fieldset>
                </div>

                <div style="padding-left: 40px;font-size: 16px;color:#9F9F9F;">
                    <text>
                        作者：${author.name}
                    </text>
                    <text style="padding-left: 20px">${s.sendtime}</text>
                </div>
                <div style="padding:30px;font-size: 16px;">
                   ${s.content}
                </div>
            </div>
            <div class="layui-tab-content" style=" margin-left:3%;background-color: white;margin-top: 10px;padding-top: 5px;">
                <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
                    <legend>评论</legend>
                </fieldset>
                <c:forEach items="${commentList}" var="n" varStatus="idx">
                    <div class="layui-tab-item layui-show">
                        <div class="layui-row layui-col-space10" style="padding:8px;height: 50px;border-bottom-style: solid;border-bottom-color: #D0D0D0;border-bottom-width: 1px">
                            <div class="layui-col-md1">
                                <img style="height: 40px;border-radius: 100%"src="${ctx}/view/image/${headList.get(idx.index)}" >
                            </div>
                            <div class="layui-col-md11">
                                <div style="font-size: 15px;">
                                    ${n.comment}
                                </div>
                            </div>

                        </div>
                    </div>
                </c:forEach>
            </div>
            <fieldset class="layui-elem-field layui-field-title" style="margin-top: 50px;">
                <legend>发表评论</legend>
            </fieldset>
            <div class="layui-form" style="width: 80%;padding-left: 10%;">
<%--                <form class="layui-form layui-form-pane" action="">--%>
                <form role="form" class="form-inline layui-form-pane" id="query-form" method="post" action="${ctx}/detail?sendid=${sendid}&id=${id}" >

                    <div class="layui-form-item layui-form-text">
                        <label class="layui-form-label">评论</label>
                        <div class="layui-input-block">
                            <textarea placeholder="请输入评论内容" name="content" value="${content}" class="layui-textarea"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <button class="layui-btn" type="submit" lay-filter="demo2">发表</button>
                    </div>
                </form>

            </div>
        </div>
        <div class="layui-col-xs6 layui-col-md3" style="position:fixed;margin-left: 76%">
            <div style="width: 80%;padding: 5%; ">

                <text style="font-size: 18px">/作者信息</text>

                <div style="background-color: white;width: 90%;height:85px;padding: 5%;margin-top: 15px">

                    <div class="layui-row layui-col-space10">
                        <div class="layui-col-md3">
                            <img style="height: 70px;"src="${ctx}/view/image/${author.head}" >
                        </div>
                        <div class="layui-col-md9" style="margin-left: 80px">
                            <a class="userlist" data-userid="${author.id}" style="font-size: 20px">${author.name}<br></a>
                            <text style="font-size: 14px">关注：${focus2}  粉丝：${focus1}</text>
                        </div>
                    </div>
                </div>
                <div style="background-color: white;margin-top: 5px;">
                    <div class="layui-tab-content">
                        <div class="layui-tab-item layui-show">
                            <c:forEach items="${sendList}" var="n" varStatus="idx">
                                <div class="layui-tab-item layui-show">

                                    <div class="layui-row layui-col-space10 sendlist" data-sendid="${n.sendid}" style="padding:8px;height: 50px;border-bottom-style: solid;border-bottom-color: #D0D0D0;border-bottom-width: 1px">
                                        <div style="font-size: 15px;">
                                            ${n.title}
                                        </div>
                                        <div style="font-size: 12px;color: #9F9F9F;overflow: hidden;white-space: nowrap;text-overflow:ellipsis;">
                                            ${n.content}
                                        </div>
                                    </div>
                                </div>
                            </c:forEach>

                        </div>

                    </div>

                </div>

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
            location.href="${ctx}/homepage?uid="+userid+"&id="+id;;
        })
    </script>
</body>
</html>
