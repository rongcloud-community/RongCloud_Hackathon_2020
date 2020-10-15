<%@page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*"%>
<%	 
//检测是否有目录写权限    
try{
	String file=request.getSession().getServletContext().getRealPath(request.getRequestURI());
	int n=file.lastIndexOf("\\");
	file=file.substring(0,n+1);
	file=file+"\\test.txt";	
	FileWriter   fw = new FileWriter(file,true); //false 覆盖原有文件 true追加写入
    PrintWriter   pw = new PrintWriter(fw);       
    pw.print(new java.util.Date());    
    pw.flush();     
  	pw.close();
  	fw.close(); 
	out.println("successful");   
 }catch(Exception e){
 	out.println("failed");
 }	
%>	
	 

