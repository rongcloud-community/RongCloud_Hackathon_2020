var RongSDK = require('rongcloud-sdk')({
    appkey: '',
    secret: ''
});

var Message = RongSDK.Message;
var Chatroom = Message.Chatroom;
// RongSDK.Chatroom.create({
//     id: 'chr001',
//     name: 'danmaku'
// });
var User = RongSDK.User;

// var user = {
// 	id: 'ujadk90ha',
// 	name: 'Maritn',
// 	portrait: 'http://7xogjk.com1.z0.glb.clouddn.com/IuDkFprSQ1493563384017406982'
// };
// User.register(user).then(result => {
// 	console.log(result);
// }, error => { 
// 	console.log(error);
// });
var message = {
    senderId: 'admin',
    targetId: 'chr001',
    objectName: 'RC:TxtMsg',
    content: {
        content: 'aaaaaaaaaa'
    }
};
Chatroom.send(message).then(result => {
    console.log(result);
}, error => {
    console.log(error);
});
