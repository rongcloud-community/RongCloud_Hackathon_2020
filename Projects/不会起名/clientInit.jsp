<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*, java.util.*, java.net.*,msg.*"%>
<jsp:useBean id="msgManager" scope="page"  class="msg.MsgManager" />
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" /> 
<%
 
	///////////////////////检测Session并获取值/////////////////////////////
	 //String username=(String)session.getValue("scomClient");
	 //String password=(String)session.getValue("scomPwd");		  
	 //if(username==null || username.equals("") ||password==null || password.equals("") ) {			
	//	out.println("alert('你没有登陆或会话已经过期，请重新登陆。');</script>");			
	//	return;						
	// }
	 /////////////////////////////////////////////////////////////////////// 

String vid=request.getParameter("vid");//"3yan1";
String curURL=request.getParameter("curURL");

userManager.changeUserLastTime(vid); //更新最新访问时间					
//更新访问者当前状态为在线
userManager.changeUserState(vid,"ONLINE"); // 	 
String hostInfoInXml=userManager.getHostInfoInXml(vid);	 
//hostInfoInXml=URLEncoder.encode(hostInfoInXml,"gb2312");
hostInfoInXml=msg.Escape.escape(hostInfoInXml);
msgManager.sendSayMeOnPageInitMsg(vid,"stuff",curURL,hostInfoInXml,"STATECHANGE");
msgManager.sendSayMeLogonMsg(vid,"stuff",curURL);
msgManager.tellGroupsImOnlineMsg(vid);//通知群我上线
msgManager.tellFriendsImOnlineMsg(vid);//通知好友我上线

String[] ids=userManager.findMyTalkers(vid);
 
for(int i=0;ids!=null && i<ids.length;i++)
	msgManager.sendMsg(new msg.Message(ids[i],vid,"","ONTALK"));
msgManager.sendContactMsgToMe(vid);

%>
<%=userManager.getSiteUserInXml0(curURL,vid)%>