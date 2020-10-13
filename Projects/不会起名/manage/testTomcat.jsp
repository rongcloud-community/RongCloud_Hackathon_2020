<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*" errorPage="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>无标题文档</title>
</head>

<body>
JVM1<br>
<%
//测试结果：不行，说明必须在每个tomcat实例中保存相同的文件
out.print("测试TOMCAT负载均衡时， apache站点对应的tomcat目录中的文件是否对其他tomcat有效,<br>"+
		  "即是否可以只更改那一个目录的文件就对所有的tomcat实例有效");
out.println(session.getId());
 	
%>
<br />
<%
out.println(request.getLocalAddr() + " : " + request.getLocalPort()+"<br>");%>
<%
  out.println("<br> ID " + session.getId()+"<br>");  // 如果有新的 Session 属性设置
  String dataName = request.getParameter("dataName");
  if (dataName != null && dataName.length() > 0) {
     String dataValue = request.getParameter("dataValue");
     session.setAttribute(dataName, dataValue);
  }  out.print("<b>Session 列表</b>");  Enumeration e = session.getAttributeNames();
  while (e.hasMoreElements()) {
     String name = (String)e.nextElement();
     String value = session.getAttribute(name).toString();
     out.println( name + " = " + value+"<br>");
         System.out.println( name + " = " + value);
   }
%>
  <form action="" method="POST">
    名称:<input type=text size=20 name="dataName">
     <br>
    值:<input type=text size=20 name="dataValue">
     <br>
    <input type=submit>
   </form>
</body>
</html>