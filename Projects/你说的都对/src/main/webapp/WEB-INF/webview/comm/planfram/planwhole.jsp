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

</style>
<body>
    <fieldset class="layui-elem-field" style="border: 1px solid #3B78DD;border-radius: 4px;">
        <legend style="color: #3B78DD">
            <span class="iconfont iconshexiangtou" style="font-size: 26px;"></span>
            校准区域
        </legend>
        <div class="layui-field-box">
            <div class="layui-row layui-col-space15">
                <div class="layui-col-md6">
                    <div class="layui-card" style="background-color: white;border-radius: 4px;height: 400px;">
                        <div class="layui-card-header" style="display: flex;flex-direction: row;">
                            <span class="iconfont iconshipin" style="color: #3B78DD;font-size: 20px;"></span>
                            <div style="color: #3B78DD;font-size: 16px;font-weight: 300;margin-left: 6px;">视频教学</div>
                        </div>
                        <div id="video_body" class="layui-card-body" style="display: flex;flex-direction: row;justify-content: center;height: 100%;">
                            <c:if test="${classInfo!=null}">
                                <video
                                        id="ac-player"
                                        class="video-js vjs-default-skin vjs-big-play-centered"
                                        controls
                                        preload="auto"
                                        poster="${classInfo.classImg}"
                                        data-setup='{language:CN}'
                                        style="width:100%;height:85%;object-fit:cover;border-right: 1px solid #f6f6f6;box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);"
                                >
                                    <source src="../${classInfo.classUrl}" type="video/mp4"></source>
                                    <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm"></source>
                                    <source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg"></source>
                                </video>
                            </c:if>
                            <c:if test="${classInfo==null}">
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
                            <div class="starttrain" style="color: #3B78DD;font-size: 16px;font-weight: 300;margin-left: 12%;cursor: pointer"><span class="iconfont iconshexiangtou">开启姿态校准</span></div>
                            <div class="endtrain" style="color: indianred;font-size: 16px;font-weight: 300;margin-left: 12%;cursor: pointer"><span class="iconfont iconjieshu"></span></div>
                            <div style="margin-left: auto">
                                <div class="localstart" style="color: #888888;font-weight: 300; cursor: pointer"><span class="iconfont iconbendi" style="">本地启动</span></div>
                            </div>
                        </div>
                        <div class="layui-card-body video_class" style="display: flex;flex-direction: row;justify-content: center;height: 100%;">
                            <c:if test="${classInfo==null}">
                                <span style="color: #d8d8d8;">暂无相关内容</span>
                            </c:if>
                            <c:if test="${classInfo!=null}">
                                <span style="margin-top: 23%;position:absolute;color: #d8d8d8;font-size: 22px;font-weight: 300">点击左侧开始课程</span>
                                <video id="user_video" style="width:100%;height:85%;object-fit:cover;border-right: 1px solid #f6f6f6;box-shadow: 0 1px 2px 0 rgba(0,0,0,.1)"></video>
                            </c:if>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </fieldset>
    <span style="color: #888888;font-size: 13px;">Tips：点击开始后会显示您的姿态关键点，请认真比对左侧视频，电脑性能降低是正常现象，请谅解~</span>
    <canvas id="qr-canvas" style="display: none"></canvas>
    <fieldset class="layui-elem-field layui-field-title" style="background-color: white;width: 100%;">
        <legend>
            <span style="color: #888888;font-size: 16px;">动作列表 - </span>
            <c:if test="${actionInfo!=null}">
                <span style="color: #3B78DD;font-size: 20px;">${acNumber}组</span>
            </c:if>
            <c:if test="${actionInfo==null}"><span style="color: #3B78DD;font-size: 20px;">暂无动作信息,去课程库看看</span></c:if>
        </legend>
        <div class="layui-field-box" style="">
            <c:if test="${actionInfo!=null}">
                    <div class="list-scroll" style="margin-top: 8px;white-space: nowrap;overflow-x: auto;-webkit-overflow-scrolling:touch;">
                        <c:forEach items="${actionInfo}" var="al" varStatus="i">
                        <div class="cardele" style="box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);">
                            <div style="display: flex;flex-direction: row;margin: 10px">
                                <div class="img-action" style="width:50%;height: 110px;">
                                    <img src="${al.actionImg}" alt="">
                                </div>
                                <div style="display: flex;flex-direction: column;padding-left: 10px;">
                                    <div class="c-intro" style="">
                                        <span class="c-title" style="">${al.actionName}</span>
                                        <div style="margin-top: 65px">
                                            <span class="c-time">${al.actionTime}''</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="c-rate" style="margin-left:auto;margin-top: auto;">
                                    <div class="train_pose" data-id="${al.actionId}" style="margin-left: auto;cursor: pointer">
                                        <span style="color: #3B78DD;font-size: 12px;">练动作</span>
                                        <span class="iconfont iconxiayibu" style="color: #3B78DD;font-size: 12px;"></span>
                                    </div>
                                </div>
                                <div class="" style="width: 1px;height: 18px;border-left: 2px solid #3B78DD;margin-top: auto;margin-left: 2px;"></div>
                            </div>
                        </div>
                        </c:forEach>
                    </div>
            </c:if>
        </div>
    </fieldset>

    <fieldset class="layui-elem-field layui-field-title" style="background-color: white">
        <legend>
            <span style="color: #888888;font-size: 16px;">课程详情 - </span>
            <c:if test="${classInfo==null}"><span style="color: #3B78DD;font-size: 22px;">暂无课程信息，请检查网络连接</span></c:if>
            <c:if test="${classInfo!=null}"><span style="color: #3B78DD;font-size: 22px;">${classInfo.className}</span></c:if>
        </legend>
        <div class="layui-field-box" style="display: flex;flex-direction: column;align-items: center;padding: 10px 10px 0 10px;">
            <div class="" style="display: flex;flex-direction: row;align-items: center;margin-top:10px;padding-bottom:10px;width: 60%">
                <div class="head-tags" style="">
                    <span class="iconfont iconhuo" style="color: #FF5722"><span class="icontext">燃脂</span></span>
                    <span class="iconcont">${classInfo.classFatB}Kcal</span>
                </div>
                <div class="" style="width: 1px;height: 30px;background-color: #eeeeee;"></div>
                <div class="head-tags" style="">
                    <span class="iconfont iconjijiangdaozhang" style="color: #FFB800"><span class="icontext">课时</span></span>
                    <span class="iconcont">${classInfo.classTime}组</span>
                </div>
                <div class="" style="width: 1px;height: 30px;background-color: #eeeeee;"></div>
                <div class="head-tags" style="">
                    <span class="iconfont iconxunlian1" style="color: #009688"><span class="icontext">难度</span></span>
                    <span class="iconcont">${classInfo.classLevel}</span>
                </div>
                <div class="" style="width: 1px;height: 30px;background-color: #eeeeee;"></div>
                <div class="head-tags" style="">
                    <span class="iconfont iconweibiaoti" style="color: #01AAED;font-size: 16px;"><span class="icontext">正在学习</span></span>
                    <span class="iconcont">${classInfo.classTrainnumber}人</span>
                </div>
            </div>
            <fieldset class="layui-elem-field layui-field-title" style="margin-top: 0px;width: 100%;">
                <legend style="color: #888888;font-size: 16px;">课程Tips</legend>
            </fieldset>
            <div style="padding:0 10px 10px 10px;width:100%;margin-right: auto">
                <span style="color: #666666;font-size: 12px;">${classInfo.classIntro}</span>
            </div>
            <div class="layui-collapse" lay-filter="test" style="width: 100%;margin-bottom: 10px;font-size: 12px;">
                <div class="layui-colla-item">
                    <h2 class="layui-colla-title">课程类型</h2>
                    <div class="layui-colla-content">
                        <p>${classInfo.classType}</p>
                    </div>
                </div>
                <div class="layui-colla-item">
                    <h2 class="layui-colla-title">适用人群</h2>
                    <div class="layui-colla-content">
                        <p>${classInfo.classIntended}</p>
                    </div>
                </div>
                <div class="layui-colla-item">
                    <h2 class="layui-colla-title">禁忌人群</h2>
                    <div class="layui-colla-content">
                        <p>${classInfo.classTaboo}</p>
                    </div>
                </div>
                <div class="layui-colla-item">
                    <h2 class="layui-colla-title">练前准备</h2>
                    <div class="layui-colla-content">
                        <p>${classInfo.classReady}</p>
                    </div>
                </div>
                <div class="layui-colla-item">
                    <h2 class="layui-colla-title">身体反应</h2>
                    <div class="layui-colla-content">
                        <p>${classInfo.classBodyreac}</p>
                    </div>
                </div>
                <div class="layui-colla-item">
                    <h2 class="layui-colla-title">课程建议</h2>
                    <div class="layui-colla-content">
                        <p>${classInfo.classSug}</p>
                    </div>
                </div>
            </div>
        </div>
    </fieldset>

    <fieldset class="layui-elem-field layui-field-title" style="">
        <legend style="">
            <span style="color: #888888;font-size: 16px;">训练成果</span>
            <span id="class_formed" data-id="${classInfo.classId}" class="iconfont icongai" style="color: #3B78DD;font-size: 14px;cursor: pointer;margin-left: 20px;"><span style="margin-left: 4px;font-size: 12px">我也要说</span></span>
        </legend>
        <div class="layui-field-box layui-row layui-col-space15" style="padding: 20px;">
            <c:if test="${cc.size()==0}">
                <span style="color: #888888;font-size: 13px;">暂无评论，快来抢沙发吧！</span>
            </c:if>
            <c:if test="${cc.size()>0}">
                <c:forEach items="${cc}" var="c" varStatus="i">
                    <div class="layui-col-md6" style="">
                        <div class="layui-card">
                            <div class="layui-card-header" style="cursor: pointer">
                                <c:if test="${c.userImg==null}">
                                    <img src="${ctx}/images/nav/nav_boy.png" class="layui-nav-img go2user" data-otherid="${c.userId}">
                                </c:if>
                                <c:if test="${c.userImg!=null}">
                                    <img src="${ctx}/images/nav/${c.userImg}" class="layui-nav-img go2user" data-otherid="${c.userId}">
                                </c:if>
                                <span class="go2user" data-otherid="${c.userId}">${c.userName}</span>
                                <span class="go2user" data-otherid="${c.userId}" style="margin-left: 10px;color: #888888;font-size: 12px;">${c.conTime}</span>
                                <c:if test="${c.isGood==1}"><span class="iconfont iconzan" style="color: #FFB800;font-size: 14px;margin-left: 10%;"><span style="margin-left: 4px;">${c.conGood}</span></span></c:if>
                                <c:if test="${c.isGood==0}"><span class="iconfont iconzan" style="color: #e8e8e8;font-size: 14px;margin-left: 10%;"><span style="margin-left: 4px;">${c.conGood}</span></span></c:if>
                                <span class="iconfont iconpinglun" style="float: right;color: #888888;font-size: 14px;cursor: pointer">
                                <span style="color: #888888;font-size: 12px;margin-left: 4px;">${c.conContNum}</span>
                            </span>
                            </div>
                            <div class="layui-card-body click2content" data-conId="${c.conId}" style="cursor: pointer">
                                <span class="conCont">${c.conCont}</span>
                                <div class="img-user-fram" style="" >
                                    <c:forEach items="${c.imglist}" var="ci" varStatus="i">
                                        <c:if test="${ci!=\"\"}">
                                            <img src=${ctx}/images/contentImgs/${ci} alt="">
                                        </c:if>
                                    </c:forEach>
                                </div>
                            </div>
                        </div>
                    </div>
                </c:forEach>
            </c:if>
        </div>
    </fieldset>
</body>

<script>

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

    $(document).ready(function(){
        //手动设定scroll区域宽度
        $('.list-scroll').css("width",$(document.body).width())
    })
    layui.use(['element', 'layer'], function(){
        var element = layui.element;
        var layer = layui.layer;

        //监听折叠
        element.on('collapse(test)', function(data){
            // layer.msg('展开状态：'+ data.show);
        });

        <c:if test="${actionInfo!=null}">

        //截取视频
        function drawMedia(){
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
                $.ajax({
                    url: 'http://127.0.0.1:5000/netPose',
                    type:'POST',
                    data: formdata,
                    processData : false,
                    contentType : false,
                    success: function (res) {
                        if(res.code=="0"){
                            $("#img_pose").attr("src","data:image/png;base64,"+res.img);
                            if(!poseflag){
                                drawMedia()
                            }
                        }
                    },
                    error: function (res) {
                        layer.msg("服务器出错啦...")
                    }
                })
            }
        }

        //视频控制
        var options = {};
        var player = videojs('ac-player', options, function onPlayerReady() {
            this.on('play', function() {
                startDate = new Date();
                $(".video_class span").remove();
                $(".video_class").show();
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
                    $(".starttrain").click(function () {
                        if($("#img_pose").length>0){
                            layer.msg("已经启动")
                        }else{
                            $("#user_video").css("width","50%");
                            $(".video_class").removeClass("img")
                            $(".video_class").append("<img id=\"img_pose\" src=\"\" style=\"width:50%;height:85%;background-color: white;border: 0\">");
                            poseflag = false
                            drawMedia();
                        }
                    })
                    $(".endtrain").click(function () {
                        if($("#img_pose").length>0){
                            $(".video_class img").remove()
                            $("#user_video").css("width","100%");
                            //mediaStreamTrack.getTracks()[0].stop();
                            poseflag = true
                        }
                    })
                    $(".localstart").click(function () {
                        mediaStreamTrack.getTracks()[0].stop();
                        poseflag = true;
                        layer.msg("启动中，请稍等...")
                        $.ajax({
                            //请求方式
                            type : "GET",
                            contentType: "application/json;charset=UTF-8",
                            url : "http://127.0.0.1:5000/localPose",
                        });
                    })
                }
            });
            this.on('ended', function() {
                //计算结束时间
                endTime = new Date();
                var result = {}
                result["userId"]=${param.userId};
                result["classId"]=${param.classId};
                result["fkId"]=${param.classId};
                result["fkType"]=0;
                result["totalFatB"]=${classInfo.classFatB};
                result["cumFatB"]=${classInfo.classFatB};
                result["fitnessTime"]=getSeconds(endTime);
                $.ajax({
                    //请求方式
                    type : "POST",
                    contentType: "application/json;charset=UTF-8",
                    url : "${ctx}/plan/updateUserPlan",
                    data : JSON.stringify(result),
                    datatype:"JSON",
                    success : function(re) {
                        if(re.code == "1"){
                            layer.msg(re.msg);
                        }else{
                            layer.open({
                                type: 1
                                ,title: false //不显示标题栏
                                ,closeBtn: false
                                ,area: '300px;'
                                ,shade: 0.8
                                ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
                                ,btn: ['确定']
                                ,btnAlign: 'c'
                                ,moveType: 1 //拖拽模式，0或者1
                                ,content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">'+re.msg+'</div>'
                            });
                        }
                    },
                    error : function(e){
                        layer.msg('服务器出错');
                    }
                });
            });
        });

        $("#class_formed").click(function () {
            var classId = $(this).data("id");
            if(classId!=null){
                location.href="${ctx}/circle/upload?classId="+classId+"&userId="+${param.userId};
            }else {
                layer.msg("参数异常")
            }
        })

        </c:if>

        $(".train_pose").click(function () {
            var actionId = $(this).data('id');
            location.href="${ctx}/plan/start-pose?actionId="+actionId+"&userId="+${param.userId};
        })
        $(".click2content").click(function () {
            var conId = $(this).data("conid")
            location.href="${ctx}/circle/details?conId="+conId+"&userId="+${param.userId};
        })
        $(".go2user").click(function () {
            var otherId=$(this).data("otherid")
            var userId=${param.userId}
            if(otherId == userId){
                location.href="${ctx}/padding/pad-userinfo?userId="+userId;
            }else{
                location.href="${ctx}/padding/pad-otherInfo?userId="+userId+"&otherId="+otherId;
            }
        })
    });
</script>

</html>
