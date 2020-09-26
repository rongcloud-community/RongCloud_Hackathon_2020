import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, Validator, FormControl, Validators } from '@angular/forms'
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

  infoForm = this.fb.group({
    nickname: new FormControl('', [Validators.required, Validators.maxLength(128)]),
    portraitUri: new FormControl('', Validators.maxLength(1024))
  })

  constructor(private accSer: AcccountManagementService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit() {
    this.accSer.userinfo().subscribe(res => {
      if (res.status == "success") {
        this.finalUserInfo = res.userInfo
      } else {
        this.router.navigateByUrl('/login')
      }
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
        this.router.navigateByUrl(this.route.params['value']['from'])
      }
    })
  }
}
