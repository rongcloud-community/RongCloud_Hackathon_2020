<%@ page language="java" import="java.sql.ResultSet,java.sql.SQLException" pageEncoding="gbk"%>

<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="http://struts.apache.org/tags-tiles" prefix="tiles" %>

<html:html>
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
  	</jsp:include><br><br><div align="center"><font color="#ff80c0" size="2"><strong>
  	&#21830;&#21697;&#26597;&#35810;</strong></font>
  	
    <html:form action="/goodManager" target="mainFrame" ><font size="2"> 
    	&#20851;&#38190;&#23383;:</font>
    	
    	<html:text size="12"  property="goodname"></html:text><br>
       
    	<font size="2">&nbsp;&nbsp;&nbsp;&nbsp; &#21830;&#21697;&#31867;&#22411; :</font>
    	
    	<select name="goodtype">
    	<%
    		while(typelist.next()){
    			%>
    			
    		<option value="<%=typelist.getString(1) %>" ><%=typelist.getString(1) %></option><%
    			}
    	 %>
    	</select><br>
    	
    	<html:submit property="method" ><bean:message key="show"/></html:submit><html:cancel></html:cancel>
    	
    	</html:form>
</div>
</body>
</html:html>
