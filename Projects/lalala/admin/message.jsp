<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*" errorPage=""%> 
<%@ page import="com.admin.AdminPower" %>
<%
  //String currentLoginUserDataName = (String)session.getAttribute("currentLoginUserDataName");
  //String username=new String((request.getParameter("username")).getBytes("ISO-8859-1"),"gb2312");
  //String eusername = new String(username.getBytes("gb2312"),"ISO8859_1");
  String adminname = (String)session.getAttribute("currentLoginAdminName");
  //int intpage = 1;
  //int intpagecount = 1;
  String numberpage = request.getParameter("numberpage");
  if(numberpage == null||numberpage == ""){
    numberpage = "1";
  }
  
  
  AdminPower adminP = new AdminPower();
  String adminpo = adminP.getAdminPower(adminname);
  
  if(adminname==null||adminpo.equals("普通会员")){
     response.sendRedirect("../index.jsp");
  }
  
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>My JSP blog manage page</title>

	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="../css/toolbar.css">

  </head>
  
  
<script language="javascript">
function sendMessage(f)
{
  f.content.value = document.frames.cnEditBox.getHTML(true);
  if(f.title.value == "")
  {
     alert("主题不能为空!");
	 return false;
   }
   else if(f.title.value.length>16)
   {
      alert("主题不能太长!");
	  return false;
   }
   else if(f.content.value == "<DIV></DIV>")
   {
      alert("内容不能为空!");
	  return false;
   }
   else if(f.content.value.length>50000){
     
     alert("发布内容不能太长");
     return false;
   }
  else
  { 
     return true;
   }
} 

</script> 
  
  <body>
    <jsp:include flush="true" page="header.jsp">
      <jsp:param name="username" value="<%=adminname %>" />
      <jsp:param name="numberpage" value="<%=numberpage %>" />
    </jsp:include>
    
    <table>
     <tr height="20px">
      <td></td> 
     </tr>
    </table>
    
    <form action="SendMessage"  onSubmit="return sendMessage(this);" method="post" name="sendMessageForm">
     <input type="hidden" name="content"/>
     <table width="960px">
      <tr>
       <td>主题:<input type="text" name="title" maxlength="50"/></td>
      </tr>
      <tr>
       <td>
        <iframe style="border: none" name="cnEditBox" src="../editbox/editbox.htm" width="100%" height="400"> </iframe>
       </td>
      </tr>
      <tr>
      <td>
        <input type="submit" value="提交">&nbsp;&nbsp;&nbsp;
	    <input type="button" value="返回" onClick="history.go(-1);"/>
      </td>
     </tr>
    </table>
    </form>
    
    
    <div id="lastfoot">
     <jsp:include flush="false" page="footer.jsp"></jsp:include>
    </div>
  </body>
</html>