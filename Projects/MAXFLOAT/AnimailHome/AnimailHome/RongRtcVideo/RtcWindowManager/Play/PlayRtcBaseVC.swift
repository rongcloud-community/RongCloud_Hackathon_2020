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
        playOC?.joinLiveRoom(userInfo.userid, block: {[weak self] (videoView, room, url) in
            if url.count == 0{
                self?.showAlerController(title: "创建房间失败", message: "请重新开启直播")
                return
            }
            videoView.frame = CGRect.init(x: 0, y: 0, width: kScreenWidth, height: kScreenHeight)
            
            self?.view.addSubview(videoView)
            self?.view.addSubview((self?.contentBgView)!)
            self?.view.addSubview((self?.closebtn)!)
            self?.room = room
            self?.room?.delegate = self
            self?.dic?["liveurl"] = url
            self?.pubToService()
        })
        
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
        //        RCRTCEngine.sharedInstance().leaveRoom(userInfo.userid) { (isSuccess, code) in
        //            self.room = nil;
        //        }
        playOC?.leaveRoomRoomID(userInfo.userid, block: {[weak self] (isSuccess) in
            self?.room = nil
        })
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
    //获取当前直播房间数据
    func getCurrentRoomInfoInService(){
        CoreWork.getLiveList(page: "1", pagesize: "5", pub_id: userInfo.userid) { (obj) in
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
                                        if let liveid = dic["roomid"] as? String {
                                            if (self.currentRoomid == nil)  {
                                                self.currentRoomid = "\(liveid)"
                                                let ssid = dic["id"] as? NSNumber
                                                self.live_id = "\(ssid ?? (0))"
                                                //加入聊天室
                                                RCIMClient.shared()?.joinChatRoom(self.currentRoomid, messageCount: 1, success: {
                                                    
                                                }, error: { (code) in
                                                    
                                                })
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
    }
    
    
}
