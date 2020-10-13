<%
	/**
	 *本文件被客户端管理员调用来设置广告
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 22,2007
	 *@last modified:  Apil 22,2007
	*/
%>
<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*"%>
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<style type="text/css">
<!--
body {
	margin-right: 0px;
	margin-bottom: 0px;
}
-->
</style>
<link href="css/style.css" rel="stylesheet" type="text/css" />
</head>
<%
/////////////////////session检测////////////////////////////////////////////////
String vid=request.getParameter("vid");
String sid=request.getParameter("sid");
msg.MySession mySession=new msg.MySession(vid);
String sessionId=mySession.getMySession().getSessionId();
if(sessionId==null || vid==null || !sessionId.equals(sid)){
  out.println("<script language=jscript>alert('您的帐号已经在其它地方登陆，只有重新登陆才可使用。');location.assign('index.htm');</script>");			
  return;	
}
///////////////////////////////////////////////////////////////////////////////		
%> 
<%
	String theFirstDomainId=userManager.getUserDomainId(vid);
	if(theFirstDomainId.indexOf(",")>0)
		theFirstDomainId=theFirstDomainId.substring(0,theFirstDomainId.indexOf(","));
	int payLevel = userManager.getSitePayLevel(theFirstDomainId); //是否为免费客户
	 
%> 
<%
//***********************************
//变量初始化
//***********************************
String sql = "";
ResultSet rs = null;

String scomClient = "";
 
//***********************************
//获取变量值
//***********************************
//取出登录用户的用户名
scomClient = vid;
String name=null;
String add=request.getParameter("add");
String groupName1=null;
String friendId =request.getParameter("id"); 
String remove =request.getParameter("remove");
  
try{
	name=new String( (request.getParameter("name")).getBytes("iso-8859-1"),"utf-8" );
	 
}catch(Exception e){}
if(add!=null || remove!=null){
	if(payLevel>=2){ 	
		try{
			if(add!=null){
				boolean isMeOrWorkmate=false;	
				if(scomClient.equals(friendId)){
					out.print("不能把自己加为好友");
					isMeOrWorkmate=true; 
				 }		
				 else if(userManager.getUserDomainId(scomClient).equals(userManager.getUserDomainId(friendId))){
					out.print("不能把同事加为好友");
					isMeOrWorkmate=true; 
				 }	
				if(isMeOrWorkmate == false ){			
					sql="select name from user where id=\""+friendId+"\" and id<>\""+scomClient+"\"";	 
					if(db.getConnection()==null || db.isClosed())			 
						db.setConnection(); 	
					db.setSqlQuery(sql);
					rs=db.getResult();
					if(rs!=null && rs.next()){
						String firendName=rs.getString("name");
						sql="insert into friend values(\""+scomClient+"\",\""+friendId+"\")"; 
						if(db.getConnection()==null || db.isClosed())			 
							db.setConnection(); 	
						db.setSqlQuery(sql);
						db.executeUpdate();
						sql="insert into friend values(\""+friendId+"\",\""+scomClient+"\")"; 
						if(db.getConnection()==null || db.isClosed())			 
							db.setConnection(); 	
						db.setSqlQuery(sql);
						db.executeUpdate();					 
						out.println("你已将（"+firendName+"）加为好友。");
					}
					else 
						out.print("没有这个id("+friendId+") 请检查你的输入是否正确");
				}				 
			}
		}catch(Exception ee){
			out.println("添加好友失败，请重试。");
			if(db.getConnection()!=null && !db.isClosed())
				db.closeConnection();
		}	
		try{
			if(remove!=null){
				sql="delete from friend where ( id1=\""+scomClient+"\" and id2=\""+friendId+"\") or (id2=\""+
					scomClient+"\" and id1=\""+friendId+"\")";				 
				if(db.getConnection()==null || db.isClosed())			 
							db.setConnection(); 	
				db.setSqlQuery(sql);
				db.executeUpdate();
				 
				out.println("你已将（"+name+"）踢出好友组。");
			}
		}catch(Exception ee){
			out.println("踢出好友失败，请再操作一次，如果依旧失败，请联系淘客客服。");
			if(db.getConnection()!=null && !db.isClosed())
				db.closeConnection();
		}	
		 
	}
	else if(payLevel==0) 
		out.print("<font color=\'red\'>您使用的是标准版，不能使用好友功能，如果要使用好友功能，请申请商务版以上版本。</font>");
	else if(payLevel==1) 
		out.print("<font color=\'red\'>您使用的是增强版，不能使用好友功能，如果要使用好友功能，请申请商务版以上版本。</font>");
}
 %>
<body>
<table width="797" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="797" bgcolor="#E4F2FF">好友管理：</td>
  </tr>
</table>
<br />

<table width="796" border="1" cellpadding="0" cellspacing="0"  bordercolor="#A5AdC4">
  
  <tr>    
    <td width="796" height="25">
      <table width="794" border="0" cellpadding="0" cellspacing="1" class="data">
	  
        <tr >
          <td height="16" colspan="2">添加好友</td>
        </tr>
		 
        <tr >
          <td width="220" ><label>输入好友用户名（登陆用的用户名）：
		   
          </label></td><form id="form1" name="form1" method="post" action="?vid=<%=vid%>&sid=<%=sid%>" > 
          <td width="571" height="10" >
              <input type="text" name="id" />
          <input type="submit" name="add" value="添加为我的好友" /></td></form>
        </tr>
        
        <tr >
          <td colspan="2">&nbsp;</td>
        </tr>
</table>   </td></tr></table>
<br />
<table width="796" border="1" cellpadding="0" cellspacing="0"  bordercolor="#A5AdC4">
  <tr>
    <td width="796" height="25"><table width="794" border="0" cellpadding="0" cellspacing="1" class="data">
      <tr >
        <td height="16" colspan="2">我的好友：</td>
      </tr>
      
<% 
try{
		sql="select name,id2 as id from friend,user where friend.id2=user.id and id1=\""+scomClient+"\"";
		if(db.getConnection()==null || db.isClosed())			 
					db.setConnection(); 	
		db.setSqlQuery(sql);
		rs=db.getResult();
	  	while(rs!=null && rs.next()){
			 
		%>  
	  <form id="form1" name="<%=rs.getString("id")%>" method="post" action="?vid=<%=vid%>&sid=<%=sid%>">	 
      <tr >
        <td width="148" align="center"><%=rs.getString("name")%></td>		
        <td width="643"> 		
		  <input type="hidden" name="id" value="<%=rs.getString("id")%>" />
		  <input type="hidden" name="name" value="<%=rs.getString("name")%>" />
		   
          <input type="submit" name="remove" value="踢出好友"  />        </td>
      </tr>
	   </form> 
<%
		}
}catch(Exception ee){
	if(db.getConnection()!=null && !db.isClosed())
		db.closeConnection();
}
%>      
    </table></td>
  </tr>
</table>
<br />
<%
if(db.getConnection()!=null && !db.isClosed())
		db.closeConnection();
%>		
<br>
<br>
</body>
</html>
