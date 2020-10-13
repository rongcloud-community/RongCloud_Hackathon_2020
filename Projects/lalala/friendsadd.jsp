<%@ page language="java" import="java.util.*,java.sql.*" pageEncoding="gb2312" session="true"%>
<%@ page import="com.user.GetUserData" %>
<%@ page import="com.user.UserData" %>

<%
  String currentusername = "";
  if((String)session.getAttribute("currentLoginUserDataName")!=null){
    currentusername = (String)session.getAttribute("currentLoginUserDataName");
  }
  
  String username = request.getParameter("username");
  String numberpage = request.getParameter("numberpage");
  if(numberpage == null||numberpage == ""){
    numberpage = "1";
  }
  
  String friendsname = request.getParameter("friendsname");
  String isfound = request.getParameter("isfound");
  //FriendsMessage fmg = null;
  //GetFriends gf = null;
  GetUserData getfrienddata = null;
  UserData userdata = null;
  if(isfound.equals("yes")){
     //gf = new GetFriends();
     //fmg = gf.getSearchFriend(friendsname);
     getfrienddata = new GetUserData();
     userdata = getfrienddata.getCurrentUserData(friendsname);
  }  
%>  

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title><%=username %> 的 blog</title>

	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="css/toolbar.css">		

  </head>
  
  <body>
    <jsp:include flush="true" page="header.jsp">
      <jsp:param name="username" value="<%=username %>" />
      <jsp:param name="numberpage" value="<%=numberpage %>" />
    </jsp:include>
    
    <table height="30px">
     <tr>
      <td></td>
     </tr>
    </table>
    
    <%
      if(isfound.equals("yes")){ 
     %>
     <table align="center" width="560px" class="datagridstyle" id="DataGrid1" cellSpacing=0 cellPadding=3 border=0>
     <tr class="datagridhead">
      <td align="center" colspan="2">好友信息</td>
     </tr>
     <tr>
      <td>用户名:</td>
      <td>
        <a href="pass.jsp?username=<%=userdata.getName() %>" title="到我的 blog 看看" target="_blank"><%=userdata.getName() %></a>
      </td>
     </tr>
     <tr class="datagrid1212">
      <td>性别:</td>
      <td><%=userdata.getSex() %></td>
     </tr>
     <tr>
      <td>头像</td>
      <td>
        <a href="pass.jsp?username=<%=userdata.getName() %>" title="到我的 blog 看看" target="_blank">
         <img src="<%=userdata.getFace() %>" width="30px" height="30px" align="middle" border="0" alt="到我的 blog 看看"/>
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
      <td>个性签名:</td>
      <td><%=userdata.getSignname() %></td>
     </tr>
     <tr>
      <td>注册时间:</td>
      <td><%=userdata.getRegeditTime() %></td>
     </tr>
     <%
     if(!currentusername.equals(friendsname)){
     %>
	<tr class="datagrid1212">
	 <td align="center" colspan="2"><a href="FriendsAdd?username=<%=username %>&friendsname=<%=userdata.getName() %>">加为好友</a></td>
	</tr>
	<%} %>
     </table> 
     
      
    <%}else{ %>
    <p align="center">你查找的 <font color="red"><%=friendsname %></font> 不存在!</p>
    <%} %>
    
    
    <div id="lastfoot">
     <jsp:include flush="false" page="footer.jsp"></jsp:include>
   </div>
  </body>
</html>
