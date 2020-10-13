<%
	/**
	 *本文件被admin调用后台主菜单
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 26,2007
	 *@last modified:  Apil 26,2007
	*/
%>
<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*"  %>
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<%
 	 
%> 

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
}
.STYLE3 {color: #FFFFFF}
-->
</style></HEAD> 
<%
/////////////////////session检测////////////////////////////////////////////////
String vid="admin";
String sid=request.getParameter("sid");
msg.MySession mySession=new msg.MySession(vid);
String sessionId=mySession.getMySession().getSessionId();
if(sessionId==null || vid==null || !sessionId.equals(sid)){
	//out.println("<script language=jscript>alert('你没有登陆或会话已经过期，请重新登陆。');location.assign('index.htm');</script>");			
		//return;	
}
///////////////////////////////////////////////////////////////////////////////		
%>
<body  topmargin=0 marginheight=0 leftmargin=0 marginwidth=0>

<table width=172 >
<tr border=1> 
<TD  background="../img/bg_black.gif" height="1"><P></P></TD>
<td >
 <table border=0 cellspacing=0 cellpadding=0 align=center>
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<TR><TD height="20" width='172' class="STYLE1" bgcolor='#3366CC'><P class="STYLE3">平台管理</P></TD></TR> 
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<TR  height="20"><td >
<div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='reg.jsp?vid=<%=vid%>&sid=<%=sid%>';">新建站点</a></div></td></tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<TR  height="20"><td >
<div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='userManager.jsp?vid=<%=vid%>&sid=<%=sid%>';">用户管理</a></div></td></tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<TR  height="20"><td >
<div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='showSiteLevel.jsp?vid=<%=vid%>&sid=<%=sid%>';">级别查询</a></div></td></tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<TR  height="20"><td >
<div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='siteLevel.jsp?vid=<%=vid%>&sid=<%=sid%>';">站点升级</a></div></td></tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<TR  height="20"><td >
<div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='modifyLogoUrls.jsp?vid=<%=vid%>&sid=<%=sid%>';">站点定制</a></div></td></tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<TR  height="20"><td >
<div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='addAgent.jsp?vid=<%=vid%>&sid=<%=sid%>';">添加代理</a></div></td></tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<TR  height="20"><td >
<div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='removeSite.jsp?vid=<%=vid%>&sid=<%=sid%>';">删除站点</a></div></td></tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<tr height="20">	 
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='code.jsp?vid=<%=vid%>&sid=<%=sid%>';">监控代码</a></div></td>   
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='addCredit.jsp?vid=<%=vid%>&sid=<%=sid%>';">站点充值</a></div></td>    
</tr>  
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='addVoipCredit.jsp?vid=<%=vid%>&sid=<%=sid%>';">VOIP充值</a></div></td>    
</tr>  
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='addSmsCredit.jsp?vid=<%=vid%>&sid=<%=sid%>';">短信充值</a></div></td>    
</tr>  

  
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='regVoip.jsp?vid=<%=vid%>&sid=<%=sid%>';">VOIP开户</a></div></td>    
</tr>  
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:window.open('callBilling.jsp?vid=<%=vid%>&sid=<%=sid%>');">话费查询</a></div></td>    
</tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='credit.jsp?vid=<%=vid%>&sid=<%=sid%>';">信用查询</a></div></td>    
</tr> 
 <TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='showRegSites.jsp?vid=<%=vid%>&sid=<%=sid%>';">站点注册统计</a></div></td>    
</tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
  
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='showUsers.jsp?vid=<%=vid%>&sid=<%=sid%>';">用户统计</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
  
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='onlineClient.jsp?vid=<%=vid%>&sid=<%=sid%>';">在线客户端统计</a></div></td>    
</tr>

<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>  
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='product.jsp?vid=<%=vid%>&sid=<%=sid%>';">产品管理</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>  
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='discount.jsp?vid=<%=vid%>&sid=<%=sid%>';">折扣管理</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>  
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='agentCredit.jsp?vid=<%=vid%>&sid=<%=sid%>';">代理商充值</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>  
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='order.jsp?vid=<%=vid%>&sid=<%=sid%>';">订单管理</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>  
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='showResource.jsp?vid=<%=vid%>&sid=<%=sid%>';">资源使用统计</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>  
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='restartDbpool.jsp?vid=<%=vid%>&sid=<%=sid%>';">重起数据库连接池</a></div></td>  
</tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='callBack.jsp?vid=<%=vid%>&sid=<%=sid%>';">预约电话</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='sendSms.jsp?vid=<%=vid%>&sid=<%=sid%>';">手机短信</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
 <tr height="20">	
    <td bgcolor='#B5DBFF'><div align="center"><a href="#" class="STYLE1 STYLE3" onClick="JavaScript:parent.right.window.location.href='help.html';">系统帮助</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
</table>
 
</td>
<TD  background="../img/bg_black.gif" height="1"><P></P></TD>
</tr>
 
</table>
</body>
</html>
 