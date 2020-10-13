<%
	/**
	 *本文件被客户端调用用来设置VOIP
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 22,2007
	 *@last modified:  Apil 22,2007
	*/
%>
<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date"%>
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
//***********************************
//变量初始化
//***********************************
String sql = "";
ResultSet rs = null;

String scomClient = "";
boolean voipEnabled= false; 
boolean voipHide=false;
 
//***********************************
//获取变量值
//***********************************
//取出登录用户的用户名
scomClient = vid;
String voipEnabledS=request.getParameter("voipEnabled");
String voipHideS=request.getParameter("voipHide");

//连接数据库
if(db.getConnection()==null || db.isClosed())			 
	 db.setConnection(); 
if(voipEnabledS!=null && voipEnabledS.equals("true"))
	sql="update user set voipenabled=\'true\' where id=\""+scomClient+"\"";
if(voipEnabledS!=null && voipEnabledS.equals("false"))
	sql="update user set voipenabled=\'false\' where id=\""+scomClient+"\"";
if(voipHideS!=null && voipHideS.equals("true"))
	sql="update user set voiphide=\'true\' where id=\""+scomClient+"\"";
if(voipHideS!=null && voipHideS.equals("false"))
	sql="update user set voiphide=\'false\' where id=\""+scomClient+"\"";
try
{
	if(sql!=null && sql.length()>0){
		db.setSqlQuery(sql);
		db.executeUpdate();
	}
	sql = "select * from user where id='"+scomClient+"'";
	db.setSqlQuery(sql);
	rs = db.getResult();
	if(rs!=null && rs.next())
	{
		//domainId = rs.getString("id");
		voipEnabled = rs.getBoolean("voipenabled");
		voipHide = rs.getBoolean("voiphide");		 
	}	 
 }catch(Exception ee){}
//关闭数据库
if(db.getConnection()!=null && !db.isClosed())
	db.closeConnection();
%>
<body>
<table width="782" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="782" bgcolor="#E4F2FF">VOIP设置</td>
  </tr>
</table>
<br />
<form id="form1" name="form1" method="post" action="voip.jsp?vid=<%=vid%>&sid=<%=sid%>">
<table width="780" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4" >
  <tr>    
    <td >
<table width="780" border="1" cellpadding="0" cellspacing="0" class="data"  >
         
        <tr bgcolor="#FFFFFF" >
          <td width="144" height="25" align="center" valign="middle"> VOIP开启：</td>
          <td width="630" height="25"><%=(voipEnabled==true)?"启动&nbsp;&nbsp;&nbsp;&nbsp;<input name='off' type='button' size='6' value='点击关闭' onclick=\"JavaScript:location.href='voip.jsp?voipEnabled=false&vid="+vid+"&sid="+sid+"'\" />":"关闭&nbsp;&nbsp;&nbsp;&nbsp;<input name='on' type='button' size='6' value='点击打开' onclick=\"JavaScript:location.href='voip.jsp?voipEnabled=true&vid="+vid+"&sid="+sid+"'\" />"%>		  
		 
            <input type="hidden" name="domainId" value="<%=scomClient%>" /></td>
        </tr>
        <tr bgcolor="#FFFFFF" class="content9">
          <td height="25" align="center" valign="middle">隐藏VOIP：</td>
          <td height="25"><%=(voipHide==true)?"隐藏&nbsp;&nbsp;&nbsp;&nbsp;<input name='off1' type='button' size='6' value='点击显示' onclick=\"JavaScript:location.href='voip.jsp?voipHide=false&vid="+vid+"&sid="+sid+"'\" />":"显示&nbsp;&nbsp;&nbsp;&nbsp;<input name='on1' type='button' size='6' value='点击隐藏' onclick=\"JavaScript:location.href='voip.jsp?voipHide=true&vid="+vid+"&sid="+sid+"'\" />"%></tr>
        <tr bgcolor="#FFFFFF">
          <td colspan=2 height="47">提示：<br>
	    VOIP开启---如果贵网站申请VOIP电话功能，客户在浏览您的网站时，可以使用免费电话功能。<br>
	    隐藏VOIP---客户在打开的对话窗口不显示VOIP功能。
	</td> 
    </tr>
       </table>
      
    </td>
  </tr>
</table>  </form>
</body>
</html>
