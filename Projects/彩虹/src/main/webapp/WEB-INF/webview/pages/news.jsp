<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>消息</title>
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
              <span class="aui-center-title">消息</span>
          </div>
          <a href="javascript:;" class="aui-navBar-item">
              <i class="icon icon-sys"></i>
          </a>
      </header>
      <section class="aui-scrollView">
          <div class="aui-news-box">
              <div class="aui-mate-box">
                  <a href="javascript:;" class="aui-flex b-line">
                      <div class="aui-branch-img">
                          <img src="themes/img/user/user-mate-009.jpg" alt="">
                      </div>
                      <div class="aui-flex-box aui-flex-box-head">
                          <h3>我的老师</h3>
                      </div>
                      <div class="aui-mate-text aui-mate-text-arrow">
                          <p></p>
                      </div>
                  </a>
                  <a href="javascript:;" class="aui-flex b-line">
                      <div class="aui-branch-img">
                          <img src="themes/img/user/user-mate-010.jpg" alt="">
                      </div>
                      <div class="aui-flex-box aui-flex-box-head">
                          <h3>消息通知</h3>
                      </div>
                      <div class="aui-mate-text aui-mate-text-arrow">
                          <p></p>
                      </div>
                  </a>
                  <a href="javascript:;" class="aui-flex b-line" data-id="room1">
                      <div class="aui-branch-img">
                          <img src="themes/img/user/user-mate-008.jpg" alt="">
                      </div>
                      <div class="aui-flex-box">
                          <h3>项目管理本科主群 <em>班级群</em></h3>
                          <p>李星宇，老师各位同学好！</p>
                      </div>
                      <div class="aui-mate-text">
                          <p>今天</p>
                      </div>
                  </a>
                  <a href="javascript:;" class="aui-flex b-line" data-id="room2">
                      <div class="aui-branch-img">
                          <img src="themes/img/user/user-mate-008.jpg" alt="">
                      </div>
                      <div class="aui-flex-box">
                          <h3>高三二班语文授课群</h3>
                          <p>李星宇，老师各位同学好！</p>
                      </div>
                      <div class="aui-mate-text">
                          <p>今天</p>
                      </div>
                  </a>
                  <a href="javascript:;" class="aui-flex b-line" data-id="room3">
                      <div class="aui-branch-img">
                          <img src="themes/img/user/user-mate-008.jpg" alt="">
                      </div>
                      <div class="aui-flex-box">
                          <h3>高三数学大群 <em>课程群</em></h3>
                          <p>李星宇，老师各位同学好！</p>
                      </div>
                      <div class="aui-mate-text">
                          <p>今天</p>
                      </div>
                  </a>
                  <a href="javascript:;" class="aui-flex b-line" data-id="room4">
                      <div class="aui-branch-img">
                          <img src="themes/img/user/user-mate-008.jpg" alt="">
                      </div>
                      <div class="aui-flex-box">
                          <h3>高三二班 </h3>
                          <p>我：哈哈哈哈哈！</p>
                      </div>
                      <div class="aui-mate-text">
                          <p>今天</p>
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
          <a href="${ctx}/study" class="aui-tabBar-item ">
            <span class="aui-tabBar-item-icon">
                <i class="icon icon-loan"></i>
            </span>
              <span class="aui-tabBar-item-text">学习</span>
          </a>
          <a href="${ctx}/news" class="aui-tabBar-item aui-tabBar-item-active">
            <span class="aui-tabBar-item-icon">
                <i class="icon icon-find"></i>
            </span>
              <span class="aui-tabBar-item-text ">消息</span>
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

      $(".aui-flex.b-line").click(function () {
          var roomid = $(this).data('id')
          var reg = {}
          reg['roomid'] = roomid
          reg['userid'] = "${param.userid}"

          $.ajax({
              type : "POST",
              contentType: "application/json;charset=UTF-8",
              url : "${ctx}/rong/getToken",
              data: JSON.stringify(reg),
              datatype:"JSON",
              success : function(re) {
                  var tokenresult = re.tokenResult.token
                  console.log(tokenresult)
                  if(tokenresult){
                      location.href="${ctx}/chat?userId="+reg['userid']+"&token="+tokenresult+"&roomId="+reg['roomid']
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
