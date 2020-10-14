import 'dart:async';
import 'package:connectivity/connectivity.dart';
import 'package:flutter/material.dart';
import 'dart:math';
import 'package:dio/dio.dart';
import 'package:fluttertoast/fluttertoast.dart';

import 'package:rongcloud_im_plugin/rongcloud_im_plugin.dart' as prefix;
import 'package:cached_network_image/cached_network_image.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../im/util/style.dart';
import 'personal_page.dart';
import 'publish_page.dart';
import 'package:crypto/crypto.dart';
import 'dart:convert';
import 'package:flutter_amap_location/flutter_amap_location.dart';

import 'package:location_permissions/location_permissions.dart';

// 推荐中心页面
class DiscoverPage extends StatefulWidget {
  DiscoverPage({Key key}) : super(key: key);

  @override
  _DiscoverPageState createState() => _DiscoverPageState();
}

// 经纬度
double jingdu;
double weidu;

class _DiscoverPageState extends State<DiscoverPage> {
  List _dataList = [];
  String userId;
  double _longitude = 0.0;
  double _latitude = 0.0;
  // ignore: unused_field
  String _address;
  String tips = '小伙伴们正在来的路上....\n(请确保定位是开启状态)';

  // 请求
  void _getDiscoverDatas() async {
    // 获取用户id
    SharedPreferences prefs = await SharedPreferences.getInstance();
    // 判断是否有值
    if (prefs.getString('id') != null) {
      userId = prefs.getString('id');
    }
    // 发起请求，获取所有推荐动态
    try {
      Response response = await Dio()
          .get("http://api.mashiro.online/center/getCenters?uid=$userId");

      if (response.data["code"] == 200) {
        response.data["data"].forEach((element) {
          element['distance'] = _getDistance(_latitude, _longitude,
              double.parse(element['lat']), double.parse(element['lng']));

          element['points'] = (((new DateTime.now().millisecondsSinceEpoch -
                          DateTime.parse(element['publishTime'])
                              .millisecondsSinceEpoch) /
                      3600000) +
                  (double.parse(element['distance']) / 1000))
              .toString();
        });
        response.data['data'].sort((a, b) {
          return double.parse(a['points']).compareTo(double.parse(b['points']));
        });
        // 让数据变化，然后响应式渲染
        this._dataList = response.data['data'];
        setState(() {});
      }
    } catch (e) {
      print(e);
    }
  }

  @override
  // 初始化
  void initState() {
    super.initState();
    _networkConnect(); //网络连接
    // 在初始化时请求数据
    _reqPostion();
  }

  void _reqPostion() async {
    PermissionStatus permission = await LocationPermissions()
        .checkPermissionStatus(level: LocationPermissionLevel.locationAlways);
    if (permission == PermissionStatus.denied ||
        permission == PermissionStatus.unknown ||
        permission == PermissionStatus.restricted) {
      PermissionStatus permission1 = await LocationPermissions()
          .requestPermissions(
              permissionLevel: LocationPermissionLevel.locationAlways);
      print(permission1);
    }
    // 监听定位事件
    FlutterAmapLocation.listenLocation(_onLocationEvent, _onLocationError);
    FlutterAmapLocation.setOnceLocation(true);
    // 开启定位
    FlutterAmapLocation.startLocation();
  }

  void _networkConnect() async {
    var connectivityResult = await (Connectivity().checkConnectivity());
    if (connectivityResult == ConnectivityResult.none) {
      print('-请连接网络-');
      Fluttertoast.showToast(msg: "网络未连接，请连接网络重试");
    }
  }

  void _onLocationEvent(Object event) async {
    // print(event);
    Map<String, Object> loc = Map.castFrom(event);
    jingdu = loc['longitude'];
    weidu = loc['latitude'];
    setState(() {
      _longitude = loc['longitude'];
      _latitude = loc['latitude'];
      _address = loc['address'];
    });
    // 定位成功后，开始获取后端推荐中心数据
    this._getDiscoverDatas();
  }

  void _onLocationError(Object event) {
    print(event);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        actions: [
          IconButton(
            padding: EdgeInsets.only(right: 15.0),
            icon: Icon(Icons.send),
            onPressed: () {
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => new PublishPage()));
            },
          ),
        ],
        title: Text('推荐'),
        centerTitle: true,
        flexibleSpace: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(colors: [
              Color(0xFFEAD6EE),
              Color(0xFFA0F1EA),
            ], begin: Alignment.topRight, end: Alignment.bottomLeft),
          ),
        ),
      ),
      // 数据整理完毕，开始渲染
      body: this._dataList.length > 0
          ? DiscoverContent(data: _dataList, id: userId)
          : Container(
              alignment: Alignment.center,
              child: Text(this.tips),
            ),
    );
  }
}

String _getDistance(double lat1, double lng1, double lat2, double lng2) {
  /// 单位：米
  /// def ：地球半径
  double def = 6378137.0;
  double radLat1 = _rad(lat1);
  double radLat2 = _rad(lat2);
  double a = radLat1 - radLat2;
  double b = _rad(lng1) - _rad(lng2);
  double s = 2 *
      asin(sqrt(pow(sin(a / 2), 2) +
          cos(radLat1) * cos(radLat2) * pow(sin(b / 2), 2)));
  return (s * def).roundToDouble().toString();
}

double _rad(double d) {
  return d * pi / 180.0;
}

// ignore: must_be_immutable
class DiscoverContent extends StatefulWidget {
  DiscoverContent({Key key, this.data, this.id}) : super(key: key);
  List data = [];
  String id;
  @override
  _DiscoverContentState createState() => _DiscoverContentState();
}

class _DiscoverContentState extends State<DiscoverContent> {
  // 下拉刷新
  Future<Null> handlerRefresh() async {
    try {
      Response response = await Dio()
          .get("http://api.mashiro.online/center/getCenters?uid=${widget.id}");
      // 让数据变化，然后响应式渲染
      if (response.data["code"] == 200) {
        response.data["data"].forEach((element) {
          element['distance'] = _getDistance(weidu, jingdu,
              double.parse(element['lat']), double.parse(element['lng']));
          element['points'] = (((new DateTime.now().millisecondsSinceEpoch -
                          DateTime.parse(element['publishTime'])
                              .millisecondsSinceEpoch) /
                      3600000) +
                  (double.parse(element['distance']) / 1000))
              .toString();
        });
        response.data['data'].sort((a, b) {
          return double.parse(a['points']).compareTo(double.parse(b['points']));
        });
        widget.data = response.data['data'];
        setState(() {});
      }
    } catch (e) {
      print(e);
    }
    _isOnline();
    setState(() {
      // mDataList = generateData();
    });
    return null;
  }

  @override
  void initState() {
    super.initState();
    _isOnline();
  }

  // 判断用户是否在线
  void _isOnline() {
    widget.data.forEach((element) async {
      try {
        // appkey
        var appkey = 'p5tvi9dspqt54';
        // 时间戳
        var timestamp = DateTime.now().millisecondsSinceEpoch;
        // 随机数
        var nonce =
            '${new Random().nextInt(10)}${new Random().nextInt(10)}${new Random().nextInt(10)}${new Random().nextInt(10)}${new Random().nextInt(10)}${new Random().nextInt(10)}';
        // 签名
        var sign = sha1
            .convert(utf8.encode('tvZ89mDztg6' + nonce + timestamp.toString()));
        Map params = {"userId": element["use_id"]};
        Response response = await Dio().post(
          "https://api-cn.ronghub.com/user/checkOnline.json",
          data: params,
          options: Options(
            contentType: 'application/x-www-form-urlencoded',
            headers: {
              "App-Key": appkey,
              "Nonce": nonce,
              "TimeStamp": timestamp.toString(),
              "Signature": sign
            },
          ),
        );
        if (response.data['status'] == '1') {
          element['online'] = 1;
          // 更新状态
          if (mounted) {
            setState(() {});
          }
        }
      } catch (e) {
        print(e);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: RefreshIndicator(
        displacement: 20.0,
        // margin: EdgeInsets.only(top: 16.0),
        onRefresh: () => handlerRefresh(),
        child: ListView.separated(
          physics: const AlwaysScrollableScrollPhysics(),
          padding: EdgeInsets.only(top: 20.0, bottom: 60.0, right: 10.0),
          itemCount: widget.data.length,
          itemBuilder: (context, index) {
            // 如果用户在线状态为1 就显示推荐
            return widget.data[index]['online'] == 1
                ? Container(
                    // 背景图
                    // decoration: BoxDecoration(
                    //   image: DecorationImage(
                    //     image: AssetImage("assets/images/20201003182408.png"),
                    //     fit: BoxFit.cover,
                    //   ),
                    // ),
                    alignment: Alignment.topCenter,
                    padding: EdgeInsets.fromLTRB(10.0, 10.0, 10.0, 0),
                    child: Column(
                      children: [
                        // 发现页每条动态的header
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: <Widget>[
                            Flexible(
                              child: Row(children: <Widget>[
                                GestureDetector(
                                  onTap: () {
                                    Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                        builder: (context) => new SettingPage(
                                            id: widget.data[index]['use_id'],
                                            editable: false),
                                      ),
                                    );
                                  },
                                  // 头像
                                  child: CircleAvatar(
                                    radius: 18,
                                    backgroundImage: CachedNetworkImageProvider(
                                        widget.data[index]["url"]),
                                  ),
                                ),
                                Flexible(
                                  child: GestureDetector(
                                    onTap: () {
                                      Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                          builder: (context) => new SettingPage(
                                              id: widget.data[index]['use_id'],
                                              editable: false),
                                        ),
                                      );
                                    },
                                    // 昵称
                                    child: Container(
                                      padding: EdgeInsets.only(
                                          left: 10.0, bottom: 12.0),
                                      child: Text(
                                        widget.data[index]["name"],
                                        overflow: TextOverflow.ellipsis,
                                        style: TextStyle(
                                          // color: Theme.of(context).accentColor,
                                          color: Color.fromRGBO(46, 78, 126, 1),
                                          fontSize: 16.0,
                                        ),
                                      ),
                                    ),
                                  ),
                                )
                              ]),
                            ),
                            // 动态发布时间
                            Container(
                              padding: EdgeInsets.only(bottom: 10.0),
                              child: Text(
                                toRightTime(widget.data[index]["publishTime"]),
                                style: TextStyle(
                                  color: Theme.of(context).hintColor,
                                  fontSize: 12.0,
                                ),
                              ),
                            )
                          ],
                        ),
                        // 动态内容
                        Container(
                          padding: EdgeInsets.only(
                              top: 0.0, left: 50.0, bottom: 10.0),
                          child: Text(
                            widget.data[index]["content"],
                            // style: Theme.of(context).textTheme.bodyText1,
                            style: TextStyle(fontSize: 16.0),
                          ),
                          alignment: Alignment.centerLeft,
                        ),
                        // 每条动态的底部开启聊天框
                        Row(
                          children: [
                            Container(
                              padding: EdgeInsets.only(left: 45.0),
                              child: Icon(
                                ThirdPartyIcons.OnlineStatus,
                                size: 14.0,
                                color: Colors.green[300],
                              ),
                            ),
                            Container(
                                padding: EdgeInsets.only(left: 2.0, top: 2.0),
                                child: Text(
                                  '在线',
                                  style: TextStyle(
                                    color: Colors.green[300],
                                    fontSize: 12.0,
                                  ),
                                )),
                            Expanded(
                              child: Container(
                                padding: EdgeInsets.only(right: 20.0, top: 4.0),
                                alignment: Alignment.centerRight,
                                child: Text(
                                  '距离你' +
                                      handleDistance(
                                        widget.data[index]["distance"],
                                      ),
                                  style: TextStyle(fontSize: 12.0),
                                ),
                              ),
                            ),
                            Container(
                              alignment: Alignment.centerRight,
                              padding: EdgeInsets.only(right: 0.0),
                              child: InkWell(
                                splashColor: Colors.tealAccent,
                                child: Container(
                                  child: Icon(ThirdPartyIcons.TogetherExchange,
                                      size: 24.0),
                                ),
                                onTap: () {
                                  _onTapUser(
                                      context,
                                      widget.data[index]['use_id'],
                                      widget.data[index]['name']);
                                },
                              ),
                            ),
                          ],
                        )
                      ],
                    ),
                  )
                : Container();
          },
          // 分割线
          separatorBuilder: (BuildContext context, int index) {
            return widget.data[index]['online'] == 1
                ? Divider(
                    color: Colors.black54,
                    height: 20,
                    thickness: 1.2,
                    indent: 60,
                    endIndent: 10,
                  )
                : Container();
          },
        ),
      ),
    );
  }

  // 处理距离
  String handleDistance(String mi) {
    double dis = double.parse(mi);
    if (dis > 1000) {
      return (dis ~/ 1000).toString() + 'km';
    } else {
      return dis.toInt().toString() + 'm';
    }
  }

  // 点击用户
  void _onTapUser(BuildContext context, String userid, String uname) {
    Map arg = {
      "coversationType": prefix.RCConversationType.Private,
      "targetId": userid,
      "targetName": uname,
    };
    Navigator.pushNamed(context, "/conversation", arguments: arg);
  }

  // 计算时间差
  String toRightTime(time) {
    var date = DateTime.parse(time).toLocal().toString();
    return handleDate(date.split('.')[0].replaceAll('-', '/'));
  }

  // 计算时间差
  static handleDate(String oldTime) {
    String nowTime = new DateTime.now()
        .toLocal()
        .toString()
        .split('.')[0]
        .replaceAll('-', '/');

    int nowyear = int.parse(nowTime.split(" ")[0].split('/')[0]);
    int nowmonth = int.parse(nowTime.split(" ")[0].split('/')[1]);
    int nowday = int.parse(nowTime.split(" ")[0].split('/')[2]);
    int nowhour = int.parse(nowTime.split(" ")[1].split(':')[0]);
    int nowmin = int.parse(nowTime.split(" ")[1].split(':')[1]);

    int oldyear = int.parse(oldTime.split(" ")[0].split('/')[0]);
    int oldmonth = int.parse(oldTime.split(" ")[0].split('/')[1]);
    int oldday = int.parse(oldTime.split(" ")[0].split('/')[2]);
    int oldhour = int.parse(oldTime.split(" ")[1].split(':')[0]);
    int oldmin = int.parse(oldTime.split(" ")[1].split(':')[1]);

    var now = new DateTime(nowyear, nowmonth, nowday, nowhour, nowmin);
    var old = new DateTime(oldyear, oldmonth, oldday, oldhour, oldmin);
    var difference = now.difference(old);

    if (difference.inDays > 1) {
      return (difference.inDays).toString() + '天前';
    } else if (difference.inDays == 1) {
      return '昨天'.toString();
    } else if (difference.inHours >= 1 && difference.inHours < 24) {
      return (difference.inHours).toString() + '小时前';
    } else if (difference.inMinutes > 5 && difference.inMinutes < 60) {
      return (difference.inMinutes).toString() + '分钟前';
    } else if (difference.inMinutes <= 5) {
      return '刚刚';
    }
  }
}
