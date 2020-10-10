<%--
  Created by IntelliJ IDEA.
  User: songc
  Date: 2020/3/22
  Time: 14:50
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

    .head-tags{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .head-tags .iconfont{
        font-size: 32px;
    }
    .head-tags .icontext{
        color: #888888;
        font-size: 14px;
        margin-left: 5px;
    }
    .head-tags .showtext{
        color: #888888;
        font-size: 16px;
    }
    .gonggao{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

</style>
<body>

    <fieldset class="layui-elem-field site-demo-button" style="border-radius: 4px;border: 1px solid #3B78DD;">
        <legend >
            <span class="iconfont iconjiudian" style="color: #3B78DD;font-size: 22px;"></span>
            <span class="welcomeTitle" style="color: #888888;font-size: 16px;"></span>
            <span style="color: #3B78DD;font-size: 22px;">${hotelInfo.hotelName}</span>
            <span style="color: #888888;font-size: 16px;">现已提供餐饮服务 ： </span>
        </legend>
        <div style="padding: 10px;">
            <div class="layui-card">
                <div class="layui-card-header">
                    <span class="iconfont iconzaocan"><span style="margin-left: 5px;">早餐搭配</span></span>
                </div>
                <div class="layui-card-body">
                    <table class="layui-hide" id="zao" lay-filter="zao"></table>
                    <script type="text/html" id="barDemo">
                        <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="detail">查看</a>
                        <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
                        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
                    </script>
                </div>
            </div>
            <div class="layui-card">
                <div class="layui-card-header">
                    <span class="iconfont iconwucan"><span style="margin-left: 5px;">午餐搭配</span></span>
                </div>
                <div class="layui-card-body">
                    <table class="layui-hide" id="wu" lay-filter="wu"></table>
                    <script type="text/html" id="barWu">
                        <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="detail">查看</a>
                        <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
                        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
                    </script>
                </div>
            </div>
            <div class="layui-card">
                <div class="layui-card-header">
                    <span class="iconfont iconzaocanwancan"><span style="margin-left: 5px;">晚餐搭配</span></span>
                </div>
                <div class="layui-card-body">
                    <table class="layui-hide" id="wan" lay-filter="wan"></table>
                    <script type="text/html" id="barWan">
                        <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="detail">查看</a>
                        <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
                        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
                    </script>
                </div>
            </div>
        </div>
    </fieldset>
</body>
<script>
    layui.use(['form', 'layedit', 'laydate','element','upload','laypage','table'], function() {
        var $ = layui.jquery;
        var form = layui.form
            , layer = layui.layer
            , layedit = layui.layedit
            , laydate = layui.laydate
            ,laypage = layui.laypage //分页
            ,table = layui.table //表格
            , upload = layui.upload;


        //执行一个 table 实例
        table.render({
            elem: '#zao'
            ,height: 420
            ,url: '${ctx}/admin/getMealList'
            ,where: {hotelId: '${hotelInfo.hotelId}', mealType: 0}
            ,title: '早餐表'
            ,method:"post"
            ,contentType: 'application/json'
            ,page: true //开启分页
            ,toolbar: 'default' //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
            ,cols: [[ //表头
                {type: 'checkbox', fixed: 'left'}
                ,{field: 'mealId', title: 'ID', sort: true, fixed: 'left'}
                ,{field: 'stapleName', title: '主食'}
                ,{field: 'stapleCacul', title: '主食计量'}
                ,{field: 'memname', title: '肉蛋奶'}
                ,{field: 'memcacul', title: '肉蛋奶计量'}
                ,{field: 'vfname', title: '蔬菜'}
                ,{field: 'vfcacul', title: '蔬菜计量'}
                ,{field: 'greaseName', title: '油脂'}
                ,{field: 'greaseCacul', title: '油脂计量'}
                ,{field: 'otherName', title: '其他'}
                ,{field: 'otherCacul', title: '其他计量'}
                ,{field: 'totalFatB', title: '总热量(Kcal)'}
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

        //执行一个 table 实例
        table.render({
            elem: '#wu'
            ,height: 420
            ,url: '${ctx}/admin/getMealList'
            ,where: {hotelId: '${hotelInfo.hotelId}', mealType: 1}
            ,title: '早餐表'
            ,method:"post"
            ,contentType: 'application/json'
            ,page: true //开启分页
            ,toolbar: 'default' //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
            ,cols: [[ //表头
                {type: 'checkbox', fixed: 'left'}
                ,{field: 'mealId', title: 'ID', sort: true, fixed: 'left'}
                ,{field: 'stapleName', title: '主食'}
                ,{field: 'stapleCacul', title: '主食计量'}
                ,{field: 'memname', title: '肉蛋奶'}
                ,{field: 'memcacul', title: '肉蛋奶计量'}
                ,{field: 'vfname', title: '蔬菜'}
                ,{field: 'vfcacul', title: '蔬菜计量'}
                ,{field: 'greaseName', title: '油脂'}
                ,{field: 'greaseCacul', title: '油脂计量'}
                ,{field: 'otherName', title: '其他'}
                ,{field: 'otherCacul', title: '其他计量'}
                ,{field: 'totalFatB', title: '总热量(Kcal)'}
            ]]
        });
        //监听头工具栏事件
        table.on('toolbar(wu)', function(obj){
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
        table.on('tool(wu)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
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

        //执行一个 table 实例
        table.render({
            elem: '#wan'
            ,height: 420
            ,url: '${ctx}/admin/getMealList'
            ,where: {hotelId: '${hotelInfo.hotelId}', mealType: 2}
            ,title: '早餐表'
            ,method:"post"
            ,contentType: 'application/json'
            ,page: true //开启分页
            ,toolbar: 'default' //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
            ,cols: [[ //表头
                {type: 'checkbox', fixed: 'left'}
                ,{field: 'mealId', title: 'ID', sort: true, fixed: 'left'}
                ,{field: 'stapleName', title: '主食'}
                ,{field: 'stapleCacul', title: '主食计量'}
                ,{field: 'memname', title: '肉蛋奶'}
                ,{field: 'memcacul', title: '肉蛋奶计量'}
                ,{field: 'vfname', title: '蔬菜'}
                ,{field: 'vfcacul', title: '蔬菜计量'}
                ,{field: 'greaseName', title: '油脂'}
                ,{field: 'greaseCacul', title: '油脂计量'}
                ,{field: 'otherName', title: '其他'}
                ,{field: 'otherCacul', title: '其他计量'}
                ,{field: 'totalFatB', title: '总热量(Kcal)'}
            ]]
        });
        //监听头工具栏事件
        table.on('toolbar(wan)', function(obj){
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
        table.on('tool(wan)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
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

        now = new Date(),hour = now.getHours()
        if(hour < 6){$(".welcomeTitle").text("凌晨好！ - 欢迎您")}
        else if (hour < 9){$(".welcomeTitle").text("早上好！ - 欢迎您")}
        else if (hour < 12){$(".welcomeTitle").text("上午好！ - 欢迎您")}
        else if (hour < 14){$(".welcomeTitle").text("中午好！ - 欢迎您")}
        else if (hour < 17){$(".welcomeTitle").text("下午好！ - 欢迎您")}
        else if (hour < 19){$(".welcomeTitle").text("傍晚好！ - 欢迎您")}
        else if (hour < 22){$(".welcomeTitle").text("晚上好！ - 欢迎您")}
        else {$(".welcomeTitle").text("夜里好！ - 欢迎您")}


    })

    $(".iconqiehuan").click(function () {
        location.href = "${ctx}/padding/pad-foodku?userId="+${param.userId};
    })
</script>
</html>
