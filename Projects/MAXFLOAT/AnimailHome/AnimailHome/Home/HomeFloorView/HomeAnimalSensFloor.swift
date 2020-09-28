//
//  HomeAnimalSensFloor.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/11.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

class HomeAnimalSensFloor: UIView,UITableViewDelegate,UITableViewDataSource{
    
    var dataArray : Array<Any>?
    var _tableView : UITableView?
    override init(frame: CGRect) {
        super.init(frame: frame)
        
        self.frame = CGRect.init(x: 0, y: 0, width: kScreenWidth, height: 150)
        let imgV = UIImageView.init(frame: CGRect.init(x: self.height/2-50, y: self.height/2-50, width: 100, height: 100))
        imgV.contentMode = .scaleAspectFit
        imgV.image = UIImage.init(named: "宠物")
        self.addSubview(imgV)
        _tableView = UITableView.init(frame: CGRect.init(x: self.height-15, y: 0, width: self.width-self.height, height: self.height))
        _tableView?.delegate = self
        _tableView?.dataSource = self
        self.addSubview(_tableView!)
        
    }
    
    func setDataArr(arr:Array<Any>){
        dataArray = arr
        _tableView?.reloadData()
    }
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 30
    }
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 5
    }
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        var cell = tableView.dequeueReusableCell(withIdentifier: "cell")
        if cell == nil{
            cell = UITableViewCell.init(style: .default, reuseIdentifier: "cell")
        }
        if dataArray != nil && indexPath.row < (dataArray?.count)! {
            let dic = dataArray![indexPath.row] as? Dictionary<String,Any>
            let text = dic?["name"]
            cell?.textLabel?.text = "\(indexPath.row + 1) " + (text as? String)!
        }else{
            cell?.textLabel?.text = ""
        }
        cell?.textLabel?.font = UIFont.systemFont(ofSize: 12)
        cell?.textLabel?.textColor = UIColor.darkGray
        return cell!
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        if dataArray != nil && indexPath.row < (dataArray?.count)! {
            let dic = dataArray![indexPath.row] as? Dictionary<String,Any>
            let link = dic?["url"]
            let viewC = ZYWebViewController()
            viewC.shareTitle = dic?["name"] as? String
            viewC.linkUrl = link as? String
            viewC.animationType = .rlScanAnimation
            viewC.hidesBottomBarWhenPushed = true;
            self.zytviewController()?.navigationController?.pushViewController(viewC, animated: true)
            
        }
    }
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

}
