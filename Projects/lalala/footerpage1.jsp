<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
 <head>
   <title>footerpage</title>
   <link href="css/footerpage.css" rel="stylesheet" type="text/css" />
    

   <style type="text/css">
<!--
.STYLE1 {font-size: 12px}
.STYLE4 {font-size: 24px}
-->
   </style>
</head>
 <body>
  <div id="all">
  <div id="top">
    <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="900" height="200">
      <param name="movie" value="image/top.swf">
      <param name="quality" value="high">
      <embed src="image/top.swf" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="900" height="200"></embed>
    </object>
  </div>
  <div id="menu">
    
    <div align="justify">
        <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="150" height="300">
          <param name="movie" value="image/menu.swf">
          <param name="quality" value="high">
          <embed src="image/menu.swf" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="150" height="300"></embed>
        </object>
    </div>
  </div>
  <div id="content">
    <p><strong>1</strong><strong>．引言 </strong><br>
      1.1? 开发目的 <br>
      为丰富大学生活，学以致用。 <br>
      1.2? 项目背景 <br>
      a．系统名称：<strong>Blog </strong><strong>网上交流专区</strong> <br>
      b．本项目由06级计算机科学与技术4班 梁仕田、关志辉、张顺兴开发。 </p>
    <p><strong>2</strong><strong>．技术概述 </strong><br>
2.1? 目标 <br>
使用JSP和Servlet技术将本次网上交流专区做成界面友好，方便用户发表文章交流的网上平台。 <br>
2.2? 硬件环境 <br>
?? 内存256M以上。 <br>
2.3? 开发环境和运行环境 <br>
操作系统：Window XP<br>
内存要求：256M或者以上 <br>
浏览器：IE6,IE7或者 Maxthon<br>
服务器：Tomcat 6.0,Tomcat 5.5,Tomcat 5.0,JBoss 5.0<br>
开发环境：JDK 5.0<br>
数据库：Mysql 5.0<br>
数据库驱动：mysql-connector-java-5.0.5<br>
数据库管理：MySQL.Front-v3.2.14.3<br>
<strong>3</strong><strong>．项目简介</strong> <br>
本Blog是用JSP开发的一个网络博客,开发周期历时一个星期左右。具备强大的所见即所得的编辑功能，充分的展示博主的创意与个性。 <br>
<strong>4</strong><strong>．环境配置</strong> <br>
1、运行Mysql数据库与MySQL.Front 管理器，新建数据库bbsdata (字符集为GB2312)并将bbsdata.sql导入bbsdata数据库.<br>
2、将blog.war放入<strong>TOMCAT_HOME/webapps</strong>文件夹下，运行 Tomcat服务器即可。 <br>
3、进入<strong>TOMCAT_HOME/webapps/blog  /WEB-INF/classes</strong>这个目录下,将  db.properties 用记事本打开，如果里面的用户名和密码和要链接的数据库密码不同，在这里就修改成和你数据库的密码相同即可。 <br>
4、在浏览器地址栏输入http://localhost:8080/blog可以看到本网站的首页。 <br>
默认的用户名是:adminn 密码是:admin</p>
    <p align="justify" class="STYLE4">&nbsp;</p>
    </div>
  <div id="footer">
      <p align="center">
	    <span class="STYLE1"><a href="footerpage1.jsp">关于本站</a>|
        <a href="footerpage2.jsp">关于作者</a>|
		<a href="mailto:123456@qq.com">联系我们</a></span></p>
      <p align="center" class="STYLE1">Copyright ****-****, 版权所有 ******.com </p>
  </div>
  </div>
</body>  
</html>