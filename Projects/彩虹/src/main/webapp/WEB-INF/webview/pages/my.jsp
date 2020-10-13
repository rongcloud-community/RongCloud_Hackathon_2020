<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>我的</title>
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
          <a href="search.html" class="aui-navBar-item">
              <i class="icon icon-search"></i>
          </a>
          <div class="aui-center">
              <span class="aui-center-title">会员中心</span>
          </div>
          <a href="notice.html" class="aui-navBar-item">
              <i class="icon icon-news"></i>
          </a>
      </header>
      <section class="aui-scrollView">
          <div class="aui-well-comm">
              <div class="aui-well-comm-hd">
                  <img src="themes/img/user/user-mate-002.jpg" alt="">
                  <span class="aui-well-comm-vip">
                    <img src="themes/img/icon/icon-vip.png" alt="">
                </span>
              </div>
              <div class="aui-well-comm-bd">
                  <h4>
                      <span>孙璐璐同学</span>
                      <i class="icon icon-man"></i>
                      <em>Lv.10</em>
                  </h4>
                  <p>大家好！我是孙璐璐，多多关照</p>
              </div>
              <span class="aui-comm-sign">已签到</span>
          </div>
          <div class="aui-grids">
              <a href="collection.html" class="aui-grids-item">
                  <span>1220</span>
                  <span class="aui-grids-item-text">收藏</span>
              </a>
              <a href="friends.html" class="aui-grids-item">
                  <span>9236</span>
                  <span class="aui-grids-item-text">关注</span>
              </a>
              <a href="friends.html" class="aui-grids-item">
                  <span>190</span>
                  <span class="aui-grids-item-text">粉丝</span>
              </a>
          </div>
          <div class="divHeight"></div>
          <div class="aui-head-access">
              <div class="aui-head-access-hd">我的学习</div>
              <span class="aui-head-access-fr aui-head-access-fr-clear">已学习:<em>161</em>节课  学习:<em>289</em>小时 <em>123</em>分</span>
          </div>
          <div class="aui-grids aui-grids-image">
              <a href="${ctx}/news" class="aui-grids-item">
                <span>
                    <img src="themes/img/icon/icon-item001.png" alt="">
                </span>
                  <span class="aui-grids-item-text">我的老师</span>
              </a>
              <a href="${ctx}/course" class="aui-grids-item">
                <span>
                    <img src="themes/img/icon/icon-item002.png" alt="">
                </span>
                  <span class="aui-grids-item-text">我的课程</span>
              </a>
              <a href="${ctx}/topic" class="aui-grids-item">
                <span>
                    <img src="themes/img/icon/icon-item003.png" alt="">
                </span>
                  <span class="aui-grids-item-text">我的题库</span>
              </a>
              <a href="${ctx}/score" class="aui-grids-item">
                <span>
                    <img src="themes/img/icon/icon-item004.png" alt="">
                </span>
                  <span class="aui-grids-item-text">我的成绩</span>
              </a>
              <a href="" class="aui-grids-item">
                <span>
                    <img src="themes/img/icon/icon-item005.png" alt="">
                </span>
                  <span class="aui-grids-item-text">最近观看</span>
              </a>
              <a href="" class="aui-grids-item">
                <span>
                    <img src="themes/img/icon/icon-item006.png" alt="">
                </span>
                  <span class="aui-grids-item-text">我的下载</span>
              </a>
          </div>
          <div class="divHeight"></div>
          <div class="aui-head-access">
              <div class="aui-head-access-hd">我的资产</div>
          </div>
          <div class="aui-grids aui-grids-image">
              <a href="" class="aui-grids-item">
                <span>
                    <img src="themes/img/icon/icon-item007.png" alt="">
                </span>
                  <span class="aui-grids-item-text">我的优惠</span>
              </a>
              <a href="" class="aui-grids-item">
                <span>
                    <img src="themes/img/icon/icon-item008.png" alt="">
                </span>
                  <span class="aui-grids-item-text">我的金币</span>
              </a>
              <a href="" target="_blank" class="aui-grids-item">
                <span>
                    <img src="themes/img/icon/icon-item009.png" alt="">
                </span>
                  <span class="aui-grids-item-text">我的店铺</span>
              </a>
          </div>
          <div class="divHeight"></div>
          <div class="aui-head-access">
              <div class="aui-head-access-hd">我的服务</div>
          </div>
          <div class="aui-grids aui-grids-image">
              <a href="" class="aui-grids-item">
                <span>
                    <img src="themes/img/icon/icon-item010.png" alt="">
                </span>
                  <span class="aui-grids-item-text">我的订单</span>
              </a>
              <a href="javascript:;" class="aui-grids-item">
                <span>
                    <img src="themes/img/icon/icon-item011.png" alt="">
                </span>
                  <span class="aui-grids-item-text">邀请好友</span>
              </a>
              <a href="" target="_blank" class="aui-grids-item">
                <span>
                    <img src="themes/img/icon/icon-item012.png" alt="">
                </span>
                  <span class="aui-grids-item-text">技术支持</span>
              </a>
          </div>
          <div class="divHeight"></div>
          <div class="aui-head-access b-line">
              <div class="aui-head-access-hd">设置</div>
              <span class="aui-head-access-fr"></span>
          </div>
          <div class="aui-head-access b-line">
              <div class="aui-head-access-hd">关于我们</div>
              <span class="aui-head-access-fr"></span>
          </div>
          <div class="aui-head-access">
              <div class="aui-head-access-hd">帮助中心</div>
              <span class="aui-head-access-fr"></span>
          </div>
          <div class="divHeight"></div>
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
          <a href="${ctx}/my" class="aui-tabBar-item aui-tabBar-item-active">
            <span class="aui-tabBar-item-icon">
                <i class="icon icon-car"></i>
            </span>
              <span class="aui-tabBar-item-text ">我的</span>
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
