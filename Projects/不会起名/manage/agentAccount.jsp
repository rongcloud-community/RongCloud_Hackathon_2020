<%
	/**
	 *本文件被客户端调用用来修改用户信息
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 22,2007
	 *@last modified:  Apil 22,2007
	*/
%>

<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<link href="css/style.css" rel="stylesheet" type="text/css" />
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
String sql = "";
ResultSet rs = null;
%>
<table width="783" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="783" bgcolor="#E4F2FF">代理商帐户信息：</td>
  </tr>
</table>
<br />
<table width="790" height="31" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="788" height="29" style="border-bottom: 1px solid #CCCCCC"><table width="779" border="0" bordercolor="#A5AdC4">
      <tr>
        <%
	  	sql="select balance from agentbalance where agentId=\""+vid+"\"";		 
		if(db.getConnection()==null || db.isClosed())			 
			db.setConnection(); 
		db.setSqlQuery(sql);
		rs=db.getResult();
		if(rs!=null && rs.next()){%>
        <td width="773">代理商帐务余额：<%=rs.getString("balance")%>元</td>
        <%}else{%>
        <td width="773">代理商帐务余额：0.00元</td>
        <%}%>
      </tr>
    </table></td>
  </tr>
</table>
</body>
</html>
<%
if(db.getConnection()!=null && !db.isClosed())
	db.closeConnection();
%>