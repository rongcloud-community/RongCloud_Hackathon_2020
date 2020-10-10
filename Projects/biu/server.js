var apikey = require("./key");
var RongCloudSDK = require("rongcloud-sdk")(apikey);
var RongUser = RongCloudSDK.User;
var express = require("express");
var app = express();

app.get("/getappkey", (_, res) => res.end(apikey.appkey));
app.get("/gettoken", (_, res) => res.end(getToken()));
app.get("/exit", (req, res) => res.end(onExit(decodeURIComponent(req.query.token))));
app.use(express.static("static"));
app.listen(8080, () => {
    console.log("listening 8080");
});

var users = [];
var queue = [];
var match = [];
for (var i = 0; i < 10; i++) {
    var id = "rong" + i;
    RongUser.register({
        id: id,
        name: id,
        portrait: "."
    }).then(result => {
        users.push(result);
    }, error => {
        console.log(error);
    });
}

function getToken() {
    for (var i = 0; i < users.length; i++) {
        if (users[i].code > 0) {
            users[i].code = 0;
            queue.push(users[i]);
            console.log(users[i].userId, "enter");
            if (queue.length > 1) {
                var user1 = queue.shift();
                var user2 = queue.shift();
                match.push([user1, user2]);
                console.log(user1.userId, "<>", user2.userId);
            }
            return JSON.stringify(users[i]);
        }
    }
    return JSON.stringify({
        code: 404,
        userId: "",
        token: ""
    });
}

function onExit(token) {
    var index = queue.findIndex(u => u.token == token);
    if (index > -1) {
        console.log("exit", queue[index].userId);
        queue[index].code = 200;
        queue.splice(index, 1);
    } else {
        exitMatch(token);
    }
}

function exitMatch(token) {
    for (var i = 0; i < match.length; i++) {
        if (match[i][0].token == token) {
            match[i][0].code = 200;
            match.splice(i, 1);
        } else if (match[i][1].token == token) {
            match[i][1].code = 200;
            match.splice(i, 1);
        }
    }
}
