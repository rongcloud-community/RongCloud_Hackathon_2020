import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AcccountManagementService } from '../account-management.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.styl']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    userId: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(64), Validators.pattern('[A-Za-z0-9\+\=\-\_]*')]),
    nickname: new FormControl('', [Validators.required, Validators.maxLength(128)]),
    portraitUri: new FormControl('', Validators.maxLength(1024)),
    passwords: this.fb.group({
      password: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(30), Validators.pattern('[A-Za-z0-9\+\=\-\_]*')]),
      password2: new FormControl('', Validators.required)
    }, {validators: this.checkPasswords})
  })

  constructor(private fb: FormBuilder, private http: HttpClient, private accountSer: AcccountManagementService) { }

  checkPasswords(group: FormGroup) {
    let password = group.get('password').value, password2 = group.get('password2').value
    return password == password2 ? null : {notSame: true}
  }

  ngOnInit() {
  }

  onSubmit() {
    console.warn(this.registerForm.value)
    this.accountSer.register({userId: this.registerForm.value.userId, Nickname: this.registerForm.value.nickname, Password: this.registerForm.value.passwords.password, PortraitUri: this.registerForm.value.portraitUri}).subscribe(res => console.log(res))
  }

}
