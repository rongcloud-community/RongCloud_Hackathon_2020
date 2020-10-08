var apikey = require("./key");
var RongCloudSDK = require("rongcloud-sdk")(apikey);
var express = require("express");
var app = express();
var RongMessage = RongCloudSDK.Message;
var RongChatroom = RongMessage.Chatroom;
var RongUser = RongCloudSDK.User;

app.get("/getappkey", (_, res) => res.end(apikey.appkey));
app.get("/gettoken", (_, res) => res.end(getToken()));
app.use(express.static("static"));
app.listen(8080, () => {
    console.log("listening 8080");
});

var queue = [];
var match = [];

var users = [];
for (var i = 0; i < 10; i++) {
    var id = "ttt" + i;
    RongUser.register({
        id: id,
        name: id,
        portrait: "."
    }).then(result => {
        console.log(result);
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
