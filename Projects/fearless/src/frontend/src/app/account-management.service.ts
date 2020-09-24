import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userManagementForm } from './data'
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

  constructor(private http: HttpClient) { }
}
