<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*" errorPage="" %>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML><HEAD>
<title></title>  
<META http-equiv=Content-Type content="text/html; charset=gb2312">
<META content="MSHTML 6.00.2900.3020" name=GENERATOR>
<style type="text/css">
<!--
.STYLE2 {color: #FFFFFF}
.STYLE3 {color: #FF9900}
.STYLE4 {color: #000000}
body,td,th {
	font-family: 宋体;
	font-size: 12px;
	color: #000000;
}
a:link {
	text-decoration: none;
	color: #000099;
}
a:visited {
	text-decoration: none;
	color: #000099;
}
a:hover {
	text-decoration: none;
	color: #FF6600;
}
a:active {
	text-decoration: none;
}
body {
	background-repeat: no-repeat;
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
	background-color: #CEEBFE;
}
.STYLE9 {color: #666666}
.STYLE12 {color: #66ABEA}
-->
</style>
 
<%
String sql = "";
ResultSet rs = null;
sql = "select groupName,date from groups group by groupId DESC limit 0,8";
db.setSqlQuery(sql);
if(db.getConnection()==null || db.isClosed())			 
	 db.setConnection(); 
rs=db.getResult();
%>
</HEAD>
<BODY>
<TABLE width="180" border=0 align="left" cellPadding=0  cellspacing="0" bgcolor="#CEEBFA"  >
  <TBODY>
  <TR>
    <TD width="180" 
      bgcolor="#E7F3FF" align="center">最新创建的群组</TD>
  </TR>
  <TR>
    <TD height='10' 
      vAlign=top ></TD>
  </TR>
<%
int counter=0;
for(int i=0; i<=8 && rs!=null && rs.next();i++){
	counter++;
%>
  
  <TR>
    <TD width="180" height='10' > <%=rs.getString("groupName")%> [<%=rs.getString("date")%>]</TD>
  </TR>
<%}
for(int i=0;i<8-counter;i++){
%>
<TR>
    <TD height='10' ></TD>
  </TR>
<%}%> 
<%
if(db.getConnection()!=null && !db.isClosed())
		db.closeConnection();
%>	
<TR>
    <TD width="180" align="right" 
      vAlign=top   style="cursor:hand" onClick="window.open('clientManage.jsp?action=group','ydmanage')">更多群组 加入群组 </TD>
  </TR>
</TBODY></TABLE>
</BODY></HTML>