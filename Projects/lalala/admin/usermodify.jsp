<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*" errorPage="" %>
<%@ page import="com.user.GetUserData" %>
<%@ page import="com.user.UserData" %>
<%@ page import="com.admin.AdminPower" %>

<%
   String modifyUserPowermsg = (String)session.getAttribute("modifyUserPowermsg");
   if(modifyUserPowermsg==null){
     modifyUserPowermsg = "";
   }
   else{
     session.removeAttribute("modifyUserPowermsg");
   }

   String username = request.getParameter("username");
   String adminname = (String)session.getAttribute("currentLoginAdminName");
   String numberpage = request.getParameter("numberpage");
   if(numberpage == null||numberpage == ""){
     numberpage = "1";
   }
   
   GetUserData getuserdata = new GetUserData();
   UserData userdata = getuserdata.getCurrentUserData(username);
   
   
   AdminPower adminP = new AdminPower();
  String adminpo = adminP.getAdminPower(adminname);
  
  
  if(adminname==null||adminpo.equals("普通会员")){
     response.sendRedirect("../index.jsp");
  }
 %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>My JSP 'usermodify.jsp' starting page</title>

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
    
    <table height="30px" align="center">
     <tr>
      <td><b><%=modifyUserPowermsg %></b></td>
     </tr>
    </table>
  
    <table align="center" width="560px" id="DataGrid1" cellSpacing=0 cellPadding=3 border=0>
     <tr class="datagridhead">
      <td align="center" colspan="2">用户信息</td>
     </tr>
     <tr>
      <td>用户名:</td>
      <td>
        <a href="../pass.jsp?username=<%=userdata.getName() %>" title="到我的 blog 看看" target="_blank"><%=userdata.getName() %></a>
      </td>
     </tr>
     <tr class="datagrid1212">
      <td>性别:</td>
      <td><%=userdata.getSex() %></td>
     </tr>
     <tr>
      <td>头像</td>
      <td>
        <a href="../pass.jsp?username=<%=userdata.getName() %>" title="到我的 blog 看看" target="_blank">
         <img src="../<%=userdata.getFace() %>" width="30px" height="30px" align="middle" border="0" alt="到我的 blog 看看"/>
        </a>
      </td>
     </tr>
     <tr class="datagrid1212">
      <td>QQ:</td>
      <td>
        <a href="tencent://message/?uin=<%=userdata.getQq() %>&Site=网站在线QQ联系&Menu=yes" target="_blank"><%=userdata.getQq() %></a>
	  </td>
     </tr>
     <tr>
      <td>Email:</td>
      <td><a href="mailto:<%=userdata.getEmail()%>"><%=userdata.getEmail()%></a></td>
     </tr>
     <tr class="datagrid1212">
      <td>个人主页:</td>
      <td><a href="http://<%=userdata.getWww()%>" target="_blank"><%=userdata.getWww()%></a></td>
     </tr>
     <tr>
      <td>发表文章:</td>
      <td><%=userdata.getSendArticle() %> 篇</td>
     </tr>
     <tr class="datagrid1212">
      <td>注册时间:</td>
      <td><%=userdata.getRegeditTime() %></td>
     </tr>
     <tr>
      <td>权限:</td>
      <td>
       <%
        if(userdata.getPower().equals("1111")){
       %>
       超级管理员
       <%}
         else if(userdata.getPower().equals("111")){
        %>
        普通管理员
      <%
       }else{
       %>
       普通会员
       <%
        }
        %>
      </td>
     </tr>
     <tr  class="datagrid1212">
       <td colspan="2" align="center">
     <%
       if((userdata.getPower().equals("1111"))&&adminpo.equals("超级管理员")){
      %>
        <a href="DeleteManager?username=<%=userdata.getName() %>" onClick="return confirm('取消该用户超级管理员资格');">取消超级管理员资格</a> | 
        <a href="SetManager?username=<%=userdata.getName() %>" onClick="return confirm('将该用户设为普通管理员');">设为普通管理员</a>
      <%}
      else if((userdata.getPower().equals("111"))&&(adminpo.equals("超级管理员"))){ %>
        <a href="DeleteManager?username=<%=userdata.getName() %>" onClick="return confirm('取消该用户普通管理员资格');">取消普通管理员资格</a> | 
        <a href="SetSuperManager?username=<%=userdata.getName() %>" onClick="return confirm('将该用户设为超级管理员');">设为超级管理员</a>
      <%}
      else if(adminpo.equals("超级管理员")){
       %>
        <a href="SetManager?username=<%=userdata.getName() %>" onClick="return confirm('将该用户设为普通管理员');">设为普通管理员</a> | 
        <a href="SetSuperManager?username=<%=userdata.getName() %>" onClick="return confirm('将该用户设为超级管理员');">设为超级管理员</a>
       <%
        }
        else if((userdata.getPower().equals("111"))&&adminpo.equals("普通管理员")){
        %> 
        <a href="DeleteManager?username=<%=userdata.getName() %>" onClick="return confirm('取消该用户普通管理员资格');">取消普通管理员资格</a>
        <%}
         else if(adminpo.equals("普通管理员")){
         %>
         <a href="SetManager?username=<%=userdata.getName() %>" onClick="return confirm('将该用户设为普通管理员');">设为普通管理员</a>
         <%} %>
       </td>
      </tr>
    </table> 
    
  
  
    <div id="lastfoot">
     <jsp:include flush="false" page="footer.jsp"></jsp:include>
    </div>
  </body>
</html>
