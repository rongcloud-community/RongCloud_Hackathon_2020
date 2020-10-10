<%--
  Created by IntelliJ IDEA.
  User: 96081
  Date: 2019/12/9
  Time: 14:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../tags/taglib.jsp" %>
<html>
<head>
    <title>行程管理</title>
</head>
<body>
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
        <legend>行程查看</legend>
    </fieldset>

    <div class="layui-form">
        <form role="form" class="form-inline" id="query-form" method="post" action="${ctx }/travel" >

            <div class="layui-form-item">
                <div class="layui-inline">

                    <div class="layui-inline">
                         <label class="layui-form-label">查询日期</label>
                        <div class="layui-input-inline">
                            <input type="text" class="layui-input" id="test1" name= "d" placeholder="选择想查询的日期" value="${d}"/>
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">起点/终点</label>
                        <div class="layui-input-inline">
    <%--                            <input type="text" name="email" lay-verify="email" autocomplete="off" class="layui-input">--%>
                            <input type="text" placeholder="起点/终点" name="search" value="${search}" class="layui-input " />

                        </div>
                    </div>
<%--                    <div class="layui-inline" >--%>
<%--                        <button type="button" class="layui-btn">查询</button>--%>
<%--                    </div>--%>
                    <div class="form-group layui-inline">
                        <button class="layui-btn" type="submit">&nbsp;查询</button>
                    </div>


                </div>
            </div>
        </form>
    </div>

    <div class="layui-form" style="padding: 10px 40px 10px 40px">
        <table class="layui-table">
            <colgroup>
                <col width="150">
                <col width="150">
                <col width="200">
                <col>
            </colgroup>
            <thead>
            <tr>
                <th>序号</th>
                <th>起点</th>
                <th>开始时间</th>
                <th>终点</th>
                <th>结束时间</th>
                <th>出行距离</th>
            </tr>
            </thead>
            <tbody id="tablelsw">
            <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

            <c:forEach items="${list}" var="n" varStatus="idx">
                <tr data-index="${idx.index}">
                    <td style="">${idx.index+1}</td>
                    <td style="">${n.origin }</td>
                    <td style="">${n.starttime}</td>
                    <td style="">${n.terminal }</td>
                    <td style="">${n.finishtime}</td>
                    <td style="">${n.distance }m</td>
                </tr>

            </c:forEach>
            </tbody>

        </table>
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

    <script src="${ctx}/component/layui/layui.js" charset="utf-8"></script>
    <!-- 注意：如果你直接复制所有代码到本地，上述js路径需要改成你本地的 -->
    <script>
        layui.use('laydate', function() {
            var laydate = layui.laydate;

            //常规用法
            laydate.render({
                elem: '#test1'
                ,done: function(value, date){
                    console.log('你选择的日期是：' + value + '获得的对象是' + JSON.stringify(date));
                }
            });
        })

        var theTable = document.getElementById("tablelsw");
        var totalPage = document.getElementById("spanTotalPage");
        var pageNum = document.getElementById("spanPageNum");
        var numberRowsInTable = theTable.rows.length;
        var pageSize = 10;
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

        // // JavaScript Document By lishewen
        // var theTable = document.getElementById("tablelsw");
        // var totalPage = document.getElementById("spanTotalPage");
        // var pageNum = document.getElementById("spanPageNum");
        //
        // // var spanPre = document.getElementById("spanPre");
        // // var spanNext = document.getElementById("spanNext");
        // // var spanFirst = document.getElementById("spanFirst");
        // // var spanLast = document.getElementById("spanLast");
        //
        // // var totalPaget = document.getElementById("spanTotalPaget");
        // // var pageNumt = document.getElementById("spanPageNumt");
        // //
        // // var spanPret = document.getElementById("spanPret");
        // // var spanNextt = document.getElementById("spanNextt");
        // // var spanFirstt = document.getElementById("spanFirstt");
        // // var spanLastt = document.getElementById("spanLastt");
        //
        // var numberRowsInTable = theTable.rows.length;
        // var pageSize = 10;
        // var page = 1;
        //
        // //下一页
        // function next(){
        //     if(page != pageCount()){
        //         if(page == pageCount()-1){
        //             last();
        //         }
        //         hideTable();
        //
        //         currentRow = pageSize * page;
        //         maxRow = currentRow + pageSize;
        //         if ( maxRow > numberRowsInTable ) maxRow = numberRowsInTable;
        //
        //         // if(currentRow<numberRowsInTable){
        //         for ( var i = currentRow; i< maxRow; i++ ){
        //             theTable.rows[i].style.display = '';
        //         }
        //         page++;
        //         // }
        //
        //         if ( maxRow == numberRowsInTable ) { nextText(); lastText(); }
        //         showPage();
        //         firstLink();
        //     }
        //
        // }
        //
        // //上一页
        // function pre(){
        //     if(page != 1){
        //         if(page == 2){
        //             first();
        //         }
        //         hideTable();
        //
        //         page--;
        //
        //         currentRow = pageSize * page;
        //         maxRow = currentRow - pageSize;
        //         if ( currentRow > numberRowsInTable ) currentRow = numberRowsInTable;
        //         for ( var i = maxRow; i< currentRow; i++ ){
        //             theTable.rows[i].style.display = '';
        //         }
        //
        //
        //         if ( maxRow == 0 ){ preText(); firstText(); }
        //         showPage();
        //         lastLink();
        //     }
        //
        // }
        //
        // //第一页
        // function first(){
        //     hideTable();
        //     page = 1;
        //     for ( var i = 0; i<pageSize; i++ ){
        //         theTable.rows[i].style.display = '';
        //     }
        //     showPage();
        //
        //     lastLink();
        // }
        //
        // //最后一页
        // function last(){
        //     hideTable();
        //     page = pageCount();
        //     currentRow = pageSize * (page - 1);
        //     for ( var i = currentRow; i<numberRowsInTable; i++ ){
        //         theTable.rows[i].style.display = '';
        //     }
        //     showPage();
        //
        //     firstLink();
        // }
        //
        // function hideTable(){
        //     for ( var i = 0; i<numberRowsInTable; i++ ){
        //         theTable.rows[i].style.display = 'none';
        //     }
        // }
        //
        // function showPage(){
        //     // pagepageNum.innerHTML = page;
        //     // pagepageNumt.innerHTML = page;
        //     pageNum.innerHTML = page;
        //
        //
        // }
        //
        // //总共页数
        // function pageCount(){
        //     var count = 0;
        //     if ( numberRowsInTable%pageSize != 0 ) count = 1;
        //     return parseInt(numberRowsInTable/pageSize) + count;
        // }
        //
        // //显示链接
        // function firstLink(){ spanFirst.innerHTML = "<a href='javascript:first();'>第一页</a>"; spanFirstt.innerHTML = "<a href='javascript:first();'>第一页</a>";}
        // function firstText(){ spanFirst.innerHTML = "第一页"; spanFirstt.innerHTML = "第一页";}
        //
        // function lastLink(){ spanLast.innerHTML = "<a href='javascript:last();'>最后一页</a>"; spanLastt.innerHTML = "<a href='javascript:last();'>最后一页</a>";}
        // function lastText(){ spanLast.innerHTML = "最后一页"; spanLastt.innerHTML = "最后一页";}
        // //隐藏表格
        // function hide(){
        //     for ( var i = pageSize; i<numberRowsInTable; i++ ){
        //         theTable.rows[i].style.display = 'none';
        //     }
        //
        //     totalPage.innerHTML = pageCount();
        //     pageNum.innerHTML = page;
        //
        //     // totalPaget.innerHTML = pageCount();
        //     // pageNumt.innerHTML = '1';
        //
        //     lastLink();
        // }
        //
        // hide();
    </script>
</body>
</html>
