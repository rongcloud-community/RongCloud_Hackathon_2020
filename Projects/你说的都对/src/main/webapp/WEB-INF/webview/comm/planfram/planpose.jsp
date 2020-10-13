<%--
  Created by IntelliJ IDEA.
  User: songc
  Date: 2020/3/20
  Time: 12:57
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
    <link href="//vjs.zencdn.net/5.19/video-js.min.css" rel="stylesheet">
    <script src="//vjs.zencdn.net/5.19/video.min.js"></script>
    <%@ include file="../../tags/taglib.jsp"%>
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
        font-size: 24px;
    }

    .head-tags .icontext{
        color: #888888;
        font-size: 12px;
        margin-left: 5px;
    }

    .iconcont {
        font-size: 18px;
        color: #909090;
        margin-top: 4px;
    }

    .layui-colla-title,.layui-colla-item {
        background-color: white;
    }
    .img-action img{
        width: 100%;
        height: 100%;
        object-fit:cover;
    }

    .c-intro {
        display: flex;
        flex-direction: column;
        margin-top: 5px;
    }
    .c-intro .c-title{
        font-size: 14px;
        color: #606060;
        margin-right: auto
    }
    .c-intro .c-time{
        font-size: 12px;
        color: #888888;
        margin-right: 10px;
    }
    .c-intro .c-count{
        font-size: 12px;
        color: #888888;
    }
    .cardele{
        display: inline-block;
        width: 360px;
    }
    .img-user-fram{
        width: 100%;
        margin-top: 5px;
    }

    .img-user-fram img{
        width: 32%;
        height: 80px;
        object-fit:cover;
        margin-top: 4px;
    }

    @font-face {
        font-family: 'webfont';
        font-display: swap;
        src: url('//at.alicdn.com/t/webfont_igmqbao0fzi.eot'); /* IE9*/
        src: url('//at.alicdn.com/t/webfont_igmqbao0fzi.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('//at.alicdn.com/t/webfont_igmqbao0fzi.woff2') format('woff2'),
        url('//at.alicdn.com/t/webfont_igmqbao0fzi.woff') format('woff'), /* chrome、firefox */
        url('//at.alicdn.com/t/webfont_igmqbao0fzi.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
        url('//at.alicdn.com/t/webfont_igmqbao0fzi.svg#杨任东竹石体-Bold') format('svg'); /* iOS 4.1- */
    }
    .web-font{
        font-family:"webfont" !important;
        font-size:120px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
        color: #FF8C00;
    }
</style>
<body>
    <fieldset class="layui-elem-field" style="border: 1px solid #3B78DD;border-radius: 4px;">
        <legend style="color: #3B78DD">
            <span class="iconfont iconshexiangtou" style="font-size: 26px;"></span>
            校准区域
        </legend>
        </div>
        <div class="layui-field-box">
            <div class="layui-row layui-col-space15">
                <div class="layui-col-md6">
                    <div class="layui-card" style="background-color: white;border-radius: 4px;height: 400px;">
                        <div class="layui-card-header" style="display: flex;flex-direction: row;">
                            <span class="iconfont iconshipin" style="color: #3B78DD;font-size: 20px;"></span>
                            <div style="color: #3B78DD;font-size: 16px;font-weight: 300;margin-left: 6px;">视频教学</div>
                        </div>
                        <div id="video_body" class="layui-card-body" style="display: flex;flex-direction: row;justify-content: center;height: 100%;">
                            <c:if test="${actionInfo!=null}">
                                <video
                                        id="ac-player"
                                        class="video-js vjs-default-skin vjs-big-play-centered"
                                        controls
                                        preload="auto"
                                        loop="true"
                                        poster="${actionInfo.actionImg}"
                                        data-setup='{language:CN}'
                                        style="width:100%;height:85%;object-fit:cover;border-right: 1px solid #f6f6f6;box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);"
                                >
                                    <source src="${actionInfo.actionUrl}" type="video/mp4"></source>
                                    <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm"></source>
                                    <source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg"></source>
                                </video>
                                <img id="img_pose_train" src="" alt="" style="margin:0 4px 0 4px;display: none;width: 100%;height:85%;object-fit:cover;">
                            </c:if>
                            <c:if test="${actionInfo==null}">
                                <span style="color: #d8d8d8;">暂无相关内容</span>
                            </c:if>
                        </div>
                    </div>
                </div>
                <div class="layui-col-md6">
                    <div class="layui-card" style="background-color: white;border-radius: 4px;height: 400px;">
                        <div class="layui-card-header" style="display: flex;flex-direction: row;">
                            <span class="iconfont iconjiaozhun" style="color: #3B78DD;font-size: 20px;"></span>
                            <div style="color: #3B78DD;font-size: 16px;font-weight: 300;margin-left: 6px;">姿态校准</div>
                            <div class="starttrain" style="color: #3B78DD;font-size: 16px;font-weight: 300;margin-left: 12%;cursor: pointer"><span class="iconfont iconshexiangtou">姿态比对</span></div>
                            <div class="endtrain" style="color: indianred;font-size: 16px;font-weight: 300;margin-left: 12%;cursor: pointer"><span class="iconfont iconjieshu"></span></div>
                            <div style="margin-left: auto">
                                <span style="color: #888888;font-weight: 300;font-size: 12px;">得分：</span>
                                <span id="Score" style="color: #FFB800;font-size: 26px;"><em>暂无</em></span>
                            </div>
                        </div>
                        <div class="layui-card-body video_class" style="display: flex;flex-direction: row;justify-content: center;height: 100%;">
                            <c:if test="${actionInfo==null}">
                                <span style="color: #d8d8d8;">暂无相关内容</span>
                            </c:if>
                            <c:if test="${actionInfo!=null}">
                                <video id="user_video" style="width:100%;height:85%;object-fit:cover;border-right: 1px solid #f6f6f6;box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);"></video>
                            </c:if>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </fieldset>
    <span style="color: #888888;font-size: 13px;">Tips：点击开始后会显示您的姿态关键点，请认真比对左侧视频，电脑性能降低是正常现象，请谅解~</span>
    <canvas id="qr-canvas" style="display: none"></canvas>

    <div class="layui-card" style="background-color: white;border-radius: 4px;margin-top: 10px;">
        <div class="layui-card-header" style="display: flex;flex-direction: row;">
            <span class="iconfont iconjiaozhun" style="color: #3B78DD;font-size: 16px;"></span>
            <div style="color: #3B78DD;font-size: 16px;font-weight: 300;margin-left: 6px;">动作关键点</div>
        </div>
        <div class="layui-card-body" style="">
            <c:if test="${actionInfo==null}">
                <span style="color: #666666;">暂无动作详情，去课程库看看...</span>
            </c:if>
            <c:if test="${actionInfo!=null}">
                <div class="cardele" style="box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);">
                    <div style="display: flex;flex-direction: row;">
                        <div id="points" class="img-action" style="width:100%;height: 150px;display: flex;flex-direction: row;"></div>
                    </div>
                </div>
            </c:if>
        </div>
    </div>

<c:if test="${actionInfo!=null}">
    <fieldset class="layui-elem-field layui-field-title" style="background-color: white">
        <legend>
            <span style="color: #888888;font-size: 16px;">动作详情 - </span>
            <span style="color: #3B78DD;font-size: 22px;">${actionInfo.actionName}</span>
        </legend>
        <div class="layui-field-box" style="display: flex;flex-direction: column;align-items: center;padding: 10px 10px 0 10px;">
            <div style="padding:0 10px 10px 10px;width:100%;margin-right: auto">
                <ul class="layui-timeline">
                    <li class="layui-timeline-item">
                        <i class="layui-icon layui-timeline-axis"></i>
                        <div class="layui-timeline-content layui-text">
                            <h3 class="layui-timeline-title">步骤</h3>
                            <ul class="steps"></ul>
                        </div>
                    </li>
                    <li class="layui-timeline-item">
                        <i class="layui-icon layui-timeline-axis"></i>
                        <div class="layui-timeline-content layui-text">
                            <h3 class="layui-timeline-title">呼吸</h3>
                            <ul class="break"></ul>
                        </div>
                    </li>
                    <li class="layui-timeline-item">
                        <i class="layui-icon layui-timeline-axis"></i>
                        <div class="layui-timeline-content layui-text">
                            <h3 class="layui-timeline-title">动作感觉</h3>
                            <ul class="feel"></ul>
                        </div>
                    </li>
                    <li class="layui-timeline-item">
                        <i class="layui-icon layui-timeline-axis"></i>
                        <div class="layui-timeline-content layui-text">
                            <h3 class="layui-timeline-title">常见错误</h3>
                            <p>
                                <ul class="error"></ul>
                            </p>
                        </div>
                    </li>
                    <li class="layui-timeline-item">
                        <i class="layui-icon layui-timeline-axis"></i>
                    </li>
                </ul>
            </div>
        </div>
    </fieldset>
</c:if>
<c:if test="${actionInfo==null}">
    <fieldset class="layui-elem-field layui-field-title" style="background-color: white">
        <legend>
            <span style="color: #888888;font-size: 16px;">动作详情 - </span>
            <span style="color: #3B78DD;font-size: 22px;">暂无数据</span>
        </legend>
        <div class="layui-field-box" style="padding: 10px 10px 10px 10px;">
            <span style="color: #666666;">快从课程库里选择课程开始训练吧！</span>
        </div>
    </fieldset>
</c:if>
</body>

<script>

    function showLoad() {
        return layer.msg('拼命处理中...', {icon: 16,shade: [0.5, '#f5f5f5'],scrollbar: false,offset: 'auto', time:100000});
    }

    function closeLoad(index) {
        layer.close(index);

    }
    function showSuccess() {
        layer.msg('执行成功！',{time: 1000,offset: 'auto'});
    }

    function dataURLToBlob(dataurl){
        var arr = dataurl.split(',');
        var mime = arr[0].match(/:(.*?);/)[1];
        var bstr = atob(arr[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    }

    var endTime = null;
    var startDate = null;
    function getSeconds(endTime) {
        if(startDate == null){
            startDate = new Date();
        }
        var time12 = "";
        if(startDate != null && endTime != null){
            var time1 = endTime.getTime() - startDate.getTime();
            var days=Math.floor(time1/(24*3600*1000));
            //计算出小时数
            var leave1=time1%(24*3600*1000);
            var hours=Math.floor(leave1/(3600*1000));
            //计算相差分钟数
            var leave2=leave1%(3600*1000);
            var minutes=Math.floor(leave2/(60*1000));
            //计算相差秒数
            var leave3=leave2%(60*1000);
            time12 = Math.round(leave3/1000);
            time12 = time12 + (minutes * 60);
        }
        return time12;
    }

    layui.use(['element', 'layer'], function(){
        var element = layui.element;
        var layer = layui.layer;

        var poseflag = false
        //监听折叠
        element.on('collapse(test)', function(data){
            // layer.msg('展开状态：'+ data.show);
        });

        <c:if test="${actionInfo!=null}">

        //截取视频
        function drawMedia(){
            var layerflag;
            var canvas1 = document.getElementById('qr-canvas');
            var context1 = canvas1.getContext('2d');
            var video = document.querySelector('#user_video');
            canvas1.setAttribute("width", video.videoWidth);
            canvas1.setAttribute("height", video.videoHeight);
            context1.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
            var dataURL = canvas1.toDataURL('image/png');
            if(dataURL){
                var blob = dataURLToBlob(dataURL)
                var formdata = new FormData();
                formdata.append("file",blob)
                formdata.append("name",${param.userId})
                formdata.append("actionId",${param.actionId})
                $.ajax({
                    url: 'http://127.0.0.1:5000/netPoseScore',
                    type:'POST',
                    data: formdata,
                    processData : false,
                    contentType : false,
                    beforeSend: function () {
                        layerflag=showLoad();
                    },
                    success: function (res) {
                        if(res.code=="0"){
                            //刷新得分
                            $("#Score").empty()
                            $("#Score").append('<em>'+res.score+'</em>')
                            //清楚画布内容并添加识别画面
                            $("#pose_points").remove()
                            $(".video_class").append("<img id=\"img_pose\" src=\"\" style=\"width:50%;height:85%;background-color: white;border: 0\">");
                            $("#img_pose").attr("src","data:image/png;base64,"+res.img);
                            var record = {} //记录运动，上传后台
                            {
                                endTime = new Date();
                                record["fitnessTime"]=getSeconds(endTime);
                                record["score"]=res.score;
                                record["userId"]=${param.userId};
                                record["fkId"]=${param.actionId};
                                record["fkType"]=1;
                                //上传后台
                                $.ajax({
                                    //请求方式
                                    type : "POST",
                                    contentType: "application/json;charset=UTF-8",
                                    url : "${ctx}/plan/updatePoseRecord",
                                    data : JSON.stringify(record),
                                    datatype:"JSON",
                                    success : function(mp) {
                                        closeLoad(layerflag);
                                        //重新计时
                                        startDate = new Date();
                                        if(mp.code == "0"){}else{
                                            layer.msg(mp.msg)
                                        }
                                    },
                                    error : function(e){
                                        //重新计时
                                        startDate = new Date();
                                        closeLoad(layerflag);
                                        layer.msg('服务器出错，运动记录上传失败...');
                                    }
                                });
                            }
                        }
                    },
                    error: function (res) {
                        closeLoad(layerflag);
                        layer.msg("服务器出错啦...")
                    }
                })
            }
        }
            //视频控制
            var options = {};
            var player = videojs('ac-player', options, function onPlayerReady() {
                this.on('play', function() {
                    //开始计时
                    startDate = new Date();
                });
                this.on('ended', function() {
                });
            });
            var mediaStreamTrack;
            //摄像头控制
            if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                layer.open({
                    title: '摄像头兼容性'
                    ,content: '浏览器无法打开摄像头！请点击上方摄像头进行调试，更换浏览器或安装相应插件...'
                });
                return;
            }else {
                if (navigator.mediaDevices === undefined) {
                    navigator.mediaDevices = {};
                }
                if (navigator.mediaDevices.getUserMedia === undefined) {
                    navigator.mediaDevices.getUserMedia = function(constraints) {
                        var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

                        if (!getUserMedia) {
                            return Promise.reject(new Error('浏览器无法打开摄像头！请点击上方摄像头进行调试，更换浏览器或安装相应插件...'));
                        }
                        return new Promise(function(resolve, reject) {
                            getUserMedia.call(navigator, constraints, resolve, reject);
                        });
                    }
                }
                navigator.mediaDevices.getUserMedia({ audio: false, video: true })
                    .then(function(stream) {
                        var video = document.querySelector('#user_video');
                        if ("srcObject" in video) {
                            video.srcObject = stream;
                            mediaStreamTrack = stream;
                        } else {
                            video.src = window.URL.createObjectURL(stream);
                        }
                        video.onloadedmetadata = function(e) {
                            video.play();
                        };
                    })
                    .catch(function(err) {
                        layer.open({
                            title: '摄像头兼容性'
                            ,content: err.name + ": " + err.message
                        });
                    });
                var pointsTimer = 15;
                var clickIsuser = true
                $(".starttrain").click(function () {
                    if(pointsTimer==15&&clickIsuser){
                        clickIsuser = false
                        //将图片放在video上
                        $("#ac-player").hide();
                        $("#img_pose_train").show();
                        //操作右半部分
                        $("#Score").empty()
                        $("#Score").append('<em>0.00</em>')
                        $("#user_video").css("width","50%");
                        $("#img_pose").remove();
                        $("#pose_points").remove();
                        $(".video_class").append('<div id="pose_points" style="width: 50%;height: 85%;text-align: center;display: flex;flex-direction: column;">\n' +
                            '                        <span style="color: #D0D0D0;">即将开始姿态比对，请将自身置于屏幕中间，并比对左侧动作，<span style="color: #FFB800;font-size: 18px;">倒计时</span>结束后开始评分...</span>\n' +
                            '                    <div class="timerFram" style="margin-top: 10px;flex: 1;display: flex;flex-direction: column;align-items: center;justify-content: center">\n' +
                            '                     </div>\n' +
                            '             </div>');
                        t = setInterval (function () {
                            $(".timerFram").empty()
                            $(".timerFram").append('<div class="layui-anim layui-anim-fadein">\n' +
                                '        <span class="web-font">'+pointsTimer+'</span>\n' +
                                '    </div>')
                            pointsTimer--
                            if(pointsTimer==-1){
                                drawMedia();
                                clearInterval(t) //停止执行识别操作
                                pointsTimer=15;
                                clickIsuser = true
                            }
                        }, 1100);
                    }else{
                        layer.msg("程序已在执行")
                    }
                })
                $(".endtrain").click(function () {
                    if(pointsTimer==15&&clickIsuser){
                        $("#Score").empty()
                        $("#Score").append('<em>暂无</em>')
                        //if($("#img_pose").length>0){
                            $(".video_class img").remove()
                            $("#pose_points").remove()
                            $("#user_video").css("width","100%");
                            $("#ac-player").show();
                            $("#img_pose_train").hide();
                        //}
                    }else {
                        layer.msg("程序执行中，请勿关闭")
                    }
                })
            }
        </c:if>
        var actionSteps = "${actionInfo.actionSteps}".split(";")
        $(".steps").empty();
        for(var i=0;i<actionSteps.length;i++){
            $(".steps").append('<li>'+actionSteps[i]+'</li>');
        }
        var actionBreak = "${actionInfo.actionBreak}".split(";")
        $(".break").empty();
        for(var i=0;i<actionBreak.length;i++){
            $(".break").append('<li>'+actionBreak[i]+'</li>');
        }
        var actionFeel = "${actionInfo.actionFeel}".split(";")
        $(".feel").empty();
        for(var i=0;i<actionFeel.length;i++){
            $(".feel").append('<li>'+actionFeel[i]+'</li>');
        }
        var actionError = "${actionInfo.actionError}".split(";")
        $(".error").empty();
        for(var i=0;i<actionError.length;i++){
            $(".error").append('<li>'+actionError[i]+'</li>');
        }
        var actionPoints = "${actionInfo.actionPoints}".split(";")
        $("#points").empty();
        for(var i=0;i<actionPoints.length;i++){
            $("#points").append('<img id="pos_id_'+i+'" src="${ctx}/'+actionPoints[i]+'" alt="" style="margin:0 4px 0 4px;">');
            $("#pos_id_0").css('border','1px solid #FF8C00')
        }
        $("#img_pose_train").attr('src',"${ctx}/"+actionPoints[0])
    });
</script>

</html>
