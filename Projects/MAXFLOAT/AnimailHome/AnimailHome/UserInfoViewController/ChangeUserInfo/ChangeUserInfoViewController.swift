//
//  ChangeUserInfoViewController.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/10.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

class ChangeUserInfoViewController: BaseViewController {

    var controllerTitle = ""
    let textV = UITextView.init()
    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = "修改" + controllerTitle
        textV.font = UIFont.systemFont(ofSize: 16)
        textV.layer.cornerRadius = 4
        textV.layer.masksToBounds = true
        textV.layer.borderWidth = 1
        textV.layer.borderColor = UIColor.groupTableViewBackground.cgColor
        self.view.addSubview(textV)
        if controllerTitle == "昵称" {
            textV.text = userInfo.nickname
        }else if controllerTitle == "性别" {
            textV.text = userInfo.sex
        }else if controllerTitle == "地址" {
            textV.text = userInfo.addr
        }else if controllerTitle == "个性签名" {
            textV.text = userInfo.sign
        }else if controllerTitle == "年龄" {
            textV.text = userInfo.age
        }
        let sureBtn = UIButton.init(type: .system)
        sureBtn.layer.cornerRadius = 4
        sureBtn.layer.masksToBounds = true
        sureBtn.setTitle("确认修改", for: .normal)
        sureBtn.backgroundColor = UIColor.init(red: 0.0, green: 147.0/255.0, blue: 226.0/255.0, alpha: 1)
        sureBtn.setTitleColor(UIColor.white, for: .normal)
        sureBtn.addTarget(self, action: #selector(SureBtnAction(btn:)), for: .touchUpInside)
        self.view.addSubview(sureBtn)
        
        textV.snp.makeConstraints { (make) in
            make.left.equalTo(20)
            make.top.equalTo(getNavHeight()+20)
            make.right.equalTo(-20)
            make.height.equalTo(150)
        }
        sureBtn.snp.makeConstraints { (make) in
            make.left.equalTo(20)
            make.height.equalTo(40)
            make.right.equalTo(-20)
            make.top.equalTo(textV.snp.bottom).offset(50)
        }
        
    }
    

    @objc func SureBtnAction(btn:UIButton){
        if textV.text.count == 0 {
            self.showAlerController(title: "内容错误", message: "请输入更改内容")
            return;
        }
        if controllerTitle == "性别" {
            if (textV.text == "男" || textV.text == "女") == false{
                self.showAlerController(title: "性别输入错误", message: "请输入男或女")
                return
            }
        }
        var keyStr = ""
        
        if controllerTitle == "昵称" {
            keyStr = "name"
        }else if controllerTitle == "性别" {
            keyStr = "sex"
        }else if controllerTitle == "地址" {
            keyStr = "addr"
        }else if controllerTitle == "个性签名" {
            keyStr = "sdesc"
        }else if controllerTitle == "年龄" {
            keyStr = "age"
        }
        if keyStr.count == 0{
            return;
        }
        var parmas = ["id":userInfo.userid]
        parmas["phone"] = userInfo.phone
        parmas[keyStr] = textV.text
        let hud = MBProgressHUD.showAdded(to: (self.view)!, animated: true)
        hud.label.text = "正在修改"
        hud.mode = .indeterminate;
        hud.removeFromSuperViewOnHide = true
        CoreWork.changeUserInfo(parms: parmas, Block: {[weak self] (obj) in
            hud.hide(animated: true)
            if obj is Dictionary<String,Any>{
                if Int(obj["code"] as! String) == 0{
                    if self?.controllerTitle == "昵称" {
                        userInfo.nickname = (self?.textV.text)!
                    }else if self?.controllerTitle == "性别" {
                        userInfo.sex = (self?.textV.text)!
                    }else if self?.controllerTitle == "地址" {
                        userInfo.addr = (self?.textV.text)!
                    }else if self?.controllerTitle == "手机号" {
                        userInfo.phone = (self?.textV.text)!
                    }else if self?.controllerTitle == "个性签名" {
                        userInfo.sign = (self?.textV.text)!
                    }else if self?.controllerTitle == "年龄" {
                        userInfo.age = (self?.textV.text)!
                    }; self?.navigationController?.popViewController(animated: true)
                }else{
                    self?.showAlerController(title: "修改失败", message: "")
                }
            }
        })
        
    }
   
    

}
