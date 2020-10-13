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
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
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
String sql = "";
ResultSet rs = null;
String orderChange=request.getParameter("orderChange");

%>
<table width="828" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="824" bgcolor="#E4F2FF">代理商消费记录：</td>
  </tr>
</table>
<br />
<table width="829" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="825"><table width="825" border="0" cellpadding="0" cellspacing="0" class="data">
      <tr style="">
        <td width="36" height="20" align="center" valign="middle" bgcolor="#E4F2FF"  >订单ID</td>
        <td width="88" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >产品名称</td>
        <td width="281" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >订单描述</td>
        <td width="69" align="center" valign="middle" bgcolor="#E4F2FF" >目标帐户</td>
        <td width="77" align="center" valign="middle" bgcolor="#E4F2FF" >目标网站</td>
        <td width="49" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >金额 元 </td>
        <td width="44" align="center" valign="middle" bgcolor="#E4F2FF" >试用 天 </td>
        <td width="53" align="center" valign="middle" bgcolor="#E4F2FF" >状态</td>        
        <td width="66" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >日期</td>
		<td width="62" align="center" valign="middle" bgcolor="#E4F2FF" >操作</td>
        </tr>
      

	  
  <%
int intPageSize = 10;//设置一页显示的记录数//设置最好是7的倍数，下面显示数据每行7个。
int intRowCount = 0;//记录总数
int intPageCount = 0;//总页数
int intPage = 0;	 //待显示页码
String strPage = request.getParameter("page");//取得显示的记录数;
 sql = "select * from orders,product where product.productId=orders.productId and agentId=\""+
	  		vid+"\" order by orderTime DESC";
db.setSqlQuery(sql);
if(db.getConnection()==null || db.isClosed())			 
	db.setConnection(); 
rs=db.getResult();
if(rs !=null){
			if(strPage==null || strPage.equals("")){
				intPage = 1;//当前页为空时，默认为第1页
			}else{
				intPage = Integer.parseInt(strPage);
				if(intPage<1)
				{
					intPage=1;//当前页小于1时，默认为第1页
				}
			}
			rs.last();		//移到最后
			intRowCount = rs.getRow();//得到记录总数
			intPageCount = (intRowCount+ intPageSize-1)/intPageSize;//记录总页数
			rs.beforeFirst();
			if(intPage>intPageCount)
				intPage = intPageCount;//调整待显示的页面
			
			if(intPageCount>0)
			{
				int counter=0;				 
			 
				rs.absolute((intPage-1)*intPageSize+1);	
			 		 
				for(int i = 0;i<intPageSize && !rs.isAfterLast();i++)
				{	
					 counter++;						 		 	
					 	   
%>
      <form id="form_<%=rs.getString("productId")%>" name="form_<%=rs.getString("orderId")%>" method="post" action="?vid=<%=vid%>&amp;sid=<%=sid%>">
        <tr>
          <td height="20" align="center" valign="middle" style="border-left: 1px solid #CCCCCC;border-bottom: 1px solid #CCCCCC"><%=rs.getString("orderId")%></td>
          <td height="20" align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("name")%></td>      
          <td height="20" align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("orders.info")%></td>
          <td align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("destUser")%></td>
          <td align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("destSites")%></td>
          <td height="20" align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("cost")%></td>
          <td align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("tryDays")%></td>
          <td align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=(rs.getString("status").equals("1"))?"<font color='green'>已处理</font>":"试用中"%></td>
          <td align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("orderTime")%></td>
          <td align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC">
<!--order status=0 试用 ＝1 正式-->		  
		<%
		String productId=rs.getString("productId");
		//下面的产品代码必须和数据库中的一致
		//如果是站点升级
		if(productId.equals("1") || productId.equals("12") || productId.equals("13") ){
				String level="2";
					//这里和数据库中的数据要保持一致
				if(rs.getString("productId").equals("12"))
					level="1";
				else 
					level="2";	 		
		 	  %>
			  <%=(rs.getString("status").equals("1"))?"<a href='agentSiteUpgrade.jsp?vid="+vid+"&sid="+sid+
			  "&orderId="+rs.getString("orderId")+"&id="+rs.getString("destUser")+"&level="+level+"&productId="+
			  rs.getString("productId")+"&anotherYear=1&submit0=true'>续费</a>":
			  "<a href='agentSiteUpgrade.jsp?vid="+vid+"&sid="+sid+
			  "&orderId="+rs.getString("orderId")+"&id="+rs.getString("destUser")+"&level="+level+"&productId="+
			  rs.getString("productId")+"&submit0=true'>正式购买</a>"%>
		<%}else if(productId.equals("11") ){//如果是定制站点%>  
			   <%=(rs.getString("status").equals("1"))?"<a href='agentSiteSpecific.jsp?vid="+vid+"&sid="+sid+
			  "&orderId="+rs.getString("orderId")+"&domain="+
			  rs.getString("destSites")+"&productId="+
			  rs.getString("productId")+"&anotherYear=1&submit0=true'>续费</a>":
			  "<a href='agentSiteSpecific.jsp?vid="+vid+"&sid="+sid+
			  "&orderId="+rs.getString("orderId")+"&id="+rs.getString("destUser")+"&domain="+
			  rs.getString("destSites")+"&productId="+
			  rs.getString("productId")+"&submit0=true'>正式购买</a>"%>
		<%}else if(productId.equals("9") ){//如果是给站点手机短信充值%>
		<%}%>  
		  </td>
          </tr>
      </form>  <%			
	  				rs.next();
   
				}
			}
	 
 
%>	  
      <%
	   
	   }
if(db.getConnection()!=null && !db.isClosed())
	db.closeConnection();
	  %>
  <tr>
    <td height="25" align="right" valign="middle" bgcolor="#FFFFFF">&nbsp;</td>
    <td align="center" colspan="5" valign="middle" bgcolor="#FFFFFF"> 第<%=intPage%>页/共<%=intPageCount%>页&nbsp;&nbsp;
	<a href="?page=1&vid=<%=vid%>&sid=<%=sid%>">第一页</a>
<%
  if(intPage>1)
  {
  %>  		
        <a href="?page=<%=intPage-1%>&vid=<%=vid%>&sid=<%=sid%>">上一页</a>		
        <%
  }
  %>
      &nbsp;&nbsp;
      <%
  if(intPage<intPageCount)
  {
  %>
        <a href="?page=<%=intPage+1%>&vid=<%=vid%>&sid=<%=sid%>">下一页</a>
      <%
  }
  
  %>  
  <a href="?page=<%=intPageCount%>&vid=<%=vid%>&sid=<%=sid%>">最后一页</a>  </td>
  </tr>
    </table></td>
  </tr>
</table>
</body>
</html>
