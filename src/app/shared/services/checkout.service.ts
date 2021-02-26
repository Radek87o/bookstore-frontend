import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Purchase } from '../model/purchase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private baseUrl = 'http://localhost:8080/api/checkout';

  constructor(private http: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<any> {
    return this.http.post(`${this.baseUrl}/purchase`, purchase);
  }
}
