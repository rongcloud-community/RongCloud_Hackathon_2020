//
//  RigisterViewController.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/8.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

class RigisterViewController: BaseViewController {
  
    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = "注册"
        let registerView = Bundle.main.loadNibNamed("RegisterView", owner: nil, options: nil)?.last as! RegisterView
        self.view.addSubview(registerView)
        registerView.center = CGPoint.init(x: kScreenWidth/2, y: kScreenHeight/2-50)
        
    }
   
    
    
}
