//
//  ZYEditImageView.m
//  照片编辑
//
//  Created by ybon on 2016/10/24.
//  Copyright © 2016年 ybon. All rights reserved.
//

#import "ZYEditImageView.h"

@implementation ZYEditImageView

- (void)awakeFromNib{
    [super awakeFromNib];
    self.userInteractionEnabled = YES;
    UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(imageTouchAction:)];
    tap.numberOfTapsRequired = 1;
    tap.numberOfTouchesRequired = 1;
    [self addGestureRecognizer:tap];
}
- (id)initWithFrame:(CGRect)frame{
    if (self = [super initWithFrame:frame]) {
        
        self.userInteractionEnabled = YES;
        UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(imageTouchAction:)];
        tap.numberOfTapsRequired = 1;
        tap.numberOfTouchesRequired = 1;
        [self addGestureRecognizer:tap];
    }
    
    return self;
}

#pragma mark --- 修改头像的相关方法
- (void)imageTouchAction:(UITapGestureRecognizer *)tap{
    
    UIAlertController *viewC = [UIAlertController alertControllerWithTitle:@"选择图片来源" message:nil preferredStyle:UIAlertControllerStyleActionSheet];
    UIAlertAction *carma = [UIAlertAction actionWithTitle:@"相机" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        [self photoPai];
    }];
    UIAlertAction *photoLibary = [UIAlertAction actionWithTitle:@"图库" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        [self photoShop];
        
    }];
    UIAlertAction *cancel = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:nil];
    [viewC addAction:carma];
    [viewC addAction:photoLibary];
    [viewC addAction:cancel];
    viewC.modalPresentationStyle = UIModalPresentationFullScreen;
    [self.viewController presentViewController:viewC animated:YES completion:nil];
    
}
//相册
- (void)photoShop{
    
    UIImagePickerController *pick = [[UIImagePickerController alloc]init];
    //设置相册的类型
    //所有同步到iPhone的图像以及包括⽤用户拍摄的图⽚片在内的任何相册
    pick.sourceType = UIImagePickerControllerSourceTypeSavedPhotosAlbum;
    //仅包含相册
    pick.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
    
    
    pick.delegate = self;
    pick.modalPresentationStyle = UIModalPresentationFullScreen;
    [self.viewController presentViewController:pick animated:YES completion:nil];
    
}
//拍照
- (void)photoPai{
    //判断后摄像头是否能用
    BOOL isAvailabe = [UIImagePickerController isCameraDeviceAvailable:UIImagePickerControllerCameraDeviceRear];
    UIImagePickerController *pick = [[UIImagePickerController alloc]init];
    
    //允许⽤用户使⽤用iPhone内置的摄像头的拍照
    if (isAvailabe) {
        pick.sourceType = UIImagePickerControllerSourceTypeCamera;
        pick.delegate = self;
        pick.modalPresentationStyle = UIModalPresentationFullScreen;
        [self.viewController presentViewController:pick animated:YES completion:nil];
    }
    
    
}
//代理方法,读取源数据
- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info{
    //    public.image代表图片，public.movie代表视频
    NSString *type = [info objectForKey:UIImagePickerControllerMediaType];
    if ([type isEqual:@"public.image"]) {
        
#pragma mark -- 将在相册中选择的相片保存在设置头像的地方
        UIImage *image1 = [info objectForKey:UIImagePickerControllerOriginalImage];
        PhotoTweaksViewController *photoTweaksViewController = [[PhotoTweaksViewController alloc] initWithImage:image1];
        //设置宽高比例为1:1
        photoTweaksViewController.wh = 1.0/1.0;
        photoTweaksViewController.delegate = self;
        photoTweaksViewController.autoSaveToLibray = YES;
        
//        assetURL = [info objectForKey:UIImagePickerControllerReferenceURL];
        [picker pushViewController:photoTweaksViewController animated:YES];
        
        __weak ZYEditImageView *weakSelf = self;
        [photoTweaksViewController setBlockImg:^(UIImage *img) {
            weakSelf.image = img;
            [picker dismissViewControllerAnimated:YES completion:nil];
        }];
        
    }
    
}

#pragma mark PhotoTweaksViewControllerDelegate
//确定的代理方法
- (void)photoTweaksController:(PhotoTweaksViewController *)controller didFinishWithCroppedImage:(UIImage *)croppedImage
{
    if (_sureAction) {
        _sureAction();
    }
    [controller.navigationController popViewControllerAnimated:YES];
}
//取消的代理方法
- (void)photoTweaksControllerDidCancel:(PhotoTweaksViewController *)controller
{
    [controller.navigationController popViewControllerAnimated:YES];
}
//回调方法
-(void)image:(UIImage *)image didFinishSavingWithError:(NSError *)error contextInfo:(void *)contextInfo{
    
    
}


@end
