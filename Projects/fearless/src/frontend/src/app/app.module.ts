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
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu'; 
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatDividerModule} from '@angular/material/divider'; 
import {MatListModule} from '@angular/material/list'
import {MatBadgeModule} from '@angular/material/badge'; 
import { MatDialogModule } from '@angular/material/dialog'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { UploadFileComponent } from './upload-file/upload-file.component';

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
    EditOtherInfoComponent,
    UploadFileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'userList/:userid', component: UserListProfileComponent},
      {path: 'userList', component: UserListComponent},
      {path: 'editInfo/:userid', component: EditOtherInfoComponent},
      {path: 'editInfo', component: EditMyInfoComponent},
      {path: 'singleChat', component: SingleChatComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: '', redirectTo: 'singleChat', pathMatch: 'full'}
    ]),
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([AppEffects]),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule,
    MatBadgeModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
