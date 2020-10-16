//
//  CoreWork.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/5.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

let BaseUrl = "https://chongbaoer.cn/cbservice"
let BaseImgUrl = "https://chongbaoer.cn/cbservice"


class CoreWork: NSObject {
    /**
     登录
     */
    class func loginUser(phone:String,pwd:String,Block:@escaping (_ responsObject:AnyObject) -> Void){
        
        let url = BaseUrl + "/cuser/login.do"
        let parms = ["phone":phone,"pwd":pwd];
        RequestWork.AFNGETWithUrl(urlString: url, parmas: parms as NSDictionary, successFunction: { (obj) in
            if obj is Dictionary<String,Any>{
                let code = obj["code"]
                var scode:NSNumber = (1);
                if code is NSNumber{
                    scode = code as! NSNumber
                }
                if scode.intValue == 0{
                    if let dic = (obj["data"] as? Dictionary<String,Any>){
                        userInfo.isLogin = true
                        if let sign = dic["sdesc"]{
                            if sign as? NSNull == nil{
                                userInfo.sign = sign as! String
                            }
                        }
                        if let nickname = dic["name"]{
                            if nickname as? NSNull == nil{
                                userInfo.nickname = nickname as! String
                                userInfo.name = nickname as! String
                            }
                            
                        }
                        if let addr = dic["addr"]{
                            if addr as? NSNull == nil{
                                userInfo.addr = addr as! String
                            }
                            
                        }
                        if let age = dic["age"]{
                            if age as? NSNull == nil{
                                userInfo.age = age as! String
                            }
                            
                        }
                        if let sex = dic["sex"]{
                            if sex as? NSNull == nil{
                                userInfo.sex = sex as! String
                            }
                            
                        }
                        if let phone = dic["phone"]{
                            if phone as? NSNull == nil{
                                userInfo.phone = phone as! String
                            }
                            
                        }
                        if let imgUrl = dic["fileurl"]{
                            if imgUrl as? NSNull == nil{
                                userInfo.imgUrl = imgUrl as! String
                            }
                        }
                        if let u_id = dic["id"]{
                            if u_id as? NSNull == nil {
                                userInfo.userid = String.init(format: "%@", u_id as! NSNumber)
                            }
                        }
                        if let rongtoken = dic["rongtoken"]{
                            if rongtoken as? NSNull == nil{
                                userInfo.rongtoken = rongtoken as! String
                            }
                            
                        }
                        if let usertype = dic["type"]{
                            if usertype as? NSNull == nil{
                                userInfo.usertype = usertype as! String
                            }
                            
                        }
                        RCIM.shared()?.connect(withToken: userInfo.rongtoken, dbOpened: { (rcdbeerror) in
                            
                        }, success: { (str) in
                            //设置当前用户信息，用于显示自己的头像和昵称
                            let cuser = RCUserInfo.init(userId: userInfo.userid, name: userInfo.name, portrait:BaseImgUrl +  userInfo.imgUrl)
                            RCIM.shared()?.currentUserInfo = cuser;
                            NotificationCenter.default.post(name: NSNotification.Name(rawValue: "receivemessage"), object: nil)
                        }, error: { (connecterror) in
                            
                        })
                    }
                    
                   
                }
            }
            Block(obj);
        }) { (obj) in
            Block(obj);
        }
        
    }
    /**
     注册
     */
    class func registerUser(phone:String,pwd:String,Block:@escaping (_ responsObject:AnyObject) -> Void){
        
        let url = BaseUrl + "/cuser/register.do"
        let parms = ["phone":phone,"pwd":pwd];
        RequestWork.AFNGETWithUrl(urlString: url, parmas: parms as NSDictionary, successFunction: { (obj) in
            Block(obj);
        }) { (obj) in
            Block(obj);
        }
        
    }
    /**
     修改密码
     */
    class func changeUserPwd(phone:String,pwd:String,newPwd:String,Block:@escaping (_ responsObject:AnyObject) -> Void){
        
        let url = BaseUrl + "/cuser/update.do"
        let parms = ["phone":phone,"pwd":newPwd,"id":userInfo.userid];
        
        RequestWork.AFNGETWithUrl(urlString: url, parmas: parms as NSDictionary, successFunction: { (obj) in
            Block(obj);
        }) { (obj) in
            Block(obj);
        }
        
    }
    /**
     修改用户信息
     */
    class func changeUserInfo(parms:[String:String],Block:@escaping (_ responsObject:AnyObject) -> Void){
        
        let url = BaseUrl + "/cuser/update.do"
        
        RequestWork.AFNGETWithUrl(urlString: url, parmas: parms as NSDictionary, successFunction: { (obj) in
            Block(obj);
        }) { (obj) in
            Block(obj);
        }
        
    }
    /**
     查询用户信息
     */
    class func searchUser(userId:String,Block:@escaping (_ responsObject:AnyObject) -> Void){
        
        let url = BaseUrl + "/cuser/list.do"
        let parms = ["userid":userId];
        
        RequestWork.AFNGETWithUrl(urlString: url, parmas: parms as NSDictionary, successFunction: { (obj) in
            
            Block(obj);
        }) { (obj) in
            Block(obj);
        }
        
    }
    /**
     上传图片
     */
    class func upImage(type:String,img:UIImage,Block:@escaping (_ responsObject:AnyObject) -> Void){
        
        let url = BaseImgUrl + "/attachment/upload.do"
        let parms = ["type":type,"id":userInfo.userid];
        
        RequestWork.AFNPOSTWithUrl(urlString: url, img: img, parmas: parms as NSDictionary, successFunction: { (obj) in
            Block(obj)
        }) { (obj) in
            Block(obj)
        }
        
    }
    /**
     获取首页数据
     */
    class func getHomeData(Block:@escaping (_ responsObject:AnyObject) -> Void){
    
        let url = BaseUrl + "/clienthome/home.do"
        RequestWork.AFNGETWithUrl(urlString: url, parmas: NSDictionary(), successFunction: { (obj) in
            Block(obj);
        }) { (obj) in
            Block(obj);
        }
        
    }
    /**
     获取资讯列表
     */
    class func getNesData(page:String,pagesize:String,Block:@escaping (_ responsObject:AnyObject) -> Void){
        
        let url = BaseUrl + "/clienthome/newslist.do"
        let parms = ["page":page,"limit":pagesize];
        RequestWork.AFNGETWithUrl(urlString: url, parmas: parms as NSDictionary, successFunction: { (obj) in
            Block(obj);
        }) { (obj) in
            Block(obj);
        }
        
    }
    /**
     获取公告数据
     */
    class func getSystemMsgData(page:String,pagesize:String,Block:@escaping (_ responsObject:AnyObject) -> Void){
        
        let url = BaseUrl + "/getSystemMsgList"
        let parms = ["page":page,"pagesize":pagesize];
        RequestWork.AFNGETWithUrl(urlString: url, parmas: parms as NSDictionary, successFunction: { (obj) in
            Block(obj);
        }) { (obj) in
            Block(obj);
        }
        
    }
    
    /**
     获取宠物救助
     */
    class func getAnimalHelp(puberid:String?,type:String?,page:String,pagesize:String,Block:@escaping (_ responsObject:AnyObject) -> Void){
        
        let url = BaseUrl + "/clienthome/animalHelplist.do"
        var parms = ["page":page,"limit":pagesize];
        if (type != nil) {
            parms["type"] = type
        }
        if puberid != nil {
            parms["puberid"] = puberid
        }
        RequestWork.AFNGETWithUrl(urlString: url, parmas: parms as NSDictionary, successFunction: { (obj) in
            Block(obj);
        }) { (obj) in
            Block(obj);
        }
        
    }
    
    /**
        获取宠物医生列表
        */
       class func getDoctorList(page:String,pagesize:String,Block:@escaping (_ responsObject:AnyObject) -> Void){
           
           let url = BaseUrl + "/clienthome/doctorlist.do"
           let parms = ["page":page,"limit":pagesize];
           
           RequestWork.AFNGETWithUrl(urlString: url, parmas: parms as NSDictionary, successFunction: { (obj) in
               Block(obj);
           }) { (obj) in
               Block(obj);
           }
           
       }
    /**
     获取宠物救助删除
     */
    class func deletAnimalHelp(helpId:String?,Block:@escaping (_ responsObject:AnyObject) -> Void){
        
        let url = BaseUrl + "/clienthome/animalhelpdelet.do"
        var parms = Dictionary<String,Any>();
        if (helpId != nil) {
            parms["id"] = helpId
        }
        
        RequestWork.AFNGETWithUrl(urlString: url, parmas: parms as NSDictionary, successFunction: { (obj) in
            Block(obj);
        }) { (obj) in
            Block(obj);
        }
        
    }
    /**
     * 发布宠物救助信息
     */
    class func pubAnimalHelp(type:String,name:String?,sdesc:String,info:String,price:String,imgurl:String,imgid:String,fileurl:String,fileid:String,Block:@escaping (_ responsObject:AnyObject) -> Void){
        
        let url = BaseUrl + "/clienthome/helpinsert.do"
        var parms = ["pub_id":userInfo.userid];
        parms["type"] = type
        parms["name"] = name
        parms["sdesc"] = sdesc
        parms["info"] = info
        parms["price"] = price
        parms["imgurl"] = imgurl
        parms["imgid"] = imgid
        parms["fileurls"] = fileurl
        parms["fileids"] = fileid
        
        RequestWork.AFNGETWithUrl(urlString: url, parmas: parms as NSDictionary, successFunction: { (obj) in
            Block(obj);
        }) { (obj) in
            Block(obj);
        }
        
    }
    /**
     获取宠物常识列表
     */
    class func getSensList(page:String,pagesize:String,Block:@escaping (_ responsObject:AnyObject) -> Void){
        
        let url = BaseUrl + "/clienthome/seneslist.do"
        let parms = ["page":page,"limit":pagesize];
        RequestWork.AFNGETWithUrl(urlString: url, parmas: parms as NSDictionary, successFunction: { (obj) in
            Block(obj);
        }) { (obj) in
            Block(obj);
        }
        
    }
    /**
     提交意见反馈
     */
    class func upIdeaBackList(content:String,Block:@escaping (_ responsObject:AnyObject) -> Void){
        
        let url = BaseUrl + "/addIdeaBack"
        let parms = ["pubid":userInfo.userid,"content":content];
        RequestWork.AFNormalNPOSTWithUrl(urlString: url, parmas: parms as NSDictionary, successFunction: { (obj) in
            Block(obj)
        }) { (obj) in
            Block(obj)
        }
    }
    /**
     获取宠物列表
     */
        class func getAnimalList(type:String?,page:String,pagesize:String,Block:@escaping (_ responsObject:AnyObject) -> Void){
        
        let url = BaseUrl + "/clienthome/animallist.do"
        var parms = ["page":page,"limit":pagesize];
        if (type != nil) {
            parms["type"] = type
        }
       
        RequestWork.AFNGETWithUrl(urlString: url, parmas: parms as NSDictionary, successFunction: { (obj) in
            Block(obj);
        }) { (obj) in
            Block(obj);
        }
        
    }
    /**
     获取直播列表
     */
    class func getLiveList(page:String,pagesize:String,pub_id:String?,Block:@escaping (_ responsObject:AnyObject) -> Void){
        
        let url = BaseUrl + "/live/livelist.do"
        var parms = ["page":page,"limit":pagesize];
        if pub_id != nil {
            parms["pub_id"] = pub_id;
        }
        RequestWork.AFNGETWithUrl(urlString: url, parmas: parms as NSDictionary, successFunction: { (obj) in
            Block(obj);
        }) { (obj) in
            Block(obj);
        }
        
    }
    /**
     添加直播
     */
    class func addLive( pub_id:String, imgurl:String, imgid:String, liveUrl:String,title:String,Block:@escaping (_ responsObject:AnyObject) -> Void){
        
        let url = BaseUrl + "/live/insert.do"
//        let liveurl = liveUrl.addingPercentEncoding(withAllowedCharacters: .urlHostAllowed)
        let parms = ["pub_id":pub_id,"imgurl":imgurl,"imgid":imgid,"title":title,"liveUrl":liveUrl];
        //https://chongbaoer.cn/cbservice/live/insert.do?pub_id=1087019534352384&imgurl=244&imgid=12323&title=sdfdsf&liveUrl=sdfsdfdf
//        RequestWork.AFNGETWithUrl(urlString: url, parmas: parms as NSDictionary, successFunction: { (obj) in
//            Block(obj);
//        }) { (obj) in
//            Block(obj);
//        }
        RequestWork.AFNormalNPOSTWithUrl(urlString: url, parmas: parms as NSDictionary, successFunction: { (obj) in
            Block(obj);
        }) { (obj) in
            Block(obj);
        }
        
    }
    /**
     更新直播
     */
    class func updateLive( id:String, isShow:String,Block:@escaping (_ responsObject:AnyObject) -> Void){
        
        let url = BaseUrl + "/live/update.do"
        let parms = ["id":id,"isShow":isShow];
        
        RequestWork.AFNGETWithUrl(urlString: url, parmas: parms as NSDictionary, successFunction: { (obj) in
            Block(obj);
        }) { (obj) in
            Block(obj);
        }
        
    }
    /**
     更新观看数
     */
    class func updateSeecount( id:String,Block:@escaping (_ responsObject:AnyObject) -> Void){
        
        let url = BaseUrl + "/live/updateseecount.do"
        let parms = ["id":id];
        
        RequestWork.AFNGETWithUrl(urlString: url, parmas: parms as NSDictionary, successFunction: { (obj) in
            Block(obj);
        }) { (obj) in
            Block(obj);
        }
        
    }
    
}
