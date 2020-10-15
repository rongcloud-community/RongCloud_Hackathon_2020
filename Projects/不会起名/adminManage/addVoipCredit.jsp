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
//***********************************
//变量初始化
//***********************************
String sql = "";
ResultSet rs = null;

String domain = request.getParameter("domain");
String credit = request.getParameter("credit");
String submit = request.getParameter("submit");
try{
	 
	 
}catch(Exception e){}

%>
<body>
<table width="790" height="223" border="0" cellpadding="0" cellspacing="0">
  <tr >
    <td width="64" height="25"></td>
    <td width="726" height="25">添加站点VOIP信用点：</td>
  </tr>
  <tr>
    <td width="64" height="25"> </td>
    <td width="726" height="25"><form  method="post" action="addVoipCredit.jsp">
      <label>输入域名:
      <input type="text" name="domain">
      </label>
      <label> <br>
      输入信用点:
      <input type="text" name="credit">
      <br>
      <input type="submit" name="submit" value="提交">
      </label>
    </form></td>
  </tr>
  <tr>
    <td height="25">&nbsp;</td>
    <td height="100" align="left" valign="middle">to be finished </td>
  </tr>  
  <tr>
    <td height="25">&nbsp;</td>
    <td height="100">&nbsp;</td>
  </tr>
</table>
</body>
</html>
