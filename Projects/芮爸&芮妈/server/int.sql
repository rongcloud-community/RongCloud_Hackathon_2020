/*
 Navicat MongoDB Data Transfer

 Source Server         : 华为云
 Source Server Type    : MongoDB
 Source Server Version : 30603
 Source Host           : 139.9.81.97:27017
 Source Schema         : int

 Target Server Type    : MongoDB
 Target Server Version : 30603
 File Encoding         : 65001

 Date: 12/10/2020 15:19:13
*/


// ----------------------------
// Collection structure for Manage
// ----------------------------
db.getCollection("Manage").drop();
db.createCollection("Manage");

// ----------------------------
// Documents of Manage
// ----------------------------
db.getCollection("Manage").insert([ {
    _id: ObjectId("5e1d2aa58689990454002652"),
    username: "admin",
    password: "e10adc3949ba59abbe56e057f20f883e",
    "create_date": "2020-09-11 00:00:00",
    "update_date": "2020-10-12 10:27:02",
    "role_id": "123",
    "last_date": "2020-10-12 10:27:02",
    count: NumberInt("73"),
    id: 123456,
    "is_login": "1",
    "last_ip": "220.173.150.26"
} ]);

// ----------------------------
// Collection structure for Nav
// ----------------------------
db.getCollection("Nav").drop();
db.createCollection("Nav");

// ----------------------------
// Documents of Nav
// ----------------------------
db.getCollection("Nav").insert([ {
    _id: ObjectId("5e1d2b548689990454002654"),
    text: "系统配置",
    url: "",
    pid: 0,
    "create_date": "2020-09-11 00:00:00",
    "update_date": "1970-01-01",
    id: 1580317801,
    state: "closed",
    iconCls: "icon-large-clipart"
} ]);
db.getCollection("Nav").insert([ {
    _id: ObjectId("5e1e86bd8689991b20001692"),
    text: "管理员管理",
    pid: 1580317801,
    state: "open",
    url: "admin/manage",
    id: 1580317802,
    iconCls: "icon-manager",
    "create_date": "2020-09-11 00:00:00"
} ]);
db.getCollection("Nav").insert([ {
    _id: ObjectId("5e1e86d68689991b20001693"),
    text: "权限管理",
    pid: 1580317801,
    url: "admin/role",
    id: 1580317803,
    state: "open",
    iconCls: "icon-login",
    "create_date": "2020-09-11 00:00:00"
} ]);
db.getCollection("Nav").insert([ {
    _id: ObjectId("5e1e86ef8689991b20001694"),
    text: "菜单管理",
    pid: 1580317801,
    url: "admin/nav",
    id: 1580317804,
    state: "open",
    iconCls: "icon-tip",
    "create_date": "2020-09-11 00:00:00"
} ]);
db.getCollection("Nav").insert([ {
    _id: ObjectId("5e31bc73bd6c7c9974fc7c98"),
    text: "人员管理",
    pid: NumberInt("0"),
    url: "",
    id: NumberInt("1580317811"),
    "create_date": "2020-09-11 00:00:00",
    "update_date": "",
    state: "closed",
    iconCls: "icon-group"
} ]);
db.getCollection("Nav").insert([ {
    _id: ObjectId("5e31bc95bd6c7c9974fc7c99"),
    text: "用户管理",
    pid: NumberInt("1580317811"),
    url: "admin/users",
    id: NumberInt("1580317845"),
    "create_date": "2020-09-11 00:00:01",
    "update_date": "",
    state: "open",
    iconCls: "icon-user"
} ]);

// ----------------------------
// Collection structure for Role
// ----------------------------
db.getCollection("Role").drop();
db.createCollection("Role");

// ----------------------------
// Documents of Role
// ----------------------------
db.getCollection("Role").insert([ {
    _id: ObjectId("5e1d2af68689990454002653"),
    "role_name": "超级管理员",
    "nav_ids": "1580317802,1580317803,1580317804,1580317845",
    "create_date": "2020-09-17 00:00:00",
    "update_date": "2020-09-18 00:47:47",
    id: 123
} ]);

// ----------------------------
// Collection structure for User
// ----------------------------
db.getCollection("User").drop();
db.createCollection("User");

// ----------------------------
// Documents of User
// ----------------------------
db.getCollection("User").insert([ {
    _id: ObjectId("5f7ae0023907739e9cea05cf"),
    username: "huang1",
    password: "e10adc3949ba59abbe56e057f20f883e",
    "create_date": "2020-10-05 16:57:38",
    state: NumberInt("1"),
    mobile: "15607740332",
    token: "d1cc15fc-06e8-11eb-95c5-fa163eba1cc0",
    portrait: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602075962256&di=baf24d6a29769cf88f9febbcb858acbb&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202006%2F27%2F20200627020150_JuQFu.thumb.400_0.jpeg",
    "update_date": "2020-10-10 17:11:39",
    ip: "220.173.150.26",
    "last_date": "2020-10-10 17:11:39"
} ]);
db.getCollection("User").insert([ {
    _id: ObjectId("5f7ae1ff3907739e9cea05d0"),
    username: "admin",
    password: "e10adc3949ba59abbe56e057f20f883e",
    "create_date": "2020-10-05 17:06:07",
    state: NumberInt("1"),
    mobile: "15607740774",
    token: "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    portrait: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602075590129&di=d116bb3d0b03342b1dd40192d8d1a10a&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202008%2F23%2F20200823054830_wGLrA.thumb.400_0.jpeg",
    "update_date": "2020-10-12 10:49:20",
    ip: "220.173.150.26",
    "last_date": "2020-10-12 10:49:20"
} ]);
db.getCollection("User").insert([ {
    _id: ObjectId("5f7ae2133907739e9cea05d1"),
    username: "huang",
    password: "e10adc3949ba59abbe56e057f20f883e",
    "create_date": "2020-10-05 17:06:27",
    state: NumberInt("1"),
    mobile: "15607740331",
    token: "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    portrait: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602075927715&di=e234b01e6d6eeee604ee473709816230&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3Dabbf8f972d738bd4c421b239918b876c%2F8169ca8065380cd7e02852a7a244ad3459828159.jpg",
    "update_date": "2020-10-12 09:38:44",
    ip: "220.173.150.26",
    "last_date": "2020-10-12 09:38:44"
} ]);
db.getCollection("User").insert([ {
    _id: ObjectId("5f82c57020f3879e3860da92"),
    state: NumberInt("1"),
    "create_date": "2020-10-11 16:42:24",
    token: "a90bec7767f8e58f88f9ab099f0e611b",
    username: "huang2",
    password: "e10adc3949ba59abbe56e057f20f883e",
    mobile: "15607740000",
    portrait: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602415131413&di=8a5724710c3ae9bb541a85fee97650f2&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202001%2F09%2F20200109212951_dnsxt.thumb.400_0.jpeg",
    ip: "121.31.68.167",
    "last_date": "2020-10-11 16:45:53",
    "update_date": "2020-10-11 16:46:02"
} ]);

// ----------------------------
// Collection structure for UserLog
// ----------------------------
db.getCollection("UserLog").drop();
db.createCollection("UserLog");

// ----------------------------
// Documents of UserLog
// ----------------------------
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f7bc510746265f9b91d653a"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "hello I`m test message",
    "create_date": "2020-10-06 09:14:56"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f7bc519746265f9b91d653b"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "hello I`m test message",
    "create_date": "2020-10-06 09:15:04"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f7de346dbaa1bf292a7a4d2"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "hi",
    "create_date": "2020-10-07 23:48:22"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f7de3a0dbaa1bf292a7a4d3"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "hj",
    "create_date": "2020-10-07 23:49:51"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f7de3f6dbaa1bf292a7a4d4"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "1",
    "create_date": "2020-10-07 23:51:18"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f7de4dd0f8e4f003945e8fa"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "1",
    "create_date": "2020-10-07 23:55:09"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f7de4e10f8e4f003945e8fb"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "11",
    "create_date": "2020-10-07 23:55:13"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f7de4f50f8e4f003945e8fc"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "1",
    "create_date": "2020-10-07 23:55:33"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f7de6420f8e4f003945e8fd"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "1",
    "create_date": "2020-10-08 00:01:06"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f7de6c00f8e4f003945e8fe"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "123",
    "create_date": "2020-10-08 00:03:11"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f7de6fa0f8e4f003945e8ff"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "xxx",
    "create_date": "2020-10-08 00:04:10"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f7de6fe0f8e4f003945e900"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "ffff",
    "create_date": "2020-10-08 00:04:14"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f7de7200f8e4f003945e901"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "1111",
    "create_date": "2020-10-08 00:04:47"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f7dec6d0f8e4f003945e902"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "你好啊！！！！",
    "create_date": "2020-10-08 00:27:25"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f7decda0f8e4f003945e903"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "哈哈哈",
    "create_date": "2020-10-08 00:29:14"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f7ded530f8e4f003945e904"),
    "to_user_token": "d1cc15fc-06e8-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "好",
    "create_date": "2020-10-08 00:31:15"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f8023268f37a6366a6d7c99"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "ffff",
    "create_date": "2020-10-09 16:45:26"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f8024718f37a6366a6d7c9a"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "qqqq",
    "create_date": "2020-10-09 16:50:57"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f8128a5b8f49776ae9c9332"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "mmjacket85123",
    "create_date": "2020-10-10 11:21:09"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f812c74b8f49776ae9c9333"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "i lll xxxx",
    "create_date": "2020-10-10 11:37:24"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f812dffb8f49776ae9c9334"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "xxxxxxx",
    "create_date": "2020-10-10 11:43:59"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f813072b8f49776ae9c9335"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "fffff",
    "create_date": "2020-10-10 11:54:26"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f8130bfb8f49776ae9c9336"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "ffffasdf",
    "create_date": "2020-10-10 11:55:43"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f8130cab8f49776ae9c9337"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "ffffasdfddfasdfasdfasdfsadf",
    "create_date": "2020-10-10 11:55:54"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f81310cb8f49776ae9c9338"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "fffssssxxxxxaqqqqqqqq",
    "create_date": "2020-10-10 11:57:00"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f81319fb8f49776ae9c9339"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "fffasdfasdfsadf",
    "create_date": "2020-10-10 11:59:27"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f8131a4b8f49776ae9c933a"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "ffff",
    "create_date": "2020-10-10 11:59:32"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f8171c7b8f49776ae9c933b"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "hi&nbsp;",
    "create_date": "2020-10-10 16:33:11"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f817277b8f49776ae9c933c"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "xxxxxxxxxxxxxx",
    "create_date": "2020-10-10 16:36:07"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f8172a4b8f49776ae9c933d"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "mmmm",
    "create_date": "2020-10-10 16:36:52"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f817303b8f49776ae9c933e"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "xxxxffffaaaa",
    "create_date": "2020-10-10 16:38:27"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f817324b8f49776ae9c933f"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "rerererasdfasdf",
    "create_date": "2020-10-10 16:39:00"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f817327b8f49776ae9c9340"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "fasdfasdfasdf",
    "create_date": "2020-10-10 16:39:03"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f817334b8f49776ae9c9341"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "fasdfasdf",
    "create_date": "2020-10-10 16:39:16"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f817336b8f49776ae9c9342"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "ffasdfsadf",
    "create_date": "2020-10-10 16:39:18"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f817aefae9d579388597db8"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "haha",
    "create_date": "2020-10-10 17:12:15"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f817b11ae9d579388597db9"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "ffffff",
    "create_date": "2020-10-10 17:12:49"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f817b8cae9d579388597dba"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "fasdfsdfffffsadfsadf",
    "create_date": "2020-10-10 17:14:52"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f817b8eae9d579388597dbb"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "fasdfsdfffffsadfsadf",
    "create_date": "2020-10-10 17:14:54"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f817b91ae9d579388597dbc"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "fasdfsdfffffsadfsadf",
    "create_date": "2020-10-10 17:14:57"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f817b91ae9d579388597dbd"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "fasdfsdfffffsadfsadf",
    "create_date": "2020-10-10 17:14:57"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f817b91ae9d579388597dbe"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "fasdfsdfffffsadfsadf",
    "create_date": "2020-10-10 17:14:57"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f817bc4ae9d579388597dbf"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "fffff",
    "create_date": "2020-10-10 17:15:48"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f817c39ae9d579388597dc0"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "ffff",
    "create_date": "2020-10-10 17:17:45"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f817c86ae9d579388597dc1"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "1111",
    "create_date": "2020-10-10 17:19:02"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f817ccaae9d579388597dc2"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "tttt",
    "create_date": "2020-10-10 17:20:10"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f817d21ae9d579388597dc3"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "ujjjj",
    "create_date": "2020-10-10 17:21:37"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f817d98ae9d579388597dc4"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "jjj",
    "create_date": "2020-10-10 17:23:36"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f817da7ae9d579388597dc5"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "qq",
    "create_date": "2020-10-10 17:23:51"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f817dd9ae9d579388597dc6"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "qq",
    "create_date": "2020-10-10 17:24:41"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f817fcfae9d579388597dc7"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "xxxxxxx",
    "create_date": "2020-10-10 17:33:03"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f81804bae9d579388597dc8"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "aaaaa",
    "create_date": "2020-10-10 17:35:07"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f81806fae9d579388597dc9"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "yyyyyy",
    "create_date": "2020-10-10 17:35:43"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f8180b2ae9d579388597dca"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "yyyyy",
    "create_date": "2020-10-10 17:36:50"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f8183bbd6b9ad49439d8f38"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "fffffasdfasdfasdf",
    "create_date": "2020-10-10 17:49:47"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f8183d3d6b9ad49439d8f39"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "fffffasdfasdfasdfggg",
    "create_date": "2020-10-10 17:50:11"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f8183e6d6b9ad49439d8f3a"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "tttt",
    "create_date": "2020-10-10 17:50:30"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f818449d6b9ad49439d8f3b"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "sssss",
    "create_date": "2020-10-10 17:52:09"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f8184e4d6b9ad49439d8f3c"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "gggg",
    "create_date": "2020-10-10 17:54:44"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f818505d6b9ad49439d8f3d"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "aaaa",
    "create_date": "2020-10-10 17:55:17"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f818518d6b9ad49439d8f3e"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "tttt",
    "create_date": "2020-10-10 17:55:36"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f8187fd9c8fcb5f01861726"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "fffff",
    "create_date": "2020-10-10 18:07:57"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f8188289c8fcb5f01861727"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "4444",
    "create_date": "2020-10-10 18:08:39"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f8188e19c8fcb5f01861728"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "ffff",
    "create_date": "2020-10-10 18:11:45"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f8189df9c8fcb5f01861729"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "fasdfasdf",
    "create_date": "2020-10-10 18:15:59"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f8189e99c8fcb5f0186172a"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "fffff",
    "create_date": "2020-10-10 18:16:09"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f818be94df3e9cb24988f92"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "sssss",
    "create_date": "2020-10-10 18:24:41"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f818c2477167edecc6cc685"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "xxxxxx",
    "create_date": "2020-10-10 18:25:40"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f818c2777167edecc6cc686"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "fasdfasdf",
    "create_date": "2020-10-10 18:25:43"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f818c2977167edecc6cc687"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "fsafasdf",
    "create_date": "2020-10-10 18:25:45"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f818d4d77167edecc6cc688"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "我x你",
    "create_date": "2020-10-10 18:30:37"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f818d5577167edecc6cc689"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "我又x返你",
    "create_date": "2020-10-10 18:30:45"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f818e5477167edecc6cc68a"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "fffff",
    "create_date": "2020-10-10 18:35:00"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f818e5677167edecc6cc68b"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "sssss",
    "create_date": "2020-10-10 18:35:02"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f818e6177167edecc6cc68c"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "xxxxxx",
    "create_date": "2020-10-10 18:35:13"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f818eb177167edecc6cc68d"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "ssss",
    "create_date": "2020-10-10 18:36:33"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f818eb377167edecc6cc68e"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "xxxx",
    "create_date": "2020-10-10 18:36:35"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f818eb877167edecc6cc68f"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "ffff",
    "create_date": "2020-10-10 18:36:40"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f818eb977167edecc6cc690"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "ffff",
    "create_date": "2020-10-10 18:36:41"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f818ebb77167edecc6cc691"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "fasfasdf",
    "create_date": "2020-10-10 18:36:43"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f818ebe77167edecc6cc692"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "hhhhhh",
    "create_date": "2020-10-10 18:36:46"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f818ec077167edecc6cc693"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "gggaaa",
    "create_date": "2020-10-10 18:36:48"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f81ddfd77167edecc6cc694"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "ffff",
    "create_date": "2020-10-11 00:14:53"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f81de0877167edecc6cc695"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "ffff",
    "create_date": "2020-10-11 00:15:04"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f82cc81d97697f1196e4673"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "<p><img src=\"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/50/pcmoren_huaixiao_org.png\" alt=\"[坏笑]\" data-w-e=\"1\"><br></p>",
    "create_date": "2020-10-11 17:12:33"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f82cc8bd97697f1196e4674"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "<p><img src=\"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/50/pcmoren_huaixiao_org.png\" alt=\"[坏笑]\" data-w-e=\"1\"><br></p>",
    "create_date": "2020-10-11 17:12:43"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f82cccbd97697f1196e4675"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "<p><br></p>",
    "create_date": "2020-10-11 17:13:47"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f82ccced97697f1196e4676"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "<p><br></p>",
    "create_date": "2020-10-11 17:13:50"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f82ccdcd97697f1196e4677"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "<p><br></p>",
    "create_date": "2020-10-11 17:14:04"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f82ccecd97697f1196e4678"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "<p><br></p>",
    "create_date": "2020-10-11 17:14:20"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f82cd0bd97697f1196e4679"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "<p>haha</p><p><br></p>",
    "create_date": "2020-10-11 17:14:51"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f82cd0ed97697f1196e467a"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "<p>fffff</p>",
    "create_date": "2020-10-11 17:14:54"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f82cdc8d97697f1196e467b"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "<p>ffffff</p>",
    "create_date": "2020-10-11 17:18:00"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f82cdcfd97697f1196e467c"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "<p>fasdfasdfasdf</p>",
    "create_date": "2020-10-11 17:18:07"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f82cde4d97697f1196e467d"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "<p>ffffffxxxx<img src=\"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/60/horse2_thumb.gif\" alt=\"[神马]\" data-w-e=\"1\"></p>",
    "create_date": "2020-10-11 17:18:28"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f82cf5ed97697f1196e467e"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "<p>xxx</p>",
    "create_date": "2020-10-11 17:24:46"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f82d0e3d97697f1196e467f"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "<p>aaaa</p>",
    "create_date": "2020-10-11 17:31:15"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f82d0f5d97697f1196e4680"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "<p>fffff</p>",
    "create_date": "2020-10-11 17:31:33"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f82d101d97697f1196e4681"),
    "to_user_token": "d1cc15fc-06e8-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "<p>xxxxxx</p>",
    "create_date": "2020-10-11 17:31:45"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f82d107d97697f1196e4682"),
    "to_user_token": "d1cc15fc-06e8-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "<p>sssfafdasdf</p>",
    "create_date": "2020-10-11 17:31:51"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f82d119d97697f1196e4683"),
    "to_user_token": "a90bec7767f8e58f88f9ab099f0e611b",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "<p>fffffasdfasdfasdf</p>",
    "create_date": "2020-10-11 17:32:09"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f82d124d97697f1196e4684"),
    "to_user_token": "a90bec7767f8e58f88f9ab099f0e611b",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "<p>hahahaha!!!</p>",
    "create_date": "2020-10-11 17:32:20"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f82def505227e35b08acac9"),
    "to_user_token": "a90bec7767f8e58f88f9ab099f0e611b",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "<p>ffff</p>",
    "create_date": "2020-10-11 18:31:17"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f83b36a05227e35b08acaca"),
    "to_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    content: "<p><span style=\"color: rgb(123, 91, 161);\">哈哈哈哈</span></p>",
    "create_date": "2020-10-12 09:37:46"
} ]);
db.getCollection("UserLog").insert([ {
    _id: ObjectId("5f83b3bb05227e35b08acacb"),
    "to_user_token": "0109987a-06ea-11eb-95c5-fa163eba1cc0",
    "from_user_token": "0ccbc552-06ea-11eb-95c5-fa163eba1cc0",
    content: "<p><span style=\"background-color: rgb(28, 72, 127);\">ffffffffasdfas</span><span style=\"background-color: rgb(194, 79, 74);\">dfxxxxx</span></p>",
    "create_date": "2020-10-12 09:39:07"
} ]);
