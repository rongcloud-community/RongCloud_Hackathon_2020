    //
//  PubTypeViewController.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/21.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

class PubTypeViewController: BaseViewController {
    /*
     * 1是查询
     * 2是发布
     */
    var pubTyep : Int?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = "选择类型"
        let imgNameArr = ["animalWander","animalLook","animalAdope"]
       //创建三个按钮 宠物寻找 流浪宠物 宠物领养
        let space:CGFloat = 20
        let btnHeight = (kScreenHeight-getNavHeight()-space*4)/3
        for i in 0..<3 {
            let btn = UIButton.init(type: .custom)
            btn.frame = CGRect.init(x: 20, y: (btnHeight + space) * CGFloat(i) + space + getNavHeight(), width: kScreenWidth-40, height: btnHeight)
            btn.tag = 100 + i
            btn.setImage(UIImage.init(named: imgNameArr[i]), for: .normal)
            btn.layer.cornerRadius = 6
            btn.layer.masksToBounds = true
            btn.addTarget(self, action: #selector(btnAction(btn:)), for: .touchUpInside)
            self.view.addSubview(btn)
        }
    }
    @objc func btnAction(btn:UIButton){
        let btnTag = btn.tag-100;
        //btnTag 0 宠物寻找 1流浪宠物 2宠物领养
        if pubTyep == 1 {//查询
           let viewC = PubListViewController()
            viewC.animationType = .noneAnimation
            viewC.queryType = btnTag
            self.navigationController?.pushViewController(viewC, animated: true)
        }else if pubTyep == 2{//发布
            let viewC = PubViewController()
            viewC.animationType = .noneAnimation
            viewC.pubType = btnTag
            self.navigationController?.pushViewController(viewC, animated: true)
        }
    }
   
    
}
