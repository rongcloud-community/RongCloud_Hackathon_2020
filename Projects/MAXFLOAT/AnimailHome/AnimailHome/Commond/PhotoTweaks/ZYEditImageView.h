//
//  ZYEditImageView.h
//  照片编辑
//
//  Created by ybon on 2016/10/24.
//  Copyright © 2016年 ybon. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "UIView+UIViewController.h"
#import "PhotoTweaksViewController.h"
@interface ZYEditImageView : UIImageView<UINavigationControllerDelegate,UIImagePickerControllerDelegate,PhotoTweaksViewControllerDelegate>

@property (nonatomic, copy) void (^sureAction)();

#pragma mark --- 修改头像的相关方法
- (void)imageTouchAction:(UITapGestureRecognizer *)tap;

@end
