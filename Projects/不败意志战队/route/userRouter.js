//引入express框架
const express = require('express');

//引入controller层
const { userRegistered , getUserInfo , meetings , joinUser , showUsers , changeUserId , reusername } = require('../controller/userCtrl');

//使用express 的 Router 方法创建路由
const userRouter = express.Router();

//创建具体路由
// 创建会议
userRouter.post('/registered',userRegistered);

// 获取用户数据
userRouter.post("/getUserInfo",getUserInfo);

//随机生成的id转成用户输入的id
userRouter.post('/changeId',changeUserId);

//修改姓名
userRouter.post('/rename' , reusername);

// 加入会议
userRouter.get('/join',joinUser);

//获取会议成员
userRouter.get('/show',showUsers);

//会议页面渲染
userRouter.get("/meeting", meetings);

//导出路由
module.exports = userRouter;