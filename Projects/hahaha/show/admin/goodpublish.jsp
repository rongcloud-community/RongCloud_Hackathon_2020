<%@ page language="java"  import="java.sql.ResultSet,java.sql.SQLException"  pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean"%> 
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html"%>
 
<html> 
	<head>
		<title>JSP for GoodUpdateForm form</title>
	</head>
		<%!String typename; 
	ResultSet typelist;
%>	
<%
	typelist = (ResultSet)session.getAttribute("typename");
 %>
	<body>
	<div align="center">
	<strong><font size="5" color="#ff80c0"><br><br><br>&#22686;&#21152;&#26032;&#30340;&#21830;&#21697;<br><br></font></strong>
		<html:form action="/goodManager">
			商品名称 : <html:text property="goodname"/><html:errors property="goodname"/><br/>
			商品类别 : <select name="goodtype">
    	<%
    		while(typelist.next()){
    			%>
    			
    		<option value="<%=typelist.getString(1) %>" ><%=typelist.getString(1) %></option><%
    			}
    	 %>
    	</select><br>
			作者姓名 : <html:text property="goodpublisher"/><html:errors property="goodpublisher"/><br/>
			商品价格 : <html:text property="goodprice"/><html:errors property="goodprice"/><br/>
			商品描述 : <html:textarea cols="30" rows="5" property="gooddesc"/><html:errors property="gooddesc"/><br/>
			<html:submit property="method" > <bean:message key="button.save"/></html:submit> <html:cancel/>
		</html:form>
		</div>
	</body>
</html>

