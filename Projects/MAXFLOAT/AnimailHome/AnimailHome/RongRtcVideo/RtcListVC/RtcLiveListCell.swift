//
//  RtcLiveListCell.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2020/9/21.
//  Copyright © 2020 XianHong zhang. All rights reserved.
//

import UIKit

class RtcLiveListCell: UICollectionViewCell {

    
    @IBOutlet weak var imgV: UIImageView!
    
    @IBOutlet weak var seecountLabel: UILabel!
    
    @IBOutlet weak var userName: UILabel!
    
    @IBOutlet weak var titleLabel: UILabel!
    
    
    override func awakeFromNib() {
        super.awakeFromNib()
        
    }

    func setDataDic(_ dic:Dictionary<String,Any>){
        if let userInfo = dic["pub_user"] {
            let userDic = userInfo as! Dictionary<String,Any>
            if let nickname = userDic["name"] as? String{
                self.userName.text = nickname
            }
        }
        if let title = dic["title"] as? String{
            self.titleLabel.text = title
        }
        if let content = dic["seecount"] as? String{
            self.seecountLabel.text = content
        }
        if let imgurl = dic["imgurl"] as? String{
            self.imgV.sd_setImage(with: URL.init(string: (BaseImgUrl + imgurl)))
        }
        
    }
    
}
