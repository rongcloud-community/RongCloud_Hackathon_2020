import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { AcccountManagementService } from '../account-management.service'
import { userInfo } from '../data'

@Component({
  selector: 'app-edit-other-info',
  templateUrl: './edit-other-info.component.html',
  styleUrls: ['./edit-other-info.component.styl']
})
export class EditOtherInfoComponent implements OnInit {
  from: string = this.route.url['_value'].map(seg => seg.toString()).join('/')
  
  finalUserInfo: userInfo = {
    userID: this.route.params['_value'].userid
  }

  infoForm = this.fb.group({
    nickname: new FormControl('', [Validators.required, Validators.maxLength(128)]),
    portraitUri: new FormControl('', Validators.maxLength(1024))
  })

  err: string = ''

  constructor(private route: ActivatedRoute, private accSer: AcccountManagementService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.accSer.userinfoOther(this.finalUserInfo).subscribe(res => {
      if (res.status == 'success') {
        this.finalUserInfo = res.userInfo
      } else {
        this.err = res.statusText
      }
    })
  }

  onSubmit() {
    var finalValue : userInfo = {userID: this.finalUserInfo.userID}
    if (this.infoForm.value['nickname']) {
      finalValue['nickname'] = this.infoForm.value['nickname']
    }
    if (this.infoForm.value['portraitUri']) {
      finalValue['portraitUri'] = this.infoForm.value['portraitUri']
    }
    this.accSer.userinfoOtherChange(finalValue).subscribe(res => {
      if (res.status == "success") {
        this.router.navigateByUrl(this.route.params['value']['from'])
      } else {
        this.err = res.statusText
      }
    })
  }

}
