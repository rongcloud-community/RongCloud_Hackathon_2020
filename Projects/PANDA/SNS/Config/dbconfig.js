// 引入mysql模块
const mysql = require("mysql");

// 创建连接池
const pool = mysql.createPool({
	// 数据库地址
    host: "",
	// 数据库端口
	port: ''
	// 数据库用户名
    user: "",
	// 数据库密码
    password: "",
	// 你的数据库名
    database: "",
    // 设置联接编码
    charset: 'UTF8MB4_GENERAL_CI'
})

// 导出数据库方法
module.exports = pool;