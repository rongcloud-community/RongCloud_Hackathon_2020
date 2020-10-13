<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*" errorPage=""%> 
<%@ page import="com.admin.MessageShow" %>
<%@ page import="com.admin.MessageDetail" %>

<%
  String adminname = (String)session.getAttribute("currentLoginAdminName");
  //int intpage = 1;
  //int intpagecount = 1;
  String numberpage = request.getParameter("numberpage");
  if(numberpage == null||numberpage == ""){
    numberpage = "1";
  }
  
  
  String messageId = request.getParameter("id");
  if(messageId == null){
    messageId = "1";
  }
  int id = Integer.parseInt(messageId);
  MessageShow msgShow = new MessageShow();
  MessageDetail msgDetail = msgShow.getMessageDetailById(id);
  
  
 %>
 
 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>My JSP 'viewmsg.jsp' starting page</title>

	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="css/toolbar.css">
</head>

<body>
    <div id="headImage" style="margin-left:30;">
      <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="900" height="200">
          <param name="movie" value="image/top.swf">
          <param name="quality" value="high">
          <embed src="image/top.swf" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="900" height="200"></embed>
      </object>
    </div>
    
        <table align="center" height="30px">
          <tr>
           <td><b>站内公告</b></td>
          </tr>
</table>
         
         <table align="center" width="960px" class="datagridstyle" id="DataGrid1" cellSpacing=0 cellPadding=3 border=0>
  <tr class="datagridhead">
   <td>主题:<%=msgDetail.getTitle() %></td>
   <td>发表者:<%=msgDetail.getAdmin_name() %></td>
   <td>发表时间:<%=msgDetail.getInsert_time() %></td>
 </tr> 
 <tr>
  <td colspan="3"><%=msgDetail.getContent() %></td>
 </tr>
 
 </table>
         
         
     <div id="lastfoot">
     <jsp:include flush="false" page="footer.jsp"></jsp:include>
   </div>
</body>
</html>
