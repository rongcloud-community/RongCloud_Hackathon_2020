<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*, java.util.*, java.net.*,msg.*"%>
<jsp:useBean id="msgManager" scope="page"  class="msg.MsgManager" />
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<% 
	String vid=request.getParameter("vid");   //请求类别
	 Message[] messages=msgManager.readLeftMsg(vid);				 
	 out.println(msgManager.readMsgInXml(messages)); 
	 	
%>
<head>
<title>时空网站交谈客户端</title>
</head>

<body>
</body>