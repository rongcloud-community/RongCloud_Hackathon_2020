//
//  AnimalListTableViewCell.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/28.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

class AnimalListTableViewCell: UITableViewCell {

    
    @IBOutlet weak var imgV: UIImageView!
    
    @IBOutlet weak var titlelabel: UILabel!
    
    @IBOutlet weak var descLabel: UILabel!
    
    @IBOutlet weak var sizeTypelabel: UILabel!
    
    
    override func awakeFromNib() {
        super.awakeFromNib()
       
        
    }
    
    func setDataDic(dic:Dictionary<String,Any>){
        print(dic)
        if var imgUrl = dic["imgurl"] {
            if imgUrl as? NSNull != nil {
                imgUrl = ""
            }
            let urlStr = imgUrl as! String
            let ecodingStr = urlStr.addingPercentEncoding(withAllowedCharacters:.urlQueryAllowed)
            imgV.sd_setImage(with: URL.init(string: BaseImgUrl + ecodingStr!),placeholderImage:UIImage.init(named: "宠物"))
        }
        if let value = dic["name"] {
            titlelabel.text = value as? String
        }
        if let value = dic["desc"] {
            descLabel.text = value as? String
        }
        if let value = dic["sizeType"] {
            sizeTypelabel.text = value as? String
        }
    }
    
}
