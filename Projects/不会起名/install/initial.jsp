<%
	/**
		 �������ݿ�������ļ�..\config\db.properties 
	**/

%>
<%@page contentType="text/html; charset=GB2312" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*"%>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<%
//��ֹ���棬�����visiotrʱ��lastTime�޷�����
	response.setHeader("Cache-Control","no-store");
	response.setHeader("Pragrma","no-cache");
String vdomain=request.getParameter("vdomain");
String cdomain=request.getParameter("cdomain");
String user=request.getParameter("user");
String password=request.getParameter("password");

String file=request.getSession().getServletContext().getRealPath(request.getRequestURI());
//fileֵ ��D:\100imserver\Tomcat5.5\webapps\ROOT\install\initial.jsp  
file=file.substring(0,file.lastIndexOf("install"))+"config\\domain";	
//out.println(file);
try{	 
	//д���������ļ�
	FileWriter fw = new FileWriter(file,false); //false ����ԭ���ļ� true׷��д��
	PrintWriter pw = new PrintWriter(fw);	 
	pw.print("vdomain="+vdomain+"\r\n"); 
	pw.print("cdomain="+cdomain+"\r\n");  
	pw.flush();
	pw.close();
  	fw.close();		
}catch(Exception e){
	out.println("failed");
}
//���볬������Ա��½��Ϣ////////////////////////////
try{		 
		if(db.getConnection()==null || db.isClosed())			 
			db.setConnection(); 	
		String sql="update admin set username=\""+user+"\",password=\""+password+"\""; 
		db.setSqlQuery(sql);
		if(db.executeUpdate()==0){
			sql="insert into admin values(\""+user+"\",\""+password+"\")";
			out.println(sql);
			db.setSqlQuery(sql);	
			db.executeUpdate();
			
		}	
		out.println("successful");  
}catch(Exception e){
out.print(e.getMessage());
	  out.println("failed1");
}

%>
 
