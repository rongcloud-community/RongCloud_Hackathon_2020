//
//  ZYSkimImgCollectionViewCell.h
//  仿QQ图片浏览
//
//  Created by ybon on 2017/1/4.
//  Copyright © 2017年 ybon. All rights reserved.
//


#import <UIKit/UIKit.h>

@interface ZYSkimImgCollectionViewCell : UICollectionViewCell<UIScrollViewDelegate>

@property (nonatomic, strong) NSString *imageUrl;

//scro恢复原样得方法
- (void)bringView;

@end
