//添加数据库连接池
const pool = require('../config/dbConfig');

//添加会议
module.exports.addCreateUser = (data , callback) => {
    //创建values
    var values = '';
    //拼接数据
    for(let k in data){
        values += "'"+data[k]+"',";
    };

    //删除末尾,
    values = values.slice(0,-1);
    pool.query(`
    INSERT INTO imweb_login(log_userId, log_code, log_token, log_returnId) VALUES (${values})
    ` 
    ,function(error,results){
        if(error) throw error;

        callback(results);
    })
}



//查找会议
module.exports.findMeetingId = (meetingId , callback) => {
    //创建数据库语句
    let sql = `select join_meetingId from imweb_join where join_meetingId = "${meetingId}"`;

    //查询数据库
    pool.query(sql,function(error,results){
        if(error) throw error;

        callback(results);
    })
}



//添加加入的用户
module.exports.addJoinUser = (data , callback) => {
    //创建values
    var values = '';
    //拼接数据
    for(let k in data){
        values += "'"+data[k]+"',";
    };

    //删除末尾,
    values = values.slice(0,-1);
    pool.query(`
    INSERT INTO imweb_join(join_onlyId, join_meetingId, join_portrait, join_username , join_time) VALUES (${values})
    ` 
    ,function(error,results){
        if(error) throw error;

        callback(results);
    })
}



//查询所有会议中的成员
module.exports.findMeetingUser = (meetingId , callback) => {
    //创建sql语句
    let sql = `select ij.* , \`is\`.status_type from imweb_join ij , imweb_status \`is\` where ij.join_onlyId = \`is\`.status_userId and ij.join_meetingId = '${meetingId}';`;

    //查询数据库
    pool.query(sql,function(error,results){
        if(error) throw error;

        callback(results);
    })
}




//查询会议中成员个数
module.exports.findCountUser = (meetingId , callback) => {
    //创建sql语句
    let sql = `select count(*) userCount from imweb_join where join_meetingId = "${meetingId}"`;

    //查询数据库
    pool.query(sql,function(error,results){
        if(error) throw error;

        callback(results);
    })
}



//添加状态
module.exports.addStatus = (userId , type , callback) => {
    //创建sql语句
    let sql = `INSERT INTO imweb_status(status_userId, status_type) VALUES('${userId}','${type}');`;

    //查询数据库
    pool.query(sql,function(error,results){
        if(error) throw error;

        callback(results);
    })
}



//根据姓名 查找数据
module.exports.findUserByName = (username , callback) => {
    //创建sql语句
    let sql = `select * from imweb_join where join_username = '${username}'`;

    //查询数据库
    pool.query(sql,function(error,results){
        if(error) throw error;

        callback(results);
    });
}



//修改姓名
module.exports.rename = (userId , username , callback) => {
    //创建sql语句
    let sql = `update imweb_join set join_username = '${username}' where join_onlyId = '${userId}'`;

    //查询数据库
    pool.query(sql,function(error , results){
        if(error) throw error;

        callback(results);
    });
}



//通过融云返回的id 查找用户id
module.exports.findUserIdByIMId = (id , callback) => {
    //创建sql语句
    let sql = `select log_userId from imweb_login where log_returnId = '${id}'`;

    //查询数据库
    pool.query(sql,function(error , results){
        if(error) throw error;

        callback(results);
    });
}


//通过用户id 查找用户姓名
module.exports.findUsernameById = (id , callback) => {
    //创建sql语句
    let sql = `select join_username from imweb_join where join_onlyId = '${id}'`;

    //查询数据库
    pool.query(sql,function(error , results){
        if(error) throw error;

        callback(results);
    });
}

