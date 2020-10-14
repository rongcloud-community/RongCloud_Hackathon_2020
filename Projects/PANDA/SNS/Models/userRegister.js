// 引入连接池
const pool = require("../Config/dbconfig");

/**
 * 注册
 * @param {object}
 */
module.exports.register = (option) => {
    let uid = option.uid; // 用户id,
    let password = option.password; // 密码
    let uname = option.uname; // 用户昵称
    let token = option.token; // token
    let url = option.url; // 头像地址
    let gender = option.gender; // 用户性别
    let bio = option.bio;
    let createTime = option.createTime;
    let callback = option.callback;
    /*
    uid,uname,token,portraitUri,date,callback
    */
    // 将数据添加到数据库
    let sql = `insert into users values("${uid}","${password}","${uname}","${token}","${url}","${gender}","${bio}","${createTime}")`;
    // console.log(sql);
    // 执行查询
    pool.query(sql,(error,results) => {
        if (error) throw error;
        callback(results);
    })
}

/**
 * 查找用户
 * @param {String} uid 用户id
 * @param {function} callback 回调函数
 */
module.exports.findOne = (uid,callback) => {
    // 创建sql
    let sql = `select * from users where use_id = "${uid}"`;
    // 执行查询
    pool.query(sql,(error,results) => {
        if (error) throw error;
        callback(results);
    })
}