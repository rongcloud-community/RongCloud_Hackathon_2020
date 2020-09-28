//
//  ExtensionMyViewController.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/10.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

extension MyViewController{
    //退出登录
    func logOut(){
        if userInfo.isLogin == false {
            self.showAlerController(title: "您还未登录", message: "请先登录")
            return;
        }
        let alert = UIAlertController.init(title: "您确定要退出登录吗", message: "退出登录后部分功能将无法使用", preferredStyle: .alert)
        let cancelAction = UIAlertAction.init(title: "取消", style: .default, handler: nil)
        let sureAction = UIAlertAction.init(title: "确定", style: .default) { (action) in
            userInfo.clear()
            self.headerView?.setUserInfo()
        }
        alert.addAction(cancelAction)
        alert.addAction(sureAction)
        self.present(alert, animated: true, completion: nil)
    }
    //清除缓存
    func cleanCach(){
        let intg = SDImageCache.shared().getSize()
        let size = intg/1000/1000
        let sizeStr = String.init(format: "%d", size)
        let alert = UIAlertController.init(title: "清除缓存", message: "当前缓存" + sizeStr + "M", preferredStyle: .alert)
        let cancelAction = UIAlertAction.init(title: "取消", style: .default, handler: nil)
        let sureAction = UIAlertAction.init(title: "确定", style: .default) { (action) in
            let hud = MBProgressHUD.showAdded(to: (self.view)!, animated: true)
            hud.label.text = "正在清除缓存"
            hud.mode = .indeterminate;
            hud.removeFromSuperViewOnHide = true
            SDImageCache.shared().clearDisk(onCompletion: {
                hud.hide(animated: true)
            })
        }
        alert.addAction(cancelAction)
        alert.addAction(sureAction)
        self.present(alert, animated: true, completion: nil)
        
    }
    
}

