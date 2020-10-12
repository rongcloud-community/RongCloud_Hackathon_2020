import { Component, OnInit, ApplicationRef } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store'
import { AcccountManagementService } from '../account-management.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    userId: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(64), Validators.pattern('[A-Za-z0-9\+\=\-\_]*')]),
    // name: new FormControl('', [Validators.required, Validators.maxLength(128)]),
    // portraitUri: new FormControl('', Validators.maxLength(1024))
    password: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(30), Validators.pattern('[A-Za-z0-9\+\=\-\_]*')])
  })

  constructor(private fb: FormBuilder, private http: HttpClient, private accSer: AcccountManagementService, private router: Router, private store: Store, private appRef: ApplicationRef) { }

  ngOnInit() {
    this.appRef.components[0].instance.setTitle('登陆')
  }

  hasErr(thing: string) {
    return this.appRef.components[0].instance.hasErr(this.loginForm, thing)
  }

  onSubmit() {
    var that = this
    this.accSer.login(this.loginForm.value).subscribe(res => {
      if (res.status == "success") {
        that.router.navigateByUrl("")
      }
    })
  }

}
