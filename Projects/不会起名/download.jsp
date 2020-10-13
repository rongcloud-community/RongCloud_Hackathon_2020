<%@ page contentType="text/html;charset=gb2312"%><%@ page import="com.jspsmart.upload.*"%><%
response.reset();
//在jsp代码的括弧之间不能有空格 否则linux会报错
String fileName=request.getParameter("fileName");
SmartUpload su=new SmartUpload();
su.initialize(pageContext);
su.setContentDisposition(null);
su.downloadFile("temp/"+fileName);
%>