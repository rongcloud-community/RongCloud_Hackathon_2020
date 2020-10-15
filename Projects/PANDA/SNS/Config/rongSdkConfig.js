/**
融云sdk配置项
*/

// appkey
const appkey = "";
// 密钥
const secret = "";

// 引入融云sdk
const RongSDK = require("rongcloud-sdk")({
    appkey: appkey,
    secret: secret
});

// 导出方法
module.exports = RongSDK;