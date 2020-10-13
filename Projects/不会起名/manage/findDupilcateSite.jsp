 
 
<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />

 
 <%
 
 	 
	 
try
{	 
	 java.util.Hashtable ht=new java.util.Hashtable();
		String sql="select domain from site"; 
	 	//连接数据库
		if(db.getConnection()==null || db.isClosed())			 
	 		db.setConnection();  		 
		db.setSqlQuery(sql);	 
		ResultSet rs=db.getResult();
		while(rs!=null && rs.next()){
		//out.println(rs.getString("domain"));
			if( ht.containsKey(rs.getString("domain")) )
				out.println(rs.getString("domain"));
			else{
				ht.put(rs.getString("domain"),"123");
				//out.println(rs.getString("domain"));
			}
		}
			  
if(db.getConnection()!=null && !db.isClosed())
	db.closeConnection();	 
}catch(Exception ee){out.println(ee.getMessage());}	
 
%>
 
