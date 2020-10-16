//
//  FirstguridViewController.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/9.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

class FirstguridViewController: BaseViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        let imgNameArr = ["000","001","002"];
        let scrolView = UIScrollView.init(frame: CGRect.init(x: 0, y: 0, width: kScreenWidth, height: kScreenHeight))
        self.view.addSubview(scrolView)
        scrolView.isPagingEnabled = true
        scrolView.bounces = false
        scrolView.bouncesZoom = false
        scrolView.contentSize = CGSize.init(width: kScreenWidth*CGFloat(imgNameArr.count), height: kScreenHeight)
        var i = 0;
        for name in imgNameArr {
            let imgV = UIImageView.init(frame: CGRect.init(x:CGFloat(i)*kScreenWidth , y: 0, width: kScreenWidth, height: kScreenHeight))
            imgV.contentMode = .scaleToFill
            imgV.image = UIImage.init(named: name)
            scrolView.addSubview(imgV)
            i = i + 1;
        }
        //跳过按钮
        let jumpBtn = UIButton.init(type: .custom)
        jumpBtn.frame = CGRect.init(x: kScreenWidth-80, y: UIApplication.shared.statusBarFrame.height, width: 60, height: 30)
        self.view.addSubview(jumpBtn)
        jumpBtn.addTarget(self, action: #selector(jump), for: .touchUpInside)
        jumpBtn.setTitle("跳过", for: .normal)
        jumpBtn.layer.cornerRadius = 3
        jumpBtn.layer.masksToBounds = true
        jumpBtn.backgroundColor = UIColor.init(red: 0.0, green: 147.0/255.0, blue: 226.0/255.0, alpha: 1)
        
        
        //立即进入按钮
        let enterBtn = UIButton.init(type: .custom)
        enterBtn.backgroundColor = UIColor.init(red: 0.0, green: 147.0/255.0, blue: 226.0/255.0, alpha: 1)
        enterBtn.frame = CGRect.init(x: CGFloat(imgNameArr.count-1)*kScreenWidth+50, y: kScreenHeight-60, width: kScreenWidth-100, height: 40)
        scrolView.addSubview(enterBtn)
        enterBtn.addTarget(self, action: #selector(jump), for: .touchUpInside)
        enterBtn.setTitle("立即进入", for: .normal)
        enterBtn.layer.cornerRadius = 6
        enterBtn.layer.masksToBounds = true
        
        if #available(iOS 11.0, *) {
            scrolView.contentInsetAdjustmentBehavior = .never
        } else {
            self.automaticallyAdjustsScrollViewInsets = false
        }
    }
    
    @objc func jump(){
        UserDefaults.standard.set(false, forKey: "isFirst")
        BaseTabBarController().changeKeyWindowRootViewController()
    }
    
    

}
