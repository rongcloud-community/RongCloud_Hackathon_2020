import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

import 'package:shared_preferences/shared_preferences.dart';

import 'package:flutter/cupertino.dart';
import 'package:rongcloud_im_plugin/rongcloud_im_plugin.dart' as prefix;

import 'package:dio/dio.dart';
import 'package:pull_to_refresh/pull_to_refresh.dart';
import '../im/util/http_util.dart';

import 'package:fluttertoast/fluttertoast.dart';

Dio dio = new Dio();

class FollowPage extends StatefulWidget {
  FollowPage({Key key}) : super(key: key);

  @override
  _FollowPageState createState() => _FollowPageState();
}

class _FollowPageState extends State<FollowPage> {
  String userId; // id

  List followList = []; // 关注列表

  @override
  void initState() {
    super.initState();
    // 获取用户的id
    initPlatformState();
  }

  initPlatformState() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    this.userId = prefs.get("id") == "" ? "" : prefs.get("id"); // id
    // 使用id获取用户的好友列表
    _getFollow(this.userId);
    // 渲染获取到是好友列表
    _onRefresh();

    setState(() {});
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

  // 打开聊天窗口
  void _onTapUser(BuildContext context, String userid) {
    Map arg = {
      "coversationType": prefix.RCConversationType.Private,
      "targetId": userId
    };
    Navigator.pushNamed(context, "/conversation", arguments: arg);
  }

  List items = [];
  var listInfo = [];
  int listIndex = 0;
  // 列表初始数据
  // List<String> items = ["1", "2", "3", "4", "5", "6", "7", "8"];
  _getListInfo(bool flag) {
    HttpUtil.get("http://124.71.6.95/r_api.php?m=3001&id=$userId", (data) {
      if (data[0]["code"] == 200) {
        if (flag) {
          this.items = [];
          this.listInfo = [];
          this.listIndex = 0;
        }
        // 循环遍历好友
        for (var i = 0; i < data[0]['list'].length; i++) {
          this.listInfo.add(data[0]['list'][i]);
          this.items.add((this.listIndex + i).toString());
        }
        this.listIndex += data[0]['list'].length;
        if (mounted) setState(() {});
      }
    });
  }

  // 添加关注
  // _addFollow(String id, String yid) {
  //   HttpUtil.post("http://124.71.6.95/r_api.php?m=3002&id=$id&yid=$yid",
  //       (data) {
  //     if (data[0]["code"] == 200) {
  //       Fluttertoast.showToast(msg: "已成功关注");
  //       this.followList = [];
  //       for (var i = 0; i < data[0]['follow'][0]['list'].length; i++) {
  //         this.followList.add(data[0]['follow'][0]['list'][i]['a_id']);
  //       }
  //     } else {
  //       Fluttertoast.showToast(msg: "发生了一点小意外~");
  //     }
  //   });
  //   _onRefresh();
  // }

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

  // 页面加载后是否自动下拉刷新
  RefreshController _refreshController =
      RefreshController(initialRefresh: true);

  // 刷新
  void _onRefresh() async {
    _getListInfo(true);
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
            subtitle: Text('ID：${this.listInfo[i]["a_id"]}'),
            leading: CircleAvatar(
              backgroundImage: NetworkImage(this.listInfo[i]["portrait"]),
            ),
            trailing: IconButton(
              icon: Icon(Icons.remove_circle, color: Colors.red),
              onPressed: () {
                _delFollow(this.userId, this.listInfo[i]["a_id"]);
                _onRefresh();
              },
            ),
            onTap: () {
              _onTapUser(context, this.listInfo[i]["a_id"]);
            },
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("关注"),
        centerTitle: true,
      ),

      // 主体内容
      body: Scaffold(
        body: SmartRefresher(
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
