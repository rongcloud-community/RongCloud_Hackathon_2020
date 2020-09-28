//
//  HeaderAnimationView.swift
//  MyPlayer
//
//  Created by ybon on 2016/11/14.
//  Copyright © 2016年 zxh. All rights reserved.
//

import UIKit
let timeLength = 10
class HeaderAnimationView: UIView ,UIScrollViewDelegate{
    var _scroller : UIScrollView?;
    var _pageControl:UIPageControl?;
    var dataArray : Array<Dictionary<String,Any>>?;
    var timer:Timer?;
    var j = 1;
    var tapFunction:((_ tapDic:Dictionary<String,Any>) -> Void)?;
    override init(frame: CGRect) {
        super.init(frame: frame);
        
     
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func creatSubViewS(){
        
        if dataArray == nil {
            return;
        }
        timer?.invalidate();
        _scroller?.removeFromSuperview();
        _pageControl?.removeFromSuperview();
        _scroller = nil;
        _scroller = UIScrollView.init(frame: CGRect.init(x: 0, y: 0, width: self.width, height: self.height));
        _scroller?.delegate = self;
        _scroller?.isPagingEnabled = true;
        _scroller?.bounces = false;
        _scroller?.showsVerticalScrollIndicator = false;
        _scroller?.showsHorizontalScrollIndicator = false;
        self.addSubview(_scroller!);
        _scroller?.contentSize = CGSize.init(width: self.width*CGFloat((dataArray?.count)!+2), height: self.height);
        _pageControl = UIPageControl.init(frame: CGRect.init(x: 0, y: self.height-30, width: self.width, height: 30))
        self.addSubview(_pageControl!)
        _pageControl?.numberOfPages = (dataArray?.count)!
        _pageControl?.isUserInteractionEnabled = false;
//        _pageControl?.pageIndicatorTintColor = UIColor.red
        for i in 0..<(dataArray?.count)! + 2{
            
            var dic :Dictionary<String,Any>;
            if i == 0{
                dic = (dataArray?.last)!
            }else if i == (dataArray?.count)!+1{
                dic = (dataArray?.first)!
            }else{
                dic = dataArray![i-1]
            }
            
            let imageV = ZYImageView.init(frame: CGRect.init(x:CGFloat(i) * self.width, y: 0, width: self.width, height: self.height));
            imageV.dic = dic
            imageV.tapFunction = { [weak self] (dic) in
                if self?.tapFunction != nil {
                    self?.tapFunction!(dic)
                }
            }
            if let url = dic["fileurls"]{
                imageV.sd_setImage(with: URL.init(string:BaseImgUrl + (url as! String)),placeholderImage:UIImage.init(named: "宠物"));
            }
            
            _scroller?.addSubview(imageV);
        }
        _pageControl?.currentPage = 0;
        _scroller?.contentOffset.x = self.width
        timer = Timer.scheduledTimer(timeInterval: TimeInterval(timeLength), target: self, selector: #selector(timerAction(time:)), userInfo: nil, repeats: true);
        
    }
    @objc func timerAction(time:Timer){
    
        j = j + 1;
        
        UIView.animate(withDuration: 0.35) { 
            
           self._scroller?.contentOffset = CGPoint.init(x: CGFloat(self.j)*self.width, y: 0);
        };
        if j == (dataArray?.count)! + 1{
            j = 1;
            self._scroller?.contentOffset = CGPoint.init(x: CGFloat(self.j)*self.width, y: 0);
        }
        _pageControl?.currentPage = j-1;
    }
    func scrollViewWillBeginDragging(_ scrollView: UIScrollView) {
        timer?.invalidate()
    }
    func scrollViewDidEndDecelerating(_ scrollView: UIScrollView) {
        j = Int(scrollView.contentOffset.x/self.width)
        
        if j == (dataArray?.count)! + 1{
            j = 1;
            self._scroller?.contentOffset = CGPoint.init(x: CGFloat(self.j)*self.width, y: 0);
        }
        if j == 0{
            j = (dataArray?.count)!;
            self._scroller?.contentOffset = CGPoint.init(x: CGFloat(self.j)*self.width, y: 0);
        }
        _pageControl?.currentPage = j-1;
        timer = Timer.scheduledTimer(timeInterval: TimeInterval(timeLength), target: self, selector: #selector(timerAction(time:)), userInfo: nil, repeats: true);
    }
    
}
