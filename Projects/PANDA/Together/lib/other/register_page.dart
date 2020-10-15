import 'package:flutter/material.dart';
import '../im/util/http_util.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'login_page.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'dart:developer' as developer;

class RegisterPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return new _RegisterPageState();
  }
}

class _RegisterPageState extends State<RegisterPage> {
  String pageName = "example.RegisterPage";
  TextEditingController _assount = TextEditingController();
  TextEditingController _password = TextEditingController();

  @override
  void initState() {
    super.initState();
    initPlatformState();
  }

  // 初始化 [空]
  initPlatformState() async {
    // SharedPreferences prefs = await SharedPreferences.getInstance();
    // String uid = prefs.get("uid");
    // String password = prefs.get("password");

    _assount.text = '';
    _password.text = '';
  }

  // 账号规则判断
  // ignore: non_constant_identifier_names
  Map _AccRegExp(String val) {
    Map result = new Map();
    RegExp _accR = new RegExp(r"^[a-z0-9A-Z_-]{5,16}$");
    bool flag = _accR.hasMatch(val);
    result["state"] = flag;
    if (flag) {
      result["msg"] = '账号格式正确';
    } else {
      if (val.length < 5 || val.length > 16) {
        result["msg"] = '账号应该在5-16位';
      } else {
        result["msg"] = '账号只能含数字、字母、特殊符号-_的组合';
      }
    }
    return result;
  }

  //注册操作
  void _registerAction() {
    Map map = new Map();
    map["uid"] = _assount.text;
    map["password"] = _password.text;

    if (map["uid"].trim().isNotEmpty && map["password"].trim().isNotEmpty) {
      Map result = _AccRegExp(map["uid"]);
      print(result);
      if (result["state"]) {
        if (map["password"].length >= 6 && map["password"].length <= 18) {
          HttpUtil.post("http://api.mashiro.online/register", (data) {
            if (data != null) {
              Map body = data;
              int errorCode = body["code"];
              if (errorCode == 200) {
                Fluttertoast.showToast(msg: "${body["message"]}");
                Map result = body["data"];
                String id = result["id"];
                String token = result["token"];
                _saveUserInfo(id, token);
                developer.log("Login Success, $map", name: pageName);
                _loginJump(); //跳转登录
              } else if (errorCode == 400) {
                Fluttertoast.showToast(msg: "用户已存在");
              } else if (errorCode == -1) {
                Fluttertoast.showToast(msg: "网络未连接，请连接网络重试");
              } else {
                Fluttertoast.showToast(msg: "注册失败！未知错误，请重新尝试");
              }
            } else {
              developer.log("data is null", name: pageName);
            }
          }, params: map);
        } else {
          Fluttertoast.showToast(msg: "密码应该在6-18位");
        }
      } else {
        Fluttertoast.showToast(msg: "${result["msg"]}");
      }
    } else {
      Fluttertoast.showToast(msg: "账号或密码不能为空");
    }
  }

  // 跳转登录
  void _loginJump() {
    Navigator.of(context).pushAndRemoveUntil(
      // RegisterPage向右切出
      PageRouteBuilder(
          transitionDuration: Duration(milliseconds: 800), //用时
          pageBuilder: (context, animation, secondaryAnimation) =>
              new RegisterPage(),
          transitionsBuilder: (context, animation, secondaryAnimation, child) {
            return SlideTransition(
              position: animation.drive(
                  Tween(begin: Offset(-0.0, 0.0), end: Offset(1.0, 0.0))
                      .chain(CurveTween(curve: Curves.ease))),
              child: child,
            );
          }),
      (route) => route == null,
    );
    Navigator.of(context).pushAndRemoveUntil(
      // LoginPage向右切入
      PageRouteBuilder(
          transitionDuration: Duration(milliseconds: 600), //用时
          pageBuilder: (context, animation, secondaryAnimation) =>
              new LoginPage(),
          transitionsBuilder: (context, animation, secondaryAnimation, child) {
            return SlideTransition(
              position: animation.drive(
                  Tween(begin: Offset(-1.0, 0.0), end: Offset(0.0, 0.0))
                      .chain(CurveTween(curve: Curves.ease))),
              child: child,
            );
          }),
      (route) => route == null,
    );
  }

  // 设置缓存信息
  void _saveUserInfo(String id, String token) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString("id", id);
    prefs.setString("token", token);
    prefs.setString("uid", _assount.text);
    prefs.setString("password", _password.text);
  }

  @override
  Widget build(BuildContext context) {
    final logo = Container(
      width: 100,
      height: 100,
      child: Image.asset(
        'assets/images/our_logo.png',
        scale: 4.0,
      ),
    );

    final account = TextFormField(
      autofocus: false,
      controller: _assount,
      style: TextStyle(
        color: Colors.white,
      ),
      decoration: InputDecoration(
        labelText: "请输入账号",
        labelStyle: TextStyle(color: Color.fromRGBO(255, 255, 255, 0.8)),
        hintText: "自定义账号",
        hintStyle: TextStyle(color: Color.fromRGBO(255, 255, 255, 0.6)),
        contentPadding: EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(32.0)),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(32.0),
          borderSide: BorderSide(
            color: Colors.white, // 边框颜色
          ),
        ),
      ),
    );

    final password = TextFormField(
      autofocus: false,
      obscureText: true,
      controller: _password,
      style: TextStyle(
        color: Colors.white,
      ),
      decoration: InputDecoration(
        labelText: "请输入密码",
        labelStyle: TextStyle(color: Color.fromRGBO(255, 255, 255, 0.8)),
        contentPadding: EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(32.0)),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(32.0),
          borderSide: BorderSide(
            color: Colors.white, // 边框颜色
          ),
        ),
      ),
    );

    final loginButton = Padding(
      padding: EdgeInsets.symmetric(vertical: 16.0),
      child: OutlineButton(
        // minWidth: 200.0,
        // height: 42.0,
        splashColor: Colors.transparent, //点击高亮透明
        highlightColor: Colors.transparent, //长按扩散透明
        color: Colors.transparent,
        borderSide: BorderSide(color: Colors.white),
        highlightedBorderColor: Colors.white,
        onPressed: () {
          _registerAction();
        },
        child: Text(
          '注 册',
          style: TextStyle(color: Colors.white),
        ),
      ),
    );

    final loginTxt = Container(
      child: InkWell(
        child: Text(
          '已有账号?立即登录',
          textAlign: TextAlign.right,
          style: TextStyle(color: Color.fromRGBO(255, 255, 255, 0.6)),
        ),
        onTap: () {
          _loginJump();
        },
      ),
      alignment: Alignment.centerRight,
    );

    final _scaffold = Scaffold(
      resizeToAvoidBottomPadding: false, //控制body不动
      body: Container(
        padding: const EdgeInsets.fromLTRB(0, 0, 0, 200),
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage("assets/images/our_background.png"),
            fit: BoxFit.cover,
          ),
        ),
        child: Center(
          child: ListView(
            physics: const NeverScrollableScrollPhysics(), //滚动禁用
            shrinkWrap: true, //上下收缩
            padding: EdgeInsets.only(left: 30.0, right: 30.0),
            children: <Widget>[
              logo,
              SizedBox(
                height: 68.0,
              ),
              account,
              SizedBox(
                height: 16.0,
              ),
              password,
              SizedBox(
                height: 18.0,
              ),
              loginTxt,
              SizedBox(
                height: 6.0,
              ),
              loginButton
            ],
          ),
        ),
      ),
    );

    return _scaffold;
  }
}
