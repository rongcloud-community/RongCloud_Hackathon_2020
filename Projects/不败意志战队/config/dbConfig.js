//连接mysql

//引入mysql包
const mysql =require('mysql');

//配置数据库信息
const pool = mysql.createPool({
    //支持多条sql语句
    multipleStatements: true,
    //数据库连接池 有多少连接
    connecttionLimit : 20,
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'imweb'
});

//导出数据库
module.exports = pool;