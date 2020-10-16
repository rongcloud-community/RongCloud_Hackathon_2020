//
//  AboutUsViewController.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/10.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

class AboutUsViewController: BaseViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.title = "关于我们"
        let imgV = UIImageView.init()
        self.view.addSubview(imgV)
        imgV.image = UIImage.init(named: "宠物")
        
        let descLabel = UILabel.init()
        self.view.addSubview(descLabel)
        descLabel.numberOfLines = 0
        descLabel.font = UIFont.systemFont(ofSize: 17)
        descLabel.textColor = UIColor.darkGray
        descLabel.text = "欢迎您使用宠宝儿，我们将竭诚为您服务\n点击logo可分享到微信，QQ"
        descLabel.textAlignment = .center
        imgV.isUserInteractionEnabled = true
        let tap = UITapGestureRecognizer.init(target: self, action: #selector(tapAction(tap:)))
        tap.numberOfTapsRequired = 1
        tap.numberOfTouchesRequired = 1
        imgV.addGestureRecognizer(tap)
        imgV.snp.makeConstraints { (make) in
            make.height.width.equalTo(150)
            make.center.equalTo(CGPoint.init(x: kScreenWidth/2, y: kScreenHeight/2-100))
        }
        descLabel.snp.makeConstraints { (make) in
            make.left.right.equalTo(0)
            make.height.equalTo(60)
            make.top.equalTo(imgV.snp.bottom).offset(100)
        }
        
    }
    @objc func tapAction(tap:UITapGestureRecognizer){
        let imgArr = [UIImage.init(named: "宠物.png")]
        let shareParams = NSMutableDictionary.init()
        shareParams.ssdkSetupShareParams(byText: "宠宝儿专注于为您的宠物服务", images: imgArr, url: URL.init(string: BaseImgUrl + "/testImage?path=BRHTML&name=chongbaoer.html"), title: "宠宝儿", type: .auto)
        ShareSDK.showShareActionSheet(nil, items: nil, shareParams: shareParams) { (state, platmType, userData, entity, iserror, isSuccess) in
            
        }
    }
    
}
