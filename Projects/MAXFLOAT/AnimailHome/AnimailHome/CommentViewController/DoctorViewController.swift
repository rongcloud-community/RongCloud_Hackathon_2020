//
//  DoctorViewController.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2020/9/16.
//  Copyright © 2020 XianHong zhang. All rights reserved.
//

import UIKit

class DoctorViewController: BaseViewController ,UITableViewDelegate,UITableViewDataSource{
    var tableView:UITableView?
    
    var pageSize:Int?
    var dataArr:Array<Any>?
    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = "宠物医生"
        self.navigationItem.leftBarButtonItem = UIBarButtonItem.init();
        let btn = UIButton.init(type: .custom)
        btn.frame = CGRect.init(x: 0, y: 0, width: 40, height: 40)
        btn.setImage(UIImage.init(named: "change"), for: .normal)
        btn.addTarget(self, action: #selector(rightBarBtnItemAction(item:)), for: .touchUpInside)
        self.navigationItem.rightBarButtonItem = UIBarButtonItem.init(customView: btn)
        pageSize = 10;
        tableView = UITableView.init(frame: CGRect.zero, style: .grouped)
        self.view.addSubview(tableView!)
        tableView?.delegate = self
        tableView?.dataSource = self
        tableView?.snp.makeConstraints({ (make) in
            make.left.right.top.bottom.equalTo(0)
        })
        let mj_header = MJRefreshStateHeader.init {
            self.loadData()
        }
        tableView?.mj_header = mj_header;
        let mj_footer = MJRefreshBackFooter.init {
            self.pageSize = self.pageSize! + 10
            self.loadData()
        }
        tableView?.mj_footer = mj_footer
        self.loadData();
        tableView?.tableFooterView = UIView()
    }
    

    @objc func rightBarBtnItemAction(item:UIButton){
        self.navigationController?.popViewController(animated: true)
    }
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
       
        return 10
    }
    func tableView(_ tableView: UITableView, heightForFooterInSection section: Int) -> CGFloat {
        return 0.01
    }
    func tableView(_ tableView: UITableView, viewForFooterInSection section: Int) -> UIView? {
        return nil
    }
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        return nil;
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 85
    }
    func numberOfSections(in tableView: UITableView) -> Int {
        return dataArr?.count ?? 0
    }
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 1
    }
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        var cell = tableView.dequeueReusableCell(withIdentifier: "cell")
        
        if cell == nil{
            cell = UITableViewCell.init(style: .subtitle, reuseIdentifier: "cell")
        }
        
        cell!.selectionStyle = .none
        setCellData(cell: cell!, indexP: indexPath)
        
        return cell!;
    }
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: false)
        let dic = dataArr![indexPath.section] as! Dictionary<String, Any>
        let animalid = dic["id"] as? NSNumber;
        //        let url = BaseUrl + "" + "\(String(describing: animalid))"
        let url = String.init(format: "%@/clienthome/doctorinfoweb.do?id=%@", BaseUrl,animalid!)
        let viewC = AnimalInfoWebViewController()
        viewC.dic = dic;
        viewC.hidesBottomBarWhenPushed = true;
        viewC.title = dic["name"] as? String
        viewC.linkUrl = url;
        self.navigationController?.pushViewController(viewC, animated: true)
    }
    
    func setCellData(cell:UITableViewCell,indexP:IndexPath){
        let dic = dataArr![indexP.section] as? Dictionary<String,Any>
        cell.imageView?.image = nil;
        cell.textLabel?.text = nil;
        cell.detailTextLabel?.text = nil;
        if dic == nil {
            return
        }
        if let imgurl = dic!["imgurl"] as? String{
            
            cell.imageView?.sd_setImage(with: URL.init(string: imgurl))
            
        }
        if let userInfo = dic!["user"] {
            let userDic = userInfo as! Dictionary<String,Any>
            if let nickname = userDic["name"]{
                cell.detailTextLabel!.text =  "\(nickname)"
            }
        }
        if let title = dic!["name"] {
            cell.textLabel!.text = "\(title)"
        }
    }
    
    func loadData(){
        CoreWork.getDoctorList(page: "1", pagesize: "\(pageSize!)") { [weak self](obj) in
            self?.tableView?.mj_header.endRefreshing()
            self?.tableView?.mj_footer.endRefreshing()
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
                                self?.tableView?.reloadData()
                            }
                            
                            return
                        }
                    }
                    
                }
            }
                       
            self?.showAlerController(title: "提示", message: "请求失败");
        }
    }
    
}
