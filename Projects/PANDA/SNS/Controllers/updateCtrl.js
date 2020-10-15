/**
 * @author Lemon
 * 更新用户信息
 */
// 引入fs模块
const fs = require("fs");
// 引入path模块
const path = require("path");
// 引入融云sdk
const RongSDK = require("../Config/rongSdkConfig");
// 导入模型
const {
    updateOne,
    findOne
} = require("../Models/userUpdate");
// 引入OSS控制器
const {
    uploadOSS,
    deleteOSS,
    existImage
} = require("../Controllers/OSSCtrl");

// 更新昵称
module.exports.updateName = (req, res) => {
    // 获取用户的信息
    let {
        uid,
        uname
    } = req.body;
    // 判断用户是否传入了昵称
    if ((typeof uname === "String" && uname.trim().length === 0) || !uname) {
        res.json({
            code: 400,
            message: "你什么都没写呢"
        })
        return;
    }
    // 获取用户的头像地址
    findOne(uid, (data) => {
        // 更新用户数据
        updateOne({
            // 用户id
            uid,
            // 字段名称
            field: "name",
            // 更新的值
            updateOption: uname,
            callback(results) {
                if (results.affectedRows === 1) {
                    // 更新融云上面的昵称
                    RongSDK.User.update({
                        // 用户id
                        id: uid,
                        // 用户昵称
                        name: uname,
                        // 用户头像
                        portrait: data[0].url
                    }).then(result => {
                        return res.json({
                            code: 200,
                            message: "昵称已更新!"
                        })
                    }).catch(err => {
                        console.log(err);
                    })
                }
            }
        })
    })
}
// 更新简介
module.exports.updateBio = (req, res) => {
    // 获取参数
    let {
        uid,
        bio
    } = req.body;
    // 判断是否传了简介
    if (!bio) {
        res.json({
            code: 400,
            message: "你什么都没写呢"
        })
        return;
    }
    // 更新数据
    updateOne({
        // 用户id
        uid,
        // 字段名称
        field: "bio",
        // 更新的值
        updateOption: bio,
        // 更新的值
        callback(results) {
            if (results.affectedRows === 1) {
                res.json({
                    code: 200,
                    message: "简介已更新"
                })
            }
        }
    })
}
// 更新密码
module.exports.updatePasswd = (req, res) => {
    // 获取用户信息
    let {
        uid,
        password,
    } = req.body;
    // 判断用户是否传入了密码
    if (!password) {
        res.send({
            code: 400,
            message: "密码为必填项"
        })
        return;
    }
    // 执行查询
    updateOne({
        // 用户id
        uid,
        // 字段名称
        field: "password",
        // 更新的值
        updateOption: password,
        // 回调函数
        callback(results) {
            if (results.affectedRows === 1) {
                // 返回信息
                res.json({
                    code: 200,
                    message: "密码更改成功!"
                })
            }
        }
    })

}
// 更新用户头像
module.exports.updateAvatar = (req, res) => {
    // 获取用户的id
    let uid = req.body.uid;
    // 判断用户是否上传了头像
    if (!req.file) {
        res.json({
            code: 400,
            message: "您什么都没上传呢"
        })
        return;
    }
    // 获取文件名字
    let filename = req.file.filename;
    // 获取用户的头像地址
    findOne(uid, results => {
        // 判断是否获查询到了对应用户
        if (results.length !== 0) {
            // 获取用户头像文件名字
            let ufilename = results[0].url.split("/");
            ufilename = ufilename[ufilename.length - 1];
            // 判断文件在oss是否存在
            existImage(ufilename).then(data => {
                // 如果存在就删除OSS上面的文件
                deleteOSS(ufilename);
            })
            // 上传本地的文件
            uploadOSS(filename).then((ossUrl) => {
                // 更新数据
                updateOne({
                    // 用户id
                    uid,
                    // 字段名称
                    field: "url",
                    // 更新的值
                    updateOption: ossUrl,
                    // 回调函数
                    callback(data) {
                        if (data.affectedRows === 1) {
                            // 更新融云的头像链接
                            RongSDK.User.update({
                                // 用户id
                                id: uid,
                                // 用户昵称
                                name: results[0].name,
                                // 用户头像地址
                                portrait: ossUrl
                            }).then((msg) => {
                                return res.json({
                                    code: 200,
                                    url: ossUrl,
                                    message: "头像更新成功!"
                                })
                            }).catch((err) => {
                                console.log(err);
                            })
                        } else {
                            return res.json({
                                code: 400,
                                message: "未知错误,请联系管理员"
                            })
                        }
                    }
                })

            }).catch(() => {
                res.json({
                    code: 400,
                    message: "未知错误,请联系管理员"
                })
            })
            // 上传成功后异步删除本地缓存的文件
            fs.unlink(path.join(__dirname, "../", "public", "uploads", filename), (err) => {
                if (err) throw err;
            })
            return;
        }
        res.json({
            code: 400,
            message: "用户不存在"
        })
    })
}