<%@page contentType="text/html; charset=gb2312" language="java" import="java.sql.*, java.util.*, java.net.*,msg.*"%>
<jsp:useBean id="msgManager" scope="page"  class="msg.MsgManager" />
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<html>

<head>

<link rel="stylesheet" href="css/menu.css"  type="text/css">
<title>�Ի�����</title>
<style>
body
{
	margin:0;
	scrollbar-face-color:#D7E2F3 ;
	scrollbar-arrow-color: #0066FF;
	scrollbar-shadow-color: #666699;
	scrollbar-base-color: #D7E2F3;
	scrollbar-track-color: #D7E2F3;
}
</style>

</head>

<script language="javascript">

	var uploadhtml="";
	
    function checkclick(evt)
    {
	evt = evt ? evt : (window.event ? window.event : null);
        var obj=evt.srcElement;
		if(obj.tagName!=null)
			if(obj.tagName.toLowerCase()=="a")
				if(obj.target=="")
		    		obj.target="_blank";
    }
</script>
<%
	String jspReferer=request.getHeader("Referer");
	if(jspReferer==null || jspReferer.equals("")){ //���ֱ�ӷ��ʱ�ҳ �Ǿ�ʲĪҲ����
		out.println("Are you sure? Baby!");
		return;
	}

	String vid=request.getParameter("vid");	
	String toid=request.getParameter("toid");
	String frmurl=request.getParameter("frmurl"); 
	if(toid!=null && toid.equals("999"))
		toid=userManager.getFreeKefuId(frmurl);
	if(vid==null || vid.equals("") || toid==null || toid.equals("") || frmurl==null || frmurl.equals("")){
		out.println("<script language=jscript>alert('���������ȫ');location.assign('javascript:history.back()');</script>");
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
//toid="3yan4";vid="v10386528";username="����1";
//userstate="ONLINE"; �����ݿ�ֱ�ӻ�ȡ
//username="����1";
 
	String webUrl=msg.Global.getParameter("vdomain");//"webim.uniscom.cn";     //��ƽ̨Ŀ¼	
	msg.User user=new msg.User(toid);
	String username=user.getName();
	String userstate=user.getState();
	String mbenabled=user.getMbenabled();
	String voipenabled=user.getVoipenabled();
	String tag=user.getTag();
	String onlineMsg=user.getOnlineMsg();
	String offlineMsg=user.getOfflineMsg();
	String leftMsg=user.getLeftMsg();
	String mbhide=user.getMbhide();
	String voiphide=user.getVoiphide();
	String type=user.getType();
	String workphone=user.getWorkphone();
	String mobilephone=user.getMobilephone();
	String qq=user.getQq();
	String msn=user.getMsn();
	String email=user.getEmail();
	String address=user.getAddress();
	String companyName=user.getCompanyName();
	if(type==null) type="";if(workphone==null) workphone="";if(mobilephone==null) mobilephone="";
	if(qq==null) qq="";if(msn==null) msn="";if(email==null) email="";if(address==null) address=""; 
	if(companyName==null) companyName=""; 
	
    //֪ͨ������ 
	userManager.changeVisitorLastTime(vid); 	//�������·���ʱ��		  
	//Ȼ��֪ͨվ�������Ա��������	
	//msgManager.sendSayMeLogonMsg(vid,"visitor",frmurl);
	String remoteIP= request.getRemoteAddr();
	String userAgent = request.getHeader("User-Agent"); 
	String language=request.getHeader("Accept-Language");  //��������������
	String userInfoInXml=userManager.getUserInfoInXml(vid,frmurl,"",remoteIP,"",userAgent,language);		 	 
	msgManager.sendSayMeOnPageInitMsg(vid,"visitor",frmurl,userInfoInXml,"ONPAGEINIT");
			
	//�������Ա������Ҫ�Ի�����Ϣ
	userManager.setTalker(vid,username);
	userManager.setVisit(vid,"2");
	userManager.changeVisitorState(vid,"TALKING");
	msgManager.sendMsg(new msg.Message(vid,toid,"","ONTALK"));
	msgManager.sendMsgToStuff(vid,"visitor",frmurl,"TALKING","STATECHANGE"); //��������ͬ��վ�Ŀͷ� �ҽ���Ի�״̬
	
	
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
 	 
%>
<script>
<%=(talkLogo==null || talkLogo.equals(""))?"var talkLogo=null":"talkLogo=\""+talkLogo+"\";"%>
<%=(talkBbsTxt==null || talkBbsTxt.equals(""))?"var talkBbsTxt=\"������̳\"":" talkBbsTxt=\""+talkBbsTxt+"\";"%>
<%=(talkBbsLink==null || talkBbsLink.equals(""))?"var talkBbsLink=\"bbs.100im.cn\"":" talkBbsLink=\""+talkBbsLink+"\";"%>
var toid="<%=toid%>",vid="<%=vid%>",username="<%=username%>",userstate="<%=userstate%>",mbenabled=<%=mbenabled%>,voipenabled=<%=voipenabled%>,advert="<%=advert%>",advertBottom="<%=advertBottom%>",curUrl="<%=frmurl%>";
type="<%=type%>",workphone="<%=workphone%>",mobilephone="<%=mobilephone%>",qq="<%=qq%>",msn="<%=msn%>",emailAdd="<%=email%>",address="<%=address%>",companyName="<%=companyName%>";
xmltalk="<?xml version=\"1.0\" encoding=\"utf-8\"?><style path=\"\"><textlist><text sn=\"0\"><character></character><color>#660000</color><size>12</size><method></method></text><text sn=\"1\"><character>���ڶԻ���</character><color>#666699</color><size>12</size><method></method></text><text sn=\"2\"><character>��ϵͳ��&lt;a href=http://www.uniscom.cn target=_blank&gt;����ʱ��&lt;/a&gt;�����ṩ</character><color>#3399FF</color><size>12</size><method></method></text><text sn=\"3\"><character>����</character><color>red</color><size>14</size><method></method></text></textlist><imagelist><image sn=\"0\"><url>middle1.gif</url><alttext>�����Ͻ�ͼƬ</alttext><method></method></image><image sn=\"1\"><url>middle1.gif</url><alttext>�����������</alttext><method></method></image><image sn=\"2\"><url>middle1.gif</url><alttext>�����Ͻ�ͼƬ</alttext><method></method></image><image sn=\"3\"><url>bg.gif</url><alttext>����߿򱳾�</alttext><method></method></image><image sn=\"4\"><url>bg.gif</url><alttext>���ұ߿򱳾�</alttext><method></method></image><image sn=\"5\"><url>left.gif</url><alttext>������ʾ������ͼƬ</alttext><method></method></image><image sn=\"6\"><url>middle2.gif</url><alttext>������ʾ�򶥲�ͼƬ</alttext><method></method></image><image sn=\"7\"><url>right.gif</url><alttext>������ʾ������ͼƬ</alttext><method></method></image><image sn=\"8\"><url>talk_4.gif</url><alttext>������ʾ����߿򱳾�</alttext><method></method></image><image sn=\"9\"><url>talk_5.gif</url><alttext>������ʾ���ұ߿򱳾�</alttext><method></method></image><image sn=\"10\"><url>talk_6.gif</url><alttext>������ʾ������ͼƬ</alttext><method></method></image><image sn=\"11\"><url>talk_7.gif</url><alttext>������ʾ��ײ�����</alttext><method></method></image><image sn=\"12\"><url>talk_8.gif</url><alttext>������ʾ�����±���</alttext><method></method></image><image sn=\"13\"><url>left.gif</url><alttext>�༭������ͼƬ</alttext><method></method></image><image sn=\"14\"><url>middle.gif</url><alttext>�༭�򶥲�����</alttext><method></method></image><image sn=\"15\"><url>right.gif</url><alttext>�༭����ͼƬ</alttext><method></method></image><image sn=\"16\"><url>edit_4.gif</url><alttext>�༭����߿򱳾�</alttext><method></method></image><image sn=\"17\"><url>edit_5.gif</url><alttext>�༭���ұ߿򱳾�</alttext><method></method></image><image sn=\"18\"><url>edit_6.gif</url><alttext>�༭�����±���</alttext><method></method></image><image sn=\"19\"><url>edit_7.gif</url><alttext>�༭��ײ�����</alttext><method></method></image><image sn=\"20\"><url>edit_8.gif</url><alttext>�༭�����±���</alttext><method></method></image><image sn=\"21\"><url>bg1.gif</url><alttext>�����±���</alttext><method></method></image><image sn=\"22\"><url>bg1.gif</url><alttext>��ײ�����</alttext><method></method></image><image sn=\"23\"><url>bg1.gif</url><alttext>�����±���</alttext><method></method></image><image sn=\"24\"><url>bg.gif</url><alttext>���屳��</alttext><method></method></image><image sn=\"25\"><url>right_1.gif</url><alttext>�ұ߰������ϽǱ���</alttext><method></method></image><image sn=\"26\"><url>right_2.gif</url><alttext>�ұ߰������б���</alttext><method></method></image><image sn=\"27\"><url>right_3.gif</url><alttext>�ұ߰������ϱ���</alttext><method></method></image><image sn=\"28\"><url>right_4.gif</url><alttext>�ұ߰�����߿򱳾�</alttext><method></method></image><image sn=\"29\"><url>right_5.gif</url><alttext>�ұ߰����ұ߿򱳾�</alttext><method></method></image><image sn=\"30\"><url>right_6.gif</url><alttext>�ұ߰������±���</alttext><method></method></image><image sn=\"31\"><url>right_7.gif</url><alttext>�ұ߰������б���</alttext><method></method></image><image sn=\"32\"><url>right_8.gif</url><alttext>�ұ߰������±���</alttext><method></method></image><image sn=\"33\"><url>clarity.gif</url><alttext>һ�����ص�͸��ͼƬ</alttext><method></method></image><image sn=\"34\"><url>send.gif</url><alttext>���Ͱ�ťͼƬ</alttext><method>SendMsg()</method></image><image sn=\"35\"><url>search.bmp</url><alttext>������ťͼƬ</alttext><method>buttonSearch()</method></image><image sn=\"36\"><url>logo.gif</url><alttext>����logoͼƬ</alttext><method>buttonSearch()</method></image></imagelist><widthlist><width sn=\"0\" des=\"������Ͻǿ��\"><value>5</value></width><width sn=\"1\" des=\"������Ͻǿ��\"><value>3</value></width><width sn=\"2\" des=\"�Ұ�����\"><value>124</value></width><width sn=\"3\" des=\"��ʾ�����Ͻǿ��\"><value>13</value></width><width sn=\"4\" des=\"��ʾ�����Ͻǿ��\"><value>16</value></width><width sn=\"5\" des=\"�༭�����Ͻǿ��\"><value>12</value></width><width sn=\"6\" des=\"�༭�����Ͻǿ��\"><value>16</value></width><width sn=\"7\" des=\"�ұ߰������Ͻǿ��\"><value>8</value></width><width sn=\"8\" des=\"�ұ߰������Ͻǿ��\"><value>8</value></width><width sn=\"9\" des=\"�༭���������\"><value>110</value></width></widthlist><heightlist><height sn=\"0\" des=\"������ϽǸ߶�\"><value>39</value></height><height sn=\"1\" des=\"������ʾ��֮��ļ���߶�\"><value>1</value></height><height sn=\"2\" des=\"�Ұ��涥��߶�\"><value>92</value></height><height sn=\"3\" des=\"��ʾ�����ϽǸ߶�\"><value>20</value></height><height sn=\"4\" des=\"��ʾ�����½Ǹ߶�\"><value>21</value></height><height sn=\"5\" des=\"�༭���ܸ߶�\"><value>130</value></height><height sn=\"6\" des=\"�༭�����ϽǸ߶�\"><value>23</value></height><height sn=\"7\" des=\"�༭�����½Ǹ߶�\"><value>20</value></height><height sn=\"8\" des=\"������½Ǹ߶�\"><value>26</value></height><height sn=\"9\" des=\"�ұ߰������ϽǸ߶�\"><value>8</value></height><height sn=\"10\" des=\"�ұ߰������½Ǹ߶�\"><value>8</value></height></heightlist><defaultsetting><setting sn=\"0\" des=\"��ʾ����������\"><color>#330066</color><fontsize>14</fontsize><fontfamily>����</fontfamily></setting><setting sn=\"1\" des=\"�༭����������\"><color>#003366</color><fontsize>14</fontsize><fontfamily>����</fontfamily></setting><setting sn=\"2\" des=\"�Ի�״̬��������\"><color>gray</color><fontsize>12</fontsize><fontfamily>����</fontfamily></setting></defaultsetting></style>",xmlmenu="<?xml version=\"1.0\" encoding=\"utf-8\"?><menu height=\"21\" width=\"25\"><item><name></name><image>font.gif</image><title>����������ɫ</title><action>toolbarAction(10)</action><style>a_effect</style><status>normal</status></item><item><name></name><image>face.gif</image><title>���Է����ͱ���</title><action>toolbarAction(20)</action><style>a_effect</style><status>normal</status></item><item><name></name><image>save.gif</image><title>����Ի�����</title><action>toolbarAction(30)</action><style>a_effect</style><status>normal</status></item><item><name></name><image>print.gif</image><title>��ӡ�Ի�����</title><action>toolbarAction(35)</action><style>a_effect</style><status>normal</status></item><item><name></name><image>email.gif</image><title>���Ի����ݷ��͵�����</title><action>toolbarAction(36)</action><style>a_effect</style><status>normal</status></item><item><name></name><image>sendfile.gif</image><title>�����ļ�</title><action>toolbarAction(50)</action><style>a_effect</style><status>normal</status></item><item><name></name><image>del.gif</image><title>������������</title><action>toolbarAction(40)</action><style>a_effect</style><status>normal</status></item></menu>",flash="",flashurl="",icon="<%=(tag!=null && !tag.equals(""))?"http://client.100im.cn/tag/"+tag:"tag/default.gif"%>",mbhide=<%=mbhide%>,voiphide=<%=voiphide%>,onlinecomment="<%=onlineMsg%>",offlinecomment="<%=offlineMsg%>",leftcomment="<%=leftMsg%>",centerid="555",centerxml="",shortbar=false,centerlogo=""; </script>


<script language="javascript">
 
var jsData=null;
	function loadJS(type){	
		try{	
			var url=document.URL;
			var ni=url.lastIndexOf("/"); 
			url=url.substring(0,ni+1);
 			//url="http://webim.uniscom.cn/";
			url=url+"loadJS.jsp?data="+type; 
			//jsData=new ActiveXObject("Microsoft.XMLHTTP");
try{jsData = new XMLHttpRequest();}catch(e){ jsData = new ActiveXObject("Microsoft.XMLHTTP"); }
			jsData.onreadystatechange=function(){ 

				if(jsData.readyState==4){
					s=document.createElement("script"); 
					s.text =  jsData.responseText;
//alert(s.text);					 
					var head = document.getElementsByTagName('head')[0]; 
					head.appendChild(s);
					 					 
					return true;				 
				}				 
			}
			jsData.open("GET",url,false);
			jsData.send(null);
		}catch(e){window.alert(e.getMessage);}
		return false;
	}
//loadJS("msg");
//loadJS("talk");  
msgscript1=document.createElement("Script");
msgscript1.id="msgscript";msgscript1.language="JavaScript";
var head = document.getElementsByTagName('head')[0]; 
head.appendChild(msgscript1);
//msgscript1.src="http://<%=webUrl%>/loadJS.jsp?data=msg"; 
document.write("<scrip"+"t src='http://<%=webUrl%>/scripts/msg.js'></scrip"+"t>");
talkscript=document.createElement("Script");
talkscript.id="talkscript";talkscript.language="JavaScript";
head = document.getElementsByTagName('head')[0]; 
head.appendChild(talkscript);
//talkscript.src="http://<%=webUrl%>/loadJS.jsp?data=talk"; 
talkscript.src="http://<%=webUrl%>/scripts/talk.js"; 
</script>
<!--
<script src="scripts/msg.js"></script>
<script src="scripts/talk.js"></script>
--> 
<script src="scripts/menu.js"></script>
 
<body  onclick="checkclick(event);">
<bgsound src="" id="soundeffect" loop=1 autostart="false" />

<div id="voipform" style="position:absolute;top:90px;left:50px;width:415px;height:140px;display:none;border:2px groove;margin:0px;padding:0px;background-image:url('img/talk/bg.gif');" ondragstart='setCapture();ydxx=event.x-this.offsetLeft;ydyy=event.y-this.offsetTop;' ondrag='this.style.left=event.x-ydxx;this.style.top=event.y-ydyy' ondragend='releaseCapture();'>
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>
	<td style="padding-left:2px;width:100%;color:#FF0000;font-size:12px;filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#C0C0C0', endColorStr='#FFFFFF', gradientType='0');" valign="middle">
	<img src="img/talk/move.gif" style="" align="top"> ��ѵ绰
	</td>
	<td style="padding-right:5px;filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#C0C0C0', endColorStr='#FFFFFF', gradientType='0');">
	<img src="img/talk/cls.gif" onClick="voipform.style.display='none';" title=" �ر�" style="cursor:hand;">
	</td>
</tr>
<tr>
	<td colspan="2" style="padding:5px;">
	<table width="100%" border="0" style="font-size:12px;background-image:url('img/talk/bg.gif');" height="93">
		<tr>
			<td align="left" height="14">
				�������ĵ绰����,����ǰ�����ţ��ֻ�ǰ��0 ������Ա���̺�����ͨ
			</td>
		</tr>
		<tr>
			<td align="center"> <input id="areacode" type='hidden' size="4" onKeyPress="if(event.keyCode==13){sendvoip();return false;} " style="background-image:url('img/talk/clarity.gif');border:0px sloid;border-bottom:1px solid #FF0000;font-family:Arial;font-weight:bold;color:#990000;" value="0">&nbsp;�绰:<input id="phone" name="phone" value='0' onKeyPress="if(event.keyCode==13){sendvoip();return false;}" style="background-image:url('img/talk/clarity.gif');border:0px sloid;border-bottom:1px solid #FF0000;font-family:Arial;font-weight:bold;color:#990000;">&nbsp;<input id="ext" type="hidden" onKeyPress="if(event.keyCode==13){sendvoip();return false;}" size="4" style="background-image:url('img/talk/clarity.gif');border:0px sloid;border-bottom:1px solid #FF0000;font-family:Arial;font-weight:bold;color:#990000;"></td>
		</tr>
		<tr>
			<td align="center" height="27" width="100%" style="padding-top:10px;">
				<P align="center">
				<input type="image" src="img/talk/ok.gif" onClick="sendvoip();">&nbsp;&nbsp;&nbsp;
				<input type="image" src="img/talk/canal.gif" onClick="voipform.style.display='none';" title="ȡ��">
				</P>
			</td>
		</tr>
	</table>
	</td>
</tr>
</table>
</div>
<div id="emailform" style="position:absolute;top:90px;left:50px;width:415px;height:140px;display:none;border:2px groove;margin:0px;padding:0px;background-image:url('img/talk/bg.gif');" ondragstart='setCapture();ydxx=event.x-this.offsetLeft;ydyy=event.y-this.offsetTop;' ondrag='this.style.left=event.x-ydxx;this.style.top=event.y-ydyy' ondragend='releaseCapture();'>
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>
	<td style="padding-left:2px;width:100%;color:#FF0000;font-size:12px;filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#C0C0C0', endColorStr='#FFFFFF', gradientType='0');" valign="middle">
	<img src="img/talk/move.gif" style="margin-top:0px;" align="top"> ���͵��ʼ�
	</td>
	<td style="padding-right:5px;filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#C0C0C0', endColorStr='#FFFFFF', gradientType='0');">
	<img src="img/talk/cls.gif" onClick="emailform.style.display='none';" title=" �ر�" style="cursor:hand;">
	</td>
</tr>
<tr>
	<td colspan="2" style="padding:5px;">
	<table width="100%" border="0" style="font-size:12px;background-image:url('img/talk/bg.gif');" height="93">
		<tr>
			<td align="left" height="14">
				�����ʼ���ַ(��������,��;��)
			</td>
		</tr>
		<tr>
			<td align="center"><input id="email" style="FONT-SIZE:12px" size="50" onKeyPress="if(event.keyCode==13){sendmail();return false;}"></td>
		</tr>
		<tr>
			<td align="center" height="27" width="100%" style="padding-top:10px;">
				<P align="center">
				<input type="image" src="img/talk/ok.gif" onClick="sendmail();">&nbsp;&nbsp;&nbsp;
				<input type="image" src="img/talk/canal.gif" onClick="emailform.style.display='none';" title="ȡ��">
				</P>
			</td>
		</tr>
	</table>
	</td>
</tr>
</table>
</div>
<div id="uploadform" style="position:absolute;top:90px;left:50px;width:415px;height:140px;display:none;border:2px groove;margin:0px;padding:0px;background-image:url('img/talk/bg.gif');" ondragstart='setCapture();ydxx=event.x-this.offsetLeft;ydyy=event.y-this.offsetTop;' ondrag='this.style.left=event.x-ydxx;this.style.top=event.y-ydyy' ondragend='releaseCapture();'>
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>
	<td style="padding-left:2px;width:100%;color:#FF0000;font-size:12px;filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#C0C0C0', endColorStr='#FFFFFF', gradientType='0');" valign="middle">
	<img src="img/talk/move.gif" style="margin-top:0px;" align="top"> �����ļ�
	</td>
	<td style="padding-right:5px;filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#C0C0C0', endColorStr='#FFFFFF', gradientType='0');">
	<img src="img/talk/cls.gif" onClick="closeUpload();" title=" �ر�" style="cursor:hand;">
	</td>
</tr>

<tr>
	<td colspan="2" style="padding:5px;" id="uploadtd">
	<iframe src="upload.jsp" border="0" name="uploadframe" style="width:100%;height:100%"></iframe>
	</td>
</tr>
</table>
</div>


</body>


</html>
