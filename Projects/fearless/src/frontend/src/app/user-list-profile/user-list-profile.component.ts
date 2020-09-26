import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { AcccountManagementService } from '../account-management.service'
import { userInfo } from '../data';

@Component({
  selector: 'app-user-list-profile',
  templateUrl: './user-list-profile.component.html',
  styleUrls: ['./user-list-profile.component.styl']
})
export class UserListProfileComponent implements OnInit {
  curUserInfo: userInfo = {
    userID: this.route.params['_value'].userid
  }

  err: string = ''

  constructor(private route: ActivatedRoute, private accSer: AcccountManagementService) {
    
  }

  ngOnInit() {
    this.accSer.userinfoOther(this.curUserInfo).subscribe(res => {
      if (res.status == "success") {
        this.curUserInfo = res['userInfo']
      } else {
        this.err = res['statusText']
      }
    })
  }

}
