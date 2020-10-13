<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date"%>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<%
	 String latitude=request.getParameter("la");
	 String longtitude=request.getParameter("lo");
	 Log.log(latitude+" "+longtitude);
	 
%>