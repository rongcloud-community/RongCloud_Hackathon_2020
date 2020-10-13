<%
	/**
	 *本文件被admin调用来设置站点是否收费
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
String pay = request.getParameter("pay");
String submit = request.getParameter("submit");
try{
	if(submit!=null && domain!=null && pay!=null){
 		sql="update site set pay=\""+pay+"\"";
		if(db.getConnection()==null || db.isClosed())			 
			db.setConnection(); 
		db.setSqlQuery(sql);
 		db.executeUpdate();
		if(pay.equals("true"))
 	    	out.print("已经对站点"+domain+"设置为收费模式。");
		else
			out.print("已经对站点"+domain+"设置为免费模式。");
		if(db.getConnection()!=null && !db.isClosed())
			db.closeConnection();	 
	}
}catch(Exception e){
	if(db.getConnection()!=null && !db.isClosed())
		db.closeConnection();	
}

%>
<body>
<table width="790" height="223" border="0" cellpadding="0" cellspacing="0">
  <tr >
    <td width="64" height="25"></td>
    <td width="726" height="25">设置站点是否免费：</td>
  </tr>
  <tr>
    <td width="64" height="25"> </td>
    <td width="726" height="25"><form  method="post" action="setPay.jsp">
      <label>输入域名:
      <input type="text" name="domain">
      </label>
      <label> <br>
      <input type="radio" name="pay" value="false">
      免费 
      <input type="radio" name="pay" value="true">
      收费<br>
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
