<%@page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*"%>
<jsp:useBean id="msgManager" scope="page"  class="msg.MsgManager" /> 
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" /> 

<%
	String jspReferer=request.getHeader("Referer");
	if(jspReferer==null || jspReferer.equals("")){ //如果直接访问本页 那就什莫也不做
		out.println("Are you sure? Baby!");
		return;
	}	 
	//ResultSet  rs=null;
	//禁止缓存，否则表visiotr时间lastTime无法更新
	response.setHeader("Cache-Control","no-store");
	response.setHeader("Pragrma","no-cache");
	response.setDateHeader("Expires",0);
	/////////////////////////////////////////////
	String a=request.getParameter("a");	
	String msg= request.getParameter("msg");		 
	//new String( (request.getParameter("msg")).getBytes("iso-8859-1"),"gb2312");
	String vid=request.getParameter("vid");	 
	String toid=request.getParameter("toid");
 	String tid=request.getParameter("tid"); //转接到的id
	String tp=request.getParameter("tp");	 
	String mm=request.getParameter("mm"); //while mm=true: 手机短信
	String phone=request.getParameter("phone"); //服务人员电话号码
	String ip=request.getRemoteAddr(); //访问者的IP
	String frmurl=request.getParameter("url"); //访问者的来于网址
	String crcIds=request.getParameter("crcIds");//用来返回给服务器以校验短信息获取与否
	String counter=request.getParameter("counter");//浏览者对话窗口计秒器
	
 	////整理frmurl///////
	//int index=-1;
	//if(frmurl!=null && (index=frmurl.indexOf("://"))>=0 )
	//	frmurl=frmurl.substring(index+3);
	//if(frmurl!=null && (index=frmurl.indexOf("/"))>=0 )
	//	frmurl=frmurl.substring(0,index);
	if(frmurl!=null)
		frmurl=Keyword.getCleanURL(frmurl);	
	//frmurl="www.netalker.com.cn"; //调试用
	
	Calendar now= Calendar.getInstance();
	String nowStr=String.valueOf(now.get(Calendar.YEAR))+"-"+String.valueOf(now.get(Calendar.MONTH)+1)+"-"+
				  String.valueOf(now.get(Calendar.DAY_OF_MONTH))+" "+String.valueOf(now.get(Calendar.HOUR_OF_DAY))+":"+
				  String.valueOf(now.get(Calendar.MINUTE))+":"+String.valueOf(now.get(Calendar.SECOND));	
	//Message(String id,String fromId,String toId,String content,String sendTime,String readTime,String type,boolean read)
	//读取信息	 
	if(a!=null){
		if(a.equals("1") ){ // a=1客户端读取短信
		 	//Log.log(request.getQueryString() );  	
			if(crcIds!=null && !crcIds.equals("")){
				String[] messageIds=null;
				StringTokenizer st = new StringTokenizer(crcIds,",");	
				messageIds=new String[st.countTokens()];
				for(int i=0;i<messageIds.length && st.hasMoreTokens();i++)
					messageIds[i]=st.nextToken();	
				msgManager.markMessageAsRead(messageIds);	
			}							 
			Message[] messages=msgManager.readMsg(vid);		
			 //Log.log(messages[0].getType());	 
 			out.println(msgManager.readMsgInXml(messages)); 		 
		}
		else if(a.equals("11") ){ // a=11浏览者对话窗口读取短信	 
			//Log.log(request.getQueryString() ); 
			if(counter!=null && counter.equals("15")) {//每15秒更新一次
				userManager.changeVisitorLastTime(vid); 
				String state=userManager.getVisitorState(vid);		
				if(state!=null && !state.equals("TALKING")){ 
					msgManager.sendSayMeLogonMsg(vid,"visitor",frmurl);				 
					String remoteIP= request.getRemoteAddr();
					String userAgent = request.getHeader("User-Agent"); 
					String language=request.getHeader("Accept-Language");  //浏览者浏览器语言
					String userInfoInXml=userManager.getUserInfoInXml(vid,frmurl,"",remoteIP,"",userAgent,language);					 			 
					msgManager.sendSayMeOnPageInitMsg(vid,"visitor",frmurl,userInfoInXml,"ONPAGEINIT");

 					userManager.changeVisitorState(vid,"TALKING");
					msgManager.sendMsg(new msg.Message(vid,toid,"","ONTALK"));
					msgManager.sendMsgToStuff(vid,"visitor",frmurl,"TALKING","STATECHANGE"); 
		 		}
			}	
			if(crcIds!=null && !crcIds.equals("")){				
				String[] messageIds=null;
				StringTokenizer st = new StringTokenizer(crcIds,",");	
				messageIds=new String[st.countTokens()];
				for(int i=0;i<messageIds.length && st.hasMoreTokens();i++)
					messageIds[i]=st.nextToken();	
				msgManager.markMessageAsRead(messageIds);	
			}				
			Message[] messages=msgManager.readMsg0(vid,toid);				 
 			out.println(msgManager.readMsgInXml(messages)); 				
 		}
		else if(a.equals("10") ){ // a=10时为客户端读取短信 每1分钟读一次
		 	//Log.log(request.getQueryString() );			 
			userManager.changeUserLastTime(vid);
			String state=userManager.getUserState(vid);		
			if(state.equals("OFFLINE")){ 
				userManager.changeUserState(vid,"ONLINE");  //改变状态为在线
				String curURLx=userManager.getUserDomain(vid);  
 				String hostInfoInXmlx=userManager.getHostInfoInXml(vid);	 
 				hostInfoInXmlx=Escape.escape(hostInfoInXmlx);
  				msgManager.sendSayMeOnPageInitMsg(vid,"stuff",curURLx,hostInfoInXmlx,"STATECHANGE");
				msgManager.sendSayMeLogonMsg(vid,"stuff",curURLx);
				msgManager.tellGroupsImOnlineMsg(vid);//通知群我上线
				msgManager.tellFriendsImOnlineMsg(vid);//通知好友我上线
			}
			if(crcIds!=null && !crcIds.equals("")){
				String[] messageIds=null;
				StringTokenizer st = new StringTokenizer(crcIds,",");	
				messageIds=new String[st.countTokens()];
				for(int i=0;i<messageIds.length && st.hasMoreTokens();i++)
					messageIds[i]=st.nextToken();	
				msgManager.markMessageAsRead(messageIds);	
			}	
			//userManager.checkVisitorOnlineAndSendMsg(vid,600000); //30秒						 
			Message[] messages=msgManager.readMsg(vid);				 
 			out.println(msgManager.readMsgInXml(messages)); 	
		}
		else if(a.equals("3") ){ //a=3时为浏览者浮动窗口读取短信 每15秒读一次 
 			//Log.log(request.getQueryString() );  	
		 	userManager.changeVisitorLastTime(vid);
			//userManager.putLostVisitorAndUserToOffline(); 
			//把所有最后更新时间早于当前时间600秒的浏览者和客户端置于离线状态
			String state=userManager.getVisitorState(vid);		
			if(state!=null && state.equals("OFFLINE")){ 
				//处理因网络不通时访问者没有更新访问时间而被置为离线，但网络恢复候的情况  
				userManager.changeVisitorState(vid,"ONLINE");  //改变状态为在线
				msgManager.sendSayMeLogonMsg(vid,"visitor",frmurl);
				//发信告诉站点服务人员，我进入网页
				String remoteIP= request.getRemoteAddr();
				String userAgent = request.getHeader("User-Agent"); 
				String language=request.getHeader("Accept-Language");  //浏览者浏览器语言
				String userInfoInXml=userManager.getUserInfoInXml(vid,frmurl,"",remoteIP,"",userAgent,language);	
				//Log.log(userInfoInXml);  			 
				msgManager.sendSayMeOnPageInitMsg(vid,"visitor",frmurl,userInfoInXml,"ONPAGEINIT");
				 
			} 
			//if(state.equals("ONLINE")){ 
			else{
				if(crcIds!=null && !crcIds.equals("")){
					String[] messageIds=null;
					StringTokenizer st = new StringTokenizer(crcIds,",");	
					messageIds=new String[st.countTokens()];
					for(int i=0;i<messageIds.length && st.hasMoreTokens();i++)
						messageIds[i]=st.nextToken();	
					msgManager.markMessageAsRead(messageIds);
				}
 				Message[] messages=msgManager.readMsg(vid); 
				/**
				if(messages!=null && messages.length>0)				 
					out.println(msgManager.readMsgInXml1(messages));
				else
					out.println(msgManager.readMsgInXml1(msgManager.readMsg1(vid)));
				**/
				
				Message[] messages1=msgManager.readMsg1(vid);
				if(messages==null)
					messages=new Message[0];
				if(messages1==null)
					messages1=new Message[0];
				Message[] messages2=new Message[messages.length+messages1.length];
				for(int i=0;i<messages.length;i++)
					messages2[i]=messages[i];
				for(int i=0;i<messages1.length;i++)
					messages2[messages.length+i]=messages1[i];
				if(messages2.length>0)
					out.println(msgManager.readMsgInXml1(messages2));
				//Log.log(msgManager.readMsgInXml1(msgManager.readMsg1(vid)));
/**	
				//////////////如果收到客户端上线的消息，告诉他我在线////////////////
				String remoteIP=null,userAgent=null,language=null,userInfoInXml=null;
				for(int i=0;messages!=null && i<messages.length;i++){
					
					if(messages[i].getType().equals("STATECHANGE") && messages[i].getContent().equals("ONLINE")){
						if(remoteIP==null) remoteIP= request.getRemoteAddr();
						if(userAgent==null) userAgent = request.getHeader("User-Agent"); 
						if(language==null) language=request.getHeader("Accept-Language");  //浏览者浏览器语言
						if(userInfoInXml==null) userInfoInXml=userManager.getUserInfoInXml(vid,frmurl,"",remoteIP,"",userAgent,language);
						msgManager.sendMsg(new msg.Message(vid,messages[i].getFromId(),"STATECHANGE","ONLINE")); 
						msgManager.sendMsg(new msg.Message(vid,messages[i].getFromId(),userInfoInXml,"ONPAGEINIT")); 

					}
				}
				//////////////////////////////////////////
**/				 
			}
			//else{	
 				//Message[] messages=msgManager.readMsg1(vid);					 
 				//out.println(msgManager.readMsgInXml1(msgManager.readMsg1(vid)));		 
 				//}
		}	
		 
		else if(a.equals("2") ){ //浏览者或服务人员发送信息		
			//Log.log(request.getQueryString() ); 			 
			//以下先将msg解码unescape 无需解码
			try{
				String theQuery=request.getQueryString(); 			 
				StringTokenizer st = new StringTokenizer(theQuery,"&");	
				String theMsg=null;
				while(st.hasMoreTokens()){
				 	theMsg=st.nextToken();				 
					if(theMsg!=null && theMsg.startsWith("msg") ){
						msg=theMsg.substring(4);
						//msg=Escape.unescape(msg);
						break;
					}					
				}
				if(msg==null || msg.equals("")|| msg.equals("null"))
					msg=request.getParameter("msg");
				if(msg==null || msg.equals("")|| msg.equals("null"))
					return;
			}catch(Exception e){Log.log("发送短信时出错："+e.getMessage());}
			boolean isVisitor=( (request.getParameter("b")) == null )?true:false;//客户端发送信息时带有参数b=1
			String gid=request.getParameter("gid"); //发往群组的id
			String domainId="";
			if(isVisitor==true){
				String vistorState=userManager.getVisitorState(vid);
				if(vistorState==null){ //如果数据库里没有这个访问者 取客服人员的网站id
					domainId=userManager.getUserDomainId(toid);
					if(domainId!=null && domainId.indexOf(",")>0)				
						domainId=domainId.substring(0,domainId.indexOf(","));
				}
				else{					
					domainId=userManager.getVisitorDomainId(vid);
					String frm=request.getParameter("frm"); //若从留言页面leaveMsg.jsp(该页面发送参数frm)来，不进入对话
					if( vistorState!=null && !vistorState.equals("TALKING") &&  frm==null ){	
						userManager.changeVisitorState(vid,"TALKING");	
						msgManager.sendSayMeLogonMsg(vid,"visitor",frmurl);				 
						String remoteIP= request.getRemoteAddr();
						String userAgent = request.getHeader("User-Agent"); 
						String language=request.getHeader("Accept-Language");  //浏览者浏览器语言
						String userInfoInXml=userManager.getUserInfoInXml(vid,frmurl,"",remoteIP,"",userAgent,language);					 			 
						msgManager.sendSayMeOnPageInitMsg(vid,"visitor",frmurl,userInfoInXml,"ONPAGEINIT");
	
						userManager.changeVisitorState(vid,"TALKING");
						msgManager.sendMsg(new msg.Message(vid,toid,"","ONTALK"));
						msgManager.sendMsgToStuff(vid,"visitor",frmurl,"TALKING","STATECHANGE"); 	
					}
				}			
			}
			else{
				if( userManager.getUserState(vid).equals("OFFLINE") )	
					userManager.changeUserState(vid,"TALKING");	
				
				//如果是发往群组或好友或同事,就从发往者的第一个网站上扣取信用点 否则从访问者所在网站扣取
				if(gid==null && (request.getParameter("friend")==null) && (request.getParameter("mate")==null)) 
					domainId=userManager.getVisitorDomainId(toid); 
				if(domainId==null){
					domainId=userManager.getUserDomainId(vid);
					if(domainId!=null && domainId.indexOf(",")>0)				
						domainId=domainId.substring(0,domainId.indexOf(","));
				}						 
				//如果是客服发信息且有多个域名时，就取接收者的domainId
				//Log.log(gid+" "+request.getParameter("friend")+" "+request.getParameter("mate")+" "+domainId+" "+vid);
			}		
			//Log.log(domainId);	 
			//检查网站是否有足够的信用点 发手机短信时跳过
			
 			if( !(mm!=null && mm.equals("true") ) && !userManager.hasMoreCredit(domainId) ){				 
				if(userManager.getSitePayLevel(domainId)==1){
					userManager.degradeSiteToStandard(domainId); //降级站点为标准版
					msgManager.sendMsg(new msg.Message("0",vid,"该网站信用点不足，"+
								"并且已经被降为标准版，无法收发信息，部分功能已不能使用，请联系淘客客服","SYSNOTIFY"));
				}
				else
					msgManager.sendMsg(new msg.Message("0",vid,"该网站信用点不足，"+
										"无法收发信息，增加信用点请联系淘客客服","SYSNOTIFY"));
				return;
			}
			//Log.log(request.getQueryString() );  
			if(gid!=null ){ //发送群组消息
					int numberOfMessages=msgManager.sendGroupsMsg(vid,gid,msg);						 
					userManager.dealCredit(domainId,numberOfMessages);	
					return;
			}
			//浏览者作为过客发消息:发给所有同一网站的浏览者和客服
			else if(request.getParameter("guoke")!=null && request.getParameter("guoke").equals("true")){	
				msgManager.sendGuokeMsgToAll(vid,frmurl,msg);
				if(msg!=null && (msg.equals("OPENGUOKE")||msg.equals("CLOSEGUOKE")) )
					return;			//过客窗打开或关闭消息不扣信用点
			}
			else if(mm!=null && mm.equals("true")){//发送短信	
				if(!userManager.hasMoreSmsCredit(domainId)){
					msgManager.sendMsg(new msg.Message("0",vid,"该网站手机短信信用点不足，无法收发手机短信。","SYSNOTIFY")); 
					return;
				}			
				msgManager.sendMsg(new msg.Message(vid,toid,msg,"TALKMSG","4")); //记录短信
				userManager.sendSms(vid,domainId,userManager.getMobileNumber(toid),Escape.unescape(msg));
				//userManager.dealSmsCredit(domainId,1);	//已经改为发送后自动减去信用点
				//return;					
			}			 
			else if(isVisitor==true && userManager.getUserState(toid).equals("OFFLINE") )	
				msgManager.sendMsg(new msg.Message(vid,toid,msg,"TALKMSG","2")); //发送留言
			else if(request.getParameter("gg")!=null && request.getParameter("gg").equals("true")){ //发送广告
				if(userManager.getSitePayLevel(domainId)<=0)
					msgManager.sendMsg(new msg.Message("0",vid,"标准版不可以推送广告，申请请联系淘客客服。","SYSNOTIFY")); 
				else
					msgManager.sendMsg(new msg.Message(vid,toid,msg,"ADVERT")); 		
			}
			else if(request.getParameter("gk")!=null && request.getParameter("gk").equals("true")){//客户端发送过客消息
				if( userManager.getSitePayLevel(domainId)<=0 )
					msgManager.sendMsg(new msg.Message("0",vid,"标准版不可以发过客消息，申请请联系淘客客服。","SYSNOTIFY"));
				else	
					msgManager.sendMsg(new msg.Message(vid,toid,msg,"GKMSG"));
			}
			else
				msgManager.sendMsg(new msg.Message(vid,toid,msg,"TALKMSG"));
 			//扣去信用点,增加本月短信息条数				 
			userManager.dealCredit(domainId,1);
			
		}
		else if(a.equals("4") ){ //服务人员发出邀请信息
			//以下先将msg解码unescape 
			try{
				String theQuery=request.getQueryString(); 			 
				StringTokenizer st = new StringTokenizer(theQuery,"&");	
				String theMsg=null;
				while(st.hasMoreTokens()){
				 	theMsg=st.nextToken();				 
					if(theMsg!=null && theMsg.startsWith("msg") ){
						msg=theMsg.substring(4);
						msg=Escape.unescape(msg);
						break;
					}					
				}				 
			}catch(Exception e){Log.log("发送短信时出错："+e.getMessage());}	
			
 			userManager.changeUserState(vid,"TALKING");	 			 			 
 			if(userManager.getVisitorState(toid).equals("OFFLINE"))
				msgManager.sendMsg(new msg.Message(toid,vid,"","FLINVITATION"));
			else{
				msgManager.sendMsg(new msg.Message(vid,toid,Escape.escape(msg),"INVITATION"));
				msgManager.sendMsg(new msg.Message(toid,vid,"","SHINVITATION"));
			}
			
		}
		else if(a.equals("5") ){ //访问者离线或进入新的页面
		  /**
			if(!userManager.getVisitorState(vid).equals("TALKING")){ //如果浏览者聊天过程中进入新的页面，不可置为离线
				//userManager.changeState(vid,"OFFLINE");
				//msgManager.sendSayMeLogoffMsg(vid,"visitor");
			}
		  **/
		}
		else if(a.equals("8") ){//客户端离线
			userManager.changeUserState(vid,"OFFLINE");
			msgManager.sendSayMeLogoffMsg(vid,"stuff");		
			msgManager.tellGroupsImOfflineMsg(vid);	 
			msgManager.tellFriendsImOfflineMsg(vid);	
		}
		else if(a.equals("9")||a.equals("19") ){//浏览者(19)或服务人员(9)发送键盘信息
			//userManager.changeState(vid,"BUSY"); // 
			try{
				String theQuery=request.getQueryString(); 			 
				StringTokenizer st = new StringTokenizer(theQuery,"&");	
				String theMsg=null;
				while(st.hasMoreTokens()){
				 	theMsg=st.nextToken();				 
					if(theMsg!=null && theMsg.startsWith("msg") ){
						msg=theMsg.substring(4);
						//msg=Escape.unescape(msg);
						break;
					}					
				}
			}catch(Exception e){Log.log("发送短信时出错："+e.getMessage());}
			msgManager.sendMsg(new msg.Message(vid,toid,msg,"KEYSTATUS"));
		}
		else if(a.equals("6") ){//浏览者关闭对话窗口	
			String visit=userManager.getVisit(vid);		
			if(visit!=null && ( visit.equals("null") || visit.equals("")) )
						userManager.setVisit(vid,"1"); //visit---null:初始值 1:访问过本站 2:对过话 
			msgManager.sendMsg(new msg.Message(vid,toid,"","OFFTALK"));
			msgManager.sendMsgToStuff(vid,"visitor",frmurl,"OFFTALK","STATECHANGE"); //告诉所有同网站的客服 我退出对话状态
			if(!userManager.isOnline(vid,20)){ //如果最后更新时间早于现在30秒，视为离线
				userManager.changeVisitorState(vid,"OFFLINE");  
				msgManager.sendSayMeLogoffMsg(vid,"visitor");
			}
			else
				userManager.changeVisitorState(vid,"ONLINE"); 
			 				
		}
		else if(a.equals("13") ){//浏览者拒绝接收对话邀请				 
			msgManager.sendMsg(new msg.Message(vid,toid,"","RJINVITATION"));
		}
		else if(a.equals("14") ){//服务人员要求结束对话	
			//userManager.changeState(toid,"ONLINE"); // 		 
			msgManager.sendMsg(new msg.Message(vid,toid,"","TERMINATE"));
		}
		else if(a.equals("17") ){//服务人员通知对方将对话转移给另外的服务人员	 
			msgManager.sendMsg(new msg.Message(vid,toid,tid+","+(new User(tid)).getName(),"TRANSFER"));
		}
		else if(a.equals("20") ){//服务人员通知对方自己的状态改变			 	
			userManager.changeUserState(vid,msg); // 
			msgManager.sendChangeStateMsg(vid,frmurl,msg);
		}
		else if(a.equals("200") ){//接通电话			 	
			 if(phone!=null && !phone.equals("")){
			 	String workphone=userManager.getWorkPhone(toid);
				if(workphone!=null && !workphone.startsWith("0"))
					workphone ="0"+workphone;
				String bindTel=userManager.getBindTel(toid);				 
				String url="http://221.122.60.186/user/dc/Call_act.asp";
				if(phone!=null && !phone.startsWith("0"))
					phone ="0"+phone;
				url +="?BindCaller="+phone;
				url +="&allCalled="+workphone;
				url +="&ChargeCallNum="+bindTel;
				url +="&userId="+ toid;
//Log.log(url);  	
 				HttpURLConnection hc=(HttpURLConnection)(new URL(url).openConnection()); 	         
                int re=hc.getResponseCode(); 
				//Log.log(String.valueOf(re));
		  		hc.disconnect(); //release the http connection
			 }
		}
		else if(a.equals("250") ){//服务人员标注浏览者信息	 
			String name="",sex="",workphone="",mobilephone="",sht="",email="",qq="",msn="",address="";
			try{
				String theQuery=request.getQueryString(); 			 
				StringTokenizer st = new StringTokenizer(theQuery,"&");	
				String theMsg=null;
				while(st.hasMoreTokens()){
				 	theMsg=st.nextToken();				 
					if(theMsg!=null && theMsg.startsWith("msg") ){
						msg=theMsg.substring(4);
						msg=Escape.unescape(msg);
						break;
					}					
				}
				st = new StringTokenizer(msg,"<>? \"=");	
				//<?xml version="1.0" encoding="unicode"?><contact name="张三" sex="1" workphone="51668337" 
				//mobilephone="13712345678" sht="83012345" email="qq3yan.com" qq="12345667" msn="aayahoo.com" 	
				//address="www.3yan.com">
				
				String temp="";
				while(st.hasMoreTokens()){
					temp=st.nextToken();			 
					if(temp.equals("name")) name=st.nextToken();
					else if(temp.equals("sex")) sex=st.nextToken();
					else if(temp.equals("workphone")) workphone=st.nextToken();
					else if(temp.equals("mobilephone")) mobilephone=st.nextToken();
					else if(temp.equals("sht")) sht=st.nextToken();
					else if(temp.equals("email")) email=st.nextToken();
					else if(temp.equals("qq")) qq=st.nextToken();
					else if(temp.equals("msn")) msn=st.nextToken();
					else if(temp.equals("address")) address=st.nextToken();	
 				}	
			}catch(Exception e){Log.log("标注浏览者信息时出错："+e.getMessage());}	
				if(name==null || name.equals("")||name.equals("null"))
					return;				
				if(sex!=null && sex.equals("1")) sex="男"; else sex="女";
				if(sex==null) sex="";if(workphone==null) workphone="";if(mobilephone==null) mobilephone="";
				if(sht==null) sht="";if(email==null) email="";if(qq==null) qq="";
				if(msn==null) msn="";if(address==null) address=""; 				 
				userManager.updateVisitorInfo(toid,name,sex,workphone,mobilephone,sht,email,qq,msn,address); //
				String contactMsg="<contact name=\""+name+"\" sex=\""+sex+"\" workphone=\""+workphone+"\" mobilephone=\""+
								  mobilephone+"\" sht=\""+sht+"\" email=\""+email+"\" qq=\""+qq+"\" msn=\""+msn+"\" address=\""+
								  address+"\" type=\"\"/>"; 
				msgManager.sendMsg(new msg.Message(toid,vid,contactMsg,"SETNOTE"));
			
		}
		else if(a.equals("255") ){//服务人员删除标注浏览者信息	
			userManager.updateVisitorInfo(toid,"","","","","","","","",""); //	
			msgManager.sendMsg(new msg.Message(toid,vid,"","DELNOTE"));	
		}
		else if(a.equals("100") ){//浏览者将对话内容发送邮件	
			 String emailAddress=request.getParameter("to");
			 String content=request.getParameter("content");
			 //to do
		}
		else
		{
			Log.log(request.getQueryString() );  		
		}
		//userManager.deleteMessage();
	}
 
%>
 
