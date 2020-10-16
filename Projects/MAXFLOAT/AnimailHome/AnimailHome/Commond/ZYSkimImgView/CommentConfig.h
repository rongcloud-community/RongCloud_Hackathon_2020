//
//  CommentConfig.h
//  ZYCommunity
//
//  Created by ybon on 2017/1/10.
//  Copyright © 2017年 ybon. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
@interface CommentConfig : NSObject


/**计算文字内容的高度*/
+ (CGSize)sizeWithFont:(UIFont *)font maxSize:(CGSize)maxSize str:(NSString *)str;
/**计算图片的高度*/
+ (CGSize)imageSizeWithImgCount:(NSInteger)count imgItemSize:(CGSize)size;
/**计算点赞人的高度*/
+ (CGSize)zansizeWithFont:(UIFont *)font maxSize:(CGSize)maxSize str:(NSString *)str;
#pragma mark 图片压缩
+ (UIImage *)imageCompressForWidth:(UIImage *)sourceImage targetWidth:(CGFloat)defineWidth;

@end
