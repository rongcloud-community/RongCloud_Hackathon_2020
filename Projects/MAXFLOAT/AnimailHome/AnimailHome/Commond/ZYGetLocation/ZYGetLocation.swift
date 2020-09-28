//
//  ZYGetLocation.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/16.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit
import CoreLocation
let zyLocation = ZYGetLocation()
class ZYGetLocation: NSObject ,CLLocationManagerDelegate{
    
    /**
     闭包返回定位的坐标
     */
    
    var locationFaction:((_ loca : CLLocationCoordinate2D) -> Void)?;
    /**
     返回省，市，区
     进行地理反编码时，也会调用
     */
    var cpsNameFaction:((_ cityname:String,_ proname:String,_ subname:String,_ allname:String) -> Void)?;
    
    //懒加载 创建Location
    lazy var _location:CLLocation = {
        
        let location = CLLocation();
        
        return location;
        
    }();
    //懒加载 创建manager
    lazy var manager : CLLocationManager = {
        
        let lManager = CLLocationManager();
        lManager.delegate = self;
        return lManager;
        
    }();
    
    lazy var geocoder : CLGeocoder = {
        
        let geo = CLGeocoder();
        return geo;
        
    }();
    //获取定位
    func getCurrentLocation(){
        //是否打开手机定位
        let isOpen = CLLocationManager.locationServicesEnabled() as Bool;
        if isOpen == false {
            let alert = UIAlertView.init(title: "您未开启手机定位", message: "请打开手机定位", delegate: nil, cancelButtonTitle: "确定")
            alert.show()
            return;
        }
        //获取定位服务的授权状态
        let status = CLLocationManager.authorizationStatus();
        if status == CLAuthorizationStatus.denied{
            let alert = UIAlertView.init(title: "手机未对本应用位置授权", message: "请打开手机定位", delegate: nil, cancelButtonTitle: "确定")
            alert.show()
            
            return;
        }else if status == CLAuthorizationStatus.notDetermined{
            let str = UIDevice.current.systemVersion as String;
            if str.hashValue >= 8{
                
                self.manager.requestWhenInUseAuthorization();
            }
            
        }
        
        //设置定位精度
        self.manager.desiredAccuracy = kCLLocationAccuracyBest;
        self.manager.distanceFilter = 100.0;
        self.manager.startUpdatingLocation();
    }
    //地理位置更新后的代理
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        self.manager.stopUpdatingLocation();
        let location = locations.first! as CLLocation;
        //闭包返回地理坐标
        if locationFaction != nil {
            locationFaction!(location.coordinate);
        }
       
        getCityNameUseLatitudeAndLongitude(latitud: location.coordinate.latitude, longitud: location.coordinate.longitude);
        
    }
    /**
     地理反编码，返回城市名，省份名等
     */
    func getCityNameUseLatitudeAndLongitude(latitud:Double,longitud:Double){
        let location = CLLocation(latitude: latitud, longitude: longitud);
        self.geocoder.reverseGeocodeLocation(location) { (placemarks, error) -> Void in
            if error == nil{
                for  place : CLPlacemark in (placemarks)!{
                    
                    var cityStr : String;
                    var provStr : String;
                    var sublocalityStr : String;
                    //全称
                    
                    
                    let placeDic = place.addressDictionary! as NSDictionary;
                    cityStr = placeDic.object(forKey: "City") as! String;
                    provStr = placeDic.object(forKey: "State") as! String;
                    sublocalityStr = placeDic.object(forKey: "SubLocality") as! String;
                   let forMattedArr = placeDic.object(forKey: "FormattedAddressLines") as! Array<String>
                    if self.cpsNameFaction != nil{
                        self.cpsNameFaction! (cityStr ,provStr ,sublocalityStr,forMattedArr.first!);
                    }
                    
                }
                
            }
            
        }
        
    }
    
    /**
     地理编码根据城市名获取地理坐标
     */
    func getCLLocatinoCoorDinate(cityName:String,coor:(_ coor2D:CLLocationCoordinate2D) -> Void){
        
        self.geocoder.geocodeAddressString(cityName) { (place, error) -> Void in
            let pm = place?.first;
            if self.locationFaction != nil{
                
                self.locationFaction!((pm?.location?.coordinate)!);
            }
            
        }
        
    }
    
}
