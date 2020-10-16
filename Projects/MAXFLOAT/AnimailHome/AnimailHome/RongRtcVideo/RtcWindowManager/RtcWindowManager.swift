//
//  RtcWindowManager.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2020/9/18.
//  Copyright © 2020 XianHong zhang. All rights reserved.
//

import UIKit
let rtcWindowManager = RtcWindowManager()
class RtcWindowManager: NSObject {
    var rtcWindow:RtcLiveWindow?;
    var smallBtn:UIButton?
    var bgView:RtcWindowBgView?
    var dic:Dictionary<String,Any>?
    ///创建window
    func creatRtcWindow(){
        if rtcWindow != nil {
            return
        }
        rtcWindow = RtcLiveWindow.init(frame: CGRect.init(x: 0, y: 0, width: kScreenWidth, height: kScreenHeight))
        rtcWindow?.windowLevel = .alert
        rtcWindow?.backgroundColor = .black
        rtcWindow?.isHidden = false
        smallBtn = UIButton.init(type: .custom)
        smallBtn?.frame = CGRect.init(x: 10, y: 34, width: 40, height: 40)
        smallBtn?.setImage(UIImage.init(named: "suofang"), for: .normal)
        smallBtn?.addTarget(self, action: #selector(smallRtcWindow), for: .touchUpInside)
        rtcWindow?.addSubview(smallBtn!)
        
        bgView = RtcWindowBgView.init(frame: rtcWindow!.bounds)
        bgView?.backgroundColor = .clear
        rtcWindow?.addSubview(bgView!)
       
        bgView?.touchFunctin = { [weak self](touch)in
            var newP = (self?.rtcWindow?.center)!
            let p = touch.location(in: UIApplication.shared.windows.first)
            
            //判断point的范围
            if p.x > (self?.rtcWindow!.width)!/2.0{
                if p.x < (kScreenWidth - (self?.rtcWindow!.width)!/2.0){
                    newP.x = p.x
                }
            }
            if p.y > (self?.rtcWindow!.height)!/2.0{
                if p.y < (kScreenHeight - (self?.rtcWindow!.height)!/2.0){
                    newP.y = p.y
                }
            }
            self?.rtcWindow?.center = newP;
        }
        
        let tap = UITapGestureRecognizer.init(target: self, action: #selector(bigRtcWindow))
        tap.numberOfTouchesRequired = 1
        tap.numberOfTapsRequired = 1
        bgView?.addGestureRecognizer(tap)
        bgView?.isHidden = true
    }
    ///显示主播主视图
    func showPlayRtcVC(){
     if rtcWindow != nil {
         return
     }
        creatRtcWindow()
        let vc = PlayRtcMainVC.init()
        vc.dic = dic
        rtcWindow?.rootViewController = vc
        
        
        rtcWindow?.addSubview(smallBtn!)
        rtcWindow?.addSubview(bgView!)
    }
    
    ///显示用户主视图
    func showLookRtcRV() {
        if rtcWindow != nil {
            return
        }
        creatRtcWindow()
        let vc = LookRtcMainVC.init()
        vc.dic = dic
        rtcWindow?.rootViewController = vc
        
        
        rtcWindow?.addSubview(smallBtn!)
        rtcWindow?.addSubview(bgView!)
    }
    ///销毁window
    func closeRtcWindow(){
        rtcWindow = nil
    }
    ///放大window
    @objc func bigRtcWindow(){
        bgView?.isHidden = true
        UIView.animate(withDuration: 0.35) {
            self.rtcWindow?.transform = CGAffineTransform.init(scaleX: 1, y: 1)
            self.rtcWindow?.frame = CGRect.init(x: 0, y: 0, width: kScreenWidth, height: kScreenHeight)
        }
    }
    ///缩小window
    @objc func smallRtcWindow(){
        bgView?.isHidden = false
       
        let widthScal = 0.3
        let heightScal = (kScreenWidth * CGFloat(widthScal))*kScreenHeight/(kScreenWidth * kScreenHeight)
        UIView.animate(withDuration: 0.35, animations: {
            self.rtcWindow?.transform = CGAffineTransform.init(scaleX: CGFloat(widthScal), y: heightScal)
            self.rtcWindow?.frame = CGRect.init(x: kScreenWidth - CGFloat(widthScal) * kScreenWidth - 10, y: 60, width: kScreenWidth * CGFloat(widthScal), height: kScreenHeight * heightScal)
        }) { (isAnimation) in
            
        }
    }
}
