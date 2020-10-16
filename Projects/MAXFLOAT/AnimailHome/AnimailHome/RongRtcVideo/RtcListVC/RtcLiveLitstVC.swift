//
//  RtcLiveLitstVC.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2020/9/21.
//  Copyright © 2020 XianHong zhang. All rights reserved.
//

import UIKit

class RtcLiveLitstVC: UIViewController ,UICollectionViewDelegate,UICollectionViewDataSource,UICollectionViewDelegateFlowLayout{
    var _collectionView:UICollectionView?
    var dataArr:Array<Any>?;
    var pageSize:Int?
    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = "直播列表"
        pageSize = 10
        let layout = UICollectionViewFlowLayout()
        //        layout.minimumInteritemSpacing = 0
        //        layout.minimumLineSpacing = 0
        layout.scrollDirection = .vertical
        _collectionView = UICollectionView.init(frame: CGRect.zero, collectionViewLayout: layout)
        _collectionView?.delegate = self
        _collectionView?.dataSource = self
        self.view.addSubview(_collectionView!)
//        _collectionView?.register(RtcLiveListCell.classForCoder(), forCellWithReuseIdentifier: "item")
        _collectionView?.register(UINib.init(nibName: "RtcLiveListCell", bundle: Bundle.main), forCellWithReuseIdentifier: "item")
        _collectionView?.backgroundColor = UIColor.white
        _collectionView?.snp.makeConstraints({ (make) in
            make.left.right.top.bottom.equalTo(0)
        })
        let mj_header = MJRefreshStateHeader.init {
            self.loadData()
        }
        _collectionView?.mj_header = mj_header;
        let mj_footer = MJRefreshBackFooter.init {
            self.pageSize = self.pageSize! + 10
            self.loadData()
        }
        _collectionView?.mj_footer = mj_footer
        
        loadData()
        if userInfo.usertype == "1" {
            let videoBtn = UIButton.init(type: .custom)
            self.view.addSubview(videoBtn);
            videoBtn.addTarget(self, action: #selector(lookBntAction(btn:)), for: .touchUpInside)
            let imgV = UIImageView.init(image: UIImage.init(named: "lookvideo"));
            videoBtn.addSubview(imgV)
            self.navigationItem.rightBarButtonItem = UIBarButtonItem.init(customView: videoBtn)
        }
        
    }
    @objc func lookBntAction(btn:UIButton){
            
        
        let vc = PlayReadVC.init(nibName: "PlayReadVC", bundle: Bundle.main)
        vc.animationType = .noneAnimation
        self.navigationController?.pushViewController(vc, animated: true)
    }
    func setDataArr(arr:Array<Any>){
        dataArr = arr
        _collectionView?.reloadData()
    }
    
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize{
        return CGSize.init(width: kScreenWidth/2-15, height: kScreenWidth/2-15)
    }
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, insetForSectionAt section: Int) -> UIEdgeInsets {
        return UIEdgeInsets.init(top: 10, left: 10, bottom: 0, right: 10)
    }
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        if (dataArr != nil) {
            return (dataArr?.count)!
        }
        return 0
    }
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "item", for: indexPath) as! RtcLiveListCell
        let dic = dataArr![indexPath.row] as! Dictionary<String, Any>
        cell.setDataDic(dic)
        return cell
    }
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        let dic = dataArr![indexPath.row] as! Dictionary<String, Any>
        rtcWindowManager.dic = dic;
        rtcWindowManager.showLookRtcRV()
        
//        let vc = LookRtcMainVC()
//        vc.hidesBottomBarWhenPushed = true
//        vc.animationType = .rlScanAnimation
//        vc.dic = dic
//        self.navigationController?.pushViewController(vc, animated: true)
    }
    func loadData(){
        CoreWork.getLiveList( page: "1", pagesize: "\(pageSize!)",pub_id:nil) { [weak self](obj) in
            self?._collectionView?.mj_header.endRefreshing()
            self?._collectionView?.mj_footer.endRefreshing()
            if obj is Dictionary<String,Any>{
                let dic = obj["data"] as? Dictionary<String,Any>
                if dic != nil{
                    let code = dic?["code"]
                    if code is NSNumber {
                       let newcode = code as! NSNumber;
                        if newcode.intValue == 0 {
                            let arr = dic?["data"] as? Array<Any>
                            if arr != nil {
                                self?.dataArr = arr
                               self?._collectionView?.reloadData()
                            }
                            
                        }else if newcode.intValue == 1{
                            self?.dataArr = Array.init()
                            self?._collectionView?.reloadData()
                            let msg = dic?["msg"] as? String
                            self?.showAlerController(title: "提示", message: msg ?? "请求无数据")
                        }
                    }
                    
                }
            }
            
           
        }
    }
    
    
    
}
