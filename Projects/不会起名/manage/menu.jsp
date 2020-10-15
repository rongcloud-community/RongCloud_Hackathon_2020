<%
	/**
	 *本文件被客户端后台菜单
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 22,2007
	 *@last modified:  Apil 22,2007
	*/
%>
<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*" errorPage="" %>
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>无标题文档</title>
<style type="text/css">
<!--
a:link {
	color: #0000FF;
	text-decoration: none;
}
a:visited {
	text-decoration: none;
	color: #0000FF;
}
a:hover {
	text-decoration: none;
	color:#ff0000;
}
a:active {
	text-decoration: none;
}
.STYLE1 {font-size: 14px}
body {
	background-color: #B4D9FE;
	margin-left: 0px;
	margin-top: 0px;
}
.STYLE3 {color: #FFFFFF}
-->
</style>
</HEAD> 
<%
//start: 判断登陆session是否超时/////
if( session.getValue("userType")==null ){
	out.println("<script language=jscript>alert('您登陆超时或没有登陆，请重新登陆。');"+
					"window.parent.location.assign('../index.htm');</script>");
	return;
}
//end: 判断登陆session是否超时/////
%>  
<%
 boolean isAdmin=false;
 if( ((String)session.getValue("userType")).equals("clientAdmin"))
 	isAdmin=true;
%> 
<body  topmargin=0 marginheight=0 leftmargin=0 marginwidth=0>

<table width=172 >
<tr border=1> 
<TD  background="../img/bg_black.gif" height="1"><P></P></TD>
<td >
 <table border=0 cellspacing=0 cellpadding=0 align=center>
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<TR><TD height="14" width='100%' class="STYLE1" bgcolor='#3366CC'><P class="STYLE3">站点管理</P></TD></TR> 
<%if(isAdmin){%>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<TR  height="14"><td >
<div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='userManager.jsp';">用户管理</a></div></td></tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	 
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='floatType.jsp';">肤色选择</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	 
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='code.jsp';">监控代码</a></div></td>   
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='quickResumes.jsp';">快捷回复</a></div></td>    
</tr>  
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='addMoreDomain.jsp';">站点维护</a></div></td>    
</tr>  
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='advert.jsp';">广告设置</a></div></td>    
</tr>  
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='siteMonitor.jsp';">运行监控</a></div></td>    
</tr>  
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='shiftCredit.jsp';">转信用点</a></div></td>    
</tr>  
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:window.open('callBilling.jsp');">话费查询</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='encryption.jsp';">信息加密</a></div></td>    
</tr>
<%}%>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='block.jsp';">黑 名 单</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='credit.jsp';">信用查询</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='webStat.jsp';">流量统计</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<TR><TD height="14" width='100%' class="STYLE1" bgcolor='#3366CC'><P class="STYLE3">客户端管理</P></TD></TR>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr>
<td ></td>
 </tr>
 <TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='userEdit1.jsp';">用户信息</a></div></td>    
</tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
  
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='group.jsp';">群组管理</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
  
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='autoResumes.jsp';">自动回复</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>  
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='voip.jsp';">VOIP设置</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
  
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='sms.jsp';">短信设置</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
  
 <tr height="14">
	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='search.jsp';">消息记录</a></div></td>
    
</tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">
	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='leaveMsg.jsp';">客户留言</a></div></td>
    
</tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
 <tr height="14">
	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='historyVoip.jsp';">通话记录</a></div></td>
    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<!--
<tr height="14">
	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='historySmsMsg.jsp';">短信记录</a></div></td>
    
</tr>
--> 
<TR><TD height="14" width='100%' class="STYLE1" bgcolor='#3366CC'><P class="STYLE3">辅助管理</P></TD></TR>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='callBack.jsp';">预约电话</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='sendSms.jsp';">手机短信</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='contact.jsp';">通 讯 录</a></div></td>    
</tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
</table>
 
</td>
<TD  background="../img/bg_black.gif" height="1"><P></P></TD>
</tr>
 
</table>
</body>
</html>
 