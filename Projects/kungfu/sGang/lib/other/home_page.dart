import 'package:flutter/material.dart';
import 'package:rongcloud_im_plugin_example/pages/follow_page.dart';
import 'package:rongcloud_im_plugin_example/pages/hall_page.dart';
import '../im/util/db_manager.dart';
import '../im/util/user_info_datesource.dart' as userInfo;
import '../im/pages/conversation_list_page.dart';
import 'package:rongcloud_im_plugin/rongcloud_im_plugin.dart';

import 'login_page.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../im/util/event_bus.dart';
import 'dart:developer' as developer;

import 'package:dio/dio.dart';

class HomePage extends StatefulWidget {
  // HomePage({Key key, this.arguments}) : super(key: key);
  @override
  State<StatefulWidget> createState() {
    return new _HomePageState();
  }
}

class _HomePageState extends State<HomePage> {
  String pageName = "example.HomePage";
  // 底部导航栏图标
  final List<BottomNavigationBarItem> tabbarList = [
    new BottomNavigationBarItem(
      icon: new Icon(Icons.home),
      title: new Text("大厅"),
    ),
    new BottomNavigationBarItem(
      icon: new Icon(Icons.chat),
      title: new Text("消息"),
    ),
    new BottomNavigationBarItem(
      icon: new Icon(Icons.perm_contact_calendar),
      title: new Text("关注"),
    ),
  ];
  // final List<StatefulWidget> vcList = [
  //   new HallPage(),
  //   new ConversationListPage(),
  //   new ContactsPage()
  // ];

  int curIndex = 0;

  @override
  void initState() {
    super.initState();
    _initUserInfoCache();
    initPlatformState();
  }

  initPlatformState() async {
    //1.初始化 im SDK
    // RongIMClient.init(RongAppKey);

    //2.连接 im SDK
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
          // 连接成功后打开数据库
          // _initUserInfoCache();
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
    userInfo.UserInfoCacheListener cacheListener =
        userInfo.UserInfoCacheListener();
    // cacheListener.getUserInfo = (String userId) {
    //   return userInfo.UserInfoDataSource.generateUserInfo(userId);
    // };

    // 同步获取数据
    // cacheListener.getUserInfo = (String userId) {
    //   print("==========================response.data");
    //   print(this.userInfos);
    //   if (this.userInfos['code'] == 200) {
    //     userInfo.UserInfo user = new userInfo.UserInfo();
    //     user.id = this.userInfos['a_id'];
    //     user.name = this.userInfos['name'];
    //     user.portraitUrl = this.userInfos['portrait'];
    //     print("===============用户信息列表");
    //     print(user);
    //     userInfo.UserInfoDataSource.cachedUserMap[userId] = user;
    //     return user;
    //   }
    // };

    // 异步获取数据
    cacheListener.getUserInfo = (String userId) async {
      try {
        Response response =
            await Dio().get("http://124.71.6.95/r_api.php?m=1003&id=$userId");
        print("==========================response.data");
        print(response.data);
        if (response.data[0]['code'] == 200) {
          userInfo.UserInfo user = new userInfo.UserInfo();
          user.id = userId;
          user.name = response.data[0]['name'];
          user.portraitUrl = response.data[0]['portrait'];
          print("===============用户信息列表");
          print(user);
          userInfo.UserInfoDataSource.cachedUserMap[userId] = user;
          return user;
        }
      } catch (e) {
        print(e);
      }
      setState(() {});
    };

    cacheListener.getGroupInfo = (String groupId) {
      return userInfo.UserInfoDataSource.generateGroupInfo(groupId);
    };
    userInfo.UserInfoDataSource.setCacheListener(cacheListener);
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
        // 底部导航页面列表
        children: <Widget>[
          new HallPage(),
          new ConversationListPage(),
          new FollowPage(),
          // new ContactsPage()
        ],
      ),
    );
  }
}
