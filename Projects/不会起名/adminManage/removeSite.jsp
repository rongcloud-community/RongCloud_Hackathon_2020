<%
	/**
	 *本文件被admin调用来修改某个网站的客服人员
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

String id = "";
String level = "";
String domainIds="";
String submit=null;
//***********************************
//获取变量值
//***********************************
//取出登录用户的用户名，也就是id
//id = (String)session.getValue("scomClient");
//超级管理后台中该id通过参数获取
id=request.getParameter("id");
submit=request.getParameter("submit");

if(submit!=null){
	domainIds=userManager.getUserDomainId(id); 
	try{
 		sql="update site set domain=concat(domain,\"_X\") where domainIds=\""+domainIds+"\" and parentId=\"0\"";
		if(db.getConnection()==null || db.isClosed())			 
		  db.setConnection(); 
		db.setSqlQuery(sql);
		if( db.executeUpdate()>0) {
			sql="update user set id=concat(id,\"_X\") where id=\""+id+"\"";
			if(db.getConnection()==null || db.isClosed())			 
			  db.setConnection(); 
			db.setSqlQuery(sql);
			db.executeUpdate();
			out.println("已将用户"+id+"更改为"+id+"_X, 同时其下的第一个域名也添加了_X.");
		}
		else
			out.println("数据库中没有查到用户，请确认你输入的id: "+ id+"正确。");
 		if(db.getConnection()!=null && !db.isClosed())
			db.closeConnection();	 
		 
	}catch(Exception e){
		db.getConnection().rollback();
		out.println("数据库操作异常： error:"+e.getMessage());
		if(db.getConnection()!=null && !db.isClosed())
			db.closeConnection();
	}
	
}
%>
<body>
<table width="790" height="74" border="0" cellpadding="0" cellspacing="0">
  <tr class="content10White">
    <td width="588" height="16">删除管理员下的所有站点：(为保留数据，仅将管理员和第一站点域名后添加_X)</td>
  </tr>
  <tr class="content10White">
    <td width="588" height="25"><form  method="post" action="">
      <label>输入站点管理员ID:
      <input type="text" name="id" value='<%=(id!=null && !id.equals(""))?id:""%>' size='30'>
      </label>
      <label>
      <input type="submit" name="submit" value="删除管理员下的站点">
      </label>
    </form></td>
  </tr>
</table>
</body>
</html>
