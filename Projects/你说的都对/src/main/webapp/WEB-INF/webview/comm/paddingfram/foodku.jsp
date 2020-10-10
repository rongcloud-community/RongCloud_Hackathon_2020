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
    <%@ include file="../../tags/taglib.jsp"%>
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
            <table class="layui-table" lay-even="" lay-skin="nob">
                <colgroup>
                    <col width="150">
                    <col width="150">
                    <col width="150">
                    <col width="150">
                    <col width="150">
                </colgroup>
                <thead>
                <tr>
                    <th>食物</th>
                    <th>类型</th>
                    <th>计量概述</th>
                    <th>备注</th>
                    <th class="th3">约含热量(Kcal)</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div id="page0"></div>
        </div>
    </div>
</body>
<script>
    function showLoad() {
        return layer.msg('获取数据中...', {icon: 16,shade: [0.5, '#f5f5f5'],scrollbar: false,offset: 'auto', time:100000});
    }

    function closeLoad(index) {
        layer.close(index);

    }
    function showSuccess() {
        layer.msg('执行成功！',{time: 1000,offset: 'auto'});
    }
    layui.use(['element','laypage','layer','table'], function() {
        var $ = layui.jquery
            , element = layui.element
            , laypage = layui.laypage
            , table = layui.table
            , layer = layui.layer;

        //全局数据
        var layerflag;
        var record={};
        record["hotelId"] = '${hotelInfo.hotelId}'
        //获取数据
        $.ajax({
            //请求方式
            type : "POST",
            contentType: "application/json;charset=UTF-8",
            url : "${ctx}/padding/getFoodku",
            data : JSON.stringify(record),
            datatype:"JSON",
            beforeSend: function () {
                layerflag=showLoad();
            },
            success : function(re) {
                t=setInterval(function(){ closeLoad(layerflag); },600);
                if(re.code == "0"){
                    var data = re.foodlist;
                    if(data.length>0){
                        //调用分页
                        laypage.render({
                            elem: 'page0'
                            ,count: data.length
                            ,theme: '#3B78DD'
                            ,first: '首页'
                            ,last: '尾页'
                            ,prev: '<em>←</em>'
                            ,next: '<em>→</em>'
                            ,layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
                            ,jump: function(obj){
                                //模拟渲染
                                var arr = [],thisData = data.concat().splice(obj.curr*obj.limit - obj.limit, obj.limit);
                                $("table tbody").empty()
                                layui.each(thisData, function(index, item){
                                    $("table tbody").append('<tr>\n' +
                                        '                            <td>'+item.foodName+'</td>\n' +
                                        '                            <td>'+item.foodType+'</td>\n' +
                                        '                            <td>'+item.foodCacul+'</td>\n' +
                                        '                            <td>'+item.foodContent+'</td>\n' +
                                        '                            <td>'+item.foodFatB+'</td>\n' +
                                        '                        </tr>')
                                    arr.push('<li>'+ item +'</li>');
                                });
                                return arr.join('');
                            }
                        });
                    }else{
                        $("table tbody").append('<span style="color: #d8d8d8;font-size: 13px;">暂无数据</span>')
                    }
                }else{
                    layer.msg(re.msg,function () {});
                }
            },
            error : function(e){
                closeLoad(layerflag);
                layer.msg('服务器出错，拉取数据失败...',function () {});
            }
        });

    });
</script>
</html>
