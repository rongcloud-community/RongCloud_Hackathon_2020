<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta charset="utf-8">
    <meta http-equiv="Cache-Control" content="no-siteapp">
    <title>商城详情页</title>
    <meta name="keywords" content="">
    <meta name="description" content="">
    <%@ include file="shoptaglib.jsp"%>
</head>
<body>
    <div class="topper">
        <div class="wrapper">
            <div class="left-bar">
                <div class="change-city"><a class="name">合肥</a><a class="toggle" href="${ctx}/shop/selectcity">[切换]</a></div>
                <div class="back-home divider">
                    <em></em><a href="${ctx}/shop/index">商城首页</a>
                </div>
                <div class="item"><a href="">商家中心</a></div>
            </div>
            <div class="right-bar">
                <div class="login-user sub-menu">
                    <a class="menu-hd" href="">007小柚子<em></em></a>
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
                <li class="active"><a href="${ctx}/shop/index">首页</a></li>
                <li><a href="${ctx}/shop/dianqi">电器</a></li>
                <li><a href="${ctx}/shop/shengxian">生鲜</a></li>
            </ul>
        </div>
    </div>
    <!--头部-->
    <div class="wrapper">
        <div class="detail-top clearfix">
            <div class="detail-goods">
                <div class="detail-show">
                    <div class="origin-show">
                        <div class="zoomup"></div>
                        <img class="big-pic" src="${ctx}/shangcheng/uploads/detail/1.jpg" alt="" />
                    </div>
                    <div class="thumb-show">
                        <span class="item"><img class="s-pic" src="uploads/detail/1.jpg" bsrc="${ctx}/shangcheng/uploads/detail/1.jpg" /></span>
                        <span class="item"><img class="s-pic" src="uploads/detail/2.jpg" bsrc="${ctx}/shangcheng/uploads/detail/2.jpg" /></span>
                        <span class="item"><img class="s-pic" src="uploads/detail/3.jpg" bsrc="${ctx}/shangcheng/uploads/detail/3.jpg" /></span>
                        <span class="item"><img class="s-pic" src="uploads/detail/4.jpg" bsrc="${ctx}/shangcheng/uploads/detail/4.jpg" /></span>
                    </div>
                    <div class="zoom-show">
                        <img src="" alt="" />
                    </div>
                </div>
                <div class="detail-info">
                    <div class="item-title">速比坤 AFBE9BSP303NW29美国进口滚筒洗衣机10.5公斤</div>
                    <div class="item-price">
                        <span class="now">￥36999.00</span><span class="dft">￥37999.00</span>
                    </div>
                    <ul class="item-data clearfix">
                        <li class="col-4">销量<span class="txt-theme ml10">27件</span></li>
                        <li class="col-4">好评率<span class="txt-theme ml10">99%</span></li>
                        <li class="col-4">收藏<span class="txt-theme ml10">228人</span></li>
                    </ul>
                    <div class="sku-info">
                        <div class="prop">
                            <div class="dt">颜色：</div>
                            <div class="dd">
                                <ul class="chose-img">
                                    <li><a href=""><img src="${ctx}/shangcheng/uploads/detail/1.jpg" alt="" /></a></li>
                                    <li><a class="active" href=""><img src="${ctx}/shangcheng/uploads/detail/2.jpg" alt="" /></a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="prop">
                            <div class="dt">尺寸：</div>
                            <div class="dd">
                                <ul class="chose-common">
                                    <li><a href="">M</a></li>
                                    <li><a class="active" href="">S</a></li>
                                    <li><a class="disable" href="">XL</a></li>
                                    <li><a href="">XXL</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="prop">
                            <div class="dt">数量：</div>
                            <div class="dd">
                                <div class="mod-numbox chose-num" data-max="30">
                                    <span class="count-minus"></span>
                                    <input class="count-input" value="1"  type="text" name="num" />
                                    <span class="count-plus"></span>
                                </div>
                                <span>（限购30件）</span>
                                <div class="stock">(库存102件)</div>
                            </div>
                        </div>
                    </div>
                    <div class="item-action">
                        <a class="buy-now">立即购买</a>
                        <a class="add-cart" data-chatid="ai1n312on2313n">进入讨论组</a>
                    </div>
                    <div class="item-extend">
                        <!-- <a href="" class="fav"><i class="iconfont icon-star"></i>收藏</a> -->
                        <a href="" class="fav">已收藏</a>
                        <a href="" class="share"><i class="iconfont icon-fenxiang"></i>分享</a>
                    </div>
                </div>
            </div>
            <div class="detail-shop">
                <div class="clearfix">
                    <a class="shop-brand" href="">
                        <img src="${ctx}/shangcheng/uploads/1.png" alt="" />
                    </a>
                    <div class="shop-intro">
                        <div class="shop-name">码上好</div>
                        <a class="shop-follow-btn active" href="javascript:;"><span class="showtxt"><i class="iconfont icon-check01"></i>已关注</span><span class="hidetxt">取消关注</span></a>
                        <div class="shop-follow-count"><strong>268</strong>粉丝</div>
                    </div>
                </div>
                <div class="shop-assess clearfix">
                    <div class="col col-3">
                        <div class="tit">描&ensp;述</div>
                        <div class="point">
                            <span class="num">4.8</span><i class="iconfont">--</i>
                        </div>
                    </div>
                    <div class="col col-3">
                        <div class="tit">质&ensp;量</div>
                        <div class="point up">
                            <span class="num">5.0</span><i class="iconfont">--</i>
                        </div>
                    </div>
                    <div class="col col-3">
                        <div class="tit">服&ensp;务</div>
                        <div class="point down">
                            <span class="num">5.0</span><i class="iconfont">--</i>
                        </div>
                    </div>
                    <div class="col col-3">
                        <div class="tit">发&ensp;货</div>
                        <div class="point">
                            <span class="num">5.0</span><i class="iconfont">--</i>
                        </div>
                    </div>
                </div>
                <ul class="shop-info">
                    <li>所在地区：江苏南京</li>
                    <li>商品数量：5</li>
                    <li>销售数量：602</li>
                    <li>店铺资质：<img class="ico" src="${ctx}/shangcheng/img/ico/approve.png" alt="" /></li>
                </ul>
                <a class="detail-shop-enter">
                    <i class="iconfont icon-dianpu"></i>进入店铺
                </a>
            </div>
        </div>
        <!-- 商品推荐 -->
        <div class="ui-tabs">
            <span class="item active">店长推荐</span>
        </div>
        <ul class="detail-rec clearfix">
            <li>
                <a href="" class="figure"><img src="${ctx}/shangcheng/uploads/detail/2.jpg" alt="" /></a>
                <div class="name"><a href="">美国进口滚筒洗衣机</a></div>
                <div class="price">￥119.00</div>
            </li>
            <li>
                <a href="" class="figure"><img src="${ctx}/shangcheng/uploads/detail/2.jpg" alt="" /></a>
                <div class="name"><a href="">美国进口滚筒洗衣机</a></div>
                <div class="price">￥119.00</div>
            </li>
            <li>
                <a href="" class="figure"><img src="${ctx}/shangcheng/uploads/detail/2.jpg" alt="" /></a>
                <div class="name"><a href="">美国进口滚筒洗衣机</a></div>
                <div class="price">￥119.00</div>
            </li>
            <li>
                <a href="" class="figure"><img src="${ctx}/shangcheng/uploads/detail/2.jpg" alt="" /></a>
                <div class="name"><a href="">美国进口滚筒洗衣机</a></div>
                <div class="price">￥119.00</div>
            </li>
            <li>
                <a href="" class="figure"><img src="${ctx}/shangcheng/uploads/detail/2.jpg" alt="" /></a>
                <div class="name"><a href="">美国进口滚筒洗衣机</a></div>
                <div class="price">￥119.00</div>
            </li>
        </ul>
        <!-- 商品推荐 -->

        <div class="detail-bottom clearfix">
             <div class="detail-main">
                <div class="detail-tabs">
                    <a class="item" href="javascript:;">详情描述</a>
                    <a class="item" href="javascript:;">规格参数</a>
                    <a class="item" href="javascript:;">商品评价</a>
                </div>
                <div class="tab-con">
                    <div class="mod-type-cont">
                        <img src="${ctx}/shangcheng/uploads/detail/6.jpg" alt="" />
                        <img src="${ctx}/shangcheng/uploads/detail/detailImg1.jpg" alt="" />
                        <img src="${ctx}/shangcheng/uploads/detail/detailImg2.jpg" alt="" />
                        <img src="${ctx}/shangcheng/uploads/detail/detailImg3.jpg" alt="" />
                        <img src="${ctx}/shangcheng/uploads/detail/detailImg4.jpg" alt="" />
                        <img src="${ctx}/shangcheng/uploads/detail/detailImg5.jpg" alt="" />
                        <img src="${ctx}/shangcheng/uploads/detail/detailImg7.jpg" alt="" />
                        
                    </div>
                </div>
                <div class="tab-con">
                    <div class="detail-stand">
                        <div class="tit">主体规格参数</div>
                        <div class="attr">
                            <div class="name">品牌</div>
                            <div class="value">Sacon帅康</div>
                        </div>
                        <div class="attr">
                            <div class="name">品牌</div>
                            <div class="value">Sacon帅康</div>
                        </div>
                        <div class="attr">
                            <div class="name">品牌</div>
                            <div class="value">Sacon帅康</div>
                        </div>
                        <div class="attr">
                            <div class="name">品牌</div>
                            <div class="value">Sacon帅康</div>
                        </div>
                        <div class="attr">
                            <div class="name">品牌</div>
                            <div class="value">Sacon帅康</div>
                        </div>
                    </div>
                </div>
                <div class="tab-con">
                    <div class="detail-pj">
                        <div class="detail-pj-nav list clearfix">
                            <div class="col col1">评价心得</div>
                            <div class="col col2">满意度</div>
                            <div class="col col3">商品信息</div>
                            <div class="col col4">评价用户</div>
                        </div>
                        <div class="detail-pj-cont">
                            <div class="reply list clearfix">
                                <div class="col col1">不错，一次完美购物<span class="time">2016-02-23  15:56</span></div>
                                <div class="col col2">[好评]</div>
                                <div class="col col3">尺码:XL<br>颜色分类：灰色</div>
                                <div class="col col4"><img class="hdpic" width="40" height="40" src=""><div>糖果</div></div>
                            </div>
                            <div class="reply list clearfix">
                                <div class="col col1">不错，一次完美购物<span class="time">2016-02-23  15:56</span></div>
                                <div class="col col2">[好评]</div>
                                <div class="col col3">尺码:XL<br>颜色分类：灰色</div>
                                <div class="col col4"><img class="hdpic" width="40" height="40" src=""><div>糖果</div></div>
                            </div>
                        </div>
                        <div class="pages mb30">
                            <a class="prev" href="">上一页</a>
                            <a href="">1</a>
                            <span>2</span>
                            <a href="">3</a>
                            <a href="">4</a>
                            <i>...</i>
                            <a href="">71</a>
                            <a class="next" href="">下一页</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="detail-aside">
                <div class="detail-aside-box mb15">
                    <div class="big-tit">商品分类</div>
                    <div class="detail-menu">
                        <div class="item">
                            <div class="type" data-action="shopd-type"><span class="iconfont"></span><a href="">电视</a></div>
                            <ul class="c-type">
                                <li><a href="">曲面电视</a></li>
                                <li><a href="">智能电视</a></li>
                                <li><a href="">网络电视</a></li>
                                <li><a href="">普通电视</a></li>
                                <li><a href="">迷你电视</a></li>
                            </ul>
                        </div>
                        <div class="item">
                            <div class="type" data-action="shopd-type"><span class="iconfont"></span><a href="">空调</a></div>
                            <ul class="c-type">
                                <li><a href="">中央空调</a></li>
                                <li><a href="">挂式空调</a></li>
                                <li><a href="">柜式空调</a></li>
                                <li><a href="">迷你空调</a></li>
                                <li><a href="">圆柱式空调</a></li>
                            </ul>
                        </div>
                        <div class="item">
                            <div class="type" data-action="shopd-type"><span class="iconfont"></span><a href="">冰箱</a></div>
                            <ul class="c-type">
                                <li><a href="">单开门冰箱</a></li>
                                <li><a href="">双开门冰箱</a></li>
                                <li><a href="">三开门冰箱</a></li>
                                <li><a href="">多门冰箱</a></li>
                                <li><a href="">冰柜</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="detail-aside-box">
                    <div class="big-tit">店铺热销</div>
                    <ul class="detail-hot">
                        <li>
                            <a href="" class="figure"><img src="${ctx}/shangcheng/uploads/detail/1.jpg" alt="" /></a>
                            <div class="name"><a href="">美国进口滚筒洗衣机</a></div>
                            <div class="price">
                                <span class="now">¥149.00</span><span class="origin">¥298.00</span>
                            </div>
                        </li>
                        <li>
                            <a href="" class="figure"><img src="${ctx}/shangcheng/uploads/detail/1.jpg" alt="" /></a>
                            <div class="name"><a href="">美国进口滚筒洗衣机</a></div>
                            <div class="price">
                                <span class="now">¥149.00</span><span class="origin">¥298.00</span>
                            </div>
                        </li>
                        <li>
                            <a href="" class="figure"><img src="${ctx}/shangcheng/uploads/detail/1.jpg" alt="" /></a>
                            <div class="name"><a href="">美国进口滚筒洗衣机</a></div>
                            <div class="price">
                                <span class="now">¥149.00</span><span class="origin">¥298.00</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!--脚部-->
    <div class="fatfooter">

    </div>
    <!--脚部-->
</body>
<script>
    /*商品数量操作*/
    function goodsCount(o){
            if(!(o instanceof Object)) var o={};
            var inputCell = o.inputCell || ".count-input",
                minusCell = o.minusCell || ".count-minus",
                plusCell = o.plusCell || ".count-plus",
                disClass = o.disClass || "disabled";
            return this.each(function(){
                var $wrap = $(this),
                    $input = $(inputCell,$wrap),
                    $minus = $(minusCell,$wrap),
                    $plus = $(plusCell,$wrap),
                    maxnum=parseInt($wrap.attr('data-max')) || false,
                    minnum=$wrap.attr('data-min') || 1,
                    initnum=$input.val() || minnum;
                /*初始*/
                $input.val(initnum);
                checkIlegal();
                function checkIlegal(){
                    var value =parseInt($input.val());

                    //
                     if (maxnum&&value>maxnum) {
                        $input.val(maxnum);
                    }
                    else if (value<minnum) {
                        $input.val(minnum);
                    }
                    if(value<=minnum){
                        $minus.addClass(disClass);
                    }else{
                        $minus.removeClass(disClass);
                    }
                    if (value>=maxnum) {
                        $plus.addClass(disClass);
                    }else {
                        $plus.removeClass(disClass);
                    }

                }
                function checknull() {
                    var value =$input.val();
                    if(value === "" || value === "0"){
                        $input.val(minnum);
                    }
                }
                $input.keyup(function(evt){
                    var value = $(this).val();
                    var newvalue = value.replace(/[^\d]/g,"");
                    $(this).val(newvalue);
                    checknull();
                });
                $input.blur(function(){
                    checknull();
                    checkIlegal();
                })

                $minus.click(function(){
                    minus();
                     checkIlegal();
                });

                $plus.click(function(){
                    add();
                    checkIlegal();
                });

                function add () {
                    var value = $input.val();
                    var plus = parseInt(value)+1;
                    $input.val(plus);
                }
                function minus () {
                    var value = parseInt($input.val());
                    var minus = value-1;
                    $input.val(minus);
                }
            });
        }
        $.fn.goodsCount = goodsCount;
</script>

<script >
    $(function () {

        +function () {
            var index=0,
            bsrc='',
            timer=null,
            box=$('.detail-show'),
            origin=$('.origin-show'),
            bigimg=box.find('.big-pic'),
            tumb=box.find('.thumb-show'),
            tumbItem=tumb.find('.item'),
            zoomup=box.find('.zoomup'),
            zoomshow=box.find('.zoom-show');

            /*图片切换*/
            tumbItem.on('mouseenter',function () {
                index=$(this).index();
                clearTimeout(timer);
                timer=setTimeout(function (){
                    update(index);
                }, 300)

            });

            function update (index) {
                bsrc=tumbItem.eq(index).find('.s-pic').attr('bsrc');
                bigimg.attr('src', bsrc);
                tumbItem.find('.s-pic').removeClass('active').end().eq(index).find('.s-pic').addClass('active');
            }

            update(index);

            if ($('.detail-show .thumb-show .item').length>5) {
                $('.detail-show .thumb-show').slick({
                    slidesToShow: 5,
                    infinite:false
                });
            }

            /*放大镜*/
            origin.on('mouseover mouseout',function (e) {
                if (e.type=="mouseover") {
                    var oX=$(this).offset().left,
                    oY=$(this).offset().top,
                    zX=e.pageX,
                    zY=e.pageY,
                    pW=$(this).outerWidth(),
                    pH=$(this).outerHeight(),
                    zW=zoomup.outerWidth(),
                    zH=zoomup.outerHeight(),
                    scale=pW/zW,
                    zsW=zoomshow.width()*scale,//放大后的宽度
                    factor=zsW/pW

                    zoomshow.find('img').attr('src',bigimg.attr('src')).width(zsW);

                    $(document).on('mousemove.zoom',function (e) {
                        zX=e.pageX-oX- zW/2;
                        zY=e.pageY-oY- zH/2;
                        move();
                    });

                    function move () {
                        zX=zX<=0?0:zX;
                        zX=zX>=pW-zW?pW-zW:zX;
                        zY=zY<=0?0:zY;
                        zY=zY>=pH-zH?pH-zH:zY;
                        zoomup.show().css({top:zY,left:zX});
                        zoomshow.show().find('img').css({top:-zY*factor,left:-zX*factor});
                    }
                }
                else {
                    $(document).off('mousemove.zoom');
                     zoomup.hide()
                     zoomshow.hide();
                }
            });
        }();

        $('.mod-numbox').goodsCount(); //数量加减

        $('.detail-main').zTab({
            tabnav:'.detail-tabs',
            trigger:'click'
        });
    });
    $(".item-action").click(function () {
        var chatId = $(this).data("chatid")
        location.href="${ctx}/chat/chatroom?userId=${param.userId}&token=${param.token}&userName=${param.userName}&chatId="+chatId
    })
</script>
</html>