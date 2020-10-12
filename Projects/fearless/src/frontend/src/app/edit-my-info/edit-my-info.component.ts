import { Component, OnInit, ApplicationRef } from '@angular/core'
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
  infoForm = this.fb.group({
    nickname: new FormControl(this.appRef.components[0].instance.finalUserInfo.nickname, [Validators.required, Validators.maxLength(128)]),
    portraitUri: new FormControl(this.appRef.components[0].instance.finalUserInfo.portraitUri, Validators.maxLength(1024))
  })

  constructor(private accSer: AcccountManagementService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private store: Store, private appRef: ApplicationRef) {
  }

  ngOnInit() {
    this.appRef.components[0].instance.setTitle(`编辑个人资料`)
  }

  hasErr(thing: string) {
    return this.appRef.components[0].instance.hasErr(this.infoForm, thing)
  }

  finalUserInfo() {
    return this.appRef.components[0].instance.finalUserInfo
  }

  onSubmit() {
    var finalValue : userInfo = {userID: this.appRef.components[0].instance.finalUserInfo.userID}
    if (this.infoForm.value['nickname']) {
      finalValue['nickname'] = this.infoForm.value['nickname']
    }
    if (this.infoForm.value['portraitUri']) {
      finalValue['portraitUri'] = this.infoForm.value['portraitUri']
    }
    this.accSer.userinfoSelfChange(finalValue).subscribe(res => {
      if (res.status == "success") {
        this.store.dispatch({ type: 'Loading user info success', payloads: finalValue })
        this.router.navigateByUrl(this.route.params['value']['from'])
      }
    })
  }
}
