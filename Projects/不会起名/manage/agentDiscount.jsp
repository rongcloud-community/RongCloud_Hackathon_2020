<%
	/**
	 *本文件被客户端调用用来修改用户信息
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 22,2007
	 *@last modified:  Apil 22,2007
	*/
%>

<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
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
String sql = "";
ResultSet rs = null;
%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<link href="css/style.css" rel="stylesheet" type="text/css" />
</head>
<table width="783" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="783" bgcolor="#E4F2FF">代理商产品价格信息：</td>
  </tr>
</table>
产品列表：<br />
<table width="790" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td><table width="784" border="0" cellpadding="0" cellspacing="0" class="data">
      <tr style="">
        <td width="64" height="20" align="center" valign="middle" bgcolor="#E4F2FF"  >产品ID</td>
        <td width="144" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >产品名称</td>
        <td width="371" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >产品描述</td>
        <td width="66" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >价格</td>
        <td width="139" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >&nbsp;</td>
        </tr>
 
      <%
	  sql = "select * from product order by productId";
	  db.setSqlQuery(sql);
	  if(db.getConnection()==null || db.isClosed())			 
	  	db.setConnection(); 
	  rs=db.getResult();
	  
	  while(rs!=null && rs.next())
	  {
	  %>
      <form id="" name="form_<%=rs.getString("productId")%>" method="post" action="?vid=<%=vid%>&sid=<%=sid%>">
        <tr>
          <td height="20" align="center" valign="middle" style="border-left: 1px solid #CCCCCC;border-bottom: 1px solid #CCCCCC"><%=rs.getString("productId")%></td>
          <td height="20" align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("name")%></td>
		  <input name="productId" type="hidden" id="productId" size="16" value="<%=rs.getString("productId")%>"/>
		  <input name="name" type="hidden" id="name" size="16" value="<%=rs.getString("name")%>"/>
		  <input name="info" type="hidden" id="info" size="16" value="<%=rs.getString("info")%>"/>
		  <input name="price" type="hidden" id="price" size="16" value="<%=rs.getString("price")%>"/>
		  <input name="minDiscount" type="hidden" id="minDiscount" size="16" value="<%=rs.getString("minDiscount")%>"/>
          <td height="20" align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("info")%></td>
          <td height="20" align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("price")%></td>
          <td height="20" align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC">&nbsp;</td>
          </tr>
      </form>
      <%
	  
	   }

	  %>
    </table></td>
  </tr>
</table>
折扣产品：<br />
<table width="790" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td><table width="786" border="0" cellpadding="0" cellspacing="0" class="data">
      <tr style="">
        <td width="64" height="20" align="center" valign="middle" bgcolor="#E4F2FF"  >产品ID</td>
        <td width="144" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >产品名称</td>
        <td width="371" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >产品描述</td>
        <td width="66" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >价格</td>
        <td width="69" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >代理折扣</td>
        <td width="72" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >折扣价</td>
      </tr>
      <%
	  sql = "select * from product,agentdiscount where product.productId=agentdiscount.productId and agentdiscount.agentId=\""+
	  		vid+"\" order by product.productId";
	  db.setSqlQuery(sql);
	  if(db.getConnection()==null || db.isClosed())			 
	  	db.setConnection(); 
	  rs=db.getResult();
	  //out.println(sql);
	  String discountStr="";
	  while(rs!=null && rs.next())
	  {
	  	discountStr=String.valueOf( rs.getDouble("price") * rs.getDouble("discount") );
		int index=discountStr.indexOf(".");
		if(index>0 && discountStr.length()>index+2)
			discountStr=discountStr.substring(0,index+3);	
	  %>
      <form id="form_<%=rs.getString("productId")%>" name="form_<%=rs.getString("productId")%>" method="post" action="?vid=<%=vid%>&amp;sid=<%=sid%>">
        <tr>
          <td height="20" align="center" valign="middle" style="border-left: 1px solid #CCCCCC;border-bottom: 1px solid #CCCCCC"><%=rs.getString("productId")%></td>
          <td height="20" align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("name")%></td>
          <input name="productId2" type="hidden" id="productId2" size="16" value="<%=rs.getString("productId")%>"/>
          <input name="name2" type="hidden" id="name2" size="16" value="<%=rs.getString("name")%>"/>
          <input name="info2" type="hidden" id="info2" size="16" value="<%=rs.getString("info")%>"/>
          <input name="price2" type="hidden" id="price2" size="16" value="<%=rs.getString("price")%>"/>
          <input name="minDiscount2" type="hidden" id="minDiscount2" size="16" value="<%=rs.getString("minDiscount")%>"/>
          <td height="20" align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("info")%></td>
          <td height="20" align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("price")%></td>
          <td height="20" align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("discount")%></td>
          <td height="20" align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=discountStr%></td>
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
