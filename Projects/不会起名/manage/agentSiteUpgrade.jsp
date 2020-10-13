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

String id = "";
String level = "";

String submit=null;
//***********************************
//获取变量值
//***********************************
//取出登录用户的用户名，也就是id
//id = (String)session.getValue("scomClient");
//超级管理后台中该id通过参数获取
id=request.getParameter("id");
level=request.getParameter("level");
//String evaluate=request.getParameter("evaluate");
String productId=request.getParameter("productId");
String destSites=request.getParameter("siteNames");
String productInfo=request.getParameter("productInfo");
try{productInfo = new String( productInfo.getBytes("iso-8859-1"),"utf-8" );}catch(Exception e){}
String price=request.getParameter("price");
String domainIds=request.getParameter("domainIds");
String riginalLevelStr=request.getParameter("riginalLevel");
String tryDays=request.getParameter("tryDays");
String orderId=request.getParameter("orderId");
String anotherYear=request.getParameter("anotherYear");
boolean isOrderSetOk=false;
submit=request.getParameter("submit");
String submit0=request.getParameter("submit0"); 
if(submit!=null){
	boolean enoughBalace=false;
	if(tryDays==null || tryDays.equals("null")){
		sql="update agentbalance set balance=balance-"+price+" where agentId=\""+vid+"\" and balance>="+price;
		if(db.getConnection()==null || db.isClosed())			 
			db.setConnection(); 
		db.setSqlQuery(sql);	
		if(db.executeUpdate()>0){
			enoughBalace=true;
			msg.OperateLog.writeLog(vid,"/manage/agentSiteUpgrade.jsp:升级站点时扣除消费额"+price,"扣除成功");
		}else
			msg.OperateLog.writeLog(vid,"/manage/agentSiteUpgrade.jsp:升级站点时扣除消费额"+price,"扣除失败");
	}
	else
		enoughBalace=true;	
	if(enoughBalace){
		//domainIds=userManager.getUserDomainId(id); 
		//String theFirstDomainId=userManager.getUserDomainId(vid);
		//if(theFirstDomainId.indexOf(",")>0)
		//	theFirstDomainId=theFirstDomainId.substring(0,theFirstDomainId.indexOf(","));
		try{
			if(orderId==null || anotherYear!=null){//新开或从订单列表中点击过来续费
				Calendar cal = Calendar.getInstance();    
				SimpleDateFormat formatter1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String now= formatter1.format(cal.getTime());
				cal.set(Calendar.YEAR,cal.get(Calendar.YEAR)+1);
				String nextYear= formatter1.format(cal.getTime());
				if(tryDays==null || tryDays.equals("null"))
					sql="insert into orders values(\"\",\""+vid+"\",\""+vid+"\",\""+productId+"\",\""+price+"\",\""+
						productInfo+"\",\""+id+"\",\""+destSites+"\",\""+now+"\",\"0\",\"1\")";
				else
					sql="insert into orders values(\"\",\""+vid+"\",\""+vid+"\",\""+productId+"\",\""+price+"\",\""+
						productInfo+"\",\""+id+"\",\""+destSites+"\",\""+now+"\",\""+tryDays+"\",\"0\")";
				if(db.getConnection()==null || db.isClosed())			 
					db.setConnection(); 
				db.setSqlQuery(sql);
				//out.println(sql);
				if(db.executeUpdate()>0){	
					if(anotherYear!=null){//从订单列表中点击过来续费
						sql="select end from site where domainIds=\""+domainIds+"\"";
						if(db.getConnection()==null || db.isClosed())			 
					  		db.setConnection(); 
						db.setSqlQuery(sql);
						rs=db.getResult();
						java.util.Date  end=null;
						if(rs!=null && rs.next() && end==null)
							end=rs.getDate("end");
						cal.setTime(end);
						cal.set(Calendar.YEAR,cal.get(Calendar.YEAR)+1);
						nextYear= formatter1.format(cal.getTime()); 
						sql="update site set payLevel=\""+level+"\",end=\""+nextYear+"\" where domainIds=\""+domainIds+"\"";
					}
					else if(riginalLevelStr!=null && riginalLevelStr.equals("1")) //如果是从增强版到商务版
						sql="update site set payLevel=\""+level+"\" where domainIds=\""+domainIds+"\"";
					else
						sql="update site set payLevel=\""+level+"\",end=\""+nextYear+"\" where domainIds=\""+domainIds+"\"";
					if(db.getConnection()==null || db.isClosed())			 
					  db.setConnection(); 
					db.setSqlQuery(sql);
				
					try{
						if(db.executeUpdate()>0){
							isOrderSetOk=true;
							submit0=null;
							out.println("订单提交成功");
						}
						else
							out.println("订单提交失败");
					}catch(Exception ee){
						out.println("数据库操作异常： error:"+ee.getMessage());
					}
				}
				else
					out.println("订单提交失败");
			}else{//从订单列表中点击过来将试用订单转正
				sql="update orders set status=1 where orderId="+orderId;
				if(db.getConnection()==null || db.isClosed())			 
					 db.setConnection(); 
				db.setSqlQuery(sql);
				if(db.executeUpdate()>0){
					out.println("订单提交成功");
					isOrderSetOk=true;
					submit0=null;
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
    <td width="783" bgcolor="#E4F2FF">代理商下级站点升级：</td>
  </tr>
</table>
<br />
<%

if(submit0!=null){
	//	 
	boolean canUpgrade=true;
	String siteNames="";		 
	int levelInt=0;
	int riginalLevel=-1;
	java.util.Date  end=null;
	boolean reverse=false;
	
	//1 如果选择试用，检查是否已有试用订单存在,若存在则不能重复提交，
	/**
	if(tryDays!=null){
		sql="select orderId from orders where destUser=\""+id+"\" and productId=\""+productId+"\"";
		if(db.getConnection()==null || db.isClosed())			 
		  db.setConnection(); 
		db.setSqlQuery(sql);
		rs=db.getResult(); 	 
		if(rs!=null && rs.next())
			canUpgrade=false;		 
	}
	**/	
	//2 检查所升级的站点是否符合级别从低到高的要求，同时获取要升级的域名
	if(canUpgrade){
		sql="select domain,payLevel,domainIds,end from site,user,agentsites where site.domainIds=user.domainId and (site.domainId=agentsites.domainId or site.parentId=agentsites.domainId) and user.id=\""+id+"\" and agentId=\""+vid+"\"";
		if(db.getConnection()==null || db.isClosed())			 
		  db.setConnection(); 
		db.setSqlQuery(sql);
		rs=db.getResult(); 		 
		
		try{levelInt=Integer.parseInt(level);}catch(Exception e){}
		while(rs!=null && rs.next()){				
			riginalLevel=rs.getInt("payLevel");
			//if( levelInt<= riginalLevel )					 
			//	break;			
			canUpgrade=true;	
			if(domainIds==null || domainIds.equals(""))	
				domainIds=rs.getString("domainIds");
			if(end==null )
				end=rs.getDate("end");
			siteNames +=rs.getString("domain")+",";			
		}
		if(riginalLevel==2 && (level.equals("1") || level.equals("0")))
			reverse=true;//canUpgrade=false;
		//这里和数据库中的产品要对应
		else if(orderId!=null && productId.equals("1"))
			riginalLevel=0;
		else if(orderId!=null &&productId.equals("12"))
			riginalLevel=0;
		else if(orderId!=null && productId.equals("13"))
			riginalLevel=1;
		//out.println(orderFromOrderList+" "+String.valueOf(riginalLevel));
	}
	//out.println(sql);
	//如果可以升级，取出订单的产品价格和折扣算出花费	 
	if(canUpgrade){
		double priceDouble=0.0;		 	
		//String productId=null;
		String productName="";
		String originalPrice="";
		String myDiscount="";
		//String productInfo="";
		if(riginalLevel==0 && levelInt==1)//从标准版升级到增强版
			productId="12";
		else if(riginalLevel==0 && levelInt==2)//从标准版升级到商务版
			productId="1";
		else if(riginalLevel==1 && levelInt==2)//从增强版升级到商务版
			productId="13";
		if(productId!=null){
			sql="select price,info,name,discount from product,agentdiscount where product.productId=agentdiscount.productId and product.productId="+productId +" and agentId=\""+vid+"\"";
			//out.println(sql);
			if(db.getConnection()==null || db.isClosed())			 
				db.setConnection(); 
			db.setSqlQuery(sql);
			rs=db.getResult();			 
			if(rs!=null && rs.next()){
				priceDouble=( rs.getDouble("price") * rs.getDouble("discount") );
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
					priceDouble=rs.getDouble("price");			
					productInfo=rs.getString("info");					
					productName=rs.getString("name");
				}	
			}
			if(anotherYear!=null)
						productInfo +="(续费)";
		}
		long restDays=0;
		String nowStr="";
		String nextYearStr="";
		String endStr="";
		Calendar cal = Calendar.getInstance();   
		SimpleDateFormat formatter1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		if(anotherYear==null){			
			nowStr= formatter1.format(cal.getTime()); 
			cal.set(Calendar.YEAR,cal.get(Calendar.YEAR)+1);
			nextYearStr= formatter1.format(cal.getTime()); 
		}
		else{//如果是续费
			cal.setTime(end);
			nowStr= formatter1.format(cal.getTime()); 
			cal.set(Calendar.YEAR,cal.get(Calendar.YEAR)+1);
			nextYearStr= formatter1.format(cal.getTime()); 		
		}		 
		if(riginalLevel==1 && levelInt==2 && anotherYear==null){//从增强版升级到商务版
			cal = Calendar.getInstance();
			long now=cal.getTimeInMillis();
			cal.setTime(end);			 
			endStr= formatter1.format(cal.getTime()); 
			long siteEnd=cal.getTimeInMillis();
			restDays=(siteEnd-now)/1000l/60l/60l/24l;
			//out.println(""+restDays);
			priceDouble = priceDouble *  (double)restDays/365d;
		}
		 
		String priceStr=String.valueOf(priceDouble);
		int index=priceStr.indexOf(".");
		if(index>0 && priceStr.length()>index+2)
			priceStr=priceStr.substring(0,index+3);	
	 
	if(canUpgrade && productName!=null && !productName.equals("") && !reverse){			
%>
<table width="784" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="790" bgcolor="#E4F2FF"><table width="779" height="52" border="0" cellpadding="0" cellspacing="0">
      <tr class="content10White">
        <td width="588" height="16">订单内容：<br><br>
								    产品名称：<%=productName%><br>									
									产品描述：<%=productInfo%><br>
									目标用户：<%=id%><br>
									目标网站：<%=siteNames%></td>
      </tr>
      <tr class="content10White">
        <td width="588" height="21"><form  method="post" action="">
          <label> </label>
          <label>
		  	订单期限：<%=(riginalLevel==1 && levelInt==2 && anotherYear==null)?nowStr+" --- "+endStr+"("+restDays+"天)":nowStr+" --- "+nextYearStr+"(1年)"%><br>
			产品价格：<%=originalPrice%>元<br>
			折 扣 率：<%=(myDiscount!=null && !myDiscount.equals(""))?myDiscount:"无"%><br>
            实际金额：<%=priceStr%>元 <%=(tryDays!=null)?"试用3天":""%>
			<input type="hidden" name="id" value="<%=id%>" />
			<input type="hidden" name="siteNames" value="<%=siteNames%>" />
			<input type="hidden" name="riginalLevel" value="<%=String.valueOf(riginalLevel)%>" />
			<%=(orderId!=null)?"<input type='hidden' name='orderId' value='"+orderId+"' />":""%>
			<%=(anotherYear!=null)?"<input type='hidden' name='anotherYear' value='"+anotherYear+"' />":""%>
			<input type="hidden" name="level" value="<%=level%>" />
			<input type="hidden" name="tryDays" value="<%=tryDays%>" />
			<input type="hidden" name="productId" value="<%=productId%>" />
			<input type="hidden" name="price" value="<%=priceStr%>" />
			<input type="hidden" name="productInfo" value="<%=productInfo%>" />
			<input type="hidden" name="domainIds" value="<%=domainIds%>" /> <br />
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
	else{
%>
<table width="784" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="790" bgcolor="#E4F2FF"><table width="779" height="52" border="0" cellpadding="0" cellspacing="0">
      <tr class="content10White">
        <td width="588" height="16">
		<%if(riginalLevel>0){%>
		管理员<%=id%>下的站点已经不低于<%=(levelInt==1)?"增强版":""%><%=(levelInt==2)?"商务版":""%><br><%=siteNames%></td>
		<%}else if(riginalLevel==0){%>
		没有找到<%=id%>下的站点或该管理员不是你的下级用户。<br>		 
		<%} else{%>
		出错： 原因可能是要升级的网站中级别不一致，这需要联系客服。	<br>		
		<%}%>	
		
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
}
%>
<br />
<%if(orderId==null){%>
<table width="784" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="790" bgcolor="#E4F2FF"><table width="779" height="52" border="0" cellpadding="0" cellspacing="0">
      <tr class="content10White">
        <td width="588" height="16">站点升级(对管理员下的所有站点生效)</td>
      </tr>
      <tr class="content10White">
        <td width="588" height="21"><form  method="post" action="">
            <label>输入站点管理员ID:
              <input type="text" name="id" value='<%=(id!=null && !id.equals(""))?id:""%>' size='35' />
            <select name="level">              
              <option value="1">增强版</option>
              <option value="2">商务版</option>              
            </select>
            </label>
            <label>
            <input type="checkbox" name="tryDays" value="3" />
            试用(3天) 
            <input type="submit" name="submit0" value="提交" />
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
