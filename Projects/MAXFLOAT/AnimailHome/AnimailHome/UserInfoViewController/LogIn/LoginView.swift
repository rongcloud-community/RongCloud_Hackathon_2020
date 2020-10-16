//
//  LoginView.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/9.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

class LoginView: UIView {

    @IBOutlet weak var nameT: UITextField!
    
    @IBOutlet weak var pwdT: UITextField!
    
    @IBOutlet weak var loginBtn: UIButton!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        loginBtn.layer.cornerRadius = 6
        loginBtn.layer.masksToBounds = true
    }
    @IBAction func LoginAction(_ sender: Any) {
        if nameT.text?.count == 0 || pwdT.text?.count == 0 {
            return;
        }
        let hud = MBProgressHUD.showAdded(to: (self.zytviewController()?.view)!, animated: true)
        hud.label.text = "正在登录"
        hud.mode = .indeterminate;
        hud.removeFromSuperViewOnHide = true
        CoreWork.loginUser(phone: nameT.text!, pwd: pwdT.text!) { [weak self](obj) in
            
            hud.hide(animated: true)
            if obj is Dictionary<String,Any>{
                let code = obj["code"]
                var scode:NSNumber = (1);
                if code is NSNumber{
                    scode = code as! NSNumber
                }
                if scode.intValue == 0{
                    
                    userInfo.password = (self?.pwdT.text)!
                    UserDefaults.standard.set(userInfo.phone, forKey: "phone")
                    UserDefaults.standard.set(userInfo.password, forKey: "pwd")
                    self?.zytviewController()?.navigationController?.popViewController(animated: true)
                    
                }else{
                    self?.zytviewController()?.showAlerController(title: "信息有误", message: "")
                }
            }else{
                self?.zytviewController()?.showAlerController(title: "信息有误", message: "")
            }
            
        }
    
    }
    
    @IBAction func registrAction(_ sender: Any) {
        let viewC = RigisterViewController()
        viewC.animationType = .flipOverAnimation
        self.zytviewController()?.navigationController?.pushViewController(viewC, animated: true)
    }
    
}
