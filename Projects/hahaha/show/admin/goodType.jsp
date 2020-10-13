<%@ page language="java"  import="java.sql.ResultSet,java.sql.SQLException"  pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean"%> 
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html"%>
 
<html> 
	<head>
		<title>JSP for GoodTypeForm form</title>
	</head>
	<%!String typename; 
	ResultSet typelist;
%>	
<%
	typelist = (ResultSet)session.getAttribute("typename");
 %>
	<body>
	<jsp:include flush="true" page="/goodType.do?method=show">
  		<jsp:param name="typename" value="1" />
  		<jsp:param name="typetime" value="2" />
  	</jsp:include>
  	
	<div align="center"><font size="5" color="#ff80c0"><strong><br><br><br>&#22686;&#21152;&#26032;&#30340;&#21830;&#21697;&#31867;&#21035;<br><br></strong></font>
		<html:form action="/goodType" target="mainFrame">
			新增商品类别名 : <html:text property="typename"/><html:errors property="typename"/><br/>
			<html:submit property="method"><bean:message key="button.addtype" /></html:submit><html:cancel/>
		</html:form>
		</div>
	</body>
</html>

