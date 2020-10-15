// 引入连接池
const pool = require("../Config/dbconfig");

/**
 * @param {String} uid 用户id
 * @param {int} cid 文章id 
 * @param {function} callback 回调函数
 */
module.exports.deleteOne = (uid,cid,callback) => {
    // 创建sql
    let sql = `delete from center where cid = ${cid} and use_id = '${uid}';`;
    // 执行sql
    pool.query(sql,(error,results) => {
        if (error) throw error;
        callback(results);
    })
}