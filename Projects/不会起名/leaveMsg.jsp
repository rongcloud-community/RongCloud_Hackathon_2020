<%@page contentType="text/html; charset=gb2312" language="java" import="java.sql.*, java.util.*, java.net.*,msg.*"%>
<jsp:useBean id="msgManager" scope="page"  class="msg.MsgManager" />
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
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
 
	String webUrl=msg.Global.getParameter('vdomain');//"webim.uniscom.cn";     //本平台目录	
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
	if(talkLogo==null || talkLogo.equals(""))
		talkLogo=webUrl+"/img/talk/logo.gif";
	if(talkBbsTxt==null || talkBbsTxt.equals(""))
    	talkBbsTxt="进入论坛";
	if(talkBbsLink==null || talkBbsLink.equals(""))
    	talkBbsLink="bbs.100im.cn";
%>	
<html>
<HEAD><TITLE>留言</TITLE>
<META http-equiv=Content-Type content="text/html; charset=gb2312">
<STYLE type=text/css>BODY {
	MARGIN: 0px
}
</STYLE>
<LINK href="img/talk//style_index.css" type=text/css rel=stylesheet>
<META content="MSHTML 6.00.2900.3157" name=GENERATOR>
<script language="javascript">	
var oldContent="";
function checkInput(item)
{	 
	if(document.getElementById(item).value==null || document.getElementById(item).value=="")	 
		return false;
	return true;
}
function sendMsg()
{ 
	if( !checkInput("tel") && !checkInput("qq_msn") && !checkInput("email") )
	{
		alert("请留下至少一种联系方式：电话号码或QQ MSN或EMAIL地址");
		return;
	}
	if( !checkInput("content")  )
	{
		alert("请输入留言内容");
		return;
	}
	
	var chenghu=document.getElementById("chenghu").value;
	var tel=document.getElementById("tel").value;
	var qq_msn=document.getElementById("qq_msn").value;
	var email=document.getElementById("email").value;
	var content=document.getElementById("content").value;
	if(chenghu==null) chenghu="";
	if(tel==null) tel="";
	if(qq_msn==null) qq_msn="";
	if(email==null) email="";
	if(content==null) content="";
	if( oldContent==content )
	{
		alert("相同的内容不必重发");
		return;
	}
	var msg="称呼-"+chenghu+" 电话-"+tel+" qq_msn-"+qq_msn+" Email-"+email+" 内容-"+content;
	oldContent=content;
	try{	
		document.getElementById("status").innerHTML="<font color=red size=2>消息发送中...</font>";	
		var url="http://<%=webUrl%>/msgManager.jsp";
		url +="?a=2&frm=lmg&vid=<%=vid%>&toid=<%=toid%>&msg="+escape(msg);
		//alert(url);
 		var obj;
		try{obj = new ActiveXObject("Microsoft.XMLHTTP"); }catch(e){ obj = new XMLHttpRequest();}
		if(obj)
		{			 
				obj.onreadystatechange=function()
				{
					//alert(obj.readyState);
					if(obj.readyState==4)
					{
						//alert(obj.status);
						if (obj.status==200 )
						{
							var sResult=obj.responseText;													 
							if(sResult!=null && sResult!="")
								try{
									 
								}catch(e){alert(e.message);}
							document.getElementById("status").innerHTML="发送成功";
						}
						else //失败
						{
						
						}														
						obj=null;
					}
				}
				obj.open("GET",url,true); //同步请求
				obj.send();
 	    }
		else
		{
			//该浏览器无法发送
			alert("该浏览器无法建立控件");
		}
	}catch(e){ 
		//网页访问失败
		alert("网页访问失败");
	}  
	document.getElementById("status").innerHTML="";
}
</script>

</HEAD>
<BODY>

<TABLE height=249 cellSpacing=1 cellPadding=0 width=492 border=0>
  <TBODY>
  <TR>
    <TD height=39 background="img/talk/middle1.gif">
	<table width=100%><tr><td width="36"><img src='http://<%=talkLogo%>'></td><td width='325' align='center'><font style='color:#3399FF;font-size:12px;'><%=companyName%></font></td>
	<td width='115' align='right'><a href='http://<%=talkBbsLink%>' target='_blank' style='text-decoration:none;'><font size='2'><%=talkBbsTxt%></font></a></td></tr></table>
	</TD></TR>
  <TR>
    <TD height=5></TD></TR>
  <TR>
    <TD>
      <TABLE height=367 cellSpacing=0 cellPadding=0 width=480 align=center 
      border=0>
        <TBODY>
        <TR>
          <TD vAlign=top align=left width=320 height=369>
             
            <TABLE height=371 cellSpacing=0 cellPadding=0 width=320 
            bgColor=#c2e5f9 border=0>
              <TBODY>               
                <TD class=conn9c background="img/talk/middle1.gif"  colSpan=2 
                height=39 >&nbsp;&nbsp;留言 &nbsp;<a href="webTalkWindow.jsp?vid=<%=vid%>&toid=<%=toid%>&frmurl=<%=frmurl%>" style="text-decoration:none"> 短信</a> &nbsp;<a href="call.jsp?vid=<%=vid%>&toid=<%=toid%>&frmurl=<%=frmurl%>" style="text-decoration:none">电话</a></TD>
              </TR>
              <TR>
                <TD class=conn9c vAlign=center align=middle width=88 
                  height=30>您的称呼：</TD>
                <TD width=232><LABEL><INPUT id="chenghu"> </LABEL></TD></TR>
              <TR>
                <TD class=conn9c vAlign=center align=middle height=30>您的电话：</TD>
                <TD height=30><LABEL><INPUT id="tel"> </LABEL></TD></TR>
              <TR>
                <TD class=conn9c vAlign=center align=middle 
                height=30>QQ或MSN：</TD>
                <TD height=30><LABEL><INPUT id="qq_msn"> </LABEL></TD></TR>
              <TR>
                <TD class=conn9c vAlign=center align=middle height=30>您的邮箱：</TD>
                <TD height=30><LABEL><INPUT id="email"> </LABEL></TD></TR>
              <TR class=conn9c>
                <TD colSpan=2 height=30>&nbsp;&nbsp;您的留言：</TD></TR>
              <TR>
                <TD align=middle colSpan=2><LABEL><TEXTAREA id="content" rows=8 cols=40></TEXTAREA> 
                  </LABEL></TD></TR>
              <TR>
			  	<td id="status"></td>
                <TD vAlign=center align=right  height=50><IMG 
                  height=40 src="img/talk/send.gif" 
                width=73 onClick="sendMsg();">&nbsp;&nbsp;&nbsp;</TD>
              </TR></TABLE> </TD>
          <TD width=5></TD>
          <TD vAlign=top align=left width=155>
            <TABLE cellSpacing=0 cellPadding=0 width=155 bgColor=#c2e5f9 
            border=0>
              <TBODY>
              <TR>
                <TD background="img/talk/middle1.gif" 
height=39>&nbsp;</TD></TR>
              <TR>
                <TD 
    height=341>&nbsp;</TD></TR></TBODY></TABLE></TD></TR></TABLE></TD></TR></TBODY></TABLE></BODY></HTML>
