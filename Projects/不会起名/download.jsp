<%@ page contentType="text/html;charset=gb2312"%><%@ page import="com.jspsmart.upload.*"%><%
response.reset();
//��jsp���������֮�䲻���пո� ����linux�ᱨ��
String fileName=request.getParameter("fileName");
SmartUpload su=new SmartUpload();
su.initialize(pageContext);
su.setContentDisposition(null);
su.downloadFile("temp/"+fileName);
%>