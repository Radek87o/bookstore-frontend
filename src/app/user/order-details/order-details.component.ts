import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OrderItem } from 'src/app/shared/model/order-item';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CheckoutService } from 'src/app/shared/services/checkout.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  loggedIn: boolean;
  orderItems: OrderItem[];
  totalQuantity: number = 0;
  totalPrice: number = 0;

  constructor(private authService: AuthService, 
              private checkoutService: CheckoutService, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn()
    this.loadItems();
  }

  loadItems() {
    const items: Observable<OrderItem[]> = this.route.paramMap.pipe(
      switchMap((params: ParamMap)=>{
        return this.checkoutService.findOrderItems(params.get('orderId'))
      }
    ));
    items.subscribe(data=>{
      this.orderItems = data;
      this.calculateTotals();
    });
  }

  calculateTotals() {
      this.totalQuantity = _.sumBy(this.orderItems, 'quantity');
      this.totalPrice = _.sumBy(this.orderItems, item => item.quantity * item.unitPrice)    
  }
}
