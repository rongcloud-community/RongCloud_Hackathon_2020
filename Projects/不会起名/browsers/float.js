		var hlist=null;
		var bWait=false;
		var xmlDoc = null;
try{xmlDoc = new XMLHttpRequest();}catch(e){ xmlDoc = new ActiveXObject("Microsoft.XMLDOM"); }
		var ydfloathtml=null;
		var initimer=null;
		var floatype="0",floatdiv=null;
		var isall=false;
		var crcIdsf=""; //�������ظ���������У�����Ϣ��ȡ���
		var theToId=""; //�ͻ��˹���Ա��id	
		var moveGuokeInterval=null; //���ʹ�Ų���߳�		 
		
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
				var s=document.body.tagName; 
				sysinit();
 if(guokeType != '1')
	guoke();
				if(initimer!=null)
					window.clearInterval(initimer);
			}
			catch(e)
			{
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
			
			//isinit() returns true				
			if(hlist==null)
				hlist=new HostList();
			else
				hlist.Clear();				
			nodelist=node.childNodes;
			var id,name,state,divid;
			var mbenabled,voipenabled;
			var stateimg;							
			for( var ni=0;ni<nodelist.length;ni++)
			{

				var node=nodelist.item(ni);
				if(node.nodeName=="YdGroup")
				{

					hlist.AddGroup(node.getAttribute("name"));
					for( var nj=0;nj<node.childNodes.length;nj++)
					{
						node2=node.childNodes.item(nj);
						id=node2.getAttribute("id");name=node2.getAttribute("name");state=node2.getAttribute("state");
						divid=node2.getAttribute("divid");
						mbenabled="false";voipenabled="false";
						if(node2.getAttribute("mbenabled")!=null)
							mbenabled=node2.getAttribute("mbenabled");
						if(node2.getAttribute("voipenabled")!=null)
							voipenabled=node2.getAttribute("voipenabled");					
						hlist.AddHost(new HOST(id,name,state,mbenabled,voipenabled,(divid==""||divid==null)?floatdiv:divid));
					}
				}
				else if(node.nodeName=="Host")
				{
					id=node.getAttribute("id");name=node.getAttribute("name");state=node.getAttribute("state");
					mbenabled="false";voipenabled="false";
					divid=node.getAttribute("divid");
					stateimg=node.getAttribute("stateimg");					
					if(node.getAttribute("mbenabled")!=null)
						mbenabled=node.getAttribute("mbenabled");
					if(node.getAttribute("voipenabled")!=null)
						voipenabled=node.getAttribute("voipenabled");						
					hlist.AddHost(new HOST(id,name,state,mbenabled,voipenabled,(divid==""||divid==null)?floatdiv:divid,stateimg));
				}
				else if(node.nodeName=="YdAll"&&floatype=="0")
					hlist.AddAll();
			}		
		}		
		function sysinit()
		{
			loadydcss(frmIP);		
			var node=hostids.XMLDocument.selectSingleNode("//Hosts"),node2;			
			if(node==null)
			{
				initTransfer();
				window.setInterval('ReadMessage()',5000);
				window.attachEvent("onunload",SayMeOffPage);
				return;
			} 
			sethostlist(node);			
			if(isinit())
			{
				if(floatype=="0")
				{
					ydfloathtml=document.getElementById("ydbase").innerHTML;			
					window.setInterval("cycle()",100);
					//2006-5-11 
					if(autohide)
						hlist.ydf.controlor.click();
				}
				initTransfer();
				window.setInterval('ReadMessage()',15000);
				window.attachEvent("onunload",SayMeOffPage);					
			}			
		}		
		function ShowInvitation(frmid,content)
		{
			invite(xmlinvite,frmid,content,null);
		}
		
		function ReadMessage()
		{  
			ydSendMsg(urlhead+frmIP+"/msgManager.jsp?a=3&url="+escape(document.URL)+"&vid="+vid+"&crcIds="+crcIdsf);
 
		}		
		function HOST(id,name,state,mbenabled,voipenabled,divid,customimg)
		{
			this.id=id;
			this.name=name;
			this.state=state;//offline
			this.mbenabled=mbenabled;
			this.voipenabled=voipenabled;
			this.HostList=null;
			this.statelabel=null;
			this.stateimg=null;
			this.div=null;
			this.divid=divid;
			this.custimg=customimg;
			this.Create=function(list)
			{
				this.HostList=list;
				var objholder;				
				if(this.divid!=null&&this.custimg!=null)
				{
					objholder=document.getElementById(this.divid);
					if(objholder!=null)
					{
						var objimg=document.createElement("img");
						objimg.style.cursor="hand";objimg.src=this.custimg;
						objholder.onclick=function()
						{
							talkto(id);					
						}
						objholder.appendChild(objimg);
					}
				}
				else
				{
					yidu_a=document.createElement("a");
					yidu_a.style.cursor="hand";yidu_a.href="#";yidu_a.style.color="#000";yidu_a.style.fontSize="12px";
					yidu_a.style.textDecoration="none";
					ydimg=document.createElement("img");
					ydimg.border=0;
					ydimg.src=this.getImage(this.state,this.mbenabled,this.voipenabled);
					ydimg.width=12;ydimg.height=12;ydimg.style.marginLeft='0.8mm';
					yidu_a.appendChild(ydimg);
					this.stateimg=ydimg;
					label=document.createElement("label");
					label.innerText=this.name;label.style.marginLeft='0.8mm';
					yidu_a.appendChild(label);
					label=document.createElement("label");
					label.id=yidu_a.id;
					this.statelabel=label;					
					this.SetState(this.state,this.mbenabled,this.voipenabled);														
					yidu_a.appendChild(label);					
					yidu_a.onclick=function()
					{
						talkto(id);					
					}					
					if(floatype=="0"||(floatdiv!=null&&floatdiv!=""))
					{
						br=document.createElement("BR");
						yidu_a.appendChild(br);
					}					
					this.div=yidu_a;					
					yidu_a.style.display="inline";									
					if(floatype=="0")
						list.contentarea.appendChild(yidu_a);
					else if(floatype=="1"&&this.divid!=null&&this.divid!="")
					{
						var objholder=document.getElementById(this.divid);
						if(objholder!=null)
							objholder.appendChild(yidu_a);
					}
				}
			}			
			this.getImage=function(state,mbenabled,voipenabled)
			{
				var ydimg=urlhead+frmIP+"/img/status/";
				state=state.toString().toUpperCase();
				mbenabled=mbenabled.toString().toUpperCase();
				voipenabled=voipenabled.toString().toUpperCase();
				switch(state)
				{
					case "OFFLINE":
					    if(voipenabled=="TRUE")
							ydimg+="phone.gif";
						else if(mbenabled=="TRUE")
							ydimg+="offline_mobilephone.gif";
						else
							ydimg+="offline.gif";
						break;
					default:
						ydimg+=state.toLowerCase()+".gif";
						break;
				}
				return ydimg;
			}			
			this.getStateName=function(state,mbenabled,voipenabled)
			{
				var s="[";
				switch(state)
				{
					case "OFFLINE":
						if(voipenabled=="TRUE")
							s+="<font color=blue>�绰</font>";
						else
							s+=(mbenabled=="TRUE")?"<font color=blue>����</font>":"����";
						break;
					case "ONLINE":
					case "TALKING":
						s+="����";
						break;
					case "BUSY":
						s+="��æ";
						break;
					case "LEFT":
						s+="�뿪";
						break;
					case "ONPHONE":
						s+="ͨ��";
						break;																					
				}
				return s+"]";
			}			
			this.SetState=function(state,mbenabled,voipenabled)
			{
				this.state=state;
				mbenabled=mbenabled.toString().toUpperCase();
				voipenabled=voipenabled.toString().toUpperCase();
				this.statelabel.innerHTML=this.getStateName(state,mbenabled,voipenabled);
				switch(this.state.toString().toUpperCase())
				{
					case "OFFLINE":
						if(voipenabled=="TRUE")
							this.statelabel.title="�û�������,����ʹ����ѵ绰ͨ��������";						
						else if(mbenabled=="TRUE")
							this.statelabel.title="�û�������,�������Ի򷢶���";
						else
							this.statelabel.title="�û�������,����ֱ������";						
						this.statelabel.style.color="gray";						
						break;
					default:
						this.statelabel.style.color="red";
						this.statelabel.title="";						
						break;
				}
				this.stateimg.src=this.getImage(this.state,this.mbenabled,this.voipenabled);
			}
			
			return this;
		}		
		function HostList(nocreate)
		{
			 
			this.hosts=new Array();
			this.ydf=null;
			try
			{
				
				if(!isall)
				{
					alert(isall);
					this.ydf = new ydfloat(xmlfloat,0,frmIP);
					alert(isall);
					this.ydf.initialization();   //ok
					alert(floatype);
					if(floatype=="0")
					{
 
						this.ydf.creatfloat(align,xpos,ypos);
					}					
				}
				else
					this.ydf=new alllistfloat();
			}
			catch(e)
			{}

			this.contentarea=document.getElementById("contentarea");		
			this.Clear=function()
			{
				if(this.contentarea!=null)
					this.contentarea.innerText="";			
			}			
			this.AddHost=function (host)
			{
				this.hosts[this.hosts.length]=host;
				host.Create(this);
			}						
			this.AddAll=function()
			{
				if(this.contentarea!=null)
				{
					tbl=document.createElement("hr");
					this.contentarea.appendChild(tbl);
					tbl=document.createElement("div");
					tbl.innerHTML="<table title='����鿴������Ա' style='cursor:hand' onclick='viewall();' border=0 cellpadding=0 cellspacing=0 width=100%><tr><td style=height:15px;color:green;font-size:12px;text-align:center;padding-top:0px;><img border='0' width='12' height='12' src="+urlhead+frmIP+"/img/im.gif>&nbsp;������Ա</td></tr></table>";
					this.contentarea.appendChild(tbl);
				}
			}			
			this.AddGroup=function(grpname)
			{
				tbl=this.ydf.creatGroupTitle(grpname)
				if(floatype=="0")
					this.contentarea.appendChild(tbl);
				else if(floatype=="1"&&floatdiv!=null)
					document.getElementById(floatdiv).appendChild(tbl);
			}			
			this.SetState=function(id,state)
			{
				thehost=null;
				for(var ni=0;ni<this.hosts.length;ni++)
					if(this.hosts[ni].id==id)
					{
						thehost=this.hosts[ni];
						break;
					}				
				if(thehost!=null)
					thehost.SetState(state);
			}							
			this.Host=function(id)
			{
				for(var ni=0;ni<this.hosts.length;ni++)
					if(this.hosts[ni].id==id)
						return this.hosts[ni];				
				return null;
			}			
			this.Remove=function(id)
			{
				for(var ni=0;ni<this.hosts.length;ni++)
					if(this.hosts[ni].id==id)
					{
						this.hosts[ni].div.style.display="none";
						this.hosts[ni].div.removeNode(true);
						this.hosts.splice(ni,1);
						return;
					}					
			}			
			return this;
		}	
	function SayMeOffPage()
	{
		var expire=new Date();
		expire.setTime( expire.getTime()+1*24*60*60*1000 ); //����1��
		setCookie("guokeMSG", document.getElementById("HistoryList1").innerHTML,expire);
 		//if(event.clientX<=0 && event.clientY<0)
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
		//var messageIds=""; //�Ѿ���ȡ�����صĶ���Ϣid
		crcIdsf="";
		for(var ni=0;ni<nodelist.length;ni++)
		{
			node=nodelist.item(ni);
			//messageIds +=node.getAttribute("id")+",";//����Ѿ���ȡ�����صĶ���Ϣid
			if(crcIdsf != node.getAttribute("id") && crcIdsf.indexOf(","+node.getAttribute("id")+",")<0)
				crcIdsf +=node.getAttribute("id")+",";//����Ѿ���ȡ�����صĶ���Ϣid
			msgtype=node.getAttribute("tp");frmid=node.getAttribute("f");toid=node.getAttribute("t");
			msg=unescape(node.getAttribute("m"));
			switch(msgtype)
			{
				case "INITHOSTS":
					sethostlist(node.firstChild);
					if(floatype=="0")
					{
						ydfloathtml=document.getElementById("ydbase").innerHTML;			
						window.setInterval("cycle()",300);
					}					
					break;				
				case "INVITATION":
					ShowInvitation(frmid,msg);
					break;
				case "ONPAGEINIT":
					xmldoc = null;
try{xmldoc = new XMLHttpRequest();}catch(e){ xmldoc = new ActiveXObject("Microsoft.XMLDOM"); } 
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
						host=hlist.Host(id);
						if(host==null)
							hlist.AddHost(new HOST(id,name,state,mbenabled,voipenabled));
						else
						{
							host.name=name;host.state=state;host.mbenabled=mbenabled;host.voipenabled=voipenabled;
							host.SetState(state,mbenabled,voipenabled);
						}
					}
					break;
				case "STATECHANGE":
					if(hlist!=null)
					{
						host=hlist.Host(frmid);
						if(host!=null)
						{
							host.state=msg;
							host.SetState(msg,host.mbenabled,host.voipenabled);
						}
					}					
					break;
				case "GKMSG":	
					if(frmid != vid){					  
					  var from=frmid;
					  if(from.length>4)
						from=from.substring(from.length-4);
					  if(msg=="OPENGUOKE")
						document.getElementById("HistoryList1").innerHTML +="��ϵͳ��:"+from+"������ʹ�<br>";
					  else if(msg=="CLOSEGUOKE")
						document.getElementById("HistoryList1").innerHTML +="��ϵͳ��:"+from+"�رչ��ʹ�<br>";
					  else
					  	document.getElementById("HistoryList1").innerHTML +="��"+from+"��:"+msg+"<br>";
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
				case "ADVERT":  //���					 
					document.getElementById("gkAdvert").src="http://"+Msg;
					window.focus();
					break;
				case "TOPADVERT":  //���					 
					document.getElementById("gkTopAdvert").src="http://"+Msg;
					window.focus();
					break;
				case "NUMBEROFGUOKES":	
					document.getElementById("numberOfGuokes").innerHTML=msg+"����";
					break;
				case "REMOVE":
					if(hlist!=null)
						hlist.Remove(frmid);
					break;
				case "REFRESH":
					hostids.XMLDocument.loadXML(msg);
					inithosts();
					break;
			}
		}		
	    }catch(e){} 	    
	}
	var inviteContent="";	
	function invite(xmlfile,id,content,ydimg)
	{
		var strInvite		= "";
		var xmlobj		= null;
try{xmlobj = new XMLHttpRequest();}catch(e){ xmlobj = new ActiveXObject("Microsoft.XMLDOM"); } 
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
		strdiv.innerHTML = strInvite;
		document.body.appendChild(strdiv);
		window.setTimeout("addContent('cont_"+id+"')",100); 
		window.focus();
		
	}	 
	function addContent(objid)
	{
		var objframe=document.frames(objid);
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
function ydfloat(xmlobj,n,frm)
	{
		var xmldata	= null;
		
//try{xmldata = new XMLHttpRequest();}catch(e){ xmldata = new ActiveXObject("Microsoft.XMLDOM"); } 
alert(navigator.appName);
xmldata = new ActiveXObject("Microsoft.XMLDOM"); 
		this.yd_float = null;
		this.yd_content	 =	 null;
		this.yd_frm = "";
		this.floatAttribute		= null;
		this.headAttribute		= null;
		this.borderAttribute	= null;
		this.cententAttribute	= null;
		this.footAttribute			= null;
		this.controlAttribute	= null;
		this.strhead				= "";
		this.strleftborder		= "";
		this.strrightborder	= "";
		this.strcontent			= "";
		this.strfoot				= "";
		this.strcontrol			= "";
		//2006-5-11
		this.controlor			= "";
		this.initialization=function()
		{		
			if (frm!=null&&frm!="")
			{
				this.yd_frm=urlhead+frm+"/img/float/"+floatImgType+"/";
			}
			
			if (n==0)
			{				 
				alert(xmlobj);
				xmldata.loadXML(xmlobj);
				
			}else if(n==1)
			{
				xmldata.load(xmlobj);
			}
			alert(this.yd_frm);
			if (xmldata.documentElement==null)
			{
				return;
			}
			var s="";
			var str="";
			s="//param";
			this.floatAttribute = xmldata.selectSingleNode(s);

			s="//head";
			this.headAttribute = xmldata.selectSingleNode(s);
			s="//border";
			this.borderAttribute	= xmldata.selectSingleNode(s);
			s="//centent";
			this.cententAttribute = xmldata.selectSingleNode(s);
			s="//foot";
			this.footAttribute = xmldata.selectSingleNode(s);
			s="//hiddenccontrol";
			this.controlAttribute = xmldata.selectSingleNode(s);
			//get head
			
			if (this.headAttribute!=null)
			{
				str = str + "<tr>";
				str = str + "<td colspan='3' style='height:"+(this.headAttribute.selectSingleNode("..//head/height").text)+"px;background-image:url("+(this.yd_frm+this.headAttribute.selectSingleNode("..//background").text)+");'>";
				str = str + "<div style='width:10px;padding:"+(this.headAttribute.selectSingleNode("..//padding").text)+"px;' title=''><table cellpadding='0' cellspacing='0'><tr><td style='cursor:move;' onclick=window.open('http://www.100im.cn')>"+yd_getImage(this.yd_frm+(this.headAttribute.selectSingleNode("..//dragimage").text))+"</td></tr></table></nobr></div>";
				str = str + "</td>";
				str = str + "</tr>";
				this.strhead	= str;
				str="";
			}
			if (this.borderAttribute!=null)
			{
				str = str + "<td style='width:"+(this.borderAttribute.selectSingleNode("..//leftwidth").text)+"px;background-image:url("+(this.yd_frm+this.borderAttribute.selectSingleNode("..//leftimage").text)+");'>"+(yd_getImage(this.yd_frm+this.borderAttribute.selectSingleNode("..//fillimage").text))+"</td>";
				this.strleftborder	= str;
				str="";
			}
			if (this.borderAttribute!=null)
			{
				str = str + "<td  style='width:"+(this.borderAttribute.selectSingleNode("..//rigthwidth").text)+"px;background-image:url("+(this.yd_frm+this.borderAttribute.selectSingleNode("..//rigthimage").text)+");'>"+(yd_getImage(this.yd_frm+this.borderAttribute.selectSingleNode("..//fillimage").text))+"</td>";
				this.strrightborder	= str;
				str="";
			}
			this.strcontent	= "<td id='cententtd' align='center'></td>";
			if(floatfootnote!="")
			{
				str = str + "<tr>";
				str = str + "<td colspan='3' align='center' valign='middle' style='height:"+(this.footAttribute.selectSingleNode("..//foot/height").text)+"px;background-image:url("+(this.yd_frm+this.footAttribute.selectSingleNode("..//foot/background").text)+");padding:"+(this.footAttribute.selectSingleNode("..//foot/padding").text)+";'>";
				str = str + unescape(floatfootnote); 
				str = str + "</td>";
				str = str + "</tr>";
			}
			else if (this.footAttribute!=null)
			{
				str = str + "<tr>";
				str = str + "<td colspan='3' align='middle' valign='middle' style='height:"+(this.footAttribute.selectSingleNode("..//foot/height").text)+"px;background-image:url("+(this.yd_frm+this.footAttribute.selectSingleNode("..//foot/background").text)+");padding:"+(this.footAttribute.selectSingleNode("..//foot/padding").text)+";'>";
				str = str + "<span onclick='"+(this.footAttribute.selectSingleNode("..//link").text)+"' title='"+(this.footAttribute.selectSingleNode("..//text").text)+"' style='cursor:hand;text-align:center;padding:"+(this.footAttribute.selectSingleNode("..//foot/padding").text)+"px;width:100%;height:100%;border:0px solid;'>"+yd_getImage(this.yd_frm+this.footAttribute.selectSingleNode("..//footimg").text)+"</span>";
				str = str + "</td>";
				str = str + "</tr>";
			}
			this.strfoot	= str;
			str="";

			if (this.controlAttribute!=null)
			{
				//2006-5-11
				str = str + "<div id='controlor'   style='cursor:hand;width:20px;border:0px solid;"+(this.controlAttribute.selectSingleNode("..//position").text)+"' onclick=clo(ydbase);if(onlinetalk.style.display=='none'){col.src='"+(this.yd_frm+this.controlAttribute.selectSingleNode("..//hiddenimage").text)+"';col.title='[�����ʾ]';onlinetalk.style.display='inline';}else{col.src='"+(this.yd_frm+this.controlAttribute.selectSingleNode("..//displayimage").text)+"';col.title='[�������]';onlinetalk.style.display='none';}><img title='[�������]' src='"+(this.yd_frm+this.controlAttribute.selectSingleNode("..//hiddenimage").text)+"' wdith='0' height='0' onload='d=1;'><img id='col' src='"+(this.yd_frm+this.controlAttribute.selectSingleNode("..//displayimage").text)+"' title='[�������]' ondrag='return false' />";
				str = str + "<div id='onlinetalk'   onmouseover=clo(ydbase);if(onlinetalk.style.display=='none'){col.src='"+(this.yd_frm+this.controlAttribute.selectSingleNode("..//hiddenimage").text)+"';col.title='[�����ʾ]';onlinetalk.style.display='inline';}else{col.src='"+(this.yd_frm+this.controlAttribute.selectSingleNode("..//displayimage").text)+"';d=d+1;col.title='[�������]';onlinetalk.style.display='none';} style='width:20px;height:60px;border:1px solid #CC9900;border-left:0px solid;display:none;padding-top:2px;padding-bottom:3px;color:"+(this.controlAttribute.selectSingleNode("..//hiddenccontrol/fontcolor").text)+";font-size:12px;background:#FFFFEB;text-align:center;' ondrag='return false'><img ondrag='return false' src='"+(this.yd_frm+this.controlAttribute.selectSingleNode("..//flagimage").text)+"'>�����̸</div>";
				str = str + "</div>";
				//this.strcontrol	= str;
				str="";
			}
		}
	this.creatfloat=function(f_align,f_level,f_vertical)
	{
		alert(f_align+" "+f_level+" "+f_vertical);
			if (this.floatAttribute!=null)
			{
				var strFloat	= ""; 
				strFloat = strFloat + "<div id='ydbase' style='border:0px solid;z-index:100000;width:"+(this.floatAttribute.selectSingleNode("..//width").text)+";height:"+(this.floatAttribute.selectSingleNode("..//height").text)+"px;position:absolute;"+f_align+":"+f_level+"px;top:"+f_vertical+"px;' ondragstart='setCapture();ydxx=event.x-this.offsetLeft;ydyy=event.y-this.offsetTop;' ondrag='this.style.left=event.x-ydxx;this.style.top=event.y-ydyy' ondragend='releaseCapture();'>";
				strFloat = strFloat + this.strcontrol;
				strFloat = strFloat + "<table border='0' cellpadding='0' cellspacing='0' width='100%'>";
				strFloat = strFloat + this.strhead;
				strFloat = strFloat + "<tr>";
				strFloat = strFloat + this.strleftborder;
				strFloat = strFloat + this.strcontent;
				strFloat = strFloat + this.strrightborder;
				strFloat = strFloat + "</tr>";
				strFloat = strFloat + this.strfoot;
				strFloat = strFloat + "</table>";
				strFloat = strFloat + "</div>";
				var floatdiv=document.createElement("DIV");
				floatdiv.innerHTML=strFloat;
				document.body.appendChild(floatdiv);
				this.yd_float=document.getElementById("ydbase");
				if (this.cententAttribute!=null)
				{
					var cdiv=document.createElement("DIV");
					cdiv.id = "contentarea";
					cdiv.style.height = this.cententAttribute.selectSingleNode("..//centent/height").text+"px";
					cdiv.style.border= this.cententAttribute.selectSingleNode("..//centent/border").text;
					cdiv.style.background = this.cententAttribute.selectSingleNode("..//centent/background").text;
					cdiv.style.width=this.cententAttribute.selectSingleNode("..//centent/width").text;
					cdiv.style.paddingTop = "2px";
					this.yd_content = cdiv;
					document.getElementById("cententtd").appendChild(cdiv);
					//2006-5-11
					this.controlor=document.getElementById("controlor");
				}
			}
	}
	this.creatGroupTitle=function(gn)
	{
		if (this.cententAttribute!=null)
		{
			var str="";
			var groupname="";
			if (gn!=null&&gn!="")
			{
				groupname=gn;
			}else
			{
				groupname = "";
			}
			str = str + "<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin-top:2px;margin-bottom:5px;\"><tr>";
			//str = str + "<td style=\"width:3px;height:"+(this.cententAttribute.selectSingleNode("..//groupheight").text)+"px;background-image:url('"+(this.yd_frm+this.cententAttribute.selectSingleNode("..//leftbackground").text)+"');\"></td>";
			str = str + "<td style=\"line-height:normal;color:"+(this.cententAttribute.selectSingleNode("..//groupfontcolor").text)+";font-size:12px;text-align:center;padding:"+(this.cententAttribute.selectSingleNode("..//grouppadding").text)+";width:"+this.cententAttribute.selectSingleNode("..//groupwidth").text+"px;background-image:url('"+(this.yd_frm+this.cententAttribute.selectSingleNode("..//centerbackground").text)+"');\">"+groupname+"</td>";
			//str = str + "<td style=\"line-height:normal;width:3px;background-image:url('"+(this.yd_frm+this.cententAttribute.selectSingleNode("..//rightbackground").text)+"');\"></td>";
			str = str + "</tr></table>";
			var gdiv = document.createElement("DIV");
			gdiv.innerHTML = str;
			return gdiv;
		}
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
	function talkto(toid)
	{
		var curUrl=document.URL;
		var index=curUrl.indexOf("://");
		if(index>=0)
			curUrl=curUrl.substring(index+3);
		index=curUrl.indexOf("/");
		if(index>0)
			curUrl=curUrl.substring(0,index);
		var url = urlhead+frmIP+"/webTalkWindow.jsp?a=0&vid="+vid+"&toid="+toid+"&lancode="+lancode+"&frmurl="+curUrl;
		if(toid.substr(0,4)=='_ct_')
			toid=toid.substr(4);
		var yd_win_title=toid.replace("-","_").replace("@",""); 
		var win = window.open("", yd_win_title, "Status=no,scrollbars=on,resizable=yes,width=490,height=415,top=100,left=150"); // a window object
 		
		if(win==null)//while invited
		    win=window.frames("cont_"+toid).open("", yd_win_title, "Status=no,scrollbars=on,resizable=yes,width=490,height=415,top=100,left=150"); // a window object
		 
		win.document.open("text/html", "replace");
		//win.document.write("<table id=\"wait\"><tr><td>���Ժ����ڶ������...</td></tr></table>");		
		win.document.write("<html><head><title>����ID:["+vid+"] </title></head><body style='padding:0xp;margin:0px;'><iframe scrolling='no' frameborder='0' style='margin:0px;padding:0px;' src='"+url+"' width='100%' height='100%'></iframe></body></html>");
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
//////////////////////////////////
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
		return (document.body)?document.body.scrollTop:document.documentElement.scrollTop; 
	}
	 
	function inSizeGK()
	{
		if(document.getElementById("guokeWin").style.pixelTop < document.body.clientHeight +getScrollTop() - 30 )	
			document.getElementById("guokeWin").style.pixelTop +=10;		 
		else {
			window.clearInterval(moveGuokeInterval);		 
			document.getElementById("gkLeft").style.display='none';	
			document.getElementById("guokeWin").style.pixelTop = document.body.clientHeight + getScrollTop() - 30;			 
		}
	}
	function outSizeGK()
	{		 
		if(document.getElementById("guokeWin").style.pixelTop > document.body.clientHeight + getScrollTop() - 188 ){
			document.getElementById("gkLeft").style.display='inline';	
			document.getElementById("guokeWin").style.pixelTop -=10;
		}
		else{
			window.clearInterval(moveGuokeInterval);
			document.getElementById("guokeWin").style.pixelTop = document.body.clientHeight + getScrollTop() - 188;						 
		}
	}
	
	function moveGK(p)
	{
		if(p==0)
			moveGuokeInterval=window.setInterval("inSizeGK()",10);
		else{
			if( document.getElementById("inSize").style.display=='none' ){
				document.getElementById("outSize").style.display='none';
				document.getElementById("inSize").style.display='inline';
			}
			moveGuokeInterval=window.setInterval("outSizeGK()",10);
		}
	}
	function resizeWin()
	{
  	  	document.getElementById("guokeWin").style.pixelLeft =document.body.clientWidth - 333; 
		if( document.getElementById("inSize").style.display=='none' )
			document.getElementById("guokeWin").style.pixelTop =document.body.clientHeight - 30;	
		else
			document.getElementById("guokeWin").style.pixelTop =document.body.clientHeight - 188;		
	}
	
	function guoke()
	{ 
		var path=urlhead+frmIP+"/";
		var obj="<div id='guokeWin' style=\"position:absolute;top:90px;left:250px;width:334px;height:170px;display:inline;border:2px groove;margin:0px;padding:0px;background-image:url('"+path+"img/talk/bg.gif');\" ondragstart='setCapture();ydxx=event.x-this.offsetLeft;ydyy=event.y-this.offsetTop;' ondrag='this.style.left=event.x-ydxx;this.style.top=event.y-ydyy' ondragend='releaseCapture();'>";
		obj =obj+"<table border='0' cellpadding='0' cellspacing='0' width='100%'>";		 
		
		obj =obj+"<tr height='24' style='background-image:url("+path+"img/manage/gktop.gif);'><td>";
		obj =obj+"<table><tr><td width='70'></td>";
		obj =obj+"<td width='50' style='font-size:12px;'><div id='numberOfGuokes'> ����</div></td>";	
		obj =obj+"<td width='200'><div style='height:20px'><iframe id='gkTopAdvert' width='100%' height='20' scrolling='no' frameborder='0' src='"+unescape(gkTopAdvert)+"'></iframe></div></td>";			 
		obj =obj+"<td><img id='inSize' src='"+path+"img/manage/gkinsize.gif' onClick=\"inSize.style.display='none';outSize.style.display='inline';moveGK(0);\" title=' ��С' style='cursor:hand;'></td>";
		obj =obj+"<td><img id='outSize' src='"+path+"img/manage/gkoutsize.gif' onClick=\"inSize.style.display='inline';outSize.style.display='none';moveGK(1);\" title=' �Ŵ�' style='cursor:hand;'></td>";
		
		obj =obj+"</tr></table></td></tr>";

		obj =obj+"<tr><td align='left' style=\"padding:0px;\">";
		obj =obj+"<div id='gkLeft'><table id='gkBody' width='100%' border='0' cellpadding='0' cellspacing='0'><tr><td align='left' width='235' style=\"padding:0px;\">";
		obj =obj+"<table width='100%' border='0' style=\"font-size:12px;background-image:url('"+path+"img/talk/bg.gif');\" height='100%'>";
		obj =obj+"<tr><td colspan='2' align='left' width='100%' id='gkMsg'><div id='HistoryList1' style='color:gray;font-size:12;font-family:����;OVERFLOW:auto;LEFT:0px;WIDTH:235px;HEIGHT:110px;padding-top:0px;padding-left:0px;background-color:ivory;'></div></td></tr>";
		
		obj =obj+"<tr><td align='left' width='235'><table bgcolor='ivory' width='100%'><tr><td width='160'><div id='guokeMsg' contenteditable onkeypress='SendMsg1();'  style='color:gray;font-size:14;font-family:����;OVERFLOW:auto;LEFT:0px;WIDTH:100%;HEIGHT:35px;padding-top:0px;padding-left:0px;background-color:ivory;'></div></td>";
		obj =obj+"<td align='left' width='60'><div id='gkSend'><img id='sendImg' src='"+path+"img/guokeSend.gif' align='left' onClick=\"SendMsg1();\" ></div></td></tr></table></td></tr>";
		obj =obj+"</table></td>";
		obj =obj+"<td width='100%' align='middle' style=\"padding:0px;\"><div id='gkAd' style='color:gray;font-size:12;font-family:����;OVERFLOW:auto;LEFT:0px;WIDTH:85px;HEIGHT:156px;padding-top:0px;padding-left:0px;background-color:ivory;'><iframe id='gkAdvert' width='100%' height='100%' scrolling='no' frameborder='0' src='"+unescape(gkAdvert)+"'></iframe></div></td></tr></table></div>";
		
		obj =obj+"</td></tr></table></div>"; 
		var strdiv1 = document.createElement("div");		
		strdiv1.innerHTML = obj;
		document.body.appendChild(strdiv1);	
		
		document.getElementById("guokeWin").style.pixelLeft =document.body.clientWidth - 333; 
		document.getElementById("guokeWin").style.pixelTop =document.body.clientHeight - 188; 
		HistoryList1.innerHTML +="ϵͳ�������ں�ͬ��վ�������ÿ�����"+guokeMsg.innerHTML+"<br>";
		if(guokeType == '3'){ //���ع��ʹ�			 
			document.getElementById("gkLeft").style.display='none';	
			document.getElementById("guokeWin").style.height=24+'px';			
			document.getElementById("inSize").style.display='none';
			document.getElementById("outSize").style.display='inline';
			document.getElementById("guokeWin").style.pixelTop =document.body.clientHeight - 30; 
		}
		else
		{			
			document.getElementById("inSize").style.display='inline';
			document.getElementById("outSize").style.display='none';
		}		
		window.setInterval("moveGuokeFloat()",100);   
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
			alert("���ܷ��Ϳ���Ϣ");
			return;
		}
		HistoryList1.innerHTML +="��˵��"+guokeMsg.innerHTML+"<br>";
		//document.getElementById("HistoryList1").style.OVERFLOW="auto";
		
		//HistoryList1.scrollTop=32000;   
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
