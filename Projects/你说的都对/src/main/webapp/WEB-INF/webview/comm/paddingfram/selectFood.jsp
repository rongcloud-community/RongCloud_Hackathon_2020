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
    .addIcon{
        width: 60px;
        height: 60px;
        border: 1px solid #3B78DD;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-style:dashed;
        cursor: pointer;
    }
    .addIcon .iconfont{
        font-size: 20px;
        color: #3B78DD;
        font-weight: 300;
    }
</style>
<body>
<fieldset class="layui-elem-field site-demo-button" style="border-radius: 4px;border: 1px solid #3B78DD;">
    <legend >
        <span style="color: #888888;font-size: 16px;">所选食物热量参考范围 - </span>
        <span class="iconfont iconhuo" style="color: #FF5722;font-size: 16px;"></span>
        <span style="color: #FF5722;font-size: 22px;">1990 - 2190Kcal</span>
    </legend>
    <div style="padding: 10px;">
        <div class="layui-card">
            <div class="layui-card-header">
                <span class="iconfont iconzaocan"><span style="margin-left: 5px;">早餐搭配</span></span>
            </div>
            <div class="layui-card-body">
                <div class="addIcon" id="addIcon0" data-fid="0">
                    <span class="iconfont iconaddApp"></span>
                </div>
                <div id="addAll0" style="display: none">
                    <div class="layui-btn-container">
                        <button type="button" class="layui-btn" data-fid="0" lay-demotransferactive="getData0">确定</button>
                        <button type="button" class="layui-btn" data-fid="0" lay-demotransferactive="reload0">取消</button>
                    </div>
                    <div id="add0" class="demo-transfer"></div>
                </div>
                <table class="layui-table" lay-even="" lay-skin="nob" id="addbody0" style="display: none">
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
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="layui-card">
            <div class="layui-card-header">
                <span class="iconfont iconwucan"><span style="margin-left: 5px;">午餐搭配</span></span>
            </div>
            <div class="layui-card-body">
                <div class="addIcon" id="addIcon1" data-fid="1">
                    <span class="iconfont iconaddApp" ></span>
                </div>
                <div id="addAll1" style="display: none">
                    <div class="layui-btn-container">
                        <button type="button" class="layui-btn" data-fid="1" lay-demotransferactive="getData1">确定</button>
                        <button type="button" class="layui-btn" data-fid="1" lay-demotransferactive="reload1">取消</button>
                    </div>
                    <div id="add1" class="demo-transfer"></div>
                </div>
                <table class="layui-table" lay-even="" lay-skin="nob" id="addbody1" style="display: none">
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
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="layui-card">
            <div class="layui-card-header">
                <span class="iconfont iconzaocanwancan"><span style="margin-left: 5px;">晚餐搭配</span></span>
            </div>
            <div class="layui-card-body">
                <div class="addIcon" id="addIcon2" data-fid="2">
                    <span class="iconfont iconaddApp"></span>
                </div>
                <div id="addAll2" style="display: none">
                    <div class="layui-btn-container">
                        <button type="button" class="layui-btn" data-fid="2" lay-demotransferactive="getData2">确定</button>
                        <button type="button" class="layui-btn" data-fid="2" lay-demotransferactive="reload2">取消</button>
                    </div>
                    <div id="add2" class="demo-transfer"></div>
                </div>
                <table class="layui-table" lay-even="" lay-skin="nob" id="addbody2" style="display: none">
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
                    <tbody>
                    </tbody>
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
    layui.use(['element','layer','transfer', 'util'], function() {
        var $ = layui.jquery
            , layer = layui.layer
            ,transfer = layui.transfer
            ,util = layui.util
            , element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块

        //模拟数据
        var data1 = []

        //获取数据
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
                        for(var i=0;i<data.length;i++){
                            var tp = {}
                            tp["value"] = data[i].foodId
                            tp["title"] = data[i].foodName
                            tp["type"] = data[i].foodType
                            tp["cacul"] = data[i].foodCacul
                            tp["content"] = data[i].foodContent
                            tp["fatb"] = data[i].foodFatB
                            data1.push(tp)
                        }
                        //定义标题及数据源
                        transfer.render({
                            elem: '#add0'
                            ,title: ['候选食物', '已选食物']  //自定义标题
                            ,data: data1
                            ,height: 300
                            ,id: 'key0'
                        })
                        //定义标题及数据源
                        transfer.render({
                            elem: '#add1'
                            ,title: ['候选食物', '已选食物']  //自定义标题
                            ,data: data1
                            ,height: 300 //定义高度
                            ,id: 'key1'
                        })
                        //定义标题及数据源
                        transfer.render({
                            elem: '#add2'
                            ,title: ['候选食物', '已选食物']  //自定义标题
                            ,data: data1
                            ,height: 300
                            ,id: 'key2'
                        })
                    }else{
                        layer.msg("暂无数据",function () {});
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

        util.event('lay-demoTransferActive', {
            getData0: function(othis){
                var getData = transfer.getData('key0'); //获取右侧数据
                //添加数据
                var id = $(this).data("fid");
                $("#addIcon"+id).hide();
                $("#addAll"+id).hide();
                $("#addbody"+id).show();
                var fatball = 0;
                for(var i=0;i<getData.length;i++){
                    $("#addbody"+id+" tbody").append('<tr>\n' +
                        '                            <td>'+getData[i].title+'</td>\n' +
                        '                            <td>'+getData[i].type+'</td>\n' +
                        '                            <td>'+getData[i].cacul+'</td>\n' +
                        '                            <td>'+getData[i].content+'</td>\n' +
                        '                            <td>'+getData[i].fatb+'</td>\n' +
                        '                        </tr>')
                    fatball+=parseInt(getData[i].fatb)
                }
                $("#addbody"+id+" tbody").append('<tr>\n' +
                    '                            <td>总热量</td>\n' +
                    '                            <td></td><td></td><td></td>\n' +
                    '                            <td style="color: #FF5722">'+fatball+'</td>\n' +
                    '                        </tr>')
            }
            ,getData1: function(othis){
                var getData = transfer.getData('key1'); //获取右侧数据
                //添加数据
                var id = $(this).data("fid");
                $("#addIcon"+id).hide();
                $("#addAll"+id).hide();
                $("#addbody"+id).show();
                var fatball = 0;
                for(var i=0;i<getData.length;i++){
                    $("#addbody"+id+" tbody").append('<tr>\n' +
                        '                            <td>'+getData[i].title+'</td>\n' +
                        '                            <td>'+getData[i].type+'</td>\n' +
                        '                            <td>'+getData[i].cacul+'</td>\n' +
                        '                            <td>'+getData[i].content+'</td>\n' +
                        '                            <td>'+getData[i].fatb+'</td>\n' +
                        '                        </tr>')
                    fatball+=parseInt(getData[i].fatb)
                }
                $("#addbody"+id+" tbody").append('<tr>\n' +
                    '                            <td>总热量</td>\n' +
                    '                            <td></td><td></td><td></td>\n' +
                    '                            <td style="color: #FF5722">'+fatball+'</td>\n' +
                    '                        </tr>')
            }
            ,getData2: function(othis){
                var getData = transfer.getData('key2'); //获取右侧数据
                //添加数据
                var id = $(this).data("fid");
                $("#addIcon"+id).hide();
                $("#addAll"+id).hide();
                $("#addbody"+id).show();
                var fatball = 0;
                for(var i=0;i<getData.length;i++){
                    $("#addbody"+id+" tbody").append('<tr>\n' +
                        '                            <td>'+getData[i].title+'</td>\n' +
                        '                            <td>'+getData[i].type+'</td>\n' +
                        '                            <td>'+getData[i].cacul+'</td>\n' +
                        '                            <td>'+getData[i].content+'</td>\n' +
                        '                            <td>'+getData[i].fatb+'</td>\n' +
                        '                        </tr>')
                    fatball+=parseInt(getData[i].fatb)
                }
                $("#addbody"+id+" tbody").append('<tr>\n' +
                    '                            <td>总热量</td>\n' +
                    '                            <td></td><td></td><td></td>\n' +
                    '                            <td style="color: #FF5722">'+fatball+'</td>\n' +
                    '                        </tr>')
            }
            ,reload0:function(){
                var id = $(this).data("fid");
                $("#addIcon"+id).toggle();
                $("#addAll"+id).toggle();
            }
            ,reload1:function(){
                var id = $(this).data("fid");
                $("#addIcon"+id).toggle();
                $("#addAll"+id).toggle();
            }
            ,reload2:function(){
                var id = $(this).data("fid");
                $("#addIcon"+id).toggle();
                $("#addAll"+id).toggle();
            }
        });

        $(".addIcon").click(function () {
            var id = $(this).data("fid");
            //示范一个公告层
            $("#addIcon"+id).toggle();
            $("#addAll"+id).toggle();
        })
    });
</script>
</html>
