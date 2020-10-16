//
//  AnimalHelpTableView.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/18.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

class AnimalHelpTableView: UITableView ,UITableViewDelegate,UITableViewDataSource{
    var shareType : String?//1寻找宠物 2流浪宠物 3宠物领养
    //是否可以滑动删除
    var canEdit : Bool?
    var queryType:Int?
    private var dataArr : Array<Any>?
    var latitude : String?
    var longitude : String?
    override init(frame: CGRect, style: UITableView.Style) {
        super.init(frame: frame, style: style)
        dataArr = []
        self.delegate = self
        self.dataSource = self
        self.tableFooterView = UIView()
        self.estimatedRowHeight = 0;
        self.estimatedSectionHeaderHeight = 0;
        self.estimatedSectionFooterHeight = 0;
        let mj_header = MJRefreshStateHeader.init {
            self.loadData()
        }
        self.mj_header = mj_header;
        
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    func setDataArr(arr:Array<Any>){
        dataArr = arr
        self.reloadData()
    }
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 0.01
    }
    func tableView(_ tableView: UITableView, heightForFooterInSection section: Int) -> CGFloat {
        
        return 20
    }
    func tableView(_ tableView: UITableView, viewForFooterInSection section: Int) -> UIView? {
        return nil
    }
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        return nil
    }
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 85
    }
    func numberOfSections(in tableView: UITableView) -> Int {
        return (dataArr?.count)!
    }
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 1
    }
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        var cell = tableView.dequeueReusableCell(withIdentifier: "cell")
        
        if cell == nil{
            cell = Bundle.main.loadNibNamed("AniHelpTableViewCell", owner: nil, options: nil)?.last as? UITableViewCell
        }
        cell?.selectionStyle = .none
        let ce = cell as! AniHelpTableViewCell
        let dic = dataArr![indexPath.section] as! Dictionary<String,Any>
        ce.setDataDic(dic: dic)
        return ce;
    }
    //ios 11之前
    //左滑删除
    func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        if canEdit != nil {
            return canEdit!
        }
        return false
    }
    func tableView(_ tableView: UITableView, editingStyleForRowAt indexPath: IndexPath) -> UITableViewCell.EditingStyle {
        return .delete
    }
    func tableView(_ tableView: UITableView, titleForDeleteConfirmationButtonForRowAt indexPath: IndexPath) -> String? {
        return "删除"
    }
    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            let hud = MBProgressHUD.showAdded(to: self, animated: true)
            hud.label.text = "正在加载数据"
            hud.mode = .indeterminate;
            hud.removeFromSuperViewOnHide = true
            let dic = dataArr![indexPath.section] as! Dictionary<String,Any>
            
            CoreWork.deletAnimalHelp(helpId: "\(dic["id"] ?? "0")") {[weak self] (obj) in
                hud.hide(animated: true)
                self?.loadData()
            }
        }
    }
    func loadData() {
        let hud = MBProgressHUD.showAdded(to: self, animated: true)
        hud.label.text = "正在加载数据"
        hud.mode = .indeterminate;
        hud.removeFromSuperViewOnHide = true
        CoreWork.getAnimalHelp(puberid: userInfo.userid, type: "\(queryType! + 1)", page: "1", pagesize: "1000") { [weak self](obj) in
            hud.hide(animated: true)
            self?.mj_header.endRefreshing()
            if obj is Dictionary<String,Any>{
                let dic = obj["data"] as? Dictionary<String,Any>
                if dic != nil{
                    let code = dic?["code"]
                    if code is NSNumber {
                       let newcode = code as! NSNumber;
                        if newcode.intValue == 0 {
                            let arr = dic?["data"] as? Array<Any>
                            if arr != nil {
                                
                                self?.setDataArr(arr: arr!)
                            }
                            
                            return
                        }
                    }
                    
                }
            }
          
        }
    }
    //ios 11之后
    /*
    @available(iOS 11.0, *)
    func tableView(_ tableView: UITableView, trailingSwipeActionsConfigurationForRowAt indexPath: IndexPath) -> UISwipeActionsConfiguration? {
        let deleAction = UIContextualAction.init(style: .destructive, title: "删除") { (action, souceView, (Bool)->Void) in
            
        }
//        deleAction.backgroundColor = UIColor.white
        
        let config = UISwipeActionsConfiguration.init(actions: [deleAction])
        return config
    }
 */
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        let dic = dataArr![indexPath.section] as! Dictionary<String, Any>
        let animalid = dic["id"] as? NSNumber;
        //        let url = BaseUrl + "" + "\(String(describing: animalid))"
        let url = String.init(format: "%@/clienthome/animalhelpinfoweb.do?id=%@", BaseUrl,animalid!)
        let viewC = AnimalInfoWebViewController()
        viewC.hidesBottomBarWhenPushed = true;
        viewC.title = dic["name"] as? String
        viewC.dic = dic;
        viewC.linkUrl = url;
        self.zytviewController()?.navigationController?.pushViewController(viewC, animated: true)
    }
    //时间戳转时间
    func getTimeStr(timeLength:String)->String{
        let date = Date.init(timeIntervalSince1970: Double(timeLength)!)
        let formatter = DateFormatter.init()
        formatter.dateFormat = "yyyy-MM-dd"
        let dateStr = formatter.string(from: date)
        
        return dateStr
    }
    //获取内容高度
    func getStrSize(str:String)->CGFloat{
        let size = str.sizeWithFontMaxSize(font: UIFont.systemFont(ofSize: 14), maxSize: CGSize.init(width: kScreenWidth-32, height: CGFloat(MAXFLOAT)))
        return size.height
    }
    //获取图片高度
    func getImageHeigh(imgStr:String?)->CGFloat{
        if imgStr != nil {
            let imgArr = imgStr?.components(separatedBy: ",")
            let height = kScreenWidth/3
            let section = (imgArr?.count)!/3
            let yu = (imgArr?.count)!%3
            var imgHeight = CGFloat(section) * height
            if yu > 0{
                imgHeight = CGFloat((section + 1)) * height
            }
            
            return imgHeight
        }
        return 0.001
    }
}
