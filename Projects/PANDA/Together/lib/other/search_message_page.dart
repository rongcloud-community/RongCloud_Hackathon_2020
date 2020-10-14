import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import '../im/pages/item/widget_util.dart';
import 'package:rongcloud_im_plugin/rongcloud_im_plugin.dart';
import 'package:shared_preferences/shared_preferences.dart';

// ignore: must_be_immutable
class SearchMessagePage extends StatefulWidget {
  Map arguments;
  SearchMessagePage({Key key, this.arguments}) : super(key: key);
  @override
  State<StatefulWidget> createState() {
    return _SearchMessagePageState(arguments: arguments);
  }
}

class _SearchMessagePageState extends State<SearchMessagePage> {
  Map arguments;
  int conversationType;
  String targetId;
  List messageList;
  // 定义存放时间变量
  var releaseTime;
  String releaseTimes;
  //存放消息变量
  var conter;
  //存放发消息者（本人,好友）
  var conterName;
  var uId;
  _SearchMessagePageState({this.arguments});

  @override
  void initState() {
    super.initState();
    conversationType = arguments["coversationType"];
    targetId = arguments["targetId"];
    messageList = List();
    getBlacklist();
  }

  getBlacklist() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    uId = prefs.get('uid');
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("搜索消息历史记录"),
        titleSpacing: 0.0,
        flexibleSpace: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(colors: [
              Color(0xFFEAD6EE),
              Color(0xFFA0F1EA),
            ], begin: Alignment.topRight, end: Alignment.bottomLeft),
          ),
        ),
      ),
      body: Container(
        child: Column(
          mainAxisSize: MainAxisSize.max,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            Container(
              margin: EdgeInsets.only(left: 12, right: 12, top: 20),
              height: 45,
              decoration: BoxDecoration(
                  border: new Border.all(color: Colors.black54, width: 0.5),
                  borderRadius: BorderRadius.circular(8)),
              child: TextField(
                  textAlign: TextAlign.center,
                  onSubmitted: _searchMessage,
                  decoration: InputDecoration(
                      border: InputBorder.none, hintText: '请输入关键词'),
                  autofocus: true),
            ),
            messageList.length > 0
                ? Expanded(
                    flex: 1,
                    child: Container(
                        margin: EdgeInsets.only(top: 14),
                        child: ListView.separated(
                            controller: ScrollController(),
                            itemCount: messageList.length,
                            itemBuilder: (BuildContext context, int index) {
                              if (messageList.length != null &&
                                  messageList.length > 0) {
                                Message message = messageList[index];

                                //获取时间转化为正常格式
                                releaseTime =
                                    DateTime.fromMillisecondsSinceEpoch(
                                        message.sentTime);

                                releaseTimes = releaseTime.toString();
                                //去掉时间的毫秒数
                                releaseTimes = releaseTimes.substring(0, 19);
                                //获取消息
                                conter = message.content.conversationDigest();
                                // targetId   senderUserId
                                conterName = message.senderUserId;
                                //判断是不是本人
                                if (message.senderUserId == uId) {
                                  conterName = '本人';
                                } else {
                                  conterName = '对方';
                                }
                                return GestureDetector(
                                    child: Container(
                                  alignment: Alignment.center,
                                  child: Container(
                                      padding: EdgeInsets.all(6),
                                      child: Container(
                                          //搜索后出现的内容
                                          child: ListTile(
                                        title: Text(conter),
                                        subtitle: Text(
                                            '$conterName 在 $releaseTimes 发送'),
                                      ))),
                                ));
                              } else {
                                return WidgetUtil.buildEmptyWidget();
                              }
                            },
                            separatorBuilder:
                                (BuildContext context, int index) {
                              return Container(
                                color: Color(0xffC8C8C8),
                                height: 0.5,
                              );
                            })))
                : Text(
                    "无记录",
                    style: new TextStyle(
                        // fontSize: 14, color: const Color(0xfff00000)),
                        fontSize: 14,
                        color: Colors.grey),
                    textAlign: TextAlign.center,
                  )
          ],
        ),
      ),
    );
  }

  void _searchMessage(String keyWord) {
    if (keyWord == null || keyWord.isEmpty) {
      messageList.clear();
      _refreshUI();
    }
    RongIMClient.searchMessages(conversationType, targetId, keyWord, 50, 0,
        (List/*<Message>*/ msgList, int code) {
      if (code == 0 && msgList != null) {
        messageList = msgList;
        _refreshUI();
      }
    });
  }

  void _refreshUI() {
    setState(() {});
  }

  parse(int sentTime) {}
}
