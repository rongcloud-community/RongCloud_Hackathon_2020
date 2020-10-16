//
//  HomeSectionHeaderView.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/11.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

class HomeSectionHeaderView: UIView {

    var titleLabel:UILabel?
    init(frame: CGRect,sectionTitle : String,isHidenMoreBtn : Bool) {
        super.init(frame: frame)
        self.backgroundColor = UIColor.white
        let lineView = UIView.init(frame: CGRect.init(x: 0, y: self.height-1, width: self.width, height: 1))
        lineView.backgroundColor = UIColor.groupTableViewBackground
        self.addSubview(lineView)
        
        titleLabel = UILabel.init(frame: CGRect.init(x: 20, y: 0, width: 100, height: self.height))
        titleLabel?.text = sectionTitle
        self.addSubview(titleLabel!)
  
        let btn = UIButton.init(frame: CGRect.init(x: kScreenWidth-50, y: 0, width: 40, height: self.height))
        btn.setTitle("更多", for: .normal)
        btn.setTitleColor(UIColor.darkGray, for: .normal)
        btn.titleLabel?.font = UIFont.systemFont(ofSize: 14)
        self.addSubview(btn)
        btn.isHidden = isHidenMoreBtn
        btn.addTarget(self, action: #selector(moreBtnAction(btn:)), for: .touchUpInside)
        
    }
    
    //MARK: moreBtnAction
    @objc func moreBtnAction(btn:UIButton){
        let tag = self.tag - 100
        if tag == 0 {
            //宠物类型
        }else if tag == 1{
            //常见宠物
        }else if tag == 2{
            //宠物小常识
            let viewC = SensListViewController()
            viewC.hidesBottomBarWhenPushed = true
            viewC.animationType = .pageCurlAnimation
            self.zytviewController()?.navigationController?.pushViewController(viewC, animated: true)
        }else if tag == 3{
            //热门资讯
            let viewC = NewsViewController()
            viewC.hidesBottomBarWhenPushed = true
            viewC.animationType = .pageCurlAnimation
            self.zytviewController()?.navigationController?.pushViewController(viewC, animated: true)
        }
        
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    
    
}
