<%--
  Created by IntelliJ IDEA.
  User: 96081
  Date: 2019/12/9
  Time: 15:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../tags/taglib.jsp" %>
<html>
<head>
    <title>关键记录</title>
</head>
<body>
<fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
    <legend>关键记录</legend>
</fieldset>

<div class="layui-form">
    <form role="form" class="form-inline" id="query-form" method="post" action="${ctx}/record" >

        <div class="layui-form-item">
            <div class="layui-inline">
                <div class="layui-inline">
                    <label class="layui-form-label">查询日期</label>
                    <div class="layui-input-inline">
                        <input type="text" class="layui-input" id="test1" name= "d" placeholder="选择想查询的日期" value="${d}"/>
                    </div>
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">地点</label>
                <div class="layui-input-inline">
                    <input type="text" placeholder="地点" name="search" value="${search}" class="layui-input " />
                </div>
            </div>
            <div class="form-group layui-inline">
                <button class="layui-btn" type="submit">&nbsp;查询</button>
            </div>

        </div>
    </form>
</div>

<div id = "income_box"class="layui-form" style="padding: 10px 40px 10px 40px">
<%--    <table class="layui-hide" id="test"></table>--%>
    <table id = "income_table" class="layui-table">
        <colgroup>

        </colgroup>
        <thead>
        <tr>
            <th>序号</th>
            <th>时间</th>
            <th>地点</th>
            <th>类型</th>
            <th>备注</th>
        </tr>
        </thead>
        <tbody id="tablelsw">

        <c:forEach items="${list}" var="n" varStatus="idx">
            <tr data-index="${idx.index}">
                <td style="">${idx.index+1}</td>
                <td style="">${n.vtime }</td>
                <td style="">${n.place}</td>
                <td style="">${n.remark }</td>
                <td style="">${type.get(idx.index)}</td>
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



<%--    <script src="//res.layui.com/layui/dist/layui.js" charset="utf-8"></script>--%>
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

</script>
</body>
</html>
