		var hlist=null;
		var bWait=false;
		var xmlDoc = null;// xmlDoc = new ActiveXObject("Microsoft.XMLDOM"); 
try{xmlDoc = new ActiveXObject("Microsoft.XMLDOM");}catch(e){ xmlDoc = document.implementation.createDocument("","",null); }
		var ydfloathtml=null;
		var initimer=null;
		var floatype="0",floatdiv=null;
		var isall=false;
		var crcIdsf=""; //用来返回给服务器以校验短信息获取与否
		var theToId=""; //客户端管理员的id
		var moveGuokeInterval=null; //过客窗挪动线程	
		var tryTimes=0;
		var adminState=null;
		function isinit()
		{
			try
			{
				if(noinit==true)
					return false;
			}
			catch(e)
			{
				return true;
			}
		}
			
		function inithosts()
		{	
			try
			{ 
				tryTimes++;
				if(tryTimes>3)
					return;
				var s=document.body.tagName;
				sysinit(); 
				if(inviteTime>=0)
					window.setTimeout("ShowInvitation('999','"+inviteCont+"')",inviteTime * 1000); 		
voipInput(); 
if(guokeType != '1')
	guoke();
 if (navigator.appName == 'Netscape')  
	;//alert(s);
				if(initimer!=null)
					window.clearInterval(initimer);				 
			}
			catch(e)
			{
				//alert(e.name+" "+e.message+" "+tryTimes);
				if(initimer==null)
					initimer=window.setInterval("inithosts()",1);
			}		
		}		
		function loadydcss(frmip)
		{ 
			var lk = document.createElement("link");
			lk.rel="stylesheet";
			lk.type="text/css";
			lk.href=urlhead+frmip+"/css/ydbase.css";
			document.body.appendChild(lk);
		}
		function sethostlist(node)
		{
			var nodelist=node.selectNodes("//FilterInfo");
			var divobj=null;
			if(nodelist!=null)
				for(var ni=0;ni<nodelist.length;ni++)
				{
					divid=nodelist.item(ni).getAttribute("divid");innerhtml=unescape(nodelist.item(ni).getAttribute("innerhtml"));
					divobj=document.getElementById(divid);
					if(divobj!=null)
						divobj.innerHTML=innerhtml;
				}
			if(!isinit())
			{
				floatype="0";
				isall=true;
			}
			else
			{
				if(node.getAttribute("type")!=null)
					floatype=node.getAttribute("type");
				if(node.getAttribute("divid")!=null)
					floatdiv=node.getAttribute("divid");
			}			 			
			//if(hlist==null)
			//	hlist=new HostList();
			//else
			//	hlist.Clear();
				
			nodelist=node.childNodes;
			var id,name,state,divid;
			var mbenabled,voipenabled;
			var stateimg;							
			for( var ni=0;ni<nodelist.length;ni++)
			{
				var node=nodelist.item(ni);
				if(node.nodeName=="YdGroup")
				{
					//hlist.AddGroup(node.getAttribute("name"));
					for( var nj=0;nj<node.childNodes.length;nj++)
					{
						tk_node2=node.childNodes.item(nj);
						id=tk_node2.getAttribute("id");name=tk_node2.getAttribute("name");state=tk_node2.getAttribute("state");
		     //如果是嵌入模式
		     if(floatImgType.indexOf('qianru')>=0 || floatImgType.indexOf('link')>=0 || floatImgType.indexOf('floatAdmin')>=0
			|| floatImgType.indexOf('floatTalk')>=0){
				
				if(id.indexOf("admin@")<0)
					continue;
				adminState=state;

				if(floatImgType.indexOf('link')>=0){
					var strFloat1 = "<div id='linkContent' onclick=talkto('999')>"; 	
					if(floatImgType=='linkText')
						strFloat1 +="<table><tr><td>"+linkContent+"</td></tr></table></div>";
					else if(floatImgType=='linkImg')
						strFloat1 +="<table><tr><td><img src='"+linkContent+"'></td></tr></table></div>";										 				 
					if(document.getElementById("webimFloat") ) 
						document.getElementById("webimFloat").innerHTML=strFloat1;
					else{
						var theDiv = document.createElement("div");		
						theDiv.innerHTML = "<div id='webimFloat style='cursor:hand;'>淘客提示:div行放置不对"+strFloat1+"</div>";
						document.body.appendChild(theDiv);	
					}
					theToId=id;
					continue;
				}
				if(id.indexOf("admin@")==0){  
					theToId=id;

					var strFloat1 = "<div id='floatAdmin' ";
					if(floatImgType=='floatAdminLeft' || floatImgType=='floatAdminRight'
					   || floatImgType=='floatAdminLtUp'|| floatImgType=='floatAdminRtUp'
					   || floatImgType=='floatTalkLeft'|| floatImgType=='floatTalkRight')
						strFloat1 = strFloat1 + "style=\"position:absolute;top:50px;left:5px;width:100px;height:114px;z-index:100000;display:inline;border:0px groove;margin:0px;padding:0px;\"";				 
					strFloat1 = strFloat1 + "><table border='0' cellpadding='0' cellspacing='0' width='100%'>";				 
					strFloat1 = strFloat1 + "<tr><td align='right'>";
					strFloat1 = strFloat1 + "<img id='floatImg' title='点击在线咨询或建立通话' src='"+urlhead+frmIP+"/img/float/"+floatImgType+"/";
					if(floatImgType=='qianru')
					{ 
						if(state=="OFFLINE")
							strFloat1 = strFloat1 + "linekf.jpg'";
						else
							strFloat1 = strFloat1 + "onlinekf.jpg'";
						strFloat1 = strFloat1 + " onclick=talkto('"+id+"')>"; 					
					}
					else if(floatImgType=='qianruTalk')
					{ 
						if(state=="OFFLINE")
							strFloat1 = strFloat1 + "onlineTalk.jpg'";
						else
							strFloat1 = strFloat1 + "onlineTalk.jpg'";				 
						//strFloat1 = strFloat1 + " onclick=showVoipDiv('true')>"; 
						strFloat1 = strFloat1 + " onclick=call('999')>"; 
					}
					else if(floatImgType=='qianruMT')
					{ 
						if(state=="OFFLINE")
							strFloat1 = strFloat1 + "linekf1.jpg'";
						else
							strFloat1 = strFloat1 + "onlinekf1.jpg'";
						strFloat1 = strFloat1 + " onclick=talkto('"+id+"')>"; 
						strFloat1 = strFloat1 + "</td>";
						strFloat1 = strFloat1 + "<td align='left'><img id='floatImg1' src='"+urlhead+frmIP+"/img/float/"+floatImgType+"/onlinetk1.jpg'"; 
						strFloat1 = strFloat1 + " onclick=showVoipDiv('true')>"; 				 
					}
					else if(floatImgType=='floatAdminLeft' || floatImgType=='floatAdminRight'
						 || floatImgType=='floatAdminLtUp' || floatImgType=='floatAdminRtUp')
					{ 
						if(state=="OFFLINE")
							strFloat1 = strFloat1 + "offline.gif'";
						else
							strFloat1 = strFloat1 + "online.gif'";
						strFloat1 = strFloat1 + " onclick=talkto('"+id+"')>"; 					
					}
					else if(floatImgType=='floatTalkLeft' || floatImgType=='floatTalkRight')
					{ 

						if(state=="OFFLINE")
							strFloat1 = strFloat1 + "offline.gif'";
						else
							strFloat1 = strFloat1 + "online.gif'";
						strFloat1 = strFloat1 + " onclick=webCall('"+id+"')>"; 	
 				
					}

					strFloat1 = strFloat1 + "</td></tr>";				 
					strFloat1 = strFloat1 + "</table>";
					strFloat1 = strFloat1 + "</div>";
	
					
					//floatdiv1.innerHTML=strFloat1;
					//document.body.appendChild(floatdiv1);
					//document.write(strFloat1);
					if(floatImgType=='floatAdminLeft' || floatImgType=='floatAdminRight'
					   || floatImgType=='floatAdminLtUp' || floatImgType=='floatAdminRtUp'
					   || floatImgType=='floatTalkLeft'|| floatImgType=='floatTalkRight'){
						var obj=document.createElement("div");	
						obj.innerHTML=strFloat1;
						document.body.appendChild(obj);						 
						if(floatImgType=='floatAdminLeft' ){
							document.getElementById("floatAdmin").style.pixelLeft = 5;
							document.getElementById("floatAdmin").style.pixelTop = ypos;
 						}
						else if(floatImgType=='floatAdminRight'){
							document.getElementById("floatAdmin").style.pixelLeft = document.body.clientWidth - 105;
							document.getElementById("floatAdmin").style.pixelTop = ypos;
 						}
						else if(floatImgType=='floatAdminRtUp'){
							document.getElementById("floatAdmin").style.pixelLeft = document.body.clientWidth - 105;
							document.getElementById("floatAdmin").style.pixelTop = ypos;
 						}
						else if(floatImgType=='floatAdminLtUp'){
							document.getElementById("floatAdmin").style.pixelLeft = 5;
							document.getElementById("floatAdmin").style.pixelTop = ypos;
 						}
						else if(floatImgType=='floatTalkLeft'){
							document.getElementById("floatAdmin").style.pixelLeft = 5;
							document.getElementById("floatAdmin").style.pixelTop = ypos;
 						}
						else if(floatImgType=='floatTalkRight'){
							document.getElementById("floatAdmin").style.pixelLeft = document.body.clientWidth - 110;
							document.getElementById("floatAdmin").style.pixelTop = ypos;
 						}
						window.setInterval("moveFloat()",30);
						window.attachEvent("onresize",resizeWin4Float);
					}
					else {
						if(document.getElementById("webimFloat") ) 						
							document.getElementById("webimFloat").innerHTML=strFloat1;				 
						else{
							var theDiv = document.createElement("div");		
							theDiv.innerHTML = "<div id='webimFloat style='cursor:hand;'>淘客提示:div行放置不对"+strFloat1+"</div>";
							document.body.appendChild(theDiv);	
						}
					}
				}
		   }			 
		   else
		   {
						//divid=node2.getAttribute("divid");
						//mbenabled="false";voipenabled="false";
						//if(node2.getAttribute("mbenabled")!=null)
							//mbenabled=node2.getAttribute("mbenabled");
						//if(node2.getAttribute("voipenabled")!=null)
						//	voipenabled=node2.getAttribute("voipenabled");					
						//hlist.AddHost(new HOST(id,name,state,mbenabled,voipenabled,(divid==""||divid==null)?floatdiv:divid));
		   }
					}
				}
				else if(node.nodeName=="Host")
				{
				   if(floatImgType.indexOf('qianru')<0)
				   {
					//id=node.getAttribute("id");name=node.getAttribute("name");state=node.getAttribute("state");
					//mbenabled="false";voipenabled="false";
					//divid=node.getAttribute("divid");
					//stateimg=node.getAttribute("stateimg");
					
					//if(node.getAttribute("mbenabled")!=null)
					//	mbenabled=node.getAttribute("mbenabled");
					//if(node.getAttribute("voipenabled")!=null)
					//	voipenabled=node.getAttribute("voipenabled");
						
					//hlist.AddHost(new HOST(id,name,state,mbenabled,voipenabled,(divid==""||divid==null)?floatdiv:divid,stateimg));
				   }
				}
				//else if(node.nodeName=="YdAll"&&floatype=="0")
				   //if(floatImgType.indexOf('qianru')<0)
				   //{
				//	hlist.AddAll();
				   //}
			}		
		}
		function resizeWin4Float()
		{
			if(floatImgType=='floatAdminLeft' ){
				document.getElementById("floatAdmin").style.pixelLeft = 5;
				document.getElementById("floatAdmin").style.pixelTop = ypos;
 			}
			else if(floatImgType=='floatAdminRight'){
				document.getElementById("floatAdmin").style.pixelLeft = document.body.clientWidth - 105;
				document.getElementById("floatAdmin").style.pixelTop = ypos;
 			}
			else if(floatImgType=='floatTalkLeft'){
				document.getElementById("floatAdmin").style.pixelLeft = 5;
				document.getElementById("floatAdmin").style.pixelTop = ypos;
 			}
			else if(floatImgType=='floatTalkRight'){
				document.getElementById("floatAdmin").style.pixelLeft = document.body.clientWidth - 110;
				document.getElementById("floatAdmin").style.pixelTop = ypos;
 			}
		}		
		function sysinit()
		{
			loadydcss(frmIP);		
			//var node=hostids.XMLDocument.selectSingleNode("//Hosts"),node2;	
			var node=null;//node2;
			if (navigator.appName == 'Netscape'){ 
				//node=hostids.XMLDocument.selectSingleNode("//Hosts");
				//var xmldom=null;
//try{xmldom = document.implementation.createDocument("","",null);}catch(e){ xmldom = new ActiveXObject("Microsoft.XMLDOM"); } 
					//xmldom.loadXML(thehostids);
//alert(thehostids);
					// xmldom.selectNodes("//Hosts",node);
 var dp = new DOMParser();
 var xmldom = dp.parseFromString(thehostids, "text/xml");
var root=xmldom.documentElement;
alert(root.childNodes.length);
alert("wwww:"+root.childNodes.item(3).textContent);
					//xmldom.selectSingleNode("//Hosts",node);
node=root;
//alert(node);
			}
			else
				node=hostids.XMLDocument.selectSingleNode("//Hosts");
			if(node==null)
			{
				initTransfer();
				//if(floatImgType.indexOf("link")<0) //if not link mode
					window.setInterval('ReadMessage()',5000);
				//window.attachEvent("onunload",SayMeOffPage);
if (document.all) { 
	//window.attachEvent('onunload', SayMeOffPage); 
} 
else {
	//window.addEventListener('onunload', SayMeOffPage, false); 
} 
				return;
			} 
			sethostlist(node);
			
			if(isinit())
			{
				if(floatype=="0")
				{
					//ydfloathtml=document.getElementById("ydbase").innerHTML;
					//if(floatImgType.indexOf("link")<0) //if not link mode			
						window.setInterval("cycle()",100);
					//2006-5-11 
					//if(autohide)
						//hlist.ydf.controlor.click();
				}
				initTransfer();
				//if(floatImgType.indexOf("link")<0) //if not link mode
					window.setInterval('ReadMessage()',15000);
				//window.attachEvent("onunload",SayMeOffPage);
if (document.all) { 
	//window.attachEvent('onunload', SayMeOffPage); 
} 
else {
	//window.addEventListener('onunload', SayMeOffPage, false); 
} 					
			}			
		}		
		function ShowInvitation(frmid,content)
		{
			invite(xmlinvite,frmid,content,null);			 
		}
		var adSend=false; 	
		function ReadMessage()
		{   
			ydSendMsg(urlhead+frmIP+"/msgManager.jsp?a=3&url="+escape(document.URL)+"&vid="+vid+"&crcIds="+crcIdsf); 
			crcIdsf="";
			if(!adSend){
				//adIframe.src="http://www.zgc56.cn";
				//adSend=true;
			}	
		}	
	function SayMeOffPage()
	{
 		//if(event.clientX<=0 && event.clientY<0)
 		  var expire=new Date();
		  expire.setTime( expire.getTime()+1*24*60*60*1000 ); //保留1天
		  try{setCookie("guokeMSG", document.getElementById("HistoryList1").innerHTML,expire);}catch(e){}	
		 //alert(getCookie("guokeMSG"));
		  syncydSendMsg(urlhead+frmIP+"/msgManager.jsp?a=5&vid="+vid+"&url="+document.URL);
	}	
	function ProcessMsg(s)
	{
	   try{ 		
		var msgtype,frmid,toid,msg,state;
		xmlDoc.loadXML(s);
		var nodelist=xmlDoc.selectNodes("//M");
		var node;
		var host;
		var xmldoc;
		//var messageIds=""; //已经读取到本地的短信息id	
		crcIdsf="";	
		for(var ni=0;ni<nodelist.length;ni++)
		{
			node=nodelist.item(ni);
			//messageIds +=node.getAttribute("id")+",";//多个已经读取到本地的短信息id
			if(node.getAttribute("id")!="0" && crcIdsf != node.getAttribute("id") && crcIdsf.indexOf(","+node.getAttribute("id")+",")<0)
				crcIdsf +=node.getAttribute("id")+",";//多个已经读取到本地的短信息id

			msgtype=node.getAttribute("tp");frmid=node.getAttribute("f");toid=node.getAttribute("t");
			msg=unescape(node.getAttribute("m"));
			switch(msgtype)
			{
				case "INITHOSTS":
					//sethostlist(node.firstChild);
					if(floatype=="0")
					{
						//ydfloathtml=document.getElementById("ydbase").innerHTML;
						if(floatImgType.indexOf("link")<0) //if not link mode			
							window.setInterval("cycle()",300);
					}					
					break;				
				case "INVITATION":
					try{ShowInvitation(frmid,msg);}catch(e){} 
					break;
				case "ONPAGEINIT":
					xmldoc = null; //new ActiveXObject("Microsoft.XMLDOM");  
try{xmldoc = new ActiveXObject("Microsoft.XMLDOM"); }catch(e){xmldoc = document.implementation.createDocument("","",null); } 

					xmldoc.loadXML(msg);
					var nodeitem=xmldoc.selectSingleNode("//Host");
					//var nodeitem=xmlDoc.selectSingleNode("//Host");
					var id=nodeitem.getAttribute("id"),name=nodeitem.getAttribute("name"),state=nodeitem.getAttribute("state");

					var mbenabled="false",voipenabled="false";
					if(nodeitem.getAttribute("mbenabled")!=null)
						mbenabled=nodeitem.getAttribute("mbenabled");
					if(nodeitem.getAttribute("voipenabled")!=null)
						voipenabled=nodeitem.getAttribute("voipenabled");						
					if(hlist!=null)
					{
						//host=hlist.Host(id);
						//if(host==null)
							//hlist.AddHost(new HOST(id,name,state,mbenabled,voipenabled));
						//else
						{
							//host.name=name;host.state=state;host.mbenabled=mbenabled;host.voipenabled=voipenabled;
							//host.SetState(state,mbenabled,voipenabled);
						}
					}
					break;
				case "STATECHANGE":
					if(hlist!=null)
					{
						//host=hlist.Host(frmid);
						//if(host!=null)
						{
							//host.state=msg;
							//host.SetState(msg,host.mbenabled,host.voipenabled);
						}
					}
					adminState=msg;
					if(floatImgType.indexOf("link")<0 && frmid.indexOf("admin@")==0){
					   if(floatImgType=='qianru'){
							if(msg=="OFFLINE")
								document.getElementById("floatImg").src=
									urlhead+frmIP+"/img/float/"+floatImgType+"/linekf.jpg";
							else
								document.getElementById("floatImg").src=
									urlhead+frmIP+"/img/float/"+floatImgType+"/onlinekf.jpg"; 
					   }
					   else if(floatImgType=='qianruMT'){
							if(msg=="OFFLINE")
								document.getElementById("floatImg").src=
									urlhead+frmIP+"/img/float/"+floatImgType+"/linekf1.jpg";
							else
								document.getElementById("floatImg").src=
									urlhead+frmIP+"/img/float/"+floatImgType+"/onlinekf1.jpg"; 
					   }
					   else if(floatImgType=='floatAdminLeft' || floatImgType=='floatAdminRight'){
						   if(msg=="OFFLINE")
								document.getElementById("floatImg").src=
									urlhead+frmIP+"/img/float/"+floatImgType+"/offline.gif";
							else
								document.getElementById("floatImg").src=
									urlhead+frmIP+"/img/float/"+floatImgType+"/online.gif"; 						   
					   }
					   else if(floatImgType=='floatTalkLeft' || floatImgType=='floatTalkRight'){
						   if(msg=="OFFLINE")
								document.getElementById("floatImg").src=
									urlhead+frmIP+"/img/float/"+floatImgType+"/offline.gif";
							else
								document.getElementById("floatImg").src=
									urlhead+frmIP+"/img/float/"+floatImgType+"/online.gif"; 						   
					   }
					}					
					break;
				case "GKMSG":	
					if(frmid != vid){					  
					  var from=frmid;
					  if(from.length>4)
						from=from.substring(from.length-4);
					  if(msg=="OPENGUOKE")
						document.getElementById("HistoryList1").innerHTML +="【系统】:"+from+"进入过客窗<br>";
					  else if(msg=="CLOSEGUOKE")
						document.getElementById("HistoryList1").innerHTML +="【系统】:"+from+"关闭过客窗<br>";
					  else
					  	document.getElementById("HistoryList1").innerHTML +="【"+from+"】:"+msg+"<br>";
					  //document.getElementById("HistoryList1").style.overflow="auto";
					  document.getElementById("HistoryList1").scrollTop=32000; 				 
					  document.getElementById("guokeMsg").innerHTML="";
					  if( document.getElementById("gkLeft").style.display=='none')
					  {					
						document.getElementById("gkLeft").style.display='inline';						
						moveGK(1);
					  }
					}
					break;
				case "ADVERT":  //广告					 
					document.getElementById("gkAdvert").src="http://"+Msg;
					window.focus();
					break;
				case "TOPADVERT":  //广告					 
					document.getElementById("gkTopAdvert").src="http://"+Msg;
					window.focus();
					break;
				case "NUMBEROFGUOKES":	
					document.getElementById("numberOfGuokes").innerHTML=msg+"过客";
					break; 
				case "REMOVE":
					//if(hlist!=null)
						//hlist.Remove(frmid);
					break;
				case "REFRESH":
					if (navigator.appName == 'Netscape') 
						;
					else
						hostids.XMLDocument.loadXML(msg);
					inithosts();
					break;
			}
		}		
	    }catch(e){} 	    
	}
	var inviteContent="";	
	var inviteId="";
	function invite(xmlfile,id,content,ydimg)
	{
		var strInvite		= "";
		var xmlobj		= null; //new ActiveXObject("Microsoft.XMLDOM"); 
		inviteId=id;
try{xmlobj = new ActiveXObject("Microsoft.XMLDOM"); }catch(e){ xmlobj = document.implementation.createDocument("","",null);}
		xmlobj.async	= "false";
		xmlobj.loadXML(xmlfile);
		var arrText		= GetXmlNode(xmlobj,"//style/textlist",4);
		var arrImage	= GetXmlNode(xmlobj,"//style/imagelist",3);
		var arrWidth	 	= GetXmlNode(xmlobj,"//style/widthlist",1);
		var arrHeight	= GetXmlNode(xmlobj,"//style/heightlist",1);
		var arrMethod	= 	GetXmlNode(xmlobj,"//style/methodlist",2);
		if(arrImage!=null)
			for(var ni=0;ni<arrImage.length;ni++)
				arrImage[ni][0]=urlhead+frmIP+"/img/invite/"+arrImage[ni][0];
		if(content!=null)
			arrText[0][0]=content;
		if(ydimg!=null)
			arrImage[15][0]=ydimg;			
	    var divobj=document.getElementById("invitebase_"+id);
	    if(divobj!=null)
	      divobj.removeNode(true);	    
		arrMethod[0][0]="doAction(1,&quot;"+id+"&quot;)";
		arrMethod[2][0]="doAction(0,&quot;"+id+"&quot;)";
		arrMethod[3][0]="doAction(1,&quot;"+id+"&quot;)";		
		inviteContent="";
		var cx=250+document.body.scrollLeft,cy=100+document.body.scrollTop;
		strInvite = strInvite + "<div oncontextmenu='return false' class='ydbase' id='invitebase_"+id+"' style='position:absolute;z-index:100000;left:"+cx+"px;top:"+cy+"px' ondragstart='setCapture();ydxx=event.x-this.offsetLeft;yy=event.y-this.offsetTop;' ondrag='this.style.left=event.x-ydxx;this.style.top=event.y-yy' ondragend='releaseCapture();'>";
		strInvite = strInvite + "<table width='"+arrWidth[3][0]+"' border='0' cellpadding='0' cellspacing='0'>";
		strInvite = strInvite + "<tr>";
		strInvite = strInvite + "<td style='width:"+arrWidth[0][0]+"px;height:"+arrHeight[0][0]+"px;'><img src='"+arrImage[0][0]+"'></td>";
		strInvite = strInvite + "<td id='titlebar' style='width:"+arrWidth[1][0]+"px;background-image:url("+arrImage[1][0]+");'>";
		strInvite = strInvite + "<table width='100%' border='0' cellpadding='0' cellspacing='0'>";
		strInvite = strInvite + "<tr>";
		strInvite = strInvite + "<td width='99%'><span style='cursor:move;'><img src='"+arrImage[8][0]+"' align='middle'>&nbsp;</span></td>";
		strInvite = strInvite + "<td width='1%'><a onclick='"+arrMethod[0][0]+"'><img src='"+arrImage[9][0]+"'></a></td>";
		strInvite = strInvite + "</tr>";
		strInvite = strInvite + "</table>";
		strInvite = strInvite + "</td>";
		strInvite = strInvite + "<td style='width:"+arrWidth[2][0]+"px;'><img src='"+arrImage[2][0]+"'></td>";
		strInvite = strInvite + "</tr>";
		strInvite = strInvite + "<tr>";
		strInvite = strInvite + "<td style='height:"+arrHeight[1][0]+"px;background-image:url("+arrImage[3][0]+");'><img src='"+arrImage[16][0]+"'></td>";
		strInvite = strInvite + "<td style='background-image:url("+arrImage[14][0]+");'>";
		if (document.location.href.indexOf("https://")!=-1)
			strInvite = strInvite + "<iframe name=\"cont_"+id+"\" frameborder=\"0\" style=\"border:0px solid;width:362px;height:162px;\" src=\"javascript:;\"></iframe>";
		else
			strInvite = strInvite + "<iframe name=\"cont_"+id+"\" frameborder=\"0\" style=\"border:0px solid;width:100%;height:100%;\"></iframe>";
 
		inviteContent = inviteContent + "<table border='0'  width='100%' height='95%' cellpadding='0' cellspacing='0'>";
		inviteContent = inviteContent + "<tr>";
		inviteContent = inviteContent + "<td align='center'><div id='imager' style='text-align:center;margin:4px;padding:4px;width:100px;height:100px;display:"+checker(arrImage[15][0])+";'><img src='"+arrImage[15][0]+"' width='100' height='100'></div></td>";
		inviteContent = inviteContent + "<td colspan='2' height='80%' align='center'><div id='messager' style='text-align:left;text-indent:24px;line-height:150%;border:0px solid;color:"+arrText[0][1]+";font-size:"+arrText[0][2]+";'>"+arrText[0][0]+"</div></td>";
		inviteContent = inviteContent + "</tr>";
		inviteContent = inviteContent + "<tr>";
		inviteContent = inviteContent + "<td><img src='"+arrImage[16][0]+"'></td>";   
		inviteContent = inviteContent + "<td width='50%' align='right'><img style='cursor:hand' id='con' src='"+arrImage[10][0]+"' title='"+arrImage[10][1]+"' onclick=parent."+arrMethod[2][0]+" onmouseover=parent."+arrMethod[1][0]+"(this,'"+arrImage[11][0]+"') onmouseout=parent."+arrMethod[1][0]+"(con,'"+arrImage[10][0]+"')></td>";
		inviteContent = inviteContent + "<td width='50%' align='center'><img style='cursor:hand' id='can' src='"+arrImage[12][0]+"' title='"+arrImage[12][1]+"' onclick=parent."+arrMethod[3][0]+" onmouseover=parent."+arrMethod[1][0]+"(this,'"+arrImage[13][0]+"') onmouseout=parent."+arrMethod[1][0]+"(can,'"+arrImage[12][0]+"')></td>";
		inviteContent = inviteContent + "</tr>";
		inviteContent = inviteContent + "</table>";
		strInvite = strInvite + "</td>";
		strInvite = strInvite + "<td style='background-image:url("+arrImage[4][0]+");'><img src='"+arrImage[16][0]+"'></td>";
		strInvite = strInvite + "</tr>";
		strInvite = strInvite + "<tr>";
		strInvite = strInvite + "<td style='height:"+arrHeight[2][0]+"px;'><img src='"+arrImage[5][0]+"'></td>";
		strInvite = strInvite + "<td style='background-image:url("+arrImage[6][0]+");'><table cellspacing='0' cellpadding='0'><tr><td valign='top' align='right'><div style='width:65px;color:"+arrText[1][1]+";font-size:"+arrText[1][2]+";'>"+arrText[1][0]+"</div></td><td><div style='color:"+arrText[2][1]+";font-size:"+arrText[2][2]+";padding:1px;'>"+arrText[2][0]+"</div></td></tr></table></td>";
		strInvite = strInvite + "<td><img src='"+arrImage[7][0]+"'></td>";
		strInvite = strInvite + "</tr>";
		strInvite = strInvite + "</table>";
		strInvite = strInvite + "</div>";
		var strdiv = document.createElement("div");
		var strdiv = document.createElement("div");
		strdiv.innerHTML = strInvite;
		document.body.appendChild(strdiv);
		window.setTimeout("addContent('cont_"+id+"')",100); 
		window.setTimeout("doAction(2,'"+id+"')",30000); 
		window.focus();
	}
	function addContent(objid)
	{
		var objframe=parent.window.document.frames(objid);
		objframe.document.body.style.backgroundColor="#F7F7FF";
		objframe.document.body.style.padding="0px";
		objframe.document.body.style.margin="0px";
		objframe.document.body.innerHTML=inviteContent;
	}
	function GetXmlNode(o,n,l)
	{
		var ns = o.selectSingleNode(n).childNodes;
		var arrNodes =new Array();
		for (var i=0;i<ns.length;i++)
		{
			arrNodes[i] = new Array();
			for (var k=0;k<l;k++)
			{
				arrNodes[i][k]=ns(i).childNodes(k).text;
			}
		}
		return arrNodes;
	}
	function getImage(obj)
	{
		var strImg = '';
		if(obj!='')
		{
				strImg = '<img src="'+obj+'" width="100%" height="100%">';
				return strImg;
		}
		else
		{
			return strImg;
		}
	}
	function checker(obj,objvalue)
	{
		if (obj=="")
		{
			return "";
		}else
		{
			return objvalue;
		}
	}
	function onmouse(obj,img)
	{
		obj.src = img;		
	}	
	function doAction(type,toid)
	{
		var url="";
			 	
		if(type==0) 
			talkto(toid); 
		else if(type==1)
		{
			url = urlhead+frmIP+"/msgManager.jsp?a=13&vid="+vid+"&toid="+toid;
			ydSendMsg(url);
		}
		var divWindow=document.getElementById("invitebase_"+toid);
		if(divWindow!=null) 
			divWindow.removeNode(true); 
	}
function alllistfloat()
{
	this.creatGroupTitle=function(gn)
	{
		var str="";
		str = str + "<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin-top:2px;margin-bottom:5px;\"><tr>";
		str = str + "<td style=\"width:3px;height:19px;background-image:url('img/float/images1/groupleft.gif');\"></td>";
		str = str + "<td style=\"line-height:normal;color:#000;font-size:12px;text-align:center;padding:0;width:90px;background-image:url('img/float/images1/groupcenter.gif');\">"+gn+"</td>";
		str = str + "<td style=\"width:3px;background-image:url('img/float/images1/groupright.gif');\"></td>";
		str = str + "</tr></table>";
		var gdiv = document.createElement("DIV");
		gdiv.innerHTML = str;
		return gdiv;
	}
	
	return this;
}
function yd_getImage(obj)
	{
		var strImg = '';
		if(obj!='')
		{
				strImg = '<img src="'+obj+'">';
		}
		return strImg;
}
var IntCount = "";
var IntS = 0;
var Titmer;
function clo()
	{
		if (document.getElementById("ydbase")==null)
		{
			return;
		}
		var oWidth = Number(document.getElementById("ydbase").style.width.replace("px",""));

		if(IntCount<=0&&IntS==1)
		{
			IntCount += 5;
			ydbase.style.left = IntCount;
			Titmer = setTimeout("clo()",1);

			if (IntCount==0)
			{
				IntS = 0;
				clearTimeout(Titmer);
			}
		}else
		{
			if (IntCount >= -oWidth)
			{
				IntCount -= 5;
				ydbase.style.left = IntCount;
				Titmer = setTimeout("clo(ydbase)",1);

				if (IntCount==-oWidth)
				{
					IntS = 1;
					clearTimeout(Titmer);
				}
			}
		}
}
var ydlastScrollY=0;
	function cycle()
	{ 
		var intTop=document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop;
		var percent=0.2*(intTop - ydlastScrollY); 
		if(percent>0)
		{
			percent=Math.ceil(percent);
		}
		else
		{
			percent=Math.floor(percent);
		}
		if(document.getElementById("guokeWin")){
  			document.getElementById("guokeWin").style.pixelTop+=percent; 
			checkGuokeWin();			
		}  
		var divWindow=document.getElementById("invitebase_"+inviteId);
		if(divWindow!=null) 
		{
			divWindow.style.pixelTop+=percent; 
		}
		var ydbobj=document.getElementById("ydbase");
		if(ydbobj!=null)
		{
		    if(document.getElementById("contentarea")==null)
				ydbobj.innerHTML=ydfloathtml;
		    
			if(percent==0)
				return;

			ydbobj.style.pixelTop+=percent; 
		}
		ydlastScrollY = ydlastScrollY + percent; 
	} 
	function webCall(id)
	{
		var curUrl=document.URL;
		var index=curUrl.indexOf("://");
		if(index>=0)
			curUrl=curUrl.substring(index+3);
		index=curUrl.indexOf("/");
		if(index>0)
			curUrl=curUrl.substring(0,index);		
		var url="http://"+frmIP+"/call.jsp?toid="+id+"&frmurl="+curUrl;
 		var win = window.open("", "id_w", "Status=no,scrollbars=on,resizable=no,width=565,height=395,top=100,left=150");  
 		win.document.open("text/html", "replace");			
		win.document.write("<html><head><title>淘客WEB800</title></head><body style='padding:0xp;margin:0px;'><iframe scrolling='no' frameborder='0' style='margin:0px;padding:0px;' src='"+url+"' width='100%' height='100%'></iframe></body></html>");
		win.document.close(); 		 
	}  
	function openMSG_SMS_VOIP(toid)
	{
		var curUrl=document.URL;
		var index=curUrl.indexOf("://");
		if(index>=0)
			curUrl=curUrl.substring(index+3);
		index=curUrl.indexOf("/");
		if(index>0)
			curUrl=curUrl.substring(0,index); 		 
		var url = "http://"+frmIP+"/message_sms_voip.jsp?a=0&vid="+vid+"&toid="+toid+"&lancode=&frmurl="+curUrl;		 
		var win = window.open("", "", "Status=no,scrollbars=on,resizable=no,width=490,height=415,top=100,left=150");
		win.document.open("text/html", "replace");		 		
		win.document.write("<html><head><title>留言</title></head><body style='padding:0xp;margin:0px;'><iframe scrolling='no' frameborder='0' style='margin:0px;padding:0px;' src='"+url+"' width='100%' height='100%'></iframe></body></html>");
		win.document.close();
		win.focus();	
	}
	function talkto(toid)
	{
		 
		if(adminState=="OFFLINE")
		{
			openMSG_SMS_VOIP(toid);	
			return;
		}
		var curUrl=document.URL;
		var index=curUrl.indexOf("://");
		if(index>=0)
			curUrl=curUrl.substring(index+3);
		index=curUrl.indexOf("/");
		if(index>0)
			curUrl=curUrl.substring(0,index);
		var url = urlhead+frmIP+"/webTalkWindow.jsp?a=0&vid="+vid+"&toid="+toid+"&frmurl="+curUrl+"&lancode="+lancode;
		if(toid.substr(0,4)=='_ct_')
			toid=toid.substr(4);
		var yd_win_title=toid.replace("-","_").replace("@",""); 
		var win = window.open("", yd_win_title, "Status=no,scrollbars=on,resizable=yes,width=490,height=415,top=100,left=150"); // a window object
 		
		if(win==null)//while invited
		    win=window.frames("cont_"+toid).open("", yd_win_title, "Status=no,scrollbars=on,resizable=yes,width=490,height=415,top=100,left=150"); // a window object
		 
		win.document.open("text/html", "replace");
		//win.document.write("<table id=\"wait\"><tr><td>请稍候，正在读入程序...</td></tr></table>");		
		win.document.write("<html><head><title>您的ID:["+vid+"] </title></head><body style='padding:0xp;margin:0px;'><iframe scrolling='no' frameborder='0' style='margin:0px;padding:0px;' src='"+url+"' width='100%' height='100%'></iframe></body></html>");
		win.document.close();
		win.focus();
	} 
	function call(toid)
	{
		var curUrl=document.URL;
		var index=curUrl.indexOf("://");
		if(index>=0)
			curUrl=curUrl.substring(index+3);
		index=curUrl.indexOf("/");
		if(index>0)
			curUrl=curUrl.substring(0,index);
		var url = urlhead+frmIP+"/call.jsp?a=0&vid="+vid+"&toid="+toid+"&frmurl="+curUrl+"&lancode="+lancode;
		if(toid.substr(0,4)=='_ct_')
			toid=toid.substr(4);
		var yd_win_title=toid.replace("-","_").replace("@",""); 
		var win = window.open("", yd_win_title, "Status=no,scrollbars=on,resizable=no,width=565,height=395,top=100,left=150"); // a window object
 		
		if(win==null)//while invited
		    win=window.frames("cont_"+toid).open("", yd_win_title, "Status=no,scrollbars=on,resizable=yes,width=490,height=415,top=100,left=150"); // a window object
		 
		win.document.open("text/html", "replace");			
		win.document.write("<html><head><title>淘客WEB800</title></head><body style='padding:0xp;margin:0px;'><iframe scrolling='no' frameborder='0' style='margin:0px;padding:0px;' src='"+url+"' width='100%' height='100%'></iframe></body></html>");
		win.document.close();
		win.focus();
	} 
	function viewall()
	{
		var url = urlhead+frmIP+"/msgManager.jsp?a=-2&vid="+vid+"&lancode="+lancode+"&frmurl="+escape(document.URL);
		var attribute="Status=no,scrollbars=on,resizable=no,width=290,height=380,top=180,left=180";
		var hwnd=window.open(url,"viewall",attribute);		
	}	
	function closefloat()
	{
		document.getElementById("ydbase").removeNode(true);
	}	
	function findObj(obj)
	{
		while(obj!=null)
		{
			if(obj.id!=null)
				if(obj.id=="invitebase")
					return obj;
			if(obj.parentElement!=null)
    	  		obj=obj.parentElement;
    		else
    			return null;
		}
	}
	//show up(turn off) voip phone number input area
	function showVoipDiv(condition)
	{
		if(!condition) 
			document.getElementById("voipform1").style.display="none";		 
		else{
			document.getElementById("voipform1").style.display="inline";
			//obj=document.getElementById("webimFloat");
			//alert(obj.offsetTop);			 
			document.getElementById("voipform1").style.top=document.body.scrollTop+50; 
			document.getElementById("voipstatus").innerHTML=''; 
			//document.body.offsetTop;
		}
	}
	function voipInput()
	{
		var path=urlhead+frmIP+"/";
		var obj="<div id='voipform1' style=\"position:absolute;top:90px;left:250px;width:415px;height:140px;display:none;border:2px groove;margin:0px;padding:0px;background-image:url('"+path+"img/talk/bg.gif');\" ondragstart='setCapture();ydxx=event.x-this.offsetLeft;ydyy=event.y-this.offsetTop;' ondrag='this.style.left=event.x-ydxx;this.style.top=event.y-ydyy' ondragend='releaseCapture();'>";
		 
		obj =obj+"<table border='0' cellpadding='0' cellspacing='0' width='100%'>";
		obj =obj+"<tr><td style=\"padding-left:2px;width:100%;color:#FF0000;font-size:12px;filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#C0C0C0', endColorStr='#FFFFFF', gradientType='0');\" valign='middle'>";
		obj =obj+"<img src='"+path+"img/talk/move.gif' style='' align='top'> 免费电话</td>";		
		obj =obj+"<td style=\"padding-right:5px;filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#C0C0C0', endColorStr='#FFFFFF', gradientType='0');\">";
		obj =obj+"<img src='"+path+"img/talk/cls.gif' onClick=\"voipform1.style.display='none';\" title=' 关闭' style='cursor:hand;'>";
		obj =obj+"</td></tr>";
		obj =obj+"<tr><td colspan='2' style=\"padding:5px;\">";
		obj =obj+"<table width='100%' border='0' style=\"font-size:12px;background-image:url('"+path+"img/talk/bg.gif');\" height='93'>";
		obj =obj+"<tr><td align='left' height='14'>输入您的电话号码,座机前加区号，手机前加0 工作人员即刻和您接通</td></tr>";
		obj =obj+"<tr><td align='center'> 电话:<input id='phone' name='phone' value='0' onKeyPress=\"if(event.keyCode==13){sendvoip1();return false;}\" style=\"background-image:url('"+path+"img/talk/clarity.gif');border:0px sloid;border-bottom:1px solid #FF0000;font-family:Arial;font-weight:bold;color:#990000;\"></td>";
		obj =obj+"</tr><tr><td align='center' height='27' width='100%' style=\"padding-top:10px;\">";
		obj =obj+"<P align='center'><input type='image' src='"+path+"img/talk/ok.gif' onClick=\"sendvoip1();\">&nbsp;&nbsp;&nbsp;";
		obj =obj+"<input type='image' src='"+path+"img/talk/canal.gif' onClick=\"voipform1.style.display='none';\" title='取消'>";
		obj =obj+"</P></td></tr><tr><td id='voipstatus'></td></tr></table></td></tr></table></div>";
 
		var strdiv1 = document.createElement("div");
		
		strdiv1.innerHTML = obj;
		document.body.appendChild(strdiv1);
		document.getElementById("voipform1").style.top=document.body.clientHeight/2;
		document.getElementById("voipform1").style.left=100; 
	}

	function sendvoip1()
	{   
		if(phone=="")
		{
			alert("必须输入有效电话号码");
			return;
		}
		//areacode.value="";phone.value="";ext.value="";
		//document.getElementById("voipform1").style.display="none";
		var url="/msgManager.jsp?a=200&vid="+vid+"&toid="+theToId+"&phone="+escape(phone.value);
		//msgread(url,true,objsend,null);
		document.getElementById("voipstatus").innerHTML='电话请求已发送,请等待...';
		ydSendMsg(urlhead+frmIP+url);
		//insertMsg("",2,formatdate(),"电话请求已发送,请等待...");
	}
var guokeLastScrollY=0; 
function moveGuokeFloat()
{
  var diffY=document.body.scrollTop; 
  var percent=1*(diffY-guokeLastScrollY); 
  if(percent>0){
	percent=Math.ceil(percent); 
  }
  else {
	percent=Math.floor(percent); 
  }
  if(document.getElementById("guokeWin"))
  	document.getElementById("guokeWin").style.pixelTop+=percent;   
  //if(document.getElementById("gklt"))
  //	document.getElementById("gklt").style.pixelTop+=percent;   
  guokeLastScrollY+=percent; 
}	 

	function getScrollTop()
	{
		//return (document.body)?document.body.scrollTop:document.body.scrollTop; 
		if(document.documentElement.clientHeight==0)
			return document.body.scrollTop;			 
		return document.documentElement.scrollTop;
	}
	function getClientHeight()
	{
		if(document.documentElement.clientHeight==0)
			return document.body.clientHeight;
		return document.documentElement.clientHeight;
	} 	 
	function checkGuokeWin()
	{		 
		if(document.getElementById("gkLeft").style.display=="inline" && 
		   document.getElementById("guokeWin").style.pixelTop != getClientHeight() + getScrollTop() - 190)
			document.getElementById("guokeWin").style.pixelTop = getClientHeight() + getScrollTop() - 190;
		if(document.getElementById("gkLeft").style.display=="none" && 
		   document.getElementById("guokeWin").style.pixelTop != getClientHeight() + getScrollTop() - 30)
			document.getElementById("guokeWin").style.pixelTop = getClientHeight() + getScrollTop() - 30;
	}
	function moveGK(p)
	{
		if(p==0){			 			
			document.getElementById("gkLeft").style.display='none';	
			document.getElementById("guokeWin").style.pixelTop = getClientHeight() + getScrollTop() - 30;	
		}
		else{			 
			document.getElementById("gkLeft").style.display='inline';
			document.getElementById("guokeWin").style.pixelTop = getClientHeight() + getScrollTop() - 190;	
		}
	}	
	function resizeWin()
	{
  	  	document.getElementById("guokeWin").style.pixelLeft =document.body.clientWidth - 333; 
		if( document.getElementById("inSize").style.display=='none' )			 
			document.getElementById("guokeWin").style.pixelTop =getClientHeight() + getScrollTop() - 30;	
		else			  
			document.getElementById("guokeWin").style.pixelTop =getClientHeight() + getScrollTop() - 190;		
	}
	
	function guoke()
	{ 
		var path=urlhead+frmIP+"/";
		var obj="<div id='guokeWin' style=\"position:absolute;top:90px;left:250px;width:334px;height:170px;display:inline;border:2px groove;margin:0px;padding:0px;background-image:url('"+path+"img/talk/bg.gif');\" ondragstart='setCapture();ydxx=event.x-this.offsetLeft;ydyy=event.y-this.offsetTop;' ondrag='this.style.left=event.x-ydxx;this.style.top=event.y-ydyy' ondragend='releaseCapture();'>";
		obj =obj+"<table border='0' cellpadding='0' cellspacing='0' width='100%'>";		 
		if(guokeLogo!=null)
			obj =obj+"<tr height='24' style='background-image:url(http://"+guokeLogo+");'><td>";
		else
			obj =obj+"<tr height='24' style='background-image:url("+path+"img/manage/gktop.gif);'><td>";
		 
		obj =obj+"<table><tr><td width='70'></td>";
		obj =obj+"<td width='50' style='font-size:12px;'><div id='numberOfGuokes'> 过客</div></td>";	
		obj =obj+"<td width='200'><div style='height:20px'><iframe id='gkTopAdvert' width='100%' height='20' scrolling='no' frameborder='0' src='"+unescape(gkTopAdvert)+"'></iframe></div></td>";			 
		obj =obj+"<td><img id='inSize' src='"+path+"img/manage/gkinsize.gif' onClick=\"inSize.style.display='none';outSize.style.display='inline';moveGK(0);\" title=' 缩小' style='cursor:hand;'></td>";
		obj =obj+"<td><img id='outSize' src='"+path+"img/manage/gkoutsize.gif' onClick=\"inSize.style.display='inline';outSize.style.display='none';moveGK(1);\" title=' 放大' style='cursor:hand;'></td>";
		
		obj =obj+"</tr></table></td></tr>";

		obj =obj+"<tr><td align='left' style=\"padding:0px;\">";
		obj =obj+"<div id='gkLeft'><table id='gkBody' width='100%' border='0' cellpadding='0' cellspacing='0'><tr><td align='left' width='235' style=\"padding:0px;\">";
		obj =obj+"<table width='100%' border='0' style=\"font-size:12px;background-image:url('"+path+"img/talk/bg.gif');\" height='100%'>";
		obj =obj+"<tr><td colspan='2' align='left' width='100%' id='gkMsg'><div id='HistoryList1' style='color:gray;font-size:12;font-family:宋体;OVERFLOW:auto;LEFT:0px;WIDTH:235px;HEIGHT:110px;padding-top:0px;padding-left:0px;background-color:ivory;'></div></td></tr>";
		
		obj =obj+"<tr><td align='left' width='235'><table bgcolor='ivory' width='100%'><tr><td width='160'><div id='guokeMsg' contenteditable onkeypress='SendMsg1();'  style='color:gray;font-size:14;font-family:宋体;OVERFLOW:auto;LEFT:0px;WIDTH:100%;HEIGHT:35px;padding-top:0px;padding-left:0px;background-color:ivory;'></div></td>";
		obj =obj+"<td align='left' width='60'><div id='gkSend'><img id='sendImg' src='"+path+"img/guokeSend.gif' align='left' onClick=\"SendMsg1();\" ></div></td></tr></table></td></tr>";
		obj =obj+"</table></td>";
		obj =obj+"<td width='100%' align='middle' style=\"padding:0px;\"><div id='gkAd' style='color:gray;font-size:12;font-family:宋体;OVERFLOW:auto;LEFT:0px;WIDTH:85px;HEIGHT:156px;padding-top:0px;padding-left:0px;background-color:ivory;'><iframe id='gkAdvert' width='100%' height='100%' scrolling='no' frameborder='0' src='"+unescape(gkAdvert)+"'></iframe></div></td></tr></table></div>";
		
		obj =obj+"</td></tr></table></div>"; 
		var strdiv1 = document.createElement("div");		
		strdiv1.innerHTML = obj;
		document.body.appendChild(strdiv1);	
		
		document.getElementById("guokeWin").style.pixelLeft =document.body.clientWidth - 333; 
		 
		HistoryList1.innerHTML +="系统：你正在和同网站的其他访客聊天"+guokeMsg.innerHTML+"<br>";
		 		 
		document.getElementById("gkLeft").style.display='none';	
		document.getElementById("guokeWin").style.height=24+'px';			
		document.getElementById("inSize").style.display='none';
		document.getElementById("outSize").style.display='inline';
		document.getElementById("guokeWin").style.pixelTop =getClientHeight() - 30; 
		 	
		if(guokeType == '2'){
			inSize.style.display='inline';
			outSize.style.display='none';
       			moveGK(1);	
		}
		if(getCookie("guokeMSG") != null){
			HistoryList1.innerHTML =getCookie("guokeMSG");	
			//alert(getCookie("guokeMSG"));		 
			document.getElementById("HistoryList1").scrollTop=32000;  
		}
		window.attachEvent("onresize",resizeWin);
	}
	function sendGuokeMsg(msg)
	{
		ydSendMsg(urlhead+frmIP+"/msgManager.jsp?a=2&guoke=true&url="+escape(document.URL)+"&vid="+vid+"&msg="+escape(msg));
	}

   function SendMsg1()
   {
		if(event.keyCode!=0)
			if(!(event.keyCode==13&&!event.shiftKey))
				return true;				
		event.keyCode=0;
		if(guokeMsg.innerHTML=="")
		{
			alert("不能发送空信息");
			return;
		}
		HistoryList1.innerHTML +="你说："+guokeMsg.innerHTML+"<br>";
		//document.getElementById("HistoryList1").style.OVERFLOW="auto";
		 
		//SendMessage1(guokeMsg.innerHTML);
		ydSendMsg(urlhead+frmIP+"/msgManager.jsp?a=2&guoke=true&url="+escape(document.URL)+"&vid="+vid+"&msg="+escape(guokeMsg.innerHTML));
         
		
		guokeMsg.innerHTML="";
		guokeMsg.focus();	
		document.getElementById("HistoryList1").scrollTop=32000;  	
		return false;		
   }
   function setCookie(name, value, expire) {   
 	//window.document.cookie = name + "=" + escape(value) + ((expire == null) ? "" : ("; expires=" + expire.toGMTString()));
	var domain=null;
	document.cookie = name + "=" + escape(value) +";path=/"+ ((domain)?";domain="+domain:"") + ((expire == null) ? "" : ("; expires=" + expire.toGMTString())); 
   }
   function getCookie(Name) {   
  	var search = Name + "=";
  	if (window.document.cookie.length > 0) { // if there are any cookies
    		offset = window.document.cookie.indexOf(search);
        	if (offset != -1) { // if cookie exists
      			offset += search.length;          // set index of beginning of value
        		end = window.document.cookie.indexOf(";", offset)          // set index of end of cookie value
        		if (end == -1)
            			end = window.document.cookie.length;
          		return unescape(window.document.cookie.substring(offset, end));
    		}
  	}
  	return null;
   }
   var floatLastScrollY=0; 
function moveFloat()
{
  var diffY=document.body.scrollTop; 
  var percent=1*(diffY-floatLastScrollY); 
  if(percent>0){
	percent=Math.ceil(percent); 
  }
  else {
	percent=Math.floor(percent); 
  }
  if(document.getElementById("floatAdmin"))
  	document.getElementById("floatAdmin").style.pixelTop+=percent;   
  floatLastScrollY+=percent; 	
}
   
  
var infoNodes;
if(document.all)
    ;//infoNodes = document.getElementById("xmlInfo").XMLDocument.documentElement.selectNodes("Product");
else{
    XMLDocument.prototype.loadXML = function(xmlString)
    {
        var childNodes = this.childNodes;
        for (var i = childNodes.length - 1; i >= 0; i--)
            this.removeChild(childNodes[i]);

        var dp = new DOMParser();
        var newDOM = dp.parseFromString(xmlString, "text/xml");
        var newElt = this.importNode(newDOM.documentElement, true);
        this.appendChild(newElt);
//alert(this);
    };

    // check for XPath implementation
    if( document.implementation.hasFeature("XPath", "3.0") )
    {
       // prototying the XMLDocument
       XMLDocument.prototype.selectNodes = function(cXPathString, xNode)
       {
          if( !xNode ) { xNode = this; } 
          var oNSResolver = this.createNSResolver(this.documentElement)
          var aItems = this.evaluate(cXPathString, xNode, oNSResolver, 
                       XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
          var aResult = [];
//alert("aItems.snapshotLength:"+aItems.snapshotLength);
          for( var i = 0; i < aItems.snapshotLength; i++)
          {
//alert(i+aResult[i]);
             aResult[i] =  aItems.snapshotItem(i);
          }
          return aResult;
       }

       // prototying the Element
       Element.prototype.selectNodes = function(cXPathString)
       {
          if(this.ownerDocument.selectNodes)
          {
             return this.ownerDocument.selectNodes(cXPathString, this);
          }
          else{throw "For XML Elements Only";}
       }
    }

    // check for XPath implementation
    if( document.implementation.hasFeature("XPath", "3.0") )
    {
//alert("check for XPath implementation...");
       // prototying the XMLDocument
       XMLDocument.prototype.selectSingleNode = function(cXPathString, xNode)
       {
//alert("XMLDocument.prototype.selectSingleNode");
          if( !xNode ) { xNode = this; } 
          var xItems = this.selectNodes(cXPathString, xNode);
          if( xItems.length > 0 )
          {
             return xItems[0];
          }
          else
          {
             return null;
          }
       }
       
       // prototying the Element
       Element.prototype.selectSingleNode = function(cXPathString)
       {  
//alert("vvvvvvv");  
          if(this.ownerDocument.selectSingleNode)
          {
             return this.ownerDocument.selectSingleNode(cXPathString, this);
          }
          else{alert("For XML Elements Only");throw "For XML Elements Only";}
       }
    }

  // 创建 XML 文档对象
  //var xmlRef = document.implementation.createDocument("text/xml", "", null);
  // 使用 importNode 将HTML DOM 的一部分转换为XML 文档。 
  // 参数 true 表示克隆全部子元素。
  //var myNode = document.getElementById("xmlInfo");
  //xmlRef.loadXML(myNode.innerHTML);
  //infoNodes = xmlRef.documentElement.childNodes;
}
   //get xml dom object according to different browser
   function getXmlObj(){
	if (navigator.appName == 'Netscape')
		return new XMLHttpRequest();
	else		
		return new ActiveXObject("Microsoft.XMLDOM");
   }
if (navigator.appName == 'Netscape')  	 
	inithosts();