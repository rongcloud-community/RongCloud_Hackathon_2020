<html>
<meta name="content-type" content="text/html; charset=gb2312">
<script>
	function checkclick()
	{
		var obj=window.event.srcElement;
		if(obj.tagName!=null) 
			if(obj.tagName.toLowerCase()=="a")
				if(obj.target==""&&obj.href.indexOf("#")==-1)
					obj.target="_blank";
	}
	
	function yd_DownloadFile(fname)
    {
		fname='msgManager.jsp?a=-6&file='+escape(fname);
		window.open(fname);
		return false;
    }
</script>
<Body bgcolor="ivory">
<%
String clntWaterImg=request.getParameter("clntWaterImg");
%>
<div id=HistoryList onclick='checkclick();' style='BORDER-RIGHT:medium none;background-color:ivory;PADDING-RIGHT:0px; BORDER-TOP:medium none; OVERFLOW-Y:auto; PADDING-LEFT:0px; FONT-SIZE:14px; LEFT:0px; PADDING-BOTTOM:0px; BORDER-LEFT:medium none; WIDTH:100%; LINE-HEIGHT:1.5; SCROLLBAR-ARROW-COLOR:gray; PADDING-TOP:0px; BORDER-BOTTOM:medium none; SCROLLBAR-BASE-COLOR:#eff3ff; POSITION:relative; TOP:0px; HEIGHT:100%; background:url(<%=(clntWaterImg!=null&&!clntWaterImg.equals(""))?"http://"+clntWaterImg:"img/manage/blogo.gif"%>);background-position:bottom right; background-repeat:no-repeat;'></div>

</Body>
</html>