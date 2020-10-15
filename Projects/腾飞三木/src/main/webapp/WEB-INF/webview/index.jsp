<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE HTML>
<html>
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>登录</title>
      <meta name="renderer" content="webkit" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />
      <%@ include file="tags/taglib.jsp"%>
      <script src="https://cdn.ronghub.com/RongIMLib-3.0.7.min.js"></script>
      <script src="https://cdn.ronghub.com/RongRTC-3.2.6.min.js"></script>
  </head>
  <style>
      .iconfram{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
      }
      .userinfo{
          width: 270px;
          height: 30px;
          border: 0;
          border-radius: 5px;
          border: 1px solid #eeeeee;
          font-family : 微软雅黑,宋体;
          padding: 2px 2px 2px 10px;
      }
      .userinfo:hover{
          border: 1px solid #FDCC08!important;
      }
  </style>
  <body style="">
    <div class="pages" style="display: flex;flex-direction: column;justify-content: center;align-items: center;margin-top: 50%;">
        <div class="iconfram" style="width: 250px;height: 250px;">
            <div class="" style="height: 60%;">
                <img src="${ctx}/studyRoom/images/icon_login.png">
            </div>
            <div style="flex: 1;text-align: center;line-height: 27px;">
                <p style="font-size: 22px;">点击进入<strong style="font-size: 28px;">自习室</strong></p>
                <p style="margin-top: 18px;color: #666666">请注意文明自习，遵守自习规则</p>
            </div>
        </div>
        <div class="formfram" style="width: 100%;display: flex;flex-direction: column;justify-content: center;align-items: center;">
            <div class="" style="">
                <img src="${ctx}/studyRoom/images/icon_login.png" style="width: 120px;">
            </div>
            <div class="row" style="margin-top: 20px;">
                <input class="userinfo" id="userid" type="text" placeholder="取个好听的名字吧~" />
                <span class="iconfont iconskip" id="doLogin" style="color: #FDCC08;font-size: 26px;margin-left: 5px;"></span>
            </div>
        </div>
    </div>
    <p style="color: #666666;position: fixed;bottom: 10px;left: 23%;font-size: 12px;color: #D0D0D0">声明：本作品借鉴QQ自习室，非商业用途</p>
  </body>
  <script>
      $(".formfram").hide()
      $(".iconfram").click(function () {
          $(".iconfram").hide(function () {})
          $(".formfram").show()
      })

      $("#doLogin").click(function () {
          var userid = $("#userid").val()
          var reg = {}
          reg['userid'] = userid

          $.ajax({
              type : "POST",
              contentType: "application/json;charset=UTF-8",
              url : "${ctx}/rong/getToken",
              data: JSON.stringify(reg),
              datatype:"JSON",
              success : function(re) {
                  var tokenresult = re.tokenResult
                  if(tokenresult){
                      location.href="${ctx}/login/choice?userId="+userid+"&token="+tokenresult
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
