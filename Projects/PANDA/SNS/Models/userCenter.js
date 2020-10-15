//  引入连接池
const pool = require("../Config/dbconfig");

// 添加广场数据
module.exports.addOneArticle = (option) => {
    // 获取用户id
    let uid = option.uid;
    // 获取用户发布时间
    let publishTime = option.publishTime;
    // 获取用户文章内容
    let content = option.content;
    // 获取用户是否要发布到广场
    let findMates = option.findMates;
    // 获取经度
    let lng = option.lng;
    // 获取维度
    let lat = option.lat;
    // 回调函数
    let callback = option.callback;

    // 创建sql
    let sql = `insert into center(use_id, publishTime, content, findMates,lng,lat) values("${uid}","${publishTime}","${content}","${findMates}","${lng}","${lat}")`;

    // 执行查询
    pool.query(sql,(error,results) => {
        if (error) throw error;
        // 执行回调
        callback(results);
    })
}

// 获取广场数据
module.exports.getArticleInCenter = (uid,callback)=>{
    let sql = `SELECT u.use_id,u.name,u.gender,u.url,u.gender,c.cid,c.publishTime,c.content,c.lng,c.lat FROM center AS c JOIN users AS u ON c.use_id=u.use_id WHERE findMates = '1' AND c.use_id != '${uid}' ORDER BY c.publishTime DESC;`;
    pool.query(sql, (error,results)=>{
        if (error) throw error;
        callback(results);
    })
}
// 获取用户自己发表的文章
module.exports.getMeArticle = (uid,callback) => {
    // 创建sql
    let sql = `select * from center where use_id = '${uid}' order by publishTime desc;`;
    // 执行查询
    pool.query(sql,(error,results) => {
        if (error) throw error;
        // 执行回调函数
        callback(results);
    })
}
// 获取用户的个人数据
module.exports.getProfile = (uid,callback) => {
    // 创建sql
    let sql = `SELECT \`use_id\`,\`name\`,\`url\`,\`gender\`,\`bio\`,\`createTime\` FROM users WHERE use_id = '${uid}';`;
    // 执行sql
    pool.query(sql,(error,result) => {
        if (error) throw error;
        callback(result);
    })
}
// 获取用户个人信息
module.exports.getUserInfo = (uid,callback) => {
    // 创建sql
    let sql = `select use_id,\`name\`,url from users where use_id = '${uid}'`;

    // 执行查询
    pool.query(sql,(error,results) => {
        if (error) throw error;
        // 执行回调函数
        callback(results);
    })
}
// 查找用户是否存在
module.exports.findOne = (uid,callback) => {
    // 创建sql
    let sql = `select * from users where use_id = "${uid}"`;
    // 执行sql
    pool.query(sql,(error,results) => {
        if (error) throw error;
        callback(results);
    })
}