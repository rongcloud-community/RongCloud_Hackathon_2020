<%@ page language="java" import="java.util.*,com.center.vo.UserVO ;" pageEncoding="gbk"%>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>My JSP 'userinfo.jsp' starting page</title>

</head>

  <body leftmargin="0"  topmargin="0" bgcolor="#CFDAD3">
  <%!  UserVO uservo = null ;%>
<%
	if(session != null){
	
	uservo = (UserVO)session.getAttribute("username");
	}

 %>
  <%if(uservo != null && uservo.getUserlevle() == 1){ %><font color="#ff0000" size="2"><strong>
  &#31649;&#29702;&#21592;</strong></font>
  <%} else{%><font size="2"><strong><font color="#ff8080">
  &#26222;&#36890;&#39038;&#23458;</font></strong></font>
  <%}if(uservo != null){ %>
  <font size="2"><font color="#5e7ce8"> 
    &#27426;&#36814;&#20809;&#20020;</font>:<font color="#ff80c0"><%=uservo.getUsername() %></font><font color="#5e7ce8">    &#36825;&#26159;&#20320;&#31532;</font><font color="#ff80c0"><%=uservo.getUserlogincount() %></font><font color="#5e7ce8">&#27425;&#35775;&#38382;&#26412;&#21830;&#22478;      &#24744;&#19978;&#27425;&#35775;&#38382;&#26102;&#38388;&#26159;</font>:<font color="#ff80c0"><%=uservo.getLastlogintime() %></font><font color="#5e7ce8" style="background-color: rgb(231, 237, 239);">   <a href="/shoppingcenter/shopping.do?method=shopcat" target="_blank" onfocus="true" >您的购物车</a></font></font>
  <%}else{ %>游客您好,建议您注册哦:)<%} %>

  </body>
</html>
