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
String name=request.getParameter("name");
String info=request.getParameter("info");
try{
  if(name!=null)
 	name= new String( name.getBytes("iso-8859-1"),"utf-8" );
  if(info!=null)
 	info= new String( info.getBytes("iso-8859-1"),"utf-8" );
}catch(Exception e){}
String price=request.getParameter("price");
String minDiscount=request.getParameter("minDiscount");
 
if(add!=null){
	try{
		sql="insert into product values(\"\",\""+name+"\",\""+info+"\",\""+price+"\",\""+minDiscount+"\")";
		 
		if(db.getConnection()==null || db.isClosed())			 
			db.setConnection(); 
		db.setSqlQuery(sql);
		if(db.executeUpdate()>0)
			;
	}catch(Exception e){out.println(e.getMessage()+" "+sql);}

}
else if(modify!=null){
	try{
		sql="update product set name=\""+name+"\",info=\""+info+"\",price=\""+price+"\",minDiscount=\""+minDiscount+
			"\" where productId=\""+productId+"\"";
		if(db.getConnection()==null || db.isClosed())			 
			db.setConnection(); 
		db.setSqlQuery(sql);
		if(db.executeUpdate()>0)
			;
	
	}catch(Exception e){out.println(e.getMessage()+" "+sql);}
}
else if(delete!=null) {
	try{
		sql="delete from product where productId=\""+productId+"\"";
		if(db.getConnection()==null || db.isClosed())			 
			db.setConnection(); 
		db.setSqlQuery(sql);
		if(db.executeUpdate()>0)
			;
	
	}catch(Exception e){out.println(e.getMessage()+" "+sql);}
}
 
%>
<body>
<br />
<table width="790" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="790" bgcolor="#E4F2FF">产品管理</td>
  </tr>
</table>
<br />
<table width="790" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td><table width="786" border="0" cellpadding="0" cellspacing="0" class="data">
      <tr style="">
        <td width="64" height="20" align="center" valign="middle" bgcolor="#E4F2FF"  >产品ID</td>
        <td width="144" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >产品名称</td>
        <td width="371" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >产品描述</td>
        <td width="66" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >价格</td>
        <td width="69" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >最低折扣</td>
		<td width="72" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >操作</td>
        </tr>
<script language="javascript">	
	function putValue(form1){
		var theForm=document.getElementById("UserForm2");
		theForm.productId.value=form1.productId.value;
		theForm.name.value=form1.name.value;
		theForm.info.value=form1.info.value;
		theForm.price.value=form1.price.value;
		theForm.minDiscount.value=form1.minDiscount.value;
		theForm.modify.style.display="inline";
	}
</script>   		
      <%
	  sql = "select * from product order by productId";
	  db.setSqlQuery(sql);
	  if(db.getConnection()==null || db.isClosed())			 
	  	db.setConnection(); 
	  rs=db.getResult();
	  int i = 1;
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
          <td height="20" align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("minDiscount")%></td>
		  <td height="20" align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><a href=# onclick="putValue(form_<%=rs.getString("productId")%>);">修改</a>           
			  <a href='javascript:if(confirm(&quot;确认删除?&quot;)) location="product.jsp?delete=true&productId=<%=rs.getString("productId")%>&vid=<%=vid%>&sid=<%=sid%>"'>删除</a></td>
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
<table width="790" height="78" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
<script language="javascript">	
	function userCheck(){
		var theForm=document.getElementById("UserForm2");
		if(theForm && theForm.name.value==""){
			alert("请输入产品名称");
			return false;
		}
		if(theForm && theForm.info.value==""){
			alert("请输入产品描述");
			return false;
		}
		if(theForm && theForm.price.value==""){
			alert("请输入产品价格");
			return false;
		}
		if(theForm && theForm.minDiscount.value==""){
			alert("请输入最低折扣");
			return false;
		}
		
		//if(theForm)
		// document.UserForm2.submit();
	}
</script>   

  <tr>
    
    <td width="788" height="76" style="border-bottom: 1px solid #CCCCCC"><table width="700" border="0" bordercolor="#A5AdC4">
      <tr>
        <td><table width="780" border="0" cellpadding="0" cellspacing="0" class="content9">
            <tr style="">
              <td width="136" height="19" align="center" valign="middle" >产品名称</td>
              <td width="395" height="19" align="center" valign="middle" >产品描述</td>
              <td width="137" height="19" align="center" valign="middle" >价格</td>
              <td width="112" height="19" align="center" valign="middle" >最低折扣</td>
              </tr>
            <!--注意这里如果要上传图像就要 enctype="multipart/form-data"，但method="get"-->
            <form action="?vid=<%=vid%>&sid=<%=sid%>" method="post" name="UserForm2" id="UserForm2" onSubmit="return userCheck()">
              <tr>
                <td height="19" align="center" valign="middle" ><input name="name" type="text" id="name" size="16"/></td>
                <td height="19" align="center" valign="middle" ><input name="info" type="text" id="info" size="60"/></td>
                <td height="19" align="center" valign="middle" ><input name="price" type="text" id="price" size="12"/></td>
                <td height="19" align="center" valign="middle" ><input name="minDiscount" type="text" id="minDiscount" size="12"/></td>
				<input name="productId" type="hidden" id="productId" size="16" value=""/>
                </tr>
              <tr>
                <td height="30" align="center" valign="middle" ><input type="submit" name="add" value="增加新产品"   />                </td>
                <td height="30" align="left" colspan='3' valign="middle" ><label>
                  <input type="submit" name="modify" style="display:none" value="提交修改"  />
                </label></td>
              </tr>
            </form>
        </table></td>
      </tr>
    </table></td></tr>
</table>
</body>
</html>
