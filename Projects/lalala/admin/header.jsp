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
 <title>��¼�ɹ�</title>
 <link rel="stylesheet" type="text/css" href="../css/toolbar.css"> 
</head>

<body>
    
    <div id="headImage">
        <img src="../image/adminbgimage.jpg" width="960px" height="130px" alt="���ͺ�̨����ƽ̨">
    </div>
    
    

    <div id="Head">

      <div id="HeadTop">
        <div id="Logo">
		
        </div>   
        <div id="welcome">
       <ul>
         <li>
          <p>��ӭ�� <%=username %> | Ȩ�ޣ�<%=adminpower %>|<a href="logout.jsp">�˳�</a></p>
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
         <a href="../index.jsp" target="_blank" id="CurrentLink">��ҳ</a> 
       </li>
       <%} 
         else{
       %>
        <li>
         <a href="../index.jsp" target="_blank">��ҳ</a> 
       </li>
       <%} 
         if("2".equals(numberpage)){
       %>
       <li>
         <a href="user.jsp?numberpage=2" target="_top"  id="CurrentLink">�û�����</a> 
       </li> 
       <%}
         else{
        %>
        <li>
         <a href="user.jsp?numberpage=2" target="_top">�û�����</a> 
       </li> 
        <%}
         if("3".equals(numberpage)){ %>       
       <li>
         <a href="adminforum.jsp?numberpage=3" target="_top" id="CurrentLink">���͹���</a> 
	   </li>
	   <%}
	     else{ %>
	     <li>
         <a href="adminforum.jsp?numberpage=3" target="_top">���͹���</a> 
	   </li>
	     <%} 
	      if("4".equals(numberpage)){
	     %>
       <li>
         <a href="adminphoto.jsp?numberpage=4" target="_top" id="CurrentLink">������</a> 
	   </li>
	   <%}
	    else{
	    %>
	    <li>
         <a href="adminphoto.jsp?numberpage=4" target="_top">������</a> 
	   </li>
	    <%}
	      if("5".equals(numberpage)){
	     %>
       <li>
         <a href="showmessage.jsp?numberpage=5" target="_top" id="CurrentLink">������Ϣ</a> 
	   </li>
	   <%}
	     else{
	    %>
	    <li>
         <a href="showmessage.jsp?numberpage=5" target="_top">������Ϣ</a> 
	   </li>
	   <%}
	   if("6".equals(numberpage)){
	     %>
       <li>
         <a href="liuyan.jsp?numberpage=6" target="_top" id="CurrentLink">վ������</a> 
	   </li>
	   <%}
	     else{
	    %>
	    <li>
         <a href="liuyan.jsp?numberpage=6" target="_top">վ������</a> 
	   </li>
	   <%} %>
	   <li>
         <a href="../pass.jsp?username=<%=adminname %>" target="_blank">�ҵĲ���</a> 
	   </li>
    </ul>
  </div>
  
  </body>
</html>
