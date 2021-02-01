import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Book } from '../model/book'
import { BookDto } from '../model/dto/book-dto';

interface BooksListResponse {
  content: Book[];
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl: string = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) { }

  getBooksList(): Observable<Book[]>{
    return this.listBooks(this.baseUrl, new HttpParams());
  }

  getBook(id: string) : Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`);
  }

  saveBook(book: BookDto): Observable<any> {
    return this.http.post(this.baseUrl, book);
  }

  getBookListByKeyword(keyword: string, page: number, size: number) : Observable<Book[]> {
    let pageParam = page===null ? null : page.toString();
    let sizeParam = size===null ? null : size.toString();
    let params = new HttpParams()
                  .set('keyword', keyword)
                  .set('page', pageParam)
                  .set('size', sizeParam);      
    const searchUrl = `${this.baseUrl}/search`;
    return this.listBooks(searchUrl, params)
  }

  listBooks(url: string, dataParams: HttpParams) : Observable<Book[]> {
    return this.http.get<BooksListResponse>(url, {params: dataParams}).pipe(
      map(response => response.content)
    );
  }
}
