<%@page contentType="text/html; charset=gb2312" language="java" import="java.sql.*, java.util.*, java.net.*,msg.*"%>
<jsp:useBean id="msgManager" scope="page"  class="msg.MsgManager" />
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<html>
<HEAD><TITLE>留言</TITLE>
<META http-equiv=Content-Type content="text/html; charset=gb2312">
<STYLE type=text/css>BODY {
	MARGIN: 0px
}
</STYLE>
<LINK href="img/talk//style_index.css" type=text/css rel=stylesheet>
<META content="MSHTML 6.00.2900.3157" name=GENERATOR></HEAD>
<BODY>
<%
	String jspReferer=request.getHeader("Referer");
	if(jspReferer==null || jspReferer.equals("")){ //如果直接访问本页 那就什莫也不做
		//out.println("Are you sure? Baby!");
		//return;
	}

	String vid=request.getParameter("vid");	
	String toid=request.getParameter("toid");
	String frmurl=request.getParameter("frmurl"); 
	if(toid!=null && toid.equals("999"))
		toid=userManager.getFreeKefuId(frmurl);
	if(vid==null || vid.equals("") || toid==null || toid.equals("") || frmurl==null || frmurl.equals("")){
		out.println("<script language=jscript>alert('所需参数不全');location.assign('javascript:history.back()');</script>");
		return;
	}
	
/**
	//String username=request.getParameter("username");
	String username="";
	try{
		username=new String( (request.getParameter("username")).getBytes("iso-8859-1"),"gb2312");
	}catch(Exception e){}
	String userstate=userManager.getUserState(toid);//request.getParameter("userstate");
	String mbenabled=request.getParameter("mbenabled");
	mbenabled="true";
	String voipenabled="false";
**/
	String lancode=request.getParameter("lancode");
	if(lancode!=null && lancode.indexOf("jp")>=0)
		response.sendRedirect("webTalkWindow_jp.jsp?lancode="); 
	if(lancode!=null && lancode.indexOf("en")>=0)
		response.sendRedirect("webTalkWindow_en.jsp?lancode=en"); 
	if(lancode!=null && lancode.indexOf("bg")>=0)
		response.sendRedirect("webTalkWindow_bg.jsp"); 
	//toid="wxy";
	//vid="v62058";
//toid="3yan4";vid="v10386528";username="技术1";
//userstate="ONLINE"; 从数据库直接获取
//username="技术1";
 
	String webUrl="webim.100im.cn";//"webim.uniscom.cn";     //本平台目录	
	msg.User user=new msg.User(toid);
	String username=user.getName();
	 
	//String userstate=user.getState();
	//String mbenabled=user.getMbenabled();
	//String voipenabled=user.getVoipenabled();
	//String tag=user.getTag();
	String sex=user.getSex();
	//String onlineMsg=user.getOnlineMsg();
	//String offlineMsg=user.getOfflineMsg();
	//String leftMsg=user.getLeftMsg();
	//String mbhide=user.getMbhide();
	//String voiphide=user.getVoiphide();
	//String type=user.getType();
	//String workphone=user.getWorkphone();
	//String mobilephone=user.getMobilephone();
	//String qq=user.getQq();
	//String msn=user.getMsn();
	//String email=user.getEmail();
	//String address=user.getAddress();
	String companyName=user.getCompanyName();
	//if(type==null) type="";if(workphone==null) workphone="";if(mobilephone==null) mobilephone="";
	//if(qq==null) qq="";if(msn==null) msn="";if(email==null) email="";if(address==null) address=""; 
 
	if(companyName==null) companyName=""; 
	String advert=null;//userManager.getTalkAdvert(frmurl);	
	String advertBottom=null;//userManager.getTalkAdvertBottom(frmurl);
	String talkLogo=null;
	String talkBbsTxt=null;
	String talkBbsLink=null;
	Site site=userManager.getSite1(frmurl);
	if(site!=null){
		advert=site.getTalkAdvertRightDown();
		advertBottom=site.getTalkAdvertBottom();
		talkLogo=site.getTalkLogo();
		talkBbsTxt=site.getTalkBbsTxt();
		talkBbsLink=site.getTalkBbsLink();
	}	
	if(advert==null || advert.equals(""))
		advert="http://"+webUrl+"/advert.htm";
	else
		advert ="http://"+advert;
	if(advertBottom==null || advertBottom.equals(""))
		advertBottom="http://"+webUrl+"/advertBottom.htm";
	else
		advertBottom ="http://"+advertBottom;
	
	talkLogo=(talkLogo==null || talkLogo.equals(""))?"webim.100im.cn/img/talk/logo.gif":talkLogo;
    talkBbsTxt=(talkBbsTxt==null || talkBbsTxt.equals(""))?"进入论坛":talkBbsTxt;
    talkBbsLink=(talkBbsLink==null || talkBbsLink.equals(""))?"bbs.100im.cn":talkBbsLink;
%>	
<TABLE class=conn9 height=233 cellSpacing=0 cellPadding=0 width=492 border=0>
  <TBODY>
  <TR>
    <TD  colspan="3" width="100%" height=39 background="img/talk/middle1.gif">
	 
	<table width=100%><tr><td width="36"><img src='http://<%=talkLogo%>'></td><td width='325' align='center'><font style='color:#3399FF;font-size:12px;'><%=companyName%></font></td>
	<td width='115' align='right'><a href='http://<%=talkBbsLink%>' target='_blank' style='text-decoration:none;'><font size='2'><%=talkBbsTxt%></font></a></td></tr></table>
	 
	</TD>
     
  </TR>
  <TR>
    <TD height=181 colspan="3" background=img/talk//select_3.jpg>
      <TABLE class=conn9 height=36 cellSpacing=0 cellPadding=0 width=490 
      border=0>
        <TBODY>
        <TR>
          <TD class=conn9c align=middle colSpan=7 height=65><%=username%> 
            当前不在线，您可以选择以下三种<SPAN class=conn9red>免费</SPAN>方式和<%=(sex!=null && sex.equals("男"))?"他":"她"%>联系 </TD></TR>
        <TR>
          <TD width=94>&nbsp;</TD>
          <TD width=52><IMG height=68 src="img/talk/duihua2_6.jpg" width=52 onClick="window.location.href='leaveMsg.jsp?vid=<%=vid%>&toid=<%=toid%>&frmurl=<%=frmurl%>';" style="cursor:hand"></TD>
          <TD width=68>&nbsp;</TD>
          <TD width=49><a href="webTalkWindow.jsp?vid=<%=vid%>&toid=<%=toid%>&frmurl=<%=frmurl%>"><IMG height=68 src="img/talk/duihua2_8.jpg" width=49 border="0"  style="cursor:hand"></a></TD>
          <TD width=73>&nbsp;</TD>
          <TD width=48><a href="call.jsp?vid=<%=vid%>&toid=<%=toid%>&frmurl=<%=frmurl%>"><IMG height=68 src="img/talk/duihua2_10.jpg" width=48 border="0" style="cursor:hand"></a></TD>
          <TD width=106>&nbsp;</TD></TR></TBODY></TABLE></TD></TR>
  <TR>
    <TD height=50 colspan="3"><IMG height=194 src="img/talk/n_16.gif" 
  width=492></TD></TR></TBODY></TABLE>
</BODY></HTML>
