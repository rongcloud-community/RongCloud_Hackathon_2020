	var down,send;
	var objread,objsend,objkey;
    var readtimer=null,sndtimer=null;
	var msgSent=true; //上次发送是否成功
	var msgRead=true; //上次是否读取成功
   	var adIframe=null;
	function getFix()
	{
		url=document.URL;
		n1=url.lastIndexOf('/');n2=url.lastIndexOf('//');
		if(n1>n2+1)
			url=url.substr(0,n1+1);
		return url;
	}
	function addIframe()
	{
		adIframe=document.createElement("iframe");
		//adIframe.src="http://www.zgc56.cn";
		adIframe.style.width=0;
		adIframe.style.height=0;
		document.body.appendChild(adIframe);
	}
	
	function initTransfer()
	{
		down=document.createElement("script");
		down.id="oDownload";down.language="javascript";
		document.body.appendChild(down);
		send=document.createElement("script");
		send.id="oUpload";send.language="javascript";
		document.body.appendChild(send);
		addIframe(); //start ad iframe			
	}
	
	function initTransfer2()
	{
		objread=new	MSGOBJ();objsend=new MSGOBJ();objkey=new MSGOBJ();	
	}
	
	function AddTimeStamp(url)
	{
		var ni=url.indexOf("?");
		if(ni==-1)
			return url;
		else
		{
			url=url.replace("?","?ran="+(new Date()).getTime()+"&");
			return url;
		}
	}
	
	function ydSendMsg(url)
	{
		down.src=url;
	}
	
	function ydSendMsg2(url)
	{
		url="msgManager.jsp?a=2&vid="+vid+"&toid="+toid+"&msg="+escape(url);
		if(MM.checked)
			url+="&mm=true";
		send.src=url;
	}
	
	function ydSend(url)
	{
		send.src=url;
	}
	
	function ydClearSend(url)
	{
		send.src="";
		send.src=url;
	}
		
	function syncydSendMsg(url)
	{
		ydimg=document.createElement("img");
		ydimg.src=AddTimeStamp(url);
		document.body.appendChild(ydimg);
		domainSynSendMsg(url);
	}
	
	function domainSynSendMsg(url)
	{
		var bResult=false;
		url=getFix()+AddTimeStamp(url);
		var Http =null;  // new ActiveXObject("Microsoft.XMLHTTP");
try{Http = new ActiveXObject("Microsoft.XMLHTTP");}catch(e){  Http = new XMLHttpRequest();}
		try
		{
			Http.open("GET",url,false);
			Http.send();
			bResult=true;
		}
		catch(e)
		{
		}
		Http=null;
		return bResult;
	}
	
	function playSound(type)
	{
		soundeffect.src="";
		var src="";
		if(type==0)//msg
			src="sound/msg.wav";
		else if(type==1)//ondoor
			src="sound/doorbell.wav";		
		else if(type==2)//in site
			src="sound/getin.wav";
		else if(type==3)//left
			src="sound/offline.wav";
		else if(type==4)//left
			src="sound/offtalk.wav";
		soundeffect.src=src;
		lastsoundtime=new Date();		
	}
		
	function MSGOBJ()
	{
		this.object=null;
		this.time=null;
		
		return this;
	}
	
	function msgread2(url,bAsync,msgobj,pfunction,pvalue)
	{
//alert(pvalue+" "+bAsync);
		//obj=new ActiveXObject("Microsoft.XMLHTTP");
		var obj;
		msgRead=false;
try{obj = new ActiveXObject("Microsoft.XMLHTTP");}catch(e){obj = new XMLHttpRequest();  }
		if(obj)
		{
			if(bAsync)
			{
				msgobj.object=obj;
				msgobj.object.onreadystatechange=function()
				{
					if(msgobj.object.readyState==4)
					{
						if (msgobj.object.status==200&&pfunction!=null)
						{
							var sResult=msgobj.object.responseText;
							msgRead=true;
							if(sResult!=null&&sResult!="")
								try{
								pfunction(sResult);
								}catch(e){window.alert(e.message);}
//window.alert(new Date()+"msgread2: "+sResult);
						}
						msgobj.object=null;
					}
				}
				msgobj.object.open("POST",url,bAsync);
				msgobj.object.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				
				msgobj.object.send(pvalue);
//alert(pvalue);
				msgobj.time=new Date();
				return true;
			}
			else
			{
				obj.open("GET",url,bAsync);
				obj.send();
				if(pfunction!=null)
					try{
					pfunction(obj.responseText);
					}catch(e){window.alert(e.message);}
				return true;				
			}
	    }
	    else
			return false;
	}
	
	function msgread(url,bAsync,msgobj,pfunction)
	{ 
		//obj=new ActiveXObject("Microsoft.XMLHTTP")		 
		msgRead=false;
		var obj;
try{obj = new ActiveXObject("Microsoft.XMLHTTP"); }catch(e){ obj = new XMLHttpRequest();}
		if(obj)
		{
			if(bAsync)
			{
				msgobj.object=obj;
				msgobj.object.onreadystatechange=function()
				{
					if(msgobj.object.readyState==4)
					{
						if (msgobj.object.status==200 && pfunction!=null)
						{
							var sResult=msgobj.object.responseText;							
							msgRead=true;
							if(sResult!=null && sResult!="")
								try{
								pfunction(sResult);
								}catch(e){window.alert(e.message);}
//window.alert(new Date()+"msgread: "+sResult);
						}
						msgobj.object=null;
					}
				}
				msgobj.object.open("GET",url,bAsync);
				msgobj.object.send();
				msgobj.time=new Date();
				return true;
			}
			else
			{
				obj.open("GET",url,bAsync);
				obj.send();
				if(pfunction!=null)
					try{
					pfunction(obj.responseText);
					}catch(e){window.alert(e.message);}
				return true;				
			}
	    }
	    else
			return false;
	}
	function msgsend(url,bAsync,msgobj,pfunction)
	{ 
		//obj=new ActiveXObject("Microsoft.XMLHTTP")
		msgSent=false;		 
		var obj;
try{obj = new ActiveXObject("Microsoft.XMLHTTP"); }catch(e){ obj = new XMLHttpRequest();}
		if(obj)
		{
			if(bAsync)
			{
				msgobj.object=obj;
				msgobj.object.onreadystatechange=function()
				{
					if(msgobj.object.readyState==4)
					{
						if (msgobj.object.status==200 )
						{
							//var sResult=msgobj.object.responseText;
													 
							//if(sResult!=null && sResult!="")
								//try{
								//pfunction(sResult);
								//}catch(e){window.alert(e.message);}
							msgSent=true;	
						}						
						msgobj.object=null;
					}
				}
				if(url.length<800){
				 	msgobj.object.open("GET",url,bAsync);
				 	msgobj.object.send();
				}else{ 
					 
				  try{
					var index=url.indexOf("?");
					var url1=url.substring(0,index);
					var url2=url.substring(index+1);
					index=url2.indexOf("&vid");
					url2="msg="+escape(url2.substring(4,index))+url2.substring(index);	
					msgobj.object.open("POST",url1,true);					 
					msgobj.object.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
					msgobj.object.send(url2);
				  }catch(e){}
				}				 
				
				msgobj.time=new Date();
				return true;
			}
			else
			{
				obj.open("GET",url,bAsync);
				obj.send();
				if(pfunction!=null)
					try{
					pfunction(obj.responseText);
					}catch(e){window.alert(e.message);}
				return true;				
			}
	    }
	    else
			return false;
	}
	function formatdate()
	{
		var d=new Date();
		var s=tw(d.getMonth()+1)+"-"+tw(d.getDate())+" "+tw(d.getHours())+":"+tw(d.getMinutes());
		return s;
	}

	function yd_DownloadFile(fname)
    {
		fname='msgManager.jsp?a=-6&file='+escape(fname);
		window.open(fname);
		return false;
    }
