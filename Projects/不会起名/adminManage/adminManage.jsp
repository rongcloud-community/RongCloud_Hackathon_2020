<%
	/**
	 *���ļ���admin���õ�������
	 *
	 *@author: �ش��� ��������ʱ�����缼�����޹�˾
	 *@time: Apil 26,2007
	 *@last modified:  Apil 26,2007
	*/
%>
<%@page contentType="text/html; charset=gb2312" language="java" import="java.sql.*, java.util.*, java.net.*,msg.*"%>
<%
/////////////////////session���////////////////////////////////////////////////
String vid=request.getParameter("vid");
String sid=request.getParameter("sid");
msg.MySession mySession=new msg.MySession(vid);
String sessionId=mySession.getMySession().getSessionId();
if(sessionId==null || vid==null || !sessionId.equals(sid)){
	out.println("<script language=jscript>alert('��û�е�½��Ự�Ѿ����ڣ������µ�½��');location.assign('index.htm');</script>");			
		return;	
}
///////////////////////////////////////////////////////////////////////////////		
%>
<HTML>
<HEAD><TITLE>�̿ͼ�ʱͨ�ͻ���</TITLE>
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
<noframes><BODY>�Բ��������������֧�ֿ�ܣ�</BODY></noframes>
</HTML>