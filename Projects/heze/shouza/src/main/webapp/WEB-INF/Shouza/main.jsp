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
<style>
    body{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .layui-card{
        -moz-box-shadow: 2px 2px 10px #909090;
        -webkit-box-shadow: 2px 2px 10px #909090;
        box-shadow:2px 2px 10px #909090;
        border: 1px solid #F8F8F8;
        border-radius: 9px;
    }
</style>
<body style="background-color: white;height: 100%;width: 100%">
<div style="margin-top: 100px;">
    <span style="color: #666666;font-size: 22px;">欢迎来到小鱼手札</span>
</div>
<div class="layui-carousel" id="shouza" lay-filter="shouza" style="margin-top: 50px;">
    <div carousel-item="" style="">
        <div style="background-color: white;display: flex;flex-direction: column;justify-content: center;align-items: center">
            <div class="layui-card" data-id="card1" style="width: 400px;height: 300px;background-color: #fff9ec">
                <div class="layui-card-header">今日无风有雨</div>
                <div class="layui-card-body" style="text-align: center">
                    今日无风有雨<br>
                    何人前来一叙
                </div>
            </div>
        </div>
        <div style="background-color: white;display: flex;flex-direction: column;justify-content: center;align-items: center">
            <div class="layui-card" data-id="card2" style="width: 400px;height: 300px;background-color: #fff9ec">
                <div class="layui-card-header">融云IM好难呀</div>
                <div class="layui-card-body" style="text-align: center">
                    求个大佬教一教
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    layui.use(['carousel', 'form'], function(){
        var carousel = layui.carousel
            ,form = layui.form;

        //改变下时间间隔、动画类型、高度
        carousel.render({
            elem: '#shouza'
            ,interval: 5000
            ,anim: 'fade'
            ,width: '100%'
            ,height: '400px'
        });


        $(".layui-card").click(function () {
            var value = {}
            value['userid'] = 'testid001'
            var roomId = $(this).data('id')

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
