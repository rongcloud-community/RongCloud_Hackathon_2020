<%
	/**
	 *本文件被admin调用的主窗口
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 26,2007
	 *@last modified:  Apil 26,2007
	*/
%>
<%@page contentType="text/html; charset=gb2312" language="java" import="java.sql.*, java.util.*, java.net.*,msg.*"%>
<%
/////////////////////session检测////////////////////////////////////////////////
String vid=request.getParameter("vid");
String sid=request.getParameter("sid");
msg.MySession mySession=new msg.MySession(vid);
String sessionId=mySession.getMySession().getSessionId();
if(sessionId==null || vid==null || !sessionId.equals(sid)){
	out.println("<script language=jscript>alert('你没有登陆或会话已经过期，请重新登陆。');location.assign('index.htm');</script>");			
		return;	
}
///////////////////////////////////////////////////////////////////////////////		
%>
<HTML>
<HEAD><TITLE>商客即时通客户端</TITLE>
 <script type="text/javascript">
 top.window.resizeTo(screen.availWidth,screen.availHeight);
</script>	
 
</HEAD>
<FRAMESET border="0" rows="80,*" cols="*" frameBorder="NO" frameSpacing="0" >
	<FRAMESET border="0" rows="*" cols="0,*" frameBorder="NO" frameSpacing="0" >
		<FRAME name="topLeftFrame" src="topLeft.html" scrolling="no" noResize>
		<FRAME name="topRightFrame"  src="topRight.htm" scrolling="no"  noResize>
	</FRAMESET>
	<FRAMESET border="0" rows="*" cols="172,*" frameBorder="NO" frameSpacing="0" >
		<FRAME name="LeftFrame"  src="menu.jsp?vid=<%=vid%>&sid=<%=sid%>" scrolling="no"  noResize>
		<FRAME name="right" src="UntitledFrame-1" scrolling="yes"  noResize>		 
	</FRAMESET>
</FRAMESET>
<noframes><BODY>对不起，您的浏览器不支持框架！</BODY></noframes>
</HTML>