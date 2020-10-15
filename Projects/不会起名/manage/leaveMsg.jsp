<%
	/**
	 *本文件被客户端调用用来查询浏览者给自己留的短信
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 22,2007
	 *@last modified:  Apil 22,2007
	*/
%>
<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
 <jsp:useBean id="db" scope="page"  class="msg.DbConn" />

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<link href="../css/talk.css" rel="stylesheet" type="text/css" />
</head>
 
<body>
<table width="821" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="817" bgcolor="#E4F2FF">留言查询：</td>
  </tr>
</table>
<br />
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
//***********************************
//获取变量值
//***********************************
String id=null;
ResultSet rs=null;
String readLeftMsg=request.getParameter("readLeftMsg");
String deleteLeftMsg=request.getParameter("deleteLeftMsg");
try
{
	id = request.getParameter("id");
	if(id==null)
	 	id= vid;
	//连接数据库
	if(db.getConnection()==null || db.isClosed())			 
	 	db.setConnection(); 
	if(deleteLeftMsg!=null && id!=null && !id.equals("") && !id.equals("null"))
	{		
		String sql = "delete from message where toId='"+id+"' and type='TALKMSG' and isRead='3'";
		db.setSqlQuery(sql);	 
		db.executeUpdate();
	}
	if(readLeftMsg==null && id!=null && !id.equals("") && !id.equals("null"))
	{
		 
		String sql = "select * from message where toId='"+id+"' and type='TALKMSG' and isRead='2'";
		db.setSqlQuery(sql);
		rs = db.getResult();
		sql="update message set isRead='3' where toId='"+id+"' and isRead='2'";
		db.setSqlQuery(sql);
		db.executeUpdate();
	}
	else if(readLeftMsg!=null && id!=null && !id.equals("") && !id.equals("null"))
	{
		 
		String sql = "select * from message where toId='"+id+"' and type='TALKMSG' and isRead='3' order by sendTime DESC";
		db.setSqlQuery(sql);
		rs = db.getResult();
	}	
}catch(Exception ee){}	
%>
 
  <table width="821" border="0" cellpadding="0" cellspacing="1" bgcolor="#B5CDFF" class="content9">
    <tr>
      <td height="19" colspan="4" bgcolor="#E4F2FF">&nbsp;&nbsp;&nbsp;
	  <%if(readLeftMsg==null){%>
	  客户留言：以下是在你离线时客户给你的未读留言
	  <%}else{%>
	  客户留言：以下是在你离线时客户给你的已读留言
	  <%}%>	  </td>
    </tr>
    <tr>
      <td width="109" height="19" align="right" valign="middle" bgcolor="#FFFFFF">客户ID</td>
	  <td width="84" align="left" valign="middle" bgcolor="#FFFFFF">客户姓名</td>
      <td width="124" align="left" valign="middle" bgcolor="#FFFFFF">发送时间</td>   
      <td width="499" height="19" align="left" valign="middle" bgcolor="#FFFFFF">留言内容</td>
    </tr>
<%
	int counter=0;
	String name="";
	while(rs!=null && rs.next()){	  
		name=userManager.getName(rs.getString("fromId"));
%>	
    <tr>
      <td height="18" align="right" valign="middle" bgcolor="#FFFFFF"><%=rs.getString("fromId")%></td>      
      <td align="left" valign="middle" bgcolor="#FFFFFF"><%=(name!=null && !name.equals(""))?name:""%></td>
	  <td align="left" valign="middle" bgcolor="#FFFFFF"><%=rs.getString("sendTime")%></td>
      <td height="18" align="left" valign="middle" bgcolor="#FFFFFF"><%=msg.Escape.unescape(rs.getString("content"))%></td>
    </tr>	 
<%
	counter++;
	}
	if(counter==0){ 
%>	
	<tr>
      <td height="19" colspan="4"  bgcolor="#E4F2FF">&nbsp;&nbsp;&nbsp; 你目前没有新留言 </td>
    </tr>
<%}

//关闭数据库
if(db.getConnection()!=null && !db.isClosed())
	db.closeConnection();
%>	
    <tr>
      <td height="19" align="right" valign="middle" bgcolor="#FFFFFF">&nbsp;</td>
      <td align="center" colspan=3 valign="middle" bgcolor="#FFFFFF"><a href="leaveMsg.jsp?readLeftMsg=true&vid=<%=vid%>&sid=<%=sid%>">查看历史留言</a> <a href="leaveMsg.jsp?deleteLeftMsg=true&vid=<%=vid%>&sid=<%=sid%>">删除历史留言 </a>历史留言将至长保留一个月，请自行备份存留。</td>
    </tr>
  </table>

</body>
</html>
