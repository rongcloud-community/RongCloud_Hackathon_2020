//
//  BaseTabBarController.swift
//  MyPlayer
//
//  Created by z x h  on 2016/10/29.
//  Copyright © 2016年 zxh. All rights reserved.
//

import UIKit

class BaseTabBarController: UITabBarController {

    override func viewDidLoad() {
        super.viewDidLoad()

       
        
    }
    
    func changeKeyWindowRootViewController(){
        
       addChildItem(vc: HomeViewController(), titleName: "首页", tabBarTitleName: "首页", tabBarImageName: "home", tabBarSelImageName: "homeon")
        addChildItem(vc: HelpMainViewController(), titleName: "救助", tabBarTitleName: "救助", tabBarImageName: "help", tabBarSelImageName: "helpon")
        
        addChildItem(vc: CBChatListVC.init(), titleName: "会话", tabBarTitleName: "会话", tabBarImageName: "chat", tabBarSelImageName: "chaton")
        addChildItem(vc: MyViewController(), titleName: "我的", tabBarTitleName: "我的", tabBarImageName: "my", tabBarSelImageName: "myon")
        
        UIApplication.shared.keyWindow?.rootViewController = self;
        
        
    }
    func addChildItem(vc:UIViewController,titleName:String,tabBarTitleName:String,tabBarImageName:String,tabBarSelImageName:String){
        vc.title = titleName
        let img = UIImage.init(named: tabBarImageName)
        let selImg = UIImage.init(named: tabBarSelImageName)
        vc.tabBarItem.image = img?.withRenderingMode(.alwaysOriginal)
        vc.tabBarItem.selectedImage = selImg?.withRenderingMode(.alwaysOriginal)
        UITabBarItem.appearance().setTitleTextAttributes([NSAttributedString.Key.foregroundColor:UIColor.darkGray], for: .normal)
        UITabBarItem.appearance().setTitleTextAttributes([NSAttributedString.Key.foregroundColor:UIColor.init(red: 212/255.0, green: 35/255.0, blue: 122/255.0, alpha: 1.0)], for: .selected)
        let Nav = BaseNavigationController.init(rootViewController:vc)
        Nav.tabBarItem.title = tabBarTitleName
        self.addChild(Nav)
    }
    
}
