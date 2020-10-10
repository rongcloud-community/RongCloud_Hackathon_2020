<%--
  Created by IntelliJ IDEA.
  User: 96081
  Date: 2020/3/6
  Time: 17:01
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="../../tags/taglib.jsp" %>
<html>
<head>
    <title>实时影像</title>
</head>
<body style="padding: 20px;background-color: #F2F2F2">
    <fieldset class="layui-elem-field" style="border: 1px solid #9F9F9F;border-radius: 4px;">
        <legend >
            <span class="iconfont iconshexiangtou" style="font-size: 26px;"></span>
            实时路况监测
        </legend>
        <div class="layui-field-box">
            <div class="layui-row layui-col-space15">
                <div class="layui-col-md6">
                    <div class="layui-card" style="background-color: white;border-radius: 4px;height: 450px;">
                        <div class="layui-card-header" style="display: flex;flex-direction: row;">
                            <span class="iconfont iconjiaozhun" style="color: #3B78DD;font-size: 20px;"></span>
                            <div style="color: #9F9F9F;font-size: 16px;font-weight: 300;margin-left: 6px;">实时画面</div>
                        </div>
<%--                        <video controls="controls">--%>
<%--                            <source src="https://www.bilibili.com/video/BV1s7411T7Gx"/>--%>

<%--                        </video>--%>
<%--    <embed src="E:/pyblind/src/main/resources/static/view/video1.mp4" allowfullscreen="true" flashvars="vcastr_file=12.flv&IsAutoPlay=1&LogoUrl=images/logo.jpg" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="700" height="400"></embed>--%>
<%--                    <input id="v_file" type="file" onChange="play()"/>--%>
                        <video autoplay="true"  id="video" controls="controls" width="600px" height="400">
                            你的浏览器貌似不支持video 元素
                            <source src="${ctx}/view/image/people.mp4" type="video/mp4">
                        </video>


                    </div>
                </div>
                <div class="layui-col-md6">
                    <div class="layui-card" style="background-color: white;border-radius: 4px;height: 450px;">
                        <div class="layui-card-header" style="display: flex;flex-direction: row;">
                            <span class="iconfont iconjiaozhun" style="color: #3B78DD;font-size: 20px;"></span>
                            <div style="color: #9F9F9F;font-size: 16px;font-weight: 300;margin-left: 6px;">视差影像</div>
                        </div>
                        <video autoplay="true"  id="video2" controls="controls" width="600px" height="400">
                            你的浏览器貌似不支持video 元素
                            <source src="${ctx}/view/image/people2.mp4" type="video/mp4">
                        </video>
                    </div>
                </div>
            </div>
        </div>
    </fieldset>
    <fieldset class="layui-elem-field" style="border: 1px solid #9F9F9F;border-radius: 4px; background-color: white">
        <legend >
            <span class="iconfont iconshexiangtou" style="font-size: 26px;"></span>
            实时路况
        </legend>
        <div class="layui-field-box">
            <div style="font-size: 15px;">
                <br/>
                前方10米有一个障碍物杯子。<br/>
            </div>
        </div>
    </fieldset>
    <fieldset class="layui-elem-field" style="border: 1px solid #9F9F9F;border-radius: 4px;background-color: white">
        <legend >
            <span class="iconfont iconshexiangtou" style="font-size: 26px;"></span>
            交通状况
        </legend>
        <div class="layui-field-box">
            <div style="font-size: 15px;">
                <br/>
                前方5米路口处交通信号灯状况：红灯。<br/>
            </div>
        </div>
    </fieldset>

    <script>
        function play(){
            var file = document.getElementById('v_file').files[0];
            console.log(v_file);
            console.log(file);

            var url = URL.createObjectURL(file);
            console.log(url);
            $("#video").attr("src",url);
            $("#v_file").hide();
        }
    </script>
</body>

</html>
