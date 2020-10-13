<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>课程表</title>
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
              <span class="aui-center-title">课程表</span>
          </div>
          <a href="javascript:;" class="aui-navBar-item" style="color:#fff">
              <i class="icon icon-sys"></i>学习计划
          </a>
      </header>
      <section class="aui-scrollView">
          <div class="aui-course-box">
              <a href="javascript:;" class="aui-course-item">
                  <div class="aui-flex">
                      <div class="aui-flex-box">
                          12月07日 14:30-16:30
                      </div>
                      <div class="aui-flex-yes" style="color:#fe5a69">未开课</div>
                  </div>
                  <div class="aui-course-title">
                      <h2>2018级项目管理本科项目成本管理课程第一节(一)</h2>
                      <p>自考项目管理本科--自考</p>
                  </div>
                  <div  class="aui-flex">
                      <div class="aui-flex-TUser">
                          <img src="themes/img/user/user-logo-001.png" alt="">
                      </div>
                      <div class="aui-flex-box">
                          <h3>安然老师</h3>
                      </div>
                  </div>
                  <div class="aui-course-button">
                      <button> <i class="icon icon-data"></i>资料</button>
                  </div>
              </a>
              <a href="javascript:;" class="aui-course-item">
                  <div class="aui-flex">
                      <div class="aui-flex-box">
                          11月07日 14:30-16:30
                      </div>
                      <div class="aui-flex-yes">已结课</div>
                  </div>
                  <div class="aui-course-title">
                      <h2>2018级项目管理本科项目成本管理课程第一节(一)</h2>
                      <p>自考项目管理本科--自考</p>
                  </div>
                  <div  class="aui-flex">
                      <div class="aui-flex-TUser">
                          <img src="themes/img/user/user-logo-005.png" alt="">
                      </div>
                      <div class="aui-flex-box">
                          <h3>安然老师</h3>
                      </div>
                  </div>
                  <div class="aui-course-button">
                      <button> <i class="icon icon-data"></i>资料</button>
                      <button> <i class="icon icon-task"></i>作业</button>
                  </div>
              </a>
              <a href="javascript:;" class="aui-course-item">
                  <div class="aui-flex">
                      <div class="aui-flex-box">
                          11月07日 14:30-16:30
                      </div>
                      <div class="aui-flex-yes">已结课</div>
                  </div>
                  <div class="aui-course-title">
                      <h2>2018级项目管理本科项目成本管理课程第一节(一)</h2>
                      <p>自考项目管理本科--自考</p>
                  </div>
                  <div  class="aui-flex">
                      <div class="aui-flex-TUser">
                          <img src="themes/img/user/user-logo-001.png" alt="">
                      </div>
                      <div class="aui-flex-box">
                          <h3>安然老师</h3>
                      </div>
                  </div>
                  <div class="aui-course-button">
                      <button> <i class="icon icon-data"></i>资料</button>
                  </div>
              </a>
              <a href="javascript:;" class="aui-course-item">
                  <div class="aui-flex">
                      <div class="aui-flex-box">
                          11月07日 14:30-16:30
                      </div>
                      <div class="aui-flex-yes">已结课</div>
                  </div>
                  <div class="aui-course-title">
                      <h2>2018级项目管理本科项目成本管理课程第一节(一)</h2>
                      <p>自考项目管理本科--自考</p>
                  </div>
                  <div  class="aui-flex">
                      <div class="aui-flex-TUser">
                          <img src="themes/img/user/user-logo-005.png" alt="">
                      </div>
                      <div class="aui-flex-box">
                          <h3>安然老师</h3>
                      </div>
                  </div>
                  <div class="aui-course-button">
                      <button> <i class="icon icon-data"></i>资料</button>
                      <button> <i class="icon icon-task"></i>作业</button>
                  </div>
              </a>
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
