// 引入express
const express = require("express");
// 引入multer
const multer = require("multer");
// 引入path模块
const path = require("path");

// 创建路由
const updateRouter = express.Router();
// 引入控制器
const { updateName,updateBio,updatePasswd, updateAvatar } = require("../Controllers/updateCtrl");

// 设置文件上传路径
let uploader = multer({
    storage: multer.diskStorage({
        // 文件保存文职
        destination: (req,file,cb) => {
            cb(null,path.join(__dirname,"../","public","uploads"));
        },
        // 设置文件名
        filename: (req,file,cb) => {
            let filenameArr = file.originalname.split(".");
            let resultName = +new Date() + "." + filenameArr[filenameArr.length - 1];
            cb(null,resultName);
        }
    })
})

// 更新用户昵称
updateRouter.post("/updateName",updateName);
// 更新用户简介
updateRouter.post("/updateBio",updateBio);
// 更新用户密码
updateRouter.post("/updatePasswd",updatePasswd);
// 更新用户头像
updateRouter.post("/updateAvatar",uploader.single("avatar"),updateAvatar);

// 导出路由
module.exports = updateRouter;