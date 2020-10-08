var apikey = require("./key");
var RongCloudSDK = require("rongcloud-sdk")(apikey);
var express = require("express");
var app = express();

app.get("/getappkey", (_, res) => res.end(apikey.appkey));
app.use(express.static("static"));
app.listen(8080, () => {
    console.log("listening 8080");
});
