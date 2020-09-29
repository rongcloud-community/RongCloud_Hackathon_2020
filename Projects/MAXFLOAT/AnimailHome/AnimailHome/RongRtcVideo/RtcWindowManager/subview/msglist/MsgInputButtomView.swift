//
//  MsgInputButtomView.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2020/9/22.
//  Copyright © 2020 XianHong zhang. All rights reserved.
//

import UIKit

class MsgInputButtomView: UIView {

    var textF:UITextField?
    
    var btn:UIButton?
    var liwuBtn:UIButton?
    override init(frame: CGRect) {
        super.init(frame: frame)
        textF = UITextField.init()
        self.addSubview(textF!)
        textF?.layer.borderColor = UIColor.white.cgColor
        textF?.layer.borderWidth = 1
        textF?.layer.cornerRadius = 6
        textF?.layer.masksToBounds = true
        textF?.textColor = .white
        textF?.font = .systemFont(ofSize: 12)
        textF?.placeholder = "请输入内容"
        
        btn = UIButton.init(type: .custom)
        btn?.setBackgroundImage(UIImage.init(named: "send"), for: .normal)
        self.addSubview(btn!)
        
        liwuBtn = UIButton.init(type: .custom)
        liwuBtn?.setBackgroundImage(UIImage.init(named: "live_liwu"), for: .normal)
        self.addSubview(liwuBtn!)
        liwuBtn?.snp_makeConstraints({ (make) in
            make.top.equalTo(0)
            make.right.equalTo(0)
            make.width.height.equalTo(30)
        })
        btn?.snp_makeConstraints { (make) in
            make.top.equalTo(0)
            make.right.equalTo(liwuBtn!.snp_left).offset(-10);
            make.width.height.equalTo(30)
        }
        textF?.snp_makeConstraints({ (make) in
            make.top.bottom.equalTo(0)
            make.left.equalTo(10)
            make.right.equalTo(btn!.snp_left).offset(-10)
        })
        
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
}
