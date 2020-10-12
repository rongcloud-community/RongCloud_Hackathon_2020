import { Component, OnInit, ApplicationRef } from '@angular/core';
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
  userList: userInfoOnList[]

  displayedColumns: string[] = ['userId', 'nickname', 'isAdmin', 'profileLink']

  constructor(private accSer: AcccountManagementService, private router: Router, private store: Store, private appRef: ApplicationRef) { }

  ngOnInit() {
    this.appRef.components[0].instance.setTitle('用户列表')
    this.fetchUserList()
  }

  finalUserInfo() {
    return this.appRef.components[0].instance.finalUserInfo
  }

  fetchUserList() {
    this.appRef.components[0].instance.setTitle(`用户列表`)
    this.accSer.userList().subscribe(res => {
      if (res.status == "success") {
        console.log(res)
        this.userList = res.data;
      }
    })
  }

}
