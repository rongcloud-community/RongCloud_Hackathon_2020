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
String id = request.getParameter("id"); 
String submit = request.getParameter("submit"); 
try{
	if(submit!=null && id!=null ){
		sql="select name from user where id=\""+id+"\"";
		if(db.getConnection()==null || db.isClosed())			 
			db.setConnection(); 
		db.setSqlQuery(sql);
		rs=db.getResult();
		boolean hasId=false;
		if(rs!=null && rs.next())
			hasId=true;
		if(hasId){
			sql="insert into agent values(\""+id+"\")";
			if(db.getConnection()==null || db.isClosed())			 
				db.setConnection(); 
			db.setSqlQuery(sql);
			if(db.executeUpdate()==1)
				out.print("<script language=javascript>alert('添加成功！');window.location='addAgent.jsp';</script>");
			else
				out.print("<script language=javascript>alert('"+id+"已经添加过！');window.location='addAgent.jsp';</script>");
		}
		else
			out.print("<script language=javascript>alert('没有找到用户"+id+"！');window.location='addAgent.jsp';</script>");
	}
}catch(Exception e){
	if(e.getMessage().indexOf("Duplicate entry")>=0)
		out.print("<script language=javascript>alert('id:"+id+"已经添加过');window.location='addAgent.jsp';</script>");
	else
		out.print("<script language=javascript>alert('数据库操作出错，少后再试');window.location='addAgent.jsp';</script>");	
}

%>
<body>
<table width="790" height="50" border="0" cellpadding="0" cellspacing="0">
  <tr  >
    <td width="41" height="25"></td>
    <td width="749" height="25">添加代理：</td>
  </tr>
  <tr  >
    <td width="41" height="25"> </td>
    <td width="749" height="25"><form  method="post" action="">
      <label>输入站点管理员ID:
      <input type="text" name="id">
      </label>
      <label>
      <input type="submit" name="submit" value="提交">
      </label>
    </form></td>
  </tr>
  <tr  >
    <td width="41" height="25"> </td>
    <td width="749" height="25">
	<a href="addAgent.jsp?action=all">获取已经添加的ID列表</a><br>
      <table width="200" border="0">
        <tr>
          <td width="58">ID</td>
          <td width="132">操作</td>
        </tr>
        <%
 String action=request.getParameter("action");
 String delete=request.getParameter("delete");
 String deleteId=request.getParameter("deleteId");
 if(action!=null && action.equals("delete") && deleteId!=null){
 	sql="delete from agent where agentId=\""+deleteId+"\"";
 	if(db.getConnection()==null || db.isClosed())			 
			db.setConnection(); 
	db.setSqlQuery(sql);
	if(db.executeUpdate()==1)
		out.print("<script language=javascript>alert('删除成功成功！');window.location='addAgent.jsp?action=all';</script>");
	else
		out.print("<script language=javascript>alert('删除失败！');window.location='addAgent.jsp?action=all';</script>");
 
 }
 if(action!=null && action.equals("all") ){
 	sql="select agentId from agent";
 	if(db.getConnection()==null || db.isClosed())			 
			db.setConnection(); 
	db.setSqlQuery(sql);
	rs=db.getResult();
	while(rs!=null && rs.next()){
 %>
        <tr>
          <td><%=rs.getString("agentId")%></td>
          <td><a href='addAgent.jsp?action=delete&deleteId=<%=rs.getString("agentId")%>'>删除</a></td>
        </tr>
        <%}}%>
      </table>
    <%
if(db.getConnection()!=null && !db.isClosed())
			db.closeConnection();
%>
	 </td>
  </tr>
</table>
</body>
</html>
