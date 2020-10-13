import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userManagementForm, userInfo, userRelation, conversation } from './data'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcccountManagementService {
  // apiUrl = 'http://localhost:8081'
  login(option: userManagementForm): Observable<any> {
    return this.http.post('/api/login', option)
  }

  register(option: userManagementForm): Observable<any> {
    return this.http.post('/api/register', option)
  }

  userinfo(): Observable<any> {
    return this.http.get('/api/userinfo')
  }

  userinfoOther(option: userInfo): Observable<any> {
    return this.http.post('api/userinfoOther', option)
  }

  userinfoSelfChange(option: userInfo): Observable<any> {
    return this.http.post('/api/userinfo/changeSelf', option)
  }

  userinfoOtherChange(option: userInfo): Observable<any> {
    return this.http.post('/api/userinfo/changeOthers', option)
  }

  userList(): Observable<any> {
    return this.http.get('/api/userList')
  }

  userRelationChange(option: userRelation): Observable<any> {
    return this.http.post('/api/userRelationChange', option)
  }

  logOut(): Observable<any> {
    return this.http.get('/api/logout')
  }

  constructor(private http: HttpClient) { }
}
