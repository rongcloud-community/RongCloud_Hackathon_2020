import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Observable, from } from 'rxjs'
import { RongCloudService } from '../rong-cloud.service'
import { AcccountManagementService } from '../account-management.service'
import { userInfo } from '../data'
import RongIMLib from '../RongIMLib-3.0.7-dev.es.js'

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
  conveInput: string
  // im = RongIMLib.init(this.rongConfig)
  conversationList = []
  currentCon = {}
  messageForm = this.fb.group({
    message: this.fb.control('', [Validators.required])
  })

  constructor(private route: ActivatedRoute, private router: Router, private accSer: AcccountManagementService, private rongSer: RongCloudService, private fb: FormBuilder, private store: Store) { }

  ngOnInit() {
    console.log(this.route)
    if (this.route.params['_value']['chat']) {
      this.currentCon['userID'] = this.route.params['_value']['chat']
    }
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
              this.userRongAuth$.subscribe(res => {
                if (!res) {
                  var things = this.rongSer.rongInit(this.finalUserInfo), that = this
                  things[0].then(function(user) {
                    console.log('链接成功, 链接用户 id 为: ', user.id)
                    that.store.dispatch({ type: 'Logging into Rongcloud IM success' })
                    window['rongIm'] = things[1]
                    window['rongIm'].Conversation.getList({}).then(function(conversationList) {
                      console.log('获取会话列表成功', conversationList);
                    });
                  }).catch(function(error) {
                    console.log('链接失败: ', error.code, error.msg);
                  })
                } else if (window['rongIm']) {
                  window['rongIm'].Conversation.getList({}).then(function(conversationList) {
                    console.log('获取会话列表成功', conversationList);
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


    
  }
  onSub() {
    var that = this
    function send(onerr) {
      var conversation = window['rongIm'].Conversation.get({
        targetId: that.currentCon['userID'],
        type: RongIMLib.CONVERSATION_TYPE.PRIVATE
      });
      conversation.send({
        messageType: 's:person',
        content: {content: that.messageForm.value['message']}
      }).then(message => {
        that.rongSer.sendMessage(message).subscribe(res => {
          if (res['status'] == 'success') {
            console.log("信息发送成功，", message)
          }
        })
      }, err => {
        onerr(err)
      })
    }
    function connect(callback) {
      var things = that.rongSer.rongInit(that.finalUserInfo)
      things[0].then(function(user) {
        console.log('链接成功, 链接用户 id 为: ', user.id)
        that.store.dispatch({ type: 'Logging into Rongcloud IM success' })
        window['rongIm'] = things[1]
        callback()
      }).catch(function(error) {
        console.log('链接失败: ', error.code, error.msg);
      })
    }
    if (window['rongIm']) {
      send((err) => {
        console.error(err)
        connect(() => send(err => console.error(err)))
      })
    } else {
      connect(() => send(err => console.error(err)))
    }
    console.warn(this.messageForm.value)
  }

}
