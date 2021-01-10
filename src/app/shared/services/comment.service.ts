import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Comment } from '../model/comment';
import { CommentDto } from '../model/dto/comment-dto'

interface CommentListResponse {
  content: Comment[];
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl: string = 'http://localhost:8080/api/comments';


  constructor(private http: HttpClient) { }

  getCommentsByBook(bookId: string, pageNumber: number, pageSize: number): Observable<Comment[]> {
    let queryParams = new HttpParams()
      .set("pageNumber", pageNumber.toString())
      .set("pageSize", pageSize.toString());
    
    return this.http.get<CommentListResponse>(`${this.baseUrl}/${bookId}`, {params: queryParams}).pipe(
      map(response => response.content)
    )
  }

  saveComment(commentDto: CommentDto, bookId: string, userId: string) : Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${bookId}/user/${userId}`, commentDto);
  }
}
