//
//  PlayRtcOC.m
//  AnimailHome
//
//  Created by XianHong zhang on 2020/9/22.
//  Copyright © 2020 XianHong zhang. All rights reserved.
//

#import "PlayRtcOC.h"
#import <UIKit/UIKit.h>
@implementation PlayRtcOC



//判断是否有刘海
+ (BOOL)isSafaBottom{
    if (@available(iOS 11.0, *)) {
        if ([[UIApplication sharedApplication] delegate].window.safeAreaInsets.bottom > 0.0) {
            
            return YES;
        }
    }
    return NO;
}


@end
