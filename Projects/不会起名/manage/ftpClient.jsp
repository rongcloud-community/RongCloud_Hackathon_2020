<%@page contentType="text/html; charset=utf-8" language="java" import="sun.net.ftp.FtpClient,java.util.*,java.io.*,java.net.*,msg.*"%>
 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>淘客在线监控代码添加工具</title>
<link href="css/style.css" rel="stylesheet" type="text/css" />
</head>
<%  
    
////////要添加的监控代码////////////////////////
String code="<div id=\'webimFloat\' style=\'cursor:hand;\'></div>\r\n<script> function g(p){var r;d=document.cookie;s=d.indexOf(p+\"=\");if(s>=0){e=d.indexOf(\";\", s+p.length+1);r=d.substring(s+p.length+5,e-1)}; return r;} document.write(\"<scrip\"+\"t src=\\\"http://webim.100im.cn/webTalk.jsp?a=-1&frmurl=\"+escape(top.document.referrer)+\"&curURL=\"+escape(top.document.URL)+\"&p=\"+screen.width+\"*\"+screen.height+\"&vid=\"+g(\"vMAC\")+\"&rt=\"+g(\"rt\")+\"&lvp=\"+g(\"lvp\")+\"&ck=\"+navigator.cookieEnabled+\"\\\"></scrip\"+\"t>\"); </script>";
///////////////////////////////////////////////

String   host   =   request.getParameter("host");//ftp服务器：ip或域名      
String   username   =  request.getParameter("username");//ftp登陆用户名   
String   password   =   request.getParameter("password");//ftp登陆密码
FtpClient   client   =   null;   //定义ftp客户端
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
try{
	//先从保存的连接中查找是否已经连接过
	client=MyFtpClient.getFtpClient(host);
	//如果没有连接过 创建连接
	//if(client==null)
		//client=new   FtpClient(host); 
	try{
		//检测连接是否还有效（断开）
		client.binary(); 
	}catch(Exception ee){
		//如果连接已经断开，重新连接并保存起来
		client=new   FtpClient(host); 
		client.login(username,   password); 
		client.binary();   		
		MyFtpClient.setFtpClient(host,client);
		responseString ="connect again. ";
	}	
	client.cd(currentDir); //进入当前目录
	//通过在运行cd命令后返回的字符串，获取服务器端真实当前目录
	responseString = client.getResponseString();
	//out.println(responseString+"<br>");

	//获取服务器端的当前目录作为下次访问的当前目录
	StringTokenizer st=new   StringTokenizer(responseString," ");  
	while(st.hasMoreTokens())
		currentDir=st.nextToken();   
	currentDir=currentDir.trim();
}catch(Exception e){
	if(host!=null)
		responseString =e.getMessage()+" 请确认你输入的帐号信息正确, 稍候再试。";
} 

//////////////////////////////////////////////////////////////
///////////////////////添加监控代码//////////////////////////
String addCode=request.getParameter("addCode"); 
String resume=request.getParameter("resume"); 
if(addCode!=null){	
	int fileSize=0;
	DataInputStream	dis =null;
	DataOutputStream dos=null;
	try{
		fileSize=Integer.parseInt(request.getParameter("fileSize"));		
		//如果存在备份文件说明曾经备份过
		//DataInputStream   dis2  =new   DataInputStream(client.nameList(fileName+".100im")); 
		//dis2.close();
		//dis2=null;  
		dis   =new   DataInputStream(client.get(fileName+".100im")); 
		//client.rename(fileName,fileName+".100im");
	}catch(Exception e){
		//如果没有备份文件 把将要添加代码的文件改名备份
		try{
			client.rename(fileName,fileName+".100im"); 
		}catch(Exception e1){}
	}
	if(fileSize>0){
		//读取备份文件作为数据流，再写回原文件
		try{
			if(dis==null)
				dis   =new   DataInputStream(client.get(fileName+".100im"));
			if(dis.available()>0){
				dos = new DataOutputStream(client.put(fileName));  
				int theFileSize=0;
				int len=-1;	 
				byte[] buffer=new byte[512];  
				while((len=dis.read(buffer))!=-1){   
					theFileSize +=len;       
					dos.write(buffer,0,len);              
				}  
				//原文件写完后，追加写入监控代码
				if(theFileSize>=fileSize){
					dos.writeBytes(code);
					//一定要进行文件的关闭,否则在新文件会是空的!  
					
					dos.flush();	
					if(dis!=null) {dis.close(); dis=null;}
					if(dos!=null) {dos.close(); dos=null;}  	 
					out.print("<script language=javascript>alert(\'你已经成功将监控代码添加到目录"+currentDir+"的文件"+
							fileName+"中！\');</script>");
				}else{
					client.rename(fileName+".100im",fileName);
					if(dis!=null) {dis.close(); dis=null;}
					if(dos!=null) {dos.close(); dos=null;} 
					out.print("<script language=javascript>alert(\'添加代码失败[0]，请重试或改用其他方式添加。\');</script>");
				}
			}
			else{
				client.rename(fileName+".100im",fileName);
				if(dis!=null) {dis.close(); dis=null;}
				if(dos!=null) {dos.close(); dos=null;} 
				out.print("<script language=javascript>alert(\'添加代码失败[1]，请重试或改用其他方式添加。\');</script>");
			}
		}catch(Exception e1){
			try{client.rename(fileName+".100im",fileName);}catch(Exception e3){}
			if(dis!=null) {dis.close(); dis=null;}
			if(dos!=null) {dos.close(); dos=null;} 
			out.print("<script language=javascript>alert(\'添加代码失败[2]，请重试或改用其他方式添加。\');</script>");
		}
	}
}
if(resume!=null){//恢复
	try{
		if(fileName.endsWith(".100im")){
			String oldFileName=fileName.substring(0,fileName.length()-6);
			//client.issueCommandCheck("DELE " + oldFileName);
			client.rename(fileName,oldFileName);
		}
	}catch(Exception e){
		out.print("<script language=javascript>alert(\'恢复失败，请重试或改用其他方式恢复。\');</script>");
	}
}	
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
<%out.println("命令状态信息:"+responseString);%>
 
 

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
	String addedFiles="";
	while((s=dis1.readLine())!=null)   {   
		st=new   StringTokenizer(s," \t");   	 
		while(st.hasMoreTokens()) {  
			temp=st.nextToken();
			if(temp!=null && temp.endsWith(".100im"))
				addedFiles +=","+temp;
		}
	}
	dis1   =new   DataInputStream(client.list());   
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
		  <td valign="middle" bgcolor="#FFFFFF" align="<%=(theFileName.endsWith(".100im"))?"right":"left"%>" ><label>
		  <%if(!isFile){%>
		  	<input type="hidden" name="host" value="<%=host%>" />
			<input type="hidden" name="username" value="<%=username%>" />
			<input type="hidden" name="password" value="<%=password%>" />
		  	<input type="hidden" name="cd" value="true" />
			<input type="hidden" name="fileName" value="<%=theFileName%>" />
			<input type="hidden" name="currentDir" value="<%=currentDir%>" />
		  <%}else if(addedFiles.indexOf(theFileName)>=0 && !theFileName.endsWith(".100im")){%>
		  	已添加过代码
		  <%}else if(theFileName.endsWith(".asp") || theFileName.endsWith(".ASP")|| theFileName.endsWith(".php")
		            || theFileName.endsWith(".PHP")|| theFileName.endsWith(".jsp")|| theFileName.endsWith(".JSP")
					|| theFileName.endsWith(".htm")|| theFileName.endsWith(".HTM")|| theFileName.endsWith(".HTM")
					|| theFileName.endsWith(".html")|| theFileName.endsWith(".HTML")|| theFileName.endsWith(".cgi")
					|| theFileName.endsWith(".CGI")){%>
		  	<input type="hidden" name="host" value="<%=host%>" />
			<input type="hidden" name="username" value="<%=username%>" />
			<input type="hidden" name="password" value="<%=password%>" />
		  	<input type="hidden" name="fileName" value="<%=theFileName%>" />
			<input type="hidden" name="fileSize" value="<%=theSize%>" />
			<input type="hidden" name="currentDir" value="<%=currentDir%>" />
			<input type="submit" name="addCode" value="添加监控代码" />
		  <%}else if(theFileName.endsWith(".100im")){%>	
		  	<input type="hidden" name="host" value="<%=host%>" />
			<input type="hidden" name="username" value="<%=username%>" />
			<input type="hidden" name="password" value="<%=password%>" />
		  	<input type="hidden" name="fileName" value="<%=theFileName%>" />
			<input type="hidden" name="fileSize" value="<%=theSize%>" />
			<input type="hidden" name="currentDir" value="<%=currentDir%>" />
			<input type="submit" name="resume" value="恢复原文件" />
		  <%}%>
		  </label></td>
		</tr>		
	</form>
	<%
		 
	}
	if(dis1!=null){dis1.close();dis1=null;}
}
//client.closeServer();
}catch(Exception e){}
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
      7. 该功能是为用户添加代码所用, 系统不会保存任何登录信息<br />
      8. 多个站点之间在登陆后切换只需输入ip或域名，点击连接服务器按钮即可</td>
    </tr>
  </table>

  <br />
</body>
</html>
