//
//  MyViewController.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/5.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

class MyViewController: BaseViewController ,UITableViewDelegate,UITableViewDataSource{
    var headerView : MyUserHeaderView?
    var _tableView : UITableView?
    var sectonNameArr = [["立即发布","我的发布"],["关于我们","意见反馈","清除缓存"],["退出登录"]]
    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = "我的";
        
        _tableView = UITableView.init(frame: CGRect.zero, style: .grouped)
        _tableView?.delegate = self
        _tableView?.dataSource = self
        _tableView?.tableFooterView = UIView()
        self.view.addSubview(_tableView!)
        _tableView?.estimatedRowHeight = 0;
        _tableView?.estimatedSectionHeaderHeight = 0;
        _tableView?.estimatedSectionFooterHeight = 0;
        
        _tableView?.snp.makeConstraints({ (make) in
            make.left.right.equalTo(0)
            make.bottom.equalTo(-getTabHeight())
            make.top.equalTo(getNavHeight())
        })
        headerView = MyUserHeaderView.init(frame: CGRect.init(x: 0, y: 0, width: kScreenWidth, height: 100))
        _tableView?.tableHeaderView = headerView;
        
        if #available(iOS 11.0, *) {
            _tableView?.contentInsetAdjustmentBehavior = .never
        } else {
            self.automaticallyAdjustsScrollViewInsets = false
        }
    }
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        headerView?.setUserInfo()
        self.navigationController?.navigationBar.isHidden = false
    }
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        if section == 0 {
            return 20
        }
        return 0.01
    }
    func tableView(_ tableView: UITableView, heightForFooterInSection section: Int) -> CGFloat {
        if section == sectonNameArr.count-1 {
            return 0.01
        }
        return 20
    }
    func tableView(_ tableView: UITableView, viewForFooterInSection section: Int) -> UIView? {
        return nil
    }
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        return nil
    }
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        
        return 50
    }
    func numberOfSections(in tableView: UITableView) -> Int {
        return sectonNameArr.count
    }
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        let rowArr = sectonNameArr[section]
        return rowArr.count
    }
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = UITableViewCell.init(style: .default, reuseIdentifier: "cell")
        
        let titleLabel = UILabel.init()
        cell.addSubview(titleLabel)
        titleLabel.snp.makeConstraints { (make) in
            make.left.equalTo(20)
            make.top.bottom.equalTo(0)
            make.width.equalTo(80)
        }
        titleLabel.textColor = UIColor.darkGray
        titleLabel.text = sectonNameArr[indexPath.section][indexPath.row]
        cell.accessoryType = .disclosureIndicator
        
        
        return cell;
    }
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        let title = sectonNameArr[indexPath.section][indexPath.row]
        if title == "关于我们" {
            let viewC = AboutUsViewController()
            viewC.animationType = .noneAnimation
            viewC.hidesBottomBarWhenPushed = true
            self.navigationController?.pushViewController(viewC, animated: true)
            return;
        }
        if title == "清除缓存" {
            self.cleanCach()
            return;
        }
        if userInfo.isLogin == false {
            self.showAlerController(title: "您还没有登录", message: "请先去登录")
            return;
        }
        if title == "意见反馈" {
            let viewC = IdeaBackViewController()
            viewC.hidesBottomBarWhenPushed = true
            self.navigationController?.pushViewController(viewC, animated: true)
        }else if title == "退出登录" {
            
            RCIM.shared()?.disconnect()
            self.logOut()
        }else if title == "立即发布" {
            let viewC = PubTypeViewController()
            viewC.hidesBottomBarWhenPushed = true
            viewC.animationType = .tbScanAnimation
            viewC.pubTyep = 2
            self.navigationController?.pushViewController(viewC, animated: true)
        }else if title == "我的发布" {
            let viewC = PubTypeViewController()
            viewC.hidesBottomBarWhenPushed = true
            viewC.animationType = .tbScanAnimation
            viewC.pubTyep = 1
            self.navigationController?.pushViewController(viewC, animated: true)
        }else if title == "我的评论" {
            
        }
        
    }

    

}
