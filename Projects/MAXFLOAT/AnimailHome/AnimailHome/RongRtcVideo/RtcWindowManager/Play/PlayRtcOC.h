//
//  PlayRtcOC.h
//  AnimailHome
//
//  Created by XianHong zhang on 2020/9/22.
//  Copyright © 2020 XianHong zhang. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <RongRTCLib/RongRTCLib.h>
NS_ASSUME_NONNULL_BEGIN

@interface PlayRtcOC : NSObject

@property (nonatomic, strong) RCRTCRoom *room;
- (void)joinLiveRoom:(NSString *)roomNum block:(void(^)(RCRTCLocalVideoView *videoView,RCRTCRoom *room,NSString *url))block;

- (void)leaveRoomRoomID:(NSString *)roomid block:(void(^)(BOOL isSuccess))block;
//判断是否有刘海
+ (BOOL)isSafaBottom;

//设置消息静默
+ (void)setNoVoice:(NSString *)userid;

@end

NS_ASSUME_NONNULL_END
