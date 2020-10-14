import { Component, OnInit, ApplicationRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, Validators, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Observable, from } from 'rxjs'
import { RongCloudService } from '../rong-cloud.service'
import { ErrorStateMatcher } from '@angular/material/core'
import { AcccountManagementService } from '../account-management.service'
import { userInfo, conversation, message } from '../data'
import RongIMLib from '../RongIMLib-3.0.7-dev.es.js'

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return (control && control.invalid);
  }
}

declare global {
  interface Window { rongIm: any; }
}

@Component({
  selector: 'app-single-chat',
  templateUrl: './single-chat.component.html',
  styleUrls: ['./single-chat.component.styl']
})
export class SingleChatComponent implements OnInit {
  finalSelfInfo: userInfo = {
    userID: '',
    nickname: '',
    portraitUri: '',
    token: ''
  }
  editToggle: any
  unreadFirst: any
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
    pic: this.fb.control(''),
    message: this.fb.control('', [Validators.required])
  })
  matcher = new MyErrorStateMatcher()

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
            if (document.getElementById('unReadSep')) {
              document.querySelector('.conversationList').scrollTop = document.getElementById('unReadSep').scrollHeight
            } else {
              document.querySelector('.conversationList').scrollTop = document.querySelector('.conversationList').scrollHeight
            }
          }, 100)
        })
        
      })
    }
  }

  getTargetInfo = (userId: string) => this.rongSer.finalTargetInfos[userId]

  avatarUriVar = (uri: string) => uri.startsWith('http://') || uri.startsWith('https://') ? uri : '/assets/IM-icon.png'

  getAvatarUri = (userId: string) => userId == this.finalSelfInfo.userID ? this.avatarUriVar(this.finalSelfInfo.portraitUri) : this.avatarUriVar(this.getTargetInfo(userId).portraitUri)

  selfInfo = () => this.finalSelfInfo

  ngOnInit() {
    this.appRef.components[0].instance.setTitle('聊天')
    if (this.route.params['_value']['chat']) {
      this.currentCon['targetId'] = this.route.params['_value']['chat']
    }
    this.finalUserInfo().then(info => {
      this.finalSelfInfo = info
      this.userRongAuth$.subscribe(res => {
        if (!res) {
          var things = this.rongSer.rongInit(info), that = this
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
          this.getCurMessages()
        }
      })
    })
  }
  onSub() { 
    if (this.editToggle) {
      this.editMessage({...this.editToggle, Content: {Content: this.messageForm.value['message']}})
    } else {
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

              that.messageForm.reset({message: ''})
              that.messageForm.markAsPristine()
              that.messageForm.markAsUntouched()
            }
          })
        }, err => {
          onerr(err)
        })
      }
      function connect(callback) {
        var things = that.rongSer.rongInit(that.finalSelfInfo)
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
  }

  uploadPic = (e) => {
    console.log(e)
  }

  unreadLineStatus = (mes) => {
    if (mes.TargetID != this.finalSelfInfo.userID) {
      return false
    } else if (mes.IsCounted) {
      if (this.unreadFirst) {
        return this.unreadFirst.MessageUID == mes.MessageUID ? true : false
      } else {
        this.unreadFirst = mes
        return true
      }
    }
    return false
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

  finalUserInfo = () => this.appRef.components[0].instance.getUserInfo()

  countForBadge = num => num >= 1000000 ? `${num/1000000}m` : num >= 1000 ? `${num/1000}k` : num

  changeCurCon(i: number) {
    this.currentCon = this.rongSer.conversationList[i]
    this.rongSer.read(this.currentCon)
    this.getCurMessages()
  }

  keyDownForm(e: Event) {
    if (e['keyCode'] == 13 && e['ctrlKey']) {
      this.onSub()
    }
  }

  ableToRecallEdit = (mes: any) => mes['SenderUserID'] == this.finalSelfInfo.userID && new Date().getTime() - mes['SentTime'] < 300000

  recallMessage(mes: message) {
    this.rongSer.recallMessage(mes).subscribe(res => {
      if (res['status'] == "success") {
        console.log("撤回成功")
        this.getCurMessages()
      }
    })
  }

  editTrigger(mes: any) {
    this.messageForm.setValue({message: mes.Content.Content})
    this.editToggle = mes
  }

  editMessage(mes: message) {
    this.rongSer.editMessage(mes).subscribe(res => {
      if (res['status'] == 'success') {
        console.log("编辑成功")
        this.editToggle = false
        this.messageForm.reset({message: ''})
        this.messageForm.markAsPristine()
        this.messageForm.markAsUntouched()
        if (mes.messageUId == this.currentCon.latestMessage.messageUId) {
          this.currentCon.latestMessage.content = mes.content
          this.rongSer.updateConversation([this.currentCon]).subscribe(res => {
            if (res['status'] == 'success') {
              this.getCurMessages()
            }
          })
        } else {
          this.getCurMessages()
        }
      }
    })
  }

}
