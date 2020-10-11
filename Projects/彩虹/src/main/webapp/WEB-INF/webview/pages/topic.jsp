<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE HTML>
<html>
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>题库</title>
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
          <a href="javascript:history.back(-1)" class="aui-navBar-item">
              <i class="icon icon-return"></i>
          </a>
          <div class="aui-center">
              <span class="aui-center-title">题库</span>
          </div>
          <a href="javascript:;" class="aui-navBar-item">
              <i class="icon icon-sys"></i>
          </a>
      </header>
      <section class="aui-scrollView">
          <div class="aui-topic-box">
              <div class="aui-flex">
                  <div class="aui-flex-box">
                      <div class="au-topic-one">
                          <h2>课后练习</h2>
                          <p>所有结课后的练习题和作业人</p>
                          <button>去练习</button>
                      </div>
                  </div>
                  <div class="aui-flex-box">
                      <div class="au-topic-two">
                          <div class="aui-topic-wrong">
                              <h2>随机练习</h2>
                              <p>所有结课后的练习题和作业人</p>
                          </div>
                          <div class="aui-topic-wrong">
                              <h2>智能练习</h2>
                              <p>所有结课后的练习题和作业人</p>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="aui-topic-head">
                  <h2>所有科目</h2>
              </div>
              <a href="javascript:;" class="aui-topic-item aui-flex">
                  <div class="aui-flex-box">
                      <h4>工程经济学</h4>
                      <p>做题进度:129/19883</p>
                  </div>
                  <div class="aui-topic-arrow"></div>
              </a>
              <a href="javascript:;" class="aui-topic-item aui-flex">
                  <div class="aui-flex-box">
                      <h4>工程经济学</h4>
                      <p>做题进度:129/19883</p>
                  </div>
                  <div class="aui-topic-arrow"></div>
              </a>
              <a href="javascript:;" class="aui-topic-item aui-flex">
                  <div class="aui-flex-box">
                      <h4>工程经济学</h4>
                      <p>做题进度:129/19883</p>
                  </div>
                  <div class="aui-topic-arrow"></div>
              </a>
              <a href="javascript:;" class="aui-topic-item aui-flex">
                  <div class="aui-flex-box">
                      <h4>工程经济学</h4>
                      <p>做题进度:129/19883</p>
                  </div>
                  <div class="aui-topic-arrow"></div>
              </a>
              <a href="javascript:;" class="aui-topic-item aui-flex">
                  <div class="aui-flex-box">
                      <h4>工程经济学</h4>
                      <p>做题进度:129/19883</p>
                  </div>
                  <div class="aui-topic-arrow"></div>
              </a>
              <a href="javascript:;" class="aui-topic-item aui-flex">
                  <div class="aui-flex-box">
                      <h4>工程经济学</h4>
                      <p>做题进度:129/19883</p>
                  </div>
                  <div class="aui-topic-arrow"></div>
              </a>
              <a href="javascript:;" class="aui-topic-item aui-flex">
                  <div class="aui-flex-box">
                      <h4>工程经济学</h4>
                      <p>做题进度:129/19883</p>
                  </div>
                  <div class="aui-topic-arrow"></div>
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
