import 'dart:io';

import 'package:connectivity/connectivity.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:dio/dio.dart';
import 'package:rongcloud_im_plugin/rongcloud_im_plugin.dart' as prefix;
import 'package:image_picker/image_picker.dart';
import '../im/util/style.dart';
import '../im/util/user_info_datesource.dart' as user_info;
import 'package:cached_network_image/cached_network_image.dart';
import 'setting_page.dart';

class SettingPage extends StatefulWidget {
  SettingPage({Key key, this.id, this.editable}) : super(key: key);
  final String id;
  final bool editable;
  @override
  _SettingPageState createState() => _SettingPageState();
}

class _SettingPageState extends State<SettingPage> {
  String aUserName = '';
  String aQianName = '';
  String defaultImg = '';
  // String avatarUrl ='https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1618065806,14298536&fm=26&gp=0.jpg';
  String avatarUrl = '';
  File avaUrlPath;
  List _dataList = [];
  String tipwords = '';
  var uid;
  var cid;
  user_info.UserInfo info;
  String userId;
  bool editable;
  _SettingPageState({Key key, this.userId, this.editable}) : super();

  TextEditingController _unameController = TextEditingController();
  TextEditingController _signatureController = TextEditingController();

  @override
  void initState() {
    super.initState();
    // 发请求
    userId = widget.id;
    defaultImg = 'assets/images/personal_defaultImg.jpg';

    _getPersonalArticles();
  }

  void savePersonalInfo() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString("nickname", this.aUserName);
    prefs.setString("signature", this.aQianName);
    prefs.setString("headPortrait", this.avatarUrl);
    print('-savePersonalInfo-');
  }

  getPersonalInfo() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String nickname = prefs.get('nickname');
    String signature = prefs.get('signature');
    String headPortrait = prefs.get('headPortrait');

    this.aUserName = nickname;
    this.aQianName = signature;
    this.avatarUrl = headPortrait;
    setState(() {});
    print('-getPersonalInfo-');
  }

  // 请求
  void _getPersonalArticles() async {
    // 获取用户id
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String uid = prefs.getString('id');
    //判断是否有值
    if (uid != null && userId == null) {
      userId = uid;
    }
    print(userId);

    var connectivityResult = await (Connectivity().checkConnectivity());
    if (prefs.get('nickname') != null &&
        prefs.get('signature') != null &&
        prefs.get('headPortrait') != null &&
        uid == userId) {
      getPersonalInfo(); //get缓存

      if (connectivityResult == ConnectivityResult.none) {
        tipwords = '没有可查看的动态哦~';
        Fluttertoast.showToast(msg: "网络未连接，请连接网络重试");
      } else {
        try {
          Response response = await Dio()
              .get("http://api.mashiro.online/center/getMeArticle?uid=$userId");
          // 让数据变化，然后响应式渲染
          if (response.data["code"] == 200) {
            if (response.data["data"].length == 0) {
              tipwords = '没有可查看的动态哦~';
            }
            this._dataList = response.data["data"];
            setState(() {});
          }
        } catch (e) {
          print(e);
        }
      }
    } else {
      if (connectivityResult == ConnectivityResult.none) {
        tipwords = '没有可查看的动态哦~';
        Fluttertoast.showToast(msg: "网络未连接，请连接网络重试");
      } else {
        try {
          Response response = await Dio()
              .get("http://api.mashiro.online/center/getMeArticle?uid=$userId");
          // 让数据变化，然后响应式渲染
          if (response.data["code"] == 200) {
            if (response.data["data"].length == 0) {
              tipwords = '没有可查看的动态哦~';
            }
            this._dataList = response.data["data"];
            this.aUserName = response.data["profile"]["name"];
            this.aQianName = response.data["profile"]["bio"];
            this.avatarUrl = response.data["profile"]["url"];
            print(avatarUrl);
            if (uid == userId) {
              savePersonalInfo(); //本人缓存
            }
            setState(() {});
          }
        } catch (e) {
          print(e);
        }
      }
    }
  }

  // 修改昵称和个签的请求
  void _modifyInfo() async {
    try {
      Response responseName = await Dio().post(
        "http://api.mashiro.online/update/updateName",
        data: {"uid": userId, "uname": _unameController.text.trim()},
        options: Options(contentType: 'application/x-www-form-urlencoded'),
      );
      Response responseDio = await Dio().post(
        "http://api.mashiro.online/update/updateBio",
        data: {"uid": userId, "bio": _signatureController.text.trim()},
        options: Options(contentType: 'application/x-www-form-urlencoded'),
      );
      // 让数据变化，然后响应式渲染
      if (responseDio.data["code"] == 200 && responseName.data["code"] == 200) {
        print(responseDio.data);

        aUserName = _unameController.text.trim();
        aQianName = _signatureController.text.trim();
        savePersonalInfo(); //缓存
        _signatureController.clear();
        _unameController.clear();
        // 更新信息
        user_info.UserInfo user = new user_info.UserInfo();
        user.id = userId;
        user.name = aUserName.trim();
        user.portraitUrl = this.avatarUrl;
        user_info.UserInfoDataSource.setUserInfo(user);
        print('-昵称bio更新完-');
        setState(() {});
      }
    } catch (e) {
      print(e);
    }
  }

  // 相册
  Future chooseImage() async {
    // 获取用户id
    SharedPreferences prefs = await SharedPreferences.getInstance();
    //判断是否有值
    if (prefs.getString('id') != null && userId == null) {
      userId = prefs.getString('id');
    }
    final pickedFile =
        await ImagePicker().getImage(source: ImageSource.gallery);

    if (pickedFile != null) {
      String path = File(pickedFile.path).path;
      var name = path.substring(path.lastIndexOf("/") + 1, path.length);
      var image = await MultipartFile.fromFile(
        path,
        filename: name,
      );
      FormData formData = FormData.fromMap({"avatar": image, "uid": userId});

      try {
        Response responseAvatar = await Dio().post(
          "http://api.mashiro.online/update/updateAvatar",
          data: formData,
          options: Options(contentType: 'multipart-formdata'),
        );
        this.avatarUrl = responseAvatar.data["url"];
        savePersonalInfo(); //缓存
        // 更新信息
        user_info.UserInfo user = new user_info.UserInfo();
        user.id = userId;
        user.name = aUserName.trim();
        user.portraitUrl = avatarUrl;
        user_info.UserInfoDataSource.setUserInfo(user);
        print('-avatar更新完-');
        setState(() {});
      } catch (e) {
        print(e);
      }
    } else {
      print('No image selected.');
    }
  }

  // 拍照
  Future getImage() async {
    // 获取用户id
    SharedPreferences prefs = await SharedPreferences.getInstance();
    //判断是否有值
    if (prefs.getString('id') != null && userId == null) {
      userId = prefs.getString('id');
    }
    final pickedFile = await ImagePicker().getImage(source: ImageSource.camera);

    if (pickedFile != null) {
      String path = File(pickedFile.path).path;
      var name = path.substring(path.lastIndexOf("/") + 1, path.length);
      var image = await MultipartFile.fromFile(
        path,
        filename: name,
      );
      FormData formData = FormData.fromMap({"avatar": image, "uid": userId});

      try {
        Response responseAvatar = await Dio().post(
          "http://api.mashiro.online/update/updateAvatar",
          data: formData,
          options: Options(contentType: 'multipart-formdata'),
        );
        this.avatarUrl = responseAvatar.data["url"];
        savePersonalInfo(); //缓存
        // 更新信息
        user_info.UserInfo user = new user_info.UserInfo();
        user.id = userId;
        user.name = aUserName.trim();
        user.portraitUrl = avatarUrl;
        user_info.UserInfoDataSource.setUserInfo(user);
        print('-avatar更新完-');
        setState(() {});
      } catch (e) {
        print(e);
      }
    } else {
      print('No image selected.');
    }
  }

  //自定义方法
  Widget _getListData(context, index) {
    //获取月份和日
    var time = _dataList[index]['publishTime'];
    var times = DateTime.parse(time);
    dynamic month = times.month;
    dynamic day = times.day;
    //判断是否小于10前面添加0
    if (day < 10) {
      day = '0$day';
    }
    if (month < 10) {
      day = '0$month';
    }
    //返回的模板
    return ListView(
      //解决ListView里面嵌套ListView的问题
      shrinkWrap: true, //解决无限高度问题
      physics: new NeverScrollableScrollPhysics(),
      children: <Widget>[
        Row(
          children: <Widget>[
            //日
            Container(
              margin: EdgeInsets.only(left: 20, top: 18),
              child: Text(
                '$day',
                style: TextStyle(fontSize: 26, color: Colors.black),
              ),
            ),
            //月
            Container(
              margin: EdgeInsets.only(top: 18),
              child: Text(
                '$month月',
                style: TextStyle(fontSize: 12, color: Colors.black),
                textAlign: TextAlign.end,
              ),
            ),
            //发布内容
            Expanded(
              child: Container(
                color: Colors.grey[300],
                margin: EdgeInsets.only(left: 20, top: 18, right: 20),
                padding: EdgeInsets.all(4),
                child: InkWell(
                  child: Text(
                    _dataList[index]['content'],
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  onTap: () {
                    showDialog(
                      context: context,
                      barrierDismissible: true, //// user must tap button!
                      builder: (BuildContext context) {
                        return AlertDialog(
                          content: Text(_dataList[index]['content']),
                        );
                      },
                    );
                  },
                ),
              ),
            )
          ],
        ),

        //删除按钮
        widget.editable
            ? InkWell(
                onTap: () {
                  showDialog(
                      context: context,
                      barrierDismissible: false, //// user must tap button!
                      builder: (BuildContext context) {
                        return AlertDialog(
                          title: Text('提示'),
                          content: Text('是否删除?'),
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
                                // 更新状态、数据
                                this.uid = userId;
                                this.cid = _dataList[index]['cid'];
                                _dataList.removeAt(index);
                                print('-deleteArticle-');
                                Dio().delete(
                                  "http://api.mashiro.online/delete/deleteArticle",
                                  data: {"uid": this.uid, "cid": this.cid},
                                  options: Options(
                                      contentType:
                                          'application/x-www-form-urlencoded'),
                                );
                                Navigator.of(context).pop(true);
                                setState(() {});
                              },
                            ),
                          ],
                        );
                      });
                  // print(index);
                },
                child: Container(
                  alignment: Alignment(1, -1),
                  padding: EdgeInsets.only(right: 20),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.end, //水平居右对齐
                    children: <Widget>[
                      Icon(
                        Icons.delete_forever,
                        color: Colors.grey,
                        size: 14.0,
                      ),
                      Text(
                        '删除',
                        // textAlign: TextAlign.right,
                        style: TextStyle(
                          fontSize: 12.0,
                          color: Colors.grey[600],
                        ),
                      ),
                    ],
                  ),
                ),
              )
            : SizedBox.shrink(),
      ],
    );
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        actions: [
          widget.editable
              ? IconButton(
                  padding: EdgeInsets.only(top: 2.0, right: 15.0),
                  icon: Icon(
                    Icons.settings,
                    size: 26.0,
                  ),
                  onPressed: () {
                    Navigator.push(
                      context,
                      new MaterialPageRoute(
                        builder: (context) => new SettingPages(),
                      ),
                    );
                  },
                )
              : IconButton(
                  padding: EdgeInsets.only(top: 2.0, right: 15.0),
                  icon: Icon(
                    ThirdPartyIcons.EnterChatConversation,
                    size: 24.0,
                    color: Colors.white,
                  ),
                  onPressed: () {
                    _onTapUser(context, this.userId, this.aUserName);
                  },
                ),
        ],
        title: Text('个人中心'),
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
        child: new ListView(
          children: <Widget>[
            Row(
              children: <Widget>[
                Expanded(
                  child: new Container(
                    height: 260,
                    decoration: new BoxDecoration(
                      image: new DecorationImage(
                        image: new AssetImage('assets/images/personal_bg.jpg'),
                        centerSlice:
                            new Rect.fromLTRB(270.0, 180.0, 1360.0, 730.0),
                      ),
                    ),
                    child: new Column(
                      children: <Widget>[
                        new Container(
                          // height: 20,
                          margin: EdgeInsets.only(top: 60.0),
                          // color: Colors.yellow,
                          child: Stack(
                            overflow: Overflow.clip,
                            alignment: Alignment.center,
                            children: [
                              Container(
                                width: 80,
                                height: 80,
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(40),
                                  boxShadow: [
                                    BoxShadow(
                                      color: Colors.black12, //底色,阴影颜色
                                      // color: Colors.red, //底色,阴影颜色
                                      offset: Offset(0, 0.2), //阴影位置,从什么位置开始
                                      blurRadius: 2, // 阴影模糊层度
                                      spreadRadius: 4, //阴影模糊大小
                                    )
                                  ],
                                ),
                                child: ClipRRect(
                                  borderRadius: BorderRadius.circular(40),
                                  child: Container(
                                    width: 80,
                                    height: 80,
                                    child: CachedNetworkImage(
                                      fit: BoxFit.cover,
                                      imageUrl: avatarUrl,
                                    ),
                                  ),
                                ),
                              ),
                              Positioned(
                                right: 2,
                                bottom: 2,
                                child: widget.editable
                                    ? Container(
                                        width: 20,
                                        height: 20,
                                        decoration: BoxDecoration(
                                            color: Colors.white,
                                            borderRadius: BorderRadius.all(
                                                Radius.circular(12))),
                                        child: IconButton(
                                          padding: EdgeInsets.only(right: 0),
                                          icon: Icon(
                                            Icons.filter,
                                            color: Colors.indigo[400],
                                            size: 14,
                                          ),
                                          //头像按钮
                                          onPressed: () {
                                            // getImage();
                                            showDialog(
                                              context: context,
                                              barrierDismissible:
                                                  true, //点击遮罩不关闭对话框
                                              // Navigator.of(context).pop(true);
                                              builder: (context) {
                                                return AlertDialog(
                                                  //圆形
                                                  title: Text(
                                                    '更换头像',
                                                    textAlign: TextAlign.center,
                                                    style: TextStyle(
                                                      color: Colors
                                                          .teal[300], // 文字颜色
                                                    ),
                                                  ),
                                                  backgroundColor: Colors.white,
                                                  content: Column(
                                                    mainAxisSize:
                                                        MainAxisSize.min,
                                                    children: <Widget>[
                                                      Row(
                                                        children: <Widget>[
                                                          Container(
                                                            margin:
                                                                EdgeInsets.only(
                                                              left: 16,
                                                              bottom: 16,
                                                            ),
                                                            // width: 100,
                                                            width: 80,
                                                            height: 80,
                                                            decoration:
                                                                BoxDecoration(
                                                                    gradient:
                                                                        const LinearGradient(
                                                                            colors: [
                                                                          Color(
                                                                              0xff6CC6CB),
                                                                          Color(
                                                                              0xffEAE5C9),
                                                                        ]),
                                                                    borderRadius:
                                                                        BorderRadius.circular(
                                                                            40)),
                                                            child: FlatButton(
                                                              // color: Colors.blue,
                                                              highlightColor:
                                                                  Colors.blue[
                                                                      700],
                                                              colorBrightness:
                                                                  Brightness
                                                                      .dark,
                                                              splashColor:
                                                                  Colors.grey,
                                                              child: IconButton(
                                                                  icon: Icon(
                                                                    Icons
                                                                        .camera_alt,
                                                                    color: Colors
                                                                        .white,
                                                                  ),
                                                                  tooltip: '相机',
                                                                  iconSize: 30,
                                                                  onPressed:
                                                                      null),
                                                              shape: RoundedRectangleBorder(
                                                                  borderRadius:
                                                                      BorderRadius
                                                                          .circular(
                                                                              40.0)),

                                                              onPressed: () {
                                                                getImage();
                                                                Navigator.of(
                                                                        context)
                                                                    .pop(true);
                                                              },
                                                            ),
                                                          ),
                                                          Container(
                                                            margin:
                                                                EdgeInsets.only(
                                                              left: 40,
                                                              bottom: 16,
                                                            ),
                                                            width: 80,
                                                            height: 80,
                                                            decoration:
                                                                BoxDecoration(
                                                                    gradient:
                                                                        const LinearGradient(
                                                                            colors: [
                                                                          Color(
                                                                              0xff6CC6CB),
                                                                          Color(
                                                                              0xffEAE5C9),
                                                                        ]),
                                                                    borderRadius:
                                                                        BorderRadius.circular(
                                                                            40)),
                                                            child: FlatButton(
                                                              // color: Colors.blue,
                                                              highlightColor:
                                                                  Colors.blue[
                                                                      700],
                                                              colorBrightness:
                                                                  Brightness
                                                                      .dark,
                                                              splashColor:
                                                                  Colors.grey,
                                                              child: IconButton(
                                                                  icon: Icon(
                                                                    Icons
                                                                        .photo_library,
                                                                    color: Colors
                                                                        .white,
                                                                  ),
                                                                  iconSize: 30,
                                                                  tooltip: '相册',
                                                                  onPressed:
                                                                      null),
                                                              shape: RoundedRectangleBorder(
                                                                  borderRadius:
                                                                      BorderRadius
                                                                          .circular(
                                                                              20.0)),

                                                              onPressed: () {
                                                                chooseImage();
                                                                Navigator.of(
                                                                        context)
                                                                    .pop(true);
                                                              },
                                                            ),
                                                          )
                                                        ],
                                                      )
                                                    ],
                                                  ),
                                                );
                                              },
                                            );
                                          },
                                        ),
                                      )
                                    : SizedBox.shrink(),
                              )
                            ],
                          ),
                        ),
                        Container(
                          height: 120,
                          // color: Colors.blue,
                          child: Column(
                            children: <Widget>[
                              Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: <Widget>[
                                  Container(
                                    padding: widget.editable
                                        ? EdgeInsets.only(
                                            left: 50.0, top: 10.0, bottom: 10.0)
                                        : EdgeInsets.only(
                                            left: 0.0, top: 10.0, bottom: 10.0),
                                    child: Text(
                                      this.aUserName,
                                      style: TextStyle(
                                          fontSize: 20, color: Colors.white),
                                    ),
                                  ),
                                  widget.editable
                                      ? IconButton(
                                          icon: Icon(
                                            // Icons.rate_review,
                                            ThirdPartyIcons
                                                .PersonalInformationEditor,
                                            color: Colors.white70,
                                            size: 16,
                                          ),
                                          //用户名按钮
                                          onPressed: () {
                                            _unameController.text = aUserName;
                                            _signatureController.text =
                                                aQianName;
                                            showDialog(
                                              context: context,
                                              barrierDismissible:
                                                  true, //点击遮罩不关闭对话框
                                              builder: (context) {
                                                return AlertDialog(
                                                  content: Column(
                                                    mainAxisSize:
                                                        MainAxisSize.min,
                                                    children: <Widget>[
                                                      TextField(
                                                        controller:
                                                            _unameController,
                                                        decoration:
                                                            InputDecoration(
                                                                labelText: "昵称",
                                                                hintText:
                                                                    "请输入新的用户名",
                                                                prefixIcon:
                                                                    Icon(
                                                                  ThirdPartyIcons
                                                                      .NicknameEditor,
                                                                )),
                                                      ),
                                                      TextField(
                                                        controller:
                                                            _signatureController,
                                                        decoration: InputDecoration(
                                                            labelText: "个性签名",
                                                            hintText:
                                                                "请输入新的个性签名",
                                                            prefixIcon: Icon(
                                                                ThirdPartyIcons
                                                                    .SignatureEditor)),
                                                      ),
                                                      Container(
                                                        margin: EdgeInsets.only(
                                                            top: 20),
                                                        width: 100,
                                                        height: 40,
                                                        decoration:
                                                            BoxDecoration(
                                                                gradient:
                                                                    const LinearGradient(
                                                                        colors: [
                                                                      Color(
                                                                          0xff5eb680),
                                                                      Color(
                                                                          0xff00acb6),
                                                                      Color(
                                                                          0xff00acb6),
                                                                    ]),
                                                                borderRadius:
                                                                    BorderRadius
                                                                        .circular(
                                                                            10)),
                                                        child: FlatButton(
                                                          // color: Colors.blue,
                                                          highlightColor:
                                                              Colors.blue[700],
                                                          colorBrightness:
                                                              Brightness.dark,
                                                          splashColor:
                                                              Colors.grey,
                                                          child: Text("修改"),
                                                          shape: RoundedRectangleBorder(
                                                              borderRadius:
                                                                  BorderRadius
                                                                      .circular(
                                                                          20.0)),
                                                          onPressed: () {
                                                            if (_unameController
                                                                .text
                                                                .trim()
                                                                .isEmpty) {
                                                              Fluttertoast
                                                                  .showToast(
                                                                      msg:
                                                                          "昵称不能为空哦~");
                                                            } else {
                                                              _modifyInfo();
                                                              Navigator.of(
                                                                      context)
                                                                  .pop(true);
                                                            }
                                                          },
                                                        ),
                                                      ),

                                                      // CircularProgressIndicator(),
                                                      // Padding(
                                                      //     padding: const EdgeInsets.only(
                                                      //         top: 26.0),
                                                      //     child: TextField())
                                                    ],
                                                  ),
                                                );
                                              },
                                            );
                                          },
                                        )
                                      : SizedBox.shrink()
                                ],
                              ),
                              Text(
                                this.aQianName,
                                style: TextStyle(
                                    fontSize: 16, color: Colors.cyan[300]),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
            this._dataList.length == 0
                ? Text(
                    this.tipwords,
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.grey),
                  )
                : ListView.builder(
                    shrinkWrap: true, //解决无限高度问题
                    physics: new NeverScrollableScrollPhysics(),
                    itemCount: _dataList.length,
                    itemBuilder: this._getListData),
            Container(height: 80.0)
          ],
        ),
      ),
    );
  }
}
