//
//  ZYMarkqueeView.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/8.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit
@objc protocol ZYMarkQueeDelegate {
    @objc optional
    func markQueeMoreDelegate()
    @objc optional
    func markQueeInfoDelegate(dic:Dictionary<String,Any>)
}

class ZYMarkqueeView: UIView {

    private var _dataArr:Array<Any>?
    var dataArr:Array<Any>?{
        set{
            _dataArr = newValue
            creatSubViews()
        }
        get{
            return _dataArr
        }
    }
    var titleLabel : UILabel?
    var key:String?//解析数据的key
    var delegate:ZYMarkQueeDelegate?
    private var scrolView:UIScrollView?
    private var timer:Timer?
    override init(frame: CGRect) {
        super.init(frame: frame)
        
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    func creatSubViews(){
        for view in self.subviews {
            view.removeFromSuperview()
        }
        if timer != nil {
            timer?.invalidate()
        }
        titleLabel = UILabel.init()
        titleLabel?.frame = CGRect.init(x: 0, y: 0, width: 50, height: self.height)
        titleLabel?.textColor = UIColor.darkGray
        self.addSubview(titleLabel!)
        titleLabel?.textAlignment = .center
        titleLabel?.font = UIFont.boldSystemFont(ofSize: 14)
        
        
        let moreBtn = UIButton.init(type: .custom)
        moreBtn.frame = CGRect.init(x: kScreenWidth-40, y: 0, width: 50, height: self.height)
        self.addSubview(moreBtn)
//        moreBtn.setTitle("更多", for: .normal)
//        moreBtn.setTitleColor(UIColor.darkGray, for: .normal)
        moreBtn.setImage(UIImage.init(named: "right"), for: .normal)
        moreBtn.addTarget(self, action: #selector(moreBtnAction(btn:)), for: .touchUpInside)
        let lineLeft = UIView.init(frame: CGRect.init(x: 49, y: self.height/2-10, width: 1, height: 20))
        lineLeft.backgroundColor = UIColor.groupTableViewBackground
        self.addSubview(lineLeft)
        let lineRight = UIView.init(frame: CGRect.init(x: kScreenWidth-40, y: self.height/2-10, width: 1, height: 20))
        lineRight.backgroundColor = UIColor.groupTableViewBackground
        self.addSubview(lineRight)
        
        if _dataArr == nil || _dataArr?.count == 0 || key == nil{
            return
        }
        scrolView = UIScrollView.init(frame: CGRect.init(x: (titleLabel?.right)!+5, y: 0, width: kScreenWidth-(titleLabel?.width)!-moreBtn.width-10, height: self.height))
        self.addSubview(scrolView!)
        scrolView?.backgroundColor = UIColor.white
        scrolView?.isScrollEnabled = false
        scrolView?.contentSize = CGSize.init(width: (scrolView?.width)!, height: self.height*CGFloat(((dataArr?.count)!+1)))
        
        var count = 0
        count = (dataArr?.count)!
        
        for i in 0...count {
           let infoBtn = UIButton.init(type: .custom)
            scrolView?.addSubview(infoBtn)
            infoBtn.setTitleColor(UIColor.darkGray, for: .normal)
            infoBtn.titleLabel?.font = UIFont.systemFont(ofSize: 14)
//            NSLineBreakByTruncatingTail
            infoBtn.titleLabel?.lineBreakMode = .byTruncatingTail;
            infoBtn.contentHorizontalAlignment = .left
            infoBtn.addTarget(self, action: #selector(infoBtnAction(btn:)), for: .touchUpInside)
            infoBtn.tag = 2018+i;
            infoBtn.frame = CGRect.init(x: 0, y: CGFloat(i) * self.height, width: (scrolView?.width)!, height: self.height)
            if i < count{
                let dic = dataArr![i] as! Dictionary<String,Any>
                let txt = dic[key!] as! String
                infoBtn.setTitle(txt, for: .normal)
            }else{
                let dic = dataArr?.first as! Dictionary<String,Any>
                let txt = dic[key!] as! String
                infoBtn.setTitle(txt, for: .normal)
            }
        }
        
        timer = Timer.scheduledTimer(timeInterval: 3, target: self, selector: #selector(timerAction(time:)), userInfo: nil, repeats: true)
        
    }

    //moreBtnAction
    @objc func moreBtnAction(btn:UIButton){
        if self.delegate != nil{
            self.delegate?.markQueeMoreDelegate?()
        }
        
    }
    //infoBtnAction
    @objc func infoBtnAction(btn:UIButton){
        if self.delegate != nil{
            self.delegate?.markQueeInfoDelegate?(dic: dataArr![btn.tag-2018] as! Dictionary<String, Any>)
        }
    }
    @objc func timerAction(time:Timer){
        var index = Int((scrolView?.contentOffset.y)!/(scrolView?.height)!)
        index = index + 1
        UIView.animate(withDuration: 0.25, animations: {
            self.scrolView?.contentOffset = CGPoint.init(x: 0, y: CGFloat(index)*(self.scrolView?.height)!)
        }) { (isStop) in
            if index == (self.dataArr?.count)! {
                self.scrolView?.contentOffset = CGPoint.init(x: 0, y: 0)
            }
        }
        
    }
    
}
