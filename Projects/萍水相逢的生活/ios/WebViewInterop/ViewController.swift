import UIKit
import WebKit

class ViewController: UIViewController {
    var webView: WKWebView!
    @IBOutlet weak var webViewContainer: UIView!
    lazy private var progressView: UIProgressView = {
        self.progressView = UIProgressView.init(frame: CGRect(x: CGFloat(0), y: CGFloat(1), width: UIScreen.main.bounds.width, height: 2))
        self.progressView.tintColor = UIColor.green      // 进度条颜色
        self.progressView.trackTintColor = UIColor.white // 进度条背景色
        return self.progressView
    }()

    override func viewDidLoad() {
        super.viewDidLoad()
        
        // 初始化融云的两个组件
        RCIMClient.shared()?.initWithAppKey("pvxdm17jpe4ir")
        RCCall.shared()
        
        // 接下来是设置 WebView
        let contentController = WKUserContentController()
        contentController.add(self, name: "rongCloud")
        contentController.add(self, name: "logger")
        
        let config = WKWebViewConfiguration()
        config.userContentController = contentController
        
        webView = WKWebView(frame: webViewContainer.bounds, configuration: config)
        webView.translatesAutoresizingMaskIntoConstraints = false
        
        webViewContainer.addSubview(webView)
        webViewContainer.addSubview(progressView)
        
        webView.leadingAnchor.constraint(equalTo: webViewContainer.leadingAnchor, constant: 0).isActive = true
        webView.trailingAnchor.constraint(equalTo: webViewContainer.trailingAnchor, constant: 0).isActive = true
        webView.topAnchor.constraint(equalTo: webViewContainer.topAnchor, constant: 0).isActive = true
        webView.bottomAnchor.constraint(equalTo: webViewContainer.bottomAnchor, constant: 0).isActive = true
        
        webView.addObserver(self, forKeyPath: "estimatedProgress", options: .new, context: nil)
        webView.navigationDelegate = self
        
        // 最后让 WebView 加载页面
        let url_string = ProcessInfo.processInfo.environment["APP_WEBVIEW_URL"] ??
            "https://yet.run:8000?platform=ios"
        if let url = URL(string: url_string) {
            print("WebView 加载页面", url_string)
            webView.load(URLRequest(url: url,
                                    // 默认使用缓存，或者强制不使用缓存：.reloadIgnoringLocalCacheData
                                    // 参考文档：https://developer.apple.com/documentation/foundation/nsurlrequest/cachepolicy
                                    cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10))
        } else {
            print("URL 格式非法：", url_string)
        }
    }
    
    // 资料：
    // - https://www.jianshu.com/p/2d74b5b4e0f1
    override func observeValue(forKeyPath keyPath: String?, of object: Any?, change: [NSKeyValueChangeKey : Any]?, context: UnsafeMutableRawPointer?) {
        //  加载进度条
        if keyPath == "estimatedProgress"{
            progressView.alpha = 1.0
            progressView.setProgress(Float((self.webView?.estimatedProgress) ?? 0), animated: true)
            if (self.webView?.estimatedProgress ?? 0.0)  >= 1.0 {
                UIView.animate(withDuration: 0.3, delay: 0.1, options: .curveEaseOut, animations: {
                    self.progressView.alpha = 0
                }, completion: { (finish) in
                    self.progressView.setProgress(0.0, animated: false)
                })
            }
        }
    }
}

extension ViewController: WKNavigationDelegate {
    // 资料：
    // - https://developer.apple.com/documentation/webkit/wknavigationdelegate
    // - https://developer.apple.com/documentation/foundation/1508628-url_loading_system_error_codes
    func webView(_: WKWebView, didFailProvisionalNavigation: WKNavigation!, withError: Error) {
        let error = withError as NSError
        let url = error.userInfo["NSErrorFailingURLKey"] ?? "unknown"
        let code = error.code
        
        let alert = UIAlertController(
            title: "Webpage not available",
            message: """
            The webpage could not be loaded, details:

            - url: \(url)
            - code: \(code)
            """,
            preferredStyle: .alert
        )
        alert.addAction(UIAlertAction(title: "Ok", style: .default, handler: nil))
        self.present(alert, animated: true)
    }
}

extension ViewController:WKScriptMessageHandler {
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if message.name == "rongCloud" {
            let body = message.body as! NSDictionary
            let action = body["action"] as! String
            let data = body["data"] as? NSDictionary ?? [:]
            
            switch(action) {
            case "connect":
                let token = data["token"] as! String
                rongCloudConnect(token)
            case "disconnect":
                rongCloudDisconnect()
            case "sendToRongCloud":
                let userId = data["userId"] as! Int
                let message = data["message"] as! NSDictionary
                sendToRongCloud(userId: userId, message: message)
            case "call":
                let targetUserId = data["targetUserId"] as! Int
                let type = data["type"] as! String
                let mediaType:RCCallMediaType
                if (type == "video") {
                    mediaType = RCCallMediaType.video
                } else {
                    mediaType = RCCallMediaType.audio
                }
                RCCall.shared().startSingleCall(
                    String(targetUserId),
                    mediaType: mediaType
                )
            default:
                print("不支持的动作：\(action)")
            }
        } else if message.name == "logger" {
            let body = message.body as! NSDictionary
            let params = body["params"] as! [String]
            print("WebView Log: \(params.joined(separator: " "))")
            return
        }
    }
}

// 设置与融云相关的函数
extension ViewController:RCIMClientReceiveMessageDelegate {
    func rongCloudConnect(_ token: String) {
        RCIMClient.shared().connect(
            withToken: token,
            dbOpened: nil,
            success: nil,
            error: nil
        )
        
        RCIMClient.shared().setReceiveMessageDelegate(self, object: nil)
    }
    
    func rongCloudDisconnect() {
        RCIMClient.shared().disconnect()
    }
    
    func sendToRongCloud(userId: Int, message: NSDictionary) {
        print("sendToRongCloud", userId, message)
        
        let messageContent:RCMessageContent
        
        let messageType = message["type"] as! String
        switch(messageType) {
        case "text":
            let textMessage = RCTextMessage()
            textMessage.content = convertDictionaryToJSON(dictionary: message["body"] as! NSDictionary) as String
            let conversationId = message["conversationId"] as! Int
            let messageId = message["id"] as! Int
            textMessage.extra = "id:\(messageId),conversation:\(conversationId)"
            messageContent = textMessage
        case "image":
            let imageMessage = RCImageMessage()
            imageMessage.remoteUrl = convertDictionaryToJSON(dictionary: message["body"] as! NSDictionary) as String
            let conversationId = message["conversationId"] as! Int
            let messageId = message["id"] as! Int
            imageMessage.extra = "id:\(messageId),conversation:\(conversationId)"
            messageContent = imageMessage
        default:
            print("不支持的消息类型：\(messageType)")
            return
        }
        
        RCIMClient.shared().sendMessage(
            RCConversationType.ConversationType_PRIVATE,
            targetId: String(userId),
            content: messageContent,
            pushContent: "pushContent",
            pushData: "pushData",
            success: { (code) in
                print("success")
            },
            error: { (code, code2) in
                print("error")
            }
        )
    }
    
    func onReceived(_ message: RCMessage!, left nLeft: Int32, object: Any!) {
        var messageToRongCloud: [String: Any] = [:]
        
        if let textMessage = message.content as? RCTextMessage {
            messageToRongCloud["messageType"] = "TextMessage"
            messageToRongCloud["content"] = [
                "content": textMessage.content,
                "extra": textMessage.extra
            ]
        } else if let imageMessage = message.content as? RCImageMessage {
            messageToRongCloud["messageType"] = "ImageMessage"
            messageToRongCloud["content"] = [
                "imageUri": imageMessage.remoteUrl,
                "extra": imageMessage.extra
            ]
        }
        
        messageToRongCloud["receivedTime"] = message.receivedTime
        
        let messageJSONToRongCloud = convertDictionaryToJSON(dictionary: messageToRongCloud as NSDictionary)
        
        DispatchQueue.main.async {
            self.webView.evaluateJavaScript("receiveMessageFromRongCloud(\(messageJSONToRongCloud))", completionHandler: nil)
        }
    }
}

// 扩展与 JSON 之间的转换能力
extension ViewController {
    func convertJSONToDictionary(text: String) -> [String: Any]? {
        if let data = text.data(using: .utf8) {
            do {
                return try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any]
            } catch {
                print(error.localizedDescription)
            }
        }
        return nil
    }
    
    func convertDictionaryToJSON(dictionary:NSDictionary) -> NSString {
        if (!JSONSerialization.isValidJSONObject(dictionary)) {
            print("无法解析出JSONString")
            return ""
        }
        let data : NSData! = try? JSONSerialization.data(withJSONObject: dictionary, options: []) as NSData!
        let JSONString = NSString(data:data as Data,encoding: String.Encoding.utf8.rawValue)
        return JSONString!
    }
}
