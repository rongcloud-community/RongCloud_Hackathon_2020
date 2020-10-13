<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*, java.util.*, java.net.*,msg.*,cache.*"%>
 
<%
%> 
function webTalkto(id)
	{
		var curUrl=document.URL;
		var index=curUrl.indexOf("://");
		if(index>=0)
			curUrl=curUrl.substring(index+3);
		index=curUrl.indexOf("/");
		if(index>0)
			curUrl=curUrl.substring(0,index);		
		var url="http://webim.100im.cn/call.jsp?toid="+id+"&frmurl="+curUrl;
 		var win = window.open("", "id_w", "Status=no,scrollbars=on,resizable=no,width=565,height=395,top=100,left=150");  
 		win.document.open("text/html", "replace");			
		win.document.write("<html><head><title>淘客WEB800</title></head><body style='padding:0xp;margin:0px;'><iframe scrolling='no' frameborder='0' style='margin:0px;padding:0px;' src='"+url+"' width='100%' height='100%'></iframe></body></html>");
		win.document.close(); 		 
	}  
	