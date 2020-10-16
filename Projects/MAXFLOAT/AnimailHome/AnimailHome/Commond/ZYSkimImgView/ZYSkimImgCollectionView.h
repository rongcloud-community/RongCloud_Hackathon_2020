//
//  ZYSkimImgCollectionView.h
//  仿QQ图片浏览
//
//  Created by ybon on 2017/1/4.
//  Copyright © 2017年 ybon. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ZYSkimImgCollectionView : UICollectionView<UICollectionViewDelegate,UICollectionViewDataSource,UICollectionViewDelegateFlowLayout>

@property (nonatomic, strong) NSArray<NSString *> *imageArray;


@end
