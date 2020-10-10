<%--
  Created by IntelliJ IDEA.
  User: songc
  Date: 2020/3/20
  Time: 15:22
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
    <%@ include file="../tags/taglib.jsp"%>
</head>
<style>
    .head-tags{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .head-tags .iconfont{
        font-size: 20px;
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
</style>
<body>
    <div style="padding: 10px;">
        <div class="layui-row layui-col-space15">
            <div class="layui-col-md6">
                <div class="layui-card">
                    <div class="layui-card-header">
                        <span class="iconfont icongonggao"><span style="margin-left: 5px;">酒店公告</span></span>
                        <span class="iconfont icongai" id="changetab" style="float:right;color: #3B78DD;cursor: pointer"></span>
                    </div>
                    <div class="layui-card-body" style="">
                        <form class="layui-form" action="" style="height: 100%;">
                            <div class="layui-form-item layui-form-text">
                                <textarea placeholder="请输入内容" class="layui-textarea" style="height: 150px;"></textarea>
                            </div>
                            <div class="layui-form-item titleSub" style="display: none">
                                <button type="button" class="layui-btn" lay-submit="" lay-filter="demo1" style="background-color: #3B78DD">确定</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="layui-col-md6">
                <div class="layui-row layui-col-space15">
                    <div class="layui-col-md12 layui-col-space11">
                        <div class="layui-card" style="width: 100%;">
                            <div class="layui-card-body" style="">
                                <div id="time" style="width: 100%;height:203px;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="layui-col-md12">
                <div class="layui-card">
                    <div class="layui-card-header">
                        <span class="iconfont icondenglu"><span style="margin-left: 5px;">用户详情</span></span>
                    </div>
                    <div class="layui-card-body" style="">
                        <table class="layui-hide" id="zao" lay-filter="zao"></table>
                        <script type="text/html" id="barDemo">
                            <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="detail">查看</a>
                            <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
                            <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
                        </script>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
<script>
    var myChart2 = echarts.init(document.getElementById('time'));
    var option2 = {
        title: {
            text: '用户使用情况统计-折线图',
            textStyle: {
                fontFamily: 'Arial, Verdana, sans...',
                fontSize: 16,
                fontStyle: 'normal',
                fontWeight: '300',
            },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['用户登录时段分布-人']
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['6:00-9:00', '9:00-12:00', '12:00-15:00', '15:00-18:00', '18:00-21:00', '21:00-0:00', '0点以后']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '',
                type: 'line',
                stack: '总量',
                areaStyle: {},
            },
            {
                name: '',
                type: 'line',
                stack: '总量',
                areaStyle: {},
            },
            {
                name: '',
                type: 'line',
                stack: '总量',
                areaStyle: {},
            },
            {
                name: '',
                type: 'line',
                stack: '总量',
                areaStyle: {},
            },
            {
                name: '分布人数/人',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: [220, 182, 191, 234, 290, 330, 310]
            }
        ]
    };
    myChart2.setOption(option2);

    function showLoad() {
        return layer.msg('拼命加载中...', {icon: 16,shade: [0.5, '#f5f5f5'],scrollbar: false,offset: 'auto', time:100000});
    }

    function closeLoad(index) {
        layer.close(index);
    }

    function showSuccess() {
        layer.msg('执行成功！',{time: 1000,offset: 'auto'});
    }

    layui.use(['element', 'layer','laypage','table'], function() {
        var element = layui.element
            , layer = layui.layer
            , laypage = layui.laypage
            , table = layui.table;
        var layerflag;

        //公告栏
        var title = "暂无最新公告..."
        $("textarea").text(title)
        $("textarea").attr("disabled","disabled")

        //ajax请求图表数据
        var record={}
        {
            record["userId"]="${param.userId}";
        }
        $.ajax({
            //请求方式
            type : "POST",
            contentType: "application/json;charset=UTF-8",
            url : "${ctx}/padding/getEchartsData",
            data : JSON.stringify(record),
            datatype:"JSON",
            beforeSend: function () {
                layerflag=showLoad();
            },
            success : function(re) {
                t=setInterval(function(){ closeLoad(layerflag); },600);
                if(re.code == "0"){
                    var period = re.period;
                    myChart2.setOption({
                        series: [
                            {
                                name: '',
                                type: 'line',
                                stack: '总量',
                                areaStyle: {},
                            },
                            {
                                name: '',
                                type: 'line',
                                stack: '总量',
                                areaStyle: {},
                            },
                            {
                                name: '',
                                type: 'line',
                                stack: '总量',
                                areaStyle: {},
                            },
                            {
                                name: '',
                                type: 'line',
                                stack: '总量',
                                areaStyle: {},
                            },
                            {
                                name: '分布人数/人',
                                type: 'line',
                                stack: '总量',
                                areaStyle: {},
                                data: [period[0], period[1], period[2], period[3], period[4], period[5], period[6]]
                            }
                        ]
                    })
                }else{
                    layer.msg(re.msg,function () {});
                }
            },
            error : function(e){
                closeLoad(layerflag);
                layer.msg('服务器出错，拉取数据失败...',function () {});
            }
        });

        $.ajax({
            //请求方式
            type : "POST",
            contentType: "application/json;charset=UTF-8",
            url : "${ctx}/admin/getHotelInfo",
            data : JSON.stringify(record),
            datatype:"JSON",
            beforeSend: function () {
                layerflag=showLoad();
            },
            success : function(re) {
                t=setInterval(function(){ closeLoad(layerflag); },600);
                if(re.code == "0"){
                    title = re.hotelInfo.hotelNotice
                    if(title!=""&&title!=null&&title!="null"){
                        $("textarea").text(title)
                        $("textarea").attr("disabled","disabled")
                    }
                    record["hotelId"] = re.hotelInfo.hotelId
                }else{
                    layer.msg(re.msg,function () {});
                }
            },
            error : function(e){
                closeLoad(layerflag);
                layer.msg('服务器出错，拉取数据失败...',function () {});
            }
        });

        //执行一个 table 实例
        table.render({
            elem: '#zao'
            ,height: 420
            ,url: '${ctx}/admin/getUserList' //数据接口
            ,method:"post"
            ,contentType: 'application/json'
            ,title: '用户表'
            ,page: true //开启分页
            ,toolbar: 'default' //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
            ,cols: [[ //表头
                {type: 'checkbox'}
                ,{field: 'userId', title: '手机号', sort: true}
                ,{field: 'userName', title: '姓名',}
                ,{field: 'userType', title: '用户类型'}
                ,{field: 'loginTime', title: '上次登录时间',}
                ,{field: 'enrollTime', title: '注册时间'}
                ,{field: 'enableInfoco', title: '是否完成推荐计划'}
                ,{fixed: 'right', align:'center', toolbar: '#barDemo'}
            ]]
        });
        //监听头工具栏事件
        table.on('toolbar(zao)', function(obj){
            var checkStatus = table.checkStatus(obj.config.id)
                ,data = checkStatus.data; //获取选中的数据
            switch(obj.event){
                case 'add':
                    layer.msg('添加');
                    break;
                case 'update':
                    if(data.length === 0){
                        layer.msg('请选择一行');
                    } else if(data.length > 1){
                        layer.msg('只能同时编辑一个');
                    } else {
                        layer.alert('编辑 [id]：'+ checkStatus.data[0].userId);
                    }
                    break;
                case 'delete':
                    if(data.length === 0){
                        layer.msg('请选择一行');
                    } else {
                        layer.msg('删除');
                        layer.alert('删除 [id]：'+ checkStatus.data[0].userId);
                    }
                    break;
            };
        });

        //监听行工具事件
        table.on('tool(zao)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data //获得当前行数据
                ,layEvent = obj.event; //获得 lay-event 对应的值
            if(layEvent === 'detail'){
                layer.msg('查看操作');
            } else if(layEvent === 'del'){
                layer.confirm('真的删除行么', function(index){
                    obj.del(); //删除对应行（tr）的DOM结构
                    layer.close(index);
                    //向服务端发送删除指令
                });
            } else if(layEvent === 'edit'){
                layer.msg('编辑操作');
            }
        });
        $("#changetab").click(function () {
            $("textarea").attr("disabled",false);
            $(".titleSub").toggle()
        })

        $(".titleSub button").click(function () {
            record["userId"]="${param.userId}"
            record["hotelNotice"]=$("textarea").val()
            $.ajax({
                //请求方式
                type : "POST",
                contentType: "application/json;charset=UTF-8",
                url : "${ctx}/admin/setHotelInfo",
                data : JSON.stringify(record),
                datatype:"JSON",
                beforeSend: function () {
                    layerflag=showLoad();
                },
                success : function(re) {
                    t=setInterval(function(){ closeLoad(layerflag); },600);
                    if(re.code == "0"){
                        layer.msg(re.msg)
                        $("textarea").attr("disabled",true);
                        $(".titleSub").toggle()
                    }else{
                        layer.msg(re.msg,function () {});
                    }
                },
                error : function(e){
                    closeLoad(layerflag);
                    layer.msg('服务器出错，拉取数据失败...',function () {});
                }
            });
        })
    });


</script>
</html>
