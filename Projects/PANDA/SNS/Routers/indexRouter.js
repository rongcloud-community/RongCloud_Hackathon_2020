// 引入express
const express = require("express");
// 引入控制器
const { showPage,register,login } = require("../Controllers/indexCtrl");

// 创建路由
const indexRouter = express.Router();

// 主页路由
indexRouter.get("/",showPage);
// 注册路由
indexRouter.post("/register",register);
// 登录路由
indexRouter.post("/login",login);


// 导出路由
module.exports = indexRouter;