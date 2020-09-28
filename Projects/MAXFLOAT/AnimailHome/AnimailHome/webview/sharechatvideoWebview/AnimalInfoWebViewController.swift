//
//  AnimalInfoWebViewController.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/6/14.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit
import WebKit
class AnimalInfoWebViewController: BaseViewController ,WKUIDelegate,WKNavigationDelegate{
    var linkUrl : String?
    var _webView : WKWebView?
    var _hud : MBProgressHUD?
    var dic:Dictionary<String,Any>?
    override func viewDidLoad() {
        super.viewDidLoad()

        _webView = WKWebView.init()
        self.view.addSubview(_webView!)
        _webView?.uiDelegate = self;
        _webView?.navigationDelegate = self;
        
        if linkUrl != nil {
            _webView?.load(URLRequest.init(url: URL.init(string: linkUrl!)!))
        }
        
        _webView?.snp.makeConstraints({ (make) in
            make.left.right.bottom.equalTo(0)
            make.top.equalTo(getNavHeight())
        })
        if #available(iOS 11.0, *) {
            _webView?.scrollView.contentInsetAdjustmentBehavior = .never
        } else {
            self.automaticallyAdjustsScrollViewInsets = false
        }
        
    }
    
    //将要开始加载
    func webView(_ webView: WKWebView, didStartProvisionalNavigation navigation: WKNavigation!) {
        _hud = MBProgressHUD.showAdded(to: self.view, animated: true)
        _hud?.mode = .indeterminate;
        _hud?.label.text = "正在加载数据，请稍后";
        _hud?.removeFromSuperViewOnHide = true;
    }
    //加载完成
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        _hud?.hide(animated: true)
    }
    //加载失败
    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        _hud?.hide(animated: true)
    }
    // 接收到服务器跳转请求之后调用
    func webView(_ webView: WKWebView, didReceiveServerRedirectForProvisionalNavigation navigation: WKNavigation!) {
        
    }
    // 在收到响应后，决定是否跳转
    func webView(_ webView: WKWebView, decidePolicyFor navigationResponse: WKNavigationResponse, decisionHandler: @escaping (WKNavigationResponsePolicy) -> Void) {
        decisionHandler(.allow)
    }
    // 在发送请求之前，决定是否跳转
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        let urlStr = navigationAction.request.url?.absoluteString
        if (urlStr?.contains("chongbaoer://"))! {
            let imgArr = [UIImage.init(named: "宠物.png")]
            let shareParams = NSMutableDictionary.init()
            shareParams.ssdkSetupShareParams(byText: "宠宝儿专注于为您的宠物服务", images: imgArr, url: URL.init(string: linkUrl!), title: self.title, type: .auto)
            ShareSDK.showShareActionSheet(nil, items: nil, shareParams: shareParams) { (state, platmType, userData, entity, iserror, isSuccess) in
                
            }
        }else if (urlStr?.contains("chongbaoerchat://"))! {
            //聊天
            
            tochat()
        }else if (urlStr?.contains("chongbaoervideo://"))!{
            //视频
            tovideo()
        }
        if (urlStr?.contains("http://"))! || (urlStr?.contains("https://"))!{
            decisionHandler(.allow)
            return;
        }
        decisionHandler(.cancel)
    }
    func tochat(){
        var targetId = "";
        var targetName = "";
        if let animaldic = dic?["user"] as? Dictionary<String,Any> {
            if let tid = animaldic["id"] as? NSNumber {
                targetId = "\(tid)";
            }
            if let tname = animaldic["name"] as? String {
                targetName = tname
            }
            
        }else if let animaldic = dic?["pub_user"] as? Dictionary<String,Any> {
            if let tid = animaldic["id"] as? NSNumber {
                targetId = "\(tid)";
            }
            if let tname = animaldic["name"] as? String {
                targetName = tname
            }
        }
        if userInfo.isLogin == false {
            self.showAlerController(title: "您未登录", message: "请先去登陆")
            return
        }
        if userInfo.userid == targetId {
            return
        }
        let viewC = CBChatVC.init(conversationType: .ConversationType_PRIVATE, targetId: targetId)
        viewC?.title = targetName;
        viewC?.animationType = .revolveAnimation
        self.navigationController?.pushViewController(viewC!, animated: true)
        
    }
    func tovideo(){
        
    }
    
}
