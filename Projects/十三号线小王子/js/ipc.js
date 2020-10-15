(function (dependents) {
  var { Thirteen, Thirteen: { utils }, RongIMLib, RongRTC } = dependents;
  var startIM = (config, callbacks) => {
    var { appKey, token, chatroomId } = config;
    var im = RongIMLib.init({ appkey: appKey });
    im.watch({
      message: function (event) {
        var message = event.message;
        console.log('收到新消息:', message);
        callbacks.received(message);
      },
      status: function (event) {
        var { status } = event;
        console.log('连接状态码:', status);
      },
      chatroom: function (event) {
        var updatedEntries = event.updatedEntries;
        console.log('聊天室 KV 存储监听更新:', updatedEntries);
      }
    });
    im.connect({ token }).then(function (user) {
      console.log(user.id)
      callbacks.connected(im);
    });
  };
  var startRTC = (config, callbacks) => {
    var { user } = config;
    var rongRTC = new RongRTC({
      RongIMLib: RongIMLib
    });
    var { Room, Stream, StreamType } = rongRTC;

    var $room = new Room({
      id: 'line13',
      joined: function (user) {
      },
      left: function (user) {
      }
    });

    var $stream = new Stream({
      published: function (user) {
        $stream.subscribe(user).then((user) => {
          callbacks.subscribed(user)
        });
      }
    });

    $room.join(user).then(() => {
      $stream.get().then(function ({ mediaStream }) {
        var _user = {
          id: user.id,
          stream: {
            tag: 'LINE13',
            type: StreamType.AUDIO_AND_VIDEO,
            mediaStream: mediaStream
          }
        };
        callbacks.published(_user)
        $stream.publish(_user).then(() => {
          console.log('发布成功');
        }, error => {
          console.log(error);
        });
      }, error => {
        console.error(error);
      });
    }, error => {
      console.log(error);
    });
  };
  Thirteen.IPC = {
    startIM,
    startRTC
  };
})({
  Thirteen,
  RongIMLib,
  RongRTC
})