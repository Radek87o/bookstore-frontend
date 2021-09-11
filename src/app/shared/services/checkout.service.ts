import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Purchase } from '../model/purchase';
import { Observable } from 'rxjs';
import { OrderResponse } from '../model/order-response';
import { OrderItem } from '../model/order-item';
import { environment } from '../../../environments/environment';

export interface OrdersListResponse {
  content: OrderResponse[];
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
export class CheckoutService {

  private baseUrl = `${environment.apiUrl}/api/checkout`;

  constructor(private http: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<any> {
    return this.http.post(`${this.baseUrl}/purchase`, purchase);
  }

  findOrders(email: string, page: number, size: number) {
    let pageParam = page===null ? null : page.toString();
    let sizeParam = size===null ? null : size.toString();
    let params = new HttpParams()
                  .set('email', email)
                  .set('page', pageParam)
                  .set('size', sizeParam);
    return this.http.get<OrdersListResponse> (`${this.baseUrl}/orders`, {params: params})
  }

  findOrderItems(orderId: string) : Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.baseUrl}/orders/${orderId}/items`)
  }
}
