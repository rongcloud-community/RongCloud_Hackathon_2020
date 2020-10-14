import 'dart:async';
import 'dart:core';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:rongcloud_im_plugin/rongcloud_im_plugin.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'item/widget_util.dart';
import 'item/conversation_list_item.dart';

import '../util/http_util.dart';
import '../util/style.dart';
import '../util/event_bus.dart';
import '../util/dialog_util.dart';
import '../../other/login_page.dart';
import 'dart:developer' as developer;
import 'package:fluttertoast/fluttertoast.dart';

class ConversationListPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return new _ConversationListPageState();
  }
}

class _ConversationListPageState extends State<ConversationListPage>
    implements ConversationListItemDelegate {
  String pageName = "example.ConversationListPage";
  List conList = new List();
  List<int> displayConversationType = [
    RCConversationType.Private,
    RCConversationType.Group
  ];
  ScrollController _scrollController;
  double mPosition = 0;

  @override
  void initState() {
    super.initState();
    addIMhandler();
    updateConversationList();

    EventBus.instance.addListener(EventKeys.ConversationPageDispose, (arg) {
      Timer(Duration(milliseconds: 10), () {
        addIMhandler();
        updateConversationList();
        _renfreshUI();
      });
    });
  }

  @override
  void dispose() {
    super.dispose();
    EventBus.instance.removeListener(EventKeys.ConversationPageDispose);
  }

  updateConversationList() async {
    List list = await RongIMClient.getConversationList(displayConversationType);
    if (list != null) {
      // list.sort((a,b) => b.sentTime.compareTo(a.sentTime));
      conList = list;
    }
    _renfreshUI();
  }

  void _renfreshUI() {
    setState(() {});
  }

  addIMhandler() {
    EventBus.instance.addListener(EventKeys.ReceiveMessage, (map) {
      var msg = map["message"];
      int left = map["left"];
      bool hasPackage = map["hasPackage"];
      bool isDisplayConversation = msg.conversationType != null &&
          displayConversationType.contains(msg.conversationType);
      //如果离线消息过多，那么可以等到 hasPackage 为 false 并且 left == 0 时更新会话列表
      if (!hasPackage && left == 0 && isDisplayConversation) {
        updateConversationList();
      }
    });

    RongIMClient.onConnectionStatusChange = (int connectionStatus) {
      if (RCConnectionStatus.KickedByOtherClient == connectionStatus ||
          RCConnectionStatus.TokenIncorrect == connectionStatus ||
          RCConnectionStatus.UserBlocked == connectionStatus) {
        // String toast = "连接状态变化 $connectionStatus, 请退出后重新登录";
        String toast = "";
        if (connectionStatus == 2) {
          toast = "您的账号已在其他设备上登录";
        } else {
          toast = "连接状态变化 $connectionStatus, 请退出后重新登录";
        }
        DialogUtil.showAlertDiaLog(context, toast,
            confirmButton: FlatButton(
                onPressed: () async {
                  SharedPreferences prefs =
                      await SharedPreferences.getInstance();
                  prefs.remove("token");
                  Navigator.of(context).pushAndRemoveUntil(
                      new MaterialPageRoute(
                          builder: (context) => new LoginPage()),
                      (route) => route == null);
                },
                child: Text("重新登录")));
      } else if (RCConnectionStatus.Connected == connectionStatus) {
        updateConversationList();
      }
    };

    RongIMClient.onRecallMessageReceived = (var message) {
      updateConversationList();
    };
  }

  void _deleteConversation(Conversation conversation) {
    //删除会话需要刷新会话列表数据
    RongIMClient.removeConversation(
        conversation.conversationType, conversation.targetId, (bool success) {
      if (success) {
        updateConversationList();
        // // 如果需要删除会话中的消息调用下面的接口
        // RongIMClient.deleteMessages(
        //     conversation.conversationType, conversation.targetId, (int code) {
        //   updateConversationList();
        // });
      }
    });
  }

  void _clearConversationUnread(Conversation conversation) async {
    //清空未读需要刷新会话列表数据
    bool success = await RongIMClient.clearMessagesUnreadStatus(
        conversation.conversationType, conversation.targetId);
    if (success) {
      updateConversationList();
    }
  }

  void _setConversationToTop(Conversation conversation, bool isTop) {
    RongIMClient.setConversationToTop(
        conversation.conversationType, conversation.targetId, isTop,
        (bool status, int code) {
      if (code == 0) {
        updateConversationList();
      }
    });
  }

  void _addScroolListener() {
    _scrollController.addListener(() {
      mPosition = _scrollController.position.pixels;
    });
  }

  void _onTapUser(BuildContext context, String userid, String uname) {
    Map arg = {
      "coversationType": RCConversationType.Private,
      "targetId": userid,
      "targetName": uname,
    };
    Navigator.pushNamed(context, "/conversation", arguments: arg);
  }

  Widget _buildConversationListView() {
    return new ListView.builder(
      scrollDirection: Axis.vertical,
      itemCount: conList.length,
      controller: _scrollController,
      itemBuilder: (BuildContext context, int index) {
        if (conList.length <= 0) {
          return WidgetUtil.buildEmptyWidget();
        }
        return ConversationListItem(
            delegate: this, conversation: conList[index]);
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    this._scrollController = ScrollController(initialScrollOffset: mPosition);
    TextEditingController _userAccount = TextEditingController();
    _addScroolListener();
    return new Scaffold(
      appBar: AppBar(
        title: Text("消息"),
        flexibleSpace: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(colors: [
              Color(0xFFEAD6EE),
              Color(0xFFA0F1EA),
            ], begin: Alignment.topRight, end: Alignment.bottomLeft),
          ),
        ),
        actions: [
          IconButton(
            padding: EdgeInsets.only(right: 15.0),
            icon: Icon(ThirdPartyIcons.CreateAChat),
            onPressed: () {
              showDialog(
                context: context,
                barrierDismissible: true, //点击遮罩不关闭对话框
                builder: (context) {
                  return AlertDialog(
                    content: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: <Widget>[
                        TextField(
                          controller: _userAccount,
                          decoration: InputDecoration(
                            labelText: "创建聊天",
                            hintText: "请输入对方的账号",
                            prefixIcon: Icon(ThirdPartyIcons.OtherAccount),
                            prefixIconConstraints: BoxConstraints(
                              minWidth: 50,
                              minHeight: 20,
                            ),
                          ),
                        ),
                        Container(
                          margin: EdgeInsets.only(top: 20),
                          width: 80,
                          height: 34,
                          decoration: BoxDecoration(
                              gradient: const LinearGradient(colors: [
                                Color(0xff5eb680),
                                Color(0xff00acb6),
                                Color(0xff00acb6),
                              ]),
                              borderRadius: BorderRadius.circular(10)),
                          child: FlatButton(
                            // color: Colors.blue,
                            highlightColor: Colors.blue[700],
                            colorBrightness: Brightness.dark,
                            splashColor: Colors.grey,
                            padding: EdgeInsets.symmetric(horizontal: 4),
                            child: Text("发起聊天"),
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(20.0)),
                            onPressed: () {
                              if (_userAccount.text.trim().length == 0) {
                                Fluttertoast.showToast(msg: "账号不能为空");
                              } else if (_userAccount.text.trim().length != 0) {
                                print('-------创建聊天----');
                                print(_userAccount.text);
                                HttpUtil.get(
                                    "http://api.mashiro.online/center/getUserInfo",
                                    (data) {
                                  print(data);
                                  if (data != null) {
                                    Map body = data;
                                    int errorCode = body["code"];
                                    if (errorCode == 200) {
                                      Navigator.of(context).pop(true); //去框
                                      _onTapUser(context, _userAccount.text,
                                          body["data"]["name"]);
                                    } else if (errorCode == 400) {
                                      Fluttertoast.showToast(msg: "用户不存在");
                                    } else if (errorCode == -1) {
                                      Fluttertoast.showToast(
                                          msg: "网络未连接，请连接网络重试");
                                    } else {
                                      Fluttertoast.showToast(
                                          msg: "信息获取有误，请尝试重新获取");
                                    }
                                  }
                                }, params: {"uid": _userAccount.text});
                              } else {
                                Navigator.of(context).pop(true);
                              }
                            },
                          ),
                        ),

                        // CircularProgressIndicator(),
                        // Padding(
                        //     padding: const EdgeInsets.only(
                        //         top: 26.0),
                        //     child: TextField())
                      ],
                    ),
                  );
                },
              );
            },
          ),
        ],
      ),
      key: UniqueKey(),
      body: _buildConversationListView(),
    );
  }

  @override
  void didLongPressConversation(Conversation conversation, Offset tapPos) {
    Map<String, String> actionMap = {
      RCLongPressAction.DeleteConversationKey:
          RCLongPressAction.DeleteConversationValue,
      RCLongPressAction.ClearUnreadKey: RCLongPressAction.ClearUnreadValue,
      RCLongPressAction.SetConversationToTopKey: conversation.isTop
          ? RCLongPressAction.CancelConversationToTopValue
          : RCLongPressAction.SetConversationToTopValue
    };
    WidgetUtil.showLongPressMenu(context, tapPos, actionMap, (String key) {
      developer.log("当前选中的是 " + key, name: pageName);
      if (key == RCLongPressAction.DeleteConversationKey) {
        _deleteConversation(conversation);
      } else if (key == RCLongPressAction.ClearUnreadKey) {
        _clearConversationUnread(conversation);
      } else if (key == RCLongPressAction.SetConversationToTopKey) {
        bool isTop = true;
        if (conversation.isTop) {
          isTop = false;
        }
        _setConversationToTop(conversation, isTop);
      } else {
        developer.log("未实现操作 " + key, name: pageName);
      }
    });
  }

  @override
  void didTapConversation(Conversation conversation) {
    Map arg = {
      "coversationType": conversation.conversationType,
      "targetId": conversation.targetId,
    };
    Navigator.pushNamed(context, "/conversation", arguments: arg);
  }
}
