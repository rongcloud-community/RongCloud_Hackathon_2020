function GetCookie1(name){
	var result        = null;
	var myCookie      = " " + document.cookie + ";";
	var searchName    = " " + name + "=";
	var startOfCookie = myCookie.indexOf(searchName);
	var endOfCookie;
	if(startOfCookie != -1)	{
		startOfCookie += searchName.length;
		endOfCookie    = myCookie.indexOf(";", startOfCookie);
		result         = myCookie.substring(startOfCookie,endOfCookie);
	}
	return result;
}
function SetCookie(name, value, expires, path, domain, secure){
	var expString    = ((expires == null)? "" : ("; expires=" + expires.toGMTString()));
	var pathString   = ((path == null)   ? "" : ("; path   =" + path));
	var domainString = ((domain == null) ? "" : ("; domain =" + domain));
	var secureString = ((secure == true) ? "; secure" : "");
	var cookiev      = name+"="+value+expString+pathString+domainString+secureString;
	document.cookie  = cookiev;
}
var jscript,cookie,vMAC,lvt,lvp,firstTime,rt;
if(navigator.javaEnabled()>-1) jscript = 1;
else jscript = 0;
if(navigator.cookieEnabled) 	cookie = 1;
else cookie = 0;
if((jscript==1) && (cookie==1))	{
	var fiveYears = 5 * 365 * 24 * 60 * 60 * 1000;
	var expDate   = new Date();
	vMAC = GetCookie1("vMAC");
	lvt=GetCookie1("lvt");	
	lvp=GetCookie1("lvp");
	var index=0;
	if(lvp!=null)
	{
		index=lvp.indexOf("lhs(")
		if(index>=0)
			lvp=lvp.substring(4);
		index=lvp.indexOf(")")
		if(index>0)
			lvp=lvp.substring(0,index);
	}	
	rt=GetCookie1("rt");	
	expDate.setTime(expDate.getTime() + fiveYears);
	if(vMAC==null)	{
		firstTime="0";
		vMAC = time;  //expDate.getTime();		
		//SetCookie("vMAC", "lhs("+vMAC+")", expDate, "/", null, false);				
	}
	else{
		firstTime="1";
		var ep = 0;
		var sp = vMAC.indexOf("lhs(");
		if(sp != -1)
		{
			ep   = vMAC.indexOf(")", sp+4);
			vMAC = vMAC.substring(sp+4, ep);
		}
		else
		{
			firstTime="true";
			vMAC = time; //expDate.getTime();
			expDate.setTime(expDate.getTime() + fiveYears);
			SetCookie("vMAC", GetCookie("vMAC")+"lhs("+vMAC+")", expDate, "/", null, false);
		}		
	}	 
	//SetCookie("lvt", (new Date()).getTime(), expDate, "/", null, false);	
	//SetCookie("lvp", escape(top.document.URL), expDate, "/", null, false);	
	 
}
else{
	vMAC  = "";
	lvt="";
	lvp="";
	firstTime="0";
} 


//var str2 = "<IMG SRC='http://webqq.3yan.com/webTalk.jsp?x=0&emit=&a=-1&frmurl="+escape(top.document.referrer)+"&curURL="+escape(top.document.URL)+"&p="+escape(screen.width)+"*"+escape(screen.height)+"&vid="+vMAC+""+ "'style='display:none'>"
document.write("<scrip"+"t src=\"http://webqq.3yan.com/webTalk.jsp?x=0&firstTime="+firstTime+"&emit=&a=-1&frmurl="+escape(top.document.referrer)+"&curURL="+escape(top.document.URL)+"&p="+escape(screen.width)+"*"+escape(screen.height)+"&vid="+vMAC+"&lvt="+lvt+"&lvp="+lvp+"&rt=1&ck="+navigator.cookieEnabled+"\"></scrip"+"t>"); 
 