import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.url.includes(`${this.authService.baseUrl}/signin`)) {
      return next.handle(request);
    }
    if(request.url.includes(`${this.authService.baseUrl}/signup`)) {
      return next.handle(request);
    }
    if(request.url.includes(`${this.authService.baseUrl}/resetPassword`)) {
      return next.handle(request);
    }
    this.authService.loadToken();
    const token = this.authService.getToken();
    const authRequest = request.clone({setHeaders: { 'Authorization': `Bearer ${token}` }});
    return next.handle(authRequest);
  }
}
