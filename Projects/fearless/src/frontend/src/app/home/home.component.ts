import { Component, OnInit } from '@angular/core';
import { AcccountManagementService } from '../account-management.service';
import { Router } from '@angular/router';
import { userInfo } from '../data'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {
  finalUserInfo: userInfo;

  constructor(private accSer: AcccountManagementService, private router: Router) { 
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
