<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@page contentType="text/html; charset=gb2312" language="java" import="java.sql.*, java.util.*, java.net.*,msg.*"%>
<jsp:useBean id="msgManager" scope="page"  class="msg.MsgManager" />
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" /> 
 
<%
 /**
	///////////////////////检测Session并获取值/////////////////////////////
	 String username=(String)session.getValue("scomClient");
	 String password=(String)session.getValue("scomPwd");		  
	 if(username==null || username.equals("") ||password==null || password.equals("") ) {			
		out.println("<script language=jscript>alert('你没有登陆或会话已经过期，请重新登陆。');location.assign('index.htm');</script>");			
		return;						
	 }
	 ///////////////////////////////////////////////////////////////////////
**/ 

String vid=request.getParameter("vid");//"3yan1";
String sid=request.getParameter("sid");//session id
String sessionId=(new MySession(vid)).getMySession().getSessionId();
if(sessionId==null || sessionId.equals("") || vid==null || vid.equals("") || !sessionId.equals(sid)){
	out.println("<script language=jscript>alert('该帐号已经在别的地方登陆，要使用需要重新登陆。');location.assign('index.htm');</script>");			
		return;	
}
///////////////////////////////////////////////////////////////////////

 
String curURL=userManager.getUserDomain(vid); 
//userManager.putLostVisitorToOffline(curURL,vid);
userManager.markUnreadCommandMessageAsRead(vid);
//if(userManager.getUserState(vid).equals("OFFLINE")){ 
/**
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
**/	
//out.println(curURL+" "+hostInfoInXml);
//}
//out.println(curURL);
//out.println(curURL+userManager.getSiteUserInXml0(curURL));
msg.Message[] leftMessages=msgManager.readLeftMsg(vid);

String thisdomain="";
String multiDomain="False";
StringTokenizer st = new StringTokenizer(curURL,","); 
if(st.countTokens()>1)
	multiDomain="True";

while(st.hasMoreTokens()) 
	thisdomain +=st.nextToken()+";"; 
String firstDomain=null;
String domainId=userManager.getUserDomainId(vid);
if(domainId.indexOf(",")>0)
	domainId=domainId.substring(0,domainId.indexOf(","));
firstDomain=userManager.getDomainByDomainId(domainId);
String myip=request.getRemoteAddr();
String thisname=userManager.getName(vid),siteName="";
int payLevel=-1;
String clntLogo=null;
String clntWaterImg=null;
Site site=userManager.getSite2(firstDomain);
if(site!=null){
	//thisname=site.getAdminName();
	siteName=site.getName();
	payLevel=site.getPayLevel();
	clntLogo=site.getClntLogo();
	clntWaterImg=site.getClntWaterImg();
}

//String thisname= userManager.getName(vid);
//String siteName=userManager.getSiteName(vid);	

 
%>

<head>
	<title>网站监控端</title>
<!--
		<meta name="content-type" content="text/html; charset=utf-8">
		<meta http-equiv='Content-Type' content='text/html; charset=gb2312'>
-->
		<link rel="stylesheet" href="css/manage.css" type="text/css">
		<link rel="stylesheet" href="css/toolbar.css" type="text/css">
		<link rel="stylesheet" href="css/talktoolbar.css" type="text/css">
<!--		
<script language="javascript">
	function loadJS(){	
		try{	
			var url=document.URL;
			var ni=url.lastIndexOf("/"); 
			url=url.substring(0,ni+1);				 
			url=url+"loadJS.jsp?data=manage"; 
			jsData=new ActiveXObject("Microsoft.XMLHTTP");
			jsData.onreadystatechange=function(){ 
				if(jsData.readyState==4){
					s=document.createElement("script"); 
					s.text =  jsData.responseText;
//alert(s.text);					 
					var head = document.getElementsByTagName('head')[0]; 
					head.appendChild(s);
					 					 
					return;				 
				}
			}
			jsData.open("GET",url,false); //同步请求
			jsData.send(null);
		}catch(e){window.alert(e.getMessage);}
	}
//loadJS();
</script>
-->		 
 		<SCRIPT LANGUAGE="Javascript" src="scripts/tree.js"></SCRIPT> 		
		<!--<script language="javascript" src="http://webim.100im.cn/loadJS.jsp?data=msg"></script>-->	
<script language="javascript" src="scripts/msg.js"></script>
<script language="javascript" src="scripts/manage.js"></script>
 
		<script language="JavaScript" src="scripts/toolbar.js"></script>
		<script language="JavaScript" src="scripts/talktoolbar.js"></script>
		<script language="JavaScript" src="scripts/shortcut.js"></script>
		<script language="JavaScript" src="scripts/prompt.js"></script>			 
		<script language="javascript">		 
			var thisdomain="<%=thisdomain%>",thisid="<%=vid%>",thisstate="ONLINE",thisname="<%=thisname%>";
			var curURL="<%=curURL%>";
			var myip="<%=myip%>";
			var multiDomain="<%=multiDomain%>";
			//var urlsobj=null;
			var urlarray=new Array('<%=siteName%>');
			var disablecount=false;
			var sid="<%=sid%>";

			if(self.location != top.location)
			{
				top.location = "";
			}
						
			function GetServerPath()
			{
				var url=document.URL;
				var ni=url.lastIndexOf("/"); 

				return url.substring(0,ni+1);									
			}
			
			var currentserver=GetServerPath();
			
			function SwitchURL(selectid)
			{
				//window.detachEvent("onunload",SayMeLogoff);
				//window.detachEvent("onbeforeunload",ConfirmOut);
				//document.URL="login.aspx?index="+selectid;
			}
			
			function doSearch(key)
			{ 
				window.open("manage/clientManage.jsp?action=search&key="+key+"&vid="+thisid+"&sid="+sid,"sw");
			}
			
			function buttonSearch()
			{
				var key=document.selection.createRange().text;
				if(key=="")
					key=msg.innerText;
				doSearch(key);
			}		
		
			function checksize()
			{
				try
				{
					self.moveTo(0,0);
					self.resizeTo(screen.availWidth-6,screen.availHeight-27);
 

					//
					innermsg.style.left=(document.body.clientWidth-210)+"px";
					innermsg.style.top=(document.body.clientHeight-140)+"px";
				}
				catch(e)
				{}
			}
			
		    function checkclick()
		    {
		        var obj=window.event.srcElement;
				if(obj.tagName!=null)
				{
				    if(obj.tagName.toLowerCase()=="a")
				    {
					    if(obj.target==""&&obj.href.indexOf("#")==-1)
					    	obj.target="_blank";
					}
				}
		    }
		    
		    function setshortcut()
		    {
				if(shortcutdata.readyState=="complete")
				{
					if(shortcutdata.documentElement!=null)
					{
						window.clearInterval(shortcuttimer);
						CreateBoard(shortcutdata.documentElement,shortcutcontrol.documentElement,"ShortCutDefine",175,shortcutboard);
					}
				}
		    }

		
		    function reloadShortCut()
		    {	
try{
				//url=GetServerPath()+"manage/functions.aspx?xmlcontent=%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22unicode%22%3F%3E%3CQuery%20actionid%3D%223000%22%20mode%3D%2220%22%20resultmode%3D%220%22/%3E";
				url=GetServerPath()+"getShortcut.jsp?url="+curURL;
//window.alert(url);
				shortcutdata=new ActiveXObject("Microsoft.XMLHTTP");
				shortcutdata.onreadystatechange=function()
				{

					if(shortcutdata.readyState==4)
					{
						var shortcutdoc=new ActiveXObject("Microsoft.XMLDOM");
//window.alert(shortcutdata.responseText);
						shortcutdoc.loadXML(shortcutdata.responseText);

						CreateBoard(shortcutdoc,shortcutcontrol.documentElement,"ShortCutDefine",175,shortcutboard);
						
						var nRoot=shortcutdoc.selectSingleNode("ShortCutDefine");
						if(nRoot==null)
							return;
						var nNew=nRoot.getAttribute("unread");
						if(nNew==null||nNew==""||nNew=="0")
							return;
						unreaddiv.innerText=nNew;
						voipform.style.display='inline';						
					}
				}
				shortcutdata.open("GET",url,true);
				shortcutdata.send(null);
}catch(e){window.alert(e.getMessage);}
			}
			

		function Setcookie (name, value) {  
				var argc = SetCookie.arguments.length;
				var argv = SetCookie.arguments;    
				var path = (argc > 3) ? argv[3] : null;  
				var domain = (argc > 4) ? argv[4] : null;  
				var secure = (argc > 5) ? argv[5] : false;  
		        
		        
				document.cookie = name + "=" + value +
				((path == null) ? "" : ("; path=" + path)) +  
				((domain == null) ? "" : ("; domain=" + domain)) +    
				((secure == true) ? "; secure" : "");
		}

		function Deletecookie (name) { 
			var exp = new Date();  
			exp.setTime (exp.getTime() - 1);  
			var cval = GetCookie (name);  
			document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
		}

		
		function getCookieVal (offset) {
			var endstr = document.cookie.indexOf (";", offset);  
			if (endstr == -1)
				endstr = document.cookie.length;  
				return unescape(document.cookie.substring(offset, endstr));
		}

		function GetCookie (name) { 
				var arg = name + "=";  
				var alen = arg.length;  
				var clen = document.cookie.length;  
				var i = 0;  
				while (i < clen) {    
				var j = i + alen;    
				if (document.cookie.substring(i, j) == arg)      
						return getCookieVal (j);    
						i = document.cookie.indexOf(" ", i) + 1;    
						if (i == 0) break;   
				}  
			

	return null;
		}	


	 window.document.title="<%=vid%>";//激发webbrowser事件来更改托盘文字显示
		</script>
	<xml id="xsldata" src="xml/tree.xsl"></xml>
	<xml id="vsxsldata" src="xml/mixed.xsl"></xml>
	<xml id="shortcutcontrol" src="xml/shortcutcontrol.xml"></xml>
<!--<xml id="xmldata" ><%=userManager.getSiteUserInXml0(curURL,vid)%>-->
<%	
/**
//msg.Log.log(userManager.getSiteUserInXml0(curURL,vid));
	String[] ids=userManager.findMyTalkers(vid);
 
	for(int i=0;ids!=null && i<ids.length;i++)
		msgManager.sendMsg(new msg.Message(ids[i],vid,"","ONTALK"));
	msgManager.sendContactMsgToMe(vid);
**/	
%>
	<style>
	a:link
	{
		color: #000000;
		font-size: 12px;
		text-decoration: none;
		}
	a:visited
	{
		color: #000000;
		font-size: 12px;
		text-decoration: none;
		}
	a:hover
	{
		color: #0000FF;
		font-size: 12px;
		text-decoration: underline;
		}
	a:actived
	{
		color: #000000;
		font-size: 12px;
		text-decoration: none;
		}
	</style>
</head>

<body  onLoad="SystemInitial();" oncontextmenu="return false;"  onclick="checkclick();" scroll=no>
 
 
	<!-- XX层开始  -->
 	<div id="innermsg" style="border-right:#455690 1px solid;border-top:#a6b4cf 1px solid;z-index:99999;border-left:#a6b4cf 1px solid;border-bottom: #455690 1px solid;background-color:#DBE2F7;position:absolute;height:120px;width:210px;display:none"></div>
	<!-- XX层结束  -->
	<!-- 短信提示层开始  -->
	<div id="voipform" style="z-Index:100;position:absolute;top:200px;left:250px;width:415px;height:140px;<%=(leftMessages!=null&& leftMessages.length>0)?"":"display:none;"%>border:2px groove;margin:0px;padding:0px;background-image:url('img/talk/bg.gif');" ondragstart='setCapture();ydxx=event.x-this.offsetLeft;ydyy=event.y-this.offsetTop;' ondrag='this.style.left=event.x-ydxx;this.style.top=event.y-ydyy' ondragend='releaseCapture();'>
	<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<tr>
		<td style="width:95%;color:#FF0000;font-size:12px;filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#C0C0C0', endColorStr='#FFFFFF', gradientType='0');" valign="middle">
		<img src="img/talk/move.gif" style="margin-top:2px;"> 系统提示
		</td>
		<td style="filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#C0C0C0', endColorStr='#FFFFFF', gradientType='0');">
		<img src="img/talk/cls.gif" onClick="voipform.style.display='none';" title=" 关闭" style="cursor:hand;">
		</td>
	</tr>
	<tr>
		<td colspan="2" style="padding:5px;">
		<table width="100%" border="0" style="font-size:12px;background-image:url('img/talk/bg.gif');" height="93">
			<tr>
				<td align="left">
					您有&nbsp;<font color=red><span id="unreaddiv"></span></font><%=(leftMessages!=null&& leftMessages.length>0)?String.valueOf(leftMessages.length):""%>条未读信息<BR>点击&nbsp;<font color=green>确认</font>&nbsp;查看信息,点击&nbsp;<font color=green>取消</font>&nbsp;关闭提示窗口
				</td>
			</tr>
			<tr>
				<td align="center" width="100%" style="padding-top:10px;">
					<P align="center">
					<input type="image" src="img/talk/ok.gif" onClick="voipform.style.display='none';manwin=window.open('manage/clientManage.jsp?action=leaveMsg&vid=<%=vid%>&sid=<%=sid%>','ydmanage');manwin.focus();">&nbsp;&nbsp;&nbsp;
					<input type="image" src="img/talk/canal.gif" onClick="voipform.style.display='none';" title="取消">
					</P>
				</td>
			</tr>
		</table>
		</td>
	</tr>
	</table>
	</div>
	<!-- 短信提示层结束  -->
	<!-- 发送文件层开始  -->
	<div id="uploadform" style="z-Index:100;position:absolute;top:200px;left:250px;width:415px;height:140px;display:none;border:2px groove;margin:0px;padding:0px;background-image:url('img/talk/bg.gif');" ondragstart='setCapture();ydxx=event.x-this.offsetLeft;ydyy=event.y-this.offsetTop;' ondrag='this.style.left=event.x-ydxx;this.style.top=event.y-ydyy' ondragend='releaseCapture();'>
	<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<tr>
		<td style="width:95%;color:#FF0000;font-size:12px;filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#C0C0C0', endColorStr='#FFFFFF', gradientType='0');" valign="middle">
		<img src="img/talk/move.gif" style="margin-top:2px;"> 发送文件
		</td>
		<td style="filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#C0C0C0', endColorStr='#FFFFFF', gradientType='0');">
		<img src="img/talk/cls.gif" onClick="closeUpload();" title="关闭" style="cursor:hand;margin-top:2px;">
		</td>
	</tr>
	<tr>
		<td colspan="2" style="padding:5px;" id="uploadtd">
		<iframe src="" border="0" name="uploadframe" style="width:100%;height:100%"></iframe>
		</td>
	</tr>
	</table>
	</div>
	<!-- 发送文件层结束  -->
	<!-- 标注浏览者层开始  -->
	<div id="setnoteform" style="z-Index:100;position:absolute;top:200px;left:250px;width:415px;height:200px;display:none;border:2px groove;margin:0px;padding:0px;filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#FFFFFF', endColorStr='#C0C0C0', gradientType='0');"  ondragstart='setCapture();ydxx=event.x-this.offsetLeft;ydyy=event.y-this.offsetTop;' ondrag='this.style.left=event.x-ydxx;this.style.top=event.y-ydyy' ondragend='releaseCapture();'>
		<table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size:12px;">
			<tr>
				<td style="width:95%;color:#FF0000;filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#C0C0C0', endColorStr='#FFFFFF', gradientType='0');" valign="middle">
				<img src="img/talk/move.gif" style="margin-top:2px;"> 用户标注
				</td>
				<td align="right" style="filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#C0C0C0', endColorStr='#FFFFFF', gradientType='0');">
				<img src="img/talk/cls.gif" onClick="setnoteform.style.display='none';" title="关闭" style="cursor:hand;margin-top:2px;">
				</td>
			</tr>
			<tr>
					<td id="labeltd" colspan="2">
						<table align="left" cellspacing="0" cellpadding="1" border="0" width="100%" style="FONT-SIZE:12px;COLOR:#000066">
							<form name="ydv_from">
								<TBODY>
									<tr>
										<td align="right" width="65"><nobr>姓名：</nobr></td>
										<td width="129">
											<input type="hidden" id="ydv_vid" size="9"> <input type="text" id="ydv_name" style="WIDTH:105px">
										</td>
										<td align="right" width="59">性别：</td>
										<td>
											<select id="ydv_sex" style="WIDTH:50px">
												<option value="1" selected>男</option>
												<option value="0">女</option>
											</select>
										</td>
									</tr>
									<tr>
										<td align="right" width="65">电话：</td>
										<td width="129"><input type="text" id="ydv_tel" style="WIDTH:105px"></td>
										<td align="right" width="59">手机：</td>
										<td><input type="text" id="ydv_mbl" style="WIDTH:105px"></td>
									</tr>
									<tr>
										<td align="right" width="65"><nobr>小灵通：</nobr></td>
										<td width="129"><input type="text" id="ydv_smalltel" style="WIDTH:105px"></td>
										<td align="right" width="59">邮件：</td>
										<td><input type="text" id="ydv_email" style="WIDTH:105px"></td>
									</tr>
									<tr>
										<td align="right" width="65">QQ：</td>
										<td width="129"><input type="text" id="ydv_qq" style="WIDTH:105px"></td>
										<td align="right" width="59">MSN：</td>
										<td><input type="text" id="ydv_msn" style="WIDTH:105px"></td>
									</tr>
									<tr>
										<td align="right" width="65">地址：</td>
										<td width="129"><input type="text" id="ydv_add" style="WIDTH:105px"></td>
										<td align="right" width="59">类别：</td>
										<td><select id="ydv_type"></select></td>
									</tr>
									<tr>
										<td colspan="4" align="center">
											<button onClick="UpdateLabel()" style="BORDER-RIGHT:#000000 1px solid;BORDER-TOP:#000000 1px solid;FILTER:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#DAF0FD', endColorStr='#7FB7E1', gradientType='0');BORDER-LEFT:#000000 1px solid;WIDTH:60px;COLOR:#000000;BORDER-BOTTOM:#000000 1px solid;HEIGHT:18px;BACKGROUND-COLOR:#ffffff;TEXT-ALIGN:center"
												type="button">修改标注</button>&nbsp;&nbsp;<button onClick="DelLabel()" style="BORDER-RIGHT:#000000 1px solid;BORDER-TOP:#000000 1px solid;FILTER:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#DAF0FD', endColorStr='#7FB7E1', gradientType='0');BORDER-LEFT:#000000 1px solid;WIDTH:60px;COLOR:#000000;BORDER-BOTTOM:#000000 1px solid;HEIGHT:18px;BACKGROUND-COLOR:#ffffff;TEXT-ALIGN:center"
												type="button">删除标注</button>
										</td>
									</tr>
							</form>
						</table>
					</td>
			</tr>
		</table>		
	</div>
	<!-- 标注浏览者层结束  -->
	<bgsound src="" id="soundeffect" loop=1 autostart="false" />
	<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td height="79">
				<!-- 网站信息、客户端状态和菜单行开始 -->
				<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" background="img/manage/t_4.gif">
					<tr>
						<td width="148" align="left"  id="logo1">
							<img  border=0 src='<%=(clntLogo!=null && !clntLogo.equals(""))?"http://"+clntLogo:"img/manage/t_2.gif"%>' width="141" height="78">							</td>
						<td valign="bottom"  id="tailpiece1" width="188">
							<table border="0" style="font-size:12px" width="188">
						  <tr><td width="180" nowrap="true" class="a_effect" style="cursor:hand;white-space:nowrap;color:#08789D;">版本: <%=(payLevel<=0)?"标准版":""%><%=(payLevel==1)?"增强版":""%><%=(payLevel==2)?"商务版":""%></td></tr></table>
						  <table border="0" style="font-size:12px" width="188">
						  <tr><td width="180" nowrap="true" class="a_effect" style="cursor:hand;padding-top:2px;padding-bottom:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#08789D;"  title="<%=siteName%>(<%=thisdomain%>)"><label style="cursor:hand" title="点击进入网站:<%=thisdomain%>" onClick="window.open('http://<%=thisdomain%>');return false;"></label><label id="droplabel"> <!--onClick="ShowDropPopup(1);--><%=siteName%></label></td></tr></table>
							<table style="font-size:12px" width="188">
						  <tr><td width="181"  nowrap="true" class="a_effect" style="cursor:hand;padding-top:2px;padding-bottom:2px;overflow:hidden; text-overflow:ellipsis;white-space:nowrap;color:#08789D;" title="点击改变状态"  onclick="showStatus();"><img width=12 height=12 border=0 id="stateimg"> <%=thisname%>(<label id="statename"></label>)<font size="1"> >>></font></td></tr></table>							
					  </td>
						<td width="100%" id="maxtoolbar1" align='center'style="padding-left:10px;padding-right:10px;" >
							<div id="toolbar1"  style="background-color:#E3F7F9border:3px;width:100%;height:78px;">
							<!--
								<script language="JavaScript">
									CreateMenu(currentserver+"xml/toolbar.xml","menu");
								</script>
							-->
							</div>
					  </td>
					  
						<td valign="bottom" id="xa" width='83' >
							<!--上右菜单开始-->
							<table border="0" cellpadding="0" cellspacing="0" style="font-size:14px;color:#08789D;">
								<tr><td onClick="toolbarAction(60)" style="cursor:hand;" title="点击重新获取本页">刷新页面</td></tr>
								<tr><td height='5'></td></tr>
								<tr><td onClick="toolbarAction(100)" style="cursor:hand;" title="点击进入系统设置页面">系统设置</td></tr>
								<tr><td height='5'></td></tr>
								<tr><td onClick="toolbarAction(70)" style="cursor:hand;" title="退出系统">退出系统</td></tr>
								<tr><td height='5'></td></tr>
							</table>			
							<!--上右菜单结束-->				   
					  </td>
					</tr>
					<!--
					<tr>
						<td id="mintoolbar">
							<img src="img/manage/clarity.gif" width="1" height="1">
						</td>
					</tr>
					-->
				</table>
				<!-- 网站信息、客户端状态和菜单行结束 -->
			</td>
		</tr>
		<tr>
			<td id="line" height='3'></td>
		</tr>
		<tr>
			<td>
				<!-- main -->
				<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
					<tr>
						<td valign="top" id="mainleft">
							<!-- 左边用户信息窗口开始 -->
							<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
								<!--<tr>
									<td >
										<table border="0" height='24' width='100%' cellpadding="0" cellspacing="0" style="width:200px;" background="img/manage/t_12.gif">
											<tr>
												<td width="25" align="right"><img src="img/manage/l1.gif" width="16" height="14"></td>
												<td  align="left" style="padding-top:2px;padding-left:5px;"><b style="color:#336699;font-size:12px;">用户列表</b></td>
											</tr>
										</table>
									</td>
								</tr>-->
								<tr>
									<td id="menubody" align="center">
										<div id="sysmenu" style="width:100%;height:100%;font-size:12px;">
										<table width='100%' height='100%' border="0" cellpadding="0" cellspacing="0">
											<tr>
												<td>
													<TABLE BORDER="0" HEIGHT="100%" WIDTH="100%" CELLSPACING="0" CELLPADDING="0" STYLE="FONT-SIZE: 13px;color:#08789D;" ID="Table2" >
														<TR Height="24px" style="background-image: url(img/manage/t_12.gif)">
															<TD style="width:30px;" align='center'>
																<img src="img/manage/l1.gif" width="16" height="14">
															</TD>
															<TD>用户列表</TD>
															<TD></TD>
														</TR>
														<TR>
															<TD colspan="3"><DIV id="tree" STYLE="PADDING-TOP: 4px; background-color:#CEEBFA;OVERFLOW-Y:auto;Width=100%;Height=100%" ></DIV></TD>
														</TR>
														<tr Height="250">
															<TD colspan="3">
																	<TABLE BORDER="0" WIDTH="100%" CELLSPACING="0" CELLPADDING="0" STYLE="FONT-SIZE: 13px;color:#08789D;" HEIGHT="100%">
																		<TR HEIGHT="24px" style="background-image: url(img/manage/t_12.gif)">
																			<TD style="width:30px;" align='center'>
																				<img src="img/manage/l2.gif" width="17" height="17">
																			</TD>
																			<TD colspan='2' valign="middle">用户来源:<B><span id="currentuser"></span></B><img id="notesign" style="display:none;cursor:hand" src="img/note.gif"></TD>
																		 
																		</TR>
																		<TR >
																			<TD  height="88" colspan="3">
																			<DIV id="ipdata" STYLE="PADDING-TOP: 4px; background-color:#CEEBFA;OVERFLOW-Y:auto;OVERFLOW-X:none;Width=100%;Height=100%" ></DIV>
																				
																			</TD>
																		</TR>																		
																		
																		<TR HEIGHT="24px"  style="background-image: url(img/manage/t_12.gif)">
																			<TD style="width:30px;" align='center'>
																				<img src="img/manage/l3.gif" width="16" height="16">
																			</TD>
																			<TD colspan='2'>访问轨迹</TD>
																			 
																		</TR>
																		<TR >
																			<TD   Height="100%" colspan="3">
																			<DIV id="vsdata" STYLE="PADDING-TOP: 4px; background-color:#CEEBFA;OVERFLOW-Y:auto;OVERFLOW-X:none;Width=100%;Height=100%" ></DIV>
																				 
																			</TD>
																		</TR>
																	</TABLE>					
															</TD>
														</tr>
														<tr HEIGHT="24px" style="background-image: url(img/manage/t_12.gif)">
															<td colspan="3" id="menufoot1" style="font-family:Arial;font-size:12px;padding-left:10px"><nobr>您的IP:<%=myip%><nobr/></td>
														</tr>
														<tr>
															<td colspan="3" height='1' bgcolor='#61C0F6'></td>
														</tr>
													</TABLE>
												</td>
												<td width='1' bgcolor='#61C0F6'></td>
											</tr>
										</table>
										</div>
									</td>
								</tr>								
							</table>
							<!-- 左边用户信息窗口结束 -->
					  </td>
						<td valign="top" id="mainmiddle" style="padding:10px;padding-top:0px;padding-bottom:0px;">
							<!-- main-middle -->
						  <div id="middle">
								<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
									<tr>
										<td>
											<!-- 对话显示框开始 -->
											<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
												<tr>
													<td width="11" height="25" align="left" background="img/manage/m_15.gif" id="disp11"></td>
													<td width="100%" background="img/manage/m_22.gif" id="disp21" style="padding-top:2px;"><font style="color:#990000;font-size:12px;">当前用户：</font><span id="dialoger" style="font-size:12px;"></span></td>
													<td width="110" background="img/manage/m_22.gif" id="netStatus" style="padding-top:2px;font-size:12px;">网络:<font color='green'>正常</font></td>
													<td width="11" height="25" align="right" id="disp31"><img src="img/manage/m_17.gif" width="11" height="25"></td>
												</tr>
												<tr>
													<td colspan="4" valign="top" style="background:ivory;;border:1px solid #7892C6;border-top: 0px solid;">
													<!-- 对话显示frame -->
													<iframe name="historyframe" style="margin-left:0;margin-right:0px;background-color:ivory;" frameborder="0" width="100%" height="100%" src="historylist.jsp<%=(clntWaterImg!=null)?"?clntWaterImg="+clntWaterImg:""%>"></iframe>
													</td>
												</tr>
											</table>
											<!-- 对话显示框结束 -->
										</td>
									</tr>
									<tr>
										<td style="height:15px;"><img src="img/manage/clarity.gif" width="1" height="1"></td>
									</tr>
									<tr>
										<td height="160" valign="bottom">
											<!-- 对话发送框开始 -->
											<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
												<!-- 对话发送框上方工具图标开始 -->
												<tr>
													<td id="talk11" width="11" height="25" background="img/manage/m_15.gif" ></td>
													<td id="talk21" width="100%" background="img/manage/m_22.gif">
														<div id="talktoolbar" style="width:240px;">
															<script language="JavaScript">
																CreateToolbar(currentserver+"xml/talktoolbar.xml")
															</script>
														</div>
													</td>
													<td id="talk31" width="11" height="25"><img src="img/manage/m_17.gif" width="11" height="25"></td>
												</tr>
												<!-- 对话发送框上方工具图标结束 -->
												<tr>
													<td colspan="3" style="background:#FFFFFF;border-left:1px solid #7892C6;border-right:1px solid #7892C6;">
															<!-- 对话发送框输入部分开始 -->
															<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="ivory">
																<tr>
																	<td rowspan="2">
																		<div id="msg" contentEditable style="color:#660000;background-color:ivory;font-size:14px;height:88px;width:100%;padding:5px;overflow:auto;border:0px solid;"  onkeypress="SendMsg();" onKeyDown="checkkey();">
																		</div>
																	</td>
																	<td style="width:80px;" align="center" valign="middle"><img id="sender" src="img/talk/send.gif"  style="cursor:hand" onClick="SendMsg();"></td>
																</tr>
																<tr>
																	<td  style="width:80px;" align="center" valign="top"><img id="searcher" src="img/talk/search.bmp" style="cursor:hand" onClick="buttonSearch();"></td>
																</tr>
															</table>
															<!-- 对话发送框输入部分结束 -->
													</td>
												</tr>
												<!-- 对话发送框下方状态行开始 -->
												<tr>
													<td id="talk41" width="11" height="25" background="img/manage/m_21.gif"></td>
													<td id="talk51" width='100%' background="img/manage/m_22.gif"><span id="talkstatus" style="color:gray;font-size:12px;"><span></td>
													<td id="talk61" width="11" height="25"><img src="img/manage/m_24.gif" width="11" height="25"></td>
												</tr>
												<!-- 对话发送框下方状态行结束 -->
											</table>
											<!-- 对话发送框结束 -->
										</td>
									</tr>
								</table>
						  </div>
							<!-- main-middle -->
					  </td>
						<td valign="top" id="mainright" align='center' height="100%">
							<!-- main-right -->
							  
							 <table border="0" cellpadding="0" cellspacing="0" height="100%"><tr>
							 <td width='1' bgcolor="#61C0F6"></td>
							 <td>
								<table width="100%" height="100%" cellpadding="0" cellspacing="0" style="font-size:12px;color:#08789D;">
									<TR Height="24px" style="background-image: url(img/manage/t_12.gif)">
										<TD style="width:30px;" align='center'>
											<img src="img/manage/r1.gif" style="margin-right:3px;cursor:hand" onClick="reloadShortCut();" title="点击更新快捷回复">
										</TD>
										<TD>快捷回复</TD>										
									</tr>
									<!-- 快捷回复框开始 -->
									<tr height="100%">
										<td colspan='2' id="rightmiddle1" valign="top" width='100%' height='100%' >
											<div id="shortcutboard"  style="width:190;height:100%;OVERFLOW:auto;color:#000000;font-size:12px;padding:5px;background-color:#CEEBFA;"></div>
										</td>
									</tr>									
									<!-- 快捷回复框结束 -->
								<tr height='278px'><td colspan=2><table width="100%" height="100%" cellpadding="0" cellspacing="0" style="font-size:12px;color:#08789D;">
									<!--群组开始-->
									<TR Height="24px" style="background-image: url(img/manage/t_12.gif)">
										<TD style="width:30px;" align='center'>
											<img src="img/manage/r2.gif" onClick="" style="margin-right:3px;cursor:hand" title="点击更新行业群组">
										</TD>
										<TD>行业群组</TD>										
									</tr>
									 
									<tr>
										<td colspan='2' id="rightmiddle2" align="left" valign="top"  height='20%'>
											<div id="hyqz" style="width:100%;height:140px;color:#000000;font-size:12px;padding:0px;background-color:#CEEBFA; text-align:left;">
												<!--<iframe src="manage/hyqz.jsp" frameborder="0" name="hyqz" style="width:100%;height:100px"></iframe>--> 
											</div>
										</td>
									</tr>
									<!--群组结束-->
									<!--商业资讯开始-->
									<TR Height="24px" style="background-image: url(img/manage/t_12.gif)">
										<TD style="width:30px;" align='center'>
											<img src="img/manage/r3.gif" style="margin-right:3px;cursor:hand" onClick="" title="">
										</TD>
										<TD>本站推荐</TD>										 
									</tr>									 
									<tr>
										<td colspan='2' id="rightbottom3" align="center" valign="top"  height='10%'>
											<div id="xxc" style="width:100%;height:90px;color:#000000;font-size:12px;padding:0px;background-color:#CEEBFA;">	
											最新注册<marquee width="210" id='latestSites' height="90" direction="up" onMouseOver="latestSites.stop()" onMouseOut="latestSites.start()" scrollamount="1" scrolldelay="0" style="background-color:transparent;font-size:10pt;color:green;"></marquee>								 
												<!--<iframe src="manage/latestSites.jsp" frameborder="0" name="hylatestSites" style="width:100%;height:100px "></iframe> -->											 	 
											</div>
										</td>
									</tr>
									<!--商业资讯结束--> 		
									</table></td></tr>						 
									<TR Height="24px" style="background-image: url(img/manage/t_12.gif)">						 
										<td colspan='2' style="font-size:12px">&nbsp;&nbsp;<input type=checkbox checked id="setalert" title="访客到达时自动提示">访客提示</td>
									</tr>			 
									 <script language="JavaScript">
									 
											//if(document.body.clientHeight<575){
											//		rightmiddle1.style.height=150+"px";
											//		rightmiddle2.style.height=140+"px";
											//		rightbottom3.style.height=100+"px";
											//}		 
									 </script>
									 
								</table>
							 </td>
							 </tr></table>
							 
							<!-- main-right -->								 
					  </td>
					</tr>
				</table>
				<!-- main -->
			</td>
		</tr>
		<tr>
			<td id="foot"><img src="img/manage/clarity.gif" width="1" height="1"></td>
		</tr>
	</table>
</body>
</html>
