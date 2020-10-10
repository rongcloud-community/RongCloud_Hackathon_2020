<%--<%@ page language="java" contentType="text/html; charset=ISO-8859-1"--%>
<%--    pageEncoding="ISO-8859-1"%>--%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
	<title>我的位置</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<%@ include file="../tags/taglib.jsp"%>
</head>
<body class="layui-layout-body">
<div class="layui-layout layui-layout-admin" >
	<div class="layui-header" style="background-color: #008B8B">
		<div class="layui-logo" style="color:white">视觉障碍导航系统</div>
		<ul class="layui-nav layui-layout-right" >
			<li class="layui-nav-item">
				<a>
					<img src="${ctx}/view/image/${user.head}" class="layui-nav-img">
					${user.name}
				</a>
				<dl class="layui-nav-child">
					<dd><a  id="10" href="javascript:;">我的主页</a></dd>
					<dd><a id="0" id = "home" href="javascript:;">个人信息</a></dd>
					<dd><a id="1" href="javascript:;">修改密码</a></dd>
					<dd><a id="2" href="javascript:;">设备管理</a></dd>
				</dl>
			</li>
			<li class="layui-nav-item"><a class = "logout">注销</a></li>
		</ul>
	</div>

	<div class="layui-side" style="background-color: #008B8B">
		<div class="layui-side-scroll">
			<!-- 左侧导航区域（可配合layui已有的垂直导航） -->
			<ul class="layui-nav layui-nav-tree "  lay-filter="test" style="background-color: #008B8B">
				<li class="layui-nav-item layui-nav-itemed " style="background-color: #008B8B">
					<a href="javascript:;">出行信息</a>
					<dl class="layui-nav-child">
						<dd><a id="3" href="javascript:;">行程管理</a></dd>
						<dd><a id="4" href="javascript:;">实时监测</a></dd>
						<dd><a id="5" href="javascript:;">关键记录</a></dd>
                        <dd><a id="8" href="javascript:;">实时影像</a></dd>
					</dl>
				</li>
				<li class="layui-nav-item">
					<a href="javascript:;">信息交流</a>
					<dl class="layui-nav-child">
						<dd><a id="9" href="javascript:;">信息交流</a></dd>
					</dl>
				</li>
				<li class="layui-nav-item">
					<a href="javascript:;">关于我们</a>
					<dl class="layui-nav-child">
						<dd><a id="6" href="javascript:;">产品介绍</a></dd>
						<dd><a id="7" href="javascript:;">意见反馈</a></dd>
					</dl>
				</li>
				<li class="layui-nav-item">
					<a href="javascript:;">视频通话</a>
					<dl class="layui-nav-child">
						<dd><a id="11" href="javascript:;">视频通话</a></dd>
					</dl>
				</li>
			</ul>
		</div>
	</div>

	<div class="layui-body" id="lbody">
		<iframe src="travel" width="100%" height="100%" frameborder="0"></iframe>
	</div>

	<div class="layui-footer">
		<!-- 底部固定区域 -->
		<span style="color: #888888;">--  眼睛是心灵的窗户，我们就是宁的眼睛！</span>
	</div>
</div>
<script src="../src/layui.js"></script>
<script>
	//JavaScript代码区域
	layui.use('element', function(){
		var element = layui.element;

	});
	var myid=${id};
	var jumpp = ["dinfo","pinfo","einfo","travel","map","record","introduction","feedback","video","display","homepage","chat"];
	$("dd a").click(function () {
		var id = this.id;
		var option = jumpp[id]+"?id="+myid;
		$("iframe").attr('src',option);
	})

	// $("#home").click(function () {
	// 	// var userid = $(this).data("userid");
	// 	var id = this.id;
	// 	var option = jumpp[id]+"?id="+myid+"&uid="+myid;;
	// 	$("iframe").attr('src',option);
	//
	// })
	$(".logout").click(function () {
		location.href="${ctx}/logout";
	})
</script>
</body>
</html>
