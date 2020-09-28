//
//  BackPwdViewController.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/8.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

class BackPwdViewController: BaseViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = "修改密码"
        let pwdView = Bundle.main.loadNibNamed("BackPWDView", owner: nil, options: nil)?.last as! BackPWDView
        self.view.addSubview(pwdView)
        pwdView.snp.makeConstraints { (make) in
            make.top.equalTo(getNavHeight())
            make.left.right.equalTo(0)
            make.height.equalTo(320)
        }
        
    }
    

    
    

}
