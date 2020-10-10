<%--
  Created by IntelliJ IDEA.
  User: songc
  Date: 2020/3/22
  Time: 15:17
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
    <%@ include file="../tags/taglib.jsp"%>
</head>
<style>
    body,html{
        width: 100%;
        height: 100%;
        overflow-x: hidden;
    }
    .layui-tab-title li:hover{
        border-bottom: 0.5px solid #5FB878;
        background-color: #f6f6f6;
    }
    .th3{
        color: #FF5722;
    }
</style>
<body>
    <div class="layui-card" style="margin-top: 15px;">
        <div class="layui-card-header">当前酒店：<span style="font-size: 22px;color: #3B78DD">${hotelInfo.hotelName}</span></div>
        <div class="layui-card-body">
            <table class="layui-hide" id="zao" lay-filter="zao"></table>
            <script type="text/html" id="barDemo">
                <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="detail">查看</a>
                <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
                <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
            </script>
        </div>
    </div>
</body>
<script>
    layui.use(['element','laypage','layer','table'], function() {
        var $ = layui.jquery
            , element = layui.element
            , laypage = layui.laypage
            , table = layui.table
            , layer = layui.layer;

        //执行一个 table 实例
        table.render({
            elem: '#zao'
            ,height: 450
            ,url: '${ctx}/admin/getHotelFoodKu'
            ,where: {hotelId: '${hotelInfo.hotelId}'}
            ,title: '食物库'
            ,method:"post"
            ,contentType: 'application/json'
            ,page: true
            ,toolbar: 'default' //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
            ,cols: [[ //表头
                {type: 'checkbox', fixed: 'left'}
                ,{field: 'foodId', title: 'ID', sort: true}
                ,{field: 'foodName', title: '食物名'}
                ,{field: 'foodType', title: '类别',sort: true}
                ,{field: 'foodCacul', title: '计量',}
                ,{field: 'foodContent', title: '备注'}
                ,{field: 'foodFatB', title: '所含热量(Kcal)'}
            ]]
        });
        //监听头工具栏事件
        table.on('toolbar(zao)', function(obj){
            var checkStatus = table.checkStatus(obj.config.id)
                ,data = checkStatus.data; //获取选中的数据
            switch(obj.event){
                case 'add':
                    layer.msg('添加');
                    break;
                case 'update':
                    if(data.length === 0){
                        layer.msg('请选择一行');
                    } else if(data.length > 1){
                        layer.msg('只能同时编辑一个');
                    } else {
                        layer.alert('编辑 [id]：'+ checkStatus.data[0].id);
                    }
                    break;
                case 'delete':
                    if(data.length === 0){
                        layer.msg('请选择一行');
                    } else {
                        layer.msg('删除');
                    }
                    break;
            };
        });

        //监听行工具事件
        table.on('tool(zao)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data //获得当前行数据
                ,layEvent = obj.event; //获得 lay-event 对应的值
            if(layEvent === 'detail'){
                layer.msg('查看操作');
            } else if(layEvent === 'del'){
                layer.confirm('真的删除行么', function(index){
                    obj.del(); //删除对应行（tr）的DOM结构
                    layer.close(index);
                    //向服务端发送删除指令
                });
            } else if(layEvent === 'edit'){
                layer.msg('编辑操作');
            }
        });

    });
</script>
</html>
