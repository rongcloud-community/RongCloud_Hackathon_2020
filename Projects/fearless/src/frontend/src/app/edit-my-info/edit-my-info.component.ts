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
    nickname: new FormControl(this.finalUserInfo.nickname, [Validators.required, Validators.maxLength(128)]),
    portraitUri: new FormControl(this.finalUserInfo.portraitUri, Validators.maxLength(1024))
  })

  constructor(private accSer: AcccountManagementService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.route.params['value'])
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
    this.accSer.userinfoSelfChange({userID: this.finalUserInfo.userID, nickname: this.infoForm.value['nickname'], portraitUri: this.infoForm.value['portraitUri']}).subscribe(res => console.log(res))
  }
}
