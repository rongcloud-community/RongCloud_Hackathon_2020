import { Component, OnInit } from '@angular/core';
import { AcccountManagementService } from '../account-management.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  from: string = this.route.url['_value'].map(seg => seg.toString()).join('/')

  constructor(private accSer: AcccountManagementService, private router: Router, private route: ActivatedRoute) { 
  }

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
