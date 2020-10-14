import 'dart:io';
import 'package:flutter/foundation.dart';

import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:rongcloud_im_plugin/rongcloud_im_plugin.dart';
import '../im/util/combine_message_util.dart';
import '../im/util/dialog_util.dart';
import '../im/util/style.dart';
import '../im/util/event_bus.dart';
import 'dart:developer' as developer;

class SelectConversationPage extends StatefulWidget {
  // final List selectMessages;
  final Map arguments;
  const SelectConversationPage({Key key, this.arguments}) : super(key: key);

  @override
  State<StatefulWidget> createState() =>
      _SelectConversationPageState(this.arguments);
}

class _SelectConversationPageState extends State<SelectConversationPage> {
  final Map arguments;
  _SelectConversationPageState(this.arguments);

  String pageName = "example.SelectConversationPage";
  List<Message> selectMessages;
  int forwardType; // 0:逐条转发，1:合并转发
  List conList = new List();
  List listName = new List(); //昵称
  List<int> displayConversationType = [
    RCConversationType.Private,
    RCConversationType.Group
  ];
  ScrollController _scrollController;
  List selectConList = new List();

  @override
  void initState() {
    super.initState();
    selectMessages = List<Message>.from(arguments["selectMessages"]);
    forwardType = arguments["forwardType"];
    updateConversationList();
  }

  updateConversationList() async {
    List list = await RongIMClient.getConversationList(displayConversationType);
    if (list != null) {
      conList = list;

      for (var i = 0; i < conList.length; i++) {
        try {
          Response response = await Dio().get(
              "http://api.mashiro.online/center/getUserInfo?uid=${conList[i].targetId}");
          print(response.data);
          if (response.data["code"] == 200) {
            listName.add(response.data["data"]["name"]);
          }
        } catch (e) {
          print(e);
        }
      }
      print(listName);
    }

    _renfreshUI();
  }

  void _renfreshUI() {
    setState(() {});
  }

  Widget _buildConversationListView() {
    return new ListView.separated(
        scrollDirection: Axis.vertical,
        itemCount: conList.length,
        controller: _scrollController,
        itemBuilder: (BuildContext context, int index) {
          if (conList.length <= 0) {
            // return WidgetUtil.buildEmptyWidget();
          }
          return getWidget(conList[index], listName[index]);
        },
        separatorBuilder: (BuildContext context, int index) {
          return Container(
            height: 10,
            width: 1,
          );
        });
  }

  getWidget(Conversation con, String targetName) {
    return GestureDetector(
      onTap: () {
        didTapItem(con);
      },
      child: Container(
        height: 50.0,
        color: Colors.white,
        child: InkWell(
          child: new ListTile(
            title: new Text((con.conversationType == RCConversationType.Private
                    ? ""
                    : "群聊：") +
                targetName),
          ),
        ),
      ),
    );
  }

  void didTapItem(Conversation con) {
    selectConList.add(con);

    if (forwardType == 0) {
      sendMessageOneByOne();
    } else {
      // 合并转发
      sendMessageByCombine();
    }
    // RongIMClient.clearMessages(con.conversationType, con.targetId, (code) {
    //   developer.log("result:$code", name: pageName);
    // });
  }

  void sendMessageByCombine() async {
    CombineMessage combineMessage =
        await CombineMessageUtils().combineMessage(selectMessages);
    List<Message> messageList = List<Message>();
    Message message = Message();
    message.content = combineMessage;
    messageList.add(message);
    // 这里不使用 loading，因为发消息时 sleep 会卡住动画
    DialogUtil.showAlertDiaLog(context, "消息转发中，请稍后...",
        confirmButton: FlatButton(onPressed: () {}, child: Text("")));
    sendMessage(messageList, isCombineMsg: true);
  }

  void sendMessageOneByOne() {
    developer.log(
        "sendMessageOneByOne" +
            selectMessages.toString() +
            "转发的会话个数：" +
            selectConList.length.toString(),
        name: pageName);
    // 这里不使用 loading，因为发消息时 sleep 会卡住动画
    DialogUtil.showAlertDiaLog(context, "消息转发中，请稍后...",
        confirmButton: FlatButton(onPressed: () {}, child: Text("")));
    sendMessage(selectMessages);
  }

  void sendMessage(List<Message> selectMessages,
      {bool isCombineMsg = false}) async {
    Future.delayed(Duration(milliseconds: 400), () {
      for (Message msg in selectMessages) {
        for (Conversation con in selectConList) {
          // 转发时去掉消息原先携带的 sendUserInfo 和 mentionedInfo
          msg.content.sendUserInfo = null;
          msg.content.mentionedInfo = null;
          if (TargetPlatform.android == defaultTargetPlatform &&
              !isCombineMsg) {
            RongIMClient.forwardMessageByStep(
                con.conversationType, con.targetId, msg);
          } else {
            RongIMClient.sendMessage(
                con.conversationType, con.targetId, msg.content);
          }

          // 延迟400毫秒，防止过渡频繁的发送消息导致发送失败的问题
          sleep(Duration(milliseconds: 400));
        }
      }
      selectConList.clear();
      Navigator.pop(context);
      Navigator.pop(context);
      EventBus.instance.commit(EventKeys.ForwardMessageEnd, null);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(RCString.SelectConTitle),
        titleSpacing: 0.0,
        flexibleSpace: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(colors: [
              Color(0xFFEAD6EE),
              Color(0xFFA0F1EA),
            ], begin: Alignment.topRight, end: Alignment.bottomLeft),
          ),
        ),
        actions: <Widget>[
          // IconButton(
          //   icon: Icon(Icons.done),
          //   onPressed: () {
          //     // _pushToDebug();
          //   },
          // ),
        ],
      ),
      body: _buildConversationListView(),
    );
  }
}
