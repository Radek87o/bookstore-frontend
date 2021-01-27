import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Rating } from '../model/rating'
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { RatingDto } from '../model/dto/rating-dto';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private baseUrl: string = 'http://localhost:8080/api/ratings';

  constructor(private http: HttpClient) { }

  getBookRatings(bookId: string): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.baseUrl}/${bookId}`);
  }

  getBookRating(bookId: string, userId: string): Observable<Rating> {
    return this.http.get<Rating>(`${this.baseUrl}/${bookId}/user/${userId}`);
  }

  saveBookRating(ratingDto: RatingDto, bookId: string, userId: string): Observable<RatingDto> {
    return this.http.post<any>(`${this.baseUrl}/${bookId}/user/${userId}`, ratingDto);
  }
}
