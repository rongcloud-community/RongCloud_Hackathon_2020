<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*" errorPage="" %>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />  
<%
String sql = "";
ResultSet rs = null;
sql = "select groupName,date from groups group by groupId DESC limit 0,8";
db.setSqlQuery(sql);
if(db.getConnection()==null || db.isClosed())			 
	 db.setConnection(); 
rs=db.getResult();
while(rs!=null && rs.next()){%><%=rs.getString("groupName")%>[<%=rs.getString("date")%>]|<%}
if(db.getConnection()!=null && !db.isClosed())
	db.closeConnection();
%>