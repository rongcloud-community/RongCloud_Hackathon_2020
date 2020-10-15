<%--&lt;%&ndash;--%>
<%--  Created by IntelliJ IDEA.--%>
<%--  User: 96081--%>
<%--  Date: 2019/12/10--%>
<%--  Time: 16:31--%>
<%--  To change this template use File | Settings | File Templates.--%>
<%--&ndash;%&gt;--%>
<%--&lt;%&ndash;<%@ page contentType="text/html;charset=UTF-8" language="java" %>&ndash;%&gt;--%>
<%--<%@include file="../../tags/taglib.jsp" %>--%>

<%--<html>--%>
<%--<head>--%>
<%--    <title>实时监测</title>--%>
<%--    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>--%>
<%--    <style type="text/css">--%>
<%--        html,body{--%>
<%--            width:100%;--%>
<%--            height:100%;--%>
<%--        }--%>
<%--        *{--%>
<%--            margin:0px;--%>
<%--            padding:0px;--%>
<%--        }--%>
<%--        body, button, input, select, textarea {--%>
<%--            font: 12px/16px Verdana, Helvetica, Arial, sans-serif;--%>
<%--        }--%>
<%--        p{--%>
<%--            width:603px;--%>
<%--            padding-top:3px;--%>
<%--            overflow:hidden;--%>
<%--        }--%>
<%--        .btn{--%>
<%--            width:142px;--%>
<%--        }--%>
<%--        #container{--%>
<%--            min-width:600px;--%>
<%--            min-height:767px;--%>
<%--        }--%>
<%--    </style>--%>
<%--    <script charset="utf-8" src="https://map.qq.com/api/js?v=2.exp&key=TJ6BZ-7Q36J-PNPFI-KJTBP-VUBCF-JLFOJ--%>
<%--"></script>--%>
<%--    <script>--%>

<%--        window.onload = function(){--%>

<%--//直接加载地图--%>

<%--            //初始化地图函数  自定义函数名init--%>
<%--            function init() {--%>
<%--                //定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器--%>
<%--                var map = new qq.maps.Map(document.getElementById("container"), {--%>
<%--                    center: new qq.maps.LatLng(39.916527,116.397128),      // 地图的中心地理坐标。--%>
<%--                    zoom:8                                                 // 地图的中心地理坐标。--%>
<%--                });--%>
<%--            }--%>

<%--            //调用初始化函数地图--%>
<%--            init();--%>


<%--        }--%>
<%--    </script>--%>
<%--</head>--%>
<%--<body>--%>
<%--<!--   定义地图显示容器   -->--%>
<%--<div id="container"></div>--%>
<%--</body>--%>
<%--</html>--%>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <style type="text/css">
        body, html,#allmap {width: 100%;height: 100%;overflow: hidden;margin:0;}
    </style>

    <script charset="utf-8" src="https://map.qq.com/api/js?v=2.exp&key=UBWBZ-47ZKR-Q6MWU-WYKZR-4SJ5K-JNB3E">
    </script>

    <title>路线途经点</title> </head> <body> <div id="allmap"></div> </body> </html> <script type="text/javascript">
    var porints=[
        // {"name":"start","xy":[114.483629,38.031341]},
        // {"name":"end","xy":[118.8181471825,32.0724473311]},
        {"name":"start","xy":[118.8165807700,32.0732473700]},
        {"name":"end","xy":[118.8204860700,32.0738473900]}
    ];
    var now={"name":"now","xy":[118.8181471825,32.0724473311]}
    var map,markersArray = [],route_lines=[];            // 创建Map实例
    var center=new qq.maps.LatLng( porints[0]['xy'][1],porints[0]['xy'][0]);
    var map=new qq.maps.Map(document.getElementById("allmap"),{center:center,zoom:16});
    function showPoly(pointList) {
        for (var i = 0; i < pointList.length; i++) {
            var start =i;var end= i+1;
            if(!pointList[end])return;
            var driving =new qq.maps.DrivingService({
                complete : function(response){
                    directions_routes = response.detail.routes;
                    //所有可选路线方案
                    for(var i = 0;i < directions_routes.length; i++){
                        var route = directions_routes[i];
                        //map.fitBounds(response.detail.bounds); //调整地图窗口显示所有路线
                        var polyline = new qq.maps.Polyline(
                            {
                                path: route.path,
                                strokeColor: '#8DB6CD',
                                strokeWeight: 6,
                                map: map
                            }
                        );route_lines.push(polyline);
                    }
                }
            });
            driving.search(pointList[start], pointList[end]); //waypoints表示途经点
        }
    }
    function makemarker(center,name){
        var marker=new qq.maps.Marker({position:center,map:map});// 创建标注
        markersArray.push(marker);
        if(name){
            var label = new qq.maps.Label({ content: name,map: map,
                offset: new qq.maps.Size(10, -50),
                position: center,
            });
        }
    }
    var arrayList = [];
    for (var i in porints) {
        var p = porints[i].xy;
        var p1 =new qq.maps.LatLng(p[1],p[0]);
        arrayList.push(p1);
        makemarker(p1,porints[i].name);
    }

   // marker.setIcon(icon);
    var n = now.xy;
    var n1 =new qq.maps.LatLng(n[1],n[0]);
    makemarker(n1,now.name);
    showPoly(arrayList);//显示轨迹

</script>