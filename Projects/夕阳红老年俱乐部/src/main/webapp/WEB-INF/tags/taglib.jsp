<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<link rel="stylesheet" href="${ctx}/component/layui/css/layui.css" media="all">
    
<script type="text/javascript" src="${ctx}/component/jquery/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="${ctx}/component/layui/layui.js"></script>
<script type="text/javascript" src="${ctx}/component/echarts/echarts.js"></script>
<script>
var ctx;
$(function(){
	init();
});

function init(){
	ctx = "${ctx}";
}

/**
 * layui iframe弹出层异步处理刷新数据表格
 * data: 响应元数据
 * uri: 父级页面统一资源
 * filter_tab: 刷新表格,多表格用逗号(,)隔开
 */
function reloadIFrameTab(data, uri, filter_tab){
	if(data.status == 200){
		top.layer.msg(data.msg);
        index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		parent.layer.close(index); //再执行关闭
		for(var i in parent){
			var p = parent[i];
			if(p.location.href.indexOf(uri) > 0){
				var arr = filter_tab.split(",");
				for(var index in arr){
					p.layui.table.reload(arr[index]);
				}
				break;
			}
		}
	}else{
		top.layer.msg(data.msg, {time:1000, icon:0, shade: [0.3, '#393D49']});
	}
}

function getRootPath(){
    //获取当前网址
    var curWwwPath=window.document.location.href;
    //获取主机地址之后的目录
    var pathName=window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址
    var localhostPaht=curWwwPath.substring(0,pos);
    //获取带"/"的项目名
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return(localhostPaht+projectName);
}
</script>
