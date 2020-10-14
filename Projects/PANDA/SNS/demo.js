// 引入moment
const moment = require("moment");

let data = [{
        "use_id": "123123",
        "cid": 1,
        "publishTime": "2020-10-02T09:38:47.000Z",
        "content": "今天咕咕咕",
        "findMates": "0"
    },
    {
        "use_id": "123123",
        "cid": 2,
        "publishTime": "2020-10-02T09:38:47.000Z",
        "content": "今天咕咕咕",
        "findMates": "0"
    },
    {
        "use_id": "123123",
        "cid": 3,
        "publishTime": "2020-10-04T02:41:11.000Z",
        "content": "咕咕咕,一咕在咕",
        "findMates": "0"
    },
    {
        "use_id": "123123",
        "cid": 4,
        "publishTime": "2020-10-04T02:58:01.000Z",
        "content": "咕咕咕,一咕在咕",
        "findMates": "0"
    },
    {
        "use_id": "123123",
        "cid": 9,
        "publishTime": "2020-10-02T09:38:47.000Z",
        "content": "今天咕咕咕",
        "findMates": "1"
    },
    {
        "use_id": "123123",
        "cid": 20,
        "publishTime": "2020-10-02T09:38:47.000Z",
        "content": "今天咕咕咕😂😂😂",
        "findMates": "1"
    },
    {
        "use_id": "123123",
        "cid": 36,
        "publishTime": "2010-10-02T09:38:47.000Z",
        "content": "😘💕😁😂😂😂",
        "findMates": "1"
    }
]

// function groupData(index,data) {
//     // 获取时间
//     let datatime = moment(data[index].publishTime).format("YYYY");
//     // 创建一个数组接收对象
//     let arr = [];
//     // 遍历对象
//     for (let i = index; i < data.length; i++) {
//         // 获取当前的时间
//         let current = moment(data[i].publishTime).format("YYYY")
//         console.log(current);
//         // 判断是否和当前时间一样
//         if (current !== datatime) {
//             console.log(111);
//             return groupData(i,data);
//         }
//         arr.push(data[i]);
//     }
//     return arr;
// }

// console.log(groupData(0,data));

function groupData(data) {
    // 创建set数据结构
    let s = new Set();
    // 创建数组
    let result = [];
    // 遍历对象数组
    for (let i = 0; i < data.length; i++) {
        // 将年转换后添加到数组里面
        let year = moment(data[i].publishTime).format("YYYY");
        s.add(year);
    }
    s.forEach((value, index) => {
        let arr = [];
        // 创建一个空对象
        let obj = {
            year: value
        }
        // 再次遍历对象数组
        for (let i = 0; i < data.length; i++) {
            // 将时间转化成年
            let year = moment(data[i].publishTime).format("YYYY");
            // 判断是否和set里面的年想等,如果相等就添加到数组里面
            if (year == value) {
                arr.push(data[i]);
            }
        }
        // 遍历完后设置对象的属性
        obj["data"] = arr;
        result.push(obj);
        // 将数组初始化
        arr = [];
    })
    // 返回结果
    return result;
}

console.log(groupData(data));