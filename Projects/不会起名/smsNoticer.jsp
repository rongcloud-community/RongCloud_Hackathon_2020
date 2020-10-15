<%
	/**
	 *本文件被客户端调用用来发送手机短信
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 22,2007
	 *@last modified:  Apil 22,2007
	*/
%>
<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date"%>
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<%

String fromUrl=request.getHeader("Referer");
Log.log(fromUrl);
if(fromUrl==null || fromUrl.equals("")){ //如果直接访问本页 那就什莫也不做
	out.println("You cannot access this page directly!");
	return;
}
//fromUrl="http://www.100im.cn";
fromUrl=Keyword.getCleanURL(fromUrl);
if(fromUrl==null || fromUrl.equals("")){ 
	out.println("Your URL is not registered, Please contact to: 861051668337");
	return;
}

%>  
<%
//***********************************
//变量初始化
//***********************************
String sql = "";
ResultSet rs = null;
 
String adminId ="";
String domainId="";
String mobile="";
String content="";
String domain="";

try{
 	sql="select id,site.domainId as domainId,domain,mobilephone from user,site where user.domainId=site.domainIds and domain=\""+
		fromUrl+"\"";
	if(db.getConnection()==null || db.isClosed())			 
	 	db.setConnection(); 	
	db.setSqlQuery(sql);
	rs=db.getResult();	
	while(rs!=null && rs.next()){
		adminId=rs.getString("id");
		if(adminId.startsWith("admin@")){		
			domainId=rs.getString("domainId");
			mobile=rs.getString("mobilephone");
			domain=rs.getString("domain");
			break;
		}
	}
	//Log.log(sql);
	if(db.getConnection()!=null && !db.isClosed())
		db.closeConnection();	
}catch(Exception e){}
if(adminId!=null && adminId.equals("")){
	out.println("Your URL is not registered, Please contact to: 861051668337");
	return;
}
try{content=new String( (request.getParameter("msg")).getBytes("iso-8859-1"),"utf-8" );}catch(Exception e){}
if(content!=null && content.equals("")){
	out.println("Your message content cannot be blank!");
	return;
}	
//判断网站有足够的手机短信信用点		
if(!userManager.hasMoreSmsCredit(domainId,1)){
	out.println("Your("+domain+") dose not have enough credit!");
	return;
}		
//out.println(adminId+" "+domainId+" "+mobile+" "+content);
userManager.sendSms(adminId,domainId,mobile,content);	
out.println("true");
%>
