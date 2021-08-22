import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpResponse } from '../model/custom-http-response';
import { ResetPasswordDto } from '../model/dto/reset-password-dto';
import { SignupDto } from '../model/dto/signup-dto';
import { User } from '../model/user';

export interface UsersListResponse {
  content: User[];
  totalElements: number;
  totalPages: number;
  pageable: {
    pageNumber: number;
    pageSize: number;
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.apiUrl}/api/users`;

  constructor(private http: HttpClient) { }

  getUsers(page: number, size: number) : Observable<UsersListResponse | HttpErrorResponse> {
    return this.getPaginatedResults(this.baseUrl, page, size);
  }

  addNewUser(user: SignupDto, isActive: string, isNonLocked: string, role: string) : Observable<User> {
    let activeParam = isActive===null ? 'true' : isActive;
    let nonLockedParam = isNonLocked===null ? 'true' : isNonLocked;
    let roleParam = role===null ? 'user' : role;
    let queryParams = new HttpParams()
                  .set('isActive', activeParam)
                  .set('isNonLocked', nonLockedParam)
                  .set('role', roleParam);
    return this.http.post<User>(this.baseUrl, user, {params: queryParams})
  }

  updateUser(user: SignupDto, isActive: string, isNonLocked: string, role: string, userId: string) : Observable<User> {
    let activeParam = isActive===null ? 'true' : isActive;
    let nonLockedParam = isNonLocked===null ? 'true' : isNonLocked;
    let roleParam = role===null ? 'user' : role;
    let queryParams = new HttpParams() 
                  .set('isActive', activeParam)
                  .set('isNonLocked', nonLockedParam)
                  .set('role', roleParam);
    return this.http.put<User>(`${this.baseUrl}/${userId}`, user, {params: queryParams})
  }

  getUser(id: string) : Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  resetPassword(resetPassword: ResetPasswordDto) : Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.post<CustomHttpResponse>(`${this.baseUrl}/resetPassword`, resetPassword)
  }

  deleteUser(username: string) : Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.baseUrl}/${username}`);
  }

  activateUser(userId: string) : Observable<CustomHttpResponse | HttpErrorResponse> {
    let queryParams = new HttpParams()
                      .set('userId', userId)  
    return this.http.get<CustomHttpResponse>(`${this.baseUrl}/activate`, {params: queryParams});
  }

  addUsersToLocalCache(users: User[]) : void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  getUsersFromLocalCache() : User[] {
    if(localStorage.getItem('users')) {
      return JSON.parse(localStorage.getItem('users'))
    }
    return null; 
  }

  getUserListByKeyword(keyword: string, page: number, size: number) : Observable<UsersListResponse> {
    let pageParam = page===null ? null : page.toString();
    let sizeParam = size===null ? null : size.toString();
    let params = new HttpParams()
                  .set('keyword', keyword)
                  .set('page', pageParam)
                  .set('size', sizeParam);      
    const searchUrl = `${this.baseUrl}/search`;
    return this.listUsers(searchUrl, params)
  }

  private getPaginatedResults(url: string, page: number, size: number) : Observable<UsersListResponse> {
    let pageParam = page===null ? null : page.toString();
    let sizeParam = size===null ? null : size.toString();
    let params = new HttpParams()
                  .set('page', pageParam)
                  .set('size', sizeParam);
    return this.listUsers(url, params);
  }

  private listUsers(url: string, dataParams: HttpParams) : Observable<UsersListResponse> {
    return this.http.get<UsersListResponse>(url, {params: dataParams});
  }
}
