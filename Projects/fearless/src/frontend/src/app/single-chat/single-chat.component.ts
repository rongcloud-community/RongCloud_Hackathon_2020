import { Component, OnInit, ApplicationRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Observable, from } from 'rxjs'
import { RongCloudService } from '../rong-cloud.service'
import { AcccountManagementService } from '../account-management.service'
import { userInfo, conversation } from '../data'
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
  userRongAuth: boolean
  userRongAuth$: Observable<boolean> = this.store.select(state => state['userRongAuth'])
  userRongObj$: Observable<any> = this.store.select(state => state['userRongObj'])
  rongConfig = {
    appkey: 'sfci50a7sx2ri',
  }
  conveInput: string
  // im = RongIMLib.init(this.rongConfig)
  conversationList = []
  currentCon: conversation = {
    targetId: ''
  }
  currentConMessages = []
  messageForm = this.fb.group({
    message: this.fb.control('', [Validators.required])
  })

  constructor(private route: ActivatedRoute, private router: Router, private accSer: AcccountManagementService, public rongSer: RongCloudService, private fb: FormBuilder, private store: Store, private appRef: ApplicationRef) { }

  getCurMessages() {
    var that = this
    if (this.currentCon['targetId'] && this.currentCon['targetId'].length) {
      this.rongSer.getConversationMessages({targetId: this.currentCon['targetId']}).subscribe(res => {
        new Promise(resolve => {
          that.currentConMessages = res['messages']
          resolve(that.currentConMessages.reverse())
        }).then(() => {
          setTimeout(() => {
            document.querySelector('.conversationList').scrollTop = document.querySelector('.conversationList').scrollHeight
          }, 100)
        })
        
      })
    }
  }

  getTargetInfo = (userId: string) => this.rongSer.finalTargetInfos[userId]

  avatarUriVar = (uri: string) => uri.startsWith('http://') || uri.startsWith('https://') ? uri : '/assets/IM-icon.png'

  getAvatarUri = (userId: string) => userId == this.selfInfo().userID ? this.avatarUriVar(this.selfInfo().portraitUri) : this.avatarUriVar(this.getTargetInfo(userId).portraitUri)

  selfInfo = () => this.appRef.components[0].instance.finalUserInfo

  ngOnInit() {
    this.appRef.components[0].instance.setTitle('聊天')
    if (this.route.params['_value']['chat']) {
      this.currentCon['targetId'] = this.route.params['_value']['chat']
    }
    this.userRongAuth$.subscribe(res => {
      if (!res) {
        var things = this.rongSer.rongInit(this.finalUserInfo()), that = this
        things[0].then(function(user) {
          console.log('链接成功, 链接用户 id 为: ', user.id)
          that.store.dispatch({ type: 'Logging into Rongcloud IM success' })
          window['rongIm'] = things[1]
          console.log('获取会话列表成功', that.rongSer.conversationList);
          that.getCurMessages()
        }).catch(function(error) {
          console.log('链接失败: ', error.code, error.msg);
          that.getCurMessages()
        })
      } else if (window['rongIm']) {
        console.log('获取会话列表成功', this.rongSer.conversationList);
        that.getCurMessages()
      }
    })
  }
  onSub() {
    var that = this
    function send(onerr) {
      var conversation = window['rongIm'].Conversation.get({
        targetId: that.currentCon['targetId'],
        type: RongIMLib.CONVERSATION_TYPE.PRIVATE
      });
      conversation.send({
        messageType: 's:person',
        content: {content: that.messageForm.value['message']}
      }).then(message => {
        that.rongSer.sendMessage(message).subscribe(res => {
          if (res['status'] == 'success') {
            console.log("信息发送成功，", message)
            that.getCurMessages()


            that.messageForm.markAsPristine()
            that.messageForm.markAsUntouched()
          }
        })
      }, err => {
        onerr(err)
      })
    }
    function connect(callback) {
      var things = that.rongSer.rongInit(that.finalUserInfo())
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
      connect(() => {
        send(err => console.error(err))
      })
    }
  }

  timeclock = date => {
    date = new Date(date)
    return `${date.getFullYear()}-${this.doubledigit(date.getMonth())}-${this.doubledigit(date.getDate())} ${this.doubledigit(date.getHours())}:${this.doubledigit(date.getMinutes())}`
  }

  singleListClock = date => {
    var today = new Date()
    date = new Date(date)
    return date.getFullYear() == today.getFullYear() && date.getMonth() == today.getMonth() && date.getDate() == today.getDate() ? `${this.doubledigit(date.getHours())}:${this.doubledigit(date.getMinutes())}` : `${date.getFullYear()}-${this.doubledigit(date.getMonth())}-${this.doubledigit(date.getDate())}`
  }

  doubledigit = num => num > 9 ? num : `0${num}`

  finalUserInfo = () => this.appRef.components[0].instance.finalUserInfo

  changeCurCon(i: number) {
    this.currentCon = this.rongSer.conversationList[i]
    this.getCurMessages()
  }

}
