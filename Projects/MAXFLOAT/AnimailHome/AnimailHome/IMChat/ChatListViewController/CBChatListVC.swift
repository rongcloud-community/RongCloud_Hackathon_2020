//
//  CBChatListVC.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2020/9/17.
//  Copyright © 2020 XianHong zhang. All rights reserved.
//

import UIKit

class CBChatListVC: RCConversationListViewController {

    init(){
        super.init(nibName: nil, bundle: nil)
        //接收消息中心
        NotificationCenter.default.addObserver(self, selector: #selector(notiaction(noti:)), name: NSNotification.Name(rawValue: "receivemessage"), object: nil)
        
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    @objc func notiaction(noti:Notification){
        //设置未读角标
        setBadge()
    }
    func setBadge(){
        let msgCount = RCIMClient.shared()?.getTotalUnreadCount() ?? 0
        if msgCount == 0 {
            DispatchQueue.main.async {
                self.tabBarItem.badgeValue = nil
            }
            
        }else{
            DispatchQueue.main.async {
                self.tabBarItem.badgeValue = "\(msgCount)"
            }
        }
        
    }
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        setBadge()
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = "会话"
        self.conversationListTableView.tableFooterView = UIView()
        
        let a = NSNumber.init(value: 1)
        let b = NSNumber.init(value:2)
        let c = NSNumber.init(value:3)
//        let d = NSNumber.init(value:4)
        let e = NSNumber.init(value:5)
        let f = NSNumber.init(value:6)
        let g = NSNumber.init(value:7)
        let h = NSNumber.init(value:11)
        let i = NSNumber.init(value:12)
        
        self.collectionConversationTypeArray = [c,f];
        self.displayConversationTypeArray = [a,b,c,e,f,g,h,i];
        
        
    }
    
    override func onSelectedTableRow(_ conversationModelType: RCConversationModelType, conversationModel model: RCConversationModel!, at indexPath: IndexPath!) {
        let vc = CBChatVC.init(conversationType: model.conversationType, targetId: model.targetId)
        vc?.title = model.conversationTitle;
        vc?.animationType = .flipOverAnimation
        vc?.hidesBottomBarWhenPushed = true
        self.navigationController?.pushViewController(vc!, animated: true)
    }
   deinit{
       NotificationCenter.default.removeObserver(self, name: NSNotification.Name(rawValue: "receivemessage"), object: nibName)
   }
}
