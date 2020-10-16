//
//  MyUserHeaderView.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/7.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

class MyUserHeaderView: UIView {

    var imgV : UIImageView?
    var nameLabel : UILabel?
    var signLabel : UILabel?
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.backgroundColor = UIColor.white
        imgV = UIImageView.init(frame: CGRect.init(x: 20, y: 20, width: 60, height: 60))
        self.addSubview(imgV!)
        imgV?.layer.cornerRadius = 30;
        imgV?.layer.masksToBounds = true;
        imgV?.image = UIImage.init(named: "宠物")
        nameLabel = UILabel.init(frame: CGRect.init(x: 90, y: 23, width: kScreenWidth-130, height: 22))
        
        self.addSubview(nameLabel!)
        signLabel = UILabel.init(frame: CGRect.init(x: 90, y: 50, width: kScreenWidth-130, height: 22))
        signLabel?.font = UIFont.systemFont(ofSize: 14)
        self.addSubview(signLabel!)
        
        let rightImgV = UIImageView.init(frame: CGRect.init(x: kScreenWidth-30, y: 40, width: 20, height: 20))
        rightImgV.image = UIImage.init(named: "right")
        self.addSubview(rightImgV)
        let tap = UITapGestureRecognizer.init(target: self, action: #selector(tapAction(tap:)))
        tap.numberOfTapsRequired = 1;
        tap.numberOfTouchesRequired = 1;
        self.addGestureRecognizer(tap)
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    @objc func tapAction(tap:UITapGestureRecognizer){
        if userInfo.isLogin == true {
            let viewC = PersonInfoViewController()
            viewC.animationType = .revolveAnimation
            viewC.hidesBottomBarWhenPushed = true
            self.zytviewController()?.navigationController?.pushViewController(viewC, animated: true)
        }else{
            let viewC = ZYLoginViewController()
            viewC.animationType = .noneAnimation
            viewC.hidesBottomBarWhenPushed = true
            self.zytviewController()?.navigationController?.pushViewController(viewC, animated: true)
        }
    }
    
    func setUserInfo(){
        if userInfo.isLogin == false {
            imgV?.image = UIImage.init(named: "宠物")
            nameLabel?.text = "点击登录"
            signLabel?.text = "宠宝儿欢迎您"
            return
        }
        if userInfo.nickname.count > 0 {
            nameLabel?.text = userInfo.nickname
        }else{
            nameLabel?.text = userInfo.phone
        }
        signLabel?.text = userInfo.sign
        if userInfo.imgUrl.count > 0 {
            imgV?.sd_setImage(with: URL.init(string: BaseImgUrl + userInfo.imgUrl), placeholderImage: UIImage.init(named: "宠物"))
        }
        
    }
    
}
