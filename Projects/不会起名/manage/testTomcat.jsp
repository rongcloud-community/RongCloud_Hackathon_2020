<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*" errorPage="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>�ޱ����ĵ�</title>
</head>

<body>
JVM1<br>
<%
//���Խ�������У�˵��������ÿ��tomcatʵ���б�����ͬ���ļ�
out.print("����TOMCAT���ؾ���ʱ�� apacheվ���Ӧ��tomcatĿ¼�е��ļ��Ƿ������tomcat��Ч,<br>"+
		  "���Ƿ����ֻ������һ��Ŀ¼���ļ��Ͷ����е�tomcatʵ����Ч");
out.println(session.getId());
 	
%>
<br />
<%
out.println(request.getLocalAddr() + " : " + request.getLocalPort()+"<br>");%>
<%
  out.println("<br> ID " + session.getId()+"<br>");  // ������µ� Session ��������
  String dataName = request.getParameter("dataName");
  if (dataName != null && dataName.length() > 0) {
     String dataValue = request.getParameter("dataValue");
     session.setAttribute(dataName, dataValue);
  }  out.print("<b>Session �б�</b>");  Enumeration e = session.getAttributeNames();
  while (e.hasMoreElements()) {
     String name = (String)e.nextElement();
     String value = session.getAttribute(name).toString();
     out.println( name + " = " + value+"<br>");
         System.out.println( name + " = " + value);
   }
%>
  <form action="" method="POST">
    ����:<input type=text size=20 name="dataName">
     <br>
    ֵ:<input type=text size=20 name="dataValue">
     <br>
    <input type=submit>
   </form>
</body>
</html>