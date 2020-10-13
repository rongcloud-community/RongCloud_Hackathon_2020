//创建 express 框架
const express = require("express");
//创建服务
const app = express();
const path = require("path");
//导入ejs模块
var ejs = require("ejs");
const session = require("express-session");

//导入路由
const userRouter = require("./route/userRouter");

//设置静态资源默认路径
app.use(
  express.static(path.join(__dirname, "public"), {
    index: "index.html",
  })
);

//设置中间件
app.use(express.urlencoded({ extended: false }));

//#region  ejs 设置
//把./views目录设置为模板文件的根，html文件模板放在view目录中
app.set("views", "./view");

//设置模板引擎为ejs
app.set("view engine", "ejs");

//为html扩展名注册ejs
app.engine("html", ejs.renderFile);
//#endregion

//#region  session设置
//配置中间件
app.use(
  session({
    secret: "keyboard cat",
    name: "diting",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 99999999999999999 }, //单位ms
  })
);

//#region session 常用方法
// req.session.username = "张三";

// //获取session
// req.session.username;

// //重新设置cookie的过期时间
// req.session.cookie.maxAge = 1000;

// //销毁session
// req.session.destroy(function (err) {});
//#endregion

//#endregion

//端口号
const port = 5555;

//挂载路由
//用户管理
app.use("/user", userRouter);
//连接管理
// app.use('/conversation',connectRouter);

//监听指定端口  开启服务
app.listen(port, () => console.log(`https://www.wanlum.com`));
