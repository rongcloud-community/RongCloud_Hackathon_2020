//
//  BackPWDView.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/10.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

class BackPWDView: UIView {

    @IBOutlet weak var phoneT: UITextField!
    
    @IBOutlet weak var oldPwd: UITextField!
    
    @IBOutlet weak var newPWD: UITextField!
    
    @IBOutlet weak var reNewPWD: UITextField!
    
    @IBOutlet weak var sureBtn: UIButton!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        sureBtn.layer.cornerRadius = 4;
        sureBtn.layer.masksToBounds = true
        
    }
    
    
    @IBAction func sureBtnAction(_ sender: Any) {
        if phoneT.text?.count == 0 || newPWD.text?.count == 0 || oldPwd.text?.count == 0 || reNewPWD.text?.count == 0{
            self.zytviewController()?.showAlerController(title: "信息有误", message: "请正确填写信息")
            return;
        }
        if newPWD.text != reNewPWD.text {
            self.zytviewController()?.showAlerController(title: "两次新密码不一致", message: "请正确填写信息")
            return;
        }
//        if phoneT.text?.validateMobile() == false {
//            self.zytviewController()?.showAlerController(title: "手机号格式不正确", message: "请正确填写信息")
//            return;
//        }
        let hud = MBProgressHUD.showAdded(to: (self.zytviewController()?.view)!, animated: true)
        hud.label.text = "正在修改密码"
        hud.mode = .indeterminate;
        hud.removeFromSuperViewOnHide = true
        CoreWork.changeUserPwd(phone: phoneT.text!, pwd: oldPwd.text!,newPwd: newPWD.text!) {[weak self] (obj) in
            
            hud.hide(animated: true)
            if obj is Dictionary<String,Any>{
                if Int(obj["code"] as! String) == 0{
                    userInfo.isLogin = false;
                    let alert = UIAlertController.init(title: "修改成功", message: "请重新登录", preferredStyle: .alert)
                    let action = UIAlertAction.init(title: "确定", style: .default, handler: { (action) in
                        self?.zytviewController()?.navigationController?.popToRootViewController(animated: true)
                    })
                    alert.addAction(action)
                    self?.zytviewController()?.present(alert, animated: true, completion: nil)
                    
                }else {
                    self?.zytviewController()?.showAlerController(title: "修改失败", message: "")
                }
            }
        }
 
    }
    
    
}
