<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*, java.util.*, java.net.*,msg.*"%>
<jsp:useBean id="msgManager" scope="page"  class="msg.MsgManager" />
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" /> 
<%
 
	///////////////////////���Session����ȡֵ/////////////////////////////
	 //String username=(String)session.getValue("scomClient");
	 //String password=(String)session.getValue("scomPwd");		  
	 //if(username==null || username.equals("") ||password==null || password.equals("") ) {			
	//	out.println("alert('��û�е�½��Ự�Ѿ����ڣ������µ�½��');</script>");			
	//	return;						
	// }
	 /////////////////////////////////////////////////////////////////////// 

String vid=request.getParameter("vid");//"3yan1";
String curURL=request.getParameter("curURL");

userManager.changeUserLastTime(vid); //�������·���ʱ��					
//���·����ߵ�ǰ״̬Ϊ����
userManager.changeUserState(vid,"ONLINE"); // 	 
String hostInfoInXml=userManager.getHostInfoInXml(vid);	 
//hostInfoInXml=URLEncoder.encode(hostInfoInXml,"gb2312");
hostInfoInXml=msg.Escape.escape(hostInfoInXml);
msgManager.sendSayMeOnPageInitMsg(vid,"stuff",curURL,hostInfoInXml,"STATECHANGE");
msgManager.sendSayMeLogonMsg(vid,"stuff",curURL);
msgManager.tellGroupsImOnlineMsg(vid);//֪ͨȺ������
msgManager.tellFriendsImOnlineMsg(vid);//֪ͨ����������

String[] ids=userManager.findMyTalkers(vid);
 
for(int i=0;ids!=null && i<ids.length;i++)
	msgManager.sendMsg(new msg.Message(ids[i],vid,"","ONTALK"));
msgManager.sendContactMsgToMe(vid);

%>
<%=userManager.getSiteUserInXml0(curURL,vid)%>