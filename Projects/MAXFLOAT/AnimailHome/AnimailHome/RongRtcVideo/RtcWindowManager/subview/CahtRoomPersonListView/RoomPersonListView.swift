//
//  RoomPersonListView.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2020/9/29.
//  Copyright © 2020 XianHong zhang. All rights reserved.
//

import UIKit

class RoomPersonListView: UIView ,UITableViewDelegate,UITableViewDataSource{

    var dataArr:Array<RCUserInfo>?
    var tableView:UITableView?
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.backgroundColor = .white
        dataArr = Array.init()
        tableView = UITableView.init()
        self.addSubview(tableView!)
        tableView?.snp_makeConstraints({ (make) in
            make.top.left.right.bottom.equalTo(0)
        })
        self.tableView?.delegate = self;
        self.tableView?.dataSource = self;
        
        self.tableView?.showsVerticalScrollIndicator = false
        self.tableView?.showsHorizontalScrollIndicator = false
        
        self.tableView?.tableFooterView = UIView()
        dataArr = Array.init()
        self.tableView?.separatorStyle = .none
    }
    
    
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    func addUser(rongUser:RCUserInfo){
        if dataArr?.contains(rongUser) == false {
            dataArr?.append(rongUser)
            DispatchQueue.main.async {
                self.tableView?.reloadData()
            }
            
        }
        
    }
    func delteUser(rongUser:RCUserInfo){
        if dataArr?.contains(rongUser) == true {
            let index = dataArr?.lastIndex(of: rongUser)
            
            dataArr?.remove(at: index!)
            DispatchQueue.main.async {
                self.tableView?.reloadData()
            }
        }
        
    }
    
    func tableView(_ tableView: UITableView, heightForFooterInSection section: Int) -> CGFloat {
        return 0.01
    }
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 0.01
    }
    func tableView(_ tableView: UITableView, viewForFooterInSection section: Int) -> UIView? {
        return nil
    }
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        return nil
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        
        return dataArr?.count ?? 0
    }
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 40
    }
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        var cell = tableView.dequeueReusableCell(withIdentifier: "cell")
        if cell == nil {
            cell = Bundle.main.loadNibNamed("RoomPersonTableViewCell", owner: nil, options: nil)?.last as! RoomPersonTableViewCell
        }
        cell?.selectionStyle = .none
        let ruser = dataArr![indexPath.row]
        let ce = cell as! RoomPersonTableViewCell
        if let name = ruser.name {
            ce.nameLabel.text = name
        }else{
            ce.nameLabel.text = ""
        }
        if let imgurl = ruser.portraitUri {
            ce.imgV.sd_setImage(with: URL.init(string: (BaseImgUrl + imgurl)))
        }else{
            ce.imgV.image = nil
        }
        
        return ce;
    }
}
