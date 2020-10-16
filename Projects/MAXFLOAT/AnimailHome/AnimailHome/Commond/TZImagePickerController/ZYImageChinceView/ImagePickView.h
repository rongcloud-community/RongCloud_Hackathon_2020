//
//  ImagePickView.h
//  图片选择
//
//  Created by ybon on 2016/12/6.
//  Copyright © 2016年 ybon. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "TZImagePickerController.h"
#import "UIView+Layout.h"
#import "TZTestCell.h"
#import <AssetsLibrary/AssetsLibrary.h>
#import <Photos/Photos.h>
#import "LxGridViewFlowLayout.h"
#import "TZImageManager.h"
#import "TZVideoPlayerController.h"
@interface ImagePickView : UIView<TZImagePickerControllerDelegate,UICollectionViewDataSource,UICollectionViewDelegate,UIActionSheetDelegate,UIImagePickerControllerDelegate,UIAlertViewDelegate,UINavigationControllerDelegate>
{
    
    BOOL _isSelectOriginalPhoto;
    
    CGFloat _itemWH;
    CGFloat _margin;
}
@property (nonatomic, strong) UIImagePickerController *imagePickerVc;
@property (nonatomic, strong) UICollectionView *collectionView;

@property (nonatomic, strong) NSMutableArray *selectedPhotos,*selectedAssets;


- (id)initWithFrame:(CGRect)frame withMaxCount:(NSInteger)maxCount;


@end
