var apikey = require("./key");
var RongCloudSDK = require("rongcloud-sdk")(apikey);
var RongUser = RongCloudSDK.User;
var express = require("express");
var app = express();

app.get("/getappkey", (_, res) => res.end(apikey.appkey));
app.get("/gettoken", (_, res) => res.end(getToken()));
app.use(express.static("static"));
app.listen(8080, () => {
    console.log("listening 8080");
});

var users = [];
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
            console.log(users[i].userId, "enter");
            return JSON.stringify(users[i]);
        }
    }
    return JSON.stringify({
        code: 404,
        userId: "",
        token: ""
    });
}
