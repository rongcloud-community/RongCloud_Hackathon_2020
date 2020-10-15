<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*,com.jspsmart.upload.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date,msg.*"%>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<%	 
//检测是否有支持数据库    
try	
{		  
	SmartUpload su = new SmartUpload();  
	su.initialize(pageContext);
	su.service(request,response);
	 
	su.setMaxFileSize(5000000); 
	su.setAllowedFilesList("jpg,gif,bmp,doc,rar,zip,xsl,ppt");
	su.setDeniedFilesList("exe,bat,jsp,htm,html,asp,");  
 
	out.println("successful");  		
}catch(Exception e){out.println("failed");} 
 
%>	
	 

