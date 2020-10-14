# fearless

## 简介

本作品用于在线实时聊天，可以通过用户列表查找用户并添加用户为好友，开始聊天，并且支持纯文本或图文信息，一个信息支持上传一张图片

## 使用的融云SDK

RongIMLib-3.0.7

## 文件目录

* src文件夹：里面有backend和frontend文件夹，分别是后端和前端代码

## 页面及对应功能

前端：

* `/login`：登陆
* `/register`：注册
* `/editInfo`：编辑个人信息
* `/editInfo/:id`：编辑别人信息，仅管理员可用
* `/userList`：用户列表
* `/userList/:id`：查看该User ID对应用户的资料，可通过该页面添加对方到黑名单或添加为好友
* `/singleChat`：单聊页面

后端：

* `/userinfo/changeOthers`：编辑别人信息
* `/userinfo/changeSelf`：编辑自己信息
* `/userinfoOther`：显示其他用户的信息
* `/userRelationChange`：两个用户关系改变
* `/userinfo`：显示自己信息
* `/userList`：用户列表
* `/getConversationMessages`：获取指定对话信息
* `/getConversation`：获取会话
* `/updateConversation`：更新对话
* `/sendMessage`：发信息
* `/readMessage`：读信息
* `/editMessage`：编辑信息（限5分钟以内自己的）
* `/uploadFile`：上传文件（限10M）
* `/recallMessage`：撤回信息（限5分钟以内自己的）
* `/readConversation`：读对话
* `/logout`：登出
* `/login`：登陆
* `/register`：注册
* `/uploads/`：上传后的路径，注意要放后端路径下uploads文件夹，并且要定义好RONG_UPLOADPATH的环境变量

注意后端运行前要定义好几个环境变量，见connectinfo.go

## 线上地址

[https://rongcloud.babybichu.cn](https://rongcloud.babybichu.cn)

## 项目前景

因为个人时间限制，所以还有很多待开发的功能，比如——
1. 系统信息
2. 语音信息
………………