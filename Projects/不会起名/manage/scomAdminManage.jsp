<%@page contentType="text/html; charset=gb2312" language="java" import="java.sql.*, java.util.*, java.net.*"%>
<HTML>
<HEAD><TITLE>时空网站前台系统</TITLE>
 
 
</HEAD>
<FRAMESET border="0" rows="70,*" cols="*" frameBorder="NO" frameSpacing="0" >
	<FRAMESET border="0" rows="*" cols="185,*" frameBorder="NO" frameSpacing="0" >
		<FRAME name="topLeftFrame" src="topLeft.html" scrolling="no" noResize>
		<FRAME name="topRightFrame"  src="topRight.htm" scrolling="no"  noResize>
	</FRAMESET>
	<FRAMESET border="0" rows="*" cols="150,*" frameBorder="NO" frameSpacing="0" >
		<FRAME name="LeftFrame"  src="scomAdminMenu.htm" scrolling="yes"  noResize>
		<FRAME name="right" src="userManager.jsp" scrolling="yes"  noResize>		 
	</FRAMESET>
</FRAMESET>
<noframes><BODY>对不起，您的浏览器不支持框架！</BODY></noframes>
</HTML>