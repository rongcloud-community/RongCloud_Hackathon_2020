<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*,com.jspsmart.upload.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
</head>
<%
String newImage = "";
String allFileName = "";//文件目录及文件名称
String FormName = "";//传递过来表单的名称
String EditName = "";//表单内控件的名称

try
{
	//下面没有用上这两个变量
	FormName = request.getParameter("formname");
	EditName = request.getParameter("editname");
}catch(Exception e){}
//以当前时间的毫秒数+“-h”为图像文件名
GregorianCalendar now = new GregorianCalendar();
String abc = String.valueOf(now.getTimeInMillis());
//************************
//上传用户自定义头像
//************************		
// 新建一个SmartUpload对象 
SmartUpload su = new SmartUpload(); 
// 上传初始化 
su.initialize(pageContext);
su.service(request,response);
// 设定上传限制 
// 1.限制每个上传文件的最大长度。 
su.setMaxFileSize(100000); 
// 2.限制总上传数据的长度。 
// su.setTotalMaxFileSize(20000); 
// 3.设定允许上传的文件（通过扩展名限制）,仅允许doc,txt文件。 
su.setAllowedFilesList("jpg,gif,bmp"); 
// 4.设定禁止上传的文件（通过扩展名限制）,禁止上传带有exe,bat,jsp,htm,html扩展名的文件和没有扩展名的文件。 
su.setDeniedFilesList("exe,bat,jsp,htm,html,,"); 
// 上传文件 
su.upload(); 
// 将上传文件全部保存到指定目录 
//int count = su.save("/upload");
//int count = su.save("/scom/img/userHead/");//这项是保存的

//提取上传文件信息，同时更改上传的文件名
com.jspsmart.upload.File file = su.getFiles().getFile(0);
//myFile = mySmartUpload.getFiles().getFile(0);
//com.jspsmart.upload.File file = mySmartUpload.getFiles().getFile(0);
// 判断文件是否存在 
if (file.isMissing()) 
{
	// 若文件不存在则继续
	//continue; 
	out.print("文件不存在！");
}
// SAVE_VIRTUAL:另存到以WEB应用程序的根目录为文件根目录的目录下
//id:是用户登录的用户名
//getFileExt():提取文件的扩展名
newImage = abc + "-h." + file.getFileExt();
file.saveAs("/tag/" + newImage,su.SAVE_VIRTUAL);
allFileName = "/tag/" + newImage;

//将新生成的图像文件目录及文件名传递给照片控件tag
//out.print("<script language=javascript>window.opener.document.'"+FormName+"'.'"+EditName+"'.value='"+allFileName+"';</script>");
out.print("<script language=javascript>window.opener.document.UserForm2.tag.value='"+newImage+"';</script>");
//out.print("<script language=javascript>alert('更新成功！');window.location='UserInfoEdit.jsp?email="+email+"'</script>");
%>
<script language="javascript">
window.alert("文件上传成功!请不要修改生成的链接地址！");
window.close();
</script>
<body>
</body>
</html>
