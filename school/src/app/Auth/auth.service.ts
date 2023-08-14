import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginserviceService } from '../Service/loginservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService  implements HttpInterceptor{

  constructor(private login: LoginserviceService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = sessionStorage.getItem('token');

    // console.log(token)

    if (token != null) {
    
      authReq = authReq.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
    // alert(authReq)

    return next.handle(authReq);
  }
}
