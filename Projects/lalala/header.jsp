<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*" errorPage=""%>


<%
  //String path = request.getContextPath();
  //String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
  
  //UserData userdata = (UserData)session.getAttribute("currentLoginUserData");
  //String username=new String((request.getParameter("username")).getBytes("ISO-8859-1"),"gb2312");
  String currentusername = "";
  if((String)session.getAttribute("currentLoginUserDataName")!=null){
    currentusername = (String)session.getAttribute("currentLoginUserDataName");
  }
  
  String username = request.getParameter("username");
  String numberpage = request.getParameter("numberpage");
  if(numberpage==null||numberpage==""){
    numberpage="1";
  }
  //String username = (String)session.getAttribute("username");

%>
<html>
<head>

 <meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
 <title>��¼�ɹ�</title> 
 <link rel="stylesheet" type="text/css" href="css/toolbar.css">
 
</head>

<body>
    
    <div id="headImage">
      <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="960" height="200">
          <param name="movie" value="image/top1.swf">
          <param name="quality" value="high">
          <embed src="image/top1.swf" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="960" height="200"></embed>
      </object>
    </div>
    
    

    <div id="Head">

      <div id="HeadTop">
        <div id="Logo">
         
        </div>   
        <div id="welcome">
        <%
         if(currentusername.equals(username)){
         %>
       <ul>
         <li>
          <p>��ӭ�� <%=username %> <a href="logout.jsp">�˳�</a></p>
         </li>
       </ul>
       <%}else{ %>
       <ul>
         <li>
          <p>��ӭ����<%=username %>�ռ�</p>
         </li>
       </ul>
       <%} %>
     </div>     
     </div>
   </div>

   

   <div id="ChannelMenu">
     <ul>
	   <li>
         <a href="index.jsp" target="_blank">��ҳ</a> 
       </li>
       
       <% 
         if("2".equals(numberpage)){
       %>
       <li>
         <a href="forumindex.jsp?username=<%=username %>&numberpage=2" target="_top"  id="CurrentLink">����</a> 
       </li> 
       <%}
         else{
        %>
        <li>
         <a href="forumindex.jsp?username=<%=username %>&numberpage=2" target="_top">����</a> 
       </li> 
        <%}
         if("3".equals(numberpage)){ %>       
       <li>
         <a href="photo.jsp?username=<%=username %>&numberpage=3" target="_top" id="CurrentLink">���</a> 
	   </li>
	   <%}
	     else{ %>
	     <li>
         <a href="photo.jsp?username=<%=username %>&numberpage=3" target="_top">���</a> 
	   </li>
	     <%} 
	      if("4".equals(numberpage)){
	     %>
       <li>
         <a href="friends.jsp?username=<%=username %>&numberpage=4" target="_top" id="CurrentLink">����</a> 
	   </li>
	   <%}
	    else{
	    %>
	    <li>
         <a href="friends.jsp?username=<%=username %>&numberpage=4" target="_top">����</a> 
	   </li>
	    <%}
	      if("5".equals(numberpage)){
	     %>
       <li>
         <a href="modify_userdata.jsp?username=<%=username %>&numberpage=5" target="_top" id="CurrentLink">������Ϣ</a> 
	   </li>
	   <%}
	     else{
	    %>
	    <li>
         <a href="modify_userdata.jsp?username=<%=username %>&numberpage=5" target="_top">������Ϣ</a> 
	   </li>
	   <%} %>
    </ul>
  </div>
  
</body>
</html>
