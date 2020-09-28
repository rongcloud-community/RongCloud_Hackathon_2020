//
//  RequestWork.swift
//  NSURLSession
//
//  Created by mac on 16/9/10.
//  Copyright © 2016年 ZY. All rights reserved.
//

import UIKit

class RequestWork: NSObject ,CAAnimationDelegate{

    /**
     GET
     */
    class func zyGETWithURLSession(_ urlString:String,parmas:NSDictionary,mathFunction:@escaping (_ responObject:AnyObject)->Void){
    
        let session = URLSession.shared;
        let str = self.parmasStringWithParmas(parmas);
//        NSString * urlStr = [string stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
//        let resultstr = str.addingPercentEscapes(using: String.Encoding.utf8);
        
        let url = URL.init(string: urlString+"?"+str);
     
        
        let task = session.dataTask(with: url!, completionHandler: { (data, respons, eror) -> Void in
            if data != nil{
                do {
                    try JSONSerialization.jsonObject(with: data!, options: JSONSerialization.ReadingOptions.allowFragments);
                    let responsobject = try?JSONSerialization.jsonObject(with: data!, options: JSONSerialization.ReadingOptions.allowFragments);
                    mathFunction(responsobject! as AnyObject);
                } catch {
                    mathFunction("file" as AnyObject);
                }

            }else{
                mathFunction("file" as AnyObject);
            }
            
            
        }) 
        task.resume();
        
    }
    /**
     POST
     */
    class func zyPOSTwithURLSession(_ urlString:String,parmas:NSDictionary,mathFunction:@escaping (_ responObject:AnyObject)->Void){
       
      
        
        let session = URLSession.shared;
        
        let str = self.parmasStringWithParmas(parmas);
        let url = URL(string: urlString);
        
        var request = URLRequest(url: url!);
        
        request.httpMethod = "POST";
        
        request.httpBody = str.data(using: String.Encoding(rawValue: String.Encoding.utf8.rawValue));
        
        
        let task = session.dataTask(with:request, completionHandler: { (data, respons, error) -> Void in
            
            if data != nil{
                do {
                    try JSONSerialization.jsonObject(with: data!, options: JSONSerialization.ReadingOptions.allowFragments);
                    let responsobject = try?JSONSerialization.jsonObject(with: data!, options: JSONSerialization.ReadingOptions.allowFragments);
                    mathFunction(responsobject! as AnyObject);
                } catch {
                  mathFunction("file" as AnyObject);
                }
                
            }else{
                mathFunction("file" as AnyObject);
            }
        }) 
        
        task.resume();
    }
    /**
     up data
     */
    class func zyUpwithURLSession(_ urlString:String,parmas:NSDictionary,mathFunction:@escaping (_ responObject:AnyObject)->Void){
        
        
        
        let session = URLSession.shared;
        
        let url = URL(string: urlString);
        
        var request = URLRequest(url: url!);
        
        request.httpMethod = "POST";
        
        let img = UIImage.init(named: "09.jpg");
        let data = img!.jpegData(compressionQuality: 0.5);
        let da = data?.base64EncodedData(options: .lineLength64Characters);
        
        
        try!da?.write(to: URL.init(fileURLWithPath: "/Users/ybon/Desktop/121.jpg"));
        let task = session.uploadTask(with: request, from: da) { (resultData, respons, error) in
            
            if resultData != nil{
                let responsobject = try?JSONSerialization.jsonObject(with: resultData!, options: JSONSerialization.ReadingOptions.allowFragments);
                
                mathFunction(responsobject! as AnyObject);
            }else{
                mathFunction("file" as AnyObject);
            }
        }
        task.resume();
    }
 
    
    //拼接GET参数
    class func parmasStringWithParmas(_ parmas:NSDictionary)->String{
        
        var parString = String();
        let arr = parmas.allKeys as NSArray;
        for i in 0 ..< arr.count{
            let key = arr[i] as! String;
            let value = parmas.object(forKey: arr[i]) as! NSString;
//            parString.appendFormat("%@=%@", key,value);
            parString = parString + key + "=" + (value as String);
            let lastKey = arr.lastObject as! String;
            if (key != lastKey) {
                
//                parString.appendFormat("&");
                parString = parString + "&";
            }

            
        }
        return parString;
    }
    
    //    AFN请求
    //    get请求
    class func AFNGETWithUrl(urlString:String,parmas:NSDictionary,successFunction:@escaping (_ responsObject:AnyObject) -> Void,fileFunction:@escaping (_ responsObject:AnyObject) -> Void){
        
        let manage = AFHTTPSessionManager();
        manage.responseSerializer = AFJSONResponseSerializer();
        manage.requestSerializer = AFJSONRequestSerializer();
        manage.requestSerializer.setValue(getTimeCookie(), forHTTPHeaderField: "AnimalSession")
        manage.get(urlString, parameters: parmas, progress: { (progress) in
            
        }, success: { (task, obj) in
            successFunction(obj as AnyObject);
        }) { (task, errorobj) in
            fileFunction(errorobj as AnyObject);
        }
        
    }
    
    //    post请求 formData格式 上传图片
    class func AFNPOSTWithUrl(urlString:String,img:UIImage,parmas:NSDictionary,successFunction:@escaping (_ responsObject:AnyObject) -> Void,fileFunction:@escaping (_ responsObject:AnyObject) -> Void){
        
        let manage = AFHTTPSessionManager();
        manage.responseSerializer = AFJSONResponseSerializer();
        manage.requestSerializer = AFJSONRequestSerializer();
        manage.requestSerializer.setValue(getTimeCookie(), forHTTPHeaderField: "AnimalSession")
        manage.post(urlString, parameters: parmas, constructingBodyWith: { (formData) in
            let data = img.jpegData(compressionQuality: 0.5)
            let formattor = DateFormatter.init()
            formattor.dateFormat = "yyyyMMddHHmmss";
            var fileName = formattor.string(from: Date.init())
            fileName = fileName + ".jpg"
            formData.appendPart(withFileData: data!, name: "img", fileName: fileName, mimeType: "image/jpeg")
            
        }, progress: { (progress) in
            
        }, success: { (task, obj) in
            successFunction(obj as AnyObject)
        }) { (task, error1) in
            fileFunction(error1 as AnyObject)
        }
        
    }
    
    
    //    post 普通请求格式
    class func AFNormalNPOSTWithUrl(urlString:String,parmas:NSDictionary,successFunction:@escaping (_ responsObject:AnyObject) -> Void,fileFunction:@escaping (_ responsObject:AnyObject) -> Void){
        
        let manage = AFHTTPSessionManager();
        manage.responseSerializer = AFJSONResponseSerializer();
        manage.requestSerializer = AFHTTPRequestSerializer();
        manage.requestSerializer.setValue(getTimeCookie(), forHTTPHeaderField: "AnimalSession")
        manage.post(urlString as String, parameters: parmas, progress: { (progess) in
            
        }, success: { (task, data1) in
            successFunction(data1 as AnyObject);
        }) { (task, data1) in
            fileFunction(data1 as AnyObject);
        }
        
    }

   class func getTimeCookie()->String{
        let timeLength = Date.init().timeIntervalSince1970
        let cookieTime = timeLength * 1994
        let str = String.init(format: "%.5lf", cookieTime)
        
        return str
    }
    
}
