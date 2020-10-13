//替换成您自己的 Appkey
var appkey = "cpj2xarlchlzn";
// 替换成您自己的 Secret
var secret = "xRVdSzJcz7ss";

var RongSDK = require("rongcloud-sdk")({
  appkey: appkey,
  secret: secret,
});

var Conversation = RongSDK.Conversation;

/*
API 文档: http://www.rongcloud.cn/docs/server_sdk_api/conversation/conversation.html#mute
*/
var conversation = {
  type: "PRIVATE",
  userId: "mka091amn",
  targetId: "adm1klnm",
};
Conversation.mute(conversation).then(
  (result) => {
    console.log(result);
  },
  (error) => {
    console.log(error);
  }
);

/*
API 文档: http://www.rongcloud.cn/docs/server_sdk_api/conversation/conversation.html#unmute
*/
var conversation = {
  type: "PRIVATE",
  userId: "mka091amn",
  targetId: "adm1klnm",
};
Conversation.unmute(conversation).then(
  (result) => {
    console.log(result);
  },
  (error) => {
    console.log(error);
  }
);
