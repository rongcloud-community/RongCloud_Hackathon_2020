<%@page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*"%>
<%	 
//����Ƿ���Ŀ¼дȨ��    
try{
	String file=request.getSession().getServletContext().getRealPath(request.getRequestURI());
	int n=file.lastIndexOf("\\");
	file=file.substring(0,n+1);
	file=file+"\\test.txt";	
	FileWriter   fw = new FileWriter(file,true); //false ����ԭ���ļ� true׷��д��
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
	 

