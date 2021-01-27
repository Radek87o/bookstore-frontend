import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<BooksListResponse>(this.baseUrl).pipe(
      map(response => response.content)
    );
  }

  getBook(id: string) : Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`);
  }

  saveBook(book: BookDto): Observable<any> {
    return this.http.post(this.baseUrl, book);
  }
}
