import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Login } from '../class/login';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  baseUrl = "http://localhost:8085";

  constructor(private http: HttpClient) { }

   //current user

   public getCurrentUser(): Observable<object> {
    return this.http.get(this.baseUrl + '/current-user');
  }

  public isLoggedIn() {
    let tokenStr = sessionStorage.getItem('token')

    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    }

    else {
      return true;
    }
  }

  public setUser(user: string) {
    localStorage.setItem('user', JSON.stringify(user));

  }


  //generate token
  generateToken(loginData: Login): Observable<Object> {
        // console.log(loginData)
        // console.log(this.baseUrl + '/generate-token')
    return this.http.post(this.baseUrl + '/generate-token', loginData);
  }

  // logout:remove taken from storage

  public logout() {
    sessionStorage.removeItem('token');
    return true;
  }

  public getUser() {
    let userStr = localStorage.getItem('user');
    // console.log(userStr)
    if (userStr != null) {
      return JSON.parse(userStr);
    }

    else {
      this.logout();
      return null;

    }
  }

  public getUserRole() {
    let user = this.getUser();
   return user.authorities[0].authority;
  }

}
