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
	margin-left: 0px;
	margin-top: 0px;
}
.STYLE3 {color: #FFFFFF}
-->
</style>
</HEAD> 
<%
/////////////////////session���////////////////////////////////////////////////
String vid=request.getParameter("vid");
String sid=request.getParameter("sid");
msg.MySession mySession=new msg.MySession(vid);
String sessionId=mySession.getMySession().getSessionId();
if(sessionId==null || vid==null || !sessionId.equals(sid)){
  out.println("<script language=jscript>alert('�����ʺ��Ѿ��������ط���½��ֻ�����µ�½�ſ�ʹ�á�');location.assign('index.htm');</script>");			
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

<TR><TD width='128' height="26" align="center" background="pic/cus_6.jpg" class="STYLE1"><P class="STYLE3"><img src="pic/lm.gif" width="10" height="10" /> վ�����</P></TD></TR> 
<%if(isAdmin){%>

<TR  height="14"><td background="pic/cus_9.jpg" height='27' >
<div align="center"><img src="pic/3.gif" width="5" height="8" /><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='userManager.jsp?vid=<%=vid%>&sid=<%=sid%>';"> �û�����</a></div></td></tr> 

<tr height="14">	 
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /> <a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='floatType.jsp?vid=<%=vid%>&sid=<%=sid%>';">��ɫѡ��</a></div></td>    
</tr>
<tr height="14">	 
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /> <a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='specFloat.jsp?vid=<%=vid%>&sid=<%=sid%>';">�߼�����</a></div></td>    
</tr>

<tr height="14">	 
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /> <a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='inviteTime.jsp?vid=<%=vid%>&sid=<%=sid%>';">��������</a></div></td>    
</tr>

<tr height="14">	 
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='code.jsp?vid=<%=vid%>&sid=<%=sid%>';"> ��ش���</a></div></td>   
</tr>

<tr height="14">	
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='quickResumes.jsp?vid=<%=vid%>&sid=<%=sid%>';"> ��ݻظ�</a></div></td>    
</tr>  

<tr height="14">	
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='addMoreDomain.jsp?vid=<%=vid%>&sid=<%=sid%>';"> վ��ά��</a></div></td>    
</tr>  
<tr height="14">	
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='logoUrl.jsp?vid=<%=vid%>&sid=<%=sid%>';"> LOGO����</a></div></td>    
</tr>
<tr height="14">	
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='pageName.jsp?vid=<%=vid%>&sid=<%=sid%>';"> ҳ���Ѻ�����</a></div></td>    
</tr>
<tr height="14">	
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='advert.jsp?vid=<%=vid%>&sid=<%=sid%>';"> �������</a></div></td>    
</tr>  

<tr height="14">	
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='siteMonitor.jsp?vid=<%=vid%>&sid=<%=sid%>';"> ��������</a></div></td>    
</tr>  

<tr height="14">	
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='shiftCredit.jsp?vid=<%=vid%>&sid=<%=sid%>';"> ת���õ�</a></div></td>    
</tr>  

<tr height="14">	
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /><a href="#" class="STYLE1" onClick="JavaScript:window.open('callBilling.jsp?vid=<%=vid%>&sid=<%=sid%>');"> ���Ѳ�ѯ</a></div></td>    
</tr>

<tr height="14">	
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='encryption.jsp?vid=<%=vid%>&sid=<%=sid%>';"> ��Ϣ����</a></div></td>    
</tr>
<%}%>

<tr height="14">	
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='block.jsp?vid=<%=vid%>&sid=<%=sid%>';"> �� �� ��</a></div></td>    
</tr>

<tr height="14">	
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='credit.jsp?vid=<%=vid%>&sid=<%=sid%>';"> ���ò�ѯ</a></div></td>    
</tr>

<tr height="14">	
    <td background="pic/cus_9.jpg" height='27'><div align="center"><img src="pic/3.gif" width="5" height="8" /><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='webStat.jsp?vid=<%=vid%>&sid=<%=sid%>';"> ����ͳ��</a></div></td>    
</tr>
<!--
<tr height="14">
	
    <td ><div align="center"><a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='historySmsMsg.jsp?vid=<%=vid%>&sid=<%=sid%>';">���ż�¼</a></div></td>
    
</tr>
-->
</table>
 
</td>
<TD width="9" height="1" bgcolor="#E4F2FF" ></TD> 
</tr>
 
</table>
</body>
</html>
 