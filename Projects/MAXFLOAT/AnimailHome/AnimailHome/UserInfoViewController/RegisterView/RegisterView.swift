//
//  RegisterView.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/9.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

class RegisterView: UIView {
    var hud : MBProgressHUD?
    @IBOutlet weak var phoneT: UITextField!
    
    @IBOutlet weak var codeT: UITextField!
    
    @IBOutlet weak var pwdT: UITextField!
    
    @IBOutlet weak var rePWDT: UITextField!
    
    @IBOutlet weak var registerBtn: UIButton!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        registerBtn.layer.cornerRadius = 4
        registerBtn.layer.masksToBounds = true
    }

    
    @IBAction func getCodeBtnAction(_ sender: UIButton) {
        
        if phoneT.text?.validateMobile() == false {
            self.zytviewController()?.showAlerController(title: "无法获取验证码", message: "手机号格式不对")
            return;
        }
        sender.getCodeTime()
        SMSSDK.getVerificationCode(by: .SMS, phoneNumber: phoneT.text, zone: "86", template: nil) { (error) in
            
        }
    }
    
    @IBAction func registerBtnAction(_ sender: Any) {
        if phoneT.text?.validateMobile() == false {
            self.zytviewController()?.showAlerController(title: "手机号有误", message: "")
            return;
        }
        if pwdT.text?.count == 0 || pwdT.text != rePWDT.text || codeT.text?.count == 0{
            self.zytviewController()?.showAlerController(title: "信息有误", message: "")
            return
        }
        hud = MBProgressHUD.showAdded(to: (self.zytviewController()?.view)!, animated: true)
        hud?.label.text = "正在注册"
        hud?.mode = .indeterminate;
        hud?.removeFromSuperViewOnHide = true
        SMSSDK.commitVerificationCode(codeT.text, phoneNumber: phoneT.text, zone: "86") { (error1) in
            if error1 == nil{
                self.register()
            }else{
                self.zytviewController()?.showAlerController(title: "验证码有误", message: "")
                self.hud?.hide(animated: true)
            }
        }
        
    }
    
    func register(){
        
        CoreWork.registerUser(phone: phoneT.text!, pwd: pwdT.text!) { [weak self](obj) in
            
            self?.hud?.hide(animated: true)
            if obj is Dictionary<String,Any>{
                if Int(obj["code"] as! String) == 200{
                    let alert = UIAlertController.init(title: "注册成功", message: "", preferredStyle: .alert)
                    let action = UIAlertAction.init(title: "确定", style: .default, handler: { (action) in
                        self?.zytviewController()?.navigationController?.popToRootViewController(animated: true)
                    })
                    alert.addAction(action)
                    self?.zytviewController()?.present(alert, animated: true, completion: nil)
                }else{
                    self?.zytviewController()?.showAlerController(title: "注册失败", message: "")
                }
            }else{
                self?.zytviewController()?.showAlerController(title: "请求失败", message: "")
            }
            
        }
    }
    
}
