import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable, from } from 'rxjs'
import RongIMLib from '../RongIMLib-3.0.7-dev.es.js'
import { AcccountManagementService } from '../account-management.service'
import { userInfo } from '../data'

declare global {
  interface Window { rongIm: any; }
}

@Component({
  selector: 'app-single-chat',
  templateUrl: './single-chat.component.html',
  styleUrls: ['./single-chat.component.styl']
})
export class SingleChatComponent implements OnInit {
  finalUserInfo: userInfo = {
    userID: '',
    nickname: '',
    portraitUri: '',
    token: ''
  }
  userAuth: boolean
  userAuth$: Observable<boolean> = this.store.select(state => state['userAuth'])
  userRongAuth: boolean
  userRongAuth$: Observable<boolean> = this.store.select(state => state['userRongAuth'])
  finalUserInfo$: Observable<userInfo> = this.store.select(state => state['userInfo'])
  userRongObj$: Observable<any> = this.store.select(state => state['userRongObj'])
  rongConfig = {
    appkey: 'sfci50a7sx2ri',
  }
  // im = RongIMLib.init(this.rongConfig)
  conversationList = []

  constructor(private router: Router, private accSer: AcccountManagementService, private store: Store) { }

  ngOnInit() {
    // this.userAuth$.subscribe(res => {
    //   if (!res) {
    //     this.store.dispatch({ type: 'Loading user info' })
    //   }
    //   this.finalUserInfo$.subscribe(res => {
    //     if (res && res.userID.length) {
    //       this.userAuth = true
    //       this.finalUserInfo = res
    //       console.log('用户校验成功')
    //       if (this.finalUserInfo.token.length){
    //         this.im.connect(this.finalUserInfo).then(function(user) {
    //           console.log('链接成功, 链接用户 id 为: ', user.id);
    //         }).catch(function(error) {
    //           console.log('链接失败: ', error.code, error.msg);
    //         });
    //         this.store.dispatch({ type: 'Logging out of Rongcloud IM'})
            
    //       }
    //     } else if (res) {
    //       this.router.navigateByUrl('/login')
    //     }
    //   })
    // })

    this.userAuth$.subscribe(res => {
      if (!res) {
        this.accSer.userinfo().subscribe(res => {
          if (res.status == 'success') {
            this.finalUserInfo = res['userInfo']
            this.store.dispatch({ type: 'Loading user info success', payloads: res['userInfo'] })
          } else {
            this.router.navigateByUrl('/login')
          }
        })
      } else {
        this.finalUserInfo$.subscribe(res => {
          if (res && res.userID.length) {
            this.userAuth = true
            if (res) {
              this.finalUserInfo = res
              console.log('用户校验成功')
              var that = this
              this.userRongAuth$.subscribe(res => {
                if (!res) {
                  const rongConfig = {
                    appkey: 'sfci50a7sx2ri',
                  }, im = RongIMLib.init(rongConfig)
                  im.connect(this.finalUserInfo).then(function(user) {
                    console.log('链接成功, 链接用户 id 为: ', user.id)
                    that.store.dispatch({ type: 'Logging into Rongcloud IM success' })
                    // have to use this since the object cannot be stored into ngrx
                    
                    window['rongIm'] = im
                  }).catch(function(error) {
                    console.log('链接失败: ', error.code, error.msg);
                  });
                } else if (window['rongIm']) {
                  window['rongIm'].disconnect().then(function() {
                    console.log('断开链接成功');
                  });
                }
              })
            }
          } else {
            this.router.navigateByUrl('/login')
          }
        })
      }
    })


    // this.im.watch({
    //   conversation: function(event){
    //     var updatedConversationList = event.updatedConversationList; // 更新的会话列表
    //     console.log('更新会话汇总:', updatedConversationList);
    //     console.log('最新会话列表:', this.im.Conversation.merge({
    //       conversationList: this.conversationList,
    //       updatedConversationList
    //     }));
    //   },
    //   message: function(event){
    //     var message = event.message;
    //     console.log('收到新消息:', message);
    //   },
    //   status: function(event){
    //     var status = event.status;
    //     console.log('连接状态码:', status);
    //   },
    //   expansion: function(event) {
    //     var updatedExpansion = event.updatedExpansion;
    //     var deletedExpansion = event.deletedExpansion;
    //     console.log('消息扩展已更新', updatedExpansion);
    //     /*
    //       {
    //         expansion: { key: 'value' }, // 设置或更新的扩展值
    //         messageUId: 'URIT-URIT-ODMF-DURR' // 设置或更新扩展的消息 uid
    //       }
    //     */
    //     console.log('消息扩展被删除', deletedExpansion);
    //     /*
    //       {
    //         deletedKeys: ['key1', 'key2'], // 删除的扩展键值集合
    //         messageUId: 'URIT-URIT-ODMF-DURR' // 删除扩展的消息 uid
    //       }
    //     */
    //   },
    //   chatroom: function(event) {
    //     var updatedEntries = event.updatedEntries;
    //     console.log('聊天室 KV 存储监听更新:', updatedEntries);
    //     /* 
    //       [{
    //         "key": "name",
    //         "value": "我是小融融",
    //         "timestamp": 1597591258338, 
    //         "chatroomId": "z002", 
    //         "type": 1 // 1: 更新（ 含:修改和新增 ）、2: 删除
    //     }]
    //     */
    //   }
    // })
  }

}
