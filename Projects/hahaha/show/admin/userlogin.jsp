<%@ page language="java" pageEncoding="gbk"%>

<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="http://struts.apache.org/tags-tiles" prefix="tiles" %>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html:html lang="true">
  <head>
    <html:base />
    
    <title>userlogin.jsp</title>
  </head>
  
  <body>
  <div align="center">
    <html:form action="user"><div> 
    	&#29992;&#25143;&#21517;:<html:text property="username"></html:text><br> 
	   	&#23494;&nbsp; &#30721;:<html:text property="userpsw"></html:text><br> 
    	</div><div><html:submit property="method"><bean:message key="button.login" /></html:submit> <html:cancel></html:cancel>
    </div></html:form>
    </div>
  </body>
</html:html>
