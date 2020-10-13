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
String groupName=null;
String groupId=request.getParameter("groupId");
String groupName1=null;
 
String create =request.getParameter("create");
String apply =request.getParameter("apply");
String cancel =request.getParameter("cancel");
 
try{
	groupName=new String( (request.getParameter("groupName")).getBytes("iso-8859-1"),"utf-8" );
	 
}catch(Exception e){}
if(create!=null || cancel!=null || apply!=null){
	if(payLevel>=2){ 	
		try{
			if(create!=null){	
					Calendar now= Calendar.getInstance();
					String date=String.valueOf(now.get(Calendar.YEAR))+"-"+String.valueOf(now.get(Calendar.MONTH)+1)+"-"+
						  String.valueOf(now.get(Calendar.DAY_OF_MONTH))+" "+String.valueOf(now.get(Calendar.HOUR_OF_DAY));		 
					sql="insert into groups values(null,\""+groupName+"\",\""+date+"\")"; 
					if(db.getConnection()==null || db.isClosed())			 
						db.setConnection(); 	
					db.setSqlQuery(sql);
					db.executeUpdate();
					sql="select groupId from groups where groupName=\""+groupName+"\"";
					if(db.getConnection()==null || db.isClosed())			 
						db.setConnection(); 	
					db.setSqlQuery(sql);
					rs=db.getResult();
					if(rs!=null && rs.next())
						groupId=rs.getString("groupId");
					if(groupId!=null && !groupId.equals("")){
						sql="insert into mygroup values(\""+scomClient+"\",\""+groupId+"\")"; 
						if(db.getConnection()==null || db.isClosed())			 
							db.setConnection(); 	
						db.setSqlQuery(sql);
						db.executeUpdate();
					}
					out.println("你新申请的群组已经建立，你已经该群组的成员。");
			}
		}catch(Exception ee){
			out.println("你新申请的群失败，可能是因为该名称（"+groupName+"）已经被使用，请重新申请。");
			if(db.getConnection()!=null && !db.isClosed())
				db.closeConnection();
		}	
		try{
			if(cancel!=null){
				sql="delete from mygroup where userId=\""+scomClient+"\" and groupId=\""+groupId+"\"";
				//out.println(sql);
				if(db.getConnection()==null || db.isClosed())			 
							db.setConnection(); 	
				db.setSqlQuery(sql);
				db.executeUpdate();
				out.println("你已经退出群（"+groupName+"）。");
			}
		}catch(Exception ee){
			out.println("你退出群失败，请再操作一次，如果依旧失败，请联系淘客客服。");
			if(db.getConnection()!=null && !db.isClosed())
				db.closeConnection();
		}	
		try{
			if(apply!=null){
				sql="insert into mygroup values(\""+scomClient+"\",\""+groupId+"\")"; 			 
				if(db.getConnection()==null || db.isClosed())			 
							db.setConnection(); 	
				db.setSqlQuery(sql);
				db.executeUpdate();
				out.println("你已经加入群（"+groupName+"）。");
			}
		}catch(Exception ee){
			out.println("你加入群失败，请再操作一次，如果依旧失败，请联系淘客客服。");
			if(db.getConnection()!=null && !db.isClosed())
				db.closeConnection();
		}	
	}
	else if(payLevel==0) 
		out.print("<font color=\'red\'>您使用的是标准版，不能使用群组功能，如果要使用群组功能，请申请商务版以上版本。</font>");
	else if(payLevel==1) 
		out.print("<font color=\'red\'>您使用的是增强版，不能使用群组功能，如果要使用群组功能，请申请商务版以上版本。</font>");
}

 %>
<body>
<table width="796" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="796" bgcolor="#E4F2FF">群组管理：</td>
  </tr>
</table>
<br />

<table width="796" border="1" cellpadding="0" cellspacing="0"  bordercolor="#A5AdC4">
  
  <tr>    
    <td width="796" height="25">
      <table width="794" border="0" cellpadding="0" cellspacing="1" class="data">
	  
        <tr >
          <td height="16" colspan="2">创建我的群组</td>
        </tr>
		 
        <tr >
          <td width="127" ><label>输入新的群组名称：
		   
          </label></td><form id="form1" name="form1" method="post" action="?vid=<%=vid%>&sid=<%=sid%>" > 
          <td width="664" height="10" >
              <input type="text" name="groupName" />
          <input type="submit" name="create" value="创建新的群组" /></td></form>
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
        <td height="16" colspan="2">我已经加入的群组：</td>
      </tr>
      
<% 
String groupIds="";
try{
		sql="select groupName,mygroup.groupId as groupId from groups,mygroup where groups.groupId=mygroup.groupId and mygroup.userId=\""+scomClient+"\"";
		if(db.getConnection()==null || db.isClosed())			 
					db.setConnection(); 	
		db.setSqlQuery(sql);
		rs=db.getResult();
	  	while(rs!=null && rs.next()){
			groupIds +=","+rs.getString("groupId");
		%>  
	  <form id="form1" name="<%=rs.getString("groupId")%>" method="post" action="?vid=<%=vid%>&sid=<%=sid%>">	 
      <tr >
        <td width="148" align="center"><%=rs.getString("groupName")%></td>		
        <td width="643"> 		
		  <input type="hidden" name="groupId" value="<%=rs.getString("groupId")%>" />
		  <input type="hidden" name="groupName" value="<%=rs.getString("groupName")%>" />
          <input type="submit" name="cancel" value="退出群组"  />        </td>
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
<table width="796" border="1" cellpadding="0" cellspacing="0"  bordercolor="#A5AdC4">
  <tr>
    <td width="796" height="25"><table width="793" border="0" cellpadding="0" cellspacing="1" class="data">
      <tr >
        <td height="18" colspan="2">其他群组：</td>
      </tr>
      
     <% 
if(groupIds.startsWith(","))
	groupIds=groupIds.substring(1);
if(groupIds!=null)	{
	try{
		sql="select groupName,groupId from groups where groupId not in ("+groupIds+")";
		if(groupIds.equals(""))
			sql="select groupName,groupId from groups";
		
		if(db.getConnection()==null || db.isClosed())			 
					db.setConnection(); 	
		db.setSqlQuery(sql);
		rs=db.getResult();
	  	while(rs!=null && rs.next()){%>  
	  <form id="form1" name="<%=rs.getString("groupId")%>" method="post" action="?vid=<%=vid%>&sid=<%=sid%>"> 
      <tr >
        <td width="148" align="center"><%=rs.getString("groupName")%></td>
        <td width="642"> 		
		  <input type="hidden" name="groupName" value="<%=rs.getString("groupName")%>" />
		  <input type="hidden" name="groupId" value="<%=rs.getString("groupId")%>" />
          <input type="submit" name="apply" value="加入群组" />          </td>
      </tr>
	  </form>
<%
		}
	}catch(Exception ee){
	if(db.getConnection()!=null && !db.isClosed())
		db.closeConnection();
	}
}
%>   
    </table></td>
  </tr>
</table>

<%
if(db.getConnection()!=null && !db.isClosed())
		db.closeConnection();
%>		
<br>
<br>
</body>
</html>
