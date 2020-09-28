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
