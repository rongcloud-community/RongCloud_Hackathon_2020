<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*" errorPage="" %>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<%
int counter=0;
String companyName="";
String domain="";
String start="";
int maxId=0;
 
String maxDomainId=request.getParameter("maxDomainId");
String sql = "";
ResultSet rs = null;
sql = "select domainId,domain,companyName,start from site order by start DESC limit 0,20";
if(maxDomainId!=null)
	sql = "select domainId,domain,companyName,start from site where domainId>"+maxDomainId+" order by start DESC limit 0,20";
db.setSqlQuery(sql);
if(db.getConnection()==null || db.isClosed())			 
	 db.setConnection(); 
rs=db.getResult();

 
	String result="";
	while(rs!=null && rs.next()){
		if(rs.getInt("domainId")>maxId)
				maxId=rs.getInt("domainId");
			companyName=rs.getString("companyName");	
			domain=rs.getString("domain");
			if(companyName==null || companyName.equals(""))
				companyName=domain;
			if(companyName!=null && companyName.length()>15)
				companyName=companyName.substring(0,15)+"...";	
			start=rs.getString("start");
			if(start!=null && start.length()>5)	
				start=start.substring(5,start.indexOf(" "));
	%><a href="http://<%=domain%>" target="_blank"  title="<%=domain%>"><%=companyName%></a>[<%=start%>]<br>
	<%} 
		if(maxId>0) {%>maxId=<%=String.valueOf(maxId)%><%}
		else{%>maxId=<%=maxDomainId%><%} 
	if(db.getConnection()!=null && !db.isClosed())
		db.closeConnection(); 
%> 
 