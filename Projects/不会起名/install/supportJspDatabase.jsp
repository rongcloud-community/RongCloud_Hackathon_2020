<%@page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*"%>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<%	 
//����Ƿ���֧�����ݿ�   
 
try {
        Class.forName("com.mysql.jdbc.Driver");
        out.println("successful");  
} catch (ClassNotFoundException ex) {
	out.println("failed");
} 
%>	
	 

