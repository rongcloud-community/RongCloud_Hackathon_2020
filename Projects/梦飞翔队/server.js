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
    res.end(getToken());
});
app.get("/exit", (req, res) => {
    console.log("exit", req.query.token);
    onExit(req.query.token);
    res.end();
});
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
app.use(express.static("static"));
app.listen(8080, () => {
    console.log("listening 8080");
});

var Message = RongSDK.Message;
var Chatroom = Message.Chatroom;
var User = RongSDK.User;

RongSDK.Chatroom.create({
    id: 'danmaku',
    name: 'danmaku'
});

var users = [];
for (var i = 0; i < 10; i++) {
    var id = 'user' + i;
    User.register({
        id: id,
        name: id,
        portrait: '.'
    }).then(result => {
        if (result.code == 200) {
            users.push(result);
        }
    }, error => {
        console.log(error);
    });
}

function getToken() {
    for (var i = 0; i < users.length; i++) {
        if (users[i].code > 0) {
            users[i].code = 0;
            return users[i].token;
        }
    }
}

function onExit(token) {
    var user = users.find(u => u.token == token);
    if (user) {
        console.log("exit", user.userId);
        user.code = 200;
    }
    var count = 0;
    users.forEach(u => u.code == 0 ? count++ : 0);
    console.log("在线用户", count);
}

app.get("/test", (_, res) => {
    res.end();
    console.log("test");
    Chatroom.send({
        senderId: 'admin',
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
