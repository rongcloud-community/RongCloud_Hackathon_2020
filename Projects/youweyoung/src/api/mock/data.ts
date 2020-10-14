export const users = [
  {
    token: `2aFDxndbTNBzveQ9nz9k9krZrbxjfQUEjGEzlMqtYn8=@knr7.cn.rongnav.com;knr7.cn.rongcfg.com`,
    uid: "666666",
    password: "666666",
    nickname: '演员1',
    role: 2,
    "avatar": '1.jpg'
  },
  {
    uid: "55555",
    password: "55555",
    nickname: '观众3',
    role: 1,
    token:
      "Qch7DaqtY8Pz9Z0Y6SqhmsqsSpU5BCML5qqvYhM5dMY=@knr7.cn.rongnav.com;knr7.cn.rongcfg.com",
    "avatar": '5.jpg',
  },
  {
    uid: "666665",
    password: "666665",
    role: 1,
    nickname: '观众5',
    token:
      "2aFDxndbTNDPLdHaGVwHOXziVzCQiz76yKH1bsdcc6Y=@knr7.cn.rongnav.com;knr7.cn.rongcfg.com",
    "avatar": '1.jpg'
  },
  {
    uid: "666",
    password: "666",
    nickname: '观众666',
    role: 1,
    token:
      "gz+dwPxaiOwB/lMp6Q5drycVlltAt4E+CjVU4bG9E4I=@knr7.cn.rongnav.com;knr7.cn.rongcfg.com",
    "avatar": "2.jpg"
  },
  {
    uid: "111",
    password: '111',
    role: 2,
    nickname: '演员111',
    token:
      "NGopQFIqJl4B/lMp6Q5dryxwizdAusghCjVU4bG9E4I=@knr7.cn.rongnav.com;knr7.cn.rongcfg.com",
    "avatar": "3.jpg"
  },
  {
    uid: "222",
    password: '222',
    nickname: '演员222',
    role: 2,
    token:
      "qTuMX4EbtJwB/lMp6Q5dr5AfXXH2PYcoCjVU4bG9E4I=@knr7.cn.rongnav.com;knr7.cn.rongcfg.com",
    "avatar": "2.jpg"
  },
  {
    uid: "333",
    password: "333",
    nickname: '演员333',
    role: 2,
    token:
      "SN0+P85/2PoB/lMp6Q5dr/IJwSLVbs7CCjVU4bG9E4I=@knr7.cn.rongnav.com;knr7.cn.rongcfg.com",
    "avatar": "4.jpg"
  },
  {
    uid: "555",
    password: '555',
    nickname: '演员555',
    role: 2,
    token:
      "5IZ99kV1UiIB/lMp6Q5dr6erLQLWTcMKCjVU4bG9E4I=@knr7.cn.rongnav.com;knr7.cn.rongcfg.com",
    "avatar": "3.jpg"
  },
  {
    uid: "666661",
    password: "666661",
    nickname: '观众1',
    role: 1,
    token:
      "2aFDxndbTNAaoGocndm6Pdo4OH5/G+knMhrsK9WBeIA=@knr7.cn.rongnav.com;knr7.cn.rongcfg.com",
    "avatar": "4.jpg"
  },
];

export const script1 = {
  charactors: [{
    key: "SwordsMan",
    "name": "未来剑客",
    scale: [0.2, 0.2],
    x: 80,
    y: 130,
    id: 1
  }, {
    key: "Rooster",
    "name": "怒晴鸡",
    scale: [0.2, 0.2],
    x: 80,
    y: 230,
    id: 2
  }, {
    key: "Dragon",
    "name": "哥斯拉",
    scale: [0.2, 0.2],
    x: 80,
    y: 330,
    id: 3
  }, {
    "key": "Ubbie",
    "name": "小熊",
    "scale": [0.2, 0.2],
    "x": 80,
    "y": 330,
    "id": "4"
  }],
  items: [],
  background: '/images/juyuan/stage1.jpg',
  bgm:'/bgm/happy1.mp3'
}


export const rooms = [{
  "roomId": '1',
  "name": '勇者剧院',
  "desc": '勇者斗恶龙，一个用于测试的简单故事',
  players: ['111', '555', '333'],
  admin: '111',
  bg: './static/resources/images/juyuan/jy1.jpg',
  stageImages: './static/resources/images/juyuan/stage1.jpg'
}, {
  "roomId": '2',
  "name": '测试剧院',
  "desc": '这是一个测试房间,进行多其它开发中功能测试，需要密码才能进',
  players: ['555', '111', '222'],
  password: 'admim',
  admin: '111',
  bg: './static/resources/images/juyuan/jy2.jpg',
  stageImages: './static/resources/images/juyuan/stage1.jpg'
}, {
  "roomId": '3',
  "name": '测试剧院',
  "desc": '这是一个测试房间,进行多其它开发中功能测试，需要密码才能进',
  players: ['111'],
  password: 'admim',
  admin: '111',
  bg: './static/resources/images/juyuan/jy2.jpg',
  stageImages: './static/resources/images/juyuan/stage1.jpg'
}, {
  "roomId": '4',
  "name": '测试剧院',
  "desc": '这是一个测试房间,进行多其它开发中功能测试，需要密码才能进',
  players: ['111'],
  password: 'admim',
  admin: '111',
  bg: './static/resources/images/juyuan/jy2.jpg',
  stageImages: './static/resources/images/juyuan/stage2.jpg'
}, {
  "roomId": '5',
  "name": '测试剧院',
  "desc": '这是一个测试房间,进行多其它开发中功能测试，需要密码才能进',
  players: ['111'],
  password: 'admim',
  admin: '111',
  bg: './static/resources/images/juyuan/jy2.jpg',
  stageImages: './static/resources/images/juyuan/stage1.jpg'
}]