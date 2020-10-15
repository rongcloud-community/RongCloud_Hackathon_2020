<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*"%>
<jsp:useBean id="msgManager" scope="page"  class="msg.MsgManager" /> 
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<%

	//String msgid=request.getParameter("msgid");
	//String serviceid=request.getParameter("serviceid");
	//String Src=request.getParameter("Src");
	String fromphone=request.getParameter("Dest");
	String destphone=request.getParameter("Src");
	String content=request.getParameter("Msg");
	//try{new String( (request.getParameter("Msg")).getBytes("iso-8859-1"),"gb2312" );}catch(Exception e){}
	//String linkid=request.getParameter("linkid"); //联通专用linkid
	//String user=request.getParameter("user");
	//String pass=request.getParameter("pass");
	//String stat=request.getParameter("stat");
   out.println("OK");
	Log.log("Src:"+destphone+" Msg:"+content+" Dest:"+fromphone); 
	if(fromphone==null || fromphone.equals(""))
		return; 
	if(destphone==null || destphone.equals(""))
		return; 
	//int index=destphone.indexOf("51668337");
	//if(index<=0)
		//return;
	//String idCode=destphone.substring(0,index); //获取ID鉴别码
	String idCode=destphone.substring(destphone.length()-4);
    try{
		ResultSet rs=null;
		String toid=null; 
		boolean isVisitor=true;
		String id=null,name=null;
		if(db.getConnection()==null || db.isClosed())			 
					db.setConnection();  
		//首先判断是否发给客户端，获取客户端的id
		String sql = "select id from user where state<>\"OFFLINE\" and mobilephone like \"%"+idCode+"\"";
		db.setSqlQuery(sql);
		rs = db.getResult();
		if(rs!=null && rs.next()) {
			toid=rs.getString("id");
			isVisitor=false;
		}	
		//如果不是发给客户端，而是发给浏览者，获取浏览者的id			
		if(toid==null){						
			sql = "select id,name from user where mobilephone=\""+fromphone+"\" or mobilephone=\"0"+fromphone+"\"";	
			if(db.getConnection()==null || db.isClosed())			 
					db.setConnection();  
			db.setSqlQuery(sql);
			rs = db.getResult();			
			if(rs!=null && rs.next()){
				id=rs.getString("id");
				name=rs.getString("name");
			}	
			
			if(id!=null && name!=null){
				sql = "select id from visitor where talker=\""+name+"\" and state<>\"OFFLINE\"";
				if(db.getConnection()==null || db.isClosed())			 
					db.setConnection();  
				db.setSqlQuery(sql);
				rs = db.getResult();
				while(rs!=null && rs.next()) {
					if( (rs.getString("id")).endsWith(idCode) ){
						toid=rs.getString("id");		 
						break;
					}
				}
			}					
		}
		if(toid!=null){
			content=new String( content.getBytes("iso-8859-1"),"gb2312" ); 	
			if(isVisitor)
				msgManager.sendMsg(new msg.Message(id,toid,content,"TALKMSG","0")); 
			else
				msgManager.sendMsg(new msg.Message("0",toid,"来自手机"+fromphone+"的短信:"+content,"SYSNOTIFY")); 
			
		}
		
		if(db.getConnection()!=null && !db.isClosed())
					db.closeConnection();	
		//Log.log(request.getQueryString());
    }catch(Exception e){Log.log(e.getMessage());} 

    
%>