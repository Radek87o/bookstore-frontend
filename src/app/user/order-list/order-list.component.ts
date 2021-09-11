import { Component, OnInit } from '@angular/core';
import { OrderResponse } from 'src/app/shared/model/order-response';
import { User } from 'src/app/shared/model/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CheckoutService } from 'src/app/shared/services/checkout.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  loggedIn: boolean;
  loggedUser: User;
  userOrders: OrderResponse[] = [];
  page: number = 1;
  size: number = 20;
  totalElements: number = 0;
  totalPages: number = 0;

  constructor(private authService: AuthService, private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn();
    if(this.loggedIn) {
      this.loggedUser = this.authService.getUserFromLocalCache();
      this.loadUserOrders();
    }
  }

  loadUserOrders() {
    this.checkoutService.findOrders(this.loggedUser?.email, this.page-1, this.size).subscribe(
      this.processOrderResults()
    );
  }

  private processOrderResults() {
    return data => {
      this.userOrders=data.content;
      this.size=data.pageable.pageSize;
      this.page=data.pageable.pageNumber+1;
      this.totalElements=data.totalElements;
      this.totalPages=data.totalPages;      
    }
  }
}
