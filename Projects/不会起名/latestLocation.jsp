<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date"%>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<%
	 String latitude=request.getParameter("la");
	 String longtitude=request.getParameter("lo");
	String sql = "";
	ResultSet rs = null;
	try
{
	 
	 if(db.getConnection()==null || db.isClosed())			 
	 	db.setConnection(); 
	sql = "select  where id='"+id+"'";
	db.setSqlQuery(sql);
	rs = db.getResult();
	if(rs!=null && rs.next())
}catch(Exception ee){}	 
%>