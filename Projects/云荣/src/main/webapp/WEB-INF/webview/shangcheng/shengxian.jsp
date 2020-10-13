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
                <img src="${ctx}/shangcheng/img/logo4.png" alt="" />
            </a>
            <span class="channel">生鲜</span>
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
                <li><a href="${ctx}/shop/dianqi">电器</a></li>
                <li class="active"><a href="${ctx}/shop/shengxian">生鲜</a></li
            </ul>
        </div>
    </div>
    <!--头部-->

    <div class="wrapper">
        <div class="category-menu">
            <div class="f-item">
                <div class="f-tit">新鲜水果</div>
                <div class="f-list">
                    <a href="${ctx}/shop/search-goods">水果</a><a href="${ctx}/shop/search-goods">蔬菜</a><a href="${ctx}/shop/search-goods">进口水果</a><a href="${ctx}/shop/search-goods">芒果</a><a href="${ctx}/shop/search-goods">苹果</a>
                </div>
                <div class="c-box">
                    <div class="c-list">
                        <div class="dl">
                            <div class="dt">水果</div>
                            <div class="dd">
                                <a href="${ctx}/shop/search-goods">车厘子/樱桃</a>
                                <a href="${ctx}/shop/search-goods">橙类</a>
                                <a href="${ctx}/shop/search-goods">柚类</a>
                                <a href="${ctx}/shop/search-goods">柠檬</a>
                                <a href="${ctx}/shop/search-goods">苹果</a>
                            </div>
                        </div>
                        <div class="dl">
                            <div class="dt">蔬菜</div>
                            <div class="dd">
                                <a href="${ctx}/shop/search-goods">有机蔬菜</a>
                                <a href="${ctx}/shop/search-goods">根茎/瓜类</a>
                                <a href="${ctx}/shop/search-goods">菌菇类</a>
                                <a href="${ctx}/shop/search-goods">叶菜</a>
                                <a href="${ctx}/shop/search-goods">茄果/花菜/豆</a>
                                <a href="${ctx}/shop/search-goods">特色蔬菜</a>
                                <a href="${ctx}/shop/search-goods">加工蔬菜</a>
                                <a href="${ctx}/shop/search-goods">礼盒/券</a>
                            </div>
                        </div>
                    </div>
                    <a class="b-img">
                        <img src="${ctx}/shangcheng/uploads/46.jpg" alt="" />
                    </a>
                </div>
            </div>
            <div class="f-item">
                <div class="f-tit">新鲜水果</div>
                <div class="f-list">
                    <a href="search-goods.html">水果</a><a href="search-goods.html">蔬菜</a><a href="search-goods.html">进口水果</a><a href="search-goods.html">芒果</a><a href="search-goods.html">苹果</a>
                </div>
            </div>
            <div class="f-item">
                <div class="f-tit">新鲜水果</div>
                <div class="f-list">
                    <a href="search-goods.html">水果</a><a href="search-goods.html">蔬菜</a><a href="search-goods.html">进口水果</a><a href="search-goods.html">芒果</a><a href="search-goods.html">苹果</a>
                </div>
            </div>
            <div class="f-item">
                <div class="f-tit">新鲜水果</div>
                <div class="f-list">
                    <a href="search-goods.html">水果</a><a href="search-goods.html">蔬菜</a><a href="search-goods.html">进口水果</a><a href="search-goods.html">芒果</a><a href="search-goods.html">苹果</a>
                </div>
            </div>

        </div>
        <div class="home-banner">
            <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/banner-sxtc.jpg" alt="" /></a>
            <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/banner-sxtc.jpg" alt="" /></a>
        </div>
        <div class="home-banner-ad">
            <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/39.jpg" alt="" /></a>
            <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/40.jpg" alt="" /></a>
        </div>
    </div>

    <div class="wrapper">
        <div class="home-promot">
            <div class="home-promot-tit">口碑甄选</div>
            <div class="clearfix">
                <div class="list-x">
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/41.jpg" alt="" /></a>
                        <div class="info">
                            <div class="name"><a href="goods-detail.html">岭南荔枝 妃子笑</a></div>
                            <div class="price">￥19.80</div>
                        </div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/41a.jpg" alt="" /></a>
                        <div class="info">
                            <div class="name"><a href="goods-detail.html">岭南荔枝 妃子笑</a></div>
                            <div class="price">￥19.80</div>
                        </div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/41b.jpg" alt="" /></a>
                        <div class="info">
                            <div class="name"><a href="goods-detail.html">岭南荔枝 妃子笑</a></div>
                            <div class="price">￥19.80</div>
                        </div>
                    </div>
                </div>
                <div class="list-y">
                    <a href="goods-detail.html" class="item"><img src="${ctx}/shangcheng/uploads/shengxian/42.jpg" alt="" /></a>
                    <a href="goods-detail.html" class="item"><img src="${ctx}/shangcheng/uploads/shengxian/42.jpg" alt="" /></a>
                </div>
            </div>
        </div>
    </div>

    <div class="today-special">
        <div class="wrapper">
            <div class="today-special-hd">
                <div class="tit">今日特惠</div>
                <div class="slogan">
                    限时钜惠&nbsp;新鲜特供&nbsp;浓郁美味&nbsp;来这儿尝鲜
                </div>
            </div>
            <div class="today-special-slider">
                <div>
                    <div class="item">
                        <div class="cont">
                            <div class="name"><a href="goods-detail.html">千喜鹤 精选猪肉 肋排 500g</a></div>
                            <div class="desc">肉香浓郁 味道鲜美</div>
                            <div class="price">29.00元</div>
                            <a href="javascript:;" class="add-cart"><i class="iconfont icon-cart2"></i>加入购物车</a>
                        </div>
                        <a href=""><img src="${ctx}/shangcheng/uploads/shengxian/43.jpg" alt="" class="figure" /></a>
                    </div>
                </div>
                <div>
                    <div class="item">
                        <div class="cont">
                            <div class="name"><a href="goods-detail.html">金堂馆 金堂夏橙子5斤装</a></div>
                            <div class="desc">肉香浓郁 味道鲜美</div>
                            <div class="price">29.00元</div>
                            <a href="javascript:;" class="add-cart"><i class="iconfont icon-cart2"></i>加入购物车</a>
                        </div>
                        <a href=""><img src="${ctx}/shangcheng/uploads/shengxian/44.jpg" alt="" class="figure" /></a>
                    </div>
                </div>
                <div>
                    <div class="item">
                        <div class="cont">
                            <div class="name"><a href="goods-detail.html">千喜鹤 精选猪肉 肋排 500g</a></div>
                            <div class="desc">肉香浓郁 味道鲜美</div>
                            <div class="price">29.00元</div>
                            <a href="javascript:;" class="add-cart"><i class="iconfont icon-cart2"></i>加入购物车</a>
                        </div>
                        <a href=""><img src="${ctx}/shangcheng/uploads/shengxian/45.jpg" alt="" class="figure" /></a>
                    </div>
                </div>
                <div>
                    <div class="item">
                        <div class="cont">
                            <div class="name"><a href="goods-detail.html">千喜鹤 精选猪肉 肋排 500g</a></div>
                            <div class="desc">肉香浓郁 味道鲜美</div>
                            <div class="price">29.00元</div>
                            <a href="javascript:;" class="add-cart"><i class="iconfont icon-cart2"></i>加入购物车</a>
                        </div>
                        <a href=""><img src="${ctx}/shangcheng/uploads/shengxian/45.jpg" alt="" class="figure" /></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="home-main">
        <div class="wrapper">

            <div class="home-tit">
                <div class="tit">新鲜事</div>
            </div>
            <div class="fresh-news">
                <div class="col col1">
                    <div class="col-tit">教你做菜</div>
                    <div class="video-con">
                        <img src="${ctx}/shangcheng/uploads/shengxian/47.jpg" alt="" />
                    </div>
                    <div class="intro">
                        <div class="hd">
                            <i class="arrow"></i>
                            <a href=""><img class="hdpic" src="${ctx}/shangcheng/uploads/shengxian/9.jpg" alt="" /></a>
                        </div>
                        <div class="bd">
                            <div class="name">火龙果炒虾仁</div>
                            <div class="desc">《全世界最简单的西餐》一书中的法式沙拉，由于食材用的很少，说以。。</div>
                        </div>
                    </div>
                </div>
                <div class="col col2">
                    <div class="col-tit">限时抢购</div>
                    <div class="name"><a href="">挪威进口冰冻三文鱼排 500g 中段切片</a></div>
                    <div class="desc">冷冻海鲜 口感美味</div>
                    <a class="buy" href="">立即抢购</a>
                    <a href=""><img class="figure" src="${ctx}/shangcheng/uploads/shengxian/48.jpg" alt="" class="figure" /></a>
                </div>
                <div class="col col3">
                    <div class="col-tit">资讯</div>
                    <a href=""><img src="${ctx}/shangcheng/uploads/shengxian/49.jpg" alt="" class="figure" /></a>
                    <div class="tit"><a href="">吃子之心</a></div>
                    <div class="desc">我们吃货有bigger！我们的目标是是吃遍海陆空，吃全苦辣甜,吃到天荒地老</div>
                </div>
            </div>

            <div class="home-tit">
                <span class="ico sg"></span>
                <div class="tit">新鲜水果</div>
                <div class="more">
                    <a href="">樱桃</a>
                    <a href="">椰青</a>
                    <a href="">火龙果</a>
                    <a href="">夏橙</a>
                    <a href="">牛油果</a>
                    <a href="">佳沛</a>
                    <a href="">新奇士</a>
                    <a href="">加工蔬菜</a>
                    <a href="">根茎•瓜类</a>
                </div>
            </div>
            <div class="home-floor clearfix">
                <div class="floor-ad">
                    <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/50.jpg" alt="" /></a>
                </div>
                <div class="floor-goods">
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                </div>
            </div>

            <div class="home-tit">
                <span class="ico hx"></span>
                <div class="tit">海鲜水产</div>
                <div class="more">
                    <a href="">樱桃</a>
                    <a href="">椰青</a>
                    <a href="">火龙果</a>
                    <a href="">夏橙</a>
                    <a href="">牛油果</a>
                    <a href="">佳沛</a>
                    <a href="">新奇士</a>
                    <a href="">加工蔬菜</a>
                    <a href="">根茎•瓜类</a>
                </div>
            </div>
            <div class="home-floor clearfix">
                <div class="floor-ad">
                    <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/50.jpg" alt="" /></a>
                </div>
                <div class="floor-goods">
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                </div>
            </div>

            <div class="home-tit">
                <span class="ico xr"></span>
                <div class="tit">精选鲜肉</div>
                <div class="more">
                    <a href="">樱桃</a>
                    <a href="">椰青</a>
                    <a href="">火龙果</a>
                    <a href="">夏橙</a>
                    <a href="">牛油果</a>
                    <a href="">佳沛</a>
                    <a href="">新奇士</a>
                    <a href="">加工蔬菜</a>
                    <a href="">根茎•瓜类</a>
                </div>
            </div>
            <div class="home-floor clearfix">
                <div class="floor-ad">
                    <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/50.jpg" alt="" /></a>
                </div>
                <div class="floor-goods">
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                </div>
            </div>

            <div class="home-tit">
                <span class="ico sc"></span>
                <div class="tit">蔬菜蛋品</div>
                <div class="more">
                    <a href="">樱桃</a>
                    <a href="">椰青</a>
                    <a href="">火龙果</a>
                    <a href="">夏橙</a>
                    <a href="">牛油果</a>
                    <a href="">佳沛</a>
                    <a href="">新奇士</a>
                    <a href="">加工蔬菜</a>
                    <a href="">根茎•瓜类</a>
                </div>
            </div>
            <div class="home-floor clearfix">
                <div class="floor-ad">
                    <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/50.jpg" alt="" /></a>
                </div>
                <div class="floor-goods">
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
                    </div>
                    <div class="item">
                        <a href="goods-detail.html"><img src="${ctx}/shangcheng/uploads/shengxian/51.jpg" alt="" class="figure" /></a>
                        <div class="name"><a href="goods-detail.html">珍享 美国进口新奇士脐橙</a></div>
                        <div class="price">59.90元</div>
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
        dots: true
      });

    $('.today-special-slider').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 3,
        draggable: false
      });

</script>
</html>