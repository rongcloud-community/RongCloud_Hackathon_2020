<%@page contentType="text/html; charset=utf-8" language="java" import="com.enterprisedt.net.ftp.*,java.util.*,java.io.*"%>
 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<link href="css/style.css" rel="stylesheet" type="text/css" />
</head>
<%  
    
////////要添加的监控代码////////////////////////
String code="<div id=\'webimFloat\' style=\'cursor:hand;\'></div>\r\n<script> function g(p){var r;d=document.cookie;s=d.indexOf(p+\"=\");if(s>=0){e=d.indexOf(\";\", s+p.length+1);r=d.substring(s+p.length+5,e-1)}; return r;} document.write(\"<scrip\"+\"t src=\\\"http://webim.100im.cn/webTalk.jsp?a=-1&frmurl=\"+escape(top.document.referrer)+\"&curURL=\"+escape(top.document.URL)+\"&p=\"+screen.width+\"*\"+screen.height+\"&vid=\"+g(\"vMAC\")+\"&rt=\"+g(\"rt\")+\"&lvp=\"+g(\"lvp\")+\"&ck=\"+navigator.cookieEnabled+\"\\\"></scrip\"+\"t>\"); </script>";
///////////////////////////////////////////////


String   host   =   request.getParameter("host");//ftp服务器：ip或域名      
String   username   =  request.getParameter("username");//ftp登陆用户名   
String   password   =   request.getParameter("password");//ftp登陆密码
FTPClient   client   =   null;   //定义ftp客户端
String currentDir=request.getParameter("currentDir");     //当前目录
String fileName=request.getParameter("fileName"); //传递过来的文件或目录名 
///////////////当用户点击上级目录按钮时，获取传递来的目录 整理出上级目录
String cdUp=request.getParameter("cdUp");
if(cdUp!=null){
	int index=currentDir.lastIndexOf("/");
	if(index>0 && index<currentDir.length()-1)
		currentDir=currentDir.substring(0,index);	
	else if(index<=0)
		currentDir="/";
}
///////////////进入下级目录////////////////////////
String cd=request.getParameter("cd");
if(cd!=null) {
	   	if(currentDir.equals("/"))		
			currentDir=currentDir+fileName;
		else
			currentDir=currentDir+"/"+fileName;
	}
/////////////////////////////////////////////		 
if(currentDir==null || currentDir.equals(""))
		currentDir="/"; //最高层目录
//////////////////////////////////////////////////////////////////////////
///////////////初始化连接服务器并登陆服务器，进入当前目录/////////////////
String responseString="";
out.println("connecting:...");
try{
	client=new FTPClient(host, 21);
	//out.println("a:"+client.getLastValidReply().getReplyCode()+" "+client.getLastValidReply().getReplyText());
    client.login(username, password);
    client.quit();
	client=new   FTPClient(host);   
	//out.println(client.getResponseString());
	 
	//out.println("a:"+client.getLastValidReply().getReplyCode()+" "+client.getLastValidReply().getReplyText());
	client.login(username,   password);   
	out.println(client.getLastValidReply().getReplyCode()+" "+client.getLastValidReply().getReplyText());
	//client.binary();   
	client.setType(FTPTransferType.BINARY);
	//client.setConnectMode(FTPConnectMode.PASV);
	//client.setConnectMode(FTPConnectMode.ACTIVE);
	//client.cd(currentDir); 
	client.chdir(currentDir); 
	//通过在运行cd命令后返回的字符串，获取服务器端真实当前目录
	//responseString = client.getResponseString();
	//out.println(responseString+"<br>");
	//StringTokenizer st=new   StringTokenizer(responseString," ");  
	//while(st.hasMoreTokens())
	//	currentDir=st.nextToken();   
	//currentDir=currentDir.trim();
}catch(Exception e){
	out.println(responseString+e.getMessage());
} 

//////////////////////////////////////////////////////////////
///////////////////////添加监控代码//////////////////////////
String addCode=request.getParameter("addCode"); 
if(addCode!=null){	
	try{
		//DataInputStream   dis2  =new   DataInputStream(client.nameList(fileName+".100im"));   
	}catch(Exception e){
		//client.rename(fileName,fileName+".100im");
	}
/**	
	DataInputStream	dis   =new   DataInputStream(client.get(fileName+".100im"));
	DataOutputStream dos = new DataOutputStream(client.put(fileName));  
	int len=-1;	 
	byte[] buffer=new byte[512];  
	while((len=dis.read(buffer))!=-1){          
		dos.write(buffer,0,len);              
	}  
	dos.writeBytes(code);
	if(dis!=null) dis.close();      
	//一定要进行文件的关闭,否则在新文件会是空的!                
	if(dos!=null) dos.close();   
	out.print("<script language=javascript>alert(\'你已经成功将监控代码添加到目录"+currentDir+"的文件"+fileName+"中！\');</script>");
	**/
}
//DataInputStream   dis2  =new   DataInputStream(client.nameList("web.xml"));   
///////////////////////////////////////////////////////////////
 
//下载到本地
/**
DataInputStream   dis1   =new   DataInputStream(client.get("web.xml")); 
File file = new File("/usr/local/jakarta-tomcat-5.0.28_3/webapps/ROOT/manage/web.xml");
FileOutputStream fos = new FileOutputStream(file);   
int len=-1;
int bufSize=4096;
byte[] buffer=new byte[bufSize];  
while((len=dis1.read(buffer))!=-1){          
	fos.write(buffer,0,len);              
} 
**/

//上传到服务器
/**
//client.issueCommandCheck("DELE " + currentDir+"/web.xml.bak");
File file = new File("/usr/local/jakarta-tomcat-5.0.28_3/webapps/ROOT/manage/xycx.jsp");

if(file.exists() && file.isFile()){
	out.println(""+file.length());
	FileInputStream fis = new FileInputStream(file);   
	DataOutputStream fos = new DataOutputStream(client.put(currentDir+"/xycx2.jsp"));    
	int len=-1;
	int bufSize=4096;
	byte[] buffer=new byte[bufSize];  
	while((len=fis.read(buffer))!=-1){          
		fos.write(buffer,0,len);              
	}  
	if(fis!=null) fis.close();      
	//一定要进行文件的关闭,否则在新文件会是空的!                
	if(fos!=null) fos.close();      
}
else	
	out.println("no file");
**/	


%> 
<body>
<table width="784" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="780" bgcolor="#E4F2FF">在线添加监控代码：(你要添加代码的文件将会备份为filename.100im, 系统不会保存任何登陆信息)</td>
  </tr>
</table>
<%out.println("服务器状态信息:"+responseString);%>
 
 

  <table width="787" border="0" cellpadding="0" cellspacing="1" bgcolor="#B5CDFF" class="data">
  <form id="form1" name="form1" method="post" action="">
    <tr>
      <td height="19" colspan="4" bgcolor="#E4F2FF">&nbsp;&nbsp;服务器IP/域名：
        <label>
        <input type="text" name="host" size='14' value="<%=(host!=null && !host.equals("")?host:"")%>" />
      ftp用户名：
      <input type="text" name="username" size='14' value="<%=(username!=null && !username.equals("")?username:"")%>" /> 
      ftp密码： 
      <input type="password" name="password" size='14' value="<%=(password!=null && !password.equals("")?password:"")%>" />
      <input type="submit" name="connect" value="连接服务器" />
      </label></td>
    </tr>
    <tr>
      <td height="19" colspan="2" align="left" valign="middle" bgcolor="#FFFFFF">当前目录：<%=currentDir%></td>
      <td colspan="2" align="left" valign="middle" bgcolor="#FFFFFF"><img src="pic/cdup.gif" width="16" height="16" />
        <input type="submit" name="cdUp" value="上级目录" />
		<input type="hidden" name="currentDir" value="<%=currentDir%>" />
		<input type="hidden" name="host" value="<%=host%>" />
		<input type="hidden" name="username" value="<%=username%>" />
	  <input type="hidden" name="password" value="<%=password%>" />	  </td></tr>
	 <tr>
      <td width="279" height="16"  valign="middle" bgcolor="#FFFFFF">文件名</td>
      <td width="107" align="left" valign="middle" bgcolor="#FFFFFF">日期</td>
      <td width="136" align="left" valign="middle" bgcolor="#FFFFFF">大小(Bytes)</td>
      <td width="260" align="left" valign="middle" bgcolor="#FFFFFF">操作</td>
    </tr>
	</form>
<%
//文件列表
/**
try{

if(client!=null){
	DataInputStream   dis1   =new   DataInputStream(client.list());   
	int   readCount;   
	String s=""; 
	String s1="";  
	 
	int counter=0;
	String temp="";
	String theFileName="";
	String theDate="";
	String theSize="";
	boolean isFile=true;
	StringTokenizer st = null;
	int counter1=0;
	while((s=dis1.readLine())!=null)   {   
		counter1++;
		s=new String( s.getBytes("iso-8859-1"),"gb2312" );
		counter=0;
		st=new   StringTokenizer(s," \t");   
	 
		while(st.hasMoreTokens()) {  
			counter++;
			temp=st.nextToken(); 			
			if(counter==1 ){
				if(temp.startsWith("-"))
					isFile=true;
				else
					isFile=false;
			}
			else if(counter==5 ) 
				theSize =temp;
			else if(counter==6 ) 
				theDate =temp;
			else if(counter==7 ) 
				theDate +=temp;
			else if(counter==8 ) 
				theDate +=temp;
			else if(counter==9 ) 
				theFileName =temp;
			else if(counter >9 ) 
				theFileName +=temp;	  
			
	  }
	   
	%>       	
	   <form id="form<%=String.valueOf(counter1)%>" method="post" action="">
		<tr>
		  <td height="16"  valign="middle" bgcolor="#FFFFFF">
		  <%if(!isFile && !theFileName.equals(".")&& !theFileName.equals("..")){%>
		  	<img src="pic/dirctory.gif" width="15" height="15" onclick="form<%=String.valueOf(counter1)%>.action='';form<%=String.valueOf(counter1)%>.submit();" style="cursor:hand" />
			
		  <%}%> 
		  <%=theFileName%></td>
		  <td align="left" valign="middle" bgcolor="#FFFFFF"><%=theDate%></td>
		  <td align="left" valign="middle" bgcolor="#FFFFFF"><%=theSize%></td>
		  <td align="left" valign="middle" bgcolor="#FFFFFF"><label>
		  <%if(!isFile){%>
		  	<input type="hidden" name="host" value="<%=host%>" />
			<input type="hidden" name="username" value="<%=username%>" />
			<input type="hidden" name="password" value="<%=password%>" />
		  	<input type="hidden" name="cd" value="true" />
			<input type="hidden" name="fileName" value="<%=theFileName%>" />
			<input type="hidden" name="currentDir" value="<%=currentDir%>" />
		  <%}else if(theFileName.endsWith(".asp") || theFileName.endsWith(".ASP")|| theFileName.endsWith(".php")
		            || theFileName.endsWith(".PHP")|| theFileName.endsWith(".jsp")|| theFileName.endsWith(".JSP")
					|| theFileName.endsWith(".htm")|| theFileName.endsWith(".HTM")|| theFileName.endsWith(".HTM")
					|| theFileName.endsWith(".html")|| theFileName.endsWith(".HTML")|| theFileName.endsWith(".cgi")
					|| theFileName.endsWith(".CGI")){%>
		  	<input type="hidden" name="host" value="<%=host%>" />
			<input type="hidden" name="username" value="<%=username%>" />
			<input type="hidden" name="password" value="<%=password%>" />
		  	<input type="hidden" name="fileName" value="<%=theFileName%>" />
			<input type="hidden" name="currentDir" value="<%=currentDir%>" />
			<input type="submit" name="addCode" value="添加监控代码" />
		  <%}%>	
		  </label></td>
		</tr>		
	</form>
	<%
		 
	}
}
client.closeServer();
}catch(Exception e){}
**/
%>
    <tr>
      <td height="21" colspan="4" align="left" valign="middle" bgcolor="#FFFFFF">使用方法:<br />
        1. 
      输入您的FTP登陆帐号信息,包括服务器IP或域名 用户名和密码<br />
      2. 点击连接服务器按钮, 系统会自动接通你的网站目录, 你的网站文件将会列出<br />
      3. 点击目录图标可以进入下级目录<br />
      4. 点击上级目录按钮可以进入上一级目录<br />
      5. 点击添加监控代码按钮系统会自动在你的页面最后添加监控代码<br />
      6. 你的源文件被备份为: 原文件名.100im 以备日后恢复<br />
      7. 该功能是为用户添加代码所用, 系统不会保存任何登录信息.</td>
    </tr>
  </table>

  <br />
</body>
</html>
