var apikey = require('./key');
var RongSDK = require('rongcloud-sdk')(apikey);
var express = require('express');
var app = express();

app.get("/getappkey", (_, res) => {
    console.log("key");
    res.end(apikey.appkey);
});
app.get("/gettoken", (_, res) => {
    console.log("token");
    res.end("EWLDZ2YIlwdKGmOqybWfkQulLePhbGSlx4Ux2P5WdA4=@fy51.cn.rongnav.com;fy51.cn.rongcfg.com");
});
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
app.use(express.static("static"));
app.listen(8080, () => {
    console.log("listening 8080");
});

var Message = RongSDK.Message;
var Chatroom = Message.Chatroom;
// RongSDK.Chatroom.create({
//     id: 'chr001',
//     name: 'danmaku'
// });
var User = RongSDK.User;

// var user = {
// 	id: 'ujadk90ha',
// 	name: 'Maritn',
// 	portrait: 'http://7xogjk.com1.z0.glb.clouddn.com/IuDkFprSQ1493563384017406982'
// };
// User.register(user).then(result => {
// 	console.log(result);
// }, error => { 
// 	console.log(error);
// });

app.get("/test", () => {
    console.log("test");
    Chatroom.send({
        senderId: 'wfajawdo',
        targetId: 'danmaku',
        objectName: 'RC:TxtMsg',
        content: {
            content: 'aaaaaaaaaa'
        }
    }).then(result => {
        console.log(result);
    }, error => {
        console.log(error);
    });
});
