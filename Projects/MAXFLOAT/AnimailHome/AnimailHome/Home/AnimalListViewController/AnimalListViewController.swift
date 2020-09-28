//
//  AnimalListViewController.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2018/4/27.
//  Copyright © 2018年 XianHong zhang. All rights reserved.
//

import UIKit

class AnimalListViewController: BaseViewController,UIPageViewControllerDelegate,UIPageViewControllerDataSource {
    
    
    
    var titleArray : Array<Any>?
    var titleView : ZYSengMentBtn?
    var selectedIndex : Int?
    var pageVC : UIPageViewController?
    var pageControllers:Array<AnimalListPageVC>?
    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = "宠物列表"
        titleView = ZYSengMentBtn.init(frame: CGRect.init(x: 0, y: getNavHeight(), width: kScreenWidth, height: 40.0))
        titleView?.selectedIndex = selectedIndex
        titleView?.setDataArr(arr: titleArray!)
        
        self.view.addSubview(titleView!)
        
        let options = [UIPageViewController.OptionsKey.spineLocation:UIPageViewController.SpineLocation.min];
        pageVC = UIPageViewController.init(transitionStyle: .scroll, navigationOrientation: .horizontal, options: options)
        pageVC?.delegate = self
        pageVC?.dataSource = self
        self.view.addSubview((pageVC?.view)!)
        self.addChild(pageVC!)
        
        pageVC?.view.snp_makeConstraints({ (make) in
            make.top.equalTo((titleView?.bottom)!)
            make.left.right.bottom.equalTo(0)
        })
        
        getPageControllers()
        
        titleView?.selectedAction = { [weak self] (type,index) in
            
            if self!.pageControllers!.count > index {
                self!.pageVC?.setViewControllers([self!.pageControllers![index]], direction: .forward, animated: false, completion: nil)
            }
        }
    }
    func getPageControllers(){
        if titleArray == nil || titleArray?.count == 0 {
            return;
        }
        pageControllers = Array.init()
        for  value in titleArray! {
            if value is Dictionary<String,Any> {
                let dic = value as! Dictionary<String,Any>
                let dtype = dic["type"];
                var type = "";
                if dtype is String{
                    type = dtype as! String
                }else if dtype is NSNumber{
                    let stype = dtype as!NSNumber
                    type = "\(stype)"
                }
                let vc = AnimalListPageVC.init()
                vc.type = type
                pageControllers?.append(vc)
            }
        }
        
        if pageControllers?.count != 0 {
            if selectedIndex ?? 0 < pageControllers!.count {
                pageVC?.setViewControllers([pageControllers![selectedIndex ?? 0]], direction: .forward, animated: false, completion: nil)
            }
        }
        
    }
    ///delegate datasource
    func pageViewController(_ pageViewController: UIPageViewController, viewControllerBefore viewController: UIViewController) -> UIViewController? {
        let selectedvc = viewController as! AnimalListPageVC
        var index:Int = self.pageControllers?.index(of: selectedvc) ?? 0
        
        if index == 0{
            return nil
        }
        index = index - 1
        
        let vc = pageControllers![index]
        
        return vc
    }

    func pageViewController(_ pageViewController: UIPageViewController, viewControllerAfter viewController: UIViewController) -> UIViewController? {
        let selectedvc = viewController as! AnimalListPageVC
        var index:Int = self.pageControllers?.index(of: selectedvc) ?? 0
        index = index + 1
        if index >= self.pageControllers!.count{
            return nil
        }
        
        
        let vc = pageControllers![index]
        
        return vc
    }
//切换vc
    func pageViewController(_ pageViewController: UIPageViewController, willTransitionTo pendingViewControllers: [UIViewController]) {
        
    }
    //drag时调用
    func pageViewController(_ pageViewController: UIPageViewController, didFinishAnimating finished: Bool, previousViewControllers: [UIViewController], transitionCompleted completed: Bool) {
        let vc = pageViewController.viewControllers?.first as! AnimalListPageVC
        let index = self.pageControllers?.index(of: vc) ?? 0
        titleView?.setSelectedIndex(index: index)
        
    }
    
   
}


/*
 {"fileids":"421634428862464","id":285913013026816,"imgurl":"/upload/2019/05/421634428862464.jpeg","type":"1","typedesc":"狗"}
 */
