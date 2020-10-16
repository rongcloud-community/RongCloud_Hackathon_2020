//
//  SystemMsgViewController.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/9.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

class SystemMsgViewController: BaseViewController {
    var dic: Dictionary<String, Any>?
    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = "公告详情"
        let label = UILabel.init()
        label.adjustsFontSizeToFitWidth = true
        label.text = dic?["title"] as? String
        label.textAlignment = .center
        label.numberOfLines = 0
        self.view.addSubview(label)
        
        let textV = UITextView()
        textV.isEditable = false
        textV.text = dic?["content"] as? String
        textV.font = UIFont.systemFont(ofSize: 15)
        textV.textColor = UIColor.darkGray
        self.view.addSubview(textV)
        
        label.snp.makeConstraints { (make) in
            make.left.equalTo(10)
            make.right.equalTo(-10)
            make.top.equalTo(getNavHeight())
            make.height.equalTo(60)
        }
        textV.snp.makeConstraints { (make) in
            make.top.equalTo(label.snp.bottom)
            make.bottom.equalTo(0)
            make.left.equalTo(10)
            make.right.equalTo(-10)
        }
        
    }
    

    

}
