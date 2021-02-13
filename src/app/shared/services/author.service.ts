import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthorWrapper } from '../model/author-wrapper';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private baseUrl: string = 'http://localhost:8080/api/authors';

  constructor(private http: HttpClient) { }

  getAuthorBooks(authorId: string, page: number, size: number) : Observable<AuthorWrapper> {
    let pageParam = page===null ? null : page.toString();
    let sizeParam = size===null ? null : size.toString();
    let params = new HttpParams()
                  .set('page', pageParam)
                  .set('size', sizeParam);
    return this.http.get<AuthorWrapper>(`${this.baseUrl}/${authorId}`, {params: params});    
  }
}
