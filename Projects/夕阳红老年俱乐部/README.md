# 项目介绍  
## 队名
夕阳红老年俱乐部  

## 项目名  
YiyiChat  

## 如何运行  
springboot+maven项目，需要使用IDEA打开项目，使用pom.xml导入jar包，安装完成后运行。  
在浏览器输入localhost：8080/blind进行访问（记得先导入数据库blind.sql到mysql数据库,数据库端口3310，数据库名pyblind用户名为root，密码为123456）  
可以通过修改application.properties文件修改配置。  

## 项目简介  
本项目从盲人日常出行不便的现状出发，旨在利用低成本的简单工具——双目摄像头，结合目标检测、图像识别、
图像测距等技术实现为视觉障碍者独自出行的智能指引（客户端），同时给亲友提供反馈信息，提供价格适中、使用简易和功能齐全的智能辅助系统。
这里的系统后台的web模块，使用到了融云即时通讯sdk实现盲人出行智能导航管理系统中用户更直接的面对面视频通话交流。
后台反馈系统使用JAVA语言进行开发，前端页面使用LayUI框架进行简洁的界面开发，后台使用SSM（Spring+SpringMVC+MyBatis）框架进行搭建和开发。
系统结构图：  
![系统结构图](https://github.com/kreamiii/RongCloud_Hackathon_2020/blob/master/Projects/images/xtjg.png)

## 项目背景  
进入21世纪后，中国社会老龄化问题逐渐出现，当代社会中存在视觉障碍的弱势群体占比也逐年增高，单老年人口与残障人士两个弱势群体，
总人数就已经超过3.4亿，为了应对这种状况，政府也在17年提出了《中国国别战略计划》，提出了帮扶社会弱势群体的要求。
同时，从第二次全国残疾人抽样调查得知，我国目前有1223万单项视力残疾人，多重残疾中有视力残疾的有458万，视力残疾群体一共有1691万人。
在全盲人群中，只有10％的人能够独立搭乘公共交通工具，绝大多数需要其他人的引导和协助。  

## 痛点分析  
目前存在的定向行走辅具包括两大类，一类偏向于辅助盲人了解行走环境的空间布局，即建构心理地图。另一类是偏向于实际导航指引的辅具，
如盲人步行GPS导航仪，近距离障碍物侦测设备等。
现在也有一些研究成功的兼具远距离导航和近距离障碍物侦测功能的设备，例如微软可穿戴Alice band、智能假发SmartWig、Eyeronman背心等等，
它们一般兼具避障、自动定位、智能导航、智能识别物体等多功能，这些设备通常造价较高，这也是这些产品大面积普及的困难之一。  

## 数据库设计  
数据库的结构和数据在blind.sql文件中。数据库设计图如下：  
![数据库设计](https://github.com/kreamiii/RongCloud_Hackathon_2020/blob/master/Projects/images/sjk.png)  

## 模块功能以及使用说明  
对于整个系统功能模块的设计如下：
1)	移动设备（本部分内容没有上传）：  
![移动设备](https://github.com/kreamiii/RongCloud_Hackathon_2020/blob/master/Projects/images/ydd.png)  
目标检测和障碍物识别的功能，利用YOLOv3算法进行实时目标检测，将物体位置标出并获取类别标签，通过实时的提示让盲人对周围情况的感知更加具体；
测距功能，利用双目测距的原理，通过的图像测距的方式测量出前方障碍物的大致距离，通过具体数值的提醒，更清晰地提前告知盲人前方障碍物的距离
，提供盲人提前的反应和准备时间。  

2)	后台系统：  
![后台系统](https://github.com/kreamiii/RongCloud_Hackathon_2020/blob/master/Projects/images/htgn.png)   
登录注册功能，用户可以在系统上注册账号，并使用该账号进行登录后使用系统功能；  
设备绑定及解绑功能，用户登录后可以在账号下通过设备编号绑定一台移动设备；  
行程展示功能，展示账号下移动端设备所有出行的行程，展示其起点、终点、出行时间等信息并提供行程搜索的功能；  
关键记录展示功能，展示账号下移动端设备每个行程的关键记录，包括经过的大型障碍物、红绿灯路口等并提供关键记录搜索功能；  
实时画面展示功能，展示账号下移动端设备当前拍摄的的画面以及处理后的画面，并显示相关路况信息；  
实时行程展示功能，展示账号下移动设备当前行程路线以及位置信息；  
交流互动功能，用户登录后可以在社区进行交流互动，内容包括：发表文章、查看文章、发表评论、查看用户信息、关注用户等。  
意见反馈功能，用户登录后可以向后台提交反馈意见。  
视频通话功能，使用融云即时通讯的SDK，实现用户的相互视频交流。  
后台系统的功能用例图如下：  
![功能用例](https://github.com/kreamiii/RongCloud_Hackathon_2020/blob/master/Projects/images/gnyl.png)  

使用说明：  
使用BlindApplication运行程序后访问localhost：8080/blind,可进入登录界面，使用管理员用户名：admin,密码123456，输入验证码后即可登录。（也可以自己注册账号登录）  
![登录](https://github.com/kreamiii/RongCloud_Hackathon_2020/blob/master/Projects/images/dljm.jpg)   
![注册](https://github.com/kreamiii/RongCloud_Hackathon_2020/blob/master/Projects/images/zc.jpg)   
在行程管理页面可以进行查看行程，搜索行程的操作。  
![行程管理](https://github.com/kreamiii/RongCloud_Hackathon_2020/blob/master/Projects/images/cxxx.jpg)     
在实时监测页面可以查看移动设备的位置和当前行程。  
![实时监测](https://github.com/kreamiii/RongCloud_Hackathon_2020/blob/master/Projects/images/ssjc.jpg)   
在关键记录页面可以进行查看关键记录，搜索关键记录的操作。  
![关键记录](https://github.com/kreamiii/RongCloud_Hackathon_2020/blob/master/Projects/images/gjjl.jpg)   
在实时影像页面可以查看设备当前影像以及处理后画面。  
![实时影像](https://github.com/kreamiii/RongCloud_Hackathon_2020/blob/master/Projects/images/ssyx.jpg)   
在信息交流模块可以搜索查看用户发表的文章内容，可以进入用户主页对用户进行关注等操作。  
![信息交流](https://github.com/kreamiii/RongCloud_Hackathon_2020/blob/master/Projects/images/xxjl.jpg)   
在文章详情页面可以对文章进行查看和评论。  
![文章详情](https://github.com/kreamiii/RongCloud_Hackathon_2020/blob/master/Projects/images/wzxq.jpg)   
在产品介绍页面可以查看产品的相关介绍和调研结果。  
![产品介绍](https://github.com/kreamiii/RongCloud_Hackathon_2020/blob/master/Projects/images/cpjs.jpg)   
在意见反馈页面可以提交用户的意见和建议。  
![意见反馈](https://github.com/kreamiii/RongCloud_Hackathon_2020/blob/master/Projects/images/yjfk.jpg)   
在视频通话页面可以拨打和接听视频通话。  
![视频通话](https://github.com/kreamiii/RongCloud_Hackathon_2020/blob/master/Projects/images/spth.jpg)   
在个人信息页面可以修改个人信息。  
![个人信息](https://github.com/kreamiii/RongCloud_Hackathon_2020/blob/master/Projects/images/grxx.jpg)   
在设备管理页面可以对移动设备进行管理。  
![设备管理](https://github.com/kreamiii/RongCloud_Hackathon_2020/blob/master/Projects/images/sbgl.jpg)   



