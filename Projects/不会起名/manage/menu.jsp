<%
	/**
	 *���ļ����ͻ��˺�̨�˵�
	 *
	 *@author: �ش��� ��������ʱ�����缼�����޹�˾
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
	margin-left: 0px;
	margin-top: 0px;
}
.STYLE3 {color: #FFFFFF}
-->
</style>
</HEAD> 
<%
//start: �жϵ�½session�Ƿ�ʱ/////
if( session.getValue("userType")==null ){
	out.println("<script language=jscript>alert('����½��ʱ��û�е�½�������µ�½��');"+
					"window.parent.location.assign('../index.htm');</script>");
	return;
}
//end: �жϵ�½session�Ƿ�ʱ/////
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
<TR><TD height="14" width='100%' class="STYLE1" bgcolor='#3366CC'><P class="STYLE3">վ�����</P></TD></TR> 
<%if(isAdmin){%>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<TR  height="14"><td >
<div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='userManager.jsp';">�û�����</a></div></td></tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	 
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='floatType.jsp';">��ɫѡ��</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	 
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='code.jsp';">��ش���</a></div></td>   
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='quickResumes.jsp';">��ݻظ�</a></div></td>    
</tr>  
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='addMoreDomain.jsp';">վ��ά��</a></div></td>    
</tr>  
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='advert.jsp';">�������</a></div></td>    
</tr>  
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='siteMonitor.jsp';">���м��</a></div></td>    
</tr>  
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='shiftCredit.jsp';">ת���õ�</a></div></td>    
</tr>  
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:window.open('callBilling.jsp');">���Ѳ�ѯ</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='encryption.jsp';">��Ϣ����</a></div></td>    
</tr>
<%}%>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='block.jsp';">�� �� ��</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='credit.jsp';">���ò�ѯ</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='webStat.jsp';">����ͳ��</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<TR><TD height="14" width='100%' class="STYLE1" bgcolor='#3366CC'><P class="STYLE3">�ͻ��˹���</P></TD></TR>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr>
<td ></td>
 </tr>
 <TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='userEdit1.jsp';">�û���Ϣ</a></div></td>    
</tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
  
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='group.jsp';">Ⱥ�����</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
  
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='autoResumes.jsp';">�Զ��ظ�</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>  
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='voip.jsp';">VOIP����</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
  
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='sms.jsp';">��������</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
  
 <tr height="14">
	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='search.jsp';">��Ϣ��¼</a></div></td>
    
</tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">
	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='leaveMsg.jsp';">�ͻ�����</a></div></td>
    
</tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
 <tr height="14">
	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='historyVoip.jsp';">ͨ����¼</a></div></td>
    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<!--
<tr height="14">
	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='historySmsMsg.jsp';">���ż�¼</a></div></td>
    
</tr>
--> 
<TR><TD height="14" width='100%' class="STYLE1" bgcolor='#3366CC'><P class="STYLE3">��������</P></TD></TR>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='callBack.jsp';">ԤԼ�绰</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='sendSms.jsp';">�ֻ�����</a></div></td>    
</tr>
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
<tr height="14">	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='contact.jsp';">ͨ Ѷ ¼</a></div></td>    
</tr> 
<TR><TD background="../img/bg_black.gif" height="1" width='100%'><P></P></TD></TR>
</table>
 
</td>
<TD  background="../img/bg_black.gif" height="1"><P></P></TD>
</tr>
 
</table>
</body>
</html>
 