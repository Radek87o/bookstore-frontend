import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../model/book'
import { BookDto } from '../model/dto/book-dto';

export interface BooksListResponse {
  content: Book[];
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
export class BookService {

  private baseUrl: string = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) { }

  getBooksList(page: number, size: number): Observable<BooksListResponse>{
    return this.getPaginatedResults(this.baseUrl, page, size);
  }

  getActiveBooksList(page: number, size: number): Observable<BooksListResponse>{
    return this.getPaginatedResults(`${this.baseUrl}/active`, page, size);
  }

  getBook(id: string) : Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`);
  }

  saveBook(book: BookDto): Observable<any> {
    return this.http.post(this.baseUrl, book);
  }

  updateBook(book: BookDto, bookId: string) {
    return this.http.put(`${this.baseUrl}/${bookId}`, book);
  }

  deleteBook(bookId: string) {
    return this.http.delete(`${this.baseUrl}/${bookId}`);
  }

  getBookListByKeyword(keyword: string, page: number, size: number) : Observable<BooksListResponse> {
    let pageParam = page===null ? null : page.toString();
    let sizeParam = size===null ? null : size.toString();
    let params = new HttpParams()
                  .set('keyword', keyword)
                  .set('page', pageParam)
                  .set('size', sizeParam);      
    const searchUrl = `${this.baseUrl}/search`;
    return this.listBooks(searchUrl, params)
  }

  getBooksWithPromo(page: number, size: number) : Observable<BooksListResponse> {      
    const promosUrl = `${this.baseUrl}/promos`;
    return this.getPaginatedResults(promosUrl, page, size);
  }

  deactivateBook(bookId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/activation/${bookId}/deactivate`);
  }

  activateBook(bookId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/activation/${bookId}/activate`);
  }

  private getPaginatedResults(url: string, page: number, size: number) : Observable<BooksListResponse> {
    let pageParam = page===null ? null : page.toString();
    let sizeParam = size===null ? null : size.toString();
    let params = new HttpParams()
                  .set('page', pageParam)
                  .set('size', sizeParam);
    return this.listBooks(url, params);
  }

  private listBooks(url: string, dataParams: HttpParams) : Observable<BooksListResponse> {
    return this.http.get<BooksListResponse>(url, {params: dataParams});
  }
}
