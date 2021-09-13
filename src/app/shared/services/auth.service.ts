import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDto } from '../model/dto/login-dto';
import { SignupDto } from '../model/dto/signup-dto';
import { environment } from '../../../environments/environment';
import { User } from '../model/user';
import { JwtHelperService } from '@auth0/angular-jwt'
import { Role } from '../model/enum/role.enum';
import { Router } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = `${environment.apiUrl}/api/users`;
  private token: string;
  private loggedInUsername: string;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) { }

  login(login: LoginDto) : Observable<HttpResponse<User>>{
    return this.http.post<User>(`${this.baseUrl}/signin`, login, {observe: 'response'});
  }

  register(signup: SignupDto) : Observable<User | HttpErrorResponse> {
    return this.http.post<User | HttpErrorResponse>(`${this.baseUrl}/signup`, signup);
  }

  logout() : void {
    this.token=null;
    this.loggedInUsername=null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  saveToken(token: string) : void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  addUserToLocalCache(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserFromLocalCache() : User {
    return JSON.parse(localStorage.getItem('user'));
  }

  loadToken() : void {
    this.token = localStorage.getItem('token');
  }

  getToken() : string {
    return this.token;
  }

  isLoggedIn() : boolean {
    this.loadToken();
    if (this.token!==null  && this.token!=='' && this.token !== 'null') {
       if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
       } 
    } else {
      this.logout();
      return false;
    }
  }

  isAdmin() : boolean {
    return this.getUserFromLocalCache()?.role === Role.ADMIN;
  }

  isAdminOrModerator() : boolean {
    return this.isAdmin() || this.getUserFromLocalCache()?.role === Role.MODERATOR;
  }
}
