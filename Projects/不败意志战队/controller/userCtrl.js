const urlencode = require("urlencode");
const moment = require("moment");

//引入user模块
const { registered, createChatroom } = require("../sdkConfig/user");

const {
  addCreateUser,
  addJoinUser,
  findMeetingId,
  findMeetingUser,
  findCountUser,
  rename,
  addStatus,
  findUserByName,
  findUserIdByIMId,
  findUsernameById,
} = require("../model/userModel");

//导入方法
const { generateMixed, getTouXiang } = require("../config/func");

//导出方法
//创建会议
module.exports.userRegistered = (req, res) => {
  //用户注册
  //用户后台生成的userId
  let id = generateMixed(6);

  //得到用户头像
  getTouXiang(urlencode(req.body.username), function (touXiangURL) {
    //调用融云SDK获取Token
    registered(id, req.body.username, touXiangURL, function (result) {
      console.log(result);
      //继续生成onlyid
      result.onlyId = generateMixed(6);
      result.meetingId = req.body.meetingId;
      result.username = req.body.username;

      result.createTime = moment().format("YYYY-MM-DD HH:mm:ss");
      // console.log(result.createTime);
      // console.log(result);
      //判断状态码
      if (result.code == 200) {
        // console.log(result);
        //创建变量
        let createUser = {
          userId: result.onlyId,
          code: result.code,
          token: result.token,
          returnId: result.userId,
        };

        let joinUser = {
          onlyId: result.onlyId,
          meetingId: result.meetingId,
          portrait: touXiangURL,
          username: result.username,
          time: result.createTime,
        };

        // 添加到数据库中
        addCreateUser(createUser, function (results) {});
        addJoinUser(joinUser, function (results) {
          console.log("添加成功");
        });
        addStatus(result.onlyId, "主持人", function (results) {
          console.log("添加状态成功");
        });
      }

      // result = {
      //   code: 200, // 融云返回的code
      // meetingId: "520", //用户输入的加入会议id
      //   portrait: // 服务端生成的头像地址
      //     "http://hd215.api.yesapi.cn/?s=Ext.Avatar.Show&app_key=BA6BBB3D9C90B515C6CAF6310D2BFFB4&nickname=200",
      //   token: // 融云返回的token
      //     "O12AnPa03igWCFE7vnZRky3ir7Nea7Rlr3ujYgxfPJg=@sw4u.cn.rongnav.com;sw4u.cn.rongcfg.com",
      //   userId: "HWVMP4", // 融云返回的用户id
      //   username: "200", // 用户自己输入的用户id
      // };

      let meetingId = result.meetingId;
      // console.log(meetingId);
      // 保存到session中
      req.session.user = result;
      // 保存聊天室房间号同时创建
      req.session.user.chatRoom = createChatroom(meetingId);
      //session里面存的数据应该放到数据库里面的
      // 下面的/api/getUserInfo会请求数据库拿数据的
      // console.log(req.session);
      // console.log(result);
      return res.send(result);
    });
  });
};

//显示会议中人员列表
//参数:meetingId
module.exports.showUsers = (req, res) => {
  //获取会议id
  let { meetingId } = req.query;

  //查询数据库中  所有meetingId相同的人员
  findMeetingUser(meetingId, function (users) {
    //查询数据库中 所有meetingId相同人员个数
    findCountUser(meetingId, function (count) {
      let list = {};
      list.users = users;
      list.count = count;
      console.log(list);
      return res.send({
        code: 200,
        msg: "人员数据获取成功",
        result: list,
      });
    });
  });
};

// 获取用户数据
module.exports.getUserInfo = (req, res) => {
  // console.log(req.session.user);
  let meetingId = req.body.url;
  // console.log(req.body.url);
  req.session.user.chatRoom = createChatroom(meetingId);
  // console.log(createChatroom(meetingId));
  // createChatroom(meetingId);
  res.send({
    code: 200,
    data: req.session.user,
  });
};

//发送融云的的id转成用户输入的姓名
//参数 : 融云id
module.exports.changeUserId = (req, res) => {
  //获取用户输入id
  let { userId } = req.body;
  console.log(userId);
  if (!userId) return;

  //调用数据库
  findUserIdByIMId(userId, (result) => {
    let id = result[0].log_userId;
    console.log(id);
    findUsernameById(id, (result) => {
      res.send({
        code: 200,
        msg: "获取成功",
        data: result[0].join_username,
      });
    });
  });
};

//用户加入会议
//参数 : 会议id meetingId  用户姓名 username
module.exports.joinUser = (req, res) => {
  console.log(req.query);
  //获取用户的加入会议id 和 姓名
  let { meetingId, username } = req.query;

  //判断是否存在此会议
  findMeetingId(meetingId, function (result) {
    if (result) {
      //获取头像
      getTouXiang(urlencode(req.query.username), function (touXiangURL) {
        //创建user
        let user = {
          onlyId: generateMixed(6),
          meetingId: meetingId,
          portrait: touXiangURL,
          username: req.query.username,
          time: moment().format("YYYY-MM-DD HH:mm:ss"),
        };

        //添加对象
        addJoinUser(user, function (result) {});
        //添加状态
        addStatus(user.onlyId, "成员", function (result) {});

        res.send({
          code: 200,
          msg: "添加成功",
        });
      });
    } else {
      res.send({
        code: 500,
        msg: "添加失败",
      });
    }
  });
};

//修改姓名
//参数: 原有姓名 beforeName  新建姓名 nowName
module.exports.reusername = (req, res) => {
  console.log(req.body);
  //获取原有姓名
  let { beforeName, nowName } = req.body;

  console.log(beforeName);
  //调用数据库方法
  findUserByName(beforeName, function (result) {
    //判断是否存在此姓名
    if (result) {
      //存在 则更新数据库
      rename(result.join_onlyId, nowName, function (result) {
        res.send({
          code: 200,
          msg: "修改成功",
        });
      });
    } else {
      res.send({
        code: 400,
        msg: "没有此用户",
      });
    }
  });
};

//会议页面渲染
module.exports.meetings = (req, res) => {
  // console.log(req.session.user);

  res.render("meeting.html");
};
