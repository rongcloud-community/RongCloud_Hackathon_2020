<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean"%> 
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html"%>
 
<html> 
	<head>
		<title>JSP for UserForm form</title>
	</head>
	<body>
	<div align="center">
		<html:form action="/user">
			用户帐号 : <html:text property="username"/><html:errors property="username"/><br/>
			用户密码 : <html:text property="userpsw"/><html:errors property="userpsw"/><br/>
			电子邮箱 : <html:text property="useremail"/><html:errors property="useremail"/><br/>
			<html:submit property="method"><bean:message key="button.regist"/></html:submit><html:cancel/>
		</html:form>
		</div>
	</body>
</html>

