import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:fswitch/fswitch.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../im/util/http_util.dart';
import '../im/util/dialog_util.dart';
import '../im/util/event_bus.dart';
import 'dart:developer' as developer;
import 'login_page.dart';
import 'package:rongcloud_im_plugin/rongcloud_im_plugin.dart' as prefix;

class SettingPages extends StatefulWidget {
  @override
  _SettingPageState createState() => _SettingPageState();
}

class _SettingPageState extends State<SettingPages> {
  String pageName = "example.SwitchPage";
  bool msgNoticeFlag;
  String userId;
  //定义存储新密码的容器
  TextEditingController miController = new TextEditingController();
  //第一存储确认新密码的容器
  TextEditingController twoMiController = new TextEditingController();

  @override
  void initState() {
    super.initState();
    getSwitchBtn();
  }

  getSwitchBtn() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    userId = prefs.get("uid"); //uid
    print(userId);
    msgNoticeFlag = prefs.getBool("msgNoticeFlagId$userId") != null
        ? prefs.getBool("msgNoticeFlagId$userId")
        : false;
    print('-get $msgNoticeFlag-');
    setState(() {});
  }

  void setSwitchBtn(String switchName, bool switchFlag) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    print(switchName);
    prefs.setBool(switchName, switchFlag);
    print('-set $switchFlag-');
    setState(() {});
  }

  // 开启消息通知
  void _openMessageNotification() {
    developer.log("_openMessageNotification", name: pageName);
    prefix.RongIMClient.removeNotificationQuietHours((int code) {
      EventBus.instance.commit(EventKeys.UpdateNotificationQuietStatus, {});
      String toast =
          "消息通知：" + (code == 0 ? "已开启" : "开启失败, code:" + code.toString());
      developer.log(toast, name: pageName);
      DialogUtil.showAlertDiaLog(context, toast);
    });
  }

  // 关闭消息通知
  void _closeMessageNotification() {
    developer.log("_closeMessageNotification", name: pageName);
    prefix.RongIMClient.setNotificationQuietHours("06:00:00", 1439, (int code) {
      EventBus.instance.commit(EventKeys.UpdateNotificationQuietStatus, {});
      String toast =
          "消息通知：" + (code == 0 ? "已关闭" : "关闭失败, code:" + code.toString());
      developer.log(toast, name: pageName);
      DialogUtil.showAlertDiaLog(context, toast);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('设置'),
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
            //修改密码
            ListTile(
              title: Text('修改密码'),
              //右侧箭头
              trailing: Icon(Icons.keyboard_arrow_right),
              //点击修改密码弹出修改密码弹出框
              onTap: () {
                // getImage();
                showDialog(
                  context: context,
                  barrierDismissible: true, //点击遮罩不关闭对话框
                  builder: (context) {
                    return AlertDialog(
                      // 背景颜色
                      backgroundColor: Colors.white,
                      content: Column(
                        // Row在主轴(水平)方向尽可能占最少的空间
                        mainAxisSize: MainAxisSize.min,
                        children: <Widget>[
                          //输入密码文本框
                          TextField(
                              controller: miController,
                              decoration: InputDecoration(
                                labelText: "新密码",
                                hintText: "请输入新的密码",
                              )),
                          //确认密码文本框
                          TextField(
                              controller: twoMiController,
                              decoration: InputDecoration(
                                labelText: "确认密码",
                                hintText: "请输入确认密码",
                              )),
                          // 修饰按钮的容器
                          Container(
                            margin: EdgeInsets.only(top: 20),
                            width: 100,
                            height: 40,
                            //渐变色
                            decoration: BoxDecoration(
                                gradient: const LinearGradient(colors: [
                                  Color(0xff5eb680),
                                  Color(0xff00acb6),
                                  Color(0xff00acb6),
                                ]),
                                borderRadius: BorderRadius.circular(10)),
                            //点击修改密码的按钮
                            child: FlatButton(
                              // color: Colors.blue,
                              highlightColor: Colors.blue[700],
                              colorBrightness: Brightness.dark,
                              splashColor: Colors.grey,
                              child: Text("修改"),
                              //圆角
                              shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(20.0)),
                              onPressed: () async {
                                //点击修改密码厚进行校验，判断是否为空，两次密码是否一致
                                if (miController.text.trim() == '') {
                                  Fluttertoast.showToast(msg: '请输入新密码');
                                } else if (miController.text.trim().length <
                                        6 ||
                                    miController.text.trim().length > 18) {
                                  Fluttertoast.showToast(msg: '密码应该在6-18位');
                                } else if (miController.text !=
                                    this.twoMiController.text) {
                                  Fluttertoast.showToast(msg: '确认密码与新密码不一致');
                                } else {
                                  Map map = new Map();
                                  map["uid"] = userId;
                                  map["password"] = twoMiController.text;
                                  HttpUtil.post(
                                      'http://api.mashiro.online/update/updatePasswd',
                                      (data) async {
                                    if (data != null) {
                                      Map body = data;
                                      int errorCode = body["code"];
                                      if (errorCode == 200) {
                                        SharedPreferences prefs =
                                            await SharedPreferences
                                                .getInstance();
                                        prefs.setString(
                                            "password", twoMiController.text);
                                        miController.clear();
                                        twoMiController.clear();
                                        Fluttertoast.showToast(msg: '密码修改成功');
                                        Navigator.of(context).pop(true);
                                      } else if (errorCode == 400) {
                                        Fluttertoast.showToast(
                                            msg: '修改错误，请尝试重新修改');
                                      } else if (errorCode == -1) {
                                        Fluttertoast.showToast(
                                            msg: "网络未连接，请连接网络重试");
                                      } else {
                                        Fluttertoast.showToast(msg: '未知错误');
                                      }
                                    }
                                  }, params: map);
                                }
                              },
                            ),
                          )
                        ],
                      ),
                    );
                  },
                );
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
            //消息通知
            ListTile(
              title: Text('消息通知'),
              //右侧按钮
              //此处要引用FSwitch插件
              trailing: FSwitch(
                open: this.msgNoticeFlag,
                width: 46,
                height: 24,
                openColor: Colors.green,
                onChanged: (v) {
                  msgNoticeFlag = v;
                  setSwitchBtn('msgNoticeFlagId$userId', msgNoticeFlag);
                  if (v) {
                    _openMessageNotification();
                  } else {
                    _closeMessageNotification();
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
              indent: 18,
              endIndent: 18,
              color: Colors.grey,
            ),
            //关于
            ListTile(
              title: Text('关于'),
              trailing: Icon(Icons.keyboard_arrow_right),
              onTap: () {
                showDialog(
                  context: context,
                  barrierDismissible: true, //点击遮罩不关闭对话框

                  builder: (context) {
                    return AlertDialog(
                      backgroundColor: Colors.white,
                      content: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: <Widget>[
                          Container(
                            // color: Colors.black,
                            // color: Colors.black,
                            height: 30,
                          ),
                          Row(
                            children: <Widget>[
                              Text(
                                '制作团队',
                                textAlign: TextAlign.left,
                              ),
                              Expanded(
                                child: Text(''), // 中间用Expanded控件
                              ),
                              Text(
                                'PANDA',
                                textAlign: TextAlign.right,
                              )
                            ],
                          ),
                          Divider(
                            height: 20.0,
                            // indent: 10,
                            // endIndent: 10,
                            color: Colors.grey,
                          ),
                          Row(
                            children: <Widget>[
                              Text(
                                'Together版本',
                                textAlign: TextAlign.left,
                              ),
                              Expanded(
                                child: Text(''), // 中间用Expanded控件
                              ),
                              Text(
                                '内测:2.0.1',
                                textAlign: TextAlign.right,
                              ),
                            ],
                          ),
                          Divider(
                            height: 20.0,
                            // indent: 10,
                            // endIndent: 10,
                            color: Colors.grey,
                          ),
                          Row(
                            children: <Widget>[
                              Text(
                                '融云SDK',
                                textAlign: TextAlign.left,
                              ),
                              Expanded(
                                child: Text(''), // 中间用Expanded控件
                              ),
                              Text(
                                '4.0.2',
                                textAlign: TextAlign.right,
                              )
                            ],
                          ),
                          Container(
                            // color: Colors.black,
                            height: 100,
                            padding: EdgeInsets.only(top: 40),
                            child: Text(
                              'PS：Together是为了帮助大家随时随地都能找到陪同的伙伴~',
                              style: TextStyle(
                                  fontSize: 16, color: Colors.blueGrey),
                            ),
                          )
                        ],
                      ),
                    );
                  },
                );
              },
            ),
            //分割线
            Divider(
              height: 0.0,
              indent: 18,
              endIndent: 18,
              color: Colors.grey,
            ),
            //装退出登录按钮的容器
            Container(
              margin: EdgeInsets.only(left: 20, right: 20, top: 60),
              height: 40,
              //退出登录按钮
              child: RaisedButton(
                color: Colors.cyan[200],
                child: new Text(
                  '退出登录',
                  style: TextStyle(
                    fontSize: 16,
                    color: Colors.white, // 文字颜色
                  ),
                ),
                shape: RoundedRectangleBorder(
                    side: BorderSide.none,
                    borderRadius: BorderRadius.all(Radius.circular(50))),
                onPressed: () {
                  showDialog(
                    context: context,
                    barrierDismissible: false,
                    builder: (BuildContext context) {
                      return AlertDialog(
                        title: Text('提示'),
                        content: Text('是否退出?'),
                        actions: <Widget>[
                          FlatButton(
                            child: Text('取消'),
                            onPressed: () {
                              Navigator.of(context).pop(true);
                            },
                          ),
                          FlatButton(
                            child: Text('确认'),
                            onPressed: () {
                              // 退出登录
                              logout();
                            },
                          ),
                        ],
                      );
                    },
                  );
                },
              ),
            )
          ],
        ));
  }

//退出登录
  void logout() async {
    prefix.RongIMClient.disconnect(false);
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.remove("token");
    prefs.remove('nickname');
    prefs.remove('signature');
    prefs.remove('headPortrait');
    Navigator.of(context).pushAndRemoveUntil(
        new MaterialPageRoute(builder: (context) => new LoginPage()),
        (route) => route == null);
  }
}
