<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta charset="utf-8">
    <meta http-equiv="Cache-Control" content="no-siteapp">
    <title>商城首页</title>
    <meta name="keywords" content="">
    <meta name="description" content="">
    <%@ include file="shoptaglib.jsp"%>
</head>
<body>
    <!--头部-->
    <div class="topper">
        <div class="wrapper">
            <div class="left-bar">
                <div class="back-home divider">
                    <em></em><a href="${ctx}/shop/index">商城首页</a>
                </div>
                <div class="item"><a href="">商家中心</a></div>
            </div>
            <div class="right-bar">
                <div class="login-user sub-menu">
                    <a class="menu-hd" href="">txtangxia<em></em></a>
                    <div class="down">
                        <a href="">内容</a>
                        <a href="">内容</a>
                        <a href="">内容</a>
                    </div>
                </div>
                <div class="item"><a href="">消息（<span class="txt-theme">0</span>）</a></div>
                <div class="logout divider"><a href="">退出</a></div>
                <span class=""></span>
                <div class="cart"><em></em><a href="">购物车<span class="txt-theme">2</span>件</a></div>
                <div class="order"><em></em><a href="">我的订单</a></div>
                <div class="fav"><em></em><a href="">我的收藏</a></div>
                <div class="help"><em></em><a href="">帮助中心</a></div>
            </div>
        </div>
    </div>
    <div class="header-wrap">
        <div class="header wrapper">
            <a href="" class="logo">
                <img src="${ctx}/shangcheng/img/logo5.png" alt="" />
            </a>
            <span class="channel">电器</span>
            <div class="header-schbox">
                <div class="inner clearfix">
                <form action="" method="">
                    <div class="search-switch">
                        <i class="arrow"></i>
                        <div class="item">商品</div>
                        <div class="item active">店铺</div>
                    </div>
                    <input class="search-txt" placeholder="搜流行宝贝">
                    <button class="search-btn"></button>
                    <div class="suggest-box">
                        <div class="item" data-title="上衣 短款 短袖">上衣 短款 短袖<div class="tags"><span>雪纺</span><span>蕾丝</span><span>一字领</span></div></div>
                    </div>
                </form>
                </div>
                <div class="hot-words">
                    <a href="">太平鸟</a><a href="">手机 </a><a href="">内衣</a><a href="">周大福</a><a href="">太平鸟</a>
                </div>
            </div>
            <div class="contact">
                <div class="item">
                    <span class="ico iconfont">&#xe61b;</span>
                    <span class="tel">400-000-0000</span>
                </div>
                <div class="item">
                     <span class="ico iconfont">&#xe61d;</span><a class="kefu">在线客服</a>
                </div>
            </div>
        </div>
    </div>
    <div class="nav-box">
        <div class="nav wrapper">
            <div class="category-tit">全部分类</div>
            <ul class="nav-ul">
                <li><a href="${ctx}/shop/index">首页</a></li>
                <li class="active"><a href="${ctx}/shop/dianqi">电器</a></li>
                <li><a href="${ctx}/shop/shengxian">生鲜</a></li>
            </ul>
        </div>
    </div>
    <!--头部-->

    <div class="home-banner">
        <a class="item" href=""><img src="${ctx}/shangcheng/uploads/dianqi/banner-dq.jpg" alt="" /></a>
        <a class="item" href=""><img src="${ctx}/shangcheng/uploads/dianqi/banner-dq1.jpg" alt="" /></a>
    </div>

    <div class="home-gray-box">
        <div class="wrapper">
            <div class="category-menu clearfix">
                <div class="col">
                    <img src="${ctx}/shangcheng/img/dq/category1.png" alt="" class="ico" />
                    <div class="cont">
                        <div class="tit">电视</div>
                        <div class="list">
                            <a href="">平板电视</a><a href="">家庭影音</a><a href="">曲面电视</a><a href="">超薄电视</a>
                            <a href="">量子电视</a><a href="">互联网电视</a><a href="">智能电视</a><a href="">4k超清电视</a>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <img src="${ctx}/shangcheng/img/dq/category2.png" alt="" class="ico" />
                    <div class="cont">
                        <div class="tit">冰箱</div>
                        <div class="list">
                            <a href="${ctx}/shop/goods-detail">双开门 冰箱</a><a href="">十字对开门冰箱</a><a href="">多门冰箱</a><a href="">三开门冰箱</a>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <img src="${ctx}/shangcheng/img/dq/category3.png" alt="" class="ico" />
                    <div class="cont">
                        <div class="tit">洗衣机</div>
                        <div class="list">
                            <a href="${ctx}/shop/goods-detail">洗烘一体机</a><a href="">滚筒洗衣机</a><a href="">波轮洗衣机</a><a href="">迷你洗衣机</a>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <img src="${ctx}/shangcheng/img/dq/category4.png" alt="" class="ico" />
                    <div class="cont">
                        <div class="tit">空调</div>
                        <div class="list">
                            <a href="${ctx}/shiop/goods-detail">挂式空调</a><a href="">柜式空调</a><a href="">中央空调</a><a href="">圆柱式空调</a>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <img src="${ctx}/shangcheng/img/dq/category5.png" alt="" class="ico" />
                    <div class="cont">
                        <div class="tit">厨卫大电</div>
                        <div class="list">
                            <a href="${ctx}/shop/goods-detail">烟灶套装</a><a href="">油烟机</a><a href="">燃气灶</a><a href="">洗碗机</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="home-tit">
                <div class="tit">热卖单品</div>
            </div>
            <div class="home-hot clearfix">
                <div class="fl">
                    <div class="grid grid-hr">
                        <div class="name"><a href="">智能大屏疯抢升温</a></div>
                        <div class="desc">65寸4K客厅巨幕</div>
                        <div class="price">￥3799.00</div>
                        <a href="${ctx}/shop/goods-detail"><img src="${ctx}/shangcheng/uploads/dianqi/52.jpg" alt="" class="figure" /></a>
                    </div>
                    <div class="grid grid-hr">
                        <div class="name"><a href="">智能液晶平板电视机</a></div>
                        <div class="desc">4K超高清HDR</div>
                        <div class="price">￥5999.00</div>
                        <a href="${ctx}/shop/goods-detail"><img src="${ctx}/shangcheng/uploads/dianqi/1.jpg" alt="" class="figure" /></a>
                    </div>
                </div>
                <div class="grid grid-vt">
                    <div class="cont">
                        <div class="name"><a href="">美的变频冰箱</a></div>
                        <div class="desc">容量加大 变频科技 WIFI智能 整体</div>
                        <div class="price">￥2999.00</div>
                    </div>
                    <a href="${ctx}/shop/goods-detail"><img src="uploads/dianqi/53.jpg" alt="" class="figure" /></a>
                </div>
                <div class="grid grid-vt">
                    <div class="cont">
                        <div class="name"><a href="">Haier/海尔 BCD-6426</a></div>
                        <div class="desc">42升对开门冰箱风冷无霜变频智能WIFI</div>
                        <div class="price">￥3999.00</div>
                    </div>
                    <a href="${ctx}/shop/goods-detail"><img src="${ctx}/shangcheng/uploads/dianqi/1a.jpg" alt="" class="figure" /></a>
                </div>
                <div class="grid grid-vt">
                    <div class="cont">
                        <div class="name"><a href="">美的变频冰箱</a></div>
                        <div class="desc">容量加大 变频科技 WIFI智能 整体</div>
                        <div class="price">￥2999.00</div>
                    </div>
                    <a href="${ctx}/shangcheng/goods-detail"><img src="${ctx}/shangcheng/uploads/dianqi/53.jpg" alt="" class="figure" /></a>
                </div>
            </div>
        </div>
    </div>

    <div class="wrapper">
        <div class="home-tit">
            <div class="tit">码上好推荐</div>
        </div>
        <div class="home-recommend clearfix">
            <div class="item">
                <a href=""><img src="${ctx}/shangcheng/uploads/dianqi/54a.jpg" alt="" class="figure" /></a>
                <div class="label">
                    <div class="name"><a href="">微波炉 21升容量</a></div>
                    <span class="price">￥299 </span>
                </div>
            </div>
            <a><img class="banner" src="${ctx}/shangcheng/uploads/dianqi/55.jpg" alt="" /></a>
            <div class="item">
                <a href="${ctx}/shop/goods-detail"><img src="${ctx}/shangcheng/uploads/dianqi/54.jpg" alt="" class="figure" /></a>
                <div class="label">
                    <div class="name"><a href="">微波炉 21升容量</a></div>
                    <span class="price">￥299 </span>
                </div>
            </div>
            <div class="item">
                <a href=""><img src="${ctx}/shangcheng/uploads/dianqi/54.jpg" alt="" class="figure" /></a>
                <div class="label">
                    <div class="name"><a href="">微波炉 21升容量</a></div>
                    <span class="price">￥299 </span>
                </div>
            </div>
            <div class="item">
                <a href="${ctx}/shop/goods-detail"><img src="${ctx}/shangcheng/uploads/dianqi/54b.jpg" alt="" class="figure" /></a>
                <div class="label">
                    <div class="name"><a href="">微波炉 21升容量</a></div>
                    <span class="price">￥299 </span>
                </div>
            </div>
            <div class="item">
                <a href="${ctx}/shop/goods-detail"><img src="${ctx}/shangcheng/uploads/dianqi/54a.jpg" alt="" class="figure" /></a>
                <div class="label">
                    <div class="name"><a href="">微波炉 21升容量</a></div>
                    <span class="price">￥299 </span>
                </div>
            </div>
            <div class="item">
                <a href="${ctx}/shop/goods-detail"><img src="${ctx}/shangcheng/uploads/dianqi/54b.jpg" alt="" class="figure" /></a>
                <div class="label">
                    <div class="name"><a href="">微波炉 21升容量</a></div>
                    <span class="price">￥299 </span>
                </div>
            </div>

        </div>
    </div>


    <div class="home-gray-box home-floor-wrap">
        <div class="wrapper">
            <div class="home-tit">
                <div class="tit">码上好推荐</div>
            </div>
            <div class="home-floor clearfix">
                <div class="banner">
                    <a href="${ctx}/shop/goods-detail"><img src="${ctx}/shangcheng/uploads/56.jpg" alt="" /></a>
                </div>
                <div class="col">
                    <div class="item">
                        <a href=""><img src="${ctx}/shangcheng/uploads/dianqi/52.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="">空调大1匹挂机、变频冷暖、甲醛除湿</a></div>
                        <div class="price">¥ 2449.00</div>
                    </div>
                    <div class="item">
                        <a href=""><img src="${ctx}/shangcheng/uploads/dianqi/34.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="">海信55吋曲面4K超清HDR液晶电视</a></div>
                        <div class="price">¥ 2449.00</div>
                    </div>
                </div>
                <div class="col">
                    <div class="item item-vt">
                        <a href=""><img src="${ctx}/shangcheng/uploads/dianqi/1a.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="">海信55吋曲面4K超清HDR液晶电视</a></div>
                        <div class="price">¥ 2449.00</div>
                    </div>
                </div>
                <div class="col">
                    <div class="item">
                        <a href=""><img src="${ctx}/shangcheng/uploads/dianqi/57.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="">空调大1匹挂机、变频冷暖、甲醛除湿</a></div>
                        <div class="price">¥ 2449.00</div>
                    </div>
                    <div class="item">
                        <a href=""><img src="${ctx}/shangcheng/uploads/dianqi/1.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="">海信55吋曲面4K超清HDR液晶电视</a></div>
                        <div class="price">¥ 2449.00</div>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <!--脚部-->
    <div class="fatfooter">
        <div class="wrapper">
            <div class="fatft-service">
                <div class="item">
                    <a href="">
                        <img src="${ctx}/shangcheng/img/ico/ft-ser1.png" alt="" class="ico" />
                        <span>品质保障</span>
                    </a>
                </div>
                <div class="item">
                    <a href="">
                        <img src="${ctx}/shangcheng/img/ico/ft-ser2.png" alt="" class="ico" />
                        <span>七天无理由退换货</span>
                    </a>
                </div>
                <div class="item">
                    <a href="">
                        <img src="${ctx}/shangcheng/img/ico/ft-ser3.png" alt="" class="ico" />
                        <span>特色服务体验</span>
                    </a>
                </div>
                <div class="item">
                    <a href="">
                        <img src="${ctx}/shangcheng/img/ico/ft-ser4.png" alt="" class="ico" />
                        <span>帮助中心</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="fatft-links">
            <div class="wrapper">
                <div class="col-link">
                    <div class="tit">购物指南</div>
                    <div class="link"><a href="">购物流程</a></div>
                    <div class="link"><a href="">账户安全</a></div>
                    <div class="link"><a href="">联系客服</a></div>
                    <div class="link"><a href="">会员介绍</a></div>
                </div>
                <div class="col-link">
                    <div class="tit">配送方式</div>
                    <div class="link"><a href="">配送服务查询上</a></div>
                    <div class="link"><a href="">门自提</a></div>
                    <div class="link"><a href="">物流费用标准</a></div>
                </div>
                <div class="col-link">
                    <div class="tit">支付方式</div>
                    <div class="link"><a href="">银联支付</a></div>
                    <div class="link"><a href="">支付宝支付</a></div>
                    <div class="link"><a href="">微信支付</a></div>
                </div>
                <div class="col-link">
                    <div class="tit">售后服务</div>
                    <div class="link"><a href="">售后政策</a></div>
                    <div class="link"><a href="">价格保护</a></div>
                    <div class="link"><a href="">退单说明</a></div>
                    <div class="link"><a href="">取消订单</a></div>
                </div>
                <div class="col-link">
                    <div class="tit">联系我们</div>
                    <div class="link"><a href="">商家入驻</a></div>
                    <div class="link"><a href="">营销服务</a></div>
                    <div class="link"><a href="">关于我们</a></div>
                    <div class="link"><a href="">广告服务</a></div>
                </div>
                <div class="col-contact">
                    <div class="phone">400-000-0000</div>
                    <div class="time">周一至周日 8:00-18:00 <br />（仅收市话费）</div>
                    <div class="tool">
                        <a href="" class="kefu"><i class="iconfont icon-huifu"></i>在线客服</a>
                        <a class="ico weixin" href=""><img src="${ctx}/shangcheng/img/ico/ft-weixin.png" alt="" /><img src="${ctx}/shangcheng/uploads/ercode.jpg" class="ercode" /></a>
                        <a class="ico sina" href=""><img src="${ctx}/shangcheng/img/ico/ft-sina.png" alt="" /></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer">安徽XXX网络科技有限公司 版权所有 Copyright © 2016-2018   备案号：皖ICP备123456789</div>
    <!--脚部-->
</body>

<script>
    $('.home-banner').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true
      });

    // $('.today-special-slider').slick({
    //     autoplay: true,
    //     autoplaySpeed: 5000,
    //     slidesToShow: 3,
    //     draggable: false
    //   });

</script>
</html>