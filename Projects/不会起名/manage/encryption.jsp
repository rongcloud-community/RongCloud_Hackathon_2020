<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date"%>
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<jsp:useBean id="db" scope="page"  class="msg.DbConn" /> 
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
	String theFirstDomainId=userManager.getUserDomainId(vid);
	if(theFirstDomainId.indexOf(",")>0)
		theFirstDomainId=theFirstDomainId.substring(0,theFirstDomainId.indexOf(","));
	int payLevel = userManager.getSitePayLevel(theFirstDomainId); //是否为免费客户
	if(payLevel<=0) 
		out.print("<font color=\'red\'>您使用的是标准版，不能使用本功能，如果需要，请申请专业版以上版本。</font>");
%> 
<%

//***********************************
//变量初始化
//***********************************
String sql = "";
ResultSet rs = null;

//String domainId = "";//用来标示库内是否有此用户的设置状态，不论是否为空
//***********************************
//获取变量值
//***********************************
//取出登录用户的用户名
String domainIds = userManager.getUserDomainId(vid);		 
String encryption=request.getParameter("encryption");
String submit=request.getParameter("submit");
if(submit!=null && encryption!=null ) {
	if(payLevel>=2){
		try
		{
			sql="update site set encryption=\""+encryption+"\" where domainId in("+domainIds+")"; 
			if(db.getConnection()==null || db.isClosed())			 
				db.setConnection(); 
			db.setSqlQuery(sql);
			db.executeUpdate();		
		 
			if(db.getConnection()!=null && !db.isClosed())
				db.closeConnection();	
			if(encryption.equals("true"))
				out.println("你的网站已经全部设置为加密模式。");
			else
				out.println("你的网站已经全部设置为非加密模式。");
		 }catch(Exception ee){}
	 }
	 else if(payLevel==0) 
		out.print("<font color=\'red\'>您使用的是标准版，不能使用信息加密，如果要使用信息加密，请申请商务版以上版本。</font>");
	 else if(payLevel==1) 
		out.print("<font color=\'red\'>您使用的是增强版，不能使用信息加密，如果要使用信息加密，请申请商务版以上版本。</font>");
}
%>
<body>
<table width="780" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="776" bgcolor="#E4F2FF">短信息加密:</td>
  </tr>
</table>
<br />
<form id="form1" name="form1" method="post" action="encryption.jsp?vid=<%=vid%>&sid=<%=sid%>">
      <table width="780" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
        <tr>
          <td width="776"><table width="765" border="0" cellpadding="0" cellspacing="0" bgcolor="#CCCCCC">
              <tr bgcolor="#FFFFFF">
                <td width="268" class="content9"><input type="radio" name="encryption" value="true" />
加密短信息
  <input type="radio" name="encryption" value="false"  checked="checked" />
不加密短信息 </td>
                <td width="497" height="25" class="content9"><label>
                  <input type="submit" name="submit" value="提交" />
                </label></td>
              </tr>
              
          </table></td>
        </tr>
  </table>
</form>
<table width="780" border="0" cellpadding="0" cellspacing="0" class="content9">
  
  <tr>
    
    <td width="770" height="25">注：短信息加密后，其他人即使从数据库获取你的信息，也无法得知其内容。</td>
  </tr>
           
		<tr bgcolor="#FFFFFF">
</table>
</body>
</html>
