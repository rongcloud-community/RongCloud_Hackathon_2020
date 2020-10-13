<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE HTML>
<html>
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>登录</title>
      <meta name="renderer" content="webkit" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />
      <%@ include file="tags/taglib.jsp"%>
      <script src="http://cdn.ronghub.com/RongIMLib-3.0.7-dev.js"></script>
  </head>
  <style>
      body,html{
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
      }

      .pages{
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          height: 100%;
          width: 100%;
      }

      .main{
          height: 65%;
          width: 400px;
          background-color: white;
          border-radius: 9px;
          -moz-box-shadow: 2px 2px 10px #909090;
          -webkit-box-shadow: 2px 2px 10px #909090;
          box-shadow:2px 2px 10px #909090;

          display: flex;
          flex-direction: column;
          align-items: center;
          position:relative;

          z-index: 999;
      }

      .userava{
          -moz-box-shadow: 2px 2px 10px #909090;
          -webkit-box-shadow: 2px 2px 10px #909090;
          box-shadow:2px 2px 10px #909090;
          border: 1px solid darkgrey;
      }
      .maskfram{
          bottom: 0;
          position: absolute;
          background-color: #F8F8F8;
          width: 100%;
          height: 110px;
          border-bottom-left-radius: 9px;
          border-bottom-right-radius: 9px;
          text-align: center;
          line-height: 110px;
      }
      .inputfram{
          width: 100%;
          margin-top:30px;
          display: flex;
          align-items: center;
          justify-content: center;
      }
      .inputfram input{
          border: 1px solid #eeeeee;
          width: 75%;
          height: 40px;
          border-radius: 5px;
          margin-left: 10px;
          padding-left: 10px;
          font-family : 微软雅黑,宋体;
      }

      .userId:hover,.userName:hover{
          border: 1px solid #FFD101!important;
      }
      .button button{
          border: 0px;
          border-radius: 5px;
          margin-left: 12px;
          height: 45px;
          width: 86%;
          background-color: #F52F3E;
          font-size: 20px;
          color: white;
          font-family : 微软雅黑,宋体;
      }
      .button button:active{
          background-color: #eeeeee;
          color: #666666;
      }

      .layui-carousel{

      }


  </style>
  <body style="background-color: #F3F5F7;">
    <div class="pages" style="">
        <div class="layui-carousel" id="backimg" style="position: absolute;z-index:1">
            <div carousel-item>
                <div style="background-image:url(${ctx}/shangcheng/uploads/sy/banner1.jpg); background-repeat: no-repeat;background-size: 100% 100%"></div>
                <div style="background-image:url(${ctx}/shangcheng/uploads/sy/banner2.jpg); background-repeat: no-repeat;background-size: 100% 100%"></div>
                <div style="background-image:url(${ctx}/shangcheng/uploads/sy/banner3.jpg); background-repeat: no-repeat;background-size: 100% 100%"></div>
            </div>
        </div>

        <div class="main" id="main">
            <div class="userava" style="width: 50px;height: 50px;border-radius: 200px;margin-top: 40px;display: flex;justify-content: center;align-items: center;">
                <div class="iconfont iconguanliyuan" style="font-size: 30px;"></div>
            </div>
            <div class="inputfram" style="text-align: center;">
                <span class="iconfont icondenglu" style="font-size: 32px;margin-left: 2px;color: #666666"></span>
                <input class="userId" id="userId"  style="" placeholder="请输入用户ID"/>
            </div>

            <div class="inputfram" style="text-align: center;">
                <span class="iconfont iconmima" style="font-size: 32px;margin-left: 2px;color: #666666"></span>
                <input class="userName" id="userName" placeholder="请输入用户名" />
            </div>
            <div class="button" style="margin-top: 30px;width: 100%;text-align: center">
                <button class="login" id="login">登 录</button>
            </div>
            <div class="maskfram" style="">
                <span class="bartext" style="font-size: 25px;line-height:100px;color: darkgrey;font-family : 微软雅黑,宋体;">云  购  物  交  流  网</span>
            </div>
        </div>
    </div>
  </body>
<script>
    layui.use(['layer', 'form', 'layedit'], function(){
        var layer = layui.layer
            ,form = layui.form
            ,layerdit = layui.layedit;

        layui.use('carousel', function(){
            var carousel = layui.carousel;
            //建造实例
            carousel.render({
                elem: '#backimg'
                ,width: '100%' //设置容器宽度
                ,height: '100%'
                ,arrow: 'always' //始终显示箭头
                //,anim: 'updown' //切换动画方式
            });
        });

    });

    $("#login").click(function () {
        var reg = {}
        $("#main input").each(function () {
            reg[$(this).attr('id')] = $(this).val()
        })
        $.ajax({
            //跳过存取数据
            type : "POST",
            contentType: "application/json;charset=UTF-8",
            url : "${ctx}/adam/getToken",
            data: JSON.stringify(reg),
            datatype:"JSON",
            success : function(re) {
                var tokenresult = re.tokenResult
                if(tokenresult){
                    <%--location.href="${ctx}/adam/main?userId="+tokenresult["userId"]+"&token="+tokenresult["token"]--%>
                    location.href="${ctx}/shop/index?userId="+tokenresult["userId"]+"&token="+tokenresult["token"]+"&userName="+reg["userName"]
                }else{
                    alert(re)
                }
            },
            error : function(re){
                alert(re)
            }
        });
    })

</script>
</html>
