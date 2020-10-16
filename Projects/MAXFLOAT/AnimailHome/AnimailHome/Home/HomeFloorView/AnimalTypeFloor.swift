//
//  AnimalTypeFloor.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/11.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit
let celHeight = 100
let cellWidth = kScreenWidth/4
class AnimalTypeFloor: UIView ,UICollectionViewDelegate,UICollectionViewDataSource,UICollectionViewDelegateFlowLayout{
    var _collectionView:UICollectionView?
    var dataArr:Array<Any>?;
    override init(frame: CGRect) {
        super.init(frame: frame)
        let layout = UICollectionViewFlowLayout()
        layout.minimumInteritemSpacing = 0
        layout.minimumLineSpacing = 0
        layout.scrollDirection = .vertical
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
        let count = dataArr?.count
        let h = count!/4
        let y = count!%4
        _collectionView?.reloadData()
        if y > 0{
            self.frame = CGRect.init(x: 0, y: 0, width: self.width, height: CGFloat(celHeight * (h+1)))
            
        }else{
            self.frame = CGRect.init(x: 0, y: 0, width: self.width, height: CGFloat(celHeight * h))
            
        }
        
    }
    
  
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize{
        return CGSize.init(width: cellWidth, height: CGFloat(celHeight))
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
            imgV?.contentMode = .scaleAspectFit
            cell.addSubview(imgV!)
            imgV?.snp.makeConstraints({ (make) in
                make.top.equalTo(10)
                make.width.height.equalTo(50)
                make.left.equalTo(cellWidth/2-25)
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
            cell.addSubview(lab)
            textLabel?.snp.makeConstraints({ (make) in
                make.left.right.equalTo(0)
                make.top.equalTo((imgV?.snp.bottom)!).offset(10)
                make.height.equalTo(21)
            })
        }
        let dic = dataArr![indexPath.row] as! Dictionary<String,Any>
        if let url = dic["imgurl"]{
            let imgView = imgV as! UIImageView
            imgView.sd_setImage(with: URL.init(string:BaseImgUrl + (url as! String)),placeholderImage:UIImage.init(named: "宠物"));
        }
        let lab = textLabel as! UILabel
        
        lab.text = dic["typedesc"] as? String
//        cell.layer.borderWidth = 0.5;
//        cell.layer.borderColor = UIColor.lightGray.cgColor
        
        return cell
    }
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        let viewC = AnimalListViewController()
        viewC.selectedIndex = indexPath.row
        viewC.hidesBottomBarWhenPushed = true
        viewC.animationType = .suckEffectAnimation
        viewC.titleArray = dataArr; self.zytviewController()?.navigationController?.pushViewController(viewC, animated: true)
    }
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
}
