# “宠宝儿” 
##### iOS 客户端（RongIMKit+RTCLib）
开发环境：Xcode 11.4 MacOS 10.15.5<br>
测试账号 1，普通用户 111 密码111<br>
测试账号 2，宠物医生 123 密码1234<br>

## 主体功能简介
#### 1，用户信息模块
#### 2，宠物信息模块
#### 3，资讯，常识，公告模块
#### 4，宠物救助模块
#### 5，宠物医生模块
#### 6，IM单聊模块
#### 7，RTCLib直播模块
#### 8，分享模块
## 项目文件结构
### 一：用户信息及登录注册
##### /AnimalilHome/UserInfoViewController 为其主目录<br>
##### /ChangeUserInfo 修改用户信息<br>
##### /BackPassword 为修改密码<br>
##### /RegisterView 用户注册<br>
##### /LogIn 用户登录<br>
##### UserInfoObject.swift 文件为用户信息管理模型 <br>
### 二：首页
##### /AnimalilHome/Home 为首页主目录HomeViewController.swift为首页主控制器
##### /AnimalListViewController 为宠物列表页，List形式展示宠物大概信息<br>
##### /HomeFloorView为首页楼层文件夹，其中包括热门宠物，资讯，宠物常识和banner<br>
### 三：救助
##### /AnimalilHome/CommentViewController 宠物救助主目录 ##### HelpMainViewController.swift为主控制器<br>
##### DoctorViewController为宠物医生列表<br>
### 四：个人中心
##### /My 个人中心主目录，MyViewController.swift 为主控制器<br>
##### /PubListViewController 选择发布类型，救助，招领，领养等类型<br>
##### /PubViewController 发布页面<br>
##### /AboutUs 关于我们<br>
##### /PersonInfoViewController 个人信息展示页面<br>
##### /MyHomeSubViews 个人中心头部信息展示 <br>
### 五：聊天
##### /IMChat 为聊天相关的主目录<br>
##### /ChatViewController 为单聊聊天页面<br>
##### /ChatListViewController 为会话列表页<br>
### 六：直播
##### /RongRtcVideo 为直播相关功能主文件夹<br>
##### /PlayRtcReadVC 为发布直播时的预设置页面，直播标题和封面图<br>
##### /RtcListVC 为当前所有在线直播的列表<br>
##### /RtcWindowManager 为直播时的窗口管理<br>
##### /look 为观看直播时的逻辑<br>
##### /Play 为直播的逻辑<br>
##### /subview为直播中所用到功能的逻辑<br>
##### /subview/ChatRoomPersonListView 为直播中所有观看人员列表<br>
##### /subview/toprightview 为右上角主播信息，魅力值，观看人数逻辑<br>
##### /subview/lwbotomview 为礼物展示等逻辑<br>
##### /subview/msglist 为直播中观看人员发送的消息逻辑<br>

## 项目截图

![image](https://github.com/zhangxianhongx/RongCloud_Hackathon_2020/blob/master/Projects/MAXFLOAT/1.jpg)








###### 开发者：贝尔特伦（zxh）
