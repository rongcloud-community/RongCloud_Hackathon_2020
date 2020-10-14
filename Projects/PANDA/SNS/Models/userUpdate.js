/**
 * 更新用户信息
 */

// 引入连接池
const pool = require("../Config/dbconfig");

// 更新方法
module.exports.updateOne = (option) => {
    let uid = option.uid; // 用户id
    let field = option.field; // 需要更新的字段
    let updateOption = option.updateOption; // 更新的值
    let callback = option.callback; // 回调函数

    // 创建sql
    let sql = `update users set \`${field}\` = "${updateOption}" where use_id = "${uid}"`;
    // 执行查询
    pool.query(sql,(error,results) => {
        if (error) throw error;
        // 执行回调
        callback(results);
    })
}
/**
 * 
 * @param {String} uid 用户id
 * @param {String} password 用户密码
 * @param {function} callback 回调函数
 */
module.exports.findOne = (uid,callback) => {
    // 创建sql
    let sql = `select * from users where use_id = "${uid}"`;
    // 执行sql
    pool.query(sql,(error,results) => {
        if (error) throw error;
        callback(results);
    })
}