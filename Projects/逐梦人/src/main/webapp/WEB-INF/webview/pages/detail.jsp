<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE HTML>
<html>
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>书城</title>
      <meta name="renderer" content="webkit" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />
      <%@ include file="../tags/taglib.jsp"%>
      <script src="http://cdn.ronghub.com/RongIMLib-3.0.7-dev.js"></script>
  </head>
  <body>
  <section class="aui-flexView">
      <header class="aui-navBar aui-navBar-fixed">
          <div class="aui-center">
              <div class="aui-search-box">
                  <i class="icon icon-search"></i>
                  <input type="text" placeholder="系统">
              </div>
          </div>
      </header>
      <section class="aui-scrollView">
          <div class="aui-flex aui-flex-head">
              <a href="javascript:;" class="aui-flex-box active">精选</a>
              <a href="javascript:;" class="aui-flex-box">专区</a>
              <a href="javascript:;" class="aui-flex-box">男频</a>
              <a href="javascript:;" class="aui-flex-box">女频</a>
              <a href="javascript:;" class="aui-flex-box">爆款</a>
          </div>
          <div class="m-slider" data-ydui-slider>
              <div class="slider-wrapper">
                  <div class="slider-item">
                      <a href="javascript:;">
                          <img src="${ctx}/bookroom/detail/images/banner.png" alt="">
                      </a>
                  </div>
                  <div class="slider-item">
                      <a href="javascript:;">
                          <img src="${ctx}/bookroom/detail/images/banner.png" alt="">
                      </a>
                  </div>
                  <div class="slider-item">
                      <a href="javascript:;">
                          <img src="${ctx}/bookroom/detail/images/banner.png" alt="">
                      </a>
                  </div>
                  <div class="slider-item">
                      <a href="javascript:;">
                          <img src="${ctx}/bookroom/detail/images/banner.png" alt="">
                      </a>
                  </div>
                  <div class="slider-item">
                      <a href="javascript:;">
                          <img src="${ctx}/bookroom/detail/images/banner.png" alt="">
                      </a>
                  </div>
              </div>
              <div class="slider-pagination"></div>
          </div>
          <div class="aui-palace aui-palace-one">
              <a href="javascript:;" class="aui-palace-grid">
                  <div class="aui-palace-grid-icon">
                      <img src="${ctx}/bookroom/detail/images/nav-001.png" alt="">
                  </div>
                  <div class="aui-palace-grid-text">
                      <h2>排行</h2>
                  </div>
              </a>
              <a href="javascript:;" class="aui-palace-grid">
                  <div class="aui-palace-grid-icon">
                      <img src="${ctx}/bookroom/detail/images/nav-002.png" alt="">
                  </div>
                  <div class="aui-palace-grid-text">
                      <h2>分类</h2>
                  </div>
              </a>
              <a href="javascript:;" class="aui-palace-grid">
                  <div class="aui-palace-grid-icon">
                      <img src="${ctx}/bookroom/detail/images/nav-003.png" alt="">
                  </div>
                  <div class="aui-palace-grid-text">
                      <h2>新书</h2>
                  </div>
              </a>
              <a href="javascript:;" class="aui-palace-grid">
                  <div class="aui-palace-grid-icon">
                      <img src="${ctx}/bookroom/detail/images/nav-004.png" alt="">
                  </div>
                  <div class="aui-palace-grid-text">
                      <h2>完结</h2>
                  </div>
              </a>
              <a href="javascript:;" class="aui-palace-grid">
                  <div class="aui-palace-grid-icon">
                      <img src="${ctx}/bookroom/detail/images/nav-005.png" alt="">
                  </div>
                  <div class="aui-palace-grid-text">
                      <h2>书单</h2>
                  </div>
              </a>
          </div>
          <div class="aui-flex aui-flex-pt-pb">
              <div class="aui-flex-box">
                  <h1>本期主打</h1>
              </div>
          </div>
          <div class="aui-book-list">
              <a href="javascript:;" class="aui-flex">
                  <div class="aui-book-img">
                      <img src="${ctx}/bookroom/detail/images/book1.png" alt="">
                  </div>
                  <div class="aui-flex-box">
                      <h2>文化苦旅 <em>9.9分</em></h2>
                      <p>《文化苦旅》是于秋生的第一个散文集所有的作品主要包括了俩部分一部分是历史文学</p>
                      <h3><i><img src="${ctx}/bookroom/detail/images/user.png" alt="">于秋生著</i> <em style="color: #1d89eb">查看详情</em></h3>
                  </div>
              </a>
              <a href="javascript:;" class="aui-flex">
                  <div class="aui-book-img">
                      <img src="${ctx}/bookroom/detail/images/book2.png" alt="">
                  </div>
                  <div class="aui-flex-box">
                      <h2>我在云上爱你 <em>9.9分</em></h2>
                      <p>《文化苦旅》是于秋生的第一个散文集所有的作品主要包括了俩部分一部分是历史文学</p>
                      <h3><i><img src="${ctx}/bookroom/detail/images/user.png" alt="">于秋生著</i> <em style="color: #1d89eb">查看详情</em></h3>
                  </div>
              </a>
              <a href="javascript:;" class="aui-flex">
                  <div class="aui-book-img">
                      <img src="${ctx}/bookroom/detail/images/book3.png" alt="">
                  </div>
                  <div class="aui-flex-box">
                      <h2>文化苦旅 <em>9.9分</em></h2>
                      <p>《文化苦旅》是于秋生的第一个散文集所有的作品主要包括了俩部分一部分是历史文学</p>
                      <h3><i><img src="${ctx}/bookroom/detail/images/user.png" alt="">于秋生著</i> <em style="color: #1d89eb">查看详情</em></h3>
                  </div>
              </a>
              <a href="javascript:;" class="aui-flex">
                  <div class="aui-book-img">
                      <img src="${ctx}/bookroom/detail/images/book4.png" alt="">
                  </div>
                  <div class="aui-flex-box">
                      <h2>霜冷长河 <em>9.9分</em></h2>
                      <p>《文化苦旅》是于秋生的第一个散文集所有的作品主要包括了俩部分一部分是历史文学</p>
                      <h3><i><img src="${ctx}/bookroom/detail/images/user.png" alt="">于秋生著</i> <em style="color: #1d89eb">查看详情</em></h3>
                  </div>
              </a>
          </div>
          <div class="divHeight"></div>
          <div class="aui-book-list">
              <h5>网友们都在看的小说</h5>
              <a href="javascript:;" class="aui-flex">
                  <div class="aui-book-img">
                      <img src="${ctx}/bookroom/detail/images/book5.png" alt="">
                  </div>
                  <div class="aui-flex-box">
                      <h2>作业长期 <em>9.9分</em></h2>
                      <p>《文化苦旅》是于秋生的第一个散文集所有的作品主要包括了俩部分一部分是历史文学</p>
                      <h3><i>于秋生著</i> <em style="color: #1d89eb">查看详情</em></h3>
                  </div>
              </a>
              <h5>网友们都在看的小说</h5>
              <a href="javascript:;" class="aui-flex">
                  <div class="aui-book-img">
                      <img src="${ctx}/bookroom/detail/images/book6.png" alt="">
                  </div>
                  <div class="aui-flex-box">
                      <h2>作业长期 <em>9.9分</em></h2>
                      <p>《文化苦旅》是于秋生的第一个散文集所有的作品主要包括了俩部分一部分是历史文学</p>
                      <h3><i>于秋生著</i> <em style="color: #1d89eb">查看详情</em></h3>
                  </div>
              </a>
              <h5>网友们都在看的小说</h5>
              <a href="javascript:;" class="aui-flex">
                  <div class="aui-book-img">
                      <img src="${ctx}/bookroom/detail/images/book7.png" alt="">
                  </div>
                  <div class="aui-flex-box">
                      <h2>作业长期 <em>9.9分</em></h2>
                      <p>《文化苦旅》是于秋生的第一个散文集所有的作品主要包括了俩部分一部分是历史文学</p>
                      <h3><i>于秋生著</i> <em style="color: #1d89eb">查看详情</em></h3>
                  </div>
              </a>
              <h5>网友们都在看的小说</h5>
              <a href="javascript:;" class="aui-flex">
                  <div class="aui-book-img">
                      <img src="${ctx}/bookroom/detail/images/book8.png" alt="">
                  </div>
                  <div class="aui-flex-box">
                      <h2>作业长期 <em>9.9分</em></h2>
                      <p>《文化苦旅》是于秋生的第一个散文集所有的作品主要包括了俩部分一部分是历史文学</p>
                      <h3><i>于秋生著</i> <em style="color: #1d89eb">查看详情</em></h3>
                  </div>
              </a>
              <h5>网友们都在看的小说</h5>
              <a href="javascript:;" class="aui-flex">
                  <div class="aui-book-img">
                      <img src="${ctx}/bookroom/detail/images/book9.png" alt="">
                  </div>
                  <div class="aui-flex-box">
                      <h2>作业长期 <em>9.9分</em></h2>
                      <p>《文化苦旅》是于秋生的第一个散文集所有的作品主要包括了俩部分一部分是历史文学</p>
                      <h3><i>于秋生著</i> <em style="color: #1d89eb">查看详情</em></h3>
                  </div>
              </a>
              <h5>网友们都在看的小说</h5>
              <a href="javascript:;" class="aui-flex">
                  <div class="aui-book-img">
                      <img src="${ctx}/bookroom/detail/images/book10.png" alt="">
                  </div>
                  <div class="aui-flex-box">
                      <h2>作业长期 <em>9.9分</em></h2>
                      <p>《文化苦旅》是于秋生的第一个散文集所有的作品主要包括了俩部分一部分是历史文学</p>
                      <h3><i>于秋生著</i> <em style="color: #1d89eb">查看详情</em></h3>
                  </div>
              </a>
              <h5>网友们都在看的小说</h5>
              <a href="javascript:;" class="aui-flex">
                  <div class="aui-book-img">
                      <img src="${ctx}/bookroom/detail/images/book11.png" alt="">
                  </div>
                  <div class="aui-flex-box">
                      <h2>作业长期 <em>9.9分</em></h2>
                      <p>《文化苦旅》是于秋生的第一个散文集所有的作品主要包括了俩部分一部分是历史文学</p>
                      <h3><i>于秋生著</i> <em style="color: #1d89eb">查看详情</em></h3>
                  </div>
              </a>
          </div>
      </section>
      <footer class="aui-footer aui-footer-fixed">
          <a href="javascript:;" class="aui-tabBar-item aui-tabBar-item-active">
                <span class="aui-tabBar-item-icon">
                    <i class="icon icon-loan"></i>
                </span>
              <span class="aui-tabBar-item-text">书城</span>
          </a>
          <a href="javascript:;" class="aui-tabBar-item ">
                <span class="aui-tabBar-item-icon">
                    <i class="icon icon-credit"></i>
                </span>
              <span class="aui-tabBar-item-text">分类</span>
          </a>
          <a href="javascript:;" class="aui-tabBar-item ">
                <span class="aui-tabBar-item-icon">
                    <i class="icon icon-ions"></i>
                </span>
              <span class="aui-tabBar-item-text">书架</span>
          </a>
          <a href="javascript:;" class="aui-tabBar-item ">
                <span class="aui-tabBar-item-icon">
                    <i class="icon icon-info"></i>
                </span>
              <span class="aui-tabBar-item-text">我的</span>
          </a>
      </footer>
  </section>
  </body>
  <script>

      $(".aui-flex-box").click(function () {
          location.href="${ctx}/book/detailbook?userId=${param.userId}&token=${param.token}&userName=${param.userName}"
      })

  </script>

</html>
