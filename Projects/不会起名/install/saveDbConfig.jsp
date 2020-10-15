<%
	/**
		 保存数据库参数到文件..\config\db.properties 
	**/

%>
<%@page contentType="text/html; charset=GB2312" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*"%>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<%
//禁止缓存，否则表visiotr时间lastTime无法更新
	response.setHeader("Cache-Control","no-store");
	response.setHeader("Pragrma","no-cache");
	response.setDateHeader("Expires",0);
String dbhost=request.getParameter("dbhost");
String dbname=request.getParameter("dbname");
String dbuser=request.getParameter("dbuser");
String dbpass=request.getParameter("dbpass");
String lang=request.getParameter("lang");
String file=request.getSession().getServletContext().getRealPath(request.getRequestURI());
//file值 ：D:\100imserver\Tomcat5.5\webapps\ROOT\install\saveDbConfig.jsp  
file=file.substring(0,file.lastIndexOf("install"))+"config\\db.properties";	
//out.println(file);
try{	
	//读取原文件内容
	Vector lines=new Vector();
	BufferedReader in= new BufferedReader(new FileReader(file));     
    while(in.ready())    
        lines.addElement(in.readLine());      
    in.close();     
	//写入文件
	FileWriter fw = new FileWriter(file,false); //false 覆盖原有文件 true追加写入
	PrintWriter pw = new PrintWriter(fw);
	for(int i=0;i<lines.size();i++){
		if( ((String)lines.elementAt(i)).startsWith("mysql.host") )
			pw.print("mysql.host="+dbhost+"\r\n"); 
		else if( ((String)lines.elementAt(i)).startsWith("mysql.dbName") )
			pw.print("mysql.dbName="+dbname+"\r\n"); 
		else if( ((String)lines.elementAt(i)).startsWith("mysql.character") )
			pw.print("mysql.character="+lang+"\r\n"); 	
		else if( ((String)lines.elementAt(i)).startsWith("mysql.user") )
			pw.print("mysql.user="+dbuser+"\r\n"); 	
		else if( ((String)lines.elementAt(i)).startsWith("mysql.password") )
			pw.print("mysql.password="+dbpass+"\r\n");
		else  
			pw.print((String)lines.elementAt(i)+"\r\n"); 
	}	 
	pw.flush();
	pw.close();
  	fw.close();	
	
}catch(Exception e){
	out.println("failed");
	return;
}
try{
	//重新调入数据库连接参数
	dbpool.DBConnectionManager pool=dbpool.DBConnectionManager.getInstance();
	pool.loadURL("mysql");
	if(db.getConnection()==null || db.isClosed())			 
	 	db.setConnection(); 	
	String sql="show databases"; //
	db.setSqlQuery(sql);
	ResultSet rs=db.getResult();
	while(rs!=null && rs.next()){
			//out.println(rs.getString(1));
	} 
	out.println("successful");		
}catch(Exception e){
	out.println("failed1");
}
%>
 
