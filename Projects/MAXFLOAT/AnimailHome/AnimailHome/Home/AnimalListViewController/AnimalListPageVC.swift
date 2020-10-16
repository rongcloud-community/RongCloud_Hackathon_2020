//
//  AnimalListPageVC.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2020/9/10.
//  Copyright © 2020 XianHong zhang. All rights reserved.
//

import UIKit

class AnimalListPageVC: BaseViewController {

    var tableView:AnimalListTableView?
    var type:String?
    override func viewDidLoad() {
        super.viewDidLoad()
        tableView = AnimalListTableView.init();
        self.view.addSubview(tableView!)
        tableView?.type = type
        tableView?.snp_makeConstraints({ (make) in
            make.left.right.bottom.top.equalTo(0)
        });
        
        tableView?.loadData()
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
