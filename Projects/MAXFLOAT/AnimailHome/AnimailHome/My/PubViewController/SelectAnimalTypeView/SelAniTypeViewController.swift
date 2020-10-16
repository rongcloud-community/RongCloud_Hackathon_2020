//
//  SelAniTypeViewController.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/23.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

class SelAniTypeViewController: BaseViewController ,UITableViewDelegate,UITableViewDataSource{

    var selectedType:((_ typeStr:String,_ typeName:String)->Void)?
    var _tableView : UITableView?
    let nameArr = ["狗","猫","仓鼠","兔子","乌龟","鸟","鱼","猪"]
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = UIColor.clear
        let bgView = UIView.init(frame: kScreen)
        bgView.backgroundColor = UIColor.black
        bgView.alpha = 0.4
        self.view.addSubview(bgView)
        let tap = UITapGestureRecognizer.init(target: self, action: #selector(tabpAction(tap:)))
        tap.numberOfTapsRequired = 1;
        tap.numberOfTouchesRequired = 1;
        bgView.addGestureRecognizer(tap);
        
        
        _tableView = UITableView.init()
        _tableView?.delegate = self
        _tableView?.dataSource = self
        _tableView?.backgroundColor = UIColor.white
        _tableView?.tableFooterView = UIView.init()
        self.view.addSubview(_tableView!)
        _tableView?.snp.makeConstraints({ (make) in
            make.left.right.bottom.equalTo(0)
            make.height.equalTo(250)
        })
        //创建顶部内容
        let topView = UIView.init()
        topView.backgroundColor = UIColor.white
        self.view.addSubview(topView)
        topView.snp.makeConstraints { (make) in
            make.left.right.equalTo(0)
            make.bottom.equalTo((_tableView?.snp.top)!)
            make.height.equalTo(50)
        }
        let lineView = UIView.init(frame: CGRect.init(x: 0, y: 49, width: kScreenWidth, height: 1))
        lineView.backgroundColor = UIColor.lightGray
        topView.addSubview(lineView)
        
        let cancelBtn = UIButton.init(type: .system)
        cancelBtn.setTitle("取消", for: .normal)
        cancelBtn.setTitleColor(UIColor.black, for: .normal)
        cancelBtn.frame = CGRect.init(x: kScreenWidth-60, y: 0, width: 40, height: 50)
        cancelBtn.addTarget(self, action: #selector(cancelBtnAction(btn:)), for: .touchUpInside)
        topView.addSubview(cancelBtn)
        let titleLabel = UILabel.init(frame: CGRect.init(x: kScreenWidth/2-75, y: 0, width: 150, height: 50))
        titleLabel.textAlignment = .center
        titleLabel.text = "选择宠物类型"
        titleLabel.textColor = UIColor.darkGray
        topView.addSubview(titleLabel)
    }
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 50
    }
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 8
    }
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = UITableViewCell.init(style: .default, reuseIdentifier: "cell")
        cell.textLabel?.text = nameArr[indexPath.row]
        cell.textLabel?.textAlignment = .center
        return cell
    }
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        if (selectedType != nil) {
            selectedType!("\(indexPath.row + 1)",nameArr[indexPath.row])
        }
        self.dismiss(animated: false, completion: nil)
    }
    @objc func sureBtnAction(btn:UIButton){
        
    }
    @objc func cancelBtnAction(btn:UIButton){
        self.dismiss(animated: false, completion: nil)
    }
    @objc func tabpAction(tap:UITapGestureRecognizer){
        self.dismiss(animated: false, completion: nil)
    }
}
