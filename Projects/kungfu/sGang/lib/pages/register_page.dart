import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:dio/dio.dart';

import 'package:shared_preferences/shared_preferences.dart';

Dio dio = new Dio();

//注册页面
class SecondPage extends StatefulWidget {
  @override
  _SecondPageState createState() => _SecondPageState();
}

class _SecondPageState extends State<SecondPage> {
  final myPhone = TextEditingController();
  final myPassword = TextEditingController();

  @override
  void dispose() {
    myPhone.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    FocusNode _pwd = FocusNode();

    return Scaffold(
      appBar: AppBar(
        title: Text('注册'),
      ),
      body: Container(
        child: Center(
          child: ListView(
            padding: EdgeInsets.only(left: 24.0, right: 24.0),
            children: [
              SizedBox(height: 24.0),
              Container(
                height: 80,
                child: TextFormField(
                  keyboardType: TextInputType.number,
                  controller: myPhone,
                  decoration: InputDecoration(
                    labelText: "请输入手机号码",
                    contentPadding: EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(32.0),
                    ),
                  ),
                  onEditingComplete: () {
                    FocusScope.of(context).requestFocus(_pwd);
                  },
                  // textAlign: TextAlign.center,
                ),
              ),
              Container(
                height: 80,
                child: TextFormField(
                  focusNode: _pwd,
                  obscureText: true,
                  controller: myPassword,
                  decoration: InputDecoration(
                    labelText: '请输入密码(6~16位字母+数字)',
                    contentPadding: EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(32.0),
                    ),
                  ),
                  // textAlign: TextAlign.center,
                ),
              ),
              MaterialButton(
                padding: EdgeInsets.all(16.0),
                color: Color(0xffc8a675),
                minWidth: double.infinity,
                textColor: Colors.white,
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(80.0) //设置圆角
                    ),
                onPressed: () {
                  _register(myPhone, myPassword, context);
                },
                child: Text("注册"),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// 保存到SharedPreferences
void _saveUserInfo(String id, String tel) async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  prefs.setString("id", id); // id
  prefs.setString("phone", tel); // 手机号码
}

void _register(phone, password, BuildContext context) async {
  //手机号码
  String _phone = phone.text;
  //密码
  String _password = password.text;
  //正则判断手机号
  RegExp tel_exp = RegExp(
      r'^((13[0-9])|(14[0-9])|(15[0-9])|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))\d{8}$');
  bool tel = tel_exp.hasMatch(_phone);
  //正则判断密码 6~16位数字和字符组合
  RegExp pwd_exp = RegExp(r"(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$");
  bool pwd = pwd_exp.hasMatch(_password);
  if (tel) {
    if (pwd) {
      //发起注册请求
      var response = await dio.post(
          'http://124.71.6.95/r_api.php?m=1001&tel=$_phone&pwd=$_password&name=student&identity=学生');
      //返回值
      var result = response.data;
      if (result[0]['code'] == 200) {
        _saveUserInfo(result[0]['id'], result[0]['tel']);
        //路由跳转
        // Navigator.pushNamed(context, '/material');
        Navigator.popAndPushNamed(context, '/material');
      } else {
        Fluttertoast.showToast(msg: "手机号码已被注册");
      }
    } else {
      Fluttertoast.showToast(msg: "密码格式不正确");
    }
  } else {
    Fluttertoast.showToast(msg: "手机号码格式不正确");
  }
}
