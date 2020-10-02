import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
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
  
  from: string = this.route.url['_value'].map(seg => seg.toString()).join('/')

  constructor(private route: ActivatedRoute, private router: Router, private accSer: AcccountManagementService) {
    
  }

  changeRelation(status: number) {
    this.accSer.userRelationChange({objectID: this.curUserInfo.userID, relation: status}).subscribe(res => {
      if (res.status == "success") {
        this.curUserInfo.relation = status
      }
    })
  }

  ngOnInit() {
    this.accSer.userinfoOther(this.curUserInfo).subscribe(res => {
      if (res.status == "success") {
        this.curUserInfo = res['userInfo']
      } else {
        this.err = res['statusText']
        if (this.err.search('Session ID')+1) {
          this.router.navigate(['login'])
        }
      }
    })
  }

}
