//
//  IdeaBackViewController.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/25.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

class IdeaBackViewController: BaseViewController {

    let textV = UITextView()
    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = "意见反馈"
        textV.layer.cornerRadius = 4
        textV.layer.masksToBounds = true
        textV.backgroundColor = UIColor.groupTableViewBackground
        self.view.addSubview(textV)
        
        let upBtn = UIButton.init(type: .system)
        upBtn.layer.cornerRadius = 4
        upBtn.layer.masksToBounds = true
        upBtn.backgroundColor = UIColor.init(red: 0, green: 147.0/255.0, blue: 226.0/255.0, alpha: 1)
        upBtn.setTitle("提交", for: .normal)
        upBtn.setTitleColor(UIColor.white, for: .normal)
        upBtn.addTarget(self, action: #selector(upBtnAction(btn:)), for: .touchUpInside)
        self.view.addSubview(upBtn)
        
        textV.snp.makeConstraints { (make) in
            make.top.equalTo(getNavHeight()+20)
            make.height.equalTo(200)
            make.left.equalTo(20)
            make.right.equalTo(-20)
        }
        upBtn.snp.makeConstraints { (make) in
            make.left.equalTo(20)
            make.right.equalTo(-20)
            make.top.equalTo(textV.snp.bottom).offset(50)
            make.height.equalTo(40)
        }
        
    }
    @objc func upBtnAction(btn:UIButton){
        if textV.text.count == 0 {
            self.showAlerController(title: "请填写内容", message: "")
            return;
        }
        let hud = MBProgressHUD.showAdded(to: self.view, animated: true)
        hud.label.text = "正在提交"
        hud.mode = .indeterminate;
        hud.removeFromSuperViewOnHide = true
        CoreWork.upIdeaBackList(content: textV.text!) {[weak self] (obj) in
            hud.hide(animated: true)
            self?.showAlerController(title: "提交成功", message: "")
//            if obj is Dictionary<String,Any>{
//                if Int(obj["code"] as! String) == 200{
//                    self?.showAlerController(title: "提交成功", message: "")
//                    return;
//                }
//            }
        }
    }
    
}
