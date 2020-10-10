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
          <a href="javascript:;" class="aui-navBar-item">
              <i class="icon icon-return"></i>
          </a>
          <div class="aui-center">
              <span class="aui-center-title">神秘博士 · 盗梦贼</span>
          </div>
          <a href="javascript:;" class="aui-navBar-item" data-ydui-actionsheet="{target:'#actionSheet',closeElement:'#cancel'}">
              <i class="icon icon-share"></i>
          </a>
      </header>
      <section class="aui-scrollView">
          <div class="aui-flex aui-flex-one">
              <div class="aui-book-img">
                  <img src="${ctx}/bookroom/book/images/book1.png" alt="">
              </div>
              <div class="aui-flex-box">
                  <h1>神秘博士·盗梦贼</h1>
                  <h2>史蒂夫·莱昂斯等</h2>
                  <h3><em style="color: #1d89eb">已完结</em> 9万字</h3>
                  <button>出版小说</button>
              </div>
          </div>
          <div class="aui-palace aui-palace-one">
              <a href="javascript:;" class="aui-palace-grid">
                  <div class="aui-palace-grid-text">
                      <h1>8988</h1>
                      <h2>人气值</h2>
                  </div>
              </a>
              <a href="javascript:;" class="aui-palace-grid">
                  <div class="aui-palace-grid-text">
                      <h1>9.8 <em>分</em></h1>
                      <h2>评分</h2>
                  </div>
              </a>
              <a href="javascript:;" class="aui-palace-grid">
                  <div class="aui-palace-grid-text">
                      <h1>1088</h1>
                      <h2>在读人数</h2>
                  </div>
              </a>
          </div>
          <div class="aui-flex b-line">
              <div class="aui-flex-box">
                  <p>英国科幻小说。这是一个灰色的世界，现实的引力无比沉重。在这里，希望是犯法的，创作是被禁止的，就连星球的名字都成了一个毫无意义的编号。因为幻想是危险的，它会让人发疯。当博士一-行人来到这里，这个冰冷顽固的世界终于出现了-丝裂缝...</p>
                  <p>史蒂夫莱昂斯(Steve Lyons)</p>
                  <p>英国著名作家，已出版近二十部小说，还撰写了多部广播剧和短篇故事。笔下的角色分别来自《X战警》《蜘蛛侠》</p>
                  <p>《未来青年》和《萨凡尔与斯蒂尔的时间修补之旅》等多部作品。</p>
                  <p>史蒂夫之前的《神秘博士》作品包括小说《复杂难解》《女巫猎手》和《扭曲世界》;有声书《火神烈焰》和《科尔迪兹》。他还为官方《神秘博士杂志》撰稿。目前，他住在曼彻斯特附近的....</p>
                  <span>
					<em>热血</em>
					<em>神奇</em>
				</span>
              </div>
          </div>
          <div class="aui-flex">
              <div class="aui-flex-box">
                  <h4>目录 <em>完结共19章</em></h4>
              </div>
              <div class="aui-arrow">
                  <span>完结</span>
              </div>
          </div>
          <div class="divHeight"></div>
          <div class="aui-flex" style="padding-bottom:0">
              <div class="aui-flex-box">
                  <h5>和这本书内容相似的书</h5>
              </div>
          </div>
          <div class="aui-flex aui-flex-two" style="padding-bottom:0">
              <div class="aui-flex-box">
                  <div class="aui-flex">
                      <div class="aui-book-sml">
                          <img src="${ctx}/bookroom/book/images/book2.png" alt="">
                      </div>
                      <div class="aui-flex-box">
                          <h1>我这辈子有过你</h1>
                          <h2>张小娴</h2>
                          <h3>4.4万人气</h3>
                          <button>完结</button>
                      </div>
                  </div>
                  <div class="aui-book-text">
                      <p>这部小说写的是周蕊、徐玉、游颖三个人的故事。这三个女子，那...</p>
                  </div>
              </div>
              <div class="aui-flex-box">
                  <div class="aui-flex">
                      <div class="aui-book-sml">
                          <img src="${ctx}/bookroom/book/images/book3.png" alt="">
                      </div>
                      <div class="aui-flex-box">
                          <h1>我这辈子有过你</h1>
                          <h2>张小娴</h2>
                          <h3>4.4万人气</h3>
                          <button>完结</button>
                      </div>
                  </div>
                  <div class="aui-book-text">
                      <p>这部小说写的是周蕊、徐玉、游颖三个人的故事。这三个女子，那...</p>
                  </div>
              </div>
          </div>
          <div class="aui-flex aui-flex-two" >
              <div class="aui-flex-box">
                  <div class="aui-flex">
                      <div class="aui-book-sml">
                          <img src="${ctx}/bookroom/book/images/book4.png" alt="">
                      </div>
                      <div class="aui-flex-box">
                          <h1>我这辈子有过你</h1>
                          <h2>张小娴</h2>
                          <h3>4.4万人气</h3>
                          <button>完结</button>
                      </div>
                  </div>
                  <div class="aui-book-text">
                      <p>这部小说写的是周蕊、徐玉、游颖三个人的故事。这三个女子，那...</p>
                  </div>
              </div>
              <div class="aui-flex-box">
                  <div class="aui-flex">
                      <div class="aui-book-sml">
                          <img src="${ctx}/bookroom/book/images/book5.png" alt="">
                      </div>
                      <div class="aui-flex-box">
                          <h1>我这辈子有过你</h1>
                          <h2>张小娴</h2>
                          <h3>4.4万人气</h3>
                          <button>完结</button>
                      </div>
                  </div>
                  <div class="aui-book-text">
                      <p>这部小说写的是周蕊、徐玉、游颖三个人的故事。这三个女子，那...</p>
                  </div>
              </div>
          </div>
          <div class="aui-flex" style="padding-bottom:0">
              <div class="aui-flex-box">
                  <h5>这本书的读者都在看</h5>
              </div>
          </div>
          <div class="aui-list-theme-box">
              <a href="javascript:;" class="aui-list-item">
                  <div class="aui-list-theme-img">
                      <img src="${ctx}/bookroom/book/images/book6.png" alt="">
                  </div>
                  <div class="aui-list-theme-message">
                      <h3 class="aui-list-theme-title">时光深处的柔软</h3>
                  </div>
              </a>
              <a href="javascript:;" class="aui-list-item">
                  <div class="aui-list-theme-img">
                      <img src="${ctx}/bookroom/book/images/book7.png" alt="">
                  </div>
                  <div class="aui-list-theme-message">
                      <h3 class="aui-list-theme-title">时光深处的柔软</h3>
                  </div>
              </a>
              <a href="javascript:;" class="aui-list-item">
                  <div class="aui-list-theme-img">
                      <img src="${ctx}/bookroom/book/images/book8.png" alt="">
                  </div>
                  <div class="aui-list-theme-message">
                      <h3 class="aui-list-theme-title">时光深处的柔软</h3>
                  </div>
              </a>
              <a href="javascript:;" class="aui-list-item">
                  <div class="aui-list-theme-img">
                      <img src="${ctx}/bookroom/book/images/book9.png" alt="">
                  </div>
                  <div class="aui-list-theme-message">
                      <h3 class="aui-list-theme-title">时光深处的柔软</h3>
                  </div>
              </a>
              <a href="javascript:;" class="aui-list-item">
                  <div class="aui-list-theme-img">
                      <img src="${ctx}/bookroom/book/images/book10.png" alt="">
                  </div>
                  <div class="aui-list-theme-message">
                      <h3 class="aui-list-theme-title">时光深处的柔软</h3>
                  </div>
              </a>
              <a href="javascript:;" class="aui-list-item">
                  <div class="aui-list-theme-img">
                      <img src="${ctx}/bookroom/book/images/book11.png" alt="">
                  </div>
                  <div class="aui-list-theme-message">
                      <h3 class="aui-list-theme-title">时光深处的柔软</h3>
                  </div>
              </a>
          </div>
          <div class="aui-flex aui-flex-three">
              <div class="aui-flex-box">
                  <h1>版权信息</h1>
                  <h2>本书的数字版权由八光分文化提供并授权发行，如有任何疑问，请通过"我的-意见反馈"告知我们。</h2>
                  <p>-我已经到底了-</p>
              </div>
          </div>
      </section>
      <footer class="aui-footer aui-footer-fixed">
          <a href="javascript:;" class="aui-tabBar-item ">
              <span class="aui-tabBar-item-text">加入书架</span>
          </a>
          <a href="javascript:;" class="aui-tabBar-item aui-tabBar-item-active">
              <span class="aui-tabBar-item-text" id="doRead">免费阅读</span>
          </a>
          <a href="javascript:;" class="aui-tabBar-item ">
              <span class="aui-tabBar-item-text">缓存</span>
          </a>
      </footer>
  </section>
  </body>
  <div class="m-actionsheet" id="actionSheet">
      <div class="aui-show-box">
          <div class="aui-show-box-title aui-footer-flex">
              <div class="b-line aui-coll-share-box">
                  <a href="javascript:;" class="aui-coll-share-item">
                      <div class="aui-coll-share-img">
                          <img src="${ctx}/bookroom/book/images/icon-wx.png" alt="">
                      </div>
                      <div class="aui-coll-share-text">微信好友</div>
                  </a>
                  <a href="javascript:;" class="aui-coll-share-item">
                      <div class="aui-coll-share-img">
                          <img src="${ctx}/bookroom/book/images/icon-pyq.png" alt="">
                      </div>
                      <div class="aui-coll-share-text">朋友圈</div>
                  </a>
                  <a href="javascript:;" class="aui-coll-share-item">
                      <div class="aui-coll-share-img">
                          <img src="${ctx}/bookroom/book/images/icon-qq.png" alt="">
                      </div>
                      <div class="aui-coll-share-text">QQ</div>
                  </a>
                  <a href="javascript:;" class="aui-coll-share-item">
                      <div class="aui-coll-share-img">
                          <img src="${ctx}/bookroom/book/images/icon-kj.png" alt="">
                      </div>
                      <div class="aui-coll-share-text">QQ空间</div>
                  </a>
                  <a href="javascript:;" class="aui-coll-share-item">
                      <div class="aui-coll-share-img">
                          <img src="${ctx}/bookroom/book/images/icon-txw.png" alt="">
                      </div>
                      <div class="aui-coll-share-text">腾讯微博</div>
                  </a>
                  <a href="javascript:;" class="aui-coll-share-item">
                      <div class="aui-coll-share-img">
                          <img src="${ctx}/bookroom/book/images/icon-wb.png" alt="">
                      </div>
                      <div class="aui-coll-share-text">新浪微博</div>
                  </a>
              </div>
              <div class="aui-coll-cancel">
                  <a href="javascript:;" id="cancel" class="">取消
                  </a>
              </div>
          </div>
      </div>
  </div>
  <script>

      $("#doRead").click(function () {
          location.href="${ctx}/book/content?userId=${param.userId}&token=${param.token}&userName=${param.userName}"
      })

  </script>

</html>
