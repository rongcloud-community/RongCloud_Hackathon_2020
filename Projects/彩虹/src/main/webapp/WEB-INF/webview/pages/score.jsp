<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE HTML>
<html>
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>成绩查询</title>
      <meta name="renderer" content="webkit" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />
      <meta content="yes" name="apple-mobile-web-app-capable"/>
      <meta content="black" name="apple-mobile-web-app-status-bar-style"/>
      <meta content="telephone=no" name="format-detection"/>
      <%@ include file="../tags/taglib.jsp"%>
  </head>

  <body style="">
  <section class="aui-flexView">
      <header class="aui-navBar aui-navBar-fixed b-line aui-navBar-change">
          <a href="javascript:history.back(-1)" class="aui-navBar-item">
              <i class="icon icon-return"></i>
          </a>
          <div class="aui-center">
              <span class="aui-center-title">成绩查询</span>
          </div>
          <a href="javascript:;" class="aui-navBar-item">
              <i class="icon icon-sys"></i>
          </a>
      </header>
      <section class="aui-scrollView">
          <div class="aui-branch-box">
              <div class="aui-coll-title">
                  <h2>本学习成绩单</h2>
              </div>
              <div class="aui-flex">
                  <div class="aui-flex-box">
                      <p>亲爱的同学们：本学习的成绩还未公布，请耐心等待，考试结束以后我们会第一时间为您公布成绩。</p>
                  </div>
              </div>
          </div>
      </section>
  </section>
  </body>
  <script>
      <%--$(".formfram").hide()--%>
      <%--$(".iconfram").click(function () {--%>
      <%--    $(".iconfram").hide(function () {})--%>
      <%--    $(".formfram").show()--%>
      <%--})--%>

      <%--$("#doLogin").click(function () {--%>
      <%--    var userid = $("#userid").val()--%>
      <%--    var reg = {}--%>
      <%--    reg['userid'] = userid--%>

      <%--    $.ajax({--%>
      <%--        type : "POST",--%>
      <%--        contentType: "application/json;charset=UTF-8",--%>
      <%--        url : "${ctx}/rong/getToken",--%>
      <%--        data: JSON.stringify(reg),--%>
      <%--        datatype:"JSON",--%>
      <%--        success : function(re) {--%>
      <%--            var tokenresult = re.tokenResult--%>
      <%--            if(tokenresult){--%>
      <%--                location.href="${ctx}/login/choice?userId="+userid+"&token="+tokenresult--%>
      <%--            }else{--%>
      <%--                alert(re)--%>
      <%--            }--%>
      <%--        },--%>
      <%--        error : function(re){--%>
      <%--            alert(re)--%>
      <%--        }--%>
      <%--    });--%>

      <%--})--%>

  </script>
</html>
