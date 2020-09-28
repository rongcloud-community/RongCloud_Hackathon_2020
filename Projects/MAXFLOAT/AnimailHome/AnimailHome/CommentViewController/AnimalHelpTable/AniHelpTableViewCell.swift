//
//  AniHelpTableViewCell.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/19.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

class AniHelpTableViewCell: UITableViewCell {

    @IBOutlet weak var titleLabel: UILabel!
    
    @IBOutlet weak var contentLabel: UILabel!
    
    
    @IBOutlet weak var imgBgView: UIView!
    
    @IBOutlet weak var puberLabel: UILabel!
    
    @IBOutlet weak var timeLabel: UILabel!
    
    @IBOutlet weak var typeLabel: UILabel!
    var imgListView : ZYSkimImgCollectionView?
    override func awakeFromNib() {
        super.awakeFromNib()
        imgListView = ZYSkimImgCollectionView.init(frame: CGRect.zero, collectionViewLayout: UICollectionViewFlowLayout())
        self.imgBgView.addSubview(imgListView!)
        imgListView?.snp.makeConstraints({ (make) in
            make.left.top.right.bottom.equalTo(0)
        })
        
    }
    
    func setDataDic(dic:Dictionary<String,Any>){
        if let userInfo = dic["pub_user"] {
            let userDic = userInfo as! Dictionary<String,Any>
            if let nickname = userDic["name"]{
                self.puberLabel.text = "发布者:" + "\(nickname)"
            }
        }
        if let title = dic["name"] {
            self.titleLabel.text = "\(title)"
        }
        if let content = dic["sdesc"] {
            self.contentLabel.text = "\(content)"
        }
        if let pubTime = dic["pub_time"] {
//            self.timeLabel.text = getTimeStr(timeLength: pubTime as! String)
            let tex = pubTime as? String
            let newtex = tex?.prefix(10)
            self.timeLabel.text = String(newtex ?? "")
            
        }
        if let type = dic["type"] as? String {
            if type == "1" {
                typeLabel.text = "招领"
            }else if type == "2"{
                typeLabel.text = "寻回"
            }else{
                typeLabel.text = "领养"
            }
        }
       
        
    }
    //时间戳转时间
    func getTimeStr(timeLength:String)->String{
        let date = Date.init(timeIntervalSince1970: Double(timeLength)!)
        let formatter = DateFormatter.init()
        formatter.dateFormat = "yyyy-MM-dd"
        let dateStr = formatter.string(from: date)
        
        return dateStr
    }
    
}
