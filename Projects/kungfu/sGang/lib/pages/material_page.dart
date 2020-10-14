import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import '../im/util/http_util.dart';

import 'package:shared_preferences/shared_preferences.dart';

class UserTestRoute extends StatefulWidget {
  var arguments;
  UserTestRoute({Key key, this.arguments}) : super(key: key);
  @override
  _UserTestRouteState createState() =>
      new _UserTestRouteState(arguments: this.arguments);
}

class _UserTestRouteState extends State<UserTestRoute> {
  var arguments;
  _UserTestRouteState({this.arguments});

  @override
  Widget build(BuildContext context) {
    return UserInfoInput(this.arguments);
  }
}

class UserInfoInput extends StatefulWidget {
  var arguments;
  UserInfoInput(this.arguments);

  @override
  _UserInfoInputState createState() => _UserInfoInputState(arguments);
}

class _UserInfoInputState extends State<UserInfoInput> {
  var arguments;
  _UserInfoInputState(this.arguments);

  String userId; // id
  String userName; // 昵称
  String uFullName; // 姓名
  String userAge; // 年龄
  String userSchool; // 学校
  String userResume; // 学位
  String userDegree; // 个人简介

  // 用于接收输入框的内容
  TextEditingController _unameController = new TextEditingController();
  TextEditingController _ufullnameController = new TextEditingController();
  TextEditingController _ageController = new TextEditingController();
  TextEditingController _schoolController = new TextEditingController();
  TextEditingController _degreeController = new TextEditingController();
  TextEditingController _resumeController = new TextEditingController();
  GlobalKey _formKey = new GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
    // 从缓存获取用户的id
    initPlatformState();
  }

  initPlatformState() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    this.userId = prefs.get("id"); // id码
    _getUserInfo();
  }

  _getUserInfo() {
    HttpUtil.get("http://124.71.6.95/r_api.php?m=2002&id=$userId", (data) {
      // 返回200 获取用户数据成功 进行回显
      if (data[0]["code"] == 200) {
        this.userName = data[0]['name']; // 昵称
        this.uFullName = data[0]['fullname']; // 姓名
        this.userAge = data[0]['age']; // 年龄
        this.userSchool = data[0]['j_info']['school']; // 学校
        this.userDegree = data[0]['j_info']['degree']; // 学位
        this.userResume = data[0]['j_info']['resume']; // 个人简介
        setState(() {
          _unameController.text = this.userName;
          _ufullnameController.text = this.uFullName;
          _ageController.text = this.userAge;
          _schoolController.text = this.userSchool;
          _degreeController.text = this.userDegree;
          _resumeController.text = this.userResume;
        });
      }
    });
  }

  // 保存用户名到本地缓存
  void _saveUserInfo(String name) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString("name", name); // 用户名
  }

  @override
  Widget build(BuildContext context) {
    FocusNode _age = FocusNode();
    FocusNode _fullname = FocusNode();
    FocusNode _school = FocusNode();
    FocusNode _resume = FocusNode();
    FocusNode _degree = FocusNode();

    return Scaffold(
      // resizeToAvoidBottomPadding: false,
      floatingActionButton: new FloatingActionButton(
        onPressed: () async {
          if ((_formKey.currentState as FormState).validate()) {
            // 提交用户新的资料
            var response = await Dio().post(
                'http://124.71.6.95/r_api.php?m=1005&id=$userId&school=${_schoolController.text}&degree=${_degreeController.text}&resume=${_resumeController.text}&fullname=${_ufullnameController.text}&name=${_unameController.text}&age=${_ageController.text}');
            var result = response.data;
            // 提交成功返回200
            if (result[0]['code'] == 200) {
              // 把新的用户名存入本地缓存
              _saveUserInfo(result[0]['rong_result'][0]['name']);
              Navigator.pushReplacementNamed(context, '/home');
            }
          }
        },
        child: new Text(
          '提交',
        ),
        backgroundColor: Color(0xffc8a675),
      ),
      appBar: AppBar(
        title: Text(
          "录入个人资料",
          style: TextStyle(
            color: Colors.black,
          ),
        ),
        backgroundColor: Color(0xffc8a675),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0),
          child: Form(
            key: _formKey, //设置globalKey，用于后面获取FormState
            autovalidate: true, //开启自动校验
            child: Column(
              children: <Widget>[
                // 昵称
                SizedBox(height: 20.0),
                Container(
                  height: 80,
                  child: TextFormField(
                    controller: _unameController,
                    decoration: InputDecoration(
                      labelText: "昵称",
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(80.0),
                      ),
                      helperText: "请输入您的昵称",
                    ),
                    onEditingComplete: () {
                      FocusScope.of(context).requestFocus(_fullname);
                    },
                    textAlign: TextAlign.center,
                    // 校验
                    validator: (v) {
                      return v.trim().length > 0 ? null : "昵称不能为空";
                    },
                  ),
                ),
                // 姓名
                SizedBox(height: 20.0),
                Container(
                  height: 80,
                  child: TextFormField(
                    focusNode: _fullname,
                    controller: _ufullnameController,
                    decoration: InputDecoration(
                      labelText: "姓名",
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(80.0),
                      ),
                      helperText: "请输入您的姓名",
                    ),
                    onEditingComplete: () {
                      FocusScope.of(context).requestFocus(_age);
                    },
                    textAlign: TextAlign.center,
                    // 校验
                    validator: (v) {
                      return v.trim().length > 0 ? null : "姓名不能为空";
                    },
                  ),
                ),
                // 年龄
                SizedBox(height: 20.0),
                Container(
                  height: 80,
                  child: TextFormField(
                      focusNode: _age,
                      controller: _ageController,
                      decoration: InputDecoration(
                        labelText: "年龄",
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(80.0),
                        ),
                        helperText: "请输入您的年龄",
                      ),
                      onEditingComplete: () {
                        print("=============");
                        FocusScope.of(context).requestFocus(_school);
                      },
                      textAlign: TextAlign.center,
                      keyboardType: TextInputType.number,
                      // 校验
                      validator: (v) {
                        return v.trim().length > 0 ? null : "年龄不能为空";
                      }),
                ),
                // 学校
                SizedBox(height: 20.0),
                Container(
                  height: 80,
                  child: TextFormField(
                      focusNode: _school,
                      controller: _schoolController,
                      decoration: InputDecoration(
                        labelText: "学校",
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(80.0),
                        ),
                        helperText: "请输入您的学校",
                      ),
                      onEditingComplete: () {
                        FocusScope.of(context).requestFocus(_resume);
                      },
                      textAlign: TextAlign.center,
                      // 校验
                      validator: (v) {
                        return v.trim().length > 0 ? null : "学校不能为空";
                      }),
                ),
                // 学位
                SizedBox(height: 20.0),
                Container(
                  height: 80,
                  child: TextFormField(
                      focusNode: _resume,
                      controller: _degreeController,
                      decoration: InputDecoration(
                        labelText: "学位",
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(80.0),
                        ),
                        helperText: "请输入您的学位",
                      ),
                      onEditingComplete: () {
                        FocusScope.of(context).requestFocus(_degree);
                      },
                      textAlign: TextAlign.center,
                      // 校验
                      validator: (v) {
                        return v.trim().length > 0 ? null : "学位不能为空";
                      }),
                ),
                // 简介
                SizedBox(height: 20.0),
                Container(
                  child: TextFormField(
                      focusNode: _degree,
                      controller: _resumeController,
                      decoration: InputDecoration(
                        labelText: "个人简介",
                        helperText: "请输入您的个人简介",
                      ),
                      keyboardType: TextInputType.multiline,
                      maxLines: 3,
                      validator: (v) {
                        return v.trim().length > 0 ? null : "个人简介不能为空";
                      }),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
