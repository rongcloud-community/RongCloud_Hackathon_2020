<%@page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*"%>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<%	 
//检测是否有支持数据库   
 
try {
        Class.forName("com.mysql.jdbc.Driver");
        out.println("successful");  
} catch (ClassNotFoundException ex) {
	out.println("failed");
} 
%>	
	 

