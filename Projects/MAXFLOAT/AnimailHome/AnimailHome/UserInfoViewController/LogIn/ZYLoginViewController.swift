//
//  ZYLoginViewController.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/9.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

class ZYLoginViewController: BaseViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = "登录"
        self.view.backgroundColor = UIColor.white
        let loginView = Bundle.main.loadNibNamed("LoginView", owner: nil, options: nil)?.last as! LoginView
        self.view.addSubview(loginView)
        loginView.center = CGPoint.init(x: kScreenWidth/2, y: kScreenHeight/2-50)
    }
    

    
    

}
