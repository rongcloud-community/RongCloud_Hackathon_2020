/**
 * @author Lemon
 * 
 */

// 引入express
const express = require("express");

// 使用express方法创建服务
const app = express();

// 设置中间件
app.use(express.urlencoded({extended: true}));
//把./views目录设置为模板文件的根，html文件模板放在view目录中
app.set('views','./Views');
//设置模板引擎为ejs
app.set('view engine','ejs');

// 主页引入路由
const indexRouter = require("./Routers/indexRouter");
// 引入更新路由
const updateRouter = require("./Routers/updateRouter");
// 引入广场路由
const centerRouter =require("./Routers/centerRouter");
// 引入删除路由
const deleteRouter = require("./Routers/deleteRouter");

// 挂载主页路由
app.use("/",indexRouter);
// 挂载更新路由
app.use("/update",updateRouter);
// 挂载广场路由
app.use("/center",centerRouter);
// 挂载删除路由
app.use("/delete",deleteRouter);

// 设置端口
const port = 80;

// 监听并启动服务
app.listen(port,() => {
    console.log(`服务监听在${port}并启动!`);
})