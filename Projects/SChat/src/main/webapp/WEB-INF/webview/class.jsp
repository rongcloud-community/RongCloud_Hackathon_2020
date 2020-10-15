<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>公开课</title>
    <meta name="description" content="51Talk公开课为英语爱好者提供各种英语学习公开课以及公开课视频,定期举办英语沙龙交流,让您和大家共同来提高自己的英语口语水平,51Talk公开课频道旨在打造国内第一英语学习交流平台." />
    <meta name="keywords" content="51Talk公开课,公开课网站,公开课视频,英语学习讲座，英语公开课" />
    <link rel="stylesheet" href="css/partylist.css?v=1450080047952" type="text/css" />
    <!--[if IE 6]>
    <script src="js/DD_belatedPNG_0.0.8a.min.js"></script>
    <![endif]-->
</head>
<body>
<div class="header">
    <div class="topBar">
        <div class="wrapper fn-clear">
            <div class="logo">
                <a href="index.html"><img src="images/logo.gif?v=1450080047952" height="46" width="327" alt="51Talk英语学习社区" /></a>
            </div>
            <!-- logo end -->
            <div class="fn-right">
                <!-- div class="search">
                                  <input type="text" class="searchInput" value="搜索" style="color:#b1b1b1;" onfocus="if (value == '搜索'){this.style.color='#666';value=''}" onblur="if (value == ''){this.style.color='#b1b1b1';value='搜索'}">
                                  <button class="serchButton"></button>
                              </div -->
                <!-- search end -->
                <div class="dou_num">
                    0个学豆
                </div>
                <a href="http://www.sucaihuo.com/modals/3/359/demo/member_index.html">
                    <div class="dou"></div></a>
                <ul class="toolBar">
                    <li class="mes jsMore"> <a href="http://bbs.51talk.com/user/messages" target="_blank">消息</a> <span class="tip" id="msgPoint" style="display:none;"></span>
                        <div class="mes-list jsUl" style="display:none;">
                            <!-- 隐藏 -->
                            <ul class="fn-clear" id="jsMsg">
                                <li class="last f-tac">
                                    <!-- 无消息添加类 f-tac --> 您还没收到消息 </li>
                            </ul>
                            <div class="status">
                                <a class="line" href="#">标记为已读</a>
                                <a href="http://bbs.51talk.com/user/messages">查看所有消息</a>
                            </div>
                            <span class="tips-up"></span>
                        </div> </li>
                </ul>
                <!-- toolBar end -->
                <div class="avatarBar">
                    <div class="avatar">
                        <!-- <a href="#"> -->
                        <span class="avatar-cover"></span>
                        <img src="images/avatar.png?v=1450080047952" height="30" width="30" alt="student" />
                        <!-- </a> -->
                    </div>
                    <div class="drop jsMore">
                        <a class="drop-a" href="#"></a>
                        <ul class="drop-list jsUl" style="display:none;">
                            <!-- 隐藏 -->
                            <li><a href="http://www.51talk.com/user/index">我的主页</a></li>
                            <li><a href="http://www.51talk.com/user/info">帐号设置</a></li>
                            <li><a href="http://bbs.51talk.com/user/logout" class="last">退出</a></li>
                        </ul>
                    </div>
                </div>
                <!-- avatarBar end -->
            </div>
            <!-- fn-right end -->
        </div>
    </div>
    <!-- topBar end -->
    <div class="navBar">
        <div class="wrapper fn-clear">
            <ul class="nav">
                <li><a href="/index" >社区首页</a></li>
                <li><a href="/class" class="hover">公开课</a></li>
                <li><a href="/activity">活动</a></li>
                <li><a href="/test" target="_blank">水平自测</a></li>
                <li><a href="/download" target="_blank">下载AC</a></li>
            </ul>
            <!-- div class="fn-right"><a href="http://bbs.51talk.com/help" >帮助？</a></div -->
        </div>
    </div>
    <!-- navBar end -->
</div>
<!-- header end -->
<div class="main" id="container" data-init="openclass">
    <div class="wrapper fn-clear">
        <div class="left">
            <div class="part">
                <div class="u-caption">
                    <div class="status">
                        <a href="http://bbs.51talk.com/openclass/" class="title  current">最新课程</a>
                        <a href="http://bbs.51talk.com/openclass/index/hot" class="title ">热门课程</a>
                        <div class="more jsMore">
                            <a class="title  " href="javascript:;">课程分类</a>
                            <!-- 展开后添加类open -->
                            <ul class="more-list jsUl" style="display:none;">
                                <li><a href="http://bbs.51talk.com/openclass/index/class_type/1">品味生活</a></li>
                                <li><a href="http://bbs.51talk.com/openclass/index/class_type/2">影视文艺</a></li>
                                <li><a href="http://bbs.51talk.com/openclass/index/class_type/3">热点聚焦</a></li>
                                <li><a href="http://bbs.51talk.com/openclass/index/class_type/4">环游天下</a></li>
                                <li><a href="http://bbs.51talk.com/openclass/index/class_type/5">趣闻杂谈</a></li>
                                <li><a href="http://bbs.51talk.com/openclass/index/class_type/6">职场赢家</a></li>
                                <li><a href="http://bbs.51talk.com/openclass/index/class_type/7">科技前沿</a></li>
                                <li><a href="http://bbs.51talk.com/openclass/index/class_type/8">精品讲座</a></li>
                                <li><a href="http://bbs.51talk.com/openclass/index/class_type/9">百科英语</a></li>
                                <li><a href="http://bbs.51talk.com/openclass/index/class_type/10">托福雅思</a></li>
                                <li><a href="http://bbs.51talk.com/openclass/index/class_type/11">青少英语</a></li>
                            </ul>
                        </div>
                        <div class="more jsMore">
                            <a class="title  " href="javascript:;">级别分类</a>
                            <!-- 展开后添加类open -->
                            <ul class="more-list jsUl" style="display:none">
                                <li><a href="http://bbs.51talk.com/openclass/index/class_level/1">Level 1-6</a></li>
                                <li><a href="http://bbs.51talk.com/openclass/index/class_level/2">Level 6以上</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="courselist part">
                <!--a href='http://bbs.51talk.com/openclass/detail/' class="cover-img">
                                  <p class="fontH"> <b></b>
                                  </p>
                                  <p class="fontN">人已预约</p>
                              </a-->
                <ul>
                    <li class="clist-li">
                        <div class="clist-left">
                            <a href="/class_detail" target="_blank"><img src="images/2015121313305022831.jpg?v=1450080047952" height="165" width="218" alt="【英文唱吧】beautiful in white" /></a>
                        </div>
                        <div class="clist-right">
                            <h4 class="title f-toe"> <a href="/class_detail" alt="【英文唱吧】beautiful in white" target="_blank">【英文唱吧】beautiful in white</a> </h4>
                            <p class="desc f-pre">每周跟Tina学一首英文歌在这里我们会准备一些经典的、好学的、好听的男女都适合的好英文歌，供大家学习欣赏。害羞娱乐的同时一起......</p>
                            <p class="meta">Tina&nbsp;&nbsp;&nbsp;&nbsp;2015/12/15&nbsp;&nbsp;&nbsp;&nbsp;10:00</p>
                            <div class="status">
                                <p class="fontH"><span>765</span>人已预约</p>
                                <a class="u-cancel fn-hide" data-id="2998" href="javascript:;">取消课程</a>
                                <a class="u-btn sm jsSignUp " data-id="2998" href="/class_detail" target="_blank">预约</a>
                            </div>
                        </div> </li>
                    <li class="clist-li">
                        <div class="clist-left">
                            <a href="/class_detail" target="_blank"><img src="images/2015121119443375977.png?v=1450080047952" height="165" width="218" alt="语法“精讲练”" /></a>
                        </div>
                        <div class="clist-right">
                            <h4 class="title f-toe"> <p class="u-gift"></p> <a href="/class_detail" alt="语法“精讲练”" target="_blank">语法“精讲练”</a> </h4>
                            <p class="desc f-pre">作为英语学习体系中的重要板块，语法向来是英语初学者甚至长期学习者的难点甚至心头痛。如果说单词是构筑英语学习大楼的砖瓦，那么语......</p>
                            <p class="meta">Minty&nbsp;&nbsp;&nbsp;&nbsp;2015/12/15&nbsp;&nbsp;&nbsp;&nbsp;15:00</p>
                            <div class="status">
                                <p class="fontH"><span>745</span>人已预约</p>
                                <a class="u-cancel fn-hide" data-id="2987" href="javascript:;">取消课程</a>
                                <a class="u-btn sm jsSignUp " data-id="2987" href="/class_detail.html??id=2987" target="_blank">预约</a>
                            </div>
                        </div> </li>
                    <li class="clist-li">
                        <div class="clist-left">
                            <a href="/class_detail" target="_blank"><img src="images/2015121117261238765.jpg?v=1450080047952" height="165" width="218" alt="知识小讲堂之悬疑推理三连弹【Day1】" /></a>
                        </div>
                        <div class="clist-right">
                            <h4 class="title f-toe"> <a href="/class_detail" alt="知识小讲堂之悬疑推理三连弹【Day1】" target="_blank">知识小讲堂之悬疑推理三连弹【Day1】</a> </h4>
                            <p class="desc f-pre">真相只有一个！小伙伴们，还记得那个腿短头大，比例极其不协调，却迷倒所有人童年的小学生吗~没错就是他，名侦探柯南！柯南之所以红......</p>
                            <p class="meta">Tim&nbsp;&nbsp;&nbsp;&nbsp;2015/12/15&nbsp;&nbsp;&nbsp;&nbsp;16:00</p>
                            <div class="status">
                                <p class="fontH"><span>473</span>人已预约</p>
                                <a class="u-cancel fn-hide" data-id="2984" href="javascript:;">取消课程</a>
                                <a class="u-btn sm jsSignUp " data-id="2984" href="/class_detail" target="_blank">预约</a>
                            </div>
                        </div> </li>
                    <li class="clist-li">
                        <div class="clist-left">
                            <a href="/class_detail" target="_blank"><img src="images/2015121114295524406.png?v=1450080047952" height="165" width="218" alt="欧亚文明交汇点上的国度——土耳其一瞥" /></a>
                        </div>
                        <div class="clist-right">
                            <h4 class="title f-toe"> <a href="/class_detail" alt="欧亚文明交汇点上的国度——土耳其一瞥" target="_blank">欧亚文明交汇点上的国度——土耳其一瞥</a> </h4>
                            <p class="desc f-pre">奇妙的世界之旅～这节课我们的Wendy老师会带大家去土耳其看一看～小五才疏学浅，只知道土耳其烤肉～还有土耳其国足比中国厉害。......</p>
                            <p class="meta">Dr.Wendy&nbsp;&nbsp;&nbsp;&nbsp;2015/12/15&nbsp;&nbsp;&nbsp;&nbsp;18:00</p>
                            <div class="status">
                                <p class="fontH"><span>616</span>人已预约</p>
                                <a class="u-cancel fn-hide" data-id="2980" href="javascript:;">取消课程</a>
                                <a class="u-btn sm jsSignUp " data-id="2980" href="/class_detail" target="_blank">预约</a>
                            </div>
                        </div> </li>
                    <li class="clist-li">
                        <div class="clist-left">
                            <a href="/class_detail" target="_blank"><img src="images/2015121420560528793.jpg?v=1450080047952" height="165" width="218" alt="亲子阅读树《Lost and Found》失而复得（下）" /></a>
                        </div>
                        <div class="clist-right">
                            <h4 class="title f-toe"> <a href="/class_detail" alt="亲子阅读树《Lost and Found》失而复得（下）" target="_blank">亲子阅读树《Lost and Found》失而复得（下）</a> </h4>
                            <p class="desc f-pre">和孩子亲密的时光，只有那么几年。如何让这样的时光变得更有意义更让孩子终身难忘？最好的方式，大概就是和他/她一起读书了！因为小......</p>
                            <p class="meta">Jason&nbsp;&nbsp;&nbsp;&nbsp;2015/12/15&nbsp;&nbsp;&nbsp;&nbsp;19:00</p>
                            <div class="status">
                                <p class="fontH"><span>101</span>人已预约</p>
                                <a class="u-cancel fn-hide" data-id="3007" href="javascript:;">取消课程</a>
                                <a class="u-btn sm jsSignUp " data-id="3007" href="/class_detail" target="_blank">预约</a>
                            </div>
                        </div> </li>
                    <li class="clist-li">
                        <div class="clist-left">
                            <a href="/class_detail.html" target="_blank"><img src="images/2015121111350892665.jpg?v=1450080047952" height="165" width="218" alt="岛国文化之日本" /></a>
                        </div>
                        <div class="clist-right">
                            <h4 class="title f-toe"> <a href="/class_detail" alt="岛国文化之日本" target="_blank">岛国文化之日本</a> </h4>
                            <p class="desc f-pre">日本国名意为日出之国~虽然岛国并没有悠久历史，可是经济发展和文化发展当真像日出那般迅速。岛国是一个很有学习精神的国家，吸取其......</p>
                            <p class="meta">mojo&nbsp;&nbsp;&nbsp;&nbsp;2015/12/15&nbsp;&nbsp;&nbsp;&nbsp;20:00</p>
                            <div class="status">
                                <p class="fontH"><span>981</span>人已预约</p>
                                <a class="u-cancel fn-hide" data-id="2958" href="javascript:;">取消课程</a>
                                <a class="u-btn sm jsSignUp " data-id="2958" href="class_detail.html??id=2958" target="_blank">预约</a>
                            </div>
                        </div> </li>
                    <li class="clist-li">
                        <div class="clist-left">
                            <a href="class_detail.html?2972" target="_blank"><img src="images/2015121114015632452.jpg?v=1450080047952" height="165" width="218" alt="玩转综艺之《American Idol》偶像来啦~" /></a>
                        </div>
                        <div class="clist-right">
                            <h4 class="title f-toe"> <a href="class_detail.html?2972.html" alt="玩转综艺之《American Idol》偶像来啦~" target="_blank">玩转综艺之《American Idol》偶像来啦~</a> </h4>
                            <p class="desc f-pre">本周美教课程开启综艺节目showtime模式！Huck老师带你玩转3款火爆的综艺节目。第一天：《American Idol》......</p>
                            <p class="meta">Huck&nbsp;&nbsp;&nbsp;&nbsp;2015/12/15&nbsp;&nbsp;&nbsp;&nbsp;20:00</p>
                            <div class="status">
                                <p class="fontH"><span>570</span>人已预约</p>
                                <a class="u-cancel fn-hide" data-id="2972" href="javascript:;">取消课程</a>
                                <a class="u-btn sm jsSignUp " data-id="2972" href="class_detail.html??id=2972" target="_blank">预约</a>
                            </div>
                        </div> </li>
                    <li class="clist-li">
                        <div class="clist-left">
                            <a href="class_detail.html?2947" target="_blank"><img src="images/2015121109595664657.jpg?v=1450080047952" height="165" width="218" alt="你会交朋友不？——用英文谈谈" /></a>
                        </div>
                        <div class="clist-right">
                            <h4 class="title f-toe"> <a href="class_detail.html?2947.html" alt="你会交朋友不？——用英文谈谈" target="_blank">你会交朋友不？——用英文谈谈</a> </h4>
                            <p class="desc f-pre">&nbsp;想知道口语高分大牛都是怎么学习的吗？想在眼花缭乱的学习方法中找到最适合自己的那一个吗？想让洞悉面试官一切的老师亲......</p>
                            <p class="meta">Phoebe.&nbsp;&nbsp;&nbsp;&nbsp;2015/12/16&nbsp;&nbsp;&nbsp;&nbsp;09:00</p>
                            <div class="status">
                                <p class="fontH"><span>691</span>人已预约</p>
                                <a class="u-cancel fn-hide" data-id="2947" href="javascript:;">取消课程</a>
                                <a class="u-btn sm jsSignUp " data-id="2947" href="class_detail.html??id=2947" target="_blank">预约</a>
                            </div>
                        </div> </li>
                    <li class="clist-li">
                        <div class="clist-left">
                            <a href="class_detail.html?2954" target="_blank"><img src="images/2015121110231396795.jpg?v=1450080047952" height="165" width="218" alt="【女神必修课】配音gossip girl" /></a>
                        </div>
                        <div class="clist-right">
                            <h4 class="title f-toe"> <a href="class_detail.html?2954.html" alt="【女神必修课】配音gossip girl" target="_blank">【女神必修课】配音gossip girl</a> </h4>
                            <p class="desc f-pre">每周还可以跟Lucky老师学习成为KTV女神的小清新英文歌………每周还可以跟lucky老师学习约会，点单，表白必备口语………......</p>
                            <p class="meta">Lucky.&nbsp;&nbsp;&nbsp;&nbsp;2015/12/16&nbsp;&nbsp;&nbsp;&nbsp;10:00</p>
                            <div class="status">
                                <p class="fontH"><span>433</span>人已预约</p>
                                <a class="u-cancel fn-hide" data-id="2954" href="javascript:;">取消课程</a>
                                <a class="u-btn sm jsSignUp " data-id="2954" href="class_detail.html??id=2954" target="_blank">预约</a>
                            </div>
                        </div> </li>
                    <li class="clist-li">
                        <div class="clist-left">
                            <a href="class_detail.html?2950" target="_blank"><img src="images/2015121110084414629.jpg?v=1450080047952" height="165" width="218" alt="我爱你不只三个字" /></a>
                        </div>
                        <div class="clist-right">
                            <h4 class="title f-toe"> <p class="u-gift"></p> <a href="class_detail.html?2950.html" alt="我爱你不只三个字" target="_blank">我爱你不只三个字</a> </h4>
                            <p class="desc f-pre">&nbsp;想知道口语高分大牛都是怎么学习的吗？想在眼花缭乱的学习方法中找到最适合自己的那一个吗？想让洞悉面试官一切的老师亲......</p>
                            <p class="meta">Phoebe.&nbsp;&nbsp;&nbsp;&nbsp;2015/12/16&nbsp;&nbsp;&nbsp;&nbsp;14:00</p>
                            <div class="status">
                                <p class="fontH"><span>399</span>人已预约</p>
                                <a class="u-cancel fn-hide" data-id="2950" href="javascript:;">取消课程</a>
                                <a class="u-btn sm jsSignUp " data-id="2950" href="class_detail.html??id=2950" target="_blank">预约</a>
                            </div>
                        </div> </li>
                    <!-- partylist-li end -->
                </ul>
            </div>
            <!-- partylist end -->
            <div class="u-link">
                <div class="inner">
                    <a class="cur" href="javascript:;">1</a>
                    <a href="/openclass/index/new?page=2">2</a>
                    <a href="/openclass/index/new?page=3">3</a>
                    <a href="/openclass/index/new?page=4">4</a>
                    <a href="/openclass/index/new?page=5">5</a>
                    <a href="/openclass/index/new?page=6">6</a>
                    <a href="/openclass/index/new?page=2" class="a2">下一页 </a>
                    <a href="/openclass/index/new?page=6" class="a2">末页 </a>
                </div>
            </div>
            <!-- u-link end -->
        </div>
        <!-- left end -->
        <div class="sidebar">
            <!-- 热门讨论 -->
            <div class="us-box pb0">
                <div class="u-caption">
                    <h4 class="title">热门讨论</h4>
                </div>
                <div class="us-pic">
                    <a href="http://bbs.51talk.com/user/ad_click?id=8&amp;url=http%3A%2F%2Fbbs.51talk.com%2Fforum%2Fdetail%2F6859.html" target="_blank"> <img title="讨论区版主招募啦" src="images/144946596120065_thumb.jpg" width="200" height="138" style="border:0px;" /> </a>
                    <!--a href="http://bbs.51talk.com/forum/index"><img src="http://static.51talk.com/static/image/openclass/banner_side_1.png?v=1450080047952" width="200" height="138" alt=""></a-->
                </div>
                <div class="us-txt">
                    <ul class="us-list">
                        <li><a href="discuss_detail.html?6200" target="_blank">【51Talk青少演讲大赛】XD05-Nancy</a></li>
                        <li><a href="discuss_detail.html?5534" target="_blank">名单公布【小5送礼啦】开心迎国庆 抢楼乐翻天</a></li>
                        <li><a href="discuss_detail.html?6311" target="_blank">[51talk青少年演讲大赛] XD-10 Cindy，我荣获冠军了</a></li>
                        <li><a href="discuss_detail.html?6312" target="_blank">【51Talk青少演讲大赛】XG10-10岁Christina (恭喜Christina）</a></li>
                        <li><a href="discuss_detail.html?6153" target="_blank">James Lee和小伙伴们聊英语~【继续更新】</a></li>
                    </ul>
                </div>
            </div>
            <!-- 活动推荐 -->
            <div class="us-box pb0">
                <div class="u-caption">
                    <h4 class="title">活动推荐</h4>
                </div>
                <div class="us-pic">
                    <a href="http://bbs.51talk.com/user/ad_click?id=3&amp;url=http%3A%2F%2Fbbs.51talk.com%2Fforum%2Fdetail%2F6714.html" target="_blank"> <img title="51Talk四周年感恩季" src="images/144852011651411_thumb.jpg" width="200" height="138" style="border:0px;" /> </a>
                    <!--a href="discuss_detail.html?2747" target="_blank"><img src="http://static.51talk.com/static/image/openclass/activity_2747.jpg?v=1450080047952" width="200" height="138" alt="51奖品任性送"></a-->
                </div>
                <div class="us-txt fn-tac">
                    <a href="http://bbs.51talk.com/user/ad_click?id=10&amp;url=http%3A%2F%2Fbbs.51talk.com%2Fforum%2Fdetail%2F5035.html" target="_blank">51Talk四周年感恩季</a>
                    <!--a href="discuss_detail.html?2747" target="_blank">我的51talk学习经验谈</a-->
                </div>
            </div>
            <!-- 我要评级 -->
            <div class="us-box">
                <div class="u-caption">
                    <h4 class="title">我要评级</h4>
                </div>
                <div class="us-pic">
                    <a href="http://bbs.51talk.com/user/ad_click?id=2&amp;url=http%3A%2F%2Fwww.51talk.com%2Ftesting%2Findex%2F%3Ftype%3Dlogin" target="_blank"> <img title="水平测试" src="images/144308788522532_thumb.jpg" width="200" height="138" style="border:0px;" /> </a>
                </div>
            </div>
            <!-- us-box end -->
            <!--div class="us-box-em">
           <a href="#" class="login-side-a"></a>
           <a href="#" class="login-side-b"></a>
       </div-->
            <!-- us-box-em end -->
        </div>
        <!-- sidebar end -->
    </div>
</div>
<!-- main end -->
<div class="footer">
    <div class="foot-main">
        <div class="wrapper fn-clear">
            <h3>友情链接：</h3>
            <p> <a href="index.html" target="_blank">网上学英语</a> <a href="http://www.chinagwxz.com" target="_blank">公文写作网</a> <a href="http://www.51talkenglish.com" target="_blank">英语在线学习</a> <a href="http://wf.houxue.com" target="_blank">潍坊培训网</a> <a href="http://www.hcwl.com.cn" target="_blank">幼儿园设计</a> <a href="http://px.iqilu.com/ " target="_blank">齐鲁网培训</a> <a href="http://wz.jianzhi8.com/" target="_blank">温州兼职吧 </a> <a href="http://gaokao.chazidian.com" target="_blank">查字典高考网</a> <a href="http://mall.51liucheng.com/" target="_blank">柳橙网</a> <a href="http://km.jiajiao114.com/" target="_blank">昆明家教</a> <a href="http://www.nannongkaoyan.com/" target="_blank">南京农业大学考研网</a> <a href="http://www.78zph.com/" target="_blank">北京招聘会</a> <a href="http://toefl.ixinda.com" target="_blank">辛达托福代报</a> <a href="http://cd.houxue.com/" target="_blank">成都培训网</a> <a href="http://www.talkingchina.com/  " target="_blank">英文翻译公司 </a> <a href="http://www.gzedu123.com " target="_blank">广州成考网</a> <a href="http://www.0752hz.com " target="_blank">惠州资讯网</a> <a href="http://beijing.job910.com/" target="_blank">北京教师招聘</a> <a href="http://www.jwlx.com" target="_blank">出国留学</a> <a href="http://toefl.bailiedu.com/" target="_blank">托福考试</a> <a href="http://www.sas-ben.com " target="_blank">经贸留学</a> <a href="http://hengcaotang.com/" target="_blank">互联网培训精选平台 </a> <a href="http://sjz.tantuw.com" target="_blank">石家庄教育培训</a> <a href="http://www.muzhimi.com" target="_blank">高中作文题目</a> <a href="http://www.gzedu123.com" target="_blank">广州网络教育</a> <a href="http://www.gosest.com" target="_blank">SEST赛思英语</a> <a href="http://heihe.offcn.com " target="_blank">黑河招聘</a> <a href="http://www.fanwen.cn/" target="_blank">范文网</a> <a href="http://www.psychzzy.com " target="_blank">中科院在职研究生</a> <a href="http://chengdu.jianzhimao.com/" target="_blank">成都大学生兼职</a> <a href="http://www.sjtupmm.com " target="_blank">营销管理培训</a> <a href="http://www.beidaqingniao.org " target="_blank">北大青鸟</a> <a href="http://baike.pincai.com/ " target="_blank">职场百科</a> <a href="http://www.liuxue163.com" target="_blank">留学</a> <a href="http://www.51test.cc/  " target="_blank">test</a> </p>
        </div>
        <p class="foot-link"> <a href="http://www.51talk.com/page/about/" target="_blank" title="关于我们">关于我们</a> <i>|</i> <a href="http://51talk.zhiye.com/" target="_blank" title="加入我们" rel="nofollow">加入我们</a> <i>|</i> <a href="http://www.51talk.com/cet/cet.php" target="_blank" title="企业培训">企业培训</a> <i>|</i> <a href="http://www.51talk.com/page/sitemap/" target="_blank" title="网站地图">网站地图</a> </p>
        <p class="foot-trust"> <a class="t1" href="http://www.51honest.org/wscredit/detail.credit?action=preLevel&amp;credcode=NO.20000038643" rel="nofollow" target="_blank" title="信星认证">信星认证</a> <a class="t2" href="http://www.itrust.org.cn/home/index/itrust_certifi/wm/1579059481.html" rel="nofollow" target="_blank" title="企业信用认证">企业信用认证</a> <a class="t3" href="http://www.315online.com.cn/member/315120032.html" rel="nofollow" target="_blank" title="网上交易保障">网上交易保障</a> <a class="t4" href="javascript:;" rel="nofollow" title="支付宝特约商户">支付宝特约商户</a> </p>
    </div>
    <div class="foot-bottom">
        Copyright&copy;北京大生知行科技有限公司
        <i>|</i>
        <a href="http://www.51talk.com/page/privacy/" target="_blank" title="隐私声明">隐私声明</a>
        <i>|</i>
        <a href="http://www.51talk.com/page/terms/" target="_blank" title="用户协议">用户协议</a>
        <i>|</i> 京ICP证110696号 京ICP备11031999号
    </div>
</div>
<div id="u-gotop" style="display:block;">
    <a href="javascript:;" title="回到顶部">回到顶部</a>
</div>
<!-- footer end -->
<script type="text/javascript" src="js/sea.min.js?v=1450080047952" id="seajsnode"></script>
<script type="text/javascript" src="js/vendor.js?v=1450080047952" id="seajsnode"></script>
<!--script src="http://static2.51talk.com/static/js/sea.min.js?v=1432205604748" id='seajsnode'></script>
<script src="js/vendor.js?v=1432205604748" id='seajsnode'></script-->
<img style="display:none;" src="images/a.gif?v=54f404c569425b0843cc12130bb4feb1&amp;site=3&amp;type=1&amp;uuid=fc30355894446a101b0b95e6819f06bb&amp;uid=U2843762138&amp;ref=http%3A%2F%2Fbbs.51talk.com%2F" border="0" alt="" />
</body>
</html>