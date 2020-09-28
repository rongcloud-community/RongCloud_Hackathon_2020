//
//  RtcLiveWindow.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2020/9/27.
//  Copyright © 2020 XianHong zhang. All rights reserved.
//

import UIKit

class RtcLiveWindow: UIWindow {
   
    var touchFunctin:( (_ touch:UITouch)->Void)?
    override func touchesMoved(_ touches: Set<UITouch>, with event: UIEvent?) {
        /*
        let touch  = touches.first!
        if touchFunctin != nil{
            touchFunctin!(touch)
        }
        
        var newP = self.center
        let p = touch.location(in: UIApplication.shared.keyWindow?.rootViewController?.view)
        
        //判断point的范围
        if p.x > self.width/2.0{
            if p.x < (kScreenWidth - self.width/2.0){
                newP.x = p.x
            }
        }
        if p.y > self.height/2.0{
            if p.y < (kScreenHeight - self.height/2.0){
                newP.y = p.y
            }
        }
        self.center = newP;
*/
    }

}
