//
//  PubHelpView.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/22.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit



class PubHelpView: UIView {

   
    @IBOutlet weak var nameTextF: UITextField!
    
    @IBOutlet weak var priceTextF: UITextField!
    
    @IBOutlet weak var sdescTextF: UITextField!
    
    @IBOutlet weak var headerImgV: ZYEditImageView!
    
    
    @IBOutlet weak var contentTextV: UITextView!
    
    @IBOutlet weak var imgBgView: UIView!
    
    @IBOutlet weak var pubBtn: UIButton!
    
    var hud:MBProgressHUD?
    /*
     * 已发布的类型
     * 1 招领 2寻回 3领养
     */
    var pubType : Int?
    
    var headerImgUrl:String?
    var infoImgUrl:String?
    var headerImgId:String?
    var infoImgId:String?
    var imgChinceView : ZYImageChinceView?
    var infoImgArr:Array<UIImage>?
    override func awakeFromNib() {
        super.awakeFromNib()
        contentTextV.layer.cornerRadius = 6;
        contentTextV.layer.masksToBounds = true;
        pubBtn.layer.cornerRadius = 4;
        pubBtn.layer.masksToBounds = true;
        
        imgChinceView = ZYImageChinceView.init(frame: CGRect.init(x: 0, y: 0, width: kScreenWidth, height: kScreenWidth-10))
        imgChinceView?.collectionView.isScrollEnabled = false
        imgBgView.addSubview(imgChinceView!)
        
        
    }


    
    @IBAction func pubBtnAction(_ sender: UIButton) {
        if nameTextF.text?.count == 0 || priceTextF.text?.count == 0 || sdescTextF.text?.count == 0 || contentTextV.text.count == 0 || imgChinceView?.selectedPhotos.count == 0 || imgChinceView?.selectedPhotos.count == 0 || headerImgV.image == nil{
            self.zytviewController()?.showAlerController(title: "信息不完整", message: "请填写完整信息")
            return;
        }
        self.headerImgUrl = nil;
        self.infoImgUrl = nil;
        self.headerImgId = nil;
        self.infoImgId = nil;
        
        hud = MBProgressHUD.showAdded(to: self, animated: true)
        hud?.label.text = "正在发布"
        hud?.mode = .indeterminate;
        hud?.removeFromSuperViewOnHide = true
        
        self.uploadHeaderImage(img: headerImgV.image!)
        infoImgArr = imgChinceView!.selectedPhotos as? Array<UIImage>
        self.uploadInfoImage(img: (infoImgArr?.last)!)
    }
    
    func uploadHeaderImage(img:UIImage){
        CoreWork.upImage(type: "", img: img) { [weak self](obj) in
            if obj is Dictionary<String,Any>{
                let imgUrl = obj["imgUrl"] as? String
                if imgUrl != nil {
                    self?.headerImgUrl = imgUrl;
                    self?.headerImgId = obj["fileId"] as? String
                }
            }
            
        }
    }
    func uploadInfoImage(img:UIImage){
        CoreWork.upImage(type: "", img: img) { [weak self](obj) in
            if obj is Dictionary<String,Any>{
                let imgUrl = obj["imgUrl"] as? String
                if imgUrl != nil {
                    if self?.infoImgUrl != nil {
                        self?.infoImgUrl = (self?.infoImgUrl)! + "," + imgUrl!;
                        self?.infoImgId = (self?.infoImgId)! + "," + ((obj["fileId"] as? String)!)
                    }else{
                        self?.infoImgUrl = imgUrl!
                        self?.infoImgId = obj["fileId"] as? String
                    }
                    
                }
            }
            self?.infoImgArr?.removeLast()
            if (self?.infoImgArr!.count)! > 0{
                
                self?.uploadInfoImage(img: (self?.infoImgArr?.last)!)
            }else{
                //发布
                self?.pubInfo()
            }
        }
    }
    func pubInfo(){
        CoreWork.pubAnimalHelp(type: "\((pubType ?? 0) + 1)", name: nameTextF.text!, sdesc: sdescTextF.text!, info: contentTextV.text!, price: priceTextF.text!, imgurl: headerImgUrl ?? "", imgid: headerImgId ?? "", fileurl: infoImgUrl ?? "",fileid:infoImgId ?? "") { [weak self](obj) in
            self?.hud?.hide(animated: true)
            if obj is Dictionary<String,Any>{
                if Int(obj["code"] as! String) == 0{
                    
                    let alert = UIAlertController.init(title: "发布成功", message: "", preferredStyle: .alert)
                    let action = UIAlertAction.init(title: "确定", style: .default, handler: { (action) in
                        self?.zytviewController()?.navigationController?.popToRootViewController(animated: true)
                    })
                    alert.addAction(action)
                    self?.zytviewController()?.present(alert, animated: true, completion: nil)
                    
                }else {
                    self?.zytviewController()?.showAlerController(title: "发布失败", message: "")
                }
            }
            
        }
        
    }
}
