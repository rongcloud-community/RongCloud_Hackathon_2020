import 'package:flutter/material.dart';
import '../im/util/http_util.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'home_page.dart';
import 'register_page.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'dart:developer' as developer;

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

  // 初始化 [提取信息]
  initPlatformState() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String uid = prefs.get("uid");
    String password = prefs.get("password");

    _assount.text = uid;
    _password.text = password;
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
        result["msg"] = '账号只能是数字、字母、特殊符号-_的组合';
      }
    }
    return result;
  }

  void _loginAction() async {
    Map map = new Map();
    map["uid"] = _assount.text;
    map["password"] = _password.text;
    _saveInputInfo(); //输入缓存

    if (map["uid"].trim().isNotEmpty && map["password"].trim().isNotEmpty) {
      Map result = _AccRegExp(map["uid"]);
      print(result);
      if (result["state"]) {
        if (map["password"].length >= 6 && map["password"].length <= 18) {
          HttpUtil.post("http://api.mashiro.online/login", (data) {
            if (data != null) {
              Map body = data;
              int errorCode = body["code"];

              if (errorCode == 200) {
                Map result = body["data"];
                String id = result["id"];
                String token = result["token"];
                _saveUserInfo(id, token);

                developer.log("Login Success, $map", name: pageName);
                Navigator.of(context).pushAndRemoveUntil(
                    new MaterialPageRoute(
                      builder: (context) => new HomePage(),
                    ),
                    (route) => route == null);
              } else if (errorCode == 400) {
                Fluttertoast.showToast(msg: "账号或密码错误！");
              } else if (errorCode == -1) {
                Fluttertoast.showToast(msg: "网络未连接，请连接网络重试");
              } else {
                Fluttertoast.showToast(msg: "登录失败！请尝试重新登录");
              }
            } else {
              print('---无数据返回---');
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

  // 跳转注册
  void _registerJump() {
    Navigator.of(context).pushAndRemoveUntil(
      // LoginPage向左切出
      PageRouteBuilder(
          transitionDuration: Duration(milliseconds: 2000), //用时
          pageBuilder: (context, animation, secondaryAnimation) =>
              new LoginPage(),
          transitionsBuilder: (context, animation, secondaryAnimation, child) {
            return SlideTransition(
              position: animation.drive(
                  Tween(begin: Offset(0, 0.0), end: Offset(-1.0, 0.0))
                      .chain(CurveTween(curve: Curves.linear))),
              child: child,
            );
          }),
      (route) => route == null,
    );
    Navigator.of(context).pushAndRemoveUntil(
      // RegisterPage向左切入
      PageRouteBuilder(
          transitionDuration: Duration(milliseconds: 600), //用时
          pageBuilder: (context, animation, secondaryAnimation) =>
              new RegisterPage(),
          transitionsBuilder: (context, animation, secondaryAnimation, child) {
            return SlideTransition(
              position: animation.drive(
                  Tween(begin: Offset(1, 0.0), end: Offset(0.0, 0.0))
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

  void _saveInputInfo() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
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
        labelText: "Together 账号",
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

    final password = TextFormField(
      autofocus: false,
      obscureText: true,
      controller: _password,
      style: TextStyle(
        color: Colors.white,
      ),
      decoration: InputDecoration(
        labelText: "Together 密码",
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
          _loginAction();
        },
        child: Text(
          '登 录',
          style: TextStyle(color: Colors.white),
        ),
      ),
    );

    final registerTxt = Container(
      child: InkWell(
        child: Text(
          '没有账号?立即注册',
          textAlign: TextAlign.right,
          style: TextStyle(color: Color.fromRGBO(255, 255, 255, 0.6)),
        ),
        onTap: () {
          _registerJump();
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
              registerTxt,
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
