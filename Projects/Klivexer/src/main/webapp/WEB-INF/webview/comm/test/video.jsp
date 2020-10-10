<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
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
        font-size:80px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
        color: #FF8C00;
    }
</style>
<body>

<%--<div class="donghua">--%>
<%--</div>--%>
<button onclick="get()">asd</button>

<script>
    // var s = 5
    // t = setInterval (function () {
    //     $(".donghua").empty()
    //     $(".donghua").append('<div class="layui-anim layui-anim-fadein">\n' +
    //         '        <span class="web-font">'+s+'</span>\n' +
    //         '    </div>')
    //     s--
    //     if(s==0){   //终止条件
    //         clearInterval(t)
    //     }
    // }, 1000);  //反复执行函数本身
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

    function get(){
        endTime = new Date();
        console.log(getSeconds(endTime ));
    }


</script>
</body>
</html>
