//
//  ZYOrangeSkimViewController.m
//  仿QQ图片浏览
//
//  Created by ybon on 2017/1/4.
//  Copyright © 2017年 ybon. All rights reserved.
//

#import "ZYOrangeSkimViewController.h"
#import "ZYSkimImgCollectionViewCell.h"

@interface ZYOrangeSkimViewController ()<UICollectionViewDelegate,UICollectionViewDataSource,UICollectionViewDelegateFlowLayout>
{
    UICollectionView *_collectionView;
}

@end

@implementation ZYOrangeSkimViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor whiteColor];
    self.automaticallyAdjustsScrollViewInsets = NO;
    UICollectionViewFlowLayout *flayout = [[UICollectionViewFlowLayout alloc] init];
    flayout.scrollDirection = UICollectionViewScrollDirectionHorizontal;
    flayout.minimumLineSpacing = 0;
    flayout.minimumInteritemSpacing = 0;
    flayout.sectionInset = UIEdgeInsetsMake(0, 0, 0, 0);
    _collectionView = [[UICollectionView alloc] initWithFrame:zyScreen collectionViewLayout:flayout];
    _collectionView.pagingEnabled = YES;
    _collectionView.delegate = self;
    _collectionView.dataSource = self;
    [_collectionView registerClass:[ZYSkimImgCollectionViewCell class] forCellWithReuseIdentifier:@"zItem"];
    _collectionView.backgroundColor = [UIColor blackColor];
    [self.view addSubview:_collectionView];
    _collectionView.contentOffset = CGPointMake(_collectionView.frame.size.width*_currentIndex, _collectionView.contentOffset.y);
}

#pragma mark datasource
- (CGSize)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout sizeForItemAtIndexPath:(NSIndexPath *)indexPath{
    
    return CGSizeMake(zyScreenW, zyScreenH);
}
//设置单元格的个数，在collectionView称其为item

- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section{
    
    return _imageArray.count;
}

//创建item得内容

- (UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath{
    
    ZYSkimImgCollectionViewCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:@"zItem" forIndexPath:indexPath];
    cell.imageUrl = _imageArray[indexPath.row];
   
    return cell;
    
}
#define mark单元格得点击方法
- (void)collectionView:(UICollectionView *)collectionView didSelectItemAtIndexPath:(NSIndexPath *)indexPath{

//    [self dismissViewControllerAnimated:YES completion:nil];
//    [self.navigationController popViewControllerAnimated:YES];
//    
}
//视图结束显示得时候
- (void)collectionView:(UICollectionView *)collectionView didEndDisplayingCell:(UICollectionViewCell *)cell forItemAtIndexPath:(NSIndexPath *)indexPath{
    ZYSkimImgCollectionViewCell *ce = (ZYSkimImgCollectionViewCell*)cell;
    [ce bringView];
    
}
@end
