<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*, java.util.*, java.net.*,msg.*,cache.*"%>
 
<%
%> 
 	function gCookie(p){
		var r;
		d=document.cookie;
		s=d.indexOf(p+"=");
		if(s>=0){
			e=d.indexOf(";", s+p.length+1);
			if(e<0)e=d.length;
			r=d.substring(s+p.length+5,e-1);
			//alert(d+" "+r+" "+s+" "+s+p.length+5+" "+e);
		} 
		return r;
	}
	function webTalkto(toid)
	{
		var vid=gCookie("vMAC");
		//alert(vid);
		var curUrl=document.URL;
		var index=curUrl.indexOf("://");
		if(index>=0)
			curUrl=curUrl.substring(index+3);
		index=curUrl.indexOf("/");
		if(index>0)
			curUrl=curUrl.substring(0,index);
		 
		var url = "http://webim.100im.cn/webTalkWindow.jsp?a=0&vid="+vid+"&toid="+toid+"&lancode=&frmurl="+curUrl;	 
		var win = window.open("",toid.replace("-","_").replace("@",""), "Status=no,scrollbars=on,resizable=yes,width=490,height=415,top=100,left=150");  		 
		win.document.open("text/html", "replace");		 
		win.document.write("<html><head><title>您的ID:["+vid+"] </title></head><body style='padding:0xp;margin:0px;'><iframe scrolling='no' frameborder='0' style='margin:0px;padding:0px;' src='"+url+"' width='100%' height='100%'></iframe></body></html>");
		win.document.close();
		win.focus();		 
	}  
	
	if(gCookie("vMAC")==null){	 
		document.write("<scrip"+"t src='http://webim.100im.cn/addCookie.jsp?curURL="+escape(top.document.URL)+"'></scrip"+"t>");	
	} 