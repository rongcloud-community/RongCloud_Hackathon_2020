<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,dbpool.*,com.jspsmart.upload.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date"%>
 
 
<%
DBConnectionManager dbpool= DBConnectionManager.getInstance();
String sql="select * from site";
Connection connection=dbpool.getConnection("mysql"); 
PreparedStatement select_stm=connection.prepareStatement(sql,
								 ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);			 
ResultSet rs=select_stm.executeQuery(); 
while(rs!=null && rs.next())
	out.println(rs.getString("domain"));
%>