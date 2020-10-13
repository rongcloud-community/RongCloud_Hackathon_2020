<%
	/**
	 *本文件被客户端调用用来建立一个预约回呼
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 22,2007
	 *@last modified:  Apil 22,2007
	*/
%>
<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date"%>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
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
<style type="text/css">
<!--
.STYLE1 {color: #FF0000}
-->
</style>
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
String domainIds=theFirstDomainId;
if(theFirstDomainId.indexOf(",")>0)
	theFirstDomainId=theFirstDomainId.substring(0,theFirstDomainId.indexOf(","));
 
//end: 判断登陆session是否超时/////
%>  
<%
//***********************************
//变量初始化
//***********************************
String sql = "";
ResultSet rs = null;

String scomClient = "";
String domainId = "";//用来标示库内是否有此用户的设置状态，不论是否为空
boolean hasVoip=false;
//***********************************
//获取变量值
//***********************************
//取出登录用户的用户名
scomClient = vid;
String submit=request.getParameter("submit");
String firstConnect=request.getParameter("firstConnect");
String secondConnect=request.getParameter("secondConnect");
String addVoip=request.getParameter("addVoip");
String newBindTel=request.getParameter("bindTel");
try{
	//连接数据库
	if(db.getConnection()==null || db.isClosed())			 
	 	db.setConnection(); 
 	sql="select domainId from voip where domainId=\""+theFirstDomainId+"\"";	 
	db.setSqlQuery(sql);
	rs = db.getResult();
	if(rs!=null && rs.next()){
		hasVoip=true;
	}
	if(hasVoip==false && addVoip!=null && newBindTel!=null && !newBindTel.equals("")){		
		sql="insert into voip values(\""+theFirstDomainId+"\",\""+newBindTel+"\",\"\",\"123456\")";
		db.setSqlQuery(sql);
		db.executeUpdate();
		sql="select accountId from voip where domainId=\""+theFirstDomainId+"\"";
		db.setSqlQuery(sql);
		rs = db.getResult();
		String accountId=null;
		if(rs!=null && rs.next()) 
			accountId=rs.getString("accountId");
 			try{				 
				HttpURLConnection hc=(HttpURLConnection)(new URL("http://221.122.60.186/user/dc/SetBindCaller_act.asp"+
					"?bindTel="+newBindTel+"&acctId="+accountId).openConnection()); 	         
				int re=hc.getResponseCode(); 
				hc.disconnect(); //release the http connection
				if(re==200){
					hasVoip=true;
					out.println("<font color=\'green\'>恭喜你，已经成功申请VOIP功能，现在就可以体验：<br>"+
					"在下面输入两个电话号码就可以接通，在站点管理中你可以查询余额和设置访问者免费电话功能。</font>");
			    }
				else
					out.println("<font color=\'red\'>您输入的电话号码已经被使用，请改用其他号码,如再次提示，请和管理员联系。</font>");
		}catch (IOException e2) {}
		
 	}
}catch(Exception ee){
	out.println("<font color=\'red\'>您输入的电话号码已经被使用，请改用其他号码,如再次提示，请和管理员联系。</font>");
}  
if(submit!=null && firstConnect!=null && secondConnect!=null &&
!firstConnect.equals("") && !secondConnect.equals("")){
    
   try
   {
	//连接数据库
	if(db.getConnection()==null || db.isClosed())			 
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
	//关闭数据库
	if(db.getConnection()!=null && !db.isClosed())
		db.closeConnection();
	String url="http://221.122.60.186/user/dc/Call_act.asp";
//firstConnect="013701089243";
//secondConnect="01051668337";
//bindTel="051266827493";
	url +="?BindCaller="+firstConnect;
	url +="&allCalled="+ secondConnect;
	url +="&ChargeCallNum="+ bindTel;
	url +="&userId="+ vid;
 
	//013701089243&allCalled=01051668337&ChargeCallNum=051266827493";
	HttpURLConnection hc=(HttpURLConnection)(new URL(url).openConnection()); 	         
        int re=hc.getResponseCode(); 
	hc.disconnect(); //release the http connection	
	out.println("系统正在接通电话"+firstConnect+"和电话"+secondConnect+"之间的连线。");
    }catch(Exception ee){}   
}
%>
<body>
<form id="form1" name="form1" method="post" action="callBack.jsp?vid=<%=vid%>&sid=<%=sid%>">
<table width="781" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="781" bgcolor="#E4F2FF">预约电话：<%=(!hasVoip)?"<color=red>您还没有启用VOIP功能，请按如下方法免费启用</font>":""%></td>
  </tr>
</table>
<%if(hasVoip==false){%>	  
<table width="780" border="1" cellpadding="0" cellspacing="0" class="content9" bordercolor="#A5AdC4">
  <tr ><td>
	  <br>您还没有申请VOIP，请按如下方法申请：<br>
      输入绑定电话：<input type="text" name="bindTel" size='12' />
      <span class="STYLE1">座机前加区号，手机前加0，如: 01051668337，不能包含数字外的任何字符(如 ：－)，否则VOIP无法呼通。</span><br />
      <input type="submit" name="addVoip" value="点击申请VOIP功能，免费开通" />
</td></tr></table>	  
<%}%>

	
<br />
<table width="780" border="1" cellpadding="0" cellspacing="0" class="content9" bordercolor="#A5AdC4">
  <tr >
     
    <td width="770" height="25">预约国内长途或本市电话：在下面填入您和您客户的电话，即刻为您接通 </td>
  </tr>
  <tr>
    
    <td height="25">
      <table width="769" border="0" cellpadding="0" cellspacing="1" >
        <tr >
          <td height="25" colspan="2">&nbsp; 该功能已经开通，您只需申请VOIP功能并预付很少的电话费，即可开始使用，将0.14元/分钟扣取话费</td>
          </tr>
        <tr bgcolor="#FFFFFF" class="content9">
          <td width="115" height="25" align="center" valign="middle">输入先接通的电话：</td>
          <td width="651" height="25"><input name="firstConnect" type="text" size="20" value="" />
            手机前面请加0，座机前面加区号</td>
        </tr>
        <tr bgcolor="#FFFFFF" class="content9">
          <td width="115" height="25" align="center" valign="middle">输入后接通的电话：</td>
          <td width="651" height="25"><input name="secondConnect" type="text" size="20" value="" />
           手机前面请加0，座机前面加区号</td>
        </tr>
        <tr bgcolor="#FFFFFF">
          <td height="25">&nbsp;</td>
          <td height="25"><label>
            <input type="submit" name="submit" value="提交" />
          </label></td>
        </tr>
      </table>
       
    </td>
  </tr>
</table>
 </form>
</body>
</html>
