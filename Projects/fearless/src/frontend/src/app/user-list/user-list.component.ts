import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { userInfo, userInfoOnList } from '../data'
import { AcccountManagementService } from '../account-management.service'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.styl']
})
export class UserListComponent implements OnInit {
  finalUserInfo: userInfo = {
    userID: '',
    nickname: '',
    portraitUri: '',
    token: ''
  }
  userAuth: boolean
  userAuth$: Observable<boolean> = this.store.select(state => state['userAuth'])
  finalUserInfo$: Observable<userInfo> = this.store.select(state => state['userInfo'])

  userList: userInfoOnList[]

  constructor(private accSer: AcccountManagementService, private router: Router, private store: Store) { }

  ngOnInit() {
    this.userAuth$.subscribe(res => {
      if (!res) {
        this.store.dispatch({ type: 'Loading user info' })
      }
      this.finalUserInfo$.subscribe(res => {
        if (res && res.userID.length) {
          this.userAuth = true
          this.finalUserInfo = res
          console.log('用户校验成功')
          this.fetchUserList()
        } else if (res) {
          this.router.navigateByUrl('/login')
        }
      })
    })
    
  }

  fetchUserList() {
    this.accSer.userList().subscribe(res => {
      if (res.status == "success") {
        console.log(res)
        this.userList = res.data;
      }
    })
  }

}
