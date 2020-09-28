//
//  PlayRtcBaseVC.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2020/9/20.
//  Copyright © 2020 XianHong zhang. All rights reserved.
//

import UIKit

class PlayRtcBaseVC: UIViewController, RCRTCRoomEventDelegate {
    var contentBgView:UIView?;
    var room:RCRTCRoom?
    var closebtn:UIButton?
    var playOC:PlayRtcOC?
    var dic:Dictionary<String,Any>?
    //定时器
    var timer:Timer?;
    //聊天室id，
    var currentRoomid:String?
    //直播数据的id
    var live_id:String?
    override func viewDidLoad() {
        super.viewDidLoad()
        contentBgView = UIView.init()
        contentBgView?.backgroundColor = .clear
        self.view.addSubview(contentBgView!)
        playOC = PlayRtcOC.init()
        closebtn = UIButton.init(type: .custom)
        closebtn!.setImage(UIImage.init(named: "guanbi"), for: .normal)
        closebtn!.addTarget(self, action: #selector(closeBtnAction(btn:)), for: .touchUpInside)
        closebtn!.frame = CGRect.init(x: kScreenWidth-50, y: kScreenHeight-60, width: 40, height: 40)
        self.view.addSubview(closebtn!)
        contentBgView?.snp_makeConstraints({ (make) in
            make.left.right.top.bottom.equalTo(0)
        })
        creatLiveRoom()
        
        //开启定时器
        timer = Timer.scheduledTimer(timeInterval: 10, target: self, selector: #selector(timerAction(_:)), userInfo: nil, repeats: true)
    }
    @objc func timerAction(_ stimer:Timer){
        if self.live_id != nil{
            CoreWork.updateLive(id: live_id ?? "", isShow: "1") { (obj) in
            }
        }
    }
    // MARK: -close
    @objc func closeBtnAction(btn:UIButton){
        RCRTCEngine.sharedInstance().unsubscribeLiveStream("") { (isSuccess, code) in
            
        }
        self.leaveChannel()
        rtcWindowManager.closeRtcWindow()
    }
    
    //MARK: -离开房间
    func leaveChannel(){
        if timer != nil {
            timer?.invalidate()
        }
        RCRTCEngine.sharedInstance().leaveRoom(userInfo.userid) { (isSuccess, code) in
            self.room = nil;
        }
        
        CoreWork.updateLive(id: live_id ?? "", isShow: "0") { (obj) in
        }
        //退出聊天室
        RCIMClient.shared()?.quitChatRoom(self.currentRoomid, success: {
            
        }, error: { (code) in
            
        })
    }
    func pubToService(){
        let imgurl = dic?["imgurl"] as? String
        let imgid = dic?["imgid"] as? String
        let liveurl = dic?["liveurl"] as? String
        let title = dic?["title"] as? String
        CoreWork.addLive(pub_id: userInfo.userid, imgurl:imgurl ?? "" , imgid:imgid ?? "" , liveUrl: liveurl ?? "", title: title ?? "") { [weak self](obj) in
            self?.getCurrentRoomInfoInService()
        }
        
        
    }
    // MARK: - 创建一个直播类型的房间
    func creatLiveRoom(){
        let config = RCRTCRoomConfig.init()
        config.roomType = .live //房间类型 直播
        config.liveType = .audioVideo//当前直播为音视频
        
        
        RCRTCEngine.sharedInstance().joinRoom(userInfo.userid, config: config) { (room, code) in
            self.room = room
            self.room?.delegate = self
            let localVideoView = RCRTCLocalVideoView.init(frame: CGRect.init(x: 0, y: 0, width: kScreenWidth, height: kScreenHeight))
            localVideoView.fillMode = .aspectFill
            self.view.addSubview(localVideoView)
            self.view.addSubview(self.contentBgView!)
            self.view.addSubview(self.closebtn!)
            RCRTCEngine.sharedInstance().defaultVideoStream.setVideoView(localVideoView)
            //开始采集音频流
            RCRTCEngine.sharedInstance().defaultVideoStream.startCapture()
            
            self.publishLocalLiveAVStream()
            
            //加入房间时已经有远端用户
            if self.room?.remoteUsers.count ?? 0 > 0{
                var streamArr:Array<RCRTCInputStream> = Array.init()
                for user in (self.room?.remoteUsers)! {
                    streamArr.append(contentsOf: user.remoteStreams)
                }
                //订阅音视频流
                self.room?.localUser.subscribeStream(streamArr, tinyStreams: nil, completion: { (isSuccess, code) in
                    
                })
            }
        }
        
    }
    // MARK: - 发布资源
    func publishLocalLiveAVStream(){
        self.room?.localUser.publishDefaultLiveStream({ [weak self](isSuccess, code, liveInfo) in
            //liveInfo.liveUrl 保存到服务器
            if liveInfo?.liveUrl.count == 0{
                self?.showAlerController(title: "创建房间失败", message: "请重新开启直播")
                return
            }
            
            self?.dic?["liveurl"] = (liveInfo?.liveUrl)!
            self?.pubToService()
            self?.currentRoomid = userInfo.userid
            RCIMClient.shared()?.joinChatRoom(self?.currentRoomid, messageCount: 1, success: {
            
                                                            }, error: { (code) in
            
                                                            })
            
        })
    }
    //获取当前直播房间数据
    func getCurrentRoomInfoInService(){
        CoreWork.getLiveList(page: "1", pagesize: "5", pub_id: userInfo.userid) {[weak self] (obj) in
            if obj is Dictionary<String,Any>{
                let dic = obj["data"] as? Dictionary<String,Any>
                if dic != nil{
                    let code = dic?["code"]
                    if code is NSNumber {
                        let newcode = code as! NSNumber;
                        if newcode.intValue == 0 {
                            let arr = dic?["data"] as? Array<Any>
                            if arr != nil {
                                for  i:Int in 0..<arr!.count {
                                    if let dic = arr![i] as? Dictionary<String,Any>{
                                        let ssid = dic["id"] as? NSNumber
                                        self?.live_id = "\(ssid ?? (0))"
                                       
                                    }
                                }
                            }
                        }
                    }
                    
                }
            }
            
        }
    }
    
    
}
