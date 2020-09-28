//
//  MsgListTabView.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2020/9/22.
//  Copyright © 2020 XianHong zhang. All rights reserved.
//

import UIKit

class MsgListTabView: UITableView ,UITableViewDelegate,UITableViewDataSource{
    
    var dataArr:Array<String>?
    var sinputView:MsgInputButtomView?
    override init(frame: CGRect, style: UITableView.Style) {
        super.init(frame: frame, style: style)
        
        self.delegate = self;
        self.dataSource = self;
        self.backgroundColor = .clear
        
        self.tableFooterView = UIView()
        dataArr = Array.init()
        self.separatorStyle = .none
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    func addMsg(txt:String) {
        if dataArr!.count > 50 {
            dataArr?.removeFirst()
        }
        dataArr?.append(txt)
        self.reloadData()
        self.scrollToRow(at: IndexPath.init(row: dataArr!.count-1, section: 0), at: .top, animated: true)
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
        return 20
    }
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        var cell = tableView.dequeueReusableCell(withIdentifier: "cell")
        if cell == nil {
            cell = UITableViewCell.init(style: .default, reuseIdentifier: "cell")
        }
        cell?.selectionStyle = .none
        cell?.backgroundColor = .clear
        
        cell?.textLabel?.numberOfLines = 0
        cell?.textLabel?.font = UIFont.systemFont(ofSize: 12)
        cell?.textLabel?.textColor = .white
        
        let txt = dataArr?[indexPath.row]
        cell?.textLabel?.text = txt
        return cell!;
    }
    
    
}
