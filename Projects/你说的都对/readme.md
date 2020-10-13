> ## 你说的都对：**Klive-exer**

## 项目介绍

### 项目背景

&ensp;&ensp;&ensp;&ensp;随着人们生活水平的高速发展，智能交互已经不断的进入人们的生活。酒店服务业作为人们休闲娱乐的重要载体，对生活水平提高的实际应用和发展提供了温床。而且随着人工智能技术的提高，《智慧酒店的现状和发展趋势》一文中指出：发展智慧酒店可谓是酒店业发展的必然趋势，智慧酒店的发展除了是酒店自身更久的生存下去，更是和旅游业、城市的飞速发展相辅相成。

### 项目内容

- 本系统为提高酒店对客户的服务，聚焦于智慧酒店中的健身诉求，着重以私人虚拟健身教练为主，具体研究开发如下：

   1.系统计划应用CMU所提出的新型人体姿态估计算法——OpenPose 姿态识别来改善现有酒店智能化模式，从健身方面提升客户体验。

   2.系统为 Web 应用，基于传统 SSM 框架和 Flask 微型 Web 服务集成功能，并仅依赖单一摄像头实现对人体姿态点的检测，力求降低对硬件设备的依赖。

   3.系统用户可以通过选择不同健身课程来查看相关具体信息，并通过深度学习算法将标准姿态与用户动作相匹配，给以相应的检测反馈，同时还包括健身后圈子交流共享等服务。

> 部分数据来源为keep，仅供个人学习，非商用

### 所用技术
- Mockplus摹客原型设计工具
- PowerDesigner数据库设计工具
- IDEA和PyCharm开发工具
-  SSM组合框架&Flask微型Web框架
- OpenPose人体姿态识别开源库
- 流加载、SHA1加密
- 融云IM即时通讯SDK

### 模块简介与视图

- 用户登录和注册

<div  align="center">    
   <img src="images/k1.png" height = "100" alt="登录" align=center />
   <img src="images/k2.png" height = "100" alt="注册" align=center />
   <img src="images/k4.png" height = "100" alt="找回密码" align=center />
</div>

- 用户数据收集

<div  align="center">    
   <img src="images/k3.png" height = "100" alt="信息采集" align=center />
   <img src="images/k5.png" height = "100" alt="课程选择" align=center />
</div>

- 课程模块

<div  align="center">    
   <img src="images/js1.png" height = "100" alt="课程模块" align=center />
   <img src="images/js2.png" height = "100" alt="课程模块" align=center />
   <img src="images/js3.png" height = "100" alt="课程模块" align=center />
</div>

- 姿态检测和训练矫正

<div  align="center">    
   <img src="images/jc3.png" height = "100" alt="计划" align=center />
   <img src="images/jc1.png" height = "100" alt="训练模块" align=center />
   <img src="images/jc2.png" height = "100" alt="训练模块" align=center />
   <img src="images/jc4.png" height = "100" alt="训练模块" align=center />
</div>

- 数据统计

<div  align="center">    
   <img src="images/tj1.png" height = "100" alt="数据统计" align=center />
</div>

- 圈子交流

<div  align="center">    
   <img src="images/jl3.png" height = "100" alt="交流" align=center />
   <img src="images/jl1.png" height = "100" alt="交流" align=center />
   <img src="images/jl2.png" height = "100" alt="交流" align=center />
</div>

- 个人信息

<div  align="center">    
   <img src="images/gr1.png" height = "100" alt="个人信息" align=center />
   <img src="images/gr2.png" height = "100" alt="个人信息" align=center />
</div>

### SDK使用

在圈子交流模块，使用了融云IM即时通讯SDK实现了对每个课程创建讨论组，用户可随心交流。

## 商业价值

&ensp;&ensp;&ensp;&ensp;本系统研究既具有理论研究价值，也具有重要的实际应用价值和现实指导意义。系统实际上就是为解决“酒店智能化低”、“硬件设备昂贵”、“重建设，轻应用”等一系列问题而立意。在市场应用方面，本课题具有相对完整的系统和管理方案，调研并结合了当地多种类型酒店对于人工智能的需求和意见，由于私人虚拟健身教练这一市场空白，系统能够为现有的高端酒店提供低成本高回报的使用价值，对丰富酒店健身模块具有极其重要的指导作用。同时系统实现了人体姿态识别技术的应用落地，通过深度学习算法将识别结果同功能相衔接，也具有参考价值。

## 不足与展望

&ensp;&ensp;&ensp;&ensp;系统目前仍具有一些不足，主要表现在算法应用方面。在姿态检测模块，由于系统需要不间断的向算法服务器发送http请求，并且后台算法需要启动模型处理，反馈给前端的画面展示不太流畅，但仍在用户接受范围之内。而对于课程的添加方面，本系统由于设计原因未给出相应功能接口。

## 如何安装和启动

- 项目为Springboot项目，需要提前有maven环境安装，并且导入项目后使用pom导入依赖包
- 在sql文件中导入数据库
- 启动springboot后，浏览器输入 http://localhost:8088/Klive/main 进入主界面

## Q&A

### 1.为何我无法启动项目

答：项目本身拥有众多jar包，并且使用Mybatis与后台数据库相连接，需要在导入pom所有依赖后，在properties文件中修改数据库连接信息等。

### 2.为何我启动项目后，无法登陆

答：系统本身具有注册功能，为真实的网站项目，需要先进行注册成功后才能登陆，**需要真实手机号**。

### 3.为何我登录成功后，系统大部分显示没有内容

答：为防止数据泄露，数据库文件中仅包含有数据结构，不含数据，需要在表**class_info**中添加数据

### 4.为何我无法使用项目姿态识别功能

答：项目算法端部署于flask上，由于算法模型巨大无法上传github，所以该演示项目中不包含实际算法处理。
