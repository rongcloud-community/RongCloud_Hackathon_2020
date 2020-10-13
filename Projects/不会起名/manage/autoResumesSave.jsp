<%
	/**
	 *本文件被客户端调用用来保存自动恢复信息
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 22,2007
	 *@last modified:  Apil 22,2007
	*/
%>
<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date"%>
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

String scomClient = "";
String domainId = "";//用来标示库内是否有此用户的设置状态，不论是否为空
String onlineMsg = "";
String offlineMsg = "";
String leftMsg = "";

//***********************************
//获取变量值
//***********************************
//取出登录用户的用户名
scomClient = vid;

domainId = request.getParameter("domainId");
onlineMsg = new String( (request.getParameter("onlineMsg")).getBytes("iso-8859-1"),"utf-8" );
offlineMsg =  new String( (request.getParameter("offlineMsg")).getBytes("iso-8859-1"),"utf-8" );
leftMsg =  new String( (request.getParameter("leftMsg")).getBytes("iso-8859-1"),"utf-8" );

//连接数据库
if(db.getConnection()==null || db.isClosed())			 
	 db.setConnection(); 
try
{
	//当库内还没有此用户的记录，则新增
	if(domainId!=null && domainId.equals(""))
	{
		sql = "insert into answermessage values (\'"+scomClient+"\',\'"+onlineMsg+"\',\'"+offlineMsg+"\',\'"+leftMsg+"\')";
		db.setSqlQuery(sql);
		db.executeUpdate();
		
		out.print("<script language=javascript>alert('设置成功！');window.location='autoResumes.jsp?vid="+vid+"&sid="+sid+"';</script>");
	}
	//当库内已经有此用户的记录，可能为空，此时修改
	else if(domainId!=null && !domainId.equals(""))
	{
		sql = "update answermessage set onlineMsg=\'"+onlineMsg+"\',offlineMsg=\'"+offlineMsg+"\',leftMsg=\'"+leftMsg+"\' where id='"+scomClient+"'";
		db.setSqlQuery(sql);
		db.executeUpdate();
		
		out.print("<script language=javascript>alert('修改成功！');window.location='autoResumes.jsp?vid="+vid+"&sid="+sid+"';</script>");
	}	
}catch(Exception ee){}
//关闭数据库
if(db.getConnection()!=null && !db.isClosed())
	db.closeConnection();
%>
<body>
</body>
</html>
