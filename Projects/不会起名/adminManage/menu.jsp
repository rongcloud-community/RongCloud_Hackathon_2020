<%
	/**
	 *���ļ���admin���ú�̨���˵�
	 *
	 *@author: �ش��� ��������ʱ�����缼�����޹�˾
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
<title>�ޱ����ĵ�</title>
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
/////////////////////session���////////////////////////////////////////////////
String vid="admin";
String sid=request.getParameter("sid");
msg.MySession mySession=new msg.MySession(vid);
String sessionId=mySession.getMySession().getSessionId();
if(sessionId==null || vid==null || !sessionId.equals(sid)){
	//out.println("<script language=jscript>alert('��û�е�½��Ự�Ѿ����ڣ������µ�½��');location.assign('index.htm');</script>");			
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
<TR><TD height="20" width='172' class="STYLE1" bgcolor='#3366CC'><P class="STYLE3">ƽ̨����</P></TD></TR> 
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<TR  height="20"><td >
<div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='reg.jsp?vid=<%=vid%>&sid=<%=sid%>';">�½�վ��</a></div></td></tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<TR  height="20"><td >
<div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='userManager.jsp?vid=<%=vid%>&sid=<%=sid%>';">�û�����</a></div></td></tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<TR  height="20"><td >
<div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='showSiteLevel.jsp?vid=<%=vid%>&sid=<%=sid%>';">�����ѯ</a></div></td></tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<TR  height="20"><td >
<div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='siteLevel.jsp?vid=<%=vid%>&sid=<%=sid%>';">վ������</a></div></td></tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<TR  height="20"><td >
<div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='modifyLogoUrls.jsp?vid=<%=vid%>&sid=<%=sid%>';">վ�㶨��</a></div></td></tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<TR  height="20"><td >
<div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='addAgent.jsp?vid=<%=vid%>&sid=<%=sid%>';">��Ӵ���</a></div></td></tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<TR  height="20"><td >
<div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='removeSite.jsp?vid=<%=vid%>&sid=<%=sid%>';">ɾ��վ��</a></div></td></tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<tr height="20">	 
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='code.jsp?vid=<%=vid%>&sid=<%=sid%>';">��ش���</a></div></td>   
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='addCredit.jsp?vid=<%=vid%>&sid=<%=sid%>';">վ���ֵ</a></div></td>    
</tr>  
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='addVoipCredit.jsp?vid=<%=vid%>&sid=<%=sid%>';">VOIP��ֵ</a></div></td>    
</tr>  
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='addSmsCredit.jsp?vid=<%=vid%>&sid=<%=sid%>';">���ų�ֵ</a></div></td>    
</tr>  

  
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='regVoip.jsp?vid=<%=vid%>&sid=<%=sid%>';">VOIP����</a></div></td>    
</tr>  
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:window.open('callBilling.jsp?vid=<%=vid%>&sid=<%=sid%>');">���Ѳ�ѯ</a></div></td>    
</tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='credit.jsp?vid=<%=vid%>&sid=<%=sid%>';">���ò�ѯ</a></div></td>    
</tr> 
 <TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='showRegSites.jsp?vid=<%=vid%>&sid=<%=sid%>';">վ��ע��ͳ��</a></div></td>    
</tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
  
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='showUsers.jsp?vid=<%=vid%>&sid=<%=sid%>';">�û�ͳ��</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
  
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='onlineClient.jsp?vid=<%=vid%>&sid=<%=sid%>';">���߿ͻ���ͳ��</a></div></td>    
</tr>

<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>  
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='product.jsp?vid=<%=vid%>&sid=<%=sid%>';">��Ʒ����</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>  
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='discount.jsp?vid=<%=vid%>&sid=<%=sid%>';">�ۿ۹���</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>  
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='agentCredit.jsp?vid=<%=vid%>&sid=<%=sid%>';">�����̳�ֵ</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>  
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='order.jsp?vid=<%=vid%>&sid=<%=sid%>';">��������</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>  
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='showResource.jsp?vid=<%=vid%>&sid=<%=sid%>';">��Դʹ��ͳ��</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>  
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='restartDbpool.jsp?vid=<%=vid%>&sid=<%=sid%>';">�������ݿ����ӳ�</a></div></td>  
</tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='callBack.jsp?vid=<%=vid%>&sid=<%=sid%>';">ԤԼ�绰</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
<tr height="20">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='sendSms.jsp?vid=<%=vid%>&sid=<%=sid%>';">�ֻ�����</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
 <tr height="20">	
    <td bgcolor='#B5DBFF'><div align="center"><a href="#" class="STYLE1 STYLE3" onClick="JavaScript:parent.right.window.location.href='help.html';">ϵͳ����</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='172'><P></P></TD></TR>
</table>
 
</td>
<TD  background="../img/bg_black.gif" height="1"><P></P></TD>
</tr>
 
</table>
</body>
</html>
 