//
//  LookRtcBaseVC.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2020/9/20.
//  Copyright © 2020 XianHong zhang. All rights reserved.
//

import UIKit

class LookRtcBaseVC: UIViewController {
    var closebtn:UIButton?
    var dic:Dictionary<String,Any>?
    var contentBgView:UIView?;
    var liveUrl = ""
    //聊天室id，即直播数据的id
    var currentRoomid:String?
    
    var videoStream : RCRTCVideoInputStream?
    override func viewDidLoad() {
        super.viewDidLoad()
        contentBgView = UIView.init(frame: CGRect.init(x: 0, y: 0, width: kScreenWidth, height: kScreenHeight))
        contentBgView?.backgroundColor = .clear
        self.view.addSubview(contentBgView!)
        
        
        closebtn = UIButton.init(type: .custom)
        closebtn!.setImage(UIImage.init(named: "guanbi"), for: .normal)
        closebtn!.addTarget(self, action: #selector(closeBtnAction(btn:)), for: .touchUpInside)
        closebtn!.frame = CGRect.init(x: kScreenWidth-50, y: kScreenHeight-60, width: 40, height: 40)
        self.view.addSubview(closebtn!)
        joinRoom()
    }
    // MARK: -close
    @objc func closeBtnAction(btn:UIButton){
        RCRTCEngine.sharedInstance().unsubscribeLiveStream(liveUrl) { (isSuccess, code) in
            
        }
        rtcWindowManager.closeRtcWindow()
        //退出聊天室
        RCIMClient.shared()?.quitChatRoom(self.currentRoomid, success: {
            
        }, error: { (code) in
            
        })
    }
    func joinChatRoomSuccess(){
        
    }
    // MARK: -观看直播
    func joinRoom(){
        
        if let liveurl = dic?["liveUrl"] as? String{
            liveUrl = liveurl
        }
        if let chatid = dic?["roomid"] as? String {
            currentRoomid = "\(chatid)"
            //设置消息静默
            
            //加入对应的聊天室
            RCIMClient.shared()?.joinChatRoom("\(chatid)", messageCount: 1, success: {
                self.joinChatRoomSuccess()

            }, error: { (code) in

            })
        }
        
        
        RCRTCEngine.sharedInstance().subscribeLiveStream(liveUrl, streamType: .audioVideo) {[weak self] (code, inputStream) in
            
            
            if code == RCRTCCode.success{
                
                if inputStream?.mediaType == RTCMediaType.video{
                    let remoteView = RCRTCRemoteVideoView.init(frame: CGRect.init(x: 0, y: 0, width: kScreenWidth, height: kScreenHeight))
                    remoteView.fillMode = .aspectFill
                    //RCRTCInputStream  RCRTCVideoInputStream
                    if let stream = inputStream as? RCRTCVideoInputStream{
                        stream.setVideoView(remoteView)
                       
                    }
                    DispatchQueue.main.async {
                        self?.view.addSubview(remoteView)
                        self?.view.addSubview((self?.contentBgView)!)
                        self?.view.addSubview((self?.closebtn)!)
                    }
                    
                }else if inputStream?.mediaType == RTCMediaType.audio{
                    
                }
                
            }else{
                self?.showAlerController(title: "资源出错", message: "")
            }
            
        }
        
        
        if let seeid = dic?["id"] as? NSNumber{
            CoreWork.updateSeecount(id: "\(seeid)") { (obj) in
                
            }
        }
    }
    
}
