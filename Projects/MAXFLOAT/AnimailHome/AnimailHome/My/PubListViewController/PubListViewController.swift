//
//  PubListViewController.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/21.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

class PubListViewController: BaseViewController {
    /*
     * 已发布的类型
     * 0 宠物寻找 1流浪宠物 2宠物领养
     */
    var queryType : Int?
    var _tableView:AnimalHelpTableView?
    var pageSize = 10
    override func viewDidLoad() {
        super.viewDidLoad()
        
        if queryType == 0{
            self.title = "招领"
        }else if queryType == 1{
            self.title = "寻回"
        }else if queryType == 2{
            self.title = "领养"
        }
        _tableView = AnimalHelpTableView.init(frame: CGRect.zero, style: .grouped)
        _tableView?.canEdit = true
        self.view.addSubview(_tableView!)
        
        
        _tableView?.shareType = "1"
        _tableView?.queryType = queryType
        _tableView?.loadData()
        _tableView?.snp.makeConstraints({ (make) in
            make.left.right.equalTo(0)
            make.bottom.equalTo(0)
            make.top.equalTo(getNavHeight())
        })
        
        if #available(iOS 11.0, *) {
            _tableView?.contentInsetAdjustmentBehavior = .never
        } else {
            self.automaticallyAdjustsScrollViewInsets = false
        }
        
    }
    

    
    
    
}
