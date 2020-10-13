## 项目使用技术：
Node.js

Express

HTML5

CSS

融云IM sdk

JavaScript

WebSocket

## 项目背景：

扫雷是一款经典游戏，本项目旨在给扫雷玩家提供一个竞技平台，可以进行扫雷竞赛，将最快纪录保存在排行榜。

同时本项目在游戏内封装了WebSocket操作接口，AI爱好者可以基于改操作接口设计自己的扫雷游戏，并提供了AI扫雷基准示例程序，成功率约30%。

在排行榜部分使用了融云Sdk进行信息传递。

## 项目使用：

1.需要安装node.js express npm

2.进入Projects/mine/mine目录

3.npm install 

4.npm start

5.打开localhost:3000即可呈现扫雷游戏

6.扫雷成功后可以留名在排行榜上

7.游戏提供WebSocket的交互接口，基于接口可以测试自己的AI扫雷程序

8.AI程序运行ws服务端，开启ai后需要刷新重启游戏来建立连接。
