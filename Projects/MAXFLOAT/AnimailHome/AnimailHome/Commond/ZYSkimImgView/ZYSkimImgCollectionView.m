//
//  ZYSkimImgCollectionView.m
//  仿QQ图片浏览
//
//  Created by ybon on 2017/1/4.
//  Copyright © 2017年 ybon. All rights reserved.
//

#import "ZYSkimImgCollectionView.h"
#import "ZYOrangeSkimViewController.h"
#import "UIView+UIViewController.h"
#import "UIImageView+WebCache.h"
@implementation ZYSkimImgCollectionView

- (id)initWithFrame:(CGRect)frame collectionViewLayout:(UICollectionViewLayout *)layout{
    if (self = [super initWithFrame:frame collectionViewLayout:layout]) {
        UICollectionViewFlowLayout *flayout = (UICollectionViewFlowLayout *)layout;
        flayout.scrollDirection = UICollectionViewScrollDirectionVertical;
        flayout.minimumLineSpacing = 10;
        flayout.minimumInteritemSpacing = 0;
        flayout.sectionInset = UIEdgeInsetsMake(10, 10, 0, 10);
        self.delegate = self;
        self.dataSource = self;
        [self registerClass:[UICollectionViewCell class] forCellWithReuseIdentifier:@"zyItem"];
        self.backgroundColor = [UIColor whiteColor];
    }
    return self;
}
- (void)setImageArray:(NSArray<NSString *> *)imageArray{
    _imageArray = imageArray;
    int i = 0;
    if (imageArray.count%3 != 0) {
        i = 1;
    }
    NSInteger heightCount = imageArray.count/3 + i;
    
    self.frame = CGRectMake(self.frame.origin.x, self.frame.origin.y, self.bounds.size.width, heightCount*(zyScreenW-30)/3+10*heightCount);
    
    [self reloadData];
}
#pragma mark datasource
- (CGSize)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout sizeForItemAtIndexPath:(NSIndexPath *)indexPath{
    return CGSizeMake((zyScreenW-30)/3, (zyScreenW-30)/3);
}
//设置单元格的个数，在collectionView称其为item

- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section{
    
    return _imageArray.count;
}

//创建item得内容

- (UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath{
    
    UICollectionViewCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:@"zyItem" forIndexPath:indexPath];
    
    cell.backgroundColor = [UIColor whiteColor];
    UIImageView *imgV = [cell viewWithTag:2017];
    if (imgV == nil) {
        imgV = [[UIImageView alloc] initWithFrame:cell.bounds];
        imgV.tag = 2017;
        [cell addSubview:imgV];
    }
    [imgV sd_setImageWithURL:[NSURL URLWithString:_imageArray[indexPath.row]]];
    return cell;
    
}
#define mark单元格得点击方法
- (void)collectionView:(UICollectionView *)collectionView didSelectItemAtIndexPath:(NSIndexPath *)indexPath{
    ZYOrangeSkimViewController *viewC = [[ZYOrangeSkimViewController alloc] init];
    viewC.hidesBottomBarWhenPushed = YES;
    [self.viewController.navigationController pushViewController:viewC animated:YES];
    
    if (self.viewController.navigationController == nil) {
        UINavigationController *nav = [[UINavigationController alloc] initWithRootViewController:viewC];
        nav.modalPresentationStyle = UIModalPresentationFullScreen;
        [self.viewController presentViewController:nav animated:YES completion:nil];
    }
    
    viewC.currentIndex = indexPath.row;
    viewC.imageArray = _imageArray;
}



@end
