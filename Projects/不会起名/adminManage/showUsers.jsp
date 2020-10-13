<%
	/**
	 *本文件被admin调用来查询当前用户状态
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 26,2007
	 *@last modified:  Apil 26,2007
	*/
%>
<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*"%>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<jsp:useBean id="webStat" scope="page"  class="msg.WebStat" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<style type="text/css">
<!--
body {
	margin-right: 0px;
	margin-bottom: 0px;
}
-->
</style>
<link href="../css/talk.css" rel="stylesheet" type="text/css" />
</head>
<%
/////////////////////session检测////////////////////////////////////////////////
String vid=request.getParameter("vid");
String sid=request.getParameter("sid");
msg.MySession mySession=new msg.MySession(vid);
String sessionId=mySession.getMySession().getSessionId();
if(sessionId==null || vid==null || !sessionId.equals(sid) || !mySession.getUserType().equals("0")){
	out.println("<script language=jscript>alert('你没有登陆或会话已经过期，请重新登陆。');location.assign('index.htm');</script>");			
		return;	
}
///////////////////////////////////////////////////////////////////////////////		
%>
<%  
int totalUsers=0;
int totalVisitors=0;
int totalSites=0;
int totalTopSites=0;

int totalTodayUsers=0;
int totalTodaySites=0;
int totalTodayTopSites=0;

int totalOnlineUsers=0;
int totalOnlineVisitors=0;
try{	
	////////////获取所有客户端////////////////////////
	String sql = "select count(*) as total from user";
	db.setSqlQuery(sql);
	if(db.getConnection()==null || db.isClosed())			 
		db.setConnection(); 
	ResultSet rs = db.getResult();
	if(rs!=null && rs.next())
		totalUsers=rs.getInt("total");
	////////////获取所有访问者////////////////////////
	sql="select count(*) as total from visitor";	 
	db.setSqlQuery(sql);
	if(db.getConnection()==null || db.isClosed())			 
		db.setConnection(); 		
	rs = db.getResult();
	if(rs!=null && rs.next())
		totalVisitors=rs.getInt("total");
	//////////获取所有网站//////////////////////////////
	sql="select count(*) as total from site";	 
	db.setSqlQuery(sql);
	if(db.getConnection()==null || db.isClosed())			 
		db.setConnection(); 		
	rs = db.getResult();
	if(rs!=null && rs.next())
		totalSites=rs.getInt("total");	
	//////////获取所有网站//////////////////////////////
	sql="select count(*) as total from site where parentId=0";	 
	db.setSqlQuery(sql);
	if(db.getConnection()==null || db.isClosed())			 
		db.setConnection(); 		
	rs = db.getResult();
	if(rs!=null && rs.next())
		totalTopSites=rs.getInt("total");	
		
	//////////获取今天新添加的客户端//////////////////////////////
 	sql="select count(*) as total from user where startTime >=\""+ webStat.getTimeString("startOfToday")+"\"";	 
	db.setSqlQuery(sql);
	if(db.getConnection()==null || db.isClosed())			 
		db.setConnection(); 		
	rs = db.getResult();
	if(rs!=null && rs.next())
		totalTodayUsers=rs.getInt("total");
	//////////获取今天新注册的网站//////////////////////////////
	sql="select count(*) as total from site where parentId=0 and start >=\""+ webStat.getTimeString("startOfToday")+"\"";	 
	db.setSqlQuery(sql);
	if(db.getConnection()==null || db.isClosed())			 
		db.setConnection(); 		
	rs = db.getResult();
	if(rs!=null && rs.next())
		totalTodayTopSites=rs.getInt("total");
	//////////获取今天新添加（包括注册）的网站//////////////////////////////
	sql="select count(*) as total from site where start >=\""+ webStat.getTimeString("startOfToday")+"\"";	 
	db.setSqlQuery(sql);
	if(db.getConnection()==null || db.isClosed())			 
		db.setConnection(); 		
	rs = db.getResult();
	if(rs!=null && rs.next())
		totalTodaySites=rs.getInt("total");
		
	//////////获取当前在线的客户端//////////////////////////////
	sql="select count(*) as total from user where state<>\"OFFLINE\"";	 
	db.setSqlQuery(sql);
	if(db.getConnection()==null || db.isClosed())			 
		db.setConnection(); 		
	rs = db.getResult();
	if(rs!=null && rs.next())
		totalOnlineUsers=rs.getInt("total");
	//////////获取当前在线的访问者//////////////////////////////
	sql="select count(*) as total from visitor where state<>\"OFFLINE\"";	 
	db.setSqlQuery(sql);
	if(db.getConnection()==null || db.isClosed())			 
		db.setConnection(); 		
	rs = db.getResult();
	if(rs!=null && rs.next())
		totalOnlineVisitors=rs.getInt("total");
	 
	
	if(db.getConnection()!=null && !db.isClosed())
			db.closeConnection();	

}catch(Exception e){}

%>
<body>
<table width="780" border="0" cellpadding="0" cellspacing="0" class="content9">
  <tr class="content10White">
    <td width="10" height="25">&nbsp;</td>
    <td width="770" height="25">用户统计结果：</td>
  </tr>
  <tr>
    <td height="25">&nbsp;</td>
    <td height="25">
<br>
<table width="501" border="0" cellpadding="0" cellspacing="1" bgcolor="#CCCCCC">
        <tr class="content10hui">
          <td height="25" colspan=4>&nbsp;</td>
        </tr>       
        <tr class="content10hui">
          <td height="25" bgcolor="#66CCFF">现有客户端总数</td>
          <td bgcolor="#66CCFF"><%=String.valueOf(totalUsers)%> </td>          
        </tr>   
         <tr class="content10hui">
           <td height="25" bgcolor="#66CCFF" >现有访问者总数</td>
           <td bgcolor="#66CCFF" ><%=String.valueOf(totalVisitors)%> </td>
         </tr>
		  <tr class="content10hui">
          <td width="299" height="25" bgcolor="#66CCFF">客户端总数+访问者总数</td>
          <td width="199" bgcolor="#66CCFF"><%=String.valueOf(totalUsers+totalVisitors)%></td>
        </tr> 
		
		 <tr>
           <td height="25" bgcolor="#66CCCC" >现有注册网站总数</td>
           <td bgcolor="#66CCCC"><%=String.valueOf(totalTopSites)%> </td>
         </tr>
		  <tr>
           <td height="25" bgcolor="#66CCCC">现有注册后添加网站总数</td>
           <td bgcolor="#66CCCC"><%=String.valueOf(totalSites-totalTopSites)%> </td>
         </tr>
		 <tr>
           <td height="25" bgcolor="#66CCCC" >现有网站总数(注册网站总数+添加网站总数)</td>
          <td bgcolor="#66CCCC" ><%=String.valueOf(totalSites)%> </td>
        </tr>
		<tr>
           <td height="25" bgcolor="#66CC99" >今日新注册网站数</td>
           <td bgcolor="#66CC99" ><%=String.valueOf(totalTodayTopSites)%> </td>
         </tr> 
		 <tr>
           <td height="25" bgcolor="#66CC99" >今日新添加网站数</td>
           <td bgcolor="#66CC99" ><%=String.valueOf(totalTodaySites-totalTodayTopSites)%> </td>
         </tr> 
		 <tr>
           <td height="25" bgcolor="#66CC99" >今日新增加网站数(包括注册和添加)</td>
           <td bgcolor="#66CC99" ><%=String.valueOf(totalTodaySites)%> </td>
         </tr>  
		 
         <tr>
           <td height="25" bgcolor="#FF9900" >今日新增加客户端总数</td>
           <td bgcolor="#FF9900" ><%=String.valueOf(totalTodayUsers)%> </td>
         </tr>  
		  <tr>
           <td height="25" bgcolor="#33CCFF" >当前在线客户端总数</td>
           <td bgcolor="#33CCFF" ><%=String.valueOf(totalOnlineUsers)%> </td>
         </tr>
         <tr>
           <td height="25" bgcolor="#33CCFF">当前在线访问者总数</td>
           <td bgcolor="#33CCFF" ><%=String.valueOf(totalOnlineVisitors)%> </td>
         </tr>  
		 <tr>
           <td height="25" bgcolor="#33CCFF" >当前在线用户总数（客户端＋访问者）</td>
           <td bgcolor="#33CCFF" ><%=String.valueOf(totalOnlineVisitors+totalOnlineUsers)%> </td>
         </tr>  
      </table>      
    </td>
  </tr>
</table>
<br>
</body>
</html>
