import { Component, SimpleChanges } from '@angular/core';
import { AcccountManagementService } from './account-management.service';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { Store } from '@ngrx/store'
import { Observable, from } from 'rxjs'
import { userInfo } from './data'
import { Title } from '@angular/platform-browser'
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  title = '融云单聊';
  finalUserInfo: userInfo = {
    userID: '',
    nickname: '',
    portraitUri: '',
    token: ''
  }
  userAuth: boolean
  userAuth$: Observable<boolean> = this.store.select(state => state['userAuth'])
  finalUserInfo$: Observable<userInfo> = this.store.select(state => state['userInfo'])
  from: string = this.route.url['_value'].map(seg => seg.toString()).join('/')
  userRongAuth: boolean
  userRongAuth$: Observable<boolean> = this.store.select(state => state['userRongAuth'])

  constructor(private accSer: AcccountManagementService, private router: Router, private route: ActivatedRoute, private store: Store, private titleSer: Title) { 
    router.events.subscribe(event => {
      if (event['routerEvent'] && !(event['routerEvent']['url'].search('/register')+1)) {
        this.userAuthDo()
      }
    })
  }

  setTitle(subtitle: string) {
    this.titleSer.setTitle(`${subtitle} - ${this.title}`)
  }

  hasErr(form: FormGroup, thing: string) {
    if (form.controls[thing].errors) {
      const err = form.controls[thing].errors
      if (err.maxlength || err.minlength) {
        return err.maxlength ? `最多${err.maxlength.requiredLength}个字符` : `最少${err.minlength.requiredLength}个字符`
      } else if (err.notSame) {
        return '两次输入的密码不一样'
      } else {
        return '需要填写此项'
      }
    }
    return null
  }

  userAuthDo() {
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
            }
          } else {
            this.router.navigateByUrl('/login')
          }
        })
      }
    })
  }

  ngOnChanges(change: SimpleChanges) {
    console.log(change)
  }


  ngOnInit() {
  }
}
