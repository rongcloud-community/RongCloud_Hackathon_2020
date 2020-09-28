//
//  PlayReadVC.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2020/9/22.
//  Copyright © 2020 XianHong zhang. All rights reserved.
//

import UIKit

class PlayReadVC: BaseViewController {

    
    @IBOutlet weak var titleTextF: UITextField!
    
    @IBOutlet weak var imgV: ZYEditImageView!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = "直播内容"
        self.navigationItem.rightBarButtonItem = UIBarButtonItem.init(title: "下一步", style: .done, target: self, action: #selector(lastStep(item:)))
        
    }

    @objc func lastStep(item:UIBarButtonItem){
        if titleTextF.text == nil || imgV.image == nil {
            self.showAlerController(title: "内容不完整", message: "请设置标题和封面")
            return
        }
        var parma = ["title":titleTextF.text!];
        CoreWork.upImage(type: "", img: imgV.image!) { (obj) in
            if obj is Dictionary<String,Any>{
                let imgUrl = obj["imgUrl"] as? String
                let imgId = obj["fileId"] as? String
                if imgUrl != nil {
                    parma["imgurl"] = imgUrl!
                }else {
                    parma["imgurl"] = ""
                }
                if imgId != nil {
                    parma["imgid"] = imgId!
                }else{
                    parma["imgid"] = ""
                }
                rtcWindowManager.dic = parma
                rtcWindowManager.showPlayRtcVC()
            }
        }
    }
    
}
