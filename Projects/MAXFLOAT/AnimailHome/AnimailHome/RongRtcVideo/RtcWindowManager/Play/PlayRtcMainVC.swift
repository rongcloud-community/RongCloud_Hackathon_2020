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
        //头像昵称
        let imgV = UIImageView.init(frame: CGRect.init())
        imgV.layer.cornerRadius = 20
        imgV.layer.masksToBounds = true
        self.contentBgView?.addSubview(imgV)
        imgV.sd_setImage(with: URL.init(string:BaseImgUrl + userInfo.imgUrl))
        let namelabel = UILabel.init()
        namelabel.textColor = .white
        namelabel.font = .systemFont(ofSize: 12)
        self.contentBgView?.addSubview(namelabel)
        namelabel.text = userInfo.name
        
        imgV.snp_makeConstraints { (make) in
            make.right.equalTo(-10)
            make.top.equalTo(34)
            make.width.height.equalTo(40)
        }
        namelabel.snp_makeConstraints { (make) in
            make.right.equalTo(imgV.snp_left).offset(-10)
            make.centerY.equalTo(imgV.snp_centerY)
        }
        let tap = UITapGestureRecognizer.init(target: self, action: #selector(contentBgViewTap))
        tap.numberOfTouchesRequired = 1
        tap.numberOfTapsRequired = 1
        self.contentBgView?.addGestureRecognizer(tap)
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
    }
    deinit{
        if (self.timer != nil){
            self.timer?.invalidate()
        }
        NotificationCenter.default.removeObserver(self, name: NSNotification.Name(rawValue: "receivemessage"), object: nibName)
    }
    
    
}
