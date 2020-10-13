<%
	/**
	 *本文件被admin调用来保存对某个网站客服人员的修改的保存
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 26,2007
	 *@last modified:  Apil 26,2007
	*/
%>
<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*,com.jspsmart.upload.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date"%>
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" /> 
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<%@page contentType="text/html; charset=gb2312" language="java" import="java.sql.*, java.util.*, java.net.*,msg.*"%>
<%
/////////////////////session检测////////////////////////////////////////////////
String vid="admin";
String sid=request.getParameter("sid");
msg.MySession mySession=new msg.MySession(vid);
String sessionId=mySession.getMySession().getSessionId();
if(sessionId==null || vid==null || !sessionId.equals(sid)){
	out.println("<script language=jscript>alert('你没有登陆或会话已经过期，请重新登陆。');location.assign('index.htm');</script>");			
		return;	
}
///////////////////////////////////////////////////////////////////////////////		
%>
<%
//***********************************
//变量初始化
//***********************************
String sql = "";
ResultSet rs = null;

String id = "";
String domainId = "";
String action = "";
String newImage = "";//生成用户自定义头像文件名

String password = "";
String type = "";
String name = "";
String tag = "";
String sex = "";
String workphone = "";
String mobilephone = "";
String email = "";
String qq = "";
String msn = "";

Calendar start=null;
//***********************************
//获取变量值
//***********************************
try
{
	//
	action = request.getParameter("action");
	
	id = request.getParameter("id");
	domainId = userManager.getDomainId(id);
}catch(Exception ee){}

//连接数据库
if(db.getConnection()==null || db.isClosed())			 
			db.setConnection(); 

start = Calendar.getInstance();
SimpleDateFormat formatter1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
String a = formatter1.format(start.getTime());
//增加新用户
if(action!=null && action.equals("addUser"))
{
	//获取新用户的信息
	try
	{			
		//这个参数放在上面获取，只一次就可以
		//id = request.getParameter("id");
		password = request.getParameter("password");
		type = new String( (request.getParameter("type")).getBytes("iso-8859-1"),"utf-8" );
		name = new String( (request.getParameter("name")).getBytes("iso-8859-1"),"utf-8" );
		tag = request.getParameter("tag");
		sex = new String( (request.getParameter("sex")).getBytes("iso-8859-1"),"utf-8" );
		workphone = request.getParameter("workphone");
		mobilephone = request.getParameter("mobilephone");
		email = request.getParameter("email");
		qq = request.getParameter("qq");
		msn = request.getParameter("msn");
	//out.println("type:"+type+" name:"+name+" sex:"+sex);	
		//插入数据库
		sql="insert into user values (\'"+id+"\',\'"+password+"\',\'"+type+"\',\'"+name+"\',\'"+tag+"\',\'"+null+"\',\'"+null+"\',\'"+domainId+"\',\'"+sex+"\',\'"+workphone+"\',\'"+mobilephone+"\',\'"+null+"\',\'"+email+"\',\'"+qq+"\',\'"+msn+"\',\'"+null+"\',\'"+null+"\',\'"+a+"\',\'OFFLINE\',\'"+null+"\',\'"+a+"\',\'"+false+"\',\'"+false+"\',\'"+false+"\',\'"+false+"\')";
		db.setSqlQuery(sql);
		db.executeUpdate();
		
		out.print("<script language=javascript>alert('添加成功！');window.location='userManager.jsp';</script>");
	}catch(Exception ee){}		
}
//修改用户信息
else if(action!=null && action.equals("editUser"))
{
	//获取要修改用户的信息
	try
	{			
		//这个参数放在上面获取，只一次就可以
		//id = request.getParameter("id");
		password = request.getParameter("password");
		type = new String( (request.getParameter("type")).getBytes("iso-8859-1"),"utf-8" );
		name = new String( (request.getParameter("name")).getBytes("iso-8859-1"),"utf-8" );
		tag = request.getParameter("tag");
		sex = new String( (request.getParameter("sex")).getBytes("iso-8859-1"),"utf-8" );
		workphone = request.getParameter("workphone");
		mobilephone = request.getParameter("mobilephone");
		email = request.getParameter("email");
		qq = request.getParameter("qq");
		msn = request.getParameter("msn");
		
		//插入数据库domainId  sex  workphone  mobilephone email  qq  msn  
		sql="update user set id=\'"+id+"\',password=\'"+password+"\',type=\'"+type+"\',name=\'"+name+"\',tag=\'"+tag+"\',sex=\'"+sex+"\',workphone=\'"+workphone+"\',mobilephone=\'"+mobilephone+"\',email=\'"+email+"\',qq=\'"+qq+"\',msn=\'"+msn+"\' where id=\'"+id+"\'";
		db.setSqlQuery(sql);
		db.executeUpdate();
		
		out.print("<script language=javascript>alert('修改成功！');window.location='userManager.jsp';</script>");
		}catch(Exception ee){}
}
//删除用户信息
else if(action!=null && action.equals("delUser"))
{
	//删除表内数据
	sql="delete from user where id='"+id+"'";
	db.setSqlQuery(sql);
	db.executeUpdate();
	
	out.print("<script language=javascript>window.location='userManager.jsp';</script>");
}
//关闭数据库
if(db.getConnection()!=null && !db.isClosed())
			db.closeConnection();	
%>