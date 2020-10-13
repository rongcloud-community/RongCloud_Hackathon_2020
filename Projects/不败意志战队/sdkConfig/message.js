//替换成您自己的 Appkey
var appkey = "cpj2xarlchlzn";
// 替换成您自己的 Secret
var secret = "xRVdSzJcz7ss";

var RongSDK = require("rongcloud-sdk")({
  appkey: appkey,
  secret: secret,
});

let Message = RongSDK.Message;
let Chatroom = Message.Chatroom;
var message = {
  senderId: "ujadk90ha", //发送人 Id
  targetId: "ujadk10ha", //接收人 Id
  objectName: "RC:TxtMsg",
  content: {
    content: "你好，主播",
  },
};

Chatroom.send(message).then(
  (result) => {
    console.log(result);
  },
  (error) => {
    console.log(error);
  }
);
