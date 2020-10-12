### 一、服务端：

###云端地址http://h.363z6.top/admin
###开发的时候使用使用google chrome浏览器的，还没有考虑兼容问题，请尽量使用google chrome浏览器打开
### 用户名：admin  密码：123456

##### 1、服务端是采用python的tornado框架来搭建的，数据库使用的mongodb
##### 2、在服务端上安装了融云python-server-sdk可以直接调用
##### 3、修改融云server-sdk的app_key和app_secret在libs/rongcloud/RongCloudBase.py 里面修改
##### 4、修改mongodb的连接信息在libs/db/mongodb.py里修改
##### 5、服务端的模块分为两大块 admin 和 int
#####    admin是主要管理用户和消息，是使用了easyui作为前端框架，在admin模块中可以实现一对多的聊天功能。
#####    主要是满足在网页环境中客服人员对咨询者进行一对一的即时聊天对话
#####     int 主要是面向client提供api支持

              


### 二、客户端
##### 1、客户端是直接使用h5页面写的，前端框架是使用了bootstrap再结合vue和jquery，在本地可直接运行也可放到互联网环境中
##### 2、客户端中调用了融云的web-sdk
##### 3、客户端调用的API是由服务器的int模块提供的
##### 4、目前是完成了单聊功能，输入用户名密码后初始化后选择需要进行聊天的用户进行对话即可
##### 5、在index.html中修改APPKEY中的值即可，root_url是服务器的地址
##### 以下为几个测试账号
### 用户名: huang    密码: 123456
### 用户名: huang1    密码: 123456
### 用户名: huang2    密码: 123456
### 用户名: admin    密码: 123456
