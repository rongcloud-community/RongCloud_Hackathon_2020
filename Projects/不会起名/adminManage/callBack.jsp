<%
	/**
	 *本文件被admin调用来预约电话
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 26,2007
	 *@last modified:  Apil 26,2007
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
<link href="../css/talk.css" rel="stylesheet" type="text/css" />
</head>
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

String scomClient = "";
String domainId = "";//用来标示库内是否有此用户的设置状态，不论是否为空
//***********************************
//获取变量值
//***********************************
//取出登录用户的用户名
scomClient = (String)session.getValue("scomClient");
String submit=request.getParameter("submit");
String firstConnect=request.getParameter("firstConnect");
String secondConnect=request.getParameter("secondConnect");
if(submit!=null && firstConnect!=null && secondConnect!=null &&
!firstConnect.equals("") && !secondConnect.equals("")){
   //连接数据库
   
   try
   {
	db.setConnection();
	sql = "select * from user where id='"+scomClient+"'";
	db.setSqlQuery(sql);
	rs = db.getResult();
	if(rs!=null && rs.next())	 
		domainId = rs.getString("domainId");	
	int index=domainId.indexOf(",");
	if(index>0)
		domainId=domainId.substring(0,index);
	sql="select * from voip where domainId=\""+domainId+"\"";	
 
	db.setSqlQuery(sql);
	rs = db.getResult();
	String bindTel="";
	if(rs!=null && rs.next()) 
 		bindTel=rs.getString("bindTel");
	db.closeConnection();
	String url="http://61.232.3.44/user/dc/Call_act.asp";
//firstConnect="013701089243";
//secondConnect="01051668337";
//bindTel="051266827493";
	url +="?BindCaller="+firstConnect;
	url +="&allCalled="+ secondConnect;
	url +="&ChargeCallNum="+ bindTel;
 
	//013701089243&allCalled=01051668337&ChargeCallNum=051266827493";
	HttpURLConnection hc=(HttpURLConnection)(new URL(url).openConnection()); 	         
        int re=hc.getResponseCode(); 
	hc.disconnect(); //release the http connection	
	out.println("系统正在接通电话"+firstConnect+"和电话"+secondConnect+"之间的连线。");
    }catch(Exception ee){}   
}
%>
<body>
<table width="780" border="0" cellpadding="0" cellspacing="0" class="content9">
  <tr class="content10White">
    <td width="10" height="25">&nbsp;</td>
    <td width="770" height="25">预约国内长途或本市电话：在下面填入您和您客户的电话，即刻为您接通 </td>
  </tr>
  <tr>
    <td height="25">&nbsp;</td>
    <td height="25"><form id="form1" name="form1" method="post" action="callBack.jsp">
<br />
<table width="700" border="0" cellpadding="0" cellspacing="1" bgcolor="#CCCCCC">
        <tr class="content10hui">
          <td height="25" colspan="2">&nbsp; 该功能已经开通，您只需申请VOIP功能并预付很少的电话费，即可开始使用，将8分/分钟扣取话费</td>
          </tr>
        <tr bgcolor="#FFFFFF" class="content9">
          <td width="116" height="25" align="center" valign="middle">输入先接通的电话：</td>
          <td width="584" height="25"><input name="firstConnect" type="text" size="20" value="" />
            手机前面请加0，座机前面加区号</td>
        </tr>
        <tr bgcolor="#FFFFFF" class="content9">
          <td width="116" height="25" align="center" valign="middle">输入后接通的电话：</td>
          <td width="584" height="25"><input name="secondConnect" type="text" size="20" value="" />
           手机前面请加0，座机前面加区号</td>
        </tr>
        <tr bgcolor="#FFFFFF">
          <td height="25">&nbsp;</td>
          <td height="25"><label>
            <input type="submit" name="submit" value="提交" />
          </label></td>
        </tr>
      </table>
        </form>
    </td>
  </tr>
</table>
</body>
</html>
