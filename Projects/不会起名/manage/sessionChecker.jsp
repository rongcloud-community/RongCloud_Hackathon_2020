<%@page contentType="text/html; charset=utf-8" language="java"  %>
<%
/////////////////////session���////////////////////////////////////////////////
String vid=request.getParameter("vid");
String sid=request.getParameter("sid");
msg.MySession mySession=new msg.MySession(vid);
String sessionId=mySession.getMySession().getSessionId();
if(sessionId==null || vid==null || !sessionId.equals(sid)){
	out.println("<script language=jscript>alert(\"��û�е�½��Ự�Ѿ����ڣ������µ�½��\");location.assign(\"index.htm\");</script>");			
		return;	
}
///////////////////////////////////////////////////////////////////////////////		
%>