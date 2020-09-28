//
//  ZYSengMentBtn.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/27.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

class ZYSengMentBtn: UIView {
    var selectedAction:((_ type:String,_ index:Int) -> Void)?;
    private var oldBtn : UIButton?
    private var dataArr : Array<Any>?
    private var scroView : UIScrollView?
    private let normalColor = UIColor.black
    private let selectedColor = UIColor.init(red: 0.0, green: 147.0/255.0, blue: 226.0/255.0, alpha: 1)
    private let btnWidth = 60
    var selectedIndex : Int?
    override init(frame: CGRect) {
        super.init(frame: frame)
        scroView = UIScrollView.init(frame: CGRect.init(x: 0, y: 0, width: frame.width, height: frame.height))
        scroView?.showsVerticalScrollIndicator = false
        scroView?.showsHorizontalScrollIndicator = false
//        scroView?.bounces = false
//        scroView?.bouncesZoom = false
        self.addSubview(scroView!)
        let lineView = UIView.init(frame: CGRect.init(x: 0, y: frame.height-1, width: frame.width, height: 1))
        lineView.backgroundColor = UIColor.groupTableViewBackground
        self.addSubview(lineView)
    }
    func setSelectedIndex(index:Int){
        selectedIndex = index
        let btn = scroView?.viewWithTag(100 + selectedIndex!) as! UIButton
        oldBtn?.setTitleColor(normalColor, for: .normal)
        btn.setTitleColor(selectedColor, for: .normal)
        oldBtn = btn
    }
    func setDataArr(arr:Array<Any>){
        dataArr = arr
        scroView?.contentSize = CGSize.init(width: btnWidth * (dataArr?.count)!, height: Int((scroView?.height)!))
        for subView in (scroView?.subviews)! {
            subView.removeFromSuperview()
        }
        creatSubViews()
    }
    func creatSubViews(){
        for i in 0..<(dataArr?.count)!{
            let btn = UIButton.init(type: .system)
            btn.frame = CGRect.init(x: CGFloat(i * btnWidth), y: 0.0, width: CGFloat(btnWidth), height: (scroView?.height)!)
            btn.tag = 100 + i
            scroView?.addSubview(btn)
            let dic = dataArr![i] as? Dictionary<String,Any>
            let titleStr = dic!["typedesc"] as! String
            btn.setTitle(titleStr, for: .normal)
            btn.setTitleColor(normalColor, for: .normal)
            btn.addTarget(self, action: #selector(btnAction(btn:)), for: .touchUpInside)
            if i == selectedIndex{
                btn.setTitleColor(selectedColor, for: .normal)
                oldBtn = btn
            }
        }
    }
    
    @objc func btnAction(btn:UIButton){
        if oldBtn == btn {
            return
        }
        oldBtn?.setTitleColor(normalColor, for: .normal)
        btn.setTitleColor(selectedColor, for: .normal)
        oldBtn = btn
        if (selectedAction != nil) {
            let dic = dataArr![btn.tag-100] as? Dictionary<String,Any>
            let type = dic!["id"] as! NSNumber
            selectedAction!("\(type)",btn.tag-100)
        }
        
    }
    
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
}
