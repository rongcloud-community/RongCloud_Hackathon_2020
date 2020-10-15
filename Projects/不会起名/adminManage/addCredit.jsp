<%
	/**
	 *本文件被admin调用来给站点添加短信息信用点
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
<script language=javascript>
function userCheck(formName)
{
	if(formName.id.value=="")
	{
		alert("登录名不能为空！");
		formName.id.focus();
		return false;
	}
	if(formName.password.value=="")
	{
		alert("密码不能为空！");
		formName.password.focus();
		return false;
	}
	if(formName.type.value=="")
	{
		alert("所属部门不能为空！");
		formName.type.focus();
		return false;
	}
	if(formName.name.value=="")
	{
		alert("用户名称不能为空！");
		formName.name.focus();
		return false;
	}
}
</script>
</head>

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
	if(submit!=null && domain!=null && credit!=null){
		sql="update site set credit=credit +"+credit+" where domain=\""+domain+"\"";
		if(db.getConnection()==null || db.isClosed())			 
			db.setConnection(); 
		db.setSqlQuery(sql);
		db.executeUpdate();
		out.print("<script language=javascript>alert('添加成功！');window.location='addCredit.jsp';</script>");
	}
}catch(Exception e){}

%>
<body>
<table width="790" height="223" border="0" cellpadding="0" cellspacing="0">
  <tr >
    <td width="64" height="25"></td>
    <td width="726" height="25">给站点添加短信息信用点：</td>
  </tr>
  <tr>
    <td width="64" height="25"> </td>
    <td width="726" height="25"><form  method="post" action="addCredit.jsp">
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
    <td height="100" align="left" valign="middle">&nbsp;</td>
  </tr>  
  <tr>
    <td height="25">&nbsp;</td>
    <td height="100">&nbsp;</td>
  </tr>
</table>
</body>
</html>
