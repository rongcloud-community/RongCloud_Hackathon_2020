<%@page contentType="text/html; charset=gb2312" language="java" import="java.sql.*, java.util.*, java.net.*,msg.*"%>
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<%
/////////////////////session检测////////////////////////////////////////////////
String vid=request.getParameter("vid");
String sid=request.getParameter("sid");
msg.MySession mySession=new msg.MySession(vid);
String sessionId=mySession.getMySession().getSessionId();
if(sessionId==null || vid==null || !sessionId.equals(sid)){
  out.println("<script language=jscript>alert('您的帐号已经在其它地方登陆，只有重新登陆才可使用。');location.assign('index.htm');</script>");			
  return;	
}
///////////////////////////////////////////////////////////////////////////////		
%> 
<%

	 String action=request.getParameter("action");
	 String rightWindow="default.htm";
	 if(action!=null && action.equals("contact"))
	 	rightWindow="contact.jsp";
	 else if(action!=null && action.equals("webStat"))
	 	rightWindow="webStat.jsp";
	 else if(action!=null && action.equals("historyMsg"))
	 	rightWindow="historyMsg.jsp";
	 else if(action!=null && action.equals("leaveMsg"))
	 	rightWindow="leaveMsg.jsp";
	else if(action!=null && action.equals("leaveMsg"))
	 	rightWindow="leaveMsg.jsp";
	else if(action!=null && action.equals("group"))
	 	rightWindow="group.jsp";
	else if(action!=null && action.equals("search")){
		String key="";
		try{key=new String( (request.getParameter("key")).getBytes("iso-8859-1"));}catch(Exception e){}
	 	rightWindow="search.jsp?condition="+java.net.URLEncoder.encode(key,"GBK");
	}
	else
	 	rightWindow=action;
	if(rightWindow!=null && rightWindow.indexOf("?")>=0)
		rightWindow +="&vid="+vid+"&sid="+sid;
	else if(rightWindow!=null && rightWindow.indexOf("?")<0)
		rightWindow +="?vid="+vid+"&sid="+sid;
	/////////判断是否注册voip///////	
	String theFirstDomainId=userManager.getUserDomainId(vid);
	String domainIds=theFirstDomainId;
	if(theFirstDomainId.indexOf(",")>0)
		theFirstDomainId=theFirstDomainId.substring(0,theFirstDomainId.indexOf(","));
	String sql = "";
	ResultSet rs = null; 
	boolean hasVoip=false;	
	try{
		//连接数据库
		if(db.getConnection()==null || db.isClosed())			 
			db.setConnection(); 
		sql="select credit from site where domainId=\""+theFirstDomainId+"\"";	 
		db.setSqlQuery(sql);
		rs = db.getResult();
		if(rs!=null && rs.next()){
			if( rs.getInt("credit")<100 ){
				out.println("<script language=jscript>alert('您的首网站信用点已经只剩下'"+rs.getInt("credit")+"'点，请和客服联系充值');</script>");
			}
		}
		
		if(db.getConnection()==null || db.isClosed())			 
			db.setConnection(); 
		sql="select domainId from voip where domainId=\""+theFirstDomainId+"\"";	 
		db.setSqlQuery(sql);
		rs = db.getResult();
		if(rs!=null && rs.next()){
			hasVoip=true;
		}
		if(db.getConnection()!=null && !db.isClosed())
			db.closeConnection();
	}catch(Exception ee){}   
	////////////////////				
	if(hasVoip==false)
		rightWindow="callBack.jsp"+"?vid="+vid+"&sid="+sid;
	else if(rightWindow==null)
		rightWindow="userEdit1.jsp"+"?vid="+vid+"&sid="+sid;
	 //out.println(rightWindow);//rightWindow=Escape.unescape(action);
%>
<HTML>
<HEAD><TITLE>客户端---系统设置</TITLE>
 
 
</HEAD>
<FRAMESET border="0" rows="80,*" cols="*" frameBorder="NO" frameSpacing="0" >
	<!--<FRAMESET border="0" rows="71" cols="*" frameBorder="NO" frameSpacing="0" >-->
		<!--<FRAME name="topLeftFrame" src="topLeft.html" scrolling="no" noResize>-->
		<FRAME name="topRightFrame"  src="topRight.jsp?vid=<%=vid%>&sid=<%=sid%>" scrolling="no"  noResize>
	<!--</FRAMESET>-->
	<FRAMESET border="0" rows="*" cols="140,*" frameBorder="NO" frameSpacing="0" >
		<FRAME name="LeftFrame"  src="menuZDGL.jsp?vid=<%=vid%>&sid=<%=sid%>" scrolling="no"  noResize>
		<FRAME name="right" src="<%=rightWindow%>" scrolling="yes"  noResize>		 
	</FRAMESET>
</FRAMESET>
<noframes><BODY>对不起，您的浏览器不支持框架！</BODY></noframes>
</HTML>