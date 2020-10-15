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
String condition=request.getParameter("condition");
String date=request.getParameter("date");
String agentId=request.getParameter("agentId");
 
 
%>
<body>
<br />
<table width="790" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="790" bgcolor="#E4F2FF">订单管理</td>
  </tr>
</table>
<br />
<table width="790" height="31" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="788" height="29" style="border-bottom: 1px solid #CCCCCC"><table width="713" border="0" bordercolor="#A5AdC4">
      <tr>
        <td width="664"><table width="664" border="0" cellpadding="0" cellspacing="0" class="content9">
          <tr style="">
            <td width="664" height="19" align="left" valign="middle" ><form  method="post" action="?vid=<%=vid%>&amp;sid=<%=sid%>">
              <label>代理商ID:
                <input type="text" name="agentId" value="<%=(agentId!=null)?agentId:""%>" />
                从日期开始:
                <input type="text" name="date" value="<%=(date!=null)?date:""%>" />
                <input type="submit" name="condition" value="提交" />
                
            </form></td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
</table>
<br />
<table width="791" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="787"><table width="788" border="0" cellpadding="0" cellspacing="0" class="data">
      <tr style="">
        <td width="60" height="20" align="center" valign="middle" bgcolor="#E4F2FF"  >订单ID</td>
        <td width="92" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >操作者</td>
        <td width="114" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >订单所属代理商</td>
        <td width="111" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >产品</td>
        <td width="84" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >订单金额</td>
		<td width="191" align="center" valign="middle" bgcolor="#E4F2FF" >订单描述</td>
		<td width="136" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >订单日期</td>
        </tr>
 	
      <%
	  if(agentId!=null && date!=null)
	  	sql = "select * from orders,product where orders.productId=product.productId  and "+
			  "agentId=\""+agentId+"\" and orderTime>=\""+date+"\" order by orderTime DESC";
	  else if(agentId!=null)
	  	sql = "select * from orders,product where orders.productId=product.productId  and "+
			  "agentId=\""+agentId+"\" order by orderTime DESC";
	  else if(agentId!=null && date!=null)
	  	sql = "select * from orders,product where orders.productId=product.productId  and "+
			  "orderTime>=\""+date+"\" order by orderTime DESC";
	  else
	  	sql = "select * from orders,product where orders.productId=product.productId order by orderTime DESC";
	  db.setSqlQuery(sql);
	  if(db.getConnection()==null || db.isClosed())			 
	  	db.setConnection(); 
	  rs=db.getResult();
	  int i = 1;
	  while(rs!=null && rs.next())
	  {
	  %>
      <form id="" name="form_<%=rs.getString("orderId")%>" method="post" action="?vid=<%=vid%>&sid=<%=sid%>">
        <tr>
          <td height="20" align="center" valign="middle" style="border-left: 1px solid #CCCCCC;border-bottom: 1px solid #CCCCCC"><%=rs.getString("orderId")%></td>
          <td height="20" align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("operator")%></td>
		   
		  <input name="minDiscount" type="hidden" id="minDiscount" size="16" value="<%=rs.getString("agentId")%>"/>
          <td height="20" align="middle" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("agentId")%></td>
          <td height="20" align="middle" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("name")%></td>
          <td height="20" align="middle" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("cost")%></td>
		  <td align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("orders.info")%></td>
		  <td height="20" align="middle" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("orderTime")%></td>
          </tr>
      </form>
      <%
	   i = i+1;
	   }
if(db.getConnection()!=null && !db.isClosed())
	db.closeConnection();
	  %>
    </table></td>
  </tr>
</table>
<br />
</body>
</html>
