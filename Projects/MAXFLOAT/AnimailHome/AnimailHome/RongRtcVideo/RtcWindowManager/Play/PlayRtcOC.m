//
//  PlayRtcOC.m
//  AnimailHome
//
//  Created by XianHong zhang on 2020/9/22.
//  Copyright © 2020 XianHong zhang. All rights reserved.
//

#import "PlayRtcOC.h"

@implementation PlayRtcOC

- (void)joinLiveRoom:(NSString *)roomNum block:(void(^)(RCRTCLocalVideoView *videoView,RCRTCRoom *room,NSString *url))block {
    RCRTCRoomConfig *config = [[RCRTCRoomConfig alloc] init];
    config.roomType = RCRTCRoomTypeLive; //房间类型
    config.liveType = RCRTCLiveTypeAudioVideo; //直播类型
    [[RCRTCEngine sharedInstance] joinRoom:roomNum config:config completion:^(RCRTCRoom * _Nullable room, RCRTCCode code) {
        self.room = room;
       
        // 创建并设置本地视频预览视图
        RCRTCLocalVideoView *localVideoView = [[RCRTCLocalVideoView alloc] initWithFrame:CGRectMake(0,0,[UIScreen mainScreen].bounds.size.width,[UIScreen mainScreen].bounds.size.height)];
//        [self.view addSubview:localVideoView];
        localVideoView.fillMode = RCRTCVideoFillModeAspectFill;
//        RCRTCVideoFillModeAspect
        
        
        [[RCRTCEngine sharedInstance].defaultVideoStream setVideoView:localVideoView];
        
        // 开始采集音视频
        [RCRTCEngine sharedInstance].defaultAudioStream.recordingVolume = 100;
        [[RCRTCEngine sharedInstance].defaultAudioStream setMicrophoneDisable:NO];
        [[RCRTCEngine sharedInstance].defaultVideoStream startCapture];
        
        // 发布本地音视频流资源
        [self publishLocalLiveAVStreamblock:^(NSString *url) {
            block(localVideoView,room,url);
        }];
        
        // 加入房间时已经有远端用户在房间中, 收集需要订阅的流
        if ([self.room.remoteUsers count] > 0) {
            NSMutableArray *streamArray = [NSMutableArray array];
            for (RCRTCRemoteUser *user in self.room.remoteUsers) {
                [streamArray addObjectsFromArray:user.remoteStreams];
            }
            
            // 订阅远端音视频流
            [self.room.localUser subscribeStream:streamArray tinyStreams:nil completion:^(BOOL isSuccess, RCRTCCode desc) {}];
        }
        
    }];
    
}
- (void)publishLocalLiveAVStreamblock:(void(^)(NSString *url))block{
    [self.room.localUser publishDefaultLiveStream:^(BOOL isSuccess, RCRTCCode desc, RCRTCLiveInfo * _Nullable liveInfo) {
        // liveInfo.liveUrl 需要保存到 demo server, 观众用户加入后从 demo server 取得
        if (isSuccess && liveInfo.liveUrl){
            block(liveInfo.liveUrl);
        }else{
            block(@"");
        }
    }];
}
- (void)leaveRoomRoomID:(NSString *)roomid block:(void(^)(BOOL isSuccess))block{
    [[RCRTCEngine sharedInstance] leaveRoom:roomid completion:^(BOOL isSuccess, RCRTCCode code) {
       
        block(isSuccess);
    }];
    
}

//判断是否有刘海
+ (BOOL)isSafaBottom{
    if (@available(iOS 11.0, *)) {
        if ([[UIApplication sharedApplication] delegate].window.safeAreaInsets.bottom > 0.0) {
            
            return YES;
        }
    }
    return NO;
}
- (void)joinlive{
    [[RCRTCEngine sharedInstance] subscribeLiveStream:@"" streamType:RCRTCAVStreamTypeAudioVideo completion:^(RCRTCCode desc, RCRTCInputStream * _Nullable inputStream) {
        
    }];
    
}
//设置消息静默
+ (void)setNoVoice:(NSString *)userid{
//    [[RCIMClient sharedRCIMClient] setConversationNotificationStatus:ConversationType_CHATROOM targetId:userid isBlocked:YES success:^(RCConversationNotificationStatus nStatus) {
//
//
//    } error:^(RCErrorCode status) {
//
//
//    }];
}

@end
