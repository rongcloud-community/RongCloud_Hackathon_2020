<%
	/**
	 *���ļ���admin��������ѯ�������ĵ�ǰ״̬
	 *
	 *@author: �ش��� ��������ʱ�����缼�����޹�˾
	 *@time: Apil 26,2007
	 *@last modified:  Apil 26,2007
	*/
%>
<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,dbpool.*,com.jspsmart.upload.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date"%>
<%
/////////////////////session���////////////////////////////////////////////////
String vid="admin";
String sid=request.getParameter("sid");
msg.MySession mySession=new msg.MySession(vid);
String sessionId=mySession.getMySession().getSessionId();
if(sessionId==null || vid==null || !sessionId.equals(sid)){
	out.println("<script language=jscript>alert('��û�е�½��Ự�Ѿ����ڣ������µ�½��');location.assign('index.htm');</script>");			
		return;	
}
///////////////////////////////////////////////////////////////////////////////		
%>
 
<%
DBConnectionManager dbpool= DBConnectionManager.getDocInstance();
out.println(dbpool.toString("mysql"));
%>