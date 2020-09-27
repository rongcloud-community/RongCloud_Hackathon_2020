import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, Validator, FormControl, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { userInfo } from '../data'
import { AcccountManagementService } from '../account-management.service'

@Component({
  selector: 'app-edit-my-info',
  templateUrl: './edit-my-info.component.html',
  styleUrls: ['./edit-my-info.component.styl']
})
export class EditMyInfoComponent implements OnInit {  
  finalUserInfo: userInfo = {
    userID: '',
    nickname: '',
    portraitUri: '',
    token: ''
  }
  userAuth: boolean
  userAuth$: Observable<boolean> = this.store.select(state => state['userAuth'])
  finalUserInfo$: Observable<userInfo> = this.store.select(state => state['userInfo'])

  infoForm = this.fb.group({
    nickname: new FormControl('', [Validators.required, Validators.maxLength(128)]),
    portraitUri: new FormControl('', Validators.maxLength(1024))
  })

  constructor(private accSer: AcccountManagementService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private store: Store) {}

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
        } else if (res) {
          this.router.navigateByUrl('/login')
        }
      })
    })
  }

  onSubmit() {
    // console.log(this.infoForm.value)
    var finalValue : userInfo = {userID: this.finalUserInfo.userID}
    if (this.infoForm.value['nickname']) {
      finalValue['nickname'] = this.infoForm.value['nickname']
    }
    if (this.infoForm.value['portraitUri']) {
      finalValue['portraitUri'] = this.infoForm.value['portraitUri']
    }
    this.accSer.userinfoSelfChange(finalValue).subscribe(res => {
      if (res.status == "success") {
        this.store.dispatch({ type: 'Loading user info' })
        this.router.navigateByUrl(this.route.params['value']['from'])
      }
    })
  }
}
