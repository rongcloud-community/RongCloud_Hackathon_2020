<%--
  Created by IntelliJ IDEA.
  User: 96081
  Date: 2020/3/11
  Time: 16:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<html>
<head>
    <title>关注</title>
    <title>detail</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <%@ include file="../../tags/taglib.jsp"%>
</head>
<body>
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 50px;">
        <legend>我的关注</legend>
    </fieldset>
    <div class="layui-tab-content">
        <div class="layui-tab-item layui-show">
            <%--                1. 高度默认自适应，也可以随意固宽。--%>
            <%--                <br>2. Tab进行了响应式处理，所以无需担心数量多少。--%>
            <div style="padding: 20px; background-color: #F2F2F2;">
                <c:forEach items="${userList}" var="n" varStatus="idx">
                    <div class="layui-row layui-col-space15">
                        <div class="layui-col-md12">
                            <div class="layui-card ">
                                <div class="layui-card-body " style="height: 60px">
                                    <a class = "userlist" data-userid="${n.id}">
                                        <img style="height: 55px;border-radius: 100%"src="${ctx}/view/image/${n.head}" >
                                        <div class="layui-inline" style="font-size: 18px;padding-left: 10px">${n.name}</div>
                                    </a>
                                    <c:if test="${t}">
                                        <button type="button" data-id="${id}" data-fid="${n.id}" class="layui-btn layui-btn-primary layui-btn-sm layui-inline delete" style="float:right;margin-top: 15px;margin-right: 200px;border-radius: 10%;font-size: 16px">取消关注</button>
                                    </c:if>
                                </div>
                            </div>
                        </div>
                    </div>
                </c:forEach>


            </div>
        </div>

    </div>
    </div>

    <script>

        layui.use('layer',function(){
            $(".delete").click(function () {
                var id = $(this).data("id");
                var fid = $(this).data("fid");
                var params = {};
                params.id = id;
                params.fid = fid;

                console.log(id+fid);
                <%--url="${ctx}/delete?id="+id+"&fid="+fid;--%>
                $.ajax({
                    //请求方式
                    type : "POST",
                    contentType: "application/json;charset=UTF-8",
                    url : "${ctx}/delete",
                    // /?name="+loginUsername+"&password="+loginPassword,
                    //data : {"name": + loginUsername,"password": + loginPassword},
                    data: JSON.stringify(params),
                    datatype:"JSON",
                    success : function(re) {
                        layer.msg(re.msg);
                        if (re.code==0){
                            layer.msg('已取消关注');
                            location.reload();
                        }
                    },
                    error : function(e){
                        layer.msg('服务器出错');
                    }
                });
            })

        })
        $(".userlist").click(function () {
            var userid = $(this).data("userid");
            var id = ${id};
            console.log("user"+userid);
            location.href="${ctx}/homepage?uid="+userid+"&id="+id;
        })

    </script>
</body>
</html>
