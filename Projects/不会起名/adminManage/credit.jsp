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
<link href="../css/talk.css" rel="stylesheet" type="text/css" />
</head>
<%
/////////////////////session检测////////////////////////////////////////////////
String vid="admin";
String sid=request.getParameter("sid");
msg.MySession mySession=new msg.MySession(vid);
String sessionId=mySession.getMySession().getSessionId();
if(sessionId==null || vid==null || !sessionId.equals(sid)){
	//out.println("<script language=jscript>alert('你没有登陆或会话已经过期，请重新登陆。');location.assign('index.htm');</script>");			
		//return;	
}
///////////////////////////////////////////////////////////////////////////////		
%>
<%
String id=request.getParameter("id");
 
//变量初始化
//***********************************
String sql = "";
ResultSet rs = null;

String domainIds=userManager.getUserDomainId(id);

%>
<body>
<table width="780" border="0" cellpadding="0" cellspacing="0" class="content9">
  <tr class="content10White">
    <td width="10" height="25">&nbsp;</td>
    <td width="770" height="25">你的网站短信息信用点数：</td>
  </tr>
  <tr>
    <td height="25">&nbsp;</td>
    <td height="25">
<form  method="post" action="credit.jsp">
  <label>输入站点管理员ID:
  <input type="text" name="id" />
  </label>
  <label>
  <input type="submit" name="Submit" value="提交" />
  </label>
</form>
<br>
<table width="501" border="0" cellpadding="0" cellspacing="1" bgcolor="#CCCCCC">
        <tr class="content10hui">
          <td height="25" colspan=4>&nbsp;</td>
        </tr>
        <tr class="content10hui">
          <td width="127" height="25">域名</td>
          <td width="122">剩余信用点</td>
           
        </tr>
	<%
try
{
	//连接数据库
	if(db.getConnection()==null || db.isClosed())			 
			db.setConnection(); 
	sql = "select * from site where domainid in("+domainIds+")";
	db.setSqlQuery(sql);
	rs = db.getResult();
	long credit=0;
	while(rs!=null && rs.next())
	{ 		 
		credit=rs.getLong("credit");
 	  %>		
        <tr class="content10hui">
          <td height="25"><%=rs.getString("domain")%></td>
          <td><%=credit%></td>          
        </tr>
  <% 
  	}
  }catch(Exception ee){}
//db.closeConnection();
%>      
         <tr>
           <td height="25" colspan=4>浏览者或客户端每发送一条短信息，将减少一个信用点。</td>
         </tr>  
      </table>
       
    </td>
  </tr>
</table>
<br>
<table width="780" border="0" cellpadding="0" cellspacing="0" class="content9">
  <tr class="content10White">
    <td width="10" height="25">&nbsp;</td>
    <td width="770" height="25">你的网站手机短信息信用点数：</td>
  </tr>
  <tr>
    <td height="25">&nbsp;</td>
    <td height="25">
      <br />
      <table width="501" border="0" cellpadding="0" cellspacing="1" bgcolor="#CCCCCC">
        <tr class="content10hui">
          <td height="25" colspan="4">&nbsp;</td>
        </tr>
        <tr class="content10hui">
          <td width="127" height="25">域名</td>
          <td width="122">剩余信用点</td>
        </tr>
<%
try
{
	//连接数据库
	if(db.getConnection()==null || db.isClosed())			 
			db.setConnection(); 
	sql = "select domain,smsCredit from sms,site where sms.domainId in("+domainIds+") and sms.domainId=site.domainId";	
	db.setSqlQuery(sql);
	rs = db.getResult();
	long smsCredit=0;
	while(rs!=null && rs.next())
	{ 		 
		smsCredit=rs.getLong("smsCredit");		 
 	  %>
        <tr class="content10hui">
          <td height="25"><%=rs.getString("domain")%></td>
          <td><%=smsCredit%></td>
        </tr>
        <% 
  	}
  }catch(Exception ee){}
if(db.getConnection()!=null && !db.isClosed())
			db.closeConnection();	
%>
        <tr>
          <td height="25" colspan="4">浏览者每发送一条手机短信息，将减少一个信用点</td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>
