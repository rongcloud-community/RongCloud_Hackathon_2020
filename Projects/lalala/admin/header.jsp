<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*" errorPage=""%>


<%
  //String path = request.getContextPath();
  //String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
  
  //UserData userdata = (UserData)session.getAttribute("currentLoginUserData");
  //String username=new String((request.getParameter("username")).getBytes("ISO-8859-1"),"gb2312");
  
  
  String username = request.getParameter("username");
  String numberpage = request.getParameter("numberpage");
  if(numberpage==null||numberpage==""){
    numberpage="1";
  }
  //String username = (String)session.getAttribute("username");
  
  
  String adminpower = (String)session.getAttribute("adminpower");
  String adminname = (String)session.getAttribute("currentLoginAdminName");
  
  
%>
<html>
<head>

 <meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
 <title>登录成功</title>
 <link rel="stylesheet" type="text/css" href="../css/toolbar.css"> 
</head>

<body>
    
    <div id="headImage">
        <img src="../image/adminbgimage.jpg" width="960px" height="130px" alt="博客后台管理平台">
    </div>
    
    

    <div id="Head">

      <div id="HeadTop">
        <div id="Logo">
		
        </div>   
        <div id="welcome">
       <ul>
         <li>
          <p>欢迎你 <%=username %> | 权限：<%=adminpower %>|<a href="logout.jsp">退出</a></p>
         </li>
       </ul>
     </div>     
     </div>
   </div>

   

   <div id="ChannelMenu">
     <ul>
       <%
        if("1".equals(numberpage)){
       %>
       <li>
         <a href="../index.jsp" target="_blank" id="CurrentLink">首页</a> 
       </li>
       <%} 
         else{
       %>
        <li>
         <a href="../index.jsp" target="_blank">首页</a> 
       </li>
       <%} 
         if("2".equals(numberpage)){
       %>
       <li>
         <a href="user.jsp?numberpage=2" target="_top"  id="CurrentLink">用户管理</a> 
       </li> 
       <%}
         else{
        %>
        <li>
         <a href="user.jsp?numberpage=2" target="_top">用户管理</a> 
       </li> 
        <%}
         if("3".equals(numberpage)){ %>       
       <li>
         <a href="adminforum.jsp?numberpage=3" target="_top" id="CurrentLink">博客管理</a> 
	   </li>
	   <%}
	     else{ %>
	     <li>
         <a href="adminforum.jsp?numberpage=3" target="_top">博客管理</a> 
	   </li>
	     <%} 
	      if("4".equals(numberpage)){
	     %>
       <li>
         <a href="adminphoto.jsp?numberpage=4" target="_top" id="CurrentLink">相册管理</a> 
	   </li>
	   <%}
	    else{
	    %>
	    <li>
         <a href="adminphoto.jsp?numberpage=4" target="_top">相册管理</a> 
	   </li>
	    <%}
	      if("5".equals(numberpage)){
	     %>
       <li>
         <a href="showmessage.jsp?numberpage=5" target="_top" id="CurrentLink">发布信息</a> 
	   </li>
	   <%}
	     else{
	    %>
	    <li>
         <a href="showmessage.jsp?numberpage=5" target="_top">发布信息</a> 
	   </li>
	   <%}
	   if("6".equals(numberpage)){
	     %>
       <li>
         <a href="liuyan.jsp?numberpage=6" target="_top" id="CurrentLink">站内留言</a> 
	   </li>
	   <%}
	     else{
	    %>
	    <li>
         <a href="liuyan.jsp?numberpage=6" target="_top">站内留言</a> 
	   </li>
	   <%} %>
	   <li>
         <a href="../pass.jsp?username=<%=adminname %>" target="_blank">我的博客</a> 
	   </li>
    </ul>
  </div>
  
  </body>
</html>
