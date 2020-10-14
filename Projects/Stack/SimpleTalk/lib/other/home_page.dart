import 'package:flutter/material.dart';
import 'package:stack/other/open_talk_page.dart';
import '../im/util/db_manager.dart';
import '../im/util/user_info_datesource.dart';
import '../im/pages/conversation_list_page.dart';
import 'package:rongcloud_im_plugin/rongcloud_im_plugin.dart';

import 'login_page.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../im/util/event_bus.dart';
import 'dart:developer' as developer;

class HomePage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return new _HomePageState();
  }
}

class _HomePageState extends State<HomePage> {
  String pageName = "example.HomePage";
  final List<BottomNavigationBarItem> tabbarList = [
    new BottomNavigationBarItem(
      icon: new Icon(Icons.chat, color: Colors.grey),
      title: new Text("会话"),
    ),
    new BottomNavigationBarItem(
      icon: new Icon(
        Icons.add_comment,
        color: Colors.grey,
      ),
      title: new Text("发起聊天"),
    ),
  ];
  final List<StatefulWidget> vcList = [
    new ConversationListPage(),
    new OpenTalkPage()
  ];

  int curIndex = 0;

  @override
  void initState() {
    super.initState();
    _initUserInfoCache();
    initPlatformState();
  }

  initPlatformState() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String token = prefs.get("token");
    if (token != null && token.length > 0) {
      // int rc = await RongIMClient.connect(token);
      RongIMClient.connect(token, (int code, String userId) {
        developer.log("connect result " + code.toString(), name: pageName);
        EventBus.instance.commit(EventKeys.UpdateNotificationQuietStatus, {});
        if (code == 31004 || code == 12) {
          developer.log("connect result " + code.toString(), name: pageName);
          Navigator.of(context).pushAndRemoveUntil(
              new MaterialPageRoute(builder: (context) => new LoginPage()),
              (route) => route == null);
        } else if (code == 0) {
          developer.log("connect userId" + userId, name: pageName);
        }
      });
    } else {
      Navigator.of(context).pushAndRemoveUntil(
          new MaterialPageRoute(builder: (context) => new LoginPage()),
          (route) => route == null);
    }
  }

  // 初始化用户信息缓存
  void _initUserInfoCache() {
    DbManager.instance.openDb();
    UserInfoCacheListener cacheListener = UserInfoCacheListener();
    cacheListener.getUserInfo = (String userId) {
      return UserInfoDataSource.generateUserInfo(userId);
    };
    cacheListener.getGroupInfo = (String groupId) {
      return UserInfoDataSource.generateGroupInfo(groupId);
    };
    UserInfoDataSource.setCacheListener(cacheListener);
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      bottomNavigationBar: new BottomNavigationBar(
        items: tabbarList,
        type: BottomNavigationBarType.fixed,
        onTap: (int index) {
          setState(() {
            curIndex = index;
          });
        },
        currentIndex: curIndex,
      ),
      body: IndexedStack(
        index: curIndex,
        children: <Widget>[new ConversationListPage(), new OpenTalkPage()],
      ),
    );
  }
}
