<%@page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*,java.io.*"%> 
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
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
<script language="javascript">
	 var kefu=null;
	function openKefuWindow(){		
		 if(kefu==null)
			kefu=window.open("../client.jsp?vid=<%=vid%>&sid=<%=sid%>","kefu", "Status=no,scrollbars=on");
		 else
		 	try{
		 		kefu.window.focus();	
			}catch(e){
				kefu=window.open("../client.jsp?vid=<%=vid%>&sid=<%=sid%>","kefu", "Status=no,scrollbars=on");
			}	 
	}
</script>
</head>

<%
	String sql = "";
	ResultSet rs = null;
	String theFirstDomainId=userManager.getUserDomainId(vid);
	if(theFirstDomainId.indexOf(",")>0)
		theFirstDomainId=theFirstDomainId.substring(0,theFirstDomainId.indexOf(","));
	int payLevel = userManager.getSitePayLevel(theFirstDomainId); //�Ƿ�Ϊ��ѿͻ�
	String clntLogo1=null;
try{
 
	sql="select clntLogo1 from logourl where domainId=\""+theFirstDomainId+"\"";
	if(db.getConnection()==null || db.isClosed())			 
		db.setConnection(); 
	db.setSqlQuery(sql);
	rs=db.getResult();
	if(rs!=null && rs.next())
		clntLogo1=rs.getString("clntLogo1");		 
	if(db.getConnection()!=null && !db.isClosed())
			db.closeConnection();
}catch(Exception e){
	 	
}
	 
%> 
<body height='80'>
<table width="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td width="172" height="71" background="pic/cus_2.jpg" ><img src="<%=(clntLogo1!=null && !clntLogo1.equals(""))?"http://"+clntLogo1:"../images/logo2.gif"%>" width="152" height="70"></td>
    <td width="800" valign="bottom" background="pic/cus_2.jpg"><table width="800" height="" border="0">
      <tr>
	 <%if(mySession.getUserType().equals("1")){%>
	 <td width="45"><a href="#" class="STYLE1" onClick="JavaScript:parent.LeftFrame.window.location.href='menuDLS.jsp?vid=<%=vid%>&sid=<%=sid%>';">������</a></td>
        <td width="1">��</td>
	 <%}%>
	  
        <td width="58"><a href="#" class="STYLE1" onClick="JavaScript:parent.LeftFrame.window.location.href='menuZDGL.jsp?vid=<%=vid%>&sid=<%=sid%>';">վ�����</a></td>
        <td width="1">��</td>
        <td width="70"><a href="#" class="STYLE1" onClick="JavaScript:parent.LeftFrame.window.location.href='menuKHDGL.jsp?vid=<%=vid%>&sid=<%=sid%>';">�ͻ��˹���</a></td>
        <td width="1">��</td>
        <td width="58"><a href="#" class="STYLE1" onClick="JavaScript:parent.LeftFrame.window.location.href='menuFZGL.jsp?vid=<%=vid%>&sid=<%=sid%>';">��������</a></td>
        <td width="1">��</td>
        <td width="85"><a href="#" class="STYLE1" onClick="openKefuWindow()">������ҳ��</a></td>
        <td width="1"><!--��--></td>
        <td width="58"><!--<a href="#" class="STYLE1" onClick="JavaScript:window.open('http://bbs.100im.cn','','');">������̳</a>--></td>
        <td width="1"><!--��--></td>
		<td width="58">
        <!--<a href="#" class="STYLE1" onClick="JavaScript:parent.right.window.location.href='http://www.100im.cn/help.html';">���߰���</a>--></td>		  
		  <td width="123" style="font-size:14px">�汾: <%=(payLevel==0)?"��׼��":""%><%=(payLevel==1)?"��ǿ��":""%><%=(payLevel==2)?"�����":""%></td>
		   
      </tr>	  
    </table>
    </td>
  </tr>
  <tr><td height=10 colspan='2' bgcolor="#1088C7"></td>
  </tr>
</table> 
</body>
</html>
