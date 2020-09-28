//
//  UserInfoObject.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/8.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit
let userInfo = UserInfoObject()
class UserInfoObject: NSObject {

    
    var isLogin = false
    var sign = ""
    var name = ""
    var nickname = ""
    var addr = ""
    var age = ""
    var sex = ""
    var imgUrl = ""
    var phone = ""
    var password = ""
    var userid = ""
    var rongtoken = ""
    var usertype = ""
    
    func clear(){
        self.phone = ""
        self.password = ""
        self.nickname = ""
        self.name = ""
        self.sex = ""
        self.sign = ""
        self.addr = ""
        self.imgUrl = ""
        self.rongtoken = ""
        self.usertype = "0"
        self.isLogin = false
    }
}

