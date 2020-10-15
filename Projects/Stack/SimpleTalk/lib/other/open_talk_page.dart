import 'package:flutter/material.dart';
import 'package:rongcloud_im_plugin/rongcloud_im_plugin.dart' as prefix;
import 'package:shared_preferences/shared_preferences.dart';
import 'login_page.dart';
import 'package:fluttertoast/fluttertoast.dart';

class OpenTalkPage extends StatefulWidget {
  OpenTalkPage({Key key}) : super(key: key);

  @override
  _OpenTalkPageState createState() => _OpenTalkPageState();
}

class _OpenTalkPageState extends State<OpenTalkPage> {
  TextEditingController _idController = new TextEditingController();

  void _logout() async {
    prefix.RongIMClient.disconnect(false);
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.remove("token");
    Navigator.of(context).pushAndRemoveUntil(
        new MaterialPageRoute(builder: (context) => new LoginPage()),
        (route) => route == null);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('发起私人通话'),
        flexibleSpace: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [Colors.blueAccent, Colors.redAccent],
            ),
          ),
        ),
        actions: [
          Container(
            padding: EdgeInsets.only(right: 20.0),
            child: InkWell(
              child: Icon(Icons.power_settings_new),
              onTap: () {
                _logout();
              },
            ),
          )
        ],
      ),
      body: Column(
        children: [
          Container(
            padding: EdgeInsets.fromLTRB(30.0, 40.0, 30.0, 20.0),
            child: TextField(
              controller: _idController,
              decoration: InputDecoration(
                border: OutlineInputBorder(
                  gapPadding: 5.0,
                ),
                hintText: '请输入对方id',
                labelText: '输入id后，点击按钮发起聊天',
                prefixIcon: Icon(Icons.person),
              ),
            ),
          ),
          RaisedButton(
            child: Text('发起会话'),
            textTheme: ButtonTextTheme.accent,
            onPressed: () {
              print(this._idController.text);

              if (this._idController.text.trim() != '') {
                Map arg = {
                  "coversationType": prefix.RCConversationType.Private,
                  "targetId": _idController.text.trim()
                };
                this._idController.clear();
                Navigator.pushNamed(context, "/conversation", arguments: arg);
              } else {
                this._idController.clear();
                Fluttertoast.showToast(msg: '请您正确输入id');
              }
            },
          )
        ],
      ),
    );
  }
}
