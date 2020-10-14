import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:rongcloud_im_plugin_project/im/util/style.dart';
import 'package:rongcloud_im_plugin_project/other/discover_page.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:fluttertoast/fluttertoast.dart';

class PublishPage extends StatefulWidget {
  PublishPage({Key key}) : super(key: key);

  @override
  _PublishPageState createState() => _PublishPageState();
}

// 发布动态/发起寻找伙伴  页面
class _PublishPageState extends State<PublishPage> {
  final FocusNode verifyNode = FocusNode();
  TextEditingController textController = TextEditingController();
  // looking for mate开关
  bool _sSwitchItem;
  // 防止过度点击的节流阀
  bool _sendFlag = false;
  String userId;
  @override
  void initState() {
    super.initState();
    _findPrefsInfo();
  }

  void _findPrefsInfo() async {
    //初始化
    SharedPreferences prefs = await SharedPreferences.getInstance();
    //判断是否有值
    if (prefs.getString('id') != null) {
      userId = prefs.getString('id');
      print(userId);
    }
    // get按钮
    bool swtichlFMInfo = prefs.getBool('swtichlFMInfo$userId');
    this._sSwitchItem = swtichlFMInfo ?? false;
    print(_sSwitchItem);
    setState(() {});
  }

  void _saveSwitchInfo(String flagName, bool flagVal) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setBool(flagName, flagVal);
    print(flagName);
  }

  // post请求发布文章
  void _postPublish() async {
    try {
      Map params = {
        "uid": userId,
        "content": textController.text,
        "findMates": _sSwitchItem,
        'lng': jingdu.toString(),
        'lat': weidu.toString()
      };
      Response response = await Dio().post(
          "http://api.mashiro.online/center/add",
          data: params,
          options: Options(contentType: 'application/x-www-form-urlencoded'));
      print(response.data);
      if (response.data['code'] == 200) {
        textController.text = '';
        Navigator.pop(context);
      }
    } catch (e) {
      print(e);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // 顶部
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(
            ThirdPartyIcons.ReturnToPreviousPage,
            size: 30,
          ),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        // 渐变框
        flexibleSpace: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                Color(0xFFA0F1EA),
                Color(0xFFEAD6EE),
              ],
              begin: Alignment.topRight,
              end: Alignment.bottomLeft,
            ),
          ),
        ),
        actions: <Widget>[
          // 发布按钮
          InkWell(
            child: Container(
              alignment: Alignment.center,
              padding: EdgeInsets.only(right: 20.0),
              child: Text(
                "发布",
                style: TextStyle(fontSize: 20.0),
              ),
            ),
            onTap: () {
              verifyNode.unfocus();
              if (textController.text.trim().length == 0) {
                Fluttertoast.showToast(msg: "动态必须要有内容哦~");
              } else {
                if (!_sendFlag) {
                  // 防止用户过渡点击，节流阀
                  setState(() {
                    _sendFlag = true;
                    _postPublish();
                  });
                }
              }
            },
          )
        ],
      ),
      body: Column(
        children: <Widget>[
          Card(
            color: Colors.indigo[50],
            child: Padding(
              padding: EdgeInsets.fromLTRB(14.0, 10.0, 14.0, 10.0),
              // 文本输入框
              child: TextField(
                controller: textController,
                maxLines: 12,
                cursorColor: Colors.pink[200],
                decoration: InputDecoration.collapsed(
                    hintText:
                        " 告诉大家你现在要去做什么 \n 寻找一起的伙伴~~~~\n 开启下方 'looking for mates' \n 大家就可以在推荐中心找到你喽！"),
                focusNode: verifyNode,
              ),
            ),
          ),
          Row(
            children: [
              Container(
                padding: EdgeInsets.only(left: 10.0),
                child: Text('Looking for mates'),
              ),
              Expanded(
                child: Row(
                  children: [
                    // looking for mate 开关
                    Switch(
                      value: this._sSwitchItem,
                      activeColor: Colors.teal,
                      onChanged: (value) {
                        print(value);
                        if (value) {
                          Fluttertoast.showToast(
                            msg: "已开启looking for mates, 大家可以在推荐中心找到你喽！",
                            textColor: Colors.teal[300],
                            backgroundColor: Colors.white24,
                          );
                        } else {
                          Fluttertoast.showToast(
                            msg: "已关闭looking for mates，您的动态会展示在个人中心",
                            textColor: Colors.teal[300],
                            backgroundColor: Colors.white24,
                          );
                        }
                        setState(() {
                          this._sSwitchItem = value;
                          _saveSwitchInfo('swtichlFMInfo$userId', value);
                        });
                      },
                    ),
                  ],
                ),
              ),
              IconButton(
                color: Colors.teal,
                onPressed: () {
                  verifyNode.unfocus();
                },
                icon: Icon(Icons.subdirectory_arrow_left),
              )
            ],
          ),
        ],
      ),
      resizeToAvoidBottomPadding: false,
    );
  }
}
