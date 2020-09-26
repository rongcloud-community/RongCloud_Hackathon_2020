import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { SingleChatComponent } from './single-chat/single-chat.component';
import { EditMyInfoComponent } from './edit-my-info/edit-my-info.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserListProfileComponent } from './user-list-profile/user-list-profile.component';
import { EditOtherInfoComponent } from './edit-other-info/edit-other-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SingleChatComponent,
    EditMyInfoComponent,
    UserListComponent,
    UserListProfileComponent,
    EditOtherInfoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'userList/:userid', component: UserListProfileComponent},
      {path: 'userList', component: UserListComponent},
      {path: 'editOtherInfo', component: EditOtherInfoComponent},
      {path: 'editMyInfo', component: EditMyInfoComponent},
      {path: 'singleChat', component: SingleChatComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: '', component: HomeComponent}
    ]),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
