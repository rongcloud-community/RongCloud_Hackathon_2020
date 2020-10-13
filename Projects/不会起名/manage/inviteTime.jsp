<%
	/**
	 *本文件被客户端管理员调用来设置邀请时间
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
<link href="../css/talk.css" rel="stylesheet" type="text/css" />
</head>
<%
/////////////////////session检测////////////////////////////////////////////////
String vid=request.getParameter("vid");
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
	String theFirstDomainId=userManager.getUserDomainId(vid);
	if(theFirstDomainId.indexOf(",")>0)
		theFirstDomainId=theFirstDomainId.substring(0,theFirstDomainId.indexOf(","));
	int payLevel = userManager.getSitePayLevel(theFirstDomainId); //是否为免费客户
	if(payLevel<=0) 
		out.print("<font color=\'red\'>您使用的是标准版，不能使用本功能，如果需要，请申请增强版以上版本。</font>");
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
String inviteTime=request.getParameter("inviteTime");
String domain=request.getParameter("domain"); 
String inviteCont="";
try{inviteCont = new String( (request.getParameter("inviteCont")).getBytes("iso-8859-1"),"utf-8" );}catch(Exception e){}
String submit =request.getParameter("submit");
if(payLevel>=1){ 	
	try{
		if(submit!=null){
			 
				sql="update site set inviteTime=\'"+inviteTime+"\',inviteCont=\'"+
				    inviteCont+"\' where domain=\""+domain+"\""; 
				if(db.getConnection()==null || db.isClosed())			 
					db.setConnection(); 	
				db.setSqlQuery(sql);
				db.executeUpdate();
				out.println("你的邀请设置已经生效。");
 		}
	}catch(Exception ee){
		if(db.getConnection()!=null && !db.isClosed())
			db.closeConnection();
	}	
}		
if(domain==null || domain.equals("")){
	StringTokenizer st = new StringTokenizer(userManager.getUserDomain(scomClient),",");	
	if(st.hasMoreTokens())
		domain=st.nextToken();
}
try{
	sql="select inviteTime,inviteCont from site where domain=\""+domain+"\""; 
	if(db.getConnection()==null || db.isClosed())			 
				db.setConnection(); 	
	db.setSqlQuery(sql);
	rs=db.getResult();
	if(rs!=null && rs.next()){
		inviteTime=rs.getString("inviteTime");		
		inviteCont=rs.getString("inviteCont");			 
	}
	if(db.getConnection()!=null && !db.isClosed())
		db.closeConnection();	
}catch(Exception ee){
	if(db.getConnection()!=null && !db.isClosed())
		db.closeConnection();
}

 %>
<body>
<table width="805" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="805" bgcolor="#E4F2FF">邀请框弹出时间设置：</td>
  </tr>
</table>
<br />
<table width="801" border="0" cellpadding="0" cellspacing="0" class="content9">
  
  <tr>    
    <td width="801" height="25"><table width="804" border="1" bordercolor="#A5AdC4" cellpadding="0" cellspacing="0">
      <tr>
        <td width="800"><table width="799" border="0" cellpadding="0" cellspacing="1" >
            <form id="form1" name="form1" method="post" action="">
              <tr >
                <td width="797" height="25">请选择域名：
                  <label>
                    <select name="domain"  onchange="this.form.submit()">
                      <%
			//UserManager userManager=new UserManager(); 
			StringTokenizer st = new StringTokenizer(userManager.getUserDomain(scomClient),",");	
			int counter=0;
			String t="";
			while(st.hasMoreTokens()){
 				t=st.nextToken();%>
                      <option value="<%=t%>" <%=(domain.equals(t))?"selected":""%>><%=t%></option>
                      <%}%>
                    </select>
                    </label>
                </td>
              </tr>
            </form>
          <form id="form2" name="form2" method="post" action="">
              <tr >
                <td >访问者打开页面后邀请对话框弹出时间：
                  <label>
		    <input type="hidden" name="domain" value='<%=(domain!=null)?domain:""%>'/>
                    <input type="text" name="inviteTime" value='<%=(inviteTime!=null)?inviteTime:"5"%>' size='2'/>
                  </label>
                  秒后自动弹出 设置为负数将取消自动邀请</td>
              </tr>
              <tr >
                <td >访问者打开页面后邀请对话框弹出内容：
                  <label>		     
                    <input type="text" name="inviteCont" value='<%=(inviteCont!=null)?inviteCont:""%>' size='70'/>
                  </label></td>
              </tr> 
              <tr >
                <td height="25" ><label>
                  <input type="submit" name="submit" value="提交设置" />
                </label></td>
              </tr>
            </form>
        </table></td>
      </tr>
    </table></td></tr></table>
<br>
<br>
</body>
</html>
