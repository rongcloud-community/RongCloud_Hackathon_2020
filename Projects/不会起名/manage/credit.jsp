<%
	/**
	 *本文件被客户端调用用来查询网站信用点
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 22,2007
	 *@last modified:  Apil 22,2007
	*/
%>
<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,msg.*;" errorPage="" %>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<jsp:useBean id="webStat" scope="page"  class="msg.WebStat" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
 
<link href="css/style.css" rel="stylesheet" type="text/css" />
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
}
-->
</style></head> 
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
 
//UserManager userManager=new UserManager(); 
String domainIds=userManager.getUserDomainId(scomClient);

%>
<body>
<table width="783" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="783" bgcolor="#E4F2FF">信用点查询：</td>
  </tr>
</table>
<br />
你的网站短信息信用点数：<br />
<table width="780" height="60" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="776"><table width="780" border="0" cellpadding="0" cellspacing="0" class='data'>
      
      <tr >
        <td width="254" height="20" bgcolor="#E4F2FF">域名</td>
        <td width="523" height="20" bgcolor="#E4F2FF">剩余信用点</td>
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
      <tr >
        <td height="25"><%=rs.getString("domain")%></td>
        <td><%=credit%><%=(credit<=0 && payLevel<=0)?"<br><font color=red>您的网站已无信用点，您和您的网站浏览者不能收发短信息，请申请专业版以上版本获取更多服务。</font>":""%><%=(credit<=0 && payLevel>=1)?"<br><font color=red>您的网站已无信用点，您和您的网站浏览者将不能收发短信息，要充值后才能继续使用。</font>":""%></td>
      </tr>
      <% 
  	}
  }catch(Exception ee){}
//db.closeConnection();
%>
      <tr>
        <td height="20" colspan="4">浏览者或客户端每发送一条短信息，将减少一个信用点。</td>
      </tr>
    </table></td>
  </tr>
</table>
<br />
你的网站手机短信息信用点数：<br />
<table width="780" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="776"><table width="780" border="0" cellpadding="0" cellspacing="0" class='data'>
      
      <tr>
        <td width="254" height="25" bgcolor="#E4F2FF">域名</td>
        <td width="523" bgcolor="#E4F2FF">剩余信用点</td>
      </tr>
      <%
try
{
	//连接数据库
	//db.setConnection();
	sql = "select domain,smsCredit from sms,site where sms.domainId in("+domainIds+") and sms.domainId=site.domainId";	
	db.setSqlQuery(sql);
	//连接数据库
	if(db.getConnection()==null || db.isClosed())			 
	  db.setConnection(); 
	rs = db.getResult();
	long smsCredit=0;
	while(rs!=null && rs.next())
	{ 		 
		smsCredit=rs.getLong("smsCredit");		 
 	  %>
      <tr>
        <td height="25"><%=rs.getString("domain")%></td>
        <td><%=smsCredit%><%=(smsCredit<=0)?"<br><font color=red>您的网站已无信用点，您和您的网站浏览者将不能收发短信息，要充值后才能继续使用。</font>":""%></td>
      </tr>
      <% 
  	}
  }catch(Exception ee){}
//关闭数据库
if(db.getConnection()!=null && !db.isClosed())
	db.closeConnection();%>
      <tr>
        <td height="25" colspan="4">浏览者每发送一条手机短信息，将减少一个信用点</td>
      </tr>
    </table></td>
  </tr>
</table>
<br>
</body>
</html>
