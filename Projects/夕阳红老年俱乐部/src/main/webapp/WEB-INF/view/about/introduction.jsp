<%--
  Created by IntelliJ IDEA.
  User: 96081
  Date: 2019/12/8
  Time: 20:27
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../tags/taglib.jsp" %>
<html>
<head>
    <title>产品介绍</title>
</head>
<body style="padding: 10px 10px;background: white;width: 100%;height: 100%;">
<div style="font-size: 15px; padding: 15px 15px 15px 15px;">

    <fieldset class="layui-elem-field">
        <legend>项目介绍</legend>
        <div class="layui-field-box">
            本项目从盲人日常出行不便的现状出发，旨在提供一款智能为盲人的出行助手工具。盲人由于视觉的缺失，
            在日常出行中往往会遇到很多无法提前预知的困难。道路中盲道中断或是被占用，前方有移动的障碍物出现，
            过马路时红绿灯的变化需要视觉分辨，在陌生的路段难以辨别方向等，都是造成盲人单独出行困难的原因。
            导盲犬或是盲杖在让盲人了解周边情况上不够智能，而现市面上存在的一些为盲人智能导航的工具因为其应
            用到的先进技术或设备， 大多价格非常高昂。本课题的研究目标就是利用低成本的简单工具——摄像头，结合
            图像处理、图像识别、 图像测距等技术实现为盲人单独出行的智能指引。
        </div>
    </fieldset>
</div>

<div>
    <div class="layui-elem-quote " >
        <p style="font-size: 20px;">功能介绍</p>
        <div style="font-size: 15px;">
            <br/>
            ● 导航功能，为盲人的出行进行了路线的规划和指引的同时记录盲人的行动轨迹，方便在发生紧急情况时及时让亲友获知具体位置；<br/>
            ● 识别功能，识别前方障碍物的大致类型，让盲人对周围情况的感知更加具体；<br/>
            ● 测距功能，测量出前方障碍物的大致距离，通过具体数据，更清晰地提供盲人提前的反应和准备时间；<br/>
            ● 信号灯检测，在过马路时，智能识别信号灯的变化情况，及时反映给盲人。<br/>

        </div>

    </div>

</div>
<div style="font-size: 15px; padding: 15px 15px 15px 15px;">
    <fieldset class="layui-elem-field">
        <legend>调研目的及范围</legend>
        <div class="layui-field-box">
            本项目从盲人日常出行不便的现状出发，旨在提供一款智能为盲人的出行助手工具。盲人由于视觉的缺失，
            本次调研有如下目的：<br/>
            1、了解已经设计的需求对于视觉障碍者是否真的实用。<br/>
            2、从视觉障碍者及其亲友等了解其切实存在的未解决的困难，对需求进行进一步的分析。<br/>
            3、通过视觉障碍者的生活细节，对产品的形态进行初步的设计，包括其佩戴方式，造价的预估等。<br/><br/>
            我们在样本定义时遵循以下原则：一是样本要有广泛的代表性，以期能够基本反映目标消费者的需求状况；二是样本要有可靠性。拟定于从直接和间接两个大方向进行调研，从视觉障碍者本身感受到的困难和他们周围人在给他们提供帮助的时候感受到的存在的困难，调研目标包括：<br/>
            1、福利院、残疾人中心等视觉障碍者聚集处，通过对工作人员工作内容侧面了解视觉障碍人群在生活中会遇到的困难。<br/>
            2、福利院、残疾人中心等视觉障碍者聚集处，通过直接向视觉障碍者了解他们生活中希望可以得到的帮助，将其转化为产品功能解决问题。<br/>
            3、向身边人了解其家中老人等出现视觉障碍的问题后需要得到的帮助有哪些。<br/>
        </div>
    </fieldset>
</div>
<div>
    <div class="layui-elem-quote" style="margin-bottom: 10px">
        <p  style="font-size: 20px;">调研结果</p>
    </div>
        <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
        <div id="chart1" style="width: 40%;height:400px;padding-top: 15px; float: left;"></div>

        <script type="text/javascript">
            var myChart = echarts.init(document.getElementById('chart1'));
            var data = {};
            data.legendData = ['有时希望','从不希望','非常希望'];
            data.seriesData = [
                {value:60,name:'有时希望'},
                {value:20,name:'从不希望'},
                {value:100,name:'非常希望'}
            ];
            option = {
                title : {
                    text: '视觉障碍人群是否希望独自出行',
                    subtext: '调研结果',
                    x:'left'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    right: 10,
                    top: 20,
                    bottom: 20,
                    data: data.legendData,

                    selected: data.selected
                },
                series : [
                    {
                        name: '一级目录',
                        type: 'pie',
                        radius : '55%',
                        center: ['40%', '50%'],
                        data: data.seriesData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };

            myChart.setOption(option);
        </script>

        <div id="chart2" style="width: 40%;height:400px;padding-top: 15px; float: right;"></div>

        <script type="text/javascript">
            var myChart = echarts.init(document.getElementById('chart2'));
            var data = {};
            data.legendData = ['可以尝试','不愿意使用','很愿意尝试'];
            data.seriesData = [
                {value:60,name:'可以尝试'},
                {value:20,name:'不愿意使用'},
                {value:100,name:'很愿意尝试'}
            ];
            option = {
                title : {
                    text: '视觉障碍人群对智能设备的需求',
                    subtext: '调研结果',
                    x:'left'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    right: 10,
                    top: 20,
                    bottom: 20,
                    data: data.legendData,

                    selected: data.selected
                },
                series : [
                    {
                        name: '一级目录',
                        type: 'pie',
                        radius : '55%',
                        center: ['40%', '50%'],
                        data: data.seriesData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };

            myChart.setOption(option);
        </script>


</div>

</body>
</html>
