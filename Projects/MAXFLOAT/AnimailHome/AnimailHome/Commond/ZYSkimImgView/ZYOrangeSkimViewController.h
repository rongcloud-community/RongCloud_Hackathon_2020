//
//  ZYOrangeSkimViewController.h
//  仿QQ图片浏览
//
//  Created by ybon on 2017/1/4.
//  Copyright © 2017年 ybon. All rights reserved.
//
#define zyScreen [UIScreen mainScreen].bounds
#define zyScreenH [UIScreen mainScreen].bounds.size.height
#define zyScreenW [UIScreen mainScreen].bounds.size.width
#import <UIKit/UIKit.h>

@interface ZYOrangeSkimViewController : UIViewController

@property (nonatomic, assign) NSInteger currentIndex;

@property (nonatomic, strong) NSArray<NSString *> *imageArray;

@end
