//
//  CommentConfig.m
//  ZYCommunity
//
//  Created by ybon on 2017/1/10.
//  Copyright © 2017年 ybon. All rights reserved.
//

#import "CommentConfig.h"

@implementation CommentConfig

/**计算文字内容的高度*/
+ (CGSize)sizeWithFont:(UIFont *)font maxSize:(CGSize)maxSize str:(NSString *)str{
    
    NSDictionary *attrs = @{NSFontAttributeName : font};
    
    return [str boundingRectWithSize:maxSize options:NSStringDrawingUsesLineFragmentOrigin attributes:attrs context:nil].size;
}
/**计算图片的高度*/
+ (CGSize)imageSizeWithImgCount:(NSInteger)count imgItemSize:(CGSize)size{
    
    NSInteger a = count/3;
    int b = 0;
    if (count%3 != 0) {
        b = 1;
    }
    return CGSizeMake(size.width * 3, size.height * (a + b));
}
/**计算点赞人的高度*/
+ (CGSize)zansizeWithFont:(UIFont *)font maxSize:(CGSize)maxSize str:(NSString *)str{
    NSDictionary *attrs = @{NSFontAttributeName : font};
    
    return [str boundingRectWithSize:maxSize options:NSStringDrawingUsesLineFragmentOrigin attributes:attrs context:nil].size;
}
#pragma mark 图片压缩
+ (UIImage *)imageCompressForWidth:(UIImage *)sourceImage targetWidth:(CGFloat)defineWidth{
    UIImage *newImage = nil;
    CGSize imageSize = sourceImage.size;
    CGFloat width = imageSize.width;
    CGFloat height = imageSize.height;
    
    CGFloat targetWidth = defineWidth;
    CGFloat targetHeight = height / (width / targetWidth);
    CGSize size = CGSizeMake(targetWidth, targetHeight);
    CGFloat scaleFactor = 0.0;
    CGFloat scaledWidth = targetWidth;
    CGFloat scaledHeight = targetHeight;
    CGPoint thumbnailPoint = CGPointMake(0.0, 0.0);
    if(CGSizeEqualToSize(imageSize, size) == NO){
        CGFloat widthFactor = targetWidth / width;
        CGFloat heightFactor = targetHeight / height;
        if(widthFactor > heightFactor){
            scaleFactor = widthFactor;
        }
        else{
            scaleFactor = heightFactor;
        }
        scaledWidth = width * scaleFactor;
        scaledHeight = height * scaleFactor;
        if(widthFactor > heightFactor){
            thumbnailPoint.y = (targetHeight - scaledHeight) * 0.5;
        }else if(widthFactor < heightFactor){
            thumbnailPoint.x = (targetWidth - scaledWidth) * 0.5;
        }
    }
    UIGraphicsBeginImageContext(size);
    CGRect thumbnailRect = CGRectZero;
    thumbnailRect.origin = thumbnailPoint;
    thumbnailRect.size.width = scaledWidth;
    thumbnailRect.size.height = scaledHeight;
    
    [sourceImage drawInRect:thumbnailRect];
    
    newImage = UIGraphicsGetImageFromCurrentImageContext();
    if(newImage == nil){
        
    }
    
    UIGraphicsEndImageContext();
    return newImage;
}

@end
