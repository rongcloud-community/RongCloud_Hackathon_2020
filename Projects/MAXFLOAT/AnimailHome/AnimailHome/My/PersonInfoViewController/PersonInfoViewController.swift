//
//  PersonInfoViewController.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/7.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

class PersonInfoViewController: BaseViewController ,UITableViewDelegate,UITableViewDataSource{
    var _tableView : UITableView?
    var sectonNameArr = [["头像","昵称","性别","年龄","地址","手机号","个性签名"],["修改密码"]]
    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = "个人信息";
        _tableView = UITableView.init(frame: CGRect.zero, style: .grouped)
        _tableView?.delegate = self
        _tableView?.dataSource = self
        _tableView?.tableFooterView = UIView()
        self.view.addSubview(_tableView!)
        /// 自动关闭估算高度，不想估算那个，就设置那个即可
        _tableView?.estimatedRowHeight = 0;
        _tableView?.estimatedSectionHeaderHeight = 0;
        _tableView?.estimatedSectionFooterHeight = 0;
       
        _tableView?.snp.makeConstraints({ (make) in
            make.right.left.bottom.equalTo(0)
            make.top.equalTo(getNavHeight())
        })
        if #available(iOS 11.0, *) {
            _tableView?.contentInsetAdjustmentBehavior = .never
        } else {
            self.automaticallyAdjustsScrollViewInsets = false
        }
    }
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        _tableView?.reloadData()
    }
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
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
        if indexPath.section == 0 && indexPath.row == 0 {
            return 80
        }
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
        if indexPath.section == 0 {
//            cell.accessoryType = .none
            if indexPath.row == 0{
                let imgV = ZYEditImageView.init(frame: CGRect.init(x: kScreenWidth-100, y: 10, width: 60, height: 60))
                imgV.sd_setImage(with: URL.init(string: BaseImgUrl + userInfo.imgUrl), placeholderImage: UIImage.init(named: "宠物"))
                imgV.sureAction = {[weak self] () in
                    self?.changUserHeader(imgV.image!)
                }
                imgV.layer.cornerRadius = 30
                imgV.layer.masksToBounds = true;
                
                cell.addSubview(imgV)
            }else{
                let label = UILabel.init()
                if indexPath.row == 1{
                    label.text = userInfo.nickname
                }else if indexPath.row == 2{
                    label.text = userInfo.sex
                }else if indexPath.row == 3{
                    label.text = userInfo.age
                }else if indexPath.row == 4{
                    label.text = userInfo.addr
                }else if indexPath.row == 5{
                    label.text = userInfo.phone
                }else if indexPath.row == 6{
                    label.text = userInfo.sign
                }
                
                
                label.textAlignment = .right
                label.textColor = UIColor.darkGray
                cell.addSubview(label)
                label.snp.makeConstraints({ (make) in
                    make.left.equalTo(100)
                    make.top.bottom.equalTo(0)
                    make.right.equalTo(-40)
                })
            }
        }
        cell.accessoryType = .disclosureIndicator
        
        
        return cell;
    }
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        let title = sectonNameArr[indexPath.section][indexPath.row]
        if title == "修改密码" {
            let viewC = BackPwdViewController()
            viewC.animationType = .noneAnimation
            viewC.hidesBottomBarWhenPushed = true
            self.navigationController?.pushViewController(viewC, animated: true)
        }else if title == "手机号"{
            
        }else if title != "头像"{
            let viewC = ChangeUserInfoViewController()
            viewC.animationType = .noneAnimation
            viewC.hidesBottomBarWhenPushed = true
            viewC.controllerTitle = title
            self.navigationController?.pushViewController(viewC, animated: true)
        }
        
    }

   //修改头像
    func changUserHeader(_ img:UIImage){
        var parmas = ["id":userInfo.userid]
        let hud = MBProgressHUD.showAdded(to: (self.view)!, animated: true)
        hud.label.text = "正在上传头像"
        hud.mode = .indeterminate;
        hud.removeFromSuperViewOnHide = true
        
        CoreWork.upImage(type: "1", img: img) {[weak self] (obj) in
            if obj is Dictionary<String,Any>{
                let imgUrl = obj["imgUrl"] as? String
                if imgUrl != nil {
                    parmas["fileurl"] = imgUrl
                        hud.label.text = "正在修改头像"
                        CoreWork.changeUserInfo(parms: parmas, Block: {[weak self] (obj) in
                            if obj is Dictionary<String,Any>{
                                if Int(obj["code"] as! String) == 0{
                                    hud.hide(animated: true)
                                    
                                    userInfo.imgUrl = imgUrl!
                                    self?._tableView?.reloadData()
                                    self?.showAlerController(title: "修改成功", message: "")
                                    return;
                                }
                            }
                            hud.hide(animated: true)
                            self?.showAlerController(title: "修改失败", message: "请重新修改")
                        })
                    return;
                }
                    
            }
            hud.hide(animated: true)
            self?.showAlerController(title: "上传失败", message: "请重新修改")
        }
        
    }
    
}
