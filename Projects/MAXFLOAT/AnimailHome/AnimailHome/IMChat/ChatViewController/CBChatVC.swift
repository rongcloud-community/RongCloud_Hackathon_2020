//
//  CBChatVC.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2020/9/17.
//  Copyright © 2020 XianHong zhang. All rights reserved.
//

import UIKit

class CBChatVC: RCConversationViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
//是否显示发送者的名字
        self.displayUserNameInCell = false;
        if targetId == nil {
            
            return
        }
       if let sendUser = RCIM.shared()?.getUserInfoCache(targetId){
        
           if let imgurl = sendUser.portraitUri {
               if imgurl.contains("https://") == false{
                   let newimgurl = BaseImgUrl + imgurl
                   sendUser.portraitUri = newimgurl
                   RCIM.shared()?.refreshUserInfoCache(sendUser, withUserId: targetId)
               }
           }
           
       }
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
//        [IQKeyboardManager sharedManager].enable = YES;
//        [IQKeyboardManager sharedManager].enableAutoToolbar = YES;
        IQKeyboardManager.shared().isEnabled = false;
        IQKeyboardManager.shared().isEnableAutoToolbar = false;
    }
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        IQKeyboardManager.shared().isEnabled = true;
        IQKeyboardManager.shared().isEnableAutoToolbar = true;
    }

}
