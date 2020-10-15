import 'package:flutter/material.dart';
import '../im/util/http_util.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'dart:developer' as developer;

import 'home_page.dart';

class LoginPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return new _LoginPageState();
  }
}

class _LoginPageState extends State<LoginPage> {
  var userInfos;
  String pageName = "example.LoginPage";
  TextEditingController _assount = TextEditingController();
  TextEditingController _password = TextEditingController();

  @override
  void initState() {
    super.initState();
    initPlatformState();
  }

  initPlatformState() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String phone = prefs.get("phone");
    String password = prefs.get("password");

    _assount.text = phone;
    _password.text = password;
  }

  void _loginAction() {
    Map map = new Map();
    map["region"] = 86;
    map["phone"] = _assount.text;
    map["password"] = _password.text;
    String _tel = map["phone"];
    String _pwd = map["password"];
    HttpUtil.post("http://124.71.6.95/r_api.php?m=1004&tel=$_tel&pwd=$_pwd",
        (data) {
      if (data != null) {
        var body = data[0];
        int errorCode = body["code"];
        if (errorCode == 200) {
          String id = body["a_id"];
          String token = body["token"];
          // 传入用户信息(保存到SharedPreferences)
          _saveUserInfo(id, token,
              name: body["name"],
              portrait: body['portrait'],
              identity: body['identity'],
              onetime: body['onetime'],
              status: body['status']);
          developer.log("Login Success, $map", name: pageName);
          print("=========================login");
          print(body);
          // Navigator.pushReplacementNamed(context, "/home");
          // Navigator.of(context).pushNamedAndRemoveUntil(
          //     "/home", (Route<dynamic> route) => false);
          Navigator.of(context).pushAndRemoveUntil(
              new MaterialPageRoute(builder: (context) => new HomePage()),
              (check) => false);
          // Navigator.pushReplacementNamed(context, '/home');
        } else if (errorCode == -1) {
          Fluttertoast.showToast(msg: "网络未连接，请连接网络重试");
        } else {
          Fluttertoast.showToast(msg: "账号或密码错误");
        }
      } else {
        developer.log("data is null", name: pageName);
      }
    });
  }

  // 接收登录时传过来的用户信息
  void _saveUserInfo(String id, String token,
      {String name,
      String portrait,
      String identity,
      String onetime,
      String status}) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString("id", id); // id
    prefs.setString("token", token); // token
    prefs.setString("phone", _assount.text); // 手机号码
    prefs.setString("password", _password.text); // 密码
    prefs.setString("name", name); // 用户名
    prefs.setString("portrait", portrait); // 头像
    prefs.setString("identity", identity); // 身份
    prefs.setString("onetime", onetime); // 注册时间
    prefs.setString("status", status); // 账号状态
  }

  @override
  Widget build(BuildContext context) {
    FocusNode _pwd = FocusNode();

    final logo = new Hero(
      tag: 'hero',
      child: Container(
          width: 100,
          height: 100,
          child: ClipOval(child: Image.asset("assets/images/logo.png"))),
    );

    final account = Container(
      child: TextFormField(
        keyboardType: TextInputType.number,
        controller: _assount,
        decoration: InputDecoration(
          labelText: "账号",
          contentPadding: EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(32.0),
          ),
        ),
        onEditingComplete: () {
          FocusScope.of(context).requestFocus(_pwd);
        },
        textAlign: TextAlign.center,
      ),
    );

    final password = Container(
      child: TextFormField(
        focusNode: _pwd,
        obscureText: true,
        controller: _password,
        decoration: InputDecoration(
          labelText: "密码",
          contentPadding: EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(32.0),
          ),
        ),
        textAlign: TextAlign.center,
      ),
    );
    final loginButton = Padding(
      padding: EdgeInsets.symmetric(vertical: 16.0),
      child: MaterialButton(
        onPressed: () {
          _loginAction();
        },
        padding: EdgeInsets.all(12.0),
        color: const Color(0xffc8a675),
        textColor: Colors.white,
        child: Text('登 录', style: TextStyle(fontSize: 17)),
        shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(80.0) //设置圆角
            ),
      ),
    );
    final zcButton = FlatButton(
      onPressed: () {
        Navigator.pushNamed(context, "/register");
        // Navigator.push(context, MaterialPageRoute(builder: (_) {
        //   return new SecondPage();
        // }));
      },
      child: Text("立即注册"),
    );
    return Scaffold(
      appBar: AppBar(
        title: Center(
          child: Text('登录'),
        ),
      ),
      body: Container(
        child: Center(
          child: ListView(
            shrinkWrap: true,
            padding: EdgeInsets.only(left: 24.0, right: 24.0),
            children: <Widget>[
              logo,
              SizedBox(height: 48.0),
              account,
              SizedBox(
                height: 20.0,
              ),
              password,
              SizedBox(
                height: 24.0,
              ),
              loginButton,
              zcButton
            ],
          ),
        ),
      ),
    );
  }
}
