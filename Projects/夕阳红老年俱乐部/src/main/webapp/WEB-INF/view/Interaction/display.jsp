<%--
  Created by IntelliJ IDEA.
  User: 96081
  Date: 2020/3/11
  Time: 15:50
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>信息交流</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <%@ include file="../../tags/taglib.jsp"%>
</head>
<body >
    <div name = "search" >
        <form role="form" class="form-inline" method="post" action="${ctx }/display?id=${id}" >

            <div class="layui-form-item">
                <div class="layui-inline">
                    <img style="height: 50px;padding-left: 280px; padding-top: 35px;"src="${ctx}/view/image/jingcai.png" >
                </div>
                <div class="layui-inline" style="padding-left: 20px; padding-top: 35px;">
                    <input type="text" class="layui-input " name="search" value="${search}" style = "width:500px;" id="1" placeholder="  ">
                </div>
                <div class="form-group layui-inline" style="padding-top: 35px;">
                    <button class="layui-btn" type="submit">搜索</button>
                </div>
            </div>
        </form>

    </div>
    <div style="padding-top: 20px;">
        <div class="layui-row layui-col-space10">
            <div class="layui-col-md9">
                <div style="width: 90%;padding-left: 10%;">
                    <ul class="layui-tab-title">
                        <li class="layui-this">最新发布</li>
                    </ul>

                    <div class="layui-tab-content">
                        <div class="layui-tab-item layui-show">
                            <%--                1. 高度默认自适应，也可以随意固宽。--%>
                            <%--                <br>2. Tab进行了响应式处理，所以无需担心数量多少。--%>
                            <div style="padding: 20px; background-color: #F2F2F2;" ">
                                <table>
                                    <colgroup>
                                        <col width="950">
                                    </colgroup>
                                    <tbody id="tablelsw">
                                        <c:forEach items="${sendList}" var="n" varStatus="idx">
                                            <tr>
                                                <td>
                                                    <div class="layui-row layui-col-space15"  style="cursor: pointer;">
                                                        <div class="layui-col-md12" >
                                                            <div class="layui-card sendlist"  data-sendid="${n.sendid}" style="margin-top: 5px;">
                                                                <div class="layui-card-header" style="font-size: 17px;">${n.title}</div>
                                                                <div class="layui-card-body" style="color:#B1B1B1; ">
<%--                                                                    style="overflow: hidden;white-space: nowrap;text-overflow:ellipsis;"--%>
                                                                    <div >${contentList.get(idx.index)}<br></div>
                                                                    <text style="padding-left: 80%;font-size: 12px">${n.sendtime}</text>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                        </c:forEach>
                                    </tbody>

                                </table>
                            </div>

                            <div style="float:right;">
                                <%--    <span id="spanFirst">第一页</span>--%>
                                <a style="color:#3B78DD;" href='javascript:first();'>第一页</a>
                                <%--    <span id="spanPre">上一页</span>--%>
                                <a style="color:#3B78DD;padding-left: 30px;" href='javascript:pre();'>上一页</a>
                                <%--    <span id="spanNext">下一页</span>--%>
                                <a style="color:#3B78DD;padding-left: 30px;" href='javascript:next();'>下一页</a>
                                <%--    <span id="spanLast">最后一页</span>--%>
                                <a style="color:#3B78DD;padding-left: 30px;" href='javascript:last();'>最后一页</a>

                            </div>
                            <div style="float:left;">
                                第<span id="spanPageNum"></span>页/共<span id="spanTotalPage"></span>页
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div class="layui-col-md3">
                <div style="background-color: #F2F2F2;width: 80%;padding: 5%; ">

                     <text style="font-size: 18px">/我在交流</text>

                    <div style="background-color: white;width: 90%;height:85px;padding: 5%;margin-top: 15px">

                        <div class="layui-row layui-col-space10">
                            <div class="layui-col-md3">
                                <img style="height: 70px;" src="${ctx}/view/image/${n.head}" >
                            </div>
                            <div class="layui-col-md9" style="padding-left: 20px">
                                <div style="font-size: 20px">${n.name}<br></div>
                                <text style="font-size: 14px">关注：${focus2}  粉丝：${focus1}</text>
                            </div>
                        </div>
                    </div>
                    <div class="layui-tab" style="background-color: white;margin-top: 5px;">
                        <ul class="layui-tab-title" style="margin-left: 10%">
                            <li class="layui-this">我关注的</li>
                            <li>关注我的</li>
                        </ul>
                        <div class="layui-tab-content">
                            <div href="homepage" class="layui-tab-item layui-show">
                                <c:forEach items="${userList1}" var="n" varStatus="idx">
                                    <a class="layui-tab-item layui-show userlist" data-userid="${n.id}">
                                        <div class="layui-row layui-col-space10" style="padding-left:20px;height: 50px;border-bottom-style: solid;border-bottom-color: #D0D0D0;border-bottom-width: 1px">
                                            <div class="layui-col-md3">
                                                <img style="height: 40px;border-radius: 100%"src="${ctx}/view/image/${n.head}" >
                                            </div>
                                            <div class="layui-col-md9">
                                                    ${n.name}
                                            </div>
                                        </div>
                                    </a>
                                </c:forEach>

                            </div>

                            <div class="layui-tab-item">
                                <c:forEach items="${userList2}" var="n" varStatus="idx">
                                    <a class="layui-tab-item layui-show userlist" data-userid="${n.id}">
                                        <div class="layui-row layui-col-space10" style="padding-left:20px;height: 50px;border-bottom-style: solid;border-bottom-color: #D0D0D0;border-bottom-width: 1px">
                                            <div class="layui-col-md3">
                                                <img style="height: 40px;border-radius: 100%"src="${ctx}/view/image/${n.head}" >
                                            </div>
                                            <div class="layui-col-md9">
                                                    ${n.name}
                                            </div>
                                        </div>
                                    </a>
                                </c:forEach>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>


    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 50px;">
        <legend>发表</legend>
    </fieldset>
    <div style="width: 80%;padding-left: 10%;">


        <form role="form" class="form-inline layui-form-pane" id="query-form" method="post" action="${ctx}/display?id=${id}" >
            <div class="layui-form-item">
                <label class="layui-form-label">标题</label>
                <div class="layui-input-block">
                    <input type="text" name="title" autocomplete="off" placeholder="请输入标题" name="title" value="${title}" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item layui-form-text">
                <label class="layui-form-label">内容</label>
                <div class="layui-input-block">
                    <textarea placeholder="请输入内容" name="content" value="${content}" class="layui-textarea"></textarea>
                </div>

            </div>
            <div class="form-group">
                <button class="layui-btn" type="submit" lay-filter="demo2">发表</button>
            </div>

        </form>


    </div>



    <script>
        $(".sendlist").click(function () {
            var sendid = $(this).data("sendid");
            var id = ${id};
            console.log("send"+sendid);
            location.href="${ctx}/detail?sendid="+sendid+"&id="+id;
        })
        $(".userlist").click(function () {
            var userid = $(this).data("userid");
            var id = ${id};
            console.log("user"+userid);
            location.href="${ctx}/homepage?uid="+userid+"&id="+id;;
        })

        layui.use('element', function(){
            var $ = layui.jquery
                ,element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块

            //触发事件
            var active = {
                tabAdd: function(){
                    //新增一个Tab项
                    element.tabAdd('demo', {
                        title: '新选项'+ (Math.random()*1000|0) //用于演示
                        ,content: '内容'+ (Math.random()*1000|0)
                        ,id: new Date().getTime() //实际使用一般是规定好的id，这里以时间戳模拟下
                    })
                }
                ,tabDelete: function(othis){
                    //删除指定Tab项
                    element.tabDelete('demo', '44'); //删除：“商品管理”


                    othis.addClass('layui-btn-disabled');
                }
                ,tabChange: function(){
                    //切换到指定Tab项
                    element.tabChange('demo', '22'); //切换到：用户管理
                }
            };

            $('.site-demo-active').on('click', function(){
                var othis = $(this), type = othis.data('type');
                active[type] ? active[type].call(this, othis) : '';
            });

            //Hash地址的定位
            var layid = location.hash.replace(/^#test=/, '');
            element.tabChange('test', layid);

            element.on('tab(test)', function(elem){
                location.hash = 'test='+ $(this).attr('lay-id');
            });

        });

        layui.use('flow', function(){
            var flow = layui.flow;

            flow.load({
                elem: '#LAY_demo2' //流加载容器
                ,scrollElem: '#LAY_demo2' //滚动条所在元素，一般不用填，此处只是演示需要。
                ,isAuto: false
                ,isLazyimg: true
                ,done: function(page, next){ //加载下一页
                    //模拟插入
                    setTimeout(function(){
                        var lis = [];
                        for(var i = 0; i < 6; i++){
                            lis.push('<li><img src="${ctx}/view/image/46.jpg"></li>')
                        }
                        next(lis.join(''), page < 6); //假设总页数为 6
                    }, 500);
                }
            });

            //按屏加载图片
            flow.lazyimg({
                elem: '#LAY_demo3 img'
                ,scrollElem: '#LAY_demo3' //一般不用设置，此处只是演示需要。
            });

        });


        var theTable = document.getElementById("tablelsw");
        var totalPage = document.getElementById("spanTotalPage");
        var pageNum = document.getElementById("spanPageNum");
        var numberRowsInTable = theTable.rows.length;
        var pageSize = 6;
        var page = 1;

        //下一页
        function next(){
            if(page != pageCount()){

                hideTable();

                currentRow = pageSize * page;
                maxRow = currentRow + pageSize;
                if ( maxRow > numberRowsInTable ) maxRow = numberRowsInTable;

                for ( var i = currentRow; i< maxRow; i++ ){
                    theTable.rows[i].style.display = '';
                }
                page++;
                if ( maxRow == numberRowsInTable ) {}
                showPage();
            }

        }

        //上一页
        function pre(){
            if(page != 1){
                hideTable();
                page--;
                currentRow = pageSize * page;
                maxRow = currentRow - pageSize;
                if ( currentRow > numberRowsInTable ) currentRow = numberRowsInTable;
                for ( var i = maxRow; i< currentRow; i++ ){
                    theTable.rows[i].style.display = '';
                }
                showPage();

            }

        }

        //第一页
        function first(){
            hideTable();
            page = 1;
            for ( var i = 0; i<pageSize; i++ ){
                theTable.rows[i].style.display = '';
            }
            showPage();

        }

        //最后一页
        function last(){
            hideTable();
            page = pageCount();
            currentRow = pageSize * (page - 1);
            for ( var i = currentRow; i<numberRowsInTable; i++ ){
                theTable.rows[i].style.display = '';
            }
            showPage();

        }

        function hideTable(){
            for ( var i = 0; i<numberRowsInTable; i++ ){
                theTable.rows[i].style.display = 'none';
            }
        }

        function showPage(){
            pageNum.innerHTML = page;
        }

        //总共页数
        function pageCount(){
            var count = 0;
            if ( numberRowsInTable%pageSize != 0 ) count = 1;
            return parseInt(numberRowsInTable/pageSize) + count;
        }
        //隐藏表格
        function hide(){
            for ( var i = pageSize; i<numberRowsInTable; i++ ){
                theTable.rows[i].style.display = 'none';
            }

            totalPage.innerHTML = pageCount();
            pageNum.innerHTML = page;

        }

        hide();
    </script>

</body>
</html>
