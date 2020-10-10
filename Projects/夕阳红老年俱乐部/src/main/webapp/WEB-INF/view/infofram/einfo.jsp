<%--
  Created by IntelliJ IDEA.
  User: scd
  Date: 2019/12/9
  Time: 15:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>设备信息管理</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <%@ include file="../../tags/taglib.jsp"%>
    <link rel="stylesheet" href="${ctx}/view/css/adminLogin.css">
</head>

<style>
    html, body{
        width: 100%;
        height: 100%;
    }
</style>

<body>
    <div class="layui-container" style="padding: 10px 10px;background: #F2F2F2;width: 100%;height: 100%;">

        <blockquote class="layui-elem-quote layui-text" style="background-color: white">
            <div style="font-size: 14px;color: #999999;">绑定设备可以查看行记录，出行安排以及实时追踪，为您和家人的出行提供可视化追踪，更安全，更放心。</div>
        </blockquote>


        <div class="layui-row layui-col-space15">
            <c:if test="${count}">
                <div class="layui-col-md12">
                    <div class="layui-card">
                        <div class="layui-card-header" style="font-weight: bold ;">设备信息</div>
                        <div class="layui-card-body">
                            <div style="display: flex;flex-direction: row">
                                <div style="flex: 1;border-right: 1px solid #999999;">
                                    <span style="font-size: 14px;color: #999999;">设备名称</span><br>
                                    <span style="font-size: 18px;color: black;">${e.ename}</span>
                                </div>
                                <div style="flex: 1;border-right: 1px solid #999999;">
                                    <span style="font-size: 14px;color: #999999;margin-left: 6px;">设备编号</span><br>
                                    <span style="font-size: 18px;color: black;margin-left: 6px;">${e.eid}</span>
                                </div>
                                <div style="flex: 1;border-right: 1px solid #999999;">
                                    <span style="font-size: 14px;color: #999999;margin-left: 6px;">设备已使用</span><br>
                                    <span style="font-size: 18px;color: black;margin-left: 6px;">${time}天</span>
                                </div>
                                <div style="flex: 1;">
                                    <span style="font-size: 14px;color: #999999;margin-left: 6px;">最后定位</span><br>
                                    <span style="font-size: 18px;color: black;margin-left: 6px;">湖南省长沙市渔人码头</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="layui-col-md12">
                    <div class="layui-card">
                        <div class="layui-card-header" style="">
                            <span style="font-weight: bold ">绑定设备</span>
                        </div>

                        <div class="layui-card-body">

                            <table class="layui-table" style="" lay-skin="line">
                                <colgroup>
                                    <col width="150">
                                    <col width="150">
                                    <col width="200">
                                    <col>
                                </colgroup>
                                <thead>
                                <tr>
                                    <th>设备名称</th>
                                    <th>设备编号</th>
                                    <th>绑定时间</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>${e.ename}</td>
                                    <td>${e.eid}</td>
                                    <td>${e.bindingTime}</td>
                                    <td>
                                        <span style="color: #009E94;">已启用</span>
                                    </td>
                                    <td>
<%--                                        <a  onclick="econfirm(${id})" style="color: #2D93CA">解绑</a>--%>
                                            <a id=unbinding  name=${id}  style="color:#2D93CA">解绑</a>
                                    </td>

                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </c:if>
            <c:if test="${!count}">
                <div class="layui-col-md12">
                <div class="layui-card">
                    <div class="layui-card-header" style="">
                        <span style="font-weight: bold ">绑定设备</span>
                        <button type="button" id="binding" class="layui-btn layui-btn-sm" style="float: right;margin-right: 14px;margin-top: 5px;" name=${id}>添加设备</button>
                    </div>

                    <div class="layui-card-body">

                        <table class="layui-table" style="" lay-skin="line">
                            <colgroup>
                                <col width="150">
                                <col width="150">
                                <col width="200">
                                <col>
                            </colgroup>
                            <thead>
                            <tr>
                                <th>设备名称</th>
                                <th>设备编号</th>
                                <th>绑定时间</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    赶快绑定您的设备吧~
                                </td>
                                <td></td>

                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </c:if>
        </div>

    </div>
    <script>
        function reload() {
            location.reload();
        }
        layui.use('layer',function(){

            // $(".btn").click(function () {
            //     var uid = $(this).attr("id");
            //     console.log(uid);
            $("#unbinding").click(function () {
                var uid = $(this).attr("name");
                // console.log(uid);
                layer.confirm('确定解除绑定吗?', {icon: 3, title: '提示', btn: ['确定','取消'] }, function (index) {
                    var id = uid;
                    $.ajax({
                        url: "unbinding",
                        data: {
                            id: id
                        },
                        success: function (data) {
                            if (isSuccess(data)) {
                                location.reload();
                            }
                        }
                    });
                    location.reload();
                    layer.close(index);
                });
            })
            $("#binding").click(function () {
                var uid = $(this).attr("name");
                // var eid = $("input[name=eid]").val();
                // console.log(eid);
                layer.open({

                    title: '绑定设备',
                    type: 2,
                    skin: 'layui-layer-rim', //加上边框
                    area: ["690px", "400px"], //宽高
                    content: "${ctx}/binding?id=" + uid,
                    // btn: ['确定', '取消'],
                    // btn: [ '取消'],

                    // cancel: function(index){ //或者使用btn2
                    //     location.reload();
                    //     //按钮【按钮二】的回调
                    // },
                    end: function() {
                        location.reload();
                        // alert('end')
                    }
                });
                // location.reload();
            })
        })
        // function econfirm(id){
        //     var layer = layui.layer;
        //     layer.confirm('确定解除绑定吗?', {icon: 3, title: '提示', btn: ['确定','取消'] }, function (index) {
        //         var id = id;
        //         $.ajax({
        //             url: "unbinding?id=" + id,
        //             data: {
        //                 id: id
        //             },
        //             success: function (data) {
        //                 if (isSuccess(data)) {
        //                     reload();
        //                 }
        //             }
        //         });
        //         layer.close(index);
        //     });
        // }
    </script>
</body>
</html>
