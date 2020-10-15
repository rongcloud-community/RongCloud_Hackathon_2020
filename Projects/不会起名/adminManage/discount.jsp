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
String modify=request.getParameter("modify");
String delete=request.getParameter("delete");
String productId=request.getParameter("productId");
String agentId=request.getParameter("agentId");
String discount=request.getParameter("discount"); 
String price=request.getParameter("price");
String minDiscount=request.getParameter("minDiscount");
 
if(add!=null){
	try{
		sql="insert into agentdiscount values(\""+agentId+"\",\""+productId+"\",\""+discount+"\")";
		 
		if(db.getConnection()==null || db.isClosed())			 
			db.setConnection(); 
		db.setSqlQuery(sql);
		if(db.executeUpdate()>0)
			;
	}catch(Exception e){out.println(e.getMessage()+" "+sql);}

}
else if(modify!=null){
	try{
		sql="update agentdiscount set discount=\""+discount+"\" where productId=\""+productId+"\" and agentId=\""+agentId+"\"";
		if(db.getConnection()==null || db.isClosed())			 
			db.setConnection(); 
		db.setSqlQuery(sql);
		if(db.executeUpdate()>0)
			;
	
	}catch(Exception e){out.println(e.getMessage()+" "+sql);}
}
else if(delete!=null) {
	try{
		sql="delete from agentdiscount where agentId=\""+agentId+"\" and productId=\""+productId+"\"";
		if(db.getConnection()==null || db.isClosed())			 
			db.setConnection(); 
		db.setSqlQuery(sql);
		if(db.executeUpdate()>0)
			;
	
	}catch(Exception e){out.println(e.getMessage()+" "+sql);}
}
 //out.println(sql);
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
<table width="791" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="787"><table width="790" border="0" cellpadding="0" cellspacing="0" class="data">
      <tr style="">
        <td width="59" height="20" align="center" valign="middle" bgcolor="#E4F2FF"  >产品ID</td>
        <td width="84" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >产品名称</td>
        <td width="308" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >产品描述</td>
        <td width="76" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >价格</td>
        <td width="86" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >最低折扣</td>
        <td width="88" align="center" valign="middle" bgcolor="#E4F2FF" >代理折扣</td>
        <td width="89" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >操作</td>
      </tr>
      <%
	  	if(agentId!=null){
	  		sql="select * from agentdiscount as t1,product as t2 where t1.productId=t2.productId and agentId=\""+agentId+"\"";
	  		if(db.getConnection()==null || db.isClosed())			 
				db.setConnection(); 
			db.setSqlQuery(sql);
			rs=db.getResult();
			while(rs!=null && rs.next()){%>
      <form id="form_<%=rs.getString("t1.productId")%>" name="form_<%=rs.getString("t1.productId")%>" method="post" action="?vid=<%=vid%>&amp;sid=<%=sid%>">
        <tr>
          <td height="20" align="center" valign="middle" style="border-left: 1px solid #CCCCCC;border-bottom: 1px solid #CCCCCC"><%=rs.getString("productId")%></td>
          <td height="20" align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("name")%></td>
          
          <input name="minDiscount" type="hidden" id="minDiscount" size="16" value="<%=rs.getString("minDiscount")%>"/>
          <td height="20" align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("info")%></td>
          <td height="20" align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("price")%></td>
          <td height="20" align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("minDiscount")%></td>
          <td align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC">
		   <input name="discount" type="text" id="discount" size="10" value="<%=rs.getString("discount")%>"/>
		    <input name="agentId" type="hidden" id="agentId"  size="10" value="<%=rs.getString("agentId")%>"/>
			<input name="productId" type="hidden" id="productId"  size="10" value="<%=rs.getString("productId")%>"/>
			<input name="modify" type="hidden" id="modify"  size="10" value="true"/>
		  </td>
          <td height="20" align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><a href="#" onclick="form_<%=rs.getString("t1.productId")%>.submit();">修改</a> <a href='javascript:if(confirm(&quot;确认删除?&quot;)) location=&quot;?delete=true&amp;productId=<%=rs.getString("productId")%>&amp;agentId=<%=rs.getString("agentId")%>&vid=<%=vid%>&amp;sid=<%=sid%>&quot;'>删除</a></td>
        </tr>
      </form>
      <%
	  }
  }

	  %>
    </table></td>
  </tr>
</table>
<br />
<script language=javascript>
	var minDiscount=1;
function checkValue()
{
 	var discount=document.addDiscount.discount.value;
	if(discount<minDiscount){
		alert("你设置的折扣率不能低于该产品的最低折扣");
		return false;
	}
}
</script>
<table width="790" height="31" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  
  <tr>
    <td width="788" height="29" style="border-bottom: 1px solid #CCCCCC"><table width="779" border="0" bordercolor="#A5AdC4">
      <tr>
        <td width="773"><table width="771" border="0" cellpadding="0" cellspacing="0" class="content9">
          <tr style="">
            <td width="771" height="19" align="left" valign="middle" ><form id="addDiscount" method="post" action="?vid=<%=vid%>&amp;sid=<%=sid%>" onSubmit="return checkValue()" >
              <label>代理商ID：
                <input type="text" name="agentId" value="<%=(agentId!=null)?agentId:""%>"/>
                产品： <select name="productId">
				 <option value="0"  >选择产品   </option>
		<%
			sql="select * from product";	
			if(db.getConnection()==null || db.isClosed())			 
				db.setConnection(); 
			db.setSqlQuery(sql);
			rs=db.getResult();
			int counter=0;
			while(rs!=null && rs.next()){%>	
				//if(counter==0)
					
               <option value="<%=rs.getString("productId")%>" onfocus="alert('sdcdsv');minDiscount=<%=rs.getString("minDiscount")%>;"> <%=rs.getString("name")%>(<=<%=rs.getString("minDiscount")%>)     </option>
			<%}%>	
			<option value="0"   >选择产品    </option>		 
                </select>
                折扣率：
                <input type="text" name="discount"   />
                </label>
              <label>
                <input type="submit" name="add" value="添加" />
                
            </form>
              </td>
          </tr>
          
        </table></td>
      </tr>
    </table></td>
  </tr>
</table>
</body>
</html>
<%
if(db.getConnection()!=null && !db.isClosed())
	db.closeConnection();
%>
