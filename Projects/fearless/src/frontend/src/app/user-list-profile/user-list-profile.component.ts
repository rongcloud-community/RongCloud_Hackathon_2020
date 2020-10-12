import { Component, OnInit, ApplicationRef } from '@angular/core';
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

  constructor(private route: ActivatedRoute, private router: Router, private accSer: AcccountManagementService, private appRef: ApplicationRef) {
    
  }

  changeRelation(status: number) {
    this.accSer.userRelationChange({objectID: this.curUserInfo.userID, relation: status}).subscribe(res => {
      if (res.status == "success") {
        this.curUserInfo.relation = status
      }
    })
  }

  finalUserInfo = () => this.appRef.components[0].instance.finalUserInfo

  ngOnInit() {
    this.accSer.userinfoOther(this.curUserInfo).subscribe(res => {
      if (res.status == "success") {
        this.curUserInfo = res['userInfo']
        this.appRef.components[0].instance.setTitle(`${res['userInfo'].nickname}的个人资料`)
      } else {
        this.err = res['statusText']
        if (this.err.search('Session ID')+1) {
          this.router.navigate(['login'])
        }
      }
    })
  }

}
