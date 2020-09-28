//
//  PubViewController.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/22.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

class PubViewController: BaseViewController {
    /*
     * 已发布的类型
     * 0 宠物寻找 1流浪宠物 2宠物领养
     */
    var pubType : Int?
    var pubView:PubHelpView?
    var table:UITableView?
    override func viewDidLoad() {
        super.viewDidLoad()
        if pubType == 0{
            self.title = "发布招领"
        }else if pubType == 1{
            self.title = "发布寻回"
        }else if pubType == 2{
            self.title = "发布领养"
        }
        
        table = UITableView.init()
        self.view.addSubview(table!)
        table?.tableFooterView = UIView()
        pubView = Bundle.main.loadNibNamed("PubHelpView", owner: nil, options: nil)?.last as? PubHelpView
        pubView?.pubType = pubType
        table?.tableHeaderView = pubView
        
        table?.snp.makeConstraints { (make) in
            make.top.equalTo(getNavHeight())
            make.left.right.bottom.equalTo(0)
        }
        if #available(iOS 11.0, *) {
            table?.contentInsetAdjustmentBehavior = .never
        } else {
            self.automaticallyAdjustsScrollViewInsets = false
        }
    }
   
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        pubView?.frame = CGRect.init(x: 0, y: 0, width: kScreenWidth, height: 497 + kScreenWidth)
        table?.tableHeaderView = pubView
    }
    
}
