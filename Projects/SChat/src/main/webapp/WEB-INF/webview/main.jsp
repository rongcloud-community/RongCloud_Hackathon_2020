<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

    <title>首页</title>
    <meta name="description" content="51Talk英语学习社区是以免费英语学习为主的英语论坛,涵盖大量英语学习公开课、英语口语沙龙、英语知识讲座以及各种英语学习交流活动,专注于打造最具人气的英语学习交流互动平台,为全国数千万英语学习者提供专业服务." />
    <meta name="keywords" content="英语论坛,免费英语学习网站,51Talk英语学习社区" />
    <link rel="stylesheet" href="${ctx}/css/home.css?v=1450080047952" type="text/css" />
    <!--[if IE 6]>
    <script src="${ctx}/js/DD_belatedPNG_0.0.8a.min.js"></script>
    <![endif]-->
</head>
<body>
<div class="header">
    <div class="topBar">
        <div class="wrapper fn-clear">
            <div class="logo">
                <a href="index.html"><img src="${ctx}/images/logo.gif?v=1450080047952" height="46" width="327" alt="51Talk英语学习社区" /></a>
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
                        <img src="${ctx}/images/avatar.png?v=1450080047952" height="30" width="30" alt="student" />
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
                <li><a href="/index" class="hover">社区首页</a></li>
                <li><a href="/class">公开课</a></li>
                <li><a class="doChat">讨论区</a></li>
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
<div class="main" id="container" data-init="index">
    <div class="wrapper fn-clear">
        <div class="u-caption">
            <h4 class="title">精选推荐</h4>
        </div>
        <div id="silderX" class="main-banner">
            <ul data-silder="ul" class="fn-clear focus">
                <li> <a href="http://bbs.51talk.com/user/ad_click?id=5&amp;url=http%3A%2F%2Fbbs.51talk.com%2Fopenclass%2Fdetail%2Fnew%2F2991.html" target="_blank" title="边看《摩登家庭》边学地道对话"> <img src="${ctx}/images/144947549678638_thumb.jpg" height="385" width="1000" alt="边看《摩登家庭》边学地道对话" /> </a> </li>
                <li> <a href="http://bbs.51talk.com/user/ad_click?id=5&amp;url=http%3A%2F%2Fbbs.51talk.com%2Fforum%2Fdetail%2F6880.html" target="_blank" title="抗霾礼包送不停"> <img src="${ctx}/images/144991818751732_thumb.jpg" height="385" width="1000" alt="抗霾礼包送不停" /> </a> </li>
                <li> <a href="http://bbs.51talk.com/user/ad_click?id=5&amp;url=http%3A%2F%2Fbbs.51talk.com%2Fforum%2Fdetail%2F6913.html" target="_blank" title="老师推荐"> <img src="${ctx}/images/144982137927664_thumb.png" height="385" width="1000" alt="老师推荐" /> </a> </li>
            </ul>
            <!--ul data-silder="ul" class="fn-clear focus">
                               <li>
                                   <a href='http://bbs.51talk.com/openclass/detail/1166' target="_blank">
                                       <img src="http://static.51talk.com/static/image/openclass/yasi.jpg?v=1450080047952" height="385" width="1000" alt="">
                                   </a>
                               </li>
                               <li>
                                   <a href='http://bbs.51talk.com/openclass/detail/1230' target="_blank">
                                       <img src="http://static.51talk.com/static/image/openclass/fm1000X385.jpg?v=1450080047952" height="385" width="1000" alt="">
                                   </a>
                               </li>
                               <li>
                                   <a href='discuss_detail.html?2599' target="_blank">
                                       <img src="http://static.51talk.com/static/image/openclass/fm1000X3.jpg?v=1450080047952" height="385" width="1000" alt="">
                                   </a>
                               </li>
                           </ul-->
            <!-- ul end -->
            <div class="focus-jt" style="position:static;width:auto;">
                <a class="f-last" style="position:absolute;top:148px;left:20px;" data-silder="prev" href="javascript:;"></a>
                <a class="f-next" style="position:absolute;top:148px;right:20px;" data-silder="next" href="javascript:;"></a>
            </div>
            <!-- focus-jt -->
            <ul class="focus-yd fn-clear" data-silder="points"></ul>
        </div>
        <!-- main-banner end -->
        <div class="left">
            <div class="home">
                <div class="u-caption">
                    <h4 class="title">最新公开课</h4>
                    <a class="attach" href="http://bbs.51talk.com/openclass/index/new">更多&gt;&gt;</a>
                </div>
                <ul class="home-ul fn-clear">
                    <li class="home-li">
                        <div class="home-li-pic">
                            <img _src="http://static.51talk.com/upload/open_img/2015/12/13/2015121313305022831.jpg?v=1450080047952" height="178" width="235" alt="" />
                            <a class="cover-img" href="class_detail.html?2998.html" style="display:none;" target="_blank"> <p class="fontH"><b>762</b>人已预约</p> <p class="fontN">12月15日 10:00-10:50</p> <span class="yy-a">预约</span> </a>
                        </div>
                        <div class="home-li-txt">
                            <a class="f-toe" href="class_detail.html?2998.html" title="【英文唱吧】beautiful in white" target="_blank">【英文唱吧】beautiful in white</a>
                            <font>Tina老师</font>
                        </div> </li>
                    <li class="home-li">
                        <div class="home-li-pic">
                            <img _src="http://static.51talk.com/upload/open_img/2015/12/11/2015121119443375977.png?v=1450080047952" height="178" width="235" alt="" />
                            <a class="cover-img" href="class_detail.html?2987.html" style="display:none;" target="_blank"> <p class="fontH"><b>744</b>人已预约</p> <p class="fontN">12月15日 15:00-15:50</p> <span class="yy-a">预约</span> </a>
                        </div>
                        <div class="home-li-txt">
                            <a class="f-toe" href="class_detail.html?2987.html" title="语法“精讲练”" target="_blank">语法“精讲练”</a>
                            <font>Minty老师</font>
                        </div> </li>
                    <li class="home-li">
                        <div class="home-li-pic">
                            <img _src="http://static.51talk.com/upload/open_img/2015/12/11/2015121117261238765.jpg?v=1450080047952" height="178" width="235" alt="" />
                            <a class="cover-img" href="class_detail.html?2984.html" style="display:none;" target="_blank"> <p class="fontH"><b>473</b>人已预约</p> <p class="fontN">12月15日 16:00-16:50</p> <span class="yy-a">预约</span> </a>
                        </div>
                        <div class="home-li-txt">
                            <a class="f-toe" href="class_detail.html?2984.html" title="知识小讲堂之悬疑推理三连弹【Day1】" target="_blank">知识小讲堂之悬疑推理三连弹【Day1】</a>
                            <font>Tim老师</font>
                        </div> </li>
                    <li class="home-li">
                        <div class="home-li-pic">
                            <img _src="http://static.51talk.com/upload/open_img/2015/12/11/2015121114295524406.png?v=1450080047952" height="178" width="235" alt="" />
                            <a class="cover-img" href="class_detail.html?2980.html" style="display:none;" target="_blank"> <p class="fontH"><b>615</b>人已预约</p> <p class="fontN">12月15日 18:00-18:50</p> <span class="yy-a">预约</span> </a>
                        </div>
                        <div class="home-li-txt">
                            <a class="f-toe" href="class_detail.html?2980.html" title="欧亚文明交汇点上的国度——土耳其一瞥" target="_blank">欧亚文明交汇点上的国度——土耳其一瞥</a>
                            <font>Dr.Wendy老师</font>
                        </div> </li>
                    <li class="home-li">
                        <div class="home-li-pic">
                            <img _src="http://static.51talk.com/upload/open_img/2015/12/14/2015121420560528793.jpg?v=1450080047952" height="178" width="235" alt="" />
                            <a class="cover-img" href="class_detail.html?3007.html" style="display:none;" target="_blank"> <p class="fontH"><b>101</b>人已预约</p> <p class="fontN">12月15日 19:00-20:00</p> <span class="yy-a">预约</span> </a>
                        </div>
                        <div class="home-li-txt">
                            <a class="f-toe" href="class_detail.html?3007.html" title="亲子阅读树《Lost and Found》失而复得（下）" target="_blank">亲子阅读树《Lost and Found》失而复得（下）</a>
                            <font>Jason老师</font>
                        </div> </li>
                    <li class="home-li">
                        <div class="home-li-pic">
                            <img _src="http://static.51talk.com/upload/open_img/2015/12/11/2015121111350892665.jpg?v=1450080047952" height="178" width="235" alt="" />
                            <a class="cover-img" href="class_detail.html?2958.html" style="display:none;" target="_blank"> <p class="fontH"><b>980</b>人已预约</p> <p class="fontN">12月15日 20:00-21:00</p> <span class="yy-a">预约</span> </a>
                        </div>
                        <div class="home-li-txt">
                            <a class="f-toe" href="class_detail.html?2958.html" title="岛国文化之日本" target="_blank">岛国文化之日本</a>
                            <font>mojo老师</font>
                        </div> </li>
                    <!-- home-li -->
                </ul>
                <!-- home-ul end -->
                <div class="u-caption mt0">
                    <h4 class="title">最新活动</h4>
                    <a class="attach" href="http://bbs.51talk.com/activity/index/new">更多&gt;&gt;</a>
                </div>
                <!-- /u-caption -->
                <ul class="home-ul fn-clear">
                    <li class="home-li home-li2">
                        <div class="home-li-pic">
                            <img _src="http://static.51talk.com/static/image/openclass/default400x160.jpg?v=1450080047952" height="144" width="359" alt="敬请期待" />
                        </div>
                        <div class="home-li-txt">
                            <a class="f-toe">敬请期待</a>
                        </div> </li>
                    <!-- home-li -->
                </ul>
                <!-- home-ul end -->
                <div class="u-caption mt0">
                    <h4 class="title">推荐文章</h4>
                    <a class="attach" href="http://bbs.51talk.com/forum/index">更多&gt;&gt;</a>
                </div>
                <!-- /u-caption -->
                <ul class="home-ul-t fn-clear">
                    <li class="home-li-t">
                        <div class="h-li-l">
                            <div class="avatar">
                                <img _src="http://static.51talk.com/upload/avatar/2015/0828/20150828141727762_avatar.jpg?v=1450080047952" height="60" width="60" alt="Clark" />
                                <i class="cover"></i>
                            </div>
                            <h4 class="f-toe">Clark</h4>
                        </div>
                        <div class="h-li-r">
                            <p class="home-title"><a target="_blank" href="discuss_detail.html?6910.html">【高颜值奖品哦】“学英语，集齐运动装备”……</a></p>
                            <p class="home-date"> Clark 2015-12-10 16:02:20 </p>
                            <p class="home-content">上期活动中奖名单“学英语，集齐运动装备” &nbsp;&nbsp; &nbsp; &nbsp; &amp;n……</p>
                            <div class="sj-bottom"></div>
                        </div> </li>
                    <li class="home-li-t">
                        <div class="h-li-l">
                            <div class="avatar">
                                <img _src="http://static.51talk.com/upload/avatar/2015/0613/20150613144120639_avatar.jpg?v=1450080047952" height="60" width="60" alt="nico" />
                                <i class="cover"></i>
                            </div>
                            <h4 class="f-toe">nico</h4>
                        </div>
                        <div class="h-li-r">
                            <p class="home-title"><a target="_blank" href="discuss_detail.html?6714.html">奖【51Talk四周年感恩季】小5我想对……</a></p>
                            <p class="home-date"> nico 2015-11-26 12:03:46 </p>
                            <p class="home-content">【51Talk四周年 感恩季】-小5，我想对你说&nbsp;感恩特辑强势来袭！&nbsp;亲爱的51……</p>
                            <div class="sj-bottom"></div>
                        </div> </li>
                    <li class="home-li-t">
                        <div class="h-li-l">
                            <div class="avatar">
                                <img _src="http://static.51talk.com/upload/avatar/2015/0613/20150613144120639_avatar.jpg?v=1450080047952" height="60" width="60" alt="nico" />
                                <i class="cover"></i>
                            </div>
                            <h4 class="f-toe">nico</h4>
                        </div>
                        <div class="h-li-r">
                            <p class="home-title"><a target="_blank" href="discuss_detail.html?6554.html">公布【有奖游戏】一句英语形容自己！Can……</a></p>
                            <p class="home-date"> nico 2015-11-18 11:23:32 </p>
                            <p class="home-content">获奖名单公布最佳描述奖：57楼Persisting; 109楼Student最佳人气奖：2楼Anna……</p>
                            <div class="sj-bottom"></div>
                        </div> </li>
                </ul>
                <!-- home-ul-w -->
            </div>
            <!-- home end -->
        </div>
        <!-- left end -->
        <div class="sidebar">
            <!-- 热门讨论 -->
            <div class="us-box pb0">
                <div class="u-caption">
                    <h4 class="title">热门讨论</h4>
                </div>
                <div class="us-pic">
                    <a href="http://bbs.51talk.com/user/ad_click?id=8&amp;url=http%3A%2F%2Fbbs.51talk.com%2Fforum%2Fdetail%2F6859.html" target="_blank"> <img title="讨论区版主招募啦" src="${ctx}/images/144946596120065_thumb.jpg" width="200" height="138" style="border:0px;" /> </a>
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
                    <a href="http://bbs.51talk.com/user/ad_click?id=3&amp;url=http%3A%2F%2Fbbs.51talk.com%2Fforum%2Fdetail%2F6714.html" target="_blank"> <img title="51Talk四周年感恩季" src="${ctx}/images/144852011651411_thumb.jpg" width="200" height="138" style="border:0px;" /> </a>
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
                    <a href="http://bbs.51talk.com/user/ad_click?id=2&amp;url=http%3A%2F%2Fwww.51talk.com%2Ftesting%2Findex%2F%3Ftype%3Dlogin" target="_blank"> <img title="水平测试" src="${ctx}/images/144308788522532_thumb.jpg" width="200" height="138" style="border:0px;" /> </a>
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
<img style="display:none;" src="${ctx}/images/a.gif?v=23d6447a21f600271f24ae77870f128d&amp;site=3&amp;type=1&amp;uuid=fc30355894446a101b0b95e6819f06bb&amp;uid=U2843762138&amp;ref=http%3A%2F%2F51talk.com%2Fpay%2Fproduct" border="0" alt="" />
<%@ include file="tags/taglib.jsp" %>
<script type="text/javascript">
    $(function(){
        _splash('zhiye_home',0,104003,'new.zhiye.com');
    });
    $(".doChat").click(function () {
        var userId = "${param.userId}"
        var reg = {}
        reg['userid'] = userId

        $.ajax({
            type : "POST",
            contentType: "application/json;charset=UTF-8",
            url : "${ctx}/chat/getToken",
            data: JSON.stringify(reg),
            datatype:"JSON",
            success : function(re) {
                var tokenresult = re.tokenResult
                if(tokenresult){
                    location.href="${ctx}/chat?userId="+reg['userid']+"&token="+tokenresult+"&roomId=taolunclass7813728"
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

