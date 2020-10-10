<%--
  Created by IntelliJ IDEA.
  User: songc
  Date: 2020/3/13
  Time: 16:50
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
    html,body{
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        font-family: -apple-system,"Helvetica Neue",Arial,"PingFang SC","Hiragino Sans GB",STHeiti,"Microsoft YaHei","Microsoft JhengHei","Source Han Sans SC","Noto Sans CJK SC","Source Han Sans CN","Noto Sans SC","Source Han Sans TC","Noto Sans CJK TC","WenQuanYi Micro Hei",SimSun,sans-serif;
    }
    .container{
        background-color: white;
        margin: 0 auto;
        width: 100%;
        height: 100%;
    }
    .phead{
        height: 10%;
        border-bottom: 1px solid #D0D0D0;
    }
    .pmid{
        height: 82%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 12px 0 12px;
    }
    .pmid .mid-fram {
        width: 100%;
        height: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    input{
        width: 98%;
        height: 24px;
        border-radius: 4px;
        border: 1px solid #aaa;
        padding: 14px 4px;
        background: 0 0;
        text-align: left;
        font-size: 20px;
        line-height: 50px;
        text-indent: 12px;
    }
    input::-moz-placeholder { /* Mozilla Firefox 19+ */
        color:    #FAFAFA;
    }
    .layui-form-checked i{
        border-color:#3B78DD !important;
        background-color:#FFF !important;
        color:#3B78DD !important;
        font-weight: bold;
    }

    .layui-form-checked span, .layui-form-checked:hover span {
        background-color: #3B78DD;
    }

</style>

<body>
<div class="container">
    <div class="phead" style="display: flex;flex-direction: row ;align-items: center;">
        <div style="margin-left: 20px;display: flex;flex-direction: row;align-items: center" >
            <img src="${ctx}/images/backimg/logo.png" alt="" width="150px">
            <div style="border-left: 1px solid #888888;height: 30px;display: flex;flex-direction: row ;align-items: center;">
                <p style="margin-left: 10px;color: #888888;font-size: 16px">个性化服务</p>
            </div>
        </div>
        <div class="" style="margin-left: auto;display: flex;flex-direction: row;align-items: center;margin-right:20px;">
            <p style="margin-right:12px;color: #666666;font-size: 12px">关于我们</p>
            <p style="margin-right:12px;color: #666666;font-size: 12px">技术介绍</p>
            <div style="border-left: 1px solid #888888;display: flex;flex-direction: row ;align-items: center;">
                <p style="margin-left: 12px;margin-right:12px;color: #666666;font-size: 12px">帮助</p>
            </div>
            <p style="color: #666666;font-size: 12px">意见反馈</p>
        </div>
    </div>
    <div class="pmid" style="">
        <div style="background-color: white;text-align: center">
            <p style="font-size: 22px;color: #3B78DD;margin-bottom: 6px;">课程分类</p>
            <p style="color: #c2c2c2;font-size: 16px;">丰富的训练课程，规范你的训练过程</p>
        </div>
        <div class="mid-fram" style="background-color: white;margin-top: 20px;position: relative">
            <div class="layui-carousel" id="backimg" style="position: absolute;">
                <div carousel-item>
                    <div style="background-image:url(${ctx}/images/backimg/bg01-f.jpg); background-repeat: no-repeat;background-size: 100%"></div>
                    <div style="background-image:url(${ctx}/images/backimg/bg02-f.jpg); background-repeat: no-repeat;background-size: 100%"></div>
                    <div style="background-image:url(${ctx}/images/backimg/bg03-f.jpg); background-repeat: no-repeat;background-size: 100%"></div>
                </div>
            </div>
            <form class="layui-form layui-form-pane " action="" style="width: 50%;">
                <div class="layui-form-item">
                    <div class="layui-input-block" style="display: block;text-align: center;margin-left: 20px;"></div>
                </div>
            </form>
        </div>
        <div class="end-control-fram" style="width: 100%;display: flex;flex-direction: row;align-items: center">
            <div id="skip" style="margin-right: auto;cursor: pointer;">
                <span class="iconfont iconskip" style="font-size: 20px;color: #3B78DD;"></span>
                <span style="font-size: 20px;color: #3B78DD;">跳过此步骤</span>
            </div>
            <span style="font-size: 12px;color: #BBBBBB;">系统收集信息只为您推荐服务，若您不想使用该服务，可选择跳过</span>
            <div id="formthis" style="margin-left: auto;cursor: pointer;">
                <span style="font-size: 20px;color: #3B78DD">完成</span>
                <span class="iconfont iconxiayibu" style="font-size: 20px;color: #3B78DD"></span>
            </div>
        </div>
    </div>
</div>
<script>
    $(document).ready(function () {
        layui.use('form', function(){
            var form = layui.form;
            //从后台获取类型列表
            $.ajax({
                //请求方式
                type : "POST",
                contentType: "application/json;charset=UTF-8",
                url : "${ctx}/courses/getLabelList",
                success : function(re) {
                    if (re.code=="0"){
                        var list = re.list;
                        console.log(list.length)
                        for(var i=0;i<list.length;i++){
                            $(".layui-input-block").append('<input id="'+list[i].typeId+'" type="checkbox" name="like['+i+']" title="'+list[i].typeName+'">');
                        }
                        form.render();
                    }else{
                        layer.msg(re.msg);
                    }
                },
                error : function(e){
                    layer.msg('服务器出错');
                }
            });
            //监听提交
            $("#skip").click(function () {
                location.href="${ctx}/main/login-success?userId="+${param.userId}
            })
            $("#formthis").click(function () {
                var list = [];
                $("input[type='checkbox']").each(function () {
                    var temp = {}
                    if($(this).is(':checked')){
                        temp['userId'] = ${param.userId};
                        temp['typeId'] = $(this).attr('id');
                        temp['typeName'] = $(this).attr('title');
                        list.push(temp);
                        temp = null;
                    }
                })
                //包装map
                var map = {}
                map['list'] = list
                $.ajax({
                    //跳过存取数据
                    type : "POST",
                    contentType: "application/json;charset=UTF-8",
                    url : "${ctx}/courses/setUserLabel",
                    data : JSON.stringify(map),
                    datatype:"JSON",
                    success : function(re) {
                        if(re.code=="0"){
                            layer.msg('您的信息已记录，正在跳转');
                            location.href="${ctx}/main/login-success?userId="+${param.userId}
                        }else{
                            layer.msg(re.msg);
                        }
                    },
                    error : function(e){
                        layer.msg('服务器出错');
                        list = null;
                    }
                });
            })
        });
        layui.use('carousel', function(){
            var carousel = layui.carousel;
            //建造实例
            carousel.render({
                elem: '#backimg'
                ,width: '100%' //设置容器宽度
                ,height:'90%'
                ,arrow: 'hover' //始终显示箭头
                ,anim: 'fade' //切换动画方式
            });
        });
    })

</script>
</body>
</html>
