//
//  AppDelegate.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/5.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, RCIMUserInfoDataSource,RCIMReceiveMessageDelegate, RCIMConnectionStatusDelegate {
    //状态监听
    func onRCIMConnectionStatusChanged(_ status: RCConnectionStatus) {
        //被挤下线 ConnectionStatus_KICKED_OFFLINE_BY_OTHER_CLIENT
        if status == .ConnectionStatus_KICKED_OFFLINE_BY_OTHER_CLIENT {
            userInfo.clear()
            let hud = MBProgressHUD.showAdded(to: window!, animated: false)
            hud.mode = .text
            hud.label.text = "设备在其它地方登录，本地已下线"
            hud.removeFromSuperview()
            hud.hide(animated: false, afterDelay: 3)
        }
    }
    
    //接收消息的监听
    func onRCIMReceive(_ message: RCMessage!, left: Int32) {
        NotificationCenter.default.post(name: NSNotification.Name(rawValue: "receivemessage"), object: message)
        
    }
    

    var window: UIWindow?


    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        self.window = UIWindow.init(frame: kScreen)
        self.window?.makeKeyAndVisible()
        self.window?.backgroundColor = UIColor.white
        let isFirst = UserDefaults.standard.object(forKey: "isFirst")
        if isFirst != nil {
            let phone = UserDefaults.standard.object(forKey: "phone")
            let password = UserDefaults.standard.object(forKey: "password")
            if phone != nil && password != nil{
                CoreWork.loginUser(phone: phone as! String, pwd: password as! String, Block: { (obj) in
                    
                })
            }
            BaseTabBarController().changeKeyWindowRootViewController()
        }else{
            self.window?.rootViewController = FirstguridViewController()
            
        }
        //开启用户权限，否则不会显示
        
        let set = UIUserNotificationSettings.init(types: .badge, categories: nil)
        UIApplication.shared.registerUserNotificationSettings(set)
        UIApplication.shared.registerForRemoteNotifications()
        
        
        RCIM.shared()?.initWithAppKey("82hegw5uhlvhx")
//        RCIMClient.shared()?.logLevel = .log_Level_Verbose
        
        RCIM.shared()?.userInfoDataSource = self
        RCIM.shared()?.receiveMessageDelegate = self
        RCIM.shared()?.connectionStatusDelegate = self
        RCIM.shared()?.enablePersistentUserInfoCache = true
        RCIM.shared()?.disableMessageAlertSound = false
        shareSDK()
        //自动登录
       
        let phone = UserDefaults.standard.object(forKey: "phone") as? String
        let pwd = UserDefaults.standard.object(forKey: "pwd") as? String
        if (phone  != nil) && (pwd != nil) {
            CoreWork.loginUser(phone: phone!, pwd: pwd!) { (obj) in
                
            }
        }
        
        return true
    }
    func getUserInfo(withUserId userId: String!, completion: ((RCUserInfo?) -> Void)!) {
        
        CoreWork.searchUser(userId: userId) { (obj) in
            if obj is Dictionary<String,Any>{
                let code = obj["code"]
                var scode:NSNumber = (1);
                if code is NSNumber{
                    scode = code as! NSNumber
                }
                if scode.intValue == 0{
                    if let dic = (obj["data"] as? Dictionary<String,Any>){
                        var targetId = "";
                        var targetName = "";
                        var imgurl = "";
                        if let tid = dic["id"] as? NSNumber {
                            targetId = "\(tid)";
                        }
                        if let tname = dic["name"] as? String {
                            targetName = tname
                        }
                        if let imgUrl = dic["fileurl"] as? String {
                            imgurl = BaseImgUrl + imgUrl
                        }
                        
                       let rcUser = RCUserInfo.init(userId: targetId, name: targetName, portrait: imgurl)
                        RCIM.shared()?.refreshUserInfoCache(rcUser, withUserId: targetId)
                       if (completion != nil) {
                           completion(rcUser)
                       }
                    
                    }
                }
            }
        }
        
//        completion()
    }
    
    func shareSDK(){
        ShareSDK.registerActivePlatforms(
            [
                
                SSDKPlatformType.typeWechat.rawValue,
                SSDKPlatformType.typeQQ.rawValue
            ],
            onImport: {(platform : SSDKPlatformType) -> Void in
                switch platform
                {
                
                case SSDKPlatformType.typeWechat:
                    ShareSDKConnector.connectWeChat(WXApi.classForCoder())
                case SSDKPlatformType.typeQQ:
                    ShareSDKConnector.connectQQ(QQApiInterface.classForCoder(), tencentOAuthClass: TencentOAuth.classForCoder())
                default:
                    break
                }
        },
            onConfiguration: {(platform : SSDKPlatformType , appInfo : NSMutableDictionary?) -> Void in
                switch platform
                {
                
                case SSDKPlatformType.typeWechat:
                    //设置微信应用信息
                    appInfo?.ssdkSetupWeChat(byAppId: "wx4bae4711c54ef783",
                                             appSecret: "6b6edf7e1a9ebe1635ae10e516a58aa1")
                case SSDKPlatformType.typeQQ:
                    //设置QQ应用信息
                    appInfo?.ssdkSetupQQ(byAppId: "1106752023",
                                         appKey: "pQHYRHDJIqzbkcyv",
                                         authType: SSDKAuthTypeWeb)
                default:
                    break
                }
        })
    }
    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
        let msgCount = RCIMClient.shared()?.getTotalUnreadCount() ?? 0
        UIApplication.shared.applicationIconBadgeNumber = Int(msgCount)
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
        
        
        
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
        let msgCount = RCIMClient.shared()?.getTotalUnreadCount() ?? 0
        UIApplication.shared.applicationIconBadgeNumber = Int(msgCount)
    }


}

