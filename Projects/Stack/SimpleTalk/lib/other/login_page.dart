import 'dart:math';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'home_page.dart';
import 'dart:developer' as developer;
import 'package:crypto/crypto.dart';
import 'dart:convert';
import 'package:dio/dio.dart';

class LoginPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return new _LoginPageState();
  }
}

class _LoginPageState extends State<LoginPage> {
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

  Future<void> _loginAction() async {
    Map map = new Map();
    map["password"] = _password.text;
    // appkey
    var appkey = 'pwe86ga5p9ee6';
    // 时间戳
    var timestamp = DateTime.now().millisecondsSinceEpoch;
    // 随机数
    var nonce =
        '${new Random().nextInt(10)}${new Random().nextInt(10)}${new Random().nextInt(10)}${new Random().nextInt(10)}${new Random().nextInt(10)}${new Random().nextInt(10)}';
    // 签名
    var sign = sha1
        .convert(utf8.encode('tKx1LwuS2z7I3C' + nonce + timestamp.toString()));
    Map params = {
      "userId": _assount.text,
      "name": _assount.text,
      "portraitUri": 'http://cdn.pihun.cn/red/368/3/3db5305ac.png'
    };

    Response response = await Dio().post(
      "https://api-cn.ronghub.com/user/getToken.json",
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

    print(response.data);
    String id = response.data["userId"];
    String token = response.data["token"];
    _saveUserInfo(id, token);
    developer.log("Login Success, $map", name: pageName);
    Navigator.of(context).pushAndRemoveUntil(
        new MaterialPageRoute(builder: (context) => new HomePage()),
        (route) => route == null);
  }

  void _saveUserInfo(String id, String token) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString("id", id);
    prefs.setString("token", token);
    prefs.setString("phone", _assount.text);
    prefs.setString("password", _password.text);
  }

  @override
  Widget build(BuildContext context) {
    final logo = new Hero(
      tag: 'hero',
      child: Container(
        width: 100,
        height: 100,
        child: Image.asset('assets/images/logo2.png'),
      ),
    );

    final account = TextFormField(
      keyboardType: TextInputType.number,
      autofocus: false,
      controller: _assount,
      decoration: InputDecoration(
          hintText: 'SealTalk 账号',
          contentPadding: new EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
          border:
              OutlineInputBorder(borderRadius: BorderRadius.circular(32.0))),
    );

    // final password = TextFormField(
    //   autofocus: false,
    //   obscureText: true,
    //   controller: _password,
    //   decoration: InputDecoration(
    //       hintText: 'SealTalk 密码',
    //       contentPadding: EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
    //       border:
    //           OutlineInputBorder(borderRadius: BorderRadius.circular(32.0))),
    // );

    final loginButton = Padding(
      padding: EdgeInsets.symmetric(vertical: 16.0),
      child: MaterialButton(
        minWidth: 200.0,
        height: 42.0,
        onPressed: () {
          _loginAction();
        },
        color: Colors.blueGrey,
        child: Text(
          '登 录',
          style: TextStyle(color: Colors.white),
        ),
      ),
    );

    return Scaffold(
      appBar: AppBar(
        title: Text("登录"),
        flexibleSpace: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [Colors.blueAccent, Colors.redAccent],
            ),
          ),
        ),
      ),
      body: Center(
          child: ListView(
        shrinkWrap: true,
        padding: EdgeInsets.only(left: 24.0, right: 24.0),
        children: <Widget>[
          logo,
          SizedBox(height: 48.0),
          account,
          SizedBox(
            height: 8.0,
          ),
          SizedBox(
            height: 24.0,
          ),
          loginButton
        ],
      )),
    );
  }
}
