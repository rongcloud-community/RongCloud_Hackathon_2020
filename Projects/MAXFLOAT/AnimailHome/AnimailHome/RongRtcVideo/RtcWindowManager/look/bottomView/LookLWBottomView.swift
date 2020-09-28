//
//  LookLWBottomView.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2020/9/25.
//  Copyright © 2020 XianHong zhang. All rights reserved.
//

import UIKit

class LookLWBottomView: UIView ,UICollectionViewDelegate,UICollectionViewDataSource,UICollectionViewDelegateFlowLayout{
   
    var itemFunction:((_ dataDic:Dictionary<String,String>) -> Void)?
    var _collectionView:UICollectionView?
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.backgroundColor = .white
        creatSubViews()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    func creatSubViews(){
        let layout = UICollectionViewFlowLayout()
         layout.minimumInteritemSpacing = 0
         layout.minimumLineSpacing = 0
         layout.scrollDirection = .vertical
         _collectionView = UICollectionView.init(frame: CGRect.zero, collectionViewLayout: layout)
         _collectionView?.delegate = self
         _collectionView?.dataSource = self
         self.addSubview(_collectionView!)
         _collectionView?.register(UICollectionViewCell.classForCoder(), forCellWithReuseIdentifier: "item")
        
         _collectionView?.backgroundColor = UIColor.clear
         _collectionView?.snp.makeConstraints({ (make) in
             make.left.right.top.bottom.equalTo(0)
         })
    }
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize{
            return CGSize.init(width: cellWidth, height: CGFloat(celHeight))
        }
        func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
            
            return liveList.count
        }
        func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "item", for: indexPath)
            
            var imgV = cell.viewWithTag(2018)
            var btn = cell.viewWithTag(2019) as? UIButton
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
                btn = UIButton.init(type: .custom)
                cell.addSubview(btn!)
                btn?.addTarget(self, action: #selector(itemBtnAction(btn:)), for: .touchUpInside)
                btn?.snp_makeConstraints({ (make) in
                    make.left.right.bottom.top.equalTo(0)
                })
            }
            var textLabel = cell.viewWithTag(2017)
            if textLabel == nil {
                textLabel = UILabel.init(frame: CGRect.zero)
                textLabel?.tag = 2017
                let lab = textLabel as! UILabel
                lab.textAlignment = NSTextAlignment.center
//                lab.textColor = UIColor.white
                lab.textColor = UIColor.init(red: 212/255.0, green: 35/255.0, blue: 122/255.0, alpha: 1.0)
                lab.font = UIFont.systemFont(ofSize: 14)
                cell.addSubview(lab)
                textLabel?.snp.makeConstraints({ (make) in
                    make.left.right.equalTo(0)
                    make.top.equalTo((imgV?.snp.bottom)!).offset(10)
                    make.height.equalTo(21)
                })
            }
            let dic = liveList[indexPath.row]
            let imgView = imgV as! UIImageView
            imgView.image = UIImage.init(named: dic["imgname"]!)
            let lab = textLabel as! UILabel
            lab.text = dic["title"]
            cell.backgroundColor = .clear
            btn?.tag = indexPath.row
            return cell
        }
    @objc func itemBtnAction(btn:UIButton){
        let itemtag = btn.tag
        if itemFunction != nil{
            self.itemFunction!(liveList[itemtag]);
        }
    }
        func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
            if itemFunction != nil{
                self.itemFunction!(liveList[indexPath.row]);
            }
            
        }
}
