//
//  SendMsg+PlayRtcMain.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2020/9/23.
//  Copyright © 2020 XianHong zhang. All rights reserved.
//

extension PlayRtcMainVC{
    @objc func notiaction(noti:Notification){
            if let obj = noti.object as? RCMessage{
                if obj.targetId == self.currentRoomid {
                    if let txtmsg = obj.content as? RCTextMessage {
                        var txt = txtmsg.content;
                        let isLiveList = receviMsgIsLiveList(txt ?? "")
                        if isLiveList.0 == true {
                            txt = isLiveList.1
                            DispatchQueue.main.async {
                                showLiveListImage(isLiveList.3, self.view!)
                                //修改魅力值
                                self.topRightView?.changeMlCount(isLiveList.3)
                            }
                            
                        }
                        //判断消息是否是更新魅力值或者人数，如果时，则只更新数据不更新tab
                        let isTopRightType = receviMsgIsUpdateCount(txt!, txtmsg.extra, self.topRightView!)
                        if isTopRightType != .NoneKey {
                            
                            if isTopRightType == .joinChatRoomKey {
                               if txtmsg.senderUserInfo != nil
                                {
                                    self.pListView?.addUser(rongUser: txtmsg.senderUserInfo!)
                                }
                            }else if isTopRightType == .quitChatRoomKey{
                                if txtmsg.senderUserInfo != nil
                                {
                                    self.pListView?.delteUser(rongUser: txtmsg.senderUserInfo!)
                                }
                            }
                            
                            return
                        }
                        DispatchQueue.main.async {
                            if obj.senderUserId == userInfo.userid{
                               
                                self.tabview?.addMsg(txt: "我：" + (txt ?? ""))
                            }else{
                                
    //                            let suserInfo = RCIM.shared()?.getUserInfoCache(obj.senderUserId)
    //                            let name = suserInfo?.name ?? ""
                                if txtmsg.senderUserInfo != nil
                                {
                                    let name = txtmsg.senderUserInfo.name ?? ""
                                    self.tabview?.addMsg(txt:name + "：" + (txt ?? ""))
                                }
                                
                            }
                            
                        }
                    }
                }
            }
        }
        @objc func sendAction(btn:UIButton){
            sinputView?.textF?.resignFirstResponder()
            if (sinputView?.textF?.text == nil) || (sinputView?.textF?.text?.count == 0) {
                
                return;
            }
            let txt = sinputView?.textF?.text;
            sinputView?.textF?.text = ""
            tabview?.addMsg(txt: "我：" + (txt ?? ""))
            
            sendMsg(txt: txt!, extra: "")
            
        }
    
    func sendMsg(txt:String,extra:String){
        let textMsg = RCTextMessage.init(content: txt)
        textMsg?.extra = extra
        let sendUserInfo = RCUserInfo.init();
        sendUserInfo.name = userInfo.name
        sendUserInfo.userId = userInfo.userid
        sendUserInfo.portraitUri = userInfo.imgUrl
        textMsg?.senderUserInfo = sendUserInfo
        
        RCIM.shared()?.sendMessage(.ConversationType_CHATROOM, targetId: self.currentRoomid, content: textMsg, pushContent: nil, pushData: nil, success: { (result) in
            
        }, error: { (code, result) in
            
        })
    }
    
    
}
