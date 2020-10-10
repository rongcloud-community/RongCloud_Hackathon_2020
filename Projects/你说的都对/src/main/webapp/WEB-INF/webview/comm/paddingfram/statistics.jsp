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
    <%@ include file="../../tags/taglib.jsp"%>
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
                <div class="layui-col-md12">
                    <div class="layui-card">
                        <div class="layui-card-header">
                            <span>基本信息</span>
                            <span class="iconfont icongai" id="changetab" style="float:right;color: #3B78DD;cursor: pointer"></span>
                        </div>
                        <div class="layui-card-body">
                            <div style="display: flex;flex-direction: row;height: 70px;">
                                <div class="head-tags" style="">
                                    <span class="iconfont iconshengao" style="color:#1E9FFF;"><span class="icontext">身高</span></span>
                                    <span class="iconcont">${userInfo.height}<span style="font-size: 14px;"> cm</span></span>
                                </div>
                                <div class="head-tags" style="">
                                    <span class="iconfont icontizhong" style="color: #009688"><span class="icontext">体重</span></span>
                                    <span class="iconcont">${userInfo.weight}<span style="font-size: 14px;"> kg</span></span>
                                </div>
                                <div class="head-tags" style="">
                                    <span class="iconfont iconBMI" style="color:#FFB800;"><span class="icontext">BMI</span></span>
                                    <span class="iconcont">${userInfo.BMI}</span>
                                </div>
                                <div class="head-tags" style="">
                                    <span class="iconfont iconyaowei" style="color: #FFB800"><span class="icontext">腰围</span></span>
                                    <span class="iconcont">${userInfo.waist}<span style="font-size: 14px;"> cm</span></span>
                                </div>
                            </div>
                            <div style="display: flex;flex-direction: row;height: 70px;">
                                <div class="head-tags">
                                    <span class="iconfont icontunwei" style="color: #FFB800"><span class="icontext">臀围</span></span>
                                    <span class="iconcont">${userInfo.hipline}<span style="font-size: 14px;"> cm</span></span>
                                </div>
                                <div class="head-tags" style="">
                                    <span class="iconfont iconxiongwei" style="color: #FFB800"><span class="icontext">胸围</span></span>
                                    <span class="iconcont">${userInfo.bust}<span style="font-size: 14px;"> cm</span></span>
                                </div>
                                <div class="head-tags" style="">
                                    <span class="iconfont iconxinshuai1" style="color: indianred"><span class="icontext">静息心率</span></span>
                                    <span class="iconcont">${userInfo.RHR}<span style="font-size: 14px;"> 跳/分</span></span>
                                </div>
                                <div class="head-tags">
                                    <span class="iconfont iconxinshuai" style="color: indianred"><span class="icontext">最大心率</span></span>
                                    <span class="iconcont">${userInfo.MHR}<span style="font-size: 14px;"> 跳/分</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="layui-col-md12">
                        <div class="layui-card">
                            <div class="layui-card-header">
                                <span>总运动：</span>
                                <span style="color: #FFB800;">
                                    <span style="font-size: 20px;">${FitnessTime}</span>
                                    分钟</span>
                            </div>
                            <div class="layui-card-body">
                                <div style="display: flex;flex-direction: row;height: 70px;">
                                    <div class="head-tags" style="">
                                        <span class="iconfont iconhuo" style="color: #FF5722"><span class="icontext">今日消耗</span></span>
                                        <span class="iconcont">${CumFatBToday}<span style="font-size: 14px;"> kcal</span></span>
                                    </div>
                                    <div class="head-tags" style="">
                                        <span class="iconfont iconcumulative" style="color:#1E9FFF;"><span class="icontext">累计消耗</span></span>
                                        <span class="iconcont">${CumFatB}<span style="font-size: 14px;"> kcal</span></span>
                                    </div>
                                    <div class="head-tags" style="">
                                        <span class="iconfont iconyundong" style="color: #FFB800"><span class="icontext">累计运动</span></span>
                                        <span class="iconcont">${CumDay}<span style="font-size: 14px;"> 天</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="layui-card">
                            <div class="layui-card-header">周健身情况</div>
                            <div class="layui-card-body" style="">
                                <div id="bodybuilding" style="width: 100%;height:250px;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="layui-col-md6">
                <div class="layui-col-md12">
                    <div class="layui-card">
                        <div class="layui-card-header">周计划完成</div>
                        <div class="layui-card-body">
                            <div id="weekplan" style="width: 100%;height:188px;"></div>
                        </div>
                    </div>
                    <fieldset class="layui-elem-field layui-field-title" style="">
                        <legend>动作校准得分一栏</legend>
                    </fieldset>
                    <div class="layui-row layui-col-space15">
                        <div class="layui-col-md4" style="">
                            <div class="layui-card">
                                <div class="layui-card-header" style="text-align: center">
                                    <span style="color: #FFB800;font-size: 22px;">Perfect</span>
                                </div>
                                <div class="layui-card-body" style="text-align: center">
                                    <span style="color: #FFB800;font-size: 22px;">${Perfect}</span>
                                    <span>次</span>
                                </div>
                            </div>
                        </div>
                        <div class="layui-col-md4" style="">
                            <div class="layui-card">
                                <div class="layui-card-header" style="text-align: center;">
                                    <span style="color: #01AAED;font-size: 22px;">Good</span>
                                </div>
                                <div class="layui-card-body" style="text-align: center">
                                    <span style="color: #01AAED;font-size: 22px;">${Good}</span>
                                    <span>次</span>
                                </div>
                            </div>
                        </div>
                        <div class="layui-col-md4" style="">
                            <div class="layui-card">
                                <div class="layui-card-header" style="text-align: center">
                                    <span style="color: #2F4056;font-size: 22px;">Bad</span>
                                </div>
                                <div class="layui-card-body" style="text-align: center">
                                    <span style="color: #2F4056;font-size: 22px;">${Bad}</span>
                                    <span>次</span>
                                </div>
                            </div>
                        </div>
                        <div class="layui-col-md12 layui-col-space11">
                            <div class="layui-card" style="width: 100%;">
                                <div class="layui-card-header" style="">
                                    健身时间段分布
                                </div>
                                <div class="layui-card-body" style="">
                                    <div id="time" style="width: 100%;height:200px;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
<script>
    // 基于准备好的dom，初始化echarts实例
    var myChart1 = echarts.init(document.getElementById('weekplan'));
    var myChart2 = echarts.init(document.getElementById('bodybuilding'));
    var myChart3 = echarts.init(document.getElementById('time'));
    // 指定图表的配置项和数据
    var option1 = {
        title: {
            text: '最近一周日课程完成数',
            x:'center',
            textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                fontFamily: 'Arial, Verdana, sans...',
                fontSize: 16,
                fontStyle: 'normal',
                fontWeight: '300',
            },
        },
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
                data: ['7日前', '6日前', '5日前', '4日前', '前天', '昨日', '今日'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '完成数',
                type: 'bar',
                barWidth: '50%',
                data: []
            }
        ]
    };

    var option2 = {
        title: {
            text: '周健身数据统计',
            textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
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
            data: ['健身时长-分钟', '热量消耗-Kcal']
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
                data: ['7日前', '6日前', '5日前', '4日前', '前天', '昨日', '今日']
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
                name: '热量消耗/Kcal',
                type: 'line',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                areaStyle: {},
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '健身时长/分钟',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: [220, 182, 191, 234, 290, 330, 310]
            }
        ]
    };

    var option3 = {
        title: {
            text: '周健身时段统计',
            textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                fontFamily: 'Arial, Verdana, sans...',
                fontSize: 16,
                fontStyle: 'normal',
                fontWeight: '300',
            },
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
            {
                name: '时段分布',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);
    myChart2.setOption(option2);
    myChart3.setOption(option3);

    function showLoad() {
        return layer.msg('拼命加载中...', {icon: 16,shade: [0.5, '#f5f5f5'],scrollbar: false,offset: 'auto', time:100000});
    }

    function closeLoad(index) {
        layer.close(index);
    }

    function showSuccess() {
        layer.msg('执行成功！',{time: 1000,offset: 'auto'});
    }

    layui.use(['element', 'layer'], function() {
        var element = layui.element;
        var layer = layui.layer;
        var layerflag;
        //ajax请求图表数据
        var record={}
        {
            record["userId"]=${param.userId};
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
                    myChart1.setOption({
                        series: [{
                            data: re.weekplan
                        }]
                    })
                    myChart2.setOption({
                        series: [
                            {}, {}, {},
                            {
                                name: '热量消耗-Kcal',
                                type: 'line',
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'top'
                                    }
                                },
                                areaStyle: {},
                                data: re.weekFatB
                            },
                            {
                                name: '健身时长-分钟',
                                type: 'line',
                                stack: '总量',
                                areaStyle: {},
                                data: re.weektime
                            }
                        ]
                    })
                    var period = re.period;
                    myChart3.setOption({
                        series: [
                            {
                                name: '时段分布',
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '60%'],
                                data: [
                                    {value: period[0], name: '6:00-9:00'},
                                    {value: period[1], name: '9:00-12:00'},
                                    {value: period[2], name: '12:00-15:00'},
                                    {value: period[3], name: '15:00-18:00'},
                                    {value: period[4], name: '18:00-21:00'},
                                    {value: period[5], name: '21:00-0:00'},
                                    {value: period[6], name: '0:00以后'},
                                ],
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
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
    });

    $("#changetab").click(function () {
        location.href="${ctx}/padding/pad-changeinfo?userId="+${param.userId}
    })
</script>
</html>
