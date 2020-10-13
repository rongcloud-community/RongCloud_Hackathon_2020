<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*, java.util.*, java.net.*"%> 
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<%
	String curURL=request.getParameter("url");  //当前网址
	out.print(userManager.getShortcut(curURL));
%>
