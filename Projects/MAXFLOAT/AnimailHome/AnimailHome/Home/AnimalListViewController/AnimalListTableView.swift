//
//  AnimalListTableView.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/28.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

class AnimalListTableView: UITableView ,UITableViewDelegate,UITableViewDataSource{

    var pagesize = 10
    var type : String?
    var dataArr : Array<Any>?
    var dataArrFunction:((_ arr:Array<Any>) -> Void)?
    override init(frame: CGRect, style: UITableView.Style) {
        super.init(frame: frame, style: style)
        self.delegate = self
        self.dataSource = self
        self.tableFooterView = UIView()
        let mj_header = MJRefreshStateHeader.init {
            self.loadData()
        }
        self.mj_header = mj_header;
        let mj_footer = MJRefreshBackFooter.init {
            self.pagesize = self.pagesize + 10
            self.loadData()
        }
        
        self.mj_footer = mj_footer
        
    }
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
       
        return 0.01
    }
    func tableView(_ tableView: UITableView, heightForFooterInSection section: Int) -> CGFloat {
       
        return 0.01
    }
    func tableView(_ tableView: UITableView, viewForFooterInSection section: Int) -> UIView? {
        return nil
    }
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        return nil
    }
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        
        return 120
    }
    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if dataArr == nil {
            return 0
        }
        return (dataArr?.count)!
    }
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        var cell = tableView.dequeueReusableCell(withIdentifier: "cell")
        if cell == nil {
            cell = Bundle.main.loadNibNamed("AnimalListTableViewCell", owner: nil, options: nil)?.last as! AnimalListTableViewCell
        }
        let ce = cell as! AnimalListTableViewCell
        ce.setDataDic(dic: dataArr![indexPath.row] as! Dictionary<String, Any>)
        return ce;
    }
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        let dic = dataArr![indexPath.row] as! Dictionary<String, Any>
        let animalid = dic["id"] as? NSNumber;
//        let url = BaseUrl + "" + "\(String(describing: animalid))"
        let url = String.init(format: "%@/clienthome/animalinfoweb.do?id=%@", BaseUrl,animalid!)
        let viewC = AnimalInfoWebViewController()
        viewC.title = dic["name"] as? String
        viewC.linkUrl = url;
        self.zytviewController()?.navigationController?.pushViewController(viewC, animated: true)
    }
    
    func loadData(){
        
        CoreWork.getAnimalList(type: type, page: "1", pagesize: "\(pagesize)") { [weak self](obj) in
            self?.mj_header.endRefreshing()
            self?.mj_footer.endRefreshing()
            if obj is Dictionary<String,Any>{
                let dic = obj["data"];
                if dic is Dictionary<String,Any> {
                    let newDic = dic as! Dictionary<String,Any>
                    let code = newDic["code"]
                    if code is NSNumber {
                       let newcode = code as! NSNumber;
                        if newcode.intValue != 0 {
                            return
                        }
                    }
                    self?.dataArr = newDic["data"] as? Array<Any>;
                    self?.reloadData()
                    if ((self?.dataArrFunction) != nil){
                        self?.dataArrFunction!((self?.dataArr)!);
                    }
                }
                
            }
        }
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    

}
