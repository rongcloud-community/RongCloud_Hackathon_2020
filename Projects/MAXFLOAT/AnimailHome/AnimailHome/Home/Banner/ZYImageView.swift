//
//  ZYImageView.swift
//  MyPlayer
//
//  Created by ybon on 2016/11/14.
//  Copyright © 2016年 zxh. All rights reserved.
//

import UIKit

class ZYImageView: UIImageView {

    var url:String?;
    var dic:Dictionary<String,Any>?
    var tapFunction:((_ tapDic:Dictionary<String,Any>) -> Void)?;
    override init(frame: CGRect) {
        super.init(frame: frame);
        self.isUserInteractionEnabled = true;
        self.contentMode = .scaleToFill
//        self.contentMode = .scaleAspectFit;
        let tap = UITapGestureRecognizer.init(target: self, action: #selector(tabpAction));
        tap.numberOfTapsRequired = 1;
        tap.numberOfTouchesRequired = 1;
        self.addGestureRecognizer(tap);
        
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    @objc func tabpAction(tap:UITapGestureRecognizer){
        if (tapFunction != nil) {
            tapFunction!(dic ?? ["":""])
        }
//        let viewC = AdopeInfoViewController()
//        viewC.hidesBottomBarWhenPushed = true
//        viewC.animationType = .noneAnimation
//        self.zytviewController()?.navigationController?.pushViewController(viewC, animated: true)
    }
    
    
}
