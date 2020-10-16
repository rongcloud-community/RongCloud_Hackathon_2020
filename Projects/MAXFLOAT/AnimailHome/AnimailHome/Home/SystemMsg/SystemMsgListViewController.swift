//
//  SystemMsgListViewController.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/9.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

class SystemMsgListViewController: BaseViewController ,UITableViewDelegate,UITableViewDataSource{
    
    var _tableView:UITableView?
    var pageSize:Int?
    var dataArr:Array<Any>?
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.title = "公告列表";
        
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
        return 50
    }
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        var cell = tableView.dequeueReusableCell(withIdentifier: "cell")
        if cell == nil {
            cell = UITableViewCell.init(style: .default, reuseIdentifier: "cell")
        }
        let dic = dataArr![indexPath.row] as? Dictionary<String,Any>
        let title = dic!["title"] as? String
        cell?.textLabel?.numberOfLines = 0
        cell?.textLabel?.text = title
        cell?.accessoryType = .disclosureIndicator
        return cell!
    }
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        let viewC = SystemMsgViewController()
        viewC.dic = dataArr?[indexPath.row] as? Dictionary<String, Any>
        viewC.hidesBottomBarWhenPushed = true
        self.navigationController?.pushViewController(viewC, animated: true)
        
        
    }
    func loadData(){
        let hud = MBProgressHUD.showAdded(to: self.view, animated: true)
        hud.label.text = "正在加载数据"
        hud.mode = .indeterminate;
        hud.removeFromSuperViewOnHide = true
        CoreWork.getSystemMsgData(page: "1", pagesize: "\(pageSize!)") { [weak self](obj) in
            hud.hide(animated: true)
            self?._tableView?.mj_header.endRefreshing()
            self?._tableView?.mj_footer.endRefreshing()
            if obj is Dictionary<String,Any>{
                if Int(obj["code"] as! String) == 200{
                    
                    self?.dataArr = obj["data"] as? Array<Any>;
                    self?._tableView?.reloadData()
                }else {
                    self?.showAlerController(title: "获取失败", message: "")
                }
            }else {
                self?.showAlerController(title: "获取失败", message: "")
            }
        }
        
    }
    
}

