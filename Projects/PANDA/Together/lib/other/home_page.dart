import 'package:flutter/material.dart';
import '../im/util/db_manager.dart';
import 'package:dio/dio.dart';
import '../im/util/http_util.dart';
import 'package:fluttertoast/fluttertoast.dart';
import "package:flutter_amap_location/flutter_amap_location.dart";
import '../im/util/user_info_datesource.dart' as user_info;
import '../im/pages/conversation_list_page.dart';
import '../other/discover_page.dart';
// import 'contacts_page.dart';
import 'package:rongcloud_im_plugin/rongcloud_im_plugin.dart';

import 'login_page.dart';
import 'personal_page.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../im/util/event_bus.dart';
import 'dart:developer' as developer;

class HomePage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage>
    with SingleTickerProviderStateMixin {
  String pageName = "example.HomePage";
  //导航要跳转的页面

  final List<StatefulWidget> vcList = [
    new DiscoverPage(),
    new ConversationListPage(),
    new SettingPage(editable: true)
  ];

  //当前选中的页面
  int _activeIndex = 0;

  //导航栏高度
  double _height = 52.0;

  //悬浮图标半径
  double _floatRadius;

  //移动补间
  double _moveTween = 0.0;

  //浮动图标与圆弧之间的间隙
  double _padding = 10.0;

  //动画控制器
  AnimationController _animationController;

  //移动动画
  Animation<double> _moveAnimation;

  //导航栏使用到的图标
  List _icons = [Icons.remove_red_eye, Icons.insert_comment, Icons.person];

  //导航栏使用到的标题
  final _titls = [" 发现 ", " 消息 ", " 我的 "];
  String _address = "未知位置";
  double _longitude = 0.0;
  double _latitude = 0.0;

  @override
  void initState() {
    FlutterAmapLocation.listenLocation(_onLocationEvent, _onLocationError);
    _floatRadius = _height * 2 / 3;
    _animationController =
        AnimationController(vsync: this, duration: Duration(milliseconds: 400));
    super.initState();
    _initUserInfoCache();
    initPlatformState();
  }

  void _onLocationEvent(Object event) {
    Map<String, Object> loc = Map.castFrom(event);
    print(loc['address']);
    print('在这里..................................');
    print(loc);
    setState(() {
      _longitude = loc['longitude'];
      _latitude = loc['latitude'];
      _address = loc['address'];
    });
  }

  void _onLocationError(Object event) {
    print(event);
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
    user_info.UserInfoCacheListener cacheListener =
        user_info.UserInfoCacheListener();
    // ignore: missing_return
    cacheListener.getUserInfo = (String userId) async {
      // return UserInfoDataSource.generateUserInfo(userId);
      try {
        Response response = await Dio()
            .get("http://api.mashiro.online/center/getUserInfo?uid=$userId");
        print(response.data);
        if (response.data["code"] == 200) {
          user_info.UserInfo user = new user_info.UserInfo();
          user.id = userId;
          user.name = response.data["data"]["name"];
          user.portraitUrl = response.data["data"]["url"];
          user_info.UserInfoDataSource.cachedUserMap[userId] = user;

          print('-信息列表缓存--');
          return user;
        }
      } catch (e) {
        print(e);
      }
      setState(() {});
    };

    cacheListener.getGroupInfo = (String groupId) {
      return user_info.UserInfoDataSource.generateGroupInfo(groupId);
    };
    user_info.UserInfoDataSource.setCacheListener(cacheListener);
  }

  @override
  Widget build(BuildContext context) {
    final double bottomPadding = MediaQuery.of(context).padding.bottom;
    double width = MediaQuery.of(context).size.width;
    double singleWidth = width / _icons.length;
    double posTop = _animationController.value <= 0.5
        ? (_animationController.value * _height * _padding / 2) -
            _floatRadius / 3 * 2
        : (1 - _animationController.value) * _height * _padding / 2 -
            _floatRadius / 3 * 2;
    // print("posTop " + posTop.toString());
    if (posTop > 0) {
      posTop = 0;
    }
    // print("posTop--- " + posTop.toString());
    // print("bottomPadding " + bottomPadding.toString());
    return Container(
      padding: EdgeInsets.only(bottom: bottomPadding),
      child: Stack(children: [
        Scaffold(
          //对应的页面
          body: this.vcList[_activeIndex],
          backgroundColor: Color(0xFFEEEEEE),
        ),
        Positioned(
          bottom: 0.0,
          child: Container(
            width: width,
            child: Stack(
              overflow: Overflow.visible,
              children: <Widget>[
                //浮动图标
                Positioned(
                  top: posTop,
                  left: _moveTween * singleWidth +
                      (singleWidth - _floatRadius) / 2 -
                      _padding / 2 -
                      2,
                  child: DecoratedBox(
                    decoration:
                        ShapeDecoration(shape: CircleBorder(), shadows: [
                      BoxShadow(
                          blurRadius: _padding / 2,
                          offset: Offset(0, _padding / 2),
                          spreadRadius: 0,
                          color: Colors.black26),
                    ]),
                    child: CircleAvatar(
                        radius: _floatRadius - _padding,
                        //浮动图标和圆弧之间设置10pixel间隙
                        backgroundColor: Colors.white,
                        child: Icon(_icons[_activeIndex],
                            color: Color(0xFF6CC6CB))),
                  ),
                ),
                //所有图标
                CustomPaint(
                  child: SizedBox(
                    height: _height,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: _icons
                          .asMap()
                          .map((i, v) => MapEntry(
                              i,
                              GestureDetector(
                                child: buildBotomItem(
                                    _activeIndex, i, v, _titls[i]),
                                onTap: () {
                                  _switchNav(i);
                                },
                              )))
                          .values
                          .toList(),
                    ),
                  ),
                  painter: ArcPainter(
                      navCount: _icons.length,
                      moveTween: _moveTween,
                      padding: _padding),
                )
              ],
            ),
          ),
        )
      ]),
    );
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  //切换导航
  _switchNav(int newIndex) {
    // print("switch " + newIndex.toString());
    double oldPosition = _activeIndex.toDouble();
    double newPosition = newIndex.toDouble();
    if (oldPosition != newPosition &&
        _animationController.status != AnimationStatus.forward) {
      _animationController.reset();
      _moveAnimation = Tween(begin: oldPosition, end: newPosition).animate(
          CurvedAnimation(
              parent: _animationController, curve: Curves.easeInCubic))
        ..addListener(() {
          setState(() {
            _moveTween = _moveAnimation.value;
          });
        })
        ..addStatusListener((AnimationStatus status) {
          if (status == AnimationStatus.completed) {
            setState(() {
              _activeIndex = newIndex;
            });
          }
        });
      _animationController.forward();
    }
  }

  buildBotomItem(int selectIndex, int index, IconData iconData, String title) {
    //未选中状态的样式
    TextStyle textStyle = TextStyle(fontSize: 12.0, color: Colors.grey);
    Color iconColor = Colors.grey;
    Color bgColor = Colors.white;
    EdgeInsetsGeometry padding = EdgeInsets.only(top: 8.0);

    if (selectIndex == index) {
      //选中状态的文字样式
      textStyle = TextStyle(fontSize: 0.0, color: Colors.transparent);
      //选中状态的按钮样式
      iconColor = Colors.transparent;
      bgColor = Colors.transparent;
      padding = EdgeInsets.only(top: 0.0);
    }
    Widget padItem = SizedBox();
    if (iconData != null) {
      padItem = Padding(
        padding: padding,
        child: Container(
          color: bgColor,
          child: Center(
            child: Column(
              children: <Widget>[
                Icon(
                  iconData,
                  color: iconColor,
                ),
                Text(
                  title,
                  style: textStyle,
                )
              ],
            ),
          ),
        ),
      );
    }
    return SizedBox(
      height: 52,
      child: padItem,
    );
  }
}

//绘制圆弧背景
class ArcPainter extends CustomPainter {
  final int navCount; //导航总数
  final double moveTween; //移动补间
  final double padding; //间隙
  ArcPainter({this.navCount, this.moveTween, this.padding});

  @override
  void paint(Canvas canvas, Size size) {
    Paint paint = Paint()
      ..color = (Colors.white)
      ..style = PaintingStyle.stroke; //画笔
    double width = size.width; //导航栏总宽度，即canvas宽度
    double singleWidth = width / navCount; //单个导航项宽度
    double height = size.height; //导航栏高度，即canvas高度
    double arcRadius = height * 2 / 3; //圆弧半径
    double restSpace = (singleWidth - arcRadius * 2) / 2; //单个导航项减去圆弧直径后单边剩余宽度

    Path path = Path() //路径
      ..relativeLineTo(moveTween * singleWidth, 0)
      ..relativeCubicTo(restSpace + padding, 0, restSpace + padding / 2,
          arcRadius, singleWidth / 2, arcRadius) //圆弧左半边
      ..relativeCubicTo(arcRadius, 0, arcRadius - padding, -arcRadius,
          restSpace + arcRadius, -arcRadius) //圆弧右半边
      ..relativeLineTo(width - (moveTween + 1) * singleWidth, 0)
      ..relativeLineTo(0, height)
      ..relativeLineTo(-width, 0)
      ..relativeLineTo(0, -height)
      ..close();
    paint.style = PaintingStyle.fill;
    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) {
    return true;
  }
}
