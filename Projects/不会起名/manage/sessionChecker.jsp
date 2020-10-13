<%@page contentType="text/html; charset=utf-8" language="java"  %>
<%
/////////////////////session检测////////////////////////////////////////////////
String vid=request.getParameter("vid");
String sid=request.getParameter("sid");
msg.MySession mySession=new msg.MySession(vid);
String sessionId=mySession.getMySession().getSessionId();
if(sessionId==null || vid==null || !sessionId.equals(sid)){
	out.println("<script language=jscript>alert(\"你没有登陆或会话已经过期，请重新登陆。\");location.assign(\"index.htm\");</script>");			
		return;	
}
///////////////////////////////////////////////////////////////////////////////		
%>