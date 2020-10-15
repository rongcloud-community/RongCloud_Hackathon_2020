// ignore: unused_import
import 'dart:math';
import 'package:fswitch/fswitch.dart';
import 'package:flutter/material.dart';
import 'package:rongcloud_im_plugin/rongcloud_im_plugin.dart';
import '../im/util/dialog_util.dart';
import 'dart:developer' as developer;
import 'package:shared_preferences/shared_preferences.dart';

class ChatDebugPage extends StatefulWidget {
  final Map arguments;

  ChatDebugPage({Key key, this.arguments}) : super(key: key);

  @override
  State<StatefulWidget> createState() =>
      _ChatDebugPageState(arguments: this.arguments);
}

class _ChatDebugPageState extends State<ChatDebugPage> {
  String pageName = "example.ChatDebugPage";
  Map arguments;
  // List titles;
  int conversationType;
  String targetId;

  //黑名单按钮状态
  bool flag;
  //免打扰按钮状态
  bool flags;

  _ChatDebugPageState({this.arguments});
  @override
  void initState() {
    super.initState();
    conversationType = arguments["coversationType"];
    targetId = arguments["targetId"];

    getBlacklist();
    getDisturb();
  }

  // ignore: unused_element
  //黑名单按键状态获取
  getBlacklist() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    //获取本地存储的flag如果没有赋值为false
    flag = prefs.getBool('BlacklistId$targetId') != null
        ? prefs.getBool('BlacklistId$targetId')
        : false;
    setState(() {});
  }

  //免打扰按键状态获取
  getDisturb() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    //获取本地存储的flag如果没有赋值为false
    flags = prefs.getBool('DisturbId$targetId') != null
        ? prefs.getBool('DisturbId$targetId')
        : false;
    setState(() {});
  }

  //黑名单按钮状态存储到本地
  // ignore: non_constant_identifier_names
  void _SaveBlacklist(String flagName, bool flag) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    //存数据到本地
    prefs.setBool(flagName, flag);
    //刷新
    setState(() {});
  }

  //免打扰按钮状态存储到本地
  // ignore: non_constant_identifier_names
  void _SaveDisturb(String flagName, bool flags) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    //存数据到本地
    prefs.setBool(flagName, flags);
    //刷新
    setState(() {});
  }

//加入黑名单
  void _addBlackList() {
    developer.log("_addBlackList", name: pageName);
    RongIMClient.addToBlackList(targetId, (int code) {
      String toast = code == 0 ? "加入黑名单成功" : "加入黑名单失败， $code";
      developer.log(toast, name: pageName);
      DialogUtil.showAlertDiaLog(context, toast);
    });
  }

//取消黑名单
  void _removeBalckList() {
    developer.log("_removeBalckList", name: pageName);
    RongIMClient.removeFromBlackList(targetId, (int code) {
      String toast = code == 0 ? "取消黑名单成功" : "取消黑名单失败，错误码: $code";
      developer.log(toast, name: pageName);
      DialogUtil.showAlertDiaLog(context, toast);
    });
  }

//设置免打扰
  void _setConStatusEnable() {
    RongIMClient.setConversationNotificationStatus(
        conversationType, targetId, true, (int status, int code) {
      developer.log(
          "setConversationNotificationStatus1 status " + status.toString(),
          name: pageName);
      String toast = code == 0 ? "设置免打扰成功" : "设置免打扰失败，错误码: $code";
      DialogUtil.showAlertDiaLog(context, toast);
    });
  }

//取消免打扰
  void _setConStatusDisanable() {
    RongIMClient.setConversationNotificationStatus(
        conversationType, targetId, false, (int status, int code) {
      developer.log(
          "setConversationNotificationStatus2 status " + status.toString(),
          name: pageName);
      String toast = code == 0 ? "取消免打扰成功" : "取消免打扰失败，错误码: $code";
      DialogUtil.showAlertDiaLog(context, toast);
    });
  }

//搜索会话消息记录
  void _goToSearchMessagePage() {
    Map arg = {"coversationType": conversationType, "targetId": targetId};
    Navigator.pushNamed(context, "/search_message", arguments: arg);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("聊天设置"),
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
        body: ListView(
          children: <Widget>[
            //免打扰
            ListTile(
              title: Text('消息免打扰'),
              //右侧按钮
              //此处要引用FSwitch插件
              trailing: FSwitch(
                openColor: Colors.green,
                open: this.flags,
                width: 46,
                height: 24,
                onChanged: (v) {
                  // print('-----$');
                  flags = v;
                  //调用本地存储存免打扰按钮状态
                  _SaveDisturb('DisturbId$targetId', flags);
                  //判断按钮状态
                  if (v) {
                    //免打扰
                    _setConStatusEnable();
                  } else {
                    //取消免打扰
                    _setConStatusDisanable();
                  }
                },
                //点击关显示的文字
                closeChild: Text(
                  "Off",
                  style: TextStyle(color: Colors.white, fontSize: 11),
                ),
                //点击开显示的文字
                openChild: Text(
                  "On",
                  style: TextStyle(color: Colors.white, fontSize: 11),
                ),
              ),
            ),
            //分割线
            Divider(
              height: 0.0,
              // 前面缩进距离
              indent: 18,
              //后面缩进距离
              endIndent: 18,
              color: Colors.grey,
            ),

            //加入黑名单
            ListTile(
              title: Text('加入黑名单'),
              //右侧按钮
              //此处要引用FSwitch插件
              trailing: FSwitch(
                openColor: Colors.green,
                open: this.flag,
                width: 46,
                height: 24,
                onChanged: (v) {
                  //根据按钮状态给flag赋值
                  flag = v;
                  //调用方法存到本地
                  _SaveBlacklist('BlacklistId$targetId', v);
                  // 判断按钮状态是否加入黑名单
                  if (flag) {
                    //加入黑名单
                    _addBlackList();
                  } else {
                    //取消黑名单
                    _removeBalckList();
                  }
                },
                //点击关显示的文字
                closeChild: Text(
                  "Off",
                  style: TextStyle(color: Colors.white, fontSize: 11),
                ),
                //点击开显示的文字
                openChild: Text(
                  "On",
                  style: TextStyle(color: Colors.white, fontSize: 11),
                ),
              ),
            ),
            //分割线
            Divider(
              height: 0.0,
              // 前面缩进距离
              indent: 18,
              //后面缩进距离
              endIndent: 18,
              color: Colors.grey,
            ),
            //搜索会话消息记录
            ListTile(
              title: Text('搜索消息历史记录'),
              trailing: Icon(Icons.keyboard_arrow_right),
              onTap: () {
                _goToSearchMessagePage();
              },
            ),
            //分割线
            Divider(
              height: 0.0,
              // 前面缩进距离
              indent: 18,
              //后面缩进距离
              endIndent: 18,
              color: Colors.grey,
            ),
          ],
        ));
  }
}
