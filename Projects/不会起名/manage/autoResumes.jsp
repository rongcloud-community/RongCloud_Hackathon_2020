<%
	/**
	 *本文件被客户端调用用来设置自动恢复信息
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
String domainId = "";//用来标示库内是否有此用户的设置状态，不论是否为空
String onlineMsg = "";
String offlineMsg = "";
String leftMsg = "";

//***********************************
//获取变量值
//***********************************
//取出登录用户的用户名
scomClient = vid;

//连接数据库
if(db.getConnection()==null || db.isClosed())			 
	 db.setConnection(); 
try
{
	sql = "select * from answermessage where id='"+scomClient+"'";
	db.setSqlQuery(sql);
	rs = db.getResult();
	if(rs!=null && rs.next())
	{
		domainId = rs.getString("id");
		onlineMsg = rs.getString("onlineMsg");
		offlineMsg = rs.getString("offlineMsg");
		leftMsg = rs.getString("leftMsg");
	}
	if(onlineMsg==null || onlineMsg.equals(""))
		onlineMsg="欢迎您的光临，有什么事可以帮到你！";
	if(offlineMsg==null || offlineMsg.equals(""))
		offlineMsg="我不在线，有事请留言。";
	if(leftMsg==null || leftMsg.equals(""))
		leftMsg="我有事外出，您可以直接给我留言。";	
 }catch(Exception ee){}
//关闭数据库
if(db.getConnection()!=null && !db.isClosed())
	db.closeConnection();
%>
<body>
<table width="786" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="778" bgcolor="#E4F2FF">自动回复管理</td>
  </tr>
</table>
<br />
<table width="780" border="0" cellpadding="0" cellspacing="0" class="content9">
  
  <tr>
    <td width="10" height="25">&nbsp;</td>
    <td width="770" height="25"><form id="form1" name="form1" method="post" action="autoResumesSave.jsp?vid=<%=vid%>&sid=<%=sid%>">
<table width="782" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4" >
  <tr>
    <td width="778"><table width="779" border="0" cellpadding="0" cellspacing="1" bgcolor="#CCCCCC" class="data">
      <tr bgcolor="#FFFFFF" class="content9">
        <td width="115" height="25" align="center" valign="middle">在线自动回复：</td>
        <td width="661" height="25"><input name="onlineMsg" type="text" size="90" value="<%=onlineMsg%>" />
            <input type="hidden" name="domainId" value="<%=domainId%>" /></td>
      </tr>
      <tr bgcolor="#FFFFFF" class="content9">
        <td height="25" align="center" valign="middle">离线自动回复：</td>
        <td height="25"><input name="offlineMsg" type="text" size="90" value="<%=offlineMsg%>" /></td>
      </tr>
      <tr bgcolor="#FFFFFF" class="content9">
        <td height="25" align="center" valign="middle">离开自动回复：</td>
        <td height="25"><input name="leftMsg" type="text" size="90" value="<%=leftMsg%>" /></td>
      </tr>
      <tr bgcolor="#FFFFFF">
        <td height="25">&nbsp;</td>
        <td height="25"><label>
          <input type="submit" name="Submit" value="提交修改" />
          <input type="reset" name="Submit2" value="重置" />
        </label></td>
      </tr>
    </table></td>
  </tr>
</table>
<br />
    </form>    </td>
  </tr>
</table>
</body>
</html>
