<%@page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*"%>
<jsp:useBean id="msgManager" scope="page"  class="msg.MsgManager" /> 
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" /> 

<%
	String jspReferer=request.getHeader("Referer");
	if(jspReferer==null || jspReferer.equals("")){ //���ֱ�ӷ��ʱ�ҳ �Ǿ�ʲĪҲ����
		out.println("Are you sure? Baby!");
		return;
	}	 
	//ResultSet  rs=null;
	//��ֹ���棬�����visiotrʱ��lastTime�޷�����
	response.setHeader("Cache-Control","no-store");
	response.setHeader("Pragrma","no-cache");
	response.setDateHeader("Expires",0);
	/////////////////////////////////////////////
	String a=request.getParameter("a");	
	String msg= request.getParameter("msg");		 
	//new String( (request.getParameter("msg")).getBytes("iso-8859-1"),"gb2312");
	String vid=request.getParameter("vid");	 
	String toid=request.getParameter("toid");
 	String tid=request.getParameter("tid"); //ת�ӵ���id
	String tp=request.getParameter("tp");	 
	String mm=request.getParameter("mm"); //while mm=true: �ֻ�����
	String phone=request.getParameter("phone"); //������Ա�绰����
	String ip=request.getRemoteAddr(); //�����ߵ�IP
	String frmurl=request.getParameter("url"); //�����ߵ�������ַ
	String crcIds=request.getParameter("crcIds");//�������ظ���������У�����Ϣ��ȡ���
	String counter=request.getParameter("counter");//����߶Ի����ڼ�����
	
 	////����frmurl///////
	//int index=-1;
	//if(frmurl!=null && (index=frmurl.indexOf("://"))>=0 )
	//	frmurl=frmurl.substring(index+3);
	//if(frmurl!=null && (index=frmurl.indexOf("/"))>=0 )
	//	frmurl=frmurl.substring(0,index);
	if(frmurl!=null)
		frmurl=Keyword.getCleanURL(frmurl);	
	//frmurl="www.netalker.com.cn"; //������
	
	Calendar now= Calendar.getInstance();
	String nowStr=String.valueOf(now.get(Calendar.YEAR))+"-"+String.valueOf(now.get(Calendar.MONTH)+1)+"-"+
				  String.valueOf(now.get(Calendar.DAY_OF_MONTH))+" "+String.valueOf(now.get(Calendar.HOUR_OF_DAY))+":"+
				  String.valueOf(now.get(Calendar.MINUTE))+":"+String.valueOf(now.get(Calendar.SECOND));	
	//Message(String id,String fromId,String toId,String content,String sendTime,String readTime,String type,boolean read)
	//��ȡ��Ϣ	 
	if(a!=null){
		if(a.equals("1") ){ // a=1�ͻ��˶�ȡ����
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
		else if(a.equals("11") ){ // a=11����߶Ի����ڶ�ȡ����	 
			//Log.log(request.getQueryString() ); 
			if(counter!=null && counter.equals("15")) {//ÿ15�����һ��
				userManager.changeVisitorLastTime(vid); 
				String state=userManager.getVisitorState(vid);		
				if(state!=null && !state.equals("TALKING")){ 
					msgManager.sendSayMeLogonMsg(vid,"visitor",frmurl);				 
					String remoteIP= request.getRemoteAddr();
					String userAgent = request.getHeader("User-Agent"); 
					String language=request.getHeader("Accept-Language");  //��������������
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
		else if(a.equals("10") ){ // a=10ʱΪ�ͻ��˶�ȡ���� ÿ1���Ӷ�һ��
		 	//Log.log(request.getQueryString() );			 
			userManager.changeUserLastTime(vid);
			String state=userManager.getUserState(vid);		
			if(state.equals("OFFLINE")){ 
				userManager.changeUserState(vid,"ONLINE");  //�ı�״̬Ϊ����
				String curURLx=userManager.getUserDomain(vid);  
 				String hostInfoInXmlx=userManager.getHostInfoInXml(vid);	 
 				hostInfoInXmlx=Escape.escape(hostInfoInXmlx);
  				msgManager.sendSayMeOnPageInitMsg(vid,"stuff",curURLx,hostInfoInXmlx,"STATECHANGE");
				msgManager.sendSayMeLogonMsg(vid,"stuff",curURLx);
				msgManager.tellGroupsImOnlineMsg(vid);//֪ͨȺ������
				msgManager.tellFriendsImOnlineMsg(vid);//֪ͨ����������
			}
			if(crcIds!=null && !crcIds.equals("")){
				String[] messageIds=null;
				StringTokenizer st = new StringTokenizer(crcIds,",");	
				messageIds=new String[st.countTokens()];
				for(int i=0;i<messageIds.length && st.hasMoreTokens();i++)
					messageIds[i]=st.nextToken();	
				msgManager.markMessageAsRead(messageIds);	
			}	
			//userManager.checkVisitorOnlineAndSendMsg(vid,600000); //30��						 
			Message[] messages=msgManager.readMsg(vid);				 
 			out.println(msgManager.readMsgInXml(messages)); 	
		}
		else if(a.equals("3") ){ //a=3ʱΪ����߸������ڶ�ȡ���� ÿ15���һ�� 
 			//Log.log(request.getQueryString() );  	
		 	userManager.changeVisitorLastTime(vid);
			//userManager.putLostVisitorAndUserToOffline(); 
			//������������ʱ�����ڵ�ǰʱ��600�������ߺͿͻ�����������״̬
			String state=userManager.getVisitorState(vid);		
			if(state!=null && state.equals("OFFLINE")){ 
				//���������粻ͨʱ������û�и��·���ʱ�������Ϊ���ߣ�������ָ�������  
				userManager.changeVisitorState(vid,"ONLINE");  //�ı�״̬Ϊ����
				msgManager.sendSayMeLogonMsg(vid,"visitor",frmurl);
				//���Ÿ���վ�������Ա���ҽ�����ҳ
				String remoteIP= request.getRemoteAddr();
				String userAgent = request.getHeader("User-Agent"); 
				String language=request.getHeader("Accept-Language");  //��������������
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
				//////////////����յ��ͻ������ߵ���Ϣ��������������////////////////
				String remoteIP=null,userAgent=null,language=null,userInfoInXml=null;
				for(int i=0;messages!=null && i<messages.length;i++){
					
					if(messages[i].getType().equals("STATECHANGE") && messages[i].getContent().equals("ONLINE")){
						if(remoteIP==null) remoteIP= request.getRemoteAddr();
						if(userAgent==null) userAgent = request.getHeader("User-Agent"); 
						if(language==null) language=request.getHeader("Accept-Language");  //��������������
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
		 
		else if(a.equals("2") ){ //����߻������Ա������Ϣ		
			//Log.log(request.getQueryString() ); 			 
			//�����Ƚ�msg����unescape �������
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
			}catch(Exception e){Log.log("���Ͷ���ʱ����"+e.getMessage());}
			boolean isVisitor=( (request.getParameter("b")) == null )?true:false;//�ͻ��˷�����Ϣʱ���в���b=1
			String gid=request.getParameter("gid"); //����Ⱥ���id
			String domainId="";
			if(isVisitor==true){
				String vistorState=userManager.getVisitorState(vid);
				if(vistorState==null){ //������ݿ���û����������� ȡ�ͷ���Ա����վid
					domainId=userManager.getUserDomainId(toid);
					if(domainId!=null && domainId.indexOf(",")>0)				
						domainId=domainId.substring(0,domainId.indexOf(","));
				}
				else{					
					domainId=userManager.getVisitorDomainId(vid);
					String frm=request.getParameter("frm"); //��������ҳ��leaveMsg.jsp(��ҳ�淢�Ͳ���frm)����������Ի�
					if( vistorState!=null && !vistorState.equals("TALKING") &&  frm==null ){	
						userManager.changeVisitorState(vid,"TALKING");	
						msgManager.sendSayMeLogonMsg(vid,"visitor",frmurl);				 
						String remoteIP= request.getRemoteAddr();
						String userAgent = request.getHeader("User-Agent"); 
						String language=request.getHeader("Accept-Language");  //��������������
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
				
				//����Ƿ���Ⱥ�����ѻ�ͬ��,�ʹӷ����ߵĵ�һ����վ�Ͽ�ȡ���õ� ����ӷ�����������վ��ȡ
				if(gid==null && (request.getParameter("friend")==null) && (request.getParameter("mate")==null)) 
					domainId=userManager.getVisitorDomainId(toid); 
				if(domainId==null){
					domainId=userManager.getUserDomainId(vid);
					if(domainId!=null && domainId.indexOf(",")>0)				
						domainId=domainId.substring(0,domainId.indexOf(","));
				}						 
				//����ǿͷ�����Ϣ���ж������ʱ����ȡ�����ߵ�domainId
				//Log.log(gid+" "+request.getParameter("friend")+" "+request.getParameter("mate")+" "+domainId+" "+vid);
			}		
			//Log.log(domainId);	 
			//�����վ�Ƿ����㹻�����õ� ���ֻ�����ʱ����
			
 			if( !(mm!=null && mm.equals("true") ) && !userManager.hasMoreCredit(domainId) ){				 
				if(userManager.getSitePayLevel(domainId)==1){
					userManager.degradeSiteToStandard(domainId); //����վ��Ϊ��׼��
					msgManager.sendMsg(new msg.Message("0",vid,"����վ���õ㲻�㣬"+
								"�����Ѿ�����Ϊ��׼�棬�޷��շ���Ϣ�����ֹ����Ѳ���ʹ�ã�����ϵ�ԿͿͷ�","SYSNOTIFY"));
				}
				else
					msgManager.sendMsg(new msg.Message("0",vid,"����վ���õ㲻�㣬"+
										"�޷��շ���Ϣ���������õ�����ϵ�ԿͿͷ�","SYSNOTIFY"));
				return;
			}
			//Log.log(request.getQueryString() );  
			if(gid!=null ){ //����Ⱥ����Ϣ
					int numberOfMessages=msgManager.sendGroupsMsg(vid,gid,msg);						 
					userManager.dealCredit(domainId,numberOfMessages);	
					return;
			}
			//�������Ϊ���ͷ���Ϣ:��������ͬһ��վ������ߺͿͷ�
			else if(request.getParameter("guoke")!=null && request.getParameter("guoke").equals("true")){	
				msgManager.sendGuokeMsgToAll(vid,frmurl,msg);
				if(msg!=null && (msg.equals("OPENGUOKE")||msg.equals("CLOSEGUOKE")) )
					return;			//���ʹ��򿪻�ر���Ϣ�������õ�
			}
			else if(mm!=null && mm.equals("true")){//���Ͷ���	
				if(!userManager.hasMoreSmsCredit(domainId)){
					msgManager.sendMsg(new msg.Message("0",vid,"����վ�ֻ��������õ㲻�㣬�޷��շ��ֻ����š�","SYSNOTIFY")); 
					return;
				}			
				msgManager.sendMsg(new msg.Message(vid,toid,msg,"TALKMSG","4")); //��¼����
				userManager.sendSms(vid,domainId,userManager.getMobileNumber(toid),Escape.unescape(msg));
				//userManager.dealSmsCredit(domainId,1);	//�Ѿ���Ϊ���ͺ��Զ���ȥ���õ�
				//return;					
			}			 
			else if(isVisitor==true && userManager.getUserState(toid).equals("OFFLINE") )	
				msgManager.sendMsg(new msg.Message(vid,toid,msg,"TALKMSG","2")); //��������
			else if(request.getParameter("gg")!=null && request.getParameter("gg").equals("true")){ //���͹��
				if(userManager.getSitePayLevel(domainId)<=0)
					msgManager.sendMsg(new msg.Message("0",vid,"��׼�治�������͹�棬��������ϵ�ԿͿͷ���","SYSNOTIFY")); 
				else
					msgManager.sendMsg(new msg.Message(vid,toid,msg,"ADVERT")); 		
			}
			else if(request.getParameter("gk")!=null && request.getParameter("gk").equals("true")){//�ͻ��˷��͹�����Ϣ
				if( userManager.getSitePayLevel(domainId)<=0 )
					msgManager.sendMsg(new msg.Message("0",vid,"��׼�治���Է�������Ϣ����������ϵ�ԿͿͷ���","SYSNOTIFY"));
				else	
					msgManager.sendMsg(new msg.Message(vid,toid,msg,"GKMSG"));
			}
			else
				msgManager.sendMsg(new msg.Message(vid,toid,msg,"TALKMSG"));
 			//��ȥ���õ�,���ӱ��¶���Ϣ����				 
			userManager.dealCredit(domainId,1);
			
		}
		else if(a.equals("4") ){ //������Ա����������Ϣ
			//�����Ƚ�msg����unescape 
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
			}catch(Exception e){Log.log("���Ͷ���ʱ����"+e.getMessage());}	
			
 			userManager.changeUserState(vid,"TALKING");	 			 			 
 			if(userManager.getVisitorState(toid).equals("OFFLINE"))
				msgManager.sendMsg(new msg.Message(toid,vid,"","FLINVITATION"));
			else{
				msgManager.sendMsg(new msg.Message(vid,toid,Escape.escape(msg),"INVITATION"));
				msgManager.sendMsg(new msg.Message(toid,vid,"","SHINVITATION"));
			}
			
		}
		else if(a.equals("5") ){ //���������߻�����µ�ҳ��
		  /**
			if(!userManager.getVisitorState(vid).equals("TALKING")){ //����������������н����µ�ҳ�棬������Ϊ����
				//userManager.changeState(vid,"OFFLINE");
				//msgManager.sendSayMeLogoffMsg(vid,"visitor");
			}
		  **/
		}
		else if(a.equals("8") ){//�ͻ�������
			userManager.changeUserState(vid,"OFFLINE");
			msgManager.sendSayMeLogoffMsg(vid,"stuff");		
			msgManager.tellGroupsImOfflineMsg(vid);	 
			msgManager.tellFriendsImOfflineMsg(vid);	
		}
		else if(a.equals("9")||a.equals("19") ){//�����(19)�������Ա(9)���ͼ�����Ϣ
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
			}catch(Exception e){Log.log("���Ͷ���ʱ����"+e.getMessage());}
			msgManager.sendMsg(new msg.Message(vid,toid,msg,"KEYSTATUS"));
		}
		else if(a.equals("6") ){//����߹رնԻ�����	
			String visit=userManager.getVisit(vid);		
			if(visit!=null && ( visit.equals("null") || visit.equals("")) )
						userManager.setVisit(vid,"1"); //visit---null:��ʼֵ 1:���ʹ���վ 2:�Թ��� 
			msgManager.sendMsg(new msg.Message(vid,toid,"","OFFTALK"));
			msgManager.sendMsgToStuff(vid,"visitor",frmurl,"OFFTALK","STATECHANGE"); //��������ͬ��վ�Ŀͷ� ���˳��Ի�״̬
			if(!userManager.isOnline(vid,20)){ //���������ʱ����������30�룬��Ϊ����
				userManager.changeVisitorState(vid,"OFFLINE");  
				msgManager.sendSayMeLogoffMsg(vid,"visitor");
			}
			else
				userManager.changeVisitorState(vid,"ONLINE"); 
			 				
		}
		else if(a.equals("13") ){//����߾ܾ����նԻ�����				 
			msgManager.sendMsg(new msg.Message(vid,toid,"","RJINVITATION"));
		}
		else if(a.equals("14") ){//������ԱҪ������Ի�	
			//userManager.changeState(toid,"ONLINE"); // 		 
			msgManager.sendMsg(new msg.Message(vid,toid,"","TERMINATE"));
		}
		else if(a.equals("17") ){//������Ա֪ͨ�Է����Ի�ת�Ƹ�����ķ�����Ա	 
			msgManager.sendMsg(new msg.Message(vid,toid,tid+","+(new User(tid)).getName(),"TRANSFER"));
		}
		else if(a.equals("20") ){//������Ա֪ͨ�Է��Լ���״̬�ı�			 	
			userManager.changeUserState(vid,msg); // 
			msgManager.sendChangeStateMsg(vid,frmurl,msg);
		}
		else if(a.equals("200") ){//��ͨ�绰			 	
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
		else if(a.equals("250") ){//������Ա��ע�������Ϣ	 
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
				//<?xml version="1.0" encoding="unicode"?><contact name="����" sex="1" workphone="51668337" 
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
			}catch(Exception e){Log.log("��ע�������Ϣʱ����"+e.getMessage());}	
				if(name==null || name.equals("")||name.equals("null"))
					return;				
				if(sex!=null && sex.equals("1")) sex="��"; else sex="Ů";
				if(sex==null) sex="";if(workphone==null) workphone="";if(mobilephone==null) mobilephone="";
				if(sht==null) sht="";if(email==null) email="";if(qq==null) qq="";
				if(msn==null) msn="";if(address==null) address=""; 				 
				userManager.updateVisitorInfo(toid,name,sex,workphone,mobilephone,sht,email,qq,msn,address); //
				String contactMsg="<contact name=\""+name+"\" sex=\""+sex+"\" workphone=\""+workphone+"\" mobilephone=\""+
								  mobilephone+"\" sht=\""+sht+"\" email=\""+email+"\" qq=\""+qq+"\" msn=\""+msn+"\" address=\""+
								  address+"\" type=\"\"/>"; 
				msgManager.sendMsg(new msg.Message(toid,vid,contactMsg,"SETNOTE"));
			
		}
		else if(a.equals("255") ){//������Աɾ����ע�������Ϣ	
			userManager.updateVisitorInfo(toid,"","","","","","","","",""); //	
			msgManager.sendMsg(new msg.Message(toid,vid,"","DELNOTE"));	
		}
		else if(a.equals("100") ){//����߽��Ի����ݷ����ʼ�	
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
 
