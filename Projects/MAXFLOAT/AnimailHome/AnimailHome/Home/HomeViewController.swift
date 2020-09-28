//
//  HomeViewController.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/5.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit


class HomeViewController: BaseViewController ,UITableViewDelegate,UITableViewDataSource,ZYMarkQueeDelegate{

    var bannerView : HeaderAnimationView?
    var markView : ZYMarkqueeView?
    var animailTypeFloor : AnimalTypeFloor?
    var hotAnimalFloor : HotAnimalFloor?
    var sensfloor : HomeAnimalSensFloor?
    var newFloor : HomeNewsFloor?
    var _tableView : UITableView?
    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = "首页"
     
        zyLocation.getCurrentLocation()
        
        //75/40
        bannerView = HeaderAnimationView.init(frame: CGRect.init(x: 0, y: 0, width: kScreenWidth, height: kScreenWidth*40/75))
        markView = ZYMarkqueeView.init(frame: CGRect.init(x: 0, y: (bannerView?.height)!, width: kScreenWidth, height: 40))
        markView?.delegate = self
        animailTypeFloor = AnimalTypeFloor.init(frame: CGRect.init(x: 0, y: 0, width: kScreenWidth, height: kScreenWidth/4*2))
        hotAnimalFloor = HotAnimalFloor.init(frame: CGRect.init(x: 0, y: 0, width: kScreenWidth, height: 140))
        sensfloor = HomeAnimalSensFloor.init(frame: CGRect.init(x: 0, y: 0, width: kScreenWidth, height: 200))
        newFloor = HomeNewsFloor.init(frame: CGRect.init(x: 0, y: 0, width: kScreenWidth, height: 150))
        
        
        let headerView = UIView.init(frame: CGRect.init(x: 0, y: 0, width: kScreenWidth, height: (bannerView?.height)! + (markView?.height)!))
        headerView.backgroundColor = UIColor.white
        headerView.addSubview(bannerView!)
        headerView.addSubview(markView!)
        
        _tableView = UITableView.init(frame: CGRect.zero, style: .grouped)
        _tableView?.delegate = self
        _tableView?.dataSource = self
        _tableView?.tableFooterView = UIView()
        self.view.addSubview(_tableView!)
        _tableView?.tableHeaderView = headerView
        _tableView?.estimatedRowHeight = 0;
        _tableView?.estimatedSectionHeaderHeight = 0;
        _tableView?.estimatedSectionFooterHeight = 0;
        
        _tableView?.snp.makeConstraints({ (make) in
            make.left.right.equalTo(0)
            make.bottom.equalTo(-getTabHeight())
            make.top.equalTo(getNavHeight())
        })
        let mj_header = MJRefreshStateHeader.init {
            self.loadData()
        }
        _tableView?.mj_header = mj_header;
        self.loadData()
        if #available(iOS 11.0, *) {
            _tableView?.contentInsetAdjustmentBehavior = .never
        } else {
            self.automaticallyAdjustsScrollViewInsets = false
        }
        bannerView?.tapFunction = { [weak self] (dic) in
            if let bannerdesc = dic["bannerdesc"] as? String {
                if Int(bannerdesc) ?? 10000 < 4 {
                    let viewC = HelpMainViewController()
                    viewC.type = "\(bannerdesc)"
                    viewC.animationType = .scaleAnimation
                    viewC.hidesBottomBarWhenPushed = true
                    
                    self?.navigationController?.pushViewController(viewC, animated: true)
                }else{
                    let webvc = ZYWebViewController.init()
                    webvc.animationType = .rlScanAnimation
                    webvc.linkUrl = dic["url"] as? String;
                    webvc.shareTitle = dic["name"] as? String
                    webvc.hidesBottomBarWhenPushed = true
                    if webvc.linkUrl!.count > 0 {
                        self?.navigationController?.pushViewController(webvc, animated: true)
                        
                    }
                }
            }
        }
        
    }
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
       
        return 60
    }
    func tableView(_ tableView: UITableView, heightForFooterInSection section: Int) -> CGFloat {
        return 0.01
    }
    func tableView(_ tableView: UITableView, viewForFooterInSection section: Int) -> UIView? {
        return nil
    }
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        let headerView = UIView.init(frame: CGRect.init(x: 0, y: 0, width: kScreenWidth, height: 60))
        if section == 0{
            let titleView = HomeSectionHeaderView.init(frame: CGRect.init(x: 0, y: 20, width: kScreenWidth, height: 40), sectionTitle: "常见宠物", isHidenMoreBtn: true)
            titleView.tag = section + 100
            headerView.addSubview(titleView)
        }else if section == 1{
            let titleView = HomeSectionHeaderView.init(frame: CGRect.init(x: 0, y: 20, width: kScreenWidth, height: 40), sectionTitle: "热门宠物", isHidenMoreBtn: true)
            titleView.tag = section + 100
            headerView.addSubview(titleView)
        }else if section == 2{
            let titleView = HomeSectionHeaderView.init(frame: CGRect.init(x: 0, y: 20, width: kScreenWidth, height: 40), sectionTitle: "宠物小常识", isHidenMoreBtn: false)
            titleView.tag = section + 100
            headerView.addSubview(titleView)
            
        }else if section == 3{
            let titleView = HomeSectionHeaderView.init(frame: CGRect.init(x: 0, y: 20, width: kScreenWidth, height: 40), sectionTitle: "热门资讯", isHidenMoreBtn: false)
            titleView.tag = section + 100
            headerView.addSubview(titleView)
        }
        
        return headerView
    }
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        if indexPath.section == 0 {
            return (animailTypeFloor?.height)!
        }else if indexPath.section == 1 {
            return (hotAnimalFloor?.height)!
        }else if indexPath.section == 2 {
            return (sensfloor?.height)!
        }else if indexPath.section == 3 {
            return (newFloor?.height)!
        }
        return 50
    }
    func numberOfSections(in tableView: UITableView) -> Int {
        return 4
    }
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 1
    }
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = UITableViewCell.init(style: .default, reuseIdentifier: "cell")
        if indexPath.section == 0{
            cell.addSubview(animailTypeFloor!)
        }else if indexPath.section == 1{
            cell.addSubview(hotAnimalFloor!)
        }else if indexPath.section == 2{
            cell.addSubview(sensfloor!)
        }else if indexPath.section == 3{
            cell.addSubview(newFloor!)
        }
        cell.selectionStyle = .none
        return cell;
    }
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
    }
    
    func loadData(){
        let hud = MBProgressHUD.showAdded(to: self.view, animated: true)
        hud.label.text = "正在加载数据"
        hud.mode = .indeterminate;
        hud.removeFromSuperViewOnHide = true
        CoreWork.getHomeData {[weak self] (obj) in
            self?._tableView?.mj_header.endRefreshing()
            hud.hide(animated: true)
            if obj is Dictionary<String,Any>{
                
                   
                let bannerDic = obj["banner"] as? Dictionary<String , Any>;
                let bannerArr = bannerDic?["data"];
                    self?.bannerView?.dataArray = bannerArr as? Array<Dictionary<String, Any>>
                    self?.bannerView?.creatSubViewS()
                let aniamlTypeArr = obj["animaltype"] as? Array<Any>;
                               
                
                let hotanimalDic = obj["hotaniaml"] as? Dictionary<String,Any>;
                let hotanimalArr = hotanimalDic?["data"] as? Array<Any>;
                self?.animailTypeFloor?.setDataArr(arr: aniamlTypeArr ?? []);
                self?.hotAnimalFloor?.setDataArr(arr: hotanimalArr ?? []);
                let markQueenDic = obj["markqueen"] as? Dictionary<String,Any>;
                    let markQueenArr = markQueenDic?["data"]
                    if markQueenArr is Array<Any>{
                        self?.markView?.key = "name"
                        self?.markView?.dataArr = markQueenArr as? Array<Any>
                        self?.markView?.titleLabel?.text = "公告"
                    }
                    let newsDic = obj["news"] as? Dictionary<String,Any>
                    let newsArr = newsDic?["data"];
                    if newsArr is Array<Any>{
                        self?.newFloor?.setDataArr(arr: newsArr as! Array<Any>)
                        
                    }
                let senesDic = obj["senes"] as? Dictionary<String,Any>;
                    let sensArr = senesDic?["data"]
                
                    if sensArr is Array<Any>{
                        self?.sensfloor?.setDataArr(arr: sensArr as! Array<Any>)
                    }
                    self?._tableView?.reloadData()
                
            }
        }
    }
    //跑马灯代理方法
    func markQueeInfoDelegate(dic: Dictionary<String, Any>) {
        if let url = dic["url"] {
            if url as? NSNull == nil{
                let webvc = ZYWebViewController.init()
                webvc.animationType = .revolveAnimation
                webvc.linkUrl = url as? String;
                webvc.shareTitle = dic["name"] as? String
                webvc.hidesBottomBarWhenPushed = true
                if webvc.linkUrl!.count > 0 {
                    self.navigationController?.pushViewController(webvc, animated: true)
                    return
                }
                
            }
        }
        let viewC = SystemMsgViewController()
        viewC.dic = dic
        viewC.animationType = .roundAnimation
        viewC.hidesBottomBarWhenPushed = true
        self.navigationController?.pushViewController(viewC, animated: true)
    }
    func markQueeMoreDelegate() {
//        let viewC = SystemMsgListViewController()
//        viewC.animationType = .revolveAnimation
//        viewC.hidesBottomBarWhenPushed = true
//        self.navigationController?.pushViewController(viewC, animated: true)
    }
    
    
}
