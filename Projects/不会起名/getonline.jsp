<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*, java.util.*, java.net.*,msg.*,cache.*"%>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<%
	String sql = "";
	ResultSet rs = null;
	String ids=request.getParameter("ids");
	if(ids==null)
		return;
	StringTokenizer st=new StringTokenizer(ids,",\r\n");
	if(st.countTokens()==0)
		return;
	String[] userIds=new String[st.countTokens()];
	String[] states=new String[st.countTokens()];
	ids="";
	for(int i=0;i<userIds.length && st.hasMoreTokens();i++){
		userIds[i]=st.nextToken();
		ids +="\""+userIds[i]+"\",";		
	}
	ids=ids.substring(0,ids.length()-1);
	 
	sql="select id,state from user where id in("+ids+")";
	if(db.getConnection()==null || db.isClosed())			 
		db.setConnection(); 
	db.setSqlQuery(sql);
	rs=db.getResult();	
	while(rs!=null && rs.next()){	
		for(int i=0;i<states.length;i++){		 
			if(userIds[i].equals(rs.getString("id"))){
				if((rs.getString("state")).equals("OFFLINE"))
					states[i]="false";
				else
					states[i]="true";				
			}	
		}		 
	}
	if(db.getConnection()!=null && !db.isClosed())
			db.closeConnection();
	String result="online={";
	for(int i=0;i<states.length;i++)
		result +=states[i]+",";
	result=result.substring(0,result.length()-1)+"};";
	out.println(result);
%> 
 	 