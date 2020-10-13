<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,dbpool.*,com.jspsmart.upload.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date"%>
 
 
<%
DBConnectionManager dbpool= DBConnectionManager.getDocInstance();
out.println(dbpool.toString("mysql"));
%>