import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Comment } from '../model/comment';
import { CommentDto } from '../model/dto/comment-dto';
import { environment } from '../../../environments/environment';

export interface CommentListResponse {
  content: Comment[];
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
export class CommentService {

  private baseUrl: string = `${environment.apiUrl}/api/comments`;


  constructor(private http: HttpClient) { }

  getCommentsByBook(bookId: string, pageNumber: number): Observable<CommentListResponse> {
    let queryParams = new HttpParams()
      .set("pageNumber", pageNumber.toString());
    
    return this.http.get<CommentListResponse>(`${this.baseUrl}/${bookId}`, {params: queryParams});
  }

  saveComment(commentDto: CommentDto, bookId: string, userId: string) : Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${bookId}/user/${userId}`, commentDto);
  }
}
