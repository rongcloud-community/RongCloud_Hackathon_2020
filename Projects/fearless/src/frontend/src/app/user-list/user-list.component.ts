import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { userInfo } from '../data'
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

  constructor(private accSer: AcccountManagementService, private router: Router) { }

  ngOnInit() {
    this.accSer.userinfo().subscribe(res => {
      if (res.status == "success") {
        this.finalUserInfo = res.userInfo
      } else {
        this.router.navigateByUrl('/login')
      }
    })
  }

}
