//
//  PlayRtcBaseVC+RtcDelegate.swift
//  AnimailHome
//
//  Created by XianHong zhang on 2020/9/20.
//  Copyright © 2020 XianHong zhang. All rights reserved.
//

extension PlayRtcBaseVC{
    
    //有用户加入的回调, 此时 user 不包含任何资源, 只是标记有人加入, 此时无法订阅这个人的流
    func didJoin(_ user: RCRTCRemoteUser) {
        
    }
    

     //有用户离开时的回调, 当有用户离开的时候, SDK 会取消订阅这个 user,  APP 无需再次调用取消订阅的接口
    func didLeave(_ user: RCRTCRemoteUser) {
        
    }
  
    
    // 有用户掉线时的回调, 当有用户掉线的时候, SDK 会取消订阅这个 user,  APP 无需再次调用取消订阅的接口
    func didOfflineUser(_ user: RCRTCRemoteUser) {
        
    }
  
    
    // 流连接成功
    func didConnect(to stream: RCRTCInputStream) {
        
    }
  
    
    // 数据流第一个关键帧到达
    func didReportFirstKeyframe(_ stream: RCRTCInputStream) {
        
    }
   
   //  当有远端用户发布资源时, 通过此方法回调通知上报该用户发布的流
    func didPublishStreams(_ streams: [RCRTCInputStream]) {
        
    }
   
    
     //当有远端用户取消发布资源时, 通过此方法回调, SDK 默认会取消订阅这些流, 其中流中有 userID（用户 ID）,  tag（标识符）,  type（流类型）,  state（是否禁用） 等关键信息, APP 可根据这些关键信息自定义化, 无需再次调用取消订阅接口
    func didUnpublishStreams(_ streams: [RCRTCInputStream]) {
        
    }
    
    
    // 接收到其他人发送到 room 里的消息
    func didReceive(_ message: RCMessage) {
        
    }
    
    /*!
     如果用户调用 RCRTCEngine 的 setReconnectEnable 关闭 SDK 断线重连, 1分钟没有链接上信令服务器, SDK 会关闭音视频连接, 释放资源,
     将用户踢出房间, 回调通知用户
     
     @param room 离开的房间
     @discussion
     如果用户调用 RCRTCEngine 的 setReconnectEnable 关闭 SDK 断线重连, 1分钟没有链接上信令服务器, SDK 会关闭音视频连接, 释放资源,
     将用户踢出房间, 回调通知用户
     
     @remarks 代理
     */
    func didKicked(byServer room: RCRTCRoom) {
        
    }
    
    
    
    // 音频状态改变
    func stream(_ stream: RCRTCInputStream, didAudioMute mute: Bool) {
        
    }
    
    
     //视频状态改变
    func stream(_ stream: RCRTCInputStream, didVideoEnable enable: Bool) {
        
    }
     
    ;

    
    // 从远端接受将要播放的音频 pcm 数据的回调
    func didReceiveAudioBuffer(_ inNumberFrames: UInt32, buffer ioData: UnsafeMutablePointer<AudioBufferList>, timestamp inTimeStamp: UnsafePointer<AudioTimeStamp>, format asbd: AudioStreamBasicDescription) {
        
    }
   

}
