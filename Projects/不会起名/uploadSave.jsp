<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*,com.jspsmart.upload.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date,msg.*"%>
<jsp:useBean id="msgManager" scope="page"  class="msg.MsgManager" /> 
 

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
</head>
<%
String fileName = "";
String allFileName = "";//文件目录及文件名称
String id = "";//传递过来表单的名称
String toid = "";//表单内控件的名称
//out.println(request.getQueryString() );
try
{
	//下面没有用上这两个变量
	id = request.getParameter("id");
	toid = request.getParameter("toid"); 
	GregorianCalendar now = new GregorianCalendar();
	String abc = String.valueOf(now.getTimeInMillis());
	SmartUpload su = new SmartUpload();  
	su.initialize(pageContext);
	su.service(request,response);
	 
	su.setMaxFileSize(5000000); 
	su.setAllowedFilesList("jpg,gif,bmp,doc,rar,zip,xsl,ppt");
	su.setDeniedFilesList("exe,bat,jsp,htm,html,asp,");  
	su.upload();  
	com.jspsmart.upload.File file = su.getFiles().getFile(0); 
	fileName = abc + "-h." + file.getFileExt();
	file.saveAs("temp/" + fileName,su.SAVE_VIRTUAL); 
	if (file.isMissing()) {
		//out.print("文件不存在！");
	%>
	 <script language="javascript">
	window.alert("文件上传失败! 请检查文件格式是否为允许的jpg,gif,bmp,doc,rar,zip,xsl！");
	//window.close();
	var uform=parent.document.getElementById("uploadform");
	//uform.style.display="none";
	alert(uform);
	</script>
		
	<%		
	}
	else{
		String msg=Escape.escape("对方("+id+")已将文件传送给你,<a href=\"http://client.100im.cn/download.jsp?fileName="+fileName+"\">点击下载</a>");  //如果是放到客户端，请将webim.100im.cn改为client.100im.cn
		//msgManager.sendMsg(new msg.Message(id,toid,msg,"TALKMSG","0")); 
		msgManager.sendMsg(new msg.Message("0",toid,msg,"SYSNOTIFY")); 
		%>
<script language="javascript">
window.alert("文件上传成功! 等待对方接受！");
window.close();
var uform=parent.document.getElementById("uploadform");
uform.style.display="none";
</script>
<%	
	}
 }catch(Exception e){%>
 <script language="javascript">
	window.alert("文件上传失败! 请检查文件格式是否为允许的jpg,gif,bmp,doc,rar,zip,xsl！");
	window.close();
	var uform=parent.document.getElementById("uploadform");
	uform.style.display="none";
</script>
 
 <%}%>

 
<body>
</body>
</html>
