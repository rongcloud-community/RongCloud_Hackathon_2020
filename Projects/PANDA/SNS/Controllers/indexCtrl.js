// 引入模型
const { findOne,register } = require("../Models/userRegister");
// 引入融云sdk
const RongSDK = require("../Config/rongSdkConfig");
// 引入moment
const moment = require("moment");
// 引入随机字符串
const randomstr = require('string-random');

// 显示主页
module.exports.showPage = (req,res) => {
    res.render("index");
}
// 注册
module.exports.register = (req,res) => {
    // console.log(req.body);
    // 获取用户信息
    let { uid,password,uname,portraitUri,gender,bio } = req.body;
    portraitUri = portraitUri ? portraitUri : "https://i.loli.net/2020/10/01/YmpN4jyE9n3xgPI.png";
    // 设置默认昵称
    uname = uname ? uname : ("To_" + randomstr(8));
    // 设置默认性别
    gender = gender ? gender : "保密";
    // 设置默认简介
    bio = bio ? bio : "这个人很懒,什么都没写!"
    // 查找用户是否存在
    findOne(uid,(results) => {
        if (Array.isArray(results) && results.length !== 0) {
            res.send({
                code: 400,
                message: "用户已存在"
            })
        } else {
            // 格式化用户信息
            let user = {
                id: uid,
                name: uname,
                portrait: portraitUri
            }
            // 注册用户
            RongSDK.User.register(user).then(result => {
                // 将用户信息添加到数据库
                if (result.code === 200) {
                    register({
                        uid: result.userId,
                        password,
                        uname: user.name,
                        token: result.token,
                        url: user.portrait,
                        gender,
                        bio,
                        createTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                        callback(results) {
                            if (results.affectedRows !== 0) {
                                res.json({
                                    code: 200,
                                    message: "用户注册成功",
                                    data: {
                                        id: result.userId,
                                        token: result.token
                                    }
                                })
                            }
                        }
                    })
                }
            },error => {
                res.json({
                    code: 400,
                    message: result.msg
                })
            })
        }
    })
    
}
// 登录
module.exports.login = (req,res) => {

    // 获取用户账号密码
    let { uid,password } = req.body;
    // 查询用户
    findOne(uid,results => {
        // 判断用户是否存在
        if (results.length === 0) {
            res.json({
                code: 400,
                message: "用户不存在!"
            })
            return;
        }
        if (results[0].password !== password) {
            res.json({
                code: 400,
                message: "密码错误!"
            })
        } else {
            // // 处理数据
            let temp = JSON.stringify(results[0]);
            temp = JSON.parse(temp);
            // 登录成功,将用户信息存到全局变量中
            // global.loginState.push(temp);
            // console.log(temp.use_id);
            console.log(temp.use_id);
            res.json({
                code: 200,
                message: "登录成功!",
                data: {
                    id: temp.use_id,
                    token: temp.token
                }
            })
        }
    })
}

