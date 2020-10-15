<%
	/**
	 *本文件被客户端调用用来修改用户信息
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 22,2007
	 *@last modified:  Apil 22,2007
	*/
%>

<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.text.SimpleDateFormat" errorPage="" %>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />

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
//***********************************
//变量初始化
//***********************************
String sql = "";
ResultSet rs = null;

String domain = "";


String submit=null;
//***********************************
//获取变量值
//***********************************
//取出登录用户的用户名，也就是id
//id = (String)session.getValue("scomClient");
//超级管理后台中该id通过参数获取
domain=request.getParameter("domain");

//String evaluate=request.getParameter("evaluate");
String productId="15"; //必须和数据库中的站点定制产品的id一致
String destSites=request.getParameter("siteNames");
String productInfo=request.getParameter("productInfo");
try{productInfo = new String( productInfo.getBytes("iso-8859-1"),"utf-8" );}catch(Exception e){}
String price=request.getParameter("price");
String domainId=request.getParameter("domainId");
String orderId=request.getParameter("orderId");
String id=request.getParameter("id");
String credit=request.getParameter("credit");
boolean isOrderSetOk=false;
submit=request.getParameter("submit");
String submit0=request.getParameter("submit0"); 
if(submit!=null){
	boolean enoughBalace=false;
	 
	sql="update agentbalance set balance=balance-"+price+" where agentId=\""+vid+"\" and balance>="+price;
	if(db.getConnection()==null || db.isClosed())			 
		db.setConnection(); 
	db.setSqlQuery(sql);	
	if(db.executeUpdate()>0){
		enoughBalace=true;
		msg.OperateLog.writeLog(vid,"/manage/agentSiteCredit.jsp:短消息充值时扣除消费额"+price,"扣除成功");
	}else
		msg.OperateLog.writeLog(vid,"/manage/agentSiteCredit.jsp:短消息充值时扣除消费额"+price,"扣除失败");
	 
	if(enoughBalace){		 
		try{
			Calendar cal = Calendar.getInstance();    
			SimpleDateFormat formatter1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String now= formatter1.format(cal.getTime()); 
			sql="insert into orders values(\"\",\""+vid+"\",\""+vid+"\",\""+productId+"\",\""+price+"\",\""+
				productInfo+"\",\""+id+"\",\""+domain+"\",\""+now+"\",\"0\",\"1\")";				 
			if(db.getConnection()==null || db.isClosed())			 
				db.setConnection(); 
			db.setSqlQuery(sql);
			//out.println(sql);
			if(db.executeUpdate()>0){						 
				sql="update site set credit=credit+"+credit+" where domainId=\""+domainId+"\"";					 
				if(db.getConnection()==null || db.isClosed())			 
				  db.setConnection(); 
				db.setSqlQuery(sql);				 
				if(db.executeUpdate()>0){
					isOrderSetOk=true;
					submit0=null;
					out.println("订单提交成功");
				}
				else 					 
					out.println("订单提交失败");			 		 	 
			}
			 
			if(db.getConnection()!=null && !db.isClosed())
				db.closeConnection();	 
			 
		}catch(Exception e){
			out.println("数据库操作异常： error:"+e.getMessage());
			if(db.getConnection()!=null && !db.isClosed())
				db.closeConnection();
		}
	}
	else
		out.println("<font color='red'>帐户余额不足,订单提交失败</font>");
}
%>
<table width="783" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="783" bgcolor="#E4F2FF"><table bordercolor="#a5adc4" height="34" cellspacing="0" cellpadding="0" width="783" border="1">
      <tbody>
        <tr>
          <td width="783" bgcolor="#e4f2ff">代理商下级站点网站短消息信用充值：</td>
        </tr>
      </tbody>
    </table></td>
  </tr>
</table>
<br />
<%

if(submit0!=null){
	//	 
	boolean canUpgrade=true;	 
	String parentId=null;	
	String amount=request.getParameter("amount");
	//获取申请网站的domainId，如果域名并非代理申请而是后添加的则取parentId 
	//检查网站是否为代理下面的客户
	sql="select domainId,parentId from site where domain=\""+domain+"\"";
	if(db.getConnection()==null || db.isClosed())			 
	  db.setConnection(); 
	db.setSqlQuery(sql);
	rs=db.getResult(); 	 
	if(rs!=null && rs.next()){	 
		domainId=rs.getString("domainId");
		if(rs.getString("parentId").equals("0"))
			parentId=rs.getString("domainId");
		else
			parentId=rs.getString("parentId");	
	}
	else
		 canUpgrade=false;	 
	if(canUpgrade){		
		 
		sql="select id from agentsites,user,site where agentsites.domainId=site.domainId and site.domainIds=user.domainId "+
				"and agentsites.domainId=\""+parentId+"\" and agentId=\""+vid+"\"";
		if(db.getConnection()==null || db.isClosed())			 
		  db.setConnection(); 
		db.setSqlQuery(sql);
		rs=db.getResult(); 			 
		if(rs!=null && rs.next())			
			id=rs.getString("id");		
		else 
			canUpgrade=false; 
	}
	//out.println(sql);
	//如果可以升级，取出订单的产品价格和折扣算出花费	 
	if(canUpgrade){
		double priceDouble=0.0;		 
		try{priceDouble	=Double.parseDouble(amount);}catch(Exception e){}		 
 		String productName="";
		String originalPrice="";
		String myDiscount="";  
		if(productId!=null){
			sql="select price,info,name,discount from product,agentdiscount where product.productId=agentdiscount.productId and product.productId="+productId +" and agentId=\""+vid+"\"";
 			if(db.getConnection()==null || db.isClosed())			 
				db.setConnection(); 
			db.setSqlQuery(sql);
			rs=db.getResult();			 
			if(rs!=null && rs.next()){
				priceDouble= priceDouble * rs.getDouble("discount") ;
				productInfo=rs.getString("info");
				productName=rs.getString("name");
				originalPrice=rs.getString("price");	
				myDiscount=rs.getString("discount");	
			}
			else{
				sql="select name,price,info from product where productId="+productId;
				if(db.getConnection()==null || db.isClosed())			 
					db.setConnection(); 
				db.setSqlQuery(sql);
				rs=db.getResult();			 
				if(rs!=null && rs.next()){
					originalPrice=rs.getString("price");		
					//priceDouble=rs.getDouble("price");			
					productInfo=rs.getString("info");					
					productName=rs.getString("name");
				}	
			}
			 
		}
		productInfo +="(信用点数"+credit+")"; 
		String priceStr=String.valueOf(priceDouble);
		int index=priceStr.indexOf(".");
		if(index>0 && priceStr.length()>index+2)
			priceStr=priceStr.substring(0,index+3);	
	 
	if(canUpgrade && productName!=null && !productName.equals("") ){			
%>
<table width="784" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="790" bgcolor="#E4F2FF"><table width="779" height="52" border="0" cellpadding="0" cellspacing="0">
      <tr class="content10White">
        <td width="588" height="16">订单内容：<br><br>
								    产品名称：<%=productName%><br>									
									产品描述：<%=productInfo%><br>
									目标用户：<%=id%><br>
									目标网站：<%=domain%></td>
      </tr>
      <tr class="content10White">
        <td width="588" height="21"><form  method="post" action="">
          <label> </label>
          <label>
		  	信用点数：<%=credit%><br>
			产品价格：<%=originalPrice%>元<br>
			折 扣 率：<%=(myDiscount!=null && !myDiscount.equals(""))?myDiscount:"无"%><br>
            实际金额：<%=priceStr%>元
			<input type="hidden" name="domain" value="<%=domain%>" />			 
			<input type="hidden" name="id" value="<%=id%>" />		 	 
			<input type="hidden" name="credit" value="<%=credit%>" /> 
			<input type="hidden" name="productId" value="<%=productId%>" />
			<input type="hidden" name="price" value="<%=priceStr%>" />
			<input type="hidden" name="productInfo" value="<%=productInfo%>" />
			<input type="hidden" name="domainId" value="<%=domainId%>" /> <br />
            <input type="submit" name="submit" value="确认订单" />
<input type="button" name="submit" value="点击返回"  onclick="javascript:history.back(-1)"/>
            </label>
        </form>
		
</td>
      </tr>
	  
    </table></td>
  </tr>
</table>
<%
	}
  }	
  else{
	 
%>
<table width="784" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="790" bgcolor="#E4F2FF"><table width="779" height="52" border="0" cellpadding="0" cellspacing="0">
      <tr class="content10White">
        <td width="588" height="16">		 
		没有找到网站<%=domain%>或该网站不是你的下级站点。 	 
		</td>
      </tr>
      <tr class="content10White">
        <td height="16" align="right">
		<input type="button" name="submit" value="点击返回"  onclick="javascript:history.back(-1)"/>
		</td>
      </tr>	
    </table></td>
  </tr>
</table>
<%	
	
 }	
}
%>
<br />
<%if(orderId==null){%>
<script language="javascript" type="text/javascript">
	function calculateCredte(){
	/**目前短消息充值免费
		var amount=document.getElementById("amount");
		var credit=document.getElementById("credit");
		if(amount!=null){
			if(amount.value<100){
				amount.value=100;
				alert("短消息充值不能低于100元。");	
			}	
		}
		if(amount!=null && credit!=null)
			credit.value=amount.value * 100;
	**/		
	}
</script>
<table width="784" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="790" bgcolor="#E4F2FF"><table width="779" height="52" border="0" cellpadding="0" cellspacing="0">
      <tr class="content10White">
        <td width="588" height="16">网站短消息信用充值</td>
      </tr>
      <tr class="content10White">
        <td width="588" height="21"><form  method="post" action="">
            <label>输入站点域名:
              <input type="text" name="domain" value='<%=(domain!=null && !domain.equals(""))?domain:""%>' size='20' />
              金额：
            </label>
            <label>
            <input type="text" name="amount" id="amount" value="0"  readonly="1" size="6" onkeyup="calculateCredte();" />            
            信用点：
            <input type="text" name="credit" id="credit" value="1000" readonly="1" size="6" />
            <input type="submit" name="submit0" value="提交" onclick="calculateCredte();" />
            </label>
        </form></td>
      </tr>
    </table></td>
  </tr>
</table>
<%}%>
 <%if(isOrderSetOk){%>
	<table width="784" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">    
	   <tr class="content10White">
	   <td  height="21" align="right">		
		<input type="button" name="submit" value="查看订单列表"  onclick="location='agentCost.jsp?vid=<%=vid%>&sid=<%=sid%>'"/>
	   </td>
	   </tr>
	</table>
	   <%}%>
</body>
</html>
<%
if(db.getConnection()!=null && !db.isClosed())
	db.closeConnection();
%>
