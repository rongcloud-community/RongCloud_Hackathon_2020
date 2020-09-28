//
//  Live_List.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2020/9/25.
//  Copyright © 2020 XianHong zhang. All rights reserved.
//

let liveList = [["title":"棒棒糖",
                "imgname":"live_bangbangtang",
                "txt":"送了一个棒棒糖",
                "sendtxt":"Zxh@Yxz=Zya5205211314_01"],
                ["title":"玫瑰",
                "imgname":"live_meigui",
                "txt":"送了一朵玫瑰",
                "sendtxt":"Zxh@Yxz=Zya5205211314_02"],
                ["title":"便便",
                "imgname":"live_dabian",
                "txt":"丢了一个便便",
                "sendtxt":"Zxh@Yxz=Zya5205211314_03"],
                ["title":"奶茶",
                "imgname":"live_naica",
                "txt":"送了一杯奶茶",
                "sendtxt":"Zxh@Yxz=Zya5205211314_04"],
                ["title":"狗",
                "imgname":"live_gou",
                "txt":"狗狗是最好的朋友",
                "sendtxt":"Zxh@Yxz=Zya5205211314_05"],
                ["title":"猫",
                "imgname":"live_mao",
                "txt":"猫是最好的主子",
                "sendtxt":"Zxh@Yxz=Zya5205211314_06"],
                ["title":"兔子",
                "imgname":"live_tuzi",
                "txt":"兔兔那么可爱",
                "sendtxt":"Zxh@Yxz=Zya5205211314_07"],
                ["title":"仓鼠",
                "imgname":"live_cangshu",
                "txt":"永动机就靠你了",
                "sendtxt":"Zxh@Yxz=Zya5205211314_08"]
]
///获取需要发送的数据
func getSendTxtMsg(_ dataDic:Dictionary<String,String>) -> (String,String){
    let sendTxt = (dataDic["sendtxt"])!
    let txt = (dataDic["txt"])!
    return (txt,sendTxt)
}
///接收到的数据，是否是礼物
func receviMsgIsLiveList(_ msgTxt:String) -> (Bool,String,String,Dictionary<String,String>,String){
    var isLiveList = false
    var txt = ""
    var title = ""
    var dataDic = ["":""];
    for dic in liveList {
        if msgTxt == dic["sendtxt"] {
            txt = dic["txt"]!
            title = dic["title"]!
            isLiveList = true
            dataDic = dic
        }
    }
    
    return (isLiveList,txt,title,dataDic,msgTxt)
}
///展示礼物
func showLiveListImage(_ dataDic:Dictionary<String,String>, _ showView:UIView){

    let imgv = UIImageView.init(frame: CGRect.init(x: 0, y: 0, width: 100, height: 100))
    imgv.center = showView.center
    imgv.contentMode = .scaleAspectFit
    imgv.image = UIImage.init(named: dataDic["imgname"]!)
    showView.addSubview(imgv)
    DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
        imgv.removeFromSuperview()
    }

}
