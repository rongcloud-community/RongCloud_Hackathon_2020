<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*, java.util.*, java.net.*,msg.*,cache.*"%>
<jsp:useBean id="msgManager" scope="page"  class="msg.MsgManager" />
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<jsp:useBean id="webStat" scope="page"  class="msg.WebStat" />
<%
//Log.log(request.getQueryString());
	String jspReferer=request.getHeader("Referer");
	if(jspReferer==null || jspReferer.equals("")){ //如果直接访问本页 那就什莫也不做
		out.println("Are you sure? Baby!");
		Log.log(jspReferer);
		return;
	}
	/**
	//////产生通讯用的认证代码////////////////	 
	String[] alph=new String[]{"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","P","R","S",
				   "T","U","V","W","X","Y","Z"};	 
	String code =alph[(int)(Math.random()*26)]+String.valueOf((int)(Math.random()*9))+
	     String.valueOf((int)(Math.random()*9))+String.valueOf((int)(Math.random()*9));
	//////////////////////////////////////////
  	**/
	String a=request.getParameter("a");   //请求类别
	String frmurl=request.getParameter("frmurl");  //是否来源链接或搜索引擎
	if(frmurl==null || frmurl.equals("undefined"))
		frmurl="";
	 
	String curURL0=request.getParameter("curURL");  //当前网址
	String vid=request.getParameter("vid");	       //访问者ID
	if(vid!=null && vid.equals("undefined"))
		vid=null;
	if(curURL0==null || curURL0.equals("") ){
		curURL0=request.getQueryString(); //处理带中文参数情况
		int index=curURL0.indexOf("curURL=");
		if(index>=0)
			curURL0=curURL0.substring(index+7);
		index=curURL0.indexOf("&");
		if(index>=0)
			curURL0=curURL0.substring(0,index);
		if(curURL0==null || curURL0.equals("")){
			out.println("Are you right? Baby!");
			//Log.log("curURL0="+curURL0);
			return;
		}
	}		 
	if( userManager.isBlocked( vid ) ){//如果这个id被列入黑名单
	//if( cache.Block.isBlocked( vid ) ){//如果这个id被列入黑名单
		//out.println("You are blocked? baby!");
		return;
	}
	
	///////////////////////////////////////////////////////
	String cookieEnabled=request.getParameter("ck");	       //浏览端是否启用cooki	
	//////////////如果浏览端未启用cookie/////////////////////////////////////
	if(cookieEnabled==null || cookieEnabled.equals("false") )
		return;
	//////////////////////////////////////////////////////////////////////
	String p=request.getParameter("p");	       	   //浏览者分辨率1024*768	 
	//String lvt=request.getParameter("lvt");	       //上次访问时间
	String lvp=request.getParameter("lvp");	       //上次访问页面
	if(lvp!=null && lvp.equals("undefined"))
		lvp=null;
	String firstTime=request.getParameter("firstTime");	       //是否是第一次来访	
	String webUrl=Global.getParameter("vdomain");//"webim.uniscom.cn";     //本平台目录	 
	String remoteIP= request.getRemoteAddr();
	String userAgent = request.getHeader("User-Agent"); 
	String language=request.getHeader("Accept-Language");  //浏览者浏览器语言
 
	String floatfootnote="";                       //浮动窗口的脚注
	String autohide="false";		       //
	String urlhead="http://";	

	////整理curURL///////	 
	String curURL=Keyword.getCleanURL(curURL0);
	Site site=null;
	//if((site=CacheSiteMonitor.getSite(curURL))==null){
		site=userManager.getSite(curURL);
		//CacheSiteMonitor.addSite(curURL,site);
	//}
	/**
	if(site==null && ( curURL.startsWith("www") || curURL.indexOf("et158")>0 ) ) //如果新来的站点就自动注册
		site=userManager.autoAddNewSite(curURL);
		//Log.log(curURL);
	**/
	if(site==null)
		return;
 	String floatImgType=site.getFloatImgType();//userManager.getFloatType(curURL);	
	String guokeType=site.getGuokeType();//userManager.getGuokeType(curURL);	
	String gkAdvert=site.getGkAdvert();//userManager.getGuokeAdvert(curURL);	
	String linkContent=site.getLinkContent();
	String gkTopAdvert=site.getGkTopAdvert();
	String inviteTime=site.getInviteTime();
	String inviteCont=site.getInviteCont();
	String floatLogo=site.getFloatLogo();
	String floatFoot=site.getFloatFoot();
	String guokeLogo=site.getGuokeLogo();
	String floatLink=site.getFloatLink();
	String floatLink1=site.getFloatLink1();
	String floatTopY=site.getFloatTopY();
	if(inviteCont==null || inviteCont.equals(""))
		inviteCont="你好！有什么可以帮到您！";
	int payLevel=site.getPayLevel();
	//Log.log(curURL+" "+String.valueOf(payLevel));
	//if(floatImgType!=null && floatImgType.indexOf("link")>=0)
	//	linkContent=userManager.getLinkContent(curURL);	
	if(gkAdvert==null || gkAdvert.equals("") || payLevel<1 )
		gkAdvert="http://"+webUrl+"/advert.htm";
	else
		gkAdvert ="http://"+gkAdvert;
	if(gkTopAdvert==null || gkTopAdvert.equals("") || payLevel<1 )
		gkTopAdvert="http://"+webUrl+"/gkTopAdvert.htm";
	else
		gkTopAdvert ="http://"+gkTopAdvert;
	//Log.log(floatImgType+" "+guokeType+" "+gkAdvert+" "+linkContent);
	//String time=String.valueOf( (Calendar.getInstance()).getTimeInMillis() );	
	////////////////////////////为兼容直接调用webTalk.jsp添加的部分//////////////////////	 
	boolean hasVid=true;
	if(firstTime==null && (vid==null || vid.equals("") || vid.equals("null"))){
		firstTime = "0";
		hasVid=false;  //浏览端还未写入vid的cookie 应在后面的javascript中写入
		Calendar c= Calendar.getInstance();
		long time=c.getTimeInMillis();
		while( userManager.hasSameId(String.valueOf(time)) ){ //为新来的访问者获取一个不重复的ID
			c= Calendar.getInstance();
	 		time=c.getTimeInMillis();
		}
		vid=String.valueOf(time);
	}
	else if(firstTime==null && vid!=null)
	 	firstTime = "1";	
		
	String userInfoInXml=null;
	////////////////////////////////////////////////	
	/////////////如果访问者是第一次访问或者数据库中还没有该浏览者，就写一个访问者到数据库/////////	 
	if( (firstTime!=null && firstTime.equals("0") ) || userManager.getVisitorState(vid)==null){
		///////////再一次检测vid/////////
		if(vid==null || vid.equals("")){
			firstTime = "0";
			hasVid=false;  //浏览端还未写入vid的cookie 应在后面的javascript中写入
			Calendar c= Calendar.getInstance();
			long time=c.getTimeInMillis();
			while( userManager.hasSameId(String.valueOf(time)) ){ //为新来的访问者获取一个不重复的ID
				c= Calendar.getInstance();
				time=c.getTimeInMillis();
			}
			vid=String.valueOf(time);		
		}	
		////////////////////	 
		if(!userManager.addNewVisitor(vid,"visitor","","","","","","","","","",curURL,remoteIP,frmurl,"ONLINE"))
			return;
		//然后通知站点服务人员，我上线	
		msgManager.sendSayMeLogonMsg(vid,"visitor",curURL);	
		//发信告诉站点服务人员，我进入网页
		userInfoInXml=userManager.getUserInfoInXml(vid,curURL,frmurl,remoteIP,p,userAgent,language);		 	 
		msgManager.sendSayMeOnPageInitMsg(vid,"visitor",curURL,userInfoInXml,"ONPAGEINIT");
		//加入页面访问记录
		/**
		if(lvp==null || (curURL0!=null && !lvp.equals(curURL0)) ) //刷新不记录
			webStat.addNewPageView(curURL0,"<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+userInfoInXml);				**/
	}
	//如果再次上线，发信息通知该网站所有在线的服务人员浏览者上线
	else if(firstTime!=null && firstTime.equals("1") ){	
 	 			 
		if(userManager.getVisitorState(vid).equals("OFFLINE")){ 
			//接着更新我的状态信息
			userManager.changeVisitorLastTime(vid); 	//更新最新访问时间					//更新访问者当前状态为在线
			userManager.changeVisitorState(vid,"ONLINE");  //改变状态为在线
			msgManager.markAllMessagesAsRead(vid);  //把以前的未读短信全置为已读
			//然后通知站点服务人员，我上线	
			msgManager.sendSayMeLogonMsg(vid,"visitor",curURL);
			//发信告诉站点服务人员，我进入网页
			userInfoInXml=userManager.getUserInfoInXml(vid,curURL,frmurl,remoteIP,p,userAgent,language);			 
			msgManager.sendSayMeOnPageInitMsg(vid,"visitor",curURL,userInfoInXml,"ONPAGEINIT");
					
			if(userManager.getVisit(vid).equals(""))
				userManager.setVisit(vid,"1"); //visit---null:初始值 1:访问过本站 2:对过话  	
			//userManager.updateCurrentUrl(vid,curURL0);	不必更新 
			//加入页面访问记录
			//msg.Log.log(userInfoInXml);
			/**
			if(lvp==null || (curURL0!=null && !lvp.equals(curURL0)) ) //刷新不记录
				webStat.addNewPageView(curURL0,"<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+userInfoInXml);				**/
		}
		else{			
			msgManager.sendSayMeGetInPageMsg(vid,curURL,frmurl,curURL0);//发短信告诉在线的服务人员我进入新的面					 
				//加入页面访问记录	
				/**			 
				if(lvp==null || (curURL0!=null && !lvp.equals(curURL0)) ){ //刷新不记录				 
					String userInfoInXml=userManager.getUserInfoInXml(vid,curURL,frmurl,remoteIP,p,userAgent,language);		
 					webStat.addNewPageView(curURL0,"<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+userInfoInXml);
				
				}
				**/
			 	
		    }
		 
	}
 
	////////////////////////////////////////////////
	//记录一条访问记录    网站统计部分作为后续项目	 	 
	long lvt=0;	 //上次访问时间
	try{lvt=Long.parseLong(request.getParameter("rt"));}catch(Exception e){}  	 
	if(System.currentTimeMillis() < lvt + 30000 && (lvp!=null && curURL0!=null && lvp.equals(curURL0))){
		//如果在30秒内访问同一页 不记录pv	 
 	}
	else{
		if(userInfoInXml==null)
			userInfoInXml=userManager.getUserInfoInXml(vid,curURL,frmurl,remoteIP,p,userAgent,language);
		webStat.addNewPageView(curURL0,"<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+userInfoInXml);	
	}
	///////////////////从数据库读取该网站的交谈者，生成xml开始//////////////////////////////	 
	String hosts="";
	//if(floatImgType!=null && !floatImgType.equals("link") )
		hosts=userManager.getSiteUserInXml(curURL);
		
	//if(curURL.indexOf("lipai")>=0)
	//	out.println("alert(\""+hosts+"\");");
	///////////////////从数据库读取该网站的交谈者结束//////////////////////////////		
%>
<%=(floatLogo==null || floatLogo.equals(""))?"var floatLogo=null":"floatLogo=\""+floatLogo+"\";"%>
<%=(floatFoot==null || floatFoot.equals(""))?"var floatFoot=null":"floatFoot=\""+floatFoot+"\";"%>
<%=(guokeLogo==null || guokeLogo.equals(""))?"var guokeLogo=null":"guokeLogo=\""+guokeLogo+"\";"%>
<%=(floatLink==null || floatLink.equals(""))?"var floatLink=\"www.100im.cn\"":"floatLink=\""+floatLink+"\";"%>
<%=(floatLink1==null || floatLink1.equals(""))?"var floatLink1=\"www.100im.cn/dljm.html\"":"floatLink1=\""+floatLink1+"\";"%>
var frmIP='<%=webUrl%>';vid='<%=vid%>';urlhead='<%=urlhead%>';floatfootnote='<%=floatfootnote%>';autohide=<%=autohide%>;floatImgType='<%=floatImgType%>';guokeType='<%=guokeType%>';gkAdvert='<%=gkAdvert%>';gkTopAdvert='<%=gkTopAdvert%>';linkContent='<%=linkContent%>';inviteTime=<%=inviteTime%>;inviteCont='<%=inviteCont%>';
msgscript=document.createElement("Script");
msgscript.id="msgscript";msgscript.language="JavaScript";
var head = document.getElementsByTagName('head')[0]; 
head.appendChild(msgscript);
<%if(floatImgType!=null && !floatImgType.equals("link") ){%>
	//msgscript.src="http://<%=webUrl%>/loadJS.jsp?data=msg"; 
	document.write("<scrip"+"t src='http://<%=webUrl%>/scripts/msg.js'></scrip"+"t>");
<%}%>	
floatscript=document.createElement("Script");
floatscript.id="floatscript";floatscript.language="JavaScript";
head = document.getElementsByTagName('head')[0]; 
head.appendChild(floatscript); 
<%if(floatImgType!=null && ( floatImgType.indexOf("qianru")>=0 || floatImgType.indexOf("link")>=0 || 
	 floatImgType.indexOf("floatAdmin")>=0 || floatImgType.indexOf("floatTalk")>=0 )){%>
	//floatscript.src="http://<%=webUrl%>/loadJS.jsp?data=qianru";
	document.write("<scrip"+"t src='http://<%=webUrl%>/scripts/floatqr.js' charset='gb2312'></scrip"+"t>");
<%}else if(floatImgType!=null && ( floatImgType.indexOf("blue")>=0 || floatImgType.indexOf("green")>=0 
		   || floatImgType.indexOf("red")>=0 || floatImgType.indexOf("silver")>=0 ) ){%>	 
	//floatscript.src="http://<%=webUrl%>/loadJS.jsp?data=float";
	document.write("<scrip"+"t src='http://<%=webUrl%>/scripts/float.js' charset='gb2312'></scrip"+"t>");
<%}%>
//document.write("<scrip"+"t src='http://<%=webUrl%>/scripts/float.js'></scrip"+"t>");
var xmlinvite='<?xml version="1.0" encoding="utf-8"?><style path=""><textlist><text sn="0"><character>您好！有什么可以帮您的？可以和您对话吗？『接受邀请』接受对话邀请！『稍后再说』拒绝邀请，并关闭本消息窗口！</character><color>#0000FF</color><size>13</size><method></method></text><text sn="1"><character>温馨提示：</character><color>#FF0000</color><size>12</size><method></method></text><text sn="2"><character>这是由您浏览的网站人员向您发出的对话邀请，此系统&lt;font color=red&gt;无需安装&lt;/font&gt;任何插件，实现安全的在线对话。</character><color>green</color><size>12</size><method></method></text></textlist><imagelist><image sn="0"><url>topleft.gif</url><alttext>外左上角图片</alttext><method></method></image><image sn="1"><url>topcenter.gif</url><alttext>标题栏背景</alttext><method></method></image><image sn="2"><url>topright.gif</url><alttext>右上角图片</alttext><method></method></image><image sn="3"><url>middleleft.gif</url><alttext>左边框背景</alttext><method></method></image><image sn="4"><url>middleright.gif</url><alttext>右边框背景</alttext><method></method></image><image sn="5"><url>buttomleft.gif</url><alttext>左下角图片</alttext><method></method></image><image sn="6"><url>buttomcenter.gif</url><alttext>底边框背景图片</alttext><method></method></image><image sn="7"><url>buttomright.gif</url><alttext>右下角图片</alttext><method></method></image><image sn="8"><url>move.gif</url><alttext>点击拖动图片</alttext><method></method></image><image sn="9"><url>colsed.gif</url><alttext>关闭按钮图片</alttext><method></method></image><image sn="10"><url>confirm.gif</url><alttext></alttext><method></method></image><image sn="11"><url>confirm0.gif</url><alttext></alttext><method></method></image><image sn="12"><url>cancel.gif</url><alttext></alttext><method></method></image><image sn="13"><url>cancel0.gif</url><alttext></alttext><method></method></image><image sn="14"><url>middlecenter.gif</url><alttext>中间背景图</alttext><method></method></image><image sn="15"><url>kefu.bmp</url><alttext>中间内容图片</alttext><method></method></image><image sn="16"><url>clarity.gif</url><alttext>一个像素的透明图片</alttext><method></method></image></imagelist><widthlist><width sn="0" des="左上角单元格宽度"><value>14</value></width><width sn="1" des="中间宽度"><value>359</value></width><width sn="2" des="右上角单元格宽度"><value>17</value></width><width sn="3" des="对话框表格总宽度"><value>390</value></width></widthlist><heightlist><height sn="0" des="左上角单元格高度"><value>27</value></height><height sn="1" des="中间高度"><value>160</value></height><height sn="2" des="底边框"><value>44</value></height></heightlist><methodlist><method sn="0" des="关闭邀请框"><fun>doAction</fun><param></param></method><method sn="1" des="按钮上鼠标悬停效果"><fun>onmouse</fun><param></param></method><method sn="2" des="[接受邀请]按钮点击方法"><fun>doAction</fun><param></param></method><method sn="3" des="[稍后再说]按钮点击方法"><fun>doAction</fun><param></param></method></methodlist></style>',xmlfloat='<xml><?xml version="1.0" encoding="utf-8"?><float><param><width>118</width><height>105</height></param><head><height>23</height><background>images7/head.gif</background><dragimage>images7/move.gif</dragimage><padding>5px 0px 5px 20px</padding></head><border><leftwidth>5</leftwidth><leftimage>images7/leftborder.gif</leftimage><rigthwidth>5</rigthwidth><rigthimage>images7/rightborder.gif</rigthimage><fillimage>images7/clarity.gif</fillimage></border><centent><width>106</width><height>45</height><border>1px solid #006699</border><background>#FFFFFF</background><group><groupwidth>106</groupwidth><groupheight>19</groupheight><leftbackground>images7/groupleft.gif</leftbackground><centerbackground>images7/groupcenter.gif</centerbackground><rightbackground>images7/groupright.gif</rightbackground><groupfontcolor>#000000</groupfontcolor><grouppadding>3px 0px 0px 0px</grouppadding></group></centent><foot><height>18</height><background>images7/foot.gif</background><text>'+floatLink1+'</text><footimg>images7/slt.gif</footimg><link>javascript:window.open("http://'+floatLink1+'");</link><padding>1px 0px 0px 0px</padding></foot><hiddenccontrol><hiddenimage>images7/colsed_2.gif</hiddenimage><displayimage>images7/colsed_1.gif</displayimage><flagimage>images7/talk.gif</flagimage><fontcolor>#990000</fontcolor><position>position:absolute;left:110px;top:23px;</position></hiddenccontrol></float></xml>',align="left",xpos=0,ypos=<%=floatTopY%>,lancode="";
var thehostids;
if (navigator.appName == 'Netscape') {	
	thehostids='<%=userManager.getSiteUserInXml_(curURL)%>'; 
}
else
   document.write("<%=hosts%>"); 
 
function addCookie(name, value, expires, path, domain, secure){
	var expString    = ((expires == null)? "" : ("; expires=" + expires.toGMTString()));
	var pathString   = ((path == null)   ? "" : ("; path   =" + path));
	var domainString = ((domain == null) ? "" : ("; domain =" + domain));
	var secureString = ((secure == true) ? "; secure" : "");
	var cookiev      = name+"="+value+expString+pathString+domainString+secureString;
	document.cookie  = cookiev;
}
var expDate   = new Date();
expDate.setTime( expDate.getTime() + 365 * 24 * 60 * 60 * 1000);
<%
	if(hasVid==false){
%>   
	try{addCookie("vMAC", "lhs(<%=vid%>)", expDate, "/", null, false);	}catch(e){}
<%}%> 
try{addCookie("rt", "lhs(<%=String.valueOf(System.currentTimeMillis())%>)", expDate, "/", null, false);	}catch(e){}	
try{addCookie("lvp", "lhs("+escape("<%=curURL0%>")+")", expDate, "/", null, false);	}catch(e){}
document.write("<scrip"+"t src='http://tag.webnibbler.com.cn/tag_cnsimple.js'></scrip"+"t>");
 