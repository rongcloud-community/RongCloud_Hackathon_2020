//
//  HelpMainViewController.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2020/9/15.
//  Copyright © 2020 XianHong zhang. All rights reserved.
//

import UIKit

class HelpMainViewController: BaseViewController ,UITableViewDelegate,UITableViewDataSource{

    var tableView:UITableView?
    var type:String?
    var pageSize:Int?
    var dataArr:Array<Any>?
    override func viewDidLoad() {
        super.viewDidLoad()
        if type == "1" {
            self.title = "招领"
        }else if type == "2"{
            self.title = "寻回"
        }else if type == "3"{
            self.title = "领养"
        }
        
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
        lookvideobtn()
    }
    @objc func rightBarBtnItemAction(item:UIButton){
        let vc = DoctorViewController()
        vc.animationType = .flipOverAnimation
        self.navigationController?.pushViewController(vc, animated: true)
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
        var headerView = tableView.dequeueReusableHeaderFooterView(withIdentifier: "header")
        var titleView : HomeSectionHeaderView?
        if headerView == nil {
            headerView = UITableViewHeaderFooterView.init(reuseIdentifier: "header");
            titleView = HomeSectionHeaderView.init(frame: CGRect.init(x: 0, y: 20, width: kScreenWidth, height: 40), sectionTitle: "常见宠物", isHidenMoreBtn: true)
            headerView?.addSubview(titleView!)
        }
        titleView?.tag = section + 104
     
        headerView?.backgroundColor = UIColor.groupTableViewBackground
        return headerView
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
            cell = Bundle.main.loadNibNamed("AniHelpTableViewCell", owner: nil, options: nil)?.last as? UITableViewCell
        }
        let ce = cell as! AniHelpTableViewCell
        ce.selectionStyle = .none
        let dic = dataArr![indexPath.section] as? Dictionary<String,Any> ?? ["":""]
        ce.setDataDic(dic: dic)
        return ce;
    }
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: false)
        let dic = dataArr![indexPath.section] as! Dictionary<String, Any>
        let animalid = dic["id"] as? NSNumber;
        //        let url = BaseUrl + "" + "\(String(describing: animalid))"
        let url = String.init(format: "%@/clienthome/animalhelpinfoweb.do?id=%@", BaseUrl,animalid!)
        let viewC = AnimalInfoWebViewController()
        viewC.dic = dic;
        viewC.hidesBottomBarWhenPushed = true;
        viewC.title = dic["name"] as? String
        viewC.linkUrl = url;
        self.navigationController?.pushViewController(viewC, animated: true)
    }
    //请求救助数据
    func loadData(){
        CoreWork.getAnimalHelp(puberid: nil, type: type, page: "1", pagesize: "\(pageSize!)") { [weak self](obj) in
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
    
    func lookvideobtn(){
        let videoBtn = UIButton.init(type: .custom)
        self.view.addSubview(videoBtn);
        videoBtn.addTarget(self, action: #selector(lookBntAction(btn:)), for: .touchUpInside)
        let imgV = UIImageView.init(image: UIImage.init(named: "lookvideo"));
        videoBtn.addSubview(imgV)
        
        let label = UILabel.init()
        label.text = "看直播"
        label.textColor = UIColor.init(red: 212/255.0, green: 35/255.0, blue: 122/255.0, alpha: 1.0)
        label.font = UIFont.systemFont(ofSize: 12)
        label.textAlignment = .center
        videoBtn.addSubview(label)
                
        
        videoBtn.snp_makeConstraints { (make) in
            make.right.equalTo(-5)
            make.centerY.equalTo(self.view.snp_centerY).offset(150)
            make.width.equalTo(60)
            make.height.equalTo(70)
        }
        imgV.snp_makeConstraints { (make) in
            make.top.left.equalTo(10)
            make.right.equalTo(-10)
            make.bottom.equalTo(-20)
        }
        label.snp_makeConstraints { (make) in
            make.bottom.left.right.equalTo(0)
            make.top.equalTo(imgV.snp_bottom)
        }
        
    }
    @objc func lookBntAction(btn:UIButton){
        if userInfo.isLogin == false {
            self.showAlerController(title: "您还未登录", message: "请先登录后在体验")
            return
        }
        let vc = RtcLiveLitstVC()
        vc.hidesBottomBarWhenPushed = true
        vc.animationType = .flipOverAnimation
        self.navigationController?.pushViewController(vc, animated: true)
//        rtcWindowManager.showPlayRtcVC()
//        rtcWindowManager.showLookRtcRV()
    }
}
