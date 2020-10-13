<%
	/**
	 *本文件被admin调用来查询某个网站的voip话费
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 26,2007
	 *@last modified:  Apil 26,2007
	*/
%>
<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date"%>
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />

<jsp:useBean id="db" scope="page"  class="msg.DbConn" />

<html>
<head>
 
<title>无标题文档</title>
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
-->
</style>
<link href="../css/talk.css" rel="stylesheet" type="text/css" />
 
</head>
<%
/////////////////////session检测////////////////////////////////////////////////
String vid="admin";
String sid=request.getParameter("sid");
msg.MySession mySession=new msg.MySession(vid);
String sessionId=mySession.getMySession().getSessionId();
if(sessionId==null || vid==null || !sessionId.equals(sid)){
	out.println("<script language=jscript>alert('你没有登陆或会话已经过期，请重新登陆。');location.assign('index.htm');</script>");			
		return;	
}
///////////////////////////////////////////////////////////////////////////////		
%>
<%
//***********************************
//变量初始化
//***********************************
String sql = "";
ResultSet rs = null;

String domain = request.getParameter("domain"); 
try
   {
	if(db.getConnection()==null || db.isClosed())			 
			db.setConnection(); 
	sql = "select * from site where domain='"+domain+"'";
	db.setSqlQuery(sql);
	rs = db.getResult();
	String domainId=null;
	if(rs!=null && rs.next())	 
		domainId = rs.getString("domainId");	
	int index=domainId.indexOf(",");
	if(index>0)
		domainId=domainId.substring(0,index);
	sql="select * from voip where domainId=\""+domainId+"\"";	
 
	db.setSqlQuery(sql);
	rs = db.getResult();
	String id="";
	if(rs!=null && rs.next()) 
 		id=rs.getString("accountId");
	db.closeConnection();
 	 
	response.sendRedirect("http://61.232.3.44/user/dc/cdrquery.asp?id="+id);	
    }catch(Exception ee){}   
%>
<body>
<table width="790" height="223" border="0" cellpadding="0" cellspacing="0">
  <tr >
    <td width="64" height="25"></td>
    <td width="726" height="25">查询站点VOIP花费：</td>
  </tr>
  <tr>
    <td width="64" height="25"> </td>
    <td width="726" height="25"><form  method="post" action="callBilling.jsp">
      <label>输入域名:
      <input type="text" name="domain">
      </label>
      <label><br>
      <input type="submit" name="submit" value="提交">
      </label>
    </form></td>
  </tr>
  <tr>
    <td height="25">&nbsp;</td>
    <td height="100" align="left" valign="middle">&nbsp;</td>
  </tr>  
  <tr>
    <td height="25">&nbsp;</td>
    <td height="100">&nbsp;</td>
  </tr>
</table>
</body>
</html>
