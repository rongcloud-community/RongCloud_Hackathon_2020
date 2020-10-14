(function (dependents) {
  var { Thirteen: { utils, Chess, settings, IPC } } = dependents;
  var el = utils.getDom('.thirteen-chessboard');
  var warnEl = utils.getDom('.thirteen-warning');
  var restartEl = utils.getDom('.thirteen-restart');
  var currentVideoEl = utils.getDom('#current-user');
  var remoteVideoEl = utils.getDom('#remote-user');

  var chess = new Chess({ el });
  var isGameover = false, $chatroom;

  var { appKey, users } = settings;

  var MESSAGE = {
    CHESS: 'TT:chess',
    RESTART: 'TT:restart'
  };

  var QueryString = utils.getQueryString();

  var getChatroomId = () => {
    return QueryString.roomid;
  }

  var checkGame = (isCurrent) => {
    var name = '对手';
    if (isCurrent) {
      name = '你';
    }
    if (isGameover) {
      warnEl.innerHTML = `${name}赢了~~~`;
      warnEl.style.display = 'block';
    }
  }

  var restart = () => {
    location.reload();
  };

  var setVideo = (node, user) => {
    node.srcObject = user.stream.mediaStream;
  };
  
  IPC.startIM({
    appKey, token: users[QueryString.id || 0]
  }, {
    connected: (im) => {
      var roomId = getChatroomId();
      $chatroom = im.ChatRoom.get({
        id: roomId
      });
      $chatroom.join({ count: -1 }).then(function () {
        console.log('已开局....');
      });

      IPC.startRTC({
        user: {
          id: im.getConnectionUserId()
        }
      }, {
        published: (user) => {
          setVideo(currentVideoEl, user);
        },
        subscribed: (user) => {
          setVideo(remoteVideoEl, user);
        }
      });
    },
    received: (message) => {
      var { messageType, content } = message;
      if (utils.isEqual(messageType, MESSAGE.CHESS)) {
        var { x, y } = content;
        isGameover = chess.play(x, y);
        checkGame()
      }
      if (utils.isEqual(messageType, MESSAGE.RESTART)) {
        restart();
      }
    }
  });

  el.onclick = function (event) {
    if (isGameover) {
      return;
    }
    var x = event.offsetX;
    var y = event.offsetY;
    isGameover = chess.play(x, y, true);
    $chatroom.send({
      messageType: MESSAGE.CHESS,
      content: {
        x, y
      }
    });
    var isCurrent = true;
    checkGame(isCurrent)
  };

  restartEl.onclick = function (event) {
    $chatroom.send({
      messageType: MESSAGE.RESTART,
      content: {}
    }).then(() => {
      restart();
    });
  }
  window.chess = chess;
})({
  Thirteen
})