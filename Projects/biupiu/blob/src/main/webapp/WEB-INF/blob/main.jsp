<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>我的博客</title>
    <meta name="renderer" content="webkit" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />
    <%@ include file="tags/taglib.jsp"%>
    <script src="http://cdn.ronghub.com/RongIMLib-3.0.7-dev.js"></script>
</head>
<body style="background-color: #F2F2F2">

<ul class="layui-nav" style="">
    <li class="layui-nav-item">
        <a href="">新消息<span class="layui-badge">9</span></a>
    </li>
    <li class="layui-nav-item">
        <a href="">个人中心<span class="layui-badge-dot"></span></a>
    </li>
    <li class="layui-nav-item" lay-unselect="">
        <a href="javascript:;"><img src="//t.cn/RCzsdCq" class="layui-nav-img">MyBlob</a>
        <dl class="layui-nav-child">
            <dd><a href="javascript:;">修改信息</a></dd>
            <dd><a href="javascript:;">安全管理</a></dd>
            <dd><a href="javascript:;">退了</a></dd>
        </dl>
    </li>
    <li class="layui-nav-item">
        <a id="doCon" data-id="connectme130">联系我<span class="layui-badge-dot"></span></a>
    </li>
</ul>

<fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
    <legend>我的博文</legend>
</fieldset>

<div style="padding: 20px; background-color: #F2F2F2;">
    <div class="layui-row layui-col-space15">
        <div class="layui-col-md6">
            <div class="layui-card">
                <div class="layui-card-header">NoSQL兴起的原因</div>
                <div class="layui-card-body">
                    关系数据库已经无法满足Web2.0的需求。主要表现在以下几个方面:<br>
                    （1）无法满足海量数据的管理需求<br>
                    （2） 。。。
                </div>
            </div>
        </div>
        <div class="layui-col-md6">
            <div class="layui-card">
                <div class="layui-card-header">MySQL集群是否可以完全解决问题？</div>
                <div class="layui-card-body">
                    复杂性：部署、管理、配置很复杂<br>
                    MySQL主备之间采用复制方式，只能是异步复制，当主库压力较大时可能产...
                </div>
            </div>
        </div>
        <div class="layui-col-md12">
            <div class="layui-card">
                <div class="layui-card-header">技术杂谈</div>
                <div class="layui-card-body">
                    <li>
                        <ul>
                            如何使用原生js进行弹窗开发？
                        </ul>
                        <ul style="margin-top: 20px;">
                            融云IM如何引入即时通讯SDK
                        </ul>
                        <ul style="margin-top: 20px;">
                            。。。
                        </ul>
                    </li>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    layui.use('layer', function() { //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句

        $("#doCon").click(function () {
            var value = {}
            value['userid'] = 'viewer001'
            var roomId = $(this).data('id')

            //配置一个透明的询问框
            layer.msg('系统当前为您分配ID为：viewer001', {
                time: 20000, //20s后自动关闭
                btn: ['明白了', '知道了', '哦']
            });

            $.ajax({
                type : "POST",
                contentType: "application/json;charset=UTF-8",
                url : "${ctx}/main/getToken",
                data: JSON.stringify(value),
                datatype:"JSON",
                success : function(re) {
                    var tokenresult = re.tokenResult
                    if(tokenresult){
                        location.href="${ctx}/main/liuyan?userId="+tokenresult["userId"]+"&token="+tokenresult["token"]+"&roomId="+roomId
                    }else{
                        layer.msg('访问错误', {
                            time: 20000, //20s后自动关闭
                            btn: ['明白了', '知道了', '哦']
                        });
                    }
                },
                error : function(re){
                    layer.msg('访问错误', {
                        time: 20000, //20s后自动关闭
                        btn: ['明白了', '知道了', '哦']
                    });
                }
            });
        })

    })
</script>

</body>

</html>
