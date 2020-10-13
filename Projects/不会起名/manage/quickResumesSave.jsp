<%
	/**
	 *本文件被客户端管理员调用保存快捷恢复用语
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 22,2007
	 *@last modified:  Apil 22,2007
	*/
%>
<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*,com.jspsmart.upload.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date"%>
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
</head>
<%
/////////////////////session检测////////////////////////////////////////////////
String vid=request.getParameter("vid");
String sid=request.getParameter("sid");
msg.MySession mySession=new msg.MySession(vid);
String sessionId=mySession.getMySession().getSessionId();
if(sessionId==null || vid==null || !sessionId.equals(sid)){
  out.println("<script language=jscript>alert('您的帐号已经在其它地方登陆，只有重新登陆才可使用。');location.assign('index.htm');</script>");			
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
String domainId = "";
String ssdomainId = "";
String action = "";
String content = "";
String catalog = "";

try
{
	domainId = userManager.getUserDomainId(vid);	
	action = request.getParameter("action");	
	id = request.getParameter("id");
}catch(Exception ee){}

//连接数据库
if(db.getConnection()==null || db.isClosed())			 
	db.setConnection();  
//增加快捷回复
if(action!=null && action.equals("addResume"))
{
	try
	{
		ssdomainId = request.getParameter("ssdomainId");
		catalog = new String( (request.getParameter("catalog")).getBytes("iso-8859-1"),"utf-8" );
		content = new String( (request.getParameter("content")).getBytes("iso-8859-1"),"utf-8" );

		//插入数据库
		sql="insert into shortcut values ('',\'"+ssdomainId+"\',\'"+catalog+"\',\'"+content+"\')";
		db.setSqlQuery(sql);
		db.executeUpdate();
		
		out.print("<script language=javascript>alert('添加成功！');window.location='quickResumes.jsp?vid="+vid+"&sid="+sid+"';</script>");
	}catch(Exception ee){}	
}
//修改快捷回复
else if(action!=null && action.equals("editResume"))
{
	try
	{
		catalog = new String( (request.getParameter("catalog")).getBytes("iso-8859-1"),"utf-8" );
		content = new String( (request.getParameter("content")).getBytes("iso-8859-1"),"utf-8" );
		
		sql="update shortcut set catalog=\'"+catalog+"\',content=\'"+content+"\' where id='"+id+"'";
		db.setSqlQuery(sql);
		db.executeUpdate();
		
		out.print("<script language=javascript>alert('修改成功');window.location='quickResumes.jsp?vid="+vid+"&sid="+sid+"';</script>");
	}catch(Exception ee){}
}
//删除快捷回复
else if(action!=null && action.equals("delResume"))
{
	sql="delete from shortcut where id='"+id+"'";
	db.setSqlQuery(sql);
	db.executeUpdate();
	
	out.print("<script language=javascript>alert('删除成功');window.location='quickResumes.jsp?vid="+vid+"&sid="+sid+"';</script>");
}
if(db.getConnection()!=null && !db.isClosed())
		db.closeConnection();		
%>
<body>
</body>
</html>
