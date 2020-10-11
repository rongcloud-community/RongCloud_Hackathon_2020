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
                <div class="change-city"><a class="name">合肥</a><a class="toggle" href="${ctx}/shop/selectcity">[切换]</a></div>
                <div class="back-home divider">
                    <em></em><a href="">商城首页</a>
                </div>
                <div class="item"><a href="">商家中心</a></div>
            </div>
            <div class="right-bar">
                <div class="login-user sub-menu">
                    <a class="menu-hd" href="">${param.userId}<em></em></a>
<%--                    <div class="down">--%>
<%--                        <a href="">内容</a>--%>
<%--                        <a href="">内容</a>--%>
<%--                        <a href="">内容</a>--%>
<%--                    </div>--%>
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
                <img src="${ctx}/shangcheng/img/logo3.png" alt="" />
            </a>
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
            <div class="slogan"></div>
            <ul class="nav-ul">
                <li class="active"><a href="">首页</a></li>
                <li><a href="${ctx}/shop/dianqi">电器</a></li>
                <li><a href="${ctx}/shop/shengxian">生鲜</a></li>
            </ul>
        </div>
    </div>
    <!--头部-->

    <div class="side-category" style="display: none;">
        <div class="side-category-tit">全品分类</div>
        <div class="side-category-bd">
            <div class="f-item">
                <div class="f-box">
                    <div class="f-tit">玩转3C</div>
                    <div class="f-list">
                        <a href="">手机</a><a href="">数码</a><a href="">通信</a>
                    </div>
                </div>
                <div class="c-box">
                    <div class="hd">分类</div>
                    <div class="bd">
                        <div class="list-wrap">
                            <a href="">冷却泵</a>
                            <a href="">冷却水管道</a>
                            <a href="">冷凝器</a>
                            <a href="">压缩机</a>
                            <a href="">冷冻水塔</a>
                            <a href="">压缩机</a>
                            <a href="">冷凝器</a>
                            <a href="">压缩机</a>
                            <a href="">冷冻水塔</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="f-item">
                <div class="f-box">
                    <div class="f-tit">服饰家居</div>
                    <div class="f-list">
                        <a href="">服饰内衣</a><a href="">鞋靴箱包</a>
                    </div>
                </div>
                <div class="c-box">
                	<div class="hd">分类</div>
                    <div class="bd">
                        <div class="list-wrap">
                            <a href="">冷却泵</a>
                            <a href="">冷却水管道</a>
                            <a href="">冷凝器</a>
                            <a href="">压缩机</a>
                            <a href="">冷冻水塔</a>
                            <a href="">压缩机</a>
                            <a href="">冷凝器</a>
                            <a href="">压缩机</a>
                            <a href="">冷冻水塔</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="f-item">
                <div class="f-box">
                    <div class="f-tit">商城超市</div>
                    <div class="f-list">
                        <a href="">服饰内衣</a><a href="">鞋靴箱包</a>
                    </div>
                </div>
                <div class="c-box">
                	<div class="hd">分类</div>
                    <div class="bd">
                        <div class="list-wrap">
                            <a href="">冷却泵</a>
                            <a href="">冷却水管道</a>
                            <a href="">压缩机</a>
                            <a href="">冷冻水塔</a>
                            <a href="">压缩机</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="f-item">
                <div class="f-box">
                    <a  class="f-tit" href="${ctx}/shop/dianqi">家用电器</a>
                    <div class="f-list">
                        <a href="">服饰内衣</a><a href="">鞋靴箱包</a>
                    </div>
                </div>
                <div class="c-box">
                	<div class="hd">分类</div>
                    <div class="bd">
                        <div class="list-wrap">
                            <a href="">冷却泵</a>
                            <a href="">冷却水管道</a>
                            <a href="">冷凝器</a>
                            <a href="">压缩机</a>
                            <a href="">冷冻水塔</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="f-item">
                <div class="f-box">
                    <a class="f-tit" href="${ctx}/shop/shengxian">生鲜特产</a>
                    <div class="f-list">
                        <a href="">食品</a><a href="">生鲜</a><a href="">特产</a><a href="">水果</a>
                    </div>
                </div>
                <div class="c-box">
                	<div class="hd">分类</div>
                    <div class="bd">
                        <div class="list-wrap">
                            <a href="">冷凝器</a>
                            <a href="">压缩机</a>
                            <a href="">冷冻水塔</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="side-category-ft" data-action="category-toggle">
            <span class="label tohide">收起导航</span>
            <span class="label toshow">展开导航</span>
        </div>
    </div>

    <div class="home-full-banner">
        <a href="" class="item"><img data-lazy="${ctx}/shangcheng/uploads/sy/banner1.jpg" alt="" /></a>
        <a href="" class="item"><img data-lazy="${ctx}/shangcheng/uploads/sy/banner2.jpg" alt="" /></a>
        <a href="" class="item"><img data-lazy="${ctx}/shangcheng/uploads/sy/banner3.jpg" alt="" /></a>
    </div>

    <div class="gray-box">
        <div class="wrapper">
            <!-- 商品促销 -->
            <div class="promo-list clearfix">
                <div class="col">
                    <div class="item"><img src="${ctx}/shangcheng/uploads/sy/13.jpg" alt="" /></div>
                </div>
                <div class="col">
                    <div class="item"><img src="${ctx}/shangcheng/uploads/sy/14.jpg" alt="" /></div>
                </div>
                <div class="col">
                    <div class="item"><img src="${ctx}/shangcheng/uploads/sy/15.jpg" alt="" /></div>
                </div>
                <div class="col">
                    <div class="item"><img src="${ctx}/shangcheng/uploads/sy/16.jpg" alt="" /></div>
                </div>
            </div>

            <!-- 限时抢购 -->
            <div class="flash-sale-section">
                <div class="section-hd">
                    <div class="title">限时抢购</div>
                </div>
                <div class="flash-sale clearfix">
                    <div class="grid grid-b">
                        <img src="${ctx}/shangcheng/uploads/sy/17.jpg" alt="" />
                    </div>
                    <div class="grid grid-m">
                        <a href="${ctx}/shop/goods-detail">
                            <div class="inner-text">
                                <div class="tit">小米Max</div>
                                <div class="stit">6.44''大屏黄金尺寸</div>
                                <div class="info">大屏大电量</div>
                            </div>
                            <img src="${ctx}/shangcheng/uploads/sy/18.jpg" alt="" />
                        </a>
                    </div>
                    <div class="grid grid-s">
                        <a href="${ctx}/shop/goods-detail">
                            <div class="inner-text">
                                <div class="tit">无线运动耳麦</div>
                                <div class="stit">大牌钜惠驾到</div>
                            </div>
                            <img src="${ctx}/shangcheng/uploads/sy/20.jpg" alt="" />
                        </a>
                    </div>
                    <div class="grid grid-s">
                        <a href="${ctx}/shop/goods-detail">
                            <div class="inner-text">
                                <div class="tit">靠谱好装备</div>
                                <div class="stit">简约书台柜组合</div>
                            </div>
                            <img src="${ctx}/shangcheng/uploads/sy/19.jpg" alt="" />
                        </a>
                    </div>
                    <div class="grid grid-s">
                        <a href="${ctx}/shop/goods-detail">
                            <div class="inner-text">
                                <div class="tit">无线运动耳麦</div>
                                <div class="stit">大牌钜惠驾到</div>
                            </div>
                            <img src="${ctx}/shangcheng/uploads/sy/20.jpg" alt="" />
                        </a>
                    </div>
                    <div class="grid grid-s">
                        <a href="${ctx}/shop/goods-detail">
                            <div class="inner-text">
                                <div class="tit">靠谱好装备</div>
                                <div class="stit">简约书台柜组合</div>
                            </div>
                            <img src="${ctx}/shangcheng/uploads/sy/20.jpg" alt="" />
                        </a>
                    </div>
                    <div class="grid grid-s">
                        <a href="${ctx}/shop/goods-detail">
                            <div class="inner-text">
                                <div class="tit">无线运动耳麦</div>
                                <div class="stit">大牌钜惠驾到</div>
                            </div>
                            <img src="${ctx}/shangcheng/uploads/sy/19.jpg" alt="" />
                        </a>
                    </div>
                    <div class="grid grid-s">
                        <a href="${ctx}/shop/goods-detail">
                            <div class="inner-text">
                                <div class="tit">靠谱好装备</div>
                                <div class="stit">简约书台柜组合</div>
                            </div>
                            <img src="${ctx}/shangcheng/uploads/sy/20.jpg" alt="" />
                        </a>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <div class="white-box">
        <div class="wrapper">
            <!-- 品牌盛宴 -->
            <div class="brand-feast-section">
                <div class="section-hd">
                    <div class="title">品牌盛宴</div>
                </div>
                <div class="brand-feast clearfix">
                    <div class="ad-box">
                        <a href=""><img src="${ctx}/shangcheng/uploads/sy/21.jpg" /></a>
                    </div>
                    <div class="brand-feast-list">
                        <div class="item">
                            <div class="logo"><img src="${ctx}/shangcheng/uploads/sy/23.jpg" alt="" /></div>
                            <a class="mask" href=""><span class="text">九阳<br />爆款直降低至49元</span></a>
                        </div>
                        <div class="item">
                            <div class="logo"><img src="${ctx}/shangcheng/uploads/sy/24.jpg" alt="" /></div>
                            <a class="mask" href=""><span class="text">九阳<br />爆款直降低至49元</span></a>
                        </div>
                        <div class="item">
                            <div class="logo"><img src="${ctx}/shangcheng/uploads/sy/25.jpg" alt="" /></div>
                            <a class="mask" href=""><span class="text">九阳<br />爆款直降低至49元</span></a>
                        </div>
                        <div class="item">
                            <div class="logo"><img src="uploads/sy/26.jpg" alt="" /></div>
                            <a class="mask" href=""><span class="text">九阳<br />爆款直降低至49元</span></a>
                        </div>
                        <div class="item">
                            <div class="logo"><img src="${ctx}/shangcheng/uploads/sy/23.jpg" alt="" /></div>
                            <a class="mask" href=""><span class="text">九阳<br />爆款直降低至49元</span></a>
                        </div>
                        <div class="item">
                            <div class="logo"><img src="${ctx}/shangcheng/uploads/sy/24.jpg" alt="" /></div>
                            <a class="mask" href=""><span class="text">九阳<br />爆款直降低至49元</span></a>
                        </div>
                        <div class="item">
                            <div class="logo"><img src="${ctx}/shangcheng/uploads/sy/25.jpg" alt="" /></div>
                            <a class="mask" href=""><span class="text">九阳<br />爆款直降低至49元</span></a>
                        </div>
                        <div class="item">
                            <div class="logo"><img src="${ctx}/shangcheng/uploads/sy/26.jpg" alt="" /></div>
                            <a class="mask" href=""><span class="text">九阳<br />爆款直降低至49元</span></a>
                        </div>
                        <div class="item">
                            <div class="logo"><img src="${ctx}/shangcheng/uploads/sy/23.jpg" alt="" /></div>
                            <a class="mask" href=""><span class="text">九阳<br />爆款直降低至49元</span></a>
                        </div>
                        <div class="item">
                            <div class="logo"><img src="${ctx}/shangcheng/uploads/sy/24.jpg" alt="" /></div>
                            <a class="mask" href=""><span class="text">九阳<br />爆款直降低至49元</span></a>
                        </div>
                        <div class="item">
                            <div class="logo"><img src="${ctx}/shangcheng/uploads/sy/25.jpg" alt="" /></div>
                            <a class="mask" href=""><span class="text">九阳<br />爆款直降低至49元</span></a>
                        </div>
                        <div class="item">
                            <div class="logo"><img src="${ctx}/shangcheng/uploads/sy/26.jpg" alt="" /></div>
                            <a class="mask" href=""><span class="text">九阳<br />爆款直降低至49元</span></a>
                        </div>
                        <div class="item">
                            <div class="logo"><img src="${ctx}/shangcheng/uploads/sy/23.jpg" alt="" /></div>
                            <a class="mask" href=""><span class="text">九阳<br />爆款直降低至49元</span></a>
                        </div>
                        <div class="item">
                            <div class="logo"><img src="${ctx}/shangcheng/uploads/sy/24.jpg" alt="" /></div>
                            <a class="mask" href=""><span class="text">九阳<br />爆款直降低至49元</span></a>
                        </div>
                        <div class="item">
                            <div class="logo"><img src="${ctx}/shangcheng/uploads/sy/25.jpg" alt="" /></div>
                            <a class="mask" href=""><span class="text">九阳<br />爆款直降低至49元</span></a>
                        </div>
                        <div class="item">
                            <div class="logo"><img src="${ctx}/shangcheng/uploads/sy/26.jpg" alt="" /></div>
                            <a class="mask" href=""><span class="text">九阳<br />爆款直降低至49元</span></a>
                        </div>
                        <div class="item">
                            <div class="logo"><img src="${ctx}/shangcheng/uploads/sy/25.jpg" alt="" /></div>
                            <a class="mask" href=""><span class="text">九阳<br />爆款直降低至49元</span></a>
                        </div>
                        <div class="item">
                            <div class="logo"><img src="${ctx}/shangcheng/uploads/sy/26.jpg" alt="" /></div>
                            <a class="mask" href=""><span class="text">九阳<br />爆款直降低至49元</span></a>
                        </div>
                    </div>
                </div>
                <!-- 广告 -->
                <div style="margin-top:12px;">
                    <a href=""><img src="${ctx}/shangcheng/uploads/sy/22.jpg" alt="" /></a>
                </div>
            </div>
        </div>
    </div>

    <div class="gray-box">
        <div class="wrapper floor-wrap">
            <!-- floor1到floor5控制楼层的主题 -->
            <div class="floor-section floor1">
                <div class="section-hd">
                    <div class="title">3C数码</div>
                    <div class="bar more">
                        <a href="">iPhone</a><a href="">小米</a><a href="">魅族</a><a href="">荣耀</a><a href="">乐视</a><a href="">华为</a><a href="">三星</a><a href="">OPPO</a><a href="">VIVO</a>
                    </div>
                </div>
                <div class="section-bd clearfix">
                    <div class="section-side">
                        <div class="banner">
                            <a href="${ctx}/shop/search-goods"><img src="${ctx}/shangcheng/uploads/27.jpg" alt="" /></a>
                        </div>
                        <div class="brands">
                            <a href="${ctx}/shop/search-goods" class="item"><div class="inner"><img src="${ctx}/shangcheng/uploads/sy/23.jpg" alt="" /></div></a>
                            <a href="${ctx}/shop/search-goods" class="item"><div class="inner"><img src="${ctx}/shangcheng/uploads/sy/12.jpg" alt="" /></div></a>
                            <a href="${ctx}/shop/search-goods" class="item"><div class="inner"><img src="${ctx}/shangcheng/uploads/sy/24.jpg" alt="" /></div></a>
                            <a href="${ctx}/shop/search-goods" class="item"><div class="inner"><img src="${ctx}/shangcheng/uploads/sy/25.jpg" alt="" /></div></a>
                            <a href="${ctx}/shop/search-goods" class="item"><div class="inner"><img src="${ctx}/shangcheng/uploads/sy/26.jpg" alt="" /></div></a>
                            <a href="${ctx}/shop/search-goods" class="item"><div class="inner"><img src="${ctx}/shangcheng/uploads/sy/24.jpg" alt="" /></div></a>
                        </div>
                    </div>
                    <div class="section-cont">
                        <div class="col">
                            <a class="grid grid-s" href="${ctx}/shop/goods-detail">
                                <div class="inner-text">
                                    <div class="tit">设计最爱之w3c数位板</div>
                                    <div class="info">爆款满1000减99 </div>
                                </div>
                                <img src="${ctx}/shangcheng/uploads/sy/19.jpg" alt="" />
                            </a>
                            <a class="grid grid-s" href="${ctx}/shop/goods-detail">
                                <div class="inner-text">
                                    <div class="tit">设计最爱之w3c数位板</div>
                                    <div class="info">爆款满1000减99 </div>
                                </div>
                                <img src="${ctx}/shangcheng/uploads/sy/19.jpg" alt="" />
                            </a>
                            <a class="grid grid-s" href="${ctx}/shop/goods-detail">
                                <div class="inner-text">
                                    <div class="tit">设计最爱之w3c数位板</div>
                                    <div class="info">爆款满1000减99 </div>
                                </div>
                                <img src="${ctx}/shangcheng/uploads/sy/19.jpg" alt="" />
                            </a>
                        </div>
                        <div class="col">
                            <a class="grid grid-b" href="">
                                <div class="inner-text">
                                    <div class="tit">设计最爱之w3c数位板</div>
                                    <div class="info">爆款满1000减99 </div>
                                </div>
                                <img src="${ctx}/shangcheng/uploads/sy/18.jpg" alt="" />
                            </a>
                            <a class="grid grid-m" href="">
                                <div class="inner-text">
                                    <div class="tit">设计最爱之w3c数位板</div>
                                    <div class="info">爆款满1000减99 </div>
                                </div>
                                <img src="${ctx}/shangcheng/uploads/sy/32.jpg" alt="" />
                            </a>
                        </div>
                        <div class="col">
                            <a class="grid grid-s" href="${ctx}/shop/goods-detail">
                                <div class="inner-text">
                                    <div class="tit">设计最爱之w3c数位板</div>
                                    <div class="info">爆款满1000减99 </div>
                                </div>
                                <img src="${ctx}/shangcheng/uploads/sy/19.jpg" alt="" />
                            </a>
                            <a class="grid grid-s" href="${ctx}/shop/goods-detail">
                                <div class="inner-text">
                                    <div class="tit">设计最爱之w3c数位板</div>
                                    <div class="info">爆款满1000减99 </div>
                                </div>
                                <img src="${ctx}/shangcheng/uploads/sy/19.jpg" alt="" />
                            </a>
                            <a class="grid grid-s" href="${ctx}/shop/goods-detail">
                                <div class="inner-text">
                                    <div class="tit">设计最爱之w3c数位板</div>
                                    <div class="info">爆款满1000减99 </div>
                                </div>
                                <img src="${ctx}/shangcheng/uploads/sy/19.jpg" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="floor-section floor4">
                <div class="section-hd">
                    <div class="title">商城超市</div>
                    <div class="bar more">
                        <a href="">粮油干货</a><a href="">牛奶冲调</a><a href="">保健滋补</a><a href="">纸品清洁</a><a href="">居家家纺</a><a href="">家居日用</a>
                    </div>
                </div>
                <div class="section-bd clearfix">
                    <div class="section-side">
                        <div class="banner">
                            <a href=""><img src="${ctx}/shangcheng/uploads/shengxian/30.jpg" alt="" /></a>
                        </div>
                        <div class="category">
                           <div class="tit">商城超市</div>
                            <div class="row">
                                <div class="col col-6"><a href="" class="item">食品饮料</a></div>
                                <div class="col col-6"><a href="" class="item">食品饮料</a></div>
                                <div class="col col-6"><a href="" class="item">食品饮料</a></div>
                                <div class="col col-6"><a href="" class="item">食品饮料</a></div>
                                <div class="col col-6"><a href="" class="item">食品饮料</a></div>
                                <div class="col col-6"><a href="" class="item">食品饮料</a></div>
                                <div class="col col-6"><a href="" class="item">食品饮料</a></div>
                                <div class="col col-6"><a href="" class="item">食品饮料</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="section-cont">
                        <div class="col">
                            <a class="grid grid-s" href="${ctx}/shop/goods-detail">
                                <div class="inner-text">
                                    <div class="tit">设计最爱之w3c数位板</div>
                                    <div class="info">爆款满1000减99 </div>
                                </div>
                                <img src="${ctx}/shangcheng/uploads/sy/19.jpg" alt="" />
                            </a>
                            <a class="grid grid-s" href="${ctx}/shop/goods-detail">
                                <div class="inner-text">
                                    <div class="tit">设计最爱之w3c数位板</div>
                                    <div class="info">爆款满1000减99 </div>
                                </div>
                                <img src="${ctx}/shangcheng/uploads/sy/19.jpg" alt="" />
                            </a>
                            <a class="grid grid-s" href="${ctx}/shop/goods-detail">
                                <div class="inner-text">
                                    <div class="tit">设计最爱之w3c数位板</div>
                                    <div class="info">爆款满1000减99 </div>
                                </div>
                                <img src="${ctx}/shangcheng/uploads/sy/19.jpg" alt="" />
                            </a>
                        </div>
                        <div class="col">
                            <a class="grid grid-b" href="">
                                <div class="inner-text">
                                    <div class="tit">设计最爱之w3c数位板</div>
                                    <div class="info">爆款满1000减99 </div>
                                </div>
                                <img src="${ctx}/shangcheng/uploads/sy/18.jpg" alt="" />
                            </a>
                            <a class="grid grid-m" href="">
                                <div class="inner-text">
                                    <div class="tit">设计最爱之w3c数位板</div>
                                    <div class="info">爆款满1000减99 </div>
                                </div>
                                <img src="${ctx}/shangcheng/uploads/sy/32.jpg" alt="" />
                            </a>
                        </div>
                        <div class="col">
                            <a class="grid grid-s" href="${ctx}/shop/goods-detail">
                                <div class="inner-text">
                                    <div class="tit">设计最爱之w3c数位板</div>
                                    <div class="info">爆款满1000减99 </div>
                                </div>
                                <img src="${ctx}/shangcheng/uploads/sy/19.jpg" alt="" />
                            </a>
                            <a class="grid grid-s" href="${ctx}/shop/goods-detail">
                                <div class="inner-text">
                                    <div class="tit">设计最爱之w3c数位板</div>
                                    <div class="info">爆款满1000减99 </div>
                                </div>
                                <img src="${ctx}/shangcheng/uploads/sy/19.jpg" alt="" />
                            </a>
                            <a class="grid grid-s" href="${ctx}/shop/goods-detail">
                                <div class="inner-text">
                                    <div class="tit">设计最爱之w3c数位板</div>
                                    <div class="info">爆款满1000减99 </div>
                                </div>
                                <img src="${ctx}/shangcheng/uploads/sy/19.jpg" alt="" />
                            </a>
                        </div>
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
                    <div class="phone">400-889-8188</div>
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
    $('.home-full-banner').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        dots: true,
        fade: true
      });

    +function () {
        var bigH=$('.side-category').height();
        $(window).on('scroll resize load',function () {
            var sTop=$(this).scrollTop(),
            valve=$('.home-full-banner').offset().top+$('.home-full-banner').height(),
            wH=$(this).height();

            //控制导航显示
            if (sTop>valve) {
                $('.side-category').show();
            }
            else {
                $('.side-category').hide();
            }
        })
    }();
     zAction.add({
        'category-toggle':function () {
            if ($(this).hasClass('on')) {
                $(this).removeClass('on').prev().slideDown(200);
            }
            else {
                $(this).addClass('on').prev().slideUp(200);
            }
        },

    });

    $(".grid").click(function () {
        location.href="${ctx}/shop/goods-detail?userId=${param.userId}&token=${param.token}&userName=${param.userName}"
    })
    $(".flash-sale.clearfix").click(function () {
        location.href="${ctx}/shop/goods-detail?userId=${param.userId}&token=${param.token}&userName=${param.userName}"
    })

</script>
</html>