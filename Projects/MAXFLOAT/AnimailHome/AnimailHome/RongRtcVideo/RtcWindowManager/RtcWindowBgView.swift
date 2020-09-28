//
//  RtcWindowBgView.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2020/9/27.
//  Copyright © 2020 XianHong zhang. All rights reserved.
//

import UIKit

class RtcWindowBgView: UIView {

    var touchFunctin:( (_ touch:UITouch)->Void)?
    override func touchesMoved(_ touches: Set<UITouch>, with event: UIEvent?) {
        let touch  = touches.first!
//        let p = (touch?.location(in: UIApplication.shared.keyWindow))!
//        if pointFunctin != nil{
//            pointFunctin!(p)
//        }
        if touchFunctin != nil{
            touchFunctin!(touch)
        }
        
    }

}
