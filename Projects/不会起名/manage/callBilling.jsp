<%
	/**
	 *本文件被客户调用用来查询VOIP话费清单
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 22,2007
	 *@last modified:  Apil 22,2007
	*/
%>
<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date"%>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" /> 
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
//***********************************
//获取变量值
//***********************************
//取出登录用户的用户名
scomClient = vid;
 
   //连接数据库
   
   try
   {
	if(db.getConnection()==null || db.isClosed())			 
		db.setConnection();  
	sql = "select * from user where id='"+scomClient+"'";
	db.setSqlQuery(sql);
	rs = db.getResult();
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
	if(db.getConnection()!=null && !db.isClosed())
		db.closeConnection();	
response.sendRedirect("http://voip.100im.cn/user/dc/cdrquery.asp?id="+id);	
    }catch(Exception ee){}   
 
%>

