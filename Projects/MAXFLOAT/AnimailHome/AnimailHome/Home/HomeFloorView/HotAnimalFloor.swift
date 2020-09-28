//
//  HotAnimalFloor.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/11.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit
let hotcelHeight = 120
let hotcellWidth = 200
class HotAnimalFloor: UIView ,UICollectionViewDelegate,UICollectionViewDataSource,UICollectionViewDelegateFlowLayout{
    var _collectionView:UICollectionView?
    var dataArr:Array<Any>?;
    override init(frame: CGRect) {
        super.init(frame: frame)
        let layout = UICollectionViewFlowLayout()
//        layout.minimumInteritemSpacing = 0
//        layout.minimumLineSpacing = 0
        layout.scrollDirection = .horizontal
        _collectionView = UICollectionView.init(frame: CGRect.zero, collectionViewLayout: layout)
        _collectionView?.delegate = self
        _collectionView?.dataSource = self
        self.addSubview(_collectionView!)
        _collectionView?.register(UICollectionViewCell.classForCoder(), forCellWithReuseIdentifier: "item")
        
        _collectionView?.backgroundColor = UIColor.white
        _collectionView?.snp.makeConstraints({ (make) in
            make.left.right.top.bottom.equalTo(0)
        })
    }
    func setDataArr(arr:Array<Any>){
        dataArr = arr
        _collectionView?.reloadData()
    }
    
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize{
        return CGSize.init(width: hotcellWidth, height: hotcelHeight)
    }
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        if (dataArr != nil) {
            return (dataArr?.count)!
        }
        return 0
    }
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "item", for: indexPath)
        
        var imgV = cell.viewWithTag(2018)
        if imgV == nil{
            imgV = UIImageView.init(frame: CGRect.zero)
            imgV?.tag = 2018
            imgV?.contentMode = .scaleAspectFill
            imgV?.clipsToBounds = true
            cell.addSubview(imgV!)
            imgV?.snp.makeConstraints({ (make) in
                make.left.top.bottom.equalTo(0)
                make.right.equalTo(-21)
            })
        }
        var textLabel = cell.viewWithTag(2017)
        if textLabel == nil {
            textLabel = UILabel.init(frame: CGRect.zero)
            textLabel?.tag = 2017
            let lab = textLabel as! UILabel
            lab.textAlignment = NSTextAlignment.center
            lab.textColor = UIColor.darkGray
            lab.font = UIFont.systemFont(ofSize: 14)
            lab.numberOfLines = 0
            cell.addSubview(lab)
            textLabel?.snp.makeConstraints({ (make) in
                make.left.equalTo((imgV?.snp.right)!)
                make.top.bottom.right.equalTo(0)
                
            })
        }
        let dic = dataArr![indexPath.row] as! Dictionary<String,Any>
        if let url = dic["imgurl"]{
            let imgView = imgV as! UIImageView
            let urlStr = url as! String
            let ecodingStr = urlStr.addingPercentEncoding(withAllowedCharacters:.urlQueryAllowed)
//            removingPercentEncoding解码
            imgView.sd_setImage(with: URL.init(string:BaseImgUrl + ecodingStr!),placeholderImage:UIImage.init(named: "宠物"));
        
        }
        let lab = textLabel as! UILabel
        
        lab.text = dic["name"] as? String
       
        return cell
    }
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        let dic = dataArr![indexPath.row] as! Dictionary<String, Any>
        let animalid = dic["id"] as? NSNumber;
        //        let url = BaseUrl + "" + "\(String(describing: animalid))"
        let url = String.init(format: "%@/clienthome/animalinfoweb.do?id=%@", BaseUrl,animalid!)
        
        let viewC = AnimalInfoWebViewController()
        viewC.animationType = .roundAnimation
        viewC.hidesBottomBarWhenPushed = true;
        viewC.title = dic["name"] as? String
        viewC.linkUrl = url;
        self.zytviewController()?.navigationController?.pushViewController(viewC, animated: true)
    }
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
