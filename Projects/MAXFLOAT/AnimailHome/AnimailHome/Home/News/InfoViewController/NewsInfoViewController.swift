//
//  NewsInfoViewController.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/7.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit
import WebKit
class NewsInfoViewController: BaseViewController ,WKNavigationDelegate,WKUIDelegate{
    var hud:MBProgressHUD?
    var _webView:WKWebView?
    var linkUrl:String?
    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = "详情";
        _webView = WKWebView()
        _webView?.uiDelegate = self;
        _webView?.navigationDelegate = self;
        self.view.addSubview(_webView!)
        _webView?.snp.makeConstraints({ (make) in
            make.left.right.bottom.equalTo(0)
            make.top.equalTo(getNavHeight())
        })
        if linkUrl != nil {
            _webView?.load(URLRequest.init(url: URL.init(string: linkUrl!)!));
        }
    }
    
    func webView(_ webView: WKWebView, didStartProvisionalNavigation navigation: WKNavigation!) {
        hud = MBProgressHUD.showAdded(to: self.view, animated: true)
        hud?.label.text = "正在加载数据"
        hud?.mode = .indeterminate;
        hud?.removeFromSuperViewOnHide = true
    }
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        hud?.hide(animated: true)
    }
    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        hud?.hide(animated: true)
    }

}
