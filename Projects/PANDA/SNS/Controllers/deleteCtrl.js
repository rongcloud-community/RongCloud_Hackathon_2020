// 引入模型
const { deleteOne } = require("../Models/ArticleDelete");

// 删除文章
module.exports.deleteArticle = (req,res) => {
    // 获取参数
    let { uid,cid } = req.body;

    // 判断用户是否传入了对应的参数
    if (uid === "" || uid === undefined || cid === "" || cid === undefined) {
        return res.json({
            code: 400,
            message: '缺少参数'
        }) 
    }

    // 删除对应的文章
    deleteOne(uid,cid,results => {
        if (results.affectedRows !== 0) {
            return res.json({
                code: 200,
                message: '文章删除成功!'
            })
        }
        return res.json({
            code: 400,
            message: '文章不存在'
        })
    })

}