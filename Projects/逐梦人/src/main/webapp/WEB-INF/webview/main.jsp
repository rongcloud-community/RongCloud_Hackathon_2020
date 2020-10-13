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
  <body class="login-bg">
  <div class="login-contain">
      <div class="login-header">
          <p>欢迎登录</p>
      </div>
      <div class="form-group">
          <div class="form-item">
              <label for="username">
                  <img src="${ctx}/bookroom/login/images/user.png">
              </label>
              <input id="username" type="text" placeholder="请输入账号">
          </div>
          <div class="form-item">
              <label for="password">
                  <img src="${ctx}/bookroom/login/images/password.png" alt="">
              </label>
              <input id="password" type="password" placeholder="请输入密码">
          </div>
      </div>
      <div class="button-group">
          <button class="login-btn" id="doLogin">登录</button>
      </div>

      <div class="order-login">
          <p class="order-login-line">其他登录方式</p>
          <div class="order-login-box">
              <div style="display: flex;flex-direction: column;justify-content: center;align-items: center">
                  <a href="#">
                      <img src="${ctx}/bookroom/login/images/wechat-login.png" alt="" style="width: 45px;height: 45px;">
                      <p>微信登录</p>
                  </a>
              </div>
          </div>
      </div>
  </div>

  <script>
      $(function(){
          $(window).resize();
      });
      //js设置居中
      $(window).resize(function(){
          $(".login-contain").css({
              position: "absolute",
              left: ($(window).width() - $(".login-contain").outerWidth())/2,
              top: ($(window).height() - $(".login-contain").outerHeight())/2
          });
      });

      $("#doLogin").click(function () {
          var value = {}
          $(".form-item input").each(function () {
              value[$(this).attr('id')] = $(this).val()
          })
          $.ajax({
              type : "POST",
              contentType: "application/json;charset=UTF-8",
              url : "${ctx}/adam/getToken",
              data: JSON.stringify(value),
              datatype:"JSON",
              success : function(re) {
                  var tokenresult = re.tokenResult
                  if(tokenresult){
                      <%--location.href="${ctx}/adam/main?userId="+tokenresult["userId"]+"&token="+tokenresult["token"]--%>
                      location.href="${ctx}/book/detail?userId="+tokenresult["userId"]+"&token="+tokenresult["token"]+"&userName="+value["username"]
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

  </body>

</html>
