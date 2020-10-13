<%@ page language="java" import="java.util.*,java.sql.*" pageEncoding="gb2312" session="true"%>

<%@ page import="com.friends.GetFriends" %>
<%@ page import="com.friends.FriendsMessage" %>

<%
  String addfriendsmsg = (String)session.getAttribute("addfriendsmsg");
  if(addfriendsmsg == null){
    addfriendsmsg = "";
  }
  else{
    session.removeAttribute("addfriendsmsg");
  }


  String currentusername = "";
  if((String)session.getAttribute("currentLoginUserDataName")!=null){
    currentusername = (String)session.getAttribute("currentLoginUserDataName");
  }
  
  String username = request.getParameter("username");
  String numberpage = request.getParameter("numberpage");
  if(numberpage == null||numberpage == ""){
    numberpage = "1";
  }
  
  GetFriends gf = new GetFriends();
  List gfItems = gf.getFriendsName(username);
  Iterator gfmsg = gfItems.iterator();
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
	<link rel="stylesheet" href="css/screen.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="css/lightbox.css" type="text/css" media="screen" />	

  </head>
  
  <script language="JavaScript">
function isRight(f){
  if(f.friendsname.value == "")
  {
     alert("查找的用户名不能为空!");
	 return false;
   }
   else if(f.friendsname.value.length>20)
   {
     alert("查找的用户名必须小于20!");
	 return false;
   }
  else
  { 
     return true;
   }
  
}

function resetText(fname){
  fname.value="";
}

</script>
  
  <body>
    <jsp:include flush="true" page="header.jsp">
      <jsp:param name="username" value="<%=username %>" />
      <jsp:param name="numberpage" value="<%=numberpage %>" />
    </jsp:include>
    
    
  <%
  if(currentusername.equals(username)&&!("".equals(currentusername))){
   %>
  <div id="searchf">
    <form action="FriendsSearch?username=<%=currentusername %>" method="post" onSubmit="return isRight(this);">
       查找好友
        <input type="text" name="friendsname" value="在这输入用户名" onFocus="resetText(this)"/>
       <input type="submit" value="确认"/>
    </form>
  </div>
  <%} %>
  
  <table height="45px" align="center">
     <tr>
      <td><b><%=addfriendsmsg %></b></td>
     </tr>
    </table>
    
    
    <p>你当前的好友:</p>
       <table align="center" width="960px" class="datagridstyle" id="DataGrid1" cellSpacing=0 cellPadding=3 border=0>
     <tr class="datagridhead">
      <td>ID</td>
      <td>姓名</td>
      <td>头像</td>
      <%
         if(currentusername.equals(username)&&!("".equals(currentusername))){
         %>
		 <td>删除</td>
		 <%} %>
     </tr>
        <%
         for(int i=0;gfmsg.hasNext();i++){
           FriendsMessage gfm = (FriendsMessage)gfmsg.next();
           if(i%2==0){
        %>
        <tr class="datagrid1212">
         <td>
          <a href="pass.jsp?username=<%=gfm.getFriend_name() %>" target="_blank" title="到我的 blog 看看">
		   <%=(i+1) %>
		  </a>
         </td>
         <td>
          <a href="pass.jsp?username=<%=gfm.getFriend_name() %>" target="_blank" title="到我的 blog 看看">
		   <%=gfm.getFriend_name() %>
		  </a>
         </td>
        <td>
		 <a href="pass.jsp?username=<%=gfm.getFriend_name() %>" target="_blank" title="到我的 blog 看看">
		   <img src="<%=gfm.getPhoto() %>" width="30" height="30" alt="<%=gfm.getFriend_name() %>" />
		 </a>
		 </td>
		 <%
         if(currentusername.equals(username)&&!("".equals(currentusername))){
         %>
		 <td>
		   <a href="FriendsDelete?username=<%=currentusername %>&friendsname=<%=gfm.getFriend_name() %>" onClick="return confirm('是否将好友 <%=gfm.getFriend_name() %> 删除');">删除</a>
		 </td>
		 <%} %>
		 </tr>
		 <%}else{ %>
		 <tr>
         <td>
          <a href="pass.jsp?username=<%=gfm.getFriend_name() %>" target="_blank" title="到我的 blog 看看">
		   <%=(i+1) %>
		  </a>
         </td>
         <td>
          <a href="pass.jsp?username=<%=gfm.getFriend_name() %>" target="_blank" title="到我的 blog 看看">
		   <%=gfm.getFriend_name() %>
		  </a>
         </td>
        <td>
		 <a href="pass.jsp?username=<%=gfm.getFriend_name() %>" target="_blank" title="到我的 blog 看看">
		   <img src="<%=gfm.getPhoto() %>" width="30" height="30" alt="<%=gfm.getFriend_name() %>" />
		 </a>
		 </td>
		 <%
         if(currentusername.equals(username)&&!("".equals(currentusername))){
         %>
		 <td>
		   <a href="FriendsDelete?username=<%=currentusername %>&friendsname=<%=gfm.getFriend_name() %>" onClick="return confirm('是否将好友 <%=gfm.getFriend_name() %> 删除');">删除</a>
		 </td>
		 <%} %>
		 </tr>
       <%} 
       }%>
		</table>
    
    <div id="lastfoot">
     <jsp:include flush="false" page="footer.jsp"></jsp:include>
   </div>
  </body>
</html>
