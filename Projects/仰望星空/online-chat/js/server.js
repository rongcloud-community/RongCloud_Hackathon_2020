document.write("<script src='js/config.js'></script>");
document.write("<script src='js/util.js'></script>");
window.webapi = {}
$(function() {
    var dialogueInput = document.getElementById('dialogue_input');
    var dialogue_contain = document.getElementById("messages");
    var users_contain = document.getElementById("users");
    var userlist = {}
    var clientUserId = undefined
    var dialogue_input_data = {text:"" , html:""}
    window.webapi.insertEmoij = function(text , img){
        dialogue_input_data.text += text;
        dialogue_input_data.html += img;
        dialogueInput.val(dialogue_input_data.html);
        dialogueInput.insertAdjacentHTML('beforeEnd', img);
    }
    const client = AgoraRTM.createInstance(appkey);

    client.on('ConnectionStateChanged', (newState, reason) => {
        console.log('on connection state changed to ' + newState + ' reason: ' + reason);
    });
    client.login({ token: '', uid: serverUserId }).then(() => {
        console.log('AgoraRTM client login success');
    
    }).catch(err => {
        console.log('AgoraRTM client login failure', err);
    });
    
    client.on('MessageFromPeer', ({ text }, peerId) => { // text 为消息文本，peerId 是消息发送方 User ID
        /* 收到点对点消息的处理逻辑 */
        console.log(peerId, text)
        clientUserId = peerId
        if(!userlist[peerId]){
            userlist[peerId] = true;
            var html = userhtml(peerId);
            users_contain.insertAdjacentHTML('beforeEnd', html);
        }
        var html = dialogueServerHtml(text , peerId);
        //追加内容
        dialogue_contain.insertAdjacentHTML('beforeEnd', html);
    });
    $("#sub").click(function(e) {
        var html = dialogueClientHtml(dialogueInput.innerHTML);
        dialogue_contain.insertAdjacentHTML('beforeEnd', html);
        submitText(dialogueInput.innerHTML);
    });
    function userhtml(peerId){
        return '<li class="user-li"><button type="button"  onclick="changeUser("'+peerId +'")">'+peerId.substring(0,7)+'</button></li>'
    }
    function dialogueServerHtml(text , peerId){
        return '<p class="dialogue-service-contain" peerid="'+ peerId +'">'+ peerId.substring(0,7) + ' say::</br><span class="dialogue-text dialogue-service-text">' + text +'</span></p>'
    }
    function dialogueClientHtml(text,peerId){
        return '<p class="dialogue-customer-contain"><span class="dialogue-text dialogue-customer-text">' + text +'</span></p>'
    }
    function submitText(text){
        if(!clientUserId)return
        client.sendMessageToPeer({ text: imContent(text || '&nbsp;') }, // 符合 RtmMessage 接口的参数对象
        clientUserId, // 远端用户 ID
        ).then(sendResult => {
            if (sendResult.hasPeerReceived) {
                console.log(sendResult)
                    /* 远端用户收到消息的处理逻辑 */
            } else {
                /* 服务器已接收、但远端用户不可达的处理逻辑 */
                console.log(sendResult)
                var html = '<li>' +
                    '<div class="im-chat-user">' +
                    '<img src="static/images/kefu.jpg"/>' +
                    '<cite>客服</cite>' +
                    '</div>' +
                    '<div class="im-chat-text">' + '-----客服不在线-----' + '</div>' +
                    '</li>';

                //追加内容
                msgList.insertAdjacentHTML('beforeEnd', html);

            }
        }).catch(error => {
            /* 发送失败的处理逻辑 */

            console.log(error)
        });

    }
})