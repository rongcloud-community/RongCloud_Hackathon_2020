// 引入moment
const moment = require("moment");
const {
    User
} = require("../Config/rongSdkConfig");
// 引入模型
const {
    addOneArticle,
    getArticleInCenter,
    getMeArticle,
    getProfile,
    getUserInfo,
    findOne
} = require("../Models/userCenter");

// 添加广场文章
module.exports.addArticle = (req, res) => {
    // 判断数据是否为空
    if (!req.body) {
        return res.json({
            code: 400,
            msg: "没有接收到数据!"
        })
    }
    // 获取用户信息
    let {
        uid,
        content,
        findMates,
        lng,
        lat
    } = req.body;
    lng = lng === undefined ? 0 : lng;
    lat = lat === undefined ? 0 : lat;
    // 将findMates转换成布尔
    findMates = findMates === "true" ? true : false;
    // 将findMates在转换成数字之后在转换成字符串
    findMates = String(Number(findMates));
    // 处理时间
    let publishTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    // 添加数据
    addOneArticle({
        // 用户id
        uid,
        // 发布时间
        publishTime,
        // 文章内容
        content,
        // 是否发布到广场
        findMates,
        // 经度
        lng,
        // 维度
        lat,
        // 回调函数
        callback(results) {
            if (results.affectedRows !== 0) {
                return res.json({
                    code: 200,
                    message: "文章添加成功"
                })
            }
            return res.json({
                code: 400,
                message: "出现未知错误，请联系管理员"
            })
        }
    })
}
// 获取广场页
module.exports.getArticles = (req, res) => {
    // 判断用户是否传入了参数
    if (req.query.uid == undefined || req.query.uid == "") {
        return res.json({
            code: 400,
            data: null,
            message: "你的参数呢?"
        })
    }
    // 获取uid
    let {
        uid
    } = req.query;
    getArticleInCenter(uid, (result) => {
        // 判断是否获取成功
        if (result) {
            return res.json({
                code: 200,
                data: result,
                message: '文章获取成功'
            })
        }
        return res.json({
            code: 404,
            data: null,
            message: "该用户下没有文章!"
        })
    })
}
// 获取自己发的动态
module.exports.getMeArticle = (req, res) => {
    // 获取用户的id
    let id = req.query.uid;
    // 判断用户是否传入了id
    if (id === undefined || id === "") {
        return res.json({
            code: 400,
            data: null,
            message: "你什么参数都没写呢"
        })
    }
    // 查找用户的文章
    getMeArticle(id, results => {
        console.log(results);
        // 查找用户个人数据
        getProfile(id, (pdata) => {
            console.log(pdata);
            // 返回数据
            return res.json({
                code: 200,
                data: results,
                profile: pdata[0],
                message: "用户文章获取成功!"
            })
        })
    })
}
// 获取个人信息
module.exports.getUserInfo = (req, res) => {
    let uid = req.query.uid;
    // 判断用户是否传入了id
    if (req.query.uid === undefined || req.query === '') {
        return res.json({
            code: 400,
            message: '您什么都没传入呢!'
        })
    }

    // 判断用户是否存在
    findOne(uid, (results) => {
        if (results.length !== 0) {
            // 获取用户信息 
            return getUserInfo(uid, (results) => {
                // 返回信息
                return res.json({
                    code: 200,
                    message: '数据获取成功!',
                    data: results[0]
                })
            })
        }
        return res.json({
            code: 400,
            message: '用户不存在!',
            data: null
        })
    })

}