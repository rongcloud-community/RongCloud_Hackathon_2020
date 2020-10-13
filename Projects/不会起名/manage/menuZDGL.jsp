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
	margin-left: 0px;
	margin-top: 0px;
}
.STYLE3 {color: #FFFFFF}
-->
</style>
</HEAD> 
<%
/////////////////////session检测////////////////////////////////////////////////
String vid=request.getParameter("vid");
String sid=request.getParameter("sid");
msg.MySession mySession=new msg.MySession(vid);
String sessionId=mySession.getMySession().getSessionId();
if(sessionId==null || vid==null || !sessionId.equals(sid)){
  out.println("<script language=jscript>alert('您的帐号已经在其它地方登陆，只有重新登陆才可使用。');location.assign('index.htm');</script>");			
  return;	
}
///////////////////////////////////////////////////////////////////////////////		
%> 
<%
 boolean isAdmin=false;
 //if( ((String)session.getValue("userType")).equals("clientAdmin"))
 	//isAdmin=true;
 //userType: 0 super admin 1 agent and  clientAdmin 2 clientAdmin 3 client
 if(mySession.getUserType().equals("2") || mySession.getUserType().equals("1")) 
 	isAdmin=true;
	
%> 
<body  topmargin=0 marginheight=0 leftmargin=0 marginwidth=0>

<table width=140 height='600' cellspacing=0 cellpadding=0 >
<tr border=1> 
<TD width="2" height="1" bgcolor="#404040" ></TD>
<td width="128" valign="top" bgcolor="#AFD0EF" >
  <table border=0 cellspacing=0 cellpadding=0 align=center>

<TR><TD width='128' height="26" align="center" background="pic/cus_6.jpg" class="STYLE1"><P class="STYLE3"><img src="pic/lm.gif" width="10" height="10" /> 站点管理</P></TD></TR> 
<%if(isAdmin){%>

<TR  height="14"><td background="pic/cus_9.jpg" height='27' >
<div align="center"><img src="pic/3.gif" width="5" height="8" /><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='userManager.jsp?vid=<%=vid%>&sid=<%=sid%>';"> 用户管理</a></div></td></tr> 

<tr height="14">	 
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /> <a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='floatType.jsp?vid=<%=vid%>&sid=<%=sid%>';">肤色选择</a></div></td>    
</tr>
<tr height="14">	 
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /> <a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='specFloat.jsp?vid=<%=vid%>&sid=<%=sid%>';">高级定制</a></div></td>    
</tr>

<tr height="14">	 
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /> <a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='inviteTime.jsp?vid=<%=vid%>&sid=<%=sid%>';">邀请设置</a></div></td>    
</tr>

<tr height="14">	 
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='code.jsp?vid=<%=vid%>&sid=<%=sid%>';"> 监控代码</a></div></td>   
</tr>

<tr height="14">	
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='quickResumes.jsp?vid=<%=vid%>&sid=<%=sid%>';"> 快捷回复</a></div></td>    
</tr>  

<tr height="14">	
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='addMoreDomain.jsp?vid=<%=vid%>&sid=<%=sid%>';"> 站点维护</a></div></td>    
</tr>  
<tr height="14">	
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='logoUrl.jsp?vid=<%=vid%>&sid=<%=sid%>';"> LOGO定制</a></div></td>    
</tr>
<tr height="14">	
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='pageName.jsp?vid=<%=vid%>&sid=<%=sid%>';"> 页面友好名称</a></div></td>    
</tr>
<tr height="14">	
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='advert.jsp?vid=<%=vid%>&sid=<%=sid%>';"> 广告设置</a></div></td>    
</tr>  

<tr height="14">	
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='siteMonitor.jsp?vid=<%=vid%>&sid=<%=sid%>';"> 在线网管</a></div></td>    
</tr>  

<tr height="14">	
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='shiftCredit.jsp?vid=<%=vid%>&sid=<%=sid%>';"> 转信用点</a></div></td>    
</tr>  

<tr height="14">	
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /><a href="#" class="STYLE1" onClick="JavaScript:window.open('callBilling.jsp?vid=<%=vid%>&sid=<%=sid%>');"> 话费查询</a></div></td>    
</tr>

<tr height="14">	
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='encryption.jsp?vid=<%=vid%>&sid=<%=sid%>';"> 信息加密</a></div></td>    
</tr>
<%}%>

<tr height="14">	
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='block.jsp?vid=<%=vid%>&sid=<%=sid%>';"> 黑 名 单</a></div></td>    
</tr>

<tr height="14">	
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='credit.jsp?vid=<%=vid%>&sid=<%=sid%>';"> 信用查询</a></div></td>    
</tr>

<tr height="14">	
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='webStat.jsp?vid=<%=vid%>&sid=<%=sid%>';"> 流量统计</a></div></td>    
</tr>
<!--
<tr height="14">
	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='historySmsMsg.jsp?vid=<%=vid%>&sid=<%=sid%>';">短信记录</a></div></td>
    
</tr>
-->
</table>
 
</td>
<TD width="9" height="1" bgcolor="#E4F2FF" ></TD> 
</tr>
 
</table>
</body>
</html>
 