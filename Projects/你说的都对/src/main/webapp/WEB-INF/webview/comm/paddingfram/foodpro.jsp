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

    <fieldset class="layui-elem-field site-demo-button" style="background-color: white;border: 1px solid #3B78DD;border-radius: 5px;">
        <legend >
            <span class="iconfont iconjiudian" style="color: #3B78DD;font-size: 22px;"></span>
            <span class="welcomeTitle" style="color: #888888;font-size: 16px;"></span>
            <span style="color: #3B78DD;font-size: 22px;">${hotelInfo.hotelName}</span>
        </legend>
        <div style="display: flex;flex-direction: row;justify-content: center;align-items: center;padding: 10px;height: 90px;">
            <div style="display: flex;flex-direction: row;justify-content: space-around;align-items: center;padding: 10px;width: 50%;border-right: 1px solid #eeeeee">
                <div class="head-tags" style="border-right: 1px solid #eeeeee;padding-right: 5px;">
                    <span class="iconfont iconjinrijihua" style="color: #3B78DD;"><span class="icontext">当前时间</span></span>
                    <span class="timeShow showtext"></span>
                </div>
                <div class="head-tags" style="border-right: 1px solid #eeeeee;padding-right: 5px;">
                    <span class="iconfont iconshouye" style="color: #FFB800;"><span class="icontext">今日天气</span></span>
                    <span class="showtext">晴朗</span>
                </div>
                <div class="head-tags">
                    <span class="iconfont iconhuo" style="color: #FF5722;"><span class="icontext">已消耗</span></span>
                    <span class="showtext">${totalFabt}Kcal</span>
                </div>
            </div>
            <div style="width: 50%;display: flex;flex-direction: column;height: 100%;padding: 10px;">
                <div style="flex: 0.2">
                    <span style="color: #d8d8d8;font-size: 12px;margin-left: 5px;">—— 酒店最新消息 ————</span>
                    <span class="iconfont icongonggao" style="color: #d8d8d8;font-size: 16px;float: right;"></span>
                </div>
                <div style="flex: 0.8;padding: 10px;">
                    <span class="gonggao" style="font-size: 14px;color: #666666">${hotelInfo.hotelNotice}</span>
                </div>
            </div>
        </div>
    </fieldset>

    <fieldset class="layui-elem-field site-demo-button" style="border-radius: 4px;border: 1px solid #3B78DD;">
        <legend >
            <span style="color: #888888;font-size: 16px;">今日餐饮搭配 - 摄入热量参考范围 ： </span>
            <span class="iconfont iconhuo" style="color: #FF5722;font-size: 16px;"></span>
            <span style="color: #FF5722;font-size: 22px;">1990 - 2190Kcal</span>
        </legend>
        <div style="padding: 10px;">
            <div class="layui-card">
                <div class="layui-card-header">
                    <span class="iconfont iconzaocan"><span style="margin-left: 5px;">早餐建议</span></span>
                    <span class="iconfont iconqiehuan" data-id="0" style="float: right;color: #3B78DD;font-size: 14px;cursor: pointer;"><span style="margin-left:5px;">换一组</span></span>
                </div>
                <div class="layui-card-body">
                    <table class="layui-table" lay-even="" lay-skin="nob">
                        <colgroup>
                            <col width="150">
                            <col width="150">
                            <col width="150">
                        </colgroup>
                        <thead>
                        <tr>
                            <th>类别</th>
                            <th>名称</th>
                            <th>计量</th>
                        </tr>
                        </thead>
                        <tbody id="table0"></tbody>
                    </table>
                </div>
            </div>
            <div class="layui-card">
                <div class="layui-card-header">
                    <span class="iconfont iconwucan"><span style="margin-left: 5px;">午餐建议</span></span>
                    <span class="iconfont iconqiehuan" data-id="1" style="float: right;color: #3B78DD;font-size: 14px;cursor: pointer;"><span style="margin-left:5px;">换一组</span></span>
                </div>
                <div class="layui-card-body">
                    <table class="layui-table" lay-even="" lay-skin="nob">
                        <colgroup>
                            <col width="150">
                            <col width="150">
                            <col width="150">
                            <col>
                        </colgroup>
                        <thead>
                        <tr>
                            <th>类别</th>
                            <th>名称</th>
                            <th>计量</th>
                        </tr>
                        </thead>
                        <tbody id="table1"></tbody>
                    </table>
                </div>
            </div>
            <div class="layui-card">
                <div class="layui-card-header">
                    <span class="iconfont iconzaocanwancan"><span style="margin-left: 5px;">晚餐建议</span></span>
                    <span class="iconfont iconqiehuan" data-id="2" style="float: right;color: #3B78DD;font-size: 14px;cursor: pointer;"><span style="margin-left:5px;">换一组</span></span>
                </div>
                <div class="layui-card-body">
                    <table class="layui-table" lay-even="" lay-skin="nob" >
                        <colgroup>
                            <col width="150">
                            <col width="150">
                            <col width="150">
                            <col>
                        </colgroup>
                        <thead>
                        <tr>
                            <th>类别</th>
                            <th>名称</th>
                            <th>计量</th>
                        </tr>
                        </thead>
                        <tbody id="table2"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </fieldset>
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

    function CurrentTime() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        month = month < 10 ? ("0" + month) : month;
        day = day < 10 ? ("0" + day) : day;
        hour = hour < 10 ? ("0" + hour) : hour;
        minute = minute < 10 ? ("0" + minute) : minute;
        second = second < 10 ? ("0" + second) : second;
        var Timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        //在页面上插入日期
        $(".timeShow").text(Timer);
        setTimeout(function () {
            CurrentTime();
        }, 1000);
    }

    function getMeal(type){
        var layerflag;
        var record = {}
        record["userId"] = '${param.userId}';
        record["hotelId"] = '${hotelInfo.hotelId}'
        record["mealType"] = type
        console.log(record)
        $.ajax({
            //请求方式
            type : "POST",
            contentType: "application/json;charset=UTF-8",
            url : "${ctx}/padding/getMealList",
            data : JSON.stringify(record),
            datatype:"JSON",
            beforeSend: function () {
                layerflag=showLoad();
            },
            success : function(re) {
                t=setInterval(function(){ closeLoad(layerflag); },600);
                if(re.code == "0"){
                    var ml = re.mealInfo;
                    if(ml){
                        $("#table"+type).empty();
                        $("#table"+type).append('<tr>\n' +
                            '                            <td>主食</td>\n' +
                            '                            <td>'+ml.stapleName+'</td>\n' +
                            '                            <td>'+ml.stapleCacul+'</td>\n' +
                            '                        </tr>\n' +
                            '                        <tr>\n' +
                            '                            <td>肉蛋奶</td>\n' +
                            '                            <td>'+ml.memname+'</td>\n' +
                            '                            <td>'+ml.memcacul+'</td>\n' +
                            '                        </tr>\n' +
                            '                        <tr>\n' +
                            '                            <td>蔬果</td>\n' +
                            '                            <td>'+ml.vfname+'</td>\n' +
                            '                            <td>'+ml.vfcacul+'</td>\n' +
                            '                        </tr>\n' +
                            '                        <tr>\n' +
                            '                            <td>油脂</td>\n' +
                            '                            <td>'+ml.greaseName+'</td>\n' +
                            '                            <td>'+ml.greaseCacul+'</td>\n' +
                            '                        </tr>\n' +
                            '                        <tr>\n' +
                            '                            <td>总热量</td>\n' +
                            '                            <td></td>\n' +
                            '                            <td style="color: #FF5722">'+ml.totalFatB+'Kcal</td>\n' +
                            '                        </tr>')
                    }else {
                        $("#table"+type).append('<span style="color: #d8d8d8;font-size: 13px;">暂无数据</span>')
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
    }

    layui.use(['form', 'layedit', 'laydate','element','upload'], function() {
        var $ = layui.jquery;
        var form = layui.form
            , layer = layui.layer
            , layedit = layui.layedit
            , laydate = layui.laydate
            , upload = layui.upload;

        //显示时间
        CurrentTime();

        now = new Date(),hour = now.getHours()
        if(hour < 6){$(".welcomeTitle").text("凌晨好！ - 欢迎来到")}
        else if (hour < 9){$(".welcomeTitle").text("早上好！ - 欢迎来到")}
        else if (hour < 12){$(".welcomeTitle").text("上午好！ - 欢迎来到")}
        else if (hour < 14){$(".welcomeTitle").text("中午好！ - 欢迎来到")}
        else if (hour < 17){$(".welcomeTitle").text("下午好！ - 欢迎来到")}
        else if (hour < 19){$(".welcomeTitle").text("傍晚好！ - 欢迎来到")}
        else if (hour < 22){$(".welcomeTitle").text("晚上好！ - 欢迎来到")}
        else {$(".welcomeTitle").text("夜里好！ - 欢迎来到")}

        getMeal(0);
        getMeal(1);
        getMeal(2);

    })

    $(".iconqiehuan").click(function () {
        var type = $(this).data("id");
        getMeal(type)
    })
</script>
</html>
