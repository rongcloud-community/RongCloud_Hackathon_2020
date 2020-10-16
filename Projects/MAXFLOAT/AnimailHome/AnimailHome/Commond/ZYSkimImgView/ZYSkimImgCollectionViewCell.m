//
//  ZYSkimImgCollectionViewCell.m
//  仿QQ图片浏览
//
//  Created by ybon on 2017/1/4.
//  Copyright © 2017年 ybon. All rights reserved.
//

#import "ZYSkimImgCollectionViewCell.h"
#import "UIView+UIViewController.h"
#import "UIImageView+WebCache.h"
@implementation ZYSkimImgCollectionViewCell

{
    UIScrollView *scro;
    UIImageView *imageView;
}
- (id)initWithFrame:(CGRect)frame{
    
    if (self = [super initWithFrame:frame]) {
        //创建scrollView
        [self scroView];
        //添加手势
        [self hand];
        
        [scro addObserver:self forKeyPath:@"contentSize" options:NSKeyValueObservingOptionNew context:nil];
    }

    return self;
}
- (void)dealloc{
    [scro removeObserver:self forKeyPath:@"contentSize"];
}
- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary<NSKeyValueChangeKey,id> *)change context:(void *)context{
//    CGSize size = [[change objectForKey:@"new"] CGSizeValue];
    if (!imageView.image) {
        return;
    }
    CGFloat imgVH = scro.contentSize.height;
    CGFloat imgVW = scro.contentSize.width;
    CGFloat imgH = imageView.image.size.height;
    CGFloat imgW = imageView.image.size.width;
    if (imgW/imgH > self.bounds.size.width/self.bounds.size.height) {
        if (imgVH < self.bounds.size.height) {
            scro.frame = CGRectMake(0, self.bounds.size.height/2.0-imgVH/2.0, self.bounds.size.width, imgVH);
        }else{
            scro.frame = self.bounds;
        }
        
    }else{
        if (imgVW < self.bounds.size.width) {
            
            scro.frame = CGRectMake(self.bounds.size.width/2.0-imgVW/2.0, 0, imgVW, self.bounds.size.height);
        }else{
            scro.frame = self.bounds;
        }
        
        
    }
    
    
}
- (void)setImageUrl:(NSString *)imageUrl{
    _imageUrl = imageUrl;
    //防止图片拉伸
    imageView.contentMode = UIViewContentModeScaleAspectFit;
    [imageView sd_setImageWithURL:[NSURL URLWithString:_imageUrl] placeholderImage:[UIImage imageNamed:@"宠物"]];
    [imageView sd_setImageWithURL:[NSURL URLWithString:_imageUrl] placeholderImage:[UIImage imageNamed:@"宠物"] options:SDWebImageRetryFailed progress:^(NSInteger receivedSize, NSInteger expectedSize) {
        
        //计算当前图片的下载进度
        
        NSLog(@"%.2f",1.0 *receivedSize / expectedSize);
        
    } completed:^(UIImage *image, NSError *error, SDImageCacheType cacheType, NSURL *imageURL) {
        if (!image) {
            return ;
        }
        //demo中是使用的本地图片
        imageView.image = image;
        CGFloat imgH = image.size.height;
        CGFloat imgW = image.size.width;
        if (imgW/imgH > self.bounds.size.width/self.bounds.size.height) {
            CGFloat imgVH = self.bounds.size.width*imgH/imgW;
            scro.frame = CGRectMake(0, self.bounds.size.height/2.0-imgVH/2.0, self.bounds.size.width, imgVH);
            imageView.frame = scro.bounds;
        }else{
            CGFloat imgVW = self.bounds.size.height * imgW/imgH;
            scro.frame = CGRectMake(self.bounds.size.width/2.0-imgVW/2.0, 0, imgVW, self.bounds.size.height);
            imageView.frame = scro.bounds;
        }
    }];

    
    
    
    
}
- (void)scroView{
    
    
    scro = [[UIScrollView alloc]initWithFrame:self.contentView.bounds];
    
    //创建图片视图
    imageView = [[UIImageView alloc] initWithFrame:scro.bounds];
    [scro addSubview:imageView];
    imageView.userInteractionEnabled = YES;

    //设置代理
    scro.delegate = self;
    //设置方法倍数
    scro.minimumZoomScale = 1.0;
    
    scro.maximumZoomScale = 4.0;
    
    [self addSubview:scro];
    
}
//代理方法，返回一个放大缩小得视图
- (UIView*)viewForZoomingInScrollView:(UIScrollView *)scrollView{
  
    return imageView;
    
}



//添加手势
- (void)hand{
    
    UITapGestureRecognizer *tapGes = [[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(tapAction:)];
    tapGes.numberOfTapsRequired = 1;//设置点击次数
    tapGes.numberOfTouchesRequired = 1;//设置触摸点
    [imageView addGestureRecognizer:tapGes];
    
    UITapGestureRecognizer *tapGes1 = [[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(tapAction:)];
    tapGes1.numberOfTapsRequired = 2;//设置点击次数
    tapGes1.numberOfTouchesRequired = 1;//设置触摸点
    [imageView addGestureRecognizer:tapGes1];
    
    //设置手势优先级
    [tapGes requireGestureRecognizerToFail:tapGes1];
    
}
- (void)tapAction:(UITapGestureRecognizer*)tap{
    switch (tap.numberOfTapsRequired) {
        case 1:
            
            //点击一次隐藏navBar
//                    [self heddenBar];
            [self.viewController.navigationController popViewControllerAnimated:YES];
            [self.viewController dismissViewControllerAnimated:YES completion:nil];
            break;
        case 2:
            
            if (scro.zoomScale == 1.0) {
                [scro setZoomScale:2.0 animated:YES];
            }else {
                [scro setZoomScale:1.0 animated:YES];
            }
            
            break;
        default:
            break;
    }
    
}

//隐藏navBar
- (void)heddenBar{
    //取到点击得视图
    UINavigationBar *bar = self.viewController.navigationController.navigationBar;
    //bar得似有属性
    BOOL ishidden = !bar.isHidden;
    //设置是否隐藏navigationBar
    [self.viewController.navigationController setNavigationBarHidden:ishidden animated:YES];
    
}

//scro恢复原样得方法
- (void)bringView{
    [scro setZoomScale:1.0 animated:YES];
}

@end
