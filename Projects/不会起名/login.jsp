<%@page contentType="text/html; charset=gb2312" language="java" import="java.sql.*, java.util.*, java.net.*"%>
<jsp:useBean id="msgManager" scope="page"  class="msg.MsgManager" />
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" /> 
<%
	///////////////////////���Session����ȡֵ/////////////////////////////
	 String username=(String)session.getValue("scomClient");
	 String password=(String)session.getValue("scomPwd");		  
	 if(username==null || username.equals("") ||password==null || password.equals("") ) {			
		out.println("<script language=jscript>alert('��û�е�½��Ự�Ѿ����ڣ������µ�½��');location.assign('login.htm');</script>");			
		return;						
	 }
	 ///////////////////////////////////////////////////////////////////////

String vid=request.getParameter("vid");//"3yan1";
String curURL=userManager.getDomain(vid);
userManager.putLostViewerToOffline(curURL,vid);
userManager.markUnreadCommandMessageAsRead(vid);
if(userManager.getUserState(vid).equals("OFFLINE")){ 
	userManager.changeLastTime(vid); //�������·���ʱ��					
	//���·����ߵ�ǰ״̬Ϊ����
	userManager.changeState(vid,"ONLINE"); // 	 
	String hostInfoInXml=userManager.getHostInfoInXml(vid);	 
	//hostInfoInXml=URLEncoder.encode(hostInfoInXml,"gb2312");
	hostInfoInXml=msg.Escape.escape(hostInfoInXml);
 	msgManager.sendSayMeOnPageInitMsg(vid,"stuff",curURL,hostInfoInXml,"STATECHANGE");
	msgManager.sendSayMeLogonMsg(vid,"stuff",curURL);
//out.println(curURL+" "+hostInfoInXml);
}
//out.println(curURL);
//out.println(curURL+userManager.getSiteUserInXml0(curURL));
	
%>

<head>
	<title>ʱ����վ��̸�ͻ���</title>
<!--
		<meta name="content-type" content="text/html; charset=utf-8">
		<meta http-equiv='Content-Type' content='text/html; charset=gb2312'>
-->
		<link rel="stylesheet" href="css/manage.css" type="text/css">
		<link rel="stylesheet" href="css/toolbar.css" type="text/css">
		<link rel="stylesheet" href="css/talktoolbar.css" type="text/css">
		<SCRIPT LANGUAGE="Javascript" SRC="scripts/tree.js"></SCRIPT>
		<script language="javascript" src="scripts/msg.js"></script>
		<script language="javascript" src="scripts/manage.js"></script>		
		<script language="JavaScript" src="scripts/toolbar.js"></script>
		<script language="JavaScript" src="scripts/talktoolbar.js"></script>
		<script language="JavaScript" src="scripts/shortcut.js"></script>
		<script language="JavaScript" src="scripts/prompt.js"></script>		
		<script language="javascript">
			var thisdomain="www.3yan.com;www.netalker.com.cn;",thisid="3yan1",thisstate="ONLINE",thisname="ҵ��1";
			var curURL="<%=curURL%>";
			var myip="221.221.167.121";
			var multiDomain="True";
			//var urlsobj=null;
			var urlarray=new Array('��������ʱ�����缼�����޹�˾');
			var disablecount=false;
			

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
				window.detachEvent("onunload",SayMeLogoff);
				window.detachEvent("onbeforeunload",ConfirmOut);
				document.URL="login.aspx?index="+selectid;
			}
			
			function doSearch(key)
			{
				window.open("search.aspx?key="+key,"sw");
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
					self.resizeTo(screen.availWidth,screen.availHeight);
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
//window.alert(curURL);
 //window.alert(GetServerPath()+"getShortcut.jsp?url="+curURL);
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
		</script>
	<xml id="xsldata" src="xml/tree.xsl"></xml>
	<xml id="vsxsldata" src="xml/mixed.xsl"></xml>
	<xml id="shortcutcontrol" src="xml/shortcutcontrol.xml"></xml>
<!--
	<xml id="xmldata" ><D><GS><G i="TALKING"  t="���ڽ�̸"/><G i="stuff"  t="�����ͷ�"/><U i="3yan1" t="1" s="ONLINE"  ></U><U i="3yan2" t="1" s="OFFLINE"  ></U><U i="3yan3" t="1" s="OFFLINE"  ></U><U i="3yan4" t="1" s="OFFLINE"  ></U><U i="3yan5" t="1" s="OFFLINE"  ></U><U i="3yan6" t="1" s="OFFLINE"  ></U><G i="ONLINE"  tag="www.3yan.com" t="��ǰ����"/><G i="ONLINE"  tag="www.netalker.com.cn" t="��ǰ����"/></GS><US></US></D></xml>
	
	<xml id="xmldata" ><D><GS><G i="TALKING"  t="���ڽ�̸"/><G i="stuff"  t="�����ͷ�"/><U i="3yan1" t="1" s="ONLINE"  ></U><U i="3yan2" t="1" s="OFFLINE"  ></U><U i="3yan3" t="1" s="OFFLINE"  ></U><U i="3yan4" t="1" s="OFFLINE"  ></U><U i="3yan5" t="1" s="OFFLINE"  ></U><U i="3yan6" t="1" s="OFFLINE"  ></U><G i="ONLINE"  tag="www.3yan.com" t="��ǰ����"/><G i="ONLINE"  tag="www.netalker.com.cn" t="��ǰ����"/></GS><US><U i="v10386529" t="0" s="ONLINE"  v="1"  dm="www.netalker.com.cn" ><I i="61.232.3.45" a="������-��ͨ" o="winnt" bo="IE 6.0" l="zh-cn" p="1024*768" u="http://www.netalker.com.cn/" ad="0"/><VS><T  f=""  ot="true"  u="http://www.netalker.com.cn/"  t="09��26�� 08:02"/></VS></U><U i="v10386528" t="0" s="ONLINE"  v="1"  dm="www.netalker.com.cn" ><I i="61.232.3.45" a="������-��ͨ" o="winnt" bo="IE 6.0" l="zh-cn" p="1024*768" u="http://www.netalker.com.cn/" ad="0"/><VS><T  f=""  ot="true"  u="http://www.netalker.com.cn/"  t="09��26�� 08:02"/></VS></U></US></D></xml>
-->
<xml id="xmldata" ><%=userManager.getSiteUserInXml0(curURL,vid)%>
<%

	 
	
	String[] ids=userManager.findMyTalkers(vid);
 
	for(int i=0;ids!=null && i<ids.length;i++)
		msgManager.sendMsg(new msg.Message(ids[i],vid,"","ONTALK"));



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

<body  onLoad="SystemInitial();reloadShortCut();" oncontextmenu="return false;"  onclick="checkclick();">
	<!-- XX�㿪ʼ  -->
 	<div id="innermsg" style="border-right:#455690 1px solid;border-top:#a6b4cf 1px solid;z-index:99999;border-left:#a6b4cf 1px solid;border-bottom: #455690 1px solid;background-color:#DBE2F7;position:absolute;height:120px;width:210px;display:none"></div>
	<!-- XX�����  -->
	<!-- ������ʾ�㿪ʼ  -->
	<div id="voipform" style="z-Index:100;position:absolute;top:200px;left:250px;width:415px;height:140px;border:2px groove;margin:0px;padding:0px;background-image:url('img/talk/bg.gif');" ondragstart='setCapture();ydxx=event.x-this.offsetLeft;ydyy=event.y-this.offsetTop;' ondrag='this.style.left=event.x-ydxx;this.style.top=event.y-ydyy' ondragend='releaseCapture();'>
	<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<tr>
		<td style="width:95%;color:#FF0000;font-size:12px;filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#C0C0C0', endColorStr='#FFFFFF', gradientType='0');" valign="middle">
		<img src="img/talk/move.gif" style="margin-top:2px;"> ϵͳ��ʾ
		</td>
		<td style="filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#C0C0C0', endColorStr='#FFFFFF', gradientType='0');">
		<img src="img/talk/cls.gif" onClick="voipform.style.display='none';" title=" �ر�" style="cursor:hand;">
		</td>
	</tr>
	<tr>
		<td colspan="2" style="padding:5px;">
		<table width="100%" border="0" style="font-size:12px;background-image:url('img/talk/bg.gif');" height="93">
			<tr>
				<td align="left">
					����&nbsp;<font color=red><span id="unreaddiv"></span></font>&nbsp;��δ����Ϣ<BR>���&nbsp;<font color=green>ȷ��</font>&nbsp;�鿴��Ϣ,���&nbsp;<font color=green>ȡ��</font>&nbsp;�ر���ʾ����
				</td>
			</tr>
			<tr>
				<td align="center" width="100%" style="padding-top:10px;">
					<P align="center">
					<input type="image" src="img/talk/ok.gif" onClick="voipform.style.display='none';manwin=window.open('leftMsgView.jsp?vid=<%=vid%>','ydmanage');manwin.focus();">&nbsp;&nbsp;&nbsp;
					<input type="image" src="img/talk/canal.gif" onClick="voipform.style.display='none';" title="ȡ��">
					</P>
				</td>
			</tr>
		</table>
		</td>
	</tr>
	</table>
	</div>
	<!-- ������ʾ�����  -->
	<!-- �����ļ��㿪ʼ  -->
	<div id="uploadform" style="z-Index:100;position:absolute;top:200px;left:250px;width:415px;height:140px;display:none;border:2px groove;margin:0px;padding:0px;background-image:url('img/talk/bg.gif');" ondragstart='setCapture();ydxx=event.x-this.offsetLeft;ydyy=event.y-this.offsetTop;' ondrag='this.style.left=event.x-ydxx;this.style.top=event.y-ydyy' ondragend='releaseCapture();'>
	<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<tr>
		<td style="width:95%;color:#FF0000;font-size:12px;filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#C0C0C0', endColorStr='#FFFFFF', gradientType='0');" valign="middle">
		<img src="img/talk/move.gif" style="margin-top:2px;"> �����ļ�
		</td>
		<td style="filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#C0C0C0', endColorStr='#FFFFFF', gradientType='0');">
		<img src="img/talk/cls.gif" onClick="closeUpload();" title="�ر�" style="cursor:hand;margin-top:2px;">
		</td>
	</tr>
	<tr>
		<td colspan="2" style="padding:5px;" id="uploadtd">
		<iframe src="" border="0" name="uploadframe" style="width:100%;height:100%"></iframe>
		</td>
	</tr>
	</table>
	</div>
	<!-- �����ļ������  -->
	<!-- ��ע����߲㿪ʼ  -->
	<div id="setnoteform" style="z-Index:100;position:absolute;top:200px;left:250px;width:415px;height:200px;display:none;border:2px groove;margin:0px;padding:0px;filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#FFFFFF', endColorStr='#C0C0C0', gradientType='0');"  ondragstart='setCapture();ydxx=event.x-this.offsetLeft;ydyy=event.y-this.offsetTop;' ondrag='this.style.left=event.x-ydxx;this.style.top=event.y-ydyy' ondragend='releaseCapture();'>
		<table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size:12px;">
			<tr>
				<td style="width:95%;color:#FF0000;filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#C0C0C0', endColorStr='#FFFFFF', gradientType='0');" valign="middle">
				<img src="img/talk/move.gif" style="margin-top:2px;"> �û���ע
				</td>
				<td align="right" style="filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#C0C0C0', endColorStr='#FFFFFF', gradientType='0');">
				<img src="img/talk/cls.gif" onClick="setnoteform.style.display='none';" title="�ر�" style="cursor:hand;margin-top:2px;">
				</td>
			</tr>
			<tr>
					<td id="labeltd" colspan="2">
						<table align="left" cellspacing="0" cellpadding="1" border="0" width="100%" style="FONT-SIZE:12px;COLOR:#000066">
							<form name="ydv_from">
								<TBODY>
									<tr>
										<td align="right" width="65"><nobr>������</nobr></td>
										<td width="129">
											<input type="hidden" id="ydv_vid" size="9"> <input type="text" id="ydv_name" style="WIDTH:105px">
										</td>
										<td align="right" width="59">�Ա�</td>
										<td>
											<select id="ydv_sex" style="WIDTH:50px">
												<option value="1" selected>��</option>
												<option value="0">Ů</option>
											</select>
										</td>
									</tr>
									<tr>
										<td align="right" width="65">�绰��</td>
										<td width="129"><input type="text" id="ydv_tel" style="WIDTH:105px"></td>
										<td align="right" width="59">�ֻ���</td>
										<td><input type="text" id="ydv_mbl" style="WIDTH:105px"></td>
									</tr>
									<tr>
										<td align="right" width="65"><nobr>С��ͨ��</nobr></td>
										<td width="129"><input type="text" id="ydv_smalltel" style="WIDTH:105px"></td>
										<td align="right" width="59">�ʼ���</td>
										<td><input type="text" id="ydv_email" style="WIDTH:105px"></td>
									</tr>
									<tr>
										<td align="right" width="65">QQ��</td>
										<td width="129"><input type="text" id="ydv_qq" style="WIDTH:105px"></td>
										<td align="right" width="59">MSN��</td>
										<td><input type="text" id="ydv_msn" style="WIDTH:105px"></td>
									</tr>
									<tr>
										<td align="right" width="65">��ַ��</td>
										<td width="129"><input type="text" id="ydv_add" style="WIDTH:105px"></td>
										<td align="right" width="59">���</td>
										<td><select id="ydv_type"></select></td>
									</tr>
									<tr>
										<td colspan="4" align="center">
											<button onClick="UpdateLabel()" style="BORDER-RIGHT:#000000 1px solid;BORDER-TOP:#000000 1px solid;FILTER:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#DAF0FD', endColorStr='#7FB7E1', gradientType='0');BORDER-LEFT:#000000 1px solid;WIDTH:60px;COLOR:#000000;BORDER-BOTTOM:#000000 1px solid;HEIGHT:18px;BACKGROUND-COLOR:#ffffff;TEXT-ALIGN:center"
												type="button">�޸ı�ע</button>&nbsp;&nbsp;<button onClick="DelLabel()" style="BORDER-RIGHT:#000000 1px solid;BORDER-TOP:#000000 1px solid;FILTER:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#DAF0FD', endColorStr='#7FB7E1', gradientType='0');BORDER-LEFT:#000000 1px solid;WIDTH:60px;COLOR:#000000;BORDER-BOTTOM:#000000 1px solid;HEIGHT:18px;BACKGROUND-COLOR:#ffffff;TEXT-ALIGN:center"
												type="button">ɾ����ע</button>
										</td>
									</tr>
							</form>
						</table>
					</td>
			</tr>
		</table>		
	</div>
	<!-- ��ע����߲����  -->
	<bgsound src="" id="soundeffect" loop=1 autostart="false" />
		<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td height="78">
					<!-- ��վ��Ϣ���ͻ���״̬�Ͳ˵��п�ʼ -->
					<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td rowspan="2" id="logo" valign="middle" style="padding-left:5px;padding-top:5px;">
								<table border="0" style="font-size:12px"><tr><td class="a_effect" nowrap="true" style="cursor:hand;padding-top:2px;padding-bottom:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"  title="��ǰ��վ:��������ʱ�����缼�����޹�˾(www.3yan.com;www.netalker.com.cn;)"><label style="cursor:hand" title="���������վ:www.3yan.com;www.netalker.com.cn;" onClick="window.open('http://www.3yan.com;www.netalker.com.cn;');return false;">��վ</label>:<label id="droplabel" onClick="ShowDropPopup(1);">��������ʱ�����缼�����޹�˾��</label></td></tr></table>
								<table style="font-size:12px"><tr><td  onclick="showStatus();" class="a_effect"  nowrap="true" style="cursor:hand;padding-top:2px;padding-bottom:2px;overflow:hidden; text-overflow:ellipsis;white-space:nowrap;" title="����ı�״̬"><img width=12 height=12 border=0 id="stateimg"> ҵ��1(<label id="statename"></label>)<font size="1"> >>></font></td></tr></table>
							</td>
							<td rowspan="2" id="tailpiece"><img src="img/manage/clarity.gif" width="1" height="1"></td>
							<td id="maxtoolbar" style="padding-left:10px;">
								<div id="toolbar" style="width:550px;height:60px;">
									<script language="JavaScript">
										CreateMenu(currentserver+"xml/toolbar.xml","menu");
									</script>
								</div>
							</td>
						</tr>
						<tr>
							<td id="mintoolbar">
								<img src="img/manage/clarity.gif" width="1" height="1">
							</td>
						</tr>
					</table>
					<!-- ��վ��Ϣ���ͻ���״̬�Ͳ˵��н��� -->
				</td>
			</tr>
			<tr>
				<td id="line"><img src="img/manage/clarity.gif" width="1" height="1"></td>
			</tr>
			<tr>
				<td>
					<!-- main -->
					<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td id="mainleft" valign="top">
								<!-- ����û���Ϣ���ڿ�ʼ -->
								<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
									<tr>
										<td id="menuhead">
											<table border="0" cellpadding="0" cellspacing="0" style="width:200px;">
												<tr>
													<td width="30%" align="right"><img src="img/manage/sys.gif" width="14" height="14"></td>
													<td width="70%" align="left" style="padding-top:2px;padding-left:5px;"><b style="color:#336699;font-size:12px;">�� 
															�� �� ��</b></td>
												</tr>
											</table>
										</td>
									</tr>
									<tr>
										<td id="menubody" align="center">
											<div id="sysmenu" style="width:95%;height:100%;color:#000000;font-size:12px;padding:2px;border:0px solid #617EBA;">
											<TABLE BORDER="0" HEIGHT="100%" WIDTH="100%" CELLSPACING="0" CELLPADDING="1" STYLE="FONT-SIZE: 13px;" ID="Table2">
												<TR Height="21px">
													<TD style="width:8px;background-image:url('img/manage/sysmenuleft.gif');"></TD>
													<TD style="color:#003366;background-image:url('img/manage/sysmenubg.gif');">��ǰ�б�</TD>
													<TD style="width:8px;background-image:url('img/manage/sysmenuright.gif');"></TD>
												</TR>
												<TR>
													<TD colspan="3" style="border:1px solid #003366;"><DIV id="tree" STYLE="PADDING-TOP: 8px;OVERFLOW-Y:auto;Width=100%;Height=100%" ></DIV></TD>
												</TR>
												<TR Height="270">
													<TD colspan="3">
															<TABLE BORDER="0" WIDTH="100%" CELLSPACING="0" CELLPADDING="1" STYLE="FONT-SIZE: 13px;" HEIGHT="100%">
															<TR HEIGHT="21px">
															<TD style="width:8px;background-image:url('img/manage/sysmenuleft.gif');"></TD>
															<TD style="color:#003366;background-image:url('img/manage/sysmenubg.gif');" valign="middle">�û���Դ&nbsp;<B><span id="currentuser"></span></B>&nbsp;<img id="notesign" style="display:none;cursor:hand" src="img/note.gif"></TD>
															<TD style="width:8px;background-image:url('img/manage/sysmenuright.gif');"></TD>
															</TR>
															<TR Height="90">
															<TD valign="middle" colspan="3" style="border:1px solid #003366;">
																<table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%">
																	<tr>
																	<td valign="top">
																		<DIV STYLE="OVERFLOW-Y:auto;OVERFLOW-X:none;Height=100%" id="ipdata"></DIV>
																	</td>
																	</tr>
																</table>
															</TD>
															<tr Height="1"><td colspan="3"></td></tr>
															</TR>
															<TR HEIGHT="21px">
															<TD style="width:8px;background-image:url('img/manage/sysmenuleft.gif');"></TD>
															<TD style="color:#003366;background-image:url('img/manage/sysmenubg.gif');">���ʹ켣</TD>
															<TD style="width:8px;background-image:url('img/manage/sysmenuright.gif');"></TD>
															</TR>
															<TR>
															<TD valign="top" colspan="3" style="border:1px solid #003366;">
																<table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%"  STYLE="FONT-SIZE: 13px;">
																<tr><td valign="top">
																<DIV STYLE="OVERFLOW-Y:auto;OVERFLOW-X:none;Height=100%" id="vsdata"></DIV>
																</td></tr></table>
															</TD>
															</TR>
															</TABLE>					
													</TD>
												</TR>
											</TABLE>
											</div>
										</td>
									</tr>
									<tr>
										<td id="menufoot" style="color:#003333;font-family:Arial;font-size:12px;padding-left:10px"><nobr>����IP:221.221.167.121<nobr/></td>
									</tr>
								</table>
								<!-- ����û���Ϣ���ڽ��� -->
							</td>
							<td id="mainmiddle" valign="top" style="padding:10px;padding-top:0px;padding-bottom:0px;">
								<!-- main-middle -->
								<div id="middle">
									<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
										<tr>
											<td>
												<!-- �Ի���ʾ��ʼ -->
												<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
													<tr>
														<td id="disp1"><img src="img/manage/clarity.gif" width="1" height="1"></td>
														<td id="disp2" style="padding-top:2px;"><font style="color:#990000;font-size:12px;">��ǰ�û���</font><span id="dialoger" style="font-size:12px;"></span></td>
														<td id="disp3"><img src="img/manage/clarity.gif" width="1" height="1"></td>
													</tr>
													<tr>
														<td colspan="3" valign="top" style="background:ivory;;border:1px solid #7892C6;border-top: 0px solid;">
														<!-- �Ի���ʾframe -->
														<iframe name="historyframe" style="margin-left:0;margin-right:0px;background-color:ivory;" frameborder="0" width="100%" height="100%" src="historylist.htm"></iframe>
														</td>
													</tr>
												</table>
												<!-- �Ի���ʾ����� -->
											</td>
										</tr>
										<tr>
											<td style="height:15px;"><img src="img/manage/clarity.gif" width="1" height="1"></td>
										</tr>
										<tr>
											<td height="160" valign="bottom">
												<!-- �Ի����Ϳ�ʼ -->
												<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
													<!-- �Ի����Ϳ��Ϸ�����ͼ�꿪ʼ -->
													<tr>
														<td id="talk1"><img src="img/manage/clarity.gif" width="1" height="1"></td>
														<td id="talk2">
															<div id="talktoolbar" style="width:170px;">
																<script language="JavaScript">
																	CreateToolbar(currentserver+"xml/talktoolbar.xml")
																</script>
															</div>
														</td>
														<td id="talk3"><img src="img/manage/clarity.gif" width="1" height="1"></td>
													</tr>
													<!-- �Ի����Ϳ��Ϸ�����ͼ����� -->
													<tr>
														<td colspan="3" style="background:#FFFFFF;border-left:1px solid #7892C6;border-right:1px solid #7892C6;">
															<!-- �Ի����Ϳ����벿�ֿ�ʼ -->
																<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="ivory">
																	<tr>
																		<td rowspan="2">
																			<div id="msg" contentEditable style="color:#660000;background-color:ivory;font-size:14px;height:88px;width:100%;padding:5px;overflow:auto;border:0px solid;"  onkeypress="SendMsg();" onKeyDown="checkkey();">
																			</div>
																		</td>
																		<td style="width:80px;" align="center" valign="middle"><img id="sender" src="img/talk/send.bmp"  style="cursor:hand" onClick="SendMsg();"></td>
																	</tr>
																	<tr>
																		<td style="width:80px;" align="center" valign="top"><img id="searcher" src="img/talk/search.bmp" style="cursor:hand" onClick="buttonSearch();"></td>
																	</tr>
																</table>
															<!-- �Ի����Ϳ����벿�ֽ��� -->
														</td>
													</tr>
													<!-- �Ի����Ϳ��·�״̬�п�ʼ -->
													<tr>
														<td id="talk4"><img src="img/manage/clarity.gif" width="1" height="1"></td>
														<td id="talk5"><span id="talkstatus" style="color:gray;font-size:12px;"><span></td>
														<td id="talk6"><img src="img/manage/clarity.gif" width="1" height="1"></td>
													</tr>
													<!-- �Ի����Ϳ��·�״̬�н��� -->
												</table>
												<!-- �Ի����Ϳ���� -->
											</td>
										</tr>
									</table>
								</div>
								<!-- main-middle -->
							</td>
							<td id="mainright" valign="top">
								<!-- main-right -->
								<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
									<tr>
										<td id="righttop"><div style="color:#336699;font-size:12px;text-align:center;padding:9px;border:0px solid;"><img src="img/manage/shortcut.gif" onClick="reloadShortCut();" title="������¿�ݻظ�" style="margin-right:3px;cursor:hand" align="top" width="10" height="10"><b>�� 
													�� �� ��</b></div>
										</td>
									</tr>
									<!-- ��ݻָ���ʼ -->
									<tr>
										<td id="rightmiddle" align="center" valign="top">
											<div id="shortcutboard" style="width:95%;color:#000000;font-size:12px;padding:5px;">
												<script language="JavaScript">
													 
													CreateBoard(currentserver+"xml/shortcut.xml",175)
													 
												</script>
											</div>
										</td>
									</tr>
									<!-- ��ݻָ������ -->
									<tr>
										<td id="rightfoot" style="font-size:12px">&nbsp;&nbsp;<input type=checkbox checked id="setalert" title="�ÿ͵���ʱ�Զ���ʾ">�ÿ���ʾ<img src="img/manage/clarity.gif" width="1" height="1"></td>
									</tr>
								</table>
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
