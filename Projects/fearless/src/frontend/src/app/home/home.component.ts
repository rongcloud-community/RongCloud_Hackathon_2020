import { Component, OnInit } from '@angular/core';
import { AcccountManagementService } from '../account-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store'
import { Observable, from } from 'rxjs'
import { userInfo } from '../data'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {
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

  constructor(private accSer: AcccountManagementService, private router: Router, private route: ActivatedRoute, private store: Store) { 
  }

  ngOnInit() {
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

}
