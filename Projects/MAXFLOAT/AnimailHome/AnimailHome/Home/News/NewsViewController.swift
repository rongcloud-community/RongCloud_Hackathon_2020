//
//  NewsViewController.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/5.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

class NewsViewController: BaseViewController ,UITableViewDelegate,UITableViewDataSource{

    var _tableView:UITableView?
    var pageSize:Int?
    var dataArr:Array<Any>?
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.title = "资讯";
        
        pageSize = 10;
        _tableView = UITableView()
        _tableView?.delegate = self
        _tableView?.dataSource = self
        _tableView?.tableFooterView = UIView()
        self.view.addSubview(_tableView!)
       
        _tableView?.snp.makeConstraints({ (make) in
            make.left.right.bottom.equalTo(0)
//            make.bottom.equalTo(-getTabHeight())
            make.top.equalTo(getNavHeight())
        })
        let mj_header = MJRefreshStateHeader.init {
            self.loadData()
        }
        _tableView?.mj_header = mj_header;
        let mj_footer = MJRefreshBackFooter.init {
            self.pageSize = self.pageSize! + 10;
            self.loadData()
        }
        _tableView?.mj_footer = mj_footer;
        
        if #available(iOS 11.0, *) {
            _tableView?.contentInsetAdjustmentBehavior = .never
        } else {
            self.automaticallyAdjustsScrollViewInsets = false
        }
        self.loadData()
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if dataArr == nil{
            return 0
        }
        return (dataArr?.count)!
    }
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 70
    }
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        var cell = tableView.dequeueReusableCell(withIdentifier: "cell")
        if cell == nil {
            cell = UITableViewCell.init(style: .default, reuseIdentifier: "cell")
        }
        let dic = dataArr![indexPath.row] as? Dictionary<String,Any>
        let title = dic!["name"] as? String
        cell?.textLabel?.numberOfLines = 0
        cell?.textLabel?.text = title
        cell?.accessoryType = .disclosureIndicator
        return cell!
    }
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        let viewC = ZYWebViewController()
        
        viewC.animationType = .roundAnimation
        viewC.hidesBottomBarWhenPushed = true
        self.navigationController?.pushViewController(viewC, animated: true)
        
        let dic = dataArr![indexPath.row] as? Dictionary<String,Any>
        if let link = dic!["url"]{
            let url = link as? String
            viewC.linkUrl = url
            viewC.shareTitle = dic?["name"] as? String
        }
        
    }
    func loadData(){
        let hud = MBProgressHUD.showAdded(to: self.view, animated: true)
        hud.label.text = "正在加载数据"
        hud.mode = .indeterminate;
        hud.removeFromSuperViewOnHide = true
        CoreWork.getNesData(page: "1", pagesize: "\(pageSize!)") {[weak self] (obj) in
            hud.hide(animated: true)
            self?._tableView?.mj_header.endRefreshing()
            self?._tableView?.mj_footer.endRefreshing()
            if obj is Dictionary<String,Any>{
                let code = obj["code"]
                if code is NSNumber {
                   let newcode = code as! NSNumber;
                    if newcode.intValue != 0 {
                        return
                    }
                }
                self?.dataArr = obj["data"] as? Array<Any>;
                self?._tableView?.reloadData()
            }
        }
        
    }

}
