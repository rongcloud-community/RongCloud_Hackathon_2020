<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE HTML>
<html>
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>课程</title>
      <meta name="renderer" content="webkit" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />
      <meta content="yes" name="apple-mobile-web-app-capable"/>
      <meta content="black" name="apple-mobile-web-app-status-bar-style"/>
      <meta content="telephone=no" name="format-detection"/>
      <%@ include file="../tags/taglib.jsp"%>
  </head>

  <body style="">
  <section class="aui-flexView">
      <header class="aui-navBar aui-navBar-fixed b-line">
          <a href="javascript:;" class="aui-navBar-item">
              <i class="icon "></i>
          </a>
          <div class="aui-center">
              <span class="aui-center-title">我的学习</span>
          </div>
          <a href="javascript:;" class="aui-navBar-item">
              <i class="icon icon-sys"></i>
          </a>
      </header>
      <section class="aui-scrollView">
          <div class="aui-branch-box">
              <div class="aui-grids">
                  <a href="../course.html" class="aui-grids-item">
                      <div class="aui-grids-item-icon">
                          <img src="themes/img/icon/icon-001.png" alt="">
                      </div>
                      <div class="aui-grids-item-text">我的课程</div>
                  </a>
                  <a href="../topic.html" class="aui-grids-item">
                      <div class="aui-grids-item-icon">
                          <img src="themes/img/icon/icon-002.png" alt="">
                      </div>
                      <div class="aui-grids-item-text">我的题库</div>
                  </a>
                  <a href="#" class="aui-grids-item">
                      <div class="aui-grids-item-icon">
                          <img src="themes/img/icon/icon-003.png" alt="">
                      </div>
                      <div class="aui-grids-item-text">学习规划</div>
                  </a>
              </div>
              <div class="divHeight"></div>
              <div class="aui-coll-title">
                  <h2>今日课程</h2>
              </div>
              <div class="aui-course-box">
                  <a href="javascript:;" class="aui-course-item">
                      <div class="aui-flex">
                          <div class="aui-flex-box">
                              12月07日 14:30-16:30
                          </div>
                          <div class="aui-flex-yes" style="color:#fe5a69">今天16:30直播</div>
                      </div>
                      <div class="aui-course-title">
                          <h2>2018级项目管理本科项目成本管理课程第一节(一)</h2>
                          <p>自考项目管理本科--自考</p>
                      </div>
                      <div class="aui-flex">
                          <div class="aui-flex-TUser">
                              <img src="themes/img/user/user-mate-002.jpg" alt="">
                          </div>
                          <div class="aui-flex-box">
                              <h3>安然老师</h3>
                          </div>
                      </div>
                      <div class="aui-course-button">
                          <button> <i class="icon icon-data"></i>课程资料</button>
                          <button> <i class="icon icon-task"></i>课后作业</button>
                      </div>
                  </a>

              </div>
          </div>
      </section>
      <footer class="aui-footer">
          <a href="${ctx}/main" class="aui-tabBar-item ">
            <span class="aui-tabBar-item-icon">
                <i class="icon icon-home"></i>
            </span>
              <span class="aui-tabBar-item-text">首页</span>
          </a>
          <a href="${ctx}/study" class="aui-tabBar-item aui-tabBar-item-active">
            <span class="aui-tabBar-item-icon">
                <i class="icon icon-loan"></i>
            </span>
              <span class="aui-tabBar-item-text">学习</span>
          </a>
          <a href="${ctx}/news" class="aui-tabBar-item">
            <span class="aui-tabBar-item-icon">
                <i class="icon icon-find"></i>
            </span>
              <span class="aui-tabBar-item-text">消息</span>
          </a>
          <a href="${ctx}/community" class="aui-tabBar-item">
            <span class="aui-tabBar-item-icon">
                <i class="icon icon-comm"></i>
            </span>
              <span class="aui-tabBar-item-text">社区</span>
          </a>
          <a href="${ctx}/my" class="aui-tabBar-item ">
            <span class="aui-tabBar-item-icon">
                <i class="icon icon-car"></i>
            </span>
              <span class="aui-tabBar-item-text">我的</span>
          </a>
      </footer>

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
