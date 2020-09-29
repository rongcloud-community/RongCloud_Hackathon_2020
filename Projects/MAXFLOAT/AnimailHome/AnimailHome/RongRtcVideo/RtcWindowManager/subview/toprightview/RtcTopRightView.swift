//
//  RtcTopRightView.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2020/9/29.
//  Copyright © 2020 XianHong zhang. All rights reserved.
//
/**右侧头像，昵称，人数等*/
import UIKit

class RtcTopRightView: UIView {
    
    let imgV = UIImageView.init(frame: CGRect.init())
    let namelabel = UILabel.init()
    //魅力值
    var mlCount = 0
    let mlLabel = UILabel.init()
    //人数
    var pCount = 0
    let pBtn = UIButton.init(type: .system)
    override init(frame: CGRect) {
        super.init(frame: frame)
        //头像昵称
        
        imgV.layer.cornerRadius = 20
        imgV.layer.masksToBounds = true
        self.addSubview(imgV)
        imgV.sd_setImage(with: URL.init(string:BaseImgUrl + userInfo.imgUrl))
        
        namelabel.textColor = .white
        namelabel.font = .systemFont(ofSize: 12)
        self.addSubview(namelabel)
        namelabel.text = userInfo.name
        
        imgV.snp_makeConstraints { (make) in
            make.right.equalTo(0)
            make.top.equalTo(0)
            make.width.height.equalTo(40)
        }
        namelabel.snp_makeConstraints { (make) in
            make.right.equalTo(imgV.snp_left).offset(-5)
            make.top.equalTo(imgV.snp_top)
        }
        mlLabel.textColor = .white
        mlLabel.font = .systemFont(ofSize: 12)
        self.addSubview(mlLabel)
        mlLabel.text = "魅力值:" + "\(mlCount)"
        mlLabel.snp_makeConstraints { (make) in
            make.right.equalTo(imgV.snp_left).offset(-5)
            make.top.equalTo(namelabel.snp_bottom)
        }
        pBtn.titleLabel?.font = .systemFont(ofSize: 12)
        pBtn.setTitleColor(.orange, for: .normal)
        pBtn.setTitle( "\(pCount)" + "人", for: .normal)
        self.addSubview(pBtn)
        pBtn.snp_makeConstraints { (make) in
            make.right.equalTo(imgV.snp_left).offset(-5)
            make.top.equalTo(mlLabel.snp_bottom)
            make.height.equalTo(20)
        }
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    func setDataDic(_ dataDic:Dictionary<String,Any>){
        if let userInfo = dataDic["pub_user"] {
            let userDic = userInfo as! Dictionary<String,Any>
            if let imgurl = userDic["fileurl"] as? String{
                imgV.sd_setImage(with: URL.init(string:BaseImgUrl + imgurl))
            }
        }
       
        if let userInfo = dataDic["pub_user"] {
            let userDic = userInfo as! Dictionary<String,Any>
            if let nickname = userDic["name"] as? String{
                namelabel.text = nickname
            }
        }
    }
   
    //魅力值
    func changeMlCount(_ dataDic:Dictionary<String,String>){
        let cstr = dataDic["mlCount"]!
        let c = Int(cstr)
        mlCount = mlCount + c!
        if mlCount < 0{
            mlCount = 0
        }
        mlLabel.text = "魅力值:" + "\(mlCount)"
    }

}
