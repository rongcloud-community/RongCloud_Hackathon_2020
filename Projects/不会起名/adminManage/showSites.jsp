<%
	/**
	 *本文件被admin调用来查询已经注册的网站
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
int totalRegistered=0;
int todayRegistered=0;
try{	
	String sql = "select count(*) as total from site";
	db.setSqlQuery(sql);
	if(db.getConnection()==null || db.isClosed())			 
		db.setConnection(); 
	ResultSet rs = db.getResult();
	if(rs!=null && rs.next())
		totalRegistered=rs.getInt("total");
	sql="select count(*) as total from site where start >=\""+ webStat.getTimeString("startOfToday")+"\"";	 
	db.setSqlQuery(sql);
	if(db.getConnection()==null || db.isClosed())			 
		db.setConnection(); 		
	rs = db.getResult();
	if(rs!=null && rs.next())
		todayRegistered=rs.getInt("total");
	if(db.getConnection()!=null && !db.isClosed())
			db.closeConnection();	

}catch(Exception e){}

%>
<body>
<table width="780" border="0" cellpadding="0" cellspacing="0" class="content9">
  <tr class="content10White">
    <td width="10" height="25">&nbsp;</td>
    <td width="770" height="25">注册网站统计结果：</td>
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
          <td width="127" height="25">注册网站总数</td>
          <td width="122">今日注册网站数</td>
           
        </tr> 
        <tr class="content10hui">
          <td height="25"><%=String.valueOf(totalRegistered)%> </td>
          <td><%=String.valueOf(todayRegistered)%> </td>          
        </tr>   
         <tr>
           <td height="25" colspan=4>&nbsp;</td>
         </tr>  
      </table>
       
    </td>
  </tr>
</table>
<br>
</body>
</html>
