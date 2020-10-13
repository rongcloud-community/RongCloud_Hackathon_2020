<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*" errorPage=""%> 
<%@ page import="com.admin.MessageShow" %>
<%@ page import="com.admin.MessageDetail" %>
<%@ page import="com.admin.AdminPower" %>

<%
  String dealmsg = (String)session.getAttribute("dealmsg");
  if(dealmsg==null){
    dealmsg = "";
  }
  else{
    session.removeAttribute("dealmsg");
  }
 

  
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
  String msg = (String)session.getAttribute("sendMessageOK");
  if(msg==null){
    msg="";
  }
  else{
    session.removeAttribute("sendMessageOK");
  }
  
  
  String strpage = request.getParameter("page");
  int intpage = 1;
  int intpagecount = 1;
  if(strpage == null||strpage == ""){
     strpage = "1";
  }
  intpage = java.lang.Integer.parseInt(strpage);
  
  MessageShow showMsg = new MessageShow();
  
  List messageItems = showMsg.getMessage(intpage);
  Iterator messItems = messageItems.iterator();
  
  intpagecount = showMsg.getPageSize();
  
  
  AdminPower adminP = new AdminPower();
  String adminpo = adminP.getAdminPower(adminname);
  
  
  if(adminname==null||adminpo.equals("普通会员")){
     response.sendRedirect("../index.jsp");
  }
  
  
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>My JSP 'showmessage.jsp' starting page</title>

	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="../css/toolbar.css">

  </head>
  
  <body>
    <jsp:include flush="true" page="header.jsp">
      <jsp:param name="username" value="<%=adminname %>" />
      <jsp:param name="numberpage" value="<%=numberpage %>" />
    </jsp:include>
    
    
    
    
    
    <table height="10px" align="center">
     <tr>
      <td><b><%=dealmsg %></b></td>
     </tr>
    </table>
	<div id="clear"><a href="message.jsp?numberpage=5">发布信息</a></div>
	<div id="clsfloat"></div>
    
    <hr />
    
    <table align="center" width="960px" class="datagridstyle" id="DataGrid1" cellSpacing=0 cellPadding=3 border=0>
  <tr class="datagridhead">
   <td>&nbsp;</td>
   <td>主题</td>
   <td>发布者</td>
   <td>发表时间</td>
   <td>修改</td>
   <td>删除</td>
 </tr> 
 <%
         int lili = 0;
         for(int i=1;messItems.hasNext();i++){
           MessageDetail msgDetail = (MessageDetail)messItems.next();
           if(i%2==0){
        %>
        <tr class="datagrid1212">
          <td>
            <a href="viewmessage.jsp?numberpage=5&id=<%=msgDetail.getId() %>"><%=i %></a>
          </td>
          <td>
            <a href="viewmessage.jsp?numberpage=5&id=<%=msgDetail.getId() %>"><%=msgDetail.getTitle() %></a>
          </td>
          <td>
            <a href="usermodify.jsp?username=<%=msgDetail.getAdmin_name() %>&numberpage=2"><%=msgDetail.getAdmin_name() %></a>            
          </td>
          <td>
            <%=msgDetail.getInsert_time() %>
          </td>
          <%
           if(adminname.equals(msgDetail.getAdmin_name())||adminpo.equals("超级管理员")){
           %>
          <td>
            <a href="modifymessage.jsp?numberpage=5&id=<%=msgDetail.getId() %>">修改</a>
          </td>
          <td>
            <a href="DeleteMessage?id=<%=msgDetail.getId() %>" onClick="return confirm('是否删除该信息?');">删除</a>
          </td>
          <%}
           else{
           %>
          <td>修改</td>
          <td>删除</td>
          <%} %>
        </tr>
        <%}else{ %>
        <tr>
          <td>
            <a href="viewmessage.jsp?numberpage=5&id=<%=msgDetail.getId() %>"><%=i %></a>
          </td>
          <td>
            <a href="viewmessage.jsp?numberpage=5&id=<%=msgDetail.getId() %>"><%=msgDetail.getTitle() %></a>
          </td>
          <td>
            <a href="usermodify.jsp?username=<%=msgDetail.getAdmin_name() %>&numberpage=2"><%=msgDetail.getAdmin_name() %></a>
          </td>
          <td>
            <%=msgDetail.getInsert_time() %>
          </td>
          <%
           if(adminname.equals(msgDetail.getAdmin_name())||adminpo.equals("超级管理员")){
           %>
          <td>
            <a href="modifymessage.jsp?numberpage=5&id=<%=msgDetail.getId() %>">修改</a>
          </td>
          <td>
            <a href="DeleteMessage?id=<%=msgDetail.getId() %>" onClick="return confirm('是否删除该信息?');">删除</a>
          </td>
          <%}
           else{
           %>
          <td>修改</td>
          <td>删除</td>
          <%} %>
        </tr>
        <%} 
        }%>
</table>
    
    
    
    
    <br>
<br>
第<%=intpage%>页&nbsp;&nbsp;共<%=intpagecount%>页&nbsp;&nbsp;
 <%if(intpage>1)
 {%>
     <a href="showmessage.jsp?page=<%=intpage-1%>&numberpage=5">上一页</a>
<%}%>&nbsp;&nbsp;
<%if(intpage<intpagecount)
  {%>
     <a href="showmessage.jsp?page=<%=intpage+1%>&numberpage=5">下一页</a>
 <%}%>
 
    <div id="lastfoot">
     <jsp:include flush="false" page="footer.jsp"></jsp:include>
    </div>
  </body>
</html>
