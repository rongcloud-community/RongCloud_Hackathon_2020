<%--
  Created by IntelliJ IDEA.
  User: songc
  Date: 2020/3/19
  Time: 16:48
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
    .head-tags{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .head-tags .iconfont{
        font-size: 34px;
    }

    .head-tags .icontext{
        color: #888888;
        font-size: 14px;
        margin-left: 5px;
    }

    .iconcont {
        font-size: 18px;
        color: #909090;
        margin-top: 4px;
    }
    .img-fram img{
        width: 100%;
        height: 100%;
        object-fit:cover;
    }

    .pose-img-fram img{
        width: 100%;
        height: 100%;
        object-fit:cover;
    }

    .c-intro {
        display: flex;
        flex-direction: row;
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

    .c-rate {
        display: flex;
        flex-direction: row;
        align-items: center;
        text-align: center;
    }

    .c-rate .rate-intro{
        font-size: 12px;
        color: #3B78DD;
        padding-top: 2px;
        margin-right: 8px;
    }

    .c-rate .layui-rate li i.layui-icon{
        font-size: 14px!important;
    }
    .cardele {
        border-right: 1px solid #f6f6f6;
        margin-bottom: 15px;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
        margin-left: 6px;
    }
</style>
<body>
    <fieldset class="layui-elem-field" style="background-color: white;border: 1px solid #3B78DD;border-radius: 4px;">
        <legend style="color: #3B78DD">
            <span class="iconfont iconxunlian1" style="font-size: 26px;"></span>
            今日训练
        </legend>
        <div class="layui-field-box" style="display: flex;flex-direction: row;align-items: center;justify-content:space-around;width: 100%;">
            <div class="head-tags" style="border-right: 1px solid #eeeeee">
                <span class="iconfont iconhfenlei6" style="color: #009688"><span class="icontext">累计运动</span></span>
                <c:if test="${cumfitness==null}">
                    <span class="iconcont">NaN</span>
                </c:if>
                <c:if test="${cumfitness!=null}">
                    <span class="iconcont">${cumfitness}天</span>
                </c:if>
            </div>
            <div class="head-tags" style="border-right: 1px solid #eeeeee">
                <span class="iconfont iconjinrijihua" style="color:#1E9FFF;"><span class="icontext">今日课程数</span></span>
                <c:if test="${todayTime==null}">
                    <span class="iconcont">NaN</span>
                </c:if>
                <c:if test="${todayTime!=null}">
                    <span class="iconcont">${todayTime} 课时</span>
                </c:if>
            </div>
            <div class="head-tags" style="border-right: 1px solid #eeeeee">
                <span class="iconfont iconchenggong-copy" style="color: #FFB800"><span class="icontext">完成情况</span></span>
                <c:if test="${allmyTime==null}">
                    <span class="iconcont">NaN</span>
                </c:if>
                <c:if test="${allmyTime!=null}">
                    <span class="iconcont">累计 ${allmyTime} 课时</span>
                </c:if>
            </div>
            <div class="head-tags">
                <span class="iconfont iconhuo" style="color: #FF5722"><span class="icontext">累计消耗</span></span>
                <c:if test="${allFatB==null}">
                    <span class="iconcont">NaN</span>
                </c:if>
                <c:if test="${allFatB!=null}">
                    <span class="iconcont">${allFatB}Kcal</span>
                </c:if>
            </div>
        </div>
    </fieldset>

    <div class="layui-card" style="background-color: white;border: 1px solid #3B78DD;border-radius: 4px;">
        <div class="layui-card-header" style="display: flex;flex-direction: row;">
            <span class="iconfont iconjinrijihua" style="color: #3B78DD;font-size: 24px;"></span>
            <div style="color: #3B78DD;font-size: 18px;font-weight: 300;margin-left: 6px;">今日待完成</div>
            <div class="more" style="margin-left: auto;color: #888888;font-size: 12px;cursor: pointer">更多课程</div>
        </div>
        <div class="layui-card-body" style="">
            <c:if test="${todaylist.size()==0}">
                <span style="color: #666666;">暂无课程，去课程库看看...</span>
            </c:if>
            <c:if test="${todaylist.size()!=0}">
                <c:forEach items="${todaylist}" var="tl" varStatus="i">
                    <div class="layui-show-sm-inline-block cardele" style="width: 24%;">
                        <div class="img-fram" id="${tl.classId}" style="height: 110px;cursor: pointer;">
                            <img src="${tl.classImg}" alt="">
                        </div>
                        <div style="display: flex;flex-direction: column;padding:0 5px 0 5px;">
                            <div class="c-intro" style="">
                                <span class="c-title" style="">${tl.className}</span>
                                <div>
                                    <span class="c-time">1节</span>
                                    <span class="c-count">今日进行：${tl.comTime+1}/${tl.classTime}</span>
                                </div>
                            </div>
                            <div class="c-rate">
                                <div class="train" data-id="${tl.classId}" style="margin-left: auto;cursor: pointer">
                                    <span style="color: #3B78DD;font-size: 12px;">开始训练</span>
                                    <span class="iconfont iconxiayibu" style="color: #3B78DD;font-size: 12px;"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </c:forEach>
            </c:if>
        </div>
    </div>

    <div class="layui-card" style="background-color: white;border: 1px solid #FFB800;border-radius: 4px;">
        <div class="layui-card-header" style="display: flex;flex-direction: row;">
            <span class="iconfont icondingyue2" style="color: #FFB800;font-size: 24px;"></span>
            <div style="color: #FFB800;font-size: 18px;font-weight: 300;margin-left: 6px;">我的订阅</div>
            <div class="more" style="margin-left: auto;color: #888888;font-size: 12px;cursor: pointer">更多课程</div>
        </div>
        <div class="layui-card-body" style="">
            <c:if test="${mylist.size()==0}">
                <span style="color: #666666;">暂无课程，去课程库看看...</span>
            </c:if>
            <c:if test="${mylist.size()!=0}">
                <c:forEach items="${mylist}" var="ml" varStatus="i">
                    <div class="layui-show-sm-inline-block cardele" style="width: 24%;">
                        <div class="img-fram" id="${ml.classId}" style="height: 110px;cursor: pointer;">
                            <img src="${ml.classImg}" alt="">
                        </div>
                        <div style="display: flex;flex-direction: column;padding:0 5px 0 5px;">
                            <div class="c-intro" style="">
                                <span class="c-title" style="">${ml.className}</span>
                                <div>
                                    <span class="c-time">1节</span>
                                    <c:if test="${ml.isComplete==0}">
                                        <span class="c-count" style="color: #3B78DD">计划中</span>
                                    </c:if>
                                    <c:if test="${ml.isComplete==1}">
                                        <span class="c-count">已完成</span>
                                    </c:if>
                                </div>
                            </div>
                            <c:if test="${ml.isComplete!=1}">
                                <div class="c-rate">
                                    <div class="train" data-id="${ml.classId}" style="margin-left: auto;cursor: pointer">
                                        <span style="color: #3B78DD;font-size: 12px;">开始训练</span>
                                        <span class="iconfont iconxiayibu" style="color: #3B78DD;font-size: 12px;"></span>
                                    </div>
                                </div>
                            </c:if>
                            <c:if test="${ml.isComplete==1}">
                                <div class="c-rate">
                                    <div class="checktrain" data-id="${ml.classId}" style="margin-left: auto;cursor: pointer">
                                        <span style="color: #3B78DD;font-size: 12px;">查看课程</span>
                                        <span class="iconfont iconxiayibu" style="color: #3B78DD;font-size: 12px;"></span>
                                    </div>
                                </div>
                            </c:if>
                        </div>
                    </div>
                </c:forEach>
            </c:if>
        </div>
    </div>
    <div class="layui-card" style="background-color: white;border: 1px solid #FF5722;border-radius: 4px;">
        <div class="layui-card-header" style="display: flex;flex-direction: row;">
            <span class="iconfont icondongzuo" style="color: #FF5722;font-size: 24px;"></span>
            <div style="color: #FF5722;font-size: 18px;font-weight: 300;margin-left: 6px;">练动作 - 随机</div>
            <div id="changePose" style="margin-left: auto;color: #888888;font-size: 12px;cursor: pointer">
                <span class="iconfont iconshuaxin" style="font-size: 12px;"></span>
                换一批</div>
        </div>
        <div id="PoseModel" class="layui-card-body" style="">暂无数据</div>
    </div>

</body>
<script>

    function getPose() {
        $.ajax({
            type : "GET",
            contentType: "application/json;charset=UTF-8",
            url : "${ctx}/plan/getRandPose",
            success : function(re) {
                if(re.code == "0"){
                    //清除已有数据
                    $("#PoseModel").empty();
                    var pl = re.randaction;
                    if(pl.length==0){
                    }else{
                        for(var i=0;i<pl.length;i++){
                            $("#PoseModel").append('<div class="layui-show-sm-inline-block cardele" style="width: 24%;">\n' +
                                '                <div class="pose-img-fram" style="height: 110px;">\n' +
                                '                    <img src="'+pl[i].actionImg+'" alt="">\n' +
                                '                </div>\n' +
                                '                <div style="display: flex;flex-direction: column;padding:0 5px 0 5px;">\n' +
                                '                    <div class="c-intro" style="">\n' +
                                '                        <span class="c-title" style="">'+pl[i].actionName+'</span>\n' +
                                '                        <div class="posetrain" data-id="'+pl[i].actionId+'" style="margin-left: auto;cursor: pointer">\n' +
                                '                            <span style="color: #FF5722;font-size: 12px;">开始训练</span>\n' +
                                '                            <span class="iconfont iconxiayibu" style="color: #FF5722;font-size: 12px;"></span>\n' +
                                '                        </div>\n' +
                                '                    </div>\n' +
                                '                </div>\n' +
                                '            </div>');
                        }
                        $(".posetrain").click(function () {
                            var actionId = $(this).data('id');
                            location.href="${ctx}/plan/start-pose?actionId="+actionId+"&userId="+${param.userId};
                        })
                    }
                }else{
                    layer.msg("获取姿态库失败，网络开小差了...");
                }
            },
            error : function(e){
                layer.msg("获取姿态库失败，网络开小差了...");
            }
        });
    }

    $(document).ready(function () {
        getPose()
        layui.use(['rate','layer','element'], function(){
            var rate = layui.rate;
            var layer = layui.layer;
            var element = layui.element;
            $(".more").click(function () {
                location.href="${ctx}/courses/inner-allc?userId="+${param.userId};
            })
            $(".img-fram").click(function () {
                var classId = $(this).attr('id');
                location.href="${ctx}/courses/inner-intro?classId="+classId+"&userId="+${param.userId};
            })
            $("#changePose").click(function () {
                getPose()
            })
            $(".train").click(function () {
                var classId = $(this).data('id');
                location.href="${ctx}/plan/start-whole?classId="+classId+"&userId="+${param.userId};
            })
        })
    });
</script>
</html>
