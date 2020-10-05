import { Injectable } from '@angular/core';
import RongIMLib from './RongIMLib-3.0.7-dev.es.js'
import { Store } from '@ngrx/store'
import { userInfo } from './data'

@Injectable({
  providedIn: 'root'
})
export class RongCloudService {
  conversationList = []

  rongInit(finalUserInfo: userInfo) {
    const rongConfig = {
      appkey: '25wehl3u20uaw',
    }, im = RongIMLib.init(rongConfig)
    this.watch(im)
    return [im.connect(finalUserInfo), im]
    // .then(function(user) {
    //   console.log('链接成功, 链接用户 id 为: ', user.id)
    //   that.store.dispatch({ type: 'Logging into Rongcloud IM success' })
    //   window['rongIm'] = im
    // }).catch(function(error) {
    //   console.log('链接失败: ', error.code, error.msg);
    // })
  }

  watch(im: any) {
    var that = this
    im.watch({
      conversation: function(event){
        var updatedConversationList = event.updatedConversationList; // 更新的会话列表
        console.log('更新会话汇总:', updatedConversationList);
        console.log('最新会话列表:', im.Conversation.merge({
          conversationList: that.conversationList,
          updatedConversationList
        }));
      },
      message: function(event){
        var message = event.message;
        console.log('收到新消息:', message);
      },
      status: function(event){
        var status = event.status;
        console.log('连接状态码:', status);
      },
      expansion: function(event) {
        var updatedExpansion = event.updatedExpansion;
        var deletedExpansion = event.deletedExpansion;
        console.log('消息扩展已更新', updatedExpansion);
        /*
          {
            expansion: { key: 'value' }, // 设置或更新的扩展值
            messageUId: 'URIT-URIT-ODMF-DURR' // 设置或更新扩展的消息 uid
          }
        */
        console.log('消息扩展被删除', deletedExpansion);
        /*
          {
            deletedKeys: ['key1', 'key2'], // 删除的扩展键值集合
            messageUId: 'URIT-URIT-ODMF-DURR' // 删除扩展的消息 uid
          }
        */
      },
      chatroom: function(event) {
        var updatedEntries = event.updatedEntries;
        console.log('聊天室 KV 存储监听更新:', updatedEntries);
        /* 
          [{
            "key": "name",
            "value": "我是小融融",
            "timestamp": 1597591258338, 
            "chatroomId": "z002", 
            "type": 1 // 1: 更新（ 含:修改和新增 ）、2: 删除
        }]
        */
      }
    })
  }

  constructor(private store: Store) { }
}
