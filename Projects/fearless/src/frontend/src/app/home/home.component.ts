import { Component, OnInit, ApplicationRef } from '@angular/core';
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
  userRongAuth: boolean
  userRongAuth$: Observable<boolean> = this.store.select(state => state['userRongAuth'])

  constructor(private accSer: AcccountManagementService, private router: Router, private route: ActivatedRoute, private store: Store, private appRef: ApplicationRef) { 
  }

  ngOnInit() {
    this.appRef.components[0].instance.setTitle('首页')
  }

}
