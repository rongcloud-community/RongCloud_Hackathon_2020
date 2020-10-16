//
//  PlayRtcMainVC.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2020/9/20.
//  Copyright © 2020 XianHong zhang. All rights reserved.
//

import UIKit

class PlayRtcMainVC: PlayRtcBaseVC {
    
    var sinputView:MsgInputButtomView?
    var tabview:MsgListTabView?
    var topRightView:RtcTopRightView?
    var pListView:RoomPersonListView?
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //接收消息中心
        NotificationCenter.default.addObserver(self, selector: #selector(notiaction(noti:)), name: NSNotification.Name(rawValue: "receivemessage"), object: nil)
        //距离底部距离
        var bottomspace = 50.0
        if PlayRtcOC.isSafaBottom() == true{
            bottomspace = 60.0
        }
        
        
        
        tabview = MsgListTabView.init(frame: CGRect.init(x: 0, y: kScreenHeight/2+100, width: kScreenWidth-100, height: kScreenHeight/2-100-CGFloat(bottomspace)), style: .grouped)
        
        
        self.contentBgView?.addSubview(tabview!)
        sinputView = MsgInputButtomView(frame: CGRect.init(x: 0, y: kScreenHeight-CGFloat(bottomspace), width: kScreenWidth-100, height: 30))
        self.contentBgView?.addSubview(sinputView!)
        sinputView?.btn?.addTarget(self, action: #selector(sendAction(btn:)), for: .touchUpInside)
        sinputView?.liwuBtn?.setBackgroundImage(UIImage.init(named: "live_renshu"), for: .normal)
        sinputView?.liwuBtn?.addTarget(self, action: #selector(showChatRoomPersonList), for: .touchUpInside)
        //顶部右侧视图
        topRightView = RtcTopRightView.init(frame: CGRect.zero)
        topRightView?.pBtn.addTarget(self, action: #selector(showChatRoomPersonList), for: .touchUpInside)
        self.contentBgView?.addSubview(topRightView!)
        topRightView?.snp_makeConstraints({ (make) in
            make.right.equalTo(-10)
            make.top.equalTo(34)
            make.width.equalTo(100)
            make.height.equalTo(50)
        })
        //静音按钮
        let voiceBtn = UIButton.init(type: .custom)
        self.contentBgView?.addSubview(voiceBtn)
        voiceBtn.addTarget(self, action: #selector(changeVoiceBtn(btn:)), for: .touchUpInside)
        voiceBtn.setBackgroundImage(UIImage.init(named: "live_voiceclose"), for: .normal)
        voiceBtn.setBackgroundImage(UIImage.init(named: "live_voiceopen"), for: .selected)
        //切换摄像头按钮
        let carmaBtn = UIButton.init(type: .custom)
        self.contentBgView?.addSubview(carmaBtn)
        carmaBtn.addTarget(self, action: #selector(changeCarma), for: .touchUpInside)
        carmaBtn.setBackgroundImage(UIImage.init(named: "live_carma"), for: .normal)
        
        voiceBtn.snp_makeConstraints { (make) in
            make.bottom.equalTo((self.contentBgView?.snp_centerY)!).offset(-10)
            make.right.equalTo(-10)
            make.width.height.equalTo(40)
        }
        carmaBtn.snp_makeConstraints { (make) in
            make.top.equalTo((self.contentBgView?.snp_centerY)!).offset(10)
            make.right.equalTo(-10)
            make.width.height.equalTo(40)
        }
        //聊天室人员列表
        pListView = RoomPersonListView.init(frame: CGRect.init(x: 0, y: kScreenHeight, width: kScreenWidth, height: kScreenHeight/2))
        self.contentBgView?.addSubview(pListView!)
        
        
        let tap = UITapGestureRecognizer.init(target: self, action: #selector(contentBgViewTap))
        tap.numberOfTouchesRequired = 1
        tap.numberOfTapsRequired = 1
        self.contentBgView?.addGestureRecognizer(tap)
    }
    override func sendChatMsg() {
        //群发自己的魅力值，让聊天室中成员更新
        
        sendMsg(txt: TxtMsgKeyType.mlCountKey.rawValue, extra: "\((self.topRightView?.mlCount)!)")
        self.topRightView?.pCount = (pListView?.dataArr?.count)!
        self.topRightView?.pBtn.setTitle( "\((self.topRightView?.pCount)!)" + "人", for: .normal)
        sendMsg(txt: TxtMsgKeyType.persionCountKey.rawValue, extra: "\((self.topRightView?.pCount)!)")
    }
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
//        IQKeyboardManager.shared().isEnabled = false;
//        IQKeyboardManager.shared().isEnableAutoToolbar = false;
    }
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
//        IQKeyboardManager.shared().isEnabled = true;
//        IQKeyboardManager.shared().isEnableAutoToolbar = true;
    }
    @objc func contentBgViewTap(){
        sinputView?.textF?.resignFirstResponder()
        hiddenChatRoomPersonList()
    }
    @objc func showChatRoomPersonList(){
        sinputView?.textF?.resignFirstResponder()
        UIView.animate(withDuration: 0.35) {
            var rect = self.pListView?.frame
            rect?.origin.y = kScreenHeight-(self.pListView?.height)!
            self.pListView?.frame = rect!
        }
    }
    @objc func hiddenChatRoomPersonList(){
        sinputView?.textF?.resignFirstResponder()
        UIView.animate(withDuration: 0.35) {
            var rect = self.pListView?.frame
            rect?.origin.y = kScreenHeight
            self.pListView?.frame = rect!
        }
    }
    
    deinit{
        if (self.timer != nil){
            self.timer?.invalidate()
        }
        NotificationCenter.default.removeObserver(self, name: NSNotification.Name(rawValue: "receivemessage"), object: nibName)
    }
    
    
}
