import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../model/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  localData: boolean = false;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {
    this.cartItems = this.cartService.cartItems;
    if(this.cartItems?.length===0) {
      this.cartItems = this.cartService.getCartItemsFromLocalCache()
      this.localData = true;
      this.cartService.computeCartTotalsForLocalCache(this.cartItems)
    }

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice=data
    );

    this.cartService.totalQuantity.subscribe(
      data=>this.totalQuantity=data
    );

    if(!this.localData) {
      this.cartService.computeCartTotals();
    }
  }

  incrementCartItem(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);
  }

  decrementCartItem(cartItem: CartItem) {
    this.cartService.decrementQuantity(cartItem);
  }
}
