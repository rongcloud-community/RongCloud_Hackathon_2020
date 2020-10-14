// 引入express
const express = require("express");
// 引入moment
const moment = require("moment");

// 创建路由
const centerRouter = express.Router();
// 引入控制器
const { addArticle,getArticles,getMeArticle,getUserInfo } = require("../Controllers/centerCtrl");

// 添加广场信息
centerRouter.post("/add",addArticle);
// 传输广场信息
centerRouter.get("/getCenters", getArticles);
// 获取自己发表的文章
centerRouter.get("/getMeArticle",getMeArticle);
// 获取用户信息
centerRouter.get("/getUserInfo",getUserInfo);

// 导出路由
module.exports = centerRouter;