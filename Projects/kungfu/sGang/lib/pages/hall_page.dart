import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';

import 'package:shared_preferences/shared_preferences.dart';

import 'package:flutter/cupertino.dart';
import 'package:rongcloud_im_plugin/rongcloud_im_plugin.dart' as prefix;

import 'package:dio/dio.dart';
import 'package:pull_to_refresh/pull_to_refresh.dart';
import '../im/util/http_util.dart';
import 'package:fluttertoast/fluttertoast.dart';

Dio dio = new Dio();

class HallPage extends StatefulWidget {
  HallPage({Key key}) : super(key: key);

  @override
  _HallPageState createState() => _HallPageState();
}

class _HallPageState extends State<HallPage> {
  String userId; // id
  String userTel; // 手机号码
  String userName; // 用户名
  String userPortrait; // 头像
  String userIdentity; // 身份
  String userOnetime; // 注册时间
  String userStatus; // 账号状态

  List followList = []; // 关注列表

  @override
  void initState() {
    super.initState();

    // 初始化数据，防止数据为null报错
    this.userId = this.userId == null ? " - " : this.userId; // id
    this.userTel = this.userTel == null ? " - " : this.userTel; // 手机号码
    this.userName = this.userName == null ? " - " : this.userName; // 用户名
    this.userPortrait =
        this.userPortrait == null ? " - " : this.userPortrait; // 头像
    this.userIdentity =
        this.userIdentity == null ? " - " : this.userIdentity; // 身份
    this.userOnetime =
        this.userOnetime == null ? " - " : this.userOnetime; // 注册时间
    this.userStatus = this.userStatus == null ? " - " : this.userStatus; // 账号状态

    // 从缓存获取用户的数据
    initPlatformState();
  }

  initPlatformState() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    this.userId = prefs.get("id") == "" ? "" : prefs.get("id"); // id
    this.userTel = prefs.get("phone"); // 手机号码
    this.userName = prefs.get("name"); // 用户名
    this.userPortrait = prefs.get("portrait"); // 头像
    this.userIdentity = prefs.get("identity"); // 身份
    this.userOnetime = prefs.get("onetime"); // 注册时间
    this.userStatus = prefs.get("status"); // 账号状态

    _getFollow(this.userId);

    setState(() {});
  }

  // 退出登陆
  void _logout() async {
    prefix.RongIMClient.disconnect(false);
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.remove("token");
    Navigator.pushReplacementNamed(context, "/login");
  }

  // 打开聊天窗口
  void _onTapUser(BuildContext context, String userid) {
    Map arg = {
      "coversationType": prefix.RCConversationType.Private,
      "targetId": userid
    };
    Navigator.pushNamed(context, "/conversation", arguments: arg);
  }

  List items = [];
  var listInfo = [];
  int listIndex = 0;
  // 列表初始数据
  // List<String> items = ["1", "2", "3", "4", "5", "6", "7", "8"];
  _getListInfo(bool flag, {String yid}) {
    if (yid != null) {
      HttpUtil.get("http://124.71.6.95/r_api.php?m=3004&yid=$yid", (data) {
        _render(data, flag: flag);
      });
    } else {
      HttpUtil.get("http://124.71.6.95/r_api.php?m=2001", (data) {
        _render(data, flag: flag);
      });
    }
  }

  _render(data, {bool flag}) {
    if (data[0]["code"] == 200) {
      if (flag) {
        this.items = [];
        this.listInfo = [];
        this.listIndex = 0;
      }
      for (var i = 0; i < data[0]['list'].length; i++) {
        this.listInfo.add(data[0]['list'][i]);
        this.items.add((this.listIndex + i).toString());
      }
      this.listIndex += data[0]['list'].length;
      if (mounted) setState(() {});
    } else {
      Fluttertoast.showToast(msg: data[0]['msg']);
    }
  }

  // 添加关注
  _addFollow(String id, String yid) {
    HttpUtil.post("http://124.71.6.95/r_api.php?m=3002&id=$id&yid=$yid",
        (data) {
      if (data[0]["code"] == 200) {
        Fluttertoast.showToast(msg: "已成功关注");
        this.followList = [];
        for (var i = 0; i < data[0]['follow'][0]['list'].length; i++) {
          this.followList.add(data[0]['follow'][0]['list'][i]['a_id']);
        }
      } else {
        Fluttertoast.showToast(msg: "发生了一点小意外~");
      }
    });
  }

  // 取消关注
  _delFollow(String id, String yid) {
    HttpUtil.post("http://124.71.6.95/r_api.php?m=3003&id=$id&yid=$yid",
        (data) {
      if (data[0]["code"] == 200) {
        Fluttertoast.showToast(msg: "已取消关注");
        this.followList = [];
        for (var i = 0; i < data[0]['follow'][0]['list'].length; i++) {
          this.followList.add(data[0]['follow'][0]['list'][i]['a_id']);
        }
      } else {
        Fluttertoast.showToast(msg: "发生了一点小意外~");
      }
    });
  }

  _getFollow(String id) {
    HttpUtil.get("http://124.71.6.95/r_api.php?m=3001&id=$id", (data) {
      if (data[0]['code'] == 200) {
        this.followList = [];
        for (var i = 0; i < data[0]['list'].length; i++) {
          this.followList.add(data[0]['list'][i]['a_id']);
        }
      }
    });
  }

  // 页面加载后是否自动下拉刷新
  RefreshController _refreshController =
      RefreshController(initialRefresh: true);

  // 刷新
  void _onRefresh({String yid}) async {
    _getListInfo(true, yid: yid);
    // monitor network fetch
    await Future.delayed(Duration(milliseconds: 1000));
    // if failed,use refreshFailed()
    // if (mounted) setState(() {});
    _refreshController.refreshCompleted();
  }

  // 加载更多
  void _onLoading() async {
    _getListInfo(false);
    // monitor network fetch
    await Future.delayed(Duration(milliseconds: 1000));
    // if failed,use loadFailed(),if no data return,use LoadNodata()
    // items.add((this.items.length + 1).toString());
    // if (mounted) setState(() {});
    _refreshController.loadComplete();
  }

  // 列表模板
  _listInfo(c, i) {
    return Card(
      margin: EdgeInsets.fromLTRB(10, 6, 10, 6),
      child: Column(
        children: [
          ListTile(
            title: Text('昵称：${this.listInfo[i]["name"]}'),
            subtitle: Text("个人简介：${this.listInfo[i]["j_info"]["resume"]}"),
            leading: CircleAvatar(
              backgroundImage: NetworkImage(this.listInfo[i]["portrait"]),
            ),
            trailing: Text('ID：${this.listInfo[i]["a_id"]}'),
          ),
          Divider(),
          ListTile(
            title: Text('学校：${this.listInfo[i]["j_info"]["school"]}'),
            subtitle: Text('学位：${this.listInfo[i]["j_info"]["degree"]}'),
            leading: IconButton(
              icon: Icon(Icons.person_add),
              onPressed: () {
                if (this.followList == null) {
                  _addFollow(this.userId, this.listInfo[i]["a_id"]);
                } else if (!this
                    .followList
                    .contains(this.listInfo[i]["a_id"])) {
                  _addFollow(this.userId, this.listInfo[i]["a_id"]);
                } else {
                  _delFollow(this.userId, this.listInfo[i]["a_id"]);
                }
              },
            ),
            trailing: IconButton(
              icon: Icon(Icons.chat),
              onPressed: () {
                _onTapUser(context, this.listInfo[i]["a_id"]);
              },
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    ///搜索栏内容
    TextEditingController _followController = new TextEditingController();
    return Scaffold(
      appBar: AppBar(
        title: Container(
          decoration: new BoxDecoration(
            color: Colors.white,
            borderRadius: new BorderRadius.all(new Radius.circular(10)),
          ),
          alignment: Alignment.center,
          height: 40,
          child: TextField(
            controller: _followController,
            cursorColor: Colors.lightBlue, //设置光标
            textAlign: TextAlign.center,
            decoration: InputDecoration(
              contentPadding: new EdgeInsets.fromLTRB(6, 2, 6, 10),
              border: InputBorder.none,
              hintText: "ID/手机号码/昵称/姓名",
            ),
            style: new TextStyle(fontSize: 18, color: Colors.black),
          ),
        ),
        actions: <Widget>[
          new Center(
            child: Padding(
              padding: EdgeInsets.fromLTRB(0.0, 0.0, 10.0, 0.0),
              child: IconButton(
                  icon: Icon(
                    Icons.search,
                    color: Colors.black,
                    size: 30,
                  ),
                  onPressed: () {
                    _onRefresh(yid: _followController.text);
                  }),
            ),
          ),
        ],
        centerTitle: true,
      ),
      drawer: Drawer(
        child: Column(
          children: [
            Row(
              children: [
                Expanded(
                  child: UserAccountsDrawerHeader(
                      // 用户名
                      accountName:
                          Text(this.userName == "" ? " - " : this.userName),
                      // 注册时间
                      accountEmail: Text(
                          "注册时间：${this.userOnetime == "" ? " - " : this.userOnetime}"),
                      // 头像
                      currentAccountPicture: CircleAvatar(
                        backgroundColor: Color(0xffc8a675),
                        backgroundImage: NetworkImage(this.userPortrait == ""
                            ? " - "
                            : this.userPortrait),
                      ),
                      // 背景
                      decoration: BoxDecoration(
                        // 默认背景颜色
                        color: Color(0xffc8a675),
                      ),
                      otherAccountsPictures: [
                        Center(
                          child: Text(
                            'ID:${this.userId == "" ? " - " : this.userId}',
                            textAlign: TextAlign.center,
                          ),
                        ),
                      ]),
                ),
              ],
            ),
            ListTile(
              title: Text('修改资料'),
              leading: Icon(Icons.create),
              trailing: Icon(Icons.chevron_right),
              onTap: () {
                Navigator.pushNamed(context, "/material", arguments: true);
              },
            ),
            Divider(),
            ListTile(
              title: Text('退出登陆'),
              leading: Icon(Icons.power_settings_new),
              trailing: Icon(Icons.chevron_right),
              onTap: () {
                _logout();
              },
            ),
            Divider(),
            ListTile(
              title: Text('关于'),
              leading: Icon(Icons.error),
              trailing: Icon(Icons.chevron_right),
            ),
            Divider()
          ],
        ),
      ),
      // 主体内容
      body: Scaffold(
        body: SmartRefresher(
          enablePullDown: true,
          enablePullUp: true,
          header: WaterDropHeader(),
          footer: CustomFooter(
            builder: (BuildContext context, LoadStatus mode) {
              Widget body;
              if (mode == LoadStatus.idle) {
                body = Text("上拉加载");
              } else if (mode == LoadStatus.loading) {
                body = CupertinoActivityIndicator();
              } else if (mode == LoadStatus.failed) {
                body = Text("加载失败！点击重试！");
              } else if (mode == LoadStatus.canLoading) {
                body = Text("松手,加载更多!");
              } else {
                body = Text("没有更多数据了!");
              }
              return Container(
                height: 55.0,
                child: Center(child: body),
              );
            },
          ),
          controller: _refreshController,
          onRefresh: _onRefresh,
          onLoading: _onLoading,
          child: ListView.builder(
            itemBuilder: (c, i) => _listInfo(c, i),
            // 项目数量
            itemCount: this.items.length,
          ),
        ),
      ),
    );
  }
}
