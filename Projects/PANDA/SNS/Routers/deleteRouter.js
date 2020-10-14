// 引入express
const express = require("express");

// 创建路由
const deleteRouter = express.Router();
// 引入控制器
const { deleteArticle } = require("../Controllers/deleteCtrl");

// 删除文章路由
deleteRouter.delete("/deleteArticle",deleteArticle)

// 导出路由
module.exports = deleteRouter;