<%
	/**
	 *本文件被客户端管理员调用用做管理所有客服人员
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 22,2007
	 *@last modified:  Apil 22,2007
	*/
%>
<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date"%>
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<link href="../css/talk.css" rel="stylesheet" type="text/css" />
<link href="css/style.css" rel="stylesheet" type="text/css" />
<!--让页面顶到最左最上-->
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
}
.STYLE1 {color: #FF0000}
.data{
text-align:left;
font-size:12px;
background-color:#fff;
border-collapse:collapse;
empty-cells: show; 
margin:0px;
padding:0px;

}
.STYLE2 {color: #66CC00}
.STYLE4 {color: #FF0000; font-size: 24pt; }
-->
</style>
</head>
<%

/////////////////////session检测////////////////////////////////////////////////
String vid=request.getParameter("vid");
String sid=request.getParameter("sid");
msg.MySession mySession=new msg.MySession(vid);
String sessionId=mySession.getMySession().getSessionId();
if(sessionId==null || vid==null || !sessionId.equals(sid) || !mySession.getUserType().equals("0")){
	//out.println("<script language=jscript>alert('你没有登陆或会话已经过期，请重新登陆。');location.assign('index.htm');</script>");			
	//	return;	
}
///////////////////////////////////////////////////////////////////////////////		
%>
<%
//***********************************
//变量初始化
//***********************************
String sql = "";
ResultSet rs = null;
String add=request.getParameter("add"); 
String agentId=request.getParameter("agentId");
String amount=request.getParameter("amount");  
if(add!=null){
	try{
		sql="update agentbalance set balance =balance+"+amount+" where agentId=\""+agentId+"\"";		 
		if(db.getConnection()==null || db.isClosed())			 
			db.setConnection(); 
		db.setSqlQuery(sql);
		if(db.executeUpdate()==0){
			sql="insert into agentbalance values(\""+agentId+"\",\""+amount+"\")";
			if(db.getConnection()==null || db.isClosed())			 
			db.setConnection(); 
			db.setSqlQuery(sql);
			db.executeUpdate();
		}
	}catch(Exception e){out.println(e.getMessage()+" "+sql);}

}
 
%>
<body>
<br />
<table width="790" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="790" bgcolor="#E4F2FF">折扣管理</td>
  </tr>
</table>
<br />
<table width="790" height="31" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
 

  <tr>
    
    <td width="788" height="29" style="border-bottom: 1px solid #CCCCCC"><table width="713" border="0" bordercolor="#A5AdC4">
      <tr>
        <td width="664"><table width="664" border="0" cellpadding="0" cellspacing="0" class="content9">
            <tr style="">
              <td width="664" height="19" align="left" valign="middle" >
	<form  method="post" action="?vid=<%=vid%>&sid=<%=sid%>">
      <label>代理商ID:
      <input type="text" name="agentId" value="<%=(agentId!=null)?agentId:""%>">
      </label>
      <label>
      <input type="submit" name="selectAgent" value="提交">
      </label>
    </form></td>
              </tr>
            
        </table></td>
      </tr>
    </table></td></tr>
</table>
<br />
<%if(agentId!=null){%>
<br />
<table width="790" height="31" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="788" height="29" style="border-bottom: 1px solid #CCCCCC"><table width="779" border="0" bordercolor="#A5AdC4">
      <tr>
	  <%
	  	sql="select balance from agentbalance where agentId=\""+agentId+"\"";		 
		if(db.getConnection()==null || db.isClosed())			 
			db.setConnection(); 
		db.setSqlQuery(sql);
		rs=db.getResult();
		if(rs!=null && rs.next()){%>
        <td width="773">代理商余额：<%=rs.getString("balance")%></td>
		<%}else{%>
		<td width="773"></td>
		<%}%>
      </tr>
    </table></td>
  </tr>
</table>
<table width="790" height="31" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  
  <tr>
    <td width="788" height="29" style="border-bottom: 1px solid #CCCCCC"><table width="779" border="0" bordercolor="#A5AdC4">
      <tr>
        <td width="773"><table width="771" border="0" cellpadding="0" cellspacing="0" class="content9">
          <tr style="">
            <td width="771" height="19" align="left" valign="middle" ><form  method="post" action="?vid=<%=vid%>&amp;sid=<%=sid%>">
              <label>充值金额：
                
                <input type="text" name="amount" />
				<input type="hidden" name="agentId" value="<%=agentId%>" />
                </label>
              <label>
                <input type="submit" name="add" value="充值" />
                </label>
            </form>
              </td>
          </tr>
          
        </table></td>
      </tr>
    </table></td>
  </tr>
</table>
<%}%>
</body>
</html>
<%
if(db.getConnection()!=null && !db.isClosed())
	db.closeConnection();
%>
