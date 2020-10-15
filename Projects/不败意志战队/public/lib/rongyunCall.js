// 融云call初始化
var config = {
  timeout: 20000,
  RongIMLib: RongIMLib,
  RongRTC: RongRTC,
};
rongCallLib = RongCallLib.init(config);

// 视频监听;
var videoWatcher = function (result) {
  var type = result.type;
  var boxEl = document.getElementById("box");
  if (type === "added") {
    // 添加音视频节点
    var video = result.data;
    boxEl.appendChild(video);
  } else if (type === "removed") {
    // 删除对应音视频节点
    var video = result.data;
    boxEl.removeChild(video);
  } else if (type == "leave") {
    // 音视频结束, 清空所有音视频 UI
  }
};
rongCallLib.videoWatch(videoWatcher);
//消息监听
var commandWatcher = function (message) {
  var messageType = message.messageType;
  // 根据消息类型做对应处理
};
rongCallLib.commandWatch(commandWatcher);