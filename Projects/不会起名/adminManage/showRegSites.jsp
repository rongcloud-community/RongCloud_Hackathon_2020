<%
	/**
	 *本文件被admin调用来修改某个网站的客服人员
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 26,2007
	 *@last modified:  Apil 26,2007
	*/
%>
<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date"%>
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />

<jsp:useBean id="db" scope="page"  class="msg.DbConn" />

<html>
<head>
 
<title>无标题文档</title>
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
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

String year =request.getParameter("year");
String month =request.getParameter("month");
String day =request.getParameter("day");
if(year==null){
	Calendar now= Calendar.getInstance();
	year=String.valueOf(now.get(Calendar.YEAR));
	month=String.valueOf(now.get(Calendar.MONTH)+1);
	day=String.valueOf(now.get(Calendar.DAY_OF_MONTH));	 
}
 
%>
<body>
<table width="802" height="150" border="0" cellpadding="0" cellspacing="0">
  <tr class="content10White">
    <td width="802" height="25">网站查询</td>
  </tr>
  <tr class="content10White">
    <td width="802" height="25"><form  method="post" action="">
      <label>
      <select name="year">
        <%for(int i=2007;i<2017;i++){
	  	if(year.equals(String.valueOf(i))){
			%><option value="<%=String.valueOf(i)%>" selected><%=String.valueOf(i)%></option>
		<%}else{%>
			<option value="<%=String.valueOf(i)%>"><%=String.valueOf(i)%></option>
        <%}
	  }%> 
      </select>
      年
      <select name="month">
        <%for(int i=1;i<13;i++){
	  	if(month.equals(String.valueOf(i))){
			%><option value="<%=String.valueOf(i)%>" selected><%=String.valueOf(i)%></option>
		<%}else{%>
			<option value="<%=String.valueOf(i)%>"><%=String.valueOf(i)%></option>
        <%}
	  }%> 
      </select>
      月
      <select name="day">
	  <%for(int i=1;i<32;i++){
	  	if(day.equals(String.valueOf(i))){
			%><option value="<%=String.valueOf(i)%>" selected><%=String.valueOf(i)%></option>
		<%}else{%>
			<option value="<%=String.valueOf(i)%>"><%=String.valueOf(i)%></option>
        <%}
	  }%> 
      </select>
      日       </label>
      <label>
      <input type="submit" name="Submit" value="提交">
      </label>
    </form></td>
  </tr>
  <tr>
    <td height="100" align="left" valign="middle">	
	<table width="797" border="0" cellpadding="0" cellspacing="0" class="content9">
      <tr style="">
        <td width="38" align="center" valign="middle" class="content10hui">No</td>
        <td width="35" height="25" align="center" valign="middle" class="content10hui">ID</td>
        <td width="141" height="25" align="center" valign="middle" class="content10hui">域名</td>
        <td width="296" height="25" align="center" valign="middle" class="content10hui">公司</td>
        <td width="69" height="25" align="center" valign="middle" class="content10hui">联系人</td>
        <td width="87" height="25" align="center" valign="middle" class="content10hui">电话</td>
        <td width="131" height="25" align="center" valign="middle" class="content10hui">时间</td>
        </tr>
	  <%
	  sql = "select * from site where start>\""+year+"-"+month+"-"+day+" 0:0:0\" and start<\""+year+"-"+month+"-"+day+" 23:59:59\" order by start DESC";
 	  if(db.getConnection()==null || db.isClosed())			 
			db.setConnection(); 
	  db.setSqlQuery(sql);
	  rs=db.getResult();
	  int counter=0;
	  while(rs!=null && rs.next())
	  {
	  	counter++;
	  %>
	  <form id="UserForm" name="UserForm" method="post" action="userSave.jsp?action=editUser">
      <tr>
        <td align="center" valign="middle" style="border-left: 1px solid #CCCCCC;border-bottom: 1px solid #CCCCCC"><%=""+counter%></td>
        <td height="19" align="center" valign="middle" style="border-left: 1px solid #CCCCCC;border-bottom: 1px solid #CCCCCC"><%=rs.getString("domainId")%></td>
        <td height="19" align="center" valign="middle" style="border-bottom: 1px solid #CCCCCC"><a href="http://<%=rs.getString("domain")%>" target="_blank"><%=rs.getString("domain")%></a></td>
        <td height="19" align="center" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("companyName")%> </td>
        <td height="19" align="center" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("contactName")%> </td>
        <td height="19" align="center" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("contactTel")%> </td>
        <td height="19" align="center" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("start")%></td>
        </tr>
	  </form>
	  <%
	 
	   }
if(db.getConnection()!=null && !db.isClosed())
			db.closeConnection();	
	  %>
    </table></td>
  </tr>
</table>
</body>
</html>
