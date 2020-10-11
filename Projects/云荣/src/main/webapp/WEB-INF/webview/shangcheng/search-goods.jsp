<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta charset="utf-8">
    <meta http-equiv="Cache-Control" content="no-siteapp">
    <title>商品搜索列表页</title>
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
        <div class="wrapper header">
            <a href="${ctx}/shop/index" class="logo">
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
                    <span class="tel">400-889-8188</span>
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
                <li class="active"><a href="${ctx}/shop/index">首页</a></li>
                <li><a href="${ctx}/shop/dianqi">电器</a></li>
                <li><a href="${ctx}/shop/shengxian">生鲜</a></li>
            </ul>
        </div>
    </div>
<!--头部-->
    <div class="wrapper router">
        <ul class="router-nav">
            <li><a href="">首页</a></li>
            <li><span class="divider"></span></li>
            <li><span>全部搜索结果</span></li>
        </ul>
        <div class="sch-result">
            <span class="tag">平板电视</span><span class="fl">共<span class="num">218</span>个产品</span>
        </div>
    </div>

    <div class="filter-box">
        <div class="wrapper">
            <div class="sch-prop sch-brand">
                <div class="sch-key">品牌：</div>
                <div class="sch-value clearfix">
                    <div class="item">
                        <a class="inner" href="">
                            <img src="${ctx}/shangcheng/uploads/sy/24.jpg" alt="" />
                            <div class="name">美的</div>
                        </a>
                    </div>
                    <div class="item">
                        <a class="inner" href="">
                            <img src="${ctx}/shangcheng/uploads/sy/25.jpg" alt="" />
                            <div class="name">三星</div>
                        </a>
                    </div>
                    <div class="item">
                        <a class="inner" href="">
                            <img src="${ctx}/shangcheng/uploads/sy/26.jpg" alt="" />
                            <div class="name">阿迪达斯</div>
                        </a>
                    </div>
                    <div class="item">
                        <a class="inner" href="">
                            <img src="${ctx}/shangcheng/uploads/sy/24.jpg" alt="" />
                            <div class="name">美的</div>
                        </a>
                    </div>
                    <div class="item">
                        <a class="inner" href="">
                            <img src="${ctx}/shangcheng/uploads/sy/25.jpg" alt="" />
                            <div class="name">三星</div>
                        </a>
                    </div>
                    <div class="item">
                        <a class="inner" href="">
                            <img src="${ctx}/shangcheng/uploads/sy/26.jpg" alt="" />
                            <div class="name">阿迪达斯</div>
                        </a>
                    </div>
                    <div class="item">
                        <a class="inner" href="">
                            <img src="${ctx}/shangcheng/uploads/sy/24.jpg" alt="" />
                            <div class="name">美的</div>
                        </a>
                    </div>
                    <div class="item">
                        <a class="inner" href="">
                            <img src="${ctx}/shangcheng/uploads/sy/25.jpg" alt="" />
                            <div class="name">三星</div>
                        </a>
                    </div>
                    <div class="item">
                        <a class="inner" href="">
                            <img src="${ctx}/shangcheng/uploads/sy/26.jpg" alt="" />
                            <div class="name">阿迪达斯</div>
                        </a>
                    </div>
                    <div class="item">
                        <a class="inner" href="">
                            <img src="${ctx}/shangcheng/uploads/sy/24.jpg" alt="" />
                            <div class="name">美的</div>
                        </a>
                    </div>
                    <div class="item">
                        <a class="inner" href="">
                            <img src="${ctx}/shangcheng/uploads/sy/25.jpg" alt="" />
                            <div class="name">三星</div>
                        </a>
                    </div>
                    <div class="item">
                        <a class="inner" href="">
                            <img src="${ctx}/shangcheng/uploads/sy/26.jpg" alt="" />
                            <div class="name">阿迪达斯</div>
                        </a>
                    </div>
                    <div class="item">
                        <a class="inner" href="">
                            <img src="${ctx}/shangcheng/uploads/sy/24.jpg" alt="" />
                            <div class="name">美的</div>
                        </a>
                    </div>
                    <div class="item">
                        <a class="inner" href="">
                            <img src="${ctx}/shangcheng/uploads/sy/25.jpg" alt="" />
                            <div class="name">三星</div>
                        </a>
                    </div>
                    <div class="item">
                        <a class="inner" href="">
                            <img src="${ctx}/shangcheng/uploads/sy/26.jpg" alt="" />
                            <div class="name">阿迪达斯</div>
                        </a>
                    </div>
                    <div class="item">
                        <a class="inner" href="">
                            <img src="${ctx}/shangcheng/uploads/sy/24.jpg" alt="" />
                            <div class="name">美的</div>
                        </a>
                    </div>
                    <div class="item">
                        <a class="inner" href="">
                            <img src="${ctx}/shangcheng/uploads/sy/25.jpg" alt="" />
                            <div class="name">三星</div>
                        </a>
                    </div>
                    <div class="item">
                        <a class="inner" href="">
                            <img src="${ctx}/shangcheng/uploads/sy/26.jpg" alt="" />
                            <div class="name">阿迪达斯</div>
                        </a>
                    </div>
                    <div class="item">
                        <a class="inner" href="">
                            <img src="${ctx}/shangcheng/uploads/sy/24.jpg" alt="" />
                            <div class="name">美的</div>
                        </a>
                    </div>
                    <div class="item">
                        <a class="inner" href="">
                            <img src="${ctx}/shangcheng/uploads/sy/25.jpg" alt="" />
                            <div class="name">三星</div>
                        </a>
                    </div>
                    <div class="item">
                        <a class="inner" href="">
                            <img src="${ctx}/shangcheng/uploads/sy/26.jpg" alt="" />
                            <div class="name">阿迪达斯</div>
                        </a>
                    </div>
                    <div class="item">
                        <a class="inner" href="">
                            <img src="${ctx}/shangcheng/uploads/sy/24.jpg" alt="" />
                            <div class="name">美的</div>
                        </a>
                    </div>
                    <div class="item">
                        <a class="inner" href="">
                            <img src="${ctx}/shangcheng/uploads/sy/25.jpg" alt="" />
                            <div class="name">三星</div>
                        </a>
                    </div>
                    <div class="item">
                        <a class="inner" href="">
                            <img src="${ctx}/shangcheng/uploads/sy/26.jpg" alt="" />
                            <div class="name">阿迪达斯</div>
                        </a>
                    </div>
                    <div class="item">
                        <a class="inner" href="">
                            <img src="${ctx}/shangcheng/uploads/sy/25.jpg" alt="" />
                            <div class="name">三星</div>
                        </a>
                    </div>
                    <div class="item">
                        <a class="inner" href="">
                            <img src="${ctx}/shangcheng/uploads/sy/26.jpg" alt="" />
                            <div class="name">阿迪达斯</div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="sch-prop clearfix">
                <div class="sch-key">价格：</div>
                <div class="sch-value clearfix">
                    <a href="">1-1999</a><a href="">2000-3999</a><a href="">4000-5999</a><a href="">6000-9999</a><a href="">10000-14999</a><a href="">15000以上</a>
                </div>
            </div>
            <div class="sch-prop clearfix">
                <div class="sch-key">选购指数：</div>
                <div class="sch-value clearfix">
                    <a href="">8分以上 </a><a href=""> 8-7 </a><a href=""> 7-6  </a><a href="">6-5 </a><a href="">5分以下</a>
                </div>
            </div>
            <div class="sch-prop clearfix">
                <div class="sch-key">屏幕尺寸：</div>
                <div class="sch-value clearfix">
                    <a href="">70英寸及以上</a><a href="">70英寸及以上</a><a href="">70英寸及以上</a><a href="">70英寸及以上</a><a href="">70英寸及以上</a><a href="">70英寸及以上</a>
                    <a href="">70英寸及以上</a><a href="">70英寸及以上</a><a href="">70英寸及以上</a><a href="">70英寸及以上</a><a href="">70英寸及以上</a><a href="">70英寸及以上</a>
                </div>
            </div>
            <div class="sch-prop clearfix">
                <div class="sch-key">分辨率：</div>
                <div class="sch-value clearfix">
                    <a href="">4K超高清 </a><a href="">4K超高清 </a><a href="">4K超高清 </a>
                </div>
            </div>
            <div class="sch-prop clearfix">
                <div class="sch-key">能效等级：</div>
                <div class="sch-value clearfix">
                    <a href="">一级能效</a><a href="">一级能效</a><a href="">一级能效</a>
                </div>
            </div>
            <div class="sch-prop clearfix">
                <div class="sch-key">大家说：</div>
                <div class="sch-value clearfix">
                    <a href="">电视不错</a><a href="">送货快</a><a href="">画面清晰</a><a href="">价格便宜</a>
                </div>
            </div>
        </div>
    </div>

    <div class="sg-main wrapper">
        <div class="sg-content">
            <div class="rank-menu">
                <div class="rank">
                    <div class="r-item"><a href="">销量</a></div>
                    <div class="r-item"><a class="active" href="">价格<span class="sort-arrow"></span></a></div>
                    <div class="r-item"><a href="">人气</a></div>
                    <div class="r-item">
                        <a href="">上架时间<span class="sort-arrow desc"></span></a>
                        <div class="sch">
                            <input type="text" class="txtin" /><span class="divider">-</span><input type="text" class="txtin" /><button class="tj ui-btn-theme">确定</button>
                        </div>
                    </div>
                </div>
                <div class="help">
                    <label class="check"><input type="checkbox" name="" id="" />仅显示有货商品</label>
                    <span class="info">共<span>12个</span>商品</span>
                    <div class="r-page">
                        <a class="prev" href="">上一页</a><a class="next" href="">下一页</a>
                    </div>
                </div>
            </div>
            <div class="sg-list clearfix">
                <div class="col col-3">
                    <div class="item">
                        <div class="inner">
                            <a href="${ctx}/shop/goods-detail"><img class="figure" src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" /></a>
                            <a href="${ctx}/shop/goods-detail"><div class="name">三星 UA55JU6800JXXZ 超高清网络智能量子点曲面电视机</div><div class="price">6099元</div></a>
                            <a class="act" href=""><i class="iconfont icon-cart"></i>加入购物车</a>
                        </div>
                    </div>
                </div>
                <div class="col col-3">
                    <div class="item">
                        <div class="inner">
                            <a href="${ctx}/shop/goods-detail"><img class="figure" src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" /></a>
                            <a href=${ctx}/shop/goods-detail"><div class="name">三星 UA55JU6800JXXZ 超高清网络智能量子点曲面电视机</div><div class="price">6099元</div></a>
                            <a class="act" href=""><i class="iconfont icon-cart"></i>加入购物车</a>
                        </div>
                    </div>
                </div>
                <div class="col col-3">
                    <div class="item">
                        <div class="inner">
                            <a href="${ctx}/shop/goods-detail"><img class="figure" src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" /></a>
                            <a href="${ctx}/shop/goods-detail"><div class="name">三星 UA55JU6800JXXZ 超高清网络智能量子点曲面电视机</div><div class="price">6099元</div></a>
                            <a class="act" href=""><i class="iconfont icon-cart"></i>加入购物车</a>
                        </div>
                    </div>
                </div>
                <div class="col col-3">
                    <div class="item">
                        <div class="inner">
                            <a href="${ctx}/shop/goods-detail"><img class="figure" src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" /></a>
                            <a href="${ctx}/shop/goods-detail"><div class="name">三星 UA55JU6800JXXZ 超高清网络智能量子点曲面电视机</div><div class="price">6099元</div></a>
                            <a class="act" href=""><i class="iconfont icon-cart"></i>加入购物车</a>
                        </div>
                    </div>
                </div>
                <div class="col col-3">
                    <div class="item">
                        <div class="inner">
                            <a href="${ctx}/shop/goods-detail"><img class="figure" src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" /></a>
                            <a href="${ctx}/shop/goods-detail"><div class="name">三星 UA55JU6800JXXZ 超高清网络智能量子点曲面电视机</div><div class="price">6099元</div></a>
                            <a class="act" href=""><i class="iconfont icon-cart"></i>加入购物车</a>
                        </div>
                    </div>
                </div>
                <div class="col col-3">
                    <div class="item">
                        <div class="inner">
                            <a href="${ctx}/shop/goods-detail"><img class="figure" src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" /></a>
                            <a href="${ctx}/shop/goods-detail"><div class="name">三星 UA55JU6800JXXZ 超高清网络智能量子点曲面电视机</div><div class="price">6099元</div></a>
                            <a class="act" href=""><i class="iconfont icon-cart"></i>加入购物车</a>
                        </div>
                    </div>
                </div>
                <div class="col col-3">
                    <div class="item">
                        <div class="inner">
                            <a href="${ctx}/shop/goods-detail"><img class="figure" src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" /></a>
                            <a href="${ctx}/shop/goods-detail"><div class="name">三星 UA55JU6800JXXZ 超高清网络智能量子点曲面电视机</div><div class="price">6099元</div></a>
                            <a class="act" href=""><i class="iconfont icon-cart"></i>加入购物车</a>
                        </div>
                    </div>
                </div>
                <div class="col col-3">
                    <div class="item">
                        <div class="inner">
                            <a href="${ctx}/shop/goods-detail"><img class="figure" src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" /></a>
                            <a href="${ctx}/shop/goods-detail"><div class="name">三星 UA55JU6800JXXZ 超高清网络智能量子点曲面电视机</div><div class="price">6099元</div></a>
                            <a class="act" href=""><i class="iconfont icon-cart"></i>加入购物车</a>
                        </div>
                    </div>
                </div>
                <div class="col col-3">
                    <div class="item">
                        <div class="inner">
                            <a href="${ctx}/shop/goods-detail"><img class="figure" src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" /></a>
                            <a href="${ctx}/shop/goods-detail"><div class="name">三星 UA55JU6800JXXZ 超高清网络智能量子点曲面电视机</div><div class="price">6099元</div></a>
                            <a class="act" href=""><i class="iconfont icon-cart"></i>加入购物车</a>
                        </div>
                    </div>
                </div>
                <div class="col col-3">
                    <div class="item">
                        <div class="inner">
                            <a href="${ctx}/shop/goods-detail"><img class="figure" src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" /></a>
                            <a href="${ctx}/shop/goods-detail"><div class="name">三星 UA55JU6800JXXZ 超高清网络智能量子点曲面电视机</div><div class="price">6099元</div></a>
                            <a class="act" href=""><i class="iconfont icon-cart"></i>加入购物车</a>
                        </div>
                    </div>
                </div>
                <div class="col col-3">
                    <div class="item">
                        <div class="inner">
                            <a href="${ctx}/shop/goods-detail"><img class="figure" src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" /></a>
                            <a href="${ctx}/shop/goods-detail"><div class="name">三星 UA55JU6800JXXZ 超高清网络智能量子点曲面电视机</div><div class="price">6099元</div></a>
                            <a class="act" href=""><i class="iconfont icon-cart"></i>加入购物车</a>
                        </div>
                    </div>
                </div>
                <div class="col col-3">
                    <div class="item">
                        <div class="inner">
                            <a href="${ctx}/shop/goods-detail"><img class="figure" src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" /></a>
                            <a href="${ctx}/shop/goods-detail"><div class="name">三星 UA55JU6800JXXZ 超高清网络智能量子点曲面电视机</div><div class="price">6099元</div></a>
                            <a class="act" href=""><i class="iconfont icon-cart"></i>加入购物车</a>
                        </div>
                    </div>
                </div>
                <div class="col col-3">
                    <div class="item">
                        <div class="inner">
                            <a href="${ctx}/shop/goods-detail"><img class="figure" src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" /></a>
                            <a href="${ctx}/shop/goods-detail"><div class="name">三星 UA55JU6800JXXZ 超高清网络智能量子点曲面电视机</div><div class="price">6099元</div></a>
                            <a class="act" href=""><i class="iconfont icon-cart"></i>加入购物车</a>
                        </div>
                    </div>
                </div>
                <div class="col col-3">
                    <div class="item">
                        <div class="inner">
                            <a href="${ctx}/shop/goods-detail"><img class="figure" src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" /></a>
                            <a href="${ctx}/shop/goods-detail"><div class="name">三星 UA55JU6800JXXZ 超高清网络智能量子点曲面电视机</div><div class="price">6099元</div></a>
                            <a class="act" href=""><i class="iconfont icon-cart"></i>加入购物车</a>
                        </div>
                    </div>
                </div>
                <div class="col col-3">
                    <div class="item">
                        <div class="inner">
                            <a href="${ctx}/shop/goods-detail"><img class="figure" src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" /></a>
                            <a href="${ctx}/shop/goods-detail"><div class="name">三星 UA55JU6800JXXZ 超高清网络智能量子点曲面电视机</div><div class="price">6099元</div></a>
                            <a class="act" href=""><i class="iconfont icon-cart"></i>加入购物车</a>
                        </div>
                    </div>
                </div>
                <div class="col col-3">
                    <div class="item">
                        <div class="inner">
                            <a href="g${ctx}/shop/goods-detail"><img class="figure" src="${ctx}/shangcheng/uploads/shengxian/51a.jpg" alt="" /></a>
                            <a href="${ctx}/shop/goods-detail"><div class="name">三星 UA55JU6800JXXZ 超高清网络智能量子点曲面电视机</div><div class="price">6099元</div></a>
                            <a class="act" href=""><i class="iconfont icon-cart"></i>加入购物车</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pages">
                <a class="page prev" href="">上一页</a>
                <a class="page" href="">1</a>
                <span class="cur-page">2</span>
                <a class="page" href="">3</a>
                <a class="page" href="">4</a>
                <i class="page-split">...</i>
                <a class="page" href="">71</a>
                <a class="page next" href="">下一页</a>
            </div>
        </div>
        <div class="sg-aside">
            <div class="sg-aside-tit">
                店铺热销
            </div>
            <div class="shop-hot">
                <div class="item">
                    <a href=""><img class="figure" src="${ctx}/shangcheng/uploads/33.jpg" alt="" /></a>
                    <div class="p-name"><a href="">飞利浦（PHILIPS）32PHF5021/T3 32英寸液</a></div>
                    <div class="price">¥5999.00</div>
                </div>
                <div class="item">
                    <a href=""><img class="figure" src="${ctx}/shangcheng/uploads/33.jpg" alt="" /></a>
                    <div class="p-name"><a href="">飞利浦（PHILIPS）32PHF5021/T3 32英寸液</a></div>
                    <div class="price">¥5999.00</div>
                </div>
                <div class="item">
                    <a href=""><img class="figure" src="${ctx}/shangcheng/uploads/33.jpg" alt="" /></a>
                    <div class="p-name"><a href="">飞利浦（PHILIPS）32PHF5021/T3 32英寸液</a></div>
                    <div class="price">¥5999.00</div>
                </div>
                <div class="item">
                    <a href=""><img class="figure" src="${ctx}/shangcheng/uploads/33.jpg" alt="" /></a>
                    <div class="p-name"><a href="">飞利浦（PHILIPS）32PHF5021/T3 32英寸液</a></div>
                    <div class="price">¥5999.00</div>
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
    <div class="side-category">
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
                    <div class="ft">
                        <a href=""><img class="ad" src="${ctx}/shangcheng/uploads/10.jpg" /></a>
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
                </div>
            </div>
            <div class="f-item">
                <div class="f-box">
                    <div class="f-tit">家用电器</div>
                    <div class="f-list">
                        <a href="">服饰内衣</a><a href="">鞋靴箱包</a>
                    </div>
                </div>
                <div class="c-box">
                </div>
            </div>
            <div class="f-item">
                <div class="f-box">
                    <div class="f-tit">生鲜特产</div>
                    <div class="f-list">
                        <a href="">食品</a><a href="">生鲜</a><a href="">特产</a><a href="">水果</a>
                    </div>
                </div>
                <div class="c-box">
                </div>
            </div>
        </div>
        <div class="side-category-ft" data-action="category-toggle">
            <span class="label tohide">收起导航</span>
            <span class="label toshow">展开导航</span>
        </div>
    </div>
</body>
<script>
    $('.check input').iCheck({
        checkboxClass: 'cart-checkbox'
    });
+function () {
    var dftLine=4,
    dftH=50; //这里品牌的比普通的一行要高，所以用品牌的做标准行高
    //
    $('.filter-box .sch-value').each(function(index, el) {
        var h=$(this).height();
        if (h>dftH) {
            $('<a class="prop-toggle"  data-action="prop-toggle" href="javascript:;">查看更多<i></i></a>').insertAfter($(this));
            $(this).addClass('slideup');
        }
    });
    $('.filter-box .sch-prop').each(function(index, el) {
        index+=1;
        if (index==dftLine) {
            $('.filter-box').append('<span class="filter-toggle" data-action="filter-toggle"><span class="tohide">收起<i></i></span><span class="toshow">更多<i></i></span></span>');
        }
        if (index>dftLine) {
            $(this).addClass('hide');
        }

    });
    zAction.add({
        'filter-toggle':function () {
            $(this).toggleClass('on').parent().toggleClass('on');
        },
        'prop-toggle':function () {
            $(this).toggleClass('on').prev('.sch-value').toggleClass('slideup')
        }
    });

}();

+function () {
        var bigH=$('.side-category').height();
        $(window).on('scroll resize load',function () {
            var sTop=$(this).scrollTop(),
            valve=$('.filter-box').offset().top+$('.filter-box').height(),
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

</script>
</html>