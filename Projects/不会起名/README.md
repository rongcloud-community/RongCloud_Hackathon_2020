队名：不会起名

项目：TBkf

基于淘宝客服实现客户与商家之间的信息交流







#TaokeOCS 淘客在线客服系统安装说明

（软件版）安装说明
======================================================================
软件版内，我们是提供给没有技术背景人员使用的，适合在本地测试。
只要双击进行下一步安装即可，然后进行站点版安装即可。


（站点版）安装说明
======================================================================
在安装前您首先要确认，您的服务器已经安装了Tomcat4.1以上和MySQL4.1以上（推荐）

1、将ROOT文件内文件上传到站点内；

2、建立你的mysql数据库，如TaokeOCS

3、http:// 127.0.0.1（本地测试）或（域名，网上安装）/install/index.htm,进行下一步安装即可。

前台测试页
可看到网页上的在线客服

http://127.0.0.1（本地测试）或（域名，网上安装）/install/test.html

网站客服或管理员登录地址
http://127.0.0.1（本地测试）或（域名，网上安装）/install/login.html

本地测试用户客：admin@127_com  密码：123456


TaokeOCS淘客管理总后台
http://127.0.0.1/install/loginadmin.html
本地测试用户客：admin  密码：hlsk123456

======================================================================
获取与更换您的监控代码：
您可以在总后台-->监控代码  处获得代码，提供给各网站使用。注意，您的代码中绑定了您TaokeOCS的站点，如下webim.100im.cn即是TaokeOCS系统安装的站点。

<div id='webimFloat style='cursor:hand;'></div>
<script> function g(p){var r;d=document.cookie;s=d.indexOf(p+"=");if(s>=0){e=d.indexOf(";", s+p.length+1);if(e<0)e=d.length;r=d.substring(s+p.length+5,e-1)}; return r;} document.write("<scrip"+"t src=\"http://webim.100im.cn/webTalk.jsp?a=-1&frmurl="+escape(top.document.referrer)+"&curURL="+escape(top.document.URL)+"&p="+screen.width+"*"+screen.height+"&vid="+g("vMAC")+"&rt="+g("rt")+"&lvp="+g("lvp")+"&ck="+navigator.cookieEnabled+"\"></scrip"+"t>"); </script>
其实，您的监控代码，是和你安装时有关系的

注意：访客端域名，将会使您的监控代码有变化。
最好是访客端域名与监控端域名不一样，因为访客端域名是提供给用户使用，监控端域名是监控使用，当监控端出现问题时，不影响访客端通信，所以建议两者不一样，如：
访客端域名：webim.100im.cn:8080  
监控端域名：Client.100im.cn:8080
8080是Tomcat的默认端口号，具体看您自己设定Tomcat端口号
（如果你的这台服务器上没有IIS，也就不与Apache冲突，则访客端域名就不用8080了）



更换监控代码：
1、打开TaokeOCS服务器管理，更换访客端域名，如下图www.100im.cn


2、用记事本打开config\domain文件，将vdomain=www.100im.cn，保存即可，然后重启Apache、 Tomcat服务，服务大约1分钟后生效。